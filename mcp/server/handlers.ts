// =============================================================================
// MCP Server Handlers (Shared Core Logic)
// =============================================================================
// This module contains the core request handling logic used by both
// HTTP and stdio transports.

import { SMF_MCP_TOOLS, type MCPToolDefinition } from '../tools-smf';
import type {
  SMFRouteRequest,
  SMFRouteResponse,
  SMFVerifyRequest,
  SMFVerifyResponse,
  SMFSettleRequest,
  SMFSettleResponse,
  SMFHealthResponse,
  SMFFacilitatorsResponse,
} from '../../src/types/smf-api';
import type {
  WebhookCreateRequest,
  Webhook,
  WebhookListResponse,
} from '../../src/types/webhooks';

// =============================================================================
// Configuration
// =============================================================================

export function getConfig() {
  const API_KEY = process.env.NEXFLOW_API_KEY;
  const BASE_URL = process.env.NEXFLOW_BASE_URL || 'https://api.nexflowapp.app';
  const PORT = parseInt(process.env.MCP_PORT || '3100', 10);

  return { API_KEY, BASE_URL, PORT };
}

export function validateApiKey(): string {
  const { API_KEY } = getConfig();
  if (!API_KEY) {
    throw new Error('Missing NEXFLOW_API_KEY environment variable');
  }
  return API_KEY;
}

export function getMaskedKey(apiKey: string): string {
  return `${apiKey.substring(0, 10)}...${apiKey.slice(-4)}`;
}

// =============================================================================
// MCP Types
// =============================================================================

export interface MCPRequest {
  jsonrpc: '2.0';
  id: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

export interface MCPResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

export interface ToolCallParams {
  name: string;
  arguments: Record<string, unknown>;
}

// =============================================================================
// API Client
// =============================================================================

export async function apiRequest<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const { API_KEY, BASE_URL } = getConfig();
  
  if (!API_KEY) {
    throw new Error('Missing NEXFLOW_API_KEY');
  }

  const url = `${BASE_URL}${path}`;
  
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'User-Agent': 'NexFlow-MCP-Server/1.0',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `API Error (${response.status}): ${data.message || data.error || 'Unknown error'}`
    );
  }

  return data as T;
}

// =============================================================================
// Tool Handlers
// =============================================================================

export type ToolHandler = (args: Record<string, unknown>) => Promise<unknown>;

export const toolHandlers: Record<string, ToolHandler> = {
  // =========================================================================
  // SMF Tools
  // =========================================================================

  /**
   * smf_route - Route a payment to the best facilitator
   * Maps to: POST /api/v1/smf/route
   */
  async smf_route(args) {
    const request: SMFRouteRequest = {
      amount_wei: args.amount_wei as string,
      token_address: args.token_address as string,
      chain_id: args.chain_id as string,
      payment_id: args.payment_id as string | undefined,
      recipient_address: args.recipient_address as string | undefined,
    };
    return apiRequest<SMFRouteResponse>('POST', '/api/v1/smf/route', request);
  },

  /**
   * smf_verify - Verify a payment transaction
   * Maps to: POST /api/v1/smf/verify
   */
  async smf_verify(args) {
    const request: SMFVerifyRequest = {
      quote_id: args.quote_id as string,
      tx_hash: args.tx_hash as string,
      chain_id: args.chain_id as string,
      expected_amount_wei: args.expected_amount_wei as string,
      expected_recipient: args.expected_recipient as string,
      facilitator_id: args.facilitator_id as string | undefined,
    };
    return apiRequest<SMFVerifyResponse>('POST', '/api/v1/smf/verify', request);
  },

  /**
   * smf_settle - Settle a verified payment
   * Maps to: POST /api/v1/smf/settle
   */
  async smf_settle(args) {
    const request: SMFSettleRequest = {
      quote_id: args.quote_id as string,
      tx_hash: args.tx_hash as string,
      amount_wei: args.amount_wei as string,
      fee_wei: args.fee_wei as string,
      payout_recipient: args.payout_recipient as string,
      batch_id: args.batch_id as string | undefined,
    };
    return apiRequest<SMFSettleResponse>('POST', '/api/v1/smf/settle', request);
  },

  /**
   * smf_health - Get SMF system health status
   * Maps to: GET /api/v1/smf/health
   */
  async smf_health() {
    return apiRequest<SMFHealthResponse>('GET', '/api/v1/smf/health');
  },

  /**
   * smf_list_facilitators - List available facilitators
   * Maps to: GET /api/v1/smf/facilitators
   */
  async smf_list_facilitators(args) {
    let path = '/api/v1/smf/facilitators';
    const params = new URLSearchParams();
    if (args.status) params.set('status', args.status as string);
    if (args.chain_id) params.set('chain_id', args.chain_id as string);
    if (params.toString()) path += `?${params.toString()}`;
    return apiRequest<SMFFacilitatorsResponse>('GET', path);
  },

  // =========================================================================
  // Webhook Tools
  // =========================================================================

  /**
   * smf_create_webhook - Create a webhook configuration
   * Maps to: POST /api/v1/webhooks
   */
  async smf_create_webhook(args) {
    const request: WebhookCreateRequest = {
      url: args.url as string,
      events: args.events as string[],
      endpointId: args.endpointId as string | undefined,
      enabled: args.enabled !== false, // default true
    };
    return apiRequest<Webhook>('POST', '/api/v1/webhooks', request);
  },

  /**
   * smf_list_webhooks - List webhook configurations
   * Maps to: GET /api/v1/webhooks
   */
  async smf_list_webhooks(args) {
    let path = '/api/v1/webhooks';
    const params = new URLSearchParams();
    if (args.endpointId) params.set('endpointId', args.endpointId as string);
    if (params.toString()) path += `?${params.toString()}`;
    return apiRequest<WebhookListResponse>('GET', path);
  },

  /**
   * smf_delete_webhook - Delete a webhook configuration
   * Maps to: DELETE /api/v1/webhooks/{id}
   */
  async smf_delete_webhook(args) {
    const webhookId = args.webhook_id as string;
    if (!webhookId) {
      throw new Error('webhook_id is required');
    }
    return apiRequest<{ success: boolean; message: string }>(
      'DELETE',
      `/api/v1/webhooks/${webhookId}`
    );
  },
};

// =============================================================================
// MCP Protocol Handlers
// =============================================================================

/**
 * Handle tools/list request
 */
export function handleToolsList(): MCPToolDefinition[] {
  return SMF_MCP_TOOLS;
}

/**
 * Handle tools/call request
 */
export async function handleToolsCall(
  params: ToolCallParams,
  logger?: (msg: string) => void
): Promise<unknown> {
  const { name, arguments: args } = params;

  const handler = toolHandlers[name];
  if (!handler) {
    throw new Error(`Unknown tool: ${name}`);
  }

  if (logger) logger(`Calling tool: ${name}`);
  const result = await handler(args || {});
  if (logger) logger(`Tool ${name} completed`);
  
  return result;
}

/**
 * Process an MCP request
 */
export async function processRequest(
  request: MCPRequest,
  logger?: (msg: string) => void
): Promise<MCPResponse> {
  const { id, method, params } = request;

  try {
    let result: unknown;

    switch (method) {
      case 'initialize':
        result = {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
          },
          serverInfo: {
            name: 'nexflow-smf-mcp',
            version: '1.0.0',
          },
        };
        break;

      case 'tools/list':
        result = { tools: handleToolsList() };
        break;

      case 'tools/call':
        if (!params?.name) {
          throw new Error('Missing tool name');
        }
        result = {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                await handleToolsCall(params as unknown as ToolCallParams, logger),
                null,
                2
              ),
            },
          ],
        };
        break;

      case 'notifications/initialized':
        // Acknowledge initialization notification (no response needed for notifications)
        return { jsonrpc: '2.0', id };

      default:
        throw new Error(`Unknown method: ${method}`);
    }

    return { jsonrpc: '2.0', id, result };
  } catch (error) {
    return {
      jsonrpc: '2.0',
      id,
      error: {
        code: -32603,
        message: error instanceof Error ? error.message : 'Internal error',
      },
    };
  }
}
