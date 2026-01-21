# For AI Agents (MCP)

> **For Frontend Developers**: This is the landing page content for the "For AI Agents" section.
> Copy/paste into the Figma-designed documentation pages.

---

## AI-Native Payment Infrastructure

NexFlow provides a **Model Context Protocol (MCP) server** that gives AI agents direct access to production-ready cryptocurrency payment infrastructure on **Base (Ethereum L2)**.

### What You Get

| Capability | Description |
|------------|-------------|
| **Payment Routing** | Intelligent facilitator selection based on amount, network, and real-time conditions |
| **On-Chain Verification** | Real-time transaction confirmation with block-level verification |
| **Settlement** | Batch settlement engine with optimized gas costs |
| **Webhooks** | Async notifications for payment events |
| **x402 Protocol** | Native support for the x402 payment standard |

### Why NexFlow for Agents?

- **No payment integrations to build** — just call MCP tools
- **Stateless & idempotent** — safe for automated workflows
- **Production-ready** — same infrastructure as human-facing APIs
- **Versioned & stable** — designed for long-lived agents

---

## 3-Step Agent Onboarding

### Step 1: Get an API Key

Run the CLI onboarding script:

```bash
npx tsx scripts/onboard-account-and-key.ts --email agent@example.com
```

**Output:**
```json
{
  "accountId": "acc_abc123...",
  "apiKey": {
    "token": "nf_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "role": "user"
  }
}
```

> ⚠️ **Save your API key** — it won't be shown again.

### Step 2: Configure Your MCP Client

**For Claude Desktop** (`claude_desktop_config.json`):

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

**For other MCP clients**, see [Agent Config Examples](./agents-config-examples.md).

### Step 3: Run the Example Flow

Test your setup with the example script:

```bash
NEXFLOW_API_KEY="nf_live_xxx" npm run examples:agent:health
```

Or try the full payment flow:

```bash
NEXFLOW_API_KEY="nf_live_xxx" npm run examples:agent:route-webhook
```

---

## Available Tools (8)

| Tool | Description | Use Case |
|------|-------------|----------|
| `smf_health` | System health & facilitator status | Pre-flight check |
| `smf_list_facilitators` | Available facilitators & fees | Discovery |
| `smf_route` | Route payment to best facilitator | Get quote |
| `smf_verify` | Verify on-chain transaction | Confirm payment |
| `smf_settle` | Trigger payout to merchant | Complete flow |
| `smf_create_webhook` | Register webhook endpoint | Async notifications |
| `smf_list_webhooks` | List configured webhooks | Manage webhooks |
| `smf_delete_webhook` | Remove webhook | Cleanup |

---

## Example Agent Flow

```
Agent: "Check NexFlow health"
→ smf_health
← {status: "healthy", facilitators: 2}

Agent: "Route 1 USDC payment on Base"
→ smf_route(amount_wei: "1000000", chain_id: "eip155:8453", ...)
← {quote_id: "quote_abc", facilitator_id: "cdp", fee: "2500 wei"}

[User submits transaction: 0x1234...]

Agent: "Verify payment 0x1234..."
→ smf_verify(quote_id: "quote_abc", tx_hash: "0x1234...")
← {verified: true, status: "confirmed"}

Agent: "Settle the payment"
→ smf_settle(quote_id: "quote_abc", ...)
← {settlement_id: "settle_xyz", status: "pending"}

Agent: "Create webhook for payment events"
→ smf_create_webhook(url: "https://...", events: ["payment.verified"])
← {id: "wh_123", secret: "whsec_..."}
```

---

## Stability & Versioning

NexFlow MCP tools are designed for **long-lived agents**:

- **Stable tool schemas** — Input/output schemas are versioned
- **Backward compatible** — New fields are additive only
- **Deprecation policy** — 90-day notice for breaking changes
- **Error consistency** — Standard MCP error codes

---

## Related Documentation

- **[SMF Agent Quickstart](./agents-smf-quickstart.md)** — Full tool schemas and examples
- **[Agent Config Examples](./agents-config-examples.md)** — Configs for LangChain, goose, Claude, etc.
- **[API Quickstart](./api-quickstart.md)** — Direct API access (non-MCP)
- **[MCP Registry Metadata](./mcp-registry-metadata.md)** — For registry listings

---

## Support

- **API Base**: `https://api.nexflowapp.app`
- **MCP Server**: `mcp/server/` (HTTP and stdio)
- **OpenAPI Spec**: `openapi/nexflow-smf.yaml`
- **Email**: support@nexflow.app
