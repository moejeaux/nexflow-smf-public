module.exports = [
"[project]/src/db/client.ts [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[project]/src/db/client.ts [app-route] (ecmascript)");
    });
});
}),
"[project]/src/lib/webhook-queue.ts [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/src_lib_webhook-queue_ts_cdea9e52._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/lib/webhook-queue.ts [app-route] (ecmascript)");
    });
});
}),
"[project]/src/lib/webhook-config-store.ts [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/src_db_client_ts_07876ac1._.js",
  "server/chunks/src_929049ab._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/lib/webhook-config-store.ts [app-route] (ecmascript)");
    });
});
}),
];