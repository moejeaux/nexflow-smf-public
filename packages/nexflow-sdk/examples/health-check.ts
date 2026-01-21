#!/usr/bin/env npx tsx
// =============================================================================
// Health Check Example - NexFlow SDK
// =============================================================================
// This example demonstrates how to check the health of the NexFlow SMF system.
//
// Usage:
//   NEXFLOW_API_KEY="nf_live_xxx" npx tsx examples/health-check.ts
//
// Or configure base URL for local testing:
//   NEXFLOW_API_KEY="nf_test_xxx" NEXFLOW_BASE_URL="http://localhost:3000" npx tsx examples/health-check.ts

const API_KEY = process.env.NEXFLOW_API_KEY;
const BASE_URL = process.env.NEXFLOW_BASE_URL || 'https://api.nexflowapp.app';

if (!API_KEY) {
  console.error('❌ Missing NEXFLOW_API_KEY environment variable');
  console.log('\nUsage:');
  console.log('  NEXFLOW_API_KEY="nf_live_xxx" npx tsx examples/health-check.ts\n');
  process.exit(1);
}

// Mask API key for safe logging
const maskedKey = `${API_KEY.substring(0, 10)}...${API_KEY.slice(-4)}`;

async function checkHealth() {
  console.log('🔍 NexFlow SMF Health Check');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`📡 Base URL: ${BASE_URL}`);
  console.log(`🔑 API Key: ${maskedKey}\n`);

  try {
    // 1. Check SMF Health
    console.log('📊 Checking SMF Health...');
    const healthResponse = await fetch(`${BASE_URL}/api/v1/smf/health`, {
      headers: {
        'x-api-key': API_KEY,
        'Accept': 'application/json',
      },
    });

    if (!healthResponse.ok) {
      const error = await healthResponse.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`Health check failed: ${healthResponse.status} - ${error.error || error.message}`);
    }

    const health = await healthResponse.json();
    
    console.log(`   Status: ${health.status === 'healthy' ? '✅' : '⚠️'} ${health.status.toUpperCase()}`);
    console.log(`   Facilitators: ${health.summary?.total || 0} total`);
    console.log(`     - Healthy: ${health.summary?.healthy || 0}`);
    console.log(`     - Degraded: ${health.summary?.degraded || 0}`);
    console.log(`     - Down: ${health.summary?.down || 0}`);
    console.log(`   Timestamp: ${health.timestamp}\n`);

    // 2. List Facilitators
    console.log('📋 Listing Facilitators...');
    const facilitatorsResponse = await fetch(`${BASE_URL}/api/v1/smf/facilitators`, {
      headers: {
        'x-api-key': API_KEY,
        'Accept': 'application/json',
      },
    });

    if (facilitatorsResponse.ok) {
      const facilitators = await facilitatorsResponse.json();
      console.log(`   Found ${facilitators.count || 0} facilitators:`);
      for (const f of facilitators.facilitators || []) {
        console.log(`   - ${f.label || f.id}: ${f.enabled ? '✅ enabled' : '❌ disabled'} (fee: ${f.feeBps || 0} bps)`);
      }
    } else {
      console.log('   ⚠️ Could not list facilitators');
    }
    console.log();

    // 3. Check Endpoints
    console.log('📦 Checking Endpoints...');
    const endpointsResponse = await fetch(`${BASE_URL}/api/v1/endpoints`, {
      headers: {
        'x-api-key': API_KEY,
        'Accept': 'application/json',
      },
    });

    if (endpointsResponse.ok) {
      const endpoints = await endpointsResponse.json();
      console.log(`   Found ${endpoints.count || 0} endpoints`);
      for (const ep of (endpoints.endpoints || []).slice(0, 5)) {
        console.log(`   - ${ep.name}: ${ep.status} (price: ${ep.pricePerCall || ep.price} USDC)`);
      }
      if ((endpoints.count || 0) > 5) {
        console.log(`   ... and ${endpoints.count - 5} more`);
      }
    } else {
      const error = await endpointsResponse.json().catch(() => ({}));
      console.log(`   ⚠️ Could not list endpoints: ${error.error || endpointsResponse.status}`);
    }
    console.log();

    // Summary
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Health check complete!\n');

    console.log('📖 Next Steps:');
    console.log('   1. Route a payment:');
    console.log(`      curl -X POST ${BASE_URL}/api/v1/smf/route \\`);
    console.log(`        -H "x-api-key: ${maskedKey}" \\`);
    console.log('        -H "Content-Type: application/json" \\');
    console.log('        -d \'{"amount_wei":"1000000","token_address":"0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913","chain_id":"eip155:8453"}\'\n');
    console.log('   2. Create an endpoint:');
    console.log('      See examples/basic-usage.ts\n');

  } catch (error) {
    console.error(`\n❌ Error: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
}

checkHealth();
