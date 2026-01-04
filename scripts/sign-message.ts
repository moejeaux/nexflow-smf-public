/**
 * Sign a message with the deployer wallet
 * 
 * Usage:
 *   export DEPLOYER_PRIVATE_KEY=0x...
 *   npx tsx scripts/sign-message.ts "Your message to sign"
 * 
 * Or interactively:
 *   npx tsx scripts/sign-message.ts
 */

import { createWalletClient, http, createPublicClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import * as readline from 'readline';

// AtomicBatchSettlement contract address on Base mainnet
const SETTLEMENT_CONTRACT = '0x43A04228152115fDd5663B2Aa559Ebd84D17A49D';

async function main() {
  // Get private key from environment
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
  
  if (!privateKey) {
    console.error('❌ DEPLOYER_PRIVATE_KEY environment variable is required');
    console.error('   Set it with: export DEPLOYER_PRIVATE_KEY=0x...');
    process.exit(1);
  }

  // Validate private key format
  if (!privateKey.startsWith('0x') || privateKey.length !== 66) {
    console.error('❌ Invalid private key format');
    console.error('   Must be 0x followed by 64 hex characters');
    process.exit(1);
  }

  // Create account from private key
  const account = privateKeyToAccount(privateKey as `0x${string}`);
  
  console.log('🔵 NexFlow Message Signer\n');
  console.log(`   Signer Address: ${account.address}`);
  console.log(`   Settlement Contract: ${SETTLEMENT_CONTRACT}`);
  console.log();

  // Get message from args or prompt
  let message = process.argv[2];
  
  if (!message) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    message = await new Promise<string>((resolve) => {
      rl.question('Enter message to sign: ', (answer) => {
        rl.close();
        resolve(answer);
      });
    });
  }

  if (!message || message.trim() === '') {
    console.error('❌ No message provided');
    process.exit(1);
  }

  console.log(`\n📝 Message to sign:\n   "${message}"\n`);

  // Create wallet client
  const walletClient = createWalletClient({
    account,
    chain: base,
    transport: http(),
  });

  // Sign the message
  console.log('✍️  Signing message...');
  const signature = await walletClient.signMessage({
    message,
  });

  console.log('\n✅ Message signed successfully!\n');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('SIGNATURE DETAILS');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`Signer:    ${account.address}`);
  console.log(`Message:   ${message}`);
  console.log(`Signature: ${signature}`);
  console.log('═══════════════════════════════════════════════════════════════\n');

  // Output in JSON format for easy copy-paste
  const result = {
    signer: account.address,
    message,
    signature,
    contract: SETTLEMENT_CONTRACT,
    chain: 'Base Mainnet (8453)',
  };

  console.log('📋 JSON format (for verification):');
  console.log(JSON.stringify(result, null, 2));
  console.log();

  // Verification instructions
  console.log('🔍 To verify this signature:');
  console.log('   - Use etherscan signature verification');
  console.log('   - Or: viem.verifyMessage({ address, message, signature })');
  console.log();
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

