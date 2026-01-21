module.exports = [
"[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseAndVerifyPaymentHeader",
    ()=>parseAndVerifyPaymentHeader,
    "parseX402Header",
    ()=>parseX402Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$cdp$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/cdp-facilitator.ts [app-route] (ecmascript)");
;
function parseX402Header(headerValue) {
    try {
        // Validate header is not empty
        if (!headerValue || headerValue.trim().length === 0) {
            return {
                valid: false,
                error: 'Payment header is empty'
            };
        }
        // Check for placeholder values
        if (headerValue.includes('<your_payment_header>') || headerValue.includes('<placeholder>')) {
            return {
                valid: false,
                error: 'Payment header contains placeholder value. Please provide a real x402 payment header.'
            };
        }
        // Remove 'x402 ' prefix if present
        const cleanHeader = headerValue.startsWith('x402 ') ? headerValue.slice(5).trim() : headerValue.trim();
        if (cleanHeader.length === 0) {
            return {
                valid: false,
                error: 'Payment header value is empty after removing prefix'
            };
        }
        // Decode base64 (works in both Node.js and browser environments)
        let decoded;
        try {
            decoded = ("TURBOPACK compile-time truthy", 1) ? Buffer.from(cleanHeader, 'base64').toString('utf-8') : "TURBOPACK unreachable";
        } catch (base64Error) {
            return {
                valid: false,
                error: `Invalid base64 encoding: ${base64Error instanceof Error ? base64Error.message : 'Failed to decode base64'}`
            };
        }
        // Parse JSON
        let payload;
        try {
            payload = JSON.parse(decoded);
        } catch (jsonError) {
            return {
                valid: false,
                error: `Invalid JSON in payment header: ${jsonError instanceof Error ? jsonError.message : 'Failed to parse JSON'}. Decoded value: ${decoded.substring(0, 100)}`
            };
        }
        // Validate required fields
        if (!payload.signature) {
            return {
                valid: false,
                error: 'Missing signature in payment header'
            };
        }
        if (!payload.authorization) {
            return {
                valid: false,
                error: 'Missing authorization in payment header'
            };
        }
        const auth = payload.authorization;
        if (!auth.from || !auth.to || !auth.value || !auth.nonce) {
            return {
                valid: false,
                error: 'Incomplete authorization fields'
            };
        }
        return {
            valid: true,
            parsed: {
                invoiceId: payload.invoiceId || auth.nonce,
                txHash: payload.txHash,
                signature: payload.signature,
                authorization: {
                    from: auth.from,
                    to: auth.to,
                    value: auth.value,
                    validAfter: auth.validAfter || Math.floor(Date.now() / 1000).toString(),
                    validBefore: auth.validBefore || (Math.floor(Date.now() / 1000) + 300).toString(),
                    nonce: auth.nonce
                },
                network: payload.network || 'base'
            }
        };
    } catch (error) {
        return {
            valid: false,
            error: error instanceof Error ? error.message : 'Failed to parse payment header'
        };
    }
}
async function parseAndVerifyPaymentHeader(headerValue) {
    try {
        // Parse the header
        const parseResult = parseX402Header(headerValue);
        if (!parseResult.valid || !parseResult.parsed) {
            return {
                valid: false,
                error: parseResult.error || 'Invalid payment header format'
            };
        }
        const parsed = parseResult.parsed;
        // Create CDP verify request
        const verifyRequest = {
            payment: headerValue,
            paymentPayload: {
                x402Version: 1,
                scheme: 'x402',
                network: parsed.network || 'base',
                payload: {
                    signature: parsed.signature,
                    authorization: parsed.authorization
                }
            }
        };
        // Verify with CDP
        const cdp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$cdp$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCDPFacilitator"])();
        const verifyResult = await cdp.verifyPayment(verifyRequest);
        if (!verifyResult.valid || !verifyResult.success) {
            return {
                valid: false,
                error: verifyResult.error || 'Payment verification failed'
            };
        }
        return {
            valid: true,
            payment: parsed,
            transactionHash: verifyResult.transactionHash
        };
    } catch (error) {
        return {
            valid: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}
}),
];

//# sourceMappingURL=src_integrations_x402_payment-header-parser_ts_db7a382b._.js.map