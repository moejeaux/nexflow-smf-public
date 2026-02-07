# NexFlow Smart Meta-Facilitator (SMF)

> **The x402-native metered billing and routing brain for AI agents and SaaS APIs on Base.**

NexFlow SMF routes, verifies, and settles x402 micropayments on Base. It acts as an intelligent intermediary between payers and facilitators, selecting the optimal route based on cost, latency, and reliability. This repository contains the on-chain settlement contracts, TypeScript SDK, agent manifest specification, and integration examples.

---

## Choose Your Path

### **Monetize an existing API at the edge** (recommended)

Drop a Lambda@Edge function in front of CloudFront. Every request to a protected path must include a valid `x-402-payment` header — otherwise the client gets a `402 Payment Required` with payment instructions. No backend changes needed.

**How it works:**
1. **viewer-request** — Lambda calls `/x402/verify` with the payment proof. If valid, attaches an `intentId` and forwards to origin. If invalid, returns `402`.
2. **origin-response** — Lambda reads the `intentId`. If origin status < 400, calls `/x402/settle` to confirm delivery. Returns the response unchanged.

**Get started in 15 minutes:**

> **[AWS CloudFront + Lambda@Edge Quickstart →](./examples/aws-cloudfront-lambdaedge/README.md)**

### **Use the NexFlow SMF SDK directly**

For server-side integrations where you control the request lifecycle — route payments, verify intents, and trigger batch settlement from your own code.

```bash
npm install @nexflow-smf/smf
```

```typescript
import { NexFlowSMFClient } from '@nexflow-smf/smf';

const smf = new NexFlowSMFClient({
  baseUrl: 'https://api.nexflowapp.app',
  apiKey: process.env.NEXFLOW_API_KEY!,
});

// Route a payment
const route = await smf.route({
  amount_wei: '1000000',
  token_address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  chain_id: 'eip155:8453',
  payment_id: 'order-123',
});

// Verify a payment intent
const result = await smf.verify({
  payment_intent: 'x402:1:base:0xabc...',
  recipient_address: '0xYourAddress...',
});
```

**[Full SDK documentation →](./sdk/README.md)**

---

## What's in This Repo

| Path | Description |
|------|-------------|
| [`examples/aws-cloudfront-lambdaedge/`](./examples/aws-cloudfront-lambdaedge/) | 15-minute AWS quickstart — Lambda@Edge x402 pay-per-request gating |
| [`examples/basic-settlement.ts`](./examples/basic-settlement.ts) | End-to-end SDK example: route, verify, settle |
| [`sdk/`](./sdk/) | Zero-dependency TypeScript SDK (`@nexflow-smf/smf`) |
| [`contracts/`](./contracts/) | Solidity contracts for atomic batch settlement with Merkle proofs |
| [`docs/`](./docs/) | API reference, facilitator contract, production checklist |
| [`AGENT_MANIFEST_V1.md`](./AGENT_MANIFEST_V1.md) | Agent Manifest spec for machine-to-machine discovery |
| [`PRICING.md`](./PRICING.md) | Pricing model with example scenarios |

---

## Services Overview

| Service | Description | Status |
|---------|-------------|--------|
| **Smart Meta-Facilitator** | Intelligent payment routing, verification, and batch settlement | Live |
| **CloudFront Edge Gating** | Lambda@Edge adapter for pay-per-request access via CloudFront | Live |
| **Agent Manifest & Discovery** | Machine-readable capability manifest for AI agent integration | Live |
| **Pulse Scheduler** | Metered job scheduling with x402 billing (cron, webhooks, tasks) | Live |
| **Action Catalog** | Pre-built metered actions (Shopify, Salesforce, data enrichment) | Live |

---

## Base Mainnet Contracts

| Contract | Address | Explorer |
|----------|---------|----------|
| **AtomicBatchSettlement** | `0x43A04228152115fDd5663B2Aa559Ebd84D17A49D` | [BaseScan](https://basescan.org/address/0x43A04228152115fDd5663B2Aa559Ebd84D17A49D) |
| **USDC** | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` | [BaseScan](https://basescan.org/address/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913) |

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

## Documentation

| Doc | What's inside |
|-----|---------------|
| [Facilitator API](./docs/facilitator-api.md) | `/verify` and `/settle` contracts, `intentId` lifecycle, error handling, retry guidance |
| [API Reference](./docs/api-reference.md) | All endpoints (SMF core, x402 routing, agent discovery), SDK reference, contract ABI |
| [Production Checklist](./docs/production-checklist.md) | Idempotency, latency, CloudWatch logging, failure modes, key rotation |
| [Pricing](./PRICING.md) | Pulse metering, facilitator per-call pricing, example scenarios |
| [Agent Manifest](./AGENT_MANIFEST_V1.md) | Machine-to-machine capability discovery spec |
| [SDK README](./sdk/README.md) | Full SDK docs: installation, methods, error handling, utilities |

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
# SDK example
cd sdk && npm install
npx tsx ../examples/basic-settlement.ts

# Lambda@Edge example
cd examples/aws-cloudfront-lambdaedge
npm install
npm run build   # requires NEXFLOW_FACILITATOR_URL and NEXFLOW_API_KEY
```

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Security

For security concerns, see [SECURITY.md](./SECURITY.md).

## License

MIT License — see [LICENSE](./LICENSE) for details.

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
