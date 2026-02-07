# NexFlow x402 Facilitator API

The NexFlow facilitator handles payment verification and settlement for x402-gated resources. It exposes two endpoints — **verify** and **settle** — that form a two-phase flow: verify the payment proof before serving content, then confirm delivery after the origin responds.

---

## Base URL

```
https://api.nexflowapp.app/api/v1/facilitator/x402
```

## Authentication

All requests require an API key in the `X-Facilitator-Auth` header:

```
X-Facilitator-Auth: your-nexflow-api-key
```

Get your API key at [nexflowapp.app](https://nexflowapp.app).

---

## `POST /verify`

Validate a client's x402 payment proof. Called during the **viewer-request** phase (before the origin processes the request).

If the proof is valid, returns an `intentId` that tracks this payment through settlement.

### Request

```json
{
  "path": "/api/joke",
  "price": "0.001",
  "currency": "USD",
  "network": "base",
  "resourceId": "example",
  "headers": {
    "x-402-payment": "<base64-encoded-payment-proof>"
  }
}
```

| Field | Type | Description |
|---|---|---|
| `path` | `string` | The requested resource path |
| `price` | `string` | Price per request (e.g. `"0.001"`) |
| `currency` | `string` | Currency code (`"USD"`) |
| `network` | `string` | Settlement network (`"base"`) |
| `resourceId` | `string` | Stable identifier for this resource/tier |
| `headers` | `object` | Must include `x-402-payment` with the client's payment proof |

### Response (valid payment)

```json
{
  "valid": true,
  "intentId": "abc123",
  "expiresAt": "2026-02-07T07:48:00Z"
}
```

| Field | Type | Description |
|---|---|---|
| `valid` | `boolean` | Whether the payment proof is valid |
| `intentId` | `string` | Settlement tracking identifier — pass this to `/settle` |
| `expiresAt` | `string` | ISO 8601 expiry for the intent |

### Response (invalid / missing payment)

```json
{
  "valid": false,
  "reason": "missing_payment_header",
  "requirement": {
    "scheme": "exact",
    "network": "eip155:8453",
    "asset": "USDC",
    "tokenAddress": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "amountDisplay": "0.001000",
    "payTo": "0x...",
    "facilitator": "nexflow-smf",
    "eip712": { "name": "USD Coin", "version": "2" }
  }
}
```

| Field | Type | Description |
|---|---|---|
| `valid` | `boolean` | `false` |
| `reason` | `string` | Why verification failed (e.g. `missing_payment_header`, `invalid_signature`, `expired`, `insufficient_amount`) |
| `requirement` | `object\|null` | Payment instructions for the client to construct a valid `x-402-payment` header |

---

## `POST /settle`

Confirm that the origin successfully delivered the requested resource. Called during the **origin-response** phase, only when the origin returns a status code < 400.

The `intentId` from `/verify` is the stable identifier linking verify and settle.

### Request

```json
{
  "intentId": "abc123",
  "status": "success",
  "statusCode": 200
}
```

| Field | Type | Description |
|---|---|---|
| `intentId` | `string` | The `intentId` returned by `/verify` |
| `status` | `string` | Delivery status — `"success"` or `"failure"` |
| `statusCode` | `number` | HTTP status code from origin |

### Response

```json
{
  "ok": true,
  "settledAt": "2026-02-07T07:48:23Z"
}
```

| Field | Type | Description |
|---|---|---|
| `ok` | `boolean` | Whether settlement succeeded |
| `settledAt` | `string` | ISO 8601 timestamp of on-chain settlement |

---

## The `intentId`

The `intentId` is the stable settlement identifier that links a verified payment to its delivery confirmation. In a Lambda@Edge deployment, the typical flow is:

1. **viewer-request** calls `/verify` → receives `intentId`
2. Lambda attaches `intentId` as a custom header (e.g. `x-settlement-intent-id`) on the request forwarded to origin
3. **origin-response** reads `intentId` from the header and calls `/settle` if the origin returned a successful response

This two-phase design ensures you never settle for a failed delivery.

---

## Idempotency

`/settle` is **idempotent**. Calling it multiple times with the same `intentId` returns the same result without double-settling. This means:

- Safe to retry on network timeouts
- Safe if CloudFront triggers origin-response more than once
- No need for external deduplication logic

`/verify` is also safe to call multiple times for the same payment proof — it will return the same `intentId`.

---

## Error Behavior

| Scenario | HTTP Status | Behavior |
|---|---|---|
| Invalid API key | `401` | `{ "error": "unauthorized" }` |
| Malformed request body | `400` | `{ "error": "invalid_request", "message": "..." }` |
| Payment proof expired | `200` | `{ "valid": false, "reason": "expired" }` |
| Network timeout calling NexFlow | n/a | Caller should treat as verification failure |
| `/settle` with unknown `intentId` | `404` | `{ "ok": false, "error": "intent_not_found" }` |
| Internal error | `500` | `{ "error": "internal_error" }` |

### Retry Guidance

| Endpoint | On failure... |
|---|---|
| `/verify` | **Fail closed.** Do not forward to origin. Return 500 to the client. Retrying is safe but not recommended for real-time request paths due to latency. |
| `/settle` | **Fail open.** Return the origin response to the client. Retry the settle call asynchronously — NexFlow will reconcile unsettled intents. |

---

## Rate Limits

| Tier | `/verify` | `/settle` |
|---|---|---|
| Free | 1,000/day | 1,000/day |
| Production | 100,000/min | 100,000/min |

Rate limit headers are included in every response:

```
X-RateLimit-Limit: 100000
X-RateLimit-Remaining: 99842
X-RateLimit-Reset: 1707292800
```
