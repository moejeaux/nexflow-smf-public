#!/usr/bin/env npx tsx
// =============================================================================
// NexFlow SMF MCP Server (HTTP Transport)
// =============================================================================
// A Model Context Protocol (MCP) server that exposes SMF functionality
// as tools for AI agents and MCP-compatible clients.
//
// Usage:
//   NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-server
//
// For stdio transport, use:
//   NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-stdio
//
// The server implements:
//   - tools/list: Returns available SMF tools
//   - tools/call: Executes a tool with given arguments
//
// All API calls are proxied to https://api.nexflowapp.app (configurable via
// NEXFLOW_BASE_URL env var). The server is stateless and never touches the DB.

import { createServer } from 'http';
import { SMF_MCP_TOOLS } from '../tools-smf';
import {
  getConfig,
  validateApiKey,
  getMaskedKey,
  processRequest,
  type MCPRequest,
} from './handlers';

// =============================================================================
// Configuration
// =============================================================================

const { PORT, BASE_URL } = getConfig();

let API_KEY: string;
try {
  API_KEY = validateApiKey();
} catch (error) {
  console.error('❌ Missing NEXFLOW_API_KEY environment variable');
  console.log('\nUsage:');
  console.log('  NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-server\n');
  process.exit(1);
}

const maskedKey = getMaskedKey(API_KEY);

// =============================================================================
// HTTP Server
// =============================================================================

const server = createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  // Parse request body
  let body = '';
  for await (const chunk of req) {
    body += chunk;
  }

  try {
    const request: MCPRequest = JSON.parse(body);
    console.log(`[MCP-HTTP] ${request.method} (id: ${request.id})`);
    
    const response = await processRequest(request, (msg) => console.log(`[MCP-HTTP] ${msg}`));
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  } catch (error) {
    console.error('[MCP-HTTP] Parse error:', error);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32700,
          message: 'Parse error',
        },
      })
    );
  }
});

// =============================================================================
// Startup
// =============================================================================

server.listen(PORT, () => {
  console.log('');
  console.log('🚀 NexFlow SMF MCP Server (HTTP)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📡 Transport: HTTP`);
  console.log(`📡 Listening on http://localhost:${PORT}`);
  console.log(`🔗 API Base URL: ${BASE_URL}`);
  console.log(`🔑 API Key: ${maskedKey}`);
  console.log('');
  console.log('📋 Available Tools:');
  for (const tool of SMF_MCP_TOOLS) {
    console.log(`   - ${tool.name}: ${tool.description.split('.')[0]}`);
  }
  console.log('');
  console.log('💡 For stdio transport, run: npm run mcp:smf-stdio');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n[MCP-HTTP] Shutting down...');
  server.close(() => {
    console.log('[MCP-HTTP] Server closed');
    process.exit(0);
  });
});
