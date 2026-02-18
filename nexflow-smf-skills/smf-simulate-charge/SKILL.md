---
name: nexflow-smf-simulate-charge-v1
description: >
  See x402 pricing headers for NexFlow SMF without performing a real payment.
  Use to discover exact price and payment requirements before committing funds.
---

## When to use this skill

Use this skill when:
- You need to know the exact price (e.g. in USDC) for a paid SMF call before paying.
- You are building flows that display "this call will cost X" to the user.
- You want to validate 402 headers and payment flow without settling.

Do not use for actual settlement; this endpoint only returns pricing metadata and does not charge.

## HTTP API

- Method: POST  
- URL: `https://api.nexflow.xyz/api/smf/v1/simulate-charge`  
- Auth: none for simulation; no payment is taken.

### Request body

Send JSON indicating which operation you would simulate (same shape as the real call):

```json
{
  "operation": "route-matrix",
  "params": {
    "asset": "USDC",
    "network": "eip155:8453",
    "amount": "10.0"
  }
}
```

Fields:

- **operation** (string, required): One of "route-matrix", "route-quote", or another paid SMF operation ID.
- **params** (object, optional): Parameters that would be sent to that operation, for accurate pricing.

### Response shape

On success (2xx) you receive the same HTTP status and headers that the real paid endpoint would return for an unpaid request (e.g. 402 Payment Required), plus a body that describes the charge without executing it:

```json
{
  "operation": "route-matrix",
  "http_status": 402,
  "headers": {
    "X-Price": "0.03",
    "X-Price-Asset": "USDC",
    "X-Price-Network": "eip155:8453"
  },
  "message": "Simulated 402; no payment was taken."
}
```

Use the headers to show the user the cost or to prepare the correct payment for the real call.

## Pricing

This endpoint is free. No x402 payment is required; it only returns what the paid endpoint would advertise.

## Test usage

- Add header: `X-Nexflow-Test: 1` for test mode.
- Expect deterministic pricing in test (e.g. fixed 0.01 USDC) for automated checks.

## Usage examples for agents

- "Show the user how much a route-matrix call for 10 USDC on Base would cost before they confirm."
- "Inspect 402 headers for route-quote without paying."
- "Validate that the SMF returns correct price headers for a given operation."
