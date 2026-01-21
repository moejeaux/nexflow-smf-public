// =============================================================================
// Feature Flags
// =============================================================================
// Centralized feature flag management for the NexFlow API
// This allows features to be enabled/disabled without code changes

/**
 * Feature flag configuration
 * All flags default to false unless explicitly enabled via environment variables
 */
export const FEATURE_FLAGS = {
  /**
   * Enable the dashboard UI
   * Set ENABLE_DASHBOARD=true to enable
   * When disabled, dashboard routes return 404 or redirect to API status page
   */
  ENABLE_DASHBOARD: process.env.ENABLE_DASHBOARD === 'true',

  /**
   * Enable browser-based signup/login
   * Set ENABLE_BROWSER_AUTH=true to enable
   * When disabled, authentication is API-only (via API keys)
   */
  ENABLE_BROWSER_AUTH: process.env.ENABLE_BROWSER_AUTH === 'true',

  /**
   * Enable localStorage-based API key storage
   * Set ENABLE_LOCALSTORAGE_AUTH=true to enable
   * When disabled, API keys must be passed via headers
   */
  ENABLE_LOCALSTORAGE_AUTH: process.env.ENABLE_LOCALSTORAGE_AUTH === 'true',

  /**
   * Enable the start/signup page
   * Set ENABLE_SIGNUP_PAGE=true to enable
   * When disabled, signup page redirects to API documentation
   */
  ENABLE_SIGNUP_PAGE: process.env.ENABLE_SIGNUP_PAGE === 'true',

  /**
   * Enable session-based authentication
   * Set ENABLE_SESSION_AUTH=true to enable
   * When disabled, all auth is API key based
   */
  ENABLE_SESSION_AUTH: process.env.ENABLE_SESSION_AUTH === 'true',

  /**
   * Enable mock settlements in production
   * Set ALLOW_MOCK_SETTLEMENT=true to enable
   * WARNING: Only use for testing purposes
   */
  ALLOW_MOCK_SETTLEMENT: process.env.ALLOW_MOCK_SETTLEMENT === 'true',

  /**
   * Enable real on-chain settlement
   * Set SETTLEMENT_EXECUTOR_ENABLED=true to enable
   * Requires proper contract configuration
   */
  SETTLEMENT_EXECUTOR_ENABLED: process.env.SETTLEMENT_EXECUTOR_ENABLED === 'true',
} as const;

/**
 * Check if a feature is enabled
 * @param flag - The feature flag name
 * @returns true if the feature is enabled
 */
export function isFeatureEnabled(flag: keyof typeof FEATURE_FLAGS): boolean {
  return FEATURE_FLAGS[flag];
}

/**
 * Get all feature flags (for debugging/status)
 * @returns Object with all feature flag values
 */
export function getFeatureFlags(): Record<string, boolean> {
  return { ...FEATURE_FLAGS };
}

/**
 * Check if the application is in API-only mode
 * This is true when dashboard/browser auth features are disabled
 */
export function isApiOnlyMode(): boolean {
  return !FEATURE_FLAGS.ENABLE_DASHBOARD && 
         !FEATURE_FLAGS.ENABLE_BROWSER_AUTH && 
         !FEATURE_FLAGS.ENABLE_LOCALSTORAGE_AUTH;
}

export default FEATURE_FLAGS;
