---
name: nexflow-smf-settlement-receipt-v1
description: >
  Fetch a compact settlement receipt for a previously completed x402 payment
  from NexFlow SMF for logging, audits, or verification.
---

## When to use this skill

Use this skill when:
- A payment has already been settled via NexFlow/x402.
- You need a machine-readable record to store in logs, dashboards, or invoices.
- You are verifying that a prior payment actually completed before taking another step.

## HTTP API

- Method: GET  
- URL: `https://api.nexflow.xyz/api/smf/v1/settlement-receipt`  

Query parameters:

- **payment_id** (string, required): Unique identifier returned by NexFlow SMF at settlement time.

Example:

```http
GET /api/smf/v1/settlement-receipt?payment_id=0x1234abcd...
```

### Success response

```json
{
  "payment_id": "0x1234abcd...",
  "status": "settled",
  "network": "eip155:8453",
  "asset": "USDC",
  "amount": "10.00",
  "fee": "0.03",
  "facilitator": "base-main-smf",
  "settled_at": "2026-02-17T16:20:00Z"
}
```

If `status` is not "settled", do not treat the funds as finalized.

## Pricing

This endpoint is free.

It is safe to call repeatedly for monitoring and record-keeping.

## Test usage

For test environments:

- Use known test `payment_id` values provided by NexFlow (e.g. IDs starting with `test_`).
- Expect deterministic mock receipts suitable for automated tests.

## Usage examples for agents

- "Verify that payment &lt;payment_id&gt; is settled before shipping goods."
- "Log the fee and facilitator for payment &lt;payment_id&gt; to the NexFlow audit log."
- "Generate a human-readable summary of payment &lt;payment_id&gt; for an invoice email."
