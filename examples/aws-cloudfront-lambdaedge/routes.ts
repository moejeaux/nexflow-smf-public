// ---------------------------------------------------------------------------
// Lambda@Edge x402 Adapter — Route → Gating Config
// ---------------------------------------------------------------------------
//
// Defines which URL paths require x402 payment verification.
// Only paths that match a route here will trigger the verify/settle flow.
// All other paths pass through CloudFront untouched.
// ---------------------------------------------------------------------------

import type { RouteConfig } from './types.js'

/**
 * Map of URL path prefixes to their gating config.
 *
 * Matching rules:
 * - Patterns ending with `/*` match any path starting with the prefix.
 * - Exact patterns match only the literal path.
 *
 * Examples:
 *   '/api/*'      → matches /api/foo, /api/bar/baz, etc.
 *   '/premium/*'  → matches /premium/report, /premium/data/123
 *   '/single'     → matches only /single exactly
 */
export const routes: Record<string, RouteConfig> = {
  '/api/*': {
    network: 'eip155:8453',    // Base mainnet
    resourceId: 'joke-endpoint',
  },
  '/premium/*': {
    network: 'eip155:8453',
    resourceId: 'premium-data',
  },
}

/**
 * Find the matching route config for a given request path.
 * Returns `undefined` if no route matches (path is not gated).
 */
export function matchRoute(path: string): RouteConfig | undefined {
  for (const [pattern, config] of Object.entries(routes)) {
    if (pattern.endsWith('/*')) {
      const prefix = pattern.slice(0, -1) // "/api/*" → "/api/"
      if (path.startsWith(prefix) || path === prefix.slice(0, -1)) {
        return config
      }
    } else if (path === pattern) {
      return config
    }
  }
  return undefined
}
