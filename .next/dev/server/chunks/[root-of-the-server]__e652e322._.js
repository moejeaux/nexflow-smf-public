module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/module [external] (module, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("module", () => require("module"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/worker_threads [external] (worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("worker_threads", () => require("worker_threads"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/node:os [external] (node:os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:os", () => require("node:os"));

module.exports = mod;
}),
"[externals]/node:events [external] (node:events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:events", () => require("node:events"));

module.exports = mod;
}),
"[externals]/node:diagnostics_channel [external] (node:diagnostics_channel, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:diagnostics_channel", () => require("node:diagnostics_channel"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/src/lib/sentry.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/lib/sentry.ts
// Temporary no-op Sentry shim to avoid module errors during dev
__turbopack_context__.s([
    "captureException",
    ()=>captureException,
    "captureMessage",
    ()=>captureMessage,
    "initSentry",
    ()=>initSentry,
    "sentry",
    ()=>sentry,
    "setSentryContext",
    ()=>setSentryContext,
    "setSentryUser",
    ()=>setSentryUser
]);
const Sentry = null;
const sentry = {
    captureException: (..._args)=>{},
    captureMessage: (..._args)=>{},
    withScope: (fn)=>fn({})
};
function initSentry() {}
function setSentryUser(_userId, _apiKeyId) {}
function setSentryContext(_context) {}
function captureException(_error, _context) {}
function captureMessage(_message, _level = 'info', _context) {}
}),
"[project]/src/lib/logger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// Structured Logging
// =============================================================================
// Uses Pino for fast, structured logging
// Supports request ID tracking and different log levels
// All logs include standard fields: timestamp, level, message, requestId, etc.
__turbopack_context__.s([
    "createLogger",
    ()=>createLogger,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getLogger",
    ()=>getLogger,
    "log",
    ()=>log
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pino$2f$pino$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pino/pino.js [app-route] (ecmascript)");
;
// Determine log level from environment
const logLevel = process.env.LOG_LEVEL || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'debug');
// Create logger instance with structured output
// In Next.js dev mode, disable pino-pretty transport to avoid worker thread issues
// Use simple JSON output instead (can be prettified by other tools)
const isNextDev = ("TURBOPACK compile-time value", "development") === 'development' && ("TURBOPACK compile-time value", "nodejs");
const usePrettyTransport = ("TURBOPACK compile-time value", "development") !== 'production' && !isNextDev;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pino$2f$pino$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
    level: logLevel,
    transport: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : undefined,
    formatters: {
        level: (label)=>{
            return {
                level: label.toUpperCase()
            };
        }
    },
    base: {
        env: ("TURBOPACK compile-time value", "development") || 'development',
        service: 'nexflow-api'
    },
    // Ensure timestamps are included
    timestamp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pino$2f$pino$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].stdTimeFunctions.isoTime
});
function createLogger(context) {
    return context ? logger.child(context) : logger;
}
function getLogger() {
    return logger;
}
/**
 * Sanitize sensitive data from log context
 * Removes API keys, tokens, payment headers, and PII
 */ function sanitizeContext(context) {
    const sanitized = {
        ...context
    };
    // Remove sensitive fields
    const sensitiveKeys = [
        'apiKey',
        'token',
        'authorization',
        'x-payment',
        'paymentHeader',
        'cardNumber',
        'cvv',
        'ssn',
        'password',
        'secret'
    ];
    sensitiveKeys.forEach((key)=>{
        if (key in sanitized) {
            delete sanitized[key];
        }
    });
    // Truncate long strings that might contain sensitive data
    Object.keys(sanitized).forEach((key)=>{
        const value = sanitized[key];
        if (typeof value === 'string' && value.length > 200) {
            sanitized[key] = value.substring(0, 200) + '... [truncated]';
        }
    });
    return sanitized;
}
const log = {
    trace: (msg, context, ...args)=>{
        logger.trace(sanitizeContext(context || {}), msg, ...args);
    },
    debug: (msg, context, ...args)=>{
        logger.debug(sanitizeContext(context || {}), msg, ...args);
    },
    info: (msg, context, ...args)=>{
        logger.info(sanitizeContext(context || {}), msg, ...args);
    },
    warn: (msg, context, ...args)=>{
        logger.warn(sanitizeContext(context || {}), msg, ...args);
    },
    error: (msg, context, ...args)=>{
        let logContext = {};
        let errorObj;
        if (context instanceof Error) {
            errorObj = context;
            logContext = {
                error: context,
                errorCode: context.code || 'UNKNOWN_ERROR',
                stack: context.stack
            };
        } else if (context && typeof context === 'object') {
            logContext = context;
            if (logContext.error instanceof Error) {
                errorObj = logContext.error;
                logContext.stack = logContext.error.stack;
            }
        }
        const sanitizedContext = sanitizeContext(logContext);
        logger.error(sanitizedContext, msg, ...args);
        // Automatically capture to Sentry if error object exists
        if (errorObj) {
            try {
                const { captureException } = __turbopack_context__.r("[project]/src/lib/sentry.ts [app-route] (ecmascript)");
                captureException(errorObj, {
                    requestId: logContext.requestId,
                    apiKeyId: logContext.apiKeyId,
                    endpoint: logContext.endpoint,
                    endpointId: logContext.endpointId,
                    method: logContext.method,
                    statusCode: logContext.statusCode,
                    ip: logContext.ip,
                    userAgent: logContext.userAgent,
                    tags: {
                        errorCode: logContext.errorCode || 'UNKNOWN_ERROR',
                        component: logContext.component || 'unknown'
                    },
                    extra: {
                        ...sanitizedContext
                    }
                });
            } catch (sentryError) {
            // Silently fail if Sentry not available
            }
        }
    },
    fatal: (msg, context, ...args)=>{
        let logContext = {};
        let errorObj;
        if (context instanceof Error) {
            errorObj = context;
            logContext = {
                error: context,
                errorCode: context.code || 'UNKNOWN_ERROR',
                stack: context.stack
            };
        } else if (context && typeof context === 'object') {
            logContext = context;
            if (logContext.error instanceof Error) {
                errorObj = logContext.error;
                logContext.stack = logContext.error.stack;
            }
        }
        const sanitizedContext = sanitizeContext(logContext);
        logger.fatal(sanitizedContext, msg, ...args);
        // Automatically capture to Sentry for fatal errors
        if (errorObj) {
            try {
                const { captureException } = __turbopack_context__.r("[project]/src/lib/sentry.ts [app-route] (ecmascript)");
                captureException(errorObj, {
                    requestId: logContext.requestId,
                    apiKeyId: logContext.apiKeyId,
                    endpoint: logContext.endpoint,
                    endpointId: logContext.endpointId,
                    method: logContext.method,
                    statusCode: logContext.statusCode,
                    ip: logContext.ip,
                    userAgent: logContext.userAgent,
                    tags: {
                        errorCode: logContext.errorCode || 'FATAL_ERROR',
                        component: logContext.component || 'unknown',
                        severity: 'fatal'
                    },
                    extra: {
                        ...sanitizedContext
                    }
                });
            } catch (sentryError) {
            // Silently fail if Sentry not available
            }
        }
    }
};
const __TURBOPACK__default__export__ = logger;
}),
"[project]/src/integrations/x402/facilitators/facilitator-registry.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// FACILITATOR REGISTRY
// =============================================================================
// Central registry of facilitator configurations
// This is the source of truth for facilitator metadata
__turbopack_context__.s([
    "FACILITATORS",
    ()=>FACILITATORS,
    "getAllFacilitators",
    ()=>getAllFacilitators,
    "getFacilitator",
    ()=>getFacilitator,
    "getFacilitatorsForNetwork",
    ()=>getFacilitatorsForNetwork
]);
const FACILITATORS = {
    cdp: {
        id: 'cdp',
        name: 'CDP x402 Facilitator',
        baseUrl: process.env.CDP_FACILITATOR_URL || 'https://api.cdp.coinbase.com/platform/v2/x402',
        networks: [
            'eip155:8453',
            'solana:mainnet',
            'eip155:84532',
            'solana:devnet'
        ],
        tokens: [
            'USDC'
        ],
        feeBps: 0,
        priority: 100
    },
    payai: {
        id: 'payai',
        name: 'PayAI Facilitator',
        baseUrl: process.env.PAYAI_FACILITATOR_URL || 'https://facilitator.payai.network',
        networks: [
            'eip155:1',
            'eip155:8453',
            'eip155:56',
            'eip155:137',
            'solana:mainnet'
        ],
        tokens: [
            'USDC'
        ],
        feeBps: 10,
        priority: 200
    },
    /**
   * X402rs Facilitator
   * 
   * Rust-based x402 facilitator operated by the x402 community.
   * Supports Base (mainnet & testnet) and XDC networks.
   * 
   * Source: https://x402.org/networks
   */ x402rs: {
        id: 'x402rs',
        name: 'X402rs Facilitator',
        baseUrl: process.env.X402RS_FACILITATOR_URL || 'https://facilitator.x402.rs',
        networks: [
            'eip155:84532',
            'eip155:8453',
            'xdc:50'
        ],
        tokens: [
            'USDC'
        ],
        feeBps: 0,
        priority: 150
    },
    /**
   * Dexter Facilitator
   * 
   * Solana-native x402 facilitator operated by Dexter.
   * Public facilitator URL: https://facilitator.dexter.cash
   * Standard x402 endpoints: /verify and /settle
   * 
   * Supports Solana mainnet and devnet networks.
   */ dexter: {
        id: 'dexter',
        name: 'Dexter Facilitator',
        baseUrl: process.env.DEXTER_FACILITATOR_URL || 'https://facilitator.dexter.cash',
        networks: [
            'solana:101',
            'solana:mainnet',
            'solana:102',
            'solana:devnet'
        ],
        tokens: [
            'USDC'
        ],
        feeBps: 0,
        priority: 120
    }
};
function getFacilitator(id) {
    return FACILITATORS[id];
}
function getAllFacilitators() {
    return Object.values(FACILITATORS);
}
function getFacilitatorsForNetwork(network) {
    return Object.values(FACILITATORS).filter((f)=>f.networks.includes(network));
}
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[project]/src/services/facilitator-metrics-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// FACILITATOR METRICS SERVICE
// =============================================================================
// Service for persisting and managing facilitator path metrics from x402scan
// Uses JSON file storage for simplicity (can be migrated to DB later)
//
// =============================================================================
// RETENTION & COMPACTION PLAN (TODO)
// =============================================================================
// 1. Raw buckets (bucketMinutes < 60):
//    - Keep for 7 days
//    - After 7 days, compact into hourly rollups
//
// 2. Hourly rollups (bucketMinutes = 60):
//    - Keep for 30 days
//    - After 30 days, compact into daily rollups
//
// 3. Daily rollups (bucketMinutes = 1440):
//    - Keep for 90 days
//    - After 90 days, archive or delete
//
// Compaction strategy:
//    - Sum invocations, successCount, failureCount, status buckets
//    - Weighted average for latency percentiles (weight by invocations)
//    - Recalculate errorRate from compacted counts
//
// TODO: Implement compactMetrics() function for scheduled compaction job
// TODO: Add database migration for PostgreSQL storage with proper indexes
// =============================================================================
__turbopack_context__.s([
    "cleanupOldMetrics",
    ()=>cleanupOldMetrics,
    "compareFacilitators",
    ()=>compareFacilitators,
    "getLatestMetrics",
    ()=>getLatestMetrics,
    "getMetricsForFacilitator",
    ()=>getMetricsForFacilitator,
    "getSummariesForFacilitator",
    ()=>getSummariesForFacilitator,
    "getSummary",
    ()=>getSummary,
    "loadAllMetrics",
    ()=>loadAllMetrics,
    "loadAllSummaries",
    ()=>loadAllSummaries,
    "upsertFacilitatorPathMetrics",
    ()=>upsertFacilitatorPathMetrics,
    "upsertFacilitatorSummaries",
    ()=>upsertFacilitatorSummaries,
    "upsertFacilitatorSummary",
    ()=>upsertFacilitatorSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'FacilitatorMetricsService'
});
// =============================================================================
// CONFIGURATION
// =============================================================================
const DATA_DIR = process.env.FACILITATOR_METRICS_DATA_DIR ?? 'data';
const METRICS_FILE = 'facilitator-path-metrics.json';
const SUMMARIES_FILE = 'facilitator-summaries.json';
// =============================================================================
// FILE STORAGE HELPERS
// =============================================================================
/**
 * Ensure data directory exists
 */ async function ensureDataDir() {
    const dataPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["resolve"](process.cwd(), DATA_DIR);
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["mkdir"](dataPath, {
            recursive: true
        });
    } catch  {
    // Directory may already exist
    }
    return dataPath;
}
/**
 * Read JSON file with fallback to empty object/array
 */ async function readJsonFile(filePath, defaultValue) {
    try {
        const content = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["readFile"](filePath, 'utf-8');
        return JSON.parse(content);
    } catch  {
        return defaultValue;
    }
}
/**
 * Write JSON file atomically
 */ async function writeJsonFile(filePath, data) {
    const tempPath = `${filePath}.tmp`;
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["writeFile"](tempPath, JSON.stringify(data, null, 2), 'utf-8');
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["rename"](tempPath, filePath);
}
// =============================================================================
// METRICS PERSISTENCE
// =============================================================================
/**
 * Get the full path to the metrics file
 */ async function getMetricsFilePath() {
    const dataDir = await ensureDataDir();
    return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](dataDir, METRICS_FILE);
}
/**
 * Get the full path to the summaries file
 */ async function getSummariesFilePath() {
    const dataDir = await ensureDataDir();
    return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"](dataDir, SUMMARIES_FILE);
}
async function loadAllMetrics() {
    const filePath = await getMetricsFilePath();
    const store = await readJsonFile(filePath, {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        metrics: []
    });
    return store.metrics;
}
async function upsertFacilitatorPathMetrics(metrics) {
    if (metrics.length === 0) {
        logger.debug('No metrics to upsert');
        return;
    }
    const filePath = await getMetricsFilePath();
    const store = await readJsonFile(filePath, {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        metrics: []
    });
    // Build lookup key for deduplication
    const buildKey = (m)=>`${m.facilitatorId}:${m.timeframe}:${m.timeBucketStart}`;
    // Create map of existing metrics
    const existingMap = new Map();
    for (const m of store.metrics){
        existingMap.set(buildKey(m), m);
    }
    // Upsert new metrics
    let inserted = 0;
    let updated = 0;
    for (const m of metrics){
        const key = buildKey(m);
        if (existingMap.has(key)) {
            updated++;
        } else {
            inserted++;
        }
        existingMap.set(key, m);
    }
    // Convert map back to array and sort by time
    store.metrics = Array.from(existingMap.values()).sort((a, b)=>new Date(b.timeBucketStart).getTime() - new Date(a.timeBucketStart).getTime());
    // Keep only last 30 days of data to prevent unbounded growth
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30);
    store.metrics = store.metrics.filter((m)=>new Date(m.timeBucketStart) >= cutoffDate);
    store.lastUpdated = new Date().toISOString();
    await writeJsonFile(filePath, store);
    logger.info({
        inserted,
        updated,
        total: store.metrics.length,
        facilitatorId: metrics[0]?.facilitatorId,
        timeframe: metrics[0]?.timeframe,
        msg: 'Facilitator path metrics upserted'
    });
}
async function loadAllSummaries() {
    const filePath = await getSummariesFilePath();
    const store = await readJsonFile(filePath, {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        summaries: {}
    });
    return store.summaries;
}
async function upsertFacilitatorSummary(summary) {
    const filePath = await getSummariesFilePath();
    const store = await readJsonFile(filePath, {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        summaries: {}
    });
    const key = `${summary.facilitatorId}:${summary.timeframe}`;
    store.summaries[key] = summary;
    store.lastUpdated = new Date().toISOString();
    await writeJsonFile(filePath, store);
    logger.info({
        facilitatorId: summary.facilitatorId,
        timeframe: summary.timeframe,
        totalInvocations: summary.totalInvocations,
        errorRate: summary.overallErrorRate,
        msg: 'Facilitator summary upserted'
    });
}
async function upsertFacilitatorSummaries(summaries) {
    for (const summary of summaries){
        await upsertFacilitatorSummary(summary);
    }
}
async function getMetricsForFacilitator(facilitatorId, timeframe) {
    const allMetrics = await loadAllMetrics();
    return allMetrics.filter((m)=>{
        if (m.facilitatorId !== facilitatorId) return false;
        if (timeframe && m.timeframe !== timeframe) return false;
        return true;
    });
}
async function getSummary(facilitatorId, timeframe) {
    const summaries = await loadAllSummaries();
    const key = `${facilitatorId}:${timeframe}`;
    return summaries[key] ?? null;
}
async function getSummariesForFacilitator(facilitatorId) {
    const summaries = await loadAllSummaries();
    return Object.values(summaries).filter((s)=>s.facilitatorId === facilitatorId);
}
async function getLatestMetrics(limit = 100) {
    const allMetrics = await loadAllMetrics();
    return allMetrics.slice(0, limit);
}
async function compareFacilitators(facilitatorIds, timeframe) {
    const summaries = await loadAllSummaries();
    const result = new Map();
    for (const id of facilitatorIds){
        const key = `${id}:${timeframe}`;
        result.set(id, summaries[key] ?? null);
    }
    return result;
}
async function cleanupOldMetrics(daysToKeep = 30) {
    const filePath = await getMetricsFilePath();
    const store = await readJsonFile(filePath, {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        metrics: []
    });
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    const originalCount = store.metrics.length;
    store.metrics = store.metrics.filter((m)=>new Date(m.timeBucketStart) >= cutoffDate);
    const removed = originalCount - store.metrics.length;
    if (removed > 0) {
        store.lastUpdated = new Date().toISOString();
        await writeJsonFile(filePath, store);
        logger.info({
            removed,
            daysToKeep,
            msg: 'Old metrics cleaned up'
        });
    }
    return removed;
}
}),
"[project]/src/services/facilitator-metrics-reader.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// FACILITATOR METRICS READER
// =============================================================================
// Read-side helper for SMF to access facilitator path metrics
// Used by the SMF router to inform routing decisions
__turbopack_context__.s([
    "DEFAULT_TRUST_CONFIG",
    ()=>DEFAULT_TRUST_CONFIG,
    "getAllFacilitatorSummaries",
    ()=>getAllFacilitatorSummaries,
    "getBestFacilitatorPaths",
    ()=>getBestFacilitatorPaths,
    "getFacilitatorExplainer",
    ()=>getFacilitatorExplainer,
    "getFacilitatorScore",
    ()=>getFacilitatorScore,
    "getMultipleFacilitatorExplanations",
    ()=>getMultipleFacilitatorExplanations,
    "getRecommendedFacilitator",
    ()=>getRecommendedFacilitator,
    "rankFacilitators",
    ()=>rankFacilitators,
    "shouldAvoidFacilitator",
    ()=>shouldAvoidFacilitator,
    "shouldTrustMetrics",
    ()=>shouldTrustMetrics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/facilitator-metrics-service.ts [app-route] (ecmascript)");
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'FacilitatorMetricsReader'
});
const DEFAULT_TRUST_CONFIG = {
    maxDataAgeHours: parseFloat(process.env.METRICS_MAX_AGE_HOURS ?? '4'),
    minInvocationsHighConfidence: parseInt(process.env.METRICS_MIN_INVOCATIONS_HIGH ?? '1000', 10),
    minInvocationsMinimum: parseInt(process.env.METRICS_MIN_INVOCATIONS ?? '100', 10),
    lowConfidencePenalty: parseFloat(process.env.METRICS_LOW_CONFIDENCE_PENALTY ?? '0.5')
};
function shouldTrustMetrics(dataAgeHours, invocations, config = DEFAULT_TRUST_CONFIG) {
    // Data too old
    if (dataAgeHours > config.maxDataAgeHours) {
        return {
            trust: false,
            confidence: 'none',
            reason: `data-stale:${dataAgeHours.toFixed(1)}h-old`
        };
    }
    // Not enough data
    if (invocations < config.minInvocationsMinimum) {
        return {
            trust: false,
            confidence: 'none',
            reason: `insufficient-data:${invocations}-invocations`
        };
    }
    // High confidence
    if (invocations >= config.minInvocationsHighConfidence) {
        return {
            trust: true,
            confidence: 'high',
            reason: `high-confidence:${invocations}-invocations`
        };
    }
    // Medium confidence
    return {
        trust: true,
        confidence: 'medium',
        reason: `medium-confidence:${invocations}-invocations`
    };
}
// =============================================================================
// SCORING WEIGHTS
// =============================================================================
const SCORING_WEIGHTS = {
    successRate: 50,
    latency: 30,
    volume: 10,
    freshness: 10
};
async function getBestFacilitatorPaths(params) {
    const timeframe = params.timeframe ?? '1d';
    const limit = params.limit ?? 10;
    try {
        const metrics = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetricsForFacilitator"])(params.facilitatorId, timeframe);
        if (metrics.length === 0) {
            logger.debug({
                facilitatorId: params.facilitatorId,
                timeframe,
                msg: 'No metrics found for facilitator'
            });
            return [];
        }
        // Sort by success rate (descending), then by latency (ascending)
        const sorted = [
            ...metrics
        ].sort((a, b)=>{
            // Primary: higher success rate is better
            const successRateDiff = 1 - b.errorRate - (1 - a.errorRate);
            if (Math.abs(successRateDiff) > 0.01) {
                return successRateDiff > 0 ? 1 : -1;
            }
            // Secondary: lower latency is better
            const aLatency = a.p95LatencyMs ?? a.avgLatencyMs ?? Infinity;
            const bLatency = b.p95LatencyMs ?? b.avgLatencyMs ?? Infinity;
            return aLatency - bLatency;
        });
        return sorted.slice(0, limit);
    } catch (error) {
        logger.error({
            error: error instanceof Error ? error.message : 'Unknown error',
            facilitatorId: params.facilitatorId,
            msg: 'Failed to get best facilitator paths'
        });
        return [];
    }
}
async function getFacilitatorScore(params) {
    const timeframe = params.timeframe ?? '1d';
    const reasons = [];
    try {
        const summary = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSummary"])(params.facilitatorId, timeframe);
        if (!summary) {
            return {
                facilitatorId: params.facilitatorId,
                score: 50,
                successRate: 0,
                totalInvocations: 0,
                dataFreshness: Infinity,
                confidence: 'low',
                reasons: [
                    'No x402scan data available'
                ]
            };
        }
        // Calculate success rate score (0-50)
        const successRate = 1 - summary.overallErrorRate;
        const successRateScore = successRate * SCORING_WEIGHTS.successRate;
        reasons.push(`success-rate:${(successRate * 100).toFixed(1)}%`);
        // Calculate latency score (0-30)
        // Assume 500ms is "good", 2000ms is "bad"
        let latencyScore = SCORING_WEIGHTS.latency;
        const p95 = summary.avgP90LatencyMs ?? summary.avgP99LatencyMs;
        if (p95 !== undefined) {
            const normalizedLatency = Math.min(p95, 2000) / 2000; // 0-1, lower is better
            latencyScore = (1 - normalizedLatency) * SCORING_WEIGHTS.latency;
            reasons.push(`p95-latency:${p95.toFixed(0)}ms`);
        } else {
            latencyScore = SCORING_WEIGHTS.latency * 0.5; // Neutral if unknown
            reasons.push('latency:unknown');
        }
        // Calculate volume score (0-10)
        // More volume = more confidence in the data
        const volumeThreshold = 1000; // 1000 invocations is "high confidence"
        const volumeRatio = Math.min(summary.totalInvocations / volumeThreshold, 1);
        const volumeScore = volumeRatio * SCORING_WEIGHTS.volume;
        reasons.push(`invocations:${summary.totalInvocations}`);
        // Calculate freshness score (0-10)
        const fetchedAt = new Date(summary.fetchedAt);
        const hoursOld = (Date.now() - fetchedAt.getTime()) / (1000 * 60 * 60);
        const freshnessRatio = Math.max(0, 1 - hoursOld / 24); // Decays over 24 hours
        const freshnessScore = freshnessRatio * SCORING_WEIGHTS.freshness;
        reasons.push(`data-age:${hoursOld.toFixed(1)}h`);
        // Total score
        const score = successRateScore + latencyScore + volumeScore + freshnessScore;
        // Determine confidence level
        let confidence = 'low';
        if (summary.totalInvocations >= 1000 && hoursOld < 6) {
            confidence = 'high';
        } else if (summary.totalInvocations >= 100 && hoursOld < 24) {
            confidence = 'medium';
        }
        return {
            facilitatorId: params.facilitatorId,
            score: Math.round(score),
            successRate,
            avgLatencyMs: summary.avgP50LatencyMs,
            p95LatencyMs: summary.avgP90LatencyMs,
            totalInvocations: summary.totalInvocations,
            dataFreshness: hoursOld,
            confidence,
            reasons
        };
    } catch (error) {
        logger.error({
            error: error instanceof Error ? error.message : 'Unknown error',
            facilitatorId: params.facilitatorId,
            msg: 'Failed to get facilitator score'
        });
        return null;
    }
}
async function rankFacilitators(facilitatorIds, timeframe = '1d', config = DEFAULT_TRUST_CONFIG) {
    const scores = [];
    const untrusted = [];
    for (const id of facilitatorIds){
        const score = await getFacilitatorScore({
            facilitatorId: id,
            timeframe
        });
        if (!score) {
            untrusted.push({
                id,
                reason: 'no-data'
            });
            continue;
        }
        // Check if metrics meet trust thresholds
        const trustCheck = shouldTrustMetrics(score.dataFreshness, score.totalInvocations, config);
        if (!trustCheck.trust) {
            untrusted.push({
                id,
                reason: trustCheck.reason
            });
            // Still include in rankings but with penalized score
            scores.push({
                ...score,
                score: score.score * config.lowConfidencePenalty,
                confidence: 'low',
                reasons: [
                    ...score.reasons,
                    `untrusted:${trustCheck.reason}`
                ]
            });
            continue;
        }
        // Apply confidence-based adjustments
        if (trustCheck.confidence === 'medium') {
            // Slight penalty for medium confidence
            scores.push({
                ...score,
                score: score.score * 0.9,
                confidence: 'medium',
                reasons: [
                    ...score.reasons,
                    trustCheck.reason
                ]
            });
        } else {
            // High confidence - use score as-is
            scores.push({
                ...score,
                reasons: [
                    ...score.reasons,
                    trustCheck.reason
                ]
            });
        }
    }
    // Log untrusted facilitators for visibility
    if (untrusted.length > 0) {
        logger.debug({
            untrusted,
            trusted: scores.filter((s)=>s.confidence !== 'low').map((s)=>s.facilitatorId),
            msg: 'Facilitator metrics trust check results'
        });
    }
    // Sort by score descending
    scores.sort((a, b)=>b.score - a.score);
    return {
        rankings: scores,
        timestamp: new Date().toISOString(),
        timeframe
    };
}
async function getRecommendedFacilitator(candidateIds, options) {
    const timeframe = options?.timeframe ?? '1d';
    const trustConfig = options?.trustConfig ?? DEFAULT_TRUST_CONFIG;
    const ranking = await rankFacilitators(candidateIds, timeframe, trustConfig);
    // Check if we have any trusted rankings
    const trustedRankings = ranking.rankings.filter((r)=>r.confidence !== 'low');
    if (trustedRankings.length === 0) {
        // No trusted data - fall back to first candidate
        logger.warn({
            candidates: candidateIds,
            rankings: ranking.rankings.map((r)=>({
                    id: r.facilitatorId,
                    confidence: r.confidence,
                    reasons: r.reasons
                })),
            msg: 'No trusted x402scan data available, using fallback'
        });
        return {
            recommended: candidateIds[0] ?? null,
            ranking,
            reason: 'No trusted x402scan data (stale or insufficient), using default order',
            usedFallback: true
        };
    }
    const prioritize = options?.prioritize ?? 'balanced';
    let recommended;
    switch(prioritize){
        case 'latency':
            // Sort by latency (ascending), filter out unknown latency, only trusted
            const byLatency = trustedRankings.filter((r)=>r.p95LatencyMs !== undefined).sort((a, b)=>(a.p95LatencyMs ?? Infinity) - (b.p95LatencyMs ?? Infinity));
            recommended = byLatency[0] ?? trustedRankings[0];
            break;
        case 'reliability':
            // Sort by success rate (descending), only trusted
            const byReliability = [
                ...trustedRankings
            ].sort((a, b)=>b.successRate - a.successRate);
            recommended = byReliability[0];
            break;
        case 'balanced':
        default:
            // Use overall score from trusted rankings
            recommended = trustedRankings[0];
            break;
    }
    return {
        recommended: recommended.facilitatorId,
        ranking,
        reason: `Selected ${recommended.facilitatorId} with score ${recommended.score} ` + `(${recommended.confidence} confidence, ${recommended.reasons.slice(0, 3).join(', ')})`,
        usedFallback: false
    };
}
async function shouldAvoidFacilitator(facilitatorId, threshold = {}) {
    const maxErrorRate = threshold.maxErrorRate ?? 0.2;
    const minInvocations = threshold.minInvocations ?? 10;
    try {
        const score = await getFacilitatorScore({
            facilitatorId,
            timeframe: '1d'
        });
        if (!score) {
            return {
                avoid: false,
                reason: 'No data available'
            };
        }
        // Not enough data to make a decision
        if (score.totalInvocations < minInvocations) {
            return {
                avoid: false,
                reason: `Insufficient data (${score.totalInvocations} invocations)`
            };
        }
        // Check error rate
        const errorRate = 1 - score.successRate;
        if (errorRate > maxErrorRate) {
            return {
                avoid: true,
                reason: `Error rate ${(errorRate * 100).toFixed(1)}% exceeds threshold ${(maxErrorRate * 100).toFixed(1)}%`
            };
        }
        return {
            avoid: false
        };
    } catch (error) {
        logger.error({
            error: error instanceof Error ? error.message : 'Unknown error',
            facilitatorId,
            msg: 'Failed to check if facilitator should be avoided'
        });
        return {
            avoid: false,
            reason: 'Error checking metrics'
        };
    }
}
async function getAllFacilitatorSummaries() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadAllSummaries"])();
}
async function getFacilitatorExplainer(facilitatorId, options) {
    const timeframe = options?.timeframe ?? '1d';
    const wasSelected = options?.wasSelected ?? false;
    const score = await getFacilitatorScore({
        facilitatorId,
        timeframe
    });
    if (!score) {
        return {
            facilitatorId,
            selected: wasSelected,
            score: 50,
            confidence: 'low',
            shortReason: `${facilitatorId}: no x402scan data available`,
            detailedReasons: [
                'No observability data from x402scan'
            ],
            metrics: {}
        };
    }
    // Build short reason string
    const successPct = (score.successRate * 100).toFixed(1);
    const latencyStr = score.p95LatencyMs ? `${score.p95LatencyMs.toFixed(0)}ms p95` : 'latency unknown';
    const volumeStr = score.totalInvocations >= 1000 ? `${(score.totalInvocations / 1000).toFixed(1)}K invocations` : `${score.totalInvocations} invocations`;
    const shortReason = `${facilitatorId}: ${successPct}% success, ${latencyStr}, ${score.confidence} confidence (${volumeStr})`;
    // Build detailed reasons
    const detailedReasons = [];
    if (score.successRate >= 0.99) {
        detailedReasons.push(`Excellent success rate: ${successPct}%`);
    } else if (score.successRate >= 0.95) {
        detailedReasons.push(`Good success rate: ${successPct}%`);
    } else if (score.successRate >= 0.90) {
        detailedReasons.push(`Acceptable success rate: ${successPct}%`);
    } else {
        detailedReasons.push(`⚠️ Low success rate: ${successPct}%`);
    }
    if (score.p95LatencyMs !== undefined) {
        if (score.p95LatencyMs < 200) {
            detailedReasons.push(`Fast response times: ${score.p95LatencyMs.toFixed(0)}ms p95`);
        } else if (score.p95LatencyMs < 500) {
            detailedReasons.push(`Moderate latency: ${score.p95LatencyMs.toFixed(0)}ms p95`);
        } else {
            detailedReasons.push(`⚠️ High latency: ${score.p95LatencyMs.toFixed(0)}ms p95`);
        }
    }
    if (score.confidence === 'high') {
        detailedReasons.push(`High confidence: ${volumeStr}, data ${score.dataFreshness.toFixed(1)}h old`);
    } else if (score.confidence === 'medium') {
        detailedReasons.push(`Medium confidence: ${volumeStr}`);
    } else {
        detailedReasons.push(`Low confidence: limited data (${volumeStr})`);
    }
    if (score.dataFreshness > 12) {
        detailedReasons.push(`⚠️ Data is ${score.dataFreshness.toFixed(1)} hours old`);
    }
    return {
        facilitatorId,
        selected: wasSelected,
        score: score.score,
        confidence: score.confidence,
        shortReason,
        detailedReasons,
        metrics: {
            successRate: score.successRate,
            errorRate: 1 - score.successRate,
            p95LatencyMs: score.p95LatencyMs,
            invocations: score.totalInvocations,
            dataAgeHours: score.dataFreshness
        }
    };
}
async function getMultipleFacilitatorExplanations(facilitatorIds, options) {
    const explanations = [];
    for (const id of facilitatorIds){
        const explanation = await getFacilitatorExplainer(id, {
            timeframe: options?.timeframe,
            wasSelected: id === options?.selectedId
        });
        explanations.push(explanation);
    }
    // Sort by score descending
    return explanations.sort((a, b)=>b.score - a.score);
}
}),
"[project]/src/app/api/debug/smf-facilitators/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// DEBUG API: SMF FACILITATOR RANKINGS
// =============================================================================
// Exposes x402scan metrics and SMF ranking information for debugging
// GET /api/debug/smf-facilitators?network=eip155:8453&timeframe=1d
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "OPTIONS",
    ()=>OPTIONS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$facilitator$2d$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/facilitator-registry.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/facilitator-metrics-reader.ts [app-route] (ecmascript)");
;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'DebugSMFFacilitators'
});
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const network = searchParams.get('network') || null;
        const timeframe = searchParams.get('timeframe') || '1d';
        // Validate timeframe
        if (![
            '1d',
            '7d',
            '30d'
        ].includes(timeframe)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: `Invalid timeframe: ${timeframe}. Must be 1d, 7d, or 30d.`
            }, {
                status: 400
            });
        }
        // Get facilitators (filtered by network if provided)
        let facilitators;
        if (network) {
            facilitators = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$facilitator$2d$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFacilitatorsForNetwork"])(network);
            if (facilitators.length === 0) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    ok: true,
                    network,
                    timeframe,
                    usedFallback: true,
                    recommended: null,
                    recommendationReason: `No facilitators support network: ${network}`,
                    facilitators: [],
                    timestamp: new Date().toISOString()
                });
            }
        } else {
            facilitators = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$facilitator$2d$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllFacilitators"])();
        }
        const facilitatorIds = facilitators.map((f)=>f.id);
        // Get recommendation and rankings
        const recommendation = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRecommendedFacilitator"])(facilitatorIds, {
            network: network ?? undefined,
            timeframe,
            prioritize: 'balanced'
        });
        // Get detailed explanations for each facilitator
        const facilitatorDebugInfo = [];
        for(let i = 0; i < recommendation.ranking.rankings.length; i++){
            const ranking = recommendation.ranking.rankings[i];
            const registryEntry = facilitators.find((f)=>f.id === ranking.facilitatorId);
            // Get detailed explanation
            let explanation = null;
            try {
                explanation = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFacilitatorExplainer"])(ranking.facilitatorId, {
                    timeframe,
                    wasSelected: ranking.facilitatorId === recommendation.recommended
                });
            } catch (error) {
                logger.debug({
                    error,
                    facilitatorId: ranking.facilitatorId
                }, 'Failed to get explanation');
            }
            const debugInfo = {
                id: ranking.facilitatorId,
                name: registryEntry?.name ?? ranking.facilitatorId,
                baseUrl: registryEntry?.baseUrl ?? 'unknown',
                networks: registryEntry?.networks ?? [],
                score: Math.round(ranking.score * 10) / 10,
                rank: i + 1,
                selected: ranking.facilitatorId === recommendation.recommended,
                x402scanScore: explanation?.score ?? ranking.score,
                confidence: ranking.confidence,
                shortReason: explanation?.shortReason,
                metrics: explanation?.metrics ? {
                    successRate: explanation.metrics.successRate,
                    errorRate: explanation.metrics.errorRate,
                    p95LatencyMs: explanation.metrics.p95LatencyMs,
                    invocations: explanation.metrics.invocations,
                    dataAgeHours: Math.round(explanation.metrics.dataAgeHours * 10) / 10
                } : undefined,
                reasons: ranking.reasons
            };
            facilitatorDebugInfo.push(debugInfo);
        }
        // Add facilitators with no ranking data
        for (const facilitator of facilitators){
            if (!facilitatorDebugInfo.some((f)=>f.id === facilitator.id)) {
                facilitatorDebugInfo.push({
                    id: facilitator.id,
                    name: facilitator.name,
                    baseUrl: facilitator.baseUrl,
                    networks: facilitator.networks,
                    score: 0,
                    rank: facilitatorDebugInfo.length + 1,
                    selected: false,
                    confidence: 'none',
                    shortReason: 'No x402scan data available',
                    reasons: [
                        'no-x402scan-data'
                    ]
                });
            }
        }
        // Log the debug request
        logger.info({
            network,
            timeframe,
            usedFallback: recommendation.usedFallback,
            recommended: recommendation.recommended,
            facilitatorCount: facilitatorDebugInfo.length,
            topFacilitator: facilitatorDebugInfo[0] ? {
                id: facilitatorDebugInfo[0].id,
                score: facilitatorDebugInfo[0].score,
                confidence: facilitatorDebugInfo[0].confidence
            } : null,
            msg: 'SMF facilitator debug request'
        });
        const response = {
            ok: true,
            network,
            timeframe,
            usedFallback: recommendation.usedFallback,
            recommended: recommendation.recommended,
            recommendationReason: recommendation.reason,
            facilitators: facilitatorDebugInfo,
            timestamp: new Date().toISOString()
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        logger.error({
            error: errorMessage,
            stack: error instanceof Error ? error.stack : undefined,
            msg: 'SMF facilitator debug route error'
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: errorMessage
        }, {
            status: 500
        });
    }
}
async function OPTIONS() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e652e322._.js.map