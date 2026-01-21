module.exports = [
"[project]/node_modules/@upstash/redis/nodejs.mjs [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/node_modules_4baa00a5._.js",
  "server/chunks/[externals]_node:crypto_c20cce38._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/@upstash/redis/nodejs.mjs [app-route] (ecmascript)");
    });
});
}),
"[project]/node_modules/ioredis/built/index.js [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/node_modules_6c0c23d9._.js",
  "server/chunks/[root-of-the-server]__e52cb73c._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/ioredis/built/index.js [app-route] (ecmascript)");
    });
});
}),
"[project]/src/db/client.ts [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[project]/src/db/client.ts [app-route] (ecmascript)");
    });
});
}),
];