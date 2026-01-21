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
"[project]/data/nexflow-discovered.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"crawledAt":"2025-12-26T09:00:00.000Z","actions":[{"domain":"https://www.nexflowapp.app","id":"hello-world","name":"Hello World","description":"Demo endpoint for Nexflow discovery.","category":"utility","endpoint":"https://www.nexflowapp.app/api/nexflow/hello-world","methods":["GET"],"pricing":{"amount":"0.01","asset":"USDC","network":"eip155:8453"},"inputSchema":{"type":"object","properties":{"name":{"type":"string","description":"Name to greet"}}},"outputSchema":{"type":"object","properties":{"message":{"type":"string"}}}},{"domain":"https://www.nexflowapp.app","id":"url-enrich","name":"URL Enrichment","description":"Extract metadata, title, and summary from any URL. Returns enriched data with domain info.","category":"data","endpoint":"https://www.nexflowapp.app/api/v1/metered/url-enrich","methods":["POST"],"pricing":{"amount":"0.01","asset":"USDC","network":"eip155:8453"},"inputSchema":{"type":"object","required":["url"],"properties":{"url":{"type":"string","description":"The URL to enrich (must be valid HTTP/HTTPS)"}}},"outputSchema":{"type":"object","properties":{"url":{"type":"string"},"domain":{"type":"string"},"title":{"type":"string"},"summary":{"type":"string"},"enrichedAt":{"type":"string"},"requestId":{"type":"string"},"x402":{"type":"object","properties":{"verified":{"type":"boolean"},"transactionHash":{"type":"string"},"facilitator":{"type":"string"}}}}}},{"domain":"https://www.nexflowapp.app","id":"paid-agent-run","name":"Paid Agent Run","description":"Calculate pricing for AI agent execution based on model and step count.","category":"compute","endpoint":"https://www.nexflowapp.app/api/demo/paid-agent-run","methods":["GET"],"pricing":{"amount":"0.01","asset":"USDC","network":"eip155:8453","note":"Base price; actual cost varies by model and steps"},"inputSchema":{"type":"object","properties":{"model":{"type":"string","enum":["gpt-small","gpt-large"],"default":"gpt-small"},"maxSteps":{"type":"integer","default":10,"description":"Maximum execution steps"}}},"outputSchema":{"type":"object","properties":{"ok":{"type":"boolean"},"product":{"type":"string"},"model":{"type":"string"},"maxSteps":{"type":"integer"},"amount":{"type":"string"},"currency":{"type":"string"},"description":{"type":"string"}}}},{"domain":"https://discovery.nexflowapp.app","id":"discovery-actions","name":"Discovery: List Actions","description":"Discover all available x402-enabled actions across Nexflow providers.","category":"discovery","endpoint":"https://discovery.nexflowapp.app/api/discovery/actions","methods":["GET"],"pricing":{"amount":"0","asset":"USDC","network":"eip155:8453"},"inputSchema":{"type":"object","properties":{"category":{"type":"string","description":"Filter by category"},"domain":{"type":"string","description":"Filter by provider domain"},"network":{"type":"string","description":"Filter by payment network"}}},"outputSchema":{"type":"object","properties":{"crawledAt":{"type":"string"},"actions":{"type":"array"}}}},{"domain":"https://discovery.nexflowapp.app","id":"discovery-providers","name":"Discovery: List Providers","description":"Get all x402-enabled providers grouped with their action counts.","category":"discovery","endpoint":"https://discovery.nexflowapp.app/api/discovery/providers","methods":["GET"],"pricing":{"amount":"0","asset":"USDC","network":"eip155:8453"},"inputSchema":{"type":"object","properties":{}},"outputSchema":{"type":"object","properties":{"crawledAt":{"type":"string"},"providerCount":{"type":"integer"},"providers":{"type":"array"}}}}]});}),
"[project]/src/app/api/discovery/actions/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$nexflow$2d$discovered$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/nexflow-discovered.json (json)");
;
;
async function GET(req) {
    try {
        const data = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$nexflow$2d$discovered$2e$json__$28$json$29$__["default"];
        // Optional query param filtering
        const { searchParams } = new URL(req.url);
        const domain = searchParams.get("domain");
        const network = searchParams.get("network");
        const category = searchParams.get("category");
        let filteredActions = data.actions;
        if (domain) {
            filteredActions = filteredActions.filter((a)=>a.domain === domain);
        }
        if (network) {
            filteredActions = filteredActions.filter((a)=>a.pricing?.network === network);
        }
        if (category) {
            filteredActions = filteredActions.filter((a)=>a.category === category);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            crawledAt: data.crawledAt,
            actions: filteredActions
        });
    } catch (error) {
        console.error("Failed to load actions:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to load actions"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a5b9e005._.js.map