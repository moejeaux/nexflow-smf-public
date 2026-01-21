# NexFlow Backend Implementation Notes

This document summarizes the backend DX and agent features implemented for NexFlow.

---

## OpenAPI Specification

**Location**: `openapi/nexflow-smf.yaml`

**Coverage**:
- `POST /api/v1/smf/route` — Route a payment to the best facilitator
- `POST /api/v1/smf/verify` — Verify a payment transaction
- `POST /api/v1/smf/settle` — Settle a verified payment
- `GET /api/v1/smf/health` — System health status
- `GET /api/v1/smf/facilitators` — List available facilitators
- `POST /api/v1/webhooks` — Create a webhook
- `GET /api/v1/webhooks` — List webhooks
- `DELETE /api/v1/webhooks/{webhookId}` — Delete a webhook

**Features**:
- OpenAPI 3.1 compliant
- Base URL: `https://api.nexflowapp.app`
- Security schemes: `x-api-key` header and Bearer token
- All schemas aligned with `src/types/smf-api.ts` and `src/types/webhooks.ts`
- Includes examples for each endpoint

**Validation**:
```bash
npm run openapi:validate
```

---

## MCP Server

**Location**: `mcp/server/`

### Transports

| Transport | File | Command |
|-----------|------|---------|
| HTTP | `mcp/server/index.ts` | `npm run mcp:smf-server` |
| stdio | `mcp/server/stdio.ts` | `npm run mcp:smf-stdio` |

Both transports share the same handler logic in `mcp/server/handlers.ts`.

### Tools Exposed

| Tool | Maps To |
|------|---------|
| `smf_route` | `POST /api/v1/smf/route` |
| `smf_verify` | `POST /api/v1/smf/verify` |
| `smf_settle` | `POST /api/v1/smf/settle` |
| `smf_health` | `GET /api/v1/smf/health` |
| `smf_list_facilitators` | `GET /api/v1/smf/facilitators` |
| `smf_create_webhook` | `POST /api/v1/webhooks` |
| `smf_list_webhooks` | `GET /api/v1/webhooks` |
| `smf_delete_webhook` | `DELETE /api/v1/webhooks/{id}` |

### Starting the Server

```bash
# HTTP mode (for web integrations)
NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-server

# stdio mode (for Claude Desktop)
NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-stdio

# HTTP with auto-reload (development)
NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-dev
```

**Default Port**: 3100 (configurable via `MCP_PORT` env var, HTTP mode only)

**Protocol**: MCP JSON-RPC
- HTTP: `POST /` with JSON-RPC requests
- stdio: JSON-RPC over stdin/stdout
- Implements `initialize`, `tools/list`, `tools/call`

**Architecture**:
- Stateless — no local database access
- Proxy-only — all calls forwarded to NexFlow API
- Authenticated — uses `NEXFLOW_API_KEY` for all requests
- Shared handlers — same logic for HTTP and stdio

---

## Documentation Snippets

All content snippets are in `docs-snippets/` for frontend developers to wire into real pages:

| File | Purpose |
|------|---------|
| `api-quickstart.md` | API onboarding: CLI, curl, Node.js, webhooks |
| `agents-smf-quickstart.md` | MCP client setup, tool schemas, agent flow, webhook tools |
| `agents-landing.md` | "For AI Agents" landing page content |
| `agents-config-examples.md` | LangChain, goose, Claude configs |
| `mcp-registry-metadata.md` | Copy-paste metadata for MCP registries |
| `IMPLEMENTATION_NOTES.md` | This file — summary for developers |

**Usage**: Frontend developers copy/paste content from these files into Figma-designed pages. These files are **not** rendered directly by any frontend.

---

## Docs for Discoverability

These files support MCP registry listings and agent runtime configuration:

| File | Purpose |
|------|---------|
| `mcp-registry-metadata.md` | Ready-to-paste metadata for MCP registries, directories, and marketplaces |
| `agents-landing.md` | "For AI Agents (MCP)" landing page with 3-step onboarding |
| `agents-config-examples.md` | Configs for LangChain, LangGraph, goose, Cursor, Continue.dev, AutoGPT |

**Registry metadata includes:**
- Name, descriptions (short/long), tags
- Tool list with descriptions
- MCP config examples (HTTP + stdio)
- Capability tags for auto-discovery

---

## Example Agent Scripts

**Location**: `examples/agents/`

| Script | Command | Description |
|--------|---------|-------------|
| `health-and-facilitators.ts` | `npm run examples:agent:health` | Check health + list facilitators |
| `route-and-webhook.ts` | `npm run examples:agent:route-webhook` | Route payment + create webhook |

**Usage:**
```bash
# Direct API mode (default)
NEXFLOW_API_KEY="nf_live_xxx" npm run examples:agent:health

# MCP server mode (requires server running)
USE_MCP=true npm run examples:agent:health
```

---

## Package.json Scripts

```json
{
  "openapi:validate": "npx @redocly/cli lint openapi/nexflow-smf.yaml",
  "mcp:smf-server": "npx tsx mcp/server/index.ts",
  "mcp:smf-stdio": "npx tsx mcp/server/stdio.ts",
  "mcp:smf-dev": "npx tsx --watch mcp/server/index.ts",
  "examples:agent:health": "npx tsx examples/agents/health-and-facilitators.ts",
  "examples:agent:route-webhook": "npx tsx examples/agents/route-and-webhook.ts"
}
```

---

## Type Alignment

All types are sourced from:
- `src/types/smf-api.ts` — Request/response types for SMF endpoints
- `src/types/webhooks.ts` — Webhook types
- `mcp/tools-smf.ts` — MCP tool definitions with JSON Schema

The OpenAPI spec schemas match these TypeScript types exactly (field names, types, required fields).

---

## Files Created/Modified

### New Files

| Path | Description |
|------|-------------|
| `openapi/nexflow-smf.yaml` | OpenAPI 3.1 specification |
| `mcp/server/handlers.ts` | Shared MCP handler logic |
| `mcp/server/index.ts` | MCP HTTP server |
| `mcp/server/stdio.ts` | MCP stdio server |
| `mcp/server/README.md` | MCP server documentation |
| `src/types/webhooks.ts` | Webhook TypeScript types |
| `scripts/generate-sdks.md` | SDK generation documentation |
| `docs-snippets/api-quickstart.md` | API quickstart content |
| `docs-snippets/agents-smf-quickstart.md` | Agent quickstart content |
| `docs-snippets/agents-landing.md` | "For AI Agents" landing page |
| `docs-snippets/agents-config-examples.md` | Agent runtime configs |
| `docs-snippets/mcp-registry-metadata.md` | MCP registry metadata |
| `docs-snippets/IMPLEMENTATION_NOTES.md` | This summary |
| `examples/agents/health-and-facilitators.ts` | Example: health + facilitators |
| `examples/agents/route-and-webhook.ts` | Example: route + webhook |

### Modified Files

| Path | Change |
|------|--------|
| `package.json` | Added MCP + example scripts |
| `mcp/tools-smf.ts` | Added webhook tool definitions |

### Unchanged

- All Vite/React frontend files
- All existing API routes
- All existing auth logic
- `src/types/smf-api.ts` (used as source of truth)

---

## Testing

### Validate OpenAPI
```bash
npm run openapi:validate
```

### Test MCP Server (HTTP)
```bash
# Start server
NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-server

# In another terminal, test tools/list
curl -X POST http://localhost:3100 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

# Test smf_health
curl -X POST http://localhost:3100 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"smf_health","arguments":{}}}'

# Test smf_list_webhooks
curl -X POST http://localhost:3100 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"smf_list_webhooks","arguments":{}}}'
```

### Test MCP Server (stdio)
```bash
# Start and send a request
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-stdio
```

---

## SDK Generation

See `scripts/generate-sdks.md` for instructions on generating client SDKs from the OpenAPI spec.

Example:
```bash
# Generate TypeScript SDK
npx @openapitools/openapi-generator-cli generate \
  -i openapi/nexflow-smf.yaml \
  -g typescript-axios \
  -o ./generated/sdk/ts
```

---

## Dev/Agent Onboarding Checklist

### For Human Developers

1. Read `docs-snippets/api-quickstart.md`
2. Run `npm run auth:onboard` to create account + API key
3. Set `NEXFLOW_API_KEY` environment variable
4. Test with `curl` against `https://api.nexflowapp.app/api/v1/smf/health`
5. (Optional) Set up webhooks for async notifications

### For AI Agents

1. Read `docs-snippets/agents-smf-quickstart.md`
2. Configure MCP client with `npm run mcp:smf-stdio` (Claude Desktop)
3. Use `smf_health` tool to verify connectivity
4. Use `smf_list_facilitators` to discover available facilitators
5. Use `smf_route`, `smf_verify`, `smf_settle` for payment flow
6. (Optional) Use `smf_create_webhook` for async notifications

---

## Recent Changes Summary

### 2026-01-20 (2): Discoverability & Agent DX

**Added:**
- MCP registry metadata (`docs-snippets/mcp-registry-metadata.md`)
- "For AI Agents" landing page (`docs-snippets/agents-landing.md`)
- Agent runtime configs (`docs-snippets/agents-config-examples.md`) — LangChain, goose, Cursor, etc.
- Example agent scripts (`examples/agents/`)
  - `health-and-facilitators.ts` — health check demo
  - `route-and-webhook.ts` — payment + webhook demo
- npm scripts: `examples:agent:health`, `examples:agent:route-webhook`

**Updated:**
- `docs-snippets/agents-smf-quickstart.md` — copy-paste MCP configs
- `docs-snippets/IMPLEMENTATION_NOTES.md` — this summary

### 2026-01-20: MCP stdio + Webhooks

**Added:**
- MCP stdio transport (`mcp/server/stdio.ts`) for Claude Desktop
- Shared handler logic (`mcp/server/handlers.ts`) for both transports
- Webhook types (`src/types/webhooks.ts`)
- Webhook schemas in OpenAPI spec
- Webhook MCP tools: `smf_create_webhook`, `smf_list_webhooks`, `smf_delete_webhook`
- SDK generation documentation (`scripts/generate-sdks.md`)
- `npm run mcp:smf-stdio` script

**Updated:**
- `mcp/tools-smf.ts` with webhook tool definitions
- `docs-snippets/api-quickstart.md` with overview and webhooks section
- `docs-snippets/agents-smf-quickstart.md` with transports and webhook tools
- `mcp/server/README.md` with full documentation

**Validated:**
- `npm run openapi:validate` passes (warning about localhost is expected)
