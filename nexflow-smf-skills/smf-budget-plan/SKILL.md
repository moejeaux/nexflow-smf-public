---
name: nexflow-smf-budget-plan-v1
description: >
  Turn a USDC budget into an approximate number of NexFlow SMF API calls.
  Use for planning, caps, or showing users how far their budget will go.
---

## When to use this skill

Use this skill when:
- A user or system has a fixed budget (e.g. 10 USDC) and you need to estimate how many SMF calls that allows.
- You are setting rate limits or caps based on cost.
- You are building "budget remaining" or "calls remaining" UX.

Do not use for real-time pricing of a single call; use simulate-charge or the paid endpoints for that.

## HTTP API

- Method: POST  
- URL: `https://api.nexflow.xyz/api/smf/v1/budget-plan`  
- Auth: none (planning only; no payment).

### Request body

Send JSON:

```json
{
  "budget_amount": "10.0",
  "asset": "USDC",
  "network": "eip155:8453",
  "operation_mix": {
    "route-matrix": 0.5,
    "route-quote": 0.5
  }
}
```

Fields:

- **budget_amount** (string, required): Total budget in human-readable form, e.g. "10.0".
- **asset** (string, optional): Token symbol. Default "USDC".
- **network** (string, optional): CAIP-2 network ID. Default "eip155:8453".
- **operation_mix** (object, optional): Weights per operation type (sum to 1.0). Default: equal weight across common paid operations. Omit for a single generic estimate.

### Response shape

On success (2xx):

```json
{
  "budget_amount": "10.0",
  "asset": "USDC",
  "network": "eip155:8453",
  "estimated_calls": 250,
  "avg_cost_per_call": "0.04",
  "breakdown": {
    "route-matrix": 125,
    "route-quote": 125
  },
  "disclaimer": "Estimates based on current average fees; actual usage may vary."
}
```

Use `estimated_calls` and `breakdown` for display or caps. Treat as approximate; actual fees can vary per call.

## Pricing

This endpoint is free. No x402 payment is required.

## Test usage

- Add header: `X-Nexflow-Test: 1` for test mode.
- Expect deterministic estimates (e.g. fixed avg cost) for automated tests.

## Usage examples for agents

- "With a 5 USDC budget, how many route-matrix calls can we make on Base?"
- "Plan a budget mix: 60% route-matrix, 40% route-quote for 20 USDC."
- "Show the user how many API calls their current budget allows before topping up."
