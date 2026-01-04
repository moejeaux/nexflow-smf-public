/**
 * Configuration options for NexFlowSMFClient
 */
interface NexFlowSMFClientOptions {
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
interface RequestOptions {
    /** Custom idempotency key for this request */
    idempotencyKey?: string;
    /** Additional headers to include */
    headers?: Record<string, string>;
    /** Override timeout for this request */
    timeoutMs?: number;
}
/**
 * Request body for routing a payment
 */
interface SMFRouteRequest {
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
interface SMFRouteResponse {
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
/**
 * Request body for verifying a payment intent
 */
interface SMFVerifyRequest {
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
interface SMFVerifyResponse {
    /** Whether the payment intent is valid */
    valid: boolean;
    /** If invalid, explanation of why */
    reason?: string;
    /** Facilitator that will process this payment */
    facilitator: string;
    /** Estimated settlement time in milliseconds */
    estimated_settlement_ms: number;
}
/**
 * Request body for settling a batch
 */
interface SMFSettleRequest {
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
type SMFSettlementStatus = 'pending' | 'submitted' | 'confirmed' | 'failed';
/**
 * Response from settling a batch
 */
interface SMFSettleResponse {
    /** Current settlement status */
    status: SMFSettlementStatus;
    /** On-chain transaction hash (if submitted/confirmed) */
    transaction_hash?: string;
    /** ISO timestamp of settlement completion */
    settled_at?: string;
    /** Error message if settlement failed */
    error?: string;
}
/**
 * Health status values
 */
type HealthStatus = 'healthy' | 'degraded' | 'down';
/**
 * Response from health check
 */
interface SMFHealthResponse {
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
/**
 * Facilitator information
 */
interface SMFFacilitatorInfo {
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
/**
 * Rate limit information from response headers
 */
interface RateLimitInfo {
    /** Maximum requests allowed per time window */
    limit: number;
    /** Remaining requests in current window */
    remaining: number;
    /** When the rate limit resets */
    resetAt: Date;
}
/**
 * API error response shape
 */
interface SMFErrorResponse {
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
type SMFErrorCode = 'MISSING_API_KEY' | 'INVALID_API_KEY' | 'INVALID_REQUEST' | 'INVALID_AMOUNT' | 'INVALID_CHAIN_ID' | 'INVALID_TOKEN' | 'MALFORMED_PAYMENT' | 'RECIPIENT_MISMATCH' | 'BATCH_NOT_FOUND' | 'FACILITATOR_NOT_FOUND' | 'RATE_LIMITED' | 'TIMEOUT' | 'NETWORK_ERROR' | 'INTERNAL_ERROR';

/**
 * NexFlow Smart Meta-Facilitator SDK Client
 *
 * A zero-dependency client for interacting with NexFlow SMF API.
 * Handles authentication, idempotency, rate limiting, and error handling.
 *
 * @example
 * ```ts
 * import { NexFlowSMFClient } from '@nexflow/smf';
 *
 * const smf = new NexFlowSMFClient({
 *   baseUrl: 'https://api.nexflowapp.app',
 *   apiKey: process.env.NEXFLOW_API_KEY!,
 * });
 *
 * // Route a payment
 * const route = await smf.route({
 *   amount_wei: '1000000',
 *   token_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
 *   chain_id: 'eip155:8453',
 * });
 *
 * console.log(`Use facilitator: ${route.facilitator_id}`);
 * ```
 */
declare class NexFlowSMFClient {
    private readonly baseUrl;
    private readonly apiKey;
    private readonly timeoutMs;
    private readonly rateLimitThreshold;
    private readonly userAgent;
    private lastRateLimit;
    /**
     * Create a new NexFlow SMF client
     *
     * @param options - Client configuration options
     * @throws {NexFlowSMFError} If baseUrl or apiKey is missing
     */
    constructor(options: NexFlowSMFClientOptions);
    /**
     * Route a payment to the best available facilitator
     *
     * @param request - Route request parameters
     * @param options - Optional request options (idempotency key, custom headers)
     * @returns Route response with selected facilitator and fee estimate
     *
     * @example
     * ```ts
     * const route = await smf.route({
     *   amount_wei: '1000000',
     *   token_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
     *   chain_id: 'eip155:8453',
     *   payment_id: 'order-123',  // Optional: used as idempotency key
     * });
     * ```
     */
    route(request: SMFRouteRequest, options?: RequestOptions): Promise<SMFRouteResponse>;
    /**
     * Verify an x402 payment intent
     *
     * @param request - Verify request parameters
     * @param options - Optional request options
     * @returns Verification result
     *
     * @example
     * ```ts
     * const verification = await smf.verify({
     *   payment_intent: 'x402:1:base:0xabc...',
     *   recipient_address: '0xabcd1234...',
     * });
     *
     * if (verification.valid) {
     *   console.log(`Payment will be processed by ${verification.facilitator}`);
     * } else {
     *   console.error(`Invalid: ${verification.reason}`);
     * }
     * ```
     */
    verify(request: SMFVerifyRequest, options?: RequestOptions): Promise<SMFVerifyResponse>;
    /**
     * Settle a batch of payments
     *
     * @param request - Settle request parameters
     * @param options - Optional request options
     * @returns Settlement status and transaction hash (if completed)
     *
     * @example
     * ```ts
     * // Queue for next batch window
     * const settlement = await smf.settle({
     *   batch_id: 'batch-xyz',
     *   facilitator_id: 'cdp',
     * });
     *
     * // Force immediate settlement
     * const immediate = await smf.settle({
     *   batch_id: 'batch-xyz',
     *   facilitator_id: 'cdp',
     *   force: true,
     * });
     * ```
     */
    settle(request: SMFSettleRequest, options?: RequestOptions): Promise<SMFSettleResponse>;
    /**
     * Get SMF system health status
     *
     * @returns Health status of all facilitators
     *
     * @example
     * ```ts
     * const health = await smf.health();
     * console.log(`System status: ${health.status}`);
     * console.log(`Healthy facilitators: ${health.summary.healthy}/${health.summary.total}`);
     * ```
     */
    health(): Promise<SMFHealthResponse>;
    /**
     * Get list of available facilitators
     *
     * @returns Array of facilitator information
     *
     * @example
     * ```ts
     * const facilitators = await smf.facilitators();
     * for (const f of facilitators) {
     *   console.log(`${f.id}: ${f.label} (${f.status})`);
     * }
     * ```
     */
    facilitators(): Promise<SMFFacilitatorInfo[]>;
    /**
     * Get rate limit information from the last request
     *
     * @returns Rate limit info or null if no requests have been made
     *
     * @example
     * ```ts
     * await smf.route({ ... });
     * const rateLimit = smf.getRateLimit();
     * if (rateLimit) {
     *   console.log(`${rateLimit.remaining}/${rateLimit.limit} requests remaining`);
     *   console.log(`Resets at: ${rateLimit.resetAt}`);
     * }
     * ```
     */
    getRateLimit(): RateLimitInfo | null;
    /**
     * Check if we're approaching the rate limit
     *
     * @returns true if rate limit utilization exceeds threshold
     */
    isApproachingRateLimit(): boolean;
    /**
     * Internal: Execute HTTP request with error handling and rate limit tracking
     */
    private request;
    /**
     * Internal: Extract rate limit information from response headers
     */
    private extractRateLimit;
}

/**
 * Custom error class for NexFlow SMF SDK
 *
 * @example
 * ```ts
 * try {
 *   await smf.route({ ... });
 * } catch (error) {
 *   if (error instanceof NexFlowSMFError) {
 *     console.log(error.statusCode);  // 400, 401, 429, etc.
 *     console.log(error.code);        // 'INVALID_REQUEST', 'RATE_LIMITED', etc.
 *     console.log(error.details);     // Additional context from API
 *   }
 * }
 * ```
 */
declare class NexFlowSMFError extends Error {
    /** HTTP status code (if applicable) */
    readonly statusCode?: number;
    /** Error code for programmatic handling */
    readonly code?: SMFErrorCode | string;
    /** Additional error details from the API */
    readonly details?: unknown;
    /** Whether this error is retryable */
    readonly retryable: boolean;
    constructor(message: string, options?: {
        statusCode?: number;
        code?: SMFErrorCode | string;
        details?: unknown;
        retryable?: boolean;
    });
    /**
     * Create a human-readable string representation
     */
    toString(): string;
    /**
     * Convert to JSON-serializable object
     */
    toJSON(): Record<string, unknown>;
    /**
     * Create an error for missing required options
     */
    static missingOption(optionName: string): NexFlowSMFError;
    /**
     * Create an error from an HTTP response
     */
    static fromResponse(response: Response): Promise<NexFlowSMFError>;
    /**
     * Create a timeout error
     */
    static timeout(timeoutMs: number): NexFlowSMFError;
    /**
     * Create a network error
     */
    static networkError(originalError?: Error): NexFlowSMFError;
}

/**
 * Generate a unique idempotency key
 * Format: {timestamp}-{random}
 *
 * @example
 * generateIdempotencyKey() // "1735939200000-abc123xyz"
 */
declare function generateIdempotencyKey(): string;
/**
 * Validate CAIP-2 chain ID format
 *
 * @example
 * isValidChainId('eip155:8453')      // true (Base)
 * isValidChainId('eip155:1')         // true (Ethereum mainnet)
 * isValidChainId('solana:mainnet')   // true
 * isValidChainId('invalid')          // false
 */
declare function isValidChainId(chainId: string): boolean;
/**
 * Validate Ethereum address format
 *
 * @example
 * isValidAddress('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48') // true
 * isValidAddress('0xinvalid') // false
 */
declare function isValidAddress(address: string): boolean;
/**
 * Validate wei amount (must be positive integer string)
 *
 * @example
 * isValidWei('1000000')  // true
 * isValidWei('0')        // false (must be positive)
 * isValidWei('-100')     // false
 * isValidWei('1.5')      // false (no decimals)
 */
declare function isValidWei(wei: string): boolean;
/**
 * Validate token address (Ethereum format)
 * Alias for isValidAddress for semantic clarity
 */
declare function isValidTokenAddress(address: string): boolean;
/**
 * Validate payment intent format
 * Supports multiple x402 payment formats
 *
 * @example
 * isValidPaymentIntent('x402:1:base:0xabc...:1000000:USDC:sig') // true
 * isValidPaymentIntent('{"recipient":"0x...", ...}')            // true (JSON)
 * isValidPaymentIntent('eyJ...')                                 // true (base64)
 */
declare function isValidPaymentIntent(paymentIntent: string): boolean;

export { type HealthStatus, NexFlowSMFClient, type NexFlowSMFClientOptions, NexFlowSMFError, type RateLimitInfo, type RequestOptions, type SMFErrorCode, type SMFErrorResponse, type SMFFacilitatorInfo, type SMFHealthResponse, type SMFRouteRequest, type SMFRouteResponse, type SMFSettleRequest, type SMFSettleResponse, type SMFSettlementStatus, type SMFVerifyRequest, type SMFVerifyResponse, generateIdempotencyKey, isValidAddress, isValidChainId, isValidPaymentIntent, isValidTokenAddress, isValidWei };
