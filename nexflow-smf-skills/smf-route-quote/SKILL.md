---
name: nexflow-smf-route-quote-v1
description: >
  Get a single priced quote for a specific facilitator from NexFlow SMF.
  Use when you already know which facilitator to use and need exact fee and terms.
---

## When to use this skill

Use this skill when:
- You have already chosen a facilitator (e.g. from route-matrix or list-facilitators).
- You need a firm quote for one route before committing.
- You are building a flow that locks in a facilitator then proceeds to payment.

Do not use for comparing multiple facilitators; use the route-matrix skill instead.

## HTTP API

- Method: POST  
- URL: `https://api.nexflow.xyz/api/smf/v1/route-quote`  
- Auth: x402 (expect HTTP 402 with PRICE headers if payment is required)

### Request body

Send JSON:

```json
{
  "asset": "USDC",
  "network": "eip155:8453",
  "amount": "10.0",
  "side": "send",
  "facilitator": "base-main-smf"
}
```

Fields:

- **asset** (string, required): Token symbol, e.g. "USDC".
- **network** (string, required): CAIP-2 network ID, e.g. "eip155:8453" for Base mainnet.
- **amount** (string, required): Human-readable amount, e.g. "10.0".
- **side** (string, optional): "send" or "receive". Default "send".
- **facilitator** (string, required): Facilitator ID from list-facilitators or route-matrix.

### Response shape

On success (2xx):

```json
{
  "asset": "USDC",
  "network": "eip155:8453",
  "amount": "10.0",
  "facilitator": "base-main-smf",
  "total_fee": "0.04",
  "latency_ms": 850,
  "quote_expires_at": "2026-02-17T16:25:00Z"
}
```

Use the quote before `quote_expires_at`; after that, request a new quote.

## Pricing and x402 behavior

NexFlow SMF uses x402 for pay-per-use billing. Typical price: 0.01–0.05 USDC on Base per call. Read the 402 response for exact price before paying.

## Test / sandbox mode

- Add header: `X-Nexflow-Test: 1`
- Use small amounts and known test facilitator IDs for deterministic quotes.

## Usage examples for agents

- "Get a quote for sending 5 USDC on Base via facilitator base-main-smf."
- "Confirm the fee and expiry for 10 USDC on Base for the chosen facilitator before executing payment."
