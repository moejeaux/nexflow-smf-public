# Monetize an Existing API at the Edge

**15-minute quickstart: gate any CloudFront path behind x402 micropayments using Lambda@Edge.**

No backend changes. No auth server. No billing tiers. Just a Lambda function that verifies payment on the way in and settles on the way out.

> **Billing:** You only pay when your paywalled endpoint is successfully served.
> Billing unit: successful settlement (`POST /x402/settle`). Verify is **not** billed.
> No subscriptions. No pre-funded balance. Pay-per-use only.

---

## Prerequisites

- **AWS account** with permissions to create Lambda functions and modify CloudFront distributions
- **CloudFront distribution** (existing or new) pointed at your API origin
- **Node.js >= 20**
- **AWS CLI v2** configured (`aws configure`)
- **NexFlow API key** — sign up or log in at [nexflowapp.app](https://nexflowapp.app), go to **Developers → API Keys**, and click **Create API key**

---

## Architecture

```
Client
  │  x402-payment header
  ▼
CloudFront (viewer-request)
  │
  ▼
Lambda@Edge ──► NexFlow /verify (not billed)
  │                  │
  │            valid? attach settlementIntentId
  │                  │
  ▼                  ▼
Origin (your API)    402 if invalid
  │
  ▼
CloudFront (origin-response)
  │
  ▼
Lambda@Edge ──► NexFlow /settle (billable event)
  │              (if status < 400)
  ▼
Response to Client
```

| Trigger | What happens |
|---|---|
| **viewer-request** | Verify payment (not billed) — Lambda forwards request headers to NexFlow `/x402/verify`. If valid, attaches the returned `settlementIntentId` and forwards to origin. If invalid or missing, returns `402 Payment Required`. |
| **origin-response** | Settle payment (billable event) — Lambda reads the `settlementIntentId` from headers. If the origin responded with status < 400, calls `/x402/settle` to confirm delivery. Returns the origin response unchanged. |

---

## What's in This Folder

```
aws-cloudfront-lambdaedge/
├── handler.ts              # Lambda@Edge entry point (viewer-request + origin-response)
├── nexflowFacilitator.ts   # NexFlow Facilitator client (/verify + /settle)
├── routes.ts               # Route table — which paths are gated
├── types.ts                # Shared TypeScript interfaces
├── esbuild.config.mjs      # Bundler config (→ dist/handler.js)
├── tsconfig.json
├── package.json
├── scripts/
│   └── package.mjs         # Creates lambda-edge.zip
└── README.md               # You are here
```

---

## Step 1: Clone & Install

```bash
git clone https://github.com/moejeaux/nexflow-smf-public.git
cd nexflow-smf-public/examples/aws-cloudfront-lambdaedge
npm install
```

---

## Step 2: Configure Routes

Open `routes.ts` and map the paths you want to gate:

```typescript
export const routes: Record<string, RouteConfig> = {
  '/api/*': {
    network: 'eip155:8453',    // Base mainnet
    resourceId: 'joke-endpoint',
  },
  '/premium/*': {
    network: 'eip155:8453',
    resourceId: 'premium-data',
  },
}
```

- Patterns ending with `/*` match any path starting with the prefix
- Exact patterns match only the literal path
- Paths not listed here pass through CloudFront untouched

---

## Step 3: Configure Keys

The build bakes two values into the bundle (Lambda@Edge doesn't support runtime env vars):

| Variable | Value |
|---|---|
| `NEXFLOW_FACILITATOR_URL` | `https://api.nexflowapp.app/api/v1/facilitator/x402` |
| `NEXFLOW_API_KEY` | Your key from Developers → API Keys at [nexflowapp.app](https://nexflowapp.app) |

---

## Step 4: Build & Package

```bash
NEXFLOW_FACILITATOR_URL=https://api.nexflowapp.app/api/v1/facilitator/x402 \
NEXFLOW_API_KEY=nf_live_your_key_here \
npm run build
```

Then zip it:

```bash
npm run package
```

This creates `lambda-edge.zip` (~30KB) ready for deployment.

> **Windows (PowerShell):**
> ```powershell
> $env:NEXFLOW_FACILITATOR_URL="https://api.nexflowapp.app/api/v1/facilitator/x402"
> $env:NEXFLOW_API_KEY="nf_live_your_key_here"
> npm run build
> npm run package
> ```

---

## Step 5: Deploy the Lambda

```bash
# Create the function (must be us-east-1 for Lambda@Edge)
aws lambda create-function \
  --region us-east-1 \
  --function-name nexflow-x402-edge \
  --runtime nodejs20.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-edge-role \
  --handler handler.handler \
  --zip-file fileb://lambda-edge.zip \
  --timeout 5 \
  --memory-size 128

# Publish a numbered version (Lambda@Edge requires this)
aws lambda publish-version \
  --region us-east-1 \
  --function-name nexflow-x402-edge
```

Note the **version ARN** from the output — you'll need it next.

> **IAM role:** The Lambda execution role needs basic Lambda permissions. No VPC or special access required. See [AWS docs](https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html) for the trust policy.

---

## Step 6: Attach to CloudFront

```bash
aws cloudfront get-distribution-config \
  --id YOUR_DISTRIBUTION_ID > dist-config.json
```

Add **both** Lambda associations to the default cache behavior:

```json
{
  "LambdaFunctionAssociations": {
    "Quantity": 2,
    "Items": [
      {
        "LambdaFunctionARN": "arn:aws:lambda:us-east-1:YOUR_ACCOUNT_ID:function:nexflow-x402-edge:1",
        "EventType": "viewer-request",
        "IncludeBody": false
      },
      {
        "LambdaFunctionARN": "arn:aws:lambda:us-east-1:YOUR_ACCOUNT_ID:function:nexflow-x402-edge:1",
        "EventType": "origin-response",
        "IncludeBody": false
      }
    ]
  }
}
```

Update the distribution:

```bash
aws cloudfront update-distribution \
  --id YOUR_DISTRIBUTION_ID \
  --distribution-config file://dist-config.json \
  --if-match ETAG_FROM_GET
```

CloudFront takes 5-15 minutes to deploy globally.

---

## Step 7: Test It

### Without payment (expect 402)

```bash
curl -i https://your-distribution.cloudfront.net/api/joke
```

```
HTTP/2 402
content-type: application/json

{
  "status": "payment_required",
  "message": "x402 payment required to access this resource.",
  "requirement": {
    "scheme": "exact",
    "network": "eip155:8453",
    "asset": "USDC",
    "amountDisplay": "0.001000",
    ...
  }
}
```

### With payment proof (expect 200)

```bash
curl -i https://your-distribution.cloudfront.net/api/joke \
  -H "x402-payment: <base64-payment-proof>"
```

```
HTTP/2 200
content-type: application/json

{"joke": "Why do programmers prefer dark mode? Because light attracts bugs."}
```

> **Stubbing a payment for testing:** Use a NexFlow test key (`nf_test_*`) during development. Test keys accept a special stub proof so you can validate the full flow without real USDC.

---

## Teardown

Remove the Lambda associations from CloudFront, then delete the resources:

```bash
# 1. Remove Lambda associations from CloudFront
#    Edit dist-config.json: set LambdaFunctionAssociations.Quantity to 0 and Items to []
aws cloudfront update-distribution \
  --id YOUR_DISTRIBUTION_ID \
  --distribution-config file://dist-config.json \
  --if-match CURRENT_ETAG

# 2. Wait for CloudFront to deploy (check status)
aws cloudfront get-distribution --id YOUR_DISTRIBUTION_ID \
  --query "Distribution.Status"

# 3. Delete the Lambda function
aws lambda delete-function \
  --region us-east-1 \
  --function-name nexflow-x402-edge
```

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `500` on every request | Check that `NEXFLOW_FACILITATOR_URL` and `NEXFLOW_API_KEY` are correct and the Lambda can reach the NexFlow API. |
| `402` even with payment | Verify the `x402-payment` header is present and correctly formatted. Check CloudWatch logs. |
| Lambda not triggering | Confirm both `viewer-request` and `origin-response` associations are attached and you published a numbered version. |
| Settle not logging | Confirm the `origin-response` trigger is attached. Check CloudWatch for `settle_skipped` events. |

---

## Further Reading

- [Facilitator API Reference](../../docs/facilitator-api.md) — Full `/verify` and `/settle` contract
- [Production Checklist](../../docs/production-checklist.md) — Idempotency, logging, failure modes, key rotation
- [Pricing](../../PRICING.md) — Settle-only pricing with example scenarios
- [NexFlow](https://nexflowapp.app) — Developers → API Keys to create keys; monitor usage in dashboard
