#!/usr/bin/env npx tsx
// =============================================================================
// NexFlow SMF Agent Example: Health & Facilitators
// =============================================================================
// A minimal example that demonstrates calling MCP tools via HTTP.
//
// Usage:
//   # First, start the MCP server in another terminal:
//   NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-server
//
//   # Then run this example:
//   npm run examples:agent:health
//
// Or with direct HTTP to the NexFlow API (no MCP server needed):
//   NEXFLOW_API_KEY="nf_live_xxx" npm run examples:agent:health

const API_KEY = process.env.NEXFLOW_API_KEY;
const BASE_URL = process.env.NEXFLOW_BASE_URL || 'https://api.nexflowapp.app';
const MCP_URL = process.env.MCP_URL || 'http://localhost:3100';
const USE_MCP = process.env.USE_MCP === 'true';

// =============================================================================
// MCP Client (for MCP server mode)
// =============================================================================

interface MCPResponse {
  jsonrpc: '2.0';
  id: number;
  result?: {
    content?: Array<{ type: string; text: string }>;
    tools?: Array<{ name: string; description: string }>;
  };
  error?: { code: number; message: string };
}

async function mcpCall(
  method: string,
  params?: Record<string, unknown>
): Promise<unknown> {
  const response = await fetch(MCP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params,
    }),
  });

  const data: MCPResponse = await response.json();

  if (data.error) {
    throw new Error(`MCP Error: ${data.error.message}`);
  }

  // For tools/call, parse the content
  if (method === 'tools/call' && data.result?.content?.[0]?.text) {
    return JSON.parse(data.result.content[0].text);
  }

  return data.result;
}

// =============================================================================
// Direct API Client (for direct API mode)
// =============================================================================

async function apiCall<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  if (!API_KEY) {
    throw new Error('NEXFLOW_API_KEY environment variable is required');
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`API Error (${response.status}): ${data.message || data.error}`);
  }

  return data as T;
}

// =============================================================================
// Main Example
// =============================================================================

interface HealthResponse {
  status: string;
  summary: {
    total: number;
    healthy: number;
    degraded: number;
    down: number;
  };
  facilitators: Array<{
    facilitatorId: string;
    name: string;
    status: string;
    metrics?: {
      successRate: number;
      p95LatencyMs: number;
    };
  }>;
  timestamp: string;
}

interface FacilitatorsResponse {
  facilitators: Array<{
    id: string;
    label: string;
    supportedNetworks: string[];
    tokens: string[];
    feeBps: number;
    enabled: boolean;
  }>;
  count: number;
}

async function main() {
  console.log('');
  console.log('🚀 NexFlow SMF Agent Example: Health & Facilitators');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Mode: ${USE_MCP ? 'MCP Server' : 'Direct API'}`);
  console.log(`API Key: ${API_KEY ? `${API_KEY.substring(0, 10)}...` : 'NOT SET'}`);
  console.log('');

  try {
    // Step 1: Check health
    console.log('📡 Step 1: Checking SMF health...');
    
    let health: HealthResponse;
    if (USE_MCP) {
      health = await mcpCall('tools/call', {
        name: 'smf_health',
        arguments: {},
      }) as HealthResponse;
    } else {
      health = await apiCall<HealthResponse>('GET', '/api/v1/smf/health');
    }

    console.log(`   Status: ${health.status}`);
    console.log(`   Facilitators: ${health.summary.total} total, ${health.summary.healthy} healthy`);
    console.log('');

    // Step 2: List facilitators
    console.log('📋 Step 2: Listing available facilitators...');
    
    let facilitators: FacilitatorsResponse;
    if (USE_MCP) {
      facilitators = await mcpCall('tools/call', {
        name: 'smf_list_facilitators',
        arguments: {},
      }) as FacilitatorsResponse;
    } else {
      facilitators = await apiCall<FacilitatorsResponse>('GET', '/api/v1/smf/facilitators');
    }

    console.log(`   Found ${facilitators.count} facilitator(s):`);
    for (const f of facilitators.facilitators) {
      console.log(`   • ${f.label || f.id}`);
      console.log(`     Networks: ${f.supportedNetworks.join(', ')}`);
      console.log(`     Tokens: ${f.tokens.join(', ')}`);
      console.log(`     Fee: ${f.feeBps} bps (${f.feeBps / 100}%)`);
      console.log(`     Enabled: ${f.enabled ? '✅' : '❌'}`);
    }
    console.log('');

    console.log('✅ Example completed successfully!');
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
