# NexFlow SMF — Agent Runtime Config Examples

> **For Frontend Developers**: Copy-paste configs for various agent runtimes.
> This file is not rendered directly.

---

## LangChain / LangGraph MCP Integration

### Installation

```bash
npm install @langchain/core @langchain/mcp-adapters
```

### TypeScript Example

```typescript
import { MCPClient } from '@langchain/mcp-adapters';
import { ChatOpenAI } from '@langchain/openai';
import { createReactAgent } from '@langchain/langgraph/prebuilt';

// Initialize MCP client for NexFlow SMF
const mcpClient = new MCPClient({
  name: 'nexflow-smf',
  transport: 'stdio',
  command: 'npm',
  args: ['run', 'mcp:smf-stdio'],
  cwd: '/path/to/nexflow-deploy',
  env: {
    NEXFLOW_API_KEY: process.env.NEXFLOW_API_KEY!,
  },
});

// Connect and get tools
await mcpClient.connect();
const tools = await mcpClient.getTools();

// Create agent with NexFlow tools
const model = new ChatOpenAI({ model: 'gpt-4' });
const agent = createReactAgent({
  llm: model,
  tools: tools,
});

// Example: Check health and route a payment
const result = await agent.invoke({
  messages: [
    {
      role: 'user',
      content: 'Check NexFlow health, then route a 1 USDC payment on Base',
    },
  ],
});

console.log(result);

// Cleanup
await mcpClient.close();
```

### Python Example

```python
from langchain_mcp_adapters import MCPClient
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
import os

# Initialize MCP client
mcp_client = MCPClient(
    name="nexflow-smf",
    transport="stdio",
    command="npm",
    args=["run", "mcp:smf-stdio"],
    cwd="/path/to/nexflow-deploy",
    env={
        "NEXFLOW_API_KEY": os.environ["NEXFLOW_API_KEY"],
    },
)

# Connect and get tools
mcp_client.connect()
tools = mcp_client.get_tools()

# Create agent
model = ChatOpenAI(model="gpt-4")
agent = create_react_agent(model, tools)

# Run
result = agent.invoke({
    "messages": [{"role": "user", "content": "Check NexFlow SMF health"}]
})
print(result)
```

---

## goose / MCP Mesh Configuration

### goose Config (`~/.goose/config.yaml`)

```yaml
mcp_servers:
  nexflow-smf:
    enabled: true
    command: npm
    args:
      - run
      - mcp:smf-stdio
    cwd: /path/to/nexflow-deploy
    env:
      NEXFLOW_API_KEY: nf_live_YOUR_KEY_HERE
    capabilities:
      - payments
      - settlement
      - webhooks
    tags:
      - x402
      - base
      - usdc
```

### MCP Mesh Auto-Discovery

For MCP Mesh-style auto-discovery, register NexFlow SMF with these capability tags:

```yaml
# mcp-mesh-registry.yaml
servers:
  - id: nexflow-smf
    name: "NexFlow SMF (x402 Payments on Base)"
    description: "Smart Meta-Facilitator for crypto payments"
    transport: stdio
    command: npm
    args: ["run", "mcp:smf-stdio"]
    capabilities:
      payments:
        routing: true
        verification: true
        settlement: true
      webhooks:
        management: true
      networks:
        - base-mainnet
        - base-sepolia
      protocols:
        - x402
    tags:
      - payments
      - settlement
      - webhooks
      - x402
      - base
      - usdc
      - crypto
    auth:
      type: api_key
      env_var: NEXFLOW_API_KEY
```

---

## Anthropic Computer Use / Claude Artifacts

### MCP Server Config

```json
{
  "mcp_servers": {
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

---

## OpenAI Assistants / GPT Actions (HTTP Mode)

For OpenAI Assistants or GPT Actions, use HTTP mode with a publicly accessible endpoint.

### 1. Start HTTP Server

```bash
NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-server
# Or deploy to a server/cloud function
```

### 2. Configure as Tool

```json
{
  "name": "nexflow_smf",
  "description": "NexFlow Smart Meta-Facilitator for x402 payments",
  "endpoint": "https://your-deployed-mcp-server.com",
  "authentication": {
    "type": "none"
  }
}
```

> **Note**: The MCP server handles auth via `NEXFLOW_API_KEY` internally.

---

## Cursor / Continue.dev

### Cursor MCP Config (`.cursor/mcp.json`)

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

### Continue.dev Config (`~/.continue/config.json`)

```json
{
  "mcpServers": [
    {
      "name": "nexflow-smf",
      "command": "npm",
      "args": ["run", "mcp:smf-stdio"],
      "cwd": "/path/to/nexflow-deploy",
      "env": {
        "NEXFLOW_API_KEY": "nf_live_YOUR_KEY_HERE"
      }
    }
  ]
}
```

---

## AutoGPT / AgentGPT

### Plugin Configuration

```yaml
# autogpt_plugins/nexflow_smf.yaml
name: nexflow-smf
description: x402 payment processing on Base
type: mcp
config:
  transport: stdio
  command: npm
  args: ["run", "mcp:smf-stdio"]
  cwd: /path/to/nexflow-deploy
  env:
    NEXFLOW_API_KEY: ${NEXFLOW_API_KEY}
```

---

## Direct HTTP Client (Any Runtime)

For runtimes that don't support MCP natively, use direct HTTP:

### Start Server

```bash
NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-server
```

### Make JSON-RPC Calls

```bash
# List tools
curl -X POST http://localhost:3100 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

# Call smf_health
curl -X POST http://localhost:3100 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"smf_health","arguments":{}}}'

# Call smf_route
curl -X POST http://localhost:3100 \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "id":3,
    "method":"tools/call",
    "params":{
      "name":"smf_route",
      "arguments":{
        "amount_wei":"1000000",
        "token_address":"0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        "chain_id":"eip155:8453"
      }
    }
  }'
```

### Node.js HTTP Example

```typescript
async function mcpCall(method: string, params?: object) {
  const response = await fetch('http://localhost:3100', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params,
    }),
  });
  return response.json();
}

// Usage
const tools = await mcpCall('tools/list');
console.log('Available tools:', tools.result.tools.map(t => t.name));

const health = await mcpCall('tools/call', {
  name: 'smf_health',
  arguments: {},
});
console.log('Health:', JSON.parse(health.result.content[0].text));
```

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXFLOW_API_KEY` | Yes | — | Your API key (`nf_live_*` or `nf_test_*`) |
| `NEXFLOW_BASE_URL` | No | `https://api.nexflowapp.app` | API base URL |
| `MCP_PORT` | No | `3100` | HTTP server port (HTTP mode only) |

---

## Troubleshooting

### "spawn npm ENOENT"
Ensure `npm` is in your PATH. Try using the full path: `/usr/local/bin/npm`

### "NEXFLOW_API_KEY not set"
Ensure the environment variable is passed to the MCP server process.

### Connection refused (HTTP mode)
1. Ensure the server is running: `npm run mcp:smf-server`
2. Check the port: `lsof -i :3100` or `netstat -an | findstr 3100`

### Tools not appearing
1. Verify the server starts without errors
2. Check logs in stderr (stdio mode) or console (HTTP mode)
