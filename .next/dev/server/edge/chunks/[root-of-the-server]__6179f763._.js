(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__6179f763._.js",
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
"[project]/src/lib/rate-limit.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// Rate Limiting
// =============================================================================
// Implements rate limiting with multiple strategies:
// - Per API key (from database)
// - Per endpoint
// - Global (IP-based)
// - In-memory storage (can upgrade to Redis later)
__turbopack_context__.s([
    "addRateLimitHeaders",
    ()=>addRateLimitHeaders,
    "checkAllRateLimits",
    ()=>checkAllRateLimits,
    "createRateLimitResponse",
    ()=>createRateLimitResponse,
    "getRateLimitHeaders",
    ()=>getRateLimitHeaders,
    "rateLimitByApiKeyEdge",
    ()=>rateLimitByApiKeyEdge,
    "rateLimitByEndpoint",
    ()=>rateLimitByEndpoint,
    "rateLimitByIp",
    ()=>rateLimitByIp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
/**
 * Extract API key from Authorization header (Edge-compatible)
 * Supports: Bearer <token> or <token>
 */ function extractApiKey(request) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return null;
    // Support both "Bearer <token>" and "<token>" formats
    if (authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7).trim();
    }
    return authHeader.trim();
}
// Note: Database imports removed to support Edge runtime
// API key rate limits are checked in API routes (Node.js runtime)
// In-memory rate limit store
// Format: { key: { count: number, resetAt: number } }
const rateLimitStore = new Map();
// Cleanup old entries every 5 minutes
setInterval(()=>{
    const now = Date.now();
    const keysToDelete = [];
    rateLimitStore.forEach((value, key)=>{
        if (value.resetAt < now) {
            keysToDelete.push(key);
        }
    });
    keysToDelete.forEach((key)=>rateLimitStore.delete(key));
}, 5 * 60 * 1000);
/**
 * Check rate limit for a given identifier
 */ function checkRateLimit(config) {
    const now = Date.now();
    const key = config.identifier;
    const stored = rateLimitStore.get(key);
    // If no stored data or window expired, create new entry
    if (!stored || stored.resetAt < now) {
        const resetAt = now + config.windowMs;
        rateLimitStore.set(key, {
            count: 1,
            resetAt
        });
        return {
            allowed: true,
            remaining: config.maxRequests - 1,
            resetAt,
            limit: config.maxRequests
        };
    }
    // Check if limit exceeded
    if (stored.count >= config.maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetAt: stored.resetAt,
            limit: config.maxRequests
        };
    }
    // Increment count
    stored.count++;
    rateLimitStore.set(key, stored);
    return {
        allowed: true,
        remaining: config.maxRequests - stored.count,
        resetAt: stored.resetAt,
        limit: config.maxRequests
    };
}
/**
 * Get client IP address
 */ function getClientIp(request) {
    return request.ip || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}
function rateLimitByApiKeyEdge(request, defaultLimit = 1000) {
    const token = extractApiKey(request);
    if (!token) {
        return null; // No API key, skip API key rate limiting
    }
    // Use token hash as identifier (don't store full token)
    const tokenHash = token.substring(0, 16); // Use first 16 chars as identifier
    const config = {
        windowMs: 60 * 60 * 1000,
        maxRequests: defaultLimit,
        identifier: `api_key:${tokenHash}`
    };
    return checkRateLimit(config);
}
function rateLimitByEndpoint(request, endpointId, maxRequests = 100) {
    const ip = getClientIp(request);
    const config = {
        windowMs: 60 * 1000,
        maxRequests,
        identifier: `endpoint:${endpointId}:${ip}`
    };
    return checkRateLimit(config);
}
function rateLimitByIp(request, maxRequests = 1000) {
    const ip = getClientIp(request);
    const config = {
        windowMs: 60 * 60 * 1000,
        maxRequests,
        identifier: `global:${ip}`
    };
    return checkRateLimit(config);
}
function addRateLimitHeaders(response, result) {
    response.headers.set('X-RateLimit-Limit', result.limit.toString());
    response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
    response.headers.set('X-RateLimit-Reset', new Date(result.resetAt).toISOString());
    return response;
}
function createRateLimitResponse(result) {
    const resetDate = new Date(result.resetAt).toISOString();
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Rate limit exceeded',
        code: 'RATE_LIMIT_EXCEEDED',
        message: `Too many requests. Limit: ${result.limit} per hour. Try again after ${resetDate}`,
        retryAfter: Math.ceil((result.resetAt - Date.now()) / 1000)
    }, {
        status: 429
    });
    return addRateLimitHeaders(response, result);
}
function checkAllRateLimits(request, endpointId) {
    // 1. Check global IP limit
    const globalResult = rateLimitByIp(request, 1000);
    if (!globalResult.allowed) {
        return {
            result: globalResult,
            type: 'global'
        };
    }
    // 2. Check API key limit (if authenticated) - uses default limit in Edge runtime
    const apiKeyResult = rateLimitByApiKeyEdge(request, 1000);
    if (apiKeyResult && !apiKeyResult.allowed) {
        return {
            result: apiKeyResult,
            type: 'api_key'
        };
    }
    // 3. Check endpoint limit (if endpoint specified)
    if (endpointId) {
        const endpointResult = rateLimitByEndpoint(request, endpointId, 100);
        if (!endpointResult.allowed) {
            return {
                result: endpointResult,
                type: 'endpoint'
            };
        }
    }
    return null; // All limits passed
}
function getRateLimitHeaders(request, endpointId) {
    const results = [];
    // Global limit
    results.push(rateLimitByIp(request, 1000));
    // API key limit (Edge-compatible)
    const apiKeyResult = rateLimitByApiKeyEdge(request, 1000);
    if (apiKeyResult) {
        results.push(apiKeyResult);
    }
    // Endpoint limit
    if (endpointId) {
        results.push(rateLimitByEndpoint(request, endpointId, 100));
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
__turbopack_context__.s([
    "getBlockedIps",
    ()=>getBlockedIps,
    "getThreatHistory",
    ()=>getThreatHistory,
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
// In-memory threat store (upgrade to Redis in production)
const threatStore = new Map();
// Shadow mode: new rules start in log-only mode
const SHADOW_MODE_ENABLED = process.env.SECURITY_SHADOW_MODE === 'true' || true; // Default to true for safety
const SHADOW_MODE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in shadow mode
// Safety caps to prevent mass blocking
const MAX_BLOCKS_PER_HOUR = parseInt(process.env.SECURITY_MAX_BLOCKS_PER_HOUR || '100', 10);
const MAX_BLOCKS_PER_DAY = parseInt(process.env.SECURITY_MAX_BLOCKS_PER_DAY || '1000', 10);
// Track blocks per time window
const blocksThisHour = new Map();
const blocksThisDay = new Map();
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
    // Log threats
    if (threats.length > 0) {
        logger.warn({
            requestId,
            ip,
            path,
            method,
            threatCount: threats.length,
            riskScore,
            threats: threats.map((t)=>({
                    type: t.type,
                    severity: t.severity,
                    category: t.category
                }))
        }, 'Security threats detected');
    }
    // Store threats for IP tracking
    if (threats.length > 0) {
        storeThreat(ip, threats);
    }
    return {
        safe: threats.length === 0,
        threats,
        riskScore,
        recommendations
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
function getThreatHistory(ip) {
    return threatStore.get(ip) || null;
}
function shouldBlockIp(ip) {
    // Shadow mode: log-only, don't block
    if ("TURBOPACK compile-time truthy", 1) {
        return false; // Log-only mode
    }
    //TURBOPACK unreachable
    ;
    // Safety caps: prevent mass blocking
    const hourCount = undefined;
    const dayCount = undefined;
    const history = undefined;
    // Block if:
    // - More than 10 threats in last hour
    // - Any critical severity threat (after shadow mode review)
    const oneHourAgo = undefined;
    const recentThreats = undefined;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rate-limit.ts [middleware-edge] (ecmascript)");
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
    // Only process API routes
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
    const rateLimitCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["checkAllRateLimits"])(request, endpointId);
    if (rateLimitCheck && !rateLimitCheck.result.allowed) {
        logger.warn('Rate limit exceeded', {
            rateLimitType: rateLimitCheck.type,
            limit: rateLimitCheck.result.limit,
            remaining: rateLimitCheck.result.remaining
        });
        const response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["createRateLimitResponse"])(rateLimitCheck.result);
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
    const rateLimitHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getRateLimitHeaders"])(request, endpointId);
    if (rateLimitHeaders) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["addRateLimitHeaders"])(response, rateLimitHeaders);
    }
    return response;
}
const config = {
    matcher: [
        '/api/:path*'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__6179f763._.js.map