#!/usr/bin/env npx tsx
// =============================================================================
// NexFlow SMF MCP Server (stdio Transport)
// =============================================================================
// A Model Context Protocol (MCP) server that exposes SMF functionality
// over stdio for native integration with Claude Desktop and other MCP clients.
//
// Usage:
//   NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-stdio
//
// Claude Desktop config (claude_desktop_config.json):
//   {
//     "mcpServers": {
//       "nexflow-smf": {
//         "command": "npm",
//         "args": ["run", "mcp:smf-stdio"],
//         "cwd": "/path/to/nexflow-deploy",
//         "env": {
//           "NEXFLOW_API_KEY": "nf_live_xxx"
//         }
//       }
//     }
//   }
//
// The server:
//   - Reads JSON-RPC requests from stdin (one per line)
//   - Writes JSON-RPC responses to stdout
//   - Logs to stderr (not visible to MCP client)
//   - Is stateless and never touches the DB

import * as readline from 'readline';
import { SMF_MCP_TOOLS } from '../tools-smf';
import {
  getConfig,
  validateApiKey,
  getMaskedKey,
  processRequest,
  type MCPRequest,
  type MCPResponse,
} from './handlers';

// =============================================================================
// Configuration
// =============================================================================

const { BASE_URL } = getConfig();

let API_KEY: string;
try {
  API_KEY = validateApiKey();
} catch (error) {
  // Log to stderr (not stdout) so MCP client doesn't see this as a response
  console.error('❌ Missing NEXFLOW_API_KEY environment variable');
  console.error('\nUsage:');
  console.error('  NEXFLOW_API_KEY="nf_live_xxx" npm run mcp:smf-stdio\n');
  process.exit(1);
}

const maskedKey = getMaskedKey(API_KEY);

// =============================================================================
// Logging (to stderr only)
// =============================================================================

function log(message: string): void {
  console.error(`[MCP-stdio] ${message}`);
}

// =============================================================================
// stdio Transport
// =============================================================================

/**
 * Send a JSON-RPC response to stdout
 */
function sendResponse(response: MCPResponse): void {
  process.stdout.write(JSON.stringify(response) + '\n');
}

/**
 * Handle an incoming JSON-RPC request
 */
async function handleRequest(line: string): Promise<void> {
  try {
    const request: MCPRequest = JSON.parse(line);
    log(`${request.method} (id: ${request.id})`);
    
    const response = await processRequest(request, log);
    sendResponse(response);
  } catch (error) {
    log(`Parse error: ${error}`);
    sendResponse({
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32700,
        message: 'Parse error',
      },
    });
  }
}

// =============================================================================
// Main
// =============================================================================

async function main(): Promise<void> {
  log('Starting NexFlow SMF MCP Server (stdio)');
  log(`API Base URL: ${BASE_URL}`);
  log(`API Key: ${maskedKey}`);
  log(`Tools: ${SMF_MCP_TOOLS.map(t => t.name).join(', ')}`);
  log('Ready for requests on stdin...');

  // Create readline interface for stdin
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  // Process each line as a JSON-RPC request
  rl.on('line', handleRequest);

  // Handle stdin close
  rl.on('close', () => {
    log('stdin closed, shutting down');
    process.exit(0);
  });

  // Handle errors
  rl.on('error', (error) => {
    log(`readline error: ${error}`);
  });
}

// Start the server
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  log('Received SIGINT, shutting down');
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('Received SIGTERM, shutting down');
  process.exit(0);
});
