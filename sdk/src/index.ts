// =============================================================================
// @nexflow/smf SDK
// =============================================================================
// NexFlow Smart Meta-Facilitator SDK for x402 payments
// Zero runtime dependencies
//
// Quick Start:
//   import { NexFlowSMFClient } from '@nexflow/smf';
//
//   const smf = new NexFlowSMFClient({
//     baseUrl: 'https://api.nexflowapp.app',
//     apiKey: process.env.NEXFLOW_API_KEY!,
//   });
//
//   const route = await smf.route({
//     amount_wei: '1000000',
//     token_address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
//     chain_id: 'eip155:8453',
//   });

// =============================================================================
// CLIENT
// =============================================================================
export { NexFlowSMFClient } from './client';

// =============================================================================
// ERRORS
// =============================================================================
export { NexFlowSMFError } from './errors';

// =============================================================================
// TYPES
// =============================================================================
export type {
  // Client options
  NexFlowSMFClientOptions,
  RequestOptions,
  
  // Route
  SMFRouteRequest,
  SMFRouteResponse,
  
  // Verify
  SMFVerifyRequest,
  SMFVerifyResponse,
  
  // Settle
  SMFSettleRequest,
  SMFSettleResponse,
  SMFSettlementStatus,
  
  // Health
  SMFHealthResponse,
  HealthStatus,
  
  // Facilitators
  SMFFacilitatorInfo,
  
  // Rate limiting
  RateLimitInfo,
  
  // Errors
  SMFErrorResponse,
  SMFErrorCode,
} from './types';

// =============================================================================
// UTILITIES
// =============================================================================
export {
  generateIdempotencyKey,
  isValidChainId,
  isValidAddress,
  isValidWei,
  isValidTokenAddress,
  isValidPaymentIntent,
} from './utils';

