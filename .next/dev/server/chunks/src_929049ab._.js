module.exports = [
"[project]/src/db/webhook-configs.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// WEBHOOK CONFIGURATIONS DATABASE
// =============================================================================
// Database operations for webhook configurations
__turbopack_context__.s([
    "createWebhookConfig",
    ()=>createWebhookConfig,
    "deleteWebhookConfig",
    ()=>deleteWebhookConfig,
    "getWebhookConfig",
    ()=>getWebhookConfig,
    "getWebhookConfigs",
    ()=>getWebhookConfigs,
    "updateWebhookConfig",
    ()=>updateWebhookConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/query-helper.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
/**
 * Convert database row to WebhookConfig
 */ function rowToConfig(row) {
    return {
        id: row.id,
        endpointId: row.endpoint_id || undefined,
        url: row.url,
        secret: row.secret,
        events: row.events,
        enabled: row.enabled,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}
async function getWebhookConfigs(filters) {
    // Determine if we're using PostgreSQL (uses $1, $2) or SQLite (uses ?)
    const { getDb } = await __turbopack_context__.A("[project]/src/db/client.ts [app-route] (ecmascript, async loader)");
    const db = getDb();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    let query = 'SELECT * FROM webhook_configs WHERE 1=1';
    const params = [];
    let paramIndex = 1;
    if (filters?.apiKeyId) {
        if (isPostgres) {
            query += ` AND api_key_id = $${paramIndex++}`;
        } else {
            query += ' AND api_key_id = ?';
        }
        params.push(filters.apiKeyId);
    }
    if (filters?.endpointId) {
        if (isPostgres) {
            query += ` AND endpoint_id = $${paramIndex++}`;
        } else {
            query += ' AND endpoint_id = ?';
        }
        params.push(filters.endpointId);
    }
    if (filters?.enabled !== undefined) {
        if (isPostgres) {
            query += ` AND enabled = $${paramIndex++}`;
        } else {
            query += ' AND enabled = ?';
        }
        params.push(filters.enabled ? isPostgres ? true : 1 : isPostgres ? false : 0);
    }
    query += ' ORDER BY created_at DESC';
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQuery"])(query, params);
    return rows.map((row)=>({
            ...rowToConfig(row),
            events: typeof row.events === 'string' ? JSON.parse(row.events) : Array.isArray(row.events) ? row.events : []
        }));
}
async function getWebhookConfig(id) {
    const { getDb } = await __turbopack_context__.A("[project]/src/db/client.ts [app-route] (ecmascript, async loader)");
    const db = getDb();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const query = isPostgres ? 'SELECT * FROM webhook_configs WHERE id = $1' : 'SELECT * FROM webhook_configs WHERE id = ?';
    const row = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQueryOne"])(query, [
        id
    ]);
    if (!row) return null;
    return {
        ...rowToConfig(row),
        events: typeof row.events === 'string' ? JSON.parse(row.events) : Array.isArray(row.events) ? row.events : []
    };
}
async function createWebhookConfig(config) {
    const id = config.id || `wh_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const now = new Date().toISOString();
    const { getDb } = await __turbopack_context__.A("[project]/src/db/client.ts [app-route] (ecmascript, async loader)");
    const db = getDb();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const query = isPostgres ? `INSERT INTO webhook_configs (id, api_key_id, endpoint_id, url, secret, events, enabled, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)` : `INSERT INTO webhook_configs (id, api_key_id, endpoint_id, url, secret, events, enabled, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = isPostgres ? [
        id,
        config.apiKeyId,
        config.endpointId || null,
        config.url,
        config.secret,
        JSON.stringify(config.events),
        config.enabled !== false,
        now,
        now
    ] : [
        id,
        config.apiKeyId,
        config.endpointId || null,
        config.url,
        config.secret,
        JSON.stringify(config.events),
        config.enabled !== false ? 1 : 0,
        now,
        now
    ];
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeUpdate"])(query, params);
    return {
        id,
        endpointId: config.endpointId,
        url: config.url,
        secret: config.secret,
        events: config.events,
        enabled: config.enabled !== false,
        createdAt: now,
        updatedAt: now
    };
}
async function updateWebhookConfig(id, updates) {
    const { getDb } = await __turbopack_context__.A("[project]/src/db/client.ts [app-route] (ecmascript, async loader)");
    const db = getDb();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const now = new Date().toISOString();
    const setClauses = [];
    const params = [];
    let paramIndex = 1;
    setClauses.push(isPostgres ? `updated_at = $${paramIndex++}` : 'updated_at = ?');
    params.push(now);
    if (updates.url !== undefined) {
        setClauses.push(isPostgres ? `url = $${paramIndex++}` : 'url = ?');
        params.push(updates.url);
    }
    if (updates.events !== undefined) {
        setClauses.push(isPostgres ? `events = $${paramIndex++}` : 'events = ?');
        params.push(JSON.stringify(updates.events));
    }
    if (updates.enabled !== undefined) {
        setClauses.push(isPostgres ? `enabled = $${paramIndex++}` : 'enabled = ?');
        params.push(updates.enabled ? isPostgres ? true : 1 : isPostgres ? false : 0);
    }
    params.push(id);
    const whereClause = isPostgres ? `$${paramIndex}` : '?';
    const query = `UPDATE webhook_configs SET ${setClauses.join(', ')} WHERE id = ${whereClause}`;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeUpdate"])(query, params);
    return getWebhookConfig(id);
}
async function deleteWebhookConfig(id) {
    const { getDb } = await __turbopack_context__.A("[project]/src/db/client.ts [app-route] (ecmascript, async loader)");
    const db = getDb();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const query = isPostgres ? 'DELETE FROM webhook_configs WHERE id = $1' : 'DELETE FROM webhook_configs WHERE id = ?';
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeUpdate"])(query, [
        id
    ]);
    return (result.rowCount ?? result.changes ?? 0) > 0;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/webhook-config-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// Webhook Config Store
// =============================================================================
// Database-backed store for webhook configurations
// Migrated from in-memory to database for production readiness
__turbopack_context__.s([
    "deleteWebhookConfig",
    ()=>deleteWebhookConfig,
    "getWebhookConfig",
    ()=>getWebhookConfig,
    "getWebhookConfigs",
    ()=>getWebhookConfigs,
    "setWebhookConfig",
    ()=>setWebhookConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$webhook$2d$configs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/webhook-configs.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$webhook$2d$configs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$webhook$2d$configs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function getWebhookConfigs(filters) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$webhook$2d$configs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWebhookConfigs"](filters);
}
async function getWebhookConfig(id) {
    const config = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$webhook$2d$configs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWebhookConfig"](id);
    return config || undefined;
}
async function setWebhookConfig(config) {
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$webhook$2d$configs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWebhookConfig"](config.id);
    if (existing) {
        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$webhook$2d$configs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateWebhookConfig"](config.id, {
            url: config.url,
            events: config.events,
            enabled: config.enabled
        });
        return updated || config;
    } else {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$webhook$2d$configs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWebhookConfig"](config);
    }
}
async function deleteWebhookConfig(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$webhook$2d$configs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteWebhookConfig"](id);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=src_929049ab._.js.map