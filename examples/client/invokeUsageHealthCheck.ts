/**
 * invokeUsageHealthCheck.ts
 *
 * Minimal example demonstrating the 402 → pay → retry pattern
 * for invoking a NexFlow SMF workflow via the MPP gateway.
 *
 * ⚠️  THIS USES A MOCK PAYMENT PROOF.
 * Real deployments MUST integrate a real MPP verifier (x402 or Tempo MPP)
 * to produce a valid X-PAYMENT-PROOF header.
 *
 * Usage:
 *   export NEXFLOW_SMF_BASE_URL=http://localhost:3001
 *   export WORKFLOW_ID=wf_abc123_1
 *   npx tsx examples/client/invokeUsageHealthCheck.ts
 */

const BASE_URL = process.env.NEXFLOW_SMF_BASE_URL || 'http://localhost:3001';
const WORKFLOW_ID = process.env.WORKFLOW_ID;

if (!WORKFLOW_ID) {
  console.error('ERROR: Set WORKFLOW_ID env var to the ID returned by POST /nexflow/workflows');
  process.exit(1);
}

interface PaymentChallenge {
  object: string;
  operation: string;
  workflow_id: string;
  required_amount: number;
  currency: string;
  price_breakdown: {
    totalPrice: number;
    baseCost: number;
    markup: number;
    platformFee: number;
  };
  challenge: unknown;
}

/**
 * Build a mock X-PAYMENT-PROOF header.
 *
 * ⚠️  This is NOT a real payment. A real agent would:
 *   1. Parse the 402 challenge to get the required amount.
 *   2. Pay via Tempo MPP or an x402 facilitator.
 *   3. Encode the real proof as base64 JSON in this header.
 */
function buildMockProof(amount: number): string {
  const proof = {
    proofId: `mock_${Date.now().toString(36)}`,
    protocol: 'mpp',
    amountPaid: amount,
    currency: 'usdc',
    payerId: 'demo_caller',
  };
  return Buffer.from(JSON.stringify(proof)).toString('base64');
}

async function main() {
  const invokeUrl = `${BASE_URL}/nexflow/workflows/${WORKFLOW_ID}/invoke`;
  const input = {
    scope: { type: 'caller', id: 'demo_caller' },
    windowHours: 24,
  };

  console.log(`\n--- NexFlow SMF Workflow Invocation Demo ---`);
  console.log(`Base URL:    ${BASE_URL}`);
  console.log(`Workflow ID: ${WORKFLOW_ID}`);
  console.log(`Invoke URL:  ${invokeUrl}\n`);

  // ── Step 1: Call without payment → expect 402 ───────────────────
  console.log('Step 1: Calling without payment proof (expect 402)...\n');

  const firstResponse = await fetch(invokeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Caller-Id': 'demo_caller',
    },
    body: JSON.stringify(input),
  });

  if (firstResponse.status !== 402) {
    console.error(`Unexpected status: ${firstResponse.status}`);
    console.error(await firstResponse.text());
    process.exit(1);
  }

  const challenge: PaymentChallenge = await firstResponse.json() as PaymentChallenge;
  console.log(`Got 402 Payment Required!`);
  console.log(`  Operation:       ${challenge.operation}`);
  console.log(`  Workflow:        ${challenge.workflow_id}`);
  console.log(`  Required amount: ${challenge.required_amount} minor units`);
  console.log(`  Currency:        ${challenge.currency}`);
  if (challenge.price_breakdown) {
    console.log(`  Breakdown:`);
    console.log(`    Base cost:    ${challenge.price_breakdown.baseCost}`);
    console.log(`    Markup:       ${challenge.price_breakdown.markup}`);
    console.log(`    Platform fee: ${challenge.price_breakdown.platformFee}`);
    console.log(`    Total:        ${challenge.price_breakdown.totalPrice}`);
  }

  // ── Step 2: "Pay" and retry with proof → expect 200 ─────────────
  console.log('\nStep 2: Retrying with mock payment proof...\n');

  // ⚠️  In production, the agent would actually pay here via MPP/x402.
  const mockProof = buildMockProof(challenge.required_amount);

  const secondResponse = await fetch(invokeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Caller-Id': 'demo_caller',
      'X-PAYMENT-PROOF': mockProof,
    },
    body: JSON.stringify(input),
  });

  console.log(`Response status: ${secondResponse.status}`);
  const result = await secondResponse.json();
  console.log(`Result:\n${JSON.stringify(result, null, 2)}`);

  if (secondResponse.status === 200) {
    console.log('\nWorkflow executed successfully!');
  } else {
    console.log('\nWorkflow execution returned an error (this is expected if downstream is not configured).');
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
