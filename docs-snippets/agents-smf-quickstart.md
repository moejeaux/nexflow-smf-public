# NexFlow SMF Agent Quickstart

> **For Frontend Developers**: This file contains content snippets to copy/paste 
> into the documentation site. It is not rendered directly.

---

## Overview

NexFlow provides an MCP (Model Context Protocol) server that allows AI agents to interact with the SMF payment system using natural language tool calls.

---

## Transports

The MCP server supports two transport modes:

| Transport | Use Case | Command |
|-----------|----------|---------|
| **HTTP** | Web integrations, custom clients | `npm run mcp:smf-server` |
| **stdio** | Claude Desktop, native MCP clients | `npm run mcp:smf-stdio` |

**Choose stdio** for Claude Desktop and most MCP clients.  
**Choose HTTP** for web-based integrations or testing.

---

## Step 1 — Configure MCP Client

### Environment Setup

```bash
# Required: Your NexFlow API key
export NEXFLOW_API_KEY="nf_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Optional: Custom API URL (defaults to production)
export NEXFLOW_BASE_URL="https://api.nexflowapp.app"

# Optional: MCP server port (HTTP mode only, defaults to 3100)
export MCP_PORT="3100"
```

### Start the MCP Server

**HTTP mode** (for web/testing):
```bash
npm run mcp:smf-server
# Listens on http://localhost:3100
```

**stdio mode** (for Claude Desktop):
```bash
npm run mcp:smf-stdio
# Reads stdin, writes stdout (logs to stderr)
```

### Claude Desktop Configuration

Add to `claude_desktop_config.json`:

**Option A: stdio mode (recommended)**
```json
{
  "mcpServers": {
    "nexflow-smf": {
      "command": "npm",
      "args": ["run", "mcp:smf-stdio"],
      "cwd": "/path/to/nexflow-deploy",
      "env": {
        "NEXFLOW_API_KEY": "nf_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

**Option B: HTTP mode**
```json
{
  "mcpServers": {
    "nexflow-smf": {
      "url": "http://localhost:3100"
    }
  }
}
```
(Requires running `npm run mcp:smf-server` separately)

---

## Copy-Paste MCP Configs

### Claude Desktop — stdio (Recommended)

Copy this into `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "nexflow-smf": {
      "command": "npm",
      "args": ["run", "mcp:smf-stdio"],
      "cwd": "/path/to/nexflow-deploy",
      "env": {
        "NEXFLOW_API_KEY": "nf_live_YOUR_KEY_HERE"
      }
    }
  }
}
```

**Replace:**
- `/path/to/nexflow-deploy` → your actual path
- `nf_live_YOUR_KEY_HERE` → your API key

### Claude Desktop — HTTP

First, start the server:
```bash
NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-server
```

Then add to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "nexflow-smf": {
      "transport": "http",
      "url": "http://localhost:3100"
    }
  }
}
```

### Generic MCP Client Config

For any MCP-compatible client:

```json
{
  "name": "nexflow-smf",
  "transport": "stdio",
  "command": "npm",
  "args": ["run", "mcp:smf-stdio"],
  "cwd": "/path/to/nexflow-deploy",
  "env": {
    "NEXFLOW_API_KEY": "nf_live_YOUR_KEY_HERE",
    "NEXFLOW_BASE_URL": "https://api.nexflowapp.app"
  },
  "capabilities": ["payments", "settlement", "webhooks"]
}
```

> **More config examples**: See [agents-config-examples.md](./agents-config-examples.md) for LangChain, goose, and other runtimes.

---

## Step 2 — Available Tools

### Core SMF Tools

| Tool | Description | Auth Required |
|------|-------------|---------------|
| `smf_health` | Get SMF system health status | `read-only` |
| `smf_list_facilitators` | List available payment facilitators | `read-only` |
| `smf_route` | Route a payment to the best facilitator | `user` |
| `smf_verify` | Verify a payment transaction | `user` |
| `smf_settle` | Settle a verified payment | `user` |

### Webhook Tools

| Tool | Description | Auth Required |
|------|-------------|---------------|
| `smf_create_webhook` | Create a webhook configuration | `user` |
| `smf_list_webhooks` | List webhook configurations | `user` |
| `smf_delete_webhook` | Delete a webhook | `user` |

---

## Step 3 — Tool Schemas

### smf_health

**Input**: None required

**Output**:
```json
{
  "status": "healthy",
  "summary": {
    "total": 2,
    "healthy": 2,
    "degraded": 0,
    "down": 0
  },
  "facilitators": [...],
  "timestamp": "2026-01-20T00:00:00Z"
}
```

### smf_list_facilitators

**Input** (optional):
```json
{
  "status": "active",
  "chain_id": "eip155:8453"
}
```

**Output**:
```json
{
  "facilitators": [
    {
      "id": "cdp",
      "label": "Coinbase Developer Platform",
      "supportedNetworks": ["base", "base-sepolia"],
      "tokens": ["USDC"],
      "feeBps": 25,
      "enabled": true
    }
  ],
  "count": 1
}
```

### smf_route

**Input**:
```json
{
  "amount_wei": "1000000",
  "token_address": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  "chain_id": "eip155:8453",
  "payment_id": "optional-idempotency-key"
}
```

**Output**:
```json
{
  "facilitator_id": "cdp",
  "path": "scored",
  "expected_fee_wei": "2500",
  "confidence": 0.95,
  "quote_id": "quote_abc123",
  "quote_expires_at": "2026-01-20T00:05:00Z"
}
```

### smf_verify

**Input**:
```json
{
  "quote_id": "quote_abc123",
  "tx_hash": "0x1234...",
  "chain_id": "eip155:8453",
  "expected_amount_wei": "1000000",
  "expected_recipient": "0xRecipient..."
}
```

**Output**:
```json
{
  "verified": true,
  "status": "confirmed",
  "tx_hash": "0x1234...",
  "amount_wei": "1000000",
  "facilitator_id": "cdp",
  "verification_latency_ms": 250
}
```

### smf_settle

**Input**:
```json
{
  "quote_id": "quote_abc123",
  "tx_hash": "0x1234...",
  "amount_wei": "997500",
  "fee_wei": "2500",
  "payout_recipient": "0xMerchant..."
}
```

**Output**:
```json
{
  "settlement_id": "settle_xyz789",
  "status": "pending",
  "net_amount_wei": "997500",
  "payout_tx_hash": null,
  "estimated_completion": "2026-01-20T00:10:00Z"
}
```

---

## Step 4 — Example Agent Flow

### Pseudocode

```
1. Initialize agent with NEXFLOW_API_KEY

2. Check system health
   → Call smf_health
   → Verify status is "healthy"
   → Log facilitator count

3. Discover facilitators
   → Call smf_list_facilitators
   → Find facilitator supporting USDC on Base
   → Note fee structure

4. Route a payment
   → Call smf_route with:
     - amount_wei: "1000000" (1 USDC)
     - token_address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
     - chain_id: "eip155:8453"
   → Receive quote_id and expected_fee_wei
   → Present quote to user

5. (User submits on-chain transaction)

6. Verify the payment
   → Call smf_verify with:
     - quote_id from step 4
     - tx_hash from user's transaction
     - expected_amount_wei and expected_recipient
   → Confirm verified: true

7. Settle the payment
   → Call smf_settle with:
     - quote_id
     - tx_hash
     - net amount and fee
     - payout_recipient
   → Receive settlement_id
   → Monitor status until "completed"
```

### JSON Conversation Example

```json
[
  {
    "role": "user",
    "content": "Check if NexFlow SMF is healthy"
  },
  {
    "role": "assistant",
    "tool_calls": [{
      "name": "smf_health",
      "arguments": {}
    }]
  },
  {
    "role": "tool",
    "content": "{\"status\":\"healthy\",\"summary\":{\"total\":2,\"healthy\":2}}"
  },
  {
    "role": "assistant",
    "content": "NexFlow SMF is healthy with 2 active facilitators."
  },
  {
    "role": "user",
    "content": "What facilitators support USDC on Base?"
  },
  {
    "role": "assistant",
    "tool_calls": [{
      "name": "smf_list_facilitators",
      "arguments": {"chain_id": "eip155:8453"}
    }]
  },
  {
    "role": "tool",
    "content": "{\"facilitators\":[{\"id\":\"cdp\",\"label\":\"Coinbase Developer Platform\",\"feeBps\":25}],\"count\":1}"
  },
  {
    "role": "assistant",
    "content": "CDP (Coinbase Developer Platform) supports USDC on Base with a 0.25% fee."
  },
  {
    "role": "user",
    "content": "Route a 1 USDC payment on Base"
  },
  {
    "role": "assistant",
    "tool_calls": [{
      "name": "smf_route",
      "arguments": {
        "amount_wei": "1000000",
        "token_address": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        "chain_id": "eip155:8453"
      }
    }]
  },
  {
    "role": "tool",
    "content": "{\"facilitator_id\":\"cdp\",\"expected_fee_wei\":\"2500\",\"quote_id\":\"quote_abc123\",\"confidence\":0.95}"
  },
  {
    "role": "assistant",
    "content": "Payment routed to CDP. Quote ID: quote_abc123. Expected fee: 0.0025 USDC (0.25%). Quote expires in 5 minutes."
  }
]
```

---

## Error Handling

The MCP server returns errors in MCP format:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32603,
    "message": "SMF API Error (401): Invalid API key"
  }
}
```

| Error Code | Meaning |
|------------|---------|
| `-32700` | Parse error (invalid JSON) |
| `-32600` | Invalid request |
| `-32601` | Method not found |
| `-32602` | Invalid params |
| `-32603` | Internal error (includes API errors) |

---

## Webhook Tools for Agents

Agents can manage webhooks to receive async payment notifications.

### smf_create_webhook

**Input**:
```json
{
  "url": "https://api.yoursite.com/webhooks/nexflow",
  "events": ["payment.verified", "payment.failed"],
  "enabled": true
}
```

**Output**:
```json
{
  "id": "wh_1737331200_abc123",
  "url": "https://api.yoursite.com/webhooks/nexflow",
  "events": ["payment.verified", "payment.failed"],
  "enabled": true,
  "secret": "whsec_abc123...",
  "createdAt": "2026-01-20T00:00:00Z"
}
```

### smf_list_webhooks

**Input** (optional):
```json
{
  "endpointId": "ep_xyz789"
}
```

**Output**:
```json
{
  "webhooks": [
    {
      "id": "wh_1737331200_abc123",
      "url": "https://api.yoursite.com/webhooks/nexflow",
      "events": ["payment.verified", "payment.failed"],
      "enabled": true
    }
  ],
  "count": 1
}
```

### smf_delete_webhook

**Input**:
```json
{
  "webhook_id": "wh_1737331200_abc123"
}
```

**Output**:
```json
{
  "success": true,
  "message": "Webhook deleted"
}
```

### Example Agent Webhook Flow

```json
[
  {
    "role": "user",
    "content": "Set up a webhook to notify me of payment events"
  },
  {
    "role": "assistant",
    "tool_calls": [{
      "name": "smf_create_webhook",
      "arguments": {
        "url": "https://api.myapp.com/webhooks/payments",
        "events": ["payment.verified", "payment.failed"]
      }
    }]
  },
  {
    "role": "tool",
    "content": "{\"id\":\"wh_abc123\",\"url\":\"https://api.myapp.com/webhooks/payments\",\"events\":[\"payment.verified\",\"payment.failed\"],\"secret\":\"whsec_xyz...\"}"
  },
  {
    "role": "assistant",
    "content": "Webhook created! ID: wh_abc123. Save this signing secret: whsec_xyz... — you'll need it to verify webhook signatures."
  },
  {
    "role": "user",
    "content": "Show me my current webhooks"
  },
  {
    "role": "assistant",
    "tool_calls": [{
      "name": "smf_list_webhooks",
      "arguments": {}
    }]
  },
  {
    "role": "tool",
    "content": "{\"webhooks\":[{\"id\":\"wh_abc123\",\"url\":\"https://api.myapp.com/webhooks/payments\",\"events\":[\"payment.verified\",\"payment.failed\"],\"enabled\":true}],\"count\":1}"
  },
  {
    "role": "assistant",
    "content": "You have 1 webhook configured for payment events."
  }
]
```

---

## Best Practices for Agents

1. **Always check health first** — Before routing payments, verify the system is healthy.

2. **Use idempotency keys** — Include `payment_id` in route calls to prevent duplicate payments.

3. **Handle quote expiration** — Quotes expire after 5 minutes. Re-route if expired.

4. **Verify before settling** — Always verify a payment before attempting settlement.

5. **Monitor settlement status** — Settlement may take time; poll or use webhooks.

6. **Log quote_ids** — Keep track of quote_ids for debugging and reconciliation.

7. **Set up webhooks for production** — Use webhooks instead of polling for async events.
