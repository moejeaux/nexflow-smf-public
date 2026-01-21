module.exports = [
"[project]/src/integrations/x402/facilitators/facilitator-probe-config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// FACILITATOR PROBE CONFIGURATION
// =============================================================================
// Configuration for tiered facilitator health probes:
// - Light probes (5 min): quick availability + basic latency
// - Deep probes (15 min): richer metrics for SLOs and routing/bandit quality
/**
 * Probe tier type
 * - light: Fast health check (ping/quote endpoint)
 * - deep: Performance check (approximates real routing flow)
 */ __turbopack_context__.s([
    "FACILITATOR_PROBE_CONFIGS",
    ()=>FACILITATOR_PROBE_CONFIGS,
    "getEnabledProbeConfigs",
    ()=>getEnabledProbeConfigs,
    "getEnabledProbeConfigsByTier",
    ()=>getEnabledProbeConfigsByTier,
    "getProbeConfigById",
    ()=>getProbeConfigById,
    "getProbeConfigsForFacilitator",
    ()=>getProbeConfigsForFacilitator,
    "getProbeIntervalForTier",
    ()=>getProbeIntervalForTier,
    "getProbeScheduleSummary",
    ()=>getProbeScheduleSummary
]);
// =============================================================================
// TIERED PROBE SCHEDULE
// =============================================================================
// Light probes: 5 minutes (300s) - availability + basic latency
// Deep probes: 15 minutes (900s) - richer metrics for SLOs
const LIGHT_INTERVAL_SECONDS = parseInt(process.env.PROBE_LIGHT_INTERVAL_SECONDS || '300', 10); // 5 min
const DEEP_INTERVAL_SECONDS = parseInt(process.env.PROBE_DEEP_INTERVAL_SECONDS || '900', 10); // 15 min
// =============================================================================
// MASTER SWITCH AND HARD DISABLE
// =============================================================================
// HARD_DISABLE_PROBES = true means probes are OFF regardless of env vars
// To re-enable: set HARD_DISABLE_PROBES = false AND set FACILITATOR_PROBES_ENABLED=true in env
const HARD_DISABLE_PROBES = false; // Re-enabled for tiered probe system
// Master switch for all probes
const PROBES_MASTER_ENABLED = !HARD_DISABLE_PROBES && process.env.FACILITATOR_PROBES_ENABLED === 'true';
// Per-tier enable flags (defaults to master switch)
const LIGHT_PROBES_ENABLED = PROBES_MASTER_ENABLED && process.env.LIGHT_PROBES_ENABLED !== 'false';
const DEEP_PROBES_ENABLED = PROBES_MASTER_ENABLED && process.env.DEEP_PROBES_ENABLED !== 'false';
const FACILITATOR_PROBE_CONFIGS = [
    // ==========================================================================
    // CDP Facilitator (Coinbase Developer Platform)
    // Primary x402 facilitator for Base network
    // ==========================================================================
    {
        id: 'cdp-base-usdc-light',
        facilitatorId: 'cdp',
        network: 'eip155:8453',
        token: 'USDC',
        tier: 'light',
        desiredIntervalSeconds: LIGHT_INTERVAL_SECONDS,
        enabled: LIGHT_PROBES_ENABLED
    },
    {
        id: 'cdp-base-usdc-deep',
        facilitatorId: 'cdp',
        network: 'eip155:8453',
        token: 'USDC',
        tier: 'deep',
        desiredIntervalSeconds: DEEP_INTERVAL_SECONDS,
        enabled: DEEP_PROBES_ENABLED
    },
    // ==========================================================================
    // PayAI Facilitator
    // Multi-chain x402 facilitator
    // ==========================================================================
    {
        id: 'payai-base-usdc-light',
        facilitatorId: 'payai',
        network: 'eip155:8453',
        token: 'USDC',
        tier: 'light',
        desiredIntervalSeconds: LIGHT_INTERVAL_SECONDS,
        enabled: LIGHT_PROBES_ENABLED
    },
    {
        id: 'payai-base-usdc-deep',
        facilitatorId: 'payai',
        network: 'eip155:8453',
        token: 'USDC',
        tier: 'deep',
        desiredIntervalSeconds: DEEP_INTERVAL_SECONDS,
        enabled: DEEP_PROBES_ENABLED
    },
    // ==========================================================================
    // X402rs Facilitator
    // Rust-based community facilitator
    // ==========================================================================
    {
        id: 'x402rs-base-usdc-light',
        facilitatorId: 'x402rs',
        network: 'eip155:8453',
        token: 'USDC',
        tier: 'light',
        desiredIntervalSeconds: LIGHT_INTERVAL_SECONDS,
        enabled: LIGHT_PROBES_ENABLED && process.env.X402RS_ENABLED !== 'false'
    },
    {
        id: 'x402rs-base-usdc-deep',
        facilitatorId: 'x402rs',
        network: 'eip155:8453',
        token: 'USDC',
        tier: 'deep',
        desiredIntervalSeconds: DEEP_INTERVAL_SECONDS,
        enabled: DEEP_PROBES_ENABLED && process.env.X402RS_ENABLED !== 'false'
    },
    {
        id: 'x402rs-xdc-usdc-light',
        facilitatorId: 'x402rs',
        network: 'xdc:50',
        token: 'USDC',
        tier: 'light',
        desiredIntervalSeconds: LIGHT_INTERVAL_SECONDS,
        enabled: LIGHT_PROBES_ENABLED && process.env.X402RS_XDC_PROBE_ENABLED === 'true'
    },
    {
        id: 'x402rs-xdc-usdc-deep',
        facilitatorId: 'x402rs',
        network: 'xdc:50',
        token: 'USDC',
        tier: 'deep',
        desiredIntervalSeconds: DEEP_INTERVAL_SECONDS,
        enabled: DEEP_PROBES_ENABLED && process.env.X402RS_XDC_PROBE_ENABLED === 'true'
    },
    // ==========================================================================
    // Dexter Facilitator
    // Solana-native x402 facilitator
    // ==========================================================================
    {
        id: 'dexter-solana-usdc-light',
        facilitatorId: 'dexter',
        network: 'solana:101',
        token: 'USDC',
        tier: 'light',
        desiredIntervalSeconds: LIGHT_INTERVAL_SECONDS,
        enabled: LIGHT_PROBES_ENABLED && process.env.DEXTER_ENABLED !== 'false'
    },
    {
        id: 'dexter-solana-usdc-deep',
        facilitatorId: 'dexter',
        network: 'solana:101',
        token: 'USDC',
        tier: 'deep',
        desiredIntervalSeconds: DEEP_INTERVAL_SECONDS,
        enabled: DEEP_PROBES_ENABLED && process.env.DEXTER_ENABLED !== 'false'
    },
    {
        id: 'dexter-solana-devnet-usdc-light',
        facilitatorId: 'dexter',
        network: 'solana:102',
        token: 'USDC',
        tier: 'light',
        desiredIntervalSeconds: LIGHT_INTERVAL_SECONDS,
        enabled: LIGHT_PROBES_ENABLED && process.env.DEXTER_DEVNET_PROBE_ENABLED === 'true'
    },
    {
        id: 'dexter-solana-devnet-usdc-deep',
        facilitatorId: 'dexter',
        network: 'solana:102',
        token: 'USDC',
        tier: 'deep',
        desiredIntervalSeconds: DEEP_INTERVAL_SECONDS,
        enabled: DEEP_PROBES_ENABLED && process.env.DEXTER_DEVNET_PROBE_ENABLED === 'true'
    },
    // ==========================================================================
    // Cronos x402 Facilitator
    // Official Cronos Labs facilitator
    // Rate limits: 5 requests per minute per IP for settle/verify
    // ==========================================================================
    {
        id: 'cronos-mainnet-usdc-light',
        facilitatorId: 'cronos',
        network: 'eip155:25',
        token: 'USDC',
        tier: 'light',
        desiredIntervalSeconds: LIGHT_INTERVAL_SECONDS,
        enabled: LIGHT_PROBES_ENABLED && process.env.CRONOS_ENABLED !== 'false'
    },
    {
        id: 'cronos-mainnet-usdc-deep',
        facilitatorId: 'cronos',
        network: 'eip155:25',
        token: 'USDC',
        tier: 'deep',
        desiredIntervalSeconds: DEEP_INTERVAL_SECONDS,
        enabled: DEEP_PROBES_ENABLED && process.env.CRONOS_ENABLED !== 'false'
    },
    {
        id: 'cronos-testnet-usdc-light',
        facilitatorId: 'cronos',
        network: 'eip155:338',
        token: 'USDC',
        tier: 'light',
        desiredIntervalSeconds: LIGHT_INTERVAL_SECONDS,
        enabled: LIGHT_PROBES_ENABLED && process.env.CRONOS_TESTNET_PROBE_ENABLED === 'true'
    },
    {
        id: 'cronos-testnet-usdc-deep',
        facilitatorId: 'cronos',
        network: 'eip155:338',
        token: 'USDC',
        tier: 'deep',
        desiredIntervalSeconds: DEEP_INTERVAL_SECONDS,
        enabled: DEEP_PROBES_ENABLED && process.env.CRONOS_TESTNET_PROBE_ENABLED === 'true'
    }
];
function getEnabledProbeConfigs() {
    return FACILITATOR_PROBE_CONFIGS.filter((c)=>c.enabled);
}
function getEnabledProbeConfigsByTier(tier) {
    return FACILITATOR_PROBE_CONFIGS.filter((c)=>c.enabled && c.tier === tier);
}
function getProbeConfigById(id) {
    return FACILITATOR_PROBE_CONFIGS.find((c)=>c.id === id);
}
function getProbeConfigsForFacilitator(facilitatorId) {
    return FACILITATOR_PROBE_CONFIGS.filter((c)=>c.facilitatorId === facilitatorId);
}
function getProbeIntervalForTier(tier) {
    return tier === 'light' ? LIGHT_INTERVAL_SECONDS : DEEP_INTERVAL_SECONDS;
}
function getProbeScheduleSummary() {
    const enabledLight = getEnabledProbeConfigsByTier('light').length;
    const enabledDeep = getEnabledProbeConfigsByTier('deep').length;
    return {
        lightInterval: LIGHT_INTERVAL_SECONDS,
        deepInterval: DEEP_INTERVAL_SECONDS,
        enabledLight,
        enabledDeep,
        totalEnabled: enabledLight + enabledDeep
    };
}
}),
];

//# sourceMappingURL=src_integrations_x402_facilitators_facilitator-probe-config_ts_9cf0a715._.js.map