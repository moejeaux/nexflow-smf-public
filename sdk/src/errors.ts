// =============================================================================
// @nexflow/smf SDK Errors
// =============================================================================
// Custom error class for SDK operations
// Provides structured error information with HTTP status codes and error codes

import type { SMFErrorCode } from './types';

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
export class NexFlowSMFError extends Error {
  /** HTTP status code (if applicable) */
  public readonly statusCode?: number;
  
  /** Error code for programmatic handling */
  public readonly code?: SMFErrorCode | string;
  
  /** Additional error details from the API */
  public readonly details?: unknown;
  
  /** Whether this error is retryable */
  public readonly retryable: boolean;

  constructor(
    message: string,
    options?: {
      statusCode?: number;
      code?: SMFErrorCode | string;
      details?: unknown;
      retryable?: boolean;
    }
  ) {
    super(message);
    
    this.name = 'NexFlowSMFError';
    this.statusCode = options?.statusCode;
    this.code = options?.code;
    this.details = options?.details;
    
    // Determine if error is retryable based on status code or explicit flag
    if (options?.retryable !== undefined) {
      this.retryable = options.retryable;
    } else if (this.statusCode) {
      // 429 (rate limited) and 5xx errors are typically retryable
      this.retryable = this.statusCode === 429 || this.statusCode >= 500;
    } else if (this.code === 'TIMEOUT' || this.code === 'NETWORK_ERROR') {
      this.retryable = true;
    } else {
      this.retryable = false;
    }

    // Maintain proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, NexFlowSMFError.prototype);
    
    // Capture stack trace (V8 engines only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NexFlowSMFError);
    }
  }

  /**
   * Create a human-readable string representation
   */
  toString(): string {
    let str = `NexFlowSMFError: ${this.message}`;
    if (this.code) str += ` [${this.code}]`;
    if (this.statusCode) str += ` (HTTP ${this.statusCode})`;
    return str;
  }

  /**
   * Convert to JSON-serializable object
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
      retryable: this.retryable,
    };
  }

  /**
   * Create an error for missing required options
   */
  static missingOption(optionName: string): NexFlowSMFError {
    return new NexFlowSMFError(`${optionName} is required`, {
      code: 'INVALID_REQUEST',
      retryable: false,
    });
  }

  /**
   * Create an error from an HTTP response
   */
  static async fromResponse(response: Response): Promise<NexFlowSMFError> {
    let errorBody: { error?: string; message?: string; details?: unknown } = {};
    
    try {
      errorBody = await response.json();
    } catch {
      // Response body is not JSON
    }

    const message = errorBody.message || errorBody.error || `HTTP ${response.status}`;
    const code = errorBody.error || `HTTP_${response.status}`;

    return new NexFlowSMFError(message, {
      statusCode: response.status,
      code,
      details: errorBody.details || errorBody,
    });
  }

  /**
   * Create a timeout error
   */
  static timeout(timeoutMs: number): NexFlowSMFError {
    return new NexFlowSMFError(`Request timeout after ${timeoutMs}ms`, {
      code: 'TIMEOUT',
      retryable: true,
    });
  }

  /**
   * Create a network error
   */
  static networkError(originalError?: Error): NexFlowSMFError {
    return new NexFlowSMFError(
      originalError?.message || 'Network request failed',
      {
        code: 'NETWORK_ERROR',
        details: originalError?.message,
        retryable: true,
      }
    );
  }
}

