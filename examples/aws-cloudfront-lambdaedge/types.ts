// ---------------------------------------------------------------------------
// Lambda@Edge x402 Adapter — Shared Types
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Route config
// ---------------------------------------------------------------------------

/** Gating config for a protected path pattern. */
export interface RouteConfig {
  /** CAIP-2 network identifier (e.g. "eip155:8453" for Base mainnet). */
  network: string
  /** Stable identifier for this resource (e.g. "joke-endpoint"). */
  resourceId: string
}

// ---------------------------------------------------------------------------
// NexFlow Facilitator API — POST /verify
// ---------------------------------------------------------------------------

/** Request body sent to POST {FACILITATOR_URL}/verify. */
export interface VerifyRequest {
  network: string
  resourceId: string
  headers: Record<string, string>
}

/**
 * Response from POST {FACILITATOR_URL}/verify.
 *
 * On success: { valid: true, settlementIntentId: "x402-intent-...", reason: null }
 * On failure: { valid: false, reason: "...", requirement: { ... } }
 */
export interface VerifyResponse {
  valid: boolean
  settlementIntentId?: string
  expiresAt?: string
  reason?: string | null
  requirement?: unknown | null
}

// ---------------------------------------------------------------------------
// NexFlow Facilitator API — POST /settle
// ---------------------------------------------------------------------------

/**
 * Request body sent to POST {FACILITATOR_URL}/settle.
 *
 * This is the billable event — called only when the origin returns success (<400).
 */
export interface SettleRequest {
  network: string
  settlementIntentId: string
  resourceId: string
  originStatus: number
}

/** Response from POST {FACILITATOR_URL}/settle. */
export interface SettleResponse {
  ok: boolean
  settledAt?: string
}

// ---------------------------------------------------------------------------
// Structured logging
// ---------------------------------------------------------------------------

/** Structured log entry for CloudWatch JSON logs. */
export interface LogEntry {
  ts: string
  eventType: string
  path?: string
  resourceId?: string
  settlementIntentId?: string
  valid?: boolean
  settled?: boolean
  settledAt?: string
  reason?: string
  latencyMs?: number
  requestId?: string
  error?: string
  hasPaymentHeader?: boolean
  originStatus?: number
}

// ---------------------------------------------------------------------------
// CloudFront Lambda@Edge event types
// ---------------------------------------------------------------------------

export interface CfHeader {
  key?: string
  value: string
}

export interface CfRequest {
  uri: string
  method: string
  headers: Record<string, CfHeader[]>
  querystring: string
  clientIp: string
  body?: {
    data: string
    encoding: string
    inputTruncated: boolean
  }
}

export interface CfResponse {
  status: string
  statusDescription: string
  headers: Record<string, CfHeader[]>
  body?: string
}

export interface CfConfig {
  distributionDomainName: string
  distributionId: string
  eventType:
    | 'viewer-request'
    | 'viewer-response'
    | 'origin-request'
    | 'origin-response'
  requestId: string
}

export interface CfRecord {
  cf: {
    config: CfConfig
    request: CfRequest
    response?: CfResponse
  }
}

export interface CloudFrontEvent {
  Records: CfRecord[]
}
