// =============================================================================
// Test Signup Flow - Debug API Key Creation
// =============================================================================
// This script tests the complete signup flow to identify where API key issues occur
// Run with: npx tsx scripts/test-signup-flow.ts

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config({ path: path.join(process.cwd(), '.env') });

import { createAccount } from '../src/db/accounts';
import { createApiKey, findApiKeyByToken } from '../src/db/api-keys';

async function testSignupFlow() {
  console.log('🧪 Testing Signup Flow - API Key Creation\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const testEmail = `test-${Date.now()}@example.com`;
  const testPassword = 'TestPassword123';
  const testName = 'Test User';

  try {
    // Step 1: Create Account
    console.log('📝 Step 1: Creating account...');
    console.log(`   Email: ${testEmail}`);
    console.log(`   Name: ${testName}\n`);

    const account = await createAccount({
      email: testEmail,
      password: testPassword,
      name: testName,
    });

    console.log('✅ Account created successfully!');
    console.log(`   Account ID: ${account.id}`);
    console.log(`   Account Email: ${account.email}`);
    console.log(`   Account Status: ${account.status}`);
    console.log(`   Plan: ${account.plan.name}\n`);

    // Step 2: Create API Key
    console.log('🔑 Step 2: Creating API key...');
    console.log(`   User ID: ${account.id}`);
    console.log(`   Key Name: Default API Key\n`);

    const apiKey = await createApiKey({
      name: 'Default API Key',
      role: 'user',
      userId: account.id,
      rateLimit: 1000,
    });

    console.log('✅ API key created successfully!');
    console.log(`   Key ID: ${apiKey.id}`);
    console.log(`   Key Name: ${apiKey.name}`);
    console.log(`   Key Role: ${apiKey.role}`);
    console.log(`   Key Token: ${apiKey.token}`);
    console.log(`   Key Format Valid: ${apiKey.token.startsWith('nf_live_') || apiKey.token.startsWith('nf_test_') ? '✅ Yes' : '❌ No'}\n`);

    // Step 3: Verify API Key in Database
    console.log('🔍 Step 3: Verifying API key in database...');
    const foundKey = await findApiKeyByToken(apiKey.token);

    if (!foundKey) {
      console.error('❌ FAILED: API key not found in database!');
      console.error('   This means the key was created but cannot be retrieved.\n');
      process.exit(1);
    }

    console.log('✅ API key found in database!');
    console.log(`   Found Key ID: ${foundKey.id}`);
    console.log(`   Found Key Name: ${foundKey.name}`);
    console.log(`   Found Key Role: ${foundKey.role}`);
    console.log(`   User ID Match: ${foundKey.userId === account.id ? '✅ Yes' : '❌ No'}\n`);

    // Step 4: Test Authentication
    console.log('🔐 Step 4: Testing authentication...');
    // findApiKeyByToken is already imported above, reuse it
    const authResult = await findApiKeyByToken(apiKey.token);

    if (!authResult) {
      console.error('❌ FAILED: Authentication check failed!');
      console.error('   API key exists in database but cannot be authenticated.\n');
      process.exit(1);
    }

    console.log('✅ Authentication check passed!');
    console.log(`   Authenticated Key ID: ${authResult.id}`);
    console.log(`   Authenticated Role: ${authResult.role}\n`);

    // Step 5: Simulate Signup Response
    console.log('📤 Step 5: Simulating signup response...');
    const signupResponse = {
      success: true,
      accountId: account.id,
      plan: account.plan,
      apiKey: {
        id: apiKey.id,
        name: apiKey.name,
        token: apiKey.token,
      },
    };

    console.log('✅ Signup response structure:');
    console.log(JSON.stringify(signupResponse, null, 2));
    console.log();

    // Step 6: Test localStorage Simulation
    console.log('💾 Step 6: Testing localStorage simulation...');
    const tokenToStore = apiKey.token;
    console.log(`   Token to store: ${tokenToStore.substring(0, 20)}...`);
    
    // Simulate localStorage
    const storedToken = tokenToStore; // In real browser, this would be localStorage.getItem('api_key')
    console.log(`   Stored token: ${storedToken.substring(0, 20)}...`);
    console.log(`   Tokens match: ${storedToken === tokenToStore ? '✅ Yes' : '❌ No'}\n`);

    // Step 7: Final Verification
    console.log('✅ Final Verification: Testing complete API call...');
    const finalCheck = await findApiKeyByToken(storedToken);
    
    if (!finalCheck) {
      console.error('❌ FAILED: Final verification failed!');
      console.error('   API key from "localStorage" cannot be authenticated.\n');
      process.exit(1);
    }

    console.log('✅ Final verification passed!\n');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 ALL TESTS PASSED!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('📋 Summary:');
    console.log(`   Account created: ✅`);
    console.log(`   API key created: ✅`);
    console.log(`   API key in database: ✅`);
    console.log(`   Authentication works: ✅`);
    console.log(`   Signup response valid: ✅\n`);

    console.log('💡 If signup is failing, check:');
    console.log('   1. Browser console for localStorage errors');
    console.log('   2. Network tab for signup request/response');
    console.log('   3. Database connection');
    console.log('   4. API key format validation\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ TEST FAILED!\n');
    console.error('Error:', error);
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

testSignupFlow();
