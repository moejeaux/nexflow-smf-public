// src/errors.ts
var NexFlowSMFError = class _NexFlowSMFError extends Error {
  constructor(message, options) {
    super(message);
    this.name = "NexFlowSMFError";
    this.statusCode = options?.statusCode;
    this.code = options?.code;
    this.details = options?.details;
    if (options?.retryable !== void 0) {
      this.retryable = options.retryable;
    } else if (this.statusCode) {
      this.retryable = this.statusCode === 429 || this.statusCode >= 500;
    } else if (this.code === "TIMEOUT" || this.code === "NETWORK_ERROR") {
      this.retryable = true;
    } else {
      this.retryable = false;
    }
    Object.setPrototypeOf(this, _NexFlowSMFError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, _NexFlowSMFError);
    }
  }
  /**
   * Create a human-readable string representation
   */
  toString() {
    let str = `NexFlowSMFError: ${this.message}`;
    if (this.code) str += ` [${this.code}]`;
    if (this.statusCode) str += ` (HTTP ${this.statusCode})`;
    return str;
  }
  /**
   * Convert to JSON-serializable object
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
      retryable: this.retryable
    };
  }
  /**
   * Create an error for missing required options
   */
  static missingOption(optionName) {
    return new _NexFlowSMFError(`${optionName} is required`, {
      code: "INVALID_REQUEST",
      retryable: false
    });
  }
  /**
   * Create an error from an HTTP response
   */
  static async fromResponse(response) {
    let errorBody = {};
    try {
      errorBody = await response.json();
    } catch {
    }
    const message = errorBody.message || errorBody.error || `HTTP ${response.status}`;
    const code = errorBody.error || `HTTP_${response.status}`;
    return new _NexFlowSMFError(message, {
      statusCode: response.status,
      code,
      details: errorBody.details || errorBody
    });
  }
  /**
   * Create a timeout error
   */
  static timeout(timeoutMs) {
    return new _NexFlowSMFError(`Request timeout after ${timeoutMs}ms`, {
      code: "TIMEOUT",
      retryable: true
    });
  }
  /**
   * Create a network error
   */
  static networkError(originalError) {
    return new _NexFlowSMFError(
      originalError?.message || "Network request failed",
      {
        code: "NETWORK_ERROR",
        details: originalError?.message,
        retryable: true
      }
    );
  }
};

// src/utils.ts
function generateIdempotencyKey() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `${timestamp}-${random}`;
}
function isValidChainId(chainId) {
  if (!chainId || typeof chainId !== "string") return false;
  return /^[a-z0-9]+:[a-z0-9-]+$/i.test(chainId);
}
function isValidAddress(address) {
  if (!address || typeof address !== "string") return false;
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
function isValidWei(wei) {
  if (!wei || typeof wei !== "string") return false;
  if (!/^[0-9]+$/.test(wei)) return false;
  try {
    const num = BigInt(wei);
    return num > 0n;
  } catch {
    return false;
  }
}
function isValidTokenAddress(address) {
  return isValidAddress(address);
}
function isValidPaymentIntent(paymentIntent) {
  if (!paymentIntent || typeof paymentIntent !== "string") return false;
  if (paymentIntent.startsWith("x402:")) {
    const parts = paymentIntent.split(":");
    return parts.length >= 5;
  }
  if (paymentIntent.startsWith("{")) {
    try {
      JSON.parse(paymentIntent);
      return true;
    } catch {
      return false;
    }
  }
  if (/^[A-Za-z0-9+/=]+$/.test(paymentIntent) && paymentIntent.length > 10) {
    try {
      const decoded = atob(paymentIntent);
      JSON.parse(decoded);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}
function normalizeUrl(url) {
  if (!url) return "";
  return url.replace(/\/+$/, "");
}

// src/client.ts
var NexFlowSMFClient = class {
  /**
   * Create a new NexFlow SMF client
   * 
   * @param options - Client configuration options
   * @throws {NexFlowSMFError} If baseUrl or apiKey is missing
   */
  constructor(options) {
    this.lastRateLimit = null;
    if (!options.baseUrl) {
      throw NexFlowSMFError.missingOption("baseUrl");
    }
    if (!options.apiKey) {
      throw NexFlowSMFError.missingOption("apiKey");
    }
    this.baseUrl = normalizeUrl(options.baseUrl);
    this.apiKey = options.apiKey;
    this.timeoutMs = options.timeoutMs ?? 3e4;
    this.rateLimitThreshold = options.rateLimitThreshold ?? 0.8;
    this.userAgent = options.userAgent ?? "NexFlowSMF/1.0";
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
  async route(request, options) {
    const idempotencyKey = options?.idempotencyKey ?? request.payment_id ?? generateIdempotencyKey();
    return this.request(
      "POST",
      "/api/v1/smf/route",
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
  async verify(request, options) {
    return this.request(
      "POST",
      "/api/v1/smf/verify",
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
  async settle(request, options) {
    return this.request(
      "POST",
      "/api/v1/smf/settle",
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
  async health() {
    return this.request(
      "GET",
      "/api/v1/smf/health"
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
  async facilitators() {
    return this.request(
      "GET",
      "/api/v1/smf/facilitators"
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
  getRateLimit() {
    return this.lastRateLimit ? { ...this.lastRateLimit } : null;
  }
  /**
   * Check if we're approaching the rate limit
   * 
   * @returns true if rate limit utilization exceeds threshold
   */
  isApproachingRateLimit() {
    if (!this.lastRateLimit) return false;
    const utilization = 1 - this.lastRateLimit.remaining / this.lastRateLimit.limit;
    return utilization >= this.rateLimitThreshold;
  }
  /**
   * Internal: Execute HTTP request with error handling and rate limit tracking
   */
  async request(method, path, body, options) {
    const url = `${this.baseUrl}${path}`;
    const timeout = options?.timeoutMs ?? this.timeoutMs;
    const headers = {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": this.userAgent,
      "Accept": "application/json",
      ...options?.headers
    };
    if (method === "POST" && options?.idempotencyKey) {
      headers["idempotency-key"] = options.idempotencyKey;
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : void 0,
        signal: controller.signal
      });
      this.extractRateLimit(response.headers);
      if (!response.ok) {
        throw await NexFlowSMFError.fromResponse(response);
      }
      if (this.isApproachingRateLimit() && this.lastRateLimit) {
        console.warn(
          `[NexFlow SMF] Approaching rate limit: ${this.lastRateLimit.remaining}/${this.lastRateLimit.limit} requests remaining`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof NexFlowSMFError) {
        throw error;
      }
      if (error instanceof DOMException && error.name === "AbortError") {
        throw NexFlowSMFError.timeout(timeout);
      }
      if (error instanceof TypeError) {
        throw NexFlowSMFError.networkError(error);
      }
      throw new NexFlowSMFError(
        error instanceof Error ? error.message : "Unknown error",
        {
          code: "INTERNAL_ERROR",
          details: error
        }
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }
  /**
   * Internal: Extract rate limit information from response headers
   */
  extractRateLimit(headers) {
    const limit = headers.get("x-ratelimit-limit");
    const remaining = headers.get("x-ratelimit-remaining");
    const reset = headers.get("x-ratelimit-reset");
    if (limit && remaining && reset) {
      this.lastRateLimit = {
        limit: parseInt(limit, 10),
        remaining: parseInt(remaining, 10),
        resetAt: new Date(parseInt(reset, 10) * 1e3)
      };
    }
  }
};
export {
  NexFlowSMFClient,
  NexFlowSMFError,
  generateIdempotencyKey,
  isValidAddress,
  isValidChainId,
  isValidPaymentIntent,
  isValidTokenAddress,
  isValidWei
};
