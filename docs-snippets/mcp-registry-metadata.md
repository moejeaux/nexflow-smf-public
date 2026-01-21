# NexFlow SMF — MCP Registry Metadata

> **Purpose**: Copy-paste metadata for MCP registries, directories, and marketplaces.
> This file is not rendered directly — use it as a reference when submitting to registries.

---

## Basic Information

**Name**: `NexFlow SMF (x402 Payments on Base)`

**ID / Slug**: `nexflow-smf`

**Version**: `1.0.0`

**Author**: NexFlow

**License**: MIT

**Homepage**: https://nexflowapp.app

**API Base URL**: https://api.nexflowapp.app

**Repository**: https://github.com/nexflow/nexflow-deploy

---

## Descriptions

### Short Description (≤120 chars)

```
Smart Meta-Facilitator for x402 payments on Base. Route, verify, settle crypto payments with intelligent facilitator selection.
```

### Long Description

```
NexFlow SMF (Smart Meta-Facilitator) provides AI agents with production-ready tools for cryptocurrency payment processing on Base (Ethereum L2).

Key capabilities:
• Intelligent payment routing to the best facilitator based on amount, token, and network conditions
• On-chain payment verification with real-time transaction confirmation
• Batch settlement for optimized gas costs
• Webhook management for async payment notifications
• Health monitoring and facilitator discovery

Built for the x402 payment protocol, NexFlow handles the complexity of multi-facilitator payment infrastructure so agents can focus on business logic. All tools are stateless, idempotent where applicable, and designed for reliable automated workflows.
```

---

## Tags / Categories

```
payments, x402, settlement, webhooks, Base, Ethereum, crypto, USDC, facilitator, routing, verification, fintech, DeFi
```

---

## Supported Transports

| Transport | Support | Notes |
|-----------|---------|-------|
| stdio | ✅ Yes | Recommended for Claude Desktop |
| HTTP | ✅ Yes | JSON-RPC over HTTP, port 3100 |
| SSE | ❌ No | Not currently supported |

---

## Tools (8 total)

| Tool | Description | Auth |
|------|-------------|------|
| `smf_health` | Get SMF system health status and facilitator metrics | read-only |
| `smf_list_facilitators` | List available payment facilitators with fees and capabilities | read-only |
| `smf_route` | Route a payment to the best facilitator, returns quote_id | user |
| `smf_verify` | Verify an on-chain payment transaction | user |
| `smf_settle` | Settle a verified payment, trigger payout | user |
| `smf_create_webhook` | Create webhook for async payment notifications | user |
| `smf_list_webhooks` | List configured webhooks | user |
| `smf_delete_webhook` | Delete a webhook configuration | user |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXFLOW_API_KEY` | Yes | API key (format: `nf_live_*` or `nf_test_*`) |
| `NEXFLOW_BASE_URL` | No | API base URL (default: `https://api.nexflowapp.app`) |
| `MCP_PORT` | No | HTTP server port (default: `3100`, HTTP mode only) |

---

## MCP Config Examples

### stdio Mode (Recommended for Claude Desktop)

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

### HTTP Mode

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

> **Note**: For HTTP mode, start the server first:
> ```bash
> NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-server
> ```

---

## Capabilities / Features

```yaml
capabilities:
  payments:
    routing: true
    verification: true
    settlement: true
  webhooks:
    create: true
    list: true
    delete: true
  networks:
    - base-mainnet (eip155:8453)
    - base-sepolia (eip155:84532)
  tokens:
    - USDC
  protocols:
    - x402
```

---

## Example Usage Flow

```
1. smf_health → Check system is healthy
2. smf_list_facilitators → Discover available facilitators
3. smf_route → Get quote for 1 USDC payment on Base
4. (User submits on-chain transaction)
5. smf_verify → Confirm transaction on-chain
6. smf_settle → Trigger payout to merchant
7. smf_create_webhook → Set up async notifications
```

---

## Registry-Specific Fields

### For MCP Directory / Awesome MCP Lists

```yaml
name: NexFlow SMF
category: Payments / FinTech
status: Production
maintainer: NexFlow Team
last_updated: 2026-01-20
```

### For npm / Package Managers

```json
{
  "name": "@nexflow-smf/mcp-server",
  "keywords": ["mcp", "payments", "x402", "base", "ethereum", "usdc", "settlement", "webhooks"],
  "engines": { "node": ">=18" }
}
```

---

## Links

- **Documentation**: https://nexflowapp.app/docs
- **API Reference**: https://api.nexflowapp.app/docs
- **OpenAPI Spec**: `openapi/nexflow-smf.yaml`
- **MCP Server**: `mcp/server/` (HTTP and stdio)
- **Support**: support@nexflow.app
