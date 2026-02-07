// ---------------------------------------------------------------------------
// NexFlow Facilitator API Client
// ---------------------------------------------------------------------------
//
// Thin wrapper around the NexFlow x402 facilitator endpoints:
//
//   POST {BASE_URL}/verify   — validate payment proof, get intentId
//   POST {BASE_URL}/settle   — confirm delivery after origin responds
//
// Auth: X-Facilitator-Auth header.
//
// Config values are injected at **build time** via esbuild `define`
// (Lambda@Edge does not support runtime environment variables).
//
// Base URL: https://api.nexflowapp.app/api/v1/facilitator/x402
// ---------------------------------------------------------------------------

import type {
  VerifyRequest,
  VerifyResponse,
  SettleRequest,
  SettleResponse,
} from './types.js'

// Build-time injected (see esbuild.config.mjs)
const BASE_URL: string = process.env.NEXFLOW_FACILITATOR_URL!
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
    const res = await fetch(`${BASE_URL}${path}`, {
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
// verify — called on viewer-request
// ---------------------------------------------------------------------------

/**
 * Call NexFlow /verify to validate the payment proof.
 *
 * If the proof is valid, returns `{ valid: true, intentId: "..." }`.
 * The intentId is attached to the request and used later for settlement.
 */
export async function verify(req: VerifyRequest): Promise<VerifyResponse> {
  return facilitatorFetch<VerifyResponse>('/verify', req, 'verify')
}

// ---------------------------------------------------------------------------
// settle — called on origin-response
// ---------------------------------------------------------------------------

/**
 * Call NexFlow /settle to confirm that the origin delivered
 * a successful response for this payment intent.
 *
 * Only called when origin status < 400. Idempotent — safe to retry.
 */
export async function settle(req: SettleRequest): Promise<SettleResponse> {
  return facilitatorFetch<SettleResponse>('/settle', req, 'settle')
}
