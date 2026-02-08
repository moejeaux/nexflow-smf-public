/**
 * esbuild config for Lambda@Edge bundling.
 *
 * Lambda@Edge does NOT support runtime environment variables.
 * Config values are injected at build time via esbuild `define`.
 *
 * Usage:
 *   NEXFLOW_FACILITATOR_URL=https://api.nexflowapp.app/api/v1/facilitator/x402 \
 *   NEXFLOW_API_KEY=nf_live_your_key \
 *   npm run build
 */
import { build } from 'esbuild'
import { statSync } from 'node:fs'

const NEXFLOW_FACILITATOR_URL = process.env.NEXFLOW_FACILITATOR_URL
const NEXFLOW_API_KEY = process.env.NEXFLOW_API_KEY

if (!NEXFLOW_FACILITATOR_URL || !NEXFLOW_API_KEY) {
  console.error(
    [
      '',
      'ERROR: Build-time environment variables are required.',
      '',
      '  NEXFLOW_FACILITATOR_URL  — NexFlow facilitator base URL',
      '  NEXFLOW_API_KEY          — Your NexFlow API key (nf_live_xxx)',
      '',
      'Lambda@Edge does not support runtime env vars, so these are',
      'baked into the bundle at compile time.',
      '',
      'Example:',
      '  NEXFLOW_FACILITATOR_URL=https://api.nexflowapp.app/api/v1/facilitator/x402 \\',
      '  NEXFLOW_API_KEY=nf_live_your_key \\',
      '  npm run build',
      '',
    ].join('\n'),
  )
  process.exit(1)
}

await build({
  entryPoints: ['handler.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'cjs',
  outfile: 'dist/handler.js',
  sourcemap: true,
  minify: true,
  define: {
    'process.env.NEXFLOW_FACILITATOR_URL': JSON.stringify(NEXFLOW_FACILITATOR_URL),
    'process.env.NEXFLOW_API_KEY': JSON.stringify(NEXFLOW_API_KEY),
  },
  banner: {
    js:
      '/* nexflow-x402-lambda@edge — built ' +
      new Date().toISOString() +
      ' */',
  },
})

const size = statSync('dist/handler.js').size
console.log('✓ Bundle written to dist/handler.js')
console.log(`  Facilitator URL = ${NEXFLOW_FACILITATOR_URL}`)
console.log(`  Verify endpoint = ${NEXFLOW_FACILITATOR_URL}/verify`)
console.log(`  Settle endpoint = ${NEXFLOW_FACILITATOR_URL}/settle`)
console.log(`  Bundle size: ${size} bytes`)
