# NexFlow SMF API Quickstart

> **For Frontend Developers**: This file contains content snippets to copy/paste 
> into the documentation site. It is not rendered directly.

---

## Overview

NexFlow is an **API-first** payment infrastructure at `https://api.nexflowapp.app`. 

**How it works:**
1. **Onboard** via CLI script → get `accountId` + `apiKey`
2. **Authenticate** with `x-api-key` header (or Bearer token)
3. **Call SMF endpoints**: health, facilitators, route, verify, settle
4. **(Optional)** Set up webhooks for async payment notifications

**No dashboard required** — everything is API-driven.

---

## Step 1 — Create Account & API Key via CLI

Run the onboarding script to create a new account and receive your API key:

```bash
npx tsx scripts/onboard-account-and-key.ts --email dev@example.com
```

**Output:**

```json
{
  "accountId": "acc_abc123...",
  "email": "dev@example.com",
  "apiKey": {
    "id": "key_xyz789...",
    "name": "Default API Key",
    "token": "nf_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "role": "user"
  },
  "plan": {
    "name": "free",
    "dailyLimit": 1000,
    "monthlyLimit": 10000
  }
}
```

> ⚠️ **Save your API key immediately** — it won't be shown again.

---

## Step 2 — Set Environment Variable

Export your API key for use in subsequent commands:

```bash
export NEXFLOW_API_KEY="nf_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

Or in PowerShell:

```powershell
$env:NEXFLOW_API_KEY = "nf_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

---

## Step 3 — Test with Health Endpoint

Verify your API key works by calling the health endpoint:

```bash
curl -X GET https://api.nexflowapp.app/api/v1/smf/health \
  -H "x-api-key: $NEXFLOW_API_KEY"
```

**Expected Response:**

```json
{
  "status": "healthy",
  "summary": {
    "total": 2,
    "healthy": 2,
    "degraded": 0,
    "down": 0
  },
  "facilitators": [
    {
      "facilitatorId": "cdp",
      "name": "Coinbase Developer Platform",
      "status": "healthy",
      "metrics": {
        "successRate": 0.998,
        "p95LatencyMs": 250
      }
    }
  ],
  "timestamp": "2026-01-20T00:00:00.000Z"
}
```

---

## Step 4 — Minimal Node.js/TypeScript Example

### Using the NexFlow SDK

```typescript
import { NexFlow } from '@nexflow/sdk';

const nf = new NexFlow({
  apiKey: process.env.NEXFLOW_API_KEY!,
  // baseUrl defaults to https://api.nexflowapp.app
});

async function main() {
  // Check system health
  const healthResponse = await fetch('https://api.nexflowapp.app/api/v1/smf/health', {
    headers: { 'x-api-key': process.env.NEXFLOW_API_KEY! },
  });
  const health = await healthResponse.json();
  console.log('System status:', health.status);

  // List available facilitators
  const facilitatorsResponse = await fetch('https://api.nexflowapp.app/api/v1/smf/facilitators', {
    headers: { 'x-api-key': process.env.NEXFLOW_API_KEY! },
  });
  const facilitators = await facilitatorsResponse.json();
  console.log('Facilitators:', facilitators.count);
  
  for (const f of facilitators.facilitators) {
    console.log(`  - ${f.label}: ${f.enabled ? 'enabled' : 'disabled'} (fee: ${f.feeBps} bps)`);
  }
}

main().catch(console.error);
```

### Direct HTTP with fetch

```typescript
const API_KEY = process.env.NEXFLOW_API_KEY;
const BASE_URL = 'https://api.nexflowapp.app';

// Helper function for authenticated requests
async function smfRequest<T>(method: string, path: string, body?: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY!,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`${response.status}: ${error.message || error.error}`);
  }
  
  return response.json();
}

// Check health
const health = await smfRequest('GET', '/api/v1/smf/health');
console.log('Status:', health.status);

// List facilitators
const facilitators = await smfRequest('GET', '/api/v1/smf/facilitators');
console.log('Facilitators:', facilitators.count);

// Route a payment (1 USDC on Base)
const route = await smfRequest('POST', '/api/v1/smf/route', {
  amount_wei: '1000000',
  token_address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  chain_id: 'eip155:8453',
});
console.log('Routed to:', route.facilitator_id);
console.log('Quote ID:', route.quote_id);
console.log('Fee:', route.expected_fee_wei, 'wei');
```

---

## API Reference Quick Links

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/smf/health` | GET | System health status |
| `/api/v1/smf/facilitators` | GET | List available facilitators |
| `/api/v1/smf/route` | POST | Route a payment to best facilitator |
| `/api/v1/smf/verify` | POST | Verify a payment transaction |
| `/api/v1/smf/settle` | POST | Settle a verified payment |
| `/api/v1/webhooks` | GET | List webhook configurations |
| `/api/v1/webhooks` | POST | Create a webhook |
| `/api/v1/webhooks/{id}` | DELETE | Delete a webhook |

---

## Webhooks for Async Notifications

Webhooks allow your server to receive real-time notifications when payment events occur.

### Event Types

| Event | Description |
|-------|-------------|
| `payment.verified` | Payment successfully verified on-chain |
| `payment.failed` | Payment verification failed |
| `usage.recorded` | Usage recorded for metered endpoint |
| `session.completed` | Payment session completed |
| `endpoint.created` | New endpoint created |
| `endpoint.updated` | Endpoint configuration updated |
| `endpoint.deleted` | Endpoint deleted |

### Create a Webhook

```bash
curl -X POST https://api.nexflowapp.app/api/v1/webhooks \
  -H "x-api-key: $NEXFLOW_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://api.yoursite.com/webhooks/nexflow",
    "events": ["payment.verified", "payment.failed"]
  }'
```

**Response:**
```json
{
  "id": "wh_1737331200_abc123",
  "url": "https://api.yoursite.com/webhooks/nexflow",
  "events": ["payment.verified", "payment.failed"],
  "enabled": true,
  "secret": "whsec_abc123...",
  "createdAt": "2026-01-20T00:00:00Z",
  "updatedAt": "2026-01-20T00:00:00Z"
}
```

> ⚠️ **Save the `secret` immediately** — it's only shown once. Use it to verify webhook signatures.

### List Webhooks

```bash
curl -X GET https://api.nexflowapp.app/api/v1/webhooks \
  -H "x-api-key: $NEXFLOW_API_KEY"
```

### Delete a Webhook

```bash
curl -X DELETE https://api.nexflowapp.app/api/v1/webhooks/wh_1737331200_abc123 \
  -H "x-api-key: $NEXFLOW_API_KEY"
```

### Webhook Payload Example

When an event occurs, NexFlow sends a POST request to your webhook URL:

```json
{
  "id": "evt_1737331200_xyz789",
  "type": "payment.verified",
  "timestamp": "2026-01-20T00:00:00Z",
  "data": {
    "quote_id": "quote_abc123",
    "tx_hash": "0x1234...",
    "amount_wei": "1000000",
    "status": "confirmed"
  },
  "api_version": "2024-01"
}
```

---

## Authentication Methods

All API calls require authentication. Choose one:

### Option A: x-api-key Header (Recommended)

```bash
curl -X GET https://api.nexflowapp.app/api/v1/smf/health \
  -H "x-api-key: nf_live_xxx"
```

### Option B: Authorization Bearer

```bash
curl -X GET https://api.nexflowapp.app/api/v1/smf/health \
  -H "Authorization: Bearer nf_live_xxx"
```

---

## Error Handling

All errors return a consistent JSON shape:

```json
{
  "error": "UNAUTHORIZED",
  "message": "Invalid API key",
  "code": "INVALID_API_KEY"
}
```

| HTTP Status | Error Code | Description |
|-------------|------------|-------------|
| 400 | INVALID_REQUEST | Malformed request body |
| 401 | UNAUTHORIZED | Missing or invalid API key |
| 403 | FORBIDDEN | API key lacks required permissions |
| 404 | NOT_FOUND | Resource not found |
| 429 | RATE_LIMITED | Too many requests |
| 500 | INTERNAL_ERROR | Server error |
| 503 | SERVICE_UNAVAILABLE | System overloaded |

---

## Rate Limits

| Plan | Requests/Hour | Requests/Day | Requests/Month |
|------|---------------|--------------|----------------|
| Free | 100 | 1,000 | 10,000 |
| Starter | 500 | 5,000 | 50,000 |
| Pro | 2,500 | 25,000 | 250,000 |
| Enterprise | 10,000 | 100,000 | 1,000,000 |

Rate limit headers are included in every response:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1706140800
```
