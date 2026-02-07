// ---------------------------------------------------------------------------
// Lambda@Edge x402 Adapter — Handler Entry Point
// ---------------------------------------------------------------------------
//
// Two CloudFront triggers, two responsibilities:
//
//   viewer-request:
//     1. Match incoming path against routes.ts
//     2. Call NexFlow /verify with the x-402-payment header
//     3. If valid  → attach intentId to a custom header, forward to origin
//     4. If invalid → return 402 Payment Required
//     5. If error   → return 500 (fail closed)
//
//   origin-response:
//     1. Read the intentId from the custom header
//     2. If origin status < 400  → call /settle to confirm delivery
//     3. Return the origin response unchanged
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

// Custom header used to pass the intentId from viewer-request → origin-response.
const INTENT_HEADER = 'x-settlement-intent-id'

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
// viewer-request handler — VERIFY only
// ---------------------------------------------------------------------------

async function handleViewerRequest(
  request: CfRequest,
  requestId: string,
): Promise<CfRequest | CfResponse> {
  const path = request.uri
  const route = matchRoute(path)

  // No route match → pass through (not a gated path).
  if (!route) {
    return request
  }

  const flatHeaders = flattenHeaders(request.headers)
  const hasPaymentHeader = 'x-402-payment' in flatHeaders
  const start = Date.now()

  try {
    const verifyRes = await verify({
      path,
      price: route.price,
      currency: route.currency,
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
      intentId: verifyRes.intentId,
      valid: verifyRes.valid,
      latencyMs,
      requestId,
      hasPaymentHeader,
    })

    // Valid payment → attach intentId and forward to origin.
    if (verifyRes.valid && verifyRes.intentId) {
      setRequestHeader(request, INTENT_HEADER, verifyRes.intentId)
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
// origin-response handler — SETTLE only
// ---------------------------------------------------------------------------

async function handleOriginResponse(
  request: CfRequest,
  response: CfResponse,
  requestId: string,
): Promise<CfResponse> {
  const intentId = getRequestHeader(request, INTENT_HEADER)

  // No intentId → not a gated request, pass through.
  if (!intentId) {
    return response
  }

  const statusCode = parseInt(response.status, 10)

  // Only settle for successful responses (status < 400).
  if (statusCode >= 400) {
    log({
      ts: new Date().toISOString(),
      eventType: 'settle_skipped',
      path: request.uri,
      intentId,
      reason: `origin returned ${statusCode}`,
      requestId,
    })
    return response
  }

  const start = Date.now()

  try {
    const settleRes = await settle({
      intentId,
      status: 'success',
      statusCode,
    })

    log({
      ts: new Date().toISOString(),
      eventType: 'settle',
      path: request.uri,
      intentId,
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
      intentId,
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
  const { eventType, requestId } = config

  if (eventType === 'viewer-request') {
    return handleViewerRequest(request, requestId)
  }

  if (eventType === 'origin-response') {
    return handleOriginResponse(request, response!, requestId)
  }

  // Unsupported event type — pass through.
  return request
}
