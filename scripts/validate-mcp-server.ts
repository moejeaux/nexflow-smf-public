#!/usr/bin/env npx tsx
/**
 * Validate server.json against the MCP registry schema
 * 
 * Usage:
 *   npm run mcp:validate
 */

import { readFileSync } from 'fs';
import { join } from 'path';

const SCHEMA_URL = 'https://modelcontextprotocol.io/schema/server.json';

async function validateServerJson() {
  try {
    // Read server.json
    const serverJsonPath = join(process.cwd(), 'server.json');
    const serverJson = JSON.parse(readFileSync(serverJsonPath, 'utf-8'));

    console.log('📋 Validating server.json...\n');

    // Basic validation checks
    const requiredFields = [
      '$schema',
      'mcpVersion',
      'name',
      'version',
      'description',
      'transport',
    ];

    const missingFields = requiredFields.filter((field) => !(field in serverJson));
    if (missingFields.length > 0) {
      console.error('❌ Missing required fields:', missingFields.join(', '));
      process.exit(1);
    }

    // Validate transport
    if (!serverJson.transport) {
      console.error('❌ Missing transport configuration');
      process.exit(1);
    }

    if (serverJson.transport.type === 'stdio') {
      if (!serverJson.transport.command) {
        console.error('❌ stdio transport requires "command" field');
        process.exit(1);
      }
      if (!serverJson.transport.args || !Array.isArray(serverJson.transport.args)) {
        console.error('❌ stdio transport requires "args" array');
        process.exit(1);
      }
    } else if (serverJson.transport.type === 'http') {
      if (!serverJson.transport.url) {
        console.error('❌ HTTP transport requires "url" field');
        process.exit(1);
      }
    } else {
      console.error(`❌ Unknown transport type: ${serverJson.transport.type}`);
      process.exit(1);
    }

    // Validate tools array
    if (!serverJson.tools || !Array.isArray(serverJson.tools)) {
      console.error('❌ Missing or invalid "tools" array');
      process.exit(1);
    }

    if (serverJson.tools.length === 0) {
      console.error('❌ Tools array cannot be empty');
      process.exit(1);
    }

    // Validate each tool
    for (const tool of serverJson.tools) {
      if (!tool.name) {
        console.error('❌ Tool missing "name" field');
        process.exit(1);
      }
      if (!tool.description) {
        console.error(`❌ Tool "${tool.name}" missing "description" field`);
        process.exit(1);
      }
    }

    // Try to fetch and validate against remote schema (optional, non-blocking)
    try {
      const response = await fetch(SCHEMA_URL);
      if (response.ok) {
        const schema = await response.json();
        console.log('✅ Schema URL is accessible');
        console.log('⚠️  Note: Full JSON Schema validation requires ajv-cli or check-jsonschema');
        console.log('   Run: npx ajv-cli validate -s ' + SCHEMA_URL + ' -d server.json\n');
      }
    } catch (error) {
      console.log('⚠️  Could not fetch remote schema (non-blocking)');
      console.log('   Run: npx ajv-cli validate -s ' + SCHEMA_URL + ' -d server.json\n');
    }

    console.log('✅ Basic validation passed!');
    console.log(`   Name: ${serverJson.name}`);
    console.log(`   Version: ${serverJson.version}`);
    console.log(`   Transport: ${serverJson.transport.type}`);
    console.log(`   Tools: ${serverJson.tools.length}`);
    console.log('\n💡 For full schema validation, run:');
    console.log('   npx ajv-cli validate -s ' + SCHEMA_URL + ' -d server.json');
    console.log('   or');
    console.log('   npx check-jsonschema --schemafile ' + SCHEMA_URL + ' server.json\n');
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('❌ Invalid JSON:', error.message);
    } else if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.error('❌ server.json not found in project root');
    } else {
      console.error('❌ Validation error:', error);
    }
    process.exit(1);
  }
}

validateServerJson();
