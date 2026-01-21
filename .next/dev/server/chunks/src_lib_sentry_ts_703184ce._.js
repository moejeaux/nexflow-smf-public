module.exports = [
"[project]/src/lib/sentry.ts [instrumentation] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// Sentry Error Tracking
// =============================================================================
// Initializes Sentry for error tracking and monitoring
// Only initializes if SENTRY_DSN is set
__turbopack_context__.s([
    "captureException",
    ()=>captureException,
    "captureMessage",
    ()=>captureMessage,
    "initSentry",
    ()=>initSentry,
    "setSentryContext",
    ()=>setSentryContext,
    "setSentryUser",
    ()=>setSentryUser
]);
let Sentry = null;
try {
    Sentry = (()=>{
        const e = new Error("Cannot find module '@sentry/nextjs'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })();
} catch (e) {
// Sentry not installed, will use no-op functions
}
let initialized = false;
function initSentry() {
    if (initialized) {
        return;
    }
    if (!Sentry) {
        // Sentry not installed, skip initialization
        return;
    }
    const dsn = process.env.SENTRY_DSN;
    if (!dsn) {
        console.log('[sentry] SENTRY_DSN not set, skipping Sentry initialization');
        return;
    }
    try {
        Sentry.init({
            dsn,
            environment: ("TURBOPACK compile-time value", "development") || 'development',
            tracesSampleRate: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 1.0,
            debug: ("TURBOPACK compile-time value", "development") === 'development',
            // Filter out sensitive data
            beforeSend (event, hint) {
                // Remove sensitive headers
                if (event.request?.headers) {
                    const sensitiveHeaders = [
                        'authorization',
                        'x-api-key',
                        'x-payment',
                        'cookie'
                    ];
                    sensitiveHeaders.forEach((header)=>{
                        if (header in event.request.headers) {
                            delete event.request.headers[header];
                        }
                    });
                }
                // Remove sensitive data from request body
                if (event.request?.data) {
                    const sensitiveFields = [
                        'apiKey',
                        'token',
                        'paymentHeader',
                        'x-payment',
                        'cardNumber',
                        'cvv'
                    ];
                    sensitiveFields.forEach((field)=>{
                        if (field in event.request.data) {
                            delete event.request.data[field];
                        }
                    });
                }
                return event;
            },
            // Ignore certain errors
            ignoreErrors: [
                // Browser extensions
                'ResizeObserver loop limit exceeded',
                'Non-Error promise rejection captured',
                // Network errors that are expected
                'NetworkError',
                'Failed to fetch'
            ]
        });
        initialized = true;
        console.log('[sentry] Sentry initialized successfully');
    } catch (error) {
        console.error('[sentry] Failed to initialize Sentry:', error);
    }
}
function setSentryUser(userId, apiKeyId) {
    if (!initialized || !Sentry) return;
    Sentry.setUser({
        id: userId || apiKeyId,
        apiKeyId
    });
}
function setSentryContext(context) {
    if (!initialized || !Sentry) return;
    Sentry.setContext('request', {
        requestId: context.requestId,
        apiKeyId: context.apiKeyId,
        endpoint: context.endpoint,
        endpointId: context.endpointId,
        method: context.method,
        statusCode: context.statusCode,
        ip: context.ip,
        userAgent: context.userAgent,
        ...context.extra || {}
    });
}
function captureException(error, context) {
    if (!initialized || !Sentry) return;
    if (context) {
        setSentryContext({
            requestId: context.requestId,
            apiKeyId: context.apiKeyId,
            endpoint: context.endpoint,
            method: context.method,
            statusCode: context.statusCode
        });
        if (context.tags) {
            Sentry.setTags(context.tags);
        }
        // Add extra context
        if (context.extra || context.endpointId || context.ip || context.userAgent) {
            Sentry.setContext('request_details', {
                endpointId: context.endpointId,
                ip: context.ip,
                userAgent: context.userAgent,
                ...context.extra || {}
            });
        }
    }
    Sentry.captureException(error);
}
function captureMessage(message, level = 'info', context) {
    if (!initialized || !Sentry) return;
    if (context) {
        setSentryContext({
            requestId: context.requestId,
            apiKeyId: context.apiKeyId,
            endpoint: context.endpoint,
            method: context.method,
            statusCode: context.statusCode
        });
        if (context.tags) {
            Sentry.setTags(context.tags);
        }
        // Add extra context
        if (context.extra || context.endpointId) {
            Sentry.setContext('request_details', {
                endpointId: context.endpointId,
                ...context.extra || {}
            });
        }
    }
    Sentry.captureMessage(message, level);
}
// Auto-initialize on import (for Next.js API routes)
if ("TURBOPACK compile-time truthy", 1) {
    initSentry();
}
}),
];

//# sourceMappingURL=src_lib_sentry_ts_703184ce._.js.map