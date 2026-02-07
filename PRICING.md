# NexFlow Pricing

NexFlow keeps pricing simple: you pay for what you use, with a free tier to get started.

---

## Pulse (Scheduled Jobs)

Pulse is NexFlow's metered job scheduler — cron jobs, webhooks, and tasks billed by execution.

| Tier | Executions/month | Price |
|---|---|---|
| Free | 1,000 | $0 |
| Growth | Up to 100,000 | $0.001 per execution |
| Scale | Unlimited | $0.0005 per execution |

**Guardrails:** Each execution has a 30-second timeout and 1MB payload limit. Burst rate is capped at 100 concurrent executions on the free tier, 1,000 on paid tiers.

---

## SMF / x402 Facilitator

The facilitator is priced per API call — one call to `/verify` and one call to `/settle` per gated request.

| Tier | Calls/month | Price per call |
|---|---|---|
| Free | 10,000 | $0 |
| Production | Unlimited | $0.0001 per call |

Both `/verify` and `/settle` count as one call each. A typical gated request = 2 calls (verify + settle).

---

## Example Scenarios

> These are **illustrative examples** using the production tier rates above.

### Scenario A: Small API (100k requests/month)

| Item | Volume | Unit cost | Monthly cost |
|---|---|---|---|
| `/verify` calls | 100,000 | $0.0001 | $10.00 |
| `/settle` calls | 95,000 (some 4xx) | $0.0001 | $9.50 |
| **Total facilitator cost** | | | **$19.50** |

At $0.001/request to your end users, that's $100 gross revenue, $19.50 in facilitator costs — **80% margin**.

### Scenario B: High-traffic API (1M requests/month)

| Item | Volume | Unit cost | Monthly cost |
|---|---|---|---|
| `/verify` calls | 1,000,000 | $0.0001 | $100.00 |
| `/settle` calls | 960,000 | $0.0001 | $96.00 |
| **Total facilitator cost** | | | **$196.00** |

At $0.001/request, that's $1,000 gross revenue — **80% margin** at scale too.

### Scenario C: Pulse scheduler (100k executions/month)

| Item | Volume | Unit cost | Monthly cost |
|---|---|---|---|
| Pulse executions | 100,000 | $0.001 | $100.00 |

---

## Future: Revenue-Share Model (Optional)

We may introduce an optional basis-points (bps) fee on payment flow volume as an alternative to per-call pricing. This model would charge a small percentage of the payment amount rather than a flat per-call fee.

- **Not active today** — per-call pricing is the only model currently
- Would be opt-in, not a replacement
- Targeting 10-50 bps (0.1%-0.5%) for high-volume integrators who prefer variable cost

We'll announce any changes well in advance.

---

## What's Always Free

- **Health probes** (`/health`, `/facilitators`)
- **Action discovery** (`/api/agent/discover-actions`)
- **Agent manifest** (`/.well-known/agent-manifest`)
- **SDK usage** — the SDK is MIT-licensed, zero dependencies, no telemetry

---

## Getting Started

1. Sign up at [nexflowapp.app](https://nexflowapp.app)
2. Get your API key (starts with `nf_live_` or `nf_test_`)
3. The free tier activates immediately — no credit card required

Questions? Open an issue or reach out at [nexflowapp.app](https://nexflowapp.app).
