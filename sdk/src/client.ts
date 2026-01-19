// =============================================================================
// @nexflow-smf/smf SDK Client
// =============================================================================
// Main client class for interacting with NexFlow SMF API
// Zero runtime dependencies - uses native fetch API

import type {
  NexFlowSMFClientOptions,
  RequestOptions,
  SMFRouteRequest,
  SMFRouteResponse,
  SMFVerifyRequest,
  SMFVerifyResponse,
  SMFSettleRequest,
  SMFSettleResponse,
  SMFHealthResponse,
  SMFFacilitatorInfo,
  RateLimitInfo,
} from './types';
import { NexFlowSMFError } from './errors';
import { generateIdempotencyKey, normalizeUrl } from './utils';

/**
 * NexFlow Smart Meta-Facilitator SDK Client
 * 
 * A zero-dependency client for interacting with NexFlow SMF API.
 * Handles authentication, idempotency, rate limiting, and error handling.
 * 
 * @example
 * ```ts
 * import { NexFlowSMFClient } from '@nexflow-smf/smf';
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
export class NexFlowSMFClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeoutMs: number;
  private readonly rateLimitThreshold: number;
  private readonly userAgent: string;
  private lastRateLimit: RateLimitInfo | null = null;

  /**
   * Create a new NexFlow SMF client
   * 
   * @param options - Client configuration options
   * @throws {NexFlowSMFError} If baseUrl or apiKey is missing
   */
  constructor(options: NexFlowSMFClientOptions) {
    if (!options.baseUrl) {
      throw NexFlowSMFError.missingOption('baseUrl');
    }
    if (!options.apiKey) {
      throw NexFlowSMFError.missingOption('apiKey');
    }

    this.baseUrl = normalizeUrl(options.baseUrl);
    this.apiKey = options.apiKey;
    this.timeoutMs = options.timeoutMs ?? 30000;
    this.rateLimitThreshold = options.rateLimitThreshold ?? 0.8;
    this.userAgent = options.userAgent ?? 'NexFlowSMF/1.0';
  }

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
  async route(
    request: SMFRouteRequest,
    options?: RequestOptions
  ): Promise<SMFRouteResponse> {
    // Use payment_id as idempotency key if not explicitly provided
    const idempotencyKey = options?.idempotencyKey 
      ?? request.payment_id 
      ?? generateIdempotencyKey();

    return this.request<SMFRouteResponse>(
      'POST',
      '/api/v1/smf/route',
      request,
      { ...options, idempotencyKey }
    );
  }

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
  async verify(
    request: SMFVerifyRequest,
    options?: RequestOptions
  ): Promise<SMFVerifyResponse> {
    return this.request<SMFVerifyResponse>(
      'POST',
      '/api/v1/smf/verify',
      request,
      options
    );
  }

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
  async settle(
    request: SMFSettleRequest,
    options?: RequestOptions
  ): Promise<SMFSettleResponse> {
    return this.request<SMFSettleResponse>(
      'POST',
      '/api/v1/smf/settle',
      request,
      options
    );
  }

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
  async health(): Promise<SMFHealthResponse> {
    return this.request<SMFHealthResponse>(
      'GET',
      '/api/v1/smf/health'
    );
  }

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
  async facilitators(): Promise<SMFFacilitatorInfo[]> {
    return this.request<SMFFacilitatorInfo[]>(
      'GET',
      '/api/v1/smf/facilitators'
    );
  }

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
  getRateLimit(): RateLimitInfo | null {
    return this.lastRateLimit ? { ...this.lastRateLimit } : null;
  }

  /**
   * Check if we're approaching the rate limit
   * 
   * @returns true if rate limit utilization exceeds threshold
   */
  isApproachingRateLimit(): boolean {
    if (!this.lastRateLimit) return false;
    const utilization = 1 - (this.lastRateLimit.remaining / this.lastRateLimit.limit);
    return utilization >= this.rateLimitThreshold;
  }

  /**
   * Internal: Execute HTTP request with error handling and rate limit tracking
   */
  private async request<T>(
    method: 'GET' | 'POST',
    path: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const timeout = options?.timeoutMs ?? this.timeoutMs;

    // Build headers
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': this.userAgent,
      'Accept': 'application/json',
      ...options?.headers,
    };

    // Add idempotency key for POST requests
    if (method === 'POST' && options?.idempotencyKey) {
      headers['idempotency-key'] = options.idempotencyKey;
    }

    // Setup abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      // Extract rate limit info from headers
      this.extractRateLimit(response.headers);

      // Handle non-2xx responses
      if (!response.ok) {
        throw await NexFlowSMFError.fromResponse(response);
      }

      // Log warning if approaching rate limit
      if (this.isApproachingRateLimit() && this.lastRateLimit) {
        console.warn(
          `[NexFlow SMF] Approaching rate limit: ${this.lastRateLimit.remaining}/${this.lastRateLimit.limit} requests remaining`
        );
      }

      // Parse and return response
      const data = await response.json();
      return data as T;
    } catch (error) {
      // Re-throw NexFlowSMFError as-is
      if (error instanceof NexFlowSMFError) {
        throw error;
      }

      // Handle abort (timeout)
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw NexFlowSMFError.timeout(timeout);
      }

      // Handle network errors
      if (error instanceof TypeError) {
        throw NexFlowSMFError.networkError(error);
      }

      // Handle unknown errors
      throw new NexFlowSMFError(
        error instanceof Error ? error.message : 'Unknown error',
        {
          code: 'INTERNAL_ERROR',
          details: error,
        }
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Internal: Extract rate limit information from response headers
   */
  private extractRateLimit(headers: Headers): void {
    const limit = headers.get('x-ratelimit-limit');
    const remaining = headers.get('x-ratelimit-remaining');
    const reset = headers.get('x-ratelimit-reset');

    if (limit && remaining && reset) {
      this.lastRateLimit = {
        limit: parseInt(limit, 10),
        remaining: parseInt(remaining, 10),
        resetAt: new Date(parseInt(reset, 10) * 1000),
      };
    }
  }
}

