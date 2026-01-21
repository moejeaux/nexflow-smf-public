(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__8ff373cc._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/lib/sentry.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/lib/logger.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pino$2f$browser$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pino/browser.js [middleware-edge] (ecmascript)");
;
// Determine log level from environment
const logLevel = process.env.LOG_LEVEL || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'debug');
// Create logger instance with structured output
// In Next.js dev mode, disable pino-pretty transport to avoid worker thread issues
// Use simple JSON output instead (can be prettified by other tools)
const isNextDev = ("TURBOPACK compile-time value", "development") === 'development' && ("TURBOPACK compile-time value", "edge");
const usePrettyTransport = ("TURBOPACK compile-time value", "development") !== 'production' && !isNextDev;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pino$2f$browser$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])({
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
    timestamp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pino$2f$browser$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].stdTimeFunctions.isoTime
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
                const { captureException } = __turbopack_context__.r("[project]/src/lib/sentry.ts [middleware-edge] (ecmascript)");
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
                const { captureException } = __turbopack_context__.r("[project]/src/lib/sentry.ts [middleware-edge] (ecmascript)");
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
"[project]/src/lib/request-id.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// Request ID Tracking
// =============================================================================
// Generates and tracks request IDs for request correlation
__turbopack_context__.s([
    "addRequestIdToResponse",
    ()=>addRequestIdToResponse,
    "createRequestLogger",
    ()=>createRequestLogger,
    "generateRequestId",
    ()=>generateRequestId,
    "getOrCreateRequestId",
    ()=>getOrCreateRequestId,
    "getRequestId",
    ()=>getRequestId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [middleware-edge] (ecmascript)");
;
const REQUEST_ID_HEADER = 'x-request-id';
const REQUEST_ID_CONTEXT_KEY = 'requestId';
function generateRequestId() {
    // Generate UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    // Set version (4) and variant bits
    array[6] = array[6] & 0x0f | 0x40; // Version 4
    array[8] = array[8] & 0x3f | 0x80; // Variant 10
    // Convert to UUID string format
    const hex = Array.from(array).map((b)=>b.toString(16).padStart(2, '0')).join('');
    return [
        hex.substring(0, 8),
        hex.substring(8, 12),
        hex.substring(12, 16),
        hex.substring(16, 20),
        hex.substring(20, 32)
    ].join('-');
}
function getOrCreateRequestId(request) {
    const existingId = request.headers.get(REQUEST_ID_HEADER);
    if (existingId) {
        // Check if we should trust this request ID
        const trustedSources = process.env.TRUSTED_REQUEST_ID_SOURCES?.split(',') || [];
        const shouldTrust = trustedSources.length === 0 || trustedSources.some((source)=>{
            const origin = request.headers.get('origin') || '';
            const referer = request.headers.get('referer') || '';
            return origin.includes(source) || referer.includes(source);
        });
        if (shouldTrust) {
            return existingId;
        }
    }
    return generateRequestId();
}
function addRequestIdToResponse(response, requestId) {
    response.headers.set(REQUEST_ID_HEADER, requestId);
    return response;
}
function getRequestId() {
    // In Next.js, we'll use headers instead of AsyncLocalStorage
    // This is simpler and works with the serverless model
    return undefined;
}
function createRequestLogger(requestId, additionalContext) {
    const context = {
        requestId,
        ...additionalContext
    };
    const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createLogger"])(context);
    return {
        info: (message, meta)=>{
            logger.info({
                ...context,
                ...meta
            }, message);
        },
        warn: (message, meta)=>{
            logger.warn({
                ...context,
                ...meta
            }, message);
        },
        error: (message, meta)=>{
            logger.error({
                ...context,
                ...meta
            }, message);
        },
        debug: (message, meta)=>{
            logger.debug({
                ...context,
                ...meta
            }, message);
        }
    };
}
}),
"[externals]/node:events [external] (node:events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:events", () => require("node:events"));

module.exports = mod;
}),
"[externals]/node:assert [external] (node:assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:assert", () => require("node:assert"));

module.exports = mod;
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[project]/ [middleware-edge] (unsupported edge import 'fs', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`fs`));
}),
"[project]/ [middleware-edge] (unsupported edge import 'path', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`path`));
}),
"[project]/ [middleware-edge] (unsupported edge import 'stream', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`stream`));
}),
"[project]/ [middleware-edge] (unsupported edge import 'crypto', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`crypto`));
}),
"[project]/ [middleware-edge] (unsupported edge import 'dns', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`dns`));
}),
"[project]/ [middleware-edge] (unsupported edge import 'net', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`net`));
}),
"[project]/ [middleware-edge] (unsupported edge import 'tls', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`tls`));
}),
"[project]/ [middleware-edge] (unsupported edge import 'string_decoder', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`string_decoder`));
}),
"[project]/src/lib/rate-limit-store.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// RATE LIMIT STORE
// =============================================================================
// Pluggable backing store for rate limiting with Upstash Redis support and in-memory fallback.
// Supports distributed rate limiting across serverless instances.
//
// Environment Variables:
// - UPSTASH_REDIS_REST_URL: Upstash Redis REST URL (from Vercel integration)
// - UPSTASH_REDIS_REST_TOKEN: Upstash Redis REST token (from Vercel integration)
__turbopack_context__.s([
    "getEdgeRateLimitStore",
    ()=>getEdgeRateLimitStore,
    "getRateLimitStore",
    ()=>getRateLimitStore,
    "resetRateLimitStore",
    ()=>resetRateLimitStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [middleware-edge] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'RateLimitStore'
});
// =============================================================================
// IN-MEMORY STORE (fallback)
// =============================================================================
class InMemoryStore {
    store = new Map();
    cleanupInterval = null;
    constructor(){
        // Cleanup every 5 minutes
        if (typeof setInterval !== 'undefined') {
            this.cleanupInterval = setInterval(()=>this.cleanup(), 5 * 60 * 1000);
        }
    }
    cleanup() {
        const now = Date.now();
        const keysToDelete = [];
        this.store.forEach((value, key)=>{
            if (value.resetAt < now) {
                keysToDelete.push(key);
            }
        });
        keysToDelete.forEach((key)=>this.store.delete(key));
    }
    async get(key) {
        const entry = this.store.get(key);
        if (!entry || entry.resetAt < Date.now()) {
            return null;
        }
        return entry;
    }
    async set(key, entry) {
        this.store.set(key, entry);
    }
    async increment(key, windowMs) {
        const now = Date.now();
        const existing = this.store.get(key);
        if (!existing || existing.resetAt < now) {
            const entry = {
                count: 1,
                resetAt: now + windowMs
            };
            this.store.set(key, entry);
            return entry;
        }
        existing.count++;
        this.store.set(key, existing);
        return existing;
    }
}
// =============================================================================
// UPSTASH REDIS STORE (distributed)
// =============================================================================
class UpstashRedisStore {
    redis;
    constructor(redisClient){
        this.redis = redisClient;
    }
    async get(key) {
        try {
            const data = await this.redis.get(`ratelimit:${key}`);
            if (!data) return null;
            // Upstash returns parsed JSON automatically if it's a JSON string
            const entry = typeof data === 'string' ? JSON.parse(data) : data;
            if (entry.resetAt < Date.now()) return null;
            return entry;
        } catch (error) {
            logger.error({
                error,
                key
            }, 'Upstash Redis GET failed');
            return null;
        }
    }
    async set(key, entry) {
        try {
            const ttlMs = Math.max(entry.resetAt - Date.now(), 1000);
            const ttlSeconds = Math.ceil(ttlMs / 1000);
            await this.redis.set(`ratelimit:${key}`, JSON.stringify(entry), {
                ex: ttlSeconds
            });
        } catch (error) {
            logger.error({
                error,
                key
            }, 'Upstash Redis SET failed');
        }
    }
    async increment(key, windowMs) {
        try {
            const redisKey = `ratelimit:${key}`;
            const now = Date.now();
            // Get current entry
            const data = await this.redis.get(redisKey);
            let count = 1;
            let resetAt = now + windowMs;
            if (data) {
                const entry = typeof data === 'string' ? JSON.parse(data) : data;
                if (entry.resetAt > now) {
                    count = entry.count + 1;
                    resetAt = entry.resetAt;
                }
            }
            const newEntry = {
                count,
                resetAt
            };
            const ttlMs = resetAt - now;
            const ttlSeconds = Math.ceil(ttlMs / 1000);
            await this.redis.set(redisKey, JSON.stringify(newEntry), {
                ex: ttlSeconds
            });
            return newEntry;
        } catch (error) {
            logger.error({
                error,
                key
            }, 'Upstash Redis INCR failed');
            // Fallback: return a permissive entry
            return {
                count: 1,
                resetAt: Date.now() + windowMs
            };
        }
    }
}
// =============================================================================
// STORE FACTORY
// =============================================================================
let storeInstance = null;
async function getRateLimitStore() {
    if (storeInstance) {
        return storeInstance;
    }
    // Check for Upstash Redis environment variables (set by Vercel integration)
    const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (upstashUrl && upstashToken) {
        try {
            // Dynamic import to avoid build issues
            const { Redis } = await Promise.resolve().then(()=>__turbopack_context__.i("[project]/node_modules/@upstash/redis/nodejs.mjs [middleware-edge] (ecmascript)"));
            const redis = new Redis({
                url: upstashUrl,
                token: upstashToken
            });
            // Test connection
            await redis.ping();
            logger.info('Rate limit store using Upstash Redis');
            storeInstance = new UpstashRedisStore(redis);
            return storeInstance;
        } catch (error) {
            logger.warn({
                error
            }, 'Upstash Redis connection failed, falling back to in-memory');
        }
    }
    // Legacy support: check for REDIS_URL (ioredis)
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl) {
        try {
            const { Redis } = await Promise.resolve().then(()=>__turbopack_context__.i("[project]/node_modules/ioredis/built/index.js [middleware-edge] (ecmascript)"));
            const redis = new Redis(redisUrl, {
                maxRetriesPerRequest: 3,
                enableReadyCheck: true,
                connectTimeout: 5000,
                lazyConnect: true
            });
            await redis.connect();
            logger.info('Rate limit store using Redis (ioredis)');
            // Use a simple wrapper that matches UpstashRedisStore behavior
            storeInstance = {
                async get (key) {
                    const data = await redis.get(`ratelimit:${key}`);
                    if (!data) return null;
                    const entry = JSON.parse(data);
                    if (entry.resetAt < Date.now()) return null;
                    return entry;
                },
                async set (key, entry) {
                    const ttlMs = Math.max(entry.resetAt - Date.now(), 1000);
                    await redis.set(`ratelimit:${key}`, JSON.stringify(entry), 'PX', ttlMs);
                },
                async increment (key, windowMs) {
                    const now = Date.now();
                    const redisKey = `ratelimit:${key}`;
                    const data = await redis.get(redisKey);
                    let count = 1;
                    let resetAt = now + windowMs;
                    if (data) {
                        const entry = JSON.parse(data);
                        if (entry.resetAt > now) {
                            count = entry.count + 1;
                            resetAt = entry.resetAt;
                        }
                    }
                    const newEntry = {
                        count,
                        resetAt
                    };
                    const ttlMs = resetAt - now;
                    await redis.set(redisKey, JSON.stringify(newEntry), 'PX', ttlMs);
                    return newEntry;
                }
            };
            return storeInstance;
        } catch (error) {
            logger.warn({
                error
            }, 'Redis connection failed, falling back to in-memory');
        }
    }
    logger.info('Rate limit store using in-memory (non-distributed)');
    storeInstance = new InMemoryStore();
    return storeInstance;
}
function getEdgeRateLimitStore() {
    // Edge runtime uses in-memory for sync access
    // For async Edge operations, use getRateLimitStore()
    if (!storeInstance) {
        storeInstance = new InMemoryStore();
    }
    return storeInstance;
}
function resetRateLimitStore() {
    storeInstance = null;
}
}),
"[project]/src/lib/rate-limit-unified.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// UNIFIED RATE LIMITING
// =============================================================================
// Single implementation for both Edge and Node.js environments.
// Supports distributed rate limiting via Redis with in-memory fallback.
__turbopack_context__.s([
    "RATE_LIMIT_TIERS",
    ()=>RATE_LIMIT_TIERS,
    "addRateLimitHeaders",
    ()=>addRateLimitHeaders,
    "checkAllRateLimits",
    ()=>checkAllRateLimits,
    "checkAllRateLimitsEdge",
    ()=>checkAllRateLimitsEdge,
    "createRateLimitResponse",
    ()=>createRateLimitResponse,
    "extractApiKey",
    ()=>extractApiKey,
    "getClientIp",
    ()=>getClientIp,
    "getRateLimitHeaders",
    ()=>getRateLimitHeaders,
    "getRateLimitHeadersEdge",
    ()=>getRateLimitHeadersEdge,
    "getRateLimitMetrics",
    ()=>getRateLimitMetrics,
    "rateLimitByApiKey",
    ()=>rateLimitByApiKey,
    "rateLimitByApiKeyEdge",
    ()=>rateLimitByApiKeyEdge,
    "rateLimitByEndpoint",
    ()=>rateLimitByEndpoint,
    "rateLimitByEndpointEdge",
    ()=>rateLimitByEndpointEdge,
    "rateLimitByIp",
    ()=>rateLimitByIp,
    "rateLimitByIpEdge",
    ()=>rateLimitByIpEdge,
    "rateLimitCronJob",
    ()=>rateLimitCronJob,
    "resetRateLimitMetrics",
    ()=>resetRateLimitMetrics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rate-limit-store.ts [middleware-edge] (ecmascript)");
;
;
const RATE_LIMIT_TIERS = {
    // Per-IP global limits
    global: {
        name: 'global',
        windowMs: 60 * 60 * 1000,
        maxRequests: 1000
    },
    // Per-endpoint limits (per IP, per minute)
    endpoint: {
        name: 'endpoint',
        windowMs: 60 * 1000,
        maxRequests: 100
    },
    // API key tiers (per hour)
    free: {
        name: 'free',
        windowMs: 60 * 60 * 1000,
        maxRequests: 100
    },
    starter: {
        name: 'starter',
        windowMs: 60 * 60 * 1000,
        maxRequests: 1000
    },
    pro: {
        name: 'pro',
        windowMs: 60 * 60 * 1000,
        maxRequests: 5000
    },
    enterprise: {
        name: 'enterprise',
        windowMs: 60 * 60 * 1000,
        maxRequests: 50000
    },
    // Cron job rate limiting (per minute)
    cron: {
        name: 'cron',
        windowMs: 60 * 1000,
        maxRequests: 1
    }
};
const metrics = {
    requests: new Map(),
    blocked: new Map(),
    latencies: new Map(),
    lastReset: Date.now()
};
const MAX_LATENCY_SAMPLES = 100;
const METRICS_RESET_INTERVAL_MS = 60 * 60 * 1000; // 1 hour
/**
 * Record a rate limit check
 */ function recordMetric(type, allowed, latencyMs) {
    // Reset metrics hourly
    const now = Date.now();
    if (now - metrics.lastReset > METRICS_RESET_INTERVAL_MS) {
        metrics.requests.clear();
        metrics.blocked.clear();
        metrics.latencies.clear();
        metrics.lastReset = now;
    }
    // Record request
    const key = type;
    metrics.requests.set(key, (metrics.requests.get(key) || 0) + 1);
    // Record blocked
    if (!allowed) {
        metrics.blocked.set(key, (metrics.blocked.get(key) || 0) + 1);
    }
    // Record latency (keep last N samples)
    let latencies = metrics.latencies.get(key);
    if (!latencies) {
        latencies = [];
        metrics.latencies.set(key, latencies);
    }
    latencies.push(latencyMs);
    if (latencies.length > MAX_LATENCY_SAMPLES) {
        latencies.shift();
    }
}
/**
 * Calculate percentile from sorted array
 */ function percentile(sorted, p) {
    if (sorted.length === 0) return 0;
    const idx = Math.ceil(sorted.length * p) - 1;
    return sorted[Math.max(0, Math.min(idx, sorted.length - 1))];
}
function getRateLimitMetrics() {
    const byType = {};
    let totalRequests = 0;
    let totalBlocked = 0;
    const types = new Set([
        ...metrics.requests.keys(),
        ...metrics.blocked.keys()
    ]);
    for (const type of types){
        const requests = metrics.requests.get(type) || 0;
        const blocked = metrics.blocked.get(type) || 0;
        const latencies = metrics.latencies.get(type) || [];
        totalRequests += requests;
        totalBlocked += blocked;
        // Calculate latency percentiles
        const sorted = [
            ...latencies
        ].sort((a, b)=>a - b);
        byType[type] = {
            total: requests,
            blocked,
            blockRate: requests > 0 ? (blocked / requests * 100).toFixed(2) + '%' : '0%',
            latency: {
                p50: Math.round(percentile(sorted, 0.5)),
                p95: Math.round(percentile(sorted, 0.95)),
                p99: Math.round(percentile(sorted, 0.99))
            }
        };
    }
    return {
        byType,
        totals: {
            requests: totalRequests,
            blocked: totalBlocked,
            blockRate: totalRequests > 0 ? (totalBlocked / totalRequests * 100).toFixed(2) + '%' : '0%'
        },
        lastReset: new Date(metrics.lastReset).toISOString()
    };
}
function resetRateLimitMetrics() {
    metrics.requests.clear();
    metrics.blocked.clear();
    metrics.latencies.clear();
    metrics.lastReset = Date.now();
}
function extractApiKey(request) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return null;
    if (authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7).trim();
    }
    return authHeader.trim();
}
function getClientIp(request) {
    return request.ip || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}
/**
 * Hash a string for use as rate limit key (don't store full API keys)
 */ function hashKey(key) {
    // Use first 16 chars as identifier (safe for rate limiting)
    return key.substring(0, 16);
}
// =============================================================================
// CORE RATE LIMIT CHECK
// =============================================================================
/**
 * Check rate limit against a store
 */ async function checkRateLimitAsync(store, config, metricType) {
    const start = Date.now();
    const entry = await store.increment(config.identifier, config.windowMs);
    const allowed = entry.count <= config.maxRequests;
    const remaining = Math.max(0, config.maxRequests - entry.count);
    // Record metrics if type provided
    if (metricType) {
        recordMetric(metricType, allowed, Date.now() - start);
    }
    return {
        allowed,
        remaining,
        resetAt: entry.resetAt,
        limit: config.maxRequests
    };
}
/**
 * Synchronous check for Edge runtime
 */ function checkRateLimitSync(store, config) {
    const now = Date.now();
    const key = config.identifier;
    // Note: This is a simplified sync version that may not be perfectly accurate
    // but works for Edge runtime where we can't await
    const resetAt = now + config.windowMs;
    return {
        allowed: true,
        remaining: config.maxRequests,
        resetAt,
        limit: config.maxRequests
    };
}
async function rateLimitByApiKey(request, apiKeyRateLimit) {
    const token = extractApiKey(request);
    if (!token) return null;
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getRateLimitStore"])();
    const limit = apiKeyRateLimit || RATE_LIMIT_TIERS.starter.maxRequests;
    return checkRateLimitAsync(store, {
        windowMs: RATE_LIMIT_TIERS.starter.windowMs,
        maxRequests: limit,
        identifier: `api_key:${hashKey(token)}`
    }, 'api_key');
}
async function rateLimitByEndpoint(request, endpointId, maxRequests) {
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getRateLimitStore"])();
    const ip = getClientIp(request);
    return checkRateLimitAsync(store, {
        windowMs: RATE_LIMIT_TIERS.endpoint.windowMs,
        maxRequests: maxRequests || RATE_LIMIT_TIERS.endpoint.maxRequests,
        identifier: `endpoint:${endpointId}:${ip}`
    }, `endpoint:${endpointId}`);
}
async function rateLimitByIp(request, maxRequests) {
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getRateLimitStore"])();
    const ip = getClientIp(request);
    return checkRateLimitAsync(store, {
        windowMs: RATE_LIMIT_TIERS.global.windowMs,
        maxRequests: maxRequests || RATE_LIMIT_TIERS.global.maxRequests,
        identifier: `global:${ip}`
    }, 'global');
}
async function rateLimitCronJob(cronId, intervalMs) {
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getRateLimitStore"])();
    return checkRateLimitAsync(store, {
        windowMs: intervalMs || RATE_LIMIT_TIERS.cron.windowMs,
        maxRequests: RATE_LIMIT_TIERS.cron.maxRequests,
        identifier: `cron:${cronId}`
    }, `cron:${cronId}`);
}
function rateLimitByIpEdge(request, maxRequests) {
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getEdgeRateLimitStore"])();
    const ip = getClientIp(request);
    return checkRateLimitSync(store, {
        windowMs: RATE_LIMIT_TIERS.global.windowMs,
        maxRequests: maxRequests || RATE_LIMIT_TIERS.global.maxRequests,
        identifier: `global:${ip}`
    });
}
function rateLimitByApiKeyEdge(request, defaultLimit) {
    const token = extractApiKey(request);
    if (!token) return null;
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getEdgeRateLimitStore"])();
    return checkRateLimitSync(store, {
        windowMs: RATE_LIMIT_TIERS.starter.windowMs,
        maxRequests: defaultLimit || RATE_LIMIT_TIERS.starter.maxRequests,
        identifier: `api_key:${hashKey(token)}`
    });
}
function addRateLimitHeaders(response, result) {
    response.headers.set('X-RateLimit-Limit', result.limit.toString());
    response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
    response.headers.set('X-RateLimit-Reset', new Date(result.resetAt).toISOString());
    return response;
}
function createRateLimitResponse(result) {
    const resetDate = new Date(result.resetAt).toISOString();
    const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000);
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Rate limit exceeded',
        code: 'RATE_LIMIT_EXCEEDED',
        message: `Too many requests. Limit: ${result.limit} per hour. Try again after ${resetDate}`,
        retryAfter
    }, {
        status: 429
    });
    response.headers.set('Retry-After', retryAfter.toString());
    return addRateLimitHeaders(response, result);
}
async function checkAllRateLimits(request, options) {
    // 1. Global IP limit
    const globalResult = await rateLimitByIp(request);
    if (!globalResult.allowed) {
        return {
            result: globalResult,
            type: 'global'
        };
    }
    // 2. API key limit (if authenticated)
    const apiKeyResult = await rateLimitByApiKey(request, options?.apiKeyRateLimit);
    if (apiKeyResult && !apiKeyResult.allowed) {
        return {
            result: apiKeyResult,
            type: 'api_key'
        };
    }
    // 3. Endpoint limit (if specified)
    if (options?.endpointId) {
        const endpointResult = await rateLimitByEndpoint(request, options.endpointId);
        if (!endpointResult.allowed) {
            return {
                result: endpointResult,
                type: 'endpoint'
            };
        }
    }
    return null;
}
async function getRateLimitHeaders(request, endpointId) {
    const results = [];
    // Global IP limit
    const globalResult = await rateLimitByIp(request);
    results.push(globalResult);
    // API key limit
    const apiKeyResult = await rateLimitByApiKey(request);
    if (apiKeyResult) {
        results.push(apiKeyResult);
    }
    // Endpoint limit
    if (endpointId) {
        const endpointResult = await rateLimitByEndpoint(request, endpointId);
        results.push(endpointResult);
    }
    // Return the most restrictive (lowest remaining)
    if (results.length === 0) {
        return null;
    }
    return results.reduce((min, current)=>current.remaining < min.remaining ? current : min);
}
function rateLimitByEndpointEdge(request, endpointId, maxRequests) {
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getEdgeRateLimitStore"])();
    const ip = getClientIp(request);
    return checkRateLimitSync(store, {
        windowMs: RATE_LIMIT_TIERS.endpoint.windowMs,
        maxRequests: maxRequests || RATE_LIMIT_TIERS.endpoint.maxRequests,
        identifier: `endpoint:${endpointId}:${ip}`
    });
}
function checkAllRateLimitsEdge(request, endpointId) {
    // 1. Global IP limit
    const globalResult = rateLimitByIpEdge(request);
    if (!globalResult.allowed) {
        return {
            result: globalResult,
            type: 'global'
        };
    }
    // 2. API key limit (Edge uses default limit)
    const apiKeyResult = rateLimitByApiKeyEdge(request);
    if (apiKeyResult && !apiKeyResult.allowed) {
        return {
            result: apiKeyResult,
            type: 'api_key'
        };
    }
    // 3. Endpoint limit (if specified)
    if (endpointId) {
        const endpointResult = rateLimitByEndpointEdge(request, endpointId);
        if (!endpointResult.allowed) {
            return {
                result: endpointResult,
                type: 'endpoint'
            };
        }
    }
    return null;
}
function getRateLimitHeadersEdge(request, endpointId) {
    const results = [];
    // Global IP limit
    results.push(rateLimitByIpEdge(request));
    // API key limit
    const apiKeyResult = rateLimitByApiKeyEdge(request);
    if (apiKeyResult) {
        results.push(apiKeyResult);
    }
    // Endpoint limit
    if (endpointId) {
        results.push(rateLimitByEndpointEdge(request, endpointId));
    }
    // Return the most restrictive (lowest remaining)
    if (results.length === 0) {
        return null;
    }
    return results.reduce((min, current)=>current.remaining < min.remaining ? current : min);
}
}),
"[project]/src/lib/security-monitor.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// SECURITY MONITORING & THREAT DETECTION
// =============================================================================
// Real-time security monitoring and threat detection for all requests
// Implements agent-based security scanning for all in/out traffic
//
// Configuration (environment variables):
// - SECURITY_SHADOW_MODE: 'true' (default) = log-only, 'false' = enforce
// - SECURITY_ENFORCE_SQL_INJECTION: 'true' = block SQL injection attempts
// - SECURITY_ENFORCE_XSS: 'true' = block XSS attempts
// - SECURITY_ENFORCE_PATH_TRAVERSAL: 'true' = block path traversal
// - SECURITY_ENFORCE_COMMAND_INJECTION: 'true' = block command injection
// - SECURITY_ENFORCE_AUTH_BYPASS: 'true' = block auth bypass attempts
// - SECURITY_VIOLATION_THRESHOLD: Number of violations before auto-block (default: 10)
// - SECURITY_VIOLATION_WINDOW_MS: Time window for violations (default: 300000 = 5min)
// - SECURITY_MAX_BLOCKS_PER_HOUR: Safety cap (default: 100)
// - SECURITY_MAX_BLOCKS_PER_DAY: Safety cap (default: 1000)
__turbopack_context__.s([
    "getBlockedIps",
    ()=>getBlockedIps,
    "getSecurityConfig",
    ()=>getSecurityConfig,
    "getSecurityMetrics",
    ()=>getSecurityMetrics,
    "getThreatHistory",
    ()=>getThreatHistory,
    "getViolationRateLimitedIps",
    ()=>getViolationRateLimitedIps,
    "isCategoryEnforced",
    ()=>isCategoryEnforced,
    "resetSecurityMetrics",
    ()=>resetSecurityMetrics,
    "scanRequest",
    ()=>scanRequest,
    "shouldBlockIp",
    ()=>shouldBlockIp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [middleware-edge] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'SecurityMonitor'
});
// =============================================================================
// CONFIGURATION
// =============================================================================
// Global shadow mode (master switch)
const SHADOW_MODE_ENABLED = process.env.SECURITY_SHADOW_MODE !== 'false'; // Default to true for safety
// Per-category enforcement flags (granular control)
const ENFORCEMENT_FLAGS = {
    sql_injection: process.env.SECURITY_ENFORCE_SQL_INJECTION === 'true',
    xss: process.env.SECURITY_ENFORCE_XSS === 'true',
    path_traversal: process.env.SECURITY_ENFORCE_PATH_TRAVERSAL === 'true',
    command_injection: process.env.SECURITY_ENFORCE_COMMAND_INJECTION === 'true',
    auth_bypass: process.env.SECURITY_ENFORCE_AUTH_BYPASS === 'true',
    suspicious_user_agent: process.env.SECURITY_ENFORCE_SUSPICIOUS_UA === 'true',
    suspicious_path: process.env.SECURITY_ENFORCE_SUSPICIOUS_PATH === 'true',
    missing_auth: false
};
// Violation-based rate limiting
const VIOLATION_THRESHOLD = parseInt(process.env.SECURITY_VIOLATION_THRESHOLD || '10', 10);
const VIOLATION_WINDOW_MS = parseInt(process.env.SECURITY_VIOLATION_WINDOW_MS || '300000', 10); // 5 minutes
// Safety caps to prevent mass blocking
const MAX_BLOCKS_PER_HOUR = parseInt(process.env.SECURITY_MAX_BLOCKS_PER_HOUR || '100', 10);
const MAX_BLOCKS_PER_DAY = parseInt(process.env.SECURITY_MAX_BLOCKS_PER_DAY || '1000', 10);
// =============================================================================
// IN-MEMORY STORES
// =============================================================================
// Threat store (upgrade to Redis in production)
const threatStore = new Map();
// Violation rate limiting store
const violationStore = new Map();
// Track blocks per time window
const blocksThisHour = new Map();
const blocksThisDay = new Map();
// Shadow mode metrics
const shadowModeMetrics = {
    startTime: Date.now(),
    totalScanned: 0,
    wouldHaveBlocked: 0,
    blockedByCategory: new Map(),
    actuallyBlocked: 0,
    actuallyAllowed: 0,
    threatsByCategory: new Map()
};
// =============================================================================
// CLEANUP INTERVALS
// =============================================================================
// Cleanup block counters every hour
setInterval(()=>{
    blocksThisHour.clear();
}, 60 * 60 * 1000);
// Cleanup daily block counters every day
setInterval(()=>{
    blocksThisDay.clear();
}, 24 * 60 * 60 * 1000);
// Cleanup old threats every 10 minutes
setInterval(()=>{
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    const keysToDelete = [];
    threatStore.forEach((value, key)=>{
        if (now - value.lastSeen > maxAge) {
            keysToDelete.push(key);
        }
    });
    keysToDelete.forEach((key)=>threatStore.delete(key));
}, 10 * 60 * 1000);
// Cleanup violation store every 10 minutes
setInterval(()=>{
    const now = Date.now();
    const keysToDelete = [];
    violationStore.forEach((value, key)=>{
        if (now - value.windowStart > VIOLATION_WINDOW_MS * 2) {
            keysToDelete.push(key);
        }
    });
    keysToDelete.forEach((key)=>violationStore.delete(key));
}, 10 * 60 * 1000);
/**
 * SQL Injection Detection Patterns
 */ const SQL_INJECTION_PATTERNS = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|SCRIPT)\b)/i,
    /('|\\'|;|--|\/\*|\*\/|\+|%)/i,
    /(\bOR\b.*=.*)/i,
    /(\bAND\b.*=.*)/i,
    /(\bUNION\b.*SELECT)/i
];
/**
 * XSS Detection Patterns
 */ const XSS_PATTERNS = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe[^>]*>/gi,
    /<img[^>]*src[^>]*javascript:/i,
    /<svg[^>]*onload/i
];
/**
 * Path Traversal Patterns
 */ const PATH_TRAVERSAL_PATTERNS = [
    /\.\.\//g,
    /\.\.\\/g,
    /\.\.%2F/i,
    /\.\.%5C/i,
    /%2e%2e%2f/i,
    /%2e%2e%5c/i
];
/**
 * Command Injection Patterns
 */ const COMMAND_INJECTION_PATTERNS = [
    /[;&|`$(){}[\]]/,
    /\b(cat|ls|pwd|whoami|id|uname|ps|kill|rm|mv|cp)\b/i,
    /\|\s*(nc|netcat|wget|curl|bash|sh)/i
];
/**
 * Suspicious User Agent Patterns
 */ const SUSPICIOUS_USER_AGENTS = [
    /sqlmap/i,
    /nikto/i,
    /nmap/i,
    /masscan/i,
    /zap/i,
    /burp/i,
    /scanner/i,
    /bot.*crawler/i
];
/**
 * Rate Limit Violation Thresholds
 */ const RATE_LIMIT_THRESHOLDS = {
    critical: 100,
    high: 50,
    medium: 20
};
function scanRequest(request, requestId) {
    const path = request.nextUrl.pathname;
    // Whitelist internal/system endpoints that should not be scanned
    // These are trusted internal endpoints (Vercel cron, health checks, x402 endpoints)
    // x402 endpoints are whitelisted because payment headers contain base64/JSON
    // that triggers false positives for command injection patterns
    const whitelistedPaths = [
        // Vercel cron job endpoints (all internal)
        '/api/cron/',
        // x402 router and verification endpoints
        '/api/x402/router/',
        '/api/x402/verify',
        '/api/x402/health',
        // Health checks
        '/api/health',
        // Metered and demo x402 endpoints
        '/api/v1/metered/',
        '/api/v1/x402/',
        '/api/test/hello-world',
        // Debug endpoints (internal)
        '/api/debug/'
    ];
    // Check if path matches any whitelisted path (exact match or prefix match)
    const isWhitelisted = whitelistedPaths.some((whitelisted)=>path === whitelisted || path.startsWith(whitelisted) || // Handles /api/v1/metered/url-enrich matching /api/v1/metered/
        (whitelisted.endsWith('/') ? path.startsWith(whitelisted) : path.startsWith(whitelisted + '/')));
    if (isWhitelisted) {
        // Skip all security scanning for whitelisted paths
        return {
            safe: true,
            threats: [],
            riskScore: 0,
            recommendations: []
        };
    }
    const threats = [];
    const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const method = request.method;
    const userAgent = request.headers.get('user-agent') || undefined;
    const url = request.nextUrl.toString();
    const queryParams = Object.fromEntries(request.nextUrl.searchParams);
    // Extract correlation fields for full traceability
    const conversationId = request.headers.get('x-conversation-id') || request.headers.get('x-request-id') || undefined;
    const agentId = request.headers.get('x-agent-id') || undefined;
    const x402TxHash = request.headers.get('x-x402-tx-hash') || undefined;
    // Get request body if available (for POST/PUT/PATCH)
    let bodyText = '';
    try {
    // Note: Body can only be read once, so this is a best-effort scan
    // In production, consider cloning the request for scanning
    } catch  {
    // Body not available for scanning
    }
    // 1. SQL Injection Detection
    const sqlInjectionThreats = detectSQLInjection(url, queryParams, bodyText);
    // Add correlation fields to all threats
    sqlInjectionThreats.forEach((threat)=>{
        threat.requestId = requestId;
        threat.ip = ip;
        threat.path = path;
        threat.method = method;
        threat.userAgent = userAgent;
        threat.conversationId = conversationId;
        threat.agentId = agentId;
        threat.x402TxHash = x402TxHash;
    });
    threats.push(...sqlInjectionThreats);
    // 2. XSS Detection
    const xssThreats = detectXSS(url, queryParams, bodyText);
    xssThreats.forEach((threat)=>{
        threat.requestId = requestId;
        threat.ip = ip;
        threat.path = path;
        threat.method = method;
        threat.userAgent = userAgent;
        threat.conversationId = conversationId;
        threat.agentId = agentId;
        threat.x402TxHash = x402TxHash;
    });
    threats.push(...xssThreats);
    // 3. Path Traversal Detection
    const pathTraversalThreats = detectPathTraversal(path, queryParams);
    pathTraversalThreats.forEach((threat)=>{
        threat.requestId = requestId;
        threat.ip = ip;
        threat.path = path;
        threat.method = method;
        threat.userAgent = userAgent;
        threat.conversationId = conversationId;
        threat.agentId = agentId;
        threat.x402TxHash = x402TxHash;
    });
    threats.push(...pathTraversalThreats);
    // 4. Command Injection Detection
    const commandInjectionThreats = detectCommandInjection(url, queryParams, bodyText);
    commandInjectionThreats.forEach((threat)=>{
        threat.requestId = requestId;
        threat.ip = ip;
        threat.path = path;
        threat.method = method;
        threat.userAgent = userAgent;
        threat.conversationId = conversationId;
        threat.agentId = agentId;
        threat.x402TxHash = x402TxHash;
    });
    threats.push(...commandInjectionThreats);
    // 5. Suspicious User Agent Detection
    if (userAgent && isSuspiciousUserAgent(userAgent)) {
        threats.push({
            type: 'suspicious',
            severity: 'medium',
            category: 'suspicious_user_agent',
            description: `Suspicious user agent detected: ${userAgent.substring(0, 100)}`,
            requestId,
            ip,
            path,
            method,
            userAgent,
            conversationId,
            agentId,
            x402TxHash,
            timestamp: new Date().toISOString()
        });
    }
    // 6. Unusual Request Pattern Detection
    const anomalyThreats = detectAnomalies(request, requestId);
    anomalyThreats.forEach((threat)=>{
        threat.conversationId = conversationId;
        threat.agentId = agentId;
        threat.x402TxHash = x402TxHash;
    });
    threats.push(...anomalyThreats);
    // 7. Authentication Bypass Attempts
    const authBypassThreats = detectAuthBypass(request, requestId);
    authBypassThreats.forEach((threat)=>{
        threat.conversationId = conversationId;
        threat.agentId = agentId;
        threat.x402TxHash = x402TxHash;
    });
    threats.push(...authBypassThreats);
    // Calculate risk score
    const riskScore = calculateRiskScore(threats);
    // Generate recommendations
    const recommendations = generateRecommendations(threats, riskScore);
    // Update metrics
    shadowModeMetrics.totalScanned++;
    // Track threats by category
    for (const threat of threats){
        const currentCount = shadowModeMetrics.threatsByCategory.get(threat.category) || 0;
        shadowModeMetrics.threatsByCategory.set(threat.category, currentCount + 1);
    }
    // Determine if we would block this request
    const wouldBlock = shouldBlockRequest(threats, ip);
    // Track shadow mode "would have blocked" metrics
    if (wouldBlock && SHADOW_MODE_ENABLED) {
        shadowModeMetrics.wouldHaveBlocked++;
        for (const threat of threats){
            const currentCount = shadowModeMetrics.blockedByCategory.get(threat.category) || 0;
            shadowModeMetrics.blockedByCategory.set(threat.category, currentCount + 1);
            threat.wouldHaveBlocked = true;
        }
    }
    // Log threats
    if (threats.length > 0) {
        logger.warn({
            requestId,
            ip,
            path,
            method,
            threatCount: threats.length,
            riskScore,
            wouldBlock,
            shadowMode: SHADOW_MODE_ENABLED,
            threats: threats.map((t)=>({
                    type: t.type,
                    severity: t.severity,
                    category: t.category,
                    wouldHaveBlocked: t.wouldHaveBlocked
                }))
        }, SHADOW_MODE_ENABLED && wouldBlock ? 'Security threats detected (SHADOW MODE - would have blocked)' : 'Security threats detected');
    }
    // Store threats for IP tracking
    if (threats.length > 0) {
        storeThreat(ip, threats);
        // Track violations for rate limiting
        trackViolation(ip, threats.length);
    }
    // Track enforcement stats
    if (!SHADOW_MODE_ENABLED && wouldBlock) {
        shadowModeMetrics.actuallyBlocked++;
    } else {
        shadowModeMetrics.actuallyAllowed++;
    }
    return {
        safe: threats.length === 0,
        threats,
        riskScore,
        recommendations,
        shadowMode: SHADOW_MODE_ENABLED,
        wouldBlock
    };
}
/**
 * Detect SQL injection attempts
 */ function detectSQLInjection(url, queryParams, body) {
    const threats = [];
    const textToScan = `${url} ${JSON.stringify(queryParams)} ${body}`;
    for (const pattern of SQL_INJECTION_PATTERNS){
        if (pattern.test(textToScan)) {
            threats.push({
                type: 'threat',
                severity: 'critical',
                category: 'sql_injection',
                description: 'Potential SQL injection attempt detected',
                requestId: '',
                ip: '',
                path: '',
                method: '',
                details: {
                    pattern: pattern.toString(),
                    matched: textToScan.substring(0, 200)
                },
                timestamp: new Date().toISOString()
            });
        }
    }
    return threats;
}
/**
 * Detect XSS attempts
 */ function detectXSS(url, queryParams, body) {
    const threats = [];
    const textToScan = `${url} ${JSON.stringify(queryParams)} ${body}`;
    for (const pattern of XSS_PATTERNS){
        if (pattern.test(textToScan)) {
            threats.push({
                type: 'threat',
                severity: 'high',
                category: 'xss',
                description: 'Potential XSS attempt detected',
                requestId: '',
                ip: '',
                path: '',
                method: '',
                details: {
                    pattern: pattern.toString()
                },
                timestamp: new Date().toISOString()
            });
        }
    }
    return threats;
}
/**
 * Detect path traversal attempts
 */ function detectPathTraversal(path, queryParams) {
    const threats = [];
    const textToScan = `${path} ${JSON.stringify(queryParams)}`;
    for (const pattern of PATH_TRAVERSAL_PATTERNS){
        if (pattern.test(textToScan)) {
            threats.push({
                type: 'threat',
                severity: 'high',
                category: 'path_traversal',
                description: 'Potential path traversal attempt detected',
                requestId: '',
                ip: '',
                path: '',
                method: '',
                details: {
                    pattern: pattern.toString()
                },
                timestamp: new Date().toISOString()
            });
        }
    }
    return threats;
}
/**
 * Detect command injection attempts
 */ function detectCommandInjection(url, queryParams, body) {
    const threats = [];
    const textToScan = `${url} ${JSON.stringify(queryParams)} ${body}`;
    for (const pattern of COMMAND_INJECTION_PATTERNS){
        if (pattern.test(textToScan)) {
            threats.push({
                type: 'threat',
                severity: 'critical',
                category: 'command_injection',
                description: 'Potential command injection attempt detected',
                requestId: '',
                ip: '',
                path: '',
                method: '',
                details: {
                    pattern: pattern.toString()
                },
                timestamp: new Date().toISOString()
            });
        }
    }
    return threats;
}
/**
 * Check if user agent is suspicious
 */ function isSuspiciousUserAgent(userAgent) {
    return SUSPICIOUS_USER_AGENTS.some((pattern)=>pattern.test(userAgent));
}
/**
 * Detect anomalies in request patterns
 */ function detectAnomalies(request, requestId) {
    const threats = [];
    const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const path = request.nextUrl.pathname;
    // Check for unusual path patterns
    if (path.includes('admin') || path.includes('config') || path.includes('.env')) {
        threats.push({
            type: 'suspicious',
            severity: 'medium',
            category: 'suspicious_path',
            description: `Suspicious path accessed: ${path}`,
            requestId,
            ip,
            path,
            method: request.method,
            timestamp: new Date().toISOString()
        });
    }
    // Check for missing required headers on sensitive endpoints
    if (path.startsWith('/api/v1/') && !request.headers.get('authorization')) {
        threats.push({
            type: 'violation',
            severity: 'medium',
            category: 'missing_auth',
            description: 'Unauthenticated request to protected endpoint',
            requestId,
            ip,
            path,
            method: request.method,
            timestamp: new Date().toISOString()
        });
    }
    return threats;
}
/**
 * Detect authentication bypass attempts
 */ function detectAuthBypass(request, requestId) {
    const threats = [];
    const authHeader = request.headers.get('authorization');
    // Check for common bypass attempts
    if (authHeader) {
        // Empty token
        if (authHeader.trim() === 'Bearer' || authHeader.trim() === '') {
            threats.push({
                type: 'threat',
                severity: 'high',
                category: 'auth_bypass',
                description: 'Empty authorization token detected',
                requestId,
                ip: request.ip || 'unknown',
                path: request.nextUrl.pathname,
                method: request.method,
                timestamp: new Date().toISOString()
            });
        }
        // Suspicious token patterns
        if (authHeader.includes('null') || authHeader.includes('undefined') || authHeader.includes('true')) {
            threats.push({
                type: 'threat',
                severity: 'medium',
                category: 'auth_bypass',
                description: 'Suspicious authorization token pattern',
                requestId,
                ip: request.ip || 'unknown',
                path: request.nextUrl.pathname,
                method: request.method,
                timestamp: new Date().toISOString()
            });
        }
    }
    return threats;
}
/**
 * Calculate risk score (0-100)
 */ function calculateRiskScore(threats) {
    if (threats.length === 0) return 0;
    const severityWeights = {
        critical: 25,
        high: 15,
        medium: 8,
        low: 3
    };
    let score = 0;
    for (const threat of threats){
        score += severityWeights[threat.severity];
    }
    // Cap at 100
    return Math.min(100, score);
}
/**
 * Generate security recommendations
 */ function generateRecommendations(threats, riskScore) {
    const recommendations = [];
    if (riskScore >= 50) {
        recommendations.push('Consider blocking this IP address');
        recommendations.push('Review security logs immediately');
    }
    if (threats.some((t)=>t.category === 'sql_injection')) {
        recommendations.push('SQL injection attempt detected - ensure parameterized queries are used');
    }
    if (threats.some((t)=>t.category === 'xss')) {
        recommendations.push('XSS attempt detected - ensure input sanitization is enabled');
    }
    if (threats.some((t)=>t.category === 'command_injection')) {
        recommendations.push('Command injection attempt detected - review system commands');
    }
    if (threats.some((t)=>t.category === 'auth_bypass')) {
        recommendations.push('Authentication bypass attempt - review auth middleware');
    }
    return recommendations;
}
/**
 * Store threat for IP tracking
 */ function storeThreat(ip, threats) {
    const existing = threatStore.get(ip);
    const now = Date.now();
    if (existing) {
        existing.count += threats.length;
        existing.lastSeen = now;
        existing.events.push(...threats);
        // Keep last 100 events per IP
        if (existing.events.length > 100) {
            existing.events = existing.events.slice(-100);
        }
    } else {
        threatStore.set(ip, {
            count: threats.length,
            firstSeen: now,
            lastSeen: now,
            events: [
                ...threats
            ]
        });
    }
}
/**
 * Determine if a request should be blocked based on threats and enforcement settings
 */ function shouldBlockRequest(threats, ip) {
    if (threats.length === 0) return false;
    // Check if IP is rate limited due to violations
    if (isIpViolationRateLimited(ip)) {
        return true;
    }
    // Check global shadow mode
    if (SHADOW_MODE_ENABLED) {
        // In shadow mode, check if ANY category would have blocked
        // This is for metrics - we won't actually block
        for (const threat of threats){
            const categoryKey = threat.category;
            if (ENFORCEMENT_FLAGS[categoryKey]) {
                return true; // Would have blocked
            }
        }
        // Also check severity-based blocking
        if (threats.some((t)=>t.severity === 'critical')) {
            return true;
        }
        return false;
    }
    // Enforcement mode - check per-category flags
    for (const threat of threats){
        const categoryKey = threat.category;
        if (ENFORCEMENT_FLAGS[categoryKey]) {
            return true;
        }
    }
    // Block on critical severity
    if (threats.some((t)=>t.severity === 'critical')) {
        return true;
    }
    return false;
}
/**
 * Track a violation for rate limiting purposes
 */ function trackViolation(ip, count) {
    const now = Date.now();
    const existing = violationStore.get(ip);
    if (existing) {
        // Check if we're still in the same window
        if (now - existing.windowStart < VIOLATION_WINDOW_MS) {
            existing.violations += count;
            // Check if threshold exceeded
            if (existing.violations >= VIOLATION_THRESHOLD && !existing.blocked) {
                existing.blocked = true;
                logger.warn({
                    ip,
                    violations: existing.violations,
                    threshold: VIOLATION_THRESHOLD,
                    windowMs: VIOLATION_WINDOW_MS
                }, 'IP rate limited due to security violations');
            }
        } else {
            // Start new window
            violationStore.set(ip, {
                violations: count,
                windowStart: now,
                blocked: false
            });
        }
    } else {
        violationStore.set(ip, {
            violations: count,
            windowStart: now,
            blocked: false
        });
    }
}
/**
 * Check if an IP is rate limited due to violations
 */ function isIpViolationRateLimited(ip) {
    const record = violationStore.get(ip);
    if (!record) return false;
    const now = Date.now();
    // Check if still in the rate limit window
    if (now - record.windowStart > VIOLATION_WINDOW_MS) {
        // Window expired, reset
        record.blocked = false;
        record.violations = 0;
        record.windowStart = now;
        return false;
    }
    return record.blocked;
}
function isCategoryEnforced(category) {
    if (SHADOW_MODE_ENABLED) return false;
    const categoryKey = category;
    return ENFORCEMENT_FLAGS[categoryKey] ?? false;
}
function getSecurityConfig() {
    return {
        shadowMode: SHADOW_MODE_ENABLED,
        enforcementFlags: {
            ...ENFORCEMENT_FLAGS
        },
        violationThreshold: VIOLATION_THRESHOLD,
        violationWindowMs: VIOLATION_WINDOW_MS,
        maxBlocksPerHour: MAX_BLOCKS_PER_HOUR,
        maxBlocksPerDay: MAX_BLOCKS_PER_DAY
    };
}
function getThreatHistory(ip) {
    return threatStore.get(ip) || null;
}
function shouldBlockIp(ip) {
    // Check violation-based rate limiting first (works even in shadow mode if violation threshold exceeded)
    if (isIpViolationRateLimited(ip)) {
        // Still respect shadow mode for actual blocking
        if (SHADOW_MODE_ENABLED) {
            logger.info({
                ip
            }, 'IP would be blocked (violation rate limit) - SHADOW MODE');
            return false;
        }
        return true;
    }
    // Shadow mode: log-only, don't block
    if (SHADOW_MODE_ENABLED) {
        return false; // Log-only mode
    }
    // Safety caps: prevent mass blocking
    const hourCount = blocksThisHour.get(ip) || 0;
    const dayCount = blocksThisDay.get(ip) || 0;
    if (hourCount >= MAX_BLOCKS_PER_HOUR) {
        logger.warn({
            ip,
            hourCount
        }, 'Block cap reached for hour');
        return false; // Cap reached, don't block more
    }
    if (dayCount >= MAX_BLOCKS_PER_DAY) {
        logger.warn({
            ip,
            dayCount
        }, 'Block cap reached for day');
        return false; // Cap reached, don't block more
    }
    const history = threatStore.get(ip);
    if (!history) return false;
    // Block if:
    // - More than 10 threats in last hour
    // - Any critical severity threat with enforcement enabled
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const recentThreats = history.events.filter((e)=>new Date(e.timestamp).getTime() > oneHourAgo);
    if (recentThreats.length > 10) {
        blocksThisHour.set(ip, hourCount + 1);
        blocksThisDay.set(ip, dayCount + 1);
        return true;
    }
    // Check for critical threats with enforcement
    const criticalEnforcedThreats = recentThreats.filter((e)=>{
        if (e.severity !== 'critical') return false;
        const categoryKey = e.category;
        return ENFORCEMENT_FLAGS[categoryKey] ?? false;
    });
    if (criticalEnforcedThreats.length > 0) {
        blocksThisHour.set(ip, hourCount + 1);
        blocksThisDay.set(ip, dayCount + 1);
        return true;
    }
    return false;
}
function getBlockedIps() {
    const blocked = [];
    threatStore.forEach((_, ip)=>{
        if (shouldBlockIp(ip)) {
            blocked.push(ip);
        }
    });
    return blocked;
}
function getViolationRateLimitedIps() {
    const rateLimited = [];
    const now = Date.now();
    violationStore.forEach((record, ip)=>{
        if (record.blocked && now - record.windowStart < VIOLATION_WINDOW_MS) {
            rateLimited.push({
                ip,
                violations: record.violations,
                windowStart: record.windowStart
            });
        }
    });
    return rateLimited;
}
function getSecurityMetrics() {
    // Convert Map to object for threatsByCategory
    const threatsByCategory = {};
    shadowModeMetrics.threatsByCategory.forEach((count, category)=>{
        threatsByCategory[category] = count;
    });
    // Convert Map to object for blockedByCategory
    const blockedCategories = {};
    shadowModeMetrics.blockedByCategory.forEach((count, category)=>{
        blockedCategories[category] = count;
    });
    // Build per-category enforcement stats
    const byCategory = {};
    Object.keys(ENFORCEMENT_FLAGS).forEach((category)=>{
        const totalForCategory = threatsByCategory[category] || 0;
        const blockedForCategory = blockedCategories[category] || 0;
        byCategory[category] = {
            blocked: blockedForCategory,
            allowed: totalForCategory - blockedForCategory
        };
    });
    // Count rate-limited IPs
    let ipsRateLimited = 0;
    let violationsInWindow = 0;
    const now = Date.now();
    violationStore.forEach((record)=>{
        if (record.blocked && now - record.windowStart < VIOLATION_WINDOW_MS) {
            ipsRateLimited++;
        }
        if (now - record.windowStart < VIOLATION_WINDOW_MS) {
            violationsInWindow += record.violations;
        }
    });
    return {
        threatsByCategory,
        shadowModeStats: {
            enabled: SHADOW_MODE_ENABLED,
            wouldHaveBlocked: shadowModeMetrics.wouldHaveBlocked,
            totalScanned: shadowModeMetrics.totalScanned,
            blockedCategories
        },
        enforcementStats: {
            blocked: shadowModeMetrics.actuallyBlocked,
            allowed: shadowModeMetrics.actuallyAllowed,
            byCategory
        },
        violationRateLimiting: {
            ipsRateLimited,
            violationsInWindow
        },
        since: new Date(shadowModeMetrics.startTime).toISOString()
    };
}
function resetSecurityMetrics() {
    shadowModeMetrics.startTime = Date.now();
    shadowModeMetrics.totalScanned = 0;
    shadowModeMetrics.wouldHaveBlocked = 0;
    shadowModeMetrics.blockedByCategory.clear();
    shadowModeMetrics.actuallyBlocked = 0;
    shadowModeMetrics.actuallyAllowed = 0;
    shadowModeMetrics.threatsByCategory.clear();
    violationStore.clear();
    threatStore.clear();
    blocksThisHour.clear();
    blocksThisDay.clear();
    logger.info('Security metrics reset');
}
}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$id$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/request-id.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$unified$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rate-limit-unified.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2d$monitor$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/security-monitor.ts [middleware-edge] (ecmascript)");
;
;
;
;
;
async function middleware(request) {
    // Allow .well-known paths to pass through without processing (for verification files)
    // These are served from public folder and should not be processed
    if (request.nextUrl.pathname.startsWith('/.well-known')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // API SUBDOMAINS: Make landing pages "invisible" - show minimal API info instead
    const hostname = request.headers.get('host') || '';
    if (request.nextUrl.pathname === '/') {
        // discovery.nexflowapp.app → minimal discovery API page
        if (hostname.startsWith('discovery.')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].rewrite(new URL('/discovery-api', request.url));
        }
        // api.nexflowapp.app → minimal main API page
        if (hostname.startsWith('api.')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].rewrite(new URL('/api-landing', request.url));
        }
    }
    // Only process API routes for the rest of the middleware
    if (!request.nextUrl.pathname.startsWith('/api')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Generate or extract request ID
    const requestId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$id$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getOrCreateRequestId"])(request);
    const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$id$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createRequestLogger"])(requestId, {
        method: request.method,
        path: request.nextUrl.pathname,
        ip
    });
    // SECURITY: Check if IP is blocked
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2d$monitor$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["shouldBlockIp"])(ip)) {
        logger.warn('Blocked request', {
            ip,
            reason: 'IP blocked due to security threats'
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Access denied',
            code: 'IP_BLOCKED',
            message: 'Your IP address has been blocked due to security violations'
        }, {
            status: 403
        });
    }
    // SECURITY: Scan request for threats
    // Note: Agents are advisors only - all enforcement is deterministic
    const securityScan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2d$monitor$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["scanRequest"])(request, requestId);
    if (!securityScan.safe) {
        logger.warn('Security threats detected', {
            threatCount: securityScan.threats.length,
            riskScore: securityScan.riskScore,
            threats: securityScan.threats.map((t)=>({
                    type: t.type,
                    severity: t.severity,
                    category: t.category,
                    conversationId: t.conversationId,
                    agentId: t.agentId,
                    x402TxHash: t.x402TxHash
                }))
        });
        // Block if critical threats detected (only if shadow mode is disabled)
        // Shadow mode: new rules start in log-only mode for review
        if (securityScan.threats.some((t)=>t.severity === 'critical')) {
            // In shadow mode, we log but don't block
            // Set SECURITY_SHADOW_MODE=false to enable blocking
            const shadowMode = process.env.SECURITY_SHADOW_MODE !== 'false';
            if (!shadowMode) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Security violation detected',
                    code: 'SECURITY_VIOLATION',
                    message: 'Request blocked due to security threats'
                }, {
                    status: 403
                });
            }
        }
    }
    // Log request
    logger.info('Incoming request');
    // Extract endpoint ID from path if it's a metered endpoint
    const pathMatch = request.nextUrl.pathname.match(/\/api\/v1\/metered\/([^/]+)/);
    const endpointId = pathMatch ? pathMatch[1] : undefined;
    // Check rate limits (Edge-compatible, no database access)
    const rateLimitCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$unified$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["checkAllRateLimitsEdge"])(request, endpointId);
    if (rateLimitCheck && !rateLimitCheck.result.allowed) {
        logger.warn('Rate limit exceeded', {
            rateLimitType: rateLimitCheck.type,
            limit: rateLimitCheck.result.limit,
            remaining: rateLimitCheck.result.remaining
        });
        const response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$unified$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createRateLimitResponse"])(rateLimitCheck.result);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$id$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addRequestIdToResponse"])(response, requestId);
        return response;
    }
    // Extract x-payment header if present
    const paymentHeader = request.headers.get('x-payment') || request.headers.get('X-Payment');
    // Create request headers with payment header forwarded
    // This ensures the x-payment header reaches the route handler
    const requestHeaders = new Headers(request.headers);
    // Log payment header presence for debugging
    if (paymentHeader) {
        logger.debug('Payment header detected', {
            headerLength: paymentHeader.length,
            hasX402Prefix: paymentHeader.startsWith('x402 ')
        });
        // Ensure payment header is in the forwarded headers
        requestHeaders.set('x-payment', paymentHeader);
    }
    // Add payment header to request headers for API routes to access
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request: {
            headers: requestHeaders
        }
    });
    // Add request ID to response
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$id$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addRequestIdToResponse"])(response, requestId);
    // Add rate limit headers (even if not exceeded)
    const rateLimitHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$unified$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getRateLimitHeadersEdge"])(request, endpointId);
    if (rateLimitHeaders) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$unified$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addRateLimitHeaders"])(response, rateLimitHeaders);
    }
    return response;
}
const config = {
    matcher: [
        '/',
        '/api/:path*'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__8ff373cc._.js.map