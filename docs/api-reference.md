# NexFlow API Reference

**Base URL:** `https://api.nexflowapp.app`

---

## SMF Core

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `POST` | `/api/v1/smf/route` | Route a payment to the optimal facilitator | API key |
| `POST` | `/api/v1/smf/verify` | Verify an x402 payment intent | API key |
| `POST` | `/api/v1/smf/settle` | Trigger batch settlement on-chain | API key |
| `GET` | `/api/v1/smf/health` | System health and facilitator status | Public |
| `GET` | `/api/v1/smf/facilitators` | List available facilitators | Public |

---

## x402 Facilitator

See [docs/facilitator-api.md](./facilitator-api.md) for the full verify/settle contract used by Lambda@Edge.

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `POST` | `/api/v1/facilitator/x402/verify` | Validate x402 payment proof | API key |
| `POST` | `/api/v1/facilitator/x402/settle` | Confirm delivery and settle | API key |

---

## x402 Payment Routing

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `POST` | `/api/v1/x402/route` | Route and construct x402 payment header | API key |
| `POST` | `/api/v1/x402/health` | Pre-flight probe of an x402 endpoint | Public |
| `POST` | `/api/v1/run` | Execute a metered action from the catalog | API key |

---

## Agent Discovery

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| `GET` | `/.well-known/agent-manifest` | Standard agent manifest discovery | Public |
| `GET` | `/api/agent/manifest` | Primary manifest endpoint | Public |
| `POST` | `/api/agent/discover-actions` | Search paid actions by natural language intent | Public |
| `GET` | `/api/agent/discover-actions` | List all available paid actions | Public |

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

## Authentication

Include your API key in the `Authorization` header:

```
Authorization: Bearer nf_live_your_key_here
```

For the x402 facilitator endpoints, use the `X-Facilitator-Auth` header instead:

```
X-Facilitator-Auth: nf_live_your_key_here
```

Get your API key at [nexflowapp.app](https://nexflowapp.app).

---

## SDK Reference

The `@nexflow-smf/smf` TypeScript SDK wraps all SMF Core endpoints. See the full [SDK documentation](../sdk/README.md).

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

---

## Atomic Batch Settlement Contract

**Address:** [`0x43A04228152115fDd5663B2Aa559Ebd84D17A49D`](https://basescan.org/address/0x43A04228152115fDd5663B2Aa559Ebd84D17A49D) on Base mainnet.

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
