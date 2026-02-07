// ---------------------------------------------------------------------------
// Lambda@Edge x402 Adapter — NexFlow Facilitator API Client
// ---------------------------------------------------------------------------
//
// Two endpoints (relative to FACILITATOR_URL):
//   POST {FACILITATOR_URL}/verify   — validate payment proof (not billed)
//   POST {FACILITATOR_URL}/settle   — confirm delivery (this is the billable event)
//
// FACILITATOR_URL = https://api.nexflowapp.app/api/v1/facilitator/x402
//
// Auth: X-Facilitator-Auth header.
//
// Config values are injected at **build time** via esbuild `define`
// (Lambda@Edge does not support runtime environment variables).
// ---------------------------------------------------------------------------

import type {
  VerifyRequest,
  VerifyResponse,
  SettleRequest,
  SettleResponse,
} from './types.js'

// Build-time injected (see esbuild.config.mjs)
const FACILITATOR_URL: string = process.env.NEXFLOW_FACILITATOR_URL!
const API_KEY: string = process.env.NEXFLOW_API_KEY!

/** Default timeout for outbound API calls (ms). */
const REQUEST_TIMEOUT_MS = 5_000

// ---------------------------------------------------------------------------
// Shared fetch helper
// ---------------------------------------------------------------------------

async function facilitatorFetch<T>(
  path: string,
  body: unknown,
  label: string,
): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const res = await fetch(`${FACILITATOR_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Facilitator-Auth': API_KEY,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    const contentType = res.headers.get('content-type') ?? ''

    if (!contentType.includes('application/json')) {
      const text = await res.text().catch(() => '<unreadable>')
      throw new Error(
        `NexFlow ${label} returned non-JSON (${res.status}): ${text.slice(0, 200)}`,
      )
    }

    return (await res.json()) as T
  } finally {
    clearTimeout(timeout)
  }
}

// ---------------------------------------------------------------------------
// verify — called on viewer-request (NOT billed)
// ---------------------------------------------------------------------------

/**
 * Call POST {FACILITATOR_URL}/verify to validate the payment proof.
 *
 * Verify is NOT a billable event — it only gates access.
 *
 * On success returns { valid: true, settlementIntentId: "x402-intent-..." }.
 * The settlementIntentId is attached to the request for later settlement.
 *
 * @returns Parsed verify response.
 * @throws  On network error or non-JSON response.
 */
export async function verify(req: VerifyRequest): Promise<VerifyResponse> {
  return facilitatorFetch<VerifyResponse>('/verify', req, 'verify')
}

// ---------------------------------------------------------------------------
// settle — called on origin-response (THIS IS THE BILLABLE EVENT)
// ---------------------------------------------------------------------------

/**
 * Call POST {FACILITATOR_URL}/settle to confirm that the origin delivered
 * a successful response for this payment intent.
 *
 * This is the billable event. Only called when origin status < 400.
 * Idempotent — safe to retry without double-billing.
 *
 * @returns Parsed settle response.
 * @throws  On network error or non-JSON response.
 */
export async function settle(req: SettleRequest): Promise<SettleResponse> {
  return facilitatorFetch<SettleResponse>('/settle', req, 'settle')
}
