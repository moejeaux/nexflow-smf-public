---
name: nexflow-smf-route-matrix-v1
description: >
  Compute a priced route matrix for x402-style payments (e.g. USDC on Base)
  using NexFlow SMF. Use this to compare facilitators before choosing one.
---

## When to use this skill

Use this skill whenever you need to:
- Decide which facilitator to use for a payment.
- Compare total fees, estimated latency, or recent success rate across routes.
- Prepare price quotes for downstream users.

Do not use this skill for post-settlement auditing; use the settlement receipt skill instead.

## How to call the HTTP API

- Method: POST  
- URL: `https://api.nexflow.xyz/api/smf/v1/route-matrix`  
- Auth: x402 (expect HTTP 402 with PRICE headers if payment is required)

### Request body

Send JSON:

```json
{
  "asset": "USDC",
  "network": "eip155:8453",
  "amount": "10.0",
  "side": "send",
  "preferences": {
    "max_hops": 3,
    "prefer_latency_ms": 1500
  }
}
```

Fields:

- **asset** (string, required): Token symbol, e.g. "USDC".
- **network** (string, required): CAIP-2 network ID, e.g. "eip155:8453" for Base mainnet.
- **amount** (string, required): Human-readable amount, e.g. "10.0".
- **side** (string, optional): "send" or "receive". Default "send".

### Response shape

On success (2xx) you receive JSON:

```json
{
  "asset": "USDC",
  "network": "eip155:8453",
  "amount": "10.0",
  "routes": [
    {
      "facilitator": "base-main-smf",
      "total_fee": "0.04",
      "latency_ms": 850,
      "success_rate_30d": 0.992
    }
  ]
}
```

Interpretation: choose the route with the best trade-off between `total_fee`, `latency_ms`, and `success_rate_30d` for your use case.

## Pricing and x402 behavior

NexFlow SMF uses x402 for pay-per-use billing.

Typical price range: 0.01–0.05 USDC on Base per call.

The exact price is advertised via the HTTP 402 response and PAYMENT-REQUIRED x402 header.

Always:
1. Make an initial call.
2. Read the 402 price.
3. Decide whether to proceed with payment.

## Test / sandbox mode

To avoid real settlement in tests:

- Add header: `X-Nexflow-Test: 1`
- Use small amounts (e.g. "1.0") for smoke tests.

In test mode, the service returns simulated routes with deterministic values that are safe to log and discard.

## Usage examples for agents

- "Get the cheapest available route for sending 5 USDC on Base and explain the fee breakdown."
- "Compare latency and fee for all routes for sending 10 USDC on Base and choose the best one for a trading bot."
- "Generate a table of facilitators and their total fees for 25 USDC on Base."
