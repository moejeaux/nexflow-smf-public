---
name: nexflow-smf-list-facilitators-v1
description: >
  Discover active facilitators for x402 payments from NexFlow SMF.
  Use to see who can route payments on a given network/asset before quoting or paying.
---

## When to use this skill

Use this skill when:
- You need to know which facilitators are available before calling route-matrix or route-quote.
- You are building discovery flows (e.g. "show me who can do USDC on Base").
- You are monitoring availability or building dashboards of active facilitators.

Do not use for comparing fees or latency; use route-matrix for that.

## HTTP API

- Method: GET  
- URL: `https://api.nexflow.xyz/api/smf/v1/list-facilitators`  

Query parameters (all optional):

- **network** (string): CAIP-2 network ID, e.g. "eip155:8453". Omit for all networks.
- **asset** (string): Token symbol, e.g. "USDC". Omit for all assets.

Example:

```http
GET /api/smf/v1/list-facilitators?network=eip155:8453&asset=USDC
```

### Response shape

On success (2xx):

```json
{
  "facilitators": [
    {
      "id": "base-main-smf",
      "name": "Base Main SMF",
      "network": "eip155:8453",
      "assets": ["USDC"],
      "status": "active"
    }
  ]
}
```

Use the `id` field when calling route-quote or when interpreting route-matrix results.

## Pricing

This endpoint is typically free or low-cost. If the service returns 402, read the price and decide whether to pay.

## Test usage

- Add header: `X-Nexflow-Test: 1` for test mode.
- Expect a stable set of test facilitators with deterministic IDs.

## Usage examples for agents

- "List all facilitators that support USDC on Base."
- "Discover which facilitators are active for x402 payments."
- "Get facilitator IDs to pass into the route-quote API."
