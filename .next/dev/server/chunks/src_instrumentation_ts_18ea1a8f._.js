module.exports = [
"[project]/src/instrumentation.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// NEXT.JS INSTRUMENTATION
// =============================================================================
// This file runs once when the Next.js server starts
// Used to:
// 1. Validate environment configuration (fail fast in production)
// 2. Initialize background jobs like facilitator probes
__turbopack_context__.s([
    "register",
    ()=>register
]);
async function register() {
    if ("TURBOPACK compile-time truthy", 1) {
        // Only run in Node.js runtime (not Edge)
        // 1. Run production environment validation
        try {
            const { runStartupValidation } = await __turbopack_context__.A("[project]/src/lib/startup/validate-env.ts [instrumentation] (ecmascript, async loader)");
            runStartupValidation();
        } catch (error) {
            console.error('[FATAL] Startup validation failed:', error);
            // In production, this prevents the app from starting with bad config
            if (("TURBOPACK compile-time value", "development") === 'production') {
                throw error;
            }
        }
        // 2. Determine if we should start probes
        const env = ("TURBOPACK compile-time value", "development") || 'development';
        // Support both env var names for backwards compatibility
        const enableProbes = process.env.FACILITATOR_PROBES_ENABLED === 'true' || process.env.ENABLE_FACILITATOR_PROBES === 'true';
        const isProduction = env === 'production';
        const isTest = env === 'test';
        // Probes only run in production when explicitly enabled
        // Never run in local dev (next dev) or test environments
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('[SMF] Probes disabled: not in production environment');
            console.log(`[SMF] Current NODE_ENV: ${env}`);
            console.log('[SMF] Probes will run in production when FACILITATOR_PROBES_ENABLED=true is set');
            return;
        }
        //TURBOPACK unreachable
        ;
    }
}
}),
];

//# sourceMappingURL=src_instrumentation_ts_18ea1a8f._.js.map