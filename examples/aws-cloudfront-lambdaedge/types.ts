// ---------------------------------------------------------------------------
// Shared Types
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Route config
// ---------------------------------------------------------------------------

/** Gating config for a protected path pattern. */
export interface RouteConfig {
  /** Price per request (e.g. "0.001"). */
  price: string
  /** Currency code (e.g. "USD"). */
  currency: string
  /** Network name (e.g. "base"). */
  network: string
  /** Stable identifier for this resource tier. */
  resourceId: string
}

// ---------------------------------------------------------------------------
// NexFlow Facilitator API — /verify
// ---------------------------------------------------------------------------

/** Request body sent to POST /verify. */
export interface VerifyRequest {
  path: string
  price: string
  currency: string
  network: string
  resourceId: string
  headers: { 'x-402-payment': string }
}

/** Response from POST /verify. */
export interface VerifyResponse {
  valid: boolean
  intentId?: string
  expiresAt?: string
  reason?: string
  requirement?: unknown | null
}

// ---------------------------------------------------------------------------
// NexFlow Facilitator API — /settle
// ---------------------------------------------------------------------------

/** Request body sent to POST /settle. */
export interface SettleRequest {
  intentId: string
  status: 'success' | 'failure'
  statusCode: number
}

/** Response from POST /settle. */
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
  intentId?: string
  valid?: boolean
  settled?: boolean
  settledAt?: string
  reason?: string
  latencyMs?: number
  requestId?: string
  error?: string
  hasPaymentHeader?: boolean
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
