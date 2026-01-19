# NexFlow Smart Meta-Facilitator (SMF)

> **Open-source atomic batch settlement infrastructure for x402 payments on Base**

NexFlow SMF is a production-ready Smart Meta-Facilitator that routes, verifies, and settles x402 micropayments on Base. This repository contains the on-chain settlement contracts, TypeScript SDK, and usage examples—everything you need to integrate atomic batch settlement into your application.

## 📦 What's Included

| Component | Description |
|-----------|-------------|
| `contracts/` | Solidity contracts for atomic batch settlement with Merkle proof verification |
| `sdk/` | Zero-dependency TypeScript SDK (`@nexflow-smf/smf`) for routing, verification, and settlement |
| `examples/` | Ready-to-run examples demonstrating common integration patterns |

---

## 🔗 Base Mainnet Addresses

| Contract | Address | Description |
|----------|---------|-------------|
| **AtomicBatchSettlement** | [`0x43A04228152115fDd5663B2Aa559Ebd84D17A49D`](https://basescan.org/address/0x43A04228152115fDd5663B2Aa559Ebd84D17A49D) | Main settlement contract |
| **USDC** | [`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913) | Circle's USDC on Base |

---

## 🚀 Quickstart

### 1. Install the SDK

```bash
# (Not yet published on npm) Install from GitHub for now\r\nnpm install github:moejeaux/nexflow-smf-public#sdk
```

### 2. Initialize the Client

```typescript
import { NexFlowSMFClient } from '@nexflow-smf/smf';

const smf = new NexFlowSMFClient({
  baseUrl: 'https://api.nexflowapp.app',
  apiKey: process.env.NEXFLOW_API_KEY!, // Get yours at https://nexflowapp.app
});
```

### 3. Route, Verify, and Settle a Payment

```typescript
// 1. Route: Find the best facilitator for your payment
const route = await smf.route({
  amount_wei: '1000000',  // 1 USDC (6 decimals)
  token_address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',  // USDC on Base
  chain_id: 'eip155:8453',  // Base mainnet
  payment_id: 'order-123',  // Optional: for idempotency
});

console.log(`Use facilitator: ${route.facilitator_id}`);
console.log(`Expected fee: ${route.expected_fee_wei} wei`);
console.log(`Quote expires: ${route.quote_expires_at}`);

// 2. Verify: Validate an incoming x402 payment intent
const verification = await smf.verify({
  payment_intent: 'x402:1:base:0xabc...',  // x402 payment payload
  recipient_address: '0xYourAddress...',
});

if (verification.valid) {
  console.log(`✅ Payment valid, processed by ${verification.facilitator}`);
} else {
  console.log(`❌ Invalid: ${verification.reason}`);
}

// 3. Settle: Trigger batch settlement on-chain
const settlement = await smf.settle({
  batch_id: 'batch-xyz',
  facilitator_id: 'cdp',
  force: true,  // Optional: force immediate settlement
});

console.log(`Settlement status: ${settlement.status}`);
console.log(`Transaction: https://basescan.org/tx/${settlement.transaction_hash}`);
```

### 4. Check System Health

```typescript
const health = await smf.health();
console.log(`System status: ${health.status}`);
console.log(`Healthy facilitators: ${health.summary.healthy}/${health.summary.total}`);

// List available facilitators
const facilitators = await smf.facilitators();
for (const f of facilitators) {
  console.log(`  ${f.id}: ${f.label} - ${f.status}`);
}
```

---

## 📜 Contracts

### AtomicBatchSettlement.sol

The core settlement contract implements atomic batch settlement with Merkle proof verification:

**Key Features:**
- ✅ **Atomic execution**: All payments in a batch settle together or all revert
- ✅ **Merkle proof verification**: Each payment proven against a committed root
- ✅ **Facilitator escrow**: Managed collateral for payment guarantees
- ✅ **Platform fees**: Configurable basis points (max 5%)
- ✅ **Time-locked updates**: 48-hour delay for parameter changes
- ✅ **Emergency pause**: Circuit breaker for security incidents

**Key Functions:**

```solidity
// Deposit escrow as a facilitator
function depositEscrow(address token, uint256 amount) external;

// Withdraw available escrow
function withdrawEscrow(address token, uint256 amount) external;

// Settle a batch of payments atomically
function settleBatch(
    bytes32 merkleRoot,
    address facilitator,
    address token,
    bytes32[] calldata paymentIds,
    address[] calldata recipients,
    uint256[] calldata amounts,
    bytes32[][] calldata merkleProofs
) external;

// Verify a payment proof (view function)
function verifyPaymentProof(
    bytes32 paymentId,
    address recipient,
    uint256 amount,
    address token,
    bytes32[] calldata merkleProof,
    bytes32 merkleRoot
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

## 📚 SDK Reference

### Client Options

```typescript
interface NexFlowSMFClientOptions {
  baseUrl: string;        // API base URL (https://api.nexflowapp.app)
  apiKey: string;         // Your API key (nf_live_xxx or nf_test_xxx)
  timeoutMs?: number;     // Request timeout (default: 30000)
  rateLimitThreshold?: number;  // Warn at this utilization (default: 0.8)
  userAgent?: string;     // Custom user agent
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

### Error Handling

```typescript
import { NexFlowSMFClient, NexFlowSMFError } from '@nexflow-smf/smf';

try {
  const route = await smf.route({ ... });
} catch (error) {
  if (error instanceof NexFlowSMFError) {
    console.error(`SMF Error [${error.code}]: ${error.message}`);
    
    switch (error.code) {
      case 'RATE_LIMITED':
        // Wait and retry
        break;
      case 'INVALID_API_KEY':
        // Check credentials
        break;
      case 'TIMEOUT':
        // Network issues, retry with backoff
        break;
    }
  }
}
```

---

## 📁 Examples

### `examples/basic-settlement.ts`

Demonstrates the complete flow: route → verify → settle for a USDC payment on Base.

```bash
# Set your API key
export NEXFLOW_API_KEY=nf_live_your_key_here

# Run the example
cd sdk
npm install
npx tsx ../examples/basic-settlement.ts
```

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXFLOW_API_KEY` | Yes | Your NexFlow API key |
| `NEXFLOW_BASE_URL` | No | Override API URL (default: `https://api.nexflowapp.app`) |

**Important:** Never commit API keys or secrets. Use environment variables or a secrets manager.

---

## 🛠️ Development

### Building the SDK

```bash
cd sdk
npm install
npm run build    # Build for production
npm run dev      # Watch mode for development
npm run typecheck  # Type checking without emit
```

### Running Examples

```bash
# Install dependencies
cd sdk && npm install

# Run TypeScript examples directly
npx tsx ../examples/basic-settlement.ts
```

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 🔒 Security

For security concerns, see [SECURITY.md](./SECURITY.md).

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

## 🔗 Links

- **Documentation**: [https://nexflowapp.app/docs](https://nexflowapp.app/docs)
- **API Reference**: [https://api.nexflowapp.app/docs](https://api.nexflowapp.app/docs)
- **BaseScan**: [Settlement Contract](https://basescan.org/address/0x43A04228152115fDd5663B2Aa559Ebd84D17A49D)
- **GitHub Issues**: [Report bugs or request features](https://github.com/moejeaux/nexflow-smf-public/issues)

---

**Built for the x402 ecosystem on Base** 🔵
