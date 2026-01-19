# NexFlow Agent Manifest v1

> **"NexFlow is the x402-native metered billing and routing brain for AI agents and SaaS APIs."**

This document defines the **Agent Manifest v1** specification for NexFlow's Smart Meta-Facilitator (SMF). The manifest enables machine-to-machine discovery, allowing AI agents and automated systems to understand NexFlow's capabilities and invoke them programmatically.

---

## 🔗 Live Endpoints

| Path | Description |
|------|-------------|
| `GET /.well-known/agent-manifest` | Standard discovery path |
| `GET /api/agent/manifest` | Primary manifest endpoint |
| `POST /api/agent/discover-actions` | Search paid actions by intent |
| `GET /api/agent/discover-actions` | List all available actions |

**Base URL:** `https://api.nexflowapp.app`

---

## 📋 Manifest v1 Specification

```json
{
  "id": "agent:nexflow-smf",
  "name": "NexFlow Smart Meta-Facilitator",
  "version": "0.1.0",
  "description": "x402-native metered billing and routing brain for AI agents and SaaS APIs.",
  "charter": "NexFlow is the x402-native metered billing and routing brain for AI agents and SaaS APIs. All capabilities end in a paid, metered action routed through the NexFlow SMF.",
  "endpoints": {
    "http": "https://api.nexflowapp.app/api/agent",
    "status": "https://api.nexflowapp.app/api/health",
    "manifest": "https://api.nexflowapp.app/api/agent/manifest",
    "discover": "https://api.nexflowapp.app/api/agent/discover-actions"
  },
  "transports": ["http-json"],
  "pricing": {
    "currency": "USDC",
    "model": "per-unit-metered",
    "hint": "Small routing surcharge on top of underlying API costs. Most actions are metered per-unit.",
    "chains": ["eip155:8453"],
    "examplePrice": {
      "amount": "0.0015",
      "unit": "execution",
      "description": "Pulse scheduled job execution"
    }
  },
  "contact": {
    "docs": "https://docs.nexflowapp.app",
    "support": "support@nexflowapp.app",
    "github": "https://github.com/moejeaux/nexflow-smf-public"
  },
  "metadata": {
    "supportsX402": true,
    "primaryNetwork": "base",
    "primaryToken": "USDC",
    "settlementContract": "0x43A04228152115fDd5663B2Aa559Ebd84D17A49D",
    "sdk": {
      "packageName": "@nexflow-smf/smf",
      "npmPublished": true,
      "install": "npm install @nexflow-smf/smf",
      "source": "https://github.com/moejeaux/nexflow-smf-public"
    }
  }
}
```

---

## 🎯 Capabilities

The manifest exposes four core capabilities. Each capability represents a discrete, billable operation that agents can invoke.

### 1. `nexflow.route_payment`

**Purpose:** Route and execute x402 payments with intelligent facilitator selection.

This is the core value proposition of NexFlow—agents don't need to know which facilitator to use or how to construct payment headers. NexFlow selects the optimal route based on cost, latency, and reliability, then returns a ready-to-use payment header.

**When to use:**
- Your agent needs to pay for an x402-protected API
- You want automatic facilitator selection and failover
- You need budget controls and policy enforcement

```json
{
  "id": "nexflow.route_payment",
  "name": "Route Payment",
  "category": "routing",
  "endpoint": "/api/v1/x402/route",
  "method": "POST",
  "pricingHint": "Small routing surcharge (typically 0.1-0.5%) on top of underlying payment",
  "schema": {
    "inputs": {
      "resource_url": {
        "type": "string",
        "description": "The URL of the x402-protected resource to pay for",
        "required": true,
        "example": "https://api.example.com/premium/data"
      },
      "max_budget": {
        "type": "number",
        "description": "Maximum amount to spend in USDC (e.g., 1.00 = 1 USDC)",
        "required": true,
        "example": 1.0
      },
      "policy_hint": {
        "type": "string",
        "description": "Routing policy: \"prefer-cheapest\", \"low-latency\", \"high-reliability\"",
        "required": false,
        "default": "prefer-cheapest"
      },
      "network": {
        "type": "string",
        "description": "CAIP-2 network identifier (e.g., \"eip155:8453\" for Base)",
        "required": false,
        "default": "eip155:8453"
      }
    },
    "outputs": {
      "payment_header": {
        "type": "string",
        "description": "The x402-payment header value to include in your request"
      },
      "expected_cost": {
        "type": "number",
        "description": "Expected cost in USDC"
      },
      "facilitator_id": {
        "type": "string",
        "description": "The facilitator selected for this route"
      },
      "trace_url": {
        "type": "string",
        "description": "URL to inspect routing decision and trace"
      }
    }
  }
}
```

---

### 2. `nexflow.run_metered_action`

**Purpose:** Execute pre-built, metered actions from NexFlow's catalog.

NexFlow maintains a catalog of ready-to-run actions (Shopify monitoring, lead scoring, data enrichment, etc.). Each action is billed per-unit with transparent pricing. This capability lets agents invoke these actions without managing the underlying infrastructure.

**When to use:**
- You need a common integration (Shopify, Salesforce, HubSpot, etc.)
- You want pay-per-use pricing without subscription overhead
- You need guaranteed execution with receipts and audit trail

```json
{
  "id": "nexflow.run_metered_action",
  "name": "Run Metered Action",
  "category": "metering",
  "endpoint": "/api/v1/run",
  "method": "POST",
  "pricingHint": "Per-unit pricing varies by action (typically 0.001-0.10 USDC per unit)",
  "schema": {
    "inputs": {
      "action_id": {
        "type": "string",
        "description": "The ID of the metered action (e.g., \"shopify.monitor_store.basic\")",
        "required": true,
        "example": "shopify.monitor_store.basic"
      },
      "params": {
        "type": "object",
        "description": "Action-specific parameters",
        "required": true,
        "example": { "store_url": "https://my-store.myshopify.com" }
      },
      "budget": {
        "type": "number",
        "description": "Maximum budget for this action run in USDC",
        "required": true,
        "example": 0.50
      }
    },
    "outputs": {
      "result": {
        "type": "object",
        "description": "The action result (shape varies by action)"
      },
      "units_consumed": {
        "type": "number",
        "description": "Number of billable units consumed"
      },
      "total_cost": {
        "type": "number",
        "description": "Total cost in USDC"
      },
      "receipts": {
        "type": "array",
        "description": "Array of payment receipt objects"
      }
    }
  }
}
```

---

### 3. `nexflow.healthcheck_x402_endpoint`

**Purpose:** Pre-flight verification of x402 endpoints before committing funds.

Before routing payments to an unfamiliar endpoint, agents can probe it to verify it responds correctly to x402 protocol. This prevents wasted transactions on misconfigured or malicious endpoints.

**When to use:**
- Validating a new x402 endpoint before first payment
- Monitoring endpoint health over time
- Debugging payment failures

```json
{
  "id": "nexflow.healthcheck_x402_endpoint",
  "name": "Healthcheck x402 Endpoint",
  "category": "health",
  "endpoint": "/api/v1/x402/health",
  "method": "POST",
  "pricingHint": "Free (no charge for health probes)",
  "schema": {
    "inputs": {
      "endpoint_url": {
        "type": "string",
        "description": "The x402 endpoint URL to probe",
        "required": true,
        "example": "https://api.example.com/paid-resource"
      },
      "check_idempotency": {
        "type": "boolean",
        "description": "Whether to verify idempotency behavior (may incur small test payment)",
        "required": false,
        "default": false
      }
    },
    "outputs": {
      "status": {
        "type": "string",
        "description": "\"passing\" if healthy, \"failing\" otherwise"
      },
      "details": {
        "type": "object",
        "description": "Health check details: latency, 402 response, facilitator support"
      },
      "requirements_detected": {
        "type": "object",
        "description": "Parsed x402 payment requirements from the endpoint"
      }
    }
  }
}
```

---

### 4. `nexflow.discover_paid_actions`

**Purpose:** Search NexFlow's action catalog by natural language intent.

Agents can search for relevant paid actions without knowing exact IDs. This enables intent-driven discovery—describe what you want to do, and NexFlow returns matching actions with pricing.

**When to use:**
- Finding available integrations for a use case
- Comparing pricing across similar actions
- Building dynamic agent workflows that adapt to available capabilities

```json
{
  "id": "nexflow.discover_paid_actions",
  "name": "Discover Paid Actions",
  "category": "discovery",
  "endpoint": "/api/agent/discover-actions",
  "method": "POST",
  "pricingHint": "Free (no charge for discovery)",
  "schema": {
    "inputs": {
      "intent": {
        "type": "string",
        "description": "Natural language intent (e.g., \"monitor shopify store\")",
        "required": true,
        "example": "monitor shopify store"
      },
      "constraints": {
        "type": "object",
        "description": "Optional filters: max_price, category, tags",
        "required": false,
        "example": { "max_price": 1.0, "category": "ecommerce" }
      }
    },
    "outputs": {
      "results": {
        "type": "array",
        "description": "Matching actions with action_id, description, price_hint, endpoint"
      },
      "total": {
        "type": "number",
        "description": "Total number of matches"
      }
    }
  }
}
```

---

## 🚀 Integration Examples

### Fetch the Manifest

```bash
curl https://api.nexflowapp.app/.well-known/agent-manifest
```

### Discover Actions by Intent

```bash
curl -X POST https://api.nexflowapp.app/api/agent/discover-actions \
  -H "Content-Type: application/json" \
  -d '{"intent": "score salesforce leads", "constraints": {"max_price": 0.50}}'
```

**Response:**
```json
{
  "results": [
    {
      "action_id": "salesforce.score_leads",
      "description": "Score Salesforce leads using NexFlow AI models.",
      "price_hint": 0.15,
      "endpoint": "https://api.nexflowapp.app/api/v1/run",
      "category": "crm",
      "tags": ["salesforce", "leads", "scoring"]
    }
  ],
  "total": 1,
  "query": { "intent": "score salesforce leads", "constraints": { "max_price": 0.50 } }
}
```

### Route a Payment

```bash
curl -X POST https://api.nexflowapp.app/api/v1/x402/route \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer nf_live_xxx" \
  -d '{
    "resource_url": "https://api.example.com/premium/data",
    "max_budget": 1.0,
    "policy_hint": "prefer-cheapest"
  }'
```

---

## 📐 Design Principles

1. **All paths lead to paid actions.** Every capability in the manifest ultimately results in a metered, billable operation routed through the SMF.

2. **Intent-driven discovery.** Agents shouldn't need to memorize action IDs. Natural language search enables dynamic, adaptive workflows.

3. **Budget as a first-class parameter.** Every capability that costs money requires an explicit budget, preventing runaway spending.

4. **Transparency in pricing.** Each capability includes a `pricingHint` so agents can estimate costs before invoking.

5. **Standard transports.** HTTP + JSON as the baseline. SSE/WebSocket for streaming where appropriate.

---

## 🔗 Related Links

- **Live Manifest:** https://api.nexflowapp.app/api/agent/manifest
- **API Documentation:** https://docs.nexflowapp.app
- **Settlement Contract:** [0x43A04228152115fDd5663B2Aa559Ebd84D17A49D](https://basescan.org/address/0x43A04228152115fDd5663B2Aa559Ebd84D17A49D)
- **GitHub:** https://github.com/moejeaux/nexflow-smf-public

---

## 📄 License

MIT License - This specification is open for adoption by other x402 ecosystem participants.
