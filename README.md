# NexFlow Smart Meta-Facilitator (SMF)

> **The x402-native metered billing and routing brain for AI agents and SaaS APIs on Base.**

NexFlow SMF routes, verifies, and settles x402 micropayments on Base. It acts as an intelligent intermediary between payers and facilitators, selecting the optimal route based on cost, latency, and reliability. This repository contains the on-chain settlement contracts, TypeScript SDK, agent manifest specification, and integration examples.

---

## Services Overview

NexFlow provides five production services for the x402 ecosystem:

| Service | Description | Status |
|---------|-------------|--------|
| **Smart Meta-Facilitator** | Intelligent payment routing, verification, and batch settlement | Live |
| **CloudFront Edge Gating** | Lambda@Edge adapter for pay-per-request access via CloudFront | Live |
| **Agent Manifest & Discovery** | Machine-readable capability manifest for AI agent integration | Live |
| **Pulse Scheduler** | Metered job scheduling with x402 billing (cron, webhooks, tasks) | Live |
| **Action Catalog** | Pre-built metered actions (Shopify, Salesforce, data enrichment) | Live |

---

## What's in This Repo

| Component | Description |
|-----------|-------------|
| `contracts/` | Solidity contracts for atomic batch settlement with Merkle proof verification |
| `sdk/` | Zero-dependency TypeScript SDK (`@nexflow-smf/smf`) for routing, verification, and settlement |
| `examples/` | Ready-to-run examples demonstrating common integration patterns |
| `AGENT_MANIFEST_V1.md` | Agent Manifest specification for machine-to-machine discovery |

---

## Base Mainnet Contracts

| Contract | Address | Explorer |
|----------|---------|----------|
| **AtomicBatchSettlement** | `0x43A04228152115fDd5663B2Aa559Ebd84D17A49D` | [BaseScan](https://basescan.org/address/0x43A04228152115fDd5663B2Aa559Ebd84D17A49D) |
| **USDC** | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` | [BaseScan](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913) |

---

## Quickstart

### 1. Install the SDK

```bash
npm install @nexflow-smf/smf
```

### 2. Initialize the Client

```typescript
import { NexFlowSMFClient } from '@nexflow-smf/smf';

const smf = new NexFlowSMFClient({
  baseUrl: 'https://api.nexflowapp.app',
  apiKey: process.env.NEXFLOW_API_KEY!,
});
```

### 3. Route a Payment

```typescript
const route = await smf.route({
  amount_wei: '1000000',  // 1 USDC (6 decimals)
  token_address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  chain_id: 'eip155:8453',
  payment_id: 'order-123',
});

console.log(`Facilitator: ${route.facilitator_id}`);
console.log(`Fee: ${route.expected_fee_wei} wei`);
console.log(`Expires: ${route.quote_expires_at}`);
```

### 4. Verify an x402 Payment

```typescript
const result = await smf.verify({
  payment_intent: 'x402:1:base:0xabc...',
  recipient_address: '0xYourAddress...',
});

if (result.valid) {
  console.log(`Payment valid, settled by ${result.facilitator}`);
} else {
  console.log(`Invalid: ${result.reason}`);
}
```

### 5. Trigger Batch Settlement

```typescript
const settlement = await smf.settle({
  batch_id: 'batch-xyz',
  facilitator_id: 'cdp',
  force: true,
});

console.log(`Status: ${settlement.status}`);
console.log(`Tx: https://basescan.org/tx/${settlement.transaction_hash}`);
```

### 6. Check System Health

```typescript
const health = await smf.health();
console.log(`Status: ${health.status}`);
console.log(`Facilitators: ${health.summary.healthy}/${health.summary.total}`);

const facilitators = await smf.facilitators();
for (const f of facilitators) {
  console.log(`  ${f.id}: ${f.label} - ${f.status}`);
}
```

---

## API Endpoints

**Base URL:** `https://api.nexflowapp.app`

### SMF Core

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `POST` | `/api/v1/smf/route` | Route a payment to the optimal facilitator | API key |
| `POST` | `/api/v1/smf/verify` | Verify an x402 payment intent | API key |
| `POST` | `/api/v1/smf/settle` | Trigger batch settlement on-chain | API key |
| `GET` | `/api/v1/smf/health` | System health and facilitator status | Public |
| `GET` | `/api/v1/smf/facilitators` | List available facilitators | Public |

### Agent Discovery

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `GET` | `/.well-known/agent-manifest` | Standard agent manifest discovery | Public |
| `GET` | `/api/agent/manifest` | Primary manifest endpoint | Public |
| `POST` | `/api/agent/discover-actions` | Search paid actions by natural language intent | Public |
| `GET` | `/api/agent/discover-actions` | List all available paid actions | Public |

### x402 Payment Routing

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `POST` | `/api/v1/x402/route` | Route and construct x402 payment header | API key |
| `POST` | `/api/v1/x402/health` | Pre-flight probe of an x402 endpoint | Public |
| `POST` | `/api/v1/run` | Execute a metered action from the catalog | API key |

---

## CloudFront Edge Gating (Lambda@Edge)

NexFlow provides a Lambda@Edge adapter that gates CloudFront paths behind x402 payment verification. Any request to a protected path must include a valid `x402-payment` header — otherwise the client receives a `402 Payment Required` response with payment instructions.

### How It Works

1. Client sends request to a CloudFront distribution
2. Lambda@Edge (viewer-request) intercepts and calls NexFlow's facilitator verify endpoint
3. NexFlow verifies the `x402-payment` header and settles on-chain via EIP-3009
4. If valid: request forwards to origin
5. If missing/invalid: client receives `402` with a payment requirement including amount, token, and EIP-712 signing details

### Payment Requirement Response

```json
{
  "status": "payment_required",
  "requirement": {
    "scheme": "exact",
    "network": "eip155:8453",
    "asset": "USDC",
    "tokenAddress": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "amountDisplay": "0.010000",
    "payTo": "0x...",
    "facilitator": "nexflow-smf",
    "eip712": { "name": "USD Coin", "version": "2" }
  }
}
```

### Key Features

- **Zero NexFlow coupling** — standalone adapter, HTTP API calls only
- **Fail closed** — verification errors block access (never grants free access)
- **Idempotency safe** — handles CloudFront retries gracefully
- **On-chain settlement** — EIP-3009 authorization during verify (no separate settle call)
- **Structured logging** — JSON logs to CloudWatch for observability

---

## Agent Manifest

NexFlow exposes an [Agent Manifest v1](./AGENT_MANIFEST_V1.md) for machine-to-machine discovery. AI agents can programmatically discover NexFlow's capabilities and invoke them.

### Capabilities

| Capability | Description | Pricing |
|------------|-------------|---------|
| `nexflow.route_payment` | Route x402 payments with facilitator selection | 0.1-0.5% surcharge |
| `nexflow.run_metered_action` | Execute pre-built actions from the catalog | Per-unit (0.001-0.10 USDC) |
| `nexflow.healthcheck_x402_endpoint` | Pre-flight verification of x402 endpoints | Free |
| `nexflow.discover_paid_actions` | Search action catalog by intent | Free |

### Fetch the Manifest

```bash
curl https://api.nexflowapp.app/.well-known/agent-manifest
```

### Discover Actions by Intent

```bash
curl -X POST https://api.nexflowapp.app/api/agent/discover-actions \
  -H "Content-Type: application/json" \
  -d '{"intent": "monitor shopify store", "constraints": {"max_price": 0.50}}'
```

---

## Atomic Batch Settlement Contract

The core settlement contract on Base implements atomic batch settlement with Merkle proof verification.

**Features:**
- Atomic execution — all payments in a batch settle together or all revert
- Merkle proof verification — each payment proven against a committed root
- Facilitator escrow — managed collateral for payment guarantees
- Platform fees — configurable basis points (max 5%)
- Time-locked updates — 48-hour delay for parameter changes
- Emergency pause — circuit breaker for security incidents

**Key Functions:**

```solidity
function depositEscrow(address token, uint256 amount) external;
function withdrawEscrow(address token, uint256 amount) external;

function settleBatch(
    bytes32 merkleRoot,
    address facilitator,
    address token,
    bytes32[] calldata paymentIds,
    address[] calldata recipients,
    uint256[] calldata amounts,
    bytes32[][] calldata merkleProofs
) external;

function verifyPaymentProof(
    bytes32 paymentId, address recipient, uint256 amount,
    address token, bytes32[] calldata merkleProof, bytes32 merkleRoot
) external pure returns (bool valid);
```

**Events:**

```solidity
event BatchSettled(bytes32 indexed merkleRoot, address indexed facilitator, address indexed token, uint256 paymentCount, uint256 totalAmount, uint256 totalFees);
event PaymentProcessed(bytes32 indexed batchRoot, bytes32 indexed paymentId, address indexed recipient, uint256 amount, address token);
event EscrowDeposited(address indexed facilitator, address indexed token, uint256 amount, uint256 newBalance);
event EscrowWithdrawn(address indexed facilitator, address indexed token, uint256 amount, uint256 newBalance);
```

---

## SDK Reference

### Installation

```bash
npm install @nexflow-smf/smf
```

### Client Options

```typescript
interface NexFlowSMFClientOptions {
  baseUrl: string;              // API base URL
  apiKey: string;               // Your API key (nf_live_xxx or nf_test_xxx)
  timeoutMs?: number;           // Request timeout (default: 30000)
  rateLimitThreshold?: number;  // Warn at this utilization (default: 0.8)
  userAgent?: string;           // Custom user agent
}
```

### Methods

| Method | Description |
|--------|-------------|
| `route(request)` | Route a payment to the optimal facilitator |
| `verify(request)` | Verify an x402 payment intent |
| `settle(request)` | Trigger batch settlement |
| `health()` | Get system health status |
| `facilitators()` | List available facilitators |
| `getRateLimit()` | Get rate limit info from last request |
| `isApproachingRateLimit()` | Check if near rate limit threshold |

### Utilities

| Function | Description |
|----------|-------------|
| `generateIdempotencyKey()` | Generate unique idempotency keys |
| `isValidChainId(id)` | Validate CAIP-2 chain identifiers |
| `isValidAddress(addr)` | Validate Ethereum addresses |
| `isValidWei(amount)` | Validate wei amount strings |
| `isValidTokenAddress(addr)` | Validate ERC-20 token addresses |
| `isValidPaymentIntent(intent)` | Validate x402 payment intents |

### Error Handling

```typescript
import { NexFlowSMFClient, NexFlowSMFError } from '@nexflow-smf/smf';

try {
  const route = await smf.route({ ... });
} catch (error) {
  if (error instanceof NexFlowSMFError) {
    console.error(`[${error.code}]: ${error.message}`);

    switch (error.code) {
      case 'RATE_LIMITED':      // Wait and retry
      case 'TIMEOUT':           // Network issue, retry with backoff
      case 'NETWORK_ERROR':     // Retry with backoff
      case 'INTERNAL_ERROR':    // Retry with backoff
        break;
      case 'INVALID_API_KEY':   // Check credentials
      case 'INVALID_REQUEST':   // Fix request parameters
      case 'MISSING_API_KEY':   // Set Authorization header
        break;
    }
  }
}
```

---

## Pricing

| Item | Cost |
|------|------|
| **Payment routing** | 0.1-0.5% surcharge on payment amount |
| **Metered actions** | Per-unit, typically 0.001-0.10 USDC per unit |
| **Platform fee** | 0.25% default (configurable per facilitator, max 5%) |
| **Health probes** | Free |
| **Action discovery** | Free |

All payments settle in **USDC on Base** (`eip155:8453`).

---

## Examples

### `examples/basic-settlement.ts`

Complete flow: route, verify, and settle a USDC payment on Base.

```bash
export NEXFLOW_API_KEY=nf_live_your_key_here
cd sdk && npm install
npx tsx ../examples/basic-settlement.ts
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXFLOW_API_KEY` | Yes | Your NexFlow API key (`nf_live_xxx` or `nf_test_xxx`) |
| `NEXFLOW_BASE_URL` | No | Override API URL (default: `https://api.nexflowapp.app`) |

Get your API key at [nexflowapp.app](https://nexflowapp.app).

**Never commit API keys or secrets.** Use environment variables or a secrets manager.

---

## Supported Networks & Tokens

| Network | Chain ID | Status |
|---------|----------|--------|
| **Base mainnet** | `eip155:8453` | Primary |

| Token | Address | Decimals |
|-------|---------|----------|
| **USDC** | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` | 6 |

---

## Development

### Building the SDK

```bash
cd sdk
npm install
npm run build       # Build for production (CJS + ESM + types)
npm run dev         # Watch mode
npm run typecheck   # Type checking
```

### Running Examples

```bash
cd sdk && npm install
npx tsx ../examples/basic-settlement.ts
```

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Security

For security concerns, see [SECURITY.md](./SECURITY.md).

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

## Links

- **Website**: [nexflowapp.app](https://nexflowapp.app)
- **API**: [api.nexflowapp.app](https://api.nexflowapp.app)
- **Agent Manifest**: [api.nexflowapp.app/.well-known/agent-manifest](https://api.nexflowapp.app/.well-known/agent-manifest)
- **SDK on npm**: [@nexflow-smf/smf](https://www.npmjs.com/package/@nexflow-smf/smf)
- **Settlement Contract**: [BaseScan](https://basescan.org/address/0x43A04228152115fDd5663B2Aa559Ebd84D17A49D)
- **Issues**: [GitHub Issues](https://github.com/moejeaux/nexflow-smf-public/issues)
- **Optimism RetroPGF**: [Project](https://round4.optimism.io/project/0xed08823cc05bddb31c7ef16aa7a2cb284665a95e00557c67198c13d5564bb954)

---

**Built for the x402 ecosystem on Base**
