// =============================================================================
// @nexflow/smf SDK Utilities
// =============================================================================
// Validation and helper functions for the SDK
// Zero dependencies - uses only native JavaScript

/**
 * Generate a unique idempotency key
 * Format: {timestamp}-{random}
 * 
 * @example
 * generateIdempotencyKey() // "1735939200000-abc123xyz"
 */
export function generateIdempotencyKey(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `${timestamp}-${random}`;
}

/**
 * Validate CAIP-2 chain ID format
 * 
 * @example
 * isValidChainId('eip155:8453')      // true (Base)
 * isValidChainId('eip155:1')         // true (Ethereum mainnet)
 * isValidChainId('solana:mainnet')   // true
 * isValidChainId('invalid')          // false
 */
export function isValidChainId(chainId: string): boolean {
  if (!chainId || typeof chainId !== 'string') return false;
  
  // CAIP-2 format: namespace:reference
  // Common formats:
  // - eip155:1 (Ethereum mainnet)
  // - eip155:8453 (Base)
  // - eip155:137 (Polygon)
  // - solana:mainnet
  // - solana:devnet
  return /^[a-z0-9]+:[a-z0-9-]+$/i.test(chainId);
}

/**
 * Validate Ethereum address format
 * 
 * @example
 * isValidAddress('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48') // true
 * isValidAddress('0xinvalid') // false
 */
export function isValidAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false;
  
  // Ethereum address: 0x followed by 40 hex characters
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate wei amount (must be positive integer string)
 * 
 * @example
 * isValidWei('1000000')  // true
 * isValidWei('0')        // false (must be positive)
 * isValidWei('-100')     // false
 * isValidWei('1.5')      // false (no decimals)
 */
export function isValidWei(wei: string): boolean {
  if (!wei || typeof wei !== 'string') return false;
  
  // Must be a valid positive integer
  if (!/^[0-9]+$/.test(wei)) return false;
  
  try {
    const num = BigInt(wei);
    return num > 0n;
  } catch {
    return false;
  }
}

/**
 * Validate token address (Ethereum format)
 * Alias for isValidAddress for semantic clarity
 */
export function isValidTokenAddress(address: string): boolean {
  return isValidAddress(address);
}

/**
 * Validate payment intent format
 * Supports multiple x402 payment formats
 * 
 * @example
 * isValidPaymentIntent('x402:1:base:0xabc...:1000000:USDC:sig') // true
 * isValidPaymentIntent('{"recipient":"0x...", ...}')            // true (JSON)
 * isValidPaymentIntent('eyJ...')                                 // true (base64)
 */
export function isValidPaymentIntent(paymentIntent: string): boolean {
  if (!paymentIntent || typeof paymentIntent !== 'string') return false;
  
  // x402: prefix format
  if (paymentIntent.startsWith('x402:')) {
    const parts = paymentIntent.split(':');
    return parts.length >= 5;
  }
  
  // JSON format
  if (paymentIntent.startsWith('{')) {
    try {
      JSON.parse(paymentIntent);
      return true;
    } catch {
      return false;
    }
  }
  
  // Base64 encoded format
  if (/^[A-Za-z0-9+/=]+$/.test(paymentIntent) && paymentIntent.length > 10) {
    try {
      const decoded = atob(paymentIntent);
      // Should be valid JSON when decoded
      JSON.parse(decoded);
      return true;
    } catch {
      return false;
    }
  }
  
  return false;
}

/**
 * Normalize a URL by removing trailing slash
 */
export function normalizeUrl(url: string): string {
  if (!url) return '';
  return url.replace(/\/+$/, '');
}

/**
 * Sleep for a given duration
 * Useful for retry logic
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Calculate exponential backoff delay
 * 
 * @param attempt - Current attempt number (0-indexed)
 * @param baseDelayMs - Base delay in milliseconds (default: 1000)
 * @param maxDelayMs - Maximum delay in milliseconds (default: 30000)
 */
export function calculateBackoff(
  attempt: number,
  baseDelayMs: number = 1000,
  maxDelayMs: number = 30000
): number {
  const delay = baseDelayMs * Math.pow(2, attempt);
  // Add jitter (±10%)
  const jitter = delay * 0.1 * (Math.random() * 2 - 1);
  return Math.min(delay + jitter, maxDelayMs);
}

