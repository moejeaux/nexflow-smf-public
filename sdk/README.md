# @nexflow/smf

Zero-dependency SDK for **NexFlow Smart Meta-Facilitator (SMF)**.

Route x402 payments to the best facilitator, verify payment intents, and settle batches—all with a single line of code.

## Features

- ✅ **Zero runtime dependencies** — uses native `fetch`
- ✅ **Full TypeScript support** — complete type definitions
- ✅ **Idempotency built-in** — safe retries on network failures
- ✅ **Rate limit awareness** — exposes remaining quota after each request
- ✅ **Error handling** — structured errors with status codes and retry hints
- ✅ **Tree-shakeable** — ESM and CJS builds

## Installation

```bash
npm install @nexflow/smf
# or
yarn add @nexflow/smf
# or
pnpm add @nexflow/smf
```

## Quick Start

```typescript
import { NexFlowSMFClient } from '@nexflow/smf';

const smf = new NexFlowSMFClient({
  baseUrl: 'https://api.nexflowapp.app',
  apiKey: process.env.NEXFLOW_API_KEY!,
});

// Route a payment to the best facilitator
const route = await smf.route({
  amount_wei: '1000000',
  token_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',  // USDC
  chain_id: 'eip155:8453',  // Base
  payment_id: 'order-12345',  // Idempotency key
});

console.log(`Facilitator: ${route.facilitator_id}`);
console.log(`Platform fee: ${route.expected_fee_wei} wei`);
console.log(`Confidence: ${route.confidence}`);
console.log(`Quote expires: ${route.quote_expires_at}`);
```

## API Reference

### `new NexFlowSMFClient(options)`

Create a new client instance.

```typescript
const smf = new NexFlowSMFClient({
  baseUrl: 'https://api.nexflowapp.app',  // Required
  apiKey: 'nf_live_xxx',                   // Required
  timeoutMs: 30000,                        // Optional (default: 30s)
  rateLimitThreshold: 0.8,                 // Optional (default: 0.8)
});
```

### `smf.route(request, options?)`

Route a payment to the best available facilitator.

```typescript
const route = await smf.route({
  amount_wei: '1000000',
  token_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  chain_id: 'eip155:8453',
  recipient: '0xabcd...',       // Optional
  payment_id: 'order-123',      // Optional (also used as idempotency key)
  metadata: { orderId: 123 },   // Optional
});

// Response
{
  facilitator_id: 'cdp',
  path: 'scored',
  expected_fee_wei: '2500',        // 0.25% platform fee
  estimated_latency_ms: 150,
  confidence: 0.95,
  quote_expires_at: '2026-01-03T...',
  quote_id: 'order-123',
}
```

### `smf.verify(request, options?)`

Verify an x402 payment intent.

```typescript
const verification = await smf.verify({
  payment_intent: 'x402:1:base:0xabc...:1000000:USDC:sig',
  recipient_address: '0xabcd...',
  amount_wei: '1000000',           // Optional
  facilitator_id: 'cdp',           // Optional hint
});

// Response
{
  valid: true,
  facilitator: 'cdp',
  estimated_settlement_ms: 500,
}

// Or if invalid
{
  valid: false,
  reason: 'Recipient mismatch: expected 0x..., got 0x...',
  facilitator: 'none',
  estimated_settlement_ms: 0,
}
```

### `smf.settle(request, options?)`

Settle a batch of payments.

```typescript
// Queue for next batch window
const settlement = await smf.settle({
  batch_id: 'batch-xyz',
  facilitator_id: 'cdp',
});

// Force immediate settlement
const immediate = await smf.settle({
  batch_id: 'batch-xyz',
  facilitator_id: 'cdp',
  force: true,
});

// Response
{
  status: 'submitted',            // 'pending' | 'submitted' | 'confirmed' | 'failed'
  transaction_hash: '0xabc...',   // When submitted/confirmed
  settled_at: '2026-01-03T...',   // When confirmed
  error: 'Insufficient funds',    // When failed
}
```

### `smf.health()`

Get system health status.

```typescript
const health = await smf.health();

// Response
{
  status: 'healthy',  // 'healthy' | 'degraded' | 'down'
  summary: { total: 5, healthy: 4, degraded: 1, down: 0 },
  facilitators: [
    {
      facilitatorId: 'cdp',
      name: 'Coinbase Developer Platform',
      status: 'healthy',
      metrics: { successRate: 0.99, p95LatencyMs: 150, ... },
    },
    // ...
  ],
  timestamp: '2026-01-03T...',
}
```

### `smf.facilitators()`

Get list of available facilitators.

```typescript
const facilitators = await smf.facilitators();

// Response
[
  {
    id: 'cdp',
    label: 'Coinbase Developer Platform',
    url: 'https://cdp.coinbase.com',
    supportedNetworks: ['base', 'ethereum'],
    tokens: ['USDC', 'ETH'],
    priority: 1,
    feeBps: 25,
    enabled: true,
    status: 'healthy',
  },
  // ...
]
```

### `smf.getRateLimit()`

Get rate limit information from the last request.

```typescript
await smf.route({ ... });
const rateLimit = smf.getRateLimit();

if (rateLimit) {
  console.log(`${rateLimit.remaining}/${rateLimit.limit} requests remaining`);
  console.log(`Resets at: ${rateLimit.resetAt}`);
}
```

## Error Handling

All errors are wrapped in `NexFlowSMFError` with structured information.

```typescript
import { NexFlowSMFClient, NexFlowSMFError } from '@nexflow/smf';

try {
  await smf.route({ ... });
} catch (error) {
  if (error instanceof NexFlowSMFError) {
    console.log(error.statusCode);  // 400, 401, 429, 500, etc.
    console.log(error.code);        // 'INVALID_REQUEST', 'RATE_LIMITED', etc.
    console.log(error.message);     // Human-readable message
    console.log(error.details);     // Additional context from API
    console.log(error.retryable);   // true for 429, 5xx, timeout, network errors

    if (error.retryable) {
      // Implement retry logic
    }
  }
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `MISSING_API_KEY` | Authorization header not provided |
| `INVALID_API_KEY` | API key is invalid or expired |
| `INVALID_REQUEST` | Request body validation failed |
| `INVALID_AMOUNT` | Amount must be a positive integer string |
| `INVALID_CHAIN_ID` | Chain ID format is invalid |
| `MALFORMED_PAYMENT` | Payment intent cannot be parsed |
| `RECIPIENT_MISMATCH` | Recipient doesn't match payment intent |
| `BATCH_NOT_FOUND` | Batch ID doesn't exist |
| `RATE_LIMITED` | Rate limit exceeded (retryable) |
| `TIMEOUT` | Request timed out (retryable) |
| `NETWORK_ERROR` | Network request failed (retryable) |
| `INTERNAL_ERROR` | Server error (retryable) |

## Idempotency

All POST requests use idempotency keys to prevent accidental duplicate operations.

```typescript
// Auto-generated idempotency key
const route1 = await smf.route({
  amount_wei: '1000000',
  token_address: '0xabc...',
  chain_id: 'eip155:8453',
});

// Use payment_id as idempotency key
const route2 = await smf.route({
  amount_wei: '1000000',
  token_address: '0xabc...',
  chain_id: 'eip155:8453',
  payment_id: 'order-123',  // Will be used as idempotency key
});

// Explicit idempotency key
const route3 = await smf.route(
  { amount_wei: '1000000', token_address: '0xabc...', chain_id: 'eip155:8453' },
  { idempotencyKey: 'my-custom-key' }
);
```

Idempotency keys are cached server-side for 5 minutes. Retrying with the same key within that window returns the cached response.

## Rate Limiting

The SDK exposes rate limit information after each request.

```typescript
// Check rate limit after request
const route = await smf.route({ ... });
const rateLimit = smf.getRateLimit();

// Check if approaching limit
if (smf.isApproachingRateLimit()) {
  console.warn('Consider slowing down requests');
}
```

The SDK automatically logs a warning when utilization exceeds 80% (configurable via `rateLimitThreshold`).

## Validation Utilities

The SDK exports validation helpers for input validation.

```typescript
import {
  isValidChainId,
  isValidAddress,
  isValidWei,
  isValidPaymentIntent,
  generateIdempotencyKey,
} from '@nexflow/smf';

isValidChainId('eip155:8453');     // true
isValidAddress('0xabc...');        // true
isValidWei('1000000');             // true
isValidPaymentIntent('x402:...');  // true

const key = generateIdempotencyKey();  // '1735939200000-abc123xyz'
```

## TypeScript

Full type definitions are included. Import types as needed:

```typescript
import type {
  SMFRouteRequest,
  SMFRouteResponse,
  SMFVerifyRequest,
  SMFVerifyResponse,
  SMFSettleRequest,
  SMFSettleResponse,
  SMFHealthResponse,
  SMFFacilitatorInfo,
  RateLimitInfo,
  SMFErrorCode,
} from '@nexflow/smf';
```

## Requirements

- Node.js 18+ (uses native `fetch`)
- Or any environment with `fetch` support (browsers, Deno, Bun, etc.)

## License

MIT © NexFlow

