// ---------------------------------------------------------------------------
// Lambda@Edge x402 Adapter — Handler Entry Point
// ---------------------------------------------------------------------------
//
// Settle-only billing: verify is not billed; settle is the billable event.
// "You only pay when your paywalled endpoint is successfully served."
//
// Two CloudFront triggers, two responsibilities:
//
//   viewer-request:
//     1. Match incoming path against routes.ts
//     2. Call POST {FACILITATOR_URL}/verify with { network, resourceId, headers }
//     3. If valid  → attach settlementIntentId + resourceId + network to custom
//                     headers, forward to origin
//     4. If invalid → return 402 Payment Required
//     5. If error   → return 500 (fail closed)
//
//   origin-response:
//     1. Read settlementIntentId, resourceId, network from custom headers
//     2. If origin status < 400  → call POST {FACILITATOR_URL}/settle
//        (this is the billable event)
//     3. If origin status >= 400 → do nothing (no charge)
//     4. Return the origin response unchanged
//
// ---------------------------------------------------------------------------

import { matchRoute } from './routes.js'
import { verify, settle } from './nexflowFacilitator.js'
import type {
  CloudFrontEvent,
  CfRequest,
  CfResponse,
  VerifyResponse,
  LogEntry,
} from './types.js'

// Custom headers used to pass settlement context from viewer-request → origin-response.
// CloudFront preserves custom headers on the request object across triggers.
const HEADER_INTENT = 'x-settlement-intent-id'
const HEADER_RESOURCE = 'x-settlement-resource-id'
const HEADER_NETWORK = 'x-settlement-network'

// ---------------------------------------------------------------------------
// Structured logger (JSON → CloudWatch)
// ---------------------------------------------------------------------------

function log(entry: LogEntry): void {
  console.log(JSON.stringify(entry))
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Extract a flat header map (lowercase key → first value) from CF headers. */
function flattenHeaders(
  cfHeaders: Record<string, { key?: string; value: string }[]>,
): Record<string, string> {
  const flat: Record<string, string> = {}
  for (const [key, values] of Object.entries(cfHeaders)) {
    if (values[0]) {
      flat[key.toLowerCase()] = values[0].value
    }
  }
  return flat
}

/** Set a single-value custom header on a CF request. */
function setRequestHeader(
  request: CfRequest,
  name: string,
  value: string,
): void {
  request.headers[name.toLowerCase()] = [{ key: name, value }]
}

/** Read a single-value header from a CF request. */
function getRequestHeader(
  request: CfRequest,
  name: string,
): string | undefined {
  const values = request.headers[name.toLowerCase()]
  return values?.[0]?.value
}

/** Build a CloudFront 402 Payment Required response. */
function paymentRequiredResponse(verifyRes: VerifyResponse): CfResponse {
  return {
    status: '402',
    statusDescription: 'Payment Required',
    headers: {
      'content-type': [{ key: 'Content-Type', value: 'application/json' }],
      'cache-control': [{ key: 'Cache-Control', value: 'no-store' }],
    },
    body: JSON.stringify({
      status: 'payment_required',
      message: 'x402 payment required to access this resource.',
      requirement: verifyRes.requirement ?? null,
    }),
  }
}

/** Build a CloudFront 500 error response. */
function internalErrorResponse(message: string): CfResponse {
  return {
    status: '500',
    statusDescription: 'Internal Server Error',
    headers: {
      'content-type': [{ key: 'Content-Type', value: 'application/json' }],
      'cache-control': [{ key: 'Cache-Control', value: 'no-store' }],
    },
    body: JSON.stringify({
      error: 'internal_error',
      message,
    }),
  }
}

// ---------------------------------------------------------------------------
// viewer-request handler — VERIFY (not billed)
// ---------------------------------------------------------------------------

async function handleViewerRequest(
  request: CfRequest,
  requestId: string,
  _distributionDomainName: string,
): Promise<CfRequest | CfResponse> {
  const path = request.uri
  const route = matchRoute(path)

  // No route match → pass through (not a gated path).
  if (!route) {
    return request
  }

  const flatHeaders = flattenHeaders(request.headers)
  const hasPaymentHeader = 'x402-payment' in flatHeaders
  const start = Date.now()

  try {
    // Verify request body: { network, resourceId, headers }
    // Verify is NOT billed — it only gates access.
    const verifyRes = await verify({
      network: route.network,
      resourceId: route.resourceId,
      headers: flatHeaders,
    })

    const latencyMs = Date.now() - start

    log({
      ts: new Date().toISOString(),
      eventType: 'verify',
      path,
      resourceId: route.resourceId,
      settlementIntentId: verifyRes.settlementIntentId,
      valid: verifyRes.valid,
      latencyMs,
      requestId,
      hasPaymentHeader,
    })

    // Valid payment → attach settlement context headers and forward to origin.
    if (verifyRes.valid && verifyRes.settlementIntentId) {
      setRequestHeader(request, HEADER_INTENT, verifyRes.settlementIntentId)
      setRequestHeader(request, HEADER_RESOURCE, route.resourceId)
      setRequestHeader(request, HEADER_NETWORK, route.network)
      return request
    }

    // Invalid or missing payment → 402.
    return paymentRequiredResponse(verifyRes)
  } catch (err: unknown) {
    const latencyMs = Date.now() - start
    const message = err instanceof Error ? err.message : String(err)

    log({
      ts: new Date().toISOString(),
      eventType: 'verify',
      path,
      resourceId: route.resourceId,
      error: message,
      latencyMs,
      requestId,
      hasPaymentHeader,
    })

    // Fail closed — do not allow unpaid access on verification failure.
    return internalErrorResponse('Payment verification unavailable.')
  }
}

// ---------------------------------------------------------------------------
// origin-response handler — SETTLE (this is the billable event)
// ---------------------------------------------------------------------------

async function handleOriginResponse(
  request: CfRequest,
  response: CfResponse,
  requestId: string,
): Promise<CfResponse> {
  const settlementIntentId = getRequestHeader(request, HEADER_INTENT)

  // No settlementIntentId → not a gated request, pass through.
  if (!settlementIntentId) {
    return response
  }

  const originStatus = parseInt(response.status, 10)

  // Only settle for successful responses (status < 400).
  // If origin failed, do NOT call settle — no charge.
  if (originStatus >= 400) {
    log({
      ts: new Date().toISOString(),
      eventType: 'settle_skipped',
      path: request.uri,
      settlementIntentId,
      reason: `origin returned ${originStatus}`,
      originStatus,
      requestId,
    })
    return response
  }

  // Read resourceId and network from the headers set during viewer-request.
  const resourceId = getRequestHeader(request, HEADER_RESOURCE) ?? 'unknown'
  const network = getRequestHeader(request, HEADER_NETWORK) ?? 'eip155:8453'

  const start = Date.now()

  try {
    // Settle request body: { network, settlementIntentId, resourceId, originStatus }
    // This is the billable event — called only on origin success.
    // Idempotent — safe to retry without double-billing.
    const settleRes = await settle({
      network,
      settlementIntentId,
      resourceId,
      originStatus,
    })

    log({
      ts: new Date().toISOString(),
      eventType: 'settle',
      path: request.uri,
      settlementIntentId,
      resourceId,
      originStatus,
      settled: settleRes.ok,
      settledAt: settleRes.settledAt,
      latencyMs: Date.now() - start,
      requestId,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)

    log({
      ts: new Date().toISOString(),
      eventType: 'settle',
      path: request.uri,
      settlementIntentId,
      resourceId,
      originStatus,
      error: message,
      latencyMs: Date.now() - start,
      requestId,
    })

    // Settlement failure is logged but does NOT block the response.
    // The client already received value — NexFlow will reconcile async.
  }

  // Always return the origin response unchanged.
  return response
}

// ---------------------------------------------------------------------------
// Lambda@Edge entry point
// ---------------------------------------------------------------------------

export const handler = async (
  event: CloudFrontEvent,
): Promise<CfRequest | CfResponse> => {
  const record = event.Records[0]
  const { config, request, response } = record.cf
  const { eventType, requestId, distributionDomainName } = config

  if (eventType === 'viewer-request') {
    return handleViewerRequest(request, requestId, distributionDomainName)
  }

  if (eventType === 'origin-response') {
    return handleOriginResponse(request, response!, requestId)
  }

  // Unsupported event type — pass through.
  return request
}
