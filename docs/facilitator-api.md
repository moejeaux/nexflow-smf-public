# NexFlow x402 Facilitator API

The NexFlow facilitator handles payment verification and settlement for x402-gated resources. It exposes two endpoints — **verify** and **settle** — that form a two-phase flow: verify the payment proof before serving content, then confirm delivery after the origin responds.

**Billing:** Settle is the billable event. Verify is **not** billed — it only gates access.

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

**Verify is not billed** — it only gates access.

If the proof is valid, returns a `settlementIntentId` that tracks this payment through settlement.

### Request

```json
{
  "network": "eip155:8453",
  "resourceId": "joke-endpoint",
  "headers": {
    "x402-payment": "<base64-encoded-payment-proof>",
    "user-agent": "curl/8.0.0"
  }
}
```

| Field | Type | Description |
|---|---|---|
| `network` | `string` | CAIP-2 network identifier (`"eip155:8453"` for Base mainnet) |
| `resourceId` | `string` | Stable identifier for this resource/tier |
| `headers` | `object` | Forwarded request headers (lowercased keys) — must include `x402-payment` with the client's payment proof |

### Response (valid payment)

```json
{
  "valid": true,
  "settlementIntentId": "x402-intent-abc123",
  "expiresAt": "2026-02-07T07:48:00Z",
  "reason": null
}
```

| Field | Type | Description |
|---|---|---|
| `valid` | `boolean` | Whether the payment proof is valid |
| `settlementIntentId` | `string` | Settlement tracking identifier — pass this to `/settle` |
| `expiresAt` | `string` | ISO 8601 expiry for the intent |
| `reason` | `string\|null` | `null` when valid; error reason when invalid |

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
| `requirement` | `object\|null` | Payment instructions for the client to construct a valid `x402-payment` header. The `asset` field is `USDC`. |

---

## `POST /settle`

Confirm that the origin successfully delivered the requested resource. Called during the **origin-response** phase, only when the origin returns a status code < 400.

**This is the billable event.** Settle is called only on origin success. If the origin fails, no settle is made and there is no charge.

The `settlementIntentId` from `/verify` links verify and settle.

### Request

```json
{
  "network": "eip155:8453",
  "settlementIntentId": "x402-intent-abc123",
  "resourceId": "joke-endpoint",
  "originStatus": 200
}
```

| Field | Type | Description |
|---|---|---|
| `network` | `string` | CAIP-2 network identifier (`"eip155:8453"`) |
| `settlementIntentId` | `string` | The `settlementIntentId` returned by `/verify` |
| `resourceId` | `string` | The resource that was served |
| `originStatus` | `number` | HTTP status code from origin (must be < 400) |

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

## The `settlementIntentId`

The `settlementIntentId` is the stable identifier that links a verified payment to its delivery confirmation. In a Lambda@Edge deployment, the typical flow is:

1. **viewer-request** calls `/verify` → receives `settlementIntentId`
2. Lambda attaches `settlementIntentId` as the `x-settlement-intent-id` header on the request forwarded to origin
3. **origin-response** reads `settlementIntentId` from the header and calls `/settle` if the origin returned a successful response

This two-phase design ensures you never settle for a failed delivery.

---

## Idempotency

`/settle` is **idempotent**. Calling it multiple times with the same `settlementIntentId` returns the same result without double-settling. This means:

- Safe to retry on network timeouts
- Safe if CloudFront triggers origin-response more than once
- No need for external deduplication logic

`/verify` is also safe to call multiple times for the same payment proof — it will return the same `settlementIntentId`.

---

## Error Behavior

| Scenario | HTTP Status | Behavior |
|---|---|---|
| Invalid API key | `401` | `{ "error": "unauthorized" }` |
| Malformed request body | `400` | `{ "error": "invalid_request", "message": "..." }` |
| Payment proof expired | `200` | `{ "valid": false, "reason": "expired" }` |
| Network timeout calling NexFlow | n/a | Caller should treat as verification failure |
| `/settle` with unknown `settlementIntentId` | `404` | `{ "ok": false, "error": "intent_not_found" }` |
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
