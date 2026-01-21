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
"[externals]/pg [external] (pg, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/services/facilitator-metrics-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// FACILITATOR METRICS SERVICE
// =============================================================================
// Service for persisting and managing facilitator path metrics from x402scan
// Uses Supabase/PostgreSQL in production, falls back to JSON files in development
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
    "isDatabaseAvailable",
    ()=>isDatabaseAvailable,
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
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'FacilitatorMetricsService'
});
// =============================================================================
// DATABASE CONNECTION
// =============================================================================
let pool = null;
function getPool() {
    if (pool) return pool;
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl || !databaseUrl.startsWith('postgresql://')) {
        return null;
    }
    pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
        connectionString: databaseUrl,
        max: 5,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000
    });
    return pool;
}
// =============================================================================
// DATABASE STORAGE FUNCTIONS
// =============================================================================
/**
 * Upsert facilitator path metrics to the database
 */ async function upsertMetricsToDb(metrics) {
    const db = getPool();
    if (!db || metrics.length === 0) return;
    const client = await db.connect();
    try {
        await client.query('BEGIN');
        for (const m of metrics){
            await client.query(`
        INSERT INTO smf_facilitator_metrics (
          kind, facilitator_id, resource_url, server_id, network,
          timeframe, bucket_minutes, time_bucket_start, time_bucket_end,
          invocations, success_count, failure_count,
          count_2xx, count_3xx, count_4xx, count_5xx,
          error_rate, avg_latency_ms, p50_latency_ms, p90_latency_ms, p95_latency_ms, p99_latency_ms,
          methods, fetched_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9,
          $10, $11, $12,
          $13, $14, $15, $16,
          $17, $18, $19, $20, $21, $22,
          $23, $24, NOW()
        )
        ON CONFLICT (facilitator_id, timeframe, time_bucket_start)
        DO UPDATE SET
          kind = EXCLUDED.kind,
          resource_url = EXCLUDED.resource_url,
          server_id = EXCLUDED.server_id,
          network = EXCLUDED.network,
          bucket_minutes = EXCLUDED.bucket_minutes,
          time_bucket_end = EXCLUDED.time_bucket_end,
          invocations = EXCLUDED.invocations,
          success_count = EXCLUDED.success_count,
          failure_count = EXCLUDED.failure_count,
          count_2xx = EXCLUDED.count_2xx,
          count_3xx = EXCLUDED.count_3xx,
          count_4xx = EXCLUDED.count_4xx,
          count_5xx = EXCLUDED.count_5xx,
          error_rate = EXCLUDED.error_rate,
          avg_latency_ms = EXCLUDED.avg_latency_ms,
          p50_latency_ms = EXCLUDED.p50_latency_ms,
          p90_latency_ms = EXCLUDED.p90_latency_ms,
          p95_latency_ms = EXCLUDED.p95_latency_ms,
          p99_latency_ms = EXCLUDED.p99_latency_ms,
          methods = EXCLUDED.methods,
          fetched_at = EXCLUDED.fetched_at,
          updated_at = NOW()
      `, [
                m.kind,
                m.facilitatorId,
                m.resourceUrl || null,
                m.serverId || null,
                m.network || null,
                m.timeframe,
                m.bucketMinutes,
                m.timeBucketStart,
                m.timeBucketEnd,
                m.invocations,
                m.successCount,
                m.failureCount,
                m.count2xx,
                m.count3xx,
                m.count4xx,
                m.count5xx,
                m.errorRate,
                m.avgLatencyMs || null,
                m.p50LatencyMs || null,
                m.p90LatencyMs || null,
                m.p95LatencyMs || null,
                m.p99LatencyMs || null,
                m.methods ? JSON.stringify(m.methods) : null,
                m.fetchedAt
            ]);
        }
        await client.query('COMMIT');
        logger.info({
            count: metrics.length,
            facilitatorId: metrics[0]?.facilitatorId,
            timeframe: metrics[0]?.timeframe,
            msg: 'Facilitator metrics upserted to database'
        });
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally{
        client.release();
    }
}
/**
 * Load metrics from database
 */ async function loadMetricsFromDb(facilitatorId, timeframe) {
    const db = getPool();
    if (!db) return [];
    let query = `
    SELECT * FROM smf_facilitator_metrics
    WHERE fetched_at > NOW() - INTERVAL '30 days'
  `;
    const params = [];
    let paramIndex = 1;
    if (facilitatorId) {
        query += ` AND facilitator_id = $${paramIndex}`;
        params.push(facilitatorId);
        paramIndex++;
    }
    if (timeframe) {
        query += ` AND timeframe = $${paramIndex}`;
        params.push(timeframe);
        paramIndex++;
    }
    query += ' ORDER BY time_bucket_start DESC LIMIT 1000';
    const result = await db.query(query, params);
    return result.rows.map(mapDbRowToMetrics);
}
/**
 * Map database row to FacilitatorPathMetrics
 */ function mapDbRowToMetrics(row) {
    return {
        kind: row.kind || 'facilitator-global',
        facilitatorId: row.facilitator_id,
        resourceUrl: row.resource_url || undefined,
        serverId: row.server_id || undefined,
        network: row.network || undefined,
        timeframe: row.timeframe,
        bucketMinutes: row.bucket_minutes,
        timeBucketStart: row.time_bucket_start?.toISOString() || row.time_bucket_start,
        timeBucketEnd: row.time_bucket_end?.toISOString() || row.time_bucket_end,
        invocations: row.invocations,
        successCount: row.success_count,
        failureCount: row.failure_count,
        count2xx: row.count_2xx,
        count3xx: row.count_3xx,
        count4xx: row.count_4xx,
        count5xx: row.count_5xx,
        errorRate: parseFloat(row.error_rate) || 0,
        avgLatencyMs: row.avg_latency_ms ? parseFloat(row.avg_latency_ms) : undefined,
        p50LatencyMs: row.p50_latency_ms ? parseFloat(row.p50_latency_ms) : undefined,
        p90LatencyMs: row.p90_latency_ms ? parseFloat(row.p90_latency_ms) : undefined,
        p95LatencyMs: row.p95_latency_ms ? parseFloat(row.p95_latency_ms) : undefined,
        p99LatencyMs: row.p99_latency_ms ? parseFloat(row.p99_latency_ms) : undefined,
        methods: row.methods || undefined,
        fetchedAt: row.fetched_at?.toISOString() || row.fetched_at
    };
}
/**
 * Upsert summary to database
 */ async function upsertSummaryToDb(summary) {
    const db = getPool();
    if (!db) return;
    // Handle empty timestamps - skip if no valid data
    const dataStart = summary.dataStart && summary.dataStart.length > 0 ? summary.dataStart : null;
    const dataEnd = summary.dataEnd && summary.dataEnd.length > 0 ? summary.dataEnd : null;
    // Skip summaries with no actual data
    if (summary.totalInvocations === 0 && !dataStart && !dataEnd) {
        logger.debug({
            facilitatorId: summary.facilitatorId,
            timeframe: summary.timeframe,
            msg: 'Skipping summary with no data'
        });
        return;
    }
    await db.query(`
    INSERT INTO smf_facilitator_summaries (
      facilitator_id, timeframe,
      total_invocations, total_successes, total_failures, overall_error_rate,
      avg_p50_latency_ms, avg_p90_latency_ms, avg_p99_latency_ms,
      top_methods, data_start, data_end, fetched_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
    ON CONFLICT (facilitator_id, timeframe)
    DO UPDATE SET
      total_invocations = EXCLUDED.total_invocations,
      total_successes = EXCLUDED.total_successes,
      total_failures = EXCLUDED.total_failures,
      overall_error_rate = EXCLUDED.overall_error_rate,
      avg_p50_latency_ms = EXCLUDED.avg_p50_latency_ms,
      avg_p90_latency_ms = EXCLUDED.avg_p90_latency_ms,
      avg_p99_latency_ms = EXCLUDED.avg_p99_latency_ms,
      top_methods = EXCLUDED.top_methods,
      data_start = COALESCE(EXCLUDED.data_start, smf_facilitator_summaries.data_start),
      data_end = COALESCE(EXCLUDED.data_end, smf_facilitator_summaries.data_end),
      fetched_at = EXCLUDED.fetched_at,
      updated_at = NOW()
  `, [
        summary.facilitatorId,
        summary.timeframe,
        summary.totalInvocations,
        summary.totalSuccesses,
        summary.totalFailures,
        summary.overallErrorRate,
        summary.avgP50LatencyMs || null,
        summary.avgP90LatencyMs || null,
        summary.avgP99LatencyMs || null,
        JSON.stringify(summary.topMethods),
        dataStart,
        dataEnd,
        summary.fetchedAt
    ]);
    logger.info({
        facilitatorId: summary.facilitatorId,
        timeframe: summary.timeframe,
        totalInvocations: summary.totalInvocations,
        msg: 'Facilitator summary upserted to database'
    });
}
/**
 * Load all summaries from database
 */ async function loadSummariesFromDb() {
    const db = getPool();
    if (!db) return {};
    const result = await db.query(`
    SELECT * FROM smf_facilitator_summaries
    ORDER BY fetched_at DESC
  `);
    const summaries = {};
    for (const row of result.rows){
        const key = `${row.facilitator_id}:${row.timeframe}`;
        summaries[key] = {
            facilitatorId: row.facilitator_id,
            timeframe: row.timeframe,
            totalInvocations: parseInt(row.total_invocations) || 0,
            totalSuccesses: parseInt(row.total_successes) || 0,
            totalFailures: parseInt(row.total_failures) || 0,
            overallErrorRate: parseFloat(row.overall_error_rate) || 0,
            avgP50LatencyMs: row.avg_p50_latency_ms ? parseFloat(row.avg_p50_latency_ms) : undefined,
            avgP90LatencyMs: row.avg_p90_latency_ms ? parseFloat(row.avg_p90_latency_ms) : undefined,
            avgP99LatencyMs: row.avg_p99_latency_ms ? parseFloat(row.avg_p99_latency_ms) : undefined,
            topMethods: row.top_methods || [],
            dataStart: row.data_start?.toISOString() || row.data_start,
            dataEnd: row.data_end?.toISOString() || row.data_end,
            fetchedAt: row.fetched_at?.toISOString() || row.fetched_at
        };
    }
    return summaries;
}
function isDatabaseAvailable() {
    return getPool() !== null;
}
async function loadAllMetrics() {
    const db = getPool();
    if (db) {
        try {
            return await loadMetricsFromDb();
        } catch (error) {
            logger.error({
                error,
                msg: 'Failed to load metrics from database, returning empty'
            });
            return [];
        }
    }
    // Fallback: return empty in production if DB not available
    logger.warn({
        msg: 'Database not available, returning empty metrics'
    });
    return [];
}
async function upsertFacilitatorPathMetrics(metrics) {
    if (metrics.length === 0) {
        logger.debug('No metrics to upsert');
        return;
    }
    const db = getPool();
    if (db) {
        try {
            await upsertMetricsToDb(metrics);
            return;
        } catch (error) {
            logger.error({
                error,
                msg: 'Failed to upsert metrics to database'
            });
            throw error;
        }
    }
    // In production without DB, log warning
    logger.warn({
        count: metrics.length,
        msg: 'Database not available, metrics not persisted'
    });
}
async function loadAllSummaries() {
    const db = getPool();
    if (db) {
        try {
            return await loadSummariesFromDb();
        } catch (error) {
            logger.error({
                error,
                msg: 'Failed to load summaries from database'
            });
            return {};
        }
    }
    return {};
}
async function upsertFacilitatorSummary(summary) {
    const db = getPool();
    if (db) {
        try {
            await upsertSummaryToDb(summary);
            return;
        } catch (error) {
            logger.error({
                error,
                msg: 'Failed to upsert summary to database'
            });
            throw error;
        }
    }
    logger.warn({
        facilitatorId: summary.facilitatorId,
        msg: 'Database not available, summary not persisted'
    });
}
async function upsertFacilitatorSummaries(summaries) {
    for (const summary of summaries){
        await upsertFacilitatorSummary(summary);
    }
}
async function getMetricsForFacilitator(facilitatorId, timeframe) {
    const db = getPool();
    if (db) {
        try {
            return await loadMetricsFromDb(facilitatorId, timeframe);
        } catch (error) {
            logger.error({
                error,
                msg: 'Failed to get metrics for facilitator'
            });
            return [];
        }
    }
    return [];
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
    const db = getPool();
    if (!db) return 0;
    const result = await db.query(`
    DELETE FROM smf_facilitator_metrics
    WHERE time_bucket_start < NOW() - INTERVAL '${daysToKeep} days'
  `);
    const removed = result.rowCount || 0;
    if (removed > 0) {
        logger.info({
            removed,
            daysToKeep,
            msg: 'Old metrics cleaned up from database'
        });
    }
    return removed;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/services/facilitator-volume-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// FACILITATOR VOLUME SERVICE
// =============================================================================
// Service for persisting and managing facilitator volume/activity metrics from Scattering
// Uses Supabase/PostgreSQL in production, falls back to logging-only in development
//
// =============================================================================
// RETENTION PLAN (TODO)
// =============================================================================
// 1. Current period snapshots (3d):
//    - Keep last 30 snapshots (approx 1 month if pulled daily)
//    - Each snapshot is a full picture of facilitator activity
//
// 2. Historical rollups:
//    - Weekly: Keep 12 weeks of weekly summaries
//    - Monthly: Keep 12 months of monthly summaries
//
// Compaction strategy:
//    - Average volumeUsd3d, txCount3d across period
//    - Track min/max/avg for trend analysis
//    - Keep peak values for market awareness
//
// TODO: Implement weekly/monthly compaction
// =============================================================================
__turbopack_context__.s([
    "cleanupOldSnapshots",
    ()=>cleanupOldSnapshots,
    "computeActivityScore",
    ()=>computeActivityScore,
    "getFacilitatorVolumeHistory",
    ()=>getFacilitatorVolumeHistory,
    "getGrowingFacilitators",
    ()=>getGrowingFacilitators,
    "getScatteringHistory",
    ()=>getScatteringHistory,
    "getScatteringMetricsForFacilitator",
    ()=>getScatteringMetricsForFacilitator,
    "getScatteringMetricsForFacilitators",
    ()=>getScatteringMetricsForFacilitators,
    "getTopFacilitatorsByTxCount",
    ()=>getTopFacilitatorsByTxCount,
    "getTopFacilitatorsByVolume",
    ()=>getTopFacilitatorsByVolume,
    "isDatabaseAvailable",
    ()=>isDatabaseAvailable,
    "loadAllScatteringMetrics",
    ()=>loadAllScatteringMetrics,
    "upsertScatteringMetrics",
    ()=>upsertScatteringMetrics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'FacilitatorVolumeService'
});
// =============================================================================
// DATABASE CONNECTION
// =============================================================================
let pool = null;
function getPool() {
    if (pool) return pool;
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl || !databaseUrl.startsWith('postgresql://')) {
        return null;
    }
    pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
        connectionString: databaseUrl,
        max: 5,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000
    });
    return pool;
}
// =============================================================================
// DATABASE STORAGE FUNCTIONS
// =============================================================================
/**
 * Upsert Scattering metrics to database
 */ async function upsertScatteringToDb(metrics) {
    const db = getPool();
    if (!db || metrics.length === 0) return;
    const client = await db.connect();
    const fetchedAt = new Date().toISOString();
    const snapshotId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
        await client.query('BEGIN');
        for (const m of metrics){
            // Upsert current metrics
            await client.query(`
        INSERT INTO smf_scattering_metrics (
          facilitator_id, period,
          volume_usd_3d, tx_count_3d, unique_buyers_3d, unique_sellers_3d,
          volume_usd_all_time, chains, volume_change_rate, tx_change_rate,
          fetched_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
        ON CONFLICT (facilitator_id, period)
        DO UPDATE SET
          volume_usd_3d = EXCLUDED.volume_usd_3d,
          tx_count_3d = EXCLUDED.tx_count_3d,
          unique_buyers_3d = EXCLUDED.unique_buyers_3d,
          unique_sellers_3d = EXCLUDED.unique_sellers_3d,
          volume_usd_all_time = EXCLUDED.volume_usd_all_time,
          chains = EXCLUDED.chains,
          volume_change_rate = EXCLUDED.volume_change_rate,
          tx_change_rate = EXCLUDED.tx_change_rate,
          fetched_at = EXCLUDED.fetched_at,
          updated_at = NOW()
      `, [
                m.facilitatorId,
                m.period,
                m.volumeUsd3d,
                m.txCount3d,
                m.uniqueBuyers3d,
                m.uniqueSellers3d,
                m.volumeUsdAllTime,
                JSON.stringify(m.chains),
                m.volumeChangeRate ?? null,
                m.txChangeRate ?? null,
                fetchedAt
            ]);
            // Insert into history table
            await client.query(`
        INSERT INTO smf_scattering_history (
          snapshot_id, facilitator_id, period,
          volume_usd_3d, tx_count_3d, unique_buyers_3d, unique_sellers_3d,
          volume_usd_all_time, chains, volume_change_rate, tx_change_rate,
          fetched_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
                snapshotId,
                m.facilitatorId,
                m.period,
                m.volumeUsd3d,
                m.txCount3d,
                m.uniqueBuyers3d,
                m.uniqueSellers3d,
                m.volumeUsdAllTime,
                JSON.stringify(m.chains),
                m.volumeChangeRate ?? null,
                m.txChangeRate ?? null,
                fetchedAt
            ]);
        }
        await client.query('COMMIT');
        // Log summary
        const totalVolume = metrics.reduce((sum, m)=>sum + m.volumeUsd3d, 0);
        const totalTxns = metrics.reduce((sum, m)=>sum + m.txCount3d, 0);
        logger.info({
            facilitatorCount: metrics.length,
            totalVolume3d: `$${formatNumber(totalVolume)}`,
            totalTxns3d: formatNumber(totalTxns),
            msg: 'Scattering metrics upserted to database'
        });
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally{
        client.release();
    }
}
/**
 * Load current Scattering metrics from database
 */ async function loadScatteringFromDb() {
    const db = getPool();
    if (!db) return {};
    const result = await db.query(`
    SELECT * FROM smf_scattering_metrics
    ORDER BY fetched_at DESC
  `);
    const metrics = {};
    for (const row of result.rows){
        metrics[row.facilitator_id] = mapDbRowToScattering(row);
    }
    return metrics;
}
/**
 * Map database row to ScatteringFacilitatorMetrics
 */ function mapDbRowToScattering(row) {
    return {
        facilitatorId: row.facilitator_id,
        period: row.period || '3d',
        volumeUsd3d: parseFloat(row.volume_usd_3d) || 0,
        txCount3d: parseInt(row.tx_count_3d) || 0,
        uniqueBuyers3d: row.unique_buyers_3d || 0,
        uniqueSellers3d: row.unique_sellers_3d || 0,
        volumeUsdAllTime: parseFloat(row.volume_usd_all_time) || 0,
        chains: row.chains || [],
        volumeChangeRate: row.volume_change_rate ? parseFloat(row.volume_change_rate) : undefined,
        txChangeRate: row.tx_change_rate ? parseFloat(row.tx_change_rate) : undefined,
        fetchedAt: row.fetched_at?.toISOString() || row.fetched_at
    };
}
function isDatabaseAvailable() {
    return getPool() !== null;
}
async function upsertScatteringMetrics(metrics) {
    if (metrics.length === 0) {
        logger.debug('No Scattering metrics to upsert');
        return;
    }
    const db = getPool();
    if (db) {
        try {
            await upsertScatteringToDb(metrics);
            return;
        } catch (error) {
            logger.error({
                error,
                msg: 'Failed to upsert Scattering metrics to database'
            });
            throw error;
        }
    }
    // Log summary even without DB
    const totalVolume = metrics.reduce((sum, m)=>sum + m.volumeUsd3d, 0);
    const totalTxns = metrics.reduce((sum, m)=>sum + m.txCount3d, 0);
    logger.warn({
        facilitatorCount: metrics.length,
        totalVolume3d: `$${formatNumber(totalVolume)}`,
        totalTxns3d: formatNumber(totalTxns),
        msg: 'Database not available, Scattering metrics not persisted'
    });
}
async function loadAllScatteringMetrics() {
    const db = getPool();
    if (db) {
        try {
            const metrics = await loadScatteringFromDb();
            return Object.values(metrics);
        } catch (error) {
            logger.error({
                error,
                msg: 'Failed to load Scattering metrics from database'
            });
            return [];
        }
    }
    return [];
}
async function getScatteringMetricsForFacilitator(facilitatorId) {
    const db = getPool();
    if (!db) return null;
    try {
        const result = await db.query(`
      SELECT * FROM smf_scattering_metrics
      WHERE facilitator_id = $1
      ORDER BY fetched_at DESC
      LIMIT 1
    `, [
            facilitatorId
        ]);
        if (result.rows.length === 0) return null;
        return mapDbRowToScattering(result.rows[0]);
    } catch (error) {
        logger.error({
            error,
            facilitatorId,
            msg: 'Failed to get Scattering metrics'
        });
        return null;
    }
}
async function getScatteringMetricsForFacilitators(facilitatorIds) {
    const result = new Map();
    const db = getPool();
    if (!db) {
        for (const id of facilitatorIds){
            result.set(id, null);
        }
        return result;
    }
    try {
        const metrics = await loadScatteringFromDb();
        for (const id of facilitatorIds){
            result.set(id, metrics[id] ?? null);
        }
        return result;
    } catch (error) {
        logger.error({
            error,
            msg: 'Failed to get Scattering metrics for facilitators'
        });
        for (const id of facilitatorIds){
            result.set(id, null);
        }
        return result;
    }
}
async function getScatteringHistory(limit = 10) {
    const db = getPool();
    if (!db) return [];
    try {
        // Get distinct snapshots
        const snapshotsResult = await db.query(`
      SELECT DISTINCT snapshot_id, fetched_at 
      FROM smf_scattering_history
      ORDER BY fetched_at DESC
      LIMIT $1
    `, [
            limit
        ]);
        const history = [];
        for (const snapshot of snapshotsResult.rows){
            const metricsResult = await db.query(`
        SELECT * FROM smf_scattering_history
        WHERE snapshot_id = $1
      `, [
                snapshot.snapshot_id
            ]);
            history.push({
                fetchedAt: snapshot.fetched_at?.toISOString() || snapshot.fetched_at,
                metrics: metricsResult.rows.map(mapDbRowToScattering)
            });
        }
        return history;
    } catch (error) {
        logger.error({
            error,
            msg: 'Failed to get Scattering history'
        });
        return [];
    }
}
async function getFacilitatorVolumeHistory(facilitatorId, limit = 10) {
    const db = getPool();
    if (!db) return [];
    try {
        const result = await db.query(`
      SELECT * FROM smf_scattering_history
      WHERE facilitator_id = $1
      ORDER BY fetched_at DESC
      LIMIT $2
    `, [
            facilitatorId,
            limit
        ]);
        return result.rows.map(mapDbRowToScattering);
    } catch (error) {
        logger.error({
            error,
            facilitatorId,
            msg: 'Failed to get volume history'
        });
        return [];
    }
}
async function getTopFacilitatorsByVolume(limit = 10) {
    const metrics = await loadAllScatteringMetrics();
    return metrics.sort((a, b)=>b.volumeUsd3d - a.volumeUsd3d).slice(0, limit);
}
async function getTopFacilitatorsByTxCount(limit = 10) {
    const metrics = await loadAllScatteringMetrics();
    return metrics.sort((a, b)=>b.txCount3d - a.txCount3d).slice(0, limit);
}
async function getGrowingFacilitators() {
    const metrics = await loadAllScatteringMetrics();
    return metrics.filter((m)=>m.volumeChangeRate !== undefined && m.volumeChangeRate > 0).sort((a, b)=>(b.volumeChangeRate ?? 0) - (a.volumeChangeRate ?? 0));
}
function computeActivityScore(metrics) {
    // Weights for different factors
    const VOLUME_WEIGHT = 0.3;
    const TX_WEIGHT = 0.3;
    const BUYERS_WEIGHT = 0.2;
    const SELLERS_WEIGHT = 0.1;
    const GROWTH_WEIGHT = 0.1;
    // Reference values (approximate top-tier facilitator numbers)
    const MAX_VOLUME = 200_000; // $200K 3d volume
    const MAX_TX = 3_000_000; // 3M txns
    const MAX_BUYERS = 15_000; // 15K unique buyers
    const MAX_SELLERS = 1_000; // 1K unique sellers
    // Normalize each factor to 0-1
    const volumeScore = Math.min(metrics.volumeUsd3d / MAX_VOLUME, 1);
    const txScore = Math.min(metrics.txCount3d / MAX_TX, 1);
    const buyersScore = Math.min(metrics.uniqueBuyers3d / MAX_BUYERS, 1);
    const sellersScore = Math.min(metrics.uniqueSellers3d / MAX_SELLERS, 1);
    // Growth bonus (positive growth adds to score, negative subtracts)
    let growthScore = 0.5; // neutral
    if (metrics.volumeChangeRate !== undefined) {
        // Clamp growth between -100% and +100%
        const clampedGrowth = Math.max(-100, Math.min(100, metrics.volumeChangeRate));
        growthScore = (clampedGrowth + 100) / 200; // normalize to 0-1
    }
    // Calculate weighted score
    const score = volumeScore * VOLUME_WEIGHT + txScore * TX_WEIGHT + buyersScore * BUYERS_WEIGHT + sellersScore * SELLERS_WEIGHT + growthScore * GROWTH_WEIGHT;
    return Math.min(Math.max(score, 0), 1); // clamp to 0-1
}
async function cleanupOldSnapshots(keepDays = 30) {
    const db = getPool();
    if (!db) return 0;
    try {
        const result = await db.query(`
      DELETE FROM smf_scattering_history
      WHERE fetched_at < NOW() - INTERVAL '${keepDays} days'
    `);
        const removed = result.rowCount || 0;
        if (removed > 0) {
            logger.info({
                removed,
                keepDays,
                msg: 'Old Scattering snapshots cleaned up'
            });
        }
        return removed;
    } catch (error) {
        logger.error({
            error,
            msg: 'Failed to cleanup old snapshots'
        });
        return 0;
    }
}
// =============================================================================
// UTILITY
// =============================================================================
/**
 * Format number for logging (e.g., 137535 -> "137.5K")
 */ function formatNumber(num) {
    if (num >= 1_000_000) {
        return `${(num / 1_000_000).toFixed(1)}M`;
    }
    if (num >= 1_000) {
        return `${(num / 1_000).toFixed(1)}K`;
    }
    return num.toFixed(2);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/services/facilitator-metrics-reader.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// FACILITATOR METRICS READER
// =============================================================================
// Read-side helper for SMF to access facilitator path metrics
// Used by the SMF router to inform routing decisions
//
// Scoring blends two data sources:
// 1. x402scan: Observability metrics (success rate, latency, confidence)
// 2. Scattering: Activity metrics (volume, tx count, unique buyers)
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/facilitator-volume-service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
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
// SCORING WEIGHTS & CONFIGURATION
// =============================================================================
/**
 * Scattering score weight (0-1)
 * Controls how much Scattering activity metrics influence the final score
 * Default: 0.2 (20%) - configurable via SCATTERING_SCORE_WEIGHT env var
 */ const SCATTERING_SCORE_WEIGHT = parseFloat(process.env.SCATTERING_SCORE_WEIGHT ?? '0.2');
/**
 * Minimum thresholds for Scattering data to be considered meaningful
 * Below these thresholds, activity is flagged as "low" and doesn't boost score
 */ const SCATTERING_MIN_TX_COUNT_3D = parseInt(process.env.SCATTERING_MIN_TX_COUNT ?? '100', 10);
const SCATTERING_MIN_VOLUME_USD_3D = parseFloat(process.env.SCATTERING_MIN_VOLUME ?? '100');
/**
 * x402scan score weight (the remainder after Scattering)
 * x402scan measures reliability (success rate, latency, confidence)
 */ const X402SCAN_SCORE_WEIGHT = 1 - SCATTERING_SCORE_WEIGHT;
/**
 * Internal weights for x402scan sub-components
 * These are applied to the x402scan portion of the score
 */ const SCORING_WEIGHTS = {
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
        // ==========================================================================
        // PART 1: x402scan reliability metrics
        // ==========================================================================
        const summary = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSummary"])(params.facilitatorId, timeframe);
        let x402scanScore = 50; // Default neutral
        let successRate = 0;
        let hoursOld = Infinity;
        let totalInvocations = 0;
        let avgLatencyMs;
        let p95LatencyMs;
        let hasX402scanData = false;
        if (summary) {
            hasX402scanData = true;
            // Calculate success rate score (0-50)
            successRate = 1 - summary.overallErrorRate;
            const successRateScore = successRate * SCORING_WEIGHTS.successRate;
            reasons.push(`success-rate:${(successRate * 100).toFixed(1)}%`);
            // Calculate latency score (0-30)
            let latencyScore = SCORING_WEIGHTS.latency;
            const p95 = summary.avgP90LatencyMs ?? summary.avgP99LatencyMs;
            if (p95 !== undefined) {
                const normalizedLatency = Math.min(p95, 2000) / 2000;
                latencyScore = (1 - normalizedLatency) * SCORING_WEIGHTS.latency;
                reasons.push(`p95-latency:${p95.toFixed(0)}ms`);
                p95LatencyMs = summary.avgP90LatencyMs;
            } else {
                latencyScore = SCORING_WEIGHTS.latency * 0.5;
                reasons.push('latency:unknown');
            }
            // Calculate volume score (0-10)
            const volumeThreshold = 1000;
            const volumeRatio = Math.min(summary.totalInvocations / volumeThreshold, 1);
            const volumeScore = volumeRatio * SCORING_WEIGHTS.volume;
            totalInvocations = summary.totalInvocations;
            reasons.push(`x402scan:${summary.totalInvocations}/${summary.totalInvocations >= 1000 ? 'high' : summary.totalInvocations >= 100 ? 'medium' : 'low'}-confidence`);
            // Calculate freshness score (0-10)
            const fetchedAt = new Date(summary.fetchedAt);
            hoursOld = (Date.now() - fetchedAt.getTime()) / (1000 * 60 * 60);
            const freshnessRatio = Math.max(0, 1 - hoursOld / 24);
            const freshnessScore = freshnessRatio * SCORING_WEIGHTS.freshness;
            x402scanScore = successRateScore + latencyScore + volumeScore + freshnessScore;
            avgLatencyMs = summary.avgP50LatencyMs;
        } else {
            reasons.push('x402scan:no-data');
        }
        // ==========================================================================
        // PART 2: Scattering activity metrics
        // ==========================================================================
        let scatteringActivityScore = 0;
        let scatteringVolume3d;
        let scatteringTxCount3d;
        let scatteringUniqueBuyers3d;
        let scatteringLowActivity = false;
        let hasScatteringData = false;
        try {
            const scattering = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getScatteringMetricsForFacilitator"])(params.facilitatorId);
            if (scattering) {
                hasScatteringData = true;
                scatteringVolume3d = scattering.volumeUsd3d;
                scatteringTxCount3d = scattering.txCount3d;
                scatteringUniqueBuyers3d = scattering.uniqueBuyers3d;
                // Check for low activity guardrail
                const isLowActivity = scattering.txCount3d < SCATTERING_MIN_TX_COUNT_3D && scattering.volumeUsd3d < SCATTERING_MIN_VOLUME_USD_3D;
                if (isLowActivity) {
                    scatteringLowActivity = true;
                    scatteringActivityScore = 0.1; // Minimal score for low activity
                    reasons.push(`scattering-low-activity:${scattering.txCount3d}tx/$${scattering.volumeUsd3d.toFixed(0)}`);
                } else {
                    // Compute normalized activity score (0-1)
                    scatteringActivityScore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeActivityScore"])(scattering);
                    reasons.push(`scattering-activity:${scatteringActivityScore.toFixed(2)}`);
                }
            } else {
                reasons.push('scattering:no-data');
            }
        } catch (error) {
            logger.debug({
                error: error instanceof Error ? error.message : 'Unknown',
                facilitatorId: params.facilitatorId,
                msg: 'Failed to fetch Scattering metrics for scoring'
            });
            reasons.push('scattering:error');
        }
        // ==========================================================================
        // PART 3: Blend x402scan and Scattering scores
        // ==========================================================================
        let finalScore;
        if (hasX402scanData && hasScatteringData) {
            // Both sources available - blend according to weights
            // x402scan score is 0-100, Scattering score is 0-1 (convert to 0-100)
            finalScore = X402SCAN_SCORE_WEIGHT * x402scanScore + SCATTERING_SCORE_WEIGHT * scatteringActivityScore * 100;
        } else if (hasX402scanData) {
            // Only x402scan - use full weight
            finalScore = x402scanScore;
        } else if (hasScatteringData) {
            // Only Scattering - convert to 0-100 scale
            finalScore = scatteringActivityScore * 100;
        } else {
            // No data - neutral score
            finalScore = 50;
        }
        // ==========================================================================
        // PART 4: Determine confidence level
        // ==========================================================================
        let confidence = 'none';
        if (hasX402scanData) {
            if (totalInvocations >= 1000 && hoursOld < 6) {
                confidence = 'high';
            } else if (totalInvocations >= 100 && hoursOld < 24) {
                confidence = 'medium';
            } else {
                confidence = 'low';
            }
        } else if (hasScatteringData && !scatteringLowActivity) {
            // Scattering-only data provides some confidence
            confidence = scatteringActivityScore > 0.5 ? 'medium' : 'low';
        }
        return {
            facilitatorId: params.facilitatorId,
            score: Math.round(finalScore),
            successRate,
            avgLatencyMs,
            p95LatencyMs,
            totalInvocations,
            dataFreshness: hoursOld,
            confidence,
            reasons,
            // Scattering fields
            scatteringActivityScore: hasScatteringData ? scatteringActivityScore : undefined,
            scatteringVolume3d,
            scatteringTxCount3d,
            scatteringUniqueBuyers3d,
            scatteringLowActivity: scatteringLowActivity || undefined
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/integrations/x402/facilitators/base-facilitator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// FACILITATOR ABSTRACTION LAYER
// =============================================================================
// Base interface and types for pluggable x402 facilitators
// Enables multi-facilitator orchestration and routing
__turbopack_context__.s([
    "BaseFacilitator",
    ()=>BaseFacilitator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'BaseFacilitator'
});
class BaseFacilitator {
    getLogger() {
        return logger.child({
            facilitator: this.constructor.name
        });
    }
    /**
   * Get pricing (default implementation returns null)
   */ async getPricing(network, asset) {
        // Default: no pricing info available
        return null;
    }
    /**
   * Check if facilitator supports network/asset/scheme
   * Enhanced to support both legacy and CAIP identifiers
   */ supports(network, asset, scheme, settlementMode) {
        if (!this.config.enabled) {
            return false;
        }
        // Check scheme support
        if (!this.config.schemes.includes(scheme)) {
            return false;
        }
        // Check settlement mode support
        if (settlementMode && this.config.settlementModes && !this.config.settlementModes.includes(settlementMode)) {
            return false;
        }
        // Check network support (legacy or CAIP)
        const supportsNetwork = this.config.networks.includes(network) || this.config.networksCAIP && this.config.networksCAIP.includes(network);
        if (!supportsNetwork) {
            return false;
        }
        // Check asset support (legacy or CAIP)
        const supportsAsset = this.config.assets.includes(asset) || this.config.assetsCAIP && this.config.assetsCAIP.includes(asset);
        return supportsAsset;
    }
    /**
   * Check if facilitator supports a CAIP-2 network identifier
   */ supportsCAIPNetwork(caip) {
        if (!this.config.enabled) {
            return false;
        }
        return this.config.networksCAIP?.includes(caip) || false;
    }
    /**
   * Check if facilitator supports a CAIP-19 asset identifier
   */ supportsCAIPAsset(caip) {
        if (!this.config.enabled) {
            return false;
        }
        return this.config.assetsCAIP?.includes(caip) || false;
    }
    /**
   * Validate payment requirements
   * Enhanced to support CAIP identifiers
   */ validateRequirements(requirements) {
        // Check network (legacy or CAIP)
        const hasNetwork = !!requirements.network || requirements.networks && requirements.networks.length > 0;
        if (!hasNetwork) {
            return {
                valid: false,
                error: 'Network is required'
            };
        }
        // Check asset (legacy or CAIP)
        const hasAsset = !!requirements.asset || requirements.assets && requirements.assets.length > 0;
        if (!hasAsset) {
            return {
                valid: false,
                error: 'Asset is required'
            };
        }
        if (!requirements.payTo) {
            return {
                valid: false,
                error: 'Recipient address (payTo) is required'
            };
        }
        if (!requirements.maxAmountRequired) {
            return {
                valid: false,
                error: 'Amount is required'
            };
        }
        // Check support (use legacy network/asset for supports() check, or check CAIP directly)
        const networkToCheck = requirements.network || requirements.networks?.[0] || '';
        const assetToCheck = requirements.asset || requirements.assets?.[0] || '';
        // Check CAIP support if CAIP identifiers are provided
        if (requirements.networks && requirements.networks.length > 0) {
            const supportsAnyNetwork = requirements.networks.some((n)=>this.supportsCAIPNetwork(n) || this.config.networks.includes(n));
            if (!supportsAnyNetwork) {
                return {
                    valid: false,
                    error: `Facilitator ${this.id} does not support any of the requested networks: ${requirements.networks.join(', ')}`
                };
            }
        }
        if (requirements.assets && requirements.assets.length > 0) {
            const supportsAnyAsset = requirements.assets.some((a)=>this.supportsCAIPAsset(a) || this.config.assets.includes(a));
            if (!supportsAnyAsset) {
                return {
                    valid: false,
                    error: `Facilitator ${this.id} does not support any of the requested assets: ${requirements.assets.join(', ')}`
                };
            }
        }
        // Check legacy support
        if (!this.supports(networkToCheck, assetToCheck, requirements.scheme, requirements.settlementMode)) {
            return {
                valid: false,
                error: `Facilitator ${this.id} does not support ${networkToCheck}/${assetToCheck}/${requirements.scheme}`
            };
        }
        return {
            valid: true
        };
    }
}
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/src/integrations/x402/cdp-jwt.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CDPJWTGenerator",
    ()=>CDPJWTGenerator,
    "getCDPJWTGenerator",
    ()=>getCDPJWTGenerator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$cdp$2d$sdk$2f$_esm$2f$auth$2f$utils$2f$jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/cdp-sdk/_esm/auth/utils/jwt.js [app-route] (ecmascript)");
;
class CDPJWTGenerator {
    apiKeyId;
    apiKeySecret;
    constructor(apiKeyId, apiKeySecret){
        this.apiKeyId = apiKeyId;
        this.apiKeySecret = apiKeySecret;
    }
    /**
   * Generate JWT token for CDP API authentication.
   *
   * Uses CDP SDK's generateJwt helper, which signs with the correct
   * algorithm (ES256/EdDSA) for your CDP API key.
   * 
   * @param requestMethod - HTTP method (GET, POST, etc.) or null for generic auth
   * @param requestHost - Request host or null
   * @param requestPath - Request path or null
   */ async generateToken(requestMethod = null, requestHost = null, requestPath = null) {
        // For REST requests, CDP expects method/host/path
        // For generic facilitator auth, nulls are allowed
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$cdp$2d$sdk$2f$_esm$2f$auth$2f$utils$2f$jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateJwt"])({
            apiKeyId: this.apiKeyId,
            apiKeySecret: this.apiKeySecret,
            requestMethod: requestMethod || null,
            requestHost: requestHost || null,
            requestPath: requestPath || null,
            expiresIn: 120
        });
        return token;
    }
    isTokenValid(_token) {
        // Keep simple: rely on short expiry and CDP errors instead of local decode.
        return true;
    }
}
// Singleton instance
let jwtGenerator = null;
function getCDPJWTGenerator() {
    if (!jwtGenerator) {
        const apiKeyId = process.env.CDP_API_KEY_ID;
        const apiKeySecret = process.env.CDP_API_KEY_SECRET;
        if (!apiKeyId || !apiKeySecret) {
            throw new Error('CDP_API_KEY_ID and CDP_API_KEY_SECRET must be set');
        }
        jwtGenerator = new CDPJWTGenerator(apiKeyId, apiKeySecret);
    }
    return jwtGenerator;
}
}),
"[project]/src/integrations/x402/signature-verifier.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "validatePaymentAuthorization",
    ()=>validatePaymentAuthorization,
    "verifyPaymentSignature",
    ()=>verifyPaymentSignature
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$verifyTypedData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/signature/verifyTypedData.js [app-route] (ecmascript)");
;
async function verifyPaymentSignature(signature, authorization, signerAddress, chainId = 8453, asset// Token contract address (optional, defaults to USDC)
) {
    try {
        // EIP-3009 domain for USDC on Base (per official @x402/evm SDK)
        // The domain comes from the token contract itself
        const domain = {
            name: 'USD Coin',
            version: '2',
            chainId,
            verifyingContract: asset || '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
        };
        // EIP-3009 TransferWithAuthorization types
        const types = {
            TransferWithAuthorization: [
                {
                    name: 'from',
                    type: 'address'
                },
                {
                    name: 'to',
                    type: 'address'
                },
                {
                    name: 'value',
                    type: 'uint256'
                },
                {
                    name: 'validAfter',
                    type: 'uint256'
                },
                {
                    name: 'validBefore',
                    type: 'uint256'
                },
                {
                    name: 'nonce',
                    type: 'bytes32'
                }
            ]
        };
        // Verify the signature
        const isValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$verifyTypedData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyTypedData"])({
            address: signerAddress,
            domain,
            types,
            primaryType: 'TransferWithAuthorization',
            message: authorization,
            signature: signature
        });
        return isValid;
    } catch (error) {
        console.error('[SignatureVerifier] Verification error:', error);
        return false;
    }
}
function validatePaymentAuthorization(authorization) {
    const now = Math.floor(Date.now() / 1000);
    const validAfter = parseInt(authorization.validAfter);
    const validBefore = parseInt(authorization.validBefore);
    if (now < validAfter) {
        return {
            valid: false,
            error: 'Payment not yet valid'
        };
    }
    if (now >= validBefore) {
        return {
            valid: false,
            error: 'Payment has expired'
        };
    }
    if (!authorization.from || !authorization.to) {
        return {
            valid: false,
            error: 'Missing from or to address'
        };
    }
    if (!authorization.value || BigInt(authorization.value) <= BigInt(0)) {
        return {
            valid: false,
            error: 'Invalid payment amount'
        };
    }
    if (!authorization.nonce) {
        return {
            valid: false,
            error: 'Missing nonce'
        };
    }
    return {
        valid: true
    };
}
}),
"[project]/src/integrations/x402/amount-utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// AMOUNT UTILITIES
// =============================================================================
// Helper functions for converting between human-readable amounts and atomic units
/**
 * Convert human-readable amount to atomic units
 * 
 * For USDC on Base: 1 USDC = 1,000,000 atomic units (6 decimals)
 * 
 * @param humanAmount - Human-readable amount (e.g., "1" for 1 USDC)
 * @param decimals - Number of decimals (default: 6 for USDC)
 * @returns Atomic units as string (e.g., "1000000" for 1 USDC)
 * 
 * @example
 * toAtomicUnits("1", 6) // "1000000"
 * toAtomicUnits("0.5", 6) // "500000"
 * toAtomicUnits("1.5", 6) // "1500000"
 */ __turbopack_context__.s([
    "fromAtomicUnits",
    ()=>fromAtomicUnits,
    "normalizeNetwork",
    ()=>normalizeNetwork,
    "toAtomicUnits",
    ()=>toAtomicUnits
]);
function toAtomicUnits(humanAmount, decimals = 6) {
    // Remove any whitespace
    const cleanAmount = humanAmount.trim();
    // Parse as decimal number
    const amount = parseFloat(cleanAmount);
    if (isNaN(amount) || amount < 0) {
        throw new Error(`Invalid amount: ${humanAmount}`);
    }
    // Convert to atomic units: multiply by 10^decimals
    const atomicUnits = BigInt(Math.floor(amount * Math.pow(10, decimals)));
    // Return as string
    return atomicUnits.toString();
}
function fromAtomicUnits(atomicUnits, decimals = 6) {
    const atomic = BigInt(atomicUnits);
    const divisor = BigInt(Math.pow(10, decimals));
    const whole = atomic / divisor;
    const remainder = atomic % divisor;
    if (remainder === BigInt(0)) {
        return whole.toString();
    }
    // Format with proper decimal places
    const remainderStr = remainder.toString().padStart(decimals, '0');
    const trimmed = remainderStr.replace(/0+$/, '');
    return `${whole}.${trimmed}`;
}
function normalizeNetwork(network) {
    // If already in CAIP format, return as-is
    if (network.includes(':')) {
        return network;
    }
    // Map common network names to CAIP-2 format
    const networkMap = {
        'base': 'eip155:8453',
        'ethereum': 'eip155:1',
        'polygon': 'eip155:137',
        'arbitrum': 'eip155:42161',
        'optimism': 'eip155:10',
        'avalanche': 'eip155:43114',
        'bnb': 'eip155:56'
    };
    const normalized = networkMap[network.toLowerCase()];
    if (normalized) {
        return normalized;
    }
    // If not found, assume it's already in the correct format or return as-is
    return network;
}
}),
"[project]/src/lib/cdp-client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// CDP/x402 Client Wrapper
// =============================================================================
// Wraps all calls to Coinbase/CDP/x402 with normalized error handling
// and structured logging
__turbopack_context__.s([
    "CDPError",
    ()=>CDPError,
    "CDPErrorCode",
    ()=>CDPErrorCode,
    "addRequestIdToCDPHeaders",
    ()=>addRequestIdToCDPHeaders,
    "callCDP",
    ()=>callCDP
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'CDPClient'
});
var CDPErrorCode = /*#__PURE__*/ function(CDPErrorCode) {
    CDPErrorCode["CDP_TIMEOUT"] = "CDP_TIMEOUT";
    CDPErrorCode["CDP_4XX"] = "CDP_4XX";
    CDPErrorCode["CDP_5XX"] = "CDP_5XX";
    CDPErrorCode["CDP_INVALID_RESPONSE"] = "CDP_INVALID_RESPONSE";
    CDPErrorCode["CDP_NETWORK_ERROR"] = "CDP_NETWORK_ERROR";
    CDPErrorCode["CDP_AUTH_ERROR"] = "CDP_AUTH_ERROR";
    CDPErrorCode["CDP_RATE_LIMIT"] = "CDP_RATE_LIMIT";
    CDPErrorCode["CDP_UNKNOWN_ERROR"] = "CDP_UNKNOWN_ERROR";
    return CDPErrorCode;
}({});
class CDPError extends Error {
    code;
    statusCode;
    cdpErrorId;
    responseBody;
    constructor(code, message, statusCode, cdpErrorId, responseBody){
        super(message), this.code = code, this.statusCode = statusCode, this.cdpErrorId = cdpErrorId, this.responseBody = responseBody;
        this.name = 'CDPError';
        // Ensure stack trace is captured
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CDPError);
        }
    }
}
/**
 * Normalize HTTP status code to CDP error code
 */ function normalizeErrorCode(statusCode) {
    if (!statusCode) {
        return "CDP_UNKNOWN_ERROR";
    }
    if (statusCode >= 500) {
        return "CDP_5XX";
    }
    if (statusCode === 401 || statusCode === 403) {
        return "CDP_AUTH_ERROR";
    }
    if (statusCode === 429) {
        return "CDP_RATE_LIMIT";
    }
    if (statusCode >= 400) {
        return "CDP_4XX";
    }
    return "CDP_UNKNOWN_ERROR";
}
/**
 * Extract safe excerpt from response body for logging
 * Removes sensitive data and truncates long responses
 */ function extractSafeResponseExcerpt(body, maxLength = 500) {
    if (!body) return '';
    try {
        const str = typeof body === 'string' ? body : JSON.stringify(body);
        if (str.length <= maxLength) {
            return str;
        }
        return str.substring(0, maxLength) + '... [truncated]';
    } catch  {
        return '[unable to serialize response]';
    }
}
async function callCDP(operation, requestFn, context) {
    const startTime = Date.now();
    const logContext = {
        requestId: context.requestId,
        apiKeyId: context.apiKeyId,
        endpoint: context.endpointId,
        cdpStatus: 'pending'
    };
    try {
        logger.debug({
            ...logContext,
            operation,
            targetUrl: context.targetUrl
        }, `CDP call: ${operation}`);
        const response = await requestFn();
        const duration = Date.now() - startTime;
        // Extract response body safely
        let responseBody = null;
        let responseText = '';
        try {
            responseText = await response.text();
            if (responseText) {
                responseBody = JSON.parse(responseText);
            }
        } catch  {
            // Response might not be JSON, that's okay
            responseBody = responseText;
        }
        // Check if response is successful
        if (!response.ok) {
            const errorCode = normalizeErrorCode(response.status);
            const cdpErrorId = responseBody?.error?.id || responseBody?.errorId || response.headers.get('x-request-id');
            const errorMessage = responseBody?.error?.message || responseBody?.message || `CDP API error: ${response.statusText}`;
            const error = new CDPError(errorCode, errorMessage, response.status, cdpErrorId, responseBody);
            // Log structured error
            logger.error({
                ...logContext,
                operation,
                targetUrl: context.targetUrl,
                errorCode: error.code,
                cdpErrorId: error.cdpErrorId,
                statusCode: response.status,
                durationMs: duration,
                responseExcerpt: extractSafeResponseExcerpt(responseBody)
            }, `CDP call failed: ${operation}`);
            throw error;
        }
        // Log successful call
        logger.info({
            ...logContext,
            operation,
            targetUrl: context.targetUrl,
            cdpStatus: 'success',
            statusCode: response.status,
            durationMs: duration
        }, `CDP call succeeded: ${operation}`);
        return responseBody;
    } catch (error) {
        const duration = Date.now() - startTime;
        // Handle network errors
        if (error instanceof TypeError && error.message.includes('fetch')) {
            const cdpError = new CDPError("CDP_NETWORK_ERROR", `Network error calling CDP: ${error.message}`, undefined, undefined, undefined);
            logger.error({
                ...logContext,
                operation,
                targetUrl: context.targetUrl,
                errorCode: cdpError.code,
                durationMs: duration,
                error: error
            }, `CDP network error: ${operation}`);
            throw cdpError;
        }
        // Handle timeout errors
        if (error instanceof Error && (error.message.includes('timeout') || error.message.includes('aborted'))) {
            const cdpError = new CDPError("CDP_TIMEOUT", `CDP call timed out: ${operation}`, undefined, undefined, undefined);
            logger.error({
                ...logContext,
                operation,
                targetUrl: context.targetUrl,
                errorCode: cdpError.code,
                durationMs: duration,
                error: error
            }, `CDP timeout: ${operation}`);
            throw cdpError;
        }
        // Re-throw CDPError as-is
        if (error instanceof CDPError) {
            throw error;
        }
        // Wrap unknown errors
        const cdpError = new CDPError("CDP_UNKNOWN_ERROR", `Unknown error calling CDP: ${error instanceof Error ? error.message : String(error)}`, undefined, undefined, undefined);
        logger.error({
            ...logContext,
            operation,
            targetUrl: context.targetUrl,
            errorCode: cdpError.code,
            durationMs: duration,
            error: error
        }, `CDP unknown error: ${operation}`);
        throw cdpError;
    }
}
function addRequestIdToCDPHeaders(headers, requestId) {
    const headersObj = headers instanceof Headers ? Object.fromEntries(headers.entries()) : Array.isArray(headers) ? Object.fromEntries(headers) : headers;
    if (requestId) {
        return {
            ...headersObj,
            'x-request-id': requestId
        };
    }
    return headersObj;
}
}),
"[project]/src/integrations/x402/cdp-facilitator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CDPFacilitator",
    ()=>CDPFacilitator,
    "getCDPFacilitator",
    ()=>getCDPFacilitator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$cdp$2d$jwt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/cdp-jwt.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$signature$2d$verifier$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/signature-verifier.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/amount-utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cdp$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cdp-client.ts [app-route] (ecmascript)");
;
;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'CDPFacilitator'
});
class CDPFacilitator {
    apiKeyId;
    facilitatorUrl;
    jwtGenerator;
    cachedToken = null;
    tokenExpiry = 0;
    constructor(apiKeyId, facilitatorUrl = 'https://api.cdp.coinbase.com/platform/v2/x402'){
        this.apiKeyId = apiKeyId;
        this.facilitatorUrl = facilitatorUrl;
        this.jwtGenerator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$cdp$2d$jwt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCDPJWTGenerator"])();
    }
    /**
   * Generate JWT token for CDP API authentication
   * Uses cached token if still valid, otherwise generates new one
   * 
   * @param requestMethod - HTTP method for REST calls (optional)
   * @param requestPath - Request path for REST calls (optional)
   */ async generateJWT(requestMethod = null, requestPath = null) {
        const now = Date.now();
        // For REST calls with specific method/path, don't cache (must be request-specific)
        if (requestMethod && requestPath) {
            const url = new URL(this.facilitatorUrl);
            return await this.jwtGenerator.generateToken(requestMethod, url.host, requestPath);
        }
        // Return cached token if still valid (with 10 second buffer) - for generic auth
        if (this.cachedToken && this.tokenExpiry > now + 10000) {
            return this.cachedToken;
        }
        // Generate new token for generic facilitator auth
        const token = await this.jwtGenerator.generateToken(null, null, null);
        this.cachedToken = token;
        this.tokenExpiry = now + 120000; // 2 minutes expiry
        return token;
    }
    /**
   * Call CDP /verify endpoint with retry logic for transient errors
   * 
   * Retries on: 429 (rate limit), 500-504 (server errors), network timeouts
   * Does NOT retry on: 400 (invalid_request), 401 (unauthorized), other 4xx
   * 
   * Returns normalized result with success, valid, status, errorType, errorMessage, etc.
   */ async callCdpVerifyWithRetries(verifyBody, isProbe, headers) {
        const url = new URL('https://api.cdp.coinbase.com/platform/v2/x402/verify');
        const maxRetries = 3;
        const retryableStatuses = [
            429,
            500,
            502,
            503,
            504
        ];
        const startTime = Date.now();
        for(let attempt = 0; attempt < maxRetries; attempt++){
            try {
                const response = await fetch(url.toString(), {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(verifyBody),
                    signal: AbortSignal.timeout(10000)
                });
                const text = await response.text();
                const data = text ? JSON.parse(text) : {};
                const latencyMs = Date.now() - startTime;
                // Success case
                if (response.ok && data.isValid) {
                    return {
                        success: true,
                        valid: true,
                        status: response.status,
                        isRateLimited: false,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Check if retryable error
                const isRetryable = retryableStatuses.includes(response.status);
                const isRateLimit = response.status === 429;
                // If not retryable or last attempt, return error
                if (!isRetryable || attempt === maxRetries - 1) {
                    const errorMessage = data.errorMessage || data.error || data.invalidReason || `HTTP ${response.status}`;
                    const errorType = data.errorType || data.code || (isRateLimit ? 'rate_limit' : 'CDP_VERIFY_FAILED');
                    return {
                        success: false,
                        valid: false,
                        status: response.status,
                        errorType,
                        errorMessage,
                        isRateLimited: isRateLimit,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Retry with exponential backoff
                const delay = 100 * Math.pow(2, attempt); // 100ms, 200ms, 400ms
                logger.info({
                    component: 'CDPFacilitator',
                    attempt: attempt + 1,
                    maxRetries,
                    status: response.status,
                    delay,
                    isProbe,
                    msg: 'Retrying CDP verification after transient error'
                });
                await new Promise((resolve)=>setTimeout(resolve, delay));
            } catch (error) {
                const latencyMs = Date.now() - startTime;
                const isTimeout = error?.name === 'AbortError' || error?.message?.toLowerCase().includes('timeout');
                const isNetworkError = error?.message?.toLowerCase().includes('network') || error?.message?.toLowerCase().includes('fetch') || error?.message?.toLowerCase().includes('econnrefused');
                // If network error and not last attempt, retry
                if ((isTimeout || isNetworkError) && attempt < maxRetries - 1) {
                    const delay = 100 * Math.pow(2, attempt);
                    logger.info({
                        component: 'CDPFacilitator',
                        attempt: attempt + 1,
                        maxRetries,
                        error: error?.message,
                        delay,
                        isProbe,
                        msg: 'Retrying CDP verification after network error'
                    });
                    await new Promise((resolve)=>setTimeout(resolve, delay));
                    continue;
                }
                // Last attempt or non-network error
                return {
                    success: false,
                    valid: false,
                    status: 0,
                    errorType: isTimeout ? 'timeout' : isNetworkError ? 'network_error' : 'CDP_VERIFY_FAILED',
                    errorMessage: error?.message || 'CDP verification failed',
                    isRateLimited: false,
                    isNetworkError: isTimeout || isNetworkError,
                    latencyMs
                };
            }
        }
        // Should never reach here, but TypeScript needs a return
        return {
            success: false,
            valid: false,
            status: 0,
            errorType: 'CDP_VERIFY_FAILED',
            errorMessage: 'Max retries exceeded',
            isRateLimited: false,
            isNetworkError: false,
            latencyMs: Date.now() - startTime
        };
    }
    /**
   * Verify payment with CDP facilitator API
   * 
   * This method:
   * 1. Validates payment authorization fields locally
   * 2. Optionally verifies EIP-712 signature locally
   * 3. Calls CDP API for on-chain verification with retry logic
   * 4. Returns verification result with KYT/OFAC status
   */ async verifyPayment(request) {
        const start = Date.now();
        try {
            // Step 1: Parse payment header to extract paymentPayload (build from decoded JSON)
            // For probe mode, we need to decode the base64 payment header and build the payload
            let paymentPayload;
            let parsedPayment;
            try {
                const { parseX402Header } = await __turbopack_context__.A("[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript, async loader)");
                const parseResult = parseX402Header(request.payment);
                if (parseResult.valid && parseResult.parsed) {
                    parsedPayment = parseResult.parsed;
                    // Build paymentPayload from decoded payment JSON
                    // Note: parsedPayment.network might be legacy format (e.g., "8453" or "base")
                    // CDP requires CAIP-2 format (e.g., "eip155:8453"), so normalize it
                    const parsedNetwork = parsedPayment.network || request.paymentPayload.network;
                    const normalizedParsedNetwork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(parsedNetwork);
                    paymentPayload = {
                        x402Version: 1,
                        scheme: 'x402',
                        network: normalizedParsedNetwork,
                        payload: {
                            signature: parsedPayment.signature,
                            authorization: parsedPayment.authorization
                        }
                    };
                } else {
                    // Fallback to request.paymentPayload if parsing fails
                    paymentPayload = request.paymentPayload;
                }
            } catch (parseError) {
                logger.warn({
                    error: parseError
                }, 'Failed to parse payment header, using request.paymentPayload');
                paymentPayload = request.paymentPayload;
            }
            // Step 2: Validate payment authorization fields locally
            const authValidation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$signature$2d$verifier$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validatePaymentAuthorization"])(paymentPayload.payload.authorization);
            if (!authValidation.valid) {
                return {
                    success: false,
                    valid: false,
                    error: authValidation.error || 'Invalid payment authorization'
                };
            }
            // Step 3: Extract authorization for use throughout
            const auth = paymentPayload.payload.authorization;
            const signature = paymentPayload.payload.signature;
            // Step 4: Detect probe mode and skip local signature verification for probes
            // Probe mode is detected by checking if signature is all zeros (dummy signature)
            const isDummySignature = signature === '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' || signature === '0x' + '0'.repeat(128);
            const isProbe = isDummySignature || auth.from === '0x0000000000000000000000000000000000000000';
            // Step 4: Optionally verify signature locally (additional security layer)
            // Note: CDP will also verify, but local check catches issues early
            // Skip local verification for probe mode to avoid viem errors with dummy signatures
            if (isProbe) {
                logger.warn({
                    component: 'CDPFacilitator',
                    isProbe: true,
                    msg: 'Skipping local signature verification for probe payload'
                });
            } else {
                try {
                    const signatureValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$signature$2d$verifier$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyPaymentSignature"])(signature, auth, auth.from);
                    if (!signatureValid) {
                        logger.warn('Local signature verification failed, but continuing to CDP');
                    // Don't fail here - let CDP make the final decision
                    }
                } catch (sigError) {
                    logger.warn({
                        error: sigError
                    }, 'Signature verification error, continuing to CDP');
                // Continue to CDP verification
                }
            }
            // Step 5: Use paymentRequirements from request (must be provided by caller)
            // CDP requires paymentRequirements that match the challenge
            // For probe mode, build minimal valid paymentRequirements if missing
            let finalPaymentRequirements = request.paymentRequirements;
            if (!finalPaymentRequirements || !finalPaymentRequirements.to && !finalPaymentRequirements?.payTo) {
                // If in probe mode, build minimal valid paymentRequirements
                if (isProbe) {
                    logger.info({
                        component: 'CDPFacilitator',
                        isProbe: true,
                        msg: 'Building minimal paymentRequirements for probe mode'
                    });
                    // Extract network from paymentPayload (built from decoded payment)
                    // paymentPayload.network should already be in CAIP-2 format from normalization above
                    // If not, normalize it to ensure CAIP-2 format
                    const network = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(paymentPayload.network || 'eip155:8453');
                    // USDC contract address on Base
                    const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
                    // Test receiver address for probes
                    const PROBE_RECEIVER = '0x0000000000000000000000000000000000000001';
                    const now = Math.floor(Date.now() / 1000);
                    // Build minimal valid paymentRequirements for probe
                    // CDP requires 'exact' scheme for EVM fixed-amount flows
                    // CDP requires CAIP-2 format (e.g., "eip155:8453") for network
                    finalPaymentRequirements = {
                        scheme: 'exact',
                        network: network,
                        to: PROBE_RECEIVER,
                        payTo: PROBE_RECEIVER,
                        value: '1000000',
                        maxAmountRequired: '1000000',
                        resource: `https://probe.nexflow.dev/health/cdp/${network}/USDC`,
                        asset: USDC_BASE,
                        description: 'Health probe for CDP',
                        mimeType: 'application/json',
                        validAfter: now.toString(),
                        validBefore: (now + 300).toString(),
                        maxTimeoutSeconds: 300,
                        // EIP-712 domain info required for EVM networks (USDC on Base)
                        extra: {
                            name: 'USD Coin',
                            version: '2'
                        }
                    };
                    logger.info({
                        component: 'CDPFacilitator',
                        isProbe: true,
                        hasPaymentRequirements: true,
                        network: network,
                        asset: USDC_BASE,
                        msg: 'Built probe paymentRequirements'
                    });
                } else {
                    // Not probe mode and missing paymentRequirements - error
                    logger.error({
                        hasPaymentRequirements: !!request.paymentRequirements,
                        paymentRequirements: request.paymentRequirements,
                        isProbe: false
                    }, 'Missing paymentRequirements');
                    return {
                        success: false,
                        valid: false,
                        error: 'paymentRequirements must be provided for CDP verification'
                    };
                }
            }
            // Normalize paymentRequirements to CDP's expected format
            // CDP expects: scheme, network, to, value, resource, validAfter, validBefore, asset
            // Remove any fields that CDP doesn't expect (payer, maxTimeoutSeconds, description, mimeType might be optional)
            // Ensure network is in CAIP-2 format (CDP requires this)
            const paymentRequirementsNetwork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(finalPaymentRequirements?.network || paymentPayload.network || 'eip155:8453');
            const paymentRequirements = {
                scheme: finalPaymentRequirements?.scheme || 'exact',
                network: paymentRequirementsNetwork,
                // Convert legacy field names to CDP format
                to: finalPaymentRequirements?.to || finalPaymentRequirements?.payTo || auth.to,
                value: finalPaymentRequirements?.value || finalPaymentRequirements?.maxAmountRequired || auth.value,
                // Ensure validity window is included
                validAfter: finalPaymentRequirements?.validAfter || auth.validAfter,
                validBefore: finalPaymentRequirements?.validBefore || auth.validBefore,
                // Required fields - ensure they exist
                resource: finalPaymentRequirements?.resource,
                asset: finalPaymentRequirements?.asset,
                // Optional fields (only include if present)
                ...finalPaymentRequirements?.description && {
                    description: finalPaymentRequirements.description
                },
                ...finalPaymentRequirements?.mimeType && {
                    mimeType: finalPaymentRequirements.mimeType
                },
                ...finalPaymentRequirements?.maxTimeoutSeconds && {
                    maxTimeoutSeconds: finalPaymentRequirements.maxTimeoutSeconds
                },
                // EIP-712 domain info required for EVM signature verification
                ...finalPaymentRequirements?.extra && {
                    extra: finalPaymentRequirements.extra
                }
            };
            // Validate that required fields are present
            // In probe mode, we already built complete requirements, so this should not fail
            if (!paymentRequirements.resource || !paymentRequirements.asset) {
                // If in probe mode and still missing fields, build them
                if (isProbe) {
                    // Normalize network to CAIP-2 format
                    const network = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(paymentPayload.network || 'eip155:8453');
                    const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
                    if (!paymentRequirements.resource) {
                        paymentRequirements.resource = `https://probe.nexflow.dev/health/cdp/${network}/USDC`;
                    }
                    if (!paymentRequirements.asset) {
                        paymentRequirements.asset = USDC_BASE;
                    }
                    // Ensure network is in CAIP-2 format
                    if (!paymentRequirements.network || !paymentRequirements.network.includes(':')) {
                        paymentRequirements.network = network;
                    }
                    logger.info({
                        component: 'CDPFacilitator',
                        isProbe: true,
                        msg: 'Completed missing resource/asset fields for probe mode'
                    });
                } else {
                    // Not probe mode - error
                    logger.error({
                        hasResource: !!paymentRequirements.resource,
                        hasAsset: !!paymentRequirements.asset,
                        paymentRequirements: request.paymentRequirements,
                        isProbe: false
                    }, 'Missing required paymentRequirements fields (resource or asset)');
                    return {
                        success: false,
                        valid: false,
                        error: 'paymentRequirements must include resource and asset'
                    };
                }
            }
            // Step 5: Parse payment header to check for transaction hash
            // CDP may require transaction hash for on-chain verification
            let txHash;
            try {
                const { parseX402Header } = await __turbopack_context__.A("[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript, async loader)");
                const parsed = parseX402Header(request.payment);
                if (parsed.valid && parsed.parsed?.txHash) {
                    txHash = parsed.parsed.txHash;
                    logger.debug({
                        txHash
                    }, 'Found transaction hash in payment header');
                }
            } catch (error) {
                logger.warn({
                    error
                }, 'Failed to parse payment header for txHash');
            }
            // Step 6: Construct request body matching CDP x402 v2 schema exactly
            // CDP v2 schema per docs: https://docs.cdp.coinbase.com/api-reference/v2/rest-api/x402-facilitator/verify-a-payment
            // 
            // CDP Requirements for USDC on Base:
            // - 1 USDC = 1,000,000 atomic units (6 decimals)
            // - network must be "eip155:8453" (not "base")
            // - value and maxAmountRequired must be strings of atomic units
            // Normalize network to CAIP-2 format (e.g., "base" -> "eip155:8453")
            const normalizedNetwork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(paymentPayload.network || paymentRequirements.network || 'base');
            // Convert authorization.value to atomic units if needed
            // auth.value might already be in atomic units (string), or might be human-readable
            // For now, assume it's already in atomic units if it's a large number string
            // If it looks like a human amount (small number), convert it
            let authorizationValue;
            const authValueStr = String(auth.value);
            const authValueNum = parseFloat(authValueStr);
            // If the value is less than 1000, assume it's human-readable (e.g., "1" = 1 USDC)
            // Otherwise, assume it's already in atomic units
            if (authValueNum < 1000 && authValueNum > 0) {
                // Convert human amount to atomic units
                authorizationValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toAtomicUnits"])(authValueStr, 6);
                logger.debug({
                    original: authValueStr,
                    converted: authorizationValue
                }, 'Converted human amount to atomic units');
            } else {
                // Already in atomic units, ensure it's a string
                authorizationValue = authValueStr;
            }
            // Convert maxAmountRequired to atomic units if needed
            const maxAmountRaw = paymentRequirements.value || paymentRequirements.maxAmountRequired || authorizationValue;
            const maxAmountStr = String(maxAmountRaw);
            const maxAmountNum = parseFloat(maxAmountStr);
            let maxAmountRequired;
            if (maxAmountNum < 1000 && maxAmountNum > 0) {
                // Convert human amount to atomic units
                maxAmountRequired = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toAtomicUnits"])(maxAmountStr, 6);
                logger.debug({
                    original: maxAmountStr,
                    converted: maxAmountRequired
                }, 'Converted maxAmountRequired to atomic units');
            } else {
                // Already in atomic units, ensure it's a string
                maxAmountRequired = maxAmountStr;
            }
            // Ensure both are strings and digit-only (atomic units)
            if (!/^[0-9]+$/.test(authorizationValue) || !/^[0-9]+$/.test(maxAmountRequired)) {
                const error = new Error('Amount fields must be digit-only strings in atomic units');
                logger.error({
                    authorizationValue,
                    maxAmountRequired,
                    authorizationValueType: typeof authorizationValue,
                    maxAmountRequiredType: typeof maxAmountRequired
                }, 'Amount validation failed');
                throw error;
            }
            // Log the final values being sent
            logger.debug({
                network: normalizedNetwork,
                authorizationValue,
                maxAmountRequired,
                payTo: paymentRequirements.to || paymentRequirements.payTo
            }, 'CDP verify request payload (amounts in atomic units)');
            // Build paymentRequirements object matching CDP's x402 /verify schema
            // CDP expects: scheme, network, payTo, maxAmountRequired, resource, asset, description, mimeType, maxTimeoutSeconds
            // For EVM networks, scheme should be 'exact', network can be CAIP-2 format (eip155:8453)
            const paymentRequirementsBody = {
                scheme: paymentRequirements.scheme || 'exact',
                network: normalizedNetwork,
                payTo: paymentRequirements.to || paymentRequirements.payTo || '',
                maxAmountRequired: maxAmountRequired,
                resource: paymentRequirements.resource || '',
                asset: paymentRequirements.asset || '',
                description: paymentRequirements.description || 'x402 Payment Verification',
                mimeType: paymentRequirements.mimeType || 'application/json',
                maxTimeoutSeconds: paymentRequirements.maxTimeoutSeconds || 300
            };
            // Add optional fields only if they exist
            if (paymentRequirements.validAfter) {
                paymentRequirementsBody.validAfter = paymentRequirements.validAfter;
            }
            if (paymentRequirements.validBefore) {
                paymentRequirementsBody.validBefore = paymentRequirements.validBefore;
            }
            if (paymentRequirements.outputSchema) {
                paymentRequirementsBody.outputSchema = paymentRequirements.outputSchema;
            }
            if (paymentRequirements.extra) {
                paymentRequirementsBody.extra = paymentRequirements.extra;
            }
            // Parse payment header to extract the payment payload
            let paymentHeaderString = request.payment;
            if (paymentHeaderString.startsWith('x402 ')) {
                paymentHeaderString = paymentHeaderString.slice(5);
            }
            // Decode and parse the payment header
            let parsedPaymentPayload;
            try {
                const decoded = Buffer.from(paymentHeaderString, 'base64').toString('utf-8');
                parsedPaymentPayload = JSON.parse(decoded);
            } catch (parseError) {
                logger.error({
                    error: parseError
                }, 'Failed to parse payment header for CDP request');
                return {
                    success: false,
                    valid: false,
                    error: 'Invalid payment header format'
                };
            }
            // Convert CAIP-2 network (eip155:8453) to legacy format (base) for CDP
            const legacyNetworkMap = {
                'eip155:8453': 'base',
                'eip155:84532': 'base-sepolia',
                'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'solana',
                'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1': 'solana-devnet'
            };
            const legacyNetwork = legacyNetworkMap[normalizedNetwork] || normalizedNetwork.replace('eip155:', '');
            // Build request body matching CDP's x402 /verify schema
            // CDP expects legacy network format ('base', not 'eip155:8453')
            const verifyBody = {
                x402Version: 1,
                paymentPayload: {
                    x402Version: 1,
                    scheme: 'exact',
                    network: legacyNetwork,
                    payload: {
                        signature: parsedPaymentPayload.signature,
                        authorization: parsedPaymentPayload.authorization
                    }
                },
                paymentRequirements: {
                    scheme: paymentRequirementsBody.scheme || 'exact',
                    network: legacyNetwork,
                    // CDP expects 'maxAmountRequired' for the amount field
                    maxAmountRequired: paymentRequirementsBody.maxAmountRequired || paymentRequirementsBody.amount,
                    resource: paymentRequirementsBody.resource,
                    description: paymentRequirementsBody.description || 'x402 payment verification',
                    mimeType: paymentRequirementsBody.mimeType || 'application/json',
                    // CDP expects 'payTo' for the recipient address
                    payTo: paymentRequirementsBody.payTo || paymentRequirementsBody.recipient,
                    maxTimeoutSeconds: paymentRequirementsBody.maxTimeoutSeconds || 300,
                    // CDP expects asset contract address, not symbol
                    asset: paymentRequirementsBody.asset,
                    // EIP-712 domain info required for EVM signature verification
                    ...paymentRequirementsBody.extra && {
                        extra: paymentRequirementsBody.extra
                    }
                }
            };
            // Log request details before sending
            logger.info({
                component: "CDPFacilitator",
                isProbe,
                network: paymentRequirementsBody.network,
                asset: paymentRequirementsBody.asset,
                hasPaymentHeader: typeof paymentHeaderString === "string" && paymentHeaderString.length > 0,
                paymentHeaderPreview: paymentHeaderString.slice(0, 60),
                msg: "Sending CDP /verify request"
            });
            // DEBUG: Log full payload for troubleshooting CDP rejection
            logger.info({
                component: "CDPFacilitator",
                debug: true,
                fullPaymentPayload: {
                    x402Version: verifyBody.paymentPayload.x402Version,
                    scheme: verifyBody.paymentPayload.scheme,
                    network: verifyBody.paymentPayload.network,
                    hasSignature: !!verifyBody.paymentPayload.payload.signature,
                    signaturePreview: verifyBody.paymentPayload.payload.signature?.slice(0, 20),
                    authorization: verifyBody.paymentPayload.payload.authorization
                },
                fullPaymentRequirements: verifyBody.paymentRequirements,
                parsedPayloadKeys: Object.keys(parsedPaymentPayload || {}),
                msg: "CDP verify request full payload"
            });
            // TODO: CDP Support Mode - Add optional enhanced logging for non-production
            // When CDP_SUPPORT_MODE=true, log full request/response for debugging with CDP support
            // if (process.env.CDP_SUPPORT_MODE === 'true' && process.env.NODE_ENV !== 'production') {
            //   logger.debug({ fullRequestBody: verifyBody, fullPaymentRequirements: paymentRequirementsBody }, 'CDP Support Mode: Full request details');
            // }
            // Note: Transaction hash is included in the paymentHeader string itself
            // CDP will extract it from the payment header, so we don't need to add it separately
            if (txHash) {
                logger.debug({
                    txHash
                }, 'Transaction hash is included in paymentHeader');
            }
            // Step 5: Generate JWT token for CDP API
            const url = new URL('https://api.cdp.coinbase.com/platform/v2/x402/verify');
            const token = await this.generateJWT('POST', url.pathname);
            // Log request details (without sensitive data)
            logger.debug({
                url: url.toString(),
                x402Version: verifyBody.x402Version,
                paymentPayload: {
                    x402Version: verifyBody.paymentPayload.x402Version,
                    scheme: verifyBody.paymentPayload.scheme,
                    network: verifyBody.paymentPayload.network,
                    hasSignature: !!verifyBody.paymentPayload.payload.signature,
                    hasAuthorization: !!verifyBody.paymentPayload.payload.authorization
                },
                paymentRequirements: verifyBody.paymentRequirements,
                isProbe: isProbe
            }, 'Sending verification request to CDP');
            // Step 6: Call CDP API with retry logic
            // Extract request ID from context if available (passed via verifyPaymentWithRetry)
            const requestId = request.requestId;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-CDP-API-Key': this.apiKeyId
            };
            // Add request ID to CDP call for correlation
            if (requestId) {
                Object.assign(headers, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cdp$2d$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addRequestIdToCDPHeaders"])(headers, requestId));
            }
            // Call CDP /verify with retry logic
            const result = await this.callCdpVerifyWithRetries(verifyBody, isProbe, headers);
            // Log CDP response
            logger.debug({
                status: result.status,
                success: result.success,
                valid: result.valid,
                errorType: result.errorType,
                errorMessage: result.errorMessage,
                isRateLimited: result.isRateLimited,
                isNetworkError: result.isNetworkError,
                latencyMs: result.latencyMs
            }, 'CDP verification response');
            // Handle success
            if (result.success && result.valid) {
                logger.info({
                    latencyMs: result.latencyMs
                }, 'Payment verified successfully');
                return {
                    success: true,
                    valid: true,
                    transactionHash: undefined,
                    kytStatus: 'passed',
                    ofacStatus: 'passed'
                };
            } else {
                // Handle error - map CDP errorType/errorMessage to our error classification
                const cdpErrorType = result.errorType || 'CDP_VERIFY_FAILED';
                const cdpErrorMessage = result.errorMessage || 'CDP verification failed';
                // Map error types to result/errorCode
                let errorCode = 'facilitator_error';
                if (result.isRateLimited || cdpErrorType === 'rate_limit') {
                    errorCode = 'rate_limited';
                } else if (result.isNetworkError) {
                    errorCode = 'network_error';
                } else if (cdpErrorType === 'invalid_request' || result.status === 400) {
                    errorCode = 'invalid_request';
                } else if (result.status === 401) {
                    errorCode = 'unauthorized';
                }
                // Log detailed error information including request body for debugging
                logger.error({
                    status: result.status,
                    errorType: cdpErrorType,
                    errorMessage: cdpErrorMessage,
                    errorCode,
                    isRateLimited: result.isRateLimited,
                    isNetworkError: result.isNetworkError,
                    cdpResponse: result.data,
                    requestBody: {
                        x402Version: verifyBody.x402Version,
                        paymentPayload: {
                            x402Version: verifyBody.paymentPayload.x402Version,
                            scheme: verifyBody.paymentPayload.scheme,
                            network: verifyBody.paymentPayload.network
                        },
                        paymentRequirements: verifyBody.paymentRequirements
                    }
                }, 'Payment verification failed');
                // Extract authorization details from the parsed payment header for logging
                let authorizationFrom = 'UNKNOWN';
                let authorizationTo = 'UNKNOWN';
                let transactionHash = 'NOT PROVIDED';
                if (parsedPayment) {
                    authorizationFrom = parsedPayment.authorization.from;
                    authorizationTo = parsedPayment.authorization.to;
                    transactionHash = parsedPayment.txHash || 'NOT PROVIDED';
                }
                const errorDetails = {
                    error: cdpErrorMessage,
                    errorType: cdpErrorType,
                    cdpResponse: result.data,
                    httpStatus: result.status,
                    errorCode,
                    isRateLimited: result.isRateLimited,
                    isNetworkError: result.isNetworkError,
                    // Include request details for debugging
                    requestDetails: {
                        scheme: verifyBody.paymentRequirements?.scheme || 'MISSING',
                        network: verifyBody.paymentRequirements?.network || 'MISSING',
                        payTo: verifyBody.paymentRequirements?.payTo || 'MISSING',
                        maxAmountRequired: verifyBody.paymentRequirements?.maxAmountRequired || 'MISSING',
                        validAfter: verifyBody.paymentRequirements?.validAfter || 'MISSING',
                        validBefore: verifyBody.paymentRequirements?.validBefore || 'MISSING',
                        resource: verifyBody.paymentRequirements?.resource || 'MISSING',
                        asset: verifyBody.paymentRequirements?.asset || 'MISSING',
                        fullPaymentRequirements: verifyBody.paymentRequirements,
                        authorizationFrom,
                        authorizationTo,
                        transactionHash
                    }
                };
                return {
                    success: false,
                    valid: false,
                    error: cdpErrorMessage,
                    errorDetails: {
                        ...errorDetails,
                        errorType: cdpErrorType
                    },
                    kytStatus: undefined,
                    ofacStatus: undefined
                };
            }
        } catch (error) {
            // Handle network errors with enhanced logging
            const errorMessage = error?.message || 'CDP_VERIFY_FAILED';
            const isTimeout = error?.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout');
            const isNetworkError = errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('fetch') || errorMessage.toLowerCase().includes('econnrefused');
            logger.error({
                error,
                errorMessage,
                isTimeout,
                isNetworkError,
                component: 'cdp-facilitator',
                operation: 'verifyPayment',
                requestId: request.requestId
            }, 'CDP API request error');
            const errorDetails = {
                error: errorMessage,
                cdpResponse: undefined,
                httpStatus: 500,
                errorType: isTimeout ? 'timeout' : isNetworkError ? 'network' : 'unknown'
            };
            return {
                success: false,
                valid: false,
                error: errorMessage,
                errorDetails: errorDetails
            };
        }
    }
    /**
   * Verify payment with retry logic and exponential backoff
   * 
   * Retries on network errors and timeouts, but not on validation failures
   */ async verifyPaymentWithRetry(request, maxRetries = 3) {
        let lastError = null;
        for(let attempt = 0; attempt < maxRetries; attempt++){
            try {
                const result = await this.verifyPayment(request);
                // If verification succeeded, return immediately
                if (result.success && result.valid) {
                    return result;
                }
                // If verification failed due to validation (not network), don't retry
                if (result.error && !result.error.includes('timeout') && !result.error.includes('network') && !result.error.includes('Unable to reach')) {
                    return result;
                }
                // If blocked by KYT/OFAC, don't retry
                if (result.kytStatus === 'blocked' || result.ofacStatus === 'blocked') {
                    return result;
                }
                lastError = new Error(result.error || 'Verification failed');
            } catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));
            }
            // Exponential backoff: 100ms, 200ms, 400ms
            if (attempt < maxRetries - 1) {
                const delay = 100 * Math.pow(2, attempt);
                logger.info({
                    attempt: attempt + 1,
                    maxRetries,
                    delay
                }, 'Retrying CDP verification');
                await new Promise((resolve)=>setTimeout(resolve, delay));
            }
        }
        return {
            success: false,
            valid: false,
            error: lastError?.message || 'Max retries exceeded'
        };
    }
    /**
   * Health check - verify CDP facilitator is accessible
   * 
   * Note: CDP may not have a /health endpoint. This is a best-effort check.
   * If it fails, it doesn't necessarily mean CDP is unavailable.
   * 
   * IMPORTANT: If the facilitator URL domain doesn't resolve (DNS error),
   * this will return unhealthy, but actual payment verification might
   * still work if it uses a different endpoint.
   */ async healthCheck() {
        try {
            // For REST API calls, CDP requires request-specific JWT
            // Generate JWT with the actual request details
            const url = new URL(`${this.facilitatorUrl}/health`);
            const token = await this.generateJWT('GET', url.pathname);
            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CDP-API-Key': this.apiKeyId
                },
                signal: AbortSignal.timeout(5000)
            });
            if (response.ok) {
                return {
                    healthy: true
                };
            } else {
                // 401/403 might mean auth is working but endpoint doesn't exist or keys are wrong
                // 404 means endpoint doesn't exist (but auth might be working)
                // For now, we'll consider it healthy if we get any response (not a network error)
                if (response.status === 404) {
                    return {
                        healthy: true,
                        error: 'Health endpoint not found, but CDP is reachable'
                    };
                }
                // Get error details from response if available
                let errorMsg = `Health check failed: ${response.status} ${response.statusText}`;
                try {
                    const errorBody = await response.text();
                    if (errorBody) {
                        errorMsg += ` - ${errorBody.substring(0, 200)}`;
                    }
                } catch  {
                // Ignore parsing errors
                }
                return {
                    healthy: false,
                    error: errorMsg
                };
            }
        } catch (error) {
            // Network errors or timeouts indicate CDP is not reachable
            // This includes DNS resolution failures (domain doesn't exist)
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            // If it's a DNS/network error, note that payment verification might still work
            if (errorMessage.includes('fetch failed') || errorMessage.includes('ENOTFOUND') || errorMessage.includes('getaddrinfo')) {
                return {
                    healthy: false,
                    error: `Facilitator URL not reachable (${errorMessage}). Payment verification may use a different endpoint.`
                };
            }
            return {
                healthy: false,
                error: errorMessage
            };
        }
    }
}
// Singleton instance
let cdpFacilitator = null;
function getCDPFacilitator() {
    if (!cdpFacilitator) {
        const apiKeyId = process.env.CDP_API_KEY_ID;
        const facilitatorUrl = process.env.CDP_FACILITATOR_URL || 'https://api.cdp.coinbase.com/platform/v2/x402';
        if (!apiKeyId) {
            throw new Error('CDP_API_KEY_ID must be set in environment variables');
        }
        cdpFacilitator = new CDPFacilitator(apiKeyId, facilitatorUrl);
    }
    return cdpFacilitator;
}
}),
"[project]/src/integrations/x402/facilitators/cdp-facilitator-adapter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// CDP FACILITATOR ADAPTER
// =============================================================================
// Adapter to make CDP facilitator conform to IFacilitator interface
__turbopack_context__.s([
    "CDPFacilitatorAdapter",
    ()=>CDPFacilitatorAdapter,
    "getCDPFacilitatorAdapter",
    ()=>getCDPFacilitatorAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/base-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$cdp$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/cdp-facilitator.ts [app-route] (ecmascript)");
;
;
// Logger will be created per instance
/**
 * Build CDP-specific payment requirements for probe mode
 * Uses known-good values for Base + USDC that CDP expects
 * CDP x402 v2 API expects: scheme, network, payTo, maxAmountRequired, resource, asset, etc.
 */ function buildCdpProbePaymentRequirements(config) {
    // USDC contract address on Base
    const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
    // Use a test receiver address (can be any valid address you control)
    // For probes, we use a known test address that won't cause issues
    const PROBE_RECEIVER = '0x0000000000000000000000000000000000000001'; // Test address
    // CDP requires CAIP-2 format (e.g., "eip155:8453") for network
    // Keep network in CAIP-2 format, don't convert to legacy
    const network = config.network; // Already in CAIP-2 format (e.g., "eip155:8453")
    const now = Math.floor(Date.now() / 1000);
    return {
        scheme: 'exact',
        network: network,
        to: PROBE_RECEIVER,
        payTo: PROBE_RECEIVER,
        value: '1000000',
        maxAmountRequired: '1000000',
        resource: `https://probe.nexflow.dev/health/${config.facilitatorId}/${config.network}/${config.token}`,
        asset: USDC_BASE,
        description: `Health probe for ${config.facilitatorId} on ${config.network}`,
        mimeType: 'application/json',
        maxTimeoutSeconds: 10,
        validAfter: now.toString(),
        validBefore: (now + 300).toString()
    };
}
class CDPFacilitatorAdapter extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseFacilitator"] {
    id = 'cdp';
    name = 'Coinbase Developer Platform';
    config = {
        id: 'cdp',
        name: 'Coinbase Developer Platform',
        enabled: true,
        priority: 1,
        networks: [
            'base'
        ],
        networksCAIP: [
            'eip155:8453'
        ],
        assets: [
            '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
        ],
        assetsCAIP: [
            'eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
        ],
        schemes: [
            'exact',
            'x402'
        ],
        settlementModes: [
            'immediate'
        ],
        healthCheckUrl: process.env.CDP_FACILITATOR_URL || 'https://api.cdp.coinbase.com/platform/v2/x402',
        metadata: {
            provider: 'Coinbase',
            kytEnabled: true,
            ofacEnabled: true,
            complianceLevel: 'enterprise'
        }
    };
    cdpFacilitator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$cdp$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCDPFacilitator"])();
    /**
   * Verify payment using CDP facilitator
   * 
   * Note: This adapter expects the payment header to be passed as-is.
   * The CDP facilitator will parse it internally. For a more complete
   * adapter, we could parse the header here and extract the authorization,
   * but for now we rely on CDP's internal parsing.
   */ async verify(payment, requirements) {
        // Validate requirements
        const validation = this.validateRequirements(requirements);
        if (!validation.valid) {
            return {
                success: false,
                valid: false,
                error: validation.error,
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        }
        try {
            // Import payment header parser to extract authorization
            const { parseAndVerifyPaymentHeader } = await __turbopack_context__.A("[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript, async loader)");
            const parsed = await parseAndVerifyPaymentHeader(payment);
            if (!parsed.valid || !parsed.payment) {
                return {
                    success: false,
                    valid: false,
                    error: parsed.error || 'Failed to parse payment header',
                    facilitatorId: this.id,
                    verifiedAt: new Date().toISOString()
                };
            }
            // Detect probe mode: check if resource URL matches probe pattern
            // Probe resources use pattern: https://probe.nexflow.dev/health/{facilitatorId}/{network}/{token}
            const isProbe = requirements.resource?.startsWith('https://probe.nexflow.dev/health/') ?? false;
            // For probe mode, build CDP-specific probe paymentRequirements
            // Extract probe config from resource URL if in probe mode
            let cdpPaymentRequirements;
            if (isProbe) {
                // Extract facilitatorId, network, token from resource URL
                // Format: https://probe.nexflow.dev/health/{facilitatorId}/{network}/{token}
                const resourceMatch = requirements.resource.match(/\/health\/([^/]+)\/([^/]+)\/([^/]+)/);
                if (resourceMatch) {
                    const [, facilitatorId, network, token] = resourceMatch;
                    const probeConfig = {
                        id: `${facilitatorId}-${network}-${token.toLowerCase()}`,
                        facilitatorId,
                        network,
                        token,
                        desiredIntervalSeconds: 30,
                        enabled: true
                    };
                    cdpPaymentRequirements = buildCdpProbePaymentRequirements(probeConfig);
                    this.getLogger().info({
                        component: 'CDPFacilitatorAdapter',
                        isProbe: true,
                        probeConfigId: probeConfig.id,
                        hasPaymentRequirements: true,
                        msg: 'Using probe-specific paymentRequirements for CDP'
                    });
                } else {
                    // Fallback: use requirements as-is if we can't parse probe config
                    cdpPaymentRequirements = {
                        scheme: requirements.scheme,
                        network: requirements.network,
                        maxAmountRequired: requirements.maxAmountRequired,
                        resource: requirements.resource,
                        description: requirements.description || '',
                        mimeType: requirements.mimeType || 'application/json',
                        payTo: requirements.payTo,
                        maxTimeoutSeconds: requirements.maxTimeoutSeconds || 300,
                        asset: requirements.asset
                    };
                }
            } else {
                // Normal mode: use requirements from caller
                cdpPaymentRequirements = {
                    scheme: requirements.scheme,
                    network: requirements.network,
                    maxAmountRequired: requirements.maxAmountRequired,
                    resource: requirements.resource,
                    description: requirements.description || '',
                    mimeType: requirements.mimeType || 'application/json',
                    payTo: requirements.payTo,
                    maxTimeoutSeconds: requirements.maxTimeoutSeconds || 300,
                    asset: requirements.asset
                };
            }
            // Build CDP request with parsed payment data
            const cdpRequest = {
                payment,
                paymentPayload: {
                    x402Version: 1,
                    scheme: 'x402',
                    network: parsed.payment.network || requirements.network,
                    payload: {
                        signature: parsed.payment.signature,
                        authorization: parsed.payment.authorization
                    }
                },
                paymentRequirements: cdpPaymentRequirements
            };
            // Verify with CDP
            const result = await this.cdpFacilitator.verifyPaymentWithRetry(cdpRequest);
            return {
                success: result.success,
                valid: result.valid,
                transactionHash: result.transactionHash,
                kytStatus: result.kytStatus,
                ofacStatus: result.ofacStatus,
                error: result.error,
                errorDetails: result.errorDetails,
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        } catch (error) {
            this.getLogger().error({
                error,
                requirements
            }, 'CDP verification error');
            return {
                success: false,
                valid: false,
                error: error instanceof Error ? error.message : 'Verification failed',
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        }
    }
    /**
   * Get CDP facilitator health
   */ async getHealth() {
        try {
            const start = Date.now();
            const health = await this.cdpFacilitator.healthCheck();
            const latency = Date.now() - start;
            return {
                healthy: health.healthy,
                latency,
                lastChecked: new Date().toISOString(),
                capabilities: {
                    networks: this.config.networks,
                    assets: this.config.assets,
                    schemes: this.config.schemes
                }
            };
        } catch (error) {
            return {
                healthy: false,
                lastChecked: new Date().toISOString(),
                error: error instanceof Error ? error.message : 'Health check failed',
                capabilities: {
                    networks: this.config.networks,
                    assets: this.config.assets,
                    schemes: this.config.schemes
                }
            };
        }
    }
    /**
   * Get pricing (CDP doesn't charge fees, but we track gas costs)
   */ async getPricing(network, asset) {
        if (network === 'base' && asset === '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913') {
            return {
                network: 'base',
                asset: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
                baseFee: '0',
                percentageFee: 0,
                estimatedGas: '21000',
                currency: 'USDC'
            };
        }
        return null;
    }
}
/**
 * Get CDP facilitator adapter instance
 */ let cdpAdapter = null;
function getCDPFacilitatorAdapter() {
    if (!cdpAdapter) {
        cdpAdapter = new CDPFacilitatorAdapter();
    }
    return cdpAdapter;
}
}),
"[project]/src/integrations/x402/facilitators/payai-facilitator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// PAYAI FACILITATOR
// =============================================================================
// Multi-chain facilitator for x402 payment verification
// Supports Base, Solana, Ethereum, BNB Chain, and other networks
__turbopack_context__.s([
    "PayAIFacilitator",
    ()=>PayAIFacilitator,
    "getPayAIFacilitator",
    ()=>getPayAIFacilitator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/base-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'PayAIFacilitator'
});
/**
 * Build PayAI-specific payment requirements for probe mode
 * Uses known-good values for Base + USDC that PayAI expects
 */ function buildPayAIProbePaymentRequirements(config) {
    // USDC contract address on Base
    const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
    // Use a test receiver address (can be any valid address you control)
    // For probes, we use a known test address that won't cause issues
    const PROBE_RECEIVER = '0x0000000000000000000000000000000000000001'; // Test address
    // Convert CAIP-2 network to legacy format
    let legacyNetwork = config.network;
    if (config.network === 'eip155:8453') {
        legacyNetwork = 'base';
    }
    return {
        scheme: 'x402',
        network: legacyNetwork,
        asset: USDC_BASE,
        maxAmountRequired: '1',
        resource: `https://probe.nexflow.dev/health/${config.facilitatorId}/${config.network}/${config.token}`,
        description: `Health probe for ${config.facilitatorId} on ${config.network}`,
        mimeType: 'application/json',
        payTo: PROBE_RECEIVER,
        maxTimeoutSeconds: 10,
        settlementMode: 'immediate'
    };
}
class PayAIFacilitator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseFacilitator"] {
    id = 'payai';
    name = 'PayAI Facilitator';
    config = {
        id: 'payai',
        name: 'PayAI Facilitator',
        enabled: process.env.PAYAI_ENABLED !== 'false',
        priority: 2,
        // Legacy network identifiers
        networks: [
            'base',
            'ethereum',
            'solana',
            'bnb',
            'polygon'
        ],
        // CAIP-2 network identifiers (multi-chain support)
        networksCAIP: [
            'eip155:1',
            'eip155:8453',
            'eip155:56',
            'eip155:137',
            'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'
        ],
        // Legacy asset identifiers
        assets: [
            '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
            '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
        ],
        // CAIP-19 asset identifiers (multi-chain support)
        assetsCAIP: [
            // Ethereum USDC
            'eip155:1/erc20:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            // Base USDC
            'eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
            // BNB Chain USDC
            'eip155:56/erc20:0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
            // Polygon USDC
            'eip155:137/erc20:0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
        ],
        schemes: [
            'exact',
            'x402'
        ],
        settlementModes: [
            'immediate'
        ],
        healthCheckUrl: process.env.PAYAI_FACILITATOR_URL || 'https://facilitator.payai.network',
        metadata: {
            provider: 'PayAI',
            multiChain: true,
            complianceLevel: 'standard',
            website: 'https://payai.network'
        }
    };
    baseUrl;
    constructor(baseUrl){
        super();
        // No API key required for hosted facilitator
        this.baseUrl = baseUrl || process.env.PAYAI_FACILITATOR_URL || 'https://facilitator.payai.network';
    }
    /**
   * Call PayAI /verify endpoint with retry logic for transient errors
   * 
   * Retries on: 429 (rate limit), 500-504 (server errors), network timeouts
   * Does NOT retry on: 400 (invalid_request), 401 (unauthorized), other 4xx
   * 
   * Returns normalized result with success, valid, status, errorType, errorMessage, etc.
   */ async callPayAIVerifyWithRetries(verifyUrl, requestBody, isProbe) {
        const maxRetries = 3;
        const retryableStatuses = [
            429,
            500,
            502,
            503,
            504
        ];
        const startTime = Date.now();
        for(let attempt = 0; attempt < maxRetries; attempt++){
            try {
                const response = await fetch(verifyUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody),
                    signal: AbortSignal.timeout(10000)
                });
                const text = await response.text();
                const data = text ? JSON.parse(text) : {};
                const latencyMs = Date.now() - startTime;
                // Success case
                if (response.ok && data.valid === true) {
                    return {
                        success: true,
                        valid: true,
                        status: response.status,
                        isRateLimited: false,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Check if retryable error
                const isRetryable = retryableStatuses.includes(response.status);
                const isRateLimit = response.status === 429;
                // If not retryable or last attempt, return error
                if (!isRetryable || attempt === maxRetries - 1) {
                    const errorMessage = data.message || data.reason || data.error || `HTTP ${response.status}`;
                    const errorType = data.errorType || data.code || (isRateLimit ? 'rate_limit' : 'PAYAI_VERIFY_FAILED');
                    return {
                        success: false,
                        valid: false,
                        status: response.status,
                        errorType,
                        errorMessage,
                        isRateLimited: isRateLimit,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Retry with exponential backoff
                const delay = 100 * Math.pow(2, attempt); // 100ms, 200ms, 400ms
                logger.info({
                    component: 'PayAIFacilitator',
                    attempt: attempt + 1,
                    maxRetries,
                    status: response.status,
                    delay,
                    isProbe,
                    msg: 'Retrying PayAI verification after transient error'
                });
                await new Promise((resolve)=>setTimeout(resolve, delay));
            } catch (error) {
                const latencyMs = Date.now() - startTime;
                const isTimeout = error?.name === 'AbortError' || error?.message?.toLowerCase().includes('timeout');
                const isNetworkError = error?.message?.toLowerCase().includes('network') || error?.message?.toLowerCase().includes('fetch') || error?.message?.toLowerCase().includes('econnrefused');
                // If network error and not last attempt, retry
                if ((isTimeout || isNetworkError) && attempt < maxRetries - 1) {
                    const delay = 100 * Math.pow(2, attempt);
                    logger.info({
                        component: 'PayAIFacilitator',
                        attempt: attempt + 1,
                        maxRetries,
                        error: error?.message,
                        delay,
                        isProbe,
                        msg: 'Retrying PayAI verification after network error'
                    });
                    await new Promise((resolve)=>setTimeout(resolve, delay));
                    continue;
                }
                // Last attempt or non-network error
                return {
                    success: false,
                    valid: false,
                    status: 0,
                    errorType: isTimeout ? 'timeout' : isNetworkError ? 'network_error' : 'PAYAI_VERIFY_FAILED',
                    errorMessage: error?.message || 'PayAI verification failed',
                    isRateLimited: false,
                    isNetworkError: isTimeout || isNetworkError,
                    latencyMs
                };
            }
        }
        // Should never reach here, but TypeScript needs a return
        return {
            success: false,
            valid: false,
            status: 0,
            errorType: 'PAYAI_VERIFY_FAILED',
            errorMessage: 'Max retries exceeded',
            isRateLimited: false,
            isNetworkError: false,
            latencyMs: Date.now() - startTime
        };
    }
    /**
   * Verify payment using PayAI facilitator
   * 
   * POST to /verify endpoint with paymentPayload and paymentRequirements.
   * No authentication required for hosted facilitator.
   */ async verify(payment, requirements) {
        const start = Date.now();
        // Validate requirements
        const validation = this.validateRequirements(requirements);
        if (!validation.valid) {
            return {
                success: false,
                valid: false,
                error: validation.error,
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        }
        try {
            // Parse payment header to extract authorization details
            const { parseX402Header } = await __turbopack_context__.A("[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript, async loader)");
            const parseResult = parseX402Header(payment);
            if (!parseResult.valid || !parseResult.parsed) {
                return {
                    success: false,
                    valid: false,
                    error: parseResult.error || 'Failed to parse payment header',
                    facilitatorId: this.id,
                    verifiedAt: new Date().toISOString()
                };
            }
            const parsed = parseResult.parsed;
            // Detect probe mode: check if resource URL matches probe pattern
            // Probe resources use pattern: https://probe.nexflow.dev/health/{facilitatorId}/{network}/{token}
            const isProbe = requirements.resource?.startsWith('https://probe.nexflow.dev/health/') ?? false;
            // For probe mode, build PayAI-specific probe paymentRequirements
            // Extract probe config from resource URL if in probe mode
            let probeRequirements;
            if (isProbe) {
                // Extract facilitatorId, network, token from resource URL
                // Format: https://probe.nexflow.dev/health/{facilitatorId}/{network}/{token}
                const resourceMatch = requirements.resource.match(/\/health\/([^/]+)\/([^/]+)\/([^/]+)/);
                if (resourceMatch) {
                    const [, facilitatorId, network, token] = resourceMatch;
                    const probeConfig = {
                        id: `${facilitatorId}-${network}-${token.toLowerCase()}`,
                        facilitatorId,
                        network,
                        token,
                        desiredIntervalSeconds: 120,
                        enabled: true
                    };
                    probeRequirements = buildPayAIProbePaymentRequirements(probeConfig);
                    logger.info({
                        component: 'PayAIFacilitator',
                        isProbe: true,
                        probeConfigId: probeConfig.id,
                        hasPaymentRequirements: true,
                        msg: 'Using probe-specific paymentRequirements for PayAI'
                    });
                } else {
                    // Fallback: use requirements as-is if we can't parse probe config
                    probeRequirements = requirements;
                }
            } else {
                // Normal mode: use requirements from caller
                probeRequirements = requirements;
            }
            // Build paymentPayload from parsed payment header
            const paymentPayload = {
                x402Version: 2,
                scheme: probeRequirements.scheme || 'x402',
                network: parsed.network || probeRequirements.network,
                payload: {
                    signature: parsed.signature,
                    authorization: {
                        from: parsed.authorization.from,
                        to: parsed.authorization.to,
                        value: parsed.authorization.value,
                        validAfter: parsed.authorization.validAfter,
                        validBefore: parsed.authorization.validBefore,
                        nonce: parsed.authorization.nonce
                    }
                }
            };
            // Build paymentRequirements from requirements (use probe-specific if in probe mode)
            const paymentRequirements = {
                scheme: probeRequirements.scheme,
                network: probeRequirements.network,
                maxAmountRequired: probeRequirements.maxAmountRequired,
                resource: probeRequirements.resource,
                description: probeRequirements.description || '',
                mimeType: probeRequirements.mimeType || 'application/json',
                payTo: probeRequirements.payTo,
                maxTimeoutSeconds: probeRequirements.maxTimeoutSeconds || 300,
                asset: probeRequirements.asset
            };
            // POST to PayAI verification endpoint with retry logic
            const verifyUrl = `${this.baseUrl}/verify`;
            const requestBody = {
                paymentPayload,
                paymentRequirements
            };
            // isProbe already declared above (line 300), reuse it
            logger.info({
                component: "PayAIFacilitator",
                isProbe,
                network: paymentRequirements.network,
                asset: paymentRequirements.asset,
                url: verifyUrl,
                msg: "Sending PayAI /verify request"
            });
            // Call PayAI /verify with retry logic
            const result = await this.callPayAIVerifyWithRetries(verifyUrl, requestBody, isProbe);
            const latency = result.latencyMs;
            // Handle success
            if (result.success && result.valid) {
                logger.info({
                    latencyMs: result.latencyMs
                }, 'Payment verified successfully by PayAI');
                return {
                    success: true,
                    valid: true,
                    transactionHash: result.data?.transactionHash || result.data?.txHash,
                    facilitatorId: this.id,
                    verifiedAt: new Date().toISOString()
                };
            }
            // Handle error - map PayAI errorType/errorMessage to our error classification
            const payaiErrorType = result.errorType || 'PAYAI_VERIFY_FAILED';
            const payaiErrorMessage = result.errorMessage || 'PayAI verification failed';
            // Map error types to result/errorCode
            let errorCode = 'facilitator_error';
            if (result.isRateLimited || payaiErrorType === 'rate_limit') {
                errorCode = 'rate_limited';
            } else if (result.isNetworkError) {
                errorCode = 'network_error';
            } else if (payaiErrorType === 'invalid_request' || result.status === 400) {
                errorCode = 'invalid_request';
            } else if (result.status === 401) {
                errorCode = 'unauthorized';
            }
            logger.debug({
                status: result.status,
                errorType: payaiErrorType,
                errorMessage: payaiErrorMessage,
                errorCode,
                isRateLimited: result.isRateLimited,
                isNetworkError: result.isNetworkError,
                latencyMs: result.latencyMs
            }, 'PayAI verification failed');
            return {
                success: false,
                valid: false,
                error: payaiErrorMessage,
                errorDetails: {
                    error: payaiErrorMessage,
                    errorType: payaiErrorType,
                    httpStatus: result.status,
                    errorCode,
                    isRateLimited: result.isRateLimited,
                    isNetworkError: result.isNetworkError,
                    payaiResponse: result.data
                },
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        } catch (error) {
            const latency = Date.now() - start;
            const errorMessage = error instanceof Error ? error.message : 'Verification failed';
            const isTimeout = error instanceof Error && (error.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout'));
            this.getLogger().error({
                error,
                requirements,
                latency,
                isTimeout
            }, 'PayAI verification error');
            return {
                success: false,
                valid: false,
                error: isTimeout ? 'PayAI_REQUEST_TIMEOUT' : errorMessage,
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        }
    }
    /**
   * Get PayAI facilitator health
   * 
   * Calls GET /list endpoint. If 200 with non-empty networks/assets, returns healthy.
   */ async getHealth() {
        const start = Date.now();
        try {
            // PayAI redirects /list to /discovery/resources
            const healthUrl = `${this.baseUrl}/discovery/resources`;
            const response = await fetch(healthUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: AbortSignal.timeout(5000)
            });
            const latency = Date.now() - start;
            if (response.ok) {
                const data = await response.json();
                // Check if response has networks/assets (non-empty)
                const hasNetworks = data.networks && Array.isArray(data.networks) && data.networks.length > 0;
                const hasAssets = data.assets && Array.isArray(data.assets) && data.assets.length > 0;
                if (hasNetworks || hasAssets) {
                    return {
                        healthy: true,
                        latency,
                        lastChecked: new Date().toISOString(),
                        capabilities: {
                            networks: data.networks || this.config.networks,
                            assets: data.assets || this.config.assets,
                            schemes: data.schemes || this.config.schemes
                        }
                    };
                }
                // 200 but empty response - consider unhealthy
                return {
                    healthy: false,
                    latency,
                    lastChecked: new Date().toISOString(),
                    error: 'Health check returned empty networks/assets',
                    capabilities: {
                        networks: this.config.networks,
                        assets: this.config.assets,
                        schemes: this.config.schemes
                    }
                };
            }
            // Non-2xx response
            const errorText = await response.text().catch(()=>`HTTP ${response.status}`);
            return {
                healthy: false,
                latency,
                lastChecked: new Date().toISOString(),
                error: errorText,
                capabilities: {
                    networks: this.config.networks,
                    assets: this.config.assets,
                    schemes: this.config.schemes
                }
            };
        } catch (error) {
            const latency = Date.now() - start;
            const errorMessage = error instanceof Error ? error.message : 'Health check failed';
            const isTimeout = error instanceof Error && (error.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout'));
            return {
                healthy: false,
                latency,
                lastChecked: new Date().toISOString(),
                error: isTimeout ? 'Health check timeout' : errorMessage,
                capabilities: {
                    networks: this.config.networks,
                    assets: this.config.assets,
                    schemes: this.config.schemes
                }
            };
        }
    }
    /**
   * Get pricing information
   * 
   * Returns null for now - can be implemented once PayAI pricing API is available.
   */ async getPricing(network, asset) {
        // TODO: Implement pricing lookup if PayAI provides pricing API
        // For now, return null (allowed by interface)
        return null;
    }
    /**
   * Check if facilitator supports network/asset/scheme
   * Uses base class implementation which checks config
   */ supports(network, asset, scheme, settlementMode) {
        return super.supports(network, asset, scheme, settlementMode);
    }
}
/**
 * Singleton PayAI facilitator instance
 */ let payaiFacilitator = null;
function getPayAIFacilitator() {
    if (!payaiFacilitator) {
        payaiFacilitator = new PayAIFacilitator();
    }
    return payaiFacilitator;
}
}),
"[project]/src/integrations/x402/facilitators/x402rs-facilitator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// X402RS FACILITATOR
// =============================================================================
// Rust-based x402 facilitator operated by the x402 community
// Public hosted endpoint: https://facilitator.x402.rs
// Can also be self-hosted via Docker: https://github.com/x402-rs/x402-rs
// Supported networks: Base, Base Sepolia, XDC, Solana (configurable)
__turbopack_context__.s([
    "X402rsFacilitator",
    ()=>X402rsFacilitator,
    "getX402rsFacilitator",
    ()=>getX402rsFacilitator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/base-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'X402rsFacilitator'
});
/**
 * Build X402rs-specific payment requirements for probe mode
 * Uses known-good values that X402rs expects
 */ function buildX402rsProbePaymentRequirements(config) {
    // USDC contract address on Base
    const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
    // USDC on Base Sepolia (testnet)
    const USDC_BASE_SEPOLIA = '0x036CbD53842c5426634e7929541eC2318f3dCF7e';
    // Determine asset based on network
    let asset = USDC_BASE;
    if (config.network === 'eip155:84532') {
        asset = USDC_BASE_SEPOLIA;
    }
    // Use a test receiver address for probes
    const PROBE_RECEIVER = '0x0000000000000000000000000000000000000001';
    return {
        scheme: 'x402',
        network: config.network,
        asset,
        maxAmountRequired: '1',
        resource: `https://probe.nexflow.dev/health/${config.facilitatorId}/${config.network}/${config.token}`,
        description: `Health probe for ${config.facilitatorId} on ${config.network}`,
        mimeType: 'application/json',
        payTo: PROBE_RECEIVER,
        maxTimeoutSeconds: 10,
        settlementMode: 'immediate'
    };
}
class X402rsFacilitator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseFacilitator"] {
    id = 'x402rs';
    name = 'X402rs Facilitator';
    config = {
        id: 'x402rs',
        name: 'X402rs Facilitator',
        enabled: process.env.X402RS_ENABLED !== 'false',
        priority: 2,
        // Legacy network identifiers
        networks: [
            'base',
            'base-sepolia',
            'xdc'
        ],
        // CAIP-2 network identifiers
        networksCAIP: [
            'eip155:84532',
            'eip155:8453',
            'xdc:50'
        ],
        // Legacy asset identifiers (include both contract addresses and symbols for probe compatibility)
        assets: [
            'USDC',
            '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
            '0x036CbD53842c5426634e7929541eC2318f3dCF7e'
        ],
        // CAIP-19 asset identifiers
        assetsCAIP: [
            'eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
            'eip155:84532/erc20:0x036CbD53842c5426634e7929541eC2318f3dCF7e'
        ],
        schemes: [
            'exact',
            'x402'
        ],
        settlementModes: [
            'immediate'
        ],
        healthCheckUrl: process.env.X402RS_FACILITATOR_URL || 'https://facilitator.x402.rs',
        metadata: {
            provider: 'x402 Community',
            label: 'X402rs Facilitator',
            url: 'https://facilitator.x402.rs',
            website: 'https://x402.org',
            rustBased: true,
            openSource: true,
            complianceLevel: 'community'
        }
    };
    baseUrl;
    constructor(baseUrl){
        super();
        this.baseUrl = baseUrl || process.env.X402RS_FACILITATOR_URL || 'https://facilitator.x402.rs';
    }
    /**
   * Get the facilitator URL
   */ getUrl() {
        return this.baseUrl;
    }
    /**
   * Call X402rs /verify endpoint with retry logic for transient errors
   */ async callX402rsVerifyWithRetries(verifyUrl, requestBody, isProbe) {
        const maxRetries = 3;
        const retryableStatuses = [
            429,
            500,
            502,
            503,
            504
        ];
        const startTime = Date.now();
        for(let attempt = 0; attempt < maxRetries; attempt++){
            try {
                const response = await fetch(verifyUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody),
                    signal: AbortSignal.timeout(10000)
                });
                const text = await response.text();
                const data = text ? JSON.parse(text) : {};
                const latencyMs = Date.now() - startTime;
                // Success case
                if (response.ok && data.valid === true) {
                    return {
                        success: true,
                        valid: true,
                        status: response.status,
                        isRateLimited: false,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Check if retryable error
                const isRetryable = retryableStatuses.includes(response.status);
                const isRateLimit = response.status === 429;
                // If not retryable or last attempt, return error
                if (!isRetryable || attempt === maxRetries - 1) {
                    const errorMessage = data.message || data.reason || data.error || `HTTP ${response.status}`;
                    const errorType = data.errorType || data.code || (isRateLimit ? 'rate_limit' : 'X402RS_VERIFY_FAILED');
                    return {
                        success: false,
                        valid: false,
                        status: response.status,
                        errorType,
                        errorMessage,
                        isRateLimited: isRateLimit,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Retry with exponential backoff
                const delay = 100 * Math.pow(2, attempt);
                logger.info({
                    component: 'X402rsFacilitator',
                    attempt: attempt + 1,
                    maxRetries,
                    status: response.status,
                    delay,
                    isProbe,
                    msg: 'Retrying X402rs verification after transient error'
                });
                await new Promise((resolve)=>setTimeout(resolve, delay));
            } catch (error) {
                const latencyMs = Date.now() - startTime;
                const isTimeout = error?.name === 'AbortError' || error?.message?.toLowerCase().includes('timeout');
                const isNetworkError = error?.message?.toLowerCase().includes('network') || error?.message?.toLowerCase().includes('fetch') || error?.message?.toLowerCase().includes('econnrefused');
                if ((isTimeout || isNetworkError) && attempt < maxRetries - 1) {
                    const delay = 100 * Math.pow(2, attempt);
                    logger.info({
                        component: 'X402rsFacilitator',
                        attempt: attempt + 1,
                        maxRetries,
                        error: error?.message,
                        delay,
                        isProbe,
                        msg: 'Retrying X402rs verification after network error'
                    });
                    await new Promise((resolve)=>setTimeout(resolve, delay));
                    continue;
                }
                return {
                    success: false,
                    valid: false,
                    status: 0,
                    errorType: isTimeout ? 'timeout' : isNetworkError ? 'network_error' : 'X402RS_VERIFY_FAILED',
                    errorMessage: error?.message || 'X402rs verification failed',
                    isRateLimited: false,
                    isNetworkError: isTimeout || isNetworkError,
                    latencyMs
                };
            }
        }
        return {
            success: false,
            valid: false,
            status: 0,
            errorType: 'X402RS_VERIFY_FAILED',
            errorMessage: 'Max retries exceeded',
            isRateLimited: false,
            isNetworkError: false,
            latencyMs: Date.now() - startTime
        };
    }
    /**
   * Verify payment using X402rs facilitator
   */ async verify(payment, requirements) {
        const start = Date.now();
        // Validate requirements
        const validation = this.validateRequirements(requirements);
        if (!validation.valid) {
            return {
                success: false,
                valid: false,
                error: validation.error,
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        }
        try {
            // Parse payment header
            const { parseX402Header } = await __turbopack_context__.A("[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript, async loader)");
            const parseResult = parseX402Header(payment);
            if (!parseResult.valid || !parseResult.parsed) {
                return {
                    success: false,
                    valid: false,
                    error: parseResult.error || 'Failed to parse payment header',
                    facilitatorId: this.id,
                    verifiedAt: new Date().toISOString()
                };
            }
            const parsed = parseResult.parsed;
            // Detect probe mode
            const isProbe = requirements.resource?.startsWith('https://probe.nexflow.dev/health/') ?? false;
            // Build payment payload
            const paymentPayload = {
                x402Version: 2,
                scheme: requirements.scheme || 'x402',
                network: parsed.network || requirements.network,
                payload: {
                    signature: parsed.signature,
                    authorization: {
                        from: parsed.authorization.from,
                        to: parsed.authorization.to,
                        value: parsed.authorization.value,
                        validAfter: parsed.authorization.validAfter,
                        validBefore: parsed.authorization.validBefore,
                        nonce: parsed.authorization.nonce
                    }
                }
            };
            // Build payment requirements
            const paymentRequirements = {
                scheme: requirements.scheme,
                network: requirements.network,
                maxAmountRequired: requirements.maxAmountRequired,
                resource: requirements.resource,
                description: requirements.description || '',
                mimeType: requirements.mimeType || 'application/json',
                payTo: requirements.payTo,
                maxTimeoutSeconds: requirements.maxTimeoutSeconds || 300,
                asset: requirements.asset
            };
            // POST to X402rs verification endpoint
            const verifyUrl = `${this.baseUrl}/verify`;
            const requestBody = {
                paymentPayload,
                paymentRequirements
            };
            logger.info({
                component: 'X402rsFacilitator',
                isProbe,
                network: paymentRequirements.network,
                asset: paymentRequirements.asset,
                url: verifyUrl,
                facilitatorId: this.id,
                facilitatorUrl: this.baseUrl,
                msg: 'Sending X402rs /verify request'
            });
            // Call with retry logic
            const result = await this.callX402rsVerifyWithRetries(verifyUrl, requestBody, isProbe);
            // Handle success
            if (result.success && result.valid) {
                logger.info({
                    component: 'X402rsFacilitator',
                    facilitatorId: this.id,
                    facilitatorUrl: this.baseUrl,
                    latencyMs: result.latencyMs,
                    network: requirements.network,
                    msg: 'Payment verified successfully by X402rs'
                });
                return {
                    success: true,
                    valid: true,
                    transactionHash: result.data?.transactionHash || result.data?.txHash,
                    facilitatorId: this.id,
                    verifiedAt: new Date().toISOString()
                };
            }
            // Handle error
            const errorType = result.errorType || 'X402RS_VERIFY_FAILED';
            const errorMessage = result.errorMessage || 'X402rs verification failed';
            let errorCode = 'facilitator_error';
            if (result.isRateLimited || errorType === 'rate_limit') {
                errorCode = 'rate_limited';
            } else if (result.isNetworkError) {
                errorCode = 'network_error';
            } else if (errorType === 'invalid_request' || result.status === 400) {
                errorCode = 'invalid_request';
            }
            logger.debug({
                component: 'X402rsFacilitator',
                facilitatorId: this.id,
                status: result.status,
                errorType,
                errorMessage,
                errorCode,
                isRateLimited: result.isRateLimited,
                isNetworkError: result.isNetworkError,
                latencyMs: result.latencyMs,
                msg: 'X402rs verification failed'
            });
            return {
                success: false,
                valid: false,
                error: errorMessage,
                errorDetails: {
                    error: errorMessage,
                    errorType,
                    httpStatus: result.status,
                    errorCode,
                    isRateLimited: result.isRateLimited,
                    isNetworkError: result.isNetworkError,
                    x402rsResponse: result.data
                },
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        } catch (error) {
            const latency = Date.now() - start;
            const errorMessage = error instanceof Error ? error.message : 'Verification failed';
            const isTimeout = error instanceof Error && (error.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout'));
            this.getLogger().error({
                error,
                requirements,
                latency,
                isTimeout
            }, 'X402rs verification error');
            return {
                success: false,
                valid: false,
                error: isTimeout ? 'X402RS_REQUEST_TIMEOUT' : errorMessage,
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        }
    }
    /**
   * Get X402rs facilitator health
   */ async getHealth() {
        const start = Date.now();
        try {
            // X402rs health check endpoint
            const healthUrl = `${this.baseUrl}/health`;
            const response = await fetch(healthUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: AbortSignal.timeout(5000)
            });
            const latency = Date.now() - start;
            if (response.ok) {
                let data = {};
                try {
                    data = await response.json();
                } catch  {
                // Health endpoint might return simple OK
                }
                return {
                    healthy: true,
                    latency,
                    lastChecked: new Date().toISOString(),
                    capabilities: {
                        networks: data.networks || this.config.networks,
                        assets: data.assets || this.config.assets,
                        schemes: data.schemes || this.config.schemes
                    }
                };
            }
            const errorText = await response.text().catch(()=>`HTTP ${response.status}`);
            return {
                healthy: false,
                latency,
                lastChecked: new Date().toISOString(),
                error: errorText,
                capabilities: {
                    networks: this.config.networks,
                    assets: this.config.assets,
                    schemes: this.config.schemes
                }
            };
        } catch (error) {
            const latency = Date.now() - start;
            const errorMessage = error instanceof Error ? error.message : 'Health check failed';
            const isTimeout = error instanceof Error && (error.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout'));
            return {
                healthy: false,
                latency,
                lastChecked: new Date().toISOString(),
                error: isTimeout ? 'Health check timeout' : errorMessage,
                capabilities: {
                    networks: this.config.networks,
                    assets: this.config.assets,
                    schemes: this.config.schemes
                }
            };
        }
    }
    /**
   * Get pricing information (not available for X402rs yet)
   */ async getPricing(network, asset) {
        // TODO: Implement if X402rs provides pricing API
        return null;
    }
    /**
   * Check if facilitator supports network/asset/scheme
   */ supports(network, asset, scheme, settlementMode) {
        return super.supports(network, asset, scheme, settlementMode);
    }
}
// Singleton instance
let x402rsFacilitator = null;
function getX402rsFacilitator() {
    if (!x402rsFacilitator) {
        x402rsFacilitator = new X402rsFacilitator();
    }
    return x402rsFacilitator;
}
}),
"[project]/src/integrations/x402/facilitators/dexter-facilitator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// DEXTER FACILITATOR
// =============================================================================
// Solana-native x402 facilitator operated by Dexter
// Public hosted endpoint: https://facilitator.dexter.cash
// Standard x402 endpoints: /verify and /settle
// Supports Solana mainnet and devnet networks
__turbopack_context__.s([
    "DexterFacilitator",
    ()=>DexterFacilitator,
    "dexterSettle",
    ()=>dexterSettle,
    "dexterVerify",
    ()=>dexterVerify,
    "getDexterFacilitator",
    ()=>getDexterFacilitator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/base-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'DexterFacilitator'
});
/**
 * Build Dexter-specific payment requirements for probe mode
 * Uses known-good values that Dexter expects
 */ function buildDexterProbePaymentRequirements(config) {
    // USDC on Solana mainnet (SPL token mint address)
    const USDC_SOLANA_MAINNET = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
    // USDC on Solana devnet (SPL token mint address)
    const USDC_SOLANA_DEVNET = '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU';
    // Determine asset based on network
    let asset = USDC_SOLANA_MAINNET;
    if (config.network === 'solana:102' || config.network === 'solana:devnet') {
        asset = USDC_SOLANA_DEVNET;
    }
    // Use a test receiver address for probes
    const PROBE_RECEIVER = '11111111111111111111111111111111'; // System program (placeholder)
    return {
        scheme: 'x402',
        network: config.network,
        asset,
        maxAmountRequired: '1',
        resource: `https://probe.nexflow.dev/health/${config.facilitatorId}/${config.network}/${config.token}`,
        description: `Health probe for ${config.facilitatorId} on ${config.network}`,
        mimeType: 'application/json',
        payTo: PROBE_RECEIVER,
        maxTimeoutSeconds: 10,
        settlementMode: 'immediate'
    };
}
class DexterFacilitator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseFacilitator"] {
    id = 'dexter';
    name = 'Dexter Facilitator';
    config = {
        id: 'dexter',
        name: 'Dexter Facilitator',
        enabled: process.env.DEXTER_ENABLED !== 'false',
        priority: 2,
        // Legacy network identifiers
        networks: [
            'solana',
            'solana-mainnet',
            'solana-devnet'
        ],
        // CAIP-2 network identifiers
        networksCAIP: [
            'solana:101',
            'solana:102',
            'solana:mainnet',
            'solana:devnet'
        ],
        // Legacy asset identifiers (include both contract addresses and symbols for probe compatibility)
        assets: [
            'USDC',
            'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
            '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'
        ],
        // CAIP-19 asset identifiers
        assetsCAIP: [
            'solana:101/spl:EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
            'solana:102/spl:4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'
        ],
        schemes: [
            'exact',
            'x402'
        ],
        settlementModes: [
            'immediate'
        ],
        healthCheckUrl: process.env.DEXTER_FACILITATOR_URL || 'https://facilitator.dexter.cash',
        metadata: {
            provider: 'Dexter',
            label: 'Dexter Facilitator',
            url: 'https://facilitator.dexter.cash',
            website: 'https://dexter.cash',
            solanaNative: true,
            complianceLevel: 'community',
            notes: 'Solana-native x402 facilitator'
        }
    };
    baseUrl;
    constructor(baseUrl){
        super();
        this.baseUrl = baseUrl || process.env.DEXTER_FACILITATOR_URL || 'https://facilitator.dexter.cash';
    }
    /**
   * Get the facilitator URL
   */ getUrl() {
        return this.baseUrl;
    }
    /**
   * Call Dexter /verify endpoint with retry logic for transient errors
   */ async callDexterVerifyWithRetries(verifyUrl, requestBody, isProbe) {
        const maxRetries = 3;
        const retryableStatuses = [
            429,
            500,
            502,
            503,
            504
        ];
        const startTime = Date.now();
        for(let attempt = 0; attempt < maxRetries; attempt++){
            try {
                const response = await fetch(verifyUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody),
                    signal: AbortSignal.timeout(10000)
                });
                const text = await response.text();
                const data = text ? JSON.parse(text) : {};
                const latencyMs = Date.now() - startTime;
                // Success case
                if (response.ok && data.valid === true) {
                    return {
                        success: true,
                        valid: true,
                        status: response.status,
                        isRateLimited: false,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Check if retryable error
                const isRetryable = retryableStatuses.includes(response.status);
                const isRateLimit = response.status === 429;
                // If not retryable or last attempt, return error
                if (!isRetryable || attempt === maxRetries - 1) {
                    const errorMessage = data.message || data.reason || data.error || `HTTP ${response.status}`;
                    const errorType = data.errorType || data.code || (isRateLimit ? 'rate_limit' : 'DEXTER_VERIFY_FAILED');
                    return {
                        success: false,
                        valid: false,
                        status: response.status,
                        errorType,
                        errorMessage,
                        isRateLimited: isRateLimit,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Retry with exponential backoff
                const delay = 100 * Math.pow(2, attempt);
                logger.info({
                    component: 'DexterFacilitator',
                    attempt: attempt + 1,
                    maxRetries,
                    status: response.status,
                    delay,
                    isProbe,
                    msg: 'Retrying Dexter verification after transient error'
                });
                await new Promise((resolve)=>setTimeout(resolve, delay));
            } catch (error) {
                const latencyMs = Date.now() - startTime;
                const isTimeout = error?.name === 'AbortError' || error?.message?.toLowerCase().includes('timeout');
                const isNetworkError = error?.message?.toLowerCase().includes('network') || error?.message?.toLowerCase().includes('fetch') || error?.message?.toLowerCase().includes('econnrefused');
                if ((isTimeout || isNetworkError) && attempt < maxRetries - 1) {
                    const delay = 100 * Math.pow(2, attempt);
                    logger.info({
                        component: 'DexterFacilitator',
                        attempt: attempt + 1,
                        maxRetries,
                        error: error?.message,
                        delay,
                        isProbe,
                        msg: 'Retrying Dexter verification after network error'
                    });
                    await new Promise((resolve)=>setTimeout(resolve, delay));
                    continue;
                }
                return {
                    success: false,
                    valid: false,
                    status: 0,
                    errorType: isTimeout ? 'timeout' : isNetworkError ? 'network_error' : 'DEXTER_VERIFY_FAILED',
                    errorMessage: error?.message || 'Dexter verification failed',
                    isRateLimited: false,
                    isNetworkError: isTimeout || isNetworkError,
                    latencyMs
                };
            }
        }
        return {
            success: false,
            valid: false,
            status: 0,
            errorType: 'DEXTER_VERIFY_FAILED',
            errorMessage: 'Max retries exceeded',
            isRateLimited: false,
            isNetworkError: false,
            latencyMs: Date.now() - startTime
        };
    }
    /**
   * Verify payment using Dexter facilitator
   * POST https://facilitator.dexter.cash/verify
   */ async verify(payment, requirements) {
        const start = Date.now();
        // Validate requirements
        const validation = this.validateRequirements(requirements);
        if (!validation.valid) {
            return {
                success: false,
                valid: false,
                error: validation.error,
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        }
        try {
            // Parse payment header
            const { parseX402Header } = await __turbopack_context__.A("[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript, async loader)");
            const parseResult = parseX402Header(payment);
            if (!parseResult.valid || !parseResult.parsed) {
                return {
                    success: false,
                    valid: false,
                    error: parseResult.error || 'Failed to parse payment header',
                    facilitatorId: this.id,
                    verifiedAt: new Date().toISOString()
                };
            }
            const parsed = parseResult.parsed;
            // Detect probe mode
            const isProbe = requirements.resource?.startsWith('https://probe.nexflow.dev/health/') ?? false;
            // Build payment payload
            const paymentPayload = {
                x402Version: 2,
                scheme: requirements.scheme || 'x402',
                network: parsed.network || requirements.network,
                payload: {
                    signature: parsed.signature,
                    authorization: {
                        from: parsed.authorization.from,
                        to: parsed.authorization.to,
                        value: parsed.authorization.value,
                        validAfter: parsed.authorization.validAfter,
                        validBefore: parsed.authorization.validBefore,
                        nonce: parsed.authorization.nonce
                    }
                }
            };
            // Build payment requirements
            const paymentRequirements = {
                scheme: requirements.scheme,
                network: requirements.network,
                maxAmountRequired: requirements.maxAmountRequired,
                resource: requirements.resource,
                description: requirements.description || '',
                mimeType: requirements.mimeType || 'application/json',
                payTo: requirements.payTo,
                maxTimeoutSeconds: requirements.maxTimeoutSeconds || 300,
                asset: requirements.asset
            };
            // POST to Dexter verification endpoint
            const verifyUrl = `${this.baseUrl}/verify`;
            const requestBody = {
                paymentPayload,
                paymentRequirements
            };
            logger.info({
                component: 'DexterFacilitator',
                isProbe,
                network: paymentRequirements.network,
                asset: paymentRequirements.asset,
                url: verifyUrl,
                facilitatorId: this.id,
                facilitatorUrl: this.baseUrl,
                msg: 'Sending Dexter /verify request'
            });
            // Call with retry logic
            const result = await this.callDexterVerifyWithRetries(verifyUrl, requestBody, isProbe);
            // Handle success
            if (result.success && result.valid) {
                logger.info({
                    component: 'DexterFacilitator',
                    facilitatorId: this.id,
                    facilitatorUrl: this.baseUrl,
                    latencyMs: result.latencyMs,
                    network: requirements.network,
                    msg: 'Payment verified successfully by Dexter'
                });
                return {
                    success: true,
                    valid: true,
                    transactionHash: result.data?.transactionHash || result.data?.txHash,
                    facilitatorId: this.id,
                    verifiedAt: new Date().toISOString()
                };
            }
            // Handle error
            const errorType = result.errorType || 'DEXTER_VERIFY_FAILED';
            const errorMessage = result.errorMessage || 'Dexter verification failed';
            let errorCode = 'facilitator_error';
            if (result.isRateLimited || errorType === 'rate_limit') {
                errorCode = 'rate_limited';
            } else if (result.isNetworkError) {
                errorCode = 'network_error';
            } else if (errorType === 'invalid_request' || result.status === 400) {
                errorCode = 'invalid_request';
            }
            logger.debug({
                component: 'DexterFacilitator',
                facilitatorId: this.id,
                status: result.status,
                errorType,
                errorMessage,
                errorCode,
                isRateLimited: result.isRateLimited,
                isNetworkError: result.isNetworkError,
                latencyMs: result.latencyMs,
                msg: 'Dexter verification failed'
            });
            return {
                success: false,
                valid: false,
                error: errorMessage,
                errorDetails: {
                    error: errorMessage,
                    errorType,
                    httpStatus: result.status,
                    errorCode,
                    isRateLimited: result.isRateLimited,
                    isNetworkError: result.isNetworkError,
                    dexterResponse: result.data
                },
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        } catch (error) {
            const latency = Date.now() - start;
            const errorMessage = error instanceof Error ? error.message : 'Verification failed';
            const isTimeout = error instanceof Error && (error.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout'));
            this.getLogger().error({
                error,
                requirements,
                latency,
                isTimeout
            }, 'Dexter verification error');
            return {
                success: false,
                valid: false,
                error: isTimeout ? 'DEXTER_REQUEST_TIMEOUT' : errorMessage,
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        }
    }
    /**
   * Settle payment using Dexter facilitator
   * POST https://facilitator.dexter.cash/settle
   */ async settle(payment, requirements) {
        const start = Date.now();
        try {
            // Parse payment header
            const { parseX402Header } = await __turbopack_context__.A("[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript, async loader)");
            const parseResult = parseX402Header(payment);
            if (!parseResult.valid || !parseResult.parsed) {
                return {
                    success: false,
                    settled: false,
                    error: parseResult.error || 'Failed to parse payment header',
                    facilitatorId: this.id,
                    settledAt: new Date().toISOString()
                };
            }
            const parsed = parseResult.parsed;
            // Build payment payload
            const paymentPayload = {
                x402Version: 2,
                scheme: requirements.scheme || 'x402',
                network: parsed.network || requirements.network,
                payload: {
                    signature: parsed.signature,
                    authorization: {
                        from: parsed.authorization.from,
                        to: parsed.authorization.to,
                        value: parsed.authorization.value,
                        validAfter: parsed.authorization.validAfter,
                        validBefore: parsed.authorization.validBefore,
                        nonce: parsed.authorization.nonce
                    }
                }
            };
            // Build payment requirements
            const paymentRequirements = {
                scheme: requirements.scheme,
                network: requirements.network,
                maxAmountRequired: requirements.maxAmountRequired,
                resource: requirements.resource,
                description: requirements.description || '',
                mimeType: requirements.mimeType || 'application/json',
                payTo: requirements.payTo,
                maxTimeoutSeconds: requirements.maxTimeoutSeconds || 300,
                asset: requirements.asset
            };
            // POST to Dexter settlement endpoint
            const settleUrl = `${this.baseUrl}/settle`;
            const requestBody = {
                paymentPayload,
                paymentRequirements
            };
            logger.info({
                component: 'DexterFacilitator',
                network: paymentRequirements.network,
                asset: paymentRequirements.asset,
                url: settleUrl,
                facilitatorId: this.id,
                facilitatorUrl: this.baseUrl,
                msg: 'Sending Dexter /settle request'
            });
            const response = await fetch(settleUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                signal: AbortSignal.timeout(30000)
            });
            const latencyMs = Date.now() - start;
            const text = await response.text();
            const data = text ? JSON.parse(text) : {};
            if (response.ok && (data.settled === true || data.success === true)) {
                logger.info({
                    component: 'DexterFacilitator',
                    facilitatorId: this.id,
                    facilitatorUrl: this.baseUrl,
                    latencyMs,
                    network: requirements.network,
                    transactionHash: data.transactionHash || data.txHash,
                    msg: 'Payment settled successfully by Dexter'
                });
                return {
                    success: true,
                    settled: true,
                    transactionHash: data.transactionHash || data.txHash,
                    facilitatorId: this.id,
                    settledAt: new Date().toISOString()
                };
            }
            const errorMessage = data.message || data.reason || data.error || `HTTP ${response.status}`;
            logger.error({
                component: 'DexterFacilitator',
                facilitatorId: this.id,
                status: response.status,
                errorMessage,
                latencyMs,
                msg: 'Dexter settlement failed'
            });
            return {
                success: false,
                settled: false,
                error: errorMessage,
                errorDetails: {
                    httpStatus: response.status,
                    dexterResponse: data
                },
                facilitatorId: this.id,
                settledAt: new Date().toISOString()
            };
        } catch (error) {
            const latency = Date.now() - start;
            const errorMessage = error instanceof Error ? error.message : 'Settlement failed';
            const isTimeout = error instanceof Error && (error.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout'));
            this.getLogger().error({
                error,
                requirements,
                latency,
                isTimeout
            }, 'Dexter settlement error');
            return {
                success: false,
                settled: false,
                error: isTimeout ? 'DEXTER_REQUEST_TIMEOUT' : errorMessage,
                facilitatorId: this.id,
                settledAt: new Date().toISOString()
            };
        }
    }
    /**
   * Get Dexter facilitator health
   */ async getHealth() {
        const start = Date.now();
        try {
            // Dexter health check endpoint
            const healthUrl = `${this.baseUrl}/health`;
            const response = await fetch(healthUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: AbortSignal.timeout(5000)
            });
            const latency = Date.now() - start;
            if (response.ok) {
                let data = {};
                try {
                    data = await response.json();
                } catch  {
                // Health endpoint might return simple OK
                }
                return {
                    healthy: true,
                    latency,
                    lastChecked: new Date().toISOString(),
                    capabilities: {
                        networks: data.networks || this.config.networks,
                        assets: data.assets || this.config.assets,
                        schemes: data.schemes || this.config.schemes
                    }
                };
            }
            const errorText = await response.text().catch(()=>`HTTP ${response.status}`);
            return {
                healthy: false,
                latency,
                lastChecked: new Date().toISOString(),
                error: errorText,
                capabilities: {
                    networks: this.config.networks,
                    assets: this.config.assets,
                    schemes: this.config.schemes
                }
            };
        } catch (error) {
            const latency = Date.now() - start;
            const errorMessage = error instanceof Error ? error.message : 'Health check failed';
            const isTimeout = error instanceof Error && (error.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout'));
            return {
                healthy: false,
                latency,
                lastChecked: new Date().toISOString(),
                error: isTimeout ? 'Health check timeout' : errorMessage,
                capabilities: {
                    networks: this.config.networks,
                    assets: this.config.assets,
                    schemes: this.config.schemes
                }
            };
        }
    }
    /**
   * Get pricing information (not available for Dexter yet)
   */ async getPricing(network, asset) {
        // TODO: Implement if Dexter provides pricing API
        return null;
    }
    /**
   * Check if facilitator supports network/asset/scheme
   */ supports(network, asset, scheme, settlementMode) {
        return super.supports(network, asset, scheme, settlementMode);
    }
}
async function dexterVerify(payload) {
    const baseUrl = process.env.DEXTER_FACILITATOR_URL || 'https://facilitator.dexter.cash';
    const verifyUrl = `${baseUrl}/verify`;
    const start = Date.now();
    try {
        const response = await fetch(verifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(10000)
        });
        const latencyMs = Date.now() - start;
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        if (response.ok && data.valid === true) {
            return {
                success: true,
                valid: true,
                transactionHash: data.transactionHash || data.txHash,
                facilitatorId: 'dexter',
                verifiedAt: new Date().toISOString()
            };
        }
        return {
            success: false,
            valid: false,
            error: data.message || data.error || `HTTP ${response.status}`,
            errorDetails: {
                httpStatus: response.status,
                dexterResponse: data,
                latencyMs
            },
            facilitatorId: 'dexter',
            verifiedAt: new Date().toISOString()
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Verification failed';
        return {
            success: false,
            valid: false,
            error: errorMessage,
            facilitatorId: 'dexter',
            verifiedAt: new Date().toISOString()
        };
    }
}
async function dexterSettle(payload) {
    const baseUrl = process.env.DEXTER_FACILITATOR_URL || 'https://facilitator.dexter.cash';
    const settleUrl = `${baseUrl}/settle`;
    const start = Date.now();
    try {
        const response = await fetch(settleUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(30000)
        });
        const latencyMs = Date.now() - start;
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        if (response.ok && (data.settled === true || data.success === true)) {
            return {
                success: true,
                settled: true,
                transactionHash: data.transactionHash || data.txHash,
                facilitatorId: 'dexter',
                settledAt: new Date().toISOString()
            };
        }
        return {
            success: false,
            settled: false,
            error: data.message || data.error || `HTTP ${response.status}`,
            errorDetails: {
                httpStatus: response.status,
                dexterResponse: data,
                latencyMs
            },
            facilitatorId: 'dexter',
            settledAt: new Date().toISOString()
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Settlement failed';
        return {
            success: false,
            settled: false,
            error: errorMessage,
            facilitatorId: 'dexter',
            settledAt: new Date().toISOString()
        };
    }
}
// Singleton instance
let dexterFacilitator = null;
function getDexterFacilitator() {
    if (!dexterFacilitator) {
        dexterFacilitator = new DexterFacilitator();
    }
    return dexterFacilitator;
}
}),
"[externals]/better-sqlite3 [external] (better-sqlite3, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("better-sqlite3", () => require("better-sqlite3"));

module.exports = mod;
}),
"[project]/src/db/adapters/sqlite-adapter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// SQLITE ADAPTER
// =============================================================================
// SQLite implementation of DatabaseAdapter
// Wraps existing better-sqlite3 code for adapter pattern
__turbopack_context__.s([
    "SqliteAdapter",
    ()=>SqliteAdapter
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
;
;
;
// Re-export the schema initialization from metered-endpoints
function initializeSchema(db) {
    // Endpoints table
    db.exec(`
    CREATE TABLE IF NOT EXISTS endpoints (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      upstream_url TEXT NOT NULL,
      price TEXT NOT NULL,
      network TEXT NOT NULL DEFAULT 'base',
      token_address TEXT NOT NULL,
      token_symbol TEXT NOT NULL DEFAULT 'USDC',
      chain_id INTEGER NOT NULL DEFAULT 8453,
      recipient_address TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      created_by TEXT
    )
  `);
    // Migration: Add recipient_address column if it doesn't exist
    try {
        const tableInfo = db.prepare("PRAGMA table_info(endpoints)").all();
        const hasRecipientAddress = tableInfo.some((col)=>col.name === 'recipient_address');
        if (!hasRecipientAddress) {
            db.exec(`ALTER TABLE endpoints ADD COLUMN recipient_address TEXT`);
            console.log('[db] Added recipient_address column');
        }
    } catch (error) {
        if (!error.message?.includes('duplicate column name') && !error.message?.includes('no such column')) {
            console.warn('[db] Migration warning:', error.message);
        }
    }
    // Payments table
    db.exec(`
    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      endpoint_id TEXT NOT NULL,
      tx_hash TEXT NOT NULL UNIQUE,
      from_address TEXT NOT NULL,
      to_address TEXT NOT NULL,
      amount TEXT NOT NULL,
      token_address TEXT NOT NULL,
      network TEXT NOT NULL,
      verified_at TEXT NOT NULL,
      kyt_status TEXT,
      ofac_status TEXT,
      facilitator TEXT NOT NULL DEFAULT 'cdp',
      FOREIGN KEY (endpoint_id) REFERENCES endpoints(id)
    )
  `);
    // Usage logs table
    db.exec(`
    CREATE TABLE IF NOT EXISTS usage_logs (
      id TEXT PRIMARY KEY,
      endpoint_id TEXT NOT NULL,
      payment_id TEXT,
      timestamp TEXT NOT NULL,
      method TEXT NOT NULL,
      path TEXT NOT NULL,
      status_code INTEGER NOT NULL,
      response_time INTEGER NOT NULL,
      units INTEGER NOT NULL DEFAULT 1,
      ip_address TEXT,
      user_agent TEXT,
      FOREIGN KEY (endpoint_id) REFERENCES endpoints(id),
      FOREIGN KEY (payment_id) REFERENCES payments(id)
    )
  `);
    // API keys table
    db.exec(`
    CREATE TABLE IF NOT EXISTS api_keys (
      id TEXT PRIMARY KEY,
      key_hash TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user', 'read-only')),
      user_id TEXT,
      rate_limit INTEGER DEFAULT 1000,
      last_used_at TEXT,
      last_used_ip TEXT,
      expires_at TEXT,
      x402_demo_calls_used INTEGER DEFAULT 0,
      x402_demo_calls_limit INTEGER DEFAULT 200,
      x402_demo_amount_used TEXT DEFAULT '0',
      x402_demo_amount_limit TEXT DEFAULT '1000000',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      revoked_at TEXT
    )
  `);
    // Indexes
    db.exec(`
    CREATE INDEX IF NOT EXISTS idx_payments_endpoint_id ON payments(endpoint_id);
    CREATE INDEX IF NOT EXISTS idx_payments_tx_hash ON payments(tx_hash);
    CREATE INDEX IF NOT EXISTS idx_payments_verified_at ON payments(verified_at);
    CREATE INDEX IF NOT EXISTS idx_usage_logs_endpoint_id ON usage_logs(endpoint_id);
    CREATE INDEX IF NOT EXISTS idx_usage_logs_timestamp ON usage_logs(timestamp);
    CREATE INDEX IF NOT EXISTS idx_usage_logs_payment_id ON usage_logs(payment_id);
    CREATE INDEX IF NOT EXISTS idx_endpoints_status ON endpoints(status);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_api_keys_key_hash ON api_keys(key_hash);
    CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
    CREATE INDEX IF NOT EXISTS idx_api_keys_role ON api_keys(role);
    CREATE INDEX IF NOT EXISTS idx_api_keys_revoked_at ON api_keys(revoked_at);
  `);
}
class SqliteAdapter {
    db;
    constructor(dbPath){
        const DB_PATH = dbPath || __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'metered-endpoints.db');
        // Ensure data directory exists
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(DB_PATH))) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(DB_PATH), {
                recursive: true
            });
        }
        this.db = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__["default"](DB_PATH);
        this.db.pragma('journal_mode = WAL');
        // Initialize schema
        initializeSchema(this.db);
    }
    async healthCheck() {
        try {
            this.db.prepare('SELECT 1').get();
            return true;
        } catch  {
            return false;
        }
    }
    // =============================================================================
    // ENDPOINTS
    // =============================================================================
    async createEndpoint(endpoint) {
        const id = endpoint.id || `ep_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const now = new Date().toISOString();
        this.db.prepare(`
      INSERT INTO endpoints (
        id, name, description, upstream_url, price, network, token_address,
        token_symbol, chain_id, recipient_address, status, created_at, updated_at, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, endpoint.name, endpoint.description || null, endpoint.upstreamUrl, endpoint.price, endpoint.network, endpoint.tokenAddress, endpoint.tokenSymbol, endpoint.chainId, endpoint.recipientAddress, endpoint.status, now, now, endpoint.createdBy || null);
        return Promise.resolve({
            ...endpoint,
            id,
            createdAt: now,
            updatedAt: now
        });
    }
    async getEndpoint(endpointId) {
        const row = this.db.prepare('SELECT * FROM endpoints WHERE id = ? AND status != ?').get(endpointId, 'deleted');
        if (!row) return Promise.resolve(null);
        return Promise.resolve(this.mapRowToEndpoint(row));
    }
    async listEndpoints(filters) {
        let query = 'SELECT * FROM endpoints WHERE status != ?';
        const params = [
            'deleted'
        ];
        if (filters?.status) {
            query += ' AND status = ?';
            params.push(filters.status);
        }
        if (filters?.createdBy) {
            query += ' AND created_by = ?';
            params.push(filters.createdBy);
        }
        query += ' ORDER BY created_at DESC';
        const rows = this.db.prepare(query).all(...params);
        return Promise.resolve(rows.map((row)=>this.mapRowToEndpoint(row)));
    }
    async updateEndpoint(endpointId, updates) {
        const allowedFields = [
            'name',
            'description',
            'upstreamUrl',
            'price',
            'network',
            'tokenAddress',
            'tokenSymbol',
            'chainId',
            'recipientAddress',
            'status'
        ];
        const setClauses = [];
        const values = [];
        for (const [key, value] of Object.entries(updates)){
            if (allowedFields.includes(key) && value !== undefined) {
                const dbKey = key === 'upstreamUrl' ? 'upstream_url' : key === 'tokenAddress' ? 'token_address' : key === 'tokenSymbol' ? 'token_symbol' : key === 'chainId' ? 'chain_id' : key === 'recipientAddress' ? 'recipient_address' : key === 'createdAt' ? 'created_at' : key === 'updatedAt' ? 'updated_at' : key === 'createdBy' ? 'created_by' : key;
                setClauses.push(`${dbKey} = ?`);
                values.push(value);
            }
        }
        if (setClauses.length === 0) {
            return this.getEndpoint(endpointId);
        }
        setClauses.push('updated_at = ?');
        values.push(new Date().toISOString());
        values.push(endpointId);
        this.db.prepare(`UPDATE endpoints SET ${setClauses.join(', ')} WHERE id = ?`).run(...values);
        return this.getEndpoint(endpointId);
    }
    async deleteEndpoint(endpointId) {
        const result = this.db.prepare('UPDATE endpoints SET status = ?, updated_at = ? WHERE id = ?').run('deleted', new Date().toISOString(), endpointId);
        return Promise.resolve(result.changes > 0);
    }
    // =============================================================================
    // PAYMENTS
    // =============================================================================
    async createPayment(payment) {
        const id = `pay_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const verifiedAt = new Date().toISOString();
        this.db.prepare(`
      INSERT INTO payments (
        id, endpoint_id, tx_hash, from_address, to_address, amount,
        token_address, network, verified_at, kyt_status, ofac_status, facilitator
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, payment.endpointId, payment.txHash, payment.fromAddress, payment.toAddress, payment.amount, payment.tokenAddress, payment.network, verifiedAt, payment.kytStatus || null, payment.ofacStatus || null, payment.facilitator);
        return Promise.resolve({
            ...payment,
            id,
            verifiedAt
        });
    }
    async getPayment(paymentId) {
        const row = this.db.prepare('SELECT * FROM payments WHERE id = ?').get(paymentId);
        if (!row) return Promise.resolve(null);
        return Promise.resolve(this.mapRowToPayment(row));
    }
    async getPaymentByTxHash(txHash) {
        const row = this.db.prepare('SELECT * FROM payments WHERE tx_hash = ?').get(txHash);
        if (!row) return Promise.resolve(null);
        return Promise.resolve(this.mapRowToPayment(row));
    }
    async listPayments(filters) {
        let query = 'SELECT * FROM payments WHERE 1=1';
        const params = [];
        if (filters?.endpointId) {
            query += ' AND endpoint_id = ?';
            params.push(filters.endpointId);
        }
        if (filters?.fromAddress) {
            query += ' AND from_address = ?';
            params.push(filters.fromAddress);
        }
        query += ' ORDER BY verified_at DESC';
        const rows = this.db.prepare(query).all(...params);
        return Promise.resolve(rows.map((row)=>this.mapRowToPayment(row)));
    }
    async getPaymentsForEndpoint(endpointId, limit = 100) {
        const rows = this.db.prepare('SELECT * FROM payments WHERE endpoint_id = ? ORDER BY verified_at DESC LIMIT ?').all(endpointId, limit);
        return Promise.resolve(rows.map((row)=>this.mapRowToPayment(row)));
    }
    // =============================================================================
    // USAGE LOGS
    // =============================================================================
    async createUsageLog(log) {
        const id = `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const timestamp = new Date().toISOString();
        // Add tracing columns if they don't exist (migration support)
        try {
            this.db.exec(`
        ALTER TABLE usage_logs ADD COLUMN conversation_id TEXT;
        ALTER TABLE usage_logs ADD COLUMN agent_id TEXT;
        ALTER TABLE usage_logs ADD COLUMN x402_tx_hash TEXT;
        ALTER TABLE usage_logs ADD COLUMN failure_code TEXT;
      `);
        } catch (e) {
            // Columns may already exist, ignore error
            if (!e.message?.includes('duplicate column')) {
                console.warn('[SQLite] Migration warning:', e.message);
            }
        }
        try {
            this.db.prepare(`
        INSERT INTO usage_logs (
          id, endpoint_id, payment_id, timestamp, method, path,
          status_code, response_time, units, ip_address, user_agent,
          conversation_id, agent_id, x402_tx_hash, failure_code
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(id, log.endpointId, log.paymentId || null, timestamp, log.method, log.path, log.statusCode, log.responseTime, log.units, log.ipAddress || null, log.userAgent || null, log.conversationId || null, log.agentId || null, log.x402TxHash || null, log.failureCode || null);
        } catch (dbError) {
            // Log full error details for debugging
            const errorInfo = {
                message: dbError.message || String(dbError),
                code: dbError.code || 'unknown',
                errno: dbError.errno,
                sql: dbError.sql,
                endpointId: log.endpointId,
                table: 'usage_logs'
            };
            console.error('[SQLite] Insert error details:', JSON.stringify(errorInfo, null, 2));
            // Re-throw with more context
            throw new Error(`SQLite insert failed: ${dbError.message || String(dbError)}. ` + `Table: usage_logs, EndpointId: ${log.endpointId}, ` + `Error code: ${dbError.code || 'unknown'}, ` + `SQL: ${dbError.sql || 'N/A'}`);
        }
        return Promise.resolve({
            ...log,
            id,
            timestamp
        });
    }
    async listUsageLogs(filters) {
        let query = 'SELECT * FROM usage_logs WHERE 1=1';
        const params = [];
        if (filters?.endpointId) {
            query += ' AND endpoint_id = ?';
            params.push(filters.endpointId);
        }
        if (filters?.paymentId) {
            query += ' AND payment_id = ?';
            params.push(filters.paymentId);
        }
        query += ' ORDER BY timestamp DESC LIMIT 1000';
        const rows = this.db.prepare(query).all(...params);
        return Promise.resolve(rows.map((row)=>this.mapRowToUsageLog(row)));
    }
    async getUsageStats(endpointId, startDate, endDate) {
        let query = `
      SELECT
        COUNT(*) as total_requests,
        COUNT(DISTINCT payment_id) as total_payments,
        COALESCE(SUM(CAST(p.amount AS INTEGER)), 0) as total_revenue,
        COALESCE(AVG(response_time), 0) as avg_response_time
      FROM usage_logs ul
      LEFT JOIN payments p ON ul.payment_id = p.id
      WHERE ul.endpoint_id = ?
    `;
        const params = [
            endpointId
        ];
        if (startDate) {
            query += ' AND ul.timestamp >= ?';
            params.push(startDate);
        }
        if (endDate) {
            query += ' AND ul.timestamp <= ?';
            params.push(endDate);
        }
        const row = this.db.prepare(query).get(...params);
        return Promise.resolve({
            totalRequests: row.total_requests || 0,
            totalPayments: row.total_payments || 0,
            totalRevenue: row.total_revenue?.toString() || '0',
            averageResponseTime: row.avg_response_time || 0
        });
    }
    // =============================================================================
    // HELPERS
    // =============================================================================
    mapRowToEndpoint(row) {
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            upstreamUrl: row.upstream_url,
            price: row.price,
            network: row.network,
            tokenAddress: row.token_address,
            tokenSymbol: row.token_symbol,
            chainId: row.chain_id,
            recipientAddress: row.recipient_address,
            status: row.status,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            createdBy: row.created_by
        };
    }
    mapRowToPayment(row) {
        return {
            id: row.id,
            endpointId: row.endpoint_id,
            txHash: row.tx_hash,
            fromAddress: row.from_address,
            toAddress: row.to_address,
            amount: row.amount,
            tokenAddress: row.token_address,
            network: row.network,
            verifiedAt: row.verified_at,
            kytStatus: row.kyt_status,
            ofacStatus: row.ofac_status,
            facilitator: row.facilitator
        };
    }
    mapRowToUsageLog(row) {
        return {
            id: row.id,
            endpointId: row.endpoint_id,
            paymentId: row.payment_id,
            timestamp: row.timestamp,
            method: row.method,
            path: row.path,
            statusCode: row.status_code,
            responseTime: row.response_time,
            units: row.units,
            ipAddress: row.ip_address,
            userAgent: row.user_agent,
            conversationId: row.conversation_id,
            agentId: row.agent_id,
            x402TxHash: row.x402_tx_hash,
            failureCode: row.failure_code
        };
    }
    // =============================================================================
    // API KEYS
    // =============================================================================
    async createApiKey(apiKey) {
        this.db.prepare(`INSERT INTO api_keys (id, key_hash, name, role, user_id, rate_limit, expires_at, x402_demo_calls_used, x402_demo_calls_limit, x402_demo_amount_used, x402_demo_amount_limit, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(apiKey.id, apiKey.keyHash, apiKey.name, apiKey.role, apiKey.userId || null, apiKey.rateLimit, apiKey.expiresAt || null, apiKey.x402DemoCallsUsed || 0, apiKey.x402DemoCallsLimit || 200, apiKey.x402DemoAmountUsed || '0', apiKey.x402DemoAmountLimit || '1000000', apiKey.createdAt, apiKey.updatedAt);
        return this.findApiKeyByHash(apiKey.keyHash);
    }
    async findApiKeyByHash(keyHash) {
        const row = this.db.prepare(`SELECT * FROM api_keys WHERE key_hash = ? AND revoked_at IS NULL`).get(keyHash);
        if (!row) return null;
        return {
            id: row.id,
            keyHash: row.key_hash,
            name: row.name,
            role: row.role,
            userId: row.user_id,
            rateLimit: row.rate_limit,
            lastUsedAt: row.last_used_at,
            lastUsedIp: row.last_used_ip,
            expiresAt: row.expires_at,
            x402DemoCallsUsed: row.x402_demo_calls_used || 0,
            x402DemoCallsLimit: row.x402_demo_calls_limit || 200,
            x402DemoAmountUsed: row.x402_demo_amount_used || '0',
            x402DemoAmountLimit: row.x402_demo_amount_limit || '1000000',
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            revokedAt: row.revoked_at
        };
    }
    async updateApiKeyLastUsed(keyId, ipAddress) {
        const now = new Date().toISOString();
        this.db.prepare(`UPDATE api_keys SET last_used_at = ?, last_used_ip = ?, updated_at = ? WHERE id = ?`).run(now, ipAddress || null, now, keyId);
    }
    async updateApiKeyX402DemoAllowance(keyId, callsUsed, amountUsed) {
        const now = new Date().toISOString();
        this.db.prepare(`UPDATE api_keys SET x402_demo_calls_used = ?, x402_demo_amount_used = ?, updated_at = ? WHERE id = ?`).run(callsUsed, amountUsed, now, keyId);
    }
    async updateApiKeyX402DemoLimits(keyId, callsLimit, amountLimit) {
        const now = new Date().toISOString();
        if (callsLimit !== undefined && amountLimit !== undefined) {
            this.db.prepare(`UPDATE api_keys SET x402_demo_calls_limit = ?, x402_demo_amount_limit = ?, updated_at = ? WHERE id = ?`).run(callsLimit, amountLimit, now, keyId);
        } else if (callsLimit !== undefined) {
            this.db.prepare(`UPDATE api_keys SET x402_demo_calls_limit = ?, updated_at = ? WHERE id = ?`).run(callsLimit, now, keyId);
        } else if (amountLimit !== undefined) {
            this.db.prepare(`UPDATE api_keys SET x402_demo_amount_limit = ?, updated_at = ? WHERE id = ?`).run(amountLimit, now, keyId);
        }
    }
    async revokeApiKey(keyId) {
        const now = new Date().toISOString();
        const result = this.db.prepare(`UPDATE api_keys SET revoked_at = ?, updated_at = ? WHERE id = ? AND revoked_at IS NULL`).run(now, now, keyId);
        return result.changes > 0;
    }
    async listApiKeys(userId) {
        let query = `SELECT * FROM api_keys WHERE revoked_at IS NULL`;
        const params = [];
        if (userId) {
            query += ` AND user_id = ?`;
            params.push(userId);
        }
        query += ` ORDER BY created_at DESC`;
        const rows = this.db.prepare(query).all(...params);
        return Promise.resolve(rows.map((row)=>({
                id: row.id,
                keyHash: row.key_hash,
                name: row.name,
                role: row.role,
                userId: row.user_id,
                rateLimit: row.rate_limit,
                lastUsedAt: row.last_used_at,
                lastUsedIp: row.last_used_ip,
                expiresAt: row.expires_at,
                x402DemoCallsUsed: row.x402_demo_calls_used || 0,
                x402DemoCallsLimit: row.x402_demo_calls_limit || 200,
                x402DemoAmountUsed: row.x402_demo_amount_used || '0',
                x402DemoAmountLimit: row.x402_demo_amount_limit || '1000000',
                createdAt: row.created_at,
                updatedAt: row.updated_at,
                revokedAt: row.revoked_at
            })));
    }
    close() {
        this.db.close();
    }
}
}),
"[project]/src/db/adapters/postgres-adapter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// POSTGRESQL ADAPTER
// =============================================================================
// PostgreSQL implementation of DatabaseAdapter
// Uses pg (node-postgres) with connection pooling
__turbopack_context__.s([
    "PostgresAdapter",
    ()=>PostgresAdapter
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
class PostgresAdapter {
    pool;
    constructor(connectionString){
        this.pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
            connectionString,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000
        });
        // Handle pool errors
        this.pool.on('error', (err)=>{
            console.error('[PostgresAdapter] Unexpected pool error:', err);
        });
    }
    async healthCheck() {
        try {
            const result = await this.pool.query('SELECT 1');
            return result.rows.length > 0;
        } catch (error) {
            console.error('[PostgresAdapter] Health check failed:', error);
            return false;
        }
    }
    // =============================================================================
    // ENDPOINTS
    // =============================================================================
    async createEndpoint(endpoint) {
        const id = endpoint.id || `ep_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const now = new Date().toISOString();
        const result = await this.pool.query(`INSERT INTO endpoints (
        id, name, description, upstream_url, price, network, token_address,
        token_symbol, chain_id, recipient_address, status, created_at, updated_at, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`, [
            id,
            endpoint.name,
            endpoint.description || null,
            endpoint.upstreamUrl,
            endpoint.price,
            endpoint.network,
            endpoint.tokenAddress,
            endpoint.tokenSymbol,
            endpoint.chainId,
            endpoint.recipientAddress,
            endpoint.status,
            now,
            now,
            endpoint.createdBy || null
        ]);
        return this.mapRowToEndpoint(result.rows[0]);
    }
    async getEndpoint(endpointId) {
        const result = await this.pool.query('SELECT * FROM endpoints WHERE id = $1 AND status != $2', [
            endpointId,
            'deleted'
        ]);
        if (result.rows.length === 0) return null;
        return this.mapRowToEndpoint(result.rows[0]);
    }
    async listEndpoints(filters) {
        let query = 'SELECT * FROM endpoints WHERE status != $1';
        const params = [
            'deleted'
        ];
        let paramIndex = 2;
        if (filters?.status) {
            query += ` AND status = $${paramIndex}`;
            params.push(filters.status);
            paramIndex++;
        }
        if (filters?.createdBy) {
            query += ` AND created_by = $${paramIndex}`;
            params.push(filters.createdBy);
            paramIndex++;
        }
        query += ' ORDER BY created_at DESC';
        try {
            const result = await this.pool.query(query, params);
            return result.rows.map((row)=>this.mapRowToEndpoint(row));
        } catch (error) {
            console.error('[PostgresAdapter] listEndpoints error:', error);
            console.error('[PostgresAdapter] Query:', query);
            console.error('[PostgresAdapter] Params:', params);
            throw error;
        }
    }
    async updateEndpoint(endpointId, updates) {
        const allowedFields = [
            'name',
            'description',
            'upstreamUrl',
            'price',
            'network',
            'tokenAddress',
            'tokenSymbol',
            'chainId',
            'recipientAddress',
            'status'
        ];
        const setClauses = [];
        const values = [];
        let paramIndex = 1;
        for (const [key, value] of Object.entries(updates)){
            if (allowedFields.includes(key) && value !== undefined) {
                const dbKey = key === 'upstreamUrl' ? 'upstream_url' : key === 'tokenAddress' ? 'token_address' : key === 'tokenSymbol' ? 'token_symbol' : key === 'chainId' ? 'chain_id' : key === 'recipientAddress' ? 'recipient_address' : key === 'createdAt' ? 'created_at' : key === 'updatedAt' ? 'updated_at' : key === 'createdBy' ? 'created_by' : key;
                setClauses.push(`${dbKey} = $${paramIndex}`);
                values.push(value);
                paramIndex++;
            }
        }
        if (setClauses.length === 0) {
            return this.getEndpoint(endpointId);
        }
        setClauses.push(`updated_at = $${paramIndex}`);
        values.push(new Date().toISOString());
        paramIndex++;
        values.push(endpointId);
        const result = await this.pool.query(`UPDATE endpoints SET ${setClauses.join(', ')} WHERE id = $${paramIndex} RETURNING *`, values);
        if (result.rows.length === 0) return null;
        return this.mapRowToEndpoint(result.rows[0]);
    }
    async deleteEndpoint(endpointId) {
        const result = await this.pool.query('UPDATE endpoints SET status = $1, updated_at = $2 WHERE id = $3', [
            'deleted',
            new Date().toISOString(),
            endpointId
        ]);
        return result.rowCount !== null && result.rowCount > 0;
    }
    // =============================================================================
    // PAYMENTS
    // =============================================================================
    async createPayment(payment) {
        const id = `pay_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const now = new Date().toISOString();
        const verifiedAt = now;
        // Generate invoice_id if not provided (required by schema)
        const invoiceId = `inv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        // Determine currency and token symbol from token address or default to USDC
        // For USDC on Base: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
        const currency = payment.tokenAddress === '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' ? 'USDC' : 'USDC';
        const token = payment.tokenAddress; // token column stores the token address
        // Set default status for verified payments
        const status = 'verified'; // Payment is verified and completed
        const result = await this.pool.query(`INSERT INTO payments (
        id, endpoint_id, invoice_id, tx_hash, from_address, to_address, amount,
        currency, token, token_address, network, status, created_at, verified_at, kyt_status, ofac_status, facilitator
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *`, [
            id,
            payment.endpointId,
            invoiceId,
            payment.txHash,
            payment.fromAddress,
            payment.toAddress,
            payment.amount,
            currency,
            token,
            payment.tokenAddress,
            payment.network,
            status,
            now,
            verifiedAt,
            payment.kytStatus || null,
            payment.ofacStatus || null,
            payment.facilitator
        ]);
        return this.mapRowToPayment(result.rows[0]);
    }
    async getPayment(paymentId) {
        const result = await this.pool.query('SELECT * FROM payments WHERE id = $1', [
            paymentId
        ]);
        if (result.rows.length === 0) return null;
        return this.mapRowToPayment(result.rows[0]);
    }
    async getPaymentByTxHash(txHash) {
        const result = await this.pool.query('SELECT * FROM payments WHERE tx_hash = $1', [
            txHash
        ]);
        if (result.rows.length === 0) return null;
        return this.mapRowToPayment(result.rows[0]);
    }
    async listPayments(filters) {
        let query = 'SELECT * FROM payments WHERE 1=1';
        const params = [];
        let paramIndex = 1;
        if (filters?.endpointId) {
            query += ` AND endpoint_id = $${paramIndex}`;
            params.push(filters.endpointId);
            paramIndex++;
        }
        if (filters?.fromAddress) {
            query += ` AND from_address = $${paramIndex}`;
            params.push(filters.fromAddress);
            paramIndex++;
        }
        query += ' ORDER BY verified_at DESC';
        const result = await this.pool.query(query, params);
        return result.rows.map((row)=>this.mapRowToPayment(row));
    }
    async getPaymentsForEndpoint(endpointId, limit = 100) {
        const result = await this.pool.query('SELECT * FROM payments WHERE endpoint_id = $1 ORDER BY verified_at DESC LIMIT $2', [
            endpointId,
            limit
        ]);
        return result.rows.map((row)=>this.mapRowToPayment(row));
    }
    // =============================================================================
    // USAGE LOGS
    // =============================================================================
    async createUsageLog(log) {
        const id = `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const timestamp = new Date().toISOString();
        const result = await this.pool.query(`INSERT INTO usage_logs (
        id, endpoint_id, payment_id, timestamp, method, path,
        status_code, response_time, units, ip_address, user_agent,
        conversation_id, agent_id, x402_tx_hash, failure_code
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`, [
            id,
            log.endpointId,
            log.paymentId || null,
            timestamp,
            log.method,
            log.path,
            log.statusCode,
            log.responseTime,
            log.units,
            log.ipAddress || null,
            log.userAgent || null,
            log.conversationId || null,
            log.agentId || null,
            log.x402TxHash || null,
            log.failureCode || null
        ]);
        return this.mapRowToUsageLog(result.rows[0]);
    }
    async listUsageLogs(filters) {
        let query = 'SELECT * FROM usage_logs WHERE 1=1';
        const params = [];
        let paramIndex = 1;
        if (filters?.endpointId) {
            query += ` AND endpoint_id = $${paramIndex}`;
            params.push(filters.endpointId);
            paramIndex++;
        }
        if (filters?.paymentId) {
            query += ` AND payment_id = $${paramIndex}`;
            params.push(filters.paymentId);
            paramIndex++;
        }
        query += ' ORDER BY timestamp DESC LIMIT 1000';
        const result = await this.pool.query(query, params);
        return result.rows.map((row)=>this.mapRowToUsageLog(row));
    }
    async getUsageStats(endpointId, startDate, endDate) {
        let query = `
      SELECT
        COUNT(*) as total_requests,
        COUNT(DISTINCT payment_id) as total_payments,
        COALESCE(SUM(p.amount), '0') as total_revenue,
        COALESCE(AVG(response_time), 0) as avg_response_time
      FROM usage_logs ul
      LEFT JOIN payments p ON ul.payment_id = p.id
      WHERE ul.endpoint_id = $1
    `;
        const params = [
            endpointId
        ];
        let paramIndex = 2;
        if (startDate) {
            query += ` AND ul.timestamp >= $${paramIndex}`;
            params.push(startDate);
            paramIndex++;
        }
        if (endDate) {
            query += ` AND ul.timestamp <= $${paramIndex}`;
            params.push(endDate);
            paramIndex++;
        }
        const result = await this.pool.query(query, params);
        const row = result.rows[0];
        return {
            totalRequests: parseInt(row.total_requests) || 0,
            totalPayments: parseInt(row.total_payments) || 0,
            totalRevenue: row.total_revenue || '0',
            averageResponseTime: parseFloat(row.avg_response_time) || 0
        };
    }
    // =============================================================================
    // HELPERS
    // =============================================================================
    mapRowToEndpoint(row) {
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            upstreamUrl: row.upstream_url,
            price: row.price,
            network: row.network,
            tokenAddress: row.token_address,
            tokenSymbol: row.token_symbol,
            chainId: row.chain_id,
            recipientAddress: row.recipient_address,
            status: row.status,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            createdBy: row.created_by
        };
    }
    mapRowToPayment(row) {
        return {
            id: row.id,
            endpointId: row.endpoint_id,
            txHash: row.tx_hash,
            fromAddress: row.from_address,
            toAddress: row.to_address,
            amount: row.amount,
            tokenAddress: row.token_address,
            network: row.network,
            verifiedAt: row.verified_at,
            kytStatus: row.kyt_status,
            ofacStatus: row.ofac_status,
            facilitator: row.facilitator
        };
    }
    mapRowToUsageLog(row) {
        return {
            id: row.id,
            endpointId: row.endpoint_id,
            paymentId: row.payment_id,
            timestamp: row.timestamp,
            method: row.method,
            path: row.path,
            statusCode: row.status_code,
            responseTime: row.response_time,
            units: row.units,
            ipAddress: row.ip_address,
            userAgent: row.user_agent,
            conversationId: row.conversation_id,
            agentId: row.agent_id,
            x402TxHash: row.x402_tx_hash,
            failureCode: row.failure_code
        };
    }
    // =============================================================================
    // API KEYS
    // =============================================================================
    async createApiKey(apiKey) {
        await this.pool.query(`INSERT INTO api_keys (id, key_hash, name, role, user_id, rate_limit, expires_at, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
            apiKey.id,
            apiKey.keyHash,
            apiKey.name,
            apiKey.role,
            apiKey.userId || null,
            apiKey.rateLimit,
            apiKey.expiresAt || null,
            apiKey.createdAt,
            apiKey.updatedAt
        ]);
        return this.findApiKeyByHash(apiKey.keyHash);
    }
    async findApiKeyByHash(keyHash) {
        const result = await this.pool.query(`SELECT * FROM api_keys WHERE key_hash = $1 AND revoked_at IS NULL`, [
            keyHash
        ]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return {
            id: row.id,
            keyHash: row.key_hash,
            name: row.name,
            role: row.role,
            userId: row.user_id,
            rateLimit: row.rate_limit,
            lastUsedAt: row.last_used_at,
            lastUsedIp: row.last_used_ip,
            expiresAt: row.expires_at,
            x402DemoCallsUsed: row.x402_demo_calls_used || 0,
            x402DemoCallsLimit: row.x402_demo_calls_limit || 200,
            x402DemoAmountUsed: row.x402_demo_amount_used || '0',
            x402DemoAmountLimit: row.x402_demo_amount_limit || '1000000',
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            revokedAt: row.revoked_at
        };
    }
    async updateApiKeyLastUsed(keyId, ipAddress) {
        await this.pool.query(`UPDATE api_keys SET last_used_at = NOW(), last_used_ip = $2, updated_at = NOW() WHERE id = $1`, [
            keyId,
            ipAddress || null
        ]);
    }
    async updateApiKeyX402DemoAllowance(keyId, callsUsed, amountUsed) {
        await this.pool.query(`UPDATE api_keys SET x402_demo_calls_used = $2, x402_demo_amount_used = $3, updated_at = NOW() WHERE id = $1`, [
            keyId,
            callsUsed,
            amountUsed
        ]);
    }
    async updateApiKeyX402DemoLimits(keyId, callsLimit, amountLimit) {
        if (callsLimit !== undefined && amountLimit !== undefined) {
            await this.pool.query(`UPDATE api_keys SET x402_demo_calls_limit = $2, x402_demo_amount_limit = $3, updated_at = NOW() WHERE id = $1`, [
                keyId,
                callsLimit,
                amountLimit
            ]);
        } else if (callsLimit !== undefined) {
            await this.pool.query(`UPDATE api_keys SET x402_demo_calls_limit = $2, updated_at = NOW() WHERE id = $1`, [
                keyId,
                callsLimit
            ]);
        } else if (amountLimit !== undefined) {
            await this.pool.query(`UPDATE api_keys SET x402_demo_amount_limit = $2, updated_at = NOW() WHERE id = $1`, [
                keyId,
                amountLimit
            ]);
        }
    }
    async revokeApiKey(keyId) {
        const result = await this.pool.query(`UPDATE api_keys SET revoked_at = NOW(), updated_at = NOW() WHERE id = $1 AND revoked_at IS NULL`, [
            keyId
        ]);
        return result.rowCount > 0;
    }
    async listApiKeys(userId) {
        let query = `SELECT * FROM api_keys WHERE revoked_at IS NULL`;
        const params = [];
        if (userId) {
            query += ` AND user_id = $1`;
            params.push(userId);
        }
        query += ` ORDER BY created_at DESC`;
        const result = await this.pool.query(query, params);
        return result.rows.map((row)=>({
                id: row.id,
                keyHash: row.key_hash,
                name: row.name,
                role: row.role,
                userId: row.user_id,
                rateLimit: row.rate_limit,
                lastUsedAt: row.last_used_at,
                lastUsedIp: row.last_used_ip,
                expiresAt: row.expires_at,
                x402DemoCallsUsed: row.x402_demo_calls_used || 0,
                x402DemoCallsLimit: row.x402_demo_calls_limit || 200,
                x402DemoAmountUsed: row.x402_demo_amount_used || '0',
                x402DemoAmountLimit: row.x402_demo_amount_limit || '1000000',
                createdAt: row.created_at,
                updatedAt: row.updated_at,
                revokedAt: row.revoked_at
            }));
    }
    async close() {
        await this.pool.end();
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// DATABASE CLIENT FACTORY
// =============================================================================
// Automatically selects SQLite (dev) or PostgreSQL (prod) based on environment
__turbopack_context__.s([
    "closeDb",
    ()=>closeDb,
    "getDb",
    ()=>getDb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$adapters$2f$sqlite$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/adapters/sqlite-adapter.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$adapters$2f$postgres$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/adapters/postgres-adapter.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$adapters$2f$postgres$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$adapters$2f$postgres$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
let dbAdapter = null;
function getDb() {
    if (dbAdapter) {
        return dbAdapter;
    }
    const databaseUrl = process.env.DATABASE_URL;
    if (databaseUrl && databaseUrl.startsWith('postgresql://')) {
        // Production: Use PostgreSQL
        console.log('[db] Using PostgreSQL adapter');
        dbAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$adapters$2f$postgres$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostgresAdapter"](databaseUrl);
    } else {
        // Development: Use SQLite
        console.log('[db] Using SQLite adapter (development mode)');
        dbAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$adapters$2f$sqlite$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SqliteAdapter"]();
    }
    return dbAdapter;
}
async function closeDb() {
    if (dbAdapter) {
        if ('close' in dbAdapter && typeof dbAdapter.close === 'function') {
            await dbAdapter.close();
        }
        dbAdapter = null;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/smf.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// SMF DATABASE OPERATIONS
// =============================================================================
// Database operations for Smart Meta-Facilitator routing, attempts, and health
__turbopack_context__.s([
    "createRoute",
    ()=>createRoute,
    "createRouteAttempt",
    ()=>createRouteAttempt,
    "getFacilitatorCapabilities",
    ()=>getFacilitatorCapabilities,
    "getLatestHealthSnapshot",
    ()=>getLatestHealthSnapshot,
    "getRouteAttemptsForHealth",
    ()=>getRouteAttemptsForHealth,
    "recordFacilitatorProbeEvent",
    ()=>recordFacilitatorProbeEvent,
    "updateRouteStatus",
    ()=>updateRouteStatus,
    "upsertHealthSnapshot",
    ()=>upsertHealthSnapshot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'SMFDatabase'
});
async function createRoute(route) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        const result = await db.pool.query(`INSERT INTO routes (
        id, request_id, correlation_id, client_id, agent_id, network, token, amount,
        selected_facilitator_id, status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`, [
            id,
            route.request_id,
            route.correlation_id,
            route.client_id,
            route.agent_id,
            route.network,
            route.token,
            route.amount,
            route.selected_facilitator_id,
            route.status,
            now,
            now
        ]);
        return result.rows[0];
    } else {
        // SQLite
        const stmt = db.prepare(`
      INSERT INTO routes (
        id, request_id, correlation_id, client_id, agent_id, network, token, amount,
        selected_facilitator_id, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        stmt.run(id, route.request_id, route.correlation_id, route.client_id, route.agent_id, route.network, route.token, route.amount, route.selected_facilitator_id, route.status, now, now);
        return {
            id,
            ...route,
            created_at: now,
            updated_at: now,
            completed_at: null
        };
    }
}
async function updateRouteStatus(routeId, status, completedAt) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const now = new Date().toISOString();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        await db.pool.query(`UPDATE routes SET status = $1, updated_at = $2, completed_at = $3 WHERE id = $4`, [
            status,
            now,
            completedAt || null,
            routeId
        ]);
    } else {
        // SQLite
        const stmt = db.prepare(`UPDATE routes SET status = ?, updated_at = ?, completed_at = ? WHERE id = ?`);
        stmt.run(status, now, completedAt || null, routeId);
    }
}
async function createRouteAttempt(attempt) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        const result = await db.pool.query(`INSERT INTO route_attempts (
        id, route_id, facilitator_id, phase, result, latency_ms, error_code, raw_status, is_probe, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`, [
            id,
            attempt.route_id,
            attempt.facilitator_id,
            attempt.phase,
            attempt.result,
            attempt.latency_ms,
            attempt.error_code,
            attempt.raw_status,
            attempt.is_probe ?? false,
            now
        ]);
        return result.rows[0];
    } else {
        // SQLite
        const stmt = db.prepare(`
      INSERT INTO route_attempts (
        id, route_id, facilitator_id, phase, result, latency_ms, error_code, raw_status, is_probe, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        stmt.run(id, attempt.route_id, attempt.facilitator_id, attempt.phase, attempt.result, attempt.latency_ms, attempt.error_code, attempt.raw_status, attempt.is_probe ?? false, now);
        return {
            id,
            ...attempt,
            created_at: now
        };
    }
}
async function getFacilitatorCapabilities(facilitatorId, network, token) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    let query = 'SELECT * FROM facilitator_capabilities WHERE 1=1';
    const params = [];
    let paramIndex = 1;
    if (facilitatorId) {
        if (isPostgres) {
            query += ` AND facilitator_id = $${paramIndex++}`;
            params.push(facilitatorId);
        } else {
            query += ` AND facilitator_id = ?`;
            params.push(facilitatorId);
        }
    }
    if (network) {
        if (isPostgres) {
            query += ` AND network = $${paramIndex++}`;
            params.push(network);
        } else {
            query += ` AND network = ?`;
            params.push(network);
        }
    }
    if (token) {
        if (isPostgres) {
            query += ` AND token = $${paramIndex++}`;
            params.push(token);
        } else {
            query += ` AND token = ?`;
            params.push(token);
        }
    }
    if (isPostgres) {
        const result = await db.pool.query(query, params);
        return result.rows;
    } else {
        // SQLite
        const stmt = db.prepare(query);
        const rows = stmt.all(...params);
        return rows;
    }
}
async function getLatestHealthSnapshot(facilitatorId, network, token) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        const result = await db.pool.query(`SELECT * FROM facilitator_health_snapshots
       WHERE facilitator_id = $1 AND network = $2 AND token = $3
       ORDER BY window_end DESC
       LIMIT 1`, [
            facilitatorId,
            network,
            token
        ]);
        return result.rows[0] || null;
    } else {
        // SQLite
        const stmt = db.prepare(`SELECT * FROM facilitator_health_snapshots
       WHERE facilitator_id = ? AND network = ? AND token = ?
       ORDER BY window_end DESC
       LIMIT 1`);
        const row = stmt.get(facilitatorId, network, token);
        return row || null;
    }
}
async function getRouteAttemptsForHealth(facilitatorId, network, token, windowStart, windowEnd, includeProbes = true) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    // Build probe route_id pattern for matching
    const probePattern = `probe-${facilitatorId}-${network}-${token}%`;
    if (isPostgres) {
        // For probes, route_id starts with "probe-{facilitatorId}-{network}-{token}"
        // For real routes, we join with routes table
        const result = await db.pool.query(`SELECT ra.* FROM route_attempts ra
       LEFT JOIN routes r ON (ra.route_id = r.id AND ra.is_probe = false)
       WHERE ra.facilitator_id = $1
         AND (
           (ra.is_probe = true AND ra.route_id LIKE $2)
           OR (ra.is_probe = false AND r.network = $3 AND r.token = $4)
         )
         AND ra.created_at >= $5
         AND ra.created_at < $6
       ORDER BY ra.created_at`, [
            facilitatorId,
            probePattern,
            network,
            token,
            windowStart,
            windowEnd
        ]);
        return result.rows;
    } else {
        // SQLite - similar logic
        const stmt = db.prepare(`SELECT ra.* FROM route_attempts ra
       LEFT JOIN routes r ON (ra.route_id = r.id AND ra.is_probe = 0)
       WHERE ra.facilitator_id = ?
         AND (
           (ra.is_probe = 1 AND ra.route_id LIKE ?)
           OR (ra.is_probe = 0 AND r.network = ? AND r.token = ?)
         )
         AND ra.created_at >= ?
         AND ra.created_at < ?
       ORDER BY ra.created_at`);
        const rows = stmt.all(facilitatorId, probePattern, network, token, windowStart, windowEnd);
        return rows;
    }
}
async function upsertHealthSnapshot(snapshot) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        // Use ON CONFLICT for upsert
        const result = await db.pool.query(`INSERT INTO facilitator_health_snapshots (
        id, facilitator_id, network, token, window_start, window_end,
        success_rate, p50_latency_ms, p95_latency_ms, p99_latency_ms,
        error_rate, last_error_type, status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      ON CONFLICT (facilitator_id, network, token, window_end)
      DO UPDATE SET
        success_rate = EXCLUDED.success_rate,
        p50_latency_ms = EXCLUDED.p50_latency_ms,
        p95_latency_ms = EXCLUDED.p95_latency_ms,
        p99_latency_ms = EXCLUDED.p99_latency_ms,
        error_rate = EXCLUDED.error_rate,
        last_error_type = EXCLUDED.last_error_type,
        status = EXCLUDED.status
      RETURNING *`, [
            id,
            snapshot.facilitator_id,
            snapshot.network,
            snapshot.token,
            snapshot.window_start,
            snapshot.window_end,
            snapshot.success_rate,
            snapshot.p50_latency_ms,
            snapshot.p95_latency_ms,
            snapshot.p99_latency_ms,
            snapshot.error_rate,
            snapshot.last_error_type,
            snapshot.status,
            now
        ]);
        return result.rows[0];
    } else {
        // SQLite - simple insert (no upsert for now)
        const stmt = db.prepare(`
      INSERT INTO facilitator_health_snapshots (
        id, facilitator_id, network, token, window_start, window_end,
        success_rate, p50_latency_ms, p95_latency_ms, p99_latency_ms,
        error_rate, last_error_type, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        stmt.run(id, snapshot.facilitator_id, snapshot.network, snapshot.token, snapshot.window_start, snapshot.window_end, snapshot.success_rate, snapshot.p50_latency_ms, snapshot.p95_latency_ms, snapshot.p99_latency_ms, snapshot.error_rate, snapshot.last_error_type, snapshot.status, now);
        return {
            id,
            ...snapshot,
            created_at: now
        };
    }
}
async function recordFacilitatorProbeEvent(event) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        await db.pool.query(`INSERT INTO facilitator_probe_events (
        probe_config_id, facilitator_id, network, token, result,
        error_code, facilitator_status, facilitator_error_code, latency_ms
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
            event.probe_config_id,
            event.facilitator_id,
            event.network,
            event.token,
            event.result,
            event.error_code,
            event.facilitator_status,
            event.facilitator_error_code,
            event.latency_ms
        ]);
    } else {
        // SQLite - table might not exist, skip silently
        logger.warn('facilitator_probe_events table not available in SQLite');
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/integrations/x402/facilitators/health-aggregator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// HEALTH AGGREGATOR
// =============================================================================
// Aggregates health metrics from route attempts for scoring and monitoring
__turbopack_context__.s([
    "aggregateHealthMetrics",
    ()=>aggregateHealthMetrics,
    "getCurrentHealth",
    ()=>getCurrentHealth,
    "updateHealthSnapshots",
    ()=>updateHealthSnapshots
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/smf.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'HealthAggregator'
});
/**
 * Calculate percentile from sorted array
 */ function percentile(sortedValues, p) {
    if (sortedValues.length === 0) return 0;
    const index = Math.ceil(p / 100 * sortedValues.length) - 1;
    return sortedValues[Math.max(0, index)];
}
async function aggregateHealthMetrics(facilitatorId, network, token, windowStart, windowEnd) {
    try {
        const attempts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRouteAttemptsForHealth"])(facilitatorId, network, token, windowStart.toISOString(), windowEnd.toISOString());
        if (attempts.length === 0) {
            logger.debug({
                facilitatorId,
                network,
                token
            }, 'No attempts found for health aggregation');
            return null;
        }
        // Calculate success rate
        const successful = attempts.filter((a)=>a.result === 'success').length;
        const successRate = successful / attempts.length;
        // Calculate latency percentiles
        const latencies = attempts.map((a)=>a.latency_ms).filter((l)=>l > 0).sort((a, b)=>a - b);
        const p50 = latencies.length > 0 ? percentile(latencies, 50) : null;
        const p95 = latencies.length > 0 ? percentile(latencies, 95) : null;
        const p99 = latencies.length > 0 ? percentile(latencies, 99) : null;
        // Calculate error rate
        const errors = attempts.filter((a)=>a.result !== 'success').length;
        const errorRate = errors / attempts.length;
        // Get last error type
        const failedAttempts = attempts.filter((a)=>a.result !== 'success');
        const lastErrorType = failedAttempts.length > 0 ? failedAttempts[failedAttempts.length - 1].result : null;
        // Determine status
        let status = 'healthy';
        if (successRate < 0.5) {
            status = 'down';
        } else if (successRate < 0.9 || p95 && p95 > 5000) {
            status = 'degraded';
        }
        const snapshot = {
            facilitator_id: facilitatorId,
            network,
            token,
            window_start: windowStart.toISOString(),
            window_end: windowEnd.toISOString(),
            success_rate: successRate,
            p50_latency_ms: p50,
            p95_latency_ms: p95,
            p99_latency_ms: p99,
            error_rate: errorRate,
            last_error_type: lastErrorType,
            status
        };
        const saved = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upsertHealthSnapshot"])(snapshot);
        logger.info({
            facilitatorId,
            network,
            token,
            successRate,
            p95Latency: p95,
            status,
            attempts: attempts.length
        }, 'Health snapshot created');
        return saved;
    } catch (error) {
        logger.error({
            error,
            facilitatorId,
            network,
            token
        }, 'Failed to aggregate health metrics');
        return null;
    }
}
async function getCurrentHealth(facilitatorId, network, token, windowMinutes = 15) {
    // Try to get latest snapshot first
    const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLatestHealthSnapshot"])(facilitatorId, network, token);
    if (snapshot) {
        const snapshotAge = Date.now() - new Date(snapshot.window_end).getTime();
        const maxAge = windowMinutes * 60 * 1000;
        // If snapshot is recent enough, use it
        if (snapshotAge < maxAge) {
            return {
                successRate: Number(snapshot.success_rate),
                p50LatencyMs: snapshot.p50_latency_ms,
                p95LatencyMs: snapshot.p95_latency_ms,
                p99LatencyMs: snapshot.p99_latency_ms,
                errorRate: Number(snapshot.error_rate),
                lastErrorType: snapshot.last_error_type,
                status: snapshot.status
            };
        }
    }
    // Otherwise, calculate from recent attempts
    const windowEnd = new Date();
    const windowStart = new Date(windowEnd.getTime() - windowMinutes * 60 * 1000);
    const aggregated = await aggregateHealthMetrics(facilitatorId, network, token, windowStart, windowEnd);
    if (aggregated) {
        return {
            successRate: Number(aggregated.success_rate),
            p50LatencyMs: aggregated.p50_latency_ms,
            p95LatencyMs: aggregated.p95_latency_ms,
            p99LatencyMs: aggregated.p99_latency_ms,
            errorRate: Number(aggregated.error_rate),
            lastErrorType: aggregated.last_error_type,
            status: aggregated.status
        };
    }
    // Default values if no data
    return {
        successRate: 1.0,
        p50LatencyMs: null,
        p95LatencyMs: null,
        p99LatencyMs: null,
        errorRate: 0.0,
        lastErrorType: null,
        status: 'healthy'
    };
}
async function updateHealthSnapshots(windowMinutes = 15) {
    logger.info({
        windowMinutes
    }, 'Starting health snapshot update');
    // Get all unique facilitator/network/token combinations from recent routes
    // For now, we'll focus on CDP/Base/USDC - can be expanded later
    const combinations = [
        {
            facilitatorId: 'cdp',
            network: 'base',
            token: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
        }
    ];
    const windowEnd = new Date();
    const windowStart = new Date(windowEnd.getTime() - windowMinutes * 60 * 1000);
    await Promise.all(combinations.map(async (combo)=>{
        try {
            await aggregateHealthMetrics(combo.facilitatorId, combo.network, combo.token, windowStart, windowEnd);
        } catch (error) {
            logger.error({
                error,
                ...combo
            }, 'Failed to update health snapshot');
        }
    }));
    logger.info('Health snapshot update complete');
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/integrations/x402/facilitators/dummy-facilitator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// DUMMY FACILITATOR (FOR TESTING)
// =============================================================================
// Test facilitator that wraps CDP or provides mock behavior
// Used to test routing logic, priority ties, failover, etc.
__turbopack_context__.s([
    "DummyFacilitator",
    ()=>DummyFacilitator,
    "createDummyFacilitator",
    ()=>createDummyFacilitator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/base-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$cdp$2d$facilitator$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/cdp-facilitator-adapter.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'DummyFacilitator'
});
class DummyFacilitator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseFacilitator"] {
    id;
    name;
    config;
    wrapCDP;
    mockBehavior;
    cdpAdapter;
    constructor(id = 'dummy', name = 'Dummy Facilitator', config = {}, options = {}){
        super();
        this.id = id;
        this.name = name;
        this.wrapCDP = options.wrapCDP ?? false;
        this.mockBehavior = options.mockBehavior;
        // Default config (can be overridden)
        this.config = {
            id: this.id,
            name: this.name,
            enabled: true,
            priority: 2,
            networks: [
                'base'
            ],
            networksCAIP: [
                'eip155:8453'
            ],
            assets: [
                '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
            ],
            assetsCAIP: [
                'eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
            ],
            schemes: [
                'exact',
                'x402'
            ],
            settlementModes: [
                'immediate'
            ],
            ...config
        };
        if (this.wrapCDP) {
            this.cdpAdapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$cdp$2d$facilitator$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCDPFacilitatorAdapter"])();
        }
    }
    /**
   * Verify payment
   */ async verify(payment, requirements) {
        // Validate requirements
        const validation = this.validateRequirements(requirements);
        if (!validation.valid) {
            return {
                success: false,
                valid: false,
                error: validation.error,
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        }
        // If wrapping CDP, delegate to CDP
        if (this.wrapCDP && this.cdpAdapter) {
            logger.info({
                payment: payment.substring(0, 20) + '...'
            }, 'Dummy facilitator delegating to CDP');
            return await this.cdpAdapter.verify(payment, requirements);
        }
        // Mock behavior for testing
        if (this.mockBehavior === 'failure') {
            return {
                success: false,
                valid: false,
                error: 'Mock failure for testing',
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        }
        if (this.mockBehavior === 'timeout') {
            await new Promise((resolve)=>setTimeout(resolve, 10000)); // 10 second delay
            return {
                success: false,
                valid: false,
                error: 'Mock timeout for testing',
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        }
        // Mock success
        return {
            success: true,
            valid: true,
            transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
            kytStatus: 'passed',
            ofacStatus: 'passed',
            facilitatorId: this.id,
            verifiedAt: new Date().toISOString()
        };
    }
    /**
   * Get health status
   */ async getHealth() {
        // If wrapping CDP, delegate to CDP
        if (this.wrapCDP && this.cdpAdapter) {
            return await this.cdpAdapter.getHealth();
        }
        // Mock health (always healthy for testing)
        return {
            healthy: true,
            latency: 50,
            lastChecked: new Date().toISOString(),
            capabilities: {
                networks: this.config.networks,
                assets: this.config.assets,
                schemes: this.config.schemes
            }
        };
    }
    /**
   * Check if facilitator supports network/asset/scheme
   */ supports(network, asset, scheme, settlementMode) {
        return super.supports(network, asset, scheme, settlementMode);
    }
    /**
   * Get pricing (mock)
   */ async getPricing(network, asset) {
        if (this.wrapCDP && this.cdpAdapter) {
            return await this.cdpAdapter.getPricing(network, asset);
        }
        // Mock pricing (slightly higher than CDP to test cost optimization)
        if (network === 'base' && asset === '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913') {
            return {
                network: 'base',
                asset: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
                baseFee: '1000',
                percentageFee: 0.001,
                estimatedGas: '21000',
                currency: 'USDC'
            };
        }
        return null;
    }
}
function createDummyFacilitator(id = 'dummy', options) {
    return new DummyFacilitator(id, `Dummy Facilitator (${id})`, {
        priority: options?.priority ?? 2
    }, {
        wrapCDP: options?.wrapCDP ?? false,
        mockBehavior: options?.mockBehavior
    });
}
}),
"[project]/src/integrations/x402/facilitators/facilitator-router.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// FACILITATOR ROUTER
// =============================================================================
// Smart routing logic for selecting the best facilitator based on policy
// Implements "meta-facilitator" pattern: SDK expresses preferences, SMF owns policy
__turbopack_context__.s([
    "FacilitatorRouter",
    ()=>FacilitatorRouter,
    "getFacilitatorRouter",
    ()=>getFacilitatorRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$cdp$2d$facilitator$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/cdp-facilitator-adapter.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$payai$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/payai-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$x402rs$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/x402rs-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$dexter$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/dexter-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$health$2d$aggregator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/health-aggregator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/smf.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/facilitator-metrics-reader.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/facilitator-volume-service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$health$2d$aggregator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$health$2d$aggregator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'FacilitatorRouter'
});
/**
 * Default x402scan metrics trust configuration
 * Can be overridden via environment variables
 */ const DEFAULT_X402SCAN_TRUST_CONFIG = {
    maxDataAgeHours: parseFloat(process.env.X402SCAN_MAX_DATA_AGE_HOURS ?? '4'),
    minInvocationsHighConfidence: parseInt(process.env.X402SCAN_MIN_INVOCATIONS_HIGH ?? '1000', 10),
    minInvocationsMediumConfidence: parseInt(process.env.X402SCAN_MIN_INVOCATIONS_MEDIUM ?? '100', 10),
    x402scanScoreWeight: parseFloat(process.env.X402SCAN_SCORE_WEIGHT ?? '0.3'),
    timeframe: process.env.X402SCAN_TIMEFRAME ?? '1d',
    logExplanations: process.env.X402SCAN_LOG_EXPLANATIONS !== 'false'
};
/**
 * Default Scattering metrics configuration
 */ const DEFAULT_SCATTERING_CONFIG = {
    scatteringScoreWeight: parseFloat(process.env.SCATTERING_SCORE_WEIGHT ?? '0.2'),
    minTxCount3d: parseInt(process.env.SCATTERING_MIN_TX_3D ?? '100', 10),
    maxDataAgeHours: parseFloat(process.env.SCATTERING_MAX_DATA_AGE_HOURS ?? '24'),
    logScatteringMetrics: process.env.SCATTERING_LOG_METRICS !== 'false'
};
/**
 * Check if Scattering metrics should be trusted based on freshness and activity
 */ function shouldTrustScatteringMetrics(metrics, config = DEFAULT_SCATTERING_CONFIG) {
    if (!metrics) {
        return {
            trust: false,
            reason: 'no-scattering-data'
        };
    }
    // Check data freshness
    const dataAgeHours = (Date.now() - new Date(metrics.fetchedAt).getTime()) / (1000 * 60 * 60);
    if (dataAgeHours > config.maxDataAgeHours) {
        return {
            trust: false,
            reason: `data-too-old:${dataAgeHours.toFixed(1)}h`
        };
    }
    // Check minimum activity
    if (metrics.txCount3d < config.minTxCount3d) {
        return {
            trust: false,
            reason: `low-activity:${metrics.txCount3d}-txns`
        };
    }
    return {
        trust: true,
        reason: 'active'
    };
}
/**
 * Check if x402scan metrics should be trusted based on freshness/confidence
 */ function shouldTrustX402ScanMetrics(score, config = DEFAULT_X402SCAN_TRUST_CONFIG) {
    if (!score) {
        return {
            trust: false,
            reason: 'no-x402scan-data'
        };
    }
    // Check data freshness
    if (score.dataFreshness > config.maxDataAgeHours) {
        return {
            trust: false,
            reason: `data-too-old:${score.dataFreshness.toFixed(1)}h`
        };
    }
    // Check minimum invocations for medium confidence
    if (score.totalInvocations < config.minInvocationsMediumConfidence) {
        return {
            trust: false,
            reason: `insufficient-data:${score.totalInvocations}-invocations`
        };
    }
    // Trust with appropriate confidence level
    if (score.totalInvocations >= config.minInvocationsHighConfidence) {
        return {
            trust: true,
            reason: 'high-confidence'
        };
    }
    return {
        trust: true,
        reason: 'medium-confidence'
    };
}
class FacilitatorRouter {
    facilitators = new Map();
    facilitatorHealth = new Map();
    healthCheckInterval = null;
    constructor(){
        // Register default facilitators
        this.registerFacilitator((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$cdp$2d$facilitator$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCDPFacilitatorAdapter"])());
        // Register PayAI facilitator (multi-chain support)
        this.registerFacilitator((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$payai$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPayAIFacilitator"])());
        // Register X402rs facilitator (Rust-based community facilitator)
        // Supports: Base Sepolia, Base mainnet, XDC mainnet
        if (process.env.X402RS_ENABLED !== 'false') {
            this.registerFacilitator((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$x402rs$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getX402rsFacilitator"])());
            logger.info({
                facilitatorId: 'x402rs',
                url: 'https://facilitator.x402.rs'
            }, 'X402rs facilitator registered');
        }
        // Register Dexter facilitator (Solana-native x402 facilitator)
        // Supports: Solana mainnet, Solana devnet
        if (process.env.DEXTER_ENABLED !== 'false') {
            this.registerFacilitator((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$dexter$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDexterFacilitator"])());
            logger.info({
                facilitatorId: 'dexter',
                url: 'https://facilitator.dexter.cash'
            }, 'Dexter facilitator registered');
        }
        // Register dummy facilitator for testing (wraps CDP, different priority)
        // This allows testing routing logic, priority ties, failover, etc.
        if (process.env.ENABLE_DUMMY_FACILITATOR === 'true') {
            const { createDummyFacilitator } = __turbopack_context__.r("[project]/src/integrations/x402/facilitators/dummy-facilitator.ts [app-route] (ecmascript)");
            const dummy = createDummyFacilitator('dummy', {
                wrapCDP: true,
                priority: 2
            });
            this.registerFacilitator(dummy);
        }
        // Start health check interval (every 5 minutes)
        this.startHealthChecks();
    }
    /**
   * Register a facilitator
   */ registerFacilitator(facilitator) {
        this.facilitators.set(facilitator.id, facilitator);
        logger.info({
            facilitatorId: facilitator.id,
            name: facilitator.name
        }, 'Facilitator registered');
    }
    /**
   * Unregister a facilitator
   */ unregisterFacilitator(facilitatorId) {
        this.facilitators.delete(facilitatorId);
        this.facilitatorHealth.delete(facilitatorId);
        logger.info({
            facilitatorId
        }, 'Facilitator unregistered');
    }
    /**
   * Get all registered facilitators
   */ getFacilitators() {
        return Array.from(this.facilitators.values());
    }
    /**
   * Route payment to best facilitator
   * 
   * @param requirements - Payment requirements
   * @param preferences - SDK/agent preferences
   * @param policy - SMF business logic policy
   */ async routePayment(requirements, preferences, policy) {
        // ==========================================================================
        // Handle explicit facilitator strategy (non-auto)
        // ==========================================================================
        if (preferences?.facilitatorStrategy && preferences.facilitatorStrategy !== 'auto') {
            const explicitFacilitator = this.facilitators.get(preferences.facilitatorStrategy);
            if (explicitFacilitator && explicitFacilitator.config.enabled) {
                // Check if explicit facilitator supports the requested network/asset
                if (explicitFacilitator.supports(requirements.network, requirements.asset, requirements.scheme, requirements.settlementMode)) {
                    logger.info({
                        facilitatorId: explicitFacilitator.id,
                        facilitatorUrl: explicitFacilitator.config.healthCheckUrl,
                        strategy: preferences.facilitatorStrategy,
                        network: requirements.network,
                        asset: requirements.asset,
                        mode: 'explicit',
                        msg: 'Facilitator selected via explicit strategy'
                    });
                    return explicitFacilitator;
                } else {
                    logger.warn({
                        facilitatorId: preferences.facilitatorStrategy,
                        network: requirements.network,
                        asset: requirements.asset,
                        msg: 'Explicit facilitator does not support requested network/asset, falling back to auto'
                    });
                // Fall through to auto selection
                }
            } else {
                logger.warn({
                    facilitatorId: preferences.facilitatorStrategy,
                    enabled: explicitFacilitator?.config.enabled,
                    msg: 'Explicit facilitator not found or disabled, falling back to auto'
                });
            // Fall through to auto selection
            }
        }
        // ==========================================================================
        // Auto selection: Get eligible facilitators
        // ==========================================================================
        const eligible = this.getEligibleFacilitators(requirements, preferences, policy);
        if (eligible.length === 0) {
            throw new Error(`No eligible facilitator found for ${requirements.network}/${requirements.asset}/${requirements.scheme}`);
        }
        // Score and rank facilitators
        const scored = await this.scoreFacilitators(eligible, requirements, preferences, policy);
        // Select best facilitator
        const best = scored[0].facilitator;
        const bestExplanation = scored[0].x402scanExplanation;
        // =======================================================================
        // Log x402scan explanation for the selected facilitator (if available)
        // =======================================================================
        if (bestExplanation && DEFAULT_X402SCAN_TRUST_CONFIG.logExplanations) {
            logger.info({
                facilitatorId: best.id,
                x402scan: {
                    selected: true,
                    score: bestExplanation.score,
                    confidence: bestExplanation.confidence,
                    shortReason: bestExplanation.shortReason,
                    metrics: bestExplanation.metrics
                },
                msg: 'x402scan routing explanation'
            });
        }
        // Log alternatives with their x402scan data (for debugging/ML)
        if (scored.length > 1 && DEFAULT_X402SCAN_TRUST_CONFIG.logExplanations) {
            const alternatives = scored.slice(1, 4).map((s)=>({
                    id: s.facilitator.id,
                    score: s.score,
                    x402scan: s.x402scanExplanation ? {
                        score: s.x402scanExplanation.score,
                        confidence: s.x402scanExplanation.confidence,
                        shortReason: s.x402scanExplanation.shortReason
                    } : null
                }));
            logger.debug({
                alternatives,
                msg: 'Alternative facilitators considered'
            });
        }
        // Log decision trace (compact format for explainer/debugger UI)
        // Include facilitatorUrl for per-facilitator logging
        logger.info({
            facilitatorId: best.id,
            facilitatorUrl: best.config.healthCheckUrl,
            score: scored[0].score,
            x402scanScore: bestExplanation?.score,
            x402scanConfidence: bestExplanation?.confidence,
            alternatives: scored.length - 1,
            reasons: scored[0].reasons,
            strategy: preferences?.facilitatorStrategy || 'auto',
            mode: 'auto',
            constraints: {
                preferences: preferences ? {
                    priority: preferences.priority,
                    preferredNetworks: preferences.preferredNetworks,
                    preferredAssets: preferences.preferredAssets,
                    facilitatorStrategy: preferences.facilitatorStrategy
                } : undefined,
                settlementMode: requirements.settlementMode
            },
            candidates: scored.map((s)=>({
                    id: s.facilitator.id,
                    url: s.facilitator.config.healthCheckUrl,
                    score: s.score,
                    reasons: s.reasons
                })),
            msg: 'Facilitator selected'
        });
        return best;
    }
    /**
   * Get eligible facilitators based on requirements, preferences, and policy
   * Extended to support CAIP identifiers and settlement modes
   */ getEligibleFacilitators(requirements, preferences, policy) {
        const facilitators = Array.from(this.facilitators.values());
        return facilitators.filter((facilitator)=>{
            // 1. Check basic support (legacy or CAIP)
            let supportsNetwork = false;
            let supportsAsset = false;
            // Check network support
            if (requirements.networks && requirements.networks.length > 0) {
                // CAIP networks
                supportsNetwork = requirements.networks.some((n)=>facilitator.supportsCAIPNetwork(n));
            } else {
                // Legacy network
                supportsNetwork = facilitator.config.networks.includes(requirements.network);
            }
            // Check asset support
            if (requirements.assets && requirements.assets.length > 0) {
                // CAIP assets
                supportsAsset = requirements.assets.some((a)=>facilitator.supportsCAIPAsset(a));
            } else {
                // Legacy asset
                supportsAsset = facilitator.config.assets.includes(requirements.asset);
            }
            if (!supportsNetwork || !supportsAsset || !facilitator.supports(requirements.network, requirements.asset, requirements.scheme, requirements.settlementMode)) {
                return false;
            }
            // 2. Check if enabled
            if (!facilitator.config.enabled) {
                return false;
            }
            // 3. Check preferences (SDK preferences) - support both legacy and CAIP
            const preferredNetworks = [
                ...preferences?.preferredNetworks || [],
                ...preferences?.preferredNetworksCAIP || []
            ];
            if (preferredNetworks.length > 0) {
                const facilitatorNetworks = [
                    ...facilitator.config.networks,
                    ...facilitator.config.networksCAIP || []
                ];
                if (!preferredNetworks.some((p)=>facilitatorNetworks.some((n)=>n.includes(p) || p.includes(n)))) {
                    return false;
                }
            }
            const avoidedNetworks = [
                ...preferences?.avoidNetworks || [],
                ...preferences?.avoidNetworksCAIP || []
            ];
            if (avoidedNetworks.length > 0) {
                const facilitatorNetworks = [
                    ...facilitator.config.networks,
                    ...facilitator.config.networksCAIP || []
                ];
                if (avoidedNetworks.some((a)=>facilitatorNetworks.some((n)=>n.includes(a) || a.includes(n)))) {
                    return false;
                }
            }
            const preferredAssets = [
                ...preferences?.preferredAssets || [],
                ...preferences?.preferredAssetsCAIP || []
            ];
            if (preferredAssets.length > 0) {
                const facilitatorAssets = [
                    ...facilitator.config.assets,
                    ...facilitator.config.assetsCAIP || []
                ];
                if (!preferredAssets.some((p)=>facilitatorAssets.some((a)=>a.includes(p) || p.includes(a)))) {
                    return false;
                }
            }
            // 3b. Check jurisdiction (if specified)
            if (preferences?.jurisdiction) {
            // This would integrate with jurisdiction rules
            // For now, pass through (can be enhanced later)
            }
            // 3c. Check settlement mode preference
            if (preferences?.settlementMode) {
                if (facilitator.config.settlementModes && !facilitator.config.settlementModes.includes(preferences.settlementMode)) {
                    return false;
                }
            }
            // 4. Check policy (SMF business logic)
            if (policy?.requireHealthCheck) {
                const health = this.facilitatorHealth.get(facilitator.id);
                if (!health || !health.healthy) {
                    return false;
                }
            }
            // Note: Database health snapshot check is done in scoreFacilitators (async)
            // to avoid blocking the synchronous filter operation
            if (policy?.customRules) {
                if (!policy.customRules(facilitator, requirements)) {
                    return false;
                }
            }
            // 5. Check compliance requirements
            if (preferences?.requireCompliance || policy?.requireKYC) {
                // Check if facilitator supports compliance
                const metadata = facilitator.config.metadata;
                if (!metadata?.kytEnabled && !metadata?.ofacEnabled) {
                    return false;
                }
            }
            return true;
        });
    }
    /**
   * Score facilitators based on preferences and policy
   * Uses real health metrics from database AND x402scan ecosystem data for accurate scoring
   * Handles priority ties with randomization
   * Exposed for decision trace building
   */ async scoreFacilitators(facilitators, requirements, preferences, policy) {
        const x402scanConfig = DEFAULT_X402SCAN_TRUST_CONFIG;
        const scored = await Promise.all(facilitators.map(async (facilitator)=>{
            let score = 100; // Start with base score
            const reasons = [];
            let x402scanExplanation;
            // 1. Base priority (lower priority number = higher priority)
            const basePriority = facilitator.config.priority;
            score += basePriority * 10;
            reasons.push(`priority:${basePriority}`);
            // 2. Get real health metrics from database
            const network = requirements.network;
            const token = requirements.asset;
            let healthMetrics;
            try {
                healthMetrics = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$health$2d$aggregator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCurrentHealth"])(facilitator.id, network, token, 15);
            } catch (error) {
                logger.warn({
                    error,
                    facilitatorId: facilitator.id,
                    network,
                    token
                }, 'Failed to get health metrics, using defaults');
                healthMetrics = {
                    successRate: 1.0,
                    p95LatencyMs: null,
                    errorRate: 0.0,
                    status: 'healthy'
                };
            }
            // =======================================================================
            // 2b. Get x402scan ecosystem metrics (if available and trusted)
            // =======================================================================
            let x402scanScore = null;
            let x402scanTrust = {
                trust: false,
                reason: 'not-fetched'
            };
            try {
                x402scanScore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFacilitatorScore"])({
                    facilitatorId: facilitator.id,
                    timeframe: x402scanConfig.timeframe
                });
                x402scanTrust = shouldTrustX402ScanMetrics(x402scanScore, x402scanConfig);
                // Get detailed explanation for logging
                if (x402scanConfig.logExplanations) {
                    x402scanExplanation = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFacilitatorExplainer"])(facilitator.id, {
                        timeframe: x402scanConfig.timeframe
                    });
                }
            } catch (error) {
                logger.debug({
                    error,
                    facilitatorId: facilitator.id
                }, 'Failed to get x402scan metrics');
                x402scanTrust = {
                    trust: false,
                    reason: 'fetch-error'
                };
            }
            // 3. Success rate scoring (w1 * successRate)
            const w1 = 50; // Weight for success rate
            const successRateScore = healthMetrics.successRate * w1;
            score += successRateScore;
            reasons.push(`success-rate:${(healthMetrics.successRate * 100).toFixed(1)}%`);
            // 4. Latency scoring (w2 * p95LatencyMs) - lower is better
            const w2 = 0.1; // Weight for latency penalty
            if (healthMetrics.p95LatencyMs !== null) {
                const latencyPenalty = healthMetrics.p95LatencyMs * w2;
                score -= latencyPenalty;
                reasons.push(`p95-latency:${healthMetrics.p95LatencyMs}ms`);
            }
            // 5. Fee scoring (w3 * feeBps) - get from capabilities
            const w3 = 0.5; // Weight for fee penalty
            try {
                const capabilities = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFacilitatorCapabilities"])(facilitator.id, network, token);
                const capability = capabilities[0];
                if (capability) {
                    const feePenalty = capability.fee_bps * w3;
                    score -= feePenalty;
                    reasons.push(`fee:${capability.fee_bps}bps`);
                }
            } catch (error) {
                logger.debug({
                    error,
                    facilitatorId: facilitator.id
                }, 'Failed to get capabilities for fee scoring');
            }
            // 6. Risk penalty (w4 * riskPenalty) - based on error rate and status
            const w4 = 30; // Weight for risk penalty
            const riskPenalty = healthMetrics.errorRate * w4;
            score -= riskPenalty;
            if (healthMetrics.status === 'down') {
                // Refuse routing to down facilitators (set score to very low value)
                score = -1000; // Effectively prevents routing
                reasons.push('status:down');
                logger.warn({
                    facilitatorId: facilitator.id,
                    network: requirements.network,
                    token: requirements.asset
                }, 'Refusing to route - facilitator is down');
            } else if (healthMetrics.status === 'degraded') {
                score -= 25; // Moderate penalty for degraded
                reasons.push('status:degraded');
                logger.warn({
                    facilitatorId: facilitator.id,
                    network: requirements.network,
                    token: requirements.asset
                }, 'Facilitator is degraded - routing with caution');
            }
            // 7. Health status check (cached)
            const health = this.facilitatorHealth.get(facilitator.id);
            if (health && !health.healthy) {
                score -= 30; // Additional penalty for unhealthy in cache
                reasons.push('cache-unhealthy');
            }
            // =======================================================================
            // 8. X402SCAN ECOSYSTEM METRICS INTEGRATION
            // =======================================================================
            if (x402scanTrust.trust && x402scanScore) {
                // Apply x402scan score as weighted bonus/penalty
                // x402scan score is 0-100, normalize to contribute proportionally
                const x402scanNormalized = (x402scanScore.score - 50) / 50; // -1 to +1
                const x402scanBonus = x402scanNormalized * 30 * x402scanConfig.x402scanScoreWeight;
                score += x402scanBonus;
                reasons.push(`x402scan:${x402scanScore.score}/${x402scanTrust.reason}`);
                // Extra bonus for high success rate in ecosystem data
                if (x402scanScore.successRate >= 0.99) {
                    score += 10 * x402scanConfig.x402scanScoreWeight;
                    reasons.push('x402scan-excellent');
                } else if (x402scanScore.successRate < 0.90) {
                    score -= 15 * x402scanConfig.x402scanScoreWeight;
                    reasons.push('x402scan-degraded');
                }
                // Latency bonus/penalty from ecosystem data
                if (x402scanScore.p95LatencyMs !== undefined) {
                    if (x402scanScore.p95LatencyMs < 200) {
                        score += 5 * x402scanConfig.x402scanScoreWeight;
                        reasons.push(`x402scan-fast:${x402scanScore.p95LatencyMs.toFixed(0)}ms`);
                    } else if (x402scanScore.p95LatencyMs > 1000) {
                        score -= 10 * x402scanConfig.x402scanScoreWeight;
                        reasons.push(`x402scan-slow:${x402scanScore.p95LatencyMs.toFixed(0)}ms`);
                    }
                }
            } else {
                // Log why x402scan data wasn't trusted
                reasons.push(`x402scan-skipped:${x402scanTrust.reason}`);
            }
            // =======================================================================
            // 8b. SCATTERING / DUNE ACTIVITY METRICS INTEGRATION
            // =======================================================================
            const scatteringConfig = DEFAULT_SCATTERING_CONFIG;
            let scatteringMetrics = null;
            let scatteringTrust = {
                trust: false,
                reason: 'not-fetched'
            };
            try {
                scatteringMetrics = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getScatteringMetricsForFacilitator"])(facilitator.id);
                scatteringTrust = shouldTrustScatteringMetrics(scatteringMetrics, scatteringConfig);
            } catch (error) {
                logger.debug({
                    error,
                    facilitatorId: facilitator.id
                }, 'Failed to get Scattering metrics');
                scatteringTrust = {
                    trust: false,
                    reason: 'fetch-error'
                };
            }
            if (scatteringTrust.trust && scatteringMetrics) {
                // Compute activity score (0-1)
                const activityScore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeActivityScore"])(scatteringMetrics);
                // Apply as weighted bonus (activity score 0.5+ is good, higher is better)
                const activityBonus = (activityScore - 0.3) * 100 * scatteringConfig.scatteringScoreWeight;
                score += activityBonus;
                reasons.push(`scattering-activity:${(activityScore * 100).toFixed(1)}%`);
                // Volume bonus for high-volume facilitators
                if (scatteringMetrics.volumeUsd3d >= 100_000) {
                    score += 10 * scatteringConfig.scatteringScoreWeight;
                    reasons.push(`scattering-high-volume:$${(scatteringMetrics.volumeUsd3d / 1000).toFixed(1)}K`);
                }
                // User diversity bonus (more unique buyers = more trusted)
                if (scatteringMetrics.uniqueBuyers3d >= 1000) {
                    score += 5 * scatteringConfig.scatteringScoreWeight;
                    reasons.push(`scattering-high-adoption:${scatteringMetrics.uniqueBuyers3d}-buyers`);
                }
                // Growth bonus/penalty
                if (scatteringMetrics.volumeChangeRate !== undefined) {
                    if (scatteringMetrics.volumeChangeRate > 20) {
                        // Growing facilitator
                        score += 5 * scatteringConfig.scatteringScoreWeight;
                        reasons.push(`scattering-growing:+${scatteringMetrics.volumeChangeRate.toFixed(0)}%`);
                    } else if (scatteringMetrics.volumeChangeRate < -50) {
                        // Declining significantly
                        score -= 10 * scatteringConfig.scatteringScoreWeight;
                        reasons.push(`scattering-declining:${scatteringMetrics.volumeChangeRate.toFixed(0)}%`);
                    }
                }
                // Log Scattering metrics if enabled
                if (scatteringConfig.logScatteringMetrics) {
                    logger.debug({
                        facilitatorId: facilitator.id,
                        scattering: {
                            volumeUsd3d: scatteringMetrics.volumeUsd3d,
                            txCount3d: scatteringMetrics.txCount3d,
                            uniqueBuyers3d: scatteringMetrics.uniqueBuyers3d,
                            activityScore: activityScore.toFixed(3),
                            volumeChangeRate: scatteringMetrics.volumeChangeRate
                        },
                        msg: 'Scattering metrics applied'
                    });
                }
            } else {
                reasons.push(`scattering-skipped:${scatteringTrust.reason}`);
            }
            // 9. Cost optimization (if policy requires)
            if (policy?.preferCheapest || preferences?.priority === 'cost') {
                const pricing = await facilitator.getPricing(requirements.network, requirements.asset);
                if (pricing) {
                    // Lower cost = higher score (normalize)
                    score += 20; // Bonus for having pricing info
                    reasons.push('has-pricing');
                }
            }
            // 10. Speed optimization (if preference)
            if (preferences?.priority === 'speed') {
                if (healthMetrics.p95LatencyMs !== null) {
                    // Lower latency = higher score
                    const latencyBonus = Math.max(0, 30 - healthMetrics.p95LatencyMs / 10);
                    score += latencyBonus;
                    reasons.push(`speed-optimized:${healthMetrics.p95LatencyMs}ms`);
                }
                // Also factor in x402scan latency for speed priority
                if (x402scanTrust.trust && x402scanScore?.p95LatencyMs !== undefined) {
                    const x402LatencyBonus = Math.max(0, 20 - x402scanScore.p95LatencyMs / 25);
                    score += x402LatencyBonus * x402scanConfig.x402scanScoreWeight;
                }
            }
            // 11. Compliance optimization
            if (preferences?.priority === 'compliance' || policy?.requireKYC) {
                const metadata = facilitator.config.metadata;
                if (metadata?.kytEnabled && metadata?.ofacEnabled) {
                    score += 30; // Bonus for compliance
                    reasons.push('compliance-enabled');
                }
            }
            // 12. Reliability optimization - strongly weight x402scan for reliability priority
            if (preferences?.priority === 'reliability') {
                if (healthMetrics.status === 'healthy' && healthMetrics.successRate > 0.95) {
                    score += 25;
                    reasons.push('high-reliability');
                }
                // Double weight x402scan for reliability priority
                if (x402scanTrust.trust && x402scanScore) {
                    if (x402scanScore.successRate >= 0.98 && x402scanScore.confidence === 'high') {
                        score += 20; // Strong bonus for proven reliability
                        reasons.push('x402scan-proven-reliable');
                    }
                }
            }
            // 13. Settlement mode optimization
            if (requirements.settlementMode) {
                if (facilitator.config.settlementModes?.includes(requirements.settlementMode)) {
                    score += 15; // Bonus for supporting requested settlement mode
                    reasons.push(`settlement:${requirements.settlementMode}`);
                }
            }
            return {
                facilitator,
                score,
                reasons,
                x402scanExplanation
            };
        }));
        // Sort by score (highest first)
        const sorted = scored.sort((a, b)=>b.score - a.score);
        // Handle priority ties with randomization
        // If top scores are within 5 points, randomize order
        if (sorted.length > 1) {
            const topScore = sorted[0].score;
            const tied = sorted.filter((s)=>Math.abs(s.score - topScore) <= 5);
            if (tied.length > 1) {
                // Shuffle tied facilitators
                for(let i = tied.length - 1; i > 0; i--){
                    const j = Math.floor(Math.random() * (i + 1));
                    [tied[i], tied[j]] = [
                        tied[j],
                        tied[i]
                    ];
                }
                // Rebuild sorted array with shuffled ties
                const rest = sorted.filter((s)=>Math.abs(s.score - topScore) > 5);
                return [
                    ...tied,
                    ...rest
                ];
            }
        }
        return sorted;
    }
    /**
   * Start periodic health checks
   */ startHealthChecks() {
        this.healthCheckInterval = setInterval(async ()=>{
            await this.checkAllFacilitators();
        }, 5 * 60 * 1000); // Every 5 minutes
        // Initial health check
        this.checkAllFacilitators();
    }
    /**
   * Check health of all facilitators
   */ async checkAllFacilitators() {
        const facilitators = Array.from(this.facilitators.values());
        await Promise.all(facilitators.map(async (facilitator)=>{
            try {
                const health = await facilitator.getHealth();
                this.facilitatorHealth.set(facilitator.id, {
                    healthy: health.healthy,
                    lastChecked: Date.now()
                });
            } catch (error) {
                logger.error({
                    facilitatorId: facilitator.id,
                    error
                }, 'Health check failed');
                this.facilitatorHealth.set(facilitator.id, {
                    healthy: false,
                    lastChecked: Date.now()
                });
            }
        }));
    }
    /**
   * Get facilitator by ID
   */ getFacilitator(id) {
        return this.facilitators.get(id);
    }
    /**
   * Get facilitator health status
   */ getFacilitatorHealth(id) {
        return this.facilitatorHealth.get(id);
    }
    /**
   * Cleanup
   */ destroy() {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
        }
    }
}
// Singleton instance
let router = null;
function getFacilitatorRouter() {
    if (!router) {
        router = new FacilitatorRouter();
    }
    return router;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/integrations/x402/facilitators/route-context.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// ROUTE CONTEXT
// =============================================================================
// Normalized request context for SMF routing
// Ensures all facilitators receive consistent, x402-spec-compliant requests
__turbopack_context__.s([
    "createRouteContext",
    ()=>createRouteContext,
    "routeContextToFacilitatorRequest",
    ()=>routeContextToFacilitatorRequest
]);
function routeContextToFacilitatorRequest(context) {
    return {
        version: context.x402Version,
        amount: context.amount,
        network: context.network,
        token: context.token,
        networkCAIP: context.networkCAIP,
        tokenCAIP: context.tokenCAIP
    };
}
function createRouteContext(requirements, options) {
    // Extract network (legacy or CAIP)
    const network = requirements.network || requirements.networks?.[0] || '';
    const networkCAIP = requirements.networks?.[0]?.startsWith('eip155:') ? requirements.networks[0] : undefined;
    // Extract token/asset (legacy or CAIP)
    const token = requirements.asset || requirements.assets?.[0] || '';
    const tokenCAIP = requirements.assets?.[0]?.includes('/') ? requirements.assets[0] : undefined;
    return {
        network,
        token,
        amount: requirements.maxAmountRequired || '0',
        networkCAIP,
        tokenCAIP,
        x402Version: options?.x402Version || 1,
        callerId: options?.callerId,
        clientId: options?.clientId,
        region: options?.region,
        riskLevel: options?.riskLevel,
        watchLevel: options?.watchLevel,
        requirements
    };
}
}),
"[project]/src/integrations/x402/orchestrator/meta-facilitator.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// META-FACILITATOR ORCHESTRATION ENGINE
// =============================================================================
// High-level orchestration layer that sits above individual facilitators
// Owns business logic, routing policy, and risk management
__turbopack_context__.s([
    "MetaFacilitator",
    ()=>MetaFacilitator,
    "getMetaFacilitator",
    ()=>getMetaFacilitator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$facilitator$2d$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/facilitator-router.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/smf.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$route$2d$context$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/route-context.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$facilitator$2d$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$facilitator$2d$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'MetaFacilitator'
});
class MetaFacilitator {
    router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$facilitator$2d$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFacilitatorRouter"])();
    /**
   * Verify payment with orchestration
   * 
   * This is the main entry point for payment verification.
   * It handles:
   * 1. Facilitator selection based on policy
   * 2. Payment routing
   * 3. Failover handling
   * 4. Result aggregation
   * 5. Business logic application
   */ async verifyPayment(payment, requirements, preferences, policy, context) {
        const startTime = Date.now();
        let routeId = null;
        try {
            // 1. Create route context and route record
            const routeContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$route$2d$context$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRouteContext"])(requirements, {
                callerId: context?.clientId || context?.agentId,
                clientId: context?.clientId,
                x402Version: 1
            });
            // 2. Select best facilitator based on policy
            const facilitator = await this.router.routePayment(requirements, preferences, policy);
            // 3. Create route record with selected facilitator
            const route = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRoute"])({
                request_id: context?.requestId || null,
                correlation_id: context?.correlationId || null,
                client_id: context?.clientId || null,
                agent_id: context?.agentId || null,
                network: routeContext.network,
                token: routeContext.token,
                amount: routeContext.amount,
                selected_facilitator_id: facilitator.id,
                status: 'verifying'
            });
            routeId = route.id;
            // Log decision trace (compact format)
            logger.info({
                routeId,
                facilitatorId: facilitator.id,
                network: requirements.network,
                asset: requirements.asset,
                settlementMode: requirements.settlementMode,
                preferences: preferences ? {
                    priority: preferences.priority,
                    jurisdiction: preferences.jurisdiction
                } : undefined
            }, 'Routing payment to facilitator');
            // 3. Verify payment with selected facilitator
            const verifyStartTime = Date.now();
            let result;
            let attemptResult = 'success';
            let errorCode = null;
            let rawStatus = null;
            try {
                result = await facilitator.verify(payment, requirements);
                const verifyLatency = Date.now() - verifyStartTime;
                // Determine attempt result
                if (!result.success || !result.valid) {
                    attemptResult = 'failure';
                    errorCode = result.error || 'verification_failed';
                }
                // Log route attempt
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRouteAttempt"])({
                    route_id: routeId,
                    facilitator_id: facilitator.id,
                    phase: 'verify',
                    result: attemptResult,
                    latency_ms: verifyLatency,
                    error_code: errorCode,
                    raw_status: rawStatus,
                    is_probe: false
                });
            } catch (error) {
                const verifyLatency = Date.now() - verifyStartTime;
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                // Determine error type
                if (errorMessage.includes('timeout') || errorMessage.includes('TIMEOUT')) {
                    attemptResult = 'timeout';
                } else if (errorMessage.includes('rate') || errorMessage.includes('429')) {
                    attemptResult = 'rate_limited';
                    rawStatus = 429;
                } else if (errorMessage.includes('network') || errorMessage.includes('ECONNREFUSED')) {
                    attemptResult = 'network_error';
                } else {
                    attemptResult = 'failure';
                }
                errorCode = errorMessage;
                // Log failed attempt
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRouteAttempt"])({
                    route_id: routeId,
                    facilitator_id: facilitator.id,
                    phase: 'verify',
                    result: attemptResult,
                    latency_ms: verifyLatency,
                    error_code: errorCode,
                    raw_status: rawStatus,
                    is_probe: false
                });
                // Create failure result
                result = {
                    success: false,
                    valid: false,
                    error: errorMessage,
                    facilitatorId: facilitator.id,
                    verifiedAt: new Date().toISOString()
                };
            }
            // 4. Apply business logic (risk rules, compliance, etc.)
            const orchestrated = this.applyBusinessLogic(result, requirements, policy);
            // 5. Update route status
            if (orchestrated.success && orchestrated.valid) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateRouteStatus"])(routeId, 'settled', new Date().toISOString());
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateRouteStatus"])(routeId, 'failed', new Date().toISOString());
            }
            // 6. Calculate orchestration metadata
            const latency = Date.now() - startTime;
            const metadata = {
                latency,
                complianceScore: this.calculateComplianceScore(result)
            };
            // 7. Build decision trace (for explainer/debugger UI)
            const eligible = this.router.getFacilitators().filter((f)=>f.supports(requirements.network, requirements.asset, requirements.scheme, requirements.settlementMode) && f.config.enabled);
            const decisionTrace = await this.buildDecisionTrace(facilitator, eligible, requirements, preferences, policy);
            return {
                ...orchestrated,
                facilitatorUsed: facilitator.id,
                routingReason: this.getRoutingReason(facilitator, preferences, policy),
                alternativesConsidered: eligible.length - 1,
                decisionTrace,
                orchestrationMetadata: metadata
            };
        } catch (error) {
            logger.error({
                error,
                requirements,
                routeId
            }, 'Orchestration error');
            // Update route status to failed
            if (routeId) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateRouteStatus"])(routeId, 'failed', new Date().toISOString());
            }
            // Try failover if available
            if (policy?.requireHealthCheck !== false) {
                return await this.handleFailover(payment, requirements, preferences, policy, error, routeId);
            }
            throw error;
        }
    }
    /**
   * Apply business logic to verification result
   * SMF owns higher-level policy above raw settlement
   */ applyBusinessLogic(result, requirements, policy) {
        // 1. Risk rules
        if (policy?.riskThreshold !== undefined) {
            const riskScore = this.calculateRiskScore(result);
            if (riskScore > policy.riskThreshold) {
                return {
                    ...result,
                    valid: false,
                    error: `Risk score ${riskScore} exceeds threshold ${policy.riskThreshold}`
                };
            }
        }
        // 2. Compliance rules
        if (policy?.requireKYC) {
            // Check if KYC is required for this amount
            const amount = BigInt(requirements.maxAmountRequired);
            const kycThreshold = BigInt('1000000000'); // 1000 USDC in smallest units
            if (amount > kycThreshold && result.kytStatus !== 'passed') {
                return {
                    ...result,
                    valid: false,
                    error: 'KYC required for this amount'
                };
            }
        }
        // 3. Jurisdiction rules
        if (policy?.jurisdictionRules) {
        // Apply jurisdiction-specific rules
        // This would integrate with geo-detection
        // For now, pass through
        }
        return result;
    }
    /**
   * Calculate risk score (0-100)
   */ calculateRiskScore(result) {
        let score = 0;
        // KYT status
        if (result.kytStatus === 'blocked') score += 50;
        else if (result.kytStatus === 'flagged') score += 25;
        // OFAC status
        if (result.ofacStatus === 'blocked') score += 50;
        else if (result.ofacStatus === 'flagged') score += 25;
        // Error status
        if (!result.success || !result.valid) score += 30;
        return Math.min(100, score);
    }
    /**
   * Calculate compliance score (0-100)
   */ calculateComplianceScore(result) {
        let score = 100;
        // Deduct for compliance issues
        if (result.kytStatus === 'blocked') score -= 50;
        else if (result.kytStatus === 'flagged') score -= 25;
        if (result.ofacStatus === 'blocked') score -= 50;
        else if (result.ofacStatus === 'flagged') score -= 25;
        return Math.max(0, score);
    }
    /**
   * Build decision trace for explainer/debugger UI
   * Compact format for logging and future UI display
   */ async buildDecisionTrace(selected, eligible, requirements, preferences, policy) {
        // Score candidates to get detailed info
        const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$facilitator$2d$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFacilitatorRouter"])();
        const scored = await router.scoreFacilitators(eligible, requirements, preferences, policy);
        const candidates = eligible.map((f)=>{
            const scoredEntry = scored.find((s)=>s.facilitator.id === f.id);
            const score = scoredEntry?.score || 0;
            const reasons = scoredEntry?.reasons || [];
            return {
                facilitatorId: f.id,
                facilitatorName: f.name,
                score,
                eligible: true,
                reasons
            };
        });
        return {
            timestamp: new Date().toISOString(),
            reason: this.getRoutingReason(selected, preferences, policy),
            constraints: {
                preferences,
                policy: policy ? {
                    requireHealthCheck: policy.requireHealthCheck,
                    preferCheapest: policy.preferCheapest,
                    requireKYC: policy.requireKYC
                } : undefined,
                requirements
            },
            candidates,
            selected: {
                facilitatorId: selected.id,
                score: scored.find((s)=>s.facilitator.id === selected.id)?.score || 100,
                alternativesConsidered: eligible.length - 1
            }
        };
    }
    /**
   * Get routing reason for logging/analytics
   */ getRoutingReason(facilitator, preferences, policy) {
        const reasons = [];
        if (preferences?.priority === 'cost') reasons.push('cost-optimized');
        if (preferences?.priority === 'speed') reasons.push('speed-optimized');
        if (preferences?.priority === 'compliance') reasons.push('compliance-optimized');
        if (preferences?.priority === 'reliability') reasons.push('reliability-optimized');
        if (preferences?.preferredNetworks) reasons.push('network-preference');
        if (policy?.preferCheapest) reasons.push('cheapest-selected');
        if (facilitator.config.priority === 1) reasons.push('primary-facilitator');
        return reasons.join(', ') || 'default-routing';
    }
    /**
   * Handle failover to alternative facilitator
   */ async handleFailover(payment, requirements, preferences, policy, originalError, routeId) {
        logger.warn({
            originalError,
            requirements
        }, 'Attempting failover');
        // Get all facilitators
        const facilitators = this.router.getFacilitators();
        const eligible = facilitators.filter((f)=>f.supports(requirements.network, requirements.asset, requirements.scheme, requirements.settlementMode) && f.config.enabled);
        // Try each facilitator in order of priority
        for (const facilitator of eligible.sort((a, b)=>a.config.priority - b.config.priority)){
            const attemptStartTime = Date.now();
            try {
                const result = await facilitator.verify(payment, requirements);
                const attemptLatency = Date.now() - attemptStartTime;
                // Log failover attempt
                if (routeId) {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRouteAttempt"])({
                        route_id: routeId,
                        facilitator_id: facilitator.id,
                        phase: 'verify',
                        result: result.success && result.valid ? 'success' : 'failure',
                        latency_ms: attemptLatency,
                        is_probe: false,
                        error_code: result.error || null,
                        raw_status: null
                    });
                }
                if (result.success && result.valid) {
                    logger.info({
                        facilitatorId: facilitator.id,
                        routeId
                    }, 'Failover successful');
                    // Update route with successful facilitator
                    if (routeId) {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateRouteStatus"])(routeId, 'settled', new Date().toISOString());
                    }
                    return {
                        ...result,
                        facilitatorUsed: facilitator.id,
                        routingReason: 'failover',
                        alternativesConsidered: eligible.length - 1
                    };
                }
            } catch (error) {
                const attemptLatency = Date.now() - attemptStartTime;
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                // Log failed failover attempt
                if (routeId) {
                    let attemptResult = 'failure';
                    if (errorMessage.includes('timeout')) {
                        attemptResult = 'timeout';
                    } else if (errorMessage.includes('rate') || errorMessage.includes('429')) {
                        attemptResult = 'rate_limited';
                    } else if (errorMessage.includes('network') || errorMessage.includes('ECONNREFUSED')) {
                        attemptResult = 'network_error';
                    }
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRouteAttempt"])({
                        route_id: routeId,
                        facilitator_id: facilitator.id,
                        phase: 'verify',
                        result: attemptResult,
                        latency_ms: attemptLatency,
                        is_probe: false,
                        error_code: errorMessage,
                        raw_status: null
                    });
                }
                logger.warn({
                    facilitatorId: facilitator.id,
                    error,
                    routeId
                }, 'Failover attempt failed');
                continue;
            }
        }
        // All facilitators failed
        throw new Error(`All facilitators failed. Original error: ${originalError instanceof Error ? originalError.message : 'Unknown error'}`);
    }
    /**
   * Get orchestrator status
   * Fixed: Aligns health semantics with facilitator health checks
   */ async getStatus() {
        const facilitators = this.router.getFacilitators();
        // Check health of all facilitators (use actual health checks, not cached)
        const healthChecks = await Promise.all(facilitators.map(async (f)=>{
            try {
                const health = await f.getHealth();
                return {
                    id: f.id,
                    name: f.name,
                    healthy: health.healthy,
                    lastChecked: health.lastChecked
                };
            } catch (error) {
                return {
                    id: f.id,
                    name: f.name,
                    healthy: false,
                    lastChecked: new Date().toISOString()
                };
            }
        }));
        const healthy = healthChecks.filter((h)=>h.healthy);
        const networks = new Set();
        const assets = new Set();
        facilitators.forEach((f)=>{
            f.config.networks.forEach((n)=>networks.add(n));
            f.config.assets.forEach((a)=>assets.add(a));
        });
        return {
            facilitators: facilitators.length,
            healthy: healthy.length,
            networks: Array.from(networks),
            assets: Array.from(assets),
            facilitatorDetails: healthChecks
        };
    }
}
// Singleton instance
let metaFacilitator = null;
function getMetaFacilitator() {
    if (!metaFacilitator) {
        metaFacilitator = new MetaFacilitator();
    }
    return metaFacilitator;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/x402-watchlist.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// x402 WATCHLIST DATABASE OPERATIONS
// =============================================================================
// Database operations for x402 ecosystem watchlist tracking
__turbopack_context__.s([
    "getActiveWatchlistItems",
    ()=>getActiveWatchlistItems,
    "getAllWatchlistItems",
    ()=>getAllWatchlistItems,
    "getWatchlistItemById",
    ()=>getWatchlistItemById,
    "getX402DiscoveryResources",
    ()=>getX402DiscoveryResources,
    "updateWatchlistItemAfterCheck",
    ()=>updateWatchlistItemAfterCheck,
    "upsertWatchlistItem",
    ()=>upsertWatchlistItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'X402WatchlistDB'
});
async function getActiveWatchlistItems(minPriority) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    let query = `SELECT * FROM x402_watchlist WHERE status = 'active'`;
    const params = [];
    if (minPriority !== undefined) {
        if (isPostgres) {
            query += ` AND priority >= $1`;
            params.push(minPriority);
        } else {
            query += ` AND priority >= ?`;
            params.push(minPriority);
        }
    }
    query += ` ORDER BY priority DESC, last_checked_at ASC NULLS FIRST`;
    if (isPostgres) {
        const result = await db.pool.query(query, params);
        return result.rows;
    } else {
        // SQLite
        const stmt = db.prepare(query);
        return params.length > 0 ? stmt.all(...params) : stmt.all();
    }
}
async function upsertWatchlistItem(item) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        const result = await db.pool.query(`INSERT INTO x402_watchlist (
        id, root_domain, path_prefix, category, priority, status, notes, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (root_domain, path_prefix)
      DO UPDATE SET
        category = EXCLUDED.category,
        priority = EXCLUDED.priority,
        status = EXCLUDED.status,
        notes = EXCLUDED.notes,
        updated_at = EXCLUDED.updated_at
      RETURNING *`, [
            id,
            item.root_domain,
            item.path_prefix,
            item.category,
            item.priority,
            item.status,
            item.notes,
            now,
            now
        ]);
        return result.rows[0];
    } else {
        // SQLite - use INSERT OR REPLACE
        const stmt = db.prepare(`
      INSERT OR REPLACE INTO x402_watchlist (
        id, root_domain, path_prefix, category, priority, status, notes, created_at, updated_at
      ) VALUES (
        COALESCE((SELECT id FROM x402_watchlist WHERE root_domain = ? AND (path_prefix = ? OR (path_prefix IS NULL AND ? IS NULL))), ?),
        ?, ?, ?, ?, ?, ?,
        COALESCE((SELECT created_at FROM x402_watchlist WHERE root_domain = ? AND (path_prefix = ? OR (path_prefix IS NULL AND ? IS NULL))), ?),
        ?
      )
    `);
        stmt.run(item.root_domain, item.path_prefix, item.path_prefix, id, item.root_domain, item.path_prefix, item.category, item.priority, item.status, item.notes, item.root_domain, item.path_prefix, item.path_prefix, now, now);
        // Fetch the inserted/updated row
        const selectStmt = db.prepare(`SELECT * FROM x402_watchlist WHERE root_domain = ? AND (path_prefix = ? OR (path_prefix IS NULL AND ? IS NULL))`);
        return selectStmt.get(item.root_domain, item.path_prefix, item.path_prefix);
    }
}
async function updateWatchlistItemAfterCheck(id, httpStatus, etag, changed) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const now = new Date().toISOString();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        if (changed) {
            await db.pool.query(`UPDATE x402_watchlist 
         SET last_checked_at = $1, last_http_status = $2, last_etag = $3, last_change_at = $4, updated_at = $5
         WHERE id = $6`, [
                now,
                httpStatus,
                etag,
                now,
                now,
                id
            ]);
        } else {
            await db.pool.query(`UPDATE x402_watchlist 
         SET last_checked_at = $1, last_http_status = $2, last_etag = $3, updated_at = $4
         WHERE id = $5`, [
                now,
                httpStatus,
                etag,
                now,
                id
            ]);
        }
    } else {
        // SQLite
        if (changed) {
            const stmt = db.prepare(`UPDATE x402_watchlist 
         SET last_checked_at = ?, last_http_status = ?, last_etag = ?, last_change_at = ?, updated_at = ?
         WHERE id = ?`);
            stmt.run(now, httpStatus, etag, now, now, id);
        } else {
            const stmt = db.prepare(`UPDATE x402_watchlist 
         SET last_checked_at = ?, last_http_status = ?, last_etag = ?, updated_at = ?
         WHERE id = ?`);
            stmt.run(now, httpStatus, etag, now, id);
        }
    }
}
async function getWatchlistItemById(id) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        const result = await db.pool.query(`SELECT * FROM x402_watchlist WHERE id = $1`, [
            id
        ]);
        return result.rows[0] || null;
    } else {
        const stmt = db.prepare(`SELECT * FROM x402_watchlist WHERE id = ?`);
        return stmt.get(id) || null;
    }
}
async function getAllWatchlistItems() {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        const result = await db.pool.query(`SELECT * FROM x402_watchlist ORDER BY priority DESC, root_domain`);
        return result.rows;
    } else {
        const stmt = db.prepare(`SELECT * FROM x402_watchlist ORDER BY priority DESC, root_domain`);
        return stmt.all();
    }
}
/**
 * Map root domain to facilitator identifier
 */ function deriveFacilitator(rootDomain) {
    if (rootDomain.includes('cdp.coinbase.com') || rootDomain.includes('coinbase.com')) {
        return 'cdp';
    }
    if (rootDomain.includes('payai.network')) {
        return 'payai';
    }
    if (rootDomain.includes('cronos') || rootDomain.includes('cronoslabs.org')) {
        return 'cronos';
    }
    if (rootDomain.includes('altlayer.io')) {
        return 'altlayer';
    }
    return 'unknown';
}
/**
 * Map category to kind
 */ function categoryToKind(category) {
    if (category === 'bazaar_discovery') {
        return 'bazaar';
    }
    if (category === 'facilitator_discovery') {
        return 'facilitator';
    }
    if (category === 'gateway_docs') {
        return 'gateway_docs';
    }
    if (category === 'spec') {
        return 'spec';
    }
    return 'index';
}
async function getX402DiscoveryResources() {
    const items = await getAllWatchlistItems();
    return items.filter((item)=>item.status === 'active').map((item)=>{
        const url = `https://${item.root_domain}${item.path_prefix || ''}`;
        return {
            facilitator: deriveFacilitator(item.root_domain),
            kind: categoryToKind(item.category),
            url,
            lastHttpStatus: item.last_http_status,
            lastSeenAt: item.last_checked_at,
            category: item.category,
            priority: item.priority
        };
    }).sort((a, b)=>{
        // Sort by priority (desc) then by facilitator
        if (b.priority !== a.priority) {
            return b.priority - a.priority;
        }
        return a.facilitator.localeCompare(b.facilitator);
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/agent-recommendations.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// AGENT RECOMMENDATIONS DATABASE
// =============================================================================
// Persistence layer for agent recommendations
__turbopack_context__.s([
    "createRecommendation",
    ()=>createRecommendation,
    "createRecommendations",
    ()=>createRecommendations,
    "expirePendingRecommendations",
    ()=>expirePendingRecommendations,
    "getPendingCountByAgent",
    ()=>getPendingCountByAgent,
    "getRecommendation",
    ()=>getRecommendation,
    "listRecommendations",
    ()=>listRecommendations,
    "markRecommendationApplied",
    ()=>markRecommendationApplied,
    "markRecommendationRejected",
    ()=>markRecommendationRejected
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'AgentRecommendationsDB'
});
async function createRecommendation(input) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const id = crypto.randomUUID();
    const now = new Date();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const recommendation = {
        id,
        createdAt: now,
        agent: input.agent,
        type: input.type,
        facilitatorId: input.facilitatorId,
        resourceId: input.resourceId,
        priority: input.priority,
        confidence: input.confidence,
        details: input.details,
        reasoning: input.reasoning,
        status: 'PENDING',
        expiresAt: input.expiresAt
    };
    if (isPostgres) {
        await db.pool.query(`INSERT INTO agent_recommendations (
        id, created_at, agent, type, facilitator_id, resource_id,
        priority, confidence, details, reasoning, status, expires_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`, [
            id,
            now.toISOString(),
            input.agent,
            input.type,
            input.facilitatorId || null,
            input.resourceId || null,
            input.priority,
            input.confidence,
            JSON.stringify(input.details),
            input.reasoning,
            'PENDING',
            input.expiresAt?.toISOString() || null
        ]);
    } else {
        // SQLite
        const stmt = db.prepare(`
      INSERT INTO agent_recommendations (
        id, created_at, agent, type, facilitator_id, resource_id,
        priority, confidence, details, reasoning, status, expires_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        stmt.run(id, now.toISOString(), input.agent, input.type, input.facilitatorId || null, input.resourceId || null, input.priority, input.confidence, JSON.stringify(input.details), input.reasoning, 'PENDING', input.expiresAt?.toISOString() || null);
    }
    logger.info({
        recommendationId: id,
        agent: input.agent,
        type: input.type,
        priority: input.priority,
        msg: 'Created agent recommendation'
    });
    return recommendation;
}
async function createRecommendations(inputs) {
    const results = [];
    for (const input of inputs){
        const rec = await createRecommendation(input);
        results.push(rec);
    }
    return results;
}
async function listRecommendations(filter = {}) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    let query = 'SELECT * FROM agent_recommendations WHERE 1=1';
    const params = [];
    let paramIndex = 1;
    if (filter.agent) {
        query += isPostgres ? ` AND agent = $${paramIndex++}` : ' AND agent = ?';
        params.push(filter.agent);
    }
    if (filter.type) {
        query += isPostgres ? ` AND type = $${paramIndex++}` : ' AND type = ?';
        params.push(filter.type);
    }
    if (filter.status) {
        query += isPostgres ? ` AND status = $${paramIndex++}` : ' AND status = ?';
        params.push(filter.status);
    }
    if (filter.facilitatorId) {
        query += isPostgres ? ` AND facilitator_id = $${paramIndex++}` : ' AND facilitator_id = ?';
        params.push(filter.facilitatorId);
    }
    if (filter.priority) {
        query += isPostgres ? ` AND priority = $${paramIndex++}` : ' AND priority = ?';
        params.push(filter.priority);
    }
    if (filter.since) {
        query += isPostgres ? ` AND created_at >= $${paramIndex++}` : ' AND created_at >= ?';
        params.push(filter.since.toISOString());
    }
    query += ' ORDER BY created_at DESC';
    if (filter.limit) {
        query += isPostgres ? ` LIMIT $${paramIndex++}` : ' LIMIT ?';
        params.push(filter.limit);
    }
    let rows;
    if (isPostgres) {
        const result = await db.pool.query(query, params);
        rows = result.rows;
    } else {
        const stmt = db.prepare(query);
        rows = stmt.all(...params);
    }
    return rows.map(rowToRecommendation);
}
async function getRecommendation(id) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    let row;
    if (isPostgres) {
        const result = await db.pool.query('SELECT * FROM agent_recommendations WHERE id = $1', [
            id
        ]);
        row = result.rows[0];
    } else {
        const stmt = db.prepare('SELECT * FROM agent_recommendations WHERE id = ?');
        row = stmt.get(id);
    }
    return row ? rowToRecommendation(row) : null;
}
async function markRecommendationApplied(id, reviewedBy, metadata) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const now = new Date().toISOString();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        await db.pool.query(`UPDATE agent_recommendations
       SET status = 'APPLIED', reviewed_by = $1, reviewed_at = $2,
           details = details || $3
       WHERE id = $4`, [
            reviewedBy,
            now,
            JSON.stringify(metadata || {}),
            id
        ]);
    } else {
        // SQLite - simpler update
        const stmt = db.prepare(`
      UPDATE agent_recommendations
      SET status = 'APPLIED', reviewed_by = ?, reviewed_at = ?
      WHERE id = ?
    `);
        stmt.run(reviewedBy, now, id);
    }
    logger.info({
        recommendationId: id,
        reviewedBy,
        msg: 'Recommendation applied'
    });
}
async function markRecommendationRejected(id, reviewedBy, reason) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const now = new Date().toISOString();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        await db.pool.query(`UPDATE agent_recommendations
       SET status = 'REJECTED', reviewed_by = $1, reviewed_at = $2,
           details = details || $3
       WHERE id = $4`, [
            reviewedBy,
            now,
            JSON.stringify({
                rejectionReason: reason
            }),
            id
        ]);
    } else {
        const stmt = db.prepare(`
      UPDATE agent_recommendations
      SET status = 'REJECTED', reviewed_by = ?, reviewed_at = ?
      WHERE id = ?
    `);
        stmt.run(reviewedBy, now, id);
    }
    logger.info({
        recommendationId: id,
        reviewedBy,
        reason,
        msg: 'Recommendation rejected'
    });
}
async function expirePendingRecommendations() {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const now = new Date().toISOString();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        const result = await db.pool.query(`UPDATE agent_recommendations
       SET status = 'EXPIRED'
       WHERE status = 'PENDING' AND expires_at IS NOT NULL AND expires_at < $1`, [
            now
        ]);
        return result.rowCount || 0;
    } else {
        const stmt = db.prepare(`
      UPDATE agent_recommendations
      SET status = 'EXPIRED'
      WHERE status = 'PENDING' AND expires_at IS NOT NULL AND expires_at < ?
    `);
        const info = stmt.run(now);
        return info.changes || 0;
    }
}
async function getPendingCountByAgent() {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const query = `
    SELECT agent, COUNT(*) as count
    FROM agent_recommendations
    WHERE status = 'PENDING'
    GROUP BY agent
  `;
    let rows;
    if (isPostgres) {
        const result = await db.pool.query(query);
        rows = result.rows;
    } else {
        const stmt = db.prepare(query);
        rows = stmt.all();
    }
    const counts = {};
    for (const row of rows){
        counts[row.agent] = parseInt(row.count, 10);
    }
    return counts;
}
// =============================================================================
// HELPERS
// =============================================================================
function rowToRecommendation(row) {
    return {
        id: row.id,
        createdAt: new Date(row.created_at),
        agent: row.agent,
        type: row.type,
        facilitatorId: row.facilitator_id || undefined,
        resourceId: row.resource_id || undefined,
        priority: row.priority,
        confidence: parseFloat(row.confidence),
        details: typeof row.details === 'string' ? JSON.parse(row.details) : row.details,
        reasoning: row.reasoning,
        status: row.status,
        reviewedBy: row.reviewed_by || undefined,
        reviewedAt: row.reviewed_at ? new Date(row.reviewed_at) : undefined,
        expiresAt: row.expires_at ? new Date(row.expires_at) : undefined
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/agents/routing-tuner.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// ROUTING TUNER AGENT
// =============================================================================
// Analyzes facilitator performance and proposes routing changes
__turbopack_context__.s([
    "ROUTING_TUNER_CONFIG",
    ()=>ROUTING_TUNER_CONFIG,
    "runRoutingTuner",
    ()=>runRoutingTuner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'RoutingTuner'
});
const ROUTING_TUNER_CONFIG = {
    // Thresholds for deprioritization
    deprioritizeSuccessRateThreshold: parseFloat(process.env.ROUTING_TUNER_DEPRIORITIZE_SUCCESS_RATE || '0.85'),
    deprioritizeLatencyThresholdMs: parseInt(process.env.ROUTING_TUNER_DEPRIORITIZE_LATENCY_MS || '3000', 10),
    // Thresholds for promotion
    promoteSuccessRateThreshold: parseFloat(process.env.ROUTING_TUNER_PROMOTE_SUCCESS_RATE || '0.98'),
    promoteLatencyThresholdMs: parseInt(process.env.ROUTING_TUNER_PROMOTE_LATENCY_MS || '500', 10),
    // Minimum data requirements
    minInvocationsForDecision: parseInt(process.env.ROUTING_TUNER_MIN_INVOCATIONS || '100', 10),
    // Confidence thresholds
    highConfidenceThreshold: parseFloat(process.env.ROUTING_TUNER_HIGH_CONFIDENCE || '0.8'),
    mediumConfidenceThreshold: parseFloat(process.env.ROUTING_TUNER_MEDIUM_CONFIDENCE || '0.5'),
    // How many top performers to track
    topPerformersCount: parseInt(process.env.ROUTING_TUNER_TOP_PERFORMERS || '3', 10)
};
async function runRoutingTuner(worldState) {
    const recommendations = [];
    const now = new Date();
    logger.info({
        facilitatorCount: worldState.facilitators.length,
        msg: 'Running routing tuner'
    });
    // 1. Identify top performers
    const sortedByScore = [
        ...worldState.facilitators
    ].filter((f)=>f.totalInvocations >= ROUTING_TUNER_CONFIG.minInvocationsForDecision).sort((a, b)=>b.score - a.score);
    const topPerformers = sortedByScore.slice(0, ROUTING_TUNER_CONFIG.topPerformersCount).map((f)=>f.id);
    // 2. Identify underperformers (low success rate or high latency)
    const underperformers = [];
    const newContenders = [];
    for (const facilitator of worldState.facilitators){
        const analysis = analyzeFacilitator(facilitator);
        // Check if facilitator should be deprioritized
        if (analysis.shouldDeprioritize) {
            underperformers.push(facilitator.id);
            recommendations.push(createDeprioritizeRecommendation(facilitator, analysis.deprioritizeReasons, analysis.confidence, now));
        }
        // Check if facilitator should be promoted
        if (analysis.shouldPromote && !topPerformers.includes(facilitator.id)) {
            newContenders.push(facilitator.id);
            recommendations.push(createPromoteRecommendation(facilitator, analysis.promoteReasons, analysis.confidence, now));
        }
    }
    // 3. Check for risk anomalies that need routing changes
    for (const anomaly of worldState.riskAnomalies){
        if (anomaly.severity === 'critical' && anomaly.facilitatorId) {
            // Check if we already have a recommendation for this facilitator
            const existingRec = recommendations.find((r)=>r.facilitatorId === anomaly.facilitatorId && r.type === 'FACILITATOR_DEPRIORITIZE');
            if (!existingRec) {
                recommendations.push({
                    id: crypto.randomUUID(),
                    createdAt: now,
                    agent: 'routing_tuner',
                    type: 'FACILITATOR_DEPRIORITIZE',
                    facilitatorId: anomaly.facilitatorId,
                    priority: 'critical',
                    confidence: 0.9,
                    details: {
                        anomalyId: anomaly.id,
                        anomalyType: anomaly.type,
                        metrics: anomaly.metrics
                    },
                    reasoning: `Critical risk anomaly detected: ${anomaly.description}`,
                    status: 'PENDING',
                    expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000)
                });
            }
        }
    }
    const output = {
        recommendations,
        analysis: {
            topPerformers,
            underperformers,
            newContenders
        }
    };
    logger.info({
        topPerformers,
        underperformers,
        newContenders,
        recommendationCount: recommendations.length,
        msg: 'Routing tuner completed'
    });
    return output;
}
/**
 * Analyze a single facilitator
 */ function analyzeFacilitator(facilitator) {
    const deprioritizeReasons = [];
    const promoteReasons = [];
    // Determine confidence based on data
    let confidence = 0;
    if (facilitator.confidence === 'high') {
        confidence = ROUTING_TUNER_CONFIG.highConfidenceThreshold + 0.1;
    } else if (facilitator.confidence === 'medium') {
        confidence = ROUTING_TUNER_CONFIG.mediumConfidenceThreshold + 0.2;
    } else if (facilitator.confidence === 'low') {
        confidence = ROUTING_TUNER_CONFIG.mediumConfidenceThreshold;
    } else {
        confidence = 0.3; // Low confidence for no data
    }
    // Not enough data to make decisions
    if (facilitator.totalInvocations < ROUTING_TUNER_CONFIG.minInvocationsForDecision) {
        return {
            shouldDeprioritize: false,
            deprioritizeReasons: [],
            shouldPromote: false,
            promoteReasons: [],
            confidence: 0.2
        };
    }
    // Check for deprioritization
    if (facilitator.successRate < ROUTING_TUNER_CONFIG.deprioritizeSuccessRateThreshold) {
        deprioritizeReasons.push(`Success rate ${(facilitator.successRate * 100).toFixed(1)}% below threshold ${ROUTING_TUNER_CONFIG.deprioritizeSuccessRateThreshold * 100}%`);
    }
    if (facilitator.avgLatencyMs > ROUTING_TUNER_CONFIG.deprioritizeLatencyThresholdMs) {
        deprioritizeReasons.push(`Average latency ${facilitator.avgLatencyMs}ms exceeds threshold ${ROUTING_TUNER_CONFIG.deprioritizeLatencyThresholdMs}ms`);
    }
    if (facilitator.status === 'down' || facilitator.status === 'degraded') {
        deprioritizeReasons.push(`Facilitator status is ${facilitator.status}`);
    }
    // Check for promotion
    if (facilitator.successRate >= ROUTING_TUNER_CONFIG.promoteSuccessRateThreshold && facilitator.avgLatencyMs <= ROUTING_TUNER_CONFIG.promoteLatencyThresholdMs) {
        promoteReasons.push(`Excellent performance: ${(facilitator.successRate * 100).toFixed(1)}% success, ${facilitator.avgLatencyMs}ms latency`);
    }
    if (facilitator.score >= 90) {
        promoteReasons.push(`High composite score: ${facilitator.score.toFixed(1)}`);
    }
    return {
        shouldDeprioritize: deprioritizeReasons.length > 0,
        deprioritizeReasons,
        shouldPromote: promoteReasons.length > 0 && deprioritizeReasons.length === 0,
        promoteReasons,
        confidence
    };
}
/**
 * Create a deprioritize recommendation
 */ function createDeprioritizeRecommendation(facilitator, reasons, confidence, now) {
    // Determine priority based on severity
    let priority = 'medium';
    if (facilitator.successRate < 0.5 || facilitator.status === 'down') {
        priority = 'critical';
    } else if (facilitator.successRate < 0.7) {
        priority = 'high';
    }
    return {
        id: crypto.randomUUID(),
        createdAt: now,
        agent: 'routing_tuner',
        type: 'FACILITATOR_DEPRIORITIZE',
        facilitatorId: facilitator.id,
        priority,
        confidence,
        details: {
            // Metrics snapshot at decision time
            metricsSnapshot: {
                timestamp: now.toISOString(),
                score: facilitator.score,
                successRate: facilitator.successRate,
                avgLatencyMs: facilitator.avgLatencyMs,
                p95LatencyMs: facilitator.p95LatencyMs,
                totalInvocations: facilitator.totalInvocations,
                trustTier: facilitator.trustTier,
                status: facilitator.status,
                confidence: facilitator.confidence
            },
            // Thresholds used for decision
            thresholdsUsed: {
                deprioritizeSuccessRate: ROUTING_TUNER_CONFIG.deprioritizeSuccessRateThreshold,
                deprioritizeLatencyMs: ROUTING_TUNER_CONFIG.deprioritizeLatencyThresholdMs,
                minInvocations: ROUTING_TUNER_CONFIG.minInvocationsForDecision
            },
            // Conditions that triggered this recommendation
            triggeredConditions: reasons,
            // Whether facilitator is currently routable
            isCurrentlyRoutable: facilitator.status !== 'down' && facilitator.status !== 'degraded'
        },
        reasoning: `Recommend deprioritizing ${facilitator.id}: ${reasons.join('; ')}`,
        status: 'PENDING',
        expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000)
    };
}
/**
 * Create a promote recommendation
 */ function createPromoteRecommendation(facilitator, reasons, confidence, now) {
    return {
        id: crypto.randomUUID(),
        createdAt: now,
        agent: 'routing_tuner',
        type: 'FACILITATOR_PROMOTE',
        facilitatorId: facilitator.id,
        priority: 'low',
        confidence,
        details: {
            // Metrics snapshot at decision time
            metricsSnapshot: {
                timestamp: now.toISOString(),
                score: facilitator.score,
                successRate: facilitator.successRate,
                avgLatencyMs: facilitator.avgLatencyMs,
                p95LatencyMs: facilitator.p95LatencyMs,
                totalInvocations: facilitator.totalInvocations,
                trustTier: facilitator.trustTier,
                status: facilitator.status,
                confidence: facilitator.confidence
            },
            // Thresholds used for decision
            thresholdsUsed: {
                promoteSuccessRate: ROUTING_TUNER_CONFIG.promoteSuccessRateThreshold,
                promoteLatencyMs: ROUTING_TUNER_CONFIG.promoteLatencyThresholdMs,
                minInvocations: ROUTING_TUNER_CONFIG.minInvocationsForDecision
            },
            // Conditions that triggered this recommendation
            triggeredConditions: reasons
        },
        reasoning: `Recommend promoting ${facilitator.id}: ${reasons.join('; ')}`,
        status: 'PENDING',
        expiresAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    };
}
}),
"[project]/src/agents/pricing-tuner.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// PRICING TUNER AGENT (STUB)
// =============================================================================
// Analyzes resource pricing and proposes adjustments
// 
// TODO: This is a stub implementation. Future enhancements:
// - Integrate with metered endpoints to get pricing data
// - Analyze cost vs. usage patterns
// - Propose price changes based on market conditions
// - Factor in facilitator fees
__turbopack_context__.s([
    "runPricingTuner",
    ()=>runPricingTuner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'PricingTuner'
});
// =============================================================================
// CONFIGURATION
// =============================================================================
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PRICING_TUNER_CONFIG = {
    // Minimum margin to maintain over facilitator fees
    minMarginBps: 50,
    // Maximum price increase per adjustment
    maxPriceIncreasePct: 20,
    // Minimum usage to consider for price changes
    minUsageForPricing: 100
};
async function runPricingTuner(worldState) {
    const recommendations = [];
    logger.info({
        msg: 'Running pricing tuner (stub)'
    });
    // TODO: Implement actual pricing analysis
    // For now, just log that this is a stub
    // Example of what future implementation might look like:
    /*
  const endpoints = await getMeteredEndpoints();
  
  for (const endpoint of endpoints) {
    const usage = await getEndpointUsage(endpoint.id, '7d');
    const facilitatorCost = calculateFacilitatorCost(endpoint, worldState.facilitators);
    const currentMargin = endpoint.priceUsd - facilitatorCost;
    
    if (currentMargin < PRICING_TUNER_CONFIG.minMarginBps / 100) {
      recommendations.push({
        id: crypto.randomUUID(),
        createdAt: new Date(),
        agent: 'pricing_tuner',
        type: 'PRICING_CHANGE',
        resourceId: endpoint.id,
        priority: 'medium',
        confidence: 0.7,
        details: {
          currentPrice: endpoint.priceUsd,
          suggestedPrice: facilitatorCost * 1.1, // 10% margin
          facilitatorCost,
          usage7d: usage.totalCalls,
        },
        reasoning: `Margin below minimum threshold. Suggest price increase.`,
        status: 'PENDING',
      });
    }
  }
  */ const output = {
        recommendations,
        analysis: {
            resourcesReviewed: 0,
            priceChangesProposed: recommendations.length
        }
    };
    logger.info({
        recommendationCount: recommendations.length,
        msg: 'Pricing tuner completed (stub)'
    });
    return output;
}
}),
"[project]/src/agents/scout-tuner.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// SCOUT TUNER AGENT
// =============================================================================
// Evaluates newly discovered facilitators and proposes onboarding
__turbopack_context__.s([
    "runScoutTuner",
    ()=>runScoutTuner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'ScoutTuner'
});
// =============================================================================
// CONFIGURATION
// =============================================================================
const SCOUT_TUNER_CONFIG = {
    // Minimum external score to consider onboarding
    minExternalScoreForOnboarding: 60,
    // Maximum pending duration before requiring evaluation
    maxPendingDurationDays: 7,
    // Required networks for onboarding (must support at least one)
    requiredNetworks: [
        'eip155:8453'
    ],
    // Required assets for onboarding (must support at least one)
    requiredAssets: [
        'USDC'
    ]
};
async function runScoutTuner(worldState) {
    const recommendations = [];
    const now = new Date();
    const readyForOnboarding = [];
    const rejected = [];
    logger.info({
        pendingCount: worldState.pendingFacilitators.length,
        msg: 'Running scout tuner'
    });
    for (const pending of worldState.pendingFacilitators){
        const evaluation = evaluatePendingFacilitator(pending, worldState, now);
        if (evaluation.readyForOnboarding) {
            readyForOnboarding.push(pending.id);
            recommendations.push({
                id: crypto.randomUUID(),
                createdAt: now,
                agent: 'scout_tuner',
                type: 'FACILITATOR_ONBOARD',
                facilitatorId: pending.id,
                priority: evaluation.priority,
                confidence: evaluation.confidence,
                details: {
                    name: pending.name,
                    source: pending.source,
                    discoveredAt: pending.discoveredAt.toISOString(),
                    externalScore: pending.externalScore,
                    networks: pending.networks,
                    assets: pending.assets,
                    evaluationReasons: evaluation.reasons
                },
                reasoning: `Recommend onboarding ${pending.name}: ${evaluation.reasons.join('; ')}`,
                status: 'PENDING',
                expiresAt: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
            });
        } else if (evaluation.shouldReject) {
            rejected.push(pending.id);
            // We don't create a formal recommendation for rejections,
            // but we could log or track them
            logger.info({
                facilitatorId: pending.id,
                reasons: evaluation.rejectionReasons,
                msg: 'Pending facilitator rejected'
            });
        }
    // Otherwise, leave in pending state for more data
    }
    // Check for stale pending facilitators that need attention
    const stalePending = worldState.pendingFacilitators.filter((p)=>{
        const daysPending = (now.getTime() - p.discoveredAt.getTime()) / (24 * 60 * 60 * 1000);
        return daysPending > SCOUT_TUNER_CONFIG.maxPendingDurationDays;
    });
    if (stalePending.length > 0) {
        recommendations.push({
            id: crypto.randomUUID(),
            createdAt: now,
            agent: 'scout_tuner',
            type: 'RISK_ALERT',
            priority: 'low',
            confidence: 0.8,
            details: {
                staleFacilitatorIds: stalePending.map((p)=>p.id),
                staleFacilitatorNames: stalePending.map((p)=>p.name),
                maxAgeDays: Math.max(...stalePending.map((p)=>(now.getTime() - p.discoveredAt.getTime()) / (24 * 60 * 60 * 1000)))
            },
            reasoning: `${stalePending.length} facilitator(s) have been pending evaluation for more than ${SCOUT_TUNER_CONFIG.maxPendingDurationDays} days`,
            status: 'PENDING'
        });
    }
    const output = {
        recommendations,
        analysis: {
            pendingEvaluated: worldState.pendingFacilitators.length,
            readyForOnboarding,
            rejected
        }
    };
    logger.info({
        pendingEvaluated: worldState.pendingFacilitators.length,
        readyForOnboarding,
        rejected,
        recommendationCount: recommendations.length,
        msg: 'Scout tuner completed'
    });
    return output;
}
/**
 * Evaluate a pending facilitator for onboarding
 */ function evaluatePendingFacilitator(pending, worldState, now) {
    const reasons = [];
    const rejectionReasons = [];
    let confidence = 0.5;
    let readyForOnboarding = false;
    let shouldReject = false;
    let priority = 'low';
    // Check external score
    if (pending.externalScore !== undefined) {
        if (pending.externalScore >= SCOUT_TUNER_CONFIG.minExternalScoreForOnboarding) {
            reasons.push(`External score ${pending.externalScore} meets threshold`);
            confidence += 0.2;
        } else {
            rejectionReasons.push(`External score ${pending.externalScore} below threshold ${SCOUT_TUNER_CONFIG.minExternalScoreForOnboarding}`);
        }
    } else {
        // No external score - lower confidence
        reasons.push('No external score available - manual review recommended');
        confidence -= 0.1;
    }
    // Check network support
    const hasRequiredNetwork = pending.networks.length === 0 || // Unknown = might support
    pending.networks.some((n)=>SCOUT_TUNER_CONFIG.requiredNetworks.includes(n));
    if (hasRequiredNetwork) {
        if (pending.networks.length > 0) {
            reasons.push(`Supports required network(s): ${pending.networks.join(', ')}`);
            confidence += 0.1;
        }
    } else {
        rejectionReasons.push(`Does not support required networks. Has: ${pending.networks.join(', ')}`);
    }
    // Check asset support
    const hasRequiredAsset = pending.assets.length === 0 || // Unknown = might support
    pending.assets.some((a)=>SCOUT_TUNER_CONFIG.requiredAssets.includes(a));
    if (hasRequiredAsset) {
        if (pending.assets.length > 0) {
            reasons.push(`Supports required asset(s): ${pending.assets.join(', ')}`);
            confidence += 0.1;
        }
    } else {
        rejectionReasons.push(`Does not support required assets. Has: ${pending.assets.join(', ')}`);
    }
    // Check if from trusted source
    if (pending.source === 'bazaar') {
        reasons.push('Discovered from Bazaar marketplace');
        confidence += 0.1;
        priority = 'medium';
    }
    // Check how long it's been pending
    const daysPending = (now.getTime() - pending.discoveredAt.getTime()) / (24 * 60 * 60 * 1000);
    if (daysPending > 30) {
        rejectionReasons.push(`Stale: pending for ${Math.round(daysPending)} days without progress`);
    }
    // Check for existing similar facilitators
    // If we already have many high-performing facilitators, lower priority
    const highPerformers = worldState.facilitators.filter((f)=>f.score >= 80);
    if (highPerformers.length >= 3) {
        reasons.push('Multiple high-performing facilitators already available');
        priority = 'low';
        confidence -= 0.1;
    } else {
        reasons.push('Could fill gap in facilitator coverage');
        priority = 'medium';
        confidence += 0.1;
    }
    // Determine final decision
    confidence = Math.max(0.1, Math.min(0.95, confidence)); // Clamp to [0.1, 0.95]
    if (rejectionReasons.length > 0 && reasons.length === 0) {
        shouldReject = true;
    } else if (reasons.length > 0 && rejectionReasons.length === 0 && confidence >= 0.5) {
        readyForOnboarding = true;
    }
    // Otherwise, leave in pending state
    return {
        readyForOnboarding,
        shouldReject,
        priority,
        confidence,
        reasons,
        rejectionReasons
    };
}
}),
"[project]/src/agents/coordinator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// COORDINATOR / SUPER-AGENT
// =============================================================================
// Main orchestration agent that coordinates sub-agents and builds world state
__turbopack_context__.s([
    "buildWorldState",
    ()=>buildWorldState,
    "runCoordinatorTick",
    ()=>runCoordinatorTick
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/facilitator-metrics-reader.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$orchestrator$2f$meta$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/integrations/x402/orchestrator/meta-facilitator.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$x402$2d$watchlist$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/x402-watchlist.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$agent$2d$recommendations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/agent-recommendations.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$routing$2d$tuner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/agents/routing-tuner.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$pricing$2d$tuner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/agents/pricing-tuner.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$scout$2d$tuner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/agents/scout-tuner.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$orchestrator$2f$meta$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$x402$2d$watchlist$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$agent$2d$recommendations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$orchestrator$2f$meta$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$x402$2d$watchlist$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$agent$2d$recommendations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'Coordinator'
});
// =============================================================================
// CONFIGURATION
// =============================================================================
const COORDINATOR_CONFIG = {
    // Thresholds for anomaly detection
    successRateWarningThreshold: 0.9,
    successRateCriticalThreshold: 0.7,
    latencyWarningThresholdMs: 2000,
    latencyCriticalThresholdMs: 5000,
    // Default facilitator IDs to monitor (from registry)
    defaultFacilitatorIds: [
        'cdp',
        'payai',
        'x402rs',
        'dexter'
    ]
};
async function buildWorldState() {
    const timestamp = new Date();
    logger.info({
        msg: 'Building world state for coordinator'
    });
    // 1. Get facilitator rankings and scores
    const rankings = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rankFacilitators"])(COORDINATOR_CONFIG.defaultFacilitatorIds, '1d');
    // 2. Get meta-facilitator status for health info
    const metaFacilitator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$orchestrator$2f$meta$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getMetaFacilitator"])();
    const status = await metaFacilitator.getStatus();
    // 3. Build facilitator states
    const facilitators = [];
    for (const ranking of rankings.rankings){
        const healthDetail = status.facilitatorDetails.find((d)=>d.id === ranking.facilitatorId);
        // Determine if facilitator is currently routable
        const isHealthy = healthDetail?.healthy ?? false;
        const hasData = ranking.confidence !== 'none';
        const notBlocked = ranking.successRate > 0.1; // Not completely failing
        const isRoutable = isHealthy && hasData && notBlocked;
        let nonRoutableReason;
        if (!isRoutable) {
            const reasons = [];
            if (!isHealthy) reasons.push('failing health check');
            if (!hasData) reasons.push('no performance data');
            if (!notBlocked) reasons.push('success rate critically low');
            nonRoutableReason = reasons.join(', ');
        }
        facilitators.push({
            id: ranking.facilitatorId,
            name: healthDetail?.name || ranking.facilitatorId,
            score: ranking.score,
            successRate: ranking.successRate,
            avgLatencyMs: ranking.avgLatencyMs || 0,
            p95LatencyMs: ranking.p95LatencyMs,
            totalInvocations: ranking.totalInvocations,
            confidence: ranking.confidence,
            trustTier: mapConfidenceToTier(ranking.confidence),
            status: healthDetail?.healthy ? 'healthy' : 'unknown',
            networks: status.networks,
            assets: status.assets,
            feeBps: 0,
            // TODO: Compute deltas from historical data
            scoreDelta24h: undefined,
            successRateDelta24h: undefined,
            // Routing eligibility
            isRoutable,
            nonRoutableReason
        });
    }
    // 4. Get pending facilitators from watchlist
    const pendingFacilitators = await getPendingFacilitators();
    // 5. Detect risk anomalies
    const riskAnomalies = detectRiskAnomalies(facilitators);
    // 6. Build aggregates
    const aggregates = computeAggregates(facilitators);
    // 7. Build recent decisions summary
    const recentDecisions = facilitators.map((f)=>({
            facilitatorId: f.id,
            routeCount: f.totalInvocations,
            successCount: Math.round(f.totalInvocations * f.successRate),
            avgLatencyMs: f.avgLatencyMs
        }));
    const worldState = {
        timestamp,
        facilitators,
        pendingFacilitators,
        riskAnomalies,
        aggregates,
        recentDecisions
    };
    logger.info({
        facilitatorCount: facilitators.length,
        pendingCount: pendingFacilitators.length,
        anomalyCount: riskAnomalies.length,
        msg: 'World state built'
    });
    return worldState;
}
async function runCoordinatorTick() {
    const runId = crypto.randomUUID();
    const startedAt = new Date();
    const errors = [];
    logger.info({
        runId,
        msg: 'Starting coordinator tick'
    });
    // 1. Build world state
    let worldState;
    try {
        worldState = await buildWorldState();
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`World state build failed: ${errorMsg}`);
        logger.error({
            runId,
            error: errorMsg,
            msg: 'World state build failed'
        });
        // Return early with error
        return {
            runId,
            startedAt,
            completedAt: new Date(),
            worldState: createEmptyWorldState(),
            routingTuner: {
                recommendations: [],
                analysis: {
                    topPerformers: [],
                    underperformers: [],
                    newContenders: []
                }
            },
            pricingTuner: {
                recommendations: [],
                analysis: {
                    resourcesReviewed: 0,
                    priceChangesProposed: 0
                }
            },
            scoutTuner: {
                recommendations: [],
                analysis: {
                    pendingEvaluated: 0,
                    readyForOnboarding: [],
                    rejected: []
                }
            },
            totalRecommendations: 0,
            errors
        };
    }
    // 2. Run routing tuner
    let routingTunerOutput;
    try {
        routingTunerOutput = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$routing$2d$tuner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runRoutingTuner"])(worldState);
        logger.info({
            runId,
            recommendations: routingTunerOutput.recommendations.length,
            msg: 'Routing tuner completed'
        });
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Routing tuner failed: ${errorMsg}`);
        logger.error({
            runId,
            error: errorMsg,
            msg: 'Routing tuner failed'
        });
        routingTunerOutput = {
            recommendations: [],
            analysis: {
                topPerformers: [],
                underperformers: [],
                newContenders: []
            }
        };
    }
    // 3. Run pricing tuner
    let pricingTunerOutput;
    try {
        pricingTunerOutput = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$pricing$2d$tuner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runPricingTuner"])(worldState);
        logger.info({
            runId,
            recommendations: pricingTunerOutput.recommendations.length,
            msg: 'Pricing tuner completed'
        });
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Pricing tuner failed: ${errorMsg}`);
        logger.error({
            runId,
            error: errorMsg,
            msg: 'Pricing tuner failed'
        });
        pricingTunerOutput = {
            recommendations: [],
            analysis: {
                resourcesReviewed: 0,
                priceChangesProposed: 0
            }
        };
    }
    // 4. Run scout tuner
    let scoutTunerOutput;
    try {
        scoutTunerOutput = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$scout$2d$tuner$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runScoutTuner"])(worldState);
        logger.info({
            runId,
            recommendations: scoutTunerOutput.recommendations.length,
            msg: 'Scout tuner completed'
        });
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`Scout tuner failed: ${errorMsg}`);
        logger.error({
            runId,
            error: errorMsg,
            msg: 'Scout tuner failed'
        });
        scoutTunerOutput = {
            recommendations: [],
            analysis: {
                pendingEvaluated: 0,
                readyForOnboarding: [],
                rejected: []
            }
        };
    }
    // 5. Aggregate all recommendations
    const allRecommendations = [
        ...routingTunerOutput.recommendations,
        ...pricingTunerOutput.recommendations,
        ...scoutTunerOutput.recommendations
    ];
    // 6. Persist recommendations
    if (allRecommendations.length > 0) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$agent$2d$recommendations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRecommendations"])(allRecommendations.map((rec)=>({
                    agent: rec.agent,
                    type: rec.type,
                    facilitatorId: rec.facilitatorId,
                    resourceId: rec.resourceId,
                    priority: rec.priority,
                    confidence: rec.confidence,
                    details: rec.details,
                    reasoning: rec.reasoning,
                    expiresAt: rec.expiresAt
                })));
            logger.info({
                runId,
                count: allRecommendations.length,
                msg: 'Recommendations persisted'
            });
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Unknown error';
            errors.push(`Failed to persist recommendations: ${errorMsg}`);
            logger.error({
                runId,
                error: errorMsg,
                msg: 'Failed to persist recommendations'
            });
        }
    }
    const completedAt = new Date();
    const output = {
        runId,
        startedAt,
        completedAt,
        worldState,
        routingTuner: routingTunerOutput,
        pricingTuner: pricingTunerOutput,
        scoutTuner: scoutTunerOutput,
        totalRecommendations: allRecommendations.length,
        errors
    };
    logger.info({
        runId,
        durationMs: completedAt.getTime() - startedAt.getTime(),
        totalRecommendations: allRecommendations.length,
        errorCount: errors.length,
        msg: 'Coordinator tick completed'
    });
    return output;
}
// =============================================================================
// HELPERS
// =============================================================================
/**
 * Get pending facilitators from watchlist
 */ async function getPendingFacilitators() {
    try {
        const watchlist = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$x402$2d$watchlist$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getActiveWatchlistItems"])();
        // Filter for facilitator discovery items that haven't been fully onboarded
        const facilitatorItems = watchlist.filter((item)=>item.category === 'facilitator_discovery' || item.category === 'bazaar_discovery');
        // Map to PendingFacilitator format
        // TODO: Cross-reference with facilitator registry to find truly new ones
        return facilitatorItems.map((item)=>({
                id: `watchlist-${item.id}`,
                name: item.root_domain,
                discoveredAt: new Date(item.created_at),
                source: item.category === 'bazaar_discovery' ? 'bazaar' : 'watchlist',
                networks: [],
                assets: [],
                status: 'pending_evaluation'
            }));
    } catch (error) {
        logger.warn({
            error,
            msg: 'Failed to get pending facilitators from watchlist'
        });
        return [];
    }
}
/**
 * Detect risk anomalies from facilitator states
 */ function detectRiskAnomalies(facilitators) {
    const anomalies = [];
    for (const f of facilitators){
        // Check success rate
        if (f.successRate < COORDINATOR_CONFIG.successRateCriticalThreshold) {
            anomalies.push({
                id: `anomaly-${f.id}-success-critical`,
                detectedAt: new Date(),
                type: 'high_error_rate',
                facilitatorId: f.id,
                severity: 'critical',
                description: `Facilitator ${f.id} has critical error rate: ${((1 - f.successRate) * 100).toFixed(1)}%`,
                metrics: {
                    successRate: f.successRate,
                    threshold: COORDINATOR_CONFIG.successRateCriticalThreshold
                },
                resolved: false
            });
        } else if (f.successRate < COORDINATOR_CONFIG.successRateWarningThreshold) {
            anomalies.push({
                id: `anomaly-${f.id}-success-warning`,
                detectedAt: new Date(),
                type: 'high_error_rate',
                facilitatorId: f.id,
                severity: 'medium',
                description: `Facilitator ${f.id} has elevated error rate: ${((1 - f.successRate) * 100).toFixed(1)}%`,
                metrics: {
                    successRate: f.successRate,
                    threshold: COORDINATOR_CONFIG.successRateWarningThreshold
                },
                resolved: false
            });
        }
        // Check latency
        if (f.avgLatencyMs > COORDINATOR_CONFIG.latencyCriticalThresholdMs) {
            anomalies.push({
                id: `anomaly-${f.id}-latency-critical`,
                detectedAt: new Date(),
                type: 'latency_spike',
                facilitatorId: f.id,
                severity: 'high',
                description: `Facilitator ${f.id} has critical latency: ${f.avgLatencyMs}ms`,
                metrics: {
                    avgLatencyMs: f.avgLatencyMs,
                    threshold: COORDINATOR_CONFIG.latencyCriticalThresholdMs
                },
                resolved: false
            });
        } else if (f.avgLatencyMs > COORDINATOR_CONFIG.latencyWarningThresholdMs) {
            anomalies.push({
                id: `anomaly-${f.id}-latency-warning`,
                detectedAt: new Date(),
                type: 'latency_spike',
                facilitatorId: f.id,
                severity: 'medium',
                description: `Facilitator ${f.id} has elevated latency: ${f.avgLatencyMs}ms`,
                metrics: {
                    avgLatencyMs: f.avgLatencyMs,
                    threshold: COORDINATOR_CONFIG.latencyWarningThresholdMs
                },
                resolved: false
            });
        }
    }
    return anomalies;
}
/**
 * Compute aggregate metrics
 */ function computeAggregates(facilitators) {
    const totalRoutes = facilitators.reduce((sum, f)=>sum + f.totalInvocations, 0);
    const weightedSuccessSum = facilitators.reduce((sum, f)=>sum + f.successRate * f.totalInvocations, 0);
    const avgSuccessRate = totalRoutes > 0 ? weightedSuccessSum / totalRoutes : 0;
    const weightedLatencySum = facilitators.reduce((sum, f)=>sum + f.avgLatencyMs * f.totalInvocations, 0);
    const avgLatency = totalRoutes > 0 ? weightedLatencySum / totalRoutes : 0;
    return {
        totalRoutesLast24h: totalRoutes,
        successRateLast24h: avgSuccessRate,
        avgLatencyLast24h: avgLatency,
        totalVolumeLast24h: undefined
    };
}
/**
 * Map confidence to trust tier
 */ function mapConfidenceToTier(confidence) {
    switch(confidence){
        case 'high':
            return 'high';
        case 'medium':
            return 'medium';
        case 'low':
            return 'low';
        case 'none':
            return 'unknown';
    }
}
/**
 * Create empty world state for error cases
 */ function createEmptyWorldState() {
    return {
        timestamp: new Date(),
        facilitators: [],
        pendingFacilitators: [],
        riskAnomalies: [],
        aggregates: {
            totalRoutesLast24h: 0,
            successRateLast24h: 0,
            avgLatencyLast24h: 0
        },
        recentDecisions: []
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/routing-experiments.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// ROUTING EXPERIMENTS DATABASE
// =============================================================================
// Persistence layer for bandit shadow routing experiments
__turbopack_context__.s([
    "checkExperimentExists",
    ()=>checkExperimentExists,
    "createRoutingExperiment",
    ()=>createRoutingExperiment,
    "createRoutingExperiments",
    ()=>createRoutingExperiments,
    "getBanditPerformanceSummary",
    ()=>getBanditPerformanceSummary,
    "getRoutingExperiments",
    ()=>getRoutingExperiments,
    "loadBanditArmStates",
    ()=>loadBanditArmStates,
    "pruneOldExperiments",
    ()=>pruneOldExperiments,
    "saveBanditArmState",
    ()=>saveBanditArmState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'RoutingExperimentsDB'
});
async function checkExperimentExists(routeId, algorithm, algorithmVersion) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const query = isPostgres ? `SELECT 1 FROM routing_experiments 
       WHERE route_id = $1 AND algorithm = $2 AND algorithm_version = $3 
       LIMIT 1` : `SELECT 1 FROM routing_experiments 
       WHERE route_id = ? AND algorithm = ? AND algorithm_version = ? 
       LIMIT 1`;
    if (isPostgres) {
        const result = await db.pool.query(query, [
            routeId,
            algorithm,
            algorithmVersion
        ]);
        return result.rows.length > 0;
    } else {
        const stmt = db.prepare(query);
        const row = stmt.get(routeId, algorithm, algorithmVersion);
        return !!row;
    }
}
async function createRoutingExperiment(experiment) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const id = crypto.randomUUID();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const record = {
        id,
        ...experiment
    };
    if (isPostgres) {
        await db.pool.query(`INSERT INTO routing_experiments (
        id, route_id, timestamp, context, context_hash, available_facilitators,
        actual_facilitator, actual_reward,
        bandit_chosen_facilitator, bandit_estimated_reward, is_counterfactual,
        algorithm, algorithm_version, algorithm_state
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      ON CONFLICT (route_id, algorithm, algorithm_version) DO NOTHING`, [
            id,
            experiment.routeId || null,
            experiment.timestamp.toISOString(),
            JSON.stringify(experiment.context),
            experiment.contextHash,
            JSON.stringify(experiment.availableFacilitators),
            experiment.actualFacilitator,
            JSON.stringify(experiment.actualReward),
            experiment.banditChosenFacilitator,
            experiment.banditEstimatedReward,
            experiment.isCounterfactual || false,
            experiment.algorithm,
            experiment.algorithmVersion,
            experiment.algorithmState ? JSON.stringify(experiment.algorithmState) : null
        ]);
    } else {
        const stmt = db.prepare(`
      INSERT OR IGNORE INTO routing_experiments (
        id, route_id, timestamp, context, context_hash, available_facilitators,
        actual_facilitator, actual_reward,
        bandit_chosen_facilitator, bandit_estimated_reward, is_counterfactual,
        algorithm, algorithm_version, algorithm_state
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        stmt.run(id, experiment.routeId || null, experiment.timestamp.toISOString(), JSON.stringify(experiment.context), experiment.contextHash, JSON.stringify(experiment.availableFacilitators), experiment.actualFacilitator, JSON.stringify(experiment.actualReward), experiment.banditChosenFacilitator, experiment.banditEstimatedReward, experiment.isCounterfactual ? 1 : 0, experiment.algorithm, experiment.algorithmVersion, experiment.algorithmState ? JSON.stringify(experiment.algorithmState) : null);
    }
    return record;
}
async function createRoutingExperiments(experiments) {
    let count = 0;
    for (const exp of experiments){
        await createRoutingExperiment(exp);
        count++;
    }
    return count;
}
async function getRoutingExperiments(params) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    let query = 'SELECT * FROM routing_experiments WHERE 1=1';
    const queryParams = [];
    let paramIndex = 1;
    if (params.algorithm) {
        query += isPostgres ? ` AND algorithm = $${paramIndex++}` : ' AND algorithm = ?';
        queryParams.push(params.algorithm);
    }
    if (params.algorithmVersion) {
        query += isPostgres ? ` AND algorithm_version = $${paramIndex++}` : ' AND algorithm_version = ?';
        queryParams.push(params.algorithmVersion);
    }
    if (params.fromTimestamp) {
        query += isPostgres ? ` AND timestamp >= $${paramIndex++}` : ' AND timestamp >= ?';
        queryParams.push(params.fromTimestamp.toISOString());
    }
    if (params.toTimestamp) {
        query += isPostgres ? ` AND timestamp < $${paramIndex++}` : ' AND timestamp < ?';
        queryParams.push(params.toTimestamp.toISOString());
    }
    query += ' ORDER BY timestamp DESC';
    if (params.limit) {
        query += isPostgres ? ` LIMIT $${paramIndex++}` : ' LIMIT ?';
        queryParams.push(params.limit);
    }
    let rows;
    if (isPostgres) {
        const result = await db.pool.query(query, queryParams);
        rows = result.rows;
    } else {
        const stmt = db.prepare(query);
        rows = stmt.all(...queryParams);
    }
    return rows.map(rowToExperiment);
}
async function pruneOldExperiments(cutoffDate) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        const result = await db.pool.query(`DELETE FROM routing_experiments WHERE created_at < $1`, [
            cutoffDate.toISOString()
        ]);
        return result.rowCount || 0;
    } else {
        const stmt = db.prepare('DELETE FROM routing_experiments WHERE created_at < ?');
        const info = stmt.run(cutoffDate.toISOString());
        return info.changes || 0;
    }
}
async function getBanditPerformanceSummary(params) {
    // Get all experiments in window
    const experiments = await getRoutingExperiments({
        algorithm: params.algorithm,
        algorithmVersion: params.algorithmVersion,
        fromTimestamp: params.fromTimestamp,
        toTimestamp: params.toTimestamp
    });
    if (experiments.length === 0) {
        return {
            totalExperiments: 0,
            banditMatchedRate: 0,
            counterfactualRate: 0,
            avgActualReward: 0,
            avgBanditEstimatedReward: 0,
            facilitatorStats: []
        };
    }
    // Compute stats
    let matchedCount = 0;
    let counterfactualCount = 0;
    let totalActualReward = 0;
    let totalEstimatedReward = 0;
    let estimatedCount = 0;
    const facilitatorMap = new Map();
    for (const exp of experiments){
        if (exp.isCounterfactual) {
            counterfactualCount++;
        } else {
            matchedCount++;
        }
        totalActualReward += exp.actualReward.combined;
        if (exp.banditEstimatedReward !== null) {
            totalEstimatedReward += exp.banditEstimatedReward;
            estimatedCount++;
        }
        // Actual facilitator stats
        const actualStats = facilitatorMap.get(exp.actualFacilitator) || {
            actualPicks: 0,
            banditPicks: 0,
            totalReward: 0
        };
        actualStats.actualPicks++;
        actualStats.totalReward += exp.actualReward.combined;
        facilitatorMap.set(exp.actualFacilitator, actualStats);
        // Bandit pick stats
        const banditStats = facilitatorMap.get(exp.banditChosenFacilitator) || {
            actualPicks: 0,
            banditPicks: 0,
            totalReward: 0
        };
        banditStats.banditPicks++;
        facilitatorMap.set(exp.banditChosenFacilitator, banditStats);
    }
    const facilitatorStats = Array.from(facilitatorMap.entries()).map(([id, stats])=>({
            facilitatorId: id,
            actualPicks: stats.actualPicks,
            banditPicks: stats.banditPicks,
            avgActualReward: stats.actualPicks > 0 ? stats.totalReward / stats.actualPicks : 0
        }));
    return {
        totalExperiments: experiments.length,
        banditMatchedRate: matchedCount / experiments.length,
        counterfactualRate: counterfactualCount / experiments.length,
        avgActualReward: totalActualReward / experiments.length,
        avgBanditEstimatedReward: estimatedCount > 0 ? totalEstimatedReward / estimatedCount : 0,
        facilitatorStats
    };
}
async function saveBanditArmState(algorithm, algorithmVersion, contextHash, arm) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const now = new Date().toISOString();
    if (isPostgres) {
        await db.pool.query(`INSERT INTO bandit_arm_states (
        algorithm, algorithm_version, context_hash, facilitator_id,
        pulls, total_reward, avg_reward, last_pulled, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (algorithm, algorithm_version, context_hash, facilitator_id)
      DO UPDATE SET
        pulls = EXCLUDED.pulls,
        total_reward = EXCLUDED.total_reward,
        avg_reward = EXCLUDED.avg_reward,
        last_pulled = EXCLUDED.last_pulled,
        updated_at = EXCLUDED.updated_at`, [
            algorithm,
            algorithmVersion,
            contextHash,
            arm.facilitatorId,
            arm.pulls,
            arm.totalReward,
            arm.avgReward,
            arm.lastPulled?.toISOString() || null,
            now
        ]);
    } else {
        // SQLite - use INSERT OR REPLACE
        const stmt = db.prepare(`
      INSERT OR REPLACE INTO bandit_arm_states (
        algorithm, algorithm_version, context_hash, facilitator_id,
        pulls, total_reward, avg_reward, last_pulled, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        stmt.run(algorithm, algorithmVersion, contextHash, arm.facilitatorId, arm.pulls, arm.totalReward, arm.avgReward, arm.lastPulled?.toISOString() || null, now);
    }
}
async function loadBanditArmStates(algorithm, algorithmVersion, contextHash) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    let query;
    const params = [
        algorithm,
        algorithmVersion
    ];
    if (isPostgres) {
        query = 'SELECT * FROM bandit_arm_states WHERE algorithm = $1 AND algorithm_version = $2';
        if (contextHash) {
            query += ' AND context_hash = $3';
            params.push(contextHash);
        }
    } else {
        query = 'SELECT * FROM bandit_arm_states WHERE algorithm = ? AND algorithm_version = ?';
        if (contextHash) {
            query += ' AND context_hash = ?';
            params.push(contextHash);
        }
    }
    let rows;
    if (isPostgres) {
        const result = await db.pool.query(query, params);
        rows = result.rows;
    } else {
        const stmt = db.prepare(query);
        rows = stmt.all(...params);
    }
    const arms = new Map();
    for (const row of rows){
        const key = `${row.context_hash}-${row.facilitator_id}`;
        arms.set(key, {
            facilitatorId: row.facilitator_id,
            pulls: row.pulls,
            totalReward: parseFloat(row.total_reward),
            avgReward: parseFloat(row.avg_reward),
            lastPulled: row.last_pulled ? new Date(row.last_pulled) : undefined
        });
    }
    return arms;
}
// =============================================================================
// HELPERS
// =============================================================================
function rowToExperiment(row) {
    return {
        id: row.id,
        routeId: row.route_id || undefined,
        timestamp: new Date(row.timestamp),
        context: typeof row.context === 'string' ? JSON.parse(row.context) : row.context,
        contextHash: row.context_hash,
        availableFacilitators: typeof row.available_facilitators === 'string' ? JSON.parse(row.available_facilitators) : row.available_facilitators,
        actualFacilitator: row.actual_facilitator,
        actualReward: typeof row.actual_reward === 'string' ? JSON.parse(row.actual_reward) : row.actual_reward,
        banditChosenFacilitator: row.bandit_chosen_facilitator,
        banditEstimatedReward: row.bandit_estimated_reward !== null ? parseFloat(row.bandit_estimated_reward) : null,
        isCounterfactual: row.is_counterfactual === true || row.is_counterfactual === 1,
        algorithm: row.algorithm,
        algorithmVersion: row.algorithm_version,
        algorithmState: row.algorithm_state ? typeof row.algorithm_state === 'string' ? JSON.parse(row.algorithm_state) : row.algorithm_state : undefined
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/agents/bandit-routing.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// BANDIT SHADOW ROUTING
// =============================================================================
// Contextual bandit for shadow routing experiments
// Does NOT affect live routing - only simulates and logs decisions
//
// Algorithms implemented:
// - ε-greedy: Explore with probability ε, exploit otherwise
// - UCB1: Upper Confidence Bound for exploration/exploitation balance
//
// IMPORTANT: This is an OFFLINE simulation. For each historical event:
// 1. FIRST, compute what bandit would choose given current state
// 2. THEN, update bandit state with observed outcome
// This ensures proper offline policy evaluation semantics.
__turbopack_context__.s([
    "BANDIT_CONFIG",
    ()=>BANDIT_CONFIG,
    "buildContext",
    ()=>buildContext,
    "compareBanditPerformance",
    ()=>compareBanditPerformance,
    "computeReward",
    ()=>computeReward,
    "epsilonGreedySelect",
    ()=>epsilonGreedySelect,
    "getBanditArmStats",
    ()=>getBanditArmStats,
    "hashContext",
    ()=>hashContext,
    "pruneOldBanditData",
    ()=>pruneOldBanditData,
    "runBanditShadowSimulation",
    ()=>runBanditShadowSimulation,
    "ucb1Select",
    ()=>ucb1Select
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$routing$2d$experiments$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/routing-experiments.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$routing$2d$experiments$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$routing$2d$experiments$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'BanditRouting'
});
const BANDIT_CONFIG = {
    // ε-greedy parameters
    epsilon: parseFloat(process.env.BANDIT_EPSILON || '0.1'),
    // UCB1 parameters
    explorationBonus: parseFloat(process.env.BANDIT_UCB_BONUS || '2.0'),
    // Reward computation weights
    rewardWeights: {
        success: parseFloat(process.env.BANDIT_WEIGHT_SUCCESS || '0.6'),
        latency: parseFloat(process.env.BANDIT_WEIGHT_LATENCY || '0.3'),
        cost: parseFloat(process.env.BANDIT_WEIGHT_COST || '0.1')
    },
    // Latency normalization
    maxLatencyMs: parseInt(process.env.BANDIT_MAX_LATENCY_MS || '5000', 10),
    // Cost normalization
    maxFeeBps: parseInt(process.env.BANDIT_MAX_FEE_BPS || '100', 10),
    // Safety limits
    maxBanditHours: parseInt(process.env.BANDIT_MAX_HOURS || '24', 10),
    // Algorithm version (increment when changing algorithm behavior)
    algorithmVersion: process.env.BANDIT_ALGORITHM_VERSION || 'v1',
    // Pruning settings
    experimentRetentionDays: parseInt(process.env.BANDIT_RETENTION_DAYS || '30', 10)
};
// =============================================================================
// CONTEXT HELPERS
// =============================================================================
/**
 * Discretize amount into buckets
 * Handles both decimal strings (e.g., "0.05") and wei/smallest unit strings
 */ function getAmountBucket(amountStr) {
    // Try parsing as a decimal first (e.g., "0.05", "100.50")
    const amountFloat = parseFloat(amountStr);
    if (!isNaN(amountFloat)) {
        // Interpret as USD value
        if (amountFloat < 1) return 'micro';
        if (amountFloat < 100) return 'small';
        if (amountFloat < 10000) return 'medium';
        return 'large';
    }
    // Fallback: try as BigInt (smallest units like wei)
    try {
        const amount = BigInt(amountStr);
        const oneDollar = BigInt('1000000'); // 1 USDC in 6 decimals
        if (amount < oneDollar) return 'micro';
        if (amount < oneDollar * BigInt(100)) return 'small';
        if (amount < oneDollar * BigInt(10000)) return 'medium';
        return 'large';
    } catch  {
        // If all else fails, default to small
        return 'small';
    }
}
/**
 * Get time of day bucket
 */ function getTimeOfDay(timestamp) {
    const hour = timestamp.getUTCHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
}
/**
 * Get day of week bucket
 */ function getDayOfWeek(timestamp) {
    const day = timestamp.getUTCDay();
    return day === 0 || day === 6 ? 'weekend' : 'weekday';
}
function buildContext(network, asset, amount, timestamp) {
    return {
        network,
        asset,
        amountBucket: getAmountBucket(amount),
        timeOfDay: getTimeOfDay(timestamp),
        dayOfWeek: getDayOfWeek(timestamp)
    };
}
function hashContext(context) {
    return `${context.network}|${context.asset}|${context.amountBucket}|${context.timeOfDay}|${context.dayOfWeek}`;
}
function computeReward(success, latencyMs, feeBps) {
    const successReward = success ? 1 : 0;
    // Latency penalty: 0 = instant, 1 = very slow
    const latencyPenalty = Math.min(1, latencyMs / BANDIT_CONFIG.maxLatencyMs);
    // Cost penalty: 0 = free, 1 = expensive
    const costPenalty = Math.min(1, feeBps / BANDIT_CONFIG.maxFeeBps);
    // Combined reward (higher is better)
    const combined = BANDIT_CONFIG.rewardWeights.success * successReward - BANDIT_CONFIG.rewardWeights.latency * latencyPenalty - BANDIT_CONFIG.rewardWeights.cost * costPenalty;
    return {
        success: successReward,
        latencyPenalty,
        costPenalty,
        combined
    };
}
function epsilonGreedySelect(contextHash, availableFacilitators, arms, epsilon = BANDIT_CONFIG.epsilon) {
    if (availableFacilitators.length === 0) {
        throw new Error('No available facilitators');
    }
    // Explore with probability epsilon
    if (Math.random() < epsilon) {
        const randomIdx = Math.floor(Math.random() * availableFacilitators.length);
        const chosen = availableFacilitators[randomIdx];
        const armKey = `${contextHash}-${chosen}`;
        const arm = arms.get(armKey);
        return {
            chosen,
            estimated: arm?.avgReward || 0,
            isExplore: true
        };
    }
    // Exploit: choose best arm
    let bestFacilitator = availableFacilitators[0];
    let bestAvgReward = -Infinity;
    for (const facilitatorId of availableFacilitators){
        const armKey = `${contextHash}-${facilitatorId}`;
        const arm = arms.get(armKey);
        const avgReward = arm?.avgReward || 0;
        if (avgReward > bestAvgReward) {
            bestAvgReward = avgReward;
            bestFacilitator = facilitatorId;
        }
    }
    return {
        chosen: bestFacilitator,
        estimated: bestAvgReward === -Infinity ? 0 : bestAvgReward,
        isExplore: false
    };
}
function ucb1Select(contextHash, availableFacilitators, arms, totalPulls, explorationBonus = BANDIT_CONFIG.explorationBonus) {
    if (availableFacilitators.length === 0) {
        throw new Error('No available facilitators');
    }
    // If we haven't tried all arms, pick an untried one
    for (const facilitatorId of availableFacilitators){
        const armKey = `${contextHash}-${facilitatorId}`;
        const arm = arms.get(armKey);
        if (!arm || arm.pulls === 0) {
            return {
                chosen: facilitatorId,
                estimated: 0,
                ucbScore: Infinity
            };
        }
    }
    // All arms have been tried at least once - use UCB formula
    let bestFacilitator = availableFacilitators[0];
    let bestUcbScore = -Infinity;
    let bestEstimated = 0;
    const logTotalPulls = Math.log(Math.max(1, totalPulls));
    for (const facilitatorId of availableFacilitators){
        const armKey = `${contextHash}-${facilitatorId}`;
        const arm = arms.get(armKey);
        if (!arm) continue;
        const avgReward = arm.avgReward;
        const explorationTerm = explorationBonus * Math.sqrt(logTotalPulls / arm.pulls);
        const ucbScore = avgReward + explorationTerm;
        if (ucbScore > bestUcbScore) {
            bestUcbScore = ucbScore;
            bestFacilitator = facilitatorId;
            bestEstimated = avgReward;
        }
    }
    return {
        chosen: bestFacilitator,
        estimated: bestEstimated,
        ucbScore: bestUcbScore === -Infinity ? 0 : bestUcbScore
    };
}
/**
 * Get historical routes for simulation
 */ async function getHistoricalRoutes(fromTimestamp, toTimestamp) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    // Query routes with their attempts
    // Only include non-probe attempts
    const query = isPostgres ? `
      SELECT 
        r.id as route_id,
        r.created_at as timestamp,
        r.network,
        r.token,
        r.amount,
        ra.facilitator_id,
        ra.result,
        ra.latency_ms
      FROM routes r
      JOIN route_attempts ra ON r.id = ra.route_id
      WHERE r.created_at >= $1 
        AND r.created_at < $2
        AND ra.is_probe = false
        AND ra.phase = 'verify'
      ORDER BY r.created_at ASC
    ` : `
      SELECT 
        r.id as route_id,
        r.created_at as timestamp,
        r.network,
        r.token,
        r.amount,
        ra.facilitator_id,
        ra.result,
        ra.latency_ms
      FROM routes r
      JOIN route_attempts ra ON r.id = ra.route_id
      WHERE r.created_at >= ?
        AND r.created_at < ?
        AND ra.is_probe = 0
        AND ra.phase = 'verify'
      ORDER BY r.created_at ASC
    `;
    let rows;
    if (isPostgres) {
        const result = await db.pool.query(query, [
            fromTimestamp.toISOString(),
            toTimestamp.toISOString()
        ]);
        rows = result.rows;
    } else {
        const stmt = db.prepare(query);
        rows = stmt.all(fromTimestamp.toISOString(), toTimestamp.toISOString());
    }
    return rows.map((row)=>({
            routeId: row.route_id,
            timestamp: new Date(row.timestamp),
            network: row.network,
            token: row.token,
            amount: row.amount,
            facilitatorId: row.facilitator_id,
            result: row.result,
            latencyMs: row.latency_ms,
            feeBps: 0
        }));
}
/**
 * Get list of available facilitators for a network/token
 * TODO: Query facilitator registry/capabilities for actual available facilitators
 */ function getAvailableFacilitators(network, token) {
    // For now, use hardcoded list
    // In production, this should query the facilitator registry
    return [
        'cdp',
        'payai',
        'x402rs',
        'dexter'
    ];
}
async function runBanditShadowSimulation(params) {
    const startTime = Date.now();
    const algorithm = params.algorithm || 'epsilon_greedy';
    const algorithmVersion = BANDIT_CONFIG.algorithmVersion;
    // Validate time window
    const windowHours = (params.toTimestamp.getTime() - params.fromTimestamp.getTime()) / (1000 * 60 * 60);
    if (windowHours > BANDIT_CONFIG.maxBanditHours) {
        throw new Error(`Bandit time window ${windowHours.toFixed(1)}h exceeds maximum ${BANDIT_CONFIG.maxBanditHours}h. ` + `Use smaller windows or adjust BANDIT_MAX_HOURS env var.`);
    }
    logger.info({
        fromTimestamp: params.fromTimestamp.toISOString(),
        toTimestamp: params.toTimestamp.toISOString(),
        algorithm,
        algorithmVersion,
        windowHours: windowHours.toFixed(2),
        msg: 'Starting bandit shadow simulation'
    });
    // 1. Load existing arm states
    const arms = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$routing$2d$experiments$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadBanditArmStates"])(algorithm, algorithmVersion);
    let totalPulls = Array.from(arms.values()).reduce((sum, arm)=>sum + arm.pulls, 0);
    // 2. Get historical routes
    const routes = await getHistoricalRoutes(params.fromTimestamp, params.toTimestamp);
    if (routes.length === 0) {
        logger.info({
            msg: 'No historical routes found in time window'
        });
        return {
            experimentsCreated: 0,
            experimentsSkipped: 0,
            routesProcessed: 0,
            banditCorrectRate: 0,
            counterfactualCount: 0,
            durationMs: Date.now() - startTime
        };
    }
    // 3. Process each route
    let experimentsCreated = 0;
    let experimentsSkipped = 0;
    let banditCorrectCount = 0;
    let counterfactualCount = 0;
    const armsToSave = new Map();
    for (const route of routes){
        // Check for duplicate (idempotency)
        const exists = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$routing$2d$experiments$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkExperimentExists"])(route.routeId, algorithm, algorithmVersion);
        if (exists) {
            experimentsSkipped++;
            continue;
        }
        // Build context
        const context = buildContext(route.network, route.token, route.amount, route.timestamp);
        const contextHash = hashContext(context);
        // Get available facilitators
        const availableFacilitators = getAvailableFacilitators(route.network, route.token);
        // Skip if actual facilitator not in available list (edge case)
        if (!availableFacilitators.includes(route.facilitatorId)) {
            continue;
        }
        // =====================================================
        // STEP 1: Compute what bandit would choose BEFORE update
        // This is the key offline simulation semantic
        // =====================================================
        let banditChoice;
        if (algorithm === 'epsilon_greedy') {
            banditChoice = epsilonGreedySelect(contextHash, availableFacilitators, arms);
        } else {
            banditChoice = ucb1Select(contextHash, availableFacilitators, arms, totalPulls);
        }
        // Check if bandit chose the same as actual
        const isCounterfactual = banditChoice.chosen !== route.facilitatorId;
        if (isCounterfactual) {
            counterfactualCount++;
        } else {
            banditCorrectCount++;
        }
        // Compute actual reward from observed outcome
        const success = route.result === 'success';
        const actualReward = computeReward(success, route.latencyMs, route.feeBps);
        // For counterfactual: we don't have observed reward for bandit's choice
        // We can only estimate based on historical avg for that arm
        const banditEstimatedReward = isCounterfactual ? null // Explicitly null for counterfactual
         : actualReward.combined; // Same as actual when matched
        // Create experiment record
        const experiment = {
            routeId: route.routeId,
            timestamp: route.timestamp,
            context,
            contextHash,
            availableFacilitators,
            actualFacilitator: route.facilitatorId,
            actualReward,
            banditChosenFacilitator: banditChoice.chosen,
            banditEstimatedReward,
            isCounterfactual,
            algorithm,
            algorithmVersion
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$routing$2d$experiments$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRoutingExperiment"])(experiment);
        experimentsCreated++;
        // =====================================================
        // STEP 2: Update arm state with actual observed outcome
        // We update the arm that was ACTUALLY used, not bandit's choice
        // =====================================================
        const armKey = `${contextHash}-${route.facilitatorId}`;
        const existingArm = arms.get(armKey);
        const updatedArm = {
            facilitatorId: route.facilitatorId,
            pulls: (existingArm?.pulls || 0) + 1,
            totalReward: (existingArm?.totalReward || 0) + actualReward.combined,
            avgReward: 0,
            lastPulled: route.timestamp
        };
        updatedArm.avgReward = updatedArm.totalReward / updatedArm.pulls;
        arms.set(armKey, updatedArm);
        totalPulls++;
        // Queue arm for batch save
        armsToSave.set(armKey, {
            contextHash,
            arm: updatedArm
        });
        // Batch save every 100 records
        if (armsToSave.size >= 100) {
            await batchSaveArms(algorithm, algorithmVersion, armsToSave);
            armsToSave.clear();
        }
    }
    // 4. Final persist of remaining arm states
    if (armsToSave.size > 0) {
        await batchSaveArms(algorithm, algorithmVersion, armsToSave);
    }
    const durationMs = Date.now() - startTime;
    const processedCount = routes.length - experimentsSkipped;
    const banditCorrectRate = processedCount > 0 ? banditCorrectCount / processedCount : 0;
    logger.info({
        experimentsCreated,
        experimentsSkipped,
        routesProcessed: routes.length,
        banditCorrectRate: banditCorrectRate.toFixed(4),
        counterfactualCount,
        durationMs,
        msg: 'Bandit shadow simulation completed'
    });
    return {
        experimentsCreated,
        experimentsSkipped,
        routesProcessed: routes.length,
        banditCorrectRate,
        counterfactualCount,
        durationMs
    };
}
/**
 * Batch save arm states
 */ async function batchSaveArms(algorithm, algorithmVersion, arms) {
    for (const [, { contextHash, arm }] of arms){
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$routing$2d$experiments$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveBanditArmState"])(algorithm, algorithmVersion, contextHash, arm);
    }
}
async function getBanditArmStats(algorithm, algorithmVersion, contextHash) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$routing$2d$experiments$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadBanditArmStates"])(algorithm, algorithmVersion || BANDIT_CONFIG.algorithmVersion, contextHash);
}
async function compareBanditPerformance(params) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const version = params.algorithmVersion || BANDIT_CONFIG.algorithmVersion;
    const query = isPostgres ? `
      SELECT 
        actual_facilitator,
        bandit_chosen_facilitator,
        actual_reward,
        bandit_estimated_reward,
        is_counterfactual
      FROM routing_experiments
      WHERE algorithm = $1
        AND algorithm_version = $2
        AND timestamp >= $3
        AND timestamp < $4
    ` : `
      SELECT 
        actual_facilitator,
        bandit_chosen_facilitator,
        actual_reward,
        bandit_estimated_reward,
        is_counterfactual
      FROM routing_experiments
      WHERE algorithm = ?
        AND algorithm_version = ?
        AND timestamp >= ?
        AND timestamp < ?
    `;
    let rows;
    if (isPostgres) {
        const result = await db.pool.query(query, [
            params.algorithm,
            version,
            params.fromTimestamp.toISOString(),
            params.toTimestamp.toISOString()
        ]);
        rows = result.rows;
    } else {
        const stmt = db.prepare(query);
        rows = stmt.all(params.algorithm, version, params.fromTimestamp.toISOString(), params.toTimestamp.toISOString());
    }
    let matched = 0;
    let counterfactual = 0;
    let totalActualReward = 0;
    let totalEstimatedReward = 0;
    let estimatedCount = 0;
    const facilitatorMap = new Map();
    for (const row of rows){
        const actualReward = typeof row.actual_reward === 'string' ? JSON.parse(row.actual_reward).combined : row.actual_reward.combined;
        const estimatedReward = row.bandit_estimated_reward !== null ? parseFloat(row.bandit_estimated_reward) : null;
        totalActualReward += actualReward;
        if (estimatedReward !== null) {
            totalEstimatedReward += estimatedReward;
            estimatedCount++;
        }
        if (row.is_counterfactual) {
            counterfactual++;
        } else {
            matched++;
        }
        // Actual facilitator stats
        const actualStats = facilitatorMap.get(row.actual_facilitator) || {
            actualPicks: 0,
            banditPicks: 0,
            totalReward: 0
        };
        actualStats.actualPicks++;
        actualStats.totalReward += actualReward;
        facilitatorMap.set(row.actual_facilitator, actualStats);
        // Bandit pick stats
        if (row.bandit_chosen_facilitator !== row.actual_facilitator) {
            const banditStats = facilitatorMap.get(row.bandit_chosen_facilitator) || {
                actualPicks: 0,
                banditPicks: 0,
                totalReward: 0
            };
            banditStats.banditPicks++;
            facilitatorMap.set(row.bandit_chosen_facilitator, banditStats);
        } else {
            const stats = facilitatorMap.get(row.actual_facilitator);
            stats.banditPicks++;
        }
    }
    const facilitatorStats = Array.from(facilitatorMap.entries()).map(([id, stats])=>({
            facilitatorId: id,
            actualPicks: stats.actualPicks,
            banditPicks: stats.banditPicks,
            avgActualReward: stats.actualPicks > 0 ? stats.totalReward / stats.actualPicks : 0
        }));
    return {
        totalRoutes: rows.length,
        banditMatched: matched,
        counterfactual,
        avgActualReward: rows.length > 0 ? totalActualReward / rows.length : 0,
        avgBanditEstimatedReward: estimatedCount > 0 ? totalEstimatedReward / estimatedCount : 0,
        facilitatorStats
    };
}
async function pruneOldBanditData(retentionDays) {
    const days = retentionDays || BANDIT_CONFIG.experimentRetentionDays;
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    logger.info({
        retentionDays: days,
        cutoffDate: cutoffDate.toISOString(),
        msg: 'Pruning old bandit data'
    });
    const experimentsDeleted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$routing$2d$experiments$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pruneOldExperiments"])(cutoffDate);
    // Prune arm states that haven't been updated in retention period
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    let armStatesDeleted = 0;
    if (isPostgres) {
        const result = await db.pool.query(`DELETE FROM bandit_arm_states WHERE updated_at < $1`, [
            cutoffDate.toISOString()
        ]);
        armStatesDeleted = result.rowCount || 0;
    } else {
        const stmt = db.prepare('DELETE FROM bandit_arm_states WHERE updated_at < ?');
        const info = stmt.run(cutoffDate.toISOString());
        armStatesDeleted = info.changes || 0;
    }
    logger.info({
        experimentsDeleted,
        armStatesDeleted,
        msg: 'Bandit data pruned'
    });
    return {
        experimentsDeleted,
        armStatesDeleted
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/api/cron/coord/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// COORDINATOR CRON ENDPOINT
// =============================================================================
// GET /api/cron/coord
//
// Runs the coordinator tick which:
// 1. Builds world state from metrics and services
// 2. Runs routing tuner (proposes facilitator changes)
// 3. Runs pricing tuner (proposes pricing adjustments)
// 4. Runs scout tuner (evaluates new facilitators)
// 5. Persists recommendations to database
// 6. Optionally runs bandit shadow simulation
//
// Query params:
// - bandit=true: Also run bandit shadow simulation
// - banditHours=N: Hours to replay (default: 1, max: 24)
// - banditAlgo=epsilon_greedy|ucb1: Algorithm to use
// - prune=true: Also prune old experiment data
//
// Triggered by Vercel Cron or manual invocation
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$coordinator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/agents/coordinator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$bandit$2d$routing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/agents/bandit-routing.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$agent$2d$recommendations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/agent-recommendations.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$coordinator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$bandit$2d$routing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$agent$2d$recommendations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$coordinator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$bandit$2d$routing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$agent$2d$recommendations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'CoordinatorCron'
});
// Cron secret for authorization (required in production)
const CRON_SECRET = process.env.CRON_SECRET || process.env.VERCEL_CRON_SECRET;
const IS_PRODUCTION = ("TURBOPACK compile-time value", "development") === 'production';
// Rate limiting - track last run time
let lastRunTimestamp = 0;
const MIN_RUN_INTERVAL_MS = 60 * 1000; // 1 minute minimum between runs
async function GET(request) {
    const startTime = Date.now();
    const requestId = crypto.randomUUID();
    // Get client info for logging
    const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["headers"])();
    const clientIp = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    logger.info({
        requestId,
        clientIp,
        userAgent,
        msg: 'Coordinator cron request received'
    });
    // ==========================================================================
    // 1. Authorization check
    // ==========================================================================
    const authHeader = request.headers.get('authorization');
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        // In development, warn if no auth but allow
        if (!authHeader) {
            logger.warn({
                requestId,
                msg: 'No authorization in dev mode - allowing for testing'
            });
        }
    }
    // ==========================================================================
    // 2. Rate limiting check
    // ==========================================================================
    const timeSinceLastRun = Date.now() - lastRunTimestamp;
    if (timeSinceLastRun < MIN_RUN_INTERVAL_MS) {
        const waitSeconds = Math.ceil((MIN_RUN_INTERVAL_MS - timeSinceLastRun) / 1000);
        logger.warn({
            requestId,
            timeSinceLastRunMs: timeSinceLastRun,
            waitSeconds,
            msg: 'Rate limited - too soon since last run'
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Rate limited',
            code: 'RATE_LIMITED',
            retryAfterSeconds: waitSeconds
        }, {
            status: 429,
            headers: {
                'Retry-After': String(waitSeconds)
            }
        });
    }
    // ==========================================================================
    // 3. Parse and validate query parameters
    // ==========================================================================
    const { searchParams } = new URL(request.url);
    const runBandit = searchParams.get('bandit') === 'true';
    const runPrune = searchParams.get('prune') === 'true';
    const banditHoursParam = parseInt(searchParams.get('banditHours') || '1', 10);
    const banditAlgorithm = searchParams.get('banditAlgo') || 'epsilon_greedy';
    // Validate bandit hours with sanity limit
    const maxBanditHours = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$bandit$2d$routing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BANDIT_CONFIG"].maxBanditHours;
    if (banditHoursParam < 1 || banditHoursParam > maxBanditHours) {
        logger.warn({
            requestId,
            banditHoursParam,
            maxBanditHours,
            msg: 'Invalid banditHours parameter'
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: `banditHours must be between 1 and ${maxBanditHours}`,
            code: 'INVALID_PARAM'
        }, {
            status: 400
        });
    }
    const banditHours = Math.min(banditHoursParam, maxBanditHours);
    logger.info({
        requestId,
        runBandit,
        runPrune,
        banditHours,
        banditAlgorithm,
        msg: 'Starting coordinator cron'
    });
    // Update last run timestamp
    lastRunTimestamp = Date.now();
    try {
        // ==========================================================================
        // 4. Expire old pending recommendations
        // ==========================================================================
        const expiredCount = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$agent$2d$recommendations$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expirePendingRecommendations"])();
        if (expiredCount > 0) {
            logger.info({
                requestId,
                expiredCount,
                msg: 'Expired old recommendations'
            });
        }
        // ==========================================================================
        // 5. Run coordinator tick
        // ==========================================================================
        const coordinatorResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$coordinator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runCoordinatorTick"])();
        logger.info({
            requestId,
            runId: coordinatorResult.runId,
            totalRecommendations: coordinatorResult.totalRecommendations,
            routingTunerRecs: coordinatorResult.routingTuner.recommendations.length,
            pricingTunerRecs: coordinatorResult.pricingTuner.recommendations.length,
            scoutTunerRecs: coordinatorResult.scoutTuner.recommendations.length,
            facilitatorCount: coordinatorResult.worldState.facilitators.length,
            routableCount: coordinatorResult.worldState.facilitators.filter((f)=>f.isRoutable).length,
            riskAnomalyCount: coordinatorResult.worldState.riskAnomalies.length,
            errorCount: coordinatorResult.errors.length,
            msg: 'Coordinator tick completed'
        });
        // ==========================================================================
        // 6. Optionally run bandit shadow simulation
        // ==========================================================================
        let banditResult = null;
        if (runBandit) {
            const toTimestamp = new Date();
            const fromTimestamp = new Date(toTimestamp.getTime() - banditHours * 60 * 60 * 1000);
            try {
                banditResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$bandit$2d$routing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runBanditShadowSimulation"])({
                    fromTimestamp,
                    toTimestamp,
                    algorithm: banditAlgorithm
                });
                logger.info({
                    requestId,
                    algorithm: banditAlgorithm,
                    timeWindowHours: banditHours,
                    routesProcessed: banditResult.routesProcessed,
                    experimentsCreated: banditResult.experimentsCreated,
                    experimentsSkipped: banditResult.experimentsSkipped,
                    banditCorrectRate: banditResult.banditCorrectRate.toFixed(4),
                    counterfactualCount: banditResult.counterfactualCount,
                    durationMs: banditResult.durationMs,
                    msg: 'Bandit simulation completed'
                });
            } catch (banditError) {
                const errorMsg = banditError instanceof Error ? banditError.message : 'Unknown error';
                logger.error({
                    requestId,
                    error: errorMsg,
                    msg: 'Bandit simulation failed'
                });
                // Don't fail the whole request, just log the error
                coordinatorResult.errors.push(`Bandit simulation failed: ${errorMsg}`);
            }
        }
        // ==========================================================================
        // 7. Optionally prune old data
        // ==========================================================================
        let pruneResult = null;
        if (runPrune) {
            try {
                pruneResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$bandit$2d$routing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pruneOldBanditData"])();
                logger.info({
                    requestId,
                    experimentsDeleted: pruneResult.experimentsDeleted,
                    armStatesDeleted: pruneResult.armStatesDeleted,
                    msg: 'Data pruning completed'
                });
            } catch (pruneError) {
                const errorMsg = pruneError instanceof Error ? pruneError.message : 'Unknown error';
                logger.error({
                    requestId,
                    error: errorMsg,
                    msg: 'Data pruning failed'
                });
            }
        }
        // ==========================================================================
        // 8. Build response
        // ==========================================================================
        const durationMs = Date.now() - startTime;
        const response = {
            success: coordinatorResult.errors.length === 0,
            requestId,
            runId: coordinatorResult.runId,
            timestamp: coordinatorResult.completedAt.toISOString(),
            durationMs,
            coordinator: {
                totalRecommendations: coordinatorResult.totalRecommendations,
                routingTuner: {
                    recommendations: coordinatorResult.routingTuner.recommendations.length,
                    topPerformers: coordinatorResult.routingTuner.analysis.topPerformers,
                    underperformers: coordinatorResult.routingTuner.analysis.underperformers
                },
                pricingTuner: {
                    recommendations: coordinatorResult.pricingTuner.recommendations.length,
                    resourcesReviewed: coordinatorResult.pricingTuner.analysis.resourcesReviewed
                },
                scoutTuner: {
                    recommendations: coordinatorResult.scoutTuner.recommendations.length,
                    pendingEvaluated: coordinatorResult.scoutTuner.analysis.pendingEvaluated,
                    readyForOnboarding: coordinatorResult.scoutTuner.analysis.readyForOnboarding
                },
                errors: coordinatorResult.errors
            },
            worldState: {
                facilitatorCount: coordinatorResult.worldState.facilitators.length,
                routableFacilitatorCount: coordinatorResult.worldState.facilitators.filter((f)=>f.isRoutable).length,
                pendingFacilitatorCount: coordinatorResult.worldState.pendingFacilitators.length,
                riskAnomalyCount: coordinatorResult.worldState.riskAnomalies.length,
                aggregates: coordinatorResult.worldState.aggregates
            },
            bandit: banditResult ? {
                algorithm: banditAlgorithm,
                algorithmVersion: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$agents$2f$bandit$2d$routing$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BANDIT_CONFIG"].algorithmVersion,
                timeWindowHours: banditHours,
                routesProcessed: banditResult.routesProcessed,
                experimentsCreated: banditResult.experimentsCreated,
                experimentsSkipped: banditResult.experimentsSkipped,
                banditCorrectRate: banditResult.banditCorrectRate,
                counterfactualCount: banditResult.counterfactualCount,
                durationMs: banditResult.durationMs
            } : null,
            prune: pruneResult ? {
                experimentsDeleted: pruneResult.experimentsDeleted,
                armStatesDeleted: pruneResult.armStatesDeleted
            } : null,
            expiredRecommendations: expiredCount
        };
        logger.info({
            requestId,
            runId: coordinatorResult.runId,
            totalRecommendations: coordinatorResult.totalRecommendations,
            banditRan: !!banditResult,
            pruneRan: !!pruneResult,
            durationMs,
            msg: 'Coordinator cron completed successfully'
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response, {
            status: 200
        });
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        const durationMs = Date.now() - startTime;
        logger.error({
            requestId,
            error: errorMsg,
            stack: error instanceof Error ? error.stack : undefined,
            durationMs,
            msg: 'Coordinator cron failed'
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            requestId,
            error: errorMsg,
            code: 'INTERNAL_ERROR',
            durationMs
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    // Reuse GET handler
    return GET(request);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0144d374._.js.map