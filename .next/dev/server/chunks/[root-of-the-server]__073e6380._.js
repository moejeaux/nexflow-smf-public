module.exports = [
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
"[project]/src/lib/sentry.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/lib/logger.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pino$2f$pino$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pino/pino.js [instrumentation] (ecmascript)");
;
// Determine log level from environment
const logLevel = process.env.LOG_LEVEL || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'debug');
// Create logger instance with structured output
// In Next.js dev mode, disable pino-pretty transport to avoid worker thread issues
// Use simple JSON output instead (can be prettified by other tools)
const isNextDev = ("TURBOPACK compile-time value", "development") === 'development' && ("TURBOPACK compile-time value", "nodejs");
const usePrettyTransport = ("TURBOPACK compile-time value", "development") !== 'production' && !isNextDev;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pino$2f$pino$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"])({
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
    timestamp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pino$2f$pino$2e$js__$5b$instrumentation$5d$__$28$ecmascript$29$__["default"].stdTimeFunctions.isoTime
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
                const { captureException } = __turbopack_context__.r("[project]/src/lib/sentry.ts [instrumentation] (ecmascript)");
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
                const { captureException } = __turbopack_context__.r("[project]/src/lib/sentry.ts [instrumentation] (ecmascript)");
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
"[project]/src/lib/startup/validate-env.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// STARTUP ENVIRONMENT VALIDATION
// =============================================================================
// Validates critical environment variables at application startup.
// Fails fast in production if configuration is invalid or dangerous.
//
// This module prevents:
// - Missing critical configuration
// - Localhost fallbacks in production
// - Test/dummy facilitators in production
// - Unconfigured settlement in production
__turbopack_context__.s([
    "getBaseUrl",
    ()=>getBaseUrl,
    "runStartupValidation",
    ()=>runStartupValidation,
    "validateEnvForProduction",
    ()=>validateEnvForProduction,
    "validateEnvOrThrow",
    ()=>validateEnvOrThrow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [instrumentation] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$instrumentation$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'StartupValidation'
});
// =============================================================================
// REQUIRED ENVIRONMENT VARIABLES
// =============================================================================
/**
 * Environment variables that MUST be set in production.
 */ const REQUIRED_IN_PRODUCTION = [
    {
        name: 'DATABASE_URL',
        description: 'PostgreSQL connection string'
    },
    {
        name: 'NEXT_PUBLIC_APP_URL',
        description: 'Public application URL'
    },
    {
        name: 'CRON_SECRET',
        description: 'Secret for cron job authentication'
    }
];
/**
 * Environment variables that SHOULD be set for full functionality.
 */ const RECOMMENDED_IN_PRODUCTION = [
    {
        name: 'GOVERNANCE_ADMIN_API_KEY',
        description: 'Admin API key for governance'
    },
    {
        name: 'UPSTASH_REDIS_REST_URL',
        description: 'Redis URL for caching'
    },
    {
        name: 'UPSTASH_REDIS_REST_TOKEN',
        description: 'Redis authentication token'
    }
];
/**
 * Settlement-related variables required for on-chain operations.
 */ const SETTLEMENT_VARS = [
    {
        name: 'ATOMIC_BATCH_SETTLEMENT_ADDRESS',
        description: 'Settlement contract address'
    },
    {
        name: 'NEXFLOW_TREASURY_ADDRESS',
        description: 'Treasury wallet address (fee recipient)'
    },
    {
        name: 'ADMIN_MULTISIG_ADDRESS',
        description: 'Admin multisig for on-chain governance'
    },
    {
        name: 'NEXFLOW_HOUSE_FACILITATOR_ADDRESS',
        description: 'NexFlow house facilitator wallet'
    }
];
// =============================================================================
// VALIDATION FUNCTIONS
// =============================================================================
/**
 * Validate that a URL is not localhost.
 */ function isLocalhostUrl(url) {
    const lower = url.toLowerCase();
    return lower.includes('localhost') || lower.includes('127.0.0.1') || lower.includes('0.0.0.0');
}
/**
 * Validate that an address is not the zero address.
 */ function isZeroAddress(address) {
    return !address || address === '0x0000000000000000000000000000000000000000' || address === '0x0';
}
function validateEnvForProduction() {
    const errors = [];
    const warnings = [];
    const isProduction = ("TURBOPACK compile-time value", "development") === 'production';
    const isCI = process.env.CI === 'true';
    if ("TURBOPACK compile-time truthy", 1) {
        logger.debug('Skipping production validation (NODE_ENV !== production)');
        return {
            valid: true,
            errors: [],
            warnings: []
        };
    }
    //TURBOPACK unreachable
    ;
    const name = undefined, description = undefined;
    // Check NEXT_PUBLIC_APP_URL is not localhost
    const appUrl = undefined;
    // Check DATABASE_URL is not localhost (unless explicitly allowed for testing)
    const dbUrl = undefined;
    const name1 = undefined, description1 = undefined;
    // Check settlement configuration
    const settlementEnabled = undefined;
}
function validateEnvOrThrow() {
    const result = validateEnvForProduction();
    if (!result.valid) {
        const errorMessages = result.errors.map((e)=>`  - ${e.variable}: ${e.message}`).join('\n');
        throw new Error(`Production environment validation failed:\n${errorMessages}\n\nFix these issues before deploying to production.`);
    }
}
function getBaseUrl() {
    const isProduction = ("TURBOPACK compile-time value", "development") === 'production';
    const appUrl = ("TURBOPACK compile-time value", "https://www.nexflowapp.app");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Development fallback
    return appUrl || 'http://localhost:3000';
}
// =============================================================================
// SINGLETON VALIDATION STATE
// =============================================================================
let hasValidated = false;
function runStartupValidation() {
    if (hasValidated) return;
    hasValidated = true;
    try {
        validateEnvOrThrow();
    } catch (error) {
        // In production, this should crash the app
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        else {
            // In development, just log the warning
            console.warn('[WARN] Startup validation issues (non-fatal in development):', error);
        }
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__073e6380._.js.map