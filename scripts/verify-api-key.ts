// =============================================================================
// Debug Script: Verify API Key in Database
// =============================================================================
// This script verifies if an API key exists in the database
// Run with: npx tsx scripts/verify-api-key.ts <api_key>

import dotenv from 'dotenv';
import path from 'path';

// Load .env.local explicitly (same as server does)
dotenv.config({ path: path.join(process.cwd(), '.env.local') });
dotenv.config({ path: path.join(process.cwd(), '.env') });

import { findApiKeyByToken, hashApiKey, listApiKeys } from '../src/db/api-keys';
import { getDb } from '../src/db/client';

async function verifyApiKey(apiKeyToken: string) {
  console.log('🔍 Verifying API key...\n');
  console.log(`Key: ${apiKeyToken.substring(0, 20)}...`);
  console.log(`Format: ${apiKeyToken.startsWith('nf_live_') ? 'nf_live_' : apiKeyToken.startsWith('nf_test_') ? 'nf_test_' : 'Unknown'}\n`);

  try {
    // Check format
    if (!apiKeyToken.startsWith('nf_live_') && !apiKeyToken.startsWith('nf_test_')) {
      console.error('❌ Invalid key format. Keys must start with nf_live_ or nf_test_');
      process.exit(1);
    }

    // Hash the key
    const keyHash = hashApiKey(apiKeyToken);
    console.log(`Hash: ${keyHash.substring(0, 20)}...\n`);

    // Try to find the key
    console.log('📊 Looking up key in database...');
    const apiKey = await findApiKeyByToken(apiKeyToken);

    if (!apiKey) {
      console.error('❌ API key NOT FOUND in database\n');
      
      // List all keys to help debug
      console.log('📋 Listing all API keys in database:');
      const allKeys = await listApiKeys();
      if (allKeys.length === 0) {
        console.log('   No API keys found in database.');
        console.log('\n💡 Run: npm run auth:create-admin');
      } else {
        console.log(`   Found ${allKeys.length} key(s):`);
        allKeys.forEach((key, i) => {
          console.log(`   ${i + 1}. ID: ${key.id}, Name: ${key.name}, Role: ${key.role}, Created: ${key.createdAt}`);
        });
        console.log('\n💡 The key you provided doesn\'t match any of these.');
      }
      
      process.exit(1);
    }

    // Key found!
    console.log('✅ API key FOUND in database!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Key Details:');
    console.log(`  ID: ${apiKey.id}`);
    console.log(`  Name: ${apiKey.name}`);
    console.log(`  Role: ${apiKey.role}`);
    console.log(`  User ID: ${apiKey.userId || 'N/A'}`);
    console.log(`  Rate Limit: ${apiKey.rateLimit}/hour`);
    console.log(`  Created: ${apiKey.createdAt}`);
    console.log(`  Last Used: ${apiKey.lastUsedAt || 'Never'}`);
    console.log(`  Expires: ${apiKey.expiresAt || 'Never'}`);
    console.log(`  Revoked: ${apiKey.revokedAt ? `Yes (${apiKey.revokedAt})` : 'No'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Check if key is valid
    if (apiKey.revokedAt) {
      console.error('⚠️  WARNING: This key has been REVOKED');
      process.exit(1);
    }

    if (apiKey.expiresAt && new Date(apiKey.expiresAt) < new Date()) {
      console.error('⚠️  WARNING: This key has EXPIRED');
      process.exit(1);
    }

    console.log('✅ Key is valid and active!');
    
    // Test database connection
    const db = getDb();
    console.log(`\n📦 Database type: ${db.constructor.name}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error verifying API key:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

// Get API key from command line or env
const apiKey = process.argv[2] || process.env.NEXFLOW_API_KEY || process.env.NEXFLOW_ENDPOINTS_API_KEY;

if (!apiKey) {
  console.error('❌ Missing API key');
  console.log('\nUsage:');
  console.log('  npx tsx scripts/verify-api-key.ts <api_key>');
  console.log('  # or set NEXFLOW_API_KEY env var');
  process.exit(1);
}

verifyApiKey(apiKey);
