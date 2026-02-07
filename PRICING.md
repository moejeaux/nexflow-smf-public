# NexFlow Pricing

NexFlow keeps pricing simple: **you only pay when your paywalled endpoint is successfully served.**

No subscriptions. No pre-funded balance. Pay-per-use only.

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

The facilitator is priced per **successful settlement** — one call to `/settle` per gated request that the origin serves successfully.

**Verify (`/verify`) is not billed.** It only gates access and is rate-limited.

| Tier | Settlements/month | Price per settlement |
|---|---|---|
| Free | 10,000 | $0 |
| Production | Unlimited | $0.0001 per settlement |

Settle is called only when the origin returns a successful response (status < 400). If the origin fails, no settle call is made and you are not charged.

---

## Example Scenarios

> These are **illustrative examples** using the production tier rates above.

### Scenario A: Small API (100k requests/month)

| Item | Volume | Unit cost | Monthly cost |
|---|---|---|---|
| `/verify` calls | 100,000 | $0 (not billed) | $0.00 |
| `/settle` calls | 95,000 (some 4xx) | $0.0001 | $9.50 |
| **Total facilitator cost** | | | **$9.50** |

At $0.001/request to your end users, that's $100 gross revenue, $9.50 in facilitator costs — **90% margin**.

### Scenario B: High-traffic API (1M requests/month)

| Item | Volume | Unit cost | Monthly cost |
|---|---|---|---|
| `/verify` calls | 1,000,000 | $0 (not billed) | $0.00 |
| `/settle` calls | 960,000 | $0.0001 | $96.00 |
| **Total facilitator cost** | | | **$96.00** |

At $0.001/request, that's $1,000 gross revenue — **90% margin** at scale too.

### Scenario C: Pulse scheduler (100k executions/month)

| Item | Volume | Unit cost | Monthly cost |
|---|---|---|---|
| Pulse executions | 100,000 | $0.001 | $100.00 |

---

## Metered Units

NexFlow has exactly two metered units:

1. **NexFlow executions (Pulse)** — one execution = one webhook delivery attempt (including retries)
2. **x402 settlement** — one unit = one successful call to `/settle`
   - Verify (`/verify`) is **not** a billed unit — it only gates access.

In the recommended CloudFront two-phase pattern, settle is called only when the origin returns success (< 400).

---

## Future: Revenue-Share Model (Optional)

We may introduce an optional basis-points (bps) fee on payment flow volume as an alternative to per-settlement pricing. This model would charge a small percentage of the payment amount rather than a flat per-call fee.

- **Not active today** — per-settlement pricing is the only model currently
- Would be opt-in, not a replacement
- Targeting 10-50 bps (0.1%-0.5%) for high-volume integrators who prefer variable cost

We'll announce any changes well in advance.

---

## What's Always Free

- **Verify calls** (`/verify`) — not billed, rate-limited
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
