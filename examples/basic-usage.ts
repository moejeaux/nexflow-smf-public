/**
 * @nexflow/sdk - Basic Usage Example
 * 
 * This example demonstrates:
 * - Creating a NexFlow client
 * - Creating a metered endpoint
 * - Running metered calls
 * - Checking usage limits
 * - Error handling
 */

import { NexFlow, QuotaExceededError, AuthenticationError } from '../src';

async function main() {
  // Initialize the client
  const nf = new NexFlow({
    apiKey: process.env.NEXFLOW_API_KEY!,
    // baseUrl: 'http://localhost:3000' // For local development
  });

  console.log('✅ NexFlow client initialized\n');

  // ============================================================
  // 1. Check current usage
  // ============================================================
  console.log('📊 Checking usage summary...');
  const usage = await nf.usage.summary();
  console.log(`   Plan: ${usage.plan.name}`);
  console.log(`   Today: ${usage.today.used}/${usage.plan.dailyLimit} calls`);
  console.log(`   Month: ${usage.month.used}/${usage.plan.monthlyLimit} calls\n`);

  // ============================================================
  // 2. List existing endpoints
  // ============================================================
  console.log('📋 Listing endpoints...');
  const { endpoints } = await nf.endpoints.list();
  console.log(`   Found ${endpoints.length} endpoints\n`);

  // ============================================================
  // 3. Create a new endpoint (or use existing)
  // ============================================================
  let endpoint;
  
  if (endpoints.length > 0) {
    endpoint = endpoints[0];
    console.log(`🔄 Using existing endpoint: ${endpoint.name}\n`);
  } else {
    console.log('🆕 Creating new endpoint...');
    const result = await nf.endpoints.create({
      name: 'Demo API',
      description: 'A demo endpoint for testing',
      upstreamUrl: 'https://jsonplaceholder.typicode.com/posts',
      pricePerCall: '0.001',
      recipientAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595e8aaBb',
    });
    endpoint = result.endpoint;
    console.log(`   Created: ${endpoint.id}\n`);
  }

  // ============================================================
  // 4. Run a metered call
  // ============================================================
  console.log('🚀 Running metered call...');
  try {
    const result = await nf.run(endpoint.id, {
      title: 'Test Post',
      body: 'Hello from NexFlow SDK!',
      userId: 1,
    });

    console.log('   ✅ Call successful!');
    console.log(`   Status: ${result.success}`);
    console.log(`   Price charged: $${result.billing.pricePerCall} USDC`);
    console.log(`   Platform fee: $${result.billing.platformCut} USDC`);
    console.log(`   Creator receives: $${result.billing.creatorNet} USDC`);
    console.log(`   Daily usage: ${result.usage.daily}/${result.usage.dailyLimit}`);
    console.log(`   Monthly usage: ${result.usage.monthly}/${result.usage.monthlyLimit}\n`);
  } catch (error) {
    if (error instanceof QuotaExceededError) {
      console.log('   ⚠️ Quota exceeded!');
      console.log(`   Daily: ${error.usage.daily}/${error.limits.dailyLimit}`);
      console.log(`   Monthly: ${error.usage.monthly}/${error.limits.monthlyLimit}`);
      console.log('   Upgrade your plan at https://nexflowapp.app/pricing\n');
    } else if (error instanceof AuthenticationError) {
      console.log('   ❌ Authentication failed! Check your API key.\n');
    } else {
      throw error;
    }
  }

  // ============================================================
  // 5. Get endpoint billing summary
  // ============================================================
  console.log('💰 Fetching endpoint billing summary...');
  const summary = await nf.endpoints.summary(endpoint.id);
  console.log(`   Calls this month: ${summary.thisMonth.calls}`);
  console.log(`   Gross revenue: $${summary.thisMonth.gross} USDC`);
  console.log(`   Platform cut: $${summary.thisMonth.platformCut} USDC`);
  console.log(`   Creator net: $${summary.thisMonth.creatorNet} USDC\n`);

  console.log('✅ Demo complete!');
}

// Run the example
main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});

