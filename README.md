# NexFlow Deploy

NexFlow is an AI agent payment infrastructure platform built on the x402 protocol.

## Quick Start

```bash
npm install
npm run dev
```

## SMF Drop-In Facilitator SDK

A Stripe/Adyen-style payment facilitator interface for developers. The SDK provides a clean, familiar API for payments while abstracting away routing, rails, and crypto details.

### Installation

```typescript
import { createFacilitator } from '@smf/sdk';

const smf = createFacilitator({ 
  apiKey: process.env.SMF_API_KEY!,
  webhookSecret: process.env.WEBHOOK_SECRET,  // For webhook verification
  mode: 'live',  // 'live' or 'test'
  logger: {      // Optional observability
    info: (msg, meta) => console.log('[SMF]', msg, meta),
    error: (msg, meta) => console.error('[SMF]', msg, meta),
  },
  correlationIdProvider: () => requestContext.get('requestId'),
});
```

### Create a Charge

```typescript
const charge = await smf.charge({
  platformId: 'plt_123',
  merchantId: 'mrc_456',
  amount: 5000, // $50.00 in minor units (cents)
  currency: 'USD',
  paymentMethod: { type: 'card', token: 'tok_visa' },
  metadata: { order_id: 'order_123' }
});

console.log(charge.id);     // pay_xxx
console.log(charge.status); // 'succeeded'
console.log(charge.fees);   // { total: 175, breakdown: [...] }
```

### Process a Refund

```typescript
const refund = await smf.refund('pay_xxx', {
  amount: 2500, // Partial refund
  reason: 'requested_by_customer'
});
```

### Create a Payout

```typescript
const payout = await smf.payout({
  platformId: 'plt_123',
  merchantId: 'mrc_456',
  amount: 100000, // $1000.00
  currency: 'USD',
  destination: { type: 'bank_account', id: 'ba_xxx' }
});
```

### Express.js Integration

```typescript
import express from 'express';
import { createFacilitator } from '@smf/sdk';

const app = express();
const smf = createFacilitator({ apiKey: process.env.SMF_API_KEY! });

app.post('/pay', async (req, res) => {
  const charge = await smf.charge({
    platformId: 'plt_123',
    merchantId: req.body.merchantId,
    amount: req.body.amount,
    currency: 'USD',
    paymentMethod: req.body.paymentMethod
  });
  res.json(charge);
});

// Webhook handler
app.post('/webhooks/smf', smf.expressHandler(), (req, res) => {
  const event = req.smfEvent;
  switch (event.type) {
    case 'charge.succeeded': // fulfill order
    case 'charge.failed':    // notify customer
  }
  res.json({ received: true });
});
```

### Next.js App Router Integration

```typescript
// app/api/pay/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createFacilitator } from '@smf/sdk';

const smf = createFacilitator({ apiKey: process.env.SMF_API_KEY! });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const charge = await smf.charge({
    platformId: 'plt_123',
    merchantId: body.merchantId,
    amount: body.amount,
    currency: 'USD',
    paymentMethod: body.paymentMethod
  });
  return NextResponse.json(charge);
}
```

### Idempotency

Prevent duplicate charges on retries with idempotency keys:

```typescript
const charge = await smf.charge({
  platformId: 'plt_123',
  merchantId: 'mrc_456',
  amount: 5000,
  currency: 'USD',
  paymentMethod: { type: 'card', token: 'tok_visa' },
  idempotencyKey: `order_${orderId}`,  // Explicit key
  metadata: { order_id: orderId }       // Or auto-generated from order_id
});
```

- Same key + same request body = cached response returned
- Same key + different body = 409 Conflict error
- Keys expire after 24 hours

### Test Mode

Use test mode for deterministic sandbox responses:

```typescript
// Test mode via API key prefix
const testSmf = createFacilitator({ apiKey: 'sk_test_demo' });

// Or explicit mode
const testSmf = createFacilitator({ 
  apiKey: process.env.SMF_API_KEY!,
  mode: 'test' 
});

// Test amount patterns
const success = await testSmf.charge({ amount: 5000, ... });    // succeeds
const declined = await testSmf.charge({ amount: 4002, ... });   // card_declined
const threeds = await testSmf.charge({ amount: 4000, ... });    // requires_action
const nsf = await testSmf.charge({ amount: 4010, ... });        // insufficient_funds
```

| Amount | Response |
|--------|----------|
| 4000, 4001 | `requires_action` (3DS) |
| 4002 | `card_declined` |
| 4010 | `insufficient_funds` |
| 4020 | `expired_card` |
| 4030 | `processing_error` |
| 4290 | `rate_limit_error` |
| Other | `succeeded` |

### Webhook Security

Verify webhook signatures with HMAC-SHA256:

```typescript
import { verifyWebhookSignature, InvalidSignatureError } from '@smf/sdk';

app.post('/webhooks', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    const event = verifyWebhookSignature({
      payload: req.body.toString(),
      signature: req.headers['smf-signature'],
      timestamp: parseInt(req.headers['smf-timestamp']),
      secret: process.env.WEBHOOK_SECRET!,
      toleranceSeconds: 300,  // Reject if >5 min old
    });
    
    switch (event.type) {
      case 'payment.succeeded':
        fulfillOrder(event.data);
        break;
      case 'payment.failed':
        notifyCustomer(event.data);
        break;
    }
    res.json({ received: true });
  } catch (error) {
    if (error instanceof InvalidSignatureError) {
      res.status(401).json({ error: 'Invalid signature' });
    }
  }
});
```

### Error Handling with Retry Hints

Errors include `type: 'temporary' | 'permanent'` to guide retry logic:

```typescript
import { SmfError } from '@smf/sdk';

try {
  const charge = await smf.charge(req);
} catch (error) {
  if (error instanceof SmfError) {
    if (error.type === 'temporary') {
      // Retry with backoff
      const delay = error.retryAfterSeconds ?? 5;
      await sleep(delay * 1000);
      return retry();
    } else {
      // Permanent error - surface to user
      switch (error.code) {
        case 'card_declined':
        case 'insufficient_funds':
          return showCardError(error.message);
        case 'validation_error':
          return showFieldError(error.field!, error.message);
      }
    }
  }
}
```

### Run Facilitator Demo

```bash
npm run demo:facilitator
```

## SMF Production Setup

This section covers deploying the SMF Drop-In Facilitator integration for production use.

### Environment Variables

| Variable | Example | Required | Description |
|----------|---------|----------|-------------|
| `SMF_API_KEY` | `sk_live_abc123...` | Yes | SMF API key (use `sk_test_...` for test mode) |
| `SMF_MODE` | `live` or `test` | No | Explicitly set mode (defaults to `test`, auto-detects from key prefix) |
| `SMF_BASE_URL` | `https://api.smf.com/v1` | No | API base URL (uses default if not set) |
| `SMF_WEBHOOK_SECRET` | `whsec_abc123...` | Yes* | Webhook signing secret (*required for webhooks) |

### Payment API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/pay` | POST | User | Create a charge |
| `/api/refunds/:paymentId` | POST | User | Refund a charge |
| `/api/payouts` | POST | Admin | Create a merchant payout |
| `/api/webhooks/smf` | POST | Signature | Receive SMF webhook events |

### Webhook Configuration

#### Setting Up Webhooks in SMF Dashboard

1. Log into your SMF Dashboard
2. Navigate to **Developers** → **Webhooks**
3. Click **Add Endpoint**
4. Enter your webhook URL: `https://your-domain.com/api/webhooks/smf`
5. Select events to receive:
   - `payment.succeeded`
   - `payment.failed`
   - `refund.succeeded`
   - `refund.failed`
   - `payout.paid`
   - `payout.failed`
6. Copy the **Signing Secret** and set it as `SMF_WEBHOOK_SECRET`

#### Webhook Security

All webhook requests include:
- `smf-signature`: HMAC-SHA256 signature of the payload
- `smf-timestamp`: Unix timestamp (seconds) of when the event was sent

The webhook handler:
- Verifies signatures to prevent spoofing
- Rejects events older than 5 minutes (replay protection)
- Processes events idempotently (safe to receive duplicates)

#### Local Webhook Testing with ngrok

```bash
# Install ngrok if not already installed
npm install -g ngrok

# Start your local dev server
npm run dev

# In another terminal, expose your local server
ngrok http 3000

# Copy the https URL (e.g., https://abc123.ngrok.io)
# Add webhook endpoint in SMF Dashboard: https://abc123.ngrok.io/api/webhooks/smf
```

### Go-Live Checklist

#### Phase 1: Test Mode Verification
- [ ] Set `SMF_API_KEY` to your test API key (`sk_test_...`)
- [ ] Set `SMF_MODE=test`
- [ ] Verify `/api/pay` creates test charges:
  ```bash
  curl -X POST https://your-app.com/api/pay \
    -H "Authorization: Bearer YOUR_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "merchantId": "mrc_test_123",
      "amount": 5000,
      "currency": "USD",
      "paymentMethod": { "type": "card", "token": "tok_visa" }
    }'
  ```
- [ ] Test magic amounts for different scenarios:
  - `5000` → succeeds
  - `4002` → card_declined
  - `4000` → requires_action (3DS)
  - `4010` → insufficient_funds
- [ ] Set up ngrok and verify webhooks receive `payment.succeeded`
- [ ] Verify idempotency: same `orderId` returns cached response

#### Phase 2: Production Deployment
- [ ] Update `SMF_API_KEY` to live key (`sk_live_...`)
- [ ] Set `SMF_MODE=live`
- [ ] Update `SMF_BASE_URL` to production URL (if different)
- [ ] Update webhook URL in SMF Dashboard to production domain
- [ ] Update `SMF_WEBHOOK_SECRET` with production signing secret
- [ ] Verify all secrets are in your secret manager (not in `.env` files in source control)

#### Phase 3: Production Verification
- [ ] Process a small real transaction ($0.50 or minimum allowed)
- [ ] Verify the charge appears in SMF Dashboard
- [ ] Verify webhook was received and processed
- [ ] Verify charge record exists in your database
- [ ] Test a refund on the small transaction
- [ ] Monitor logs for any errors

### Database Migration

Run the SMF payments migration to create tracking tables:

```bash
npm run db:migrate
```

This creates:
- `smf_charges` - Tracks all charge operations
- `smf_refunds` - Tracks refund operations
- `smf_payouts` - Tracks payout operations  
- `smf_webhook_events` - Stores processed webhook events (for idempotency)

### Error Handling Best Practices

The SMF SDK returns errors with `type: 'temporary' | 'permanent'`:

```typescript
import { SmfError } from '@smf/sdk';

try {
  const charge = await smf.charge(request);
} catch (error) {
  if (error instanceof SmfError) {
    if (error.type === 'temporary') {
      // Safe to retry with exponential backoff
      const delay = error.retryAfterSeconds ?? 5;
      // Retry logic here
    } else {
      // Permanent error - surface to user
      // Don't retry - it will fail again
    }
  }
}
```

### Logging & Debugging

All SMF operations are logged with correlation IDs:

```
[SMF] Creating charge { merchantId: 'mrc_123', amount: 5000, correlationId: 'req_abc123' }
[SMF] Charge created { chargeId: 'pay_xyz', status: 'succeeded', correlationId: 'req_abc123' }
```

Set `LOG_LEVEL=debug` for verbose SDK logging in development.

## SMF Social Loop

Analytics system that tracks content → clicks → signups → paid calls to compute `content_score(topic, template)`. Drives strategic replies and auto-pause automation.

### Content Score Computation

Runs as a scheduled job to compute scores for all (topic, templateId) combinations:

```typescript
import { createContentScoreJob } from '@/social/analytics';

const job = createContentScoreJob({
  fetchPosts: async () => db.query('SELECT * FROM content_posts'),
  fetchClicks: async () => db.query('SELECT * FROM content_clicks'),
  fetchSignups: async () => db.query('SELECT * FROM signup_events'),
  fetchPaidCalls: async () => db.query('SELECT * FROM paid_call_events'),
  fetchImpressions: async () => new Map([['post_1', 1000]]),
  saveScores: async (scores) => db.upsert('content_insights', scores),
});

await job();
```

### Strategic Replies

Generate contextually appropriate replies based on performance and sentiment:

```typescript
import { createStrategicRepliesService } from '@/social/analytics';

const repliesService = createStrategicRepliesService({
  callLlm: async (prompt, system) => llm.complete(prompt, system),
  fetchContentInsights: async (topic, templateId) => db.getInsights(topic, templateId),
  fetchSentimentSummary: async (postId) => db.getSentiment(postId),
});

const replies = await repliesService.generate({
  postId: 'post_123',
  topic: 'x402',
  templateId: 'intro_tweet',
  metrics: { ctr: 0.05, signupRate: 0.02, paidRate: 0.01, contentScore: 75 },
  sentimentSummary: { positive: 0.6, neutral: 0.3, negative: 0.1, sampleSize: 10 }
});
```

### Auto-Pause Rules

Automatically pause underperforming or high-negative-sentiment content:

```typescript
import { createAutoPauseService } from '@/social/analytics';

const autoPause = createAutoPauseService({
  fetchActiveRules: async () => db.getActiveRules(),
  fetchContentInsights: async (topic, templateId, days) => db.getInsights(topic, templateId),
  fetchSentimentSummary: async (topic, templateId, days) => db.getSentiment(topic, templateId),
  pauseTemplate: async (topic, templateId, reason) => db.pauseTemplate(topic, templateId, reason),
  resumeTemplate: async (topic, templateId) => db.resumeTemplate(topic, templateId),
  emitEvent: async (event) => eventBus.emit(event.type, event),
});

await autoPause.run();
```

### Intent Scoring

Content scores now include intent metrics for measuring engagement quality:

```typescript
import { computeContentScores } from '@/social/analytics';

const scores = computeContentScores(inputs, {
  computeIntentScores: true,
  intentWeights: {
    avgTimeOnPage: 0.3,  // Time spent reading
    featureViews: 0.3,   // Feature/how-it-works pages
    pricingViews: 0.4,   // Pricing pages (strong intent signal)
  },
});

// scores[0].intentScore = 72
// scores[0].intentMetrics = { avgTimeOnPage: 45, featureViews: 3, pricingViews: 2 }
```

### Lead Scoring

User-level lead scores derived from funnel events:

```typescript
import { createLeadScoreService } from '@/social/analytics';

const leadService = createLeadScoreService({
  fetchClicksForUser: async (userId) => db.getClicksByUser(userId),
  fetchSignupsForUser: async (userId) => db.getSignupsByUser(userId),
  fetchPaidCallsForUser: async (userId) => db.getPaidCallsByUser(userId),
  fetchIntentMetricsForUser: async (userId) => db.getIntentByUser(userId),
  fetchUsersWithRecentActivity: async (days) => db.getRecentUsers(days),
  saveLeadScore: async (score) => db.saveLeadScore(score),
  getLeadScore: async (userId) => db.getLeadScore(userId),
  getLeadScoresByTier: async (tier) => db.getLeadScoresByTier(tier),
});

// Compute for a user
const score = await leadService.computeForUser('user_123');
// score.score = 67
// score.tier = 'hot'
// score.components = { clickScore: 12, signupScore: 10, paidCallScore: 40, intentScore: 5 }

// Run batch job
const result = await leadService.runJob();
// result.tierBreakdown = { cold: 150, warm: 80, hot: 45, customer: 25 }
```

Scoring weights:
- Click: +1 (max 20)
- Signup: +10
- First paid call: +40
- High-intent views: +5

Tier thresholds:
| Tier | Score Range |
|------|-------------|
| cold | 0-24 |
| warm | 25-49 |
| hot | 50-74 |
| customer | 75+ |

### Strategic Reply Tracking

Track which reply variants perform best for A/B optimization:

```typescript
import { createStrategicReplyTrackingService } from '@/social/analytics';

const tracking = createStrategicReplyTrackingService({
  saveReply: async (reply) => db.saveReply(reply),
  saveUsage: async (usage) => db.saveUsage(usage),
  getUsage: async (id) => db.getUsage(id),
  updateUsage: async (usage) => db.updateUsage(usage),
  getUsagesPendingMetrics: async () => db.getPendingUsages(),
  getUsagesByVariant: async () => db.getUsagesByVariant(),
  fetchMetricsForUsage: async (usage) => analytics.getMetrics(usage),
  performanceWindowHours: 72,  // Measure performance over 72h
});

// Record usage when reply is posted
const usage = await tracking.recordUsage(reply, 'twitter', tweetId);

// Get variant performance
const performance = await tracking.getPerformanceByVariant();
// [
//   { variant: 'soft-cta', avgSignups: 1.2, conversionRate: 0.08 },
//   { variant: 'hard-cta', avgSignups: 0.8, conversionRate: 0.05 },
// ]

// Adjust replies based on lead score
import { adjustReplyForLeadScore } from '@/social/analytics';
const adjusted = adjustReplyForLeadScore(reply, leadScore);
// hot leads get hard-cta, cold leads get soft-cta
```

### Social Loop Scripts

```bash
# Compute content scores
npm run social:score-job

# Run auto-pause rules
npm run social:auto-pause

# Compute lead scores
npm run social:lead-score

# Dry-run modes
npm run social:score-job -- --dry-run
npm run social:auto-pause -- --dry-run
```

### Social Loop Cron Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/cron/content-score` | POST | Compute content scores |
| `/api/cron/auto-pause` | POST | Evaluate auto-pause rules |
| `/api/cron/lead-score` | POST | Compute user lead scores |

### Database Migrations

```bash
# Run all social analytics migrations
npm run db:migrate

# Or run specific migrations
npm run db:migrate:idempotency      # 023 - Idempotency keys table
npm run db:migrate:leads            # 024 - Lead scores table
npm run db:migrate:reply-tracking   # 025 - Strategic reply tracking
```

## X Posting Integration

Post to X (Twitter) from SMF agents with the included X service and client.

### Setup X Service

```bash
# Start the X posting service (separate terminal)
cd x-service
cp .env.example .env  # Fill in your X API credentials
npm install
npm run dev
```

The X service runs on `http://localhost:3001`. Connect your X account at `/auth/x/login`.

See `x-service/README.md` for full setup instructions.

### SMF X Client

Use the `XPostingClient` to post tweets from SMF agents:

```typescript
import { createXPostingClientFromEnv, XPostingError } from './src/integrations/xClient';

const client = createXPostingClientFromEnv();

const result = await client.postTweet(
  'Hello from NexFlow SMF! 🚀',
  {
    agentId: 'nexflow-agent',
    topic: 'intro',
    intent: 'awareness',
    correlationId: `req-${Date.now()}`
  }
);

console.log(`Posted tweet: ${result.tweetId}`);
```

### Environment Variables

```bash
# X Posting Client
# For local:  http://localhost:3001
# For prod:   https://your-x-service-domain.com
X_POSTING_BASE_URL=http://localhost:3001
X_POSTING_API_KEY=                         # Optional: for future auth

# X Social Integration (SMF)
X_SOCIAL_ENABLED=true                      # Enable X posting
X_SOCIAL_AGENT_ID=smf-social-agent         # Default agent ID
X_SOCIAL_MAX_POSTS_PER_DAY=10              # Daily limit
```

### Run Demos

```bash
# Basic X posting demo
npm run demo:x-post

# Full SMF social integration demo
npm run demo:social-x
```

### Error Handling

The client handles rate limits with automatic retries:

```typescript
try {
  const result = await client.postTweet(text, meta, { maxRetries: 2 });
} catch (error) {
  if (error instanceof XPostingError) {
    switch (error.response.code) {
      case 'RATE_LIMIT':
        // Client already retried; wait longer or queue
        break;
      case 'AUTH_ERROR':
        // Prompt to re-connect X account
        break;
      case 'VALIDATION_ERROR':
        // Fix the request
        break;
    }
  }
}
```

## Daily SMF Social Pipeline

Automatically generate and post daily performance updates to X.

### How It Works

1. **Snapshot Aggregation** - Collects facilitator metrics from x402scan and Scattering
2. **Social Summary** - Builds highlights with top 3 facilitators
3. **LLM Tweet Generation** - Uses OpenAI/Anthropic with strict guardrails
4. **Post to X** - Via the deployed X Posting Service

### Guardrails

The tweet generator includes comprehensive safety checks:
- ❌ No invented metrics (only uses actual data)
- ❌ No financial advice or profit promises
- ❌ No internal URLs (localhost, etc.)
- ❌ No hype terms (moon, insane, etc.)
- ✅ Max 240 chars per tweet
- ✅ Max 1 emoji per tweet
- ✅ Only #NexFlow and #x402 hashtags

### Running the Pipeline

```bash
# Full pipeline with real data
npm run social:daily

# Dry run (generate tweets but don't post)
npm run social:daily:dry

# Test with mock data (no API calls)
npm run social:daily:mock
```

### Environment Variables for Social Pipeline

```bash
# X Posting (required)
X_POSTING_BASE_URL=https://nexflow-production.up.railway.app
X_SOCIAL_ENABLED=true
X_SOCIAL_AGENT_ID=smf-social-agent
X_SOCIAL_MAX_POSTS_PER_DAY=10

# LLM (required for tweet generation)
LLM_PROVIDER=openai                    # or 'anthropic'
OPENAI_API_KEY=sk-...                  # your OpenAI key
LLM_MODEL=gpt-4o-mini                  # or claude-3-haiku-20240307
```

### Scheduling (Production)

A GitHub Actions workflow is included at `.github/workflows/daily-social.yml`.

**It runs automatically at 9:00 AM UTC daily.**

#### Setup GitHub Secrets

Go to your repo → Settings → Secrets and variables → Actions → New repository secret:

| Secret | Value |
|--------|-------|
| `X_POSTING_BASE_URL` | `https://nexflow-production.up.railway.app` |
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `DATABASE_URL` | Your PostgreSQL connection string (optional) |

#### Manual Trigger

You can also trigger it manually:
1. Go to Actions tab in GitHub
2. Select "Daily SMF Social Pipeline"
3. Click "Run workflow"
4. Optionally enable dry-run or mock-data mode

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start NexFlow development server |
| `npm run build` | Build for production |
| `npm run x-service:dev` | Start X posting service |
| `npm run demo:x-post` | Run X posting demo |
| `npm run demo:social-x` | Run SMF social X integration demo |
| `npm run social:daily` | Run daily social pipeline (post tweets) |
| `npm run social:daily:dry` | Dry run (no posting) |
| `npm run social:daily:mock` | Test with mock data |
| `npm run db:migrate` | Run database migrations |
| `npm run dogfood` | Run dogfood agent |
| `npm run scout` | Run scout agent |
| `npm run pull:x402scan-observability` | Pull x402scan metrics |
| `npm run pull:scattering-metrics` | Pull Scattering/Dune metrics |
| `npm run pull:all-metrics` | Pull all external metrics |

## Scheduled Jobs (GitHub Actions)

Automated jobs run via `.github/workflows/scheduled-jobs.yml`:

| Job | Schedule | Description |
|-----|----------|-------------|
| **Dogfood Agent** | Every 2 hours | Exercises NexFlow end-to-end across all facilitators |
| **Scout Agent** | Every 4 hours | Discovers under-used but promising routes |
| **Pull Metrics** | Every 6 hours | Fetches x402scan + Scattering/Dune data |
| **Daily Social** | 9 AM UTC | Posts SMF updates to X (separate workflow) |

### Required Secrets

| Secret | Description |
|--------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `X_POSTING_BASE_URL` | Railway X service URL |
| `ANTHROPIC_API_KEY` | For tweet generation |
| `SCATTERING_BASE_URL` | *(optional)* Scattering API URL |

### Manual Trigger

Run any job manually from GitHub Actions → "Scheduled Jobs" → Run workflow

## Runtime Guarantees

NexFlow is hardened for production-grade reliability. This section documents the operational guarantees and resilience patterns in place.

### Circuit Breakers

All external API calls are protected by circuit breakers to prevent cascading failures:

| Service | Failure Threshold | Reset Timeout | Status Check |
|---------|------------------|---------------|--------------|
| Agent Coordinator → Facilitator Ranking | 3 failures | 60 seconds | `getCoordinatorCircuitBreakerStats()` |
| Agent Coordinator → Meta Facilitator | 3 failures | 60 seconds | `getCoordinatorCircuitBreakerStats()` |
| Agent Coordinator → Watchlist | 3 failures | 60 seconds | `getCoordinatorCircuitBreakerStats()` |
| x402scan Observability | 3 failures | 60 seconds | `getX402ScanCircuitBreakerStats()` |
| Scattering Metrics | 3 failures | 60 seconds | `getScatteringCircuitBreakerStats()` |

**Fallback behavior:** When circuits open, cached data (stale-while-revalidate) is served with a warning log.

### Retry & Backoff Policies

| Operation | Max Attempts | Backoff | Jitter |
|-----------|--------------|---------|--------|
| Webhook Delivery | 5 | Exponential (1s → 5min) | ±20% |
| SMF API Calls | Per SDK config | Exponential | Yes |
| Database Queries | 1 (timeout-protected) | N/A | N/A |

**Dead Letter Queue:** Failed webhooks after max attempts are sent to DLQ for manual review.

### Rate Limiting

Distributed rate limiting via Upstash Redis with in-memory fallback:

| Tier | Limit | Window |
|------|-------|--------|
| Global (per IP) | 1,000 requests | 1 hour |
| Endpoint (per IP) | 100 requests | 1 minute |
| API Key (free) | 100 requests | 1 hour |
| API Key (starter) | 1,000 requests | 1 hour |
| API Key (pro) | 5,000 requests | 1 hour |
| API Key (enterprise) | 50,000 requests | 1 hour |
| Cron Jobs | 1 request | Per job interval |

### Cron Job Guarantees

All scheduled jobs are wrapped with standardized tracking:

- **Run Tracking:** Every execution logged to `cron_job_runs` table
- **Concurrent Prevention:** Rate limiting prevents overlapping runs
- **Timeout Protection:** Configurable per-job (default 60s)
- **Failure Alerting:** Slack/PagerDuty alerts after 3+ consecutive failures
- **Recovery Notification:** Auto-notifies when jobs recover

### Observability Endpoints

| Endpoint | Purpose | Auth |
|----------|---------|------|
| `GET /api/health` | System health (DB, Redis, circuit breakers) | Public |
| `HEAD /api/health` | Simple availability check | Public |
| `GET /api/metrics/rate-limits` | Rate limit statistics | API Key |
| `GET /api/metrics/requests` | Request latency histograms (p50/p95/p99) | API Key |
| `GET /api/metrics/webhooks` | Webhook delivery metrics | API Key |

### Database Guarantees

| Guarantee | Configuration |
|-----------|---------------|
| Query Timeout | 30 seconds (configurable via `DB_STATEMENT_TIMEOUT_MS`) |
| Connection Pool | 10 max, 2 min (configurable via `DB_POOL_*`) |
| Idle Timeout | 30 seconds |
| Max Lifetime | 30 minutes (prevents stale connections) |
| Health Check | `getPoolStats()` for monitoring |

### Security Monitoring

Real-time threat detection with gradual enforcement:

| Category | Detection | Enforcement |
|----------|-----------|-------------|
| SQL Injection | ✅ Active | `SECURITY_ENFORCE_SQL_INJECTION` |
| XSS | ✅ Active | `SECURITY_ENFORCE_XSS` |
| Path Traversal | ✅ Active | `SECURITY_ENFORCE_PATH_TRAVERSAL` |
| Command Injection | ✅ Active | `SECURITY_ENFORCE_COMMAND_INJECTION` |
| Auth Bypass | ✅ Active | `SECURITY_ENFORCE_AUTH_BYPASS` |

**Shadow Mode:** New rules start in log-only mode. Set `SECURITY_SHADOW_MODE=false` to enforce blocking.

**Auto-Block:** IPs exceeding 10 violations in 5 minutes are automatically blocked.

### Webhook Guarantees

| Guarantee | Implementation |
|-----------|----------------|
| Signature Verification | HMAC-SHA256 via `@smf/sdk` |
| Timestamp Validation | Rejects events older than 5 minutes |
| Idempotency | Events tracked in `smf_webhook_events` table |
| Retry with Backoff | 5 attempts, exponential backoff with jitter |
| Dead Letter Queue | Failed events preserved for manual review |

### Correlation ID Propagation

Request tracing is thread-safe via `AsyncLocalStorage`:

```typescript
import { withSmfCorrelation } from '@/payments/smfClient';

// All SMF calls within this context share the same correlation ID
const result = await withSmfCorrelation(requestId, async () => {
  return smf.charge({ ... });
});
```

### Endpoint Hardening

Automated checks prevent route handler regressions:

| Check | Command | Purpose |
|-------|---------|---------|
| Endpoint Health | `npm run test:endpoint-health` | Integration tests for all dynamic routes |
| Async Params Lint | `npm run lint:async-params` | Catches Next.js 15+ params issues |

**Regression Prevention:**
- Tests detect 400 errors that indicate broken route handlers
- Lint rule catches synchronous params access before deployment
- CI/CD should run both checks on every PR

---

## Project Structure

```
nexflow-deploy/
├── src/
│   ├── config/
│   │   └── social.ts           # X social posting configuration
│   ├── integrations/
│   │   ├── xClient.ts          # X Posting Client for SMF
│   │   └── xClient.types.ts    # Type definitions
│   ├── social/                 # Daily Social Pipeline
│   │   ├── types.ts            # Core types
│   │   ├── snapshotAggregator.ts  # Metrics aggregation
│   │   ├── socialSummaryBuilder.ts # Summary generation
│   │   ├── tweetGenerator.ts   # LLM + guardrails
│   │   ├── topFacilitators.ts  # Ranking logic
│   │   └── pipelineRunner.ts   # Orchestration
│   ├── cli/
│   │   └── runDailySocial.ts   # CLI entrypoint
│   ├── lib/
│   │   └── llm.ts              # LLM abstraction (OpenAI/Anthropic)
│   ├── examples/
│   │   ├── postToX.ts          # Basic X posting demo
│   │   └── demoSocialX.ts      # Full SMF social integration demo
│   └── ...
├── x-service/                  # Standalone X OAuth + Posting Service
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── storage/
│   │   ├── types/
│   │   └── utils/
│   ├── Dockerfile              # For container deployment
│   └── README.md
└── ...
```

## Deploying X Service

The X service can be deployed to any Node.js hosting platform (Render, Railway, Fly, etc.):

1. **Deploy the X service** (see `x-service/README.md` for detailed instructions)

2. **Update X Developer Portal** with production callback URL:
   ```
   https://your-x-service-domain.com/auth/x/callback
   ```

3. **Set SMF environment variables:**
   ```bash
   X_POSTING_BASE_URL=https://your-x-service-domain.com
   X_SOCIAL_ENABLED=true
   ```

4. **Connect X account** by visiting:
   ```
   https://your-x-service-domain.com/auth/x/login
   ```

5. **Test the integration:**
   ```bash
   npm run demo:social-x
   ```

## Rate Limits

X Free tier: ~500 posts/month
X Basic tier ($100/month): ~3,000 posts/month

Plan accordingly and implement queuing for high-volume agents.

## License

Proprietary - NexFlow
