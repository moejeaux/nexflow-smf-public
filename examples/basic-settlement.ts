/**
 * NexFlow SMF - Basic Settlement Example
 * 
 * This example demonstrates the complete flow for routing, verifying,
 * and settling a USDC payment on Base using NexFlow SMF.
 * 
 * Prerequisites:
 * - NEXFLOW_API_KEY environment variable set
 * - Node.js 20+
 * 
 * Run:
 *   export NEXFLOW_API_KEY=nf_live_your_key_here
 *   cd sdk && npm install
 *   npx tsx ../examples/basic-settlement.ts
 */

import { 
  NexFlowSMFClient, 
  NexFlowSMFError,
  generateIdempotencyKey 
} from '../sdk/src';

// =============================================================================
// Configuration
// =============================================================================

// Base mainnet addresses
const BASE_CHAIN_ID = 'eip155:8453';
const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const SETTLEMENT_CONTRACT = '0x43A04228152115fDd5663B2Aa559Ebd84D17A49D';

// API base URL (can be overridden via env var)
const API_BASE_URL = process.env.NEXFLOW_BASE_URL || 'https://api.nexflowapp.app';

// =============================================================================
// Main Example
// =============================================================================

async function main() {
  // Validate environment
  const apiKey = process.env.NEXFLOW_API_KEY;
  if (!apiKey) {
    console.error('❌ NEXFLOW_API_KEY environment variable is required');
    console.error('   Sign up or log in at https://nexflowapp.app, go to Developers → API Keys, and click Create API key.');
    process.exit(1);
  }

  console.log('🔵 NexFlow SMF - Basic Settlement Example\n');
  console.log(`   Chain: Base Mainnet (${BASE_CHAIN_ID})`);
  console.log(`   Token: USDC (${USDC_ADDRESS})`);
  console.log(`   Contract: ${SETTLEMENT_CONTRACT}`);
  console.log(`   API: ${API_BASE_URL}\n`);

  // Initialize client
  const smf = new NexFlowSMFClient({
    baseUrl: API_BASE_URL,
    apiKey,
  });

  console.log('✅ SMF client initialized\n');

  // ============================================================
  // Step 1: Check System Health
  // ============================================================
  console.log('📊 Checking system health...');
  try {
    const health = await smf.health();
    console.log(`   Status: ${health.status}`);
    console.log(`   Facilitators: ${health.summary.healthy}/${health.summary.total} healthy`);
    
    if (health.summary.down > 0) {
      console.log(`   ⚠️ ${health.summary.down} facilitators are down`);
    }
    console.log();

    // Show facilitator details
    console.log('   Available Facilitators:');
    for (const f of health.facilitators) {
      const icon = f.status === 'healthy' ? '✅' : f.status === 'degraded' ? '⚠️' : '❌';
      console.log(`   ${icon} ${f.name} (${f.facilitatorId}): ${f.status}`);
    }
    console.log();
  } catch (error) {
    console.error('   ❌ Failed to check health:', error);
  }

  // ============================================================
  // Step 2: List Available Facilitators
  // ============================================================
  console.log('📋 Listing facilitators...');
  try {
    const facilitators = await smf.facilitators();
    console.log(`   Found ${facilitators.length} facilitators:`);
    for (const f of facilitators) {
      console.log(`   - ${f.id}: ${f.label} (fee: ${f.feeBps}bps, priority: ${f.priority})`);
    }
    console.log();
  } catch (error) {
    console.error('   ❌ Failed to list facilitators:', error);
  }

  // ============================================================
  // Step 3: Route a Payment
  // ============================================================
  console.log('🛣️  Routing payment...');
  try {
    const paymentId = `example-${generateIdempotencyKey()}`;
    const amountWei = '1000000'; // 1 USDC (6 decimals)

    const route = await smf.route({
      amount_wei: amountWei,
      token_address: USDC_ADDRESS,
      chain_id: BASE_CHAIN_ID,
      payment_id: paymentId,
      metadata: {
        source: 'example-script',
        purpose: 'demo',
      },
    });

    console.log('   ✅ Route selected!');
    console.log(`   Payment ID: ${paymentId}`);
    console.log(`   Facilitator: ${route.facilitator_id}`);
    console.log(`   Path: ${route.path}`);
    console.log(`   Expected fee: ${route.expected_fee_wei} wei`);
    console.log(`   Estimated latency: ${route.estimated_latency_ms}ms`);
    console.log(`   Confidence: ${(route.confidence * 100).toFixed(1)}%`);
    console.log(`   Quote expires: ${route.quote_expires_at}`);
    console.log();

    // Check rate limits
    const rateLimit = smf.getRateLimit();
    if (rateLimit) {
      console.log(`   📈 Rate limit: ${rateLimit.remaining}/${rateLimit.limit} requests remaining`);
      if (smf.isApproachingRateLimit()) {
        console.log('   ⚠️ Approaching rate limit!');
      }
    }
    console.log();
  } catch (error) {
    handleError('routing', error);
  }

  // ============================================================
  // Step 4: Verify a Payment (Demo)
  // ============================================================
  console.log('🔍 Verifying payment intent (demo)...');
  console.log('   ℹ️ In production, you would verify real x402 payment intents');
  console.log('   ℹ️ Skipping verification demo (requires real payment intent)\n');

  // Example of how verification works:
  // const verification = await smf.verify({
  //   payment_intent: 'x402:1:base:0x...',
  //   recipient_address: '0xYourAddress...',
  // });

  // ============================================================
  // Step 5: Settlement (Info Only)
  // ============================================================
  console.log('💰 Settlement Info:');
  console.log(`   Contract: ${SETTLEMENT_CONTRACT}`);
  console.log('   BaseScan: https://basescan.org/address/' + SETTLEMENT_CONTRACT);
  console.log('\n   ℹ️ In production, settlements happen automatically in batches');
  console.log('   ℹ️ Use smf.settle() to force immediate settlement\n');

  // Example of how settlement works:
  // const settlement = await smf.settle({
  //   batch_id: 'batch-xyz',
  //   facilitator_id: 'cdp',
  //   force: true,
  // });

  console.log('✅ Example complete!\n');
  console.log('📚 Next steps:');
  console.log('   - Read the docs: https://nexflowapp.app/docs');
  console.log('   - View contract: https://basescan.org/address/' + SETTLEMENT_CONTRACT);
  console.log('   - Get support: https://github.com/moejeaux/nexflow-smf-public/issues\n');
}

// =============================================================================
// Error Handling
// =============================================================================

function handleError(operation: string, error: unknown): void {
  if (error instanceof NexFlowSMFError) {
    console.error(`   ❌ SMF Error during ${operation}:`);
    console.error(`      Code: ${error.code}`);
    console.error(`      Message: ${error.message}`);
    
    // Handle specific error codes
    switch (error.code) {
      case 'INVALID_API_KEY':
        console.error('      → Check your NEXFLOW_API_KEY');
        break;
      case 'RATE_LIMITED':
        console.error('      → Slow down requests or upgrade your plan');
        break;
      case 'TIMEOUT':
        console.error('      → Try again or check network connectivity');
        break;
      default:
        if (error.details) {
          console.error(`      Details: ${JSON.stringify(error.details)}`);
        }
    }
  } else {
    console.error(`   ❌ Unexpected error during ${operation}:`, error);
  }
  console.log();
}

// =============================================================================
// Run
// =============================================================================

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

