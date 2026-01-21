module.exports = [
"[project]/src/db/client.ts [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[project]/src/db/client.ts [app-route] (ecmascript)");
    });
});
}),
"[project]/src/integrations/x402/facilitators/facilitator-router.ts [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/src_integrations_x402_payment-header-parser_ts_a5a1b7c5._.js",
  "server/chunks/src_bb53717a._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/integrations/x402/facilitators/facilitator-router.ts [app-route] (ecmascript)");
    });
});
}),
];