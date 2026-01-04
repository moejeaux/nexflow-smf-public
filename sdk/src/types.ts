// =============================================================================
// @nexflow/smf SDK Types
// =============================================================================
// Type definitions for the NexFlow SMF SDK
// Zero dependencies - all types are self-contained

// =============================================================================
// CLIENT OPTIONS
// =============================================================================

/**
 * Configuration options for NexFlowSMFClient
 */
export interface NexFlowSMFClientOptions {
  /** Base URL of the NexFlow API (e.g., "https://api.nexflowapp.app") */
  baseUrl: string;
  
  /** API key for authentication (starts with "nf_live_" or "nf_test_") */
  apiKey: string;
  
  /** Request timeout in milliseconds (default: 30000) */
  timeoutMs?: number;
  
  /** Warn when rate limit utilization exceeds this threshold (default: 0.8 = 80%) */
  rateLimitThreshold?: number;
  
  /** Custom User-Agent string (default: "NexFlowSMF/1.0") */
  userAgent?: string;
}

/**
 * Per-request options
 */
export interface RequestOptions {
  /** Custom idempotency key for this request */
  idempotencyKey?: string;
  
  /** Additional headers to include */
  headers?: Record<string, string>;
  
  /** Override timeout for this request */
  timeoutMs?: number;
}

// =============================================================================
// ROUTE TYPES
// =============================================================================

/**
 * Request body for routing a payment
 */
export interface SMFRouteRequest {
  /** Payment amount in wei (e.g., "1000000") */
  amount_wei: string;
  
  /** Token contract address (e.g., "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48") */
  token_address: string;
  
  /** Chain ID in CAIP-2 format (e.g., "eip155:8453" for Base) */
  chain_id: string;
  
  /** Optional recipient address for routing optimization */
  recipient?: string;
  
  /** Optional payment ID for correlation (also used as idempotency key) */
  payment_id?: string;
  
  /** Optional metadata for routing decisions */
  metadata?: Record<string, unknown>;
}

/**
 * Response from routing a payment
 */
export interface SMFRouteResponse {
  /** Selected facilitator ID (e.g., "cdp", "payai", "x402rs") */
  facilitator_id: string;
  
  /** Routing decision path (e.g., "direct", "batched", "fallback", "scored") */
  path: string;
  
  /** Expected platform fee in wei (0.25% default) */
  expected_fee_wei: string;
  
  /** Estimated round-trip latency in milliseconds */
  estimated_latency_ms: number;
  
  /** Routing confidence score (0-1, where 1 is highest confidence) */
  confidence: number;
  
  /** ISO timestamp when this quote expires */
  quote_expires_at: string;
  
  /** Quote ID for settlement correlation */
  quote_id?: string;
}

// =============================================================================
// VERIFY TYPES
// =============================================================================

/**
 * Request body for verifying a payment intent
 */
export interface SMFVerifyRequest {
  /** x402 payment intent string/payload */
  payment_intent: string;
  
  /** Optional amount in wei for verification */
  amount_wei?: string;
  
  /** Recipient address (must match payment intent) */
  recipient_address: string;
  
  /** Optional facilitator hint for verification */
  facilitator_id?: string;
}

/**
 * Response from verifying a payment
 */
export interface SMFVerifyResponse {
  /** Whether the payment intent is valid */
  valid: boolean;
  
  /** If invalid, explanation of why */
  reason?: string;
  
  /** Facilitator that will process this payment */
  facilitator: string;
  
  /** Estimated settlement time in milliseconds */
  estimated_settlement_ms: number;
}

// =============================================================================
// SETTLE TYPES
// =============================================================================

/**
 * Request body for settling a batch
 */
export interface SMFSettleRequest {
  /** Batch ID from the batch settlement engine */
  batch_id: string;
  
  /** Facilitator to use for settlement */
  facilitator_id: string;
  
  /** Force immediate settlement instead of waiting for batch window */
  force?: boolean;
}

/**
 * Settlement status values
 */
export type SMFSettlementStatus = 'pending' | 'submitted' | 'confirmed' | 'failed';

/**
 * Response from settling a batch
 */
export interface SMFSettleResponse {
  /** Current settlement status */
  status: SMFSettlementStatus;
  
  /** On-chain transaction hash (if submitted/confirmed) */
  transaction_hash?: string;
  
  /** ISO timestamp of settlement completion */
  settled_at?: string;
  
  /** Error message if settlement failed */
  error?: string;
}

// =============================================================================
// HEALTH TYPES
// =============================================================================

/**
 * Health status values
 */
export type HealthStatus = 'healthy' | 'degraded' | 'down';

/**
 * Response from health check
 */
export interface SMFHealthResponse {
  /** Overall system status */
  status: HealthStatus;
  
  /** Summary counts */
  summary: {
    total: number;
    healthy: number;
    degraded: number;
    down: number;
  };
  
  /** Per-facilitator health */
  facilitators: Array<{
    facilitatorId: string;
    name: string;
    status: HealthStatus;
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
// FACILITATOR TYPES
// =============================================================================

/**
 * Facilitator information
 */
export interface SMFFacilitatorInfo {
  /** Unique facilitator ID */
  id: string;
  
  /** Human-readable label */
  label: string;
  
  /** Facilitator API URL */
  url: string;
  
  /** Supported networks (e.g., ["base", "polygon"]) */
  supportedNetworks: string[];
  
  /** Supported tokens */
  tokens: string[];
  
  /** Routing priority (lower = higher priority) */
  priority: number;
  
  /** Fee in basis points */
  feeBps: number;
  
  /** Whether facilitator is enabled */
  enabled: boolean;
  
  /** Current health status */
  status?: HealthStatus | 'unknown';
}

// =============================================================================
// RATE LIMIT TYPES
// =============================================================================

/**
 * Rate limit information from response headers
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
// ERROR TYPES
// =============================================================================

/**
 * API error response shape
 */
export interface SMFErrorResponse {
  /** Error code */
  error: string;
  
  /** Human-readable message */
  message?: string;
  
  /** Additional details */
  details?: unknown;
}

/**
 * Known SMF error codes
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
  | 'TIMEOUT'
  | 'NETWORK_ERROR'
  | 'INTERNAL_ERROR';

