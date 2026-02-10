# Production Checklist

Everything you need to harden your x402 Lambda@Edge deployment before going live.

---

## 1. Idempotency

### `/settle` is idempotent

The `/settle` endpoint is safe to call multiple times with the same `settlementIntentId`. NexFlow deduplicates server-side — you will never double-settle.

This means:
- If origin-response fires twice (CloudFront retry), both settle calls succeed without side effects
- If your settle call times out, retry it — the second call returns the same result
- No need to track "already settled" state locally

### Upstream idempotency

If your origin has side effects (e.g., provisioning a resource, sending an email), use the `settlementIntentId` as your own idempotency key to prevent duplicate processing:

```typescript
// In your origin handler:
const settlementIntentId = request.headers['x-settlement-intent-id']
if (await alreadyProcessed(settlementIntentId)) {
  return cachedResponse(settlementIntentId)
}
// ... process request ...
await markProcessed(settlementIntentId)
```

---

## 2. Latency Expectations

A gated request adds two NexFlow round-trips — one on the way in (verify) and one on the way out (settle).

| Phase | Added latency | Notes |
|---|---|---|
| **viewer-request** (verify) | 50–150ms | Payment proof validation + on-chain check |
| **origin-response** (settle) | 50–100ms | Delivery confirmation, runs in parallel with response |
| **Total overhead** | 100–250ms | Varies with Lambda cold starts and network conditions |

### Reducing latency

- **Warm the Lambda**: Lambda@Edge cold starts add 200–500ms. Use CloudFront's [Origin Shield](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html) or synthetic keep-alive pings.
- **Memory**: Increase Lambda memory from 128MB to 256MB — this also increases CPU allocation, cutting cold start time.
- **Region**: Lambda@Edge runs at the nearest CloudFront edge location. NexFlow's facilitator is multi-region. Latency is typically lowest from US and EU edges.

---

## 3. CloudWatch Logging

The Lambda handler emits structured JSON logs. Configure your CloudWatch log group to parse these fields:

### Verify event

```json
{
  "ts": "2026-02-07T08:12:34.567Z",
  "eventType": "verify",
  "path": "/api/joke",
  "resourceId": "api-basic",
  "settlementIntentId": "abc123",
  "valid": true,
  "latencyMs": 87,
  "requestId": "cf-abc-123",
  "hasPaymentHeader": true
}
```

### Settle event

```json
{
  "ts": "2026-02-07T08:12:34.890Z",
  "eventType": "settle",
  "path": "/api/joke",
  "settlementIntentId": "abc123",
  "settled": true,
  "settledAt": "2026-02-07T08:12:34.850Z",
  "latencyMs": 62,
  "requestId": "cf-abc-123"
}
```

### Settle skipped (origin error)

```json
{
  "ts": "2026-02-07T08:12:35.100Z",
  "eventType": "settle_skipped",
  "path": "/api/premium/report",
  "settlementIntentId": "def456",
  "reason": "origin returned 503",
  "requestId": "cf-def-456"
}
```

### Key fields to index

| Field | Why |
|---|---|
| `requestId` | Correlate across verify/settle for the same request |
| `settlementIntentId` | Track a payment from verify through settlement |
| `path` | Filter by resource |
| `eventType` | Separate verify, settle, and settle_skipped events |
| `latencyMs` | Monitor NexFlow round-trip performance |
| `error` | Alert on verification or settlement failures |
| `valid` | Track payment acceptance rate |

### Recommended CloudWatch alarms

- **Verify error rate > 1%** — may indicate facilitator issues
- **Verify p99 latency > 500ms** — cold starts or network degradation
- **Settle error rate > 5%** — investigate; settle failures don't block users but indicate lost revenue
- **`hasPaymentHeader: false` spike** — clients may not be constructing headers correctly

---

## 4. Failure Modes

### Fail closed on `/verify`

If the verify call fails (network timeout, 5xx from NexFlow, malformed response), the Lambda returns **500 Internal Server Error** to the client. The request never reaches your origin.

**Rationale:** A failed verification must not grant free access. Blocking the request protects revenue.

**Impact:** Clients see a transient error. They can retry. NexFlow's facilitator has 99.9% uptime SLA.

### Fail open on `/settle`

If the settle call fails, the Lambda **still returns the origin response** to the client unchanged. The failure is logged.

**Rationale:** The client already paid (verified) and the origin already delivered. Blocking the response would punish the client for an infrastructure issue. NexFlow reconciles unsettled intents asynchronously.

**Impact:** You may see a delay in settlement confirmation in your dashboard. NexFlow automatically retries failed settlements and reconciles within 15 minutes.

### Summary

| Phase | On NexFlow failure | Client sees | Revenue impact |
|---|---|---|---|
| **verify** | Fail closed (500) | Error, can retry | None — no free access |
| **settle** | Fail open (response passes) | Normal response | Temporary delay, auto-reconciled |

---

## 5. API Key Rotation

NexFlow API keys are injected at **build time** (Lambda@Edge doesn't support runtime environment variables). To rotate:

### Step-by-step

1. **Generate a new key** — sign in at [nexflowapp.app](https://nexflowapp.app), go to **Developers → API Keys**, and click **Create API key**. The old key stays active.

2. **Rebuild with the new key:**
   ```bash
   NEXFLOW_FACILITATOR_URL=https://api.nexflowapp.app/api/v1/facilitator/x402 \
   NEXFLOW_API_KEY=nf_live_new_key_here \
   npm run build
   ```

3. **Package and deploy:**
   ```bash
   npm run package
   aws lambda update-function-code \
     --region us-east-1 \
     --function-name nexflow-x402-edge \
     --zip-file fileb://lambda-edge.zip
   aws lambda publish-version \
     --region us-east-1 \
     --function-name nexflow-x402-edge
   ```

4. **Update the CloudFront association** to point to the new Lambda version.

5. **Wait for CloudFront to fully deploy** (check the distribution status).

6. **Revoke the old key** in the Developers → API Keys page once all edge locations are serving the new version.

### Tips

- Both old and new keys work simultaneously during the transition — no downtime.
- CloudFront deploys take 5–15 minutes to propagate globally. Don't revoke the old key until propagation completes.
- Use a CI/CD pipeline to automate this: build → deploy → wait → revoke.

---

## Pre-Launch Checklist

- [ ] API key is a production key (`nf_live_*`), not a test key
- [ ] Lambda timeout is set to 5 seconds (matches facilitator timeout)
- [ ] Lambda memory is at least 128MB (256MB recommended)
- [ ] Both `viewer-request` and `origin-response` triggers are attached
- [ ] CloudWatch log group exists and has appropriate retention (30+ days)
- [ ] Alarms configured for verify error rate and latency
- [ ] Routes in `routes.ts` match your actual protected paths
- [ ] Tested with `curl` — 402 without payment, 200 with valid payment
- [ ] Origin handles the `x-settlement-intent-id` header for idempotency
- [ ] Key rotation procedure documented and tested
