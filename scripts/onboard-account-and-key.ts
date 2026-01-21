// =============================================================================
// API-Only Account & Key Onboarding Script
// =============================================================================
// Run with: npx tsx scripts/onboard-account-and-key.ts [--email email] [--name name]
//
// This is the canonical way to onboard new accounts in the API-first model.
// It calls real API endpoints (not direct DB calls) to:
// 1. Create an account
// 2. Create a default user API key
//
// Example:
//   npx tsx scripts/onboard-account-and-key.ts
//   npx tsx scripts/onboard-account-and-key.ts --email dev@example.com --name "Dev Account"

import { parseArgs } from 'util';

// Configuration
const API_BASE_URL = process.env.NEXFLOW_API_BASE_URL || 'https://api.nexflowapp.app';

interface OnboardResult {
  accountId: string;
  email: string;
  apiKey: {
    id: string;
    name: string;
    token: string;
    role: string;
  };
  plan: {
    name: string;
    dailyLimit: number;
    monthlyLimit: number;
  };
}

async function onboardAccountAndKey(options: {
  email?: string;
  name?: string;
  password?: string;
}): Promise<OnboardResult> {
  // Generate random test email if not provided
  const email = options.email || `dev-${Date.now()}@nexflow-test.local`;
  const name = options.name || 'API Developer';
  const password = options.password || `SecurePass${Date.now()}!Aa1`;

  console.log('\n🚀 NexFlow API-Only Onboarding');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`📡 API Base URL: ${API_BASE_URL}`);
  console.log(`📧 Email: ${email}`);
  console.log(`👤 Name: ${name}\n`);

  // Step 1: Create account via API
  console.log('📝 Step 1: Creating account via POST /api/v1/auth/signup...');
  
  const signupResponse = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });

  const signupData = await signupResponse.json();

  if (!signupResponse.ok) {
    console.error('\n❌ Account creation failed!');
    console.error(`   Status: ${signupResponse.status}`);
    console.error(`   Error: ${signupData.error || signupData.message || 'Unknown error'}`);
    if (signupData.code) {
      console.error(`   Code: ${signupData.code}`);
    }
    if (signupData.details) {
      console.error(`   Details: ${JSON.stringify(signupData.details, null, 2)}`);
    }
    throw new Error(`Signup failed: ${signupData.error || 'Unknown error'}`);
  }

  if (!signupData.apiKey?.token) {
    console.error('\n❌ Account created but no API key returned!');
    console.error('   Response:', JSON.stringify(signupData, null, 2));
    throw new Error('No API key in signup response');
  }

  console.log('   ✅ Account created successfully!');
  console.log(`   Account ID: ${signupData.accountId}`);

  // Step 2: Verify the API key works
  console.log('\n🔐 Step 2: Verifying API key works...');
  
  const verifyResponse = await fetch(`${API_BASE_URL}/api/v1/endpoints`, {
    method: 'GET',
    headers: {
      'x-api-key': signupData.apiKey.token,
      'Accept': 'application/json',
    },
  });

  if (verifyResponse.ok) {
    console.log('   ✅ API key verified - can access protected endpoints');
  } else {
    const verifyData = await verifyResponse.json().catch(() => ({}));
    console.log('   ⚠️  API key verification returned:', verifyResponse.status, verifyData.error || '');
    // Don't fail - key might still work for other endpoints
  }

  // Build result
  const result: OnboardResult = {
    accountId: signupData.accountId,
    email,
    apiKey: {
      id: signupData.apiKey.id,
      name: signupData.apiKey.name || 'Default API Key',
      token: signupData.apiKey.token,
      role: 'user',
    },
    plan: signupData.plan || {
      name: 'free',
      dailyLimit: 1000,
      monthlyLimit: 10000,
    },
  };

  return result;
}

async function main() {
  try {
    // Parse command line arguments
    const { values } = parseArgs({
      options: {
        email: { type: 'string', short: 'e' },
        name: { type: 'string', short: 'n' },
        password: { type: 'string', short: 'p' },
        json: { type: 'boolean', short: 'j' },
        help: { type: 'boolean', short: 'h' },
      },
    });

    if (values.help) {
      console.log(`
Usage: npx tsx scripts/onboard-account-and-key.ts [options]

Options:
  -e, --email <email>     Email address for the account (default: auto-generated)
  -n, --name <name>       Name for the account (default: "API Developer")
  -p, --password <pass>   Password for the account (default: auto-generated)
  -j, --json              Output result as JSON only (for scripting)
  -h, --help              Show this help message

Environment:
  NEXFLOW_API_BASE_URL    API base URL (default: https://api.nexflowapp.app)

Examples:
  npx tsx scripts/onboard-account-and-key.ts
  npx tsx scripts/onboard-account-and-key.ts --email dev@company.com --name "Dev Team"
  npx tsx scripts/onboard-account-and-key.ts --json | jq '.apiKey.token'
`);
      process.exit(0);
    }

    const result = await onboardAccountAndKey({
      email: values.email,
      name: values.name,
      password: values.password,
    });

    if (values.json) {
      // JSON-only output for scripting
      console.log(JSON.stringify(result, null, 2));
    } else {
      // Human-readable output
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🎉 ONBOARDING COMPLETE!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      console.log('📋 Account Details:');
      console.log(`   Account ID: ${result.accountId}`);
      console.log(`   Email: ${result.email}`);
      console.log(`   Plan: ${result.plan.name} (${result.plan.dailyLimit}/day, ${result.plan.monthlyLimit}/month)\n`);
      
      console.log('🔑 API Key (SAVE THIS - IT WON\'T BE SHOWN AGAIN!):');
      console.log(`   Token: ${result.apiKey.token}`);
      console.log(`   Role: ${result.apiKey.role}\n`);

      console.log('📖 Quick Start:');
      console.log(`   # Set your API key`);
      console.log(`   export NEXFLOW_API_KEY="${result.apiKey.token}"\n`);
      
      console.log(`   # Check SMF health`);
      console.log(`   curl -X GET ${API_BASE_URL}/api/v1/smf/health \\`);
      console.log(`     -H "x-api-key: $NEXFLOW_API_KEY"\n`);
      
      console.log(`   # Route a payment`);
      console.log(`   curl -X POST ${API_BASE_URL}/api/v1/smf/route \\`);
      console.log(`     -H "x-api-key: $NEXFLOW_API_KEY" \\`);
      console.log(`     -H "Content-Type: application/json" \\`);
      console.log(`     -d '{"amount_wei":"1000000","token_address":"0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913","chain_id":"eip155:8453"}'\n`);

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

      // Also output JSON at the end for easy parsing
      console.log('📄 JSON Output:');
      console.log(JSON.stringify(result, null, 2));
    }

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Onboarding failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
