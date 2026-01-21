// =============================================================================
// Webhook Types
// =============================================================================
// TypeScript types for webhook management API
// Used by: API routes, MCP tools, SDK

/**
 * Supported webhook event types
 */
export type WebhookEventType =
  | 'payment.verified'
  | 'payment.failed'
  | 'usage.recorded'
  | 'session.completed'
  | 'endpoint.created'
  | 'endpoint.updated'
  | 'endpoint.deleted';

/**
 * All valid webhook event types
 */
export const WEBHOOK_EVENT_TYPES: WebhookEventType[] = [
  'payment.verified',
  'payment.failed',
  'usage.recorded',
  'session.completed',
  'endpoint.created',
  'endpoint.updated',
  'endpoint.deleted',
];

/**
 * POST /api/v1/webhooks - Request payload
 */
export interface WebhookCreateRequest {
  /** Webhook endpoint URL (must be HTTPS in production) */
  url: string;
  /** Event types to subscribe to */
  events: string[];
  /** Optional endpoint ID to scope webhook to specific endpoint */
  endpointId?: string;
  /** Whether webhook is enabled (default: true) */
  enabled?: boolean;
}

/**
 * Webhook configuration (returned by API)
 */
export interface Webhook {
  /** Unique webhook ID (format: wh_xxx) */
  id: string;
  /** Webhook endpoint URL */
  url: string;
  /** Subscribed event types */
  events: WebhookEventType[];
  /** Optional endpoint ID this webhook is scoped to */
  endpointId?: string;
  /** Whether webhook is enabled */
  enabled: boolean;
  /** Signing secret (only returned on creation) */
  secret?: string;
  /** Creation timestamp (ISO 8601) */
  createdAt: string;
  /** Last update timestamp (ISO 8601) */
  updatedAt: string;
}

/**
 * GET /api/v1/webhooks - Response payload
 */
export interface WebhookListResponse {
  /** List of webhook configurations */
  webhooks: Webhook[];
  /** Total count */
  count: number;
}

/**
 * DELETE /api/v1/webhooks/{id} - Response payload
 */
export interface WebhookDeleteResponse {
  success: boolean;
  message: string;
}

/**
 * Webhook delivery record
 */
export interface WebhookDelivery {
  /** Unique delivery ID */
  id: string;
  /** Webhook ID this delivery belongs to */
  webhookId: string;
  /** Event type */
  event: WebhookEventType;
  /** HTTP status code of delivery attempt */
  statusCode: number;
  /** Whether delivery was successful */
  success: boolean;
  /** Number of retry attempts */
  attempts: number;
  /** Error message if failed */
  error?: string;
  /** Request payload sent */
  payload: unknown;
  /** Response body (if any) */
  response?: string;
  /** Delivery timestamp (ISO 8601) */
  deliveredAt: string;
}

/**
 * Webhook event payload (sent to webhook URL)
 */
export interface WebhookEventPayload {
  /** Event ID */
  id: string;
  /** Event type */
  type: WebhookEventType;
  /** Event timestamp (ISO 8601) */
  timestamp: string;
  /** Event-specific data */
  data: Record<string, unknown>;
  /** API version */
  api_version: string;
}

/**
 * Type guard for WebhookCreateRequest
 */
export function isValidWebhookCreateRequest(obj: unknown): obj is WebhookCreateRequest {
  if (typeof obj !== 'object' || obj === null) return false;
  const req = obj as Record<string, unknown>;
  return (
    typeof req.url === 'string' &&
    Array.isArray(req.events) &&
    req.events.every((e) => typeof e === 'string')
  );
}
