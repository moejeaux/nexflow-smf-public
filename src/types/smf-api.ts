// =============================================================================
// SMF API TYPES
// =============================================================================
// Shared request/response types for SMF API endpoints
// Used by both server-side API handlers and client SDK

// =============================================================================
// PROTECTED PAYMENTS - Anomaly Detection Metadata
// =============================================================================

/**
 * Payment protection status from NexFlow's anomaly detection system.
 * Every payment routed through SMF is automatically protected.
 */
export interface PaymentProtection {
  /** Protection level - always 'automatic' for SMF */
  level: 'automatic';
  /** Circuit breaker state for the selected facilitator */
  circuit_breaker_state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
  /** Current health classification based on recent metrics */
  facilitator_health: 'normal' | 'suspect' | 'anomalous';
  /** 7-day rolling success rate (0-1) */
  success_rate_7d: number;
  /** Whether anomaly detection is actively monitoring */
  anomaly_detection_active: boolean;
}

/**
 * Fee breakdown for settlement.
 * Single platform fee (0.25%) - no insurance split.
 */
export interface SettlementFeeBreakdown {
  /** Platform fee in wei (0.25% of amount) */
  platform_fee_wei: string;
  /** Total fee in wei (same as platform_fee) */
  total_fee_wei: string;
}

// =============================================================================
// ROUTE ENDPOINT
// =============================================================================

/**
 * Request body for POST /api/v1/smf/route
 * Routes a payment to the best available facilitator
 */
export interface SMFRouteRequest {
  /** Payment amount in wei (e.g., "1000000") */
  amount_wei: string;
  /** Token contract address (e.g., "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48") */
  token_address: string;
  /** Chain ID in CAIP-2 format (e.g., "eip155:8453") */
  chain_id: string;
  /** Optional recipient address for routing optimization */
  recipient?: string;
  /** Optional idempotency key / correlation ID */
  payment_id?: string;
  /** Optional metadata for routing decisions */
  metadata?: Record<string, unknown>;
}

/**
 * Response body for POST /api/v1/smf/route
 */
export interface SMFRouteResponse {
  /** Selected facilitator ID (e.g., "cdp", "payai", "x402rs") */
  facilitator_id: string;
  /** Routing decision path (e.g., "direct", "batched", "fallback") */
  path: string;
  /** Expected platform fee in wei (0.25% default) */
  expected_fee_wei: string;
  /** Fee breakdown (single platform fee, no insurance) */
  fee_breakdown?: SettlementFeeBreakdown;
  /** Estimated round-trip latency in milliseconds */
  estimated_latency_ms: number;
  /** Routing confidence score (0-1) */
  confidence: number;
  /** ISO timestamp when this quote expires */
  quote_expires_at: string;
  /** Correlation ID for settlement */
  quote_id?: string;
  /** Protected Payments status - anomaly detection metadata */
  protection?: PaymentProtection;
}

// =============================================================================
// VERIFY ENDPOINT
// =============================================================================

/**
 * Request body for POST /api/v1/smf/verify
 * Verifies an x402 payment intent
 */
export interface SMFVerifyRequest {
  /** x402 payment string/payload */
  payment_intent: string;
  /** Optional amount in wei for verification */
  amount_wei?: string;
  /** Recipient address (must match payment intent) */
  recipient_address: string;
  /** Optional facilitator hint for verification */
  facilitator_id?: string;
}

/**
 * Response body for POST /api/v1/smf/verify
 */
export interface SMFVerifyResponse {
  /** Whether the payment is valid */
  valid: boolean;
  /** If invalid, explanation of why */
  reason?: string;
  /** Facilitator that will process this payment */
  facilitator: string;
  /** Estimated settlement time in milliseconds */
  estimated_settlement_ms: number;
  /** Protected Payments status - anomaly detection metadata */
  protection?: PaymentProtection;
}

// =============================================================================
// SETTLE ENDPOINT
// =============================================================================

/**
 * Request body for POST /api/v1/smf/settle
 * Settles a batch of payments
 */
export interface SMFSettleRequest {
  /** Batch ID from the batch settlement engine */
  batch_id: string;
  /** Facilitator to use for settlement */
  facilitator_id: string;
  /** Force immediate settlement vs wait for batch window */
  force?: boolean;
}

/**
 * Settlement status enum
 */
export type SMFSettlementStatus = 'pending' | 'submitted' | 'confirmed' | 'failed';

/**
 * Response body for POST /api/v1/smf/settle
 */
export interface SMFSettleResponse {
  /** Current settlement status */
  status: SMFSettlementStatus;
  /** On-chain transaction hash (if submitted/confirmed) */
  transaction_hash?: string;
  /** ISO timestamp of settlement completion */
  settled_at?: string;
  /** Fee breakdown for this settlement */
  fee_breakdown?: SettlementFeeBreakdown;
  /** Protected Payments status - anomaly detection metadata */
  protection?: PaymentProtection;
  /** Error message if settlement failed */
  error?: string;
}

// =============================================================================
// HEALTH ENDPOINT
// =============================================================================

/**
 * Response body for GET /api/v1/smf/health
 */
export interface SMFHealthResponse {
  /** Overall system status */
  status: 'healthy' | 'degraded' | 'down';
  /** Summary counts */
  summary: {
    total: number;
    healthy: number;
    degraded: number;
    down: number;
  };
  /** Per-facilitator health status */
  facilitators: Array<{
    facilitatorId: string;
    name: string;
    status: 'healthy' | 'degraded' | 'down';
    reasons?: string[];
    metrics?: {
      successRate: number;
      p95LatencyMs: number | null;
      errorRate: number;
      lastUpdated: string | null;
    };
  }>;
  /** ISO timestamp of health check */
  timestamp: string;
}

// =============================================================================
// FACILITATORS ENDPOINT
// =============================================================================

/**
 * Facilitator metadata from GET /api/v1/smf/facilitators
 */
export interface SMFFacilitatorInfo {
  id: string;
  label: string;
  url: string;
  supportedNetworks: string[];
  tokens: string[];
  priority: number;
  feeBps: number;
  enabled: boolean;
  status?: 'healthy' | 'degraded' | 'down' | 'unknown';
}

// =============================================================================
// RATE LIMITING
// =============================================================================

/**
 * Rate limit information extracted from response headers
 */
export interface RateLimitInfo {
  /** Maximum requests allowed per time window */
  limit: number;
  /** Remaining requests in current window */
  remaining: number;
  /** When the rate limit resets */
  resetAt: Date;
}

// =============================================================================
// ERROR RESPONSES
// =============================================================================

/**
 * Standard API error response
 */
export interface SMFErrorResponse {
  /** Error code (e.g., "INVALID_REQUEST", "UNAUTHORIZED") */
  error: string;
  /** Human-readable error message */
  message?: string;
  /** Additional error details */
  details?: unknown;
}

/**
 * Error codes used by SMF API
 */
export type SMFErrorCode =
  | 'MISSING_API_KEY'
  | 'INVALID_API_KEY'
  | 'INVALID_REQUEST'
  | 'INVALID_AMOUNT'
  | 'INVALID_CHAIN_ID'
  | 'INVALID_TOKEN'
  | 'MALFORMED_PAYMENT'
  | 'RECIPIENT_MISMATCH'
  | 'BATCH_NOT_FOUND'
  | 'FACILITATOR_NOT_FOUND'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR';

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

/**
 * Validate SMFRouteRequest
 */
export function isValidRouteRequest(body: unknown): body is SMFRouteRequest {
  if (!body || typeof body !== 'object') return false;
  const req = body as Record<string, unknown>;
  
  if (typeof req.amount_wei !== 'string' || !req.amount_wei) return false;
  if (typeof req.token_address !== 'string' || !req.token_address) return false;
  if (typeof req.chain_id !== 'string' || !req.chain_id) return false;
  
  // Validate amount_wei is a valid positive integer
  try {
    const amount = BigInt(req.amount_wei);
    if (amount <= 0n) return false;
  } catch {
    return false;
  }
  
  return true;
}

/**
 * Validate SMFVerifyRequest
 */
export function isValidVerifyRequest(body: unknown): body is SMFVerifyRequest {
  if (!body || typeof body !== 'object') return false;
  const req = body as Record<string, unknown>;
  
  if (typeof req.payment_intent !== 'string' || !req.payment_intent) return false;
  if (typeof req.recipient_address !== 'string' || !req.recipient_address) return false;
  
  return true;
}

/**
 * Validate SMFSettleRequest
 */
export function isValidSettleRequest(body: unknown): body is SMFSettleRequest {
  if (!body || typeof body !== 'object') return false;
  const req = body as Record<string, unknown>;
  
  if (typeof req.batch_id !== 'string' || !req.batch_id) return false;
  if (typeof req.facilitator_id !== 'string' || !req.facilitator_id) return false;
  
  return true;
}

