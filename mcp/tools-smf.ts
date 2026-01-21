// =============================================================================
// MCP Tool Definitions for SMF
// =============================================================================
// This file defines the MCP tool schemas for exposing SMF functionality
// to AI agents and MCP-compatible clients.
//
// NOTE: This is a type/schema definition file only.
// The actual MCP server implementation will be done separately.
//
// Tools defined:
// - smf_route: Route a payment to the best facilitator
// - smf_verify: Verify a payment transaction
// - smf_settle: Settle a verified payment
// - smf_health: Get SMF system health status
// - smf_list_facilitators: List available facilitators

import type {
  SMFRouteRequest,
  SMFRouteResponse,
  SMFVerifyRequest,
  SMFVerifyResponse,
  SMFSettleRequest,
  SMFSettleResponse,
  SMFHealthResponse,
  SMFFacilitatorsResponse,
} from '@/types/smf-api';

// =============================================================================
// MCP TOOL SCHEMA TYPES
// =============================================================================

/**
 * MCP Tool definition structure (compatible with Model Context Protocol)
 */
export interface MCPToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, MCPPropertySchema>;
    required?: string[];
  };
}

/**
 * MCP Property schema (JSON Schema subset)
 */
export interface MCPPropertySchema {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
  enum?: string[];
  items?: MCPPropertySchema;
  properties?: Record<string, MCPPropertySchema>;
  required?: string[];
  default?: unknown;
}

// =============================================================================
// TOOL DEFINITIONS
// =============================================================================

/**
 * smf_route tool - Routes a payment to the best available facilitator
 * 
 * Maps to: POST /api/v1/smf/route
 * Request type: SMFRouteRequest
 * Response type: SMFRouteResponse
 */
export const smf_route: MCPToolDefinition = {
  name: 'smf_route',
  description: 'Route a cryptocurrency payment to the best available facilitator. Returns a quote with facilitator selection, fees, and a quote_id for subsequent verification and settlement.',
  inputSchema: {
    type: 'object',
    properties: {
      amount_wei: {
        type: 'string',
        description: 'Amount in atomic units (wei for ETH, 6 decimals for USDC). Example: "1000000" for 1 USDC.',
      },
      token_address: {
        type: 'string',
        description: 'Token contract address. Example: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" for USDC on Base.',
      },
      chain_id: {
        type: 'string',
        description: 'Chain ID in CAIP-2 format. Example: "eip155:8453" for Base mainnet.',
      },
      payment_id: {
        type: 'string',
        description: 'Optional payment ID for idempotency. If provided, repeated calls with the same ID return cached results.',
      },
      recipient_address: {
        type: 'string',
        description: 'Optional recipient address override. If not provided, uses the default configured recipient.',
      },
    },
    required: ['amount_wei', 'token_address', 'chain_id'],
  },
};

/**
 * smf_verify tool - Verifies a payment transaction
 * 
 * Maps to: POST /api/v1/smf/verify
 * Request type: SMFVerifyRequest
 * Response type: SMFVerifyResponse
 */
export const smf_verify: MCPToolDefinition = {
  name: 'smf_verify',
  description: 'Verify that a cryptocurrency payment transaction was successfully completed on-chain. Requires a quote_id from a previous route call.',
  inputSchema: {
    type: 'object',
    properties: {
      quote_id: {
        type: 'string',
        description: 'Quote ID returned from a previous smf_route call.',
      },
      tx_hash: {
        type: 'string',
        description: 'Transaction hash to verify. Must be a valid 66-character hex string starting with 0x.',
      },
      chain_id: {
        type: 'string',
        description: 'Chain ID in CAIP-2 format where the transaction was submitted.',
      },
      expected_amount_wei: {
        type: 'string',
        description: 'Expected amount in atomic units to verify against.',
      },
      expected_recipient: {
        type: 'string',
        description: 'Expected recipient address to verify against.',
      },
      facilitator_id: {
        type: 'string',
        description: 'Optional: specific facilitator to use for verification. If not provided, uses the facilitator from the original quote.',
      },
    },
    required: ['quote_id', 'tx_hash', 'chain_id', 'expected_amount_wei', 'expected_recipient'],
  },
};

/**
 * smf_settle tool - Settles a verified payment
 * 
 * Maps to: POST /api/v1/smf/settle
 * Request type: SMFSettleRequest
 * Response type: SMFSettleResponse
 */
export const smf_settle: MCPToolDefinition = {
  name: 'smf_settle',
  description: 'Settle a verified payment, triggering the payout to the merchant/recipient. Only call this after successful verification.',
  inputSchema: {
    type: 'object',
    properties: {
      quote_id: {
        type: 'string',
        description: 'Quote ID from the original route call.',
      },
      tx_hash: {
        type: 'string',
        description: 'Verified transaction hash.',
      },
      amount_wei: {
        type: 'string',
        description: 'Final amount to settle in atomic units.',
      },
      fee_wei: {
        type: 'string',
        description: 'Fee amount in atomic units (should match the quote).',
      },
      payout_recipient: {
        type: 'string',
        description: 'Address to receive the payout.',
      },
      batch_id: {
        type: 'string',
        description: 'Optional batch ID for grouping multiple settlements.',
      },
    },
    required: ['quote_id', 'tx_hash', 'amount_wei', 'fee_wei', 'payout_recipient'],
  },
};

/**
 * smf_health tool - Gets SMF system health status
 * 
 * Maps to: GET /api/v1/smf/health
 * Request type: none (GET request)
 * Response type: SMFHealthResponse
 */
export const smf_health: MCPToolDefinition = {
  name: 'smf_health',
  description: 'Get the current health status of the SMF (Smart Meta-Facilitator) system, including per-facilitator health metrics.',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
};

/**
 * smf_list_facilitators tool - Lists available facilitators
 * 
 * Maps to: GET /api/v1/smf/facilitators
 * Request type: none (GET request)
 * Response type: SMFFacilitatorsResponse
 */
export const smf_list_facilitators: MCPToolDefinition = {
  name: 'smf_list_facilitators',
  description: 'List all available payment facilitators with their capabilities, supported chains/tokens, and fee structures.',
  inputSchema: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        description: 'Optional: filter by status',
        enum: ['active', 'inactive', 'maintenance'],
      },
      chain_id: {
        type: 'string',
        description: 'Optional: filter by supported chain',
      },
    },
    required: [],
  },
};

// =============================================================================
// WEBHOOK TOOL DEFINITIONS
// =============================================================================

/**
 * smf_create_webhook tool - Create a webhook configuration
 * 
 * Maps to: POST /api/v1/webhooks
 * Request type: WebhookCreateRequest
 * Response type: Webhook
 */
export const smf_create_webhook: MCPToolDefinition = {
  name: 'smf_create_webhook',
  description: 'Create a webhook to receive async notifications for payment events. Returns a signing secret (shown only once) to verify webhook payloads.',
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'Webhook endpoint URL. Must be HTTPS in production. Example: "https://api.yoursite.com/webhooks/nexflow"',
      },
      events: {
        type: 'array',
        description: 'Event types to subscribe to. Available: payment.verified, payment.failed, usage.recorded, session.completed, endpoint.created, endpoint.updated, endpoint.deleted',
        items: {
          type: 'string',
          enum: ['payment.verified', 'payment.failed', 'usage.recorded', 'session.completed', 'endpoint.created', 'endpoint.updated', 'endpoint.deleted'],
        },
      },
      endpointId: {
        type: 'string',
        description: 'Optional: scope webhook to a specific endpoint ID',
      },
      enabled: {
        type: 'boolean',
        description: 'Whether webhook is enabled (default: true)',
        default: true,
      },
    },
    required: ['url', 'events'],
  },
};

/**
 * smf_list_webhooks tool - List webhook configurations
 * 
 * Maps to: GET /api/v1/webhooks
 * Request type: { endpointId?: string }
 * Response type: WebhookListResponse
 */
export const smf_list_webhooks: MCPToolDefinition = {
  name: 'smf_list_webhooks',
  description: 'List all webhook configurations for your account. Optionally filter by endpoint ID.',
  inputSchema: {
    type: 'object',
    properties: {
      endpointId: {
        type: 'string',
        description: 'Optional: filter webhooks by endpoint ID',
      },
    },
    required: [],
  },
};

/**
 * smf_delete_webhook tool - Delete a webhook configuration
 * 
 * Maps to: DELETE /api/v1/webhooks/{id}
 * Request type: { webhook_id: string }
 * Response type: { success: boolean, message: string }
 */
export const smf_delete_webhook: MCPToolDefinition = {
  name: 'smf_delete_webhook',
  description: 'Delete a webhook configuration. The webhook will stop receiving events immediately.',
  inputSchema: {
    type: 'object',
    properties: {
      webhook_id: {
        type: 'string',
        description: 'The webhook ID to delete (format: wh_xxx)',
      },
    },
    required: ['webhook_id'],
  },
};

// =============================================================================
// ALL TOOLS EXPORT
// =============================================================================

/**
 * All SMF MCP tools (including webhooks)
 */
export const SMF_MCP_TOOLS: MCPToolDefinition[] = [
  // Core SMF tools
  smf_route,
  smf_verify,
  smf_settle,
  smf_health,
  smf_list_facilitators,
  // Webhook tools
  smf_create_webhook,
  smf_list_webhooks,
  smf_delete_webhook,
];

// =============================================================================
// TYPE MAPPINGS (for documentation)
// =============================================================================

/**
 * Mapping of tool names to their request/response types
 * 
 * smf_route:
 *   - Request: SMFRouteRequest
 *   - Response: SMFRouteResponse
 *   - Endpoint: POST /api/v1/smf/route
 * 
 * smf_verify:
 *   - Request: SMFVerifyRequest
 *   - Response: SMFVerifyResponse
 *   - Endpoint: POST /api/v1/smf/verify
 * 
 * smf_settle:
 *   - Request: SMFSettleRequest
 *   - Response: SMFSettleResponse
 *   - Endpoint: POST /api/v1/smf/settle
 * 
 * smf_health:
 *   - Request: none
 *   - Response: SMFHealthResponse
 *   - Endpoint: GET /api/v1/smf/health
 * 
 * smf_list_facilitators:
 *   - Request: { status?: string, chain_id?: string }
 *   - Response: SMFFacilitatorsResponse
 *   - Endpoint: GET /api/v1/smf/facilitators
 */
export type SMFToolTypeMappings = {
  smf_route: { request: SMFRouteRequest; response: SMFRouteResponse };
  smf_verify: { request: SMFVerifyRequest; response: SMFVerifyResponse };
  smf_settle: { request: SMFSettleRequest; response: SMFSettleResponse };
  smf_health: { request: Record<string, never>; response: SMFHealthResponse };
  smf_list_facilitators: { request: { status?: string; chain_id?: string }; response: SMFFacilitatorsResponse };
};
