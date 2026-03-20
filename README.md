# NexFlow Smart Meta-Facilitator (SMF)

> **The x402-native metered billing and routing brain for AI agents and SaaS APIs on Base.**

NexFlow SMF routes, verifies, and settles x402 micropayments on Base. It acts as an intelligent intermediary between payers and facilitators, selecting the optimal route based on cost, latency, and reliability. This repository contains the on-chain settlement contracts, TypeScript SDK, agent manifest specification, and integration examples.

## 🎴 [Browse AgentCard Catalog →](./agentcards/)

Discover AI agent services with x402 payment routing through NexFlow SMF. [Submit your service](./agentcards/SUBMISSION_GUIDE.md) to the catalog.

## 📦 What's Included

| Component | Description |
|-----------|-------------|
| `contracts/` | Solidity contracts for atomic batch settlement with Merkle proof verification |
| `sdk/` | Zero-dependency TypeScript SDK (`@nexflow-smf/smf`) for routing, verification, and settlement |
| `examples/` | Ready-to-run examples demonstrating common integration patterns |
| `examples/workflows/` | JSON workflow definitions for the NexFlow SMF workflow host |
| `examples/client/` | Minimal TypeScript clients showing the 402 → pay → retry pattern |

---

## 🧩 Skills (Cursor & AI agents)

Canonical list of NexFlow SMF skills. Each skill has a **SKILL.md** (for Cursor/agents) and lives in [`nexflow-smf-skills/`](./nexflow-smf-skills/). Machine-readable manifest: [**skills-manifest.json**](./skills-manifest.json) · API: `GET https://api.nexflowapp.app/.well-known/skills` (redirects to manifest).

| Skill | Description |
|-------|--------------|
| [**List Facilitators**](./nexflow-smf-skills/smf-list-facilitators/) | Discover active x402 facilitators by network/asset before quoting or paying. |
| [**Route Matrix**](./nexflow-smf-skills/smf-route-matrix/) | Compare priced routes (fees, latency) across facilitators for USDC on Base. |
| [**Route Quote**](./nexflow-smf-skills/smf-route-quote/) | Get a single priced quote for a chosen facilitator before committing. |
| [**Settlement Receipt**](./nexflow-smf-skills/smf-settlement-receipt/) | Fetch a settlement receipt for a completed x402 payment for logs or audits. |
| [**Healthcheck**](./nexflow-smf-skills/smf-healthcheck/) | Ping NexFlow SMF for status and latency before routing payments. |
| [**Simulate Charge**](./nexflow-smf-skills/smf-simulate-charge/) | See x402 pricing headers without performing a real payment. |
| [**Budget Plan**](./nexflow-smf-skills/smf-budget-plan/) | Turn a USDC budget into an approximate number of SMF API calls. |

---

## 🎴 Browse AgentCard Catalog

Discover NexFlow services as AgentCards, ready for AI agents and x402-aware clients:

https://nexflow-agentcards.pages.dev/

---

## Choose Your Path

### **Monetize an existing API at the edge** (recommended)

Drop a Lambda@Edge function in front of CloudFront. Every request to a protected path must include a valid `x402-payment` header — otherwise the client gets a `402 Payment Required` with payment instructions. No backend changes needed.

**How it works:**
1. **viewer-request** — Lambda calls `/x402/verify` with the payment proof (not billed). If valid, attaches a `settlementIntentId` and forwards to origin. If invalid, returns `402`.
2. **origin-response** — Lambda reads the `settlementIntentId`. If origin status < 400, calls `/x402/settle` to confirm delivery (this is the billable event). Returns the response unchanged.

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
| [`nexflow-smf-skills/`](./nexflow-smf-skills/) | Cursor-style agent skills (route-matrix, quote, receipt, facilitators, health, simulate, budget) |
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

## 🔄 Agent Workflows

NexFlow SMF allows agents to define, publish, and monetize **hosted workflows** — multi-step compositions of core SMF operations that other agents can invoke via the 402/MPP payment gateway.

- **Workflow creation and inspection are free.**
- **Workflow invocation is paid** — the price is computed from the sum of step costs plus a creator-defined markup.
- Workflow creators earn rev-share on every invocation.

### Available Core Operations

Workflows can compose any of these paid SMF operations:

| Operation | Description |
|-----------|-------------|
| `create_session` | Create a metered session with a budget |
| `budget_check` | Check planned charges against budgets |
| `budget_diagnostics` | Analyze sessions for overrun risk |
| `process_charges` | Deduct charges from a session or caller |
| `verify_payment` | Validate a payment descriptor |
| `settle_batch` | Settle a batch of transactions |
| `revenue_share` | Record revenue-share accounting for a period |
| `route_quote` | Get a payment routing quote |
| `usage_timeseries` | Time-series spend data for a caller/session |
| `configure_alerts` | Set budget/usage alert thresholds |
| `monitor_sessions` | List sessions with budget & spend status |
| `monitor_alerts` | Return triggered budget/usage alerts |
| `pricing_estimate` | Estimate cost of a set of operations |

### Example Workflows

#### Safety-Capped Session Runner

[`examples/workflows/safety_capped_session_runner.json`](./examples/workflows/safety_capped_session_runner.json)

A 5-step workflow that:
1. Creates a session with a requested budget
2. Checks a planned charge against that budget
3. Processes the charge
4. Configures a 90% budget alert
5. Returns current session status

#### Usage Health Check

[`examples/workflows/usage_health_check.json`](./examples/workflows/usage_health_check.json)

A 3-step diagnostic workflow that:
1. Pulls recent spend timeseries (hourly, configurable window)
2. Checks budget status (zero-cost probe)
3. Returns active alerts

#### Batch Settlement Runner

[`examples/workflows/revenue_share_settlement.json`](./examples/workflows/revenue_share_settlement.json)

A 5-step workflow demonstrating the full payment lifecycle:
1. Creates a settlement session with a budget
2. Checks that planned charges fit within the budget
3. Processes a batch of charges
4. Settles the batch
5. Returns final session status

The workflow creator earns their standard rev-share (set via `creatorShareBps`) on every invocation. Rev-share credits accumulate per wallet and are batched for payout when they reach $5+.

Input example:
```json
{
  "sessionBudget": { "amount": 2000000, "currency": "USDC" },
  "charges": [
    { "callerId": "agent_a", "amount": 500000, "description": "API usage week 12" },
    { "callerId": "agent_b", "amount": 300000, "description": "Compute usage week 12" }
  ],
  "settlementPeriod": "2026-03-01/2026-03-31"
}
```

### How to Register a Workflow

```bash
# Register the Safety-Capped Session Runner
curl -X POST "$NEXFLOW_SMF_BASE_URL/nexflow/workflows" \
  -H "Content-Type: application/json" \
  -H "X-Caller-Id: demo_caller" \
  --data-binary "@examples/workflows/safety_capped_session_runner.json"
```

Response:
```json
{
  "workflowId": "wf_abc123_1",
  "name": "Safety-Capped Session Runner",
  "invokeUrl": "/nexflow/workflows/wf_abc123_1/invoke",
  "status": "active",
  "steps": 5,
  "pricing": { "billingMode": "per_call", "markupBps": 300 }
}
```

### How to Invoke a Workflow

```bash
# First call — no payment proof → 402 Payment Required
curl -X POST "$NEXFLOW_SMF_BASE_URL/nexflow/workflows/wf_abc123_1/invoke" \
  -H "Content-Type: application/json" \
  -H "X-Caller-Id: demo_caller" \
  --data '{
    "requestedBudget": { "amount": 500000, "currency": "USDC" },
    "plannedCost": { "amount": 50000, "currency": "USDC" }
  }'
```

The first call returns **HTTP 402** with a payment challenge:
```json
{
  "object": "payment_challenge",
  "operation": "workflow_invoke",
  "workflow_id": "wf_abc123_1",
  "required_amount": 17350,
  "currency": "usdc",
  "price_breakdown": {
    "totalPrice": 17350,
    "baseCost": 7000,
    "markup": 210,
    "platformFee": 149
  },
  "instructions": "Pay via MPP using the challenge above, then retry with X-PAYMENT-PROOF header."
}
```

After the agent pays (via Tempo MPP or x402), it retries with the proof:

```bash
# Second call — with valid proof → 200 OK
curl -X POST "$NEXFLOW_SMF_BASE_URL/nexflow/workflows/wf_abc123_1/invoke" \
  -H "Content-Type: application/json" \
  -H "X-Caller-Id: demo_caller" \
  -H "X-PAYMENT-PROOF: <base64-encoded-proof-json>" \
  --data '{
    "requestedBudget": { "amount": 500000, "currency": "USDC" },
    "plannedCost": { "amount": 50000, "currency": "USDC" }
  }'
```

### TypeScript Client Example

See [`examples/client/invokeUsageHealthCheck.ts`](./examples/client/invokeUsageHealthCheck.ts) for a runnable demo of the full 402 → proof → retry flow.

```bash
export NEXFLOW_SMF_BASE_URL=http://localhost:3001
export WORKFLOW_ID=wf_abc123_1
npx tsx examples/client/invokeUsageHealthCheck.ts
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXFLOW_API_KEY` | Yes | Your NexFlow API key (`nf_live_xxx` or `nf_test_xxx`) |
| `NEXFLOW_BASE_URL` | No | Override API URL (default: `https://api.nexflowapp.app`) |
| `NEXFLOW_SMF_BASE_URL` | No | NexFlow SMF bridge URL for workflow invocations (default: `http://localhost:3001`) |
| `WORKFLOW_ID` | No | Workflow ID for the client example scripts |

Sign up or log in at [nexflowapp.app](https://nexflowapp.app), go to **Developers → API Keys**, and click **Create API key**. Use that key with the examples in this repo.

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
| [Facilitator API](./docs/facilitator-api.md) | `/verify` and `/settle` contracts, `settlementIntentId` lifecycle, error handling, retry guidance |
| [API Reference](./docs/api-reference.md) | All endpoints (SMF core, x402 routing, agent discovery), SDK reference, contract ABI |
| [Production Checklist](./docs/production-checklist.md) | Idempotency, latency, CloudWatch logging, failure modes, key rotation |
| [Pricing](./PRICING.md) | Pulse metering, facilitator settle-only pricing, example scenarios |
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
- **Skills manifest** (machine-readable): [skills-manifest.json](./skills-manifest.json) · [api.nexflowapp.app/.well-known/skills](https://api.nexflowapp.app/.well-known/skills)
- **Agent Manifest**: [api.nexflowapp.app/.well-known/agent-manifest](https://api.nexflowapp.app/.well-known/agent-manifest)
- **SDK on npm**: [@nexflow-smf/smf](https://www.npmjs.com/package/@nexflow-smf/smf)
- **Settlement Contract**: [BaseScan](https://basescan.org/address/0x43A04228152115fDd5663B2Aa559Ebd84D17A49D)
- **Issues**: [GitHub Issues](https://github.com/moejeaux/nexflow-smf-public/issues)
- **Optimism RetroPGF**: [Project](https://round4.optimism.io/project/0xed08823cc05bddb31c7ef16aa7a2cb284665a95e00557c67198c13d5564bb954)

---

**Built for the x402 ecosystem on Base**
