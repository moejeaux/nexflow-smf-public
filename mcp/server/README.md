# NexFlow SMF MCP Server

A Model Context Protocol (MCP) server that exposes NexFlow SMF functionality as tools for AI agents and MCP-compatible clients like Claude Desktop.

## Transports

The MCP server supports two transport modes:

| Transport | Use Case | Command |
|-----------|----------|---------|
| **HTTP** | Web integrations, custom clients | `npm run mcp:smf-server` |
| **stdio** | Claude Desktop, native MCP clients | `npm run mcp:smf-stdio` |

## Quick Start

### 1. Set your API key

```bash
# PowerShell
$env:NEXFLOW_API_KEY="nf_live_..."

# Bash
export NEXFLOW_API_KEY="nf_live_..."
```

### 2. Start the server

**HTTP mode** (for web/HTTP clients):
```bash
npm run mcp:smf-server
# Listens on http://localhost:3100
```

**stdio mode** (for Claude Desktop):
```bash
npm run mcp:smf-stdio
# Reads from stdin, writes to stdout
```

## Available Tools

| Tool | Description | API Endpoint |
|------|-------------|--------------|
| `smf_route` | Route a payment to the best facilitator | `POST /api/v1/smf/route` |
| `smf_verify` | Verify a payment transaction | `POST /api/v1/smf/verify` |
| `smf_settle` | Settle a verified payment | `POST /api/v1/smf/settle` |
| `smf_health` | Get SMF system health status | `GET /api/v1/smf/health` |
| `smf_list_facilitators` | List available facilitators | `GET /api/v1/smf/facilitators` |
| `smf_create_webhook` | Create a webhook configuration | `POST /api/v1/webhooks` |
| `smf_list_webhooks` | List webhook configurations | `GET /api/v1/webhooks` |
| `smf_delete_webhook` | Delete a webhook | `DELETE /api/v1/webhooks/{id}` |

## Claude Desktop Configuration

To use the MCP server with Claude Desktop, add this to your `claude_desktop_config.json`:

### stdio mode (recommended)

```json
{
  "mcpServers": {
    "nexflow-smf": {
      "command": "npm",
      "args": ["run", "mcp:smf-stdio"],
      "cwd": "/path/to/nexflow-deploy",
      "env": {
        "NEXFLOW_API_KEY": "nf_live_..."
      }
    }
  }
}
```

### HTTP mode

For HTTP mode, first start the server:
```bash
NEXFLOW_API_KEY="nf_live_..." npm run mcp:smf-server
```

Then configure Claude Desktop to connect to `http://localhost:3100`.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXFLOW_API_KEY` | **Required.** Your NexFlow API key | - |
| `NEXFLOW_BASE_URL` | API base URL | `https://api.nexflowapp.app` |
| `MCP_PORT` | HTTP server port (HTTP mode only) | `3100` |

## Example Tool Calls

### Check health
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "smf_health",
    "arguments": {}
  }
}
```

### Route a payment
```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "smf_route",
    "arguments": {
      "amount_wei": "1000000",
      "token_address": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      "chain_id": "eip155:8453"
    }
  }
}
```

### Create a webhook
```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "smf_create_webhook",
    "arguments": {
      "url": "https://api.yoursite.com/webhooks/nexflow",
      "events": ["payment.verified", "payment.failed"]
    }
  }
}
```

## Development

```bash
# HTTP mode with hot reload
npm run mcp:smf-dev

# Validate tool definitions match OpenAPI
npm run openapi:validate
```

## Architecture

```
mcp/
├── tools-smf.ts       # MCP tool definitions (schemas)
└── server/
    ├── handlers.ts    # Shared core logic (processRequest, toolHandlers)
    ├── index.ts       # HTTP transport entrypoint
    ├── stdio.ts       # stdio transport entrypoint
    └── README.md      # This file
```

Both transports share the same handler logic in `handlers.ts`, ensuring consistent behavior.

## Troubleshooting

### "Missing NEXFLOW_API_KEY"
Set the `NEXFLOW_API_KEY` environment variable before starting the server.

### "Unknown tool: xxx"
The tool name may be misspelled or not yet implemented. Check `tools-smf.ts` for available tools.

### stdio mode not connecting
- Ensure the `cwd` in Claude Desktop config points to the nexflow-deploy directory
- Check that `npm` is in your PATH
- Logs are written to stderr (not visible to MCP clients)

### HTTP mode connection refused
- Ensure port 3100 is not in use: `lsof -i :3100` or `netstat -an | findstr 3100`
- Check firewall settings
