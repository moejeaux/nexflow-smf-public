#!/usr/bin/env npx tsx
// =============================================================================
// NexFlow SMF Agent Example: Route Payment & Create Webhook
// =============================================================================
// Demonstrates the payment routing flow and webhook management.
//
// Usage:
//   # First, start the MCP server in another terminal:
//   NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-server
//
//   # Then run this example:
//   npm run examples:agent:route-webhook
//
// Or with direct HTTP to the NexFlow API (no MCP server needed):
//   NEXFLOW_API_KEY="nf_live_xxx" npm run examples:agent:route-webhook

const API_KEY = process.env.NEXFLOW_API_KEY;
const BASE_URL = process.env.NEXFLOW_BASE_URL || 'https://api.nexflowapp.app';
const MCP_URL = process.env.MCP_URL || 'http://localhost:3100';
const USE_MCP = process.env.USE_MCP === 'true';

// Example payment parameters
const EXAMPLE_PAYMENT = {
  amount_wei: '1000000', // 1 USDC (6 decimals)
  token_address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC on Base
  chain_id: 'eip155:8453', // Base mainnet
};

// Example webhook URL (replace with your actual webhook endpoint)
const EXAMPLE_WEBHOOK_URL = 'https://webhook.site/test-nexflow';

// =============================================================================
// MCP Client
// =============================================================================

interface MCPResponse {
  jsonrpc: '2.0';
  id: number;
  result?: {
    content?: Array<{ type: string; text: string }>;
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

  if (method === 'tools/call' && data.result?.content?.[0]?.text) {
    return JSON.parse(data.result.content[0].text);
  }

  return data.result;
}

// =============================================================================
// Direct API Client
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
// Types
// =============================================================================

interface RouteResponse {
  facilitator_id: string;
  path: string;
  expected_fee_wei: string;
  confidence: number;
  quote_id: string;
  quote_expires_at: string;
}

interface WebhookResponse {
  id: string;
  url: string;
  events: string[];
  enabled: boolean;
  secret?: string;
  createdAt: string;
}

interface WebhookListResponse {
  webhooks: WebhookResponse[];
  count: number;
}

// =============================================================================
// Main Example
// =============================================================================

async function main() {
  console.log('');
  console.log('🚀 NexFlow SMF Agent Example: Route & Webhook');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Mode: ${USE_MCP ? 'MCP Server' : 'Direct API'}`);
  console.log(`API Key: ${API_KEY ? `${API_KEY.substring(0, 10)}...` : 'NOT SET'}`);
  console.log('');

  try {
    // Step 1: Route a payment
    console.log('💳 Step 1: Routing a payment...');
    console.log(`   Amount: ${EXAMPLE_PAYMENT.amount_wei} wei (1 USDC)`);
    console.log(`   Token: USDC on Base`);
    console.log(`   Chain: ${EXAMPLE_PAYMENT.chain_id}`);
    console.log('');

    let route: RouteResponse;
    if (USE_MCP) {
      route = await mcpCall('tools/call', {
        name: 'smf_route',
        arguments: EXAMPLE_PAYMENT,
      }) as RouteResponse;
    } else {
      route = await apiCall<RouteResponse>('POST', '/api/v1/smf/route', EXAMPLE_PAYMENT);
    }

    console.log('   ✅ Route created:');
    console.log(`      Facilitator: ${route.facilitator_id}`);
    console.log(`      Path: ${route.path}`);
    console.log(`      Fee: ${route.expected_fee_wei} wei`);
    console.log(`      Confidence: ${(route.confidence * 100).toFixed(1)}%`);
    console.log(`      Quote ID: ${route.quote_id}`);
    console.log(`      Expires: ${route.quote_expires_at}`);
    console.log('');

    // Step 2: Create a webhook
    console.log('🔔 Step 2: Creating a webhook...');
    console.log(`   URL: ${EXAMPLE_WEBHOOK_URL}`);
    console.log(`   Events: payment.verified, payment.failed`);
    console.log('');

    let webhook: WebhookResponse;
    const webhookPayload = {
      url: EXAMPLE_WEBHOOK_URL,
      events: ['payment.verified', 'payment.failed'],
    };

    if (USE_MCP) {
      webhook = await mcpCall('tools/call', {
        name: 'smf_create_webhook',
        arguments: webhookPayload,
      }) as WebhookResponse;
    } else {
      webhook = await apiCall<WebhookResponse>('POST', '/api/v1/webhooks', webhookPayload);
    }

    console.log('   ✅ Webhook created:');
    console.log(`      ID: ${webhook.id}`);
    console.log(`      URL: ${webhook.url}`);
    console.log(`      Events: ${webhook.events.join(', ')}`);
    console.log(`      Enabled: ${webhook.enabled ? '✅' : '❌'}`);
    if (webhook.secret) {
      console.log(`      Secret: ${webhook.secret.substring(0, 20)}... (save this!)`);
    }
    console.log('');

    // Step 3: List webhooks
    console.log('📋 Step 3: Listing webhooks...');

    let webhookList: WebhookListResponse;
    if (USE_MCP) {
      webhookList = await mcpCall('tools/call', {
        name: 'smf_list_webhooks',
        arguments: {},
      }) as WebhookListResponse;
    } else {
      webhookList = await apiCall<WebhookListResponse>('GET', '/api/v1/webhooks');
    }

    console.log(`   Found ${webhookList.count} webhook(s):`);
    for (const wh of webhookList.webhooks) {
      console.log(`   • ${wh.id}`);
      console.log(`     URL: ${wh.url}`);
      console.log(`     Events: ${wh.events.join(', ')}`);
      console.log(`     Enabled: ${wh.enabled ? '✅' : '❌'}`);
    }
    console.log('');

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 Summary:');
    console.log(`   • Routed 1 USDC payment via ${route.facilitator_id}`);
    console.log(`   • Created webhook for payment events`);
    console.log(`   • Total webhooks: ${webhookList.count}`);
    console.log('');
    console.log('🔄 Next steps (in a real flow):');
    console.log('   1. User submits on-chain transaction');
    console.log('   2. Call smf_verify with tx_hash');
    console.log('   3. Call smf_settle to trigger payout');
    console.log('   4. Receive webhook notification on completion');
    console.log('');
    console.log('✅ Example completed successfully!');
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
