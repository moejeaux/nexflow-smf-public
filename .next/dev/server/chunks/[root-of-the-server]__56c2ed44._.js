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
"[project]/src/integrations/x402/cdp-jwt.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CDPJWTGenerator",
    ()=>CDPJWTGenerator,
    "getCDPJWTGenerator",
    ()=>getCDPJWTGenerator
]);
(()=>{
    const e = new Error("Cannot find module '@coinbase/cdp-sdk/auth'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
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
        const token = await generateJwt({
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
(()=>{
    const e = new Error("Cannot find module 'viem'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
async function verifyPaymentSignature(signature, authorization, signerAddress, chainId = 8453 // Base mainnet
) {
    try {
        // EIP-712 domain for x402 payments
        const domain = {
            name: 'x402',
            version: '1',
            chainId,
            verifyingContract: '0x0000000000000000000000000000000000000000'
        };
        // EIP-712 types for the payment authorization
        const types = {
            PaymentAuthorization: [
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
        const isValid = await verifyTypedData({
            address: signerAddress,
            domain,
            types,
            primaryType: 'PaymentAuthorization',
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
   * Verify payment with CDP facilitator API
   * 
   * This method:
   * 1. Validates payment authorization fields locally
   * 2. Optionally verifies EIP-712 signature locally
   * 3. Calls CDP API for on-chain verification
   * 4. Returns verification result with KYT/OFAC status
   */ async verifyPayment(request) {
        const start = Date.now();
        try {
            // Step 1: Validate payment authorization fields locally
            const authValidation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$signature$2d$verifier$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validatePaymentAuthorization"])(request.paymentPayload.payload.authorization);
            if (!authValidation.valid) {
                return {
                    success: false,
                    valid: false,
                    error: authValidation.error || 'Invalid payment authorization'
                };
            }
            // Step 2: Extract authorization for use throughout
            const auth = request.paymentPayload.payload.authorization;
            const signature = request.paymentPayload.payload.signature;
            // Step 3: Optionally verify signature locally (additional security layer)
            // Note: CDP will also verify, but local check catches issues early
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
            // Step 4: Use paymentRequirements from request (must be provided by caller)
            // CDP requires paymentRequirements that match the challenge
            if (!request.paymentRequirements || !request.paymentRequirements.to && !request.paymentRequirements.payTo) {
                logger.error({
                    hasPaymentRequirements: !!request.paymentRequirements,
                    paymentRequirements: request.paymentRequirements
                }, 'Missing paymentRequirements');
                return {
                    success: false,
                    valid: false,
                    error: 'paymentRequirements must be provided for CDP verification'
                };
            }
            // Normalize paymentRequirements to CDP's expected format
            // CDP expects: scheme, network, to, value, resource, validAfter, validBefore, asset
            // Remove any fields that CDP doesn't expect (payer, maxTimeoutSeconds, description, mimeType might be optional)
            const paymentRequirements = {
                scheme: request.paymentRequirements?.scheme || 'exact',
                network: request.paymentRequirements?.network || request.paymentPayload.network,
                // Convert legacy field names to CDP format
                to: request.paymentRequirements?.to || request.paymentRequirements?.payTo || auth.to,
                value: request.paymentRequirements?.value || request.paymentRequirements?.maxAmountRequired || auth.value,
                // Ensure validity window is included
                validAfter: request.paymentRequirements?.validAfter || auth.validAfter,
                validBefore: request.paymentRequirements?.validBefore || auth.validBefore,
                // Required fields - ensure they exist
                resource: request.paymentRequirements?.resource,
                asset: request.paymentRequirements?.asset,
                // Optional fields (only include if present)
                ...request.paymentRequirements?.description && {
                    description: request.paymentRequirements.description
                },
                ...request.paymentRequirements?.mimeType && {
                    mimeType: request.paymentRequirements.mimeType
                }
            };
            // Validate that required fields are present
            if (!paymentRequirements.resource || !paymentRequirements.asset) {
                logger.error({
                    hasResource: !!paymentRequirements.resource,
                    hasAsset: !!paymentRequirements.asset,
                    paymentRequirements: request.paymentRequirements
                }, 'Missing required paymentRequirements fields (resource or asset)');
                return {
                    success: false,
                    valid: false,
                    error: 'paymentRequirements must include resource and asset'
                };
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
            const normalizedNetwork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(request.paymentPayload.network || paymentRequirements.network || 'base');
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
            const verifyBody = {
                x402Version: 2,
                paymentPayload: {
                    x402Version: 2,
                    scheme: request.paymentPayload.scheme || 'exact',
                    network: normalizedNetwork,
                    payload: {
                        signature: request.paymentPayload.payload.signature,
                        authorization: {
                            from: auth.from,
                            to: auth.to,
                            // CDP x402 v2: value must be a string of atomic units (e.g., "1000000" for 1 USDC)
                            value: authorizationValue,
                            validAfter: auth.validAfter,
                            validBefore: auth.validBefore,
                            nonce: auth.nonce
                        }
                    }
                },
                // paymentRequirements at root level (NOT nested inside paymentPayload)
                // CDP v2 field names: payTo, maxAmountRequired (not to, value)
                paymentRequirements: {
                    scheme: paymentRequirements.scheme || 'exact',
                    network: normalizedNetwork,
                    payTo: paymentRequirements.to || paymentRequirements.payTo,
                    // CDP x402 v2: maxAmountRequired must be a string of atomic units (e.g., "1000000" for 1 USDC)
                    // Must match authorization.value exactly
                    maxAmountRequired: maxAmountRequired,
                    resource: paymentRequirements.resource,
                    asset: paymentRequirements.asset,
                    description: paymentRequirements.description || 'x402 Payment Verification',
                    mimeType: paymentRequirements.mimeType || 'application/json',
                    maxTimeoutSeconds: paymentRequirements.maxTimeoutSeconds || 300,
                    // Optional fields per v2 spec
                    ...paymentRequirements.validAfter && {
                        validAfter: paymentRequirements.validAfter
                    },
                    ...paymentRequirements.validBefore && {
                        validBefore: paymentRequirements.validBefore
                    },
                    ...paymentRequirements.outputSchema && {
                        outputSchema: paymentRequirements.outputSchema
                    },
                    ...paymentRequirements.extra && {
                        extra: paymentRequirements.extra
                    }
                }
            };
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
                    scheme: verifyBody.paymentPayload.scheme,
                    network: verifyBody.paymentPayload.network,
                    signaturePreview: verifyBody.paymentPayload.payload.signature?.substring(0, 20) + '...',
                    authorization: {
                        from: verifyBody.paymentPayload.payload.authorization.from,
                        to: verifyBody.paymentPayload.payload.authorization.to,
                        value: verifyBody.paymentPayload.payload.authorization.value
                    }
                },
                paymentRequirements: {
                    scheme: paymentRequirements.scheme,
                    network: paymentRequirements.network,
                    to: paymentRequirements.to,
                    value: paymentRequirements.value,
                    validAfter: paymentRequirements.validAfter,
                    validBefore: paymentRequirements.validBefore,
                    payer: paymentRequirements.payer,
                    asset: paymentRequirements.asset,
                    resource: paymentRequirements.resource,
                    description: paymentRequirements.description,
                    mimeType: paymentRequirements.mimeType,
                    maxTimeoutSeconds: paymentRequirements.maxTimeoutSeconds
                },
                fullRequestBody: JSON.stringify(verifyBody, null, 2),
                // Log the actual paymentRequirements object being sent
                paymentRequirementsKeys: Object.keys(paymentRequirements),
                paymentRequirementsHasPayer: 'payer' in paymentRequirements,
                paymentRequirementsPayerValue: paymentRequirements.payer
            }, 'Sending verification request to CDP');
            // Step 6: Call CDP API using fetch with request ID
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
            try {
                const response = await fetch(url.toString(), {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(verifyBody),
                    signal: AbortSignal.timeout(10000)
                });
                const text = await response.text();
                const data = text ? JSON.parse(text) : {};
                const latencyMs = Date.now() - start;
                // Log CDP response
                logger.debug({
                    status: response.status,
                    isValid: data.isValid,
                    latencyMs
                }, 'CDP verification response');
                // CDP response uses `isValid` (not `valid`) and `invalidReason` (not `reason`)
                if (response.ok && data.isValid) {
                    logger.info({
                        latencyMs
                    }, 'Payment verified successfully');
                    return {
                        success: true,
                        valid: true,
                        transactionHash: undefined,
                        kytStatus: 'passed',
                        ofacStatus: 'passed'
                    };
                } else {
                    // Log detailed error information including request body for debugging
                    logger.error({
                        status: response.status,
                        invalidReason: data.invalidReason,
                        errorMessage: data.errorMessage,
                        error: data.error,
                        code: data.code,
                        details: data.details,
                        cdpResponse: data,
                        requestBody: {
                            x402Version: verifyBody.x402Version,
                            hasPaymentPayload: !!verifyBody.paymentPayload,
                            hasPaymentRequirements: !!verifyBody.paymentRequirements
                        }
                    }, 'Payment verification failed');
                    // Extract error code from CDP response - prefer invalidReason, then errorMessage, then error, then code
                    const errorCode = data.invalidReason || data.errorMessage || data.error || data.code || 'CDP_VERIFY_FAILED';
                    // Extract authorization details from the parsed payment header for logging
                    let authorizationFrom = 'UNKNOWN';
                    let authorizationTo = 'UNKNOWN';
                    let transactionHash = 'NOT PROVIDED';
                    try {
                        const { parseX402Header } = await __turbopack_context__.A("[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript, async loader)");
                        const parsed = parseX402Header(request.payment);
                        if (parsed.valid && parsed.parsed) {
                            authorizationFrom = parsed.parsed.authorization.from;
                            authorizationTo = parsed.parsed.authorization.to;
                            transactionHash = parsed.parsed.txHash || 'NOT PROVIDED';
                        }
                    } catch (parseError) {
                        logger.warn({
                            error: parseError
                        }, 'Failed to parse payment header for error logging');
                    }
                    const errorDetails = {
                        error: errorMessage,
                        cdpResponse: data,
                        httpStatus: response.status,
                        invalidReason: data.invalidReason,
                        errorMessage: data.errorMessage,
                        code: data.code,
                        details: data.details,
                        // Include request details for debugging (using paymentRequirements from verifyBody)
                        requestDetails: {
                            scheme: verifyBody.paymentRequirements?.scheme || 'MISSING',
                            network: verifyBody.paymentRequirements?.network || 'MISSING',
                            to: verifyBody.paymentRequirements?.to || 'MISSING',
                            value: verifyBody.paymentRequirements?.value || 'MISSING',
                            payer: verifyBody.paymentRequirements?.payer || 'NOT PROVIDED IN PAYMENT REQUIREMENTS',
                            validAfter: verifyBody.paymentRequirements?.validAfter || 'MISSING',
                            validBefore: verifyBody.paymentRequirements?.validBefore || 'MISSING',
                            resource: verifyBody.paymentRequirements?.resource || 'MISSING',
                            asset: verifyBody.paymentRequirements?.asset || 'MISSING',
                            // Include full paymentRequirements to see what's actually being sent
                            fullPaymentRequirements: verifyBody.paymentRequirements,
                            // Include authorization from parsed header
                            authorizationFrom,
                            authorizationTo,
                            transactionHash
                        }
                    };
                    return {
                        success: false,
                        valid: false,
                        error: errorCode,
                        errorDetails: errorDetails,
                        kytStatus: undefined,
                        ofacStatus: undefined
                    };
                }
            } catch (error) {
                // Handle network errors with enhanced logging
                const errorMessage1 = error?.message || 'CDP_VERIFY_FAILED';
                const isTimeout = error?.name === 'AbortError' || errorMessage1.toLowerCase().includes('timeout');
                const isNetworkError = errorMessage1.toLowerCase().includes('network') || errorMessage1.toLowerCase().includes('fetch') || errorMessage1.toLowerCase().includes('econnrefused');
                logger.error({
                    error,
                    errorMessage: errorMessage1,
                    isTimeout,
                    isNetworkError,
                    component: 'cdp-facilitator',
                    operation: 'verifyPayment',
                    requestId: request.requestId
                }, 'CDP API request error');
                const errorDetails = {
                    error: errorMessage1,
                    cdpResponse: undefined,
                    httpStatus: 500,
                    errorType: isTimeout ? 'timeout' : isNetworkError ? 'network' : 'unknown'
                };
                return {
                    success: false,
                    valid: false,
                    error: errorMessage1,
                    errorDetails: errorDetails
                };
            }
        } catch (error) {
            const latencyMs = Date.now() - start;
            const errorMessage1 = error instanceof Error ? error.message : String(error);
            const isTimeout = error instanceof Error && (error.name === 'AbortError' || errorMessage1.toLowerCase().includes('timeout'));
            logger.error({
                error,
                latencyMs,
                errorMessage: errorMessage1,
                isTimeout,
                component: 'cdp-facilitator',
                operation: 'verifyPayment',
                requestId: request.requestId
            }, 'Verification error');
            // Handle timeout errors
            if (isTimeout) {
                return {
                    success: false,
                    valid: false,
                    error: 'CDP_REQUEST_TIMEOUT'
                };
            }
            // Handle network errors
            if (error instanceof Error && (error.message.includes('fetch') || error.message.includes('network'))) {
                return {
                    success: false,
                    valid: false,
                    error: 'CDP_NETWORK_ERROR'
                };
            }
            return {
                success: false,
                valid: false,
                error: error instanceof Error ? error.message : 'CDP_VERIFICATION_ERROR'
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
            const errorMessage1 = error instanceof Error ? error.message : 'Unknown error';
            // If it's a DNS/network error, note that payment verification might still work
            if (errorMessage1.includes('fetch failed') || errorMessage1.includes('ENOTFOUND') || errorMessage1.includes('getaddrinfo')) {
                return {
                    healthy: false,
                    error: `Facilitator URL not reachable (${errorMessage1}). Payment verification may use a different endpoint.`
                };
            }
            return {
                healthy: false,
                error: errorMessage1
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
                paymentRequirements: {
                    scheme: requirements.scheme,
                    network: requirements.network,
                    maxAmountRequired: requirements.maxAmountRequired,
                    resource: requirements.resource,
                    description: requirements.description || '',
                    mimeType: requirements.mimeType || 'application/json',
                    payTo: requirements.payTo,
                    maxTimeoutSeconds: requirements.maxTimeoutSeconds || 300,
                    asset: requirements.asset
                }
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
"[project]/src/db/smf.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
    "updateRouteStatus",
    ()=>updateRouteStatus,
    "upsertHealthSnapshot",
    ()=>upsertHealthSnapshot
]);
(()=>{
    const e = new Error("Cannot find module './factory'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'SMFDatabase'
});
async function createRoute(route) {
    const db = getDatabase();
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
    const db = getDatabase();
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
    const db = getDatabase();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        const result = await db.pool.query(`INSERT INTO route_attempts (
        id, route_id, facilitator_id, phase, result, latency_ms, error_code, raw_status, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`, [
            id,
            attempt.route_id,
            attempt.facilitator_id,
            attempt.phase,
            attempt.result,
            attempt.latency_ms,
            attempt.error_code,
            attempt.raw_status,
            now
        ]);
        return result.rows[0];
    } else {
        // SQLite
        const stmt = db.prepare(`
      INSERT INTO route_attempts (
        id, route_id, facilitator_id, phase, result, latency_ms, error_code, raw_status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        stmt.run(id, attempt.route_id, attempt.facilitator_id, attempt.phase, attempt.result, attempt.latency_ms, attempt.error_code, attempt.raw_status, now);
        return {
            id,
            ...attempt,
            created_at: now
        };
    }
}
async function getFacilitatorCapabilities(facilitatorId, network, token) {
    const db = getDatabase();
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
    const db = getDatabase();
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
async function getRouteAttemptsForHealth(facilitatorId, network, token, windowStart, windowEnd) {
    const db = getDatabase();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        const result = await db.pool.query(`SELECT ra.* FROM route_attempts ra
       INNER JOIN routes r ON ra.route_id = r.id
       WHERE ra.facilitator_id = $1
         AND r.network = $2
         AND r.token = $3
         AND ra.created_at >= $4
         AND ra.created_at < $5
       ORDER BY ra.created_at`, [
            facilitatorId,
            network,
            token,
            windowStart,
            windowEnd
        ]);
        return result.rows;
    } else {
        // SQLite
        const stmt = db.prepare(`SELECT ra.* FROM route_attempts ra
       INNER JOIN routes r ON ra.route_id = r.id
       WHERE ra.facilitator_id = ?
         AND r.network = ?
         AND r.token = ?
         AND ra.created_at >= ?
         AND ra.created_at < ?
       ORDER BY ra.created_at`);
        const rows = stmt.all(facilitatorId, network, token, windowStart, windowEnd);
        return rows;
    }
}
async function upsertHealthSnapshot(snapshot) {
    const db = getDatabase();
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
}),
"[project]/src/integrations/x402/facilitators/health-aggregator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$health$2d$aggregator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/health-aggregator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/smf.ts [app-route] (ecmascript)");
;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'FacilitatorRouter'
});
class FacilitatorRouter {
    facilitators = new Map();
    facilitatorHealth = new Map();
    healthCheckInterval = null;
    constructor(){
        // Register default facilitators
        this.registerFacilitator((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$cdp$2d$facilitator$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCDPFacilitatorAdapter"])());
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
        // Get eligible facilitators
        const eligible = this.getEligibleFacilitators(requirements, preferences, policy);
        if (eligible.length === 0) {
            throw new Error(`No eligible facilitator found for ${requirements.network}/${requirements.asset}/${requirements.scheme}`);
        }
        // Score and rank facilitators
        const scored = await this.scoreFacilitators(eligible, requirements, preferences, policy);
        // Select best facilitator
        const best = scored[0].facilitator;
        // Log decision trace (compact format for explainer/debugger UI)
        logger.info({
            facilitatorId: best.id,
            score: scored[0].score,
            alternatives: scored.length - 1,
            reasons: scored[0].reasons,
            constraints: {
                preferences: preferences ? {
                    priority: preferences.priority,
                    preferredNetworks: preferences.preferredNetworks,
                    preferredAssets: preferences.preferredAssets
                } : undefined,
                settlementMode: requirements.settlementMode
            },
            candidates: scored.map((s)=>({
                    id: s.facilitator.id,
                    score: s.score,
                    reasons: s.reasons
                }))
        }, 'Facilitator selected');
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
   * Uses real health metrics from database for accurate scoring
   * Handles priority ties with randomization
   * Exposed for decision trace building
   */ async scoreFacilitators(facilitators, requirements, preferences, policy) {
        const scored = await Promise.all(facilitators.map(async (facilitator)=>{
            let score = 100; // Start with base score
            const reasons = [];
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
                score -= 50; // Heavy penalty for down status
                reasons.push('status:down');
            } else if (healthMetrics.status === 'degraded') {
                score -= 25; // Moderate penalty for degraded
                reasons.push('status:degraded');
            }
            // 7. Health status check (cached)
            const health = this.facilitatorHealth.get(facilitator.id);
            if (health && !health.healthy) {
                score -= 30; // Additional penalty for unhealthy in cache
                reasons.push('cache-unhealthy');
            }
            // 8. Cost optimization (if policy requires)
            if (policy?.preferCheapest || preferences?.priority === 'cost') {
                const pricing = await facilitator.getPricing(requirements.network, requirements.asset);
                if (pricing) {
                    // Lower cost = higher score (normalize)
                    score += 20; // Bonus for having pricing info
                    reasons.push('has-pricing');
                }
            }
            // 9. Speed optimization (if preference)
            if (preferences?.priority === 'speed') {
                if (healthMetrics.p95LatencyMs !== null) {
                    // Lower latency = higher score
                    const latencyBonus = Math.max(0, 30 - healthMetrics.p95LatencyMs / 10);
                    score += latencyBonus;
                    reasons.push(`speed-optimized:${healthMetrics.p95LatencyMs}ms`);
                }
            }
            // 10. Compliance optimization
            if (preferences?.priority === 'compliance' || policy?.requireKYC) {
                const metadata = facilitator.config.metadata;
                if (metadata?.kytEnabled && metadata?.ofacEnabled) {
                    score += 30; // Bonus for compliance
                    reasons.push('compliance-enabled');
                }
            }
            // 11. Reliability optimization
            if (preferences?.priority === 'reliability') {
                if (healthMetrics.status === 'healthy' && healthMetrics.successRate > 0.95) {
                    score += 25;
                    reasons.push('high-reliability');
                }
            }
            // 12. Settlement mode optimization
            if (requirements.settlementMode) {
                if (facilitator.config.settlementModes?.includes(requirements.settlementMode)) {
                    score += 15; // Bonus for supporting requested settlement mode
                    reasons.push(`settlement:${requirements.settlementMode}`);
                }
            }
            return {
                facilitator,
                score,
                reasons
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
}),
"[project]/src/app/api/v1/smf/health/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// SMF Health API
// =============================================================================
// GET /api/v1/smf/health
// Returns summary health status for all facilitators
__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$facilitator$2d$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/facilitator-router.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/smf.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'SMFHealthAPI'
});
async function GET() {
    try {
        const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$facilitator$2d$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFacilitatorRouter"])();
        const facilitators = router.getFacilitators();
        const healthStatus = await Promise.all(facilitators.map(async (facilitator)=>{
            try {
                // Get latest health snapshot
                const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLatestHealthSnapshot"])(facilitator.id, 'base', '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' // Default token - can be made configurable
                );
                // Get cached health
                const cachedHealth = router.getFacilitatorHealth(facilitator.id);
                // Determine overall status
                let status = 'healthy';
                let reasons = [];
                if (snapshot) {
                    status = snapshot.status;
                    if (snapshot.success_rate < 0.5) {
                        reasons.push('low-success-rate');
                    }
                    if (snapshot.p95_latency_ms && snapshot.p95_latency_ms > 5000) {
                        reasons.push('high-latency');
                    }
                    if (snapshot.error_rate > 0.1) {
                        reasons.push('high-error-rate');
                    }
                }
                if (cachedHealth && !cachedHealth.healthy) {
                    status = 'down';
                    reasons.push('health-check-failed');
                }
                return {
                    facilitatorId: facilitator.id,
                    name: facilitator.name,
                    status,
                    reasons: reasons.length > 0 ? reasons : undefined,
                    metrics: snapshot ? {
                        successRate: Number(snapshot.success_rate),
                        p95LatencyMs: snapshot.p95_latency_ms,
                        errorRate: Number(snapshot.error_rate),
                        lastErrorType: snapshot.last_error_type,
                        lastUpdated: snapshot.window_end
                    } : undefined,
                    cached: cachedHealth ? {
                        healthy: cachedHealth.healthy,
                        lastChecked: new Date(cachedHealth.lastChecked).toISOString()
                    } : undefined
                };
            } catch (error) {
                logger.error({
                    error,
                    facilitatorId: facilitator.id
                }, 'Failed to get health status');
                return {
                    facilitatorId: facilitator.id,
                    name: facilitator.name,
                    status: 'down',
                    reasons: [
                        'health-check-error'
                    ]
                };
            }
        }));
        // Determine overall system status
        const healthyCount = healthStatus.filter((h)=>h.status === 'healthy').length;
        const degradedCount = healthStatus.filter((h)=>h.status === 'degraded').length;
        const downCount = healthStatus.filter((h)=>h.status === 'down').length;
        let systemStatus = 'healthy';
        if (downCount > 0) {
            systemStatus = 'down';
        } else if (degradedCount > 0) {
            systemStatus = 'degraded';
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: systemStatus,
            summary: {
                total: facilitators.length,
                healthy: healthyCount,
                degraded: degradedCount,
                down: downCount
            },
            facilitators: healthStatus,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.error({
            error
        }, 'Failed to get SMF health');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            status: 'down',
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__56c2ed44._.js.map