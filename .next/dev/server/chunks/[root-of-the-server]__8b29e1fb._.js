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
"[project]/src/lib/upstream-proxy-enhanced.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// Enhanced Upstream Proxy with Retry Logic and Circuit Breaker
// =============================================================================
// Production-grade proxy with:
// - Exponential backoff retry
// - Circuit breaker pattern
// - Connection pooling
// - Better error handling
__turbopack_context__.s([
    "getCircuitBreakerStatus",
    ()=>getCircuitBreakerStatus,
    "proxyRequestWithRetry",
    ()=>proxyRequestWithRetry,
    "resetCircuitBreaker",
    ()=>resetCircuitBreaker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'UpstreamProxy'
});
const circuitBreakers = new Map();
const DEFAULT_CIRCUIT_BREAKER_CONFIG = {
    failureThreshold: 5,
    resetTimeout: 60000,
    halfOpenTimeout: 30000
};
/**
 * Check if circuit breaker allows request
 */ function checkCircuitBreaker(upstreamUrl) {
    const state = circuitBreakers.get(upstreamUrl);
    if (!state) {
        // Initialize as closed
        circuitBreakers.set(upstreamUrl, {
            failures: 0,
            lastFailureTime: 0,
            state: 'closed'
        });
        return true;
    }
    const now = Date.now();
    const config = DEFAULT_CIRCUIT_BREAKER_CONFIG;
    switch(state.state){
        case 'closed':
            return true;
        case 'open':
            // Check if we should transition to half-open
            if (now - state.lastFailureTime > config.resetTimeout) {
                state.state = 'half-open';
                logger.info('Circuit breaker transitioning to half-open', {
                    upstreamUrl
                });
                return true;
            }
            return false;
        case 'half-open':
            // Allow one request to test
            return true;
        default:
            return true;
    }
}
/**
 * Record circuit breaker success
 */ function recordSuccess(upstreamUrl) {
    const state = circuitBreakers.get(upstreamUrl);
    if (state) {
        if (state.state === 'half-open') {
            // Success in half-open means we can close the circuit
            state.state = 'closed';
            state.failures = 0;
            logger.info('Circuit breaker closed after successful request', {
                upstreamUrl
            });
        } else {
            // Reset failure count on success
            state.failures = 0;
        }
    }
}
/**
 * Record circuit breaker failure
 */ function recordFailure(upstreamUrl) {
    const state = circuitBreakers.get(upstreamUrl);
    if (!state) {
        circuitBreakers.set(upstreamUrl, {
            failures: 1,
            lastFailureTime: Date.now(),
            state: 'closed'
        });
        return;
    }
    state.failures++;
    state.lastFailureTime = Date.now();
    const config = DEFAULT_CIRCUIT_BREAKER_CONFIG;
    if (state.state === 'half-open') {
        // Failure in half-open means we should open again
        state.state = 'open';
        logger.warn('Circuit breaker opened after failure in half-open state', {
            upstreamUrl,
            failures: state.failures
        });
    } else if (state.failures >= config.failureThreshold) {
        state.state = 'open';
        logger.warn('Circuit breaker opened due to failure threshold', {
            upstreamUrl,
            failures: state.failures
        });
    }
}
/**
 * Sleep for specified milliseconds
 */ function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
/**
 * Calculate exponential backoff delay
 */ function calculateBackoffDelay(attempt, baseDelay) {
    return Math.min(baseDelay * Math.pow(2, attempt), 10000); // Max 10 seconds
}
async function proxyRequestWithRetry(options) {
    const { upstreamUrl, method, headers, body, timeout = 30000, maxRetries = 3, retryDelay = 1000, retryableStatusCodes = [
        502,
        503,
        504,
        408,
        429
    ] } = options;
    // Check circuit breaker
    if (!checkCircuitBreaker(upstreamUrl)) {
        logger.warn('Circuit breaker is open, rejecting request', {
            upstreamUrl
        });
        return {
            success: false,
            statusCode: 503,
            headers: {},
            body: JSON.stringify({
                error: 'Service temporarily unavailable',
                code: 'CIRCUIT_BREAKER_OPEN',
                details: 'Upstream service is experiencing issues'
            }),
            responseTime: 0,
            error: 'Circuit breaker is open'
        };
    }
    let lastError = null;
    let lastResult = null;
    for(let attempt = 0; attempt <= maxRetries; attempt++){
        const startTime = Date.now();
        try {
            // Prepare headers (exclude host and connection headers)
            const proxyHeaders = {};
            headers.forEach((value, key)=>{
                const lowerKey = key.toLowerCase();
                if (lowerKey !== 'host' && lowerKey !== 'connection' && lowerKey !== 'x-payment' && lowerKey !== 'x-forwarded-host') {
                    proxyHeaders[key] = value;
                }
            });
            // Add forwarded headers
            proxyHeaders['X-Forwarded-For'] = headers.get('x-forwarded-for') || 'unknown';
            proxyHeaders['X-Forwarded-Proto'] = headers.get('x-forwarded-proto') || 'https';
            // Create fetch request with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(()=>controller.abort(), timeout);
            try {
                const response = await fetch(upstreamUrl, {
                    method,
                    headers: proxyHeaders,
                    body: body || undefined,
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                // Read response body
                const responseBody = await response.text();
                // Convert response headers to object
                const responseHeaders = {};
                response.headers.forEach((value, key)=>{
                    responseHeaders[key] = value;
                });
                const responseTime = Date.now() - startTime;
                const result = {
                    success: response.ok,
                    statusCode: response.status,
                    headers: responseHeaders,
                    body: responseBody,
                    responseTime,
                    retries: attempt
                };
                // Check if we should retry
                if (!response.ok && retryableStatusCodes.includes(response.status) && attempt < maxRetries) {
                    const backoffDelay = calculateBackoffDelay(attempt, retryDelay);
                    logger.warn('Upstream returned retryable error, retrying', {
                        upstreamUrl,
                        statusCode: response.status,
                        attempt: attempt + 1,
                        maxRetries,
                        backoffDelay
                    });
                    await sleep(backoffDelay);
                    lastResult = result;
                    continue;
                }
                // Success or non-retryable error
                recordSuccess(upstreamUrl);
                return result;
            } catch (fetchError) {
                clearTimeout(timeoutId);
                throw fetchError;
            }
        } catch (error) {
            const responseTime = Date.now() - startTime;
            lastError = error instanceof Error ? error : new Error('Unknown error');
            // Check if error is retryable
            const isRetryable = error instanceof Error && error.name === 'AbortError' || error instanceof TypeError && error.message.includes('fetch'); // Network error
            if (isRetryable && attempt < maxRetries) {
                const backoffDelay = calculateBackoffDelay(attempt, retryDelay);
                logger.warn('Upstream request failed, retrying', {
                    upstreamUrl,
                    error: lastError.message,
                    attempt: attempt + 1,
                    maxRetries,
                    backoffDelay
                });
                await sleep(backoffDelay);
                continue;
            }
            // Non-retryable error or max retries reached
            recordFailure(upstreamUrl);
            if (lastError.name === 'AbortError') {
                return {
                    success: false,
                    statusCode: 504,
                    headers: {},
                    body: JSON.stringify({
                        error: 'Upstream timeout'
                    }),
                    responseTime,
                    error: 'Request timeout',
                    retries: attempt
                };
            }
            return {
                success: false,
                statusCode: 502,
                headers: {},
                body: JSON.stringify({
                    error: 'Upstream error',
                    details: lastError.message
                }),
                responseTime,
                error: lastError.message,
                retries: attempt
            };
        }
    }
    // Max retries reached
    recordFailure(upstreamUrl);
    return {
        success: false,
        statusCode: lastResult?.statusCode || 502,
        headers: lastResult?.headers || {},
        body: lastResult?.body || JSON.stringify({
            error: 'Upstream error after retries',
            details: lastError?.message || 'Unknown error'
        }),
        responseTime: lastResult?.responseTime || 0,
        error: lastError?.message || 'Unknown error',
        retries: maxRetries
    };
}
function getCircuitBreakerStatus(upstreamUrl) {
    if (upstreamUrl) {
        const state = circuitBreakers.get(upstreamUrl);
        return {
            [upstreamUrl]: state || {
                failures: 0,
                lastFailureTime: 0,
                state: 'closed'
            }
        };
    }
    // Return all circuit breakers
    const status = {};
    circuitBreakers.forEach((state, url)=>{
        status[url] = state;
    });
    return status;
}
function resetCircuitBreaker(upstreamUrl) {
    circuitBreakers.delete(upstreamUrl);
    logger.info('Circuit breaker reset', {
        upstreamUrl
    });
}
}),
"[project]/src/app/api/v1/pulse/[...path]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$upstream$2d$proxy$2d$enhanced$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/upstream-proxy-enhanced.ts [app-route] (ecmascript)");
;
;
/**
 * Pulse Backend Proxy Route
 * 
 * Proxies /api/v1/pulse/* requests to the Pulse backend running on
 * the configured PULSE_INTERNAL_BASE URL (default: http://165.245.129.101:3100)
 * 
 * Supports: GET, POST, PUT, PATCH, DELETE
 */ // Maximum request body size (10MB default, configurable via env)
const MAX_REQUEST_BODY_SIZE = parseInt(process.env.MAX_REQUEST_BODY_SIZE || '10485760', 10);
/**
 * Build the target URL for the Pulse backend
 */ function buildPulseUrl(pathSegments, searchParams) {
    const pulseBase = process.env.PULSE_INTERNAL_BASE || 'http://165.245.129.101:3100';
    // Handle empty path segments (shouldn't happen with [...path] but handle gracefully)
    const path = pathSegments.length > 0 ? pathSegments.join('/') : '';
    const targetPath = path ? `/v1/pulse/${path}` : '/v1/pulse';
    // Preserve query string
    const queryString = searchParams.toString();
    const fullUrl = queryString ? `${pulseBase}${targetPath}?${queryString}` : `${pulseBase}${targetPath}`;
    return fullUrl;
}
/**
 * Handle all HTTP methods for Pulse proxy
 */ async function handlePulseRequest(request, pathSegments) {
    try {
        // Check request body size
        const contentLength = request.headers.get('content-length');
        if (contentLength) {
            const bodySize = parseInt(contentLength, 10);
            if (bodySize > MAX_REQUEST_BODY_SIZE) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Request body too large',
                    code: 'REQUEST_TOO_LARGE',
                    maxSize: MAX_REQUEST_BODY_SIZE,
                    receivedSize: bodySize
                }, {
                    status: 413
                });
            }
        }
        // Build target URL with path segments and query string
        const searchParams = request.nextUrl.searchParams;
        const targetUrl = buildPulseUrl(pathSegments, searchParams);
        // Read request body (if any)
        let requestBody = null;
        if (request.method !== 'GET' && request.method !== 'HEAD') {
            try {
                const bodyText = await request.text();
                const bodySize = new TextEncoder().encode(bodyText).length;
                if (bodySize > MAX_REQUEST_BODY_SIZE) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Request body too large',
                        code: 'REQUEST_TOO_LARGE',
                        maxSize: MAX_REQUEST_BODY_SIZE,
                        receivedSize: bodySize
                    }, {
                        status: 413
                    });
                }
                requestBody = bodyText || null;
            } catch (error) {
                // If body reading fails, continue with null
                requestBody = null;
            }
        }
        // Proxy request to Pulse backend using enhanced proxy with retry logic
        const proxyResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$upstream$2d$proxy$2d$enhanced$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["proxyRequestWithRetry"])({
            upstreamUrl: targetUrl,
            method: request.method,
            headers: request.headers,
            body: requestBody,
            timeout: 30000,
            maxRetries: 3,
            retryDelay: 1000,
            retryableStatusCodes: [
                502,
                503,
                504,
                408,
                429
            ]
        });
        // Convert proxy result to NextResponse
        const response = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](proxyResult.body, {
            status: proxyResult.statusCode,
            headers: proxyResult.headers
        });
        return response;
    } catch (error) {
        console.error('[Pulse Proxy] Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error',
            code: 'PROXY_ERROR',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}
async function GET(request, { params }) {
    const { path } = await params;
    return handlePulseRequest(request, path);
}
async function POST(request, { params }) {
    const { path } = await params;
    return handlePulseRequest(request, path);
}
async function PUT(request, { params }) {
    const { path } = await params;
    return handlePulseRequest(request, path);
}
async function PATCH(request, { params }) {
    const { path } = await params;
    return handlePulseRequest(request, path);
}
async function DELETE(request, { params }) {
    const { path } = await params;
    return handlePulseRequest(request, path);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8b29e1fb._.js.map