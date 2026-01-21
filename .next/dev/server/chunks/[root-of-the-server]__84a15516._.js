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
"[externals]/better-sqlite3 [external] (better-sqlite3, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("better-sqlite3", () => require("better-sqlite3"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/src/db/adapters/sqlite-adapter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// SQLITE ADAPTER
// =============================================================================
// SQLite implementation of DatabaseAdapter
// Wraps existing better-sqlite3 code for adapter pattern
__turbopack_context__.s([
    "SqliteAdapter",
    ()=>SqliteAdapter
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
;
;
;
// Re-export the schema initialization from metered-endpoints
function initializeSchema(db) {
    // Endpoints table
    db.exec(`
    CREATE TABLE IF NOT EXISTS endpoints (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      upstream_url TEXT NOT NULL,
      price TEXT NOT NULL,
      network TEXT NOT NULL DEFAULT 'base',
      token_address TEXT NOT NULL,
      token_symbol TEXT NOT NULL DEFAULT 'USDC',
      chain_id INTEGER NOT NULL DEFAULT 8453,
      recipient_address TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      created_by TEXT
    )
  `);
    // Migration: Add recipient_address column if it doesn't exist
    try {
        const tableInfo = db.prepare("PRAGMA table_info(endpoints)").all();
        const hasRecipientAddress = tableInfo.some((col)=>col.name === 'recipient_address');
        if (!hasRecipientAddress) {
            db.exec(`ALTER TABLE endpoints ADD COLUMN recipient_address TEXT`);
            console.log('[db] Added recipient_address column');
        }
    } catch (error) {
        if (!error.message?.includes('duplicate column name') && !error.message?.includes('no such column')) {
            console.warn('[db] Migration warning:', error.message);
        }
    }
    // Payments table
    db.exec(`
    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      endpoint_id TEXT NOT NULL,
      tx_hash TEXT NOT NULL UNIQUE,
      from_address TEXT NOT NULL,
      to_address TEXT NOT NULL,
      amount TEXT NOT NULL,
      token_address TEXT NOT NULL,
      network TEXT NOT NULL,
      verified_at TEXT NOT NULL,
      kyt_status TEXT,
      ofac_status TEXT,
      facilitator TEXT NOT NULL DEFAULT 'cdp',
      FOREIGN KEY (endpoint_id) REFERENCES endpoints(id)
    )
  `);
    // Usage logs table
    db.exec(`
    CREATE TABLE IF NOT EXISTS usage_logs (
      id TEXT PRIMARY KEY,
      endpoint_id TEXT NOT NULL,
      payment_id TEXT,
      timestamp TEXT NOT NULL,
      method TEXT NOT NULL,
      path TEXT NOT NULL,
      status_code INTEGER NOT NULL,
      response_time INTEGER NOT NULL,
      units INTEGER NOT NULL DEFAULT 1,
      ip_address TEXT,
      user_agent TEXT,
      FOREIGN KEY (endpoint_id) REFERENCES endpoints(id),
      FOREIGN KEY (payment_id) REFERENCES payments(id)
    )
  `);
    // API keys table
    db.exec(`
    CREATE TABLE IF NOT EXISTS api_keys (
      id TEXT PRIMARY KEY,
      key_hash TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user', 'read-only')),
      user_id TEXT,
      rate_limit INTEGER DEFAULT 1000,
      last_used_at TEXT,
      last_used_ip TEXT,
      expires_at TEXT,
      x402_demo_calls_used INTEGER DEFAULT 0,
      x402_demo_calls_limit INTEGER DEFAULT 200,
      x402_demo_amount_used TEXT DEFAULT '0',
      x402_demo_amount_limit TEXT DEFAULT '1000000',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      revoked_at TEXT
    )
  `);
    // Indexes
    db.exec(`
    CREATE INDEX IF NOT EXISTS idx_payments_endpoint_id ON payments(endpoint_id);
    CREATE INDEX IF NOT EXISTS idx_payments_tx_hash ON payments(tx_hash);
    CREATE INDEX IF NOT EXISTS idx_payments_verified_at ON payments(verified_at);
    CREATE INDEX IF NOT EXISTS idx_usage_logs_endpoint_id ON usage_logs(endpoint_id);
    CREATE INDEX IF NOT EXISTS idx_usage_logs_timestamp ON usage_logs(timestamp);
    CREATE INDEX IF NOT EXISTS idx_usage_logs_payment_id ON usage_logs(payment_id);
    CREATE INDEX IF NOT EXISTS idx_endpoints_status ON endpoints(status);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_api_keys_key_hash ON api_keys(key_hash);
    CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
    CREATE INDEX IF NOT EXISTS idx_api_keys_role ON api_keys(role);
    CREATE INDEX IF NOT EXISTS idx_api_keys_revoked_at ON api_keys(revoked_at);
  `);
}
class SqliteAdapter {
    db;
    constructor(dbPath){
        const DB_PATH = dbPath || __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'metered-endpoints.db');
        // Ensure data directory exists
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(DB_PATH))) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(DB_PATH), {
                recursive: true
            });
        }
        this.db = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$29$__["default"](DB_PATH);
        this.db.pragma('journal_mode = WAL');
        // Initialize schema
        initializeSchema(this.db);
    }
    async healthCheck() {
        try {
            this.db.prepare('SELECT 1').get();
            return true;
        } catch  {
            return false;
        }
    }
    // =============================================================================
    // ENDPOINTS
    // =============================================================================
    async createEndpoint(endpoint) {
        const id = endpoint.id || `ep_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const now = new Date().toISOString();
        this.db.prepare(`
      INSERT INTO endpoints (
        id, name, description, upstream_url, price, network, token_address,
        token_symbol, chain_id, recipient_address, status, created_at, updated_at, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, endpoint.name, endpoint.description || null, endpoint.upstreamUrl, endpoint.price, endpoint.network, endpoint.tokenAddress, endpoint.tokenSymbol, endpoint.chainId, endpoint.recipientAddress, endpoint.status, now, now, endpoint.createdBy || null);
        return Promise.resolve({
            ...endpoint,
            id,
            createdAt: now,
            updatedAt: now
        });
    }
    async getEndpoint(endpointId) {
        const row = this.db.prepare('SELECT * FROM endpoints WHERE id = ? AND status != ?').get(endpointId, 'deleted');
        if (!row) return Promise.resolve(null);
        return Promise.resolve(this.mapRowToEndpoint(row));
    }
    async listEndpoints(filters) {
        let query = 'SELECT * FROM endpoints WHERE status != ?';
        const params = [
            'deleted'
        ];
        if (filters?.status) {
            query += ' AND status = ?';
            params.push(filters.status);
        }
        if (filters?.createdBy) {
            query += ' AND created_by = ?';
            params.push(filters.createdBy);
        }
        query += ' ORDER BY created_at DESC';
        const rows = this.db.prepare(query).all(...params);
        return Promise.resolve(rows.map((row)=>this.mapRowToEndpoint(row)));
    }
    async updateEndpoint(endpointId, updates) {
        const allowedFields = [
            'name',
            'description',
            'upstreamUrl',
            'price',
            'network',
            'tokenAddress',
            'tokenSymbol',
            'chainId',
            'recipientAddress',
            'status'
        ];
        const setClauses = [];
        const values = [];
        for (const [key, value] of Object.entries(updates)){
            if (allowedFields.includes(key) && value !== undefined) {
                const dbKey = key === 'upstreamUrl' ? 'upstream_url' : key === 'tokenAddress' ? 'token_address' : key === 'tokenSymbol' ? 'token_symbol' : key === 'chainId' ? 'chain_id' : key === 'recipientAddress' ? 'recipient_address' : key === 'createdAt' ? 'created_at' : key === 'updatedAt' ? 'updated_at' : key === 'createdBy' ? 'created_by' : key;
                setClauses.push(`${dbKey} = ?`);
                values.push(value);
            }
        }
        if (setClauses.length === 0) {
            return this.getEndpoint(endpointId);
        }
        setClauses.push('updated_at = ?');
        values.push(new Date().toISOString());
        values.push(endpointId);
        this.db.prepare(`UPDATE endpoints SET ${setClauses.join(', ')} WHERE id = ?`).run(...values);
        return this.getEndpoint(endpointId);
    }
    async deleteEndpoint(endpointId) {
        const result = this.db.prepare('UPDATE endpoints SET status = ?, updated_at = ? WHERE id = ?').run('deleted', new Date().toISOString(), endpointId);
        return Promise.resolve(result.changes > 0);
    }
    // =============================================================================
    // PAYMENTS
    // =============================================================================
    async createPayment(payment) {
        const id = `pay_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const verifiedAt = new Date().toISOString();
        this.db.prepare(`
      INSERT INTO payments (
        id, endpoint_id, tx_hash, from_address, to_address, amount,
        token_address, network, verified_at, kyt_status, ofac_status, facilitator
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, payment.endpointId, payment.txHash, payment.fromAddress, payment.toAddress, payment.amount, payment.tokenAddress, payment.network, verifiedAt, payment.kytStatus || null, payment.ofacStatus || null, payment.facilitator);
        return Promise.resolve({
            ...payment,
            id,
            verifiedAt
        });
    }
    async getPayment(paymentId) {
        const row = this.db.prepare('SELECT * FROM payments WHERE id = ?').get(paymentId);
        if (!row) return Promise.resolve(null);
        return Promise.resolve(this.mapRowToPayment(row));
    }
    async getPaymentByTxHash(txHash) {
        const row = this.db.prepare('SELECT * FROM payments WHERE tx_hash = ?').get(txHash);
        if (!row) return Promise.resolve(null);
        return Promise.resolve(this.mapRowToPayment(row));
    }
    async listPayments(filters) {
        let query = 'SELECT * FROM payments WHERE 1=1';
        const params = [];
        if (filters?.endpointId) {
            query += ' AND endpoint_id = ?';
            params.push(filters.endpointId);
        }
        if (filters?.fromAddress) {
            query += ' AND from_address = ?';
            params.push(filters.fromAddress);
        }
        query += ' ORDER BY verified_at DESC';
        const rows = this.db.prepare(query).all(...params);
        return Promise.resolve(rows.map((row)=>this.mapRowToPayment(row)));
    }
    async getPaymentsForEndpoint(endpointId, limit = 100) {
        const rows = this.db.prepare('SELECT * FROM payments WHERE endpoint_id = ? ORDER BY verified_at DESC LIMIT ?').all(endpointId, limit);
        return Promise.resolve(rows.map((row)=>this.mapRowToPayment(row)));
    }
    // =============================================================================
    // USAGE LOGS
    // =============================================================================
    async createUsageLog(log) {
        const id = `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const timestamp = new Date().toISOString();
        // Add tracing columns if they don't exist (migration support)
        try {
            this.db.exec(`
        ALTER TABLE usage_logs ADD COLUMN conversation_id TEXT;
        ALTER TABLE usage_logs ADD COLUMN agent_id TEXT;
        ALTER TABLE usage_logs ADD COLUMN x402_tx_hash TEXT;
        ALTER TABLE usage_logs ADD COLUMN failure_code TEXT;
      `);
        } catch (e) {
            // Columns may already exist, ignore error
            if (!e.message?.includes('duplicate column')) {
                console.warn('[SQLite] Migration warning:', e.message);
            }
        }
        try {
            this.db.prepare(`
        INSERT INTO usage_logs (
          id, endpoint_id, payment_id, timestamp, method, path,
          status_code, response_time, units, ip_address, user_agent,
          conversation_id, agent_id, x402_tx_hash, failure_code
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(id, log.endpointId, log.paymentId || null, timestamp, log.method, log.path, log.statusCode, log.responseTime, log.units, log.ipAddress || null, log.userAgent || null, log.conversationId || null, log.agentId || null, log.x402TxHash || null, log.failureCode || null);
        } catch (dbError) {
            // Log full error details for debugging
            const errorInfo = {
                message: dbError.message || String(dbError),
                code: dbError.code || 'unknown',
                errno: dbError.errno,
                sql: dbError.sql,
                endpointId: log.endpointId,
                table: 'usage_logs'
            };
            console.error('[SQLite] Insert error details:', JSON.stringify(errorInfo, null, 2));
            // Re-throw with more context
            throw new Error(`SQLite insert failed: ${dbError.message || String(dbError)}. ` + `Table: usage_logs, EndpointId: ${log.endpointId}, ` + `Error code: ${dbError.code || 'unknown'}, ` + `SQL: ${dbError.sql || 'N/A'}`);
        }
        return Promise.resolve({
            ...log,
            id,
            timestamp
        });
    }
    async listUsageLogs(filters) {
        let query = 'SELECT * FROM usage_logs WHERE 1=1';
        const params = [];
        if (filters?.endpointId) {
            query += ' AND endpoint_id = ?';
            params.push(filters.endpointId);
        }
        if (filters?.paymentId) {
            query += ' AND payment_id = ?';
            params.push(filters.paymentId);
        }
        query += ' ORDER BY timestamp DESC LIMIT 1000';
        const rows = this.db.prepare(query).all(...params);
        return Promise.resolve(rows.map((row)=>this.mapRowToUsageLog(row)));
    }
    async getUsageStats(endpointId, startDate, endDate) {
        let query = `
      SELECT
        COUNT(*) as total_requests,
        COUNT(DISTINCT payment_id) as total_payments,
        COALESCE(SUM(CAST(p.amount AS INTEGER)), 0) as total_revenue,
        COALESCE(AVG(response_time), 0) as avg_response_time
      FROM usage_logs ul
      LEFT JOIN payments p ON ul.payment_id = p.id
      WHERE ul.endpoint_id = ?
    `;
        const params = [
            endpointId
        ];
        if (startDate) {
            query += ' AND ul.timestamp >= ?';
            params.push(startDate);
        }
        if (endDate) {
            query += ' AND ul.timestamp <= ?';
            params.push(endDate);
        }
        const row = this.db.prepare(query).get(...params);
        return Promise.resolve({
            totalRequests: row.total_requests || 0,
            totalPayments: row.total_payments || 0,
            totalRevenue: row.total_revenue?.toString() || '0',
            averageResponseTime: row.avg_response_time || 0
        });
    }
    // =============================================================================
    // HELPERS
    // =============================================================================
    mapRowToEndpoint(row) {
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            upstreamUrl: row.upstream_url,
            price: row.price,
            network: row.network,
            tokenAddress: row.token_address,
            tokenSymbol: row.token_symbol,
            chainId: row.chain_id,
            recipientAddress: row.recipient_address,
            status: row.status,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            createdBy: row.created_by
        };
    }
    mapRowToPayment(row) {
        return {
            id: row.id,
            endpointId: row.endpoint_id,
            txHash: row.tx_hash,
            fromAddress: row.from_address,
            toAddress: row.to_address,
            amount: row.amount,
            tokenAddress: row.token_address,
            network: row.network,
            verifiedAt: row.verified_at,
            kytStatus: row.kyt_status,
            ofacStatus: row.ofac_status,
            facilitator: row.facilitator
        };
    }
    mapRowToUsageLog(row) {
        return {
            id: row.id,
            endpointId: row.endpoint_id,
            paymentId: row.payment_id,
            timestamp: row.timestamp,
            method: row.method,
            path: row.path,
            statusCode: row.status_code,
            responseTime: row.response_time,
            units: row.units,
            ipAddress: row.ip_address,
            userAgent: row.user_agent,
            conversationId: row.conversation_id,
            agentId: row.agent_id,
            x402TxHash: row.x402_tx_hash,
            failureCode: row.failure_code
        };
    }
    // =============================================================================
    // API KEYS
    // =============================================================================
    async createApiKey(apiKey) {
        this.db.prepare(`INSERT INTO api_keys (id, key_hash, name, role, user_id, rate_limit, expires_at, x402_demo_calls_used, x402_demo_calls_limit, x402_demo_amount_used, x402_demo_amount_limit, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(apiKey.id, apiKey.keyHash, apiKey.name, apiKey.role, apiKey.userId || null, apiKey.rateLimit, apiKey.expiresAt || null, apiKey.x402DemoCallsUsed || 0, apiKey.x402DemoCallsLimit || 200, apiKey.x402DemoAmountUsed || '0', apiKey.x402DemoAmountLimit || '1000000', apiKey.createdAt, apiKey.updatedAt);
        return this.findApiKeyByHash(apiKey.keyHash);
    }
    async findApiKeyByHash(keyHash) {
        const row = this.db.prepare(`SELECT * FROM api_keys WHERE key_hash = ? AND revoked_at IS NULL`).get(keyHash);
        if (!row) return null;
        return {
            id: row.id,
            keyHash: row.key_hash,
            name: row.name,
            role: row.role,
            userId: row.user_id,
            rateLimit: row.rate_limit,
            lastUsedAt: row.last_used_at,
            lastUsedIp: row.last_used_ip,
            expiresAt: row.expires_at,
            x402DemoCallsUsed: row.x402_demo_calls_used || 0,
            x402DemoCallsLimit: row.x402_demo_calls_limit || 200,
            x402DemoAmountUsed: row.x402_demo_amount_used || '0',
            x402DemoAmountLimit: row.x402_demo_amount_limit || '1000000',
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            revokedAt: row.revoked_at
        };
    }
    async updateApiKeyLastUsed(keyId, ipAddress) {
        const now = new Date().toISOString();
        this.db.prepare(`UPDATE api_keys SET last_used_at = ?, last_used_ip = ?, updated_at = ? WHERE id = ?`).run(now, ipAddress || null, now, keyId);
    }
    async updateApiKeyX402DemoAllowance(keyId, callsUsed, amountUsed) {
        const now = new Date().toISOString();
        this.db.prepare(`UPDATE api_keys SET x402_demo_calls_used = ?, x402_demo_amount_used = ?, updated_at = ? WHERE id = ?`).run(callsUsed, amountUsed, now, keyId);
    }
    async updateApiKeyX402DemoLimits(keyId, callsLimit, amountLimit) {
        const now = new Date().toISOString();
        if (callsLimit !== undefined && amountLimit !== undefined) {
            this.db.prepare(`UPDATE api_keys SET x402_demo_calls_limit = ?, x402_demo_amount_limit = ?, updated_at = ? WHERE id = ?`).run(callsLimit, amountLimit, now, keyId);
        } else if (callsLimit !== undefined) {
            this.db.prepare(`UPDATE api_keys SET x402_demo_calls_limit = ?, updated_at = ? WHERE id = ?`).run(callsLimit, now, keyId);
        } else if (amountLimit !== undefined) {
            this.db.prepare(`UPDATE api_keys SET x402_demo_amount_limit = ?, updated_at = ? WHERE id = ?`).run(amountLimit, now, keyId);
        }
    }
    async revokeApiKey(keyId) {
        const now = new Date().toISOString();
        const result = this.db.prepare(`UPDATE api_keys SET revoked_at = ?, updated_at = ? WHERE id = ? AND revoked_at IS NULL`).run(now, now, keyId);
        return result.changes > 0;
    }
    async listApiKeys(userId) {
        let query = `SELECT * FROM api_keys WHERE revoked_at IS NULL`;
        const params = [];
        if (userId) {
            query += ` AND user_id = ?`;
            params.push(userId);
        }
        query += ` ORDER BY created_at DESC`;
        const rows = this.db.prepare(query).all(...params);
        return Promise.resolve(rows.map((row)=>({
                id: row.id,
                keyHash: row.key_hash,
                name: row.name,
                role: row.role,
                userId: row.user_id,
                rateLimit: row.rate_limit,
                lastUsedAt: row.last_used_at,
                lastUsedIp: row.last_used_ip,
                expiresAt: row.expires_at,
                x402DemoCallsUsed: row.x402_demo_calls_used || 0,
                x402DemoCallsLimit: row.x402_demo_calls_limit || 200,
                x402DemoAmountUsed: row.x402_demo_amount_used || '0',
                x402DemoAmountLimit: row.x402_demo_amount_limit || '1000000',
                createdAt: row.created_at,
                updatedAt: row.updated_at,
                revokedAt: row.revoked_at
            })));
    }
    close() {
        this.db.close();
    }
}
}),
"[externals]/pg [external] (pg, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/db/adapters/postgres-adapter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// POSTGRESQL ADAPTER
// =============================================================================
// PostgreSQL implementation of DatabaseAdapter
// Uses pg (node-postgres) with connection pooling
__turbopack_context__.s([
    "PostgresAdapter",
    ()=>PostgresAdapter
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
// =============================================================================
// CONFIGURATION
// =============================================================================
/**
 * Database configuration with sensible defaults
 * Can be overridden via environment variables
 */ const DB_CONFIG = {
    // Pool settings
    maxPoolSize: parseInt(process.env.DB_POOL_MAX || '20', 10),
    minPoolSize: parseInt(process.env.DB_POOL_MIN || '2', 10),
    idleTimeoutMs: parseInt(process.env.DB_IDLE_TIMEOUT_MS || '30000', 10),
    connectionTimeoutMs: parseInt(process.env.DB_CONNECTION_TIMEOUT_MS || '5000', 10),
    maxLifetimeMs: parseInt(process.env.DB_MAX_LIFETIME_MS || '1800000', 10),
    // Query settings
    statementTimeoutMs: parseInt(process.env.DB_STATEMENT_TIMEOUT_MS || '30000', 10),
    queryTimeoutMs: parseInt(process.env.DB_QUERY_TIMEOUT_MS || '30000', 10),
    // Retry settings
    acquireRetries: parseInt(process.env.DB_ACQUIRE_RETRIES || '3', 10),
    acquireRetryDelayMs: parseInt(process.env.DB_ACQUIRE_RETRY_DELAY_MS || '100', 10)
};
class PostgresAdapter {
    pool;
    statementTimeoutMs;
    constructor(connectionString){
        this.statementTimeoutMs = DB_CONFIG.statementTimeoutMs;
        this.pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
            connectionString,
            // Pool size configuration
            max: DB_CONFIG.maxPoolSize,
            min: DB_CONFIG.minPoolSize,
            // Timeout configuration
            idleTimeoutMillis: DB_CONFIG.idleTimeoutMs,
            connectionTimeoutMillis: DB_CONFIG.connectionTimeoutMs,
            // Connection lifetime (prevents stale connections)
            maxLifetimeSeconds: Math.floor(DB_CONFIG.maxLifetimeMs / 1000),
            // Enable keep-alive to detect dead connections
            keepAlive: true,
            keepAliveInitialDelayMillis: 10000,
            // Application name for monitoring
            application_name: process.env.APP_NAME || 'nexflow-api'
        });
        // Handle pool errors
        this.pool.on('error', (err)=>{
            console.error('[PostgresAdapter] Unexpected pool error:', err);
        });
        // Log pool connection events in development
        if ("TURBOPACK compile-time truthy", 1) {
            this.pool.on('connect', (client)=>{
                console.log('[PostgresAdapter] New client connected to pool');
            });
            this.pool.on('remove', (client)=>{
                console.log('[PostgresAdapter] Client removed from pool');
            });
        }
        console.log('[PostgresAdapter] Pool initialized:', {
            maxSize: DB_CONFIG.maxPoolSize,
            minSize: DB_CONFIG.minPoolSize,
            statementTimeoutMs: this.statementTimeoutMs,
            maxLifetimeMs: DB_CONFIG.maxLifetimeMs
        });
    }
    /**
   * Execute a query with statement timeout
   * This wraps all queries to ensure they don't run forever
   */ async queryWithTimeout(text, params, timeoutMs) {
        const timeout = timeoutMs || this.statementTimeoutMs;
        const client = await this.pool.connect();
        try {
            // Set statement timeout for this session
            await client.query(`SET statement_timeout = ${timeout}`);
            // Execute the actual query
            const result = await client.query(text, params);
            return result;
        } finally{
            // Always release the client back to the pool
            client.release();
        }
    }
    /**
   * Get pool statistics for monitoring
   */ getPoolStats() {
        return {
            totalCount: this.pool.totalCount,
            idleCount: this.pool.idleCount,
            waitingCount: this.pool.waitingCount
        };
    }
    /**
   * Simple query method that uses default timeout
   * For most queries, this is all you need
   */ async query(text, params) {
        return this.queryWithTimeout(text, params);
    }
    async healthCheck() {
        try {
            // Use a short timeout for health checks (5 seconds)
            const result = await this.queryWithTimeout('SELECT 1', [], 5000);
            return result.rows.length > 0;
        } catch (error) {
            console.error('[PostgresAdapter] Health check failed:', error);
            return false;
        }
    }
    // =============================================================================
    // ENDPOINTS
    // =============================================================================
    async createEndpoint(endpoint) {
        const id = endpoint.id || `ep_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const now = new Date().toISOString();
        const result = await this.query(`INSERT INTO endpoints (
        id, name, description, upstream_url, price, network, token_address,
        token_symbol, chain_id, recipient_address, status, created_at, updated_at, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`, [
            id,
            endpoint.name,
            endpoint.description || null,
            endpoint.upstreamUrl,
            endpoint.price,
            endpoint.network,
            endpoint.tokenAddress,
            endpoint.tokenSymbol,
            endpoint.chainId,
            endpoint.recipientAddress,
            endpoint.status,
            now,
            now,
            endpoint.createdBy || null
        ]);
        return this.mapRowToEndpoint(result.rows[0]);
    }
    async getEndpoint(endpointId) {
        const result = await this.query('SELECT * FROM endpoints WHERE id = $1 AND status != $2', [
            endpointId,
            'deleted'
        ]);
        if (result.rows.length === 0) return null;
        return this.mapRowToEndpoint(result.rows[0]);
    }
    async listEndpoints(filters) {
        let query = 'SELECT * FROM endpoints WHERE status != $1';
        const params = [
            'deleted'
        ];
        let paramIndex = 2;
        if (filters?.status) {
            query += ` AND status = $${paramIndex}`;
            params.push(filters.status);
            paramIndex++;
        }
        if (filters?.createdBy) {
            query += ` AND created_by = $${paramIndex}`;
            params.push(filters.createdBy);
            paramIndex++;
        }
        query += ' ORDER BY created_at DESC';
        try {
            const result = await this.query(query, params);
            return result.rows.map((row)=>this.mapRowToEndpoint(row));
        } catch (error) {
            console.error('[PostgresAdapter] listEndpoints error:', error);
            console.error('[PostgresAdapter] Query:', query);
            console.error('[PostgresAdapter] Params:', params);
            throw error;
        }
    }
    async updateEndpoint(endpointId, updates) {
        const allowedFields = [
            'name',
            'description',
            'upstreamUrl',
            'price',
            'network',
            'tokenAddress',
            'tokenSymbol',
            'chainId',
            'recipientAddress',
            'status'
        ];
        const setClauses = [];
        const values = [];
        let paramIndex = 1;
        for (const [key, value] of Object.entries(updates)){
            if (allowedFields.includes(key) && value !== undefined) {
                const dbKey = key === 'upstreamUrl' ? 'upstream_url' : key === 'tokenAddress' ? 'token_address' : key === 'tokenSymbol' ? 'token_symbol' : key === 'chainId' ? 'chain_id' : key === 'recipientAddress' ? 'recipient_address' : key === 'createdAt' ? 'created_at' : key === 'updatedAt' ? 'updated_at' : key === 'createdBy' ? 'created_by' : key;
                setClauses.push(`${dbKey} = $${paramIndex}`);
                values.push(value);
                paramIndex++;
            }
        }
        if (setClauses.length === 0) {
            return this.getEndpoint(endpointId);
        }
        setClauses.push(`updated_at = $${paramIndex}`);
        values.push(new Date().toISOString());
        paramIndex++;
        values.push(endpointId);
        const result = await this.query(`UPDATE endpoints SET ${setClauses.join(', ')} WHERE id = $${paramIndex} RETURNING *`, values);
        if (result.rows.length === 0) return null;
        return this.mapRowToEndpoint(result.rows[0]);
    }
    async deleteEndpoint(endpointId) {
        const result = await this.query('UPDATE endpoints SET status = $1, updated_at = $2 WHERE id = $3', [
            'deleted',
            new Date().toISOString(),
            endpointId
        ]);
        return result.rowCount !== null && result.rowCount > 0;
    }
    // =============================================================================
    // PAYMENTS
    // =============================================================================
    async createPayment(payment) {
        const id = `pay_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const now = new Date().toISOString();
        const verifiedAt = now;
        // Generate invoice_id if not provided (required by schema)
        const invoiceId = `inv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        // Determine currency and token symbol from token address or default to USDC
        // For USDC on Base: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
        const currency = payment.tokenAddress === '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' ? 'USDC' : 'USDC';
        const token = payment.tokenAddress; // token column stores the token address
        // Set default status for verified payments
        const status = 'verified'; // Payment is verified and completed
        const result = await this.query(`INSERT INTO payments (
        id, endpoint_id, invoice_id, tx_hash, from_address, to_address, amount,
        currency, token, token_address, network, status, created_at, verified_at, kyt_status, ofac_status, facilitator
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *`, [
            id,
            payment.endpointId,
            invoiceId,
            payment.txHash,
            payment.fromAddress,
            payment.toAddress,
            payment.amount,
            currency,
            token,
            payment.tokenAddress,
            payment.network,
            status,
            now,
            verifiedAt,
            payment.kytStatus || null,
            payment.ofacStatus || null,
            payment.facilitator
        ]);
        return this.mapRowToPayment(result.rows[0]);
    }
    async getPayment(paymentId) {
        const result = await this.query('SELECT * FROM payments WHERE id = $1', [
            paymentId
        ]);
        if (result.rows.length === 0) return null;
        return this.mapRowToPayment(result.rows[0]);
    }
    async getPaymentByTxHash(txHash) {
        const result = await this.query('SELECT * FROM payments WHERE tx_hash = $1', [
            txHash
        ]);
        if (result.rows.length === 0) return null;
        return this.mapRowToPayment(result.rows[0]);
    }
    async listPayments(filters) {
        let query = 'SELECT * FROM payments WHERE 1=1';
        const params = [];
        let paramIndex = 1;
        if (filters?.endpointId) {
            query += ` AND endpoint_id = $${paramIndex}`;
            params.push(filters.endpointId);
            paramIndex++;
        }
        if (filters?.fromAddress) {
            query += ` AND from_address = $${paramIndex}`;
            params.push(filters.fromAddress);
            paramIndex++;
        }
        query += ' ORDER BY verified_at DESC';
        const result = await this.query(query, params);
        return result.rows.map((row)=>this.mapRowToPayment(row));
    }
    async getPaymentsForEndpoint(endpointId, limit = 100) {
        const result = await this.query('SELECT * FROM payments WHERE endpoint_id = $1 ORDER BY verified_at DESC LIMIT $2', [
            endpointId,
            limit
        ]);
        return result.rows.map((row)=>this.mapRowToPayment(row));
    }
    // =============================================================================
    // USAGE LOGS
    // =============================================================================
    async createUsageLog(log) {
        const id = `log_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const timestamp = new Date().toISOString();
        const result = await this.query(`INSERT INTO usage_logs (
        id, endpoint_id, payment_id, timestamp, method, path,
        status_code, response_time, units, ip_address, user_agent,
        conversation_id, agent_id, x402_tx_hash, failure_code
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`, [
            id,
            log.endpointId,
            log.paymentId || null,
            timestamp,
            log.method,
            log.path,
            log.statusCode,
            log.responseTime,
            log.units,
            log.ipAddress || null,
            log.userAgent || null,
            log.conversationId || null,
            log.agentId || null,
            log.x402TxHash || null,
            log.failureCode || null
        ]);
        return this.mapRowToUsageLog(result.rows[0]);
    }
    async listUsageLogs(filters) {
        let query = 'SELECT * FROM usage_logs WHERE 1=1';
        const params = [];
        let paramIndex = 1;
        if (filters?.endpointId) {
            query += ` AND endpoint_id = $${paramIndex}`;
            params.push(filters.endpointId);
            paramIndex++;
        }
        if (filters?.paymentId) {
            query += ` AND payment_id = $${paramIndex}`;
            params.push(filters.paymentId);
            paramIndex++;
        }
        query += ' ORDER BY timestamp DESC LIMIT 1000';
        const result = await this.query(query, params);
        return result.rows.map((row)=>this.mapRowToUsageLog(row));
    }
    async getUsageStats(endpointId, startDate, endDate) {
        let query = `
      SELECT
        COUNT(*) as total_requests,
        COUNT(DISTINCT payment_id) as total_payments,
        COALESCE(SUM(p.amount), '0') as total_revenue,
        COALESCE(AVG(response_time), 0) as avg_response_time
      FROM usage_logs ul
      LEFT JOIN payments p ON ul.payment_id = p.id
      WHERE ul.endpoint_id = $1
    `;
        const params = [
            endpointId
        ];
        let paramIndex = 2;
        if (startDate) {
            query += ` AND ul.timestamp >= $${paramIndex}`;
            params.push(startDate);
            paramIndex++;
        }
        if (endDate) {
            query += ` AND ul.timestamp <= $${paramIndex}`;
            params.push(endDate);
            paramIndex++;
        }
        const result = await this.query(query, params);
        const row = result.rows[0];
        return {
            totalRequests: parseInt(row.total_requests) || 0,
            totalPayments: parseInt(row.total_payments) || 0,
            totalRevenue: row.total_revenue || '0',
            averageResponseTime: parseFloat(row.avg_response_time) || 0
        };
    }
    // =============================================================================
    // HELPERS
    // =============================================================================
    mapRowToEndpoint(row) {
        return {
            id: row.id,
            name: row.name,
            description: row.description,
            upstreamUrl: row.upstream_url,
            price: row.price,
            network: row.network,
            tokenAddress: row.token_address,
            tokenSymbol: row.token_symbol,
            chainId: row.chain_id,
            recipientAddress: row.recipient_address,
            status: row.status,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            createdBy: row.created_by
        };
    }
    mapRowToPayment(row) {
        return {
            id: row.id,
            endpointId: row.endpoint_id,
            txHash: row.tx_hash,
            fromAddress: row.from_address,
            toAddress: row.to_address,
            amount: row.amount,
            tokenAddress: row.token_address,
            network: row.network,
            verifiedAt: row.verified_at,
            kytStatus: row.kyt_status,
            ofacStatus: row.ofac_status,
            facilitator: row.facilitator
        };
    }
    mapRowToUsageLog(row) {
        return {
            id: row.id,
            endpointId: row.endpoint_id,
            paymentId: row.payment_id,
            timestamp: row.timestamp,
            method: row.method,
            path: row.path,
            statusCode: row.status_code,
            responseTime: row.response_time,
            units: row.units,
            ipAddress: row.ip_address,
            userAgent: row.user_agent,
            conversationId: row.conversation_id,
            agentId: row.agent_id,
            x402TxHash: row.x402_tx_hash,
            failureCode: row.failure_code
        };
    }
    // =============================================================================
    // API KEYS
    // =============================================================================
    async createApiKey(apiKey) {
        await this.query(`INSERT INTO api_keys (id, key_hash, name, role, user_id, rate_limit, expires_at, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
            apiKey.id,
            apiKey.keyHash,
            apiKey.name,
            apiKey.role,
            apiKey.userId || null,
            apiKey.rateLimit,
            apiKey.expiresAt || null,
            apiKey.createdAt,
            apiKey.updatedAt
        ]);
        return this.findApiKeyByHash(apiKey.keyHash);
    }
    async findApiKeyByHash(keyHash) {
        const result = await this.query(`SELECT * FROM api_keys WHERE key_hash = $1 AND revoked_at IS NULL`, [
            keyHash
        ]);
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return {
            id: row.id,
            keyHash: row.key_hash,
            name: row.name,
            role: row.role,
            userId: row.user_id,
            rateLimit: row.rate_limit,
            lastUsedAt: row.last_used_at,
            lastUsedIp: row.last_used_ip,
            expiresAt: row.expires_at,
            x402DemoCallsUsed: row.x402_demo_calls_used || 0,
            x402DemoCallsLimit: row.x402_demo_calls_limit || 200,
            x402DemoAmountUsed: row.x402_demo_amount_used || '0',
            x402DemoAmountLimit: row.x402_demo_amount_limit || '1000000',
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            revokedAt: row.revoked_at
        };
    }
    async updateApiKeyLastUsed(keyId, ipAddress) {
        await this.query(`UPDATE api_keys SET last_used_at = NOW(), last_used_ip = $2, updated_at = NOW() WHERE id = $1`, [
            keyId,
            ipAddress || null
        ]);
    }
    async updateApiKeyX402DemoAllowance(keyId, callsUsed, amountUsed) {
        await this.query(`UPDATE api_keys SET x402_demo_calls_used = $2, x402_demo_amount_used = $3, updated_at = NOW() WHERE id = $1`, [
            keyId,
            callsUsed,
            amountUsed
        ]);
    }
    async updateApiKeyX402DemoLimits(keyId, callsLimit, amountLimit) {
        if (callsLimit !== undefined && amountLimit !== undefined) {
            await this.query(`UPDATE api_keys SET x402_demo_calls_limit = $2, x402_demo_amount_limit = $3, updated_at = NOW() WHERE id = $1`, [
                keyId,
                callsLimit,
                amountLimit
            ]);
        } else if (callsLimit !== undefined) {
            await this.query(`UPDATE api_keys SET x402_demo_calls_limit = $2, updated_at = NOW() WHERE id = $1`, [
                keyId,
                callsLimit
            ]);
        } else if (amountLimit !== undefined) {
            await this.query(`UPDATE api_keys SET x402_demo_amount_limit = $2, updated_at = NOW() WHERE id = $1`, [
                keyId,
                amountLimit
            ]);
        }
    }
    async revokeApiKey(keyId) {
        const result = await this.query(`UPDATE api_keys SET revoked_at = NOW(), updated_at = NOW() WHERE id = $1 AND revoked_at IS NULL`, [
            keyId
        ]);
        return result.rowCount > 0;
    }
    async listApiKeys(userId) {
        let query = `SELECT * FROM api_keys WHERE revoked_at IS NULL`;
        const params = [];
        if (userId) {
            query += ` AND user_id = $1`;
            params.push(userId);
        }
        query += ` ORDER BY created_at DESC`;
        const result = await this.query(query, params);
        return result.rows.map((row)=>({
                id: row.id,
                keyHash: row.key_hash,
                name: row.name,
                role: row.role,
                userId: row.user_id,
                rateLimit: row.rate_limit,
                lastUsedAt: row.last_used_at,
                lastUsedIp: row.last_used_ip,
                expiresAt: row.expires_at,
                x402DemoCallsUsed: row.x402_demo_calls_used || 0,
                x402DemoCallsLimit: row.x402_demo_calls_limit || 200,
                x402DemoAmountUsed: row.x402_demo_amount_used || '0',
                x402DemoAmountLimit: row.x402_demo_amount_limit || '1000000',
                createdAt: row.created_at,
                updatedAt: row.updated_at,
                revokedAt: row.revoked_at
            }));
    }
    async close() {
        await this.pool.end();
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// DATABASE CLIENT FACTORY
// =============================================================================
// Automatically selects SQLite (dev) or PostgreSQL (prod) based on environment
//
// Configuration (environment variables):
// - DATABASE_URL: PostgreSQL connection string (required for prod)
//
// PostgreSQL Pool Settings:
// - DB_POOL_MAX: Maximum pool size (default: 20)
// - DB_POOL_MIN: Minimum pool size (default: 2)
// - DB_IDLE_TIMEOUT_MS: Idle connection timeout (default: 30000)
// - DB_CONNECTION_TIMEOUT_MS: Connection acquisition timeout (default: 5000)
// - DB_MAX_LIFETIME_MS: Max connection lifetime (default: 1800000 = 30min)
//
// Query Settings:
// - DB_STATEMENT_TIMEOUT_MS: Query timeout (default: 30000)
__turbopack_context__.s([
    "closeDb",
    ()=>closeDb,
    "getDb",
    ()=>getDb,
    "getPoolStats",
    ()=>getPoolStats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$adapters$2f$sqlite$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/adapters/sqlite-adapter.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$adapters$2f$postgres$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/adapters/postgres-adapter.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$adapters$2f$postgres$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$adapters$2f$postgres$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
let dbAdapter = null;
function getDb() {
    if (dbAdapter) {
        return dbAdapter;
    }
    const databaseUrl = process.env.DATABASE_URL;
    if (databaseUrl && databaseUrl.startsWith('postgresql://')) {
        // Production: Use PostgreSQL
        console.log('[db] Using PostgreSQL adapter');
        dbAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$adapters$2f$postgres$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostgresAdapter"](databaseUrl);
    } else {
        // Development: Use SQLite
        console.log('[db] Using SQLite adapter (development mode)');
        dbAdapter = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$adapters$2f$sqlite$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SqliteAdapter"]();
    }
    return dbAdapter;
}
function getPoolStats() {
    if (!dbAdapter) {
        return null;
    }
    if (dbAdapter instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$adapters$2f$postgres$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostgresAdapter"]) {
        return dbAdapter.getPoolStats();
    }
    return null;
}
async function closeDb() {
    if (dbAdapter) {
        if ('close' in dbAdapter && typeof dbAdapter.close === 'function') {
            await dbAdapter.close();
        }
        dbAdapter = null;
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/metered-endpoints.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// METERED ENDPOINTS DATABASE
// =============================================================================
// Database layer for metered endpoints, payments, and usage tracking
// Uses adapter pattern: SQLite (dev) or PostgreSQL (prod)
__turbopack_context__.s([
    "createEndpoint",
    ()=>createEndpoint,
    "createPayment",
    ()=>createPayment,
    "createUsageLog",
    ()=>createUsageLog,
    "deleteEndpoint",
    ()=>deleteEndpoint,
    "getEndpoint",
    ()=>getEndpoint,
    "getPayment",
    ()=>getPayment,
    "getPaymentByTxHash",
    ()=>getPaymentByTxHash,
    "getPaymentsForEndpoint",
    ()=>getPaymentsForEndpoint,
    "getUsageStats",
    ()=>getUsageStats,
    "listEndpoints",
    ()=>listEndpoints,
    "listPayments",
    ()=>listPayments,
    "listUsageLogs",
    ()=>listUsageLogs,
    "updateEndpoint",
    ()=>updateEndpoint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/client.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function createEndpoint(endpoint) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.createEndpoint(endpoint);
}
async function getEndpoint(endpointId) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.getEndpoint(endpointId);
}
async function listEndpoints(filters) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.listEndpoints(filters);
}
async function updateEndpoint(endpointId, updates) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.updateEndpoint(endpointId, updates);
}
async function deleteEndpoint(endpointId) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.deleteEndpoint(endpointId);
}
async function createPayment(payment) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.createPayment(payment);
}
async function getPayment(paymentId) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.getPayment(paymentId);
}
async function getPaymentByTxHash(txHash) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.getPaymentByTxHash(txHash);
}
async function listPayments(filters) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.listPayments(filters);
}
async function getPaymentsForEndpoint(endpointId, limit = 100) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.getPaymentsForEndpoint(endpointId, limit);
}
async function createUsageLog(log) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.createUsageLog(log);
}
async function listUsageLogs(filters) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.listUsageLogs(filters);
}
async function getUsageStats(endpointId, startDate, endDate) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.getUsageStats(endpointId, startDate, endDate);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/upstream-proxy.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Upstream Proxy
 * 
 * Forwards requests to customer upstream URLs after payment verification
 */ __turbopack_context__.s([
    "proxyRequest",
    ()=>proxyRequest
]);
async function proxyRequest(options) {
    const startTime = Date.now();
    const timeout = options.timeout || 30000; // 30 second default timeout
    try {
        // Prepare headers (exclude host and connection headers)
        const proxyHeaders = {};
        options.headers.forEach((value, key)=>{
            const lowerKey = key.toLowerCase();
            // Skip headers that shouldn't be forwarded
            if (lowerKey !== 'host' && lowerKey !== 'connection' && lowerKey !== 'x-payment' && // Don't forward payment header to upstream
            lowerKey !== 'x-forwarded-host') {
                proxyHeaders[key] = value;
            }
        });
        // Add forwarded headers
        proxyHeaders['X-Forwarded-For'] = options.headers.get('x-forwarded-for') || 'unknown';
        proxyHeaders['X-Forwarded-Proto'] = options.headers.get('x-forwarded-proto') || 'https';
        // Create fetch request with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), timeout);
        try {
            const response = await fetch(options.upstreamUrl, {
                method: options.method,
                headers: proxyHeaders,
                body: options.body || undefined,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            // Read response body
            const body = await response.text();
            // Convert response headers to object
            const responseHeaders = {};
            response.headers.forEach((value, key)=>{
                responseHeaders[key] = value;
            });
            const responseTime = Date.now() - startTime;
            return {
                success: response.ok,
                statusCode: response.status,
                headers: responseHeaders,
                body,
                responseTime
            };
        } catch (fetchError) {
            clearTimeout(timeoutId);
            throw fetchError;
        }
    } catch (error) {
        const responseTime = Date.now() - startTime;
        if (error instanceof Error && error.name === 'AbortError') {
            return {
                success: false,
                statusCode: 504,
                headers: {},
                body: JSON.stringify({
                    error: 'Upstream timeout'
                }),
                responseTime,
                error: 'Request timeout'
            };
        }
        return {
            success: false,
            statusCode: 502,
            headers: {},
            body: JSON.stringify({
                error: 'Upstream error',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
            responseTime,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}
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
"[project]/src/lib/request-id.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
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
    const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])(context);
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
"[project]/src/lib/rate-limit-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// RATE LIMIT STORE
// =============================================================================
// Pluggable backing store for rate limiting with Upstash Redis support and in-memory fallback.
// Supports distributed rate limiting across serverless instances.
//
// Environment Variables:
// - UPSTASH_REDIS_REST_URL: Upstash Redis REST URL (from Vercel integration)
// - UPSTASH_REDIS_REST_TOKEN: Upstash Redis REST token (from Vercel integration)
__turbopack_context__.s([
    "getEdgeRateLimitStore",
    ()=>getEdgeRateLimitStore,
    "getRateLimitStore",
    ()=>getRateLimitStore,
    "resetRateLimitStore",
    ()=>resetRateLimitStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'RateLimitStore'
});
// =============================================================================
// IN-MEMORY STORE (fallback)
// =============================================================================
class InMemoryStore {
    store = new Map();
    cleanupInterval = null;
    constructor(){
        // Cleanup every 5 minutes
        if (typeof setInterval !== 'undefined') {
            this.cleanupInterval = setInterval(()=>this.cleanup(), 5 * 60 * 1000);
        }
    }
    cleanup() {
        const now = Date.now();
        const keysToDelete = [];
        this.store.forEach((value, key)=>{
            if (value.resetAt < now) {
                keysToDelete.push(key);
            }
        });
        keysToDelete.forEach((key)=>this.store.delete(key));
    }
    async get(key) {
        const entry = this.store.get(key);
        if (!entry || entry.resetAt < Date.now()) {
            return null;
        }
        return entry;
    }
    async set(key, entry) {
        this.store.set(key, entry);
    }
    async increment(key, windowMs) {
        const now = Date.now();
        const existing = this.store.get(key);
        if (!existing || existing.resetAt < now) {
            const entry = {
                count: 1,
                resetAt: now + windowMs
            };
            this.store.set(key, entry);
            return entry;
        }
        existing.count++;
        this.store.set(key, existing);
        return existing;
    }
}
// =============================================================================
// UPSTASH REDIS STORE (distributed)
// =============================================================================
class UpstashRedisStore {
    redis;
    constructor(redisClient){
        this.redis = redisClient;
    }
    async get(key) {
        try {
            const data = await this.redis.get(`ratelimit:${key}`);
            if (!data) return null;
            // Upstash returns parsed JSON automatically if it's a JSON string
            const entry = typeof data === 'string' ? JSON.parse(data) : data;
            if (entry.resetAt < Date.now()) return null;
            return entry;
        } catch (error) {
            logger.error({
                error,
                key
            }, 'Upstash Redis GET failed');
            return null;
        }
    }
    async set(key, entry) {
        try {
            const ttlMs = Math.max(entry.resetAt - Date.now(), 1000);
            const ttlSeconds = Math.ceil(ttlMs / 1000);
            await this.redis.set(`ratelimit:${key}`, JSON.stringify(entry), {
                ex: ttlSeconds
            });
        } catch (error) {
            logger.error({
                error,
                key
            }, 'Upstash Redis SET failed');
        }
    }
    async increment(key, windowMs) {
        try {
            const redisKey = `ratelimit:${key}`;
            const now = Date.now();
            // Get current entry
            const data = await this.redis.get(redisKey);
            let count = 1;
            let resetAt = now + windowMs;
            if (data) {
                const entry = typeof data === 'string' ? JSON.parse(data) : data;
                if (entry.resetAt > now) {
                    count = entry.count + 1;
                    resetAt = entry.resetAt;
                }
            }
            const newEntry = {
                count,
                resetAt
            };
            const ttlMs = resetAt - now;
            const ttlSeconds = Math.ceil(ttlMs / 1000);
            await this.redis.set(redisKey, JSON.stringify(newEntry), {
                ex: ttlSeconds
            });
            return newEntry;
        } catch (error) {
            logger.error({
                error,
                key
            }, 'Upstash Redis INCR failed');
            // Fallback: return a permissive entry
            return {
                count: 1,
                resetAt: Date.now() + windowMs
            };
        }
    }
}
// =============================================================================
// STORE FACTORY
// =============================================================================
let storeInstance = null;
async function getRateLimitStore() {
    if (storeInstance) {
        return storeInstance;
    }
    // Check for Upstash Redis environment variables (set by Vercel integration)
    const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (upstashUrl && upstashToken) {
        try {
            // Dynamic import to avoid build issues
            const { Redis } = await __turbopack_context__.A("[project]/node_modules/@upstash/redis/nodejs.mjs [app-route] (ecmascript, async loader)");
            const redis = new Redis({
                url: upstashUrl,
                token: upstashToken
            });
            // Test connection
            await redis.ping();
            logger.info('Rate limit store using Upstash Redis');
            storeInstance = new UpstashRedisStore(redis);
            return storeInstance;
        } catch (error) {
            logger.warn({
                error
            }, 'Upstash Redis connection failed, falling back to in-memory');
        }
    }
    // Legacy support: check for REDIS_URL (ioredis)
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl) {
        try {
            const { Redis } = await __turbopack_context__.A("[project]/node_modules/ioredis/built/index.js [app-route] (ecmascript, async loader)");
            const redis = new Redis(redisUrl, {
                maxRetriesPerRequest: 3,
                enableReadyCheck: true,
                connectTimeout: 5000,
                lazyConnect: true
            });
            await redis.connect();
            logger.info('Rate limit store using Redis (ioredis)');
            // Use a simple wrapper that matches UpstashRedisStore behavior
            storeInstance = {
                async get (key) {
                    const data = await redis.get(`ratelimit:${key}`);
                    if (!data) return null;
                    const entry = JSON.parse(data);
                    if (entry.resetAt < Date.now()) return null;
                    return entry;
                },
                async set (key, entry) {
                    const ttlMs = Math.max(entry.resetAt - Date.now(), 1000);
                    await redis.set(`ratelimit:${key}`, JSON.stringify(entry), 'PX', ttlMs);
                },
                async increment (key, windowMs) {
                    const now = Date.now();
                    const redisKey = `ratelimit:${key}`;
                    const data = await redis.get(redisKey);
                    let count = 1;
                    let resetAt = now + windowMs;
                    if (data) {
                        const entry = JSON.parse(data);
                        if (entry.resetAt > now) {
                            count = entry.count + 1;
                            resetAt = entry.resetAt;
                        }
                    }
                    const newEntry = {
                        count,
                        resetAt
                    };
                    const ttlMs = resetAt - now;
                    await redis.set(redisKey, JSON.stringify(newEntry), 'PX', ttlMs);
                    return newEntry;
                }
            };
            return storeInstance;
        } catch (error) {
            logger.warn({
                error
            }, 'Redis connection failed, falling back to in-memory');
        }
    }
    logger.info('Rate limit store using in-memory (non-distributed)');
    storeInstance = new InMemoryStore();
    return storeInstance;
}
function getEdgeRateLimitStore() {
    // Edge runtime uses in-memory for sync access
    // For async Edge operations, use getRateLimitStore()
    if (!storeInstance) {
        storeInstance = new InMemoryStore();
    }
    return storeInstance;
}
function resetRateLimitStore() {
    storeInstance = null;
}
}),
"[project]/src/lib/rate-limit-unified.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// UNIFIED RATE LIMITING
// =============================================================================
// Single implementation for both Edge and Node.js environments.
// Supports distributed rate limiting via Redis with in-memory fallback.
__turbopack_context__.s([
    "RATE_LIMIT_TIERS",
    ()=>RATE_LIMIT_TIERS,
    "addRateLimitHeaders",
    ()=>addRateLimitHeaders,
    "checkAllRateLimits",
    ()=>checkAllRateLimits,
    "checkAllRateLimitsEdge",
    ()=>checkAllRateLimitsEdge,
    "createRateLimitResponse",
    ()=>createRateLimitResponse,
    "extractApiKey",
    ()=>extractApiKey,
    "getClientIp",
    ()=>getClientIp,
    "getRateLimitHeaders",
    ()=>getRateLimitHeaders,
    "getRateLimitHeadersEdge",
    ()=>getRateLimitHeadersEdge,
    "getRateLimitMetrics",
    ()=>getRateLimitMetrics,
    "rateLimitByApiKey",
    ()=>rateLimitByApiKey,
    "rateLimitByApiKeyEdge",
    ()=>rateLimitByApiKeyEdge,
    "rateLimitByEndpoint",
    ()=>rateLimitByEndpoint,
    "rateLimitByEndpointEdge",
    ()=>rateLimitByEndpointEdge,
    "rateLimitByIp",
    ()=>rateLimitByIp,
    "rateLimitByIpEdge",
    ()=>rateLimitByIpEdge,
    "rateLimitCronJob",
    ()=>rateLimitCronJob,
    "resetRateLimitMetrics",
    ()=>resetRateLimitMetrics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rate-limit-store.ts [app-route] (ecmascript)");
;
;
const RATE_LIMIT_TIERS = {
    // Per-IP global limits
    global: {
        name: 'global',
        windowMs: 60 * 60 * 1000,
        maxRequests: 1000
    },
    // Per-endpoint limits (per IP, per minute)
    endpoint: {
        name: 'endpoint',
        windowMs: 60 * 1000,
        maxRequests: 100
    },
    // API key tiers (per hour)
    free: {
        name: 'free',
        windowMs: 60 * 60 * 1000,
        maxRequests: 100
    },
    starter: {
        name: 'starter',
        windowMs: 60 * 60 * 1000,
        maxRequests: 1000
    },
    pro: {
        name: 'pro',
        windowMs: 60 * 60 * 1000,
        maxRequests: 5000
    },
    enterprise: {
        name: 'enterprise',
        windowMs: 60 * 60 * 1000,
        maxRequests: 50000
    },
    // Cron job rate limiting (per minute)
    cron: {
        name: 'cron',
        windowMs: 60 * 1000,
        maxRequests: 1
    }
};
const metrics = {
    requests: new Map(),
    blocked: new Map(),
    latencies: new Map(),
    lastReset: Date.now()
};
const MAX_LATENCY_SAMPLES = 100;
const METRICS_RESET_INTERVAL_MS = 60 * 60 * 1000; // 1 hour
/**
 * Record a rate limit check
 */ function recordMetric(type, allowed, latencyMs) {
    // Reset metrics hourly
    const now = Date.now();
    if (now - metrics.lastReset > METRICS_RESET_INTERVAL_MS) {
        metrics.requests.clear();
        metrics.blocked.clear();
        metrics.latencies.clear();
        metrics.lastReset = now;
    }
    // Record request
    const key = type;
    metrics.requests.set(key, (metrics.requests.get(key) || 0) + 1);
    // Record blocked
    if (!allowed) {
        metrics.blocked.set(key, (metrics.blocked.get(key) || 0) + 1);
    }
    // Record latency (keep last N samples)
    let latencies = metrics.latencies.get(key);
    if (!latencies) {
        latencies = [];
        metrics.latencies.set(key, latencies);
    }
    latencies.push(latencyMs);
    if (latencies.length > MAX_LATENCY_SAMPLES) {
        latencies.shift();
    }
}
/**
 * Calculate percentile from sorted array
 */ function percentile(sorted, p) {
    if (sorted.length === 0) return 0;
    const idx = Math.ceil(sorted.length * p) - 1;
    return sorted[Math.max(0, Math.min(idx, sorted.length - 1))];
}
function getRateLimitMetrics() {
    const byType = {};
    let totalRequests = 0;
    let totalBlocked = 0;
    const types = new Set([
        ...metrics.requests.keys(),
        ...metrics.blocked.keys()
    ]);
    for (const type of types){
        const requests = metrics.requests.get(type) || 0;
        const blocked = metrics.blocked.get(type) || 0;
        const latencies = metrics.latencies.get(type) || [];
        totalRequests += requests;
        totalBlocked += blocked;
        // Calculate latency percentiles
        const sorted = [
            ...latencies
        ].sort((a, b)=>a - b);
        byType[type] = {
            total: requests,
            blocked,
            blockRate: requests > 0 ? (blocked / requests * 100).toFixed(2) + '%' : '0%',
            latency: {
                p50: Math.round(percentile(sorted, 0.5)),
                p95: Math.round(percentile(sorted, 0.95)),
                p99: Math.round(percentile(sorted, 0.99))
            }
        };
    }
    return {
        byType,
        totals: {
            requests: totalRequests,
            blocked: totalBlocked,
            blockRate: totalRequests > 0 ? (totalBlocked / totalRequests * 100).toFixed(2) + '%' : '0%'
        },
        lastReset: new Date(metrics.lastReset).toISOString()
    };
}
function resetRateLimitMetrics() {
    metrics.requests.clear();
    metrics.blocked.clear();
    metrics.latencies.clear();
    metrics.lastReset = Date.now();
}
function extractApiKey(request) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return null;
    if (authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7).trim();
    }
    return authHeader.trim();
}
function getClientIp(request) {
    return request.ip || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}
/**
 * Hash a string for use as rate limit key (don't store full API keys)
 */ function hashKey(key) {
    // Use first 16 chars as identifier (safe for rate limiting)
    return key.substring(0, 16);
}
// =============================================================================
// CORE RATE LIMIT CHECK
// =============================================================================
/**
 * Check rate limit against a store
 */ async function checkRateLimitAsync(store, config, metricType) {
    const start = Date.now();
    const entry = await store.increment(config.identifier, config.windowMs);
    const allowed = entry.count <= config.maxRequests;
    const remaining = Math.max(0, config.maxRequests - entry.count);
    // Record metrics if type provided
    if (metricType) {
        recordMetric(metricType, allowed, Date.now() - start);
    }
    return {
        allowed,
        remaining,
        resetAt: entry.resetAt,
        limit: config.maxRequests
    };
}
/**
 * Synchronous check for Edge runtime
 */ function checkRateLimitSync(store, config) {
    const now = Date.now();
    const key = config.identifier;
    // Note: This is a simplified sync version that may not be perfectly accurate
    // but works for Edge runtime where we can't await
    const resetAt = now + config.windowMs;
    return {
        allowed: true,
        remaining: config.maxRequests,
        resetAt,
        limit: config.maxRequests
    };
}
async function rateLimitByApiKey(request, apiKeyRateLimit) {
    const token = extractApiKey(request);
    if (!token) return null;
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRateLimitStore"])();
    const limit = apiKeyRateLimit || RATE_LIMIT_TIERS.starter.maxRequests;
    return checkRateLimitAsync(store, {
        windowMs: RATE_LIMIT_TIERS.starter.windowMs,
        maxRequests: limit,
        identifier: `api_key:${hashKey(token)}`
    }, 'api_key');
}
async function rateLimitByEndpoint(request, endpointId, maxRequests) {
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRateLimitStore"])();
    const ip = getClientIp(request);
    return checkRateLimitAsync(store, {
        windowMs: RATE_LIMIT_TIERS.endpoint.windowMs,
        maxRequests: maxRequests || RATE_LIMIT_TIERS.endpoint.maxRequests,
        identifier: `endpoint:${endpointId}:${ip}`
    }, `endpoint:${endpointId}`);
}
async function rateLimitByIp(request, maxRequests) {
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRateLimitStore"])();
    const ip = getClientIp(request);
    return checkRateLimitAsync(store, {
        windowMs: RATE_LIMIT_TIERS.global.windowMs,
        maxRequests: maxRequests || RATE_LIMIT_TIERS.global.maxRequests,
        identifier: `global:${ip}`
    }, 'global');
}
async function rateLimitCronJob(cronId, intervalMs) {
    const store = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRateLimitStore"])();
    return checkRateLimitAsync(store, {
        windowMs: intervalMs || RATE_LIMIT_TIERS.cron.windowMs,
        maxRequests: RATE_LIMIT_TIERS.cron.maxRequests,
        identifier: `cron:${cronId}`
    }, `cron:${cronId}`);
}
function rateLimitByIpEdge(request, maxRequests) {
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEdgeRateLimitStore"])();
    const ip = getClientIp(request);
    return checkRateLimitSync(store, {
        windowMs: RATE_LIMIT_TIERS.global.windowMs,
        maxRequests: maxRequests || RATE_LIMIT_TIERS.global.maxRequests,
        identifier: `global:${ip}`
    });
}
function rateLimitByApiKeyEdge(request, defaultLimit) {
    const token = extractApiKey(request);
    if (!token) return null;
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEdgeRateLimitStore"])();
    return checkRateLimitSync(store, {
        windowMs: RATE_LIMIT_TIERS.starter.windowMs,
        maxRequests: defaultLimit || RATE_LIMIT_TIERS.starter.maxRequests,
        identifier: `api_key:${hashKey(token)}`
    });
}
function addRateLimitHeaders(response, result) {
    response.headers.set('X-RateLimit-Limit', result.limit.toString());
    response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
    response.headers.set('X-RateLimit-Reset', new Date(result.resetAt).toISOString());
    return response;
}
function createRateLimitResponse(result) {
    const resetDate = new Date(result.resetAt).toISOString();
    const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000);
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Rate limit exceeded',
        code: 'RATE_LIMIT_EXCEEDED',
        message: `Too many requests. Limit: ${result.limit} per hour. Try again after ${resetDate}`,
        retryAfter
    }, {
        status: 429
    });
    response.headers.set('Retry-After', retryAfter.toString());
    return addRateLimitHeaders(response, result);
}
async function checkAllRateLimits(request, options) {
    // 1. Global IP limit
    const globalResult = await rateLimitByIp(request);
    if (!globalResult.allowed) {
        return {
            result: globalResult,
            type: 'global'
        };
    }
    // 2. API key limit (if authenticated)
    const apiKeyResult = await rateLimitByApiKey(request, options?.apiKeyRateLimit);
    if (apiKeyResult && !apiKeyResult.allowed) {
        return {
            result: apiKeyResult,
            type: 'api_key'
        };
    }
    // 3. Endpoint limit (if specified)
    if (options?.endpointId) {
        const endpointResult = await rateLimitByEndpoint(request, options.endpointId);
        if (!endpointResult.allowed) {
            return {
                result: endpointResult,
                type: 'endpoint'
            };
        }
    }
    return null;
}
async function getRateLimitHeaders(request, endpointId) {
    const results = [];
    // Global IP limit
    const globalResult = await rateLimitByIp(request);
    results.push(globalResult);
    // API key limit
    const apiKeyResult = await rateLimitByApiKey(request);
    if (apiKeyResult) {
        results.push(apiKeyResult);
    }
    // Endpoint limit
    if (endpointId) {
        const endpointResult = await rateLimitByEndpoint(request, endpointId);
        results.push(endpointResult);
    }
    // Return the most restrictive (lowest remaining)
    if (results.length === 0) {
        return null;
    }
    return results.reduce((min, current)=>current.remaining < min.remaining ? current : min);
}
function rateLimitByEndpointEdge(request, endpointId, maxRequests) {
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEdgeRateLimitStore"])();
    const ip = getClientIp(request);
    return checkRateLimitSync(store, {
        windowMs: RATE_LIMIT_TIERS.endpoint.windowMs,
        maxRequests: maxRequests || RATE_LIMIT_TIERS.endpoint.maxRequests,
        identifier: `endpoint:${endpointId}:${ip}`
    });
}
function checkAllRateLimitsEdge(request, endpointId) {
    // 1. Global IP limit
    const globalResult = rateLimitByIpEdge(request);
    if (!globalResult.allowed) {
        return {
            result: globalResult,
            type: 'global'
        };
    }
    // 2. API key limit (Edge uses default limit)
    const apiKeyResult = rateLimitByApiKeyEdge(request);
    if (apiKeyResult && !apiKeyResult.allowed) {
        return {
            result: apiKeyResult,
            type: 'api_key'
        };
    }
    // 3. Endpoint limit (if specified)
    if (endpointId) {
        const endpointResult = rateLimitByEndpointEdge(request, endpointId);
        if (!endpointResult.allowed) {
            return {
                result: endpointResult,
                type: 'endpoint'
            };
        }
    }
    return null;
}
function getRateLimitHeadersEdge(request, endpointId) {
    const results = [];
    // Global IP limit
    results.push(rateLimitByIpEdge(request));
    // API key limit
    const apiKeyResult = rateLimitByApiKeyEdge(request);
    if (apiKeyResult) {
        results.push(apiKeyResult);
    }
    // Endpoint limit
    if (endpointId) {
        results.push(rateLimitByEndpointEdge(request, endpointId));
    }
    // Return the most restrictive (lowest remaining)
    if (results.length === 0) {
        return null;
    }
    return results.reduce((min, current)=>current.remaining < min.remaining ? current : min);
}
}),
"[project]/src/integrations/x402/discovery-metadata.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// DISCOVERY METADATA HELPERS
// =============================================================================
// Helpers for declaring Bazaar discovery metadata
// Note: @x402 packages may not be available - this module handles missing dependencies gracefully
__turbopack_context__.s([
    "createDiscoveryMetadata",
    ()=>createDiscoveryMetadata,
    "getEndpointDiscoveryInfo",
    ()=>getEndpointDiscoveryInfo
]);
// Lazy load x402 packages
async function loadBazaarExtension() {
    try {
        const { declareDiscoveryExtension } = await __turbopack_context__.A("[project]/node_modules/@x402/extensions/dist/esm/bazaar/index.mjs [app-route] (ecmascript, async loader)");
        return declareDiscoveryExtension;
    } catch (error) {
        // Return a stub function if package is not available
        return (config)=>({
                ...config,
                _stub: true
            });
    }
}
async function createDiscoveryMetadata(endpoint) {
    // Determine if this is a GET or POST endpoint based on typical usage
    // Most metered endpoints are POST, but we can make it configurable later
    const method = 'POST';
    const bodyType = 'json'; // Most endpoints accept JSON
    // Create output schema based on endpoint description
    // This is a generic schema - can be customized per endpoint
    const outputSchema = {
        type: 'object',
        properties: {
            data: {
                type: 'object',
                description: 'Response data from upstream service'
            },
            timestamp: {
                type: 'string',
                format: 'date-time',
                description: 'Response timestamp'
            }
        }
    };
    // Example output based on endpoint type
    const outputExample = {
        data: {},
        timestamp: new Date().toISOString()
    };
    // If endpoint has a specific description, use it to create better examples
    if (endpoint.description?.toLowerCase().includes('revenue')) {
        outputExample.data = {
            revenue: 0.01,
            currency: 'USDC',
            period: 'daily'
        };
    } else if (endpoint.description?.toLowerCase().includes('health')) {
        outputExample.data = {
            status: 'healthy',
            uptime: 99.9
        };
    }
    // Declare discovery extension
    const declareExt = await loadBazaarExtension();
    return declareExt({
        // Input schema (for POST endpoints with body)
        inputSchema: {
            type: 'object',
            properties: {
            },
            additionalProperties: true
        },
        bodyType: bodyType,
        // Output schema and example
        output: {
            example: outputExample,
            schema: outputSchema
        }
    });
}
function getEndpointDiscoveryInfo(endpoint) {
    const baseUrl = ("TURBOPACK compile-time value", "https://www.nexflowapp.app") || 'http://localhost:3001';
    const resourceUrl = `${baseUrl}/api/v1/metered/${endpoint.id}`;
    return {
        url: resourceUrl,
        type: 'http',
        method: 'POST',
        x402Version: 1,
        accepts: [
            {
                scheme: 'exact',
                network: endpoint.network,
                maxAmountRequired: endpoint.price,
                asset: endpoint.tokenAddress,
                payTo: endpoint.recipientAddress,
                resource: resourceUrl,
                description: endpoint.description || endpoint.name || 'Metered API endpoint',
                mimeType: 'application/json',
                maxTimeoutSeconds: 300
            }
        ],
        metadata: {
            name: endpoint.name,
            description: endpoint.description,
            category: 'api',
            provider: 'NexFlow'
        },
        lastUpdated: new Date(endpoint.updatedAt).getTime() / 1000
    };
}
}),
"[project]/src/integrations/x402/nextjs-adapter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// NEXT.JS ADAPTER FOR X402 SDK
// =============================================================================
// Adapter to use x402 SDK with Next.js App Router
__turbopack_context__.s([
    "create402Response",
    ()=>create402Response,
    "getRouteConfig",
    ()=>getRouteConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$discovery$2d$metadata$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/discovery-metadata.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'X402NextJSAdapter'
});
async function create402Response(request, endpoint) {
    const baseUrl = ("TURBOPACK compile-time value", "https://www.nexflowapp.app") || (request.headers.get('x-forwarded-proto') === 'https' ? 'https' : 'http') + '://' + (request.headers.get('host') || 'localhost:3001');
    const resourceUrl = `${baseUrl}/api/v1/metered/${endpoint.id}`;
    // Get discovery metadata using Bazaar extension (may be stubbed if packages unavailable)
    const discoveryExtension = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$discovery$2d$metadata$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDiscoveryMetadata"])(endpoint);
    // Ensure price is a string (atomic units)
    const priceString = String(endpoint.price);
    // Normalize network to 'base' if not specified (x402scan expects specific network values)
    const network = (endpoint.network || 'base').toLowerCase();
    // Build outputSchema in x402scan format: { input: {...}, output?: {...} }
    // x402scan expects outputSchema with input/output structure, not raw JSON schema
    const outputSchema = {
        input: {
            type: 'http',
            method: 'POST',
            bodyType: 'json'
        },
        output: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    description: 'Response data from upstream service',
                    additionalProperties: true
                },
                timestamp: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Response timestamp'
                }
            }
        }
    };
    // Create x402scan-compliant EnhancedPaymentRequirements format
    // x402scan requires strict schema matching - remove extensions, use extra instead
    const accepts = [];
    // Add Base (EVM) accept entry - EnhancedPaymentRequirements format
    // Only include one entry for now to match x402scan validation
    accepts.push({
        scheme: 'exact',
        network: network === 'base' ? 'base' : network,
        maxAmountRequired: priceString,
        asset: endpoint.tokenAddress,
        payTo: endpoint.recipientAddress,
        resource: resourceUrl,
        description: endpoint.description || endpoint.name || 'Metered API endpoint',
        mimeType: 'application/json',
        maxTimeoutSeconds: 300,
        outputSchema: outputSchema,
        // Move Bazaar extension to extra field (not in schema, but we can include it)
        extra: {
            bazaar: discoveryExtension.bazaar
        }
    });
    // x402scan response format - use x402Version: 1 (number type)
    // x402scan validation may only accept version 1
    const response = {
        x402Version: 1,
        error: 'X-PAYMENT header is required',
        accepts: accepts
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response, {
        status: 402
    });
}
async function getRouteConfig(endpoint) {
    const baseUrl = ("TURBOPACK compile-time value", "https://www.nexflowapp.app") || 'http://localhost:3001';
    const resourceUrl = `${baseUrl}/api/v1/metered/${endpoint.id}`;
    const discoveryExtension = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$discovery$2d$metadata$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDiscoveryMetadata"])(endpoint);
    return {
        [`POST /api/v1/metered/${endpoint.id}`]: {
            accepts: {
                scheme: 'exact',
                network: endpoint.network,
                price: endpoint.price,
                payTo: endpoint.recipientAddress,
                asset: endpoint.tokenAddress,
                resource: resourceUrl,
                description: endpoint.description || endpoint.name,
                mimeType: 'application/json',
                maxTimeoutSeconds: 300
            },
            extensions: {
                ...discoveryExtension
            }
        }
    };
}
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/src/integrations/x402/cdp-jwt.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CDPJWTGenerator",
    ()=>CDPJWTGenerator,
    "getCDPJWTGenerator",
    ()=>getCDPJWTGenerator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$cdp$2d$sdk$2f$_esm$2f$auth$2f$utils$2f$jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@coinbase/cdp-sdk/_esm/auth/utils/jwt.js [app-route] (ecmascript)");
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
        const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$coinbase$2f$cdp$2d$sdk$2f$_esm$2f$auth$2f$utils$2f$jwt$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateJwt"])({
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$verifyTypedData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/signature/verifyTypedData.js [app-route] (ecmascript)");
;
async function verifyPaymentSignature(signature, authorization, signerAddress, chainId = 8453, asset// Token contract address (optional, defaults to USDC)
) {
    try {
        // EIP-3009 domain for USDC on Base (per official @x402/evm SDK)
        // The domain comes from the token contract itself
        const domain = {
            name: 'USD Coin',
            version: '2',
            chainId,
            verifyingContract: asset || '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
        };
        // EIP-3009 TransferWithAuthorization types
        const types = {
            TransferWithAuthorization: [
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
        const isValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$signature$2f$verifyTypedData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyTypedData"])({
            address: signerAddress,
            domain,
            types,
            primaryType: 'TransferWithAuthorization',
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
   * Call CDP /verify endpoint with retry logic for transient errors
   * 
   * Retries on: 429 (rate limit), 500-504 (server errors), network timeouts
   * Does NOT retry on: 400 (invalid_request), 401 (unauthorized), other 4xx
   * 
   * Returns normalized result with success, valid, status, errorType, errorMessage, etc.
   */ async callCdpVerifyWithRetries(verifyBody, isProbe, headers) {
        const url = new URL('https://api.cdp.coinbase.com/platform/v2/x402/verify');
        const maxRetries = 3;
        const retryableStatuses = [
            429,
            500,
            502,
            503,
            504
        ];
        const startTime = Date.now();
        for(let attempt = 0; attempt < maxRetries; attempt++){
            try {
                const response = await fetch(url.toString(), {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(verifyBody),
                    signal: AbortSignal.timeout(10000)
                });
                const text = await response.text();
                const data = text ? JSON.parse(text) : {};
                const latencyMs = Date.now() - startTime;
                // Success case
                if (response.ok && data.isValid) {
                    return {
                        success: true,
                        valid: true,
                        status: response.status,
                        isRateLimited: false,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Check if retryable error
                const isRetryable = retryableStatuses.includes(response.status);
                const isRateLimit = response.status === 429;
                // If not retryable or last attempt, return error
                if (!isRetryable || attempt === maxRetries - 1) {
                    const errorMessage = data.errorMessage || data.error || data.invalidReason || `HTTP ${response.status}`;
                    const errorType = data.errorType || data.code || (isRateLimit ? 'rate_limit' : 'CDP_VERIFY_FAILED');
                    return {
                        success: false,
                        valid: false,
                        status: response.status,
                        errorType,
                        errorMessage,
                        isRateLimited: isRateLimit,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Retry with exponential backoff
                const delay = 100 * Math.pow(2, attempt); // 100ms, 200ms, 400ms
                logger.info({
                    component: 'CDPFacilitator',
                    attempt: attempt + 1,
                    maxRetries,
                    status: response.status,
                    delay,
                    isProbe,
                    msg: 'Retrying CDP verification after transient error'
                });
                await new Promise((resolve)=>setTimeout(resolve, delay));
            } catch (error) {
                const latencyMs = Date.now() - startTime;
                const isTimeout = error?.name === 'AbortError' || error?.message?.toLowerCase().includes('timeout');
                const isNetworkError = error?.message?.toLowerCase().includes('network') || error?.message?.toLowerCase().includes('fetch') || error?.message?.toLowerCase().includes('econnrefused');
                // If network error and not last attempt, retry
                if ((isTimeout || isNetworkError) && attempt < maxRetries - 1) {
                    const delay = 100 * Math.pow(2, attempt);
                    logger.info({
                        component: 'CDPFacilitator',
                        attempt: attempt + 1,
                        maxRetries,
                        error: error?.message,
                        delay,
                        isProbe,
                        msg: 'Retrying CDP verification after network error'
                    });
                    await new Promise((resolve)=>setTimeout(resolve, delay));
                    continue;
                }
                // Last attempt or non-network error
                return {
                    success: false,
                    valid: false,
                    status: 0,
                    errorType: isTimeout ? 'timeout' : isNetworkError ? 'network_error' : 'CDP_VERIFY_FAILED',
                    errorMessage: error?.message || 'CDP verification failed',
                    isRateLimited: false,
                    isNetworkError: isTimeout || isNetworkError,
                    latencyMs
                };
            }
        }
        // Should never reach here, but TypeScript needs a return
        return {
            success: false,
            valid: false,
            status: 0,
            errorType: 'CDP_VERIFY_FAILED',
            errorMessage: 'Max retries exceeded',
            isRateLimited: false,
            isNetworkError: false,
            latencyMs: Date.now() - startTime
        };
    }
    /**
   * Verify payment with CDP facilitator API
   * 
   * This method:
   * 1. Validates payment authorization fields locally
   * 2. Optionally verifies EIP-712 signature locally
   * 3. Calls CDP API for on-chain verification with retry logic
   * 4. Returns verification result with KYT/OFAC status
   */ async verifyPayment(request) {
        const start = Date.now();
        try {
            // Step 1: Parse payment header to extract paymentPayload (build from decoded JSON)
            // For probe mode, we need to decode the base64 payment header and build the payload
            let paymentPayload;
            let parsedPayment;
            try {
                const { parseX402Header } = await __turbopack_context__.A("[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript, async loader)");
                const parseResult = parseX402Header(request.payment);
                if (parseResult.valid && parseResult.parsed) {
                    parsedPayment = parseResult.parsed;
                    // Build paymentPayload from decoded payment JSON
                    // Note: parsedPayment.network might be legacy format (e.g., "8453" or "base")
                    // CDP requires CAIP-2 format (e.g., "eip155:8453"), so normalize it
                    const parsedNetwork = parsedPayment.network || request.paymentPayload.network;
                    const normalizedParsedNetwork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(parsedNetwork);
                    paymentPayload = {
                        x402Version: 1,
                        scheme: 'x402',
                        network: normalizedParsedNetwork,
                        payload: {
                            signature: parsedPayment.signature,
                            authorization: parsedPayment.authorization
                        }
                    };
                } else {
                    // Fallback to request.paymentPayload if parsing fails
                    paymentPayload = request.paymentPayload;
                }
            } catch (parseError) {
                logger.warn({
                    error: parseError
                }, 'Failed to parse payment header, using request.paymentPayload');
                paymentPayload = request.paymentPayload;
            }
            // Step 2: Validate payment authorization fields locally
            const authValidation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$signature$2d$verifier$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validatePaymentAuthorization"])(paymentPayload.payload.authorization);
            if (!authValidation.valid) {
                return {
                    success: false,
                    valid: false,
                    error: authValidation.error || 'Invalid payment authorization'
                };
            }
            // Step 3: Extract authorization for use throughout
            const auth = paymentPayload.payload.authorization;
            const signature = paymentPayload.payload.signature;
            // Step 4: Detect probe mode and skip local signature verification for probes
            // Probe mode is detected by checking if signature is all zeros (dummy signature)
            const isDummySignature = signature === '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000' || signature === '0x' + '0'.repeat(128);
            const isProbe = isDummySignature || auth.from === '0x0000000000000000000000000000000000000000';
            // Step 4: Optionally verify signature locally (additional security layer)
            // Note: CDP will also verify, but local check catches issues early
            // Skip local verification for probe mode to avoid viem errors with dummy signatures
            if (isProbe) {
                logger.warn({
                    component: 'CDPFacilitator',
                    isProbe: true,
                    msg: 'Skipping local signature verification for probe payload'
                });
            } else {
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
            }
            // Step 5: Use paymentRequirements from request (must be provided by caller)
            // CDP requires paymentRequirements that match the challenge
            // For probe mode, build minimal valid paymentRequirements if missing
            let finalPaymentRequirements = request.paymentRequirements;
            if (!finalPaymentRequirements || !finalPaymentRequirements.to && !finalPaymentRequirements?.payTo) {
                // If in probe mode, build minimal valid paymentRequirements
                if (isProbe) {
                    logger.info({
                        component: 'CDPFacilitator',
                        isProbe: true,
                        msg: 'Building minimal paymentRequirements for probe mode'
                    });
                    // Extract network from paymentPayload (built from decoded payment)
                    // paymentPayload.network should already be in CAIP-2 format from normalization above
                    // If not, normalize it to ensure CAIP-2 format
                    const network = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(paymentPayload.network || 'eip155:8453');
                    // USDC contract address on Base
                    const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
                    // Test receiver address for probes
                    const PROBE_RECEIVER = '0x0000000000000000000000000000000000000001';
                    const now = Math.floor(Date.now() / 1000);
                    // Build minimal valid paymentRequirements for probe
                    // CDP requires 'exact' scheme for EVM fixed-amount flows
                    // CDP requires CAIP-2 format (e.g., "eip155:8453") for network
                    finalPaymentRequirements = {
                        scheme: 'exact',
                        network: network,
                        to: PROBE_RECEIVER,
                        payTo: PROBE_RECEIVER,
                        value: '1000000',
                        maxAmountRequired: '1000000',
                        resource: `https://probe.nexflow.dev/health/cdp/${network}/USDC`,
                        asset: USDC_BASE,
                        description: 'Health probe for CDP',
                        mimeType: 'application/json',
                        validAfter: now.toString(),
                        validBefore: (now + 300).toString(),
                        maxTimeoutSeconds: 300,
                        // EIP-712 domain info required for EVM networks (USDC on Base)
                        extra: {
                            name: 'USD Coin',
                            version: '2'
                        }
                    };
                    logger.info({
                        component: 'CDPFacilitator',
                        isProbe: true,
                        hasPaymentRequirements: true,
                        network: network,
                        asset: USDC_BASE,
                        msg: 'Built probe paymentRequirements'
                    });
                } else {
                    // Not probe mode and missing paymentRequirements - error
                    logger.error({
                        hasPaymentRequirements: !!request.paymentRequirements,
                        paymentRequirements: request.paymentRequirements,
                        isProbe: false
                    }, 'Missing paymentRequirements');
                    return {
                        success: false,
                        valid: false,
                        error: 'paymentRequirements must be provided for CDP verification'
                    };
                }
            }
            // Normalize paymentRequirements to CDP's expected format
            // CDP expects: scheme, network, to, value, resource, validAfter, validBefore, asset
            // Remove any fields that CDP doesn't expect (payer, maxTimeoutSeconds, description, mimeType might be optional)
            // Ensure network is in CAIP-2 format (CDP requires this)
            const paymentRequirementsNetwork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(finalPaymentRequirements?.network || paymentPayload.network || 'eip155:8453');
            const paymentRequirements = {
                scheme: finalPaymentRequirements?.scheme || 'exact',
                network: paymentRequirementsNetwork,
                // Convert legacy field names to CDP format
                to: finalPaymentRequirements?.to || finalPaymentRequirements?.payTo || auth.to,
                value: finalPaymentRequirements?.value || finalPaymentRequirements?.maxAmountRequired || auth.value,
                // Ensure validity window is included
                validAfter: finalPaymentRequirements?.validAfter || auth.validAfter,
                validBefore: finalPaymentRequirements?.validBefore || auth.validBefore,
                // Required fields - ensure they exist
                resource: finalPaymentRequirements?.resource,
                asset: finalPaymentRequirements?.asset,
                // Optional fields (only include if present)
                ...finalPaymentRequirements?.description && {
                    description: finalPaymentRequirements.description
                },
                ...finalPaymentRequirements?.mimeType && {
                    mimeType: finalPaymentRequirements.mimeType
                },
                ...finalPaymentRequirements?.maxTimeoutSeconds && {
                    maxTimeoutSeconds: finalPaymentRequirements.maxTimeoutSeconds
                },
                // EIP-712 domain info required for EVM signature verification
                ...finalPaymentRequirements?.extra && {
                    extra: finalPaymentRequirements.extra
                }
            };
            // Validate that required fields are present
            // In probe mode, we already built complete requirements, so this should not fail
            if (!paymentRequirements.resource || !paymentRequirements.asset) {
                // If in probe mode and still missing fields, build them
                if (isProbe) {
                    // Normalize network to CAIP-2 format
                    const network = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(paymentPayload.network || 'eip155:8453');
                    const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
                    if (!paymentRequirements.resource) {
                        paymentRequirements.resource = `https://probe.nexflow.dev/health/cdp/${network}/USDC`;
                    }
                    if (!paymentRequirements.asset) {
                        paymentRequirements.asset = USDC_BASE;
                    }
                    // Ensure network is in CAIP-2 format
                    if (!paymentRequirements.network || !paymentRequirements.network.includes(':')) {
                        paymentRequirements.network = network;
                    }
                    logger.info({
                        component: 'CDPFacilitator',
                        isProbe: true,
                        msg: 'Completed missing resource/asset fields for probe mode'
                    });
                } else {
                    // Not probe mode - error
                    logger.error({
                        hasResource: !!paymentRequirements.resource,
                        hasAsset: !!paymentRequirements.asset,
                        paymentRequirements: request.paymentRequirements,
                        isProbe: false
                    }, 'Missing required paymentRequirements fields (resource or asset)');
                    return {
                        success: false,
                        valid: false,
                        error: 'paymentRequirements must include resource and asset'
                    };
                }
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
            const normalizedNetwork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(paymentPayload.network || paymentRequirements.network || 'base');
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
            // Build paymentRequirements object matching CDP's x402 /verify schema
            // CDP expects: scheme, network, payTo, maxAmountRequired, resource, asset, description, mimeType, maxTimeoutSeconds
            // For EVM networks, scheme should be 'exact', network can be CAIP-2 format (eip155:8453)
            const paymentRequirementsBody = {
                scheme: paymentRequirements.scheme || 'exact',
                network: normalizedNetwork,
                payTo: paymentRequirements.to || paymentRequirements.payTo || '',
                maxAmountRequired: maxAmountRequired,
                resource: paymentRequirements.resource || '',
                asset: paymentRequirements.asset || '',
                description: paymentRequirements.description || 'x402 Payment Verification',
                mimeType: paymentRequirements.mimeType || 'application/json',
                maxTimeoutSeconds: paymentRequirements.maxTimeoutSeconds || 300
            };
            // Add optional fields only if they exist
            if (paymentRequirements.validAfter) {
                paymentRequirementsBody.validAfter = paymentRequirements.validAfter;
            }
            if (paymentRequirements.validBefore) {
                paymentRequirementsBody.validBefore = paymentRequirements.validBefore;
            }
            if (paymentRequirements.outputSchema) {
                paymentRequirementsBody.outputSchema = paymentRequirements.outputSchema;
            }
            if (paymentRequirements.extra) {
                paymentRequirementsBody.extra = paymentRequirements.extra;
            }
            // Parse payment header to extract the payment payload
            let paymentHeaderString = request.payment;
            if (paymentHeaderString.startsWith('x402 ')) {
                paymentHeaderString = paymentHeaderString.slice(5);
            }
            // Decode and parse the payment header
            let parsedPaymentPayload;
            try {
                const decoded = Buffer.from(paymentHeaderString, 'base64').toString('utf-8');
                parsedPaymentPayload = JSON.parse(decoded);
            } catch (parseError) {
                logger.error({
                    error: parseError
                }, 'Failed to parse payment header for CDP request');
                return {
                    success: false,
                    valid: false,
                    error: 'Invalid payment header format'
                };
            }
            // Convert CAIP-2 network (eip155:8453) to legacy format (base) for CDP
            const legacyNetworkMap = {
                'eip155:8453': 'base',
                'eip155:84532': 'base-sepolia',
                'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'solana',
                'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1': 'solana-devnet'
            };
            const legacyNetwork = legacyNetworkMap[normalizedNetwork] || normalizedNetwork.replace('eip155:', '');
            // Build request body matching CDP's x402 /verify schema
            // CDP expects legacy network format ('base', not 'eip155:8453')
            const verifyBody = {
                x402Version: 1,
                paymentPayload: {
                    x402Version: 1,
                    scheme: 'exact',
                    network: legacyNetwork,
                    payload: {
                        signature: parsedPaymentPayload.signature,
                        authorization: parsedPaymentPayload.authorization
                    }
                },
                paymentRequirements: {
                    scheme: paymentRequirementsBody.scheme || 'exact',
                    network: legacyNetwork,
                    // CDP expects 'maxAmountRequired' for the amount field
                    maxAmountRequired: paymentRequirementsBody.maxAmountRequired || paymentRequirementsBody.amount,
                    resource: paymentRequirementsBody.resource,
                    description: paymentRequirementsBody.description || 'x402 payment verification',
                    mimeType: paymentRequirementsBody.mimeType || 'application/json',
                    // CDP expects 'payTo' for the recipient address
                    payTo: paymentRequirementsBody.payTo || paymentRequirementsBody.recipient,
                    maxTimeoutSeconds: paymentRequirementsBody.maxTimeoutSeconds || 300,
                    // CDP expects asset contract address, not symbol
                    asset: paymentRequirementsBody.asset,
                    // EIP-712 domain info required for EVM signature verification
                    ...paymentRequirementsBody.extra && {
                        extra: paymentRequirementsBody.extra
                    }
                }
            };
            // Log request details before sending
            logger.info({
                component: "CDPFacilitator",
                isProbe,
                network: paymentRequirementsBody.network,
                asset: paymentRequirementsBody.asset,
                hasPaymentHeader: typeof paymentHeaderString === "string" && paymentHeaderString.length > 0,
                paymentHeaderPreview: paymentHeaderString.slice(0, 60),
                msg: "Sending CDP /verify request"
            });
            // DEBUG: Log full payload for troubleshooting CDP rejection
            logger.info({
                component: "CDPFacilitator",
                debug: true,
                fullPaymentPayload: {
                    x402Version: verifyBody.paymentPayload.x402Version,
                    scheme: verifyBody.paymentPayload.scheme,
                    network: verifyBody.paymentPayload.network,
                    hasSignature: !!verifyBody.paymentPayload.payload.signature,
                    signaturePreview: verifyBody.paymentPayload.payload.signature?.slice(0, 20),
                    authorization: verifyBody.paymentPayload.payload.authorization
                },
                fullPaymentRequirements: verifyBody.paymentRequirements,
                parsedPayloadKeys: Object.keys(parsedPaymentPayload || {}),
                msg: "CDP verify request full payload"
            });
            // TODO: CDP Support Mode - Add optional enhanced logging for non-production
            // When CDP_SUPPORT_MODE=true, log full request/response for debugging with CDP support
            // if (process.env.CDP_SUPPORT_MODE === 'true' && process.env.NODE_ENV !== 'production') {
            //   logger.debug({ fullRequestBody: verifyBody, fullPaymentRequirements: paymentRequirementsBody }, 'CDP Support Mode: Full request details');
            // }
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
                    x402Version: verifyBody.paymentPayload.x402Version,
                    scheme: verifyBody.paymentPayload.scheme,
                    network: verifyBody.paymentPayload.network,
                    hasSignature: !!verifyBody.paymentPayload.payload.signature,
                    hasAuthorization: !!verifyBody.paymentPayload.payload.authorization
                },
                paymentRequirements: verifyBody.paymentRequirements,
                isProbe: isProbe
            }, 'Sending verification request to CDP');
            // Step 6: Call CDP API with retry logic
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
            // Call CDP /verify with retry logic
            const result = await this.callCdpVerifyWithRetries(verifyBody, isProbe, headers);
            // Log CDP response
            logger.debug({
                status: result.status,
                success: result.success,
                valid: result.valid,
                errorType: result.errorType,
                errorMessage: result.errorMessage,
                isRateLimited: result.isRateLimited,
                isNetworkError: result.isNetworkError,
                latencyMs: result.latencyMs
            }, 'CDP verification response');
            // Handle success
            if (result.success && result.valid) {
                logger.info({
                    latencyMs: result.latencyMs
                }, 'Payment verified successfully');
                return {
                    success: true,
                    valid: true,
                    transactionHash: undefined,
                    kytStatus: 'passed',
                    ofacStatus: 'passed'
                };
            } else {
                // Handle error - map CDP errorType/errorMessage to our error classification
                const cdpErrorType = result.errorType || 'CDP_VERIFY_FAILED';
                const cdpErrorMessage = result.errorMessage || 'CDP verification failed';
                // Map error types to result/errorCode
                let errorCode = 'facilitator_error';
                if (result.isRateLimited || cdpErrorType === 'rate_limit') {
                    errorCode = 'rate_limited';
                } else if (result.isNetworkError) {
                    errorCode = 'network_error';
                } else if (cdpErrorType === 'invalid_request' || result.status === 400) {
                    errorCode = 'invalid_request';
                } else if (result.status === 401) {
                    errorCode = 'unauthorized';
                }
                // Log detailed error information including request body for debugging
                logger.error({
                    status: result.status,
                    errorType: cdpErrorType,
                    errorMessage: cdpErrorMessage,
                    errorCode,
                    isRateLimited: result.isRateLimited,
                    isNetworkError: result.isNetworkError,
                    cdpResponse: result.data,
                    requestBody: {
                        x402Version: verifyBody.x402Version,
                        paymentPayload: {
                            x402Version: verifyBody.paymentPayload.x402Version,
                            scheme: verifyBody.paymentPayload.scheme,
                            network: verifyBody.paymentPayload.network
                        },
                        paymentRequirements: verifyBody.paymentRequirements
                    }
                }, 'Payment verification failed');
                // Extract authorization details from the parsed payment header for logging
                let authorizationFrom = 'UNKNOWN';
                let authorizationTo = 'UNKNOWN';
                let transactionHash = 'NOT PROVIDED';
                if (parsedPayment) {
                    authorizationFrom = parsedPayment.authorization.from;
                    authorizationTo = parsedPayment.authorization.to;
                    transactionHash = parsedPayment.txHash || 'NOT PROVIDED';
                }
                const errorDetails = {
                    error: cdpErrorMessage,
                    errorType: cdpErrorType,
                    cdpResponse: result.data,
                    httpStatus: result.status,
                    errorCode,
                    isRateLimited: result.isRateLimited,
                    isNetworkError: result.isNetworkError,
                    // Include request details for debugging
                    requestDetails: {
                        scheme: verifyBody.paymentRequirements?.scheme || 'MISSING',
                        network: verifyBody.paymentRequirements?.network || 'MISSING',
                        payTo: verifyBody.paymentRequirements?.payTo || 'MISSING',
                        maxAmountRequired: verifyBody.paymentRequirements?.maxAmountRequired || 'MISSING',
                        validAfter: verifyBody.paymentRequirements?.validAfter || 'MISSING',
                        validBefore: verifyBody.paymentRequirements?.validBefore || 'MISSING',
                        resource: verifyBody.paymentRequirements?.resource || 'MISSING',
                        asset: verifyBody.paymentRequirements?.asset || 'MISSING',
                        fullPaymentRequirements: verifyBody.paymentRequirements,
                        authorizationFrom,
                        authorizationTo,
                        transactionHash
                    }
                };
                return {
                    success: false,
                    valid: false,
                    error: cdpErrorMessage,
                    errorDetails: {
                        ...errorDetails,
                        errorType: cdpErrorType
                    },
                    kytStatus: undefined,
                    ofacStatus: undefined
                };
            }
        } catch (error) {
            // Handle network errors with enhanced logging
            const errorMessage = error?.message || 'CDP_VERIFY_FAILED';
            const isTimeout = error?.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout');
            const isNetworkError = errorMessage.toLowerCase().includes('network') || errorMessage.toLowerCase().includes('fetch') || errorMessage.toLowerCase().includes('econnrefused');
            logger.error({
                error,
                errorMessage,
                isTimeout,
                isNetworkError,
                component: 'cdp-facilitator',
                operation: 'verifyPayment',
                requestId: request.requestId
            }, 'CDP API request error');
            const errorDetails = {
                error: errorMessage,
                cdpResponse: undefined,
                httpStatus: 500,
                errorType: isTimeout ? 'timeout' : isNetworkError ? 'network' : 'unknown'
            };
            return {
                success: false,
                valid: false,
                error: errorMessage,
                errorDetails: errorDetails
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
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            // If it's a DNS/network error, note that payment verification might still work
            if (errorMessage.includes('fetch failed') || errorMessage.includes('ENOTFOUND') || errorMessage.includes('getaddrinfo')) {
                return {
                    healthy: false,
                    error: `Facilitator URL not reachable (${errorMessage}). Payment verification may use a different endpoint.`
                };
            }
            return {
                healthy: false,
                error: errorMessage
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
"[project]/src/integrations/x402/resource-server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// X402 RESOURCE SERVER WITH BAZAAR EXTENSION
// =============================================================================
// Official x402 SDK integration with Bazaar discovery support
// Note: @x402 packages may not be available - this module will handle missing dependencies gracefully
__turbopack_context__.s([
    "getFacilitatorClientAdapter",
    ()=>getFacilitatorClientAdapter,
    "getX402ResourceServer",
    ()=>getX402ResourceServer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$cdp$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/cdp-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'X402ResourceServer'
});
// Lazy load x402 packages to handle missing dependencies
let x402ResourceServer;
let HTTPFacilitatorClient;
let bazaarResourceServerExtension;
let registerExactEvmScheme;
async function loadX402Packages() {
    if (!x402ResourceServer) {
        try {
            const x402Core = await __turbopack_context__.A("[project]/node_modules/@x402/core/dist/esm/server/index.mjs [app-route] (ecmascript, async loader)");
            const x402Http = await __turbopack_context__.A("[project]/node_modules/@x402/core/dist/esm/http/index.mjs [app-route] (ecmascript, async loader)");
            const x402Bazaar = await __turbopack_context__.A("[project]/node_modules/@x402/extensions/dist/esm/bazaar/index.mjs [app-route] (ecmascript, async loader)");
            const x402EVM = await __turbopack_context__.A("[project]/node_modules/@x402/evm/dist/esm/exact/server/index.mjs [app-route] (ecmascript, async loader)");
            x402ResourceServer = x402Core.x402ResourceServer;
            HTTPFacilitatorClient = x402Http.HTTPFacilitatorClient;
            bazaarResourceServerExtension = x402Bazaar.bazaarResourceServerExtension;
            registerExactEvmScheme = x402EVM.registerExactEvmScheme;
        } catch (error) {
            logger.warn({
                error
            }, 'x402 packages not available - discovery features will be limited');
            throw new Error('x402 packages not installed');
        }
    }
    return {
        x402ResourceServer,
        HTTPFacilitatorClient,
        bazaarResourceServerExtension,
        registerExactEvmScheme
    };
}
/**
 * CDP Facilitator Client Adapter
 * 
 * Adapts our custom CDP facilitator to the SDK's HTTPFacilitatorClient interface
 * This class is only used when x402 packages are available
 */ class CDPFacilitatorClientAdapter {
    cdpFacilitator;
    baseClient;
    constructor(){
        // Will be initialized when x402 packages are loaded
        this.cdpFacilitator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$cdp$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCDPFacilitator"])();
    }
    async initialize(HTTPFacilitatorClient) {
        // Initialize with CDP facilitator URL (not used directly, but required by base class)
        this.baseClient = new HTTPFacilitatorClient({
            url: process.env.CDP_FACILITATOR_URL || 'https://api.cdp.coinbase.com/platform/v2/x402'
        });
        Object.setPrototypeOf(this, this.baseClient.constructor.prototype);
    }
    /**
   * Override verify method to use our CDP facilitator
   */ async verify(payment, paymentPayload, paymentRequirements) {
        try {
            const result = await this.cdpFacilitator.verifyPaymentWithRetry({
                payment,
                paymentPayload,
                paymentRequirements
            });
            if (result.success && result.valid) {
                return {
                    isValid: true,
                    transactionHash: result.transactionHash,
                    kytStatus: result.kytStatus,
                    ofacStatus: result.ofacStatus
                };
            } else {
                return {
                    isValid: false,
                    invalidReason: result.error,
                    errorMessage: result.error
                };
            }
        } catch (error) {
            logger.error({
                error
            }, 'CDP facilitator verification error');
            return {
                isValid: false,
                invalidReason: error instanceof Error ? error.message : 'Verification failed'
            };
        }
    }
}
// Singleton resource server instance
let resourceServer = null;
async function getX402ResourceServer() {
    try {
        const { x402ResourceServer: X402ResourceServer, HTTPFacilitatorClient: HTTPClient, bazaarResourceServerExtension: bazaarExt, registerExactEvmScheme: registerScheme } = await loadX402Packages();
        if (!resourceServer) {
            // Create facilitator client adapter
            const facilitatorClient = new CDPFacilitatorClientAdapter();
            await facilitatorClient.initialize(HTTPClient);
            // Create resource server
            resourceServer = new X402ResourceServer(facilitatorClient);
            // Register Exact EVM scheme (supports all EVM chains)
            // The SDK's registerExactEvmScheme should handle multiple chains automatically
            registerScheme(resourceServer);
            // Register Bazaar extension for discovery
            resourceServer.registerExtension(bazaarExt);
            // Log supported networks (async import to avoid blocking)
            __turbopack_context__.A("[project]/src/integrations/x402/chain-registry.ts [app-route] (ecmascript, async loader)").then(({ getChainRegistry })=>{
                const chainRegistry = getChainRegistry();
                const evmNetworks = chainRegistry.getEVMs();
                logger.info({
                    supportedNetworks: evmNetworks.map((n)=>({
                            caip: n.caip,
                            name: n.name,
                            chainId: n.chainId
                        }))
                }, 'x402 Resource Server initialized with Bazaar extension and multi-chain support');
            }).catch(()=>{
                logger.info('x402 Resource Server initialized with Bazaar extension');
            });
        }
        return resourceServer;
    } catch (error) {
        logger.warn({
            error
        }, 'x402 resource server not available - discovery endpoint may not function');
        return null;
    }
}
function getFacilitatorClientAdapter() {
    return new CDPFacilitatorClientAdapter();
}
}),
"[project]/src/lib/input-validator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// INPUT VALIDATION & SANITIZATION
// =============================================================================
// Comprehensive input validation and sanitization for all API inputs
__turbopack_context__.s([
    "validateApiKeyToken",
    ()=>validateApiKeyToken,
    "validateEndpointId",
    ()=>validateEndpointId,
    "validatePaymentHeader",
    ()=>validatePaymentHeader,
    "validateRequestBody",
    ()=>validateRequestBody,
    "validateUrlParam",
    ()=>validateUrlParam
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'InputValidator'
});
function validateEndpointId(endpointId) {
    const errors = [];
    // Check format: ep_<timestamp>_<random>
    if (!endpointId || typeof endpointId !== 'string') {
        errors.push('Endpoint ID must be a string');
        return {
            valid: false,
            errors
        };
    }
    // Allow formats:
    // - ep_<digits>_<alphanumeric> (standard format)
    // - ep_<alphanumeric>_<alphanumeric> (descriptive format like ep_url_enrich_demo_v1)
    // - ep_<alphanumeric> (simple format)
    if (!/^ep_[a-z0-9_]+$/i.test(endpointId)) {
        errors.push('Invalid endpoint ID format');
    }
    if (endpointId.length > 100) {
        errors.push('Endpoint ID too long');
    }
    // Sanitize: remove any non-alphanumeric characters except underscore and dash
    const sanitized = endpointId.replace(/[^a-z0-9_-]/gi, '');
    return {
        valid: errors.length === 0,
        errors,
        sanitized: errors.length === 0 ? sanitized : undefined
    };
}
function validateApiKeyToken(token) {
    const errors = [];
    if (!token || typeof token !== 'string') {
        errors.push('API key must be a string');
        return {
            valid: false,
            errors
        };
    }
    // Check format: nf_live_...
    if (!token.startsWith('nf_live_')) {
        errors.push('Invalid API key format');
    }
    if (token.length < 20 || token.length > 200) {
        errors.push('API key length invalid');
    }
    // Sanitize: only allow alphanumeric, underscore, dash
    const sanitized = token.replace(/[^a-z0-9_-]/gi, '');
    return {
        valid: errors.length === 0,
        errors,
        sanitized: errors.length === 0 ? sanitized : undefined
    };
}
function validatePaymentHeader(header) {
    const errors = [];
    if (!header || typeof header !== 'string') {
        errors.push('Payment header must be a string');
        return {
            valid: false,
            errors
        };
    }
    // Length check - x402 headers can be large due to signatures
    if (header.length > 10000) {
        errors.push('Payment header too long');
        return {
            valid: false,
            errors
        };
    }
    if (header.length < 10) {
        errors.push('Payment header too short');
        return {
            valid: false,
            errors
        };
    }
    // Check for suspicious patterns (XSS, etc.)
    if (header.includes('<script') || header.includes('javascript:')) {
        errors.push('Suspicious content in payment header');
        return {
            valid: false,
            errors
        };
    }
    // x402 headers should start with "x402 " prefix
    const hasX402Prefix = /^x402\s+/i.test(header);
    // Extract base64 portion
    const cleanHeader = hasX402Prefix ? header.replace(/^x402\s+/i, '').trim() : header.trim();
    // Validate base64 format (allow standard base64 chars plus URL-safe variants)
    // Base64 can contain: A-Z, a-z, 0-9, +, /, =
    // URL-safe base64 can also contain: -, _
    if (cleanHeader.length > 0 && !/^[A-Za-z0-9+/=_-]+$/.test(cleanHeader)) {
        // Log what characters are invalid for debugging
        const invalidChars = cleanHeader.split('').filter((c)=>!/[A-Za-z0-9+/=_-]/.test(c));
        logger.warn('Invalid characters in payment header base64', {
            invalidChars: [
                ...new Set(invalidChars)
            ].slice(0, 10),
            headerLength: header.length,
            hasX402Prefix
        });
        errors.push('Invalid base64 format in payment header');
        return {
            valid: false,
            errors
        };
    }
    // Verify it's decodable base64 (optional strict check)
    try {
        if (cleanHeader.length > 0) {
            const decoded = Buffer.from(cleanHeader, 'base64').toString('utf-8');
            // Should be valid JSON
            JSON.parse(decoded);
        }
    } catch (e) {
        // Don't fail validation, just log - the parser will handle this
        logger.debug('Payment header base64 decode check failed (non-blocking)', {
            error: e instanceof Error ? e.message : 'Unknown'
        });
    }
    return {
        valid: errors.length === 0,
        errors,
        sanitized: header
    };
}
function validateRequestBody(body, schema) {
    const errors = [];
    if (!body || typeof body !== 'object') {
        errors.push('Request body must be an object');
        return {
            valid: false,
            errors
        };
    }
    // Check size
    const bodySize = JSON.stringify(body).length;
    if (schema?.maxSize && bodySize > schema.maxSize) {
        errors.push(`Request body too large: ${bodySize} bytes (max: ${schema.maxSize})`);
    }
    // Check required fields
    if (schema?.required) {
        for (const field of schema.required){
            if (!(field in body)) {
                errors.push(`Required field missing: ${field}`);
            }
        }
    }
    // Filter allowed fields
    let sanitized = body;
    if (schema?.allowedFields) {
        sanitized = {};
        for (const field of schema.allowedFields){
            if (field in body) {
                sanitized[field] = sanitizeValue(body[field]);
            }
        }
    } else {
        // Sanitize all values
        sanitized = sanitizeObject(body);
    }
    return {
        valid: errors.length === 0,
        errors,
        sanitized: errors.length === 0 ? sanitized : undefined
    };
}
/**
 * Sanitize a value (recursive)
 */ function sanitizeValue(value) {
    if (typeof value === 'string') {
        return sanitizeString(value);
    } else if (Array.isArray(value)) {
        return value.map(sanitizeValue);
    } else if (value && typeof value === 'object') {
        return sanitizeObject(value);
    }
    return value;
}
/**
 * Sanitize a string
 */ function sanitizeString(str) {
    // Remove null bytes
    str = str.replace(/\0/g, '');
    // Remove control characters (except newline, tab, carriage return)
    str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
    // Trim whitespace
    str = str.trim();
    return str;
}
/**
 * Sanitize an object
 */ function sanitizeObject(obj) {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)){
        // Sanitize key
        const cleanKey = sanitizeString(key);
        // Skip if key is empty after sanitization
        if (!cleanKey) continue;
        // Sanitize value
        sanitized[cleanKey] = sanitizeValue(value);
    }
    return sanitized;
}
function validateUrlParam(param, type) {
    const errors = [];
    if (!param || typeof param !== 'string') {
        errors.push(`Parameter must be a string`);
        return {
            valid: false,
            errors
        };
    }
    switch(type){
        case 'number':
            if (!/^\d+$/.test(param)) {
                errors.push('Parameter must be a number');
            }
            break;
        case 'uuid':
            if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(param)) {
                errors.push('Parameter must be a valid UUID');
            }
            break;
        case 'endpointId':
            return validateEndpointId(param);
        case 'string':
            if (param.length > 1000) {
                errors.push('Parameter too long');
            }
            break;
    }
    const sanitized = sanitizeString(param);
    return {
        valid: errors.length === 0,
        errors,
        sanitized: errors.length === 0 ? sanitized : undefined
    };
}
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
// Logger will be created per instance
/**
 * Build CDP-specific payment requirements for probe mode
 * Uses known-good values for Base + USDC that CDP expects
 * CDP x402 v2 API expects: scheme, network, payTo, maxAmountRequired, resource, asset, etc.
 */ function buildCdpProbePaymentRequirements(config) {
    // USDC contract address on Base
    const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
    // Use a test receiver address (can be any valid address you control)
    // For probes, we use a known test address that won't cause issues
    const PROBE_RECEIVER = '0x0000000000000000000000000000000000000001'; // Test address
    // CDP requires CAIP-2 format (e.g., "eip155:8453") for network
    // Keep network in CAIP-2 format, don't convert to legacy
    const network = config.network; // Already in CAIP-2 format (e.g., "eip155:8453")
    const now = Math.floor(Date.now() / 1000);
    return {
        scheme: 'exact',
        network: network,
        to: PROBE_RECEIVER,
        payTo: PROBE_RECEIVER,
        value: '1000000',
        maxAmountRequired: '1000000',
        resource: `https://probe.nexflow.dev/health/${config.facilitatorId}/${config.network}/${config.token}`,
        asset: USDC_BASE,
        description: `Health probe for ${config.facilitatorId} on ${config.network}`,
        mimeType: 'application/json',
        maxTimeoutSeconds: 10,
        validAfter: now.toString(),
        validBefore: (now + 300).toString()
    };
}
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
            // Detect probe mode: check if resource URL matches probe pattern
            // Probe resources use pattern: https://probe.nexflow.dev/health/{facilitatorId}/{network}/{token}
            const isProbe = requirements.resource?.startsWith('https://probe.nexflow.dev/health/') ?? false;
            // For probe mode, build CDP-specific probe paymentRequirements
            // Extract probe config from resource URL if in probe mode
            let cdpPaymentRequirements;
            if (isProbe) {
                // Extract facilitatorId, network, token from resource URL
                // Format: https://probe.nexflow.dev/health/{facilitatorId}/{network}/{token}
                const resourceMatch = requirements.resource.match(/\/health\/([^/]+)\/([^/]+)\/([^/]+)/);
                if (resourceMatch) {
                    const [, facilitatorId, network, token] = resourceMatch;
                    const probeConfig = {
                        id: `${facilitatorId}-${network}-${token.toLowerCase()}`,
                        facilitatorId,
                        network,
                        token,
                        desiredIntervalSeconds: 30,
                        enabled: true
                    };
                    cdpPaymentRequirements = buildCdpProbePaymentRequirements(probeConfig);
                    this.getLogger().info({
                        component: 'CDPFacilitatorAdapter',
                        isProbe: true,
                        probeConfigId: probeConfig.id,
                        hasPaymentRequirements: true,
                        msg: 'Using probe-specific paymentRequirements for CDP'
                    });
                } else {
                    // Fallback: use requirements as-is if we can't parse probe config
                    cdpPaymentRequirements = {
                        scheme: requirements.scheme,
                        network: requirements.network,
                        maxAmountRequired: requirements.maxAmountRequired,
                        resource: requirements.resource,
                        description: requirements.description || '',
                        mimeType: requirements.mimeType || 'application/json',
                        payTo: requirements.payTo,
                        maxTimeoutSeconds: requirements.maxTimeoutSeconds || 300,
                        asset: requirements.asset
                    };
                }
            } else {
                // Normal mode: use requirements from caller
                cdpPaymentRequirements = {
                    scheme: requirements.scheme,
                    network: requirements.network,
                    maxAmountRequired: requirements.maxAmountRequired,
                    resource: requirements.resource,
                    description: requirements.description || '',
                    mimeType: requirements.mimeType || 'application/json',
                    payTo: requirements.payTo,
                    maxTimeoutSeconds: requirements.maxTimeoutSeconds || 300,
                    asset: requirements.asset
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
                paymentRequirements: cdpPaymentRequirements
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
"[project]/src/integrations/x402/facilitators/payai-facilitator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// PAYAI FACILITATOR
// =============================================================================
// Multi-chain facilitator for x402 payment verification
// Supports Base, Solana, Ethereum, BNB Chain, and other networks
__turbopack_context__.s([
    "PayAIFacilitator",
    ()=>PayAIFacilitator,
    "getPayAIFacilitator",
    ()=>getPayAIFacilitator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/base-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'PayAIFacilitator'
});
/**
 * Build PayAI-specific payment requirements for probe mode
 * Uses known-good values for Base + USDC that PayAI expects
 */ function buildPayAIProbePaymentRequirements(config) {
    // USDC contract address on Base
    const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
    // Use a test receiver address (can be any valid address you control)
    // For probes, we use a known test address that won't cause issues
    const PROBE_RECEIVER = '0x0000000000000000000000000000000000000001'; // Test address
    // Convert CAIP-2 network to legacy format
    let legacyNetwork = config.network;
    if (config.network === 'eip155:8453') {
        legacyNetwork = 'base';
    }
    return {
        scheme: 'x402',
        network: legacyNetwork,
        asset: USDC_BASE,
        maxAmountRequired: '1',
        resource: `https://probe.nexflow.dev/health/${config.facilitatorId}/${config.network}/${config.token}`,
        description: `Health probe for ${config.facilitatorId} on ${config.network}`,
        mimeType: 'application/json',
        payTo: PROBE_RECEIVER,
        maxTimeoutSeconds: 10,
        settlementMode: 'immediate'
    };
}
class PayAIFacilitator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseFacilitator"] {
    id = 'payai';
    name = 'PayAI Facilitator';
    config = {
        id: 'payai',
        name: 'PayAI Facilitator',
        enabled: process.env.PAYAI_ENABLED !== 'false',
        priority: 2,
        // Legacy network identifiers
        networks: [
            'base',
            'ethereum',
            'solana',
            'bnb',
            'polygon'
        ],
        // CAIP-2 network identifiers (multi-chain support)
        networksCAIP: [
            'eip155:1',
            'eip155:8453',
            'eip155:56',
            'eip155:137',
            'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'
        ],
        // Legacy asset identifiers
        assets: [
            '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
            '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
        ],
        // CAIP-19 asset identifiers (multi-chain support)
        assetsCAIP: [
            // Ethereum USDC
            'eip155:1/erc20:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
            // Base USDC
            'eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
            // BNB Chain USDC
            'eip155:56/erc20:0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
            // Polygon USDC
            'eip155:137/erc20:0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
        ],
        schemes: [
            'exact',
            'x402'
        ],
        settlementModes: [
            'immediate'
        ],
        healthCheckUrl: process.env.PAYAI_FACILITATOR_URL || 'https://facilitator.payai.network',
        metadata: {
            provider: 'PayAI',
            multiChain: true,
            complianceLevel: 'standard',
            website: 'https://payai.network'
        }
    };
    baseUrl;
    constructor(baseUrl){
        super();
        // No API key required for hosted facilitator
        this.baseUrl = baseUrl || process.env.PAYAI_FACILITATOR_URL || 'https://facilitator.payai.network';
    }
    /**
   * Call PayAI /verify endpoint with retry logic for transient errors
   * 
   * Retries on: 429 (rate limit), 500-504 (server errors), network timeouts
   * Does NOT retry on: 400 (invalid_request), 401 (unauthorized), other 4xx
   * 
   * Returns normalized result with success, valid, status, errorType, errorMessage, etc.
   */ async callPayAIVerifyWithRetries(verifyUrl, requestBody, isProbe) {
        const maxRetries = 3;
        const retryableStatuses = [
            429,
            500,
            502,
            503,
            504
        ];
        const startTime = Date.now();
        for(let attempt = 0; attempt < maxRetries; attempt++){
            try {
                const response = await fetch(verifyUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody),
                    signal: AbortSignal.timeout(10000)
                });
                const text = await response.text();
                const data = text ? JSON.parse(text) : {};
                const latencyMs = Date.now() - startTime;
                // Success case
                if (response.ok && data.valid === true) {
                    return {
                        success: true,
                        valid: true,
                        status: response.status,
                        isRateLimited: false,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Check if retryable error
                const isRetryable = retryableStatuses.includes(response.status);
                const isRateLimit = response.status === 429;
                // If not retryable or last attempt, return error
                if (!isRetryable || attempt === maxRetries - 1) {
                    const errorMessage = data.message || data.reason || data.error || `HTTP ${response.status}`;
                    const errorType = data.errorType || data.code || (isRateLimit ? 'rate_limit' : 'PAYAI_VERIFY_FAILED');
                    return {
                        success: false,
                        valid: false,
                        status: response.status,
                        errorType,
                        errorMessage,
                        isRateLimited: isRateLimit,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Retry with exponential backoff
                const delay = 100 * Math.pow(2, attempt); // 100ms, 200ms, 400ms
                logger.info({
                    component: 'PayAIFacilitator',
                    attempt: attempt + 1,
                    maxRetries,
                    status: response.status,
                    delay,
                    isProbe,
                    msg: 'Retrying PayAI verification after transient error'
                });
                await new Promise((resolve)=>setTimeout(resolve, delay));
            } catch (error) {
                const latencyMs = Date.now() - startTime;
                const isTimeout = error?.name === 'AbortError' || error?.message?.toLowerCase().includes('timeout');
                const isNetworkError = error?.message?.toLowerCase().includes('network') || error?.message?.toLowerCase().includes('fetch') || error?.message?.toLowerCase().includes('econnrefused');
                // If network error and not last attempt, retry
                if ((isTimeout || isNetworkError) && attempt < maxRetries - 1) {
                    const delay = 100 * Math.pow(2, attempt);
                    logger.info({
                        component: 'PayAIFacilitator',
                        attempt: attempt + 1,
                        maxRetries,
                        error: error?.message,
                        delay,
                        isProbe,
                        msg: 'Retrying PayAI verification after network error'
                    });
                    await new Promise((resolve)=>setTimeout(resolve, delay));
                    continue;
                }
                // Last attempt or non-network error
                return {
                    success: false,
                    valid: false,
                    status: 0,
                    errorType: isTimeout ? 'timeout' : isNetworkError ? 'network_error' : 'PAYAI_VERIFY_FAILED',
                    errorMessage: error?.message || 'PayAI verification failed',
                    isRateLimited: false,
                    isNetworkError: isTimeout || isNetworkError,
                    latencyMs
                };
            }
        }
        // Should never reach here, but TypeScript needs a return
        return {
            success: false,
            valid: false,
            status: 0,
            errorType: 'PAYAI_VERIFY_FAILED',
            errorMessage: 'Max retries exceeded',
            isRateLimited: false,
            isNetworkError: false,
            latencyMs: Date.now() - startTime
        };
    }
    /**
   * Verify payment using PayAI facilitator
   * 
   * POST to /verify endpoint with paymentPayload and paymentRequirements.
   * No authentication required for hosted facilitator.
   */ async verify(payment, requirements) {
        const start = Date.now();
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
            // Parse payment header to extract authorization details
            const { parseX402Header } = await __turbopack_context__.A("[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript, async loader)");
            const parseResult = parseX402Header(payment);
            if (!parseResult.valid || !parseResult.parsed) {
                return {
                    success: false,
                    valid: false,
                    error: parseResult.error || 'Failed to parse payment header',
                    facilitatorId: this.id,
                    verifiedAt: new Date().toISOString()
                };
            }
            const parsed = parseResult.parsed;
            // Detect probe mode: check if resource URL matches probe pattern
            // Probe resources use pattern: https://probe.nexflow.dev/health/{facilitatorId}/{network}/{token}
            const isProbe = requirements.resource?.startsWith('https://probe.nexflow.dev/health/') ?? false;
            // For probe mode, build PayAI-specific probe paymentRequirements
            // Extract probe config from resource URL if in probe mode
            let probeRequirements;
            if (isProbe) {
                // Extract facilitatorId, network, token from resource URL
                // Format: https://probe.nexflow.dev/health/{facilitatorId}/{network}/{token}
                const resourceMatch = requirements.resource.match(/\/health\/([^/]+)\/([^/]+)\/([^/]+)/);
                if (resourceMatch) {
                    const [, facilitatorId, network, token] = resourceMatch;
                    const probeConfig = {
                        id: `${facilitatorId}-${network}-${token.toLowerCase()}`,
                        facilitatorId,
                        network,
                        token,
                        desiredIntervalSeconds: 120,
                        enabled: true
                    };
                    probeRequirements = buildPayAIProbePaymentRequirements(probeConfig);
                    logger.info({
                        component: 'PayAIFacilitator',
                        isProbe: true,
                        probeConfigId: probeConfig.id,
                        hasPaymentRequirements: true,
                        msg: 'Using probe-specific paymentRequirements for PayAI'
                    });
                } else {
                    // Fallback: use requirements as-is if we can't parse probe config
                    probeRequirements = requirements;
                }
            } else {
                // Normal mode: use requirements from caller
                probeRequirements = requirements;
            }
            // Build paymentPayload from parsed payment header
            const paymentPayload = {
                x402Version: 2,
                scheme: probeRequirements.scheme || 'x402',
                network: parsed.network || probeRequirements.network,
                payload: {
                    signature: parsed.signature,
                    authorization: {
                        from: parsed.authorization.from,
                        to: parsed.authorization.to,
                        value: parsed.authorization.value,
                        validAfter: parsed.authorization.validAfter,
                        validBefore: parsed.authorization.validBefore,
                        nonce: parsed.authorization.nonce
                    }
                }
            };
            // Build paymentRequirements from requirements (use probe-specific if in probe mode)
            const paymentRequirements = {
                scheme: probeRequirements.scheme,
                network: probeRequirements.network,
                maxAmountRequired: probeRequirements.maxAmountRequired,
                resource: probeRequirements.resource,
                description: probeRequirements.description || '',
                mimeType: probeRequirements.mimeType || 'application/json',
                payTo: probeRequirements.payTo,
                maxTimeoutSeconds: probeRequirements.maxTimeoutSeconds || 300,
                asset: probeRequirements.asset
            };
            // POST to PayAI verification endpoint with retry logic
            const verifyUrl = `${this.baseUrl}/verify`;
            const requestBody = {
                paymentPayload,
                paymentRequirements
            };
            // isProbe already declared above (line 300), reuse it
            logger.info({
                component: "PayAIFacilitator",
                isProbe,
                network: paymentRequirements.network,
                asset: paymentRequirements.asset,
                url: verifyUrl,
                msg: "Sending PayAI /verify request"
            });
            // Call PayAI /verify with retry logic
            const result = await this.callPayAIVerifyWithRetries(verifyUrl, requestBody, isProbe);
            const latency = result.latencyMs;
            // Handle success
            if (result.success && result.valid) {
                logger.info({
                    latencyMs: result.latencyMs
                }, 'Payment verified successfully by PayAI');
                return {
                    success: true,
                    valid: true,
                    transactionHash: result.data?.transactionHash || result.data?.txHash,
                    facilitatorId: this.id,
                    verifiedAt: new Date().toISOString()
                };
            }
            // Handle error - map PayAI errorType/errorMessage to our error classification
            const payaiErrorType = result.errorType || 'PAYAI_VERIFY_FAILED';
            const payaiErrorMessage = result.errorMessage || 'PayAI verification failed';
            // Map error types to result/errorCode
            let errorCode = 'facilitator_error';
            if (result.isRateLimited || payaiErrorType === 'rate_limit') {
                errorCode = 'rate_limited';
            } else if (result.isNetworkError) {
                errorCode = 'network_error';
            } else if (payaiErrorType === 'invalid_request' || result.status === 400) {
                errorCode = 'invalid_request';
            } else if (result.status === 401) {
                errorCode = 'unauthorized';
            }
            logger.debug({
                status: result.status,
                errorType: payaiErrorType,
                errorMessage: payaiErrorMessage,
                errorCode,
                isRateLimited: result.isRateLimited,
                isNetworkError: result.isNetworkError,
                latencyMs: result.latencyMs
            }, 'PayAI verification failed');
            return {
                success: false,
                valid: false,
                error: payaiErrorMessage,
                errorDetails: {
                    error: payaiErrorMessage,
                    errorType: payaiErrorType,
                    httpStatus: result.status,
                    errorCode,
                    isRateLimited: result.isRateLimited,
                    isNetworkError: result.isNetworkError,
                    payaiResponse: result.data
                },
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        } catch (error) {
            const latency = Date.now() - start;
            const errorMessage = error instanceof Error ? error.message : 'Verification failed';
            const isTimeout = error instanceof Error && (error.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout'));
            this.getLogger().error({
                error,
                requirements,
                latency,
                isTimeout
            }, 'PayAI verification error');
            return {
                success: false,
                valid: false,
                error: isTimeout ? 'PayAI_REQUEST_TIMEOUT' : errorMessage,
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        }
    }
    /**
   * Get PayAI facilitator health
   * 
   * Calls GET /list endpoint. If 200 with non-empty networks/assets, returns healthy.
   */ async getHealth() {
        const start = Date.now();
        try {
            // PayAI redirects /list to /discovery/resources
            const healthUrl = `${this.baseUrl}/discovery/resources`;
            const response = await fetch(healthUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: AbortSignal.timeout(5000)
            });
            const latency = Date.now() - start;
            if (response.ok) {
                const data = await response.json();
                // Check if response has networks/assets (non-empty)
                const hasNetworks = data.networks && Array.isArray(data.networks) && data.networks.length > 0;
                const hasAssets = data.assets && Array.isArray(data.assets) && data.assets.length > 0;
                if (hasNetworks || hasAssets) {
                    return {
                        healthy: true,
                        latency,
                        lastChecked: new Date().toISOString(),
                        capabilities: {
                            networks: data.networks || this.config.networks,
                            assets: data.assets || this.config.assets,
                            schemes: data.schemes || this.config.schemes
                        }
                    };
                }
                // 200 but empty response - consider unhealthy
                return {
                    healthy: false,
                    latency,
                    lastChecked: new Date().toISOString(),
                    error: 'Health check returned empty networks/assets',
                    capabilities: {
                        networks: this.config.networks,
                        assets: this.config.assets,
                        schemes: this.config.schemes
                    }
                };
            }
            // Non-2xx response
            const errorText = await response.text().catch(()=>`HTTP ${response.status}`);
            return {
                healthy: false,
                latency,
                lastChecked: new Date().toISOString(),
                error: errorText,
                capabilities: {
                    networks: this.config.networks,
                    assets: this.config.assets,
                    schemes: this.config.schemes
                }
            };
        } catch (error) {
            const latency = Date.now() - start;
            const errorMessage = error instanceof Error ? error.message : 'Health check failed';
            const isTimeout = error instanceof Error && (error.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout'));
            return {
                healthy: false,
                latency,
                lastChecked: new Date().toISOString(),
                error: isTimeout ? 'Health check timeout' : errorMessage,
                capabilities: {
                    networks: this.config.networks,
                    assets: this.config.assets,
                    schemes: this.config.schemes
                }
            };
        }
    }
    /**
   * Get pricing information
   * 
   * Returns null for now - can be implemented once PayAI pricing API is available.
   */ async getPricing(network, asset) {
        // TODO: Implement pricing lookup if PayAI provides pricing API
        // For now, return null (allowed by interface)
        return null;
    }
    /**
   * Check if facilitator supports network/asset/scheme
   * Uses base class implementation which checks config
   */ supports(network, asset, scheme, settlementMode) {
        return super.supports(network, asset, scheme, settlementMode);
    }
}
/**
 * Singleton PayAI facilitator instance
 */ let payaiFacilitator = null;
function getPayAIFacilitator() {
    if (!payaiFacilitator) {
        payaiFacilitator = new PayAIFacilitator();
    }
    return payaiFacilitator;
}
}),
"[project]/src/integrations/x402/facilitators/x402rs-facilitator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// X402RS FACILITATOR
// =============================================================================
// Rust-based x402 facilitator operated by the x402 community
// Public hosted endpoint: https://facilitator.x402.rs
// Can also be self-hosted via Docker: https://github.com/x402-rs/x402-rs
// Supported networks: Base, Base Sepolia, XDC, Solana (configurable)
__turbopack_context__.s([
    "X402rsFacilitator",
    ()=>X402rsFacilitator,
    "getX402rsFacilitator",
    ()=>getX402rsFacilitator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/base-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'X402rsFacilitator'
});
/**
 * Build X402rs-specific payment requirements for probe mode
 * Uses known-good values that X402rs expects
 */ function buildX402rsProbePaymentRequirements(config) {
    // USDC contract address on Base
    const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
    // USDC on Base Sepolia (testnet)
    const USDC_BASE_SEPOLIA = '0x036CbD53842c5426634e7929541eC2318f3dCF7e';
    // Determine asset based on network
    let asset = USDC_BASE;
    if (config.network === 'eip155:84532') {
        asset = USDC_BASE_SEPOLIA;
    }
    // Use a test receiver address for probes
    const PROBE_RECEIVER = '0x0000000000000000000000000000000000000001';
    return {
        scheme: 'x402',
        network: config.network,
        asset,
        maxAmountRequired: '1',
        resource: `https://probe.nexflow.dev/health/${config.facilitatorId}/${config.network}/${config.token}`,
        description: `Health probe for ${config.facilitatorId} on ${config.network}`,
        mimeType: 'application/json',
        payTo: PROBE_RECEIVER,
        maxTimeoutSeconds: 10,
        settlementMode: 'immediate'
    };
}
class X402rsFacilitator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseFacilitator"] {
    id = 'x402rs';
    name = 'X402rs Facilitator';
    config = {
        id: 'x402rs',
        name: 'X402rs Facilitator',
        enabled: process.env.X402RS_ENABLED !== 'false',
        priority: 2,
        // Legacy network identifiers
        networks: [
            'base',
            'base-sepolia',
            'xdc'
        ],
        // CAIP-2 network identifiers
        networksCAIP: [
            'eip155:84532',
            'eip155:8453',
            'xdc:50'
        ],
        // Legacy asset identifiers (include both contract addresses and symbols for probe compatibility)
        assets: [
            'USDC',
            '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
            '0x036CbD53842c5426634e7929541eC2318f3dCF7e'
        ],
        // CAIP-19 asset identifiers
        assetsCAIP: [
            'eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
            'eip155:84532/erc20:0x036CbD53842c5426634e7929541eC2318f3dCF7e'
        ],
        schemes: [
            'exact',
            'x402'
        ],
        settlementModes: [
            'immediate'
        ],
        healthCheckUrl: process.env.X402RS_FACILITATOR_URL || 'https://facilitator.x402.rs',
        metadata: {
            provider: 'x402 Community',
            label: 'X402rs Facilitator',
            url: 'https://facilitator.x402.rs',
            website: 'https://x402.org',
            rustBased: true,
            openSource: true,
            complianceLevel: 'community'
        }
    };
    baseUrl;
    constructor(baseUrl){
        super();
        this.baseUrl = baseUrl || process.env.X402RS_FACILITATOR_URL || 'https://facilitator.x402.rs';
    }
    /**
   * Get the facilitator URL
   */ getUrl() {
        return this.baseUrl;
    }
    /**
   * Call X402rs /verify endpoint with retry logic for transient errors
   */ async callX402rsVerifyWithRetries(verifyUrl, requestBody, isProbe) {
        const maxRetries = 3;
        const retryableStatuses = [
            429,
            500,
            502,
            503,
            504
        ];
        const startTime = Date.now();
        for(let attempt = 0; attempt < maxRetries; attempt++){
            try {
                const response = await fetch(verifyUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody),
                    signal: AbortSignal.timeout(10000)
                });
                const text = await response.text();
                const data = text ? JSON.parse(text) : {};
                const latencyMs = Date.now() - startTime;
                // Success case
                if (response.ok && data.valid === true) {
                    return {
                        success: true,
                        valid: true,
                        status: response.status,
                        isRateLimited: false,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Check if retryable error
                const isRetryable = retryableStatuses.includes(response.status);
                const isRateLimit = response.status === 429;
                // If not retryable or last attempt, return error
                if (!isRetryable || attempt === maxRetries - 1) {
                    const errorMessage = data.message || data.reason || data.error || `HTTP ${response.status}`;
                    const errorType = data.errorType || data.code || (isRateLimit ? 'rate_limit' : 'X402RS_VERIFY_FAILED');
                    return {
                        success: false,
                        valid: false,
                        status: response.status,
                        errorType,
                        errorMessage,
                        isRateLimited: isRateLimit,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Retry with exponential backoff
                const delay = 100 * Math.pow(2, attempt);
                logger.info({
                    component: 'X402rsFacilitator',
                    attempt: attempt + 1,
                    maxRetries,
                    status: response.status,
                    delay,
                    isProbe,
                    msg: 'Retrying X402rs verification after transient error'
                });
                await new Promise((resolve)=>setTimeout(resolve, delay));
            } catch (error) {
                const latencyMs = Date.now() - startTime;
                const isTimeout = error?.name === 'AbortError' || error?.message?.toLowerCase().includes('timeout');
                const isNetworkError = error?.message?.toLowerCase().includes('network') || error?.message?.toLowerCase().includes('fetch') || error?.message?.toLowerCase().includes('econnrefused');
                if ((isTimeout || isNetworkError) && attempt < maxRetries - 1) {
                    const delay = 100 * Math.pow(2, attempt);
                    logger.info({
                        component: 'X402rsFacilitator',
                        attempt: attempt + 1,
                        maxRetries,
                        error: error?.message,
                        delay,
                        isProbe,
                        msg: 'Retrying X402rs verification after network error'
                    });
                    await new Promise((resolve)=>setTimeout(resolve, delay));
                    continue;
                }
                return {
                    success: false,
                    valid: false,
                    status: 0,
                    errorType: isTimeout ? 'timeout' : isNetworkError ? 'network_error' : 'X402RS_VERIFY_FAILED',
                    errorMessage: error?.message || 'X402rs verification failed',
                    isRateLimited: false,
                    isNetworkError: isTimeout || isNetworkError,
                    latencyMs
                };
            }
        }
        return {
            success: false,
            valid: false,
            status: 0,
            errorType: 'X402RS_VERIFY_FAILED',
            errorMessage: 'Max retries exceeded',
            isRateLimited: false,
            isNetworkError: false,
            latencyMs: Date.now() - startTime
        };
    }
    /**
   * Verify payment using X402rs facilitator
   */ async verify(payment, requirements) {
        const start = Date.now();
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
            // Parse payment header
            const { parseX402Header } = await __turbopack_context__.A("[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript, async loader)");
            const parseResult = parseX402Header(payment);
            if (!parseResult.valid || !parseResult.parsed) {
                return {
                    success: false,
                    valid: false,
                    error: parseResult.error || 'Failed to parse payment header',
                    facilitatorId: this.id,
                    verifiedAt: new Date().toISOString()
                };
            }
            const parsed = parseResult.parsed;
            // Detect probe mode
            const isProbe = requirements.resource?.startsWith('https://probe.nexflow.dev/health/') ?? false;
            // Build payment payload
            const paymentPayload = {
                x402Version: 2,
                scheme: requirements.scheme || 'x402',
                network: parsed.network || requirements.network,
                payload: {
                    signature: parsed.signature,
                    authorization: {
                        from: parsed.authorization.from,
                        to: parsed.authorization.to,
                        value: parsed.authorization.value,
                        validAfter: parsed.authorization.validAfter,
                        validBefore: parsed.authorization.validBefore,
                        nonce: parsed.authorization.nonce
                    }
                }
            };
            // Build payment requirements
            const paymentRequirements = {
                scheme: requirements.scheme,
                network: requirements.network,
                maxAmountRequired: requirements.maxAmountRequired,
                resource: requirements.resource,
                description: requirements.description || '',
                mimeType: requirements.mimeType || 'application/json',
                payTo: requirements.payTo,
                maxTimeoutSeconds: requirements.maxTimeoutSeconds || 300,
                asset: requirements.asset
            };
            // POST to X402rs verification endpoint
            const verifyUrl = `${this.baseUrl}/verify`;
            const requestBody = {
                paymentPayload,
                paymentRequirements
            };
            logger.info({
                component: 'X402rsFacilitator',
                isProbe,
                network: paymentRequirements.network,
                asset: paymentRequirements.asset,
                url: verifyUrl,
                facilitatorId: this.id,
                facilitatorUrl: this.baseUrl,
                msg: 'Sending X402rs /verify request'
            });
            // Call with retry logic
            const result = await this.callX402rsVerifyWithRetries(verifyUrl, requestBody, isProbe);
            // Handle success
            if (result.success && result.valid) {
                logger.info({
                    component: 'X402rsFacilitator',
                    facilitatorId: this.id,
                    facilitatorUrl: this.baseUrl,
                    latencyMs: result.latencyMs,
                    network: requirements.network,
                    msg: 'Payment verified successfully by X402rs'
                });
                return {
                    success: true,
                    valid: true,
                    transactionHash: result.data?.transactionHash || result.data?.txHash,
                    facilitatorId: this.id,
                    verifiedAt: new Date().toISOString()
                };
            }
            // Handle error
            const errorType = result.errorType || 'X402RS_VERIFY_FAILED';
            const errorMessage = result.errorMessage || 'X402rs verification failed';
            let errorCode = 'facilitator_error';
            if (result.isRateLimited || errorType === 'rate_limit') {
                errorCode = 'rate_limited';
            } else if (result.isNetworkError) {
                errorCode = 'network_error';
            } else if (errorType === 'invalid_request' || result.status === 400) {
                errorCode = 'invalid_request';
            }
            logger.debug({
                component: 'X402rsFacilitator',
                facilitatorId: this.id,
                status: result.status,
                errorType,
                errorMessage,
                errorCode,
                isRateLimited: result.isRateLimited,
                isNetworkError: result.isNetworkError,
                latencyMs: result.latencyMs,
                msg: 'X402rs verification failed'
            });
            return {
                success: false,
                valid: false,
                error: errorMessage,
                errorDetails: {
                    error: errorMessage,
                    errorType,
                    httpStatus: result.status,
                    errorCode,
                    isRateLimited: result.isRateLimited,
                    isNetworkError: result.isNetworkError,
                    x402rsResponse: result.data
                },
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        } catch (error) {
            const latency = Date.now() - start;
            const errorMessage = error instanceof Error ? error.message : 'Verification failed';
            const isTimeout = error instanceof Error && (error.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout'));
            this.getLogger().error({
                error,
                requirements,
                latency,
                isTimeout
            }, 'X402rs verification error');
            return {
                success: false,
                valid: false,
                error: isTimeout ? 'X402RS_REQUEST_TIMEOUT' : errorMessage,
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        }
    }
    /**
   * Get X402rs facilitator health
   */ async getHealth() {
        const start = Date.now();
        try {
            // X402rs health check endpoint
            const healthUrl = `${this.baseUrl}/health`;
            const response = await fetch(healthUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: AbortSignal.timeout(5000)
            });
            const latency = Date.now() - start;
            if (response.ok) {
                let data = {};
                try {
                    data = await response.json();
                } catch  {
                // Health endpoint might return simple OK
                }
                return {
                    healthy: true,
                    latency,
                    lastChecked: new Date().toISOString(),
                    capabilities: {
                        networks: data.networks || this.config.networks,
                        assets: data.assets || this.config.assets,
                        schemes: data.schemes || this.config.schemes
                    }
                };
            }
            const errorText = await response.text().catch(()=>`HTTP ${response.status}`);
            return {
                healthy: false,
                latency,
                lastChecked: new Date().toISOString(),
                error: errorText,
                capabilities: {
                    networks: this.config.networks,
                    assets: this.config.assets,
                    schemes: this.config.schemes
                }
            };
        } catch (error) {
            const latency = Date.now() - start;
            const errorMessage = error instanceof Error ? error.message : 'Health check failed';
            const isTimeout = error instanceof Error && (error.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout'));
            return {
                healthy: false,
                latency,
                lastChecked: new Date().toISOString(),
                error: isTimeout ? 'Health check timeout' : errorMessage,
                capabilities: {
                    networks: this.config.networks,
                    assets: this.config.assets,
                    schemes: this.config.schemes
                }
            };
        }
    }
    /**
   * Get pricing information (not available for X402rs yet)
   */ async getPricing(network, asset) {
        // TODO: Implement if X402rs provides pricing API
        return null;
    }
    /**
   * Check if facilitator supports network/asset/scheme
   */ supports(network, asset, scheme, settlementMode) {
        return super.supports(network, asset, scheme, settlementMode);
    }
}
// Singleton instance
let x402rsFacilitator = null;
function getX402rsFacilitator() {
    if (!x402rsFacilitator) {
        x402rsFacilitator = new X402rsFacilitator();
    }
    return x402rsFacilitator;
}
}),
"[project]/src/integrations/x402/facilitators/dexter-facilitator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// DEXTER FACILITATOR
// =============================================================================
// Solana-native x402 facilitator operated by Dexter
// Public hosted endpoint: https://facilitator.dexter.cash
// Standard x402 endpoints: /verify and /settle
// Supports Solana mainnet and devnet networks
__turbopack_context__.s([
    "DexterFacilitator",
    ()=>DexterFacilitator,
    "dexterSettle",
    ()=>dexterSettle,
    "dexterVerify",
    ()=>dexterVerify,
    "getDexterFacilitator",
    ()=>getDexterFacilitator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/base-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'DexterFacilitator'
});
/**
 * Build Dexter-specific payment requirements for probe mode
 * Uses known-good values that Dexter expects
 */ function buildDexterProbePaymentRequirements(config) {
    // USDC on Solana mainnet (SPL token mint address)
    const USDC_SOLANA_MAINNET = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
    // USDC on Solana devnet (SPL token mint address)
    const USDC_SOLANA_DEVNET = '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU';
    // Determine asset based on network
    let asset = USDC_SOLANA_MAINNET;
    if (config.network === 'solana:102' || config.network === 'solana:devnet') {
        asset = USDC_SOLANA_DEVNET;
    }
    // Use a test receiver address for probes
    const PROBE_RECEIVER = '11111111111111111111111111111111'; // System program (placeholder)
    return {
        scheme: 'x402',
        network: config.network,
        asset,
        maxAmountRequired: '1',
        resource: `https://probe.nexflow.dev/health/${config.facilitatorId}/${config.network}/${config.token}`,
        description: `Health probe for ${config.facilitatorId} on ${config.network}`,
        mimeType: 'application/json',
        payTo: PROBE_RECEIVER,
        maxTimeoutSeconds: 10,
        settlementMode: 'immediate'
    };
}
class DexterFacilitator extends __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$base$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseFacilitator"] {
    id = 'dexter';
    name = 'Dexter Facilitator';
    config = {
        id: 'dexter',
        name: 'Dexter Facilitator',
        enabled: process.env.DEXTER_ENABLED !== 'false',
        priority: 2,
        // Legacy network identifiers
        networks: [
            'solana',
            'solana-mainnet',
            'solana-devnet'
        ],
        // CAIP-2 network identifiers
        networksCAIP: [
            'solana:101',
            'solana:102',
            'solana:mainnet',
            'solana:devnet'
        ],
        // Legacy asset identifiers (include both contract addresses and symbols for probe compatibility)
        assets: [
            'USDC',
            'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
            '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'
        ],
        // CAIP-19 asset identifiers
        assetsCAIP: [
            'solana:101/spl:EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
            'solana:102/spl:4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'
        ],
        schemes: [
            'exact',
            'x402'
        ],
        settlementModes: [
            'immediate'
        ],
        healthCheckUrl: process.env.DEXTER_FACILITATOR_URL || 'https://facilitator.dexter.cash',
        metadata: {
            provider: 'Dexter',
            label: 'Dexter Facilitator',
            url: 'https://facilitator.dexter.cash',
            website: 'https://dexter.cash',
            solanaNative: true,
            complianceLevel: 'community',
            notes: 'Solana-native x402 facilitator'
        }
    };
    baseUrl;
    constructor(baseUrl){
        super();
        this.baseUrl = baseUrl || process.env.DEXTER_FACILITATOR_URL || 'https://facilitator.dexter.cash';
    }
    /**
   * Get the facilitator URL
   */ getUrl() {
        return this.baseUrl;
    }
    /**
   * Call Dexter /verify endpoint with retry logic for transient errors
   */ async callDexterVerifyWithRetries(verifyUrl, requestBody, isProbe) {
        const maxRetries = 3;
        const retryableStatuses = [
            429,
            500,
            502,
            503,
            504
        ];
        const startTime = Date.now();
        for(let attempt = 0; attempt < maxRetries; attempt++){
            try {
                const response = await fetch(verifyUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody),
                    signal: AbortSignal.timeout(10000)
                });
                const text = await response.text();
                const data = text ? JSON.parse(text) : {};
                const latencyMs = Date.now() - startTime;
                // Success case
                if (response.ok && data.valid === true) {
                    return {
                        success: true,
                        valid: true,
                        status: response.status,
                        isRateLimited: false,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Check if retryable error
                const isRetryable = retryableStatuses.includes(response.status);
                const isRateLimit = response.status === 429;
                // If not retryable or last attempt, return error
                if (!isRetryable || attempt === maxRetries - 1) {
                    const errorMessage = data.message || data.reason || data.error || `HTTP ${response.status}`;
                    const errorType = data.errorType || data.code || (isRateLimit ? 'rate_limit' : 'DEXTER_VERIFY_FAILED');
                    return {
                        success: false,
                        valid: false,
                        status: response.status,
                        errorType,
                        errorMessage,
                        isRateLimited: isRateLimit,
                        isNetworkError: false,
                        latencyMs,
                        data
                    };
                }
                // Retry with exponential backoff
                const delay = 100 * Math.pow(2, attempt);
                logger.info({
                    component: 'DexterFacilitator',
                    attempt: attempt + 1,
                    maxRetries,
                    status: response.status,
                    delay,
                    isProbe,
                    msg: 'Retrying Dexter verification after transient error'
                });
                await new Promise((resolve)=>setTimeout(resolve, delay));
            } catch (error) {
                const latencyMs = Date.now() - startTime;
                const isTimeout = error?.name === 'AbortError' || error?.message?.toLowerCase().includes('timeout');
                const isNetworkError = error?.message?.toLowerCase().includes('network') || error?.message?.toLowerCase().includes('fetch') || error?.message?.toLowerCase().includes('econnrefused');
                if ((isTimeout || isNetworkError) && attempt < maxRetries - 1) {
                    const delay = 100 * Math.pow(2, attempt);
                    logger.info({
                        component: 'DexterFacilitator',
                        attempt: attempt + 1,
                        maxRetries,
                        error: error?.message,
                        delay,
                        isProbe,
                        msg: 'Retrying Dexter verification after network error'
                    });
                    await new Promise((resolve)=>setTimeout(resolve, delay));
                    continue;
                }
                return {
                    success: false,
                    valid: false,
                    status: 0,
                    errorType: isTimeout ? 'timeout' : isNetworkError ? 'network_error' : 'DEXTER_VERIFY_FAILED',
                    errorMessage: error?.message || 'Dexter verification failed',
                    isRateLimited: false,
                    isNetworkError: isTimeout || isNetworkError,
                    latencyMs
                };
            }
        }
        return {
            success: false,
            valid: false,
            status: 0,
            errorType: 'DEXTER_VERIFY_FAILED',
            errorMessage: 'Max retries exceeded',
            isRateLimited: false,
            isNetworkError: false,
            latencyMs: Date.now() - startTime
        };
    }
    /**
   * Verify payment using Dexter facilitator
   * POST https://facilitator.dexter.cash/verify
   */ async verify(payment, requirements) {
        const start = Date.now();
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
            // Parse payment header
            const { parseX402Header } = await __turbopack_context__.A("[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript, async loader)");
            const parseResult = parseX402Header(payment);
            if (!parseResult.valid || !parseResult.parsed) {
                return {
                    success: false,
                    valid: false,
                    error: parseResult.error || 'Failed to parse payment header',
                    facilitatorId: this.id,
                    verifiedAt: new Date().toISOString()
                };
            }
            const parsed = parseResult.parsed;
            // Detect probe mode
            const isProbe = requirements.resource?.startsWith('https://probe.nexflow.dev/health/') ?? false;
            // Build payment payload
            const paymentPayload = {
                x402Version: 2,
                scheme: requirements.scheme || 'x402',
                network: parsed.network || requirements.network,
                payload: {
                    signature: parsed.signature,
                    authorization: {
                        from: parsed.authorization.from,
                        to: parsed.authorization.to,
                        value: parsed.authorization.value,
                        validAfter: parsed.authorization.validAfter,
                        validBefore: parsed.authorization.validBefore,
                        nonce: parsed.authorization.nonce
                    }
                }
            };
            // Build payment requirements
            const paymentRequirements = {
                scheme: requirements.scheme,
                network: requirements.network,
                maxAmountRequired: requirements.maxAmountRequired,
                resource: requirements.resource,
                description: requirements.description || '',
                mimeType: requirements.mimeType || 'application/json',
                payTo: requirements.payTo,
                maxTimeoutSeconds: requirements.maxTimeoutSeconds || 300,
                asset: requirements.asset
            };
            // POST to Dexter verification endpoint
            const verifyUrl = `${this.baseUrl}/verify`;
            const requestBody = {
                paymentPayload,
                paymentRequirements
            };
            logger.info({
                component: 'DexterFacilitator',
                isProbe,
                network: paymentRequirements.network,
                asset: paymentRequirements.asset,
                url: verifyUrl,
                facilitatorId: this.id,
                facilitatorUrl: this.baseUrl,
                msg: 'Sending Dexter /verify request'
            });
            // Call with retry logic
            const result = await this.callDexterVerifyWithRetries(verifyUrl, requestBody, isProbe);
            // Handle success
            if (result.success && result.valid) {
                logger.info({
                    component: 'DexterFacilitator',
                    facilitatorId: this.id,
                    facilitatorUrl: this.baseUrl,
                    latencyMs: result.latencyMs,
                    network: requirements.network,
                    msg: 'Payment verified successfully by Dexter'
                });
                return {
                    success: true,
                    valid: true,
                    transactionHash: result.data?.transactionHash || result.data?.txHash,
                    facilitatorId: this.id,
                    verifiedAt: new Date().toISOString()
                };
            }
            // Handle error
            const errorType = result.errorType || 'DEXTER_VERIFY_FAILED';
            const errorMessage = result.errorMessage || 'Dexter verification failed';
            let errorCode = 'facilitator_error';
            if (result.isRateLimited || errorType === 'rate_limit') {
                errorCode = 'rate_limited';
            } else if (result.isNetworkError) {
                errorCode = 'network_error';
            } else if (errorType === 'invalid_request' || result.status === 400) {
                errorCode = 'invalid_request';
            }
            logger.debug({
                component: 'DexterFacilitator',
                facilitatorId: this.id,
                status: result.status,
                errorType,
                errorMessage,
                errorCode,
                isRateLimited: result.isRateLimited,
                isNetworkError: result.isNetworkError,
                latencyMs: result.latencyMs,
                msg: 'Dexter verification failed'
            });
            return {
                success: false,
                valid: false,
                error: errorMessage,
                errorDetails: {
                    error: errorMessage,
                    errorType,
                    httpStatus: result.status,
                    errorCode,
                    isRateLimited: result.isRateLimited,
                    isNetworkError: result.isNetworkError,
                    dexterResponse: result.data
                },
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        } catch (error) {
            const latency = Date.now() - start;
            const errorMessage = error instanceof Error ? error.message : 'Verification failed';
            const isTimeout = error instanceof Error && (error.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout'));
            this.getLogger().error({
                error,
                requirements,
                latency,
                isTimeout
            }, 'Dexter verification error');
            return {
                success: false,
                valid: false,
                error: isTimeout ? 'DEXTER_REQUEST_TIMEOUT' : errorMessage,
                facilitatorId: this.id,
                verifiedAt: new Date().toISOString()
            };
        }
    }
    /**
   * Settle payment using Dexter facilitator
   * POST https://facilitator.dexter.cash/settle
   */ async settle(payment, requirements) {
        const start = Date.now();
        try {
            // Parse payment header
            const { parseX402Header } = await __turbopack_context__.A("[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript, async loader)");
            const parseResult = parseX402Header(payment);
            if (!parseResult.valid || !parseResult.parsed) {
                return {
                    success: false,
                    settled: false,
                    error: parseResult.error || 'Failed to parse payment header',
                    facilitatorId: this.id,
                    settledAt: new Date().toISOString()
                };
            }
            const parsed = parseResult.parsed;
            // Build payment payload
            const paymentPayload = {
                x402Version: 2,
                scheme: requirements.scheme || 'x402',
                network: parsed.network || requirements.network,
                payload: {
                    signature: parsed.signature,
                    authorization: {
                        from: parsed.authorization.from,
                        to: parsed.authorization.to,
                        value: parsed.authorization.value,
                        validAfter: parsed.authorization.validAfter,
                        validBefore: parsed.authorization.validBefore,
                        nonce: parsed.authorization.nonce
                    }
                }
            };
            // Build payment requirements
            const paymentRequirements = {
                scheme: requirements.scheme,
                network: requirements.network,
                maxAmountRequired: requirements.maxAmountRequired,
                resource: requirements.resource,
                description: requirements.description || '',
                mimeType: requirements.mimeType || 'application/json',
                payTo: requirements.payTo,
                maxTimeoutSeconds: requirements.maxTimeoutSeconds || 300,
                asset: requirements.asset
            };
            // POST to Dexter settlement endpoint
            const settleUrl = `${this.baseUrl}/settle`;
            const requestBody = {
                paymentPayload,
                paymentRequirements
            };
            logger.info({
                component: 'DexterFacilitator',
                network: paymentRequirements.network,
                asset: paymentRequirements.asset,
                url: settleUrl,
                facilitatorId: this.id,
                facilitatorUrl: this.baseUrl,
                msg: 'Sending Dexter /settle request'
            });
            const response = await fetch(settleUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                signal: AbortSignal.timeout(30000)
            });
            const latencyMs = Date.now() - start;
            const text = await response.text();
            const data = text ? JSON.parse(text) : {};
            if (response.ok && (data.settled === true || data.success === true)) {
                logger.info({
                    component: 'DexterFacilitator',
                    facilitatorId: this.id,
                    facilitatorUrl: this.baseUrl,
                    latencyMs,
                    network: requirements.network,
                    transactionHash: data.transactionHash || data.txHash,
                    msg: 'Payment settled successfully by Dexter'
                });
                return {
                    success: true,
                    settled: true,
                    transactionHash: data.transactionHash || data.txHash,
                    facilitatorId: this.id,
                    settledAt: new Date().toISOString()
                };
            }
            const errorMessage = data.message || data.reason || data.error || `HTTP ${response.status}`;
            logger.error({
                component: 'DexterFacilitator',
                facilitatorId: this.id,
                status: response.status,
                errorMessage,
                latencyMs,
                msg: 'Dexter settlement failed'
            });
            return {
                success: false,
                settled: false,
                error: errorMessage,
                errorDetails: {
                    httpStatus: response.status,
                    dexterResponse: data
                },
                facilitatorId: this.id,
                settledAt: new Date().toISOString()
            };
        } catch (error) {
            const latency = Date.now() - start;
            const errorMessage = error instanceof Error ? error.message : 'Settlement failed';
            const isTimeout = error instanceof Error && (error.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout'));
            this.getLogger().error({
                error,
                requirements,
                latency,
                isTimeout
            }, 'Dexter settlement error');
            return {
                success: false,
                settled: false,
                error: isTimeout ? 'DEXTER_REQUEST_TIMEOUT' : errorMessage,
                facilitatorId: this.id,
                settledAt: new Date().toISOString()
            };
        }
    }
    /**
   * Get Dexter facilitator health
   */ async getHealth() {
        const start = Date.now();
        try {
            // Dexter health check endpoint
            const healthUrl = `${this.baseUrl}/health`;
            const response = await fetch(healthUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                signal: AbortSignal.timeout(5000)
            });
            const latency = Date.now() - start;
            if (response.ok) {
                let data = {};
                try {
                    data = await response.json();
                } catch  {
                // Health endpoint might return simple OK
                }
                return {
                    healthy: true,
                    latency,
                    lastChecked: new Date().toISOString(),
                    capabilities: {
                        networks: data.networks || this.config.networks,
                        assets: data.assets || this.config.assets,
                        schemes: data.schemes || this.config.schemes
                    }
                };
            }
            const errorText = await response.text().catch(()=>`HTTP ${response.status}`);
            return {
                healthy: false,
                latency,
                lastChecked: new Date().toISOString(),
                error: errorText,
                capabilities: {
                    networks: this.config.networks,
                    assets: this.config.assets,
                    schemes: this.config.schemes
                }
            };
        } catch (error) {
            const latency = Date.now() - start;
            const errorMessage = error instanceof Error ? error.message : 'Health check failed';
            const isTimeout = error instanceof Error && (error.name === 'AbortError' || errorMessage.toLowerCase().includes('timeout'));
            return {
                healthy: false,
                latency,
                lastChecked: new Date().toISOString(),
                error: isTimeout ? 'Health check timeout' : errorMessage,
                capabilities: {
                    networks: this.config.networks,
                    assets: this.config.assets,
                    schemes: this.config.schemes
                }
            };
        }
    }
    /**
   * Get pricing information (not available for Dexter yet)
   */ async getPricing(network, asset) {
        // TODO: Implement if Dexter provides pricing API
        return null;
    }
    /**
   * Check if facilitator supports network/asset/scheme
   */ supports(network, asset, scheme, settlementMode) {
        return super.supports(network, asset, scheme, settlementMode);
    }
}
async function dexterVerify(payload) {
    const baseUrl = process.env.DEXTER_FACILITATOR_URL || 'https://facilitator.dexter.cash';
    const verifyUrl = `${baseUrl}/verify`;
    const start = Date.now();
    try {
        const response = await fetch(verifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(10000)
        });
        const latencyMs = Date.now() - start;
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        if (response.ok && data.valid === true) {
            return {
                success: true,
                valid: true,
                transactionHash: data.transactionHash || data.txHash,
                facilitatorId: 'dexter',
                verifiedAt: new Date().toISOString()
            };
        }
        return {
            success: false,
            valid: false,
            error: data.message || data.error || `HTTP ${response.status}`,
            errorDetails: {
                httpStatus: response.status,
                dexterResponse: data,
                latencyMs
            },
            facilitatorId: 'dexter',
            verifiedAt: new Date().toISOString()
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Verification failed';
        return {
            success: false,
            valid: false,
            error: errorMessage,
            facilitatorId: 'dexter',
            verifiedAt: new Date().toISOString()
        };
    }
}
async function dexterSettle(payload) {
    const baseUrl = process.env.DEXTER_FACILITATOR_URL || 'https://facilitator.dexter.cash';
    const settleUrl = `${baseUrl}/settle`;
    const start = Date.now();
    try {
        const response = await fetch(settleUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(30000)
        });
        const latencyMs = Date.now() - start;
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        if (response.ok && (data.settled === true || data.success === true)) {
            return {
                success: true,
                settled: true,
                transactionHash: data.transactionHash || data.txHash,
                facilitatorId: 'dexter',
                settledAt: new Date().toISOString()
            };
        }
        return {
            success: false,
            settled: false,
            error: data.message || data.error || `HTTP ${response.status}`,
            errorDetails: {
                httpStatus: response.status,
                dexterResponse: data,
                latencyMs
            },
            facilitatorId: 'dexter',
            settledAt: new Date().toISOString()
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Settlement failed';
        return {
            success: false,
            settled: false,
            error: errorMessage,
            facilitatorId: 'dexter',
            settledAt: new Date().toISOString()
        };
    }
}
// Singleton instance
let dexterFacilitator = null;
function getDexterFacilitator() {
    if (!dexterFacilitator) {
        dexterFacilitator = new DexterFacilitator();
    }
    return dexterFacilitator;
}
}),
"[project]/src/db/smf.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

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
    "recordFacilitatorProbeEvent",
    ()=>recordFacilitatorProbeEvent,
    "updateRouteStatus",
    ()=>updateRouteStatus,
    "upsertHealthSnapshot",
    ()=>upsertHealthSnapshot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'SMFDatabase'
});
async function createRoute(route) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
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
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
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
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        const result = await db.pool.query(`INSERT INTO route_attempts (
        id, route_id, facilitator_id, phase, result, latency_ms, error_code, raw_status, is_probe, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`, [
            id,
            attempt.route_id,
            attempt.facilitator_id,
            attempt.phase,
            attempt.result,
            attempt.latency_ms,
            attempt.error_code,
            attempt.raw_status,
            attempt.is_probe ?? false,
            now
        ]);
        return result.rows[0];
    } else {
        // SQLite
        const stmt = db.prepare(`
      INSERT INTO route_attempts (
        id, route_id, facilitator_id, phase, result, latency_ms, error_code, raw_status, is_probe, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        stmt.run(id, attempt.route_id, attempt.facilitator_id, attempt.phase, attempt.result, attempt.latency_ms, attempt.error_code, attempt.raw_status, attempt.is_probe ?? false, now);
        return {
            id,
            ...attempt,
            created_at: now
        };
    }
}
async function getFacilitatorCapabilities(facilitatorId, network, token) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
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
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
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
async function getRouteAttemptsForHealth(facilitatorId, network, token, windowStart, windowEnd, includeProbes = true) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    // Build probe route_id pattern for matching
    const probePattern = `probe-${facilitatorId}-${network}-${token}%`;
    if (isPostgres) {
        // For probes, route_id starts with "probe-{facilitatorId}-{network}-{token}"
        // For real routes, we join with routes table
        const result = await db.pool.query(`SELECT ra.* FROM route_attempts ra
       LEFT JOIN routes r ON (ra.route_id = r.id AND ra.is_probe = false)
       WHERE ra.facilitator_id = $1
         AND (
           (ra.is_probe = true AND ra.route_id LIKE $2)
           OR (ra.is_probe = false AND r.network = $3 AND r.token = $4)
         )
         AND ra.created_at >= $5
         AND ra.created_at < $6
       ORDER BY ra.created_at`, [
            facilitatorId,
            probePattern,
            network,
            token,
            windowStart,
            windowEnd
        ]);
        return result.rows;
    } else {
        // SQLite - similar logic
        const stmt = db.prepare(`SELECT ra.* FROM route_attempts ra
       LEFT JOIN routes r ON (ra.route_id = r.id AND ra.is_probe = 0)
       WHERE ra.facilitator_id = ?
         AND (
           (ra.is_probe = 1 AND ra.route_id LIKE ?)
           OR (ra.is_probe = 0 AND r.network = ? AND r.token = ?)
         )
         AND ra.created_at >= ?
         AND ra.created_at < ?
       ORDER BY ra.created_at`);
        const rows = stmt.all(facilitatorId, probePattern, network, token, windowStart, windowEnd);
        return rows;
    }
}
async function upsertHealthSnapshot(snapshot) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
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
async function recordFacilitatorProbeEvent(event) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    if (isPostgres) {
        await db.pool.query(`INSERT INTO facilitator_probe_events (
        probe_config_id, facilitator_id, network, token, result,
        error_code, facilitator_status, facilitator_error_code, latency_ms
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
            event.probe_config_id,
            event.facilitator_id,
            event.network,
            event.token,
            event.result,
            event.error_code,
            event.facilitator_status,
            event.facilitator_error_code,
            event.latency_ms
        ]);
    } else {
        // SQLite - table might not exist, skip silently
        logger.warn('facilitator_probe_events table not available in SQLite');
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/integrations/x402/facilitators/health-aggregator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

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
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/services/facilitator-metrics-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// FACILITATOR METRICS SERVICE
// =============================================================================
// Service for persisting and managing facilitator path metrics from x402scan
// Uses Supabase/PostgreSQL in production, falls back to JSON files in development
//
// =============================================================================
// RETENTION & COMPACTION PLAN (TODO)
// =============================================================================
// 1. Raw buckets (bucketMinutes < 60):
//    - Keep for 7 days
//    - After 7 days, compact into hourly rollups
//
// 2. Hourly rollups (bucketMinutes = 60):
//    - Keep for 30 days
//    - After 30 days, compact into daily rollups
//
// 3. Daily rollups (bucketMinutes = 1440):
//    - Keep for 90 days
//    - After 90 days, archive or delete
//
// Compaction strategy:
//    - Sum invocations, successCount, failureCount, status buckets
//    - Weighted average for latency percentiles (weight by invocations)
//    - Recalculate errorRate from compacted counts
//
// TODO: Implement compactMetrics() function for scheduled compaction job
// =============================================================================
__turbopack_context__.s([
    "cleanupOldMetrics",
    ()=>cleanupOldMetrics,
    "compareFacilitators",
    ()=>compareFacilitators,
    "getLatestMetrics",
    ()=>getLatestMetrics,
    "getMetricsForFacilitator",
    ()=>getMetricsForFacilitator,
    "getSummariesForFacilitator",
    ()=>getSummariesForFacilitator,
    "getSummary",
    ()=>getSummary,
    "isDatabaseAvailable",
    ()=>isDatabaseAvailable,
    "loadAllMetrics",
    ()=>loadAllMetrics,
    "loadAllSummaries",
    ()=>loadAllSummaries,
    "upsertFacilitatorPathMetrics",
    ()=>upsertFacilitatorPathMetrics,
    "upsertFacilitatorSummaries",
    ()=>upsertFacilitatorSummaries,
    "upsertFacilitatorSummary",
    ()=>upsertFacilitatorSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'FacilitatorMetricsService'
});
// =============================================================================
// DATABASE CONNECTION
// =============================================================================
let pool = null;
function getPool() {
    if (pool) return pool;
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl || !databaseUrl.startsWith('postgresql://')) {
        return null;
    }
    pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
        connectionString: databaseUrl,
        max: 5,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000
    });
    return pool;
}
// =============================================================================
// DATABASE STORAGE FUNCTIONS
// =============================================================================
/**
 * Upsert facilitator path metrics to the database
 */ async function upsertMetricsToDb(metrics) {
    const db = getPool();
    if (!db || metrics.length === 0) return;
    const client = await db.connect();
    try {
        await client.query('BEGIN');
        for (const m of metrics){
            await client.query(`
        INSERT INTO smf_facilitator_metrics (
          kind, facilitator_id, resource_url, server_id, network,
          timeframe, bucket_minutes, time_bucket_start, time_bucket_end,
          invocations, success_count, failure_count,
          count_2xx, count_3xx, count_4xx, count_5xx,
          error_rate, avg_latency_ms, p50_latency_ms, p90_latency_ms, p95_latency_ms, p99_latency_ms,
          methods, fetched_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9,
          $10, $11, $12,
          $13, $14, $15, $16,
          $17, $18, $19, $20, $21, $22,
          $23, $24, NOW()
        )
        ON CONFLICT (facilitator_id, timeframe, time_bucket_start)
        DO UPDATE SET
          kind = EXCLUDED.kind,
          resource_url = EXCLUDED.resource_url,
          server_id = EXCLUDED.server_id,
          network = EXCLUDED.network,
          bucket_minutes = EXCLUDED.bucket_minutes,
          time_bucket_end = EXCLUDED.time_bucket_end,
          invocations = EXCLUDED.invocations,
          success_count = EXCLUDED.success_count,
          failure_count = EXCLUDED.failure_count,
          count_2xx = EXCLUDED.count_2xx,
          count_3xx = EXCLUDED.count_3xx,
          count_4xx = EXCLUDED.count_4xx,
          count_5xx = EXCLUDED.count_5xx,
          error_rate = EXCLUDED.error_rate,
          avg_latency_ms = EXCLUDED.avg_latency_ms,
          p50_latency_ms = EXCLUDED.p50_latency_ms,
          p90_latency_ms = EXCLUDED.p90_latency_ms,
          p95_latency_ms = EXCLUDED.p95_latency_ms,
          p99_latency_ms = EXCLUDED.p99_latency_ms,
          methods = EXCLUDED.methods,
          fetched_at = EXCLUDED.fetched_at,
          updated_at = NOW()
      `, [
                m.kind,
                m.facilitatorId,
                m.resourceUrl || null,
                m.serverId || null,
                m.network || null,
                m.timeframe,
                m.bucketMinutes,
                m.timeBucketStart,
                m.timeBucketEnd,
                m.invocations,
                m.successCount,
                m.failureCount,
                m.count2xx,
                m.count3xx,
                m.count4xx,
                m.count5xx,
                m.errorRate,
                m.avgLatencyMs || null,
                m.p50LatencyMs || null,
                m.p90LatencyMs || null,
                m.p95LatencyMs || null,
                m.p99LatencyMs || null,
                m.methods ? JSON.stringify(m.methods) : null,
                m.fetchedAt
            ]);
        }
        await client.query('COMMIT');
        logger.info({
            count: metrics.length,
            facilitatorId: metrics[0]?.facilitatorId,
            timeframe: metrics[0]?.timeframe,
            msg: 'Facilitator metrics upserted to database'
        });
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally{
        client.release();
    }
}
/**
 * Load metrics from database
 */ async function loadMetricsFromDb(facilitatorId, timeframe) {
    const db = getPool();
    if (!db) return [];
    let query = `
    SELECT * FROM smf_facilitator_metrics
    WHERE fetched_at > NOW() - INTERVAL '30 days'
  `;
    const params = [];
    let paramIndex = 1;
    if (facilitatorId) {
        query += ` AND facilitator_id = $${paramIndex}`;
        params.push(facilitatorId);
        paramIndex++;
    }
    if (timeframe) {
        query += ` AND timeframe = $${paramIndex}`;
        params.push(timeframe);
        paramIndex++;
    }
    query += ' ORDER BY time_bucket_start DESC LIMIT 1000';
    const result = await db.query(query, params);
    return result.rows.map(mapDbRowToMetrics);
}
/**
 * Map database row to FacilitatorPathMetrics
 */ function mapDbRowToMetrics(row) {
    return {
        kind: row.kind || 'facilitator-global',
        facilitatorId: row.facilitator_id,
        resourceUrl: row.resource_url || undefined,
        serverId: row.server_id || undefined,
        network: row.network || undefined,
        timeframe: row.timeframe,
        bucketMinutes: row.bucket_minutes,
        timeBucketStart: row.time_bucket_start?.toISOString() || row.time_bucket_start,
        timeBucketEnd: row.time_bucket_end?.toISOString() || row.time_bucket_end,
        invocations: row.invocations,
        successCount: row.success_count,
        failureCount: row.failure_count,
        count2xx: row.count_2xx,
        count3xx: row.count_3xx,
        count4xx: row.count_4xx,
        count5xx: row.count_5xx,
        errorRate: parseFloat(row.error_rate) || 0,
        avgLatencyMs: row.avg_latency_ms ? parseFloat(row.avg_latency_ms) : undefined,
        p50LatencyMs: row.p50_latency_ms ? parseFloat(row.p50_latency_ms) : undefined,
        p90LatencyMs: row.p90_latency_ms ? parseFloat(row.p90_latency_ms) : undefined,
        p95LatencyMs: row.p95_latency_ms ? parseFloat(row.p95_latency_ms) : undefined,
        p99LatencyMs: row.p99_latency_ms ? parseFloat(row.p99_latency_ms) : undefined,
        methods: row.methods || undefined,
        fetchedAt: row.fetched_at?.toISOString() || row.fetched_at
    };
}
/**
 * Upsert summary to database
 */ async function upsertSummaryToDb(summary) {
    const db = getPool();
    if (!db) return;
    // Handle empty timestamps - skip if no valid data
    const dataStart = summary.dataStart && summary.dataStart.length > 0 ? summary.dataStart : null;
    const dataEnd = summary.dataEnd && summary.dataEnd.length > 0 ? summary.dataEnd : null;
    // Skip summaries with no actual data
    if (summary.totalInvocations === 0 && !dataStart && !dataEnd) {
        logger.debug({
            facilitatorId: summary.facilitatorId,
            timeframe: summary.timeframe,
            msg: 'Skipping summary with no data'
        });
        return;
    }
    await db.query(`
    INSERT INTO smf_facilitator_summaries (
      facilitator_id, timeframe,
      total_invocations, total_successes, total_failures, overall_error_rate,
      avg_p50_latency_ms, avg_p90_latency_ms, avg_p99_latency_ms,
      top_methods, data_start, data_end, fetched_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
    ON CONFLICT (facilitator_id, timeframe)
    DO UPDATE SET
      total_invocations = EXCLUDED.total_invocations,
      total_successes = EXCLUDED.total_successes,
      total_failures = EXCLUDED.total_failures,
      overall_error_rate = EXCLUDED.overall_error_rate,
      avg_p50_latency_ms = EXCLUDED.avg_p50_latency_ms,
      avg_p90_latency_ms = EXCLUDED.avg_p90_latency_ms,
      avg_p99_latency_ms = EXCLUDED.avg_p99_latency_ms,
      top_methods = EXCLUDED.top_methods,
      data_start = COALESCE(EXCLUDED.data_start, smf_facilitator_summaries.data_start),
      data_end = COALESCE(EXCLUDED.data_end, smf_facilitator_summaries.data_end),
      fetched_at = EXCLUDED.fetched_at,
      updated_at = NOW()
  `, [
        summary.facilitatorId,
        summary.timeframe,
        summary.totalInvocations,
        summary.totalSuccesses,
        summary.totalFailures,
        summary.overallErrorRate,
        summary.avgP50LatencyMs || null,
        summary.avgP90LatencyMs || null,
        summary.avgP99LatencyMs || null,
        JSON.stringify(summary.topMethods),
        dataStart,
        dataEnd,
        summary.fetchedAt
    ]);
    logger.info({
        facilitatorId: summary.facilitatorId,
        timeframe: summary.timeframe,
        totalInvocations: summary.totalInvocations,
        msg: 'Facilitator summary upserted to database'
    });
}
/**
 * Load all summaries from database
 */ async function loadSummariesFromDb() {
    const db = getPool();
    if (!db) return {};
    const result = await db.query(`
    SELECT * FROM smf_facilitator_summaries
    ORDER BY fetched_at DESC
  `);
    const summaries = {};
    for (const row of result.rows){
        const key = `${row.facilitator_id}:${row.timeframe}`;
        summaries[key] = {
            facilitatorId: row.facilitator_id,
            timeframe: row.timeframe,
            totalInvocations: parseInt(row.total_invocations) || 0,
            totalSuccesses: parseInt(row.total_successes) || 0,
            totalFailures: parseInt(row.total_failures) || 0,
            overallErrorRate: parseFloat(row.overall_error_rate) || 0,
            avgP50LatencyMs: row.avg_p50_latency_ms ? parseFloat(row.avg_p50_latency_ms) : undefined,
            avgP90LatencyMs: row.avg_p90_latency_ms ? parseFloat(row.avg_p90_latency_ms) : undefined,
            avgP99LatencyMs: row.avg_p99_latency_ms ? parseFloat(row.avg_p99_latency_ms) : undefined,
            topMethods: row.top_methods || [],
            dataStart: row.data_start?.toISOString() || row.data_start,
            dataEnd: row.data_end?.toISOString() || row.data_end,
            fetchedAt: row.fetched_at?.toISOString() || row.fetched_at
        };
    }
    return summaries;
}
function isDatabaseAvailable() {
    return getPool() !== null;
}
async function loadAllMetrics() {
    const db = getPool();
    if (db) {
        try {
            return await loadMetricsFromDb();
        } catch (error) {
            logger.error({
                error,
                msg: 'Failed to load metrics from database, returning empty'
            });
            return [];
        }
    }
    // Fallback: return empty in production if DB not available
    logger.warn({
        msg: 'Database not available, returning empty metrics'
    });
    return [];
}
async function upsertFacilitatorPathMetrics(metrics) {
    if (metrics.length === 0) {
        logger.debug('No metrics to upsert');
        return;
    }
    const db = getPool();
    if (db) {
        try {
            await upsertMetricsToDb(metrics);
            return;
        } catch (error) {
            logger.error({
                error,
                msg: 'Failed to upsert metrics to database'
            });
            throw error;
        }
    }
    // In production without DB, log warning
    logger.warn({
        count: metrics.length,
        msg: 'Database not available, metrics not persisted'
    });
}
async function loadAllSummaries() {
    const db = getPool();
    if (db) {
        try {
            return await loadSummariesFromDb();
        } catch (error) {
            logger.error({
                error,
                msg: 'Failed to load summaries from database'
            });
            return {};
        }
    }
    return {};
}
async function upsertFacilitatorSummary(summary) {
    const db = getPool();
    if (db) {
        try {
            await upsertSummaryToDb(summary);
            return;
        } catch (error) {
            logger.error({
                error,
                msg: 'Failed to upsert summary to database'
            });
            throw error;
        }
    }
    logger.warn({
        facilitatorId: summary.facilitatorId,
        msg: 'Database not available, summary not persisted'
    });
}
async function upsertFacilitatorSummaries(summaries) {
    for (const summary of summaries){
        await upsertFacilitatorSummary(summary);
    }
}
async function getMetricsForFacilitator(facilitatorId, timeframe) {
    const db = getPool();
    if (db) {
        try {
            return await loadMetricsFromDb(facilitatorId, timeframe);
        } catch (error) {
            logger.error({
                error,
                msg: 'Failed to get metrics for facilitator'
            });
            return [];
        }
    }
    return [];
}
async function getSummary(facilitatorId, timeframe) {
    const summaries = await loadAllSummaries();
    const key = `${facilitatorId}:${timeframe}`;
    return summaries[key] ?? null;
}
async function getSummariesForFacilitator(facilitatorId) {
    const summaries = await loadAllSummaries();
    return Object.values(summaries).filter((s)=>s.facilitatorId === facilitatorId);
}
async function getLatestMetrics(limit = 100) {
    const allMetrics = await loadAllMetrics();
    return allMetrics.slice(0, limit);
}
async function compareFacilitators(facilitatorIds, timeframe) {
    const summaries = await loadAllSummaries();
    const result = new Map();
    for (const id of facilitatorIds){
        const key = `${id}:${timeframe}`;
        result.set(id, summaries[key] ?? null);
    }
    return result;
}
async function cleanupOldMetrics(daysToKeep = 30) {
    const db = getPool();
    if (!db) return 0;
    const result = await db.query(`
    DELETE FROM smf_facilitator_metrics
    WHERE time_bucket_start < NOW() - INTERVAL '${daysToKeep} days'
  `);
    const removed = result.rowCount || 0;
    if (removed > 0) {
        logger.info({
            removed,
            daysToKeep,
            msg: 'Old metrics cleaned up from database'
        });
    }
    return removed;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/services/facilitator-volume-service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// FACILITATOR VOLUME SERVICE
// =============================================================================
// Service for persisting and managing facilitator volume/activity metrics from Scattering
// Uses Supabase/PostgreSQL in production, falls back to logging-only in development
//
// =============================================================================
// RETENTION PLAN (TODO)
// =============================================================================
// 1. Current period snapshots (3d):
//    - Keep last 30 snapshots (approx 1 month if pulled daily)
//    - Each snapshot is a full picture of facilitator activity
//
// 2. Historical rollups:
//    - Weekly: Keep 12 weeks of weekly summaries
//    - Monthly: Keep 12 months of monthly summaries
//
// Compaction strategy:
//    - Average volumeUsd3d, txCount3d across period
//    - Track min/max/avg for trend analysis
//    - Keep peak values for market awareness
//
// TODO: Implement weekly/monthly compaction
// =============================================================================
__turbopack_context__.s([
    "cleanupOldSnapshots",
    ()=>cleanupOldSnapshots,
    "computeActivityScore",
    ()=>computeActivityScore,
    "getFacilitatorVolumeHistory",
    ()=>getFacilitatorVolumeHistory,
    "getGrowingFacilitators",
    ()=>getGrowingFacilitators,
    "getScatteringHistory",
    ()=>getScatteringHistory,
    "getScatteringMetricsForFacilitator",
    ()=>getScatteringMetricsForFacilitator,
    "getScatteringMetricsForFacilitators",
    ()=>getScatteringMetricsForFacilitators,
    "getTopFacilitatorsByTxCount",
    ()=>getTopFacilitatorsByTxCount,
    "getTopFacilitatorsByVolume",
    ()=>getTopFacilitatorsByVolume,
    "isDatabaseAvailable",
    ()=>isDatabaseAvailable,
    "loadAllScatteringMetrics",
    ()=>loadAllScatteringMetrics,
    "upsertScatteringMetrics",
    ()=>upsertScatteringMetrics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'FacilitatorVolumeService'
});
// =============================================================================
// DATABASE CONNECTION
// =============================================================================
let pool = null;
function getPool() {
    if (pool) return pool;
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl || !databaseUrl.startsWith('postgresql://')) {
        return null;
    }
    pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
        connectionString: databaseUrl,
        max: 5,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000
    });
    return pool;
}
// =============================================================================
// DATABASE STORAGE FUNCTIONS
// =============================================================================
/**
 * Upsert Scattering metrics to database
 */ async function upsertScatteringToDb(metrics) {
    const db = getPool();
    if (!db || metrics.length === 0) return;
    const client = await db.connect();
    const fetchedAt = new Date().toISOString();
    const snapshotId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
        await client.query('BEGIN');
        for (const m of metrics){
            // Upsert current metrics
            await client.query(`
        INSERT INTO smf_scattering_metrics (
          facilitator_id, period,
          volume_usd_3d, tx_count_3d, unique_buyers_3d, unique_sellers_3d,
          volume_usd_all_time, chains, volume_change_rate, tx_change_rate,
          fetched_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
        ON CONFLICT (facilitator_id, period)
        DO UPDATE SET
          volume_usd_3d = EXCLUDED.volume_usd_3d,
          tx_count_3d = EXCLUDED.tx_count_3d,
          unique_buyers_3d = EXCLUDED.unique_buyers_3d,
          unique_sellers_3d = EXCLUDED.unique_sellers_3d,
          volume_usd_all_time = EXCLUDED.volume_usd_all_time,
          chains = EXCLUDED.chains,
          volume_change_rate = EXCLUDED.volume_change_rate,
          tx_change_rate = EXCLUDED.tx_change_rate,
          fetched_at = EXCLUDED.fetched_at,
          updated_at = NOW()
      `, [
                m.facilitatorId,
                m.period,
                m.volumeUsd3d,
                m.txCount3d,
                m.uniqueBuyers3d,
                m.uniqueSellers3d,
                m.volumeUsdAllTime,
                JSON.stringify(m.chains),
                m.volumeChangeRate ?? null,
                m.txChangeRate ?? null,
                fetchedAt
            ]);
            // Insert into history table
            await client.query(`
        INSERT INTO smf_scattering_history (
          snapshot_id, facilitator_id, period,
          volume_usd_3d, tx_count_3d, unique_buyers_3d, unique_sellers_3d,
          volume_usd_all_time, chains, volume_change_rate, tx_change_rate,
          fetched_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
                snapshotId,
                m.facilitatorId,
                m.period,
                m.volumeUsd3d,
                m.txCount3d,
                m.uniqueBuyers3d,
                m.uniqueSellers3d,
                m.volumeUsdAllTime,
                JSON.stringify(m.chains),
                m.volumeChangeRate ?? null,
                m.txChangeRate ?? null,
                fetchedAt
            ]);
        }
        await client.query('COMMIT');
        // Log summary
        const totalVolume = metrics.reduce((sum, m)=>sum + m.volumeUsd3d, 0);
        const totalTxns = metrics.reduce((sum, m)=>sum + m.txCount3d, 0);
        logger.info({
            facilitatorCount: metrics.length,
            totalVolume3d: `$${formatNumber(totalVolume)}`,
            totalTxns3d: formatNumber(totalTxns),
            msg: 'Scattering metrics upserted to database'
        });
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally{
        client.release();
    }
}
/**
 * Load current Scattering metrics from database
 */ async function loadScatteringFromDb() {
    const db = getPool();
    if (!db) return {};
    const result = await db.query(`
    SELECT * FROM smf_scattering_metrics
    ORDER BY fetched_at DESC
  `);
    const metrics = {};
    for (const row of result.rows){
        metrics[row.facilitator_id] = mapDbRowToScattering(row);
    }
    return metrics;
}
/**
 * Map database row to ScatteringFacilitatorMetrics
 */ function mapDbRowToScattering(row) {
    return {
        facilitatorId: row.facilitator_id,
        period: row.period || '3d',
        volumeUsd3d: parseFloat(row.volume_usd_3d) || 0,
        txCount3d: parseInt(row.tx_count_3d) || 0,
        uniqueBuyers3d: row.unique_buyers_3d || 0,
        uniqueSellers3d: row.unique_sellers_3d || 0,
        volumeUsdAllTime: parseFloat(row.volume_usd_all_time) || 0,
        chains: row.chains || [],
        volumeChangeRate: row.volume_change_rate ? parseFloat(row.volume_change_rate) : undefined,
        txChangeRate: row.tx_change_rate ? parseFloat(row.tx_change_rate) : undefined,
        fetchedAt: row.fetched_at?.toISOString() || row.fetched_at
    };
}
function isDatabaseAvailable() {
    return getPool() !== null;
}
async function upsertScatteringMetrics(metrics) {
    if (metrics.length === 0) {
        logger.debug('No Scattering metrics to upsert');
        return;
    }
    const db = getPool();
    if (db) {
        try {
            await upsertScatteringToDb(metrics);
            return;
        } catch (error) {
            logger.error({
                error,
                msg: 'Failed to upsert Scattering metrics to database'
            });
            throw error;
        }
    }
    // Log summary even without DB
    const totalVolume = metrics.reduce((sum, m)=>sum + m.volumeUsd3d, 0);
    const totalTxns = metrics.reduce((sum, m)=>sum + m.txCount3d, 0);
    logger.warn({
        facilitatorCount: metrics.length,
        totalVolume3d: `$${formatNumber(totalVolume)}`,
        totalTxns3d: formatNumber(totalTxns),
        msg: 'Database not available, Scattering metrics not persisted'
    });
}
async function loadAllScatteringMetrics() {
    const db = getPool();
    if (db) {
        try {
            const metrics = await loadScatteringFromDb();
            return Object.values(metrics);
        } catch (error) {
            logger.error({
                error,
                msg: 'Failed to load Scattering metrics from database'
            });
            return [];
        }
    }
    return [];
}
async function getScatteringMetricsForFacilitator(facilitatorId) {
    const db = getPool();
    if (!db) return null;
    try {
        const result = await db.query(`
      SELECT * FROM smf_scattering_metrics
      WHERE facilitator_id = $1
      ORDER BY fetched_at DESC
      LIMIT 1
    `, [
            facilitatorId
        ]);
        if (result.rows.length === 0) return null;
        return mapDbRowToScattering(result.rows[0]);
    } catch (error) {
        logger.error({
            error,
            facilitatorId,
            msg: 'Failed to get Scattering metrics'
        });
        return null;
    }
}
async function getScatteringMetricsForFacilitators(facilitatorIds) {
    const result = new Map();
    const db = getPool();
    if (!db) {
        for (const id of facilitatorIds){
            result.set(id, null);
        }
        return result;
    }
    try {
        const metrics = await loadScatteringFromDb();
        for (const id of facilitatorIds){
            result.set(id, metrics[id] ?? null);
        }
        return result;
    } catch (error) {
        logger.error({
            error,
            msg: 'Failed to get Scattering metrics for facilitators'
        });
        for (const id of facilitatorIds){
            result.set(id, null);
        }
        return result;
    }
}
async function getScatteringHistory(limit = 10) {
    const db = getPool();
    if (!db) return [];
    try {
        // Get distinct snapshots
        const snapshotsResult = await db.query(`
      SELECT DISTINCT snapshot_id, fetched_at 
      FROM smf_scattering_history
      ORDER BY fetched_at DESC
      LIMIT $1
    `, [
            limit
        ]);
        const history = [];
        for (const snapshot of snapshotsResult.rows){
            const metricsResult = await db.query(`
        SELECT * FROM smf_scattering_history
        WHERE snapshot_id = $1
      `, [
                snapshot.snapshot_id
            ]);
            history.push({
                fetchedAt: snapshot.fetched_at?.toISOString() || snapshot.fetched_at,
                metrics: metricsResult.rows.map(mapDbRowToScattering)
            });
        }
        return history;
    } catch (error) {
        logger.error({
            error,
            msg: 'Failed to get Scattering history'
        });
        return [];
    }
}
async function getFacilitatorVolumeHistory(facilitatorId, limit = 10) {
    const db = getPool();
    if (!db) return [];
    try {
        const result = await db.query(`
      SELECT * FROM smf_scattering_history
      WHERE facilitator_id = $1
      ORDER BY fetched_at DESC
      LIMIT $2
    `, [
            facilitatorId,
            limit
        ]);
        return result.rows.map(mapDbRowToScattering);
    } catch (error) {
        logger.error({
            error,
            facilitatorId,
            msg: 'Failed to get volume history'
        });
        return [];
    }
}
async function getTopFacilitatorsByVolume(limit = 10) {
    const metrics = await loadAllScatteringMetrics();
    return metrics.sort((a, b)=>b.volumeUsd3d - a.volumeUsd3d).slice(0, limit);
}
async function getTopFacilitatorsByTxCount(limit = 10) {
    const metrics = await loadAllScatteringMetrics();
    return metrics.sort((a, b)=>b.txCount3d - a.txCount3d).slice(0, limit);
}
async function getGrowingFacilitators() {
    const metrics = await loadAllScatteringMetrics();
    return metrics.filter((m)=>m.volumeChangeRate !== undefined && m.volumeChangeRate > 0).sort((a, b)=>(b.volumeChangeRate ?? 0) - (a.volumeChangeRate ?? 0));
}
function computeActivityScore(metrics) {
    // Weights for different factors
    const VOLUME_WEIGHT = 0.3;
    const TX_WEIGHT = 0.3;
    const BUYERS_WEIGHT = 0.2;
    const SELLERS_WEIGHT = 0.1;
    const GROWTH_WEIGHT = 0.1;
    // Reference values (approximate top-tier facilitator numbers)
    const MAX_VOLUME = 200_000; // $200K 3d volume
    const MAX_TX = 3_000_000; // 3M txns
    const MAX_BUYERS = 15_000; // 15K unique buyers
    const MAX_SELLERS = 1_000; // 1K unique sellers
    // Normalize each factor to 0-1
    const volumeScore = Math.min(metrics.volumeUsd3d / MAX_VOLUME, 1);
    const txScore = Math.min(metrics.txCount3d / MAX_TX, 1);
    const buyersScore = Math.min(metrics.uniqueBuyers3d / MAX_BUYERS, 1);
    const sellersScore = Math.min(metrics.uniqueSellers3d / MAX_SELLERS, 1);
    // Growth bonus (positive growth adds to score, negative subtracts)
    let growthScore = 0.5; // neutral
    if (metrics.volumeChangeRate !== undefined) {
        // Clamp growth between -100% and +100%
        const clampedGrowth = Math.max(-100, Math.min(100, metrics.volumeChangeRate));
        growthScore = (clampedGrowth + 100) / 200; // normalize to 0-1
    }
    // Calculate weighted score
    const score = volumeScore * VOLUME_WEIGHT + txScore * TX_WEIGHT + buyersScore * BUYERS_WEIGHT + sellersScore * SELLERS_WEIGHT + growthScore * GROWTH_WEIGHT;
    return Math.min(Math.max(score, 0), 1); // clamp to 0-1
}
async function cleanupOldSnapshots(keepDays = 30) {
    const db = getPool();
    if (!db) return 0;
    try {
        const result = await db.query(`
      DELETE FROM smf_scattering_history
      WHERE fetched_at < NOW() - INTERVAL '${keepDays} days'
    `);
        const removed = result.rowCount || 0;
        if (removed > 0) {
            logger.info({
                removed,
                keepDays,
                msg: 'Old Scattering snapshots cleaned up'
            });
        }
        return removed;
    } catch (error) {
        logger.error({
            error,
            msg: 'Failed to cleanup old snapshots'
        });
        return 0;
    }
}
// =============================================================================
// UTILITY
// =============================================================================
/**
 * Format number for logging (e.g., 137535 -> "137.5K")
 */ function formatNumber(num) {
    if (num >= 1_000_000) {
        return `${(num / 1_000_000).toFixed(1)}M`;
    }
    if (num >= 1_000) {
        return `${(num / 1_000).toFixed(1)}K`;
    }
    return num.toFixed(2);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/services/facilitator-metrics-reader.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// FACILITATOR METRICS READER
// =============================================================================
// Read-side helper for SMF to access facilitator path metrics
// Used by the SMF router to inform routing decisions
//
// Scoring blends two data sources:
// 1. x402scan: Observability metrics (success rate, latency, confidence)
// 2. Scattering: Activity metrics (volume, tx count, unique buyers)
__turbopack_context__.s([
    "DEFAULT_TRUST_CONFIG",
    ()=>DEFAULT_TRUST_CONFIG,
    "getAllFacilitatorSummaries",
    ()=>getAllFacilitatorSummaries,
    "getBestFacilitatorPaths",
    ()=>getBestFacilitatorPaths,
    "getFacilitatorExplainer",
    ()=>getFacilitatorExplainer,
    "getFacilitatorScore",
    ()=>getFacilitatorScore,
    "getMultipleFacilitatorExplanations",
    ()=>getMultipleFacilitatorExplanations,
    "getRecommendedFacilitator",
    ()=>getRecommendedFacilitator,
    "rankFacilitators",
    ()=>rankFacilitators,
    "shouldAvoidFacilitator",
    ()=>shouldAvoidFacilitator,
    "shouldTrustMetrics",
    ()=>shouldTrustMetrics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/facilitator-metrics-service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/facilitator-volume-service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'FacilitatorMetricsReader'
});
const DEFAULT_TRUST_CONFIG = {
    maxDataAgeHours: parseFloat(process.env.METRICS_MAX_AGE_HOURS ?? '4'),
    minInvocationsHighConfidence: parseInt(process.env.METRICS_MIN_INVOCATIONS_HIGH ?? '1000', 10),
    minInvocationsMinimum: parseInt(process.env.METRICS_MIN_INVOCATIONS ?? '100', 10),
    lowConfidencePenalty: parseFloat(process.env.METRICS_LOW_CONFIDENCE_PENALTY ?? '0.5')
};
function shouldTrustMetrics(dataAgeHours, invocations, config = DEFAULT_TRUST_CONFIG) {
    // Data too old
    if (dataAgeHours > config.maxDataAgeHours) {
        return {
            trust: false,
            confidence: 'none',
            reason: `data-stale:${dataAgeHours.toFixed(1)}h-old`
        };
    }
    // Not enough data
    if (invocations < config.minInvocationsMinimum) {
        return {
            trust: false,
            confidence: 'none',
            reason: `insufficient-data:${invocations}-invocations`
        };
    }
    // High confidence
    if (invocations >= config.minInvocationsHighConfidence) {
        return {
            trust: true,
            confidence: 'high',
            reason: `high-confidence:${invocations}-invocations`
        };
    }
    // Medium confidence
    return {
        trust: true,
        confidence: 'medium',
        reason: `medium-confidence:${invocations}-invocations`
    };
}
// =============================================================================
// SCORING WEIGHTS & CONFIGURATION
// =============================================================================
/**
 * Scattering score weight (0-1)
 * Controls how much Scattering activity metrics influence the final score
 * Default: 0.2 (20%) - configurable via SCATTERING_SCORE_WEIGHT env var
 */ const SCATTERING_SCORE_WEIGHT = parseFloat(process.env.SCATTERING_SCORE_WEIGHT ?? '0.2');
/**
 * Minimum thresholds for Scattering data to be considered meaningful
 * Below these thresholds, activity is flagged as "low" and doesn't boost score
 */ const SCATTERING_MIN_TX_COUNT_3D = parseInt(process.env.SCATTERING_MIN_TX_COUNT ?? '100', 10);
const SCATTERING_MIN_VOLUME_USD_3D = parseFloat(process.env.SCATTERING_MIN_VOLUME ?? '100');
/**
 * x402scan score weight (the remainder after Scattering)
 * x402scan measures reliability (success rate, latency, confidence)
 */ const X402SCAN_SCORE_WEIGHT = 1 - SCATTERING_SCORE_WEIGHT;
/**
 * Internal weights for x402scan sub-components
 * These are applied to the x402scan portion of the score
 */ const SCORING_WEIGHTS = {
    successRate: 50,
    latency: 30,
    volume: 10,
    freshness: 10
};
async function getBestFacilitatorPaths(params) {
    const timeframe = params.timeframe ?? '1d';
    const limit = params.limit ?? 10;
    try {
        const metrics = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMetricsForFacilitator"])(params.facilitatorId, timeframe);
        if (metrics.length === 0) {
            logger.debug({
                facilitatorId: params.facilitatorId,
                timeframe,
                msg: 'No metrics found for facilitator'
            });
            return [];
        }
        // Sort by success rate (descending), then by latency (ascending)
        const sorted = [
            ...metrics
        ].sort((a, b)=>{
            // Primary: higher success rate is better
            const successRateDiff = 1 - b.errorRate - (1 - a.errorRate);
            if (Math.abs(successRateDiff) > 0.01) {
                return successRateDiff > 0 ? 1 : -1;
            }
            // Secondary: lower latency is better
            const aLatency = a.p95LatencyMs ?? a.avgLatencyMs ?? Infinity;
            const bLatency = b.p95LatencyMs ?? b.avgLatencyMs ?? Infinity;
            return aLatency - bLatency;
        });
        return sorted.slice(0, limit);
    } catch (error) {
        logger.error({
            error: error instanceof Error ? error.message : 'Unknown error',
            facilitatorId: params.facilitatorId,
            msg: 'Failed to get best facilitator paths'
        });
        return [];
    }
}
async function getFacilitatorScore(params) {
    const timeframe = params.timeframe ?? '1d';
    const reasons = [];
    try {
        // ==========================================================================
        // PART 1: x402scan reliability metrics
        // ==========================================================================
        const summary = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSummary"])(params.facilitatorId, timeframe);
        let x402scanScore = 50; // Default neutral
        let successRate = 0;
        let hoursOld = Infinity;
        let totalInvocations = 0;
        let avgLatencyMs;
        let p95LatencyMs;
        let hasX402scanData = false;
        if (summary) {
            hasX402scanData = true;
            // Calculate success rate score (0-50)
            successRate = 1 - summary.overallErrorRate;
            const successRateScore = successRate * SCORING_WEIGHTS.successRate;
            reasons.push(`success-rate:${(successRate * 100).toFixed(1)}%`);
            // Calculate latency score (0-30)
            let latencyScore = SCORING_WEIGHTS.latency;
            const p95 = summary.avgP90LatencyMs ?? summary.avgP99LatencyMs;
            if (p95 !== undefined) {
                const normalizedLatency = Math.min(p95, 2000) / 2000;
                latencyScore = (1 - normalizedLatency) * SCORING_WEIGHTS.latency;
                reasons.push(`p95-latency:${p95.toFixed(0)}ms`);
                p95LatencyMs = summary.avgP90LatencyMs;
            } else {
                latencyScore = SCORING_WEIGHTS.latency * 0.5;
                reasons.push('latency:unknown');
            }
            // Calculate volume score (0-10)
            const volumeThreshold = 1000;
            const volumeRatio = Math.min(summary.totalInvocations / volumeThreshold, 1);
            const volumeScore = volumeRatio * SCORING_WEIGHTS.volume;
            totalInvocations = summary.totalInvocations;
            reasons.push(`x402scan:${summary.totalInvocations}/${summary.totalInvocations >= 1000 ? 'high' : summary.totalInvocations >= 100 ? 'medium' : 'low'}-confidence`);
            // Calculate freshness score (0-10)
            const fetchedAt = new Date(summary.fetchedAt);
            hoursOld = (Date.now() - fetchedAt.getTime()) / (1000 * 60 * 60);
            const freshnessRatio = Math.max(0, 1 - hoursOld / 24);
            const freshnessScore = freshnessRatio * SCORING_WEIGHTS.freshness;
            x402scanScore = successRateScore + latencyScore + volumeScore + freshnessScore;
            avgLatencyMs = summary.avgP50LatencyMs;
        } else {
            reasons.push('x402scan:no-data');
        }
        // ==========================================================================
        // PART 2: Scattering activity metrics
        // ==========================================================================
        let scatteringActivityScore = 0;
        let scatteringVolume3d;
        let scatteringTxCount3d;
        let scatteringUniqueBuyers3d;
        let scatteringLowActivity = false;
        let hasScatteringData = false;
        try {
            const scattering = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getScatteringMetricsForFacilitator"])(params.facilitatorId);
            if (scattering) {
                hasScatteringData = true;
                scatteringVolume3d = scattering.volumeUsd3d;
                scatteringTxCount3d = scattering.txCount3d;
                scatteringUniqueBuyers3d = scattering.uniqueBuyers3d;
                // Check for low activity guardrail
                const isLowActivity = scattering.txCount3d < SCATTERING_MIN_TX_COUNT_3D && scattering.volumeUsd3d < SCATTERING_MIN_VOLUME_USD_3D;
                if (isLowActivity) {
                    scatteringLowActivity = true;
                    scatteringActivityScore = 0.1; // Minimal score for low activity
                    reasons.push(`scattering-low-activity:${scattering.txCount3d}tx/$${scattering.volumeUsd3d.toFixed(0)}`);
                } else {
                    // Compute normalized activity score (0-1)
                    scatteringActivityScore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeActivityScore"])(scattering);
                    reasons.push(`scattering-activity:${scatteringActivityScore.toFixed(2)}`);
                }
            } else {
                reasons.push('scattering:no-data');
            }
        } catch (error) {
            logger.debug({
                error: error instanceof Error ? error.message : 'Unknown',
                facilitatorId: params.facilitatorId,
                msg: 'Failed to fetch Scattering metrics for scoring'
            });
            reasons.push('scattering:error');
        }
        // ==========================================================================
        // PART 3: Blend x402scan and Scattering scores
        // ==========================================================================
        let finalScore;
        if (hasX402scanData && hasScatteringData) {
            // Both sources available - blend according to weights
            // x402scan score is 0-100, Scattering score is 0-1 (convert to 0-100)
            finalScore = X402SCAN_SCORE_WEIGHT * x402scanScore + SCATTERING_SCORE_WEIGHT * scatteringActivityScore * 100;
        } else if (hasX402scanData) {
            // Only x402scan - use full weight
            finalScore = x402scanScore;
        } else if (hasScatteringData) {
            // Only Scattering - convert to 0-100 scale
            finalScore = scatteringActivityScore * 100;
        } else {
            // No data - neutral score
            finalScore = 50;
        }
        // ==========================================================================
        // PART 4: Determine confidence level
        // ==========================================================================
        let confidence = 'none';
        if (hasX402scanData) {
            if (totalInvocations >= 1000 && hoursOld < 6) {
                confidence = 'high';
            } else if (totalInvocations >= 100 && hoursOld < 24) {
                confidence = 'medium';
            } else {
                confidence = 'low';
            }
        } else if (hasScatteringData && !scatteringLowActivity) {
            // Scattering-only data provides some confidence
            confidence = scatteringActivityScore > 0.5 ? 'medium' : 'low';
        }
        return {
            facilitatorId: params.facilitatorId,
            score: Math.round(finalScore),
            successRate,
            avgLatencyMs,
            p95LatencyMs,
            totalInvocations,
            dataFreshness: hoursOld,
            confidence,
            reasons,
            // Scattering fields
            scatteringActivityScore: hasScatteringData ? scatteringActivityScore : undefined,
            scatteringVolume3d,
            scatteringTxCount3d,
            scatteringUniqueBuyers3d,
            scatteringLowActivity: scatteringLowActivity || undefined
        };
    } catch (error) {
        logger.error({
            error: error instanceof Error ? error.message : 'Unknown error',
            facilitatorId: params.facilitatorId,
            msg: 'Failed to get facilitator score'
        });
        return null;
    }
}
async function rankFacilitators(facilitatorIds, timeframe = '1d', config = DEFAULT_TRUST_CONFIG) {
    const scores = [];
    const untrusted = [];
    for (const id of facilitatorIds){
        const score = await getFacilitatorScore({
            facilitatorId: id,
            timeframe
        });
        if (!score) {
            untrusted.push({
                id,
                reason: 'no-data'
            });
            continue;
        }
        // Check if metrics meet trust thresholds
        const trustCheck = shouldTrustMetrics(score.dataFreshness, score.totalInvocations, config);
        if (!trustCheck.trust) {
            untrusted.push({
                id,
                reason: trustCheck.reason
            });
            // Still include in rankings but with penalized score
            scores.push({
                ...score,
                score: score.score * config.lowConfidencePenalty,
                confidence: 'low',
                reasons: [
                    ...score.reasons,
                    `untrusted:${trustCheck.reason}`
                ]
            });
            continue;
        }
        // Apply confidence-based adjustments
        if (trustCheck.confidence === 'medium') {
            // Slight penalty for medium confidence
            scores.push({
                ...score,
                score: score.score * 0.9,
                confidence: 'medium',
                reasons: [
                    ...score.reasons,
                    trustCheck.reason
                ]
            });
        } else {
            // High confidence - use score as-is
            scores.push({
                ...score,
                reasons: [
                    ...score.reasons,
                    trustCheck.reason
                ]
            });
        }
    }
    // Log untrusted facilitators for visibility
    if (untrusted.length > 0) {
        logger.debug({
            untrusted,
            trusted: scores.filter((s)=>s.confidence !== 'low').map((s)=>s.facilitatorId),
            msg: 'Facilitator metrics trust check results'
        });
    }
    // Sort by score descending
    scores.sort((a, b)=>b.score - a.score);
    return {
        rankings: scores,
        timestamp: new Date().toISOString(),
        timeframe
    };
}
async function getRecommendedFacilitator(candidateIds, options) {
    const timeframe = options?.timeframe ?? '1d';
    const trustConfig = options?.trustConfig ?? DEFAULT_TRUST_CONFIG;
    const ranking = await rankFacilitators(candidateIds, timeframe, trustConfig);
    // Check if we have any trusted rankings
    const trustedRankings = ranking.rankings.filter((r)=>r.confidence !== 'low');
    if (trustedRankings.length === 0) {
        // No trusted data - fall back to first candidate
        logger.warn({
            candidates: candidateIds,
            rankings: ranking.rankings.map((r)=>({
                    id: r.facilitatorId,
                    confidence: r.confidence,
                    reasons: r.reasons
                })),
            msg: 'No trusted x402scan data available, using fallback'
        });
        return {
            recommended: candidateIds[0] ?? null,
            ranking,
            reason: 'No trusted x402scan data (stale or insufficient), using default order',
            usedFallback: true
        };
    }
    const prioritize = options?.prioritize ?? 'balanced';
    let recommended;
    switch(prioritize){
        case 'latency':
            // Sort by latency (ascending), filter out unknown latency, only trusted
            const byLatency = trustedRankings.filter((r)=>r.p95LatencyMs !== undefined).sort((a, b)=>(a.p95LatencyMs ?? Infinity) - (b.p95LatencyMs ?? Infinity));
            recommended = byLatency[0] ?? trustedRankings[0];
            break;
        case 'reliability':
            // Sort by success rate (descending), only trusted
            const byReliability = [
                ...trustedRankings
            ].sort((a, b)=>b.successRate - a.successRate);
            recommended = byReliability[0];
            break;
        case 'balanced':
        default:
            // Use overall score from trusted rankings
            recommended = trustedRankings[0];
            break;
    }
    return {
        recommended: recommended.facilitatorId,
        ranking,
        reason: `Selected ${recommended.facilitatorId} with score ${recommended.score} ` + `(${recommended.confidence} confidence, ${recommended.reasons.slice(0, 3).join(', ')})`,
        usedFallback: false
    };
}
async function shouldAvoidFacilitator(facilitatorId, threshold = {}) {
    const maxErrorRate = threshold.maxErrorRate ?? 0.2;
    const minInvocations = threshold.minInvocations ?? 10;
    try {
        const score = await getFacilitatorScore({
            facilitatorId,
            timeframe: '1d'
        });
        if (!score) {
            return {
                avoid: false,
                reason: 'No data available'
            };
        }
        // Not enough data to make a decision
        if (score.totalInvocations < minInvocations) {
            return {
                avoid: false,
                reason: `Insufficient data (${score.totalInvocations} invocations)`
            };
        }
        // Check error rate
        const errorRate = 1 - score.successRate;
        if (errorRate > maxErrorRate) {
            return {
                avoid: true,
                reason: `Error rate ${(errorRate * 100).toFixed(1)}% exceeds threshold ${(maxErrorRate * 100).toFixed(1)}%`
            };
        }
        return {
            avoid: false
        };
    } catch (error) {
        logger.error({
            error: error instanceof Error ? error.message : 'Unknown error',
            facilitatorId,
            msg: 'Failed to check if facilitator should be avoided'
        });
        return {
            avoid: false,
            reason: 'Error checking metrics'
        };
    }
}
async function getAllFacilitatorSummaries() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadAllSummaries"])();
}
async function getFacilitatorExplainer(facilitatorId, options) {
    const timeframe = options?.timeframe ?? '1d';
    const wasSelected = options?.wasSelected ?? false;
    const score = await getFacilitatorScore({
        facilitatorId,
        timeframe
    });
    if (!score) {
        return {
            facilitatorId,
            selected: wasSelected,
            score: 50,
            confidence: 'low',
            shortReason: `${facilitatorId}: no x402scan data available`,
            detailedReasons: [
                'No observability data from x402scan'
            ],
            metrics: {}
        };
    }
    // Build short reason string
    const successPct = (score.successRate * 100).toFixed(1);
    const latencyStr = score.p95LatencyMs ? `${score.p95LatencyMs.toFixed(0)}ms p95` : 'latency unknown';
    const volumeStr = score.totalInvocations >= 1000 ? `${(score.totalInvocations / 1000).toFixed(1)}K invocations` : `${score.totalInvocations} invocations`;
    const shortReason = `${facilitatorId}: ${successPct}% success, ${latencyStr}, ${score.confidence} confidence (${volumeStr})`;
    // Build detailed reasons
    const detailedReasons = [];
    if (score.successRate >= 0.99) {
        detailedReasons.push(`Excellent success rate: ${successPct}%`);
    } else if (score.successRate >= 0.95) {
        detailedReasons.push(`Good success rate: ${successPct}%`);
    } else if (score.successRate >= 0.90) {
        detailedReasons.push(`Acceptable success rate: ${successPct}%`);
    } else {
        detailedReasons.push(`⚠️ Low success rate: ${successPct}%`);
    }
    if (score.p95LatencyMs !== undefined) {
        if (score.p95LatencyMs < 200) {
            detailedReasons.push(`Fast response times: ${score.p95LatencyMs.toFixed(0)}ms p95`);
        } else if (score.p95LatencyMs < 500) {
            detailedReasons.push(`Moderate latency: ${score.p95LatencyMs.toFixed(0)}ms p95`);
        } else {
            detailedReasons.push(`⚠️ High latency: ${score.p95LatencyMs.toFixed(0)}ms p95`);
        }
    }
    if (score.confidence === 'high') {
        detailedReasons.push(`High confidence: ${volumeStr}, data ${score.dataFreshness.toFixed(1)}h old`);
    } else if (score.confidence === 'medium') {
        detailedReasons.push(`Medium confidence: ${volumeStr}`);
    } else {
        detailedReasons.push(`Low confidence: limited data (${volumeStr})`);
    }
    if (score.dataFreshness > 12) {
        detailedReasons.push(`⚠️ Data is ${score.dataFreshness.toFixed(1)} hours old`);
    }
    return {
        facilitatorId,
        selected: wasSelected,
        score: score.score,
        confidence: score.confidence,
        shortReason,
        detailedReasons,
        metrics: {
            successRate: score.successRate,
            errorRate: 1 - score.successRate,
            p95LatencyMs: score.p95LatencyMs,
            invocations: score.totalInvocations,
            dataAgeHours: score.dataFreshness
        }
    };
}
async function getMultipleFacilitatorExplanations(facilitatorIds, options) {
    const explanations = [];
    for (const id of facilitatorIds){
        const explanation = await getFacilitatorExplainer(id, {
            timeframe: options?.timeframe,
            wasSelected: id === options?.selectedId
        });
        explanations.push(explanation);
    }
    // Sort by score descending
    return explanations.sort((a, b)=>b.score - a.score);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
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

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$payai$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/payai-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$x402rs$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/x402rs-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$dexter$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/dexter-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$health$2d$aggregator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/health-aggregator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/smf.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/facilitator-metrics-reader.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/facilitator-volume-service.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$health$2d$aggregator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$health$2d$aggregator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'FacilitatorRouter'
});
/**
 * Default x402scan metrics trust configuration
 * Can be overridden via environment variables
 */ const DEFAULT_X402SCAN_TRUST_CONFIG = {
    maxDataAgeHours: parseFloat(process.env.X402SCAN_MAX_DATA_AGE_HOURS ?? '4'),
    minInvocationsHighConfidence: parseInt(process.env.X402SCAN_MIN_INVOCATIONS_HIGH ?? '1000', 10),
    minInvocationsMediumConfidence: parseInt(process.env.X402SCAN_MIN_INVOCATIONS_MEDIUM ?? '100', 10),
    x402scanScoreWeight: parseFloat(process.env.X402SCAN_SCORE_WEIGHT ?? '0.3'),
    timeframe: process.env.X402SCAN_TIMEFRAME ?? '1d',
    logExplanations: process.env.X402SCAN_LOG_EXPLANATIONS !== 'false'
};
/**
 * Default Scattering metrics configuration
 */ const DEFAULT_SCATTERING_CONFIG = {
    scatteringScoreWeight: parseFloat(process.env.SCATTERING_SCORE_WEIGHT ?? '0.2'),
    minTxCount3d: parseInt(process.env.SCATTERING_MIN_TX_3D ?? '100', 10),
    maxDataAgeHours: parseFloat(process.env.SCATTERING_MAX_DATA_AGE_HOURS ?? '24'),
    logScatteringMetrics: process.env.SCATTERING_LOG_METRICS !== 'false'
};
/**
 * Check if Scattering metrics should be trusted based on freshness and activity
 */ function shouldTrustScatteringMetrics(metrics, config = DEFAULT_SCATTERING_CONFIG) {
    if (!metrics) {
        return {
            trust: false,
            reason: 'no-scattering-data'
        };
    }
    // Check data freshness
    const dataAgeHours = (Date.now() - new Date(metrics.fetchedAt).getTime()) / (1000 * 60 * 60);
    if (dataAgeHours > config.maxDataAgeHours) {
        return {
            trust: false,
            reason: `data-too-old:${dataAgeHours.toFixed(1)}h`
        };
    }
    // Check minimum activity
    if (metrics.txCount3d < config.minTxCount3d) {
        return {
            trust: false,
            reason: `low-activity:${metrics.txCount3d}-txns`
        };
    }
    return {
        trust: true,
        reason: 'active'
    };
}
/**
 * Check if x402scan metrics should be trusted based on freshness/confidence
 */ function shouldTrustX402ScanMetrics(score, config = DEFAULT_X402SCAN_TRUST_CONFIG) {
    if (!score) {
        return {
            trust: false,
            reason: 'no-x402scan-data'
        };
    }
    // Check data freshness
    if (score.dataFreshness > config.maxDataAgeHours) {
        return {
            trust: false,
            reason: `data-too-old:${score.dataFreshness.toFixed(1)}h`
        };
    }
    // Check minimum invocations for medium confidence
    if (score.totalInvocations < config.minInvocationsMediumConfidence) {
        return {
            trust: false,
            reason: `insufficient-data:${score.totalInvocations}-invocations`
        };
    }
    // Trust with appropriate confidence level
    if (score.totalInvocations >= config.minInvocationsHighConfidence) {
        return {
            trust: true,
            reason: 'high-confidence'
        };
    }
    return {
        trust: true,
        reason: 'medium-confidence'
    };
}
class FacilitatorRouter {
    facilitators = new Map();
    facilitatorHealth = new Map();
    healthCheckInterval = null;
    constructor(){
        // Register default facilitators
        this.registerFacilitator((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$cdp$2d$facilitator$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCDPFacilitatorAdapter"])());
        // Register PayAI facilitator (multi-chain support)
        this.registerFacilitator((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$payai$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPayAIFacilitator"])());
        // Register X402rs facilitator (Rust-based community facilitator)
        // Supports: Base Sepolia, Base mainnet, XDC mainnet
        if (process.env.X402RS_ENABLED !== 'false') {
            this.registerFacilitator((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$x402rs$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getX402rsFacilitator"])());
            logger.info({
                facilitatorId: 'x402rs',
                url: 'https://facilitator.x402.rs'
            }, 'X402rs facilitator registered');
        }
        // Register Dexter facilitator (Solana-native x402 facilitator)
        // Supports: Solana mainnet, Solana devnet
        if (process.env.DEXTER_ENABLED !== 'false') {
            this.registerFacilitator((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$dexter$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDexterFacilitator"])());
            logger.info({
                facilitatorId: 'dexter',
                url: 'https://facilitator.dexter.cash'
            }, 'Dexter facilitator registered');
        }
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
        // ==========================================================================
        // Handle explicit facilitator strategy (non-auto)
        // ==========================================================================
        if (preferences?.facilitatorStrategy && preferences.facilitatorStrategy !== 'auto') {
            const explicitFacilitator = this.facilitators.get(preferences.facilitatorStrategy);
            if (explicitFacilitator && explicitFacilitator.config.enabled) {
                // Check if explicit facilitator supports the requested network/asset
                if (explicitFacilitator.supports(requirements.network, requirements.asset, requirements.scheme, requirements.settlementMode)) {
                    logger.info({
                        facilitatorId: explicitFacilitator.id,
                        facilitatorUrl: explicitFacilitator.config.healthCheckUrl,
                        strategy: preferences.facilitatorStrategy,
                        network: requirements.network,
                        asset: requirements.asset,
                        mode: 'explicit',
                        msg: 'Facilitator selected via explicit strategy'
                    });
                    return explicitFacilitator;
                } else {
                    logger.warn({
                        facilitatorId: preferences.facilitatorStrategy,
                        network: requirements.network,
                        asset: requirements.asset,
                        msg: 'Explicit facilitator does not support requested network/asset, falling back to auto'
                    });
                // Fall through to auto selection
                }
            } else {
                logger.warn({
                    facilitatorId: preferences.facilitatorStrategy,
                    enabled: explicitFacilitator?.config.enabled,
                    msg: 'Explicit facilitator not found or disabled, falling back to auto'
                });
            // Fall through to auto selection
            }
        }
        // ==========================================================================
        // Auto selection: Get eligible facilitators
        // ==========================================================================
        const eligible = this.getEligibleFacilitators(requirements, preferences, policy);
        if (eligible.length === 0) {
            throw new Error(`No eligible facilitator found for ${requirements.network}/${requirements.asset}/${requirements.scheme}`);
        }
        // Score and rank facilitators
        const scored = await this.scoreFacilitators(eligible, requirements, preferences, policy);
        // Select best facilitator
        const best = scored[0].facilitator;
        const bestExplanation = scored[0].x402scanExplanation;
        // =======================================================================
        // Log x402scan explanation for the selected facilitator (if available)
        // =======================================================================
        if (bestExplanation && DEFAULT_X402SCAN_TRUST_CONFIG.logExplanations) {
            logger.info({
                facilitatorId: best.id,
                x402scan: {
                    selected: true,
                    score: bestExplanation.score,
                    confidence: bestExplanation.confidence,
                    shortReason: bestExplanation.shortReason,
                    metrics: bestExplanation.metrics
                },
                msg: 'x402scan routing explanation'
            });
        }
        // Log alternatives with their x402scan data (for debugging/ML)
        if (scored.length > 1 && DEFAULT_X402SCAN_TRUST_CONFIG.logExplanations) {
            const alternatives = scored.slice(1, 4).map((s)=>({
                    id: s.facilitator.id,
                    score: s.score,
                    x402scan: s.x402scanExplanation ? {
                        score: s.x402scanExplanation.score,
                        confidence: s.x402scanExplanation.confidence,
                        shortReason: s.x402scanExplanation.shortReason
                    } : null
                }));
            logger.debug({
                alternatives,
                msg: 'Alternative facilitators considered'
            });
        }
        // Log decision trace (compact format for explainer/debugger UI)
        // Include facilitatorUrl for per-facilitator logging
        logger.info({
            facilitatorId: best.id,
            facilitatorUrl: best.config.healthCheckUrl,
            score: scored[0].score,
            x402scanScore: bestExplanation?.score,
            x402scanConfidence: bestExplanation?.confidence,
            alternatives: scored.length - 1,
            reasons: scored[0].reasons,
            strategy: preferences?.facilitatorStrategy || 'auto',
            mode: 'auto',
            constraints: {
                preferences: preferences ? {
                    priority: preferences.priority,
                    preferredNetworks: preferences.preferredNetworks,
                    preferredAssets: preferences.preferredAssets,
                    facilitatorStrategy: preferences.facilitatorStrategy
                } : undefined,
                settlementMode: requirements.settlementMode
            },
            candidates: scored.map((s)=>({
                    id: s.facilitator.id,
                    url: s.facilitator.config.healthCheckUrl,
                    score: s.score,
                    reasons: s.reasons
                })),
            msg: 'Facilitator selected'
        });
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
            // Note: Database health snapshot check is done in scoreFacilitators (async)
            // to avoid blocking the synchronous filter operation
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
   * Uses real health metrics from database AND x402scan ecosystem data for accurate scoring
   * Handles priority ties with randomization
   * Exposed for decision trace building
   */ async scoreFacilitators(facilitators, requirements, preferences, policy) {
        const x402scanConfig = DEFAULT_X402SCAN_TRUST_CONFIG;
        const scored = await Promise.all(facilitators.map(async (facilitator)=>{
            let score = 100; // Start with base score
            const reasons = [];
            let x402scanExplanation;
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
            // =======================================================================
            // 2b. Get x402scan ecosystem metrics (if available and trusted)
            // =======================================================================
            let x402scanScore = null;
            let x402scanTrust = {
                trust: false,
                reason: 'not-fetched'
            };
            try {
                x402scanScore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFacilitatorScore"])({
                    facilitatorId: facilitator.id,
                    timeframe: x402scanConfig.timeframe
                });
                x402scanTrust = shouldTrustX402ScanMetrics(x402scanScore, x402scanConfig);
                // Get detailed explanation for logging
                if (x402scanConfig.logExplanations) {
                    x402scanExplanation = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$metrics$2d$reader$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFacilitatorExplainer"])(facilitator.id, {
                        timeframe: x402scanConfig.timeframe
                    });
                }
            } catch (error) {
                logger.debug({
                    error,
                    facilitatorId: facilitator.id
                }, 'Failed to get x402scan metrics');
                x402scanTrust = {
                    trust: false,
                    reason: 'fetch-error'
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
                // Refuse routing to down facilitators (set score to very low value)
                score = -1000; // Effectively prevents routing
                reasons.push('status:down');
                logger.warn({
                    facilitatorId: facilitator.id,
                    network: requirements.network,
                    token: requirements.asset
                }, 'Refusing to route - facilitator is down');
            } else if (healthMetrics.status === 'degraded') {
                score -= 25; // Moderate penalty for degraded
                reasons.push('status:degraded');
                logger.warn({
                    facilitatorId: facilitator.id,
                    network: requirements.network,
                    token: requirements.asset
                }, 'Facilitator is degraded - routing with caution');
            }
            // 7. Health status check (cached)
            const health = this.facilitatorHealth.get(facilitator.id);
            if (health && !health.healthy) {
                score -= 30; // Additional penalty for unhealthy in cache
                reasons.push('cache-unhealthy');
            }
            // =======================================================================
            // 8. X402SCAN ECOSYSTEM METRICS INTEGRATION
            // =======================================================================
            if (x402scanTrust.trust && x402scanScore) {
                // Apply x402scan score as weighted bonus/penalty
                // x402scan score is 0-100, normalize to contribute proportionally
                const x402scanNormalized = (x402scanScore.score - 50) / 50; // -1 to +1
                const x402scanBonus = x402scanNormalized * 30 * x402scanConfig.x402scanScoreWeight;
                score += x402scanBonus;
                reasons.push(`x402scan:${x402scanScore.score}/${x402scanTrust.reason}`);
                // Extra bonus for high success rate in ecosystem data
                if (x402scanScore.successRate >= 0.99) {
                    score += 10 * x402scanConfig.x402scanScoreWeight;
                    reasons.push('x402scan-excellent');
                } else if (x402scanScore.successRate < 0.90) {
                    score -= 15 * x402scanConfig.x402scanScoreWeight;
                    reasons.push('x402scan-degraded');
                }
                // Latency bonus/penalty from ecosystem data
                if (x402scanScore.p95LatencyMs !== undefined) {
                    if (x402scanScore.p95LatencyMs < 200) {
                        score += 5 * x402scanConfig.x402scanScoreWeight;
                        reasons.push(`x402scan-fast:${x402scanScore.p95LatencyMs.toFixed(0)}ms`);
                    } else if (x402scanScore.p95LatencyMs > 1000) {
                        score -= 10 * x402scanConfig.x402scanScoreWeight;
                        reasons.push(`x402scan-slow:${x402scanScore.p95LatencyMs.toFixed(0)}ms`);
                    }
                }
            } else {
                // Log why x402scan data wasn't trusted
                reasons.push(`x402scan-skipped:${x402scanTrust.reason}`);
            }
            // =======================================================================
            // 8b. SCATTERING / DUNE ACTIVITY METRICS INTEGRATION
            // =======================================================================
            const scatteringConfig = DEFAULT_SCATTERING_CONFIG;
            let scatteringMetrics = null;
            let scatteringTrust = {
                trust: false,
                reason: 'not-fetched'
            };
            try {
                scatteringMetrics = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getScatteringMetricsForFacilitator"])(facilitator.id);
                scatteringTrust = shouldTrustScatteringMetrics(scatteringMetrics, scatteringConfig);
            } catch (error) {
                logger.debug({
                    error,
                    facilitatorId: facilitator.id
                }, 'Failed to get Scattering metrics');
                scatteringTrust = {
                    trust: false,
                    reason: 'fetch-error'
                };
            }
            if (scatteringTrust.trust && scatteringMetrics) {
                // Compute activity score (0-1)
                const activityScore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$facilitator$2d$volume$2d$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeActivityScore"])(scatteringMetrics);
                // Apply as weighted bonus (activity score 0.5+ is good, higher is better)
                const activityBonus = (activityScore - 0.3) * 100 * scatteringConfig.scatteringScoreWeight;
                score += activityBonus;
                reasons.push(`scattering-activity:${(activityScore * 100).toFixed(1)}%`);
                // Volume bonus for high-volume facilitators
                if (scatteringMetrics.volumeUsd3d >= 100_000) {
                    score += 10 * scatteringConfig.scatteringScoreWeight;
                    reasons.push(`scattering-high-volume:$${(scatteringMetrics.volumeUsd3d / 1000).toFixed(1)}K`);
                }
                // User diversity bonus (more unique buyers = more trusted)
                if (scatteringMetrics.uniqueBuyers3d >= 1000) {
                    score += 5 * scatteringConfig.scatteringScoreWeight;
                    reasons.push(`scattering-high-adoption:${scatteringMetrics.uniqueBuyers3d}-buyers`);
                }
                // Growth bonus/penalty
                if (scatteringMetrics.volumeChangeRate !== undefined) {
                    if (scatteringMetrics.volumeChangeRate > 20) {
                        // Growing facilitator
                        score += 5 * scatteringConfig.scatteringScoreWeight;
                        reasons.push(`scattering-growing:+${scatteringMetrics.volumeChangeRate.toFixed(0)}%`);
                    } else if (scatteringMetrics.volumeChangeRate < -50) {
                        // Declining significantly
                        score -= 10 * scatteringConfig.scatteringScoreWeight;
                        reasons.push(`scattering-declining:${scatteringMetrics.volumeChangeRate.toFixed(0)}%`);
                    }
                }
                // Log Scattering metrics if enabled
                if (scatteringConfig.logScatteringMetrics) {
                    logger.debug({
                        facilitatorId: facilitator.id,
                        scattering: {
                            volumeUsd3d: scatteringMetrics.volumeUsd3d,
                            txCount3d: scatteringMetrics.txCount3d,
                            uniqueBuyers3d: scatteringMetrics.uniqueBuyers3d,
                            activityScore: activityScore.toFixed(3),
                            volumeChangeRate: scatteringMetrics.volumeChangeRate
                        },
                        msg: 'Scattering metrics applied'
                    });
                }
            } else {
                reasons.push(`scattering-skipped:${scatteringTrust.reason}`);
            }
            // 9. Cost optimization (if policy requires)
            if (policy?.preferCheapest || preferences?.priority === 'cost') {
                const pricing = await facilitator.getPricing(requirements.network, requirements.asset);
                if (pricing) {
                    // Lower cost = higher score (normalize)
                    score += 20; // Bonus for having pricing info
                    reasons.push('has-pricing');
                }
            }
            // 10. Speed optimization (if preference)
            if (preferences?.priority === 'speed') {
                if (healthMetrics.p95LatencyMs !== null) {
                    // Lower latency = higher score
                    const latencyBonus = Math.max(0, 30 - healthMetrics.p95LatencyMs / 10);
                    score += latencyBonus;
                    reasons.push(`speed-optimized:${healthMetrics.p95LatencyMs}ms`);
                }
                // Also factor in x402scan latency for speed priority
                if (x402scanTrust.trust && x402scanScore?.p95LatencyMs !== undefined) {
                    const x402LatencyBonus = Math.max(0, 20 - x402scanScore.p95LatencyMs / 25);
                    score += x402LatencyBonus * x402scanConfig.x402scanScoreWeight;
                }
            }
            // 11. Compliance optimization
            if (preferences?.priority === 'compliance' || policy?.requireKYC) {
                const metadata = facilitator.config.metadata;
                if (metadata?.kytEnabled && metadata?.ofacEnabled) {
                    score += 30; // Bonus for compliance
                    reasons.push('compliance-enabled');
                }
            }
            // 12. Reliability optimization - strongly weight x402scan for reliability priority
            if (preferences?.priority === 'reliability') {
                if (healthMetrics.status === 'healthy' && healthMetrics.successRate > 0.95) {
                    score += 25;
                    reasons.push('high-reliability');
                }
                // Double weight x402scan for reliability priority
                if (x402scanTrust.trust && x402scanScore) {
                    if (x402scanScore.successRate >= 0.98 && x402scanScore.confidence === 'high') {
                        score += 20; // Strong bonus for proven reliability
                        reasons.push('x402scan-proven-reliable');
                    }
                }
            }
            // 13. Settlement mode optimization
            if (requirements.settlementMode) {
                if (facilitator.config.settlementModes?.includes(requirements.settlementMode)) {
                    score += 15; // Bonus for supporting requested settlement mode
                    reasons.push(`settlement:${requirements.settlementMode}`);
                }
            }
            return {
                facilitator,
                score,
                reasons,
                x402scanExplanation
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/integrations/x402/facilitators/route-context.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// ROUTE CONTEXT
// =============================================================================
// Normalized request context for SMF routing
// Ensures all facilitators receive consistent, x402-spec-compliant requests
__turbopack_context__.s([
    "createRouteContext",
    ()=>createRouteContext,
    "routeContextToFacilitatorRequest",
    ()=>routeContextToFacilitatorRequest
]);
function routeContextToFacilitatorRequest(context) {
    return {
        version: context.x402Version,
        amount: context.amount,
        network: context.network,
        token: context.token,
        networkCAIP: context.networkCAIP,
        tokenCAIP: context.tokenCAIP
    };
}
function createRouteContext(requirements, options) {
    // Extract network (legacy or CAIP)
    const network = requirements.network || requirements.networks?.[0] || '';
    const networkCAIP = requirements.networks?.[0]?.startsWith('eip155:') ? requirements.networks[0] : undefined;
    // Extract token/asset (legacy or CAIP)
    const token = requirements.asset || requirements.assets?.[0] || '';
    const tokenCAIP = requirements.assets?.[0]?.includes('/') ? requirements.assets[0] : undefined;
    return {
        network,
        token,
        amount: requirements.maxAmountRequired || '0',
        networkCAIP,
        tokenCAIP,
        x402Version: options?.x402Version || 1,
        callerId: options?.callerId,
        clientId: options?.clientId,
        region: options?.region,
        riskLevel: options?.riskLevel,
        watchLevel: options?.watchLevel,
        requirements
    };
}
}),
"[project]/src/integrations/x402/orchestrator/meta-facilitator.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// META-FACILITATOR ORCHESTRATION ENGINE
// =============================================================================
// High-level orchestration layer that sits above individual facilitators
// Owns business logic, routing policy, and risk management
__turbopack_context__.s([
    "MetaFacilitator",
    ()=>MetaFacilitator,
    "getMetaFacilitator",
    ()=>getMetaFacilitator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$facilitator$2d$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/facilitator-router.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/smf.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$route$2d$context$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/facilitators/route-context.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$facilitator$2d$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$facilitator$2d$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'MetaFacilitator'
});
class MetaFacilitator {
    router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$facilitator$2d$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFacilitatorRouter"])();
    /**
   * Verify payment with orchestration
   * 
   * This is the main entry point for payment verification.
   * It handles:
   * 1. Facilitator selection based on policy
   * 2. Payment routing
   * 3. Failover handling
   * 4. Result aggregation
   * 5. Business logic application
   */ async verifyPayment(payment, requirements, preferences, policy, context) {
        const startTime = Date.now();
        let routeId = null;
        try {
            // 1. Create route context and route record
            const routeContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$route$2d$context$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRouteContext"])(requirements, {
                callerId: context?.clientId || context?.agentId,
                clientId: context?.clientId,
                x402Version: 1
            });
            // 2. Select best facilitator based on policy
            const facilitator = await this.router.routePayment(requirements, preferences, policy);
            // 3. Create route record with selected facilitator
            const route = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRoute"])({
                request_id: context?.requestId || null,
                correlation_id: context?.correlationId || null,
                client_id: context?.clientId || null,
                agent_id: context?.agentId || null,
                network: routeContext.network,
                token: routeContext.token,
                amount: routeContext.amount,
                selected_facilitator_id: facilitator.id,
                status: 'verifying'
            });
            routeId = route.id;
            // Log decision trace (compact format)
            logger.info({
                routeId,
                facilitatorId: facilitator.id,
                network: requirements.network,
                asset: requirements.asset,
                settlementMode: requirements.settlementMode,
                preferences: preferences ? {
                    priority: preferences.priority,
                    jurisdiction: preferences.jurisdiction
                } : undefined
            }, 'Routing payment to facilitator');
            // 3. Verify payment with selected facilitator
            const verifyStartTime = Date.now();
            let result;
            let attemptResult = 'success';
            let errorCode = null;
            let rawStatus = null;
            try {
                result = await facilitator.verify(payment, requirements);
                const verifyLatency = Date.now() - verifyStartTime;
                // Determine attempt result
                if (!result.success || !result.valid) {
                    attemptResult = 'failure';
                    errorCode = result.error || 'verification_failed';
                }
                // Log route attempt
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRouteAttempt"])({
                    route_id: routeId,
                    facilitator_id: facilitator.id,
                    phase: 'verify',
                    result: attemptResult,
                    latency_ms: verifyLatency,
                    error_code: errorCode,
                    raw_status: rawStatus,
                    is_probe: false
                });
            } catch (error) {
                const verifyLatency = Date.now() - verifyStartTime;
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                // Determine error type
                if (errorMessage.includes('timeout') || errorMessage.includes('TIMEOUT')) {
                    attemptResult = 'timeout';
                } else if (errorMessage.includes('rate') || errorMessage.includes('429')) {
                    attemptResult = 'rate_limited';
                    rawStatus = 429;
                } else if (errorMessage.includes('network') || errorMessage.includes('ECONNREFUSED')) {
                    attemptResult = 'network_error';
                } else {
                    attemptResult = 'failure';
                }
                errorCode = errorMessage;
                // Log failed attempt
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRouteAttempt"])({
                    route_id: routeId,
                    facilitator_id: facilitator.id,
                    phase: 'verify',
                    result: attemptResult,
                    latency_ms: verifyLatency,
                    error_code: errorCode,
                    raw_status: rawStatus,
                    is_probe: false
                });
                // Create failure result
                result = {
                    success: false,
                    valid: false,
                    error: errorMessage,
                    facilitatorId: facilitator.id,
                    verifiedAt: new Date().toISOString()
                };
            }
            // 4. Apply business logic (risk rules, compliance, etc.)
            const orchestrated = this.applyBusinessLogic(result, requirements, policy);
            // 5. Update route status
            if (orchestrated.success && orchestrated.valid) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateRouteStatus"])(routeId, 'settled', new Date().toISOString());
            } else {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateRouteStatus"])(routeId, 'failed', new Date().toISOString());
            }
            // 6. Calculate orchestration metadata
            const latency = Date.now() - startTime;
            const metadata = {
                latency,
                complianceScore: this.calculateComplianceScore(result)
            };
            // 7. Build decision trace (for explainer/debugger UI)
            const eligible = this.router.getFacilitators().filter((f)=>f.supports(requirements.network, requirements.asset, requirements.scheme, requirements.settlementMode) && f.config.enabled);
            const decisionTrace = await this.buildDecisionTrace(facilitator, eligible, requirements, preferences, policy);
            return {
                ...orchestrated,
                facilitatorUsed: facilitator.id,
                routingReason: this.getRoutingReason(facilitator, preferences, policy),
                alternativesConsidered: eligible.length - 1,
                decisionTrace,
                orchestrationMetadata: metadata
            };
        } catch (error) {
            logger.error({
                error,
                requirements,
                routeId
            }, 'Orchestration error');
            // Update route status to failed
            if (routeId) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateRouteStatus"])(routeId, 'failed', new Date().toISOString());
            }
            // Try failover if available
            if (policy?.requireHealthCheck !== false) {
                return await this.handleFailover(payment, requirements, preferences, policy, error, routeId);
            }
            throw error;
        }
    }
    /**
   * Apply business logic to verification result
   * SMF owns higher-level policy above raw settlement
   */ applyBusinessLogic(result, requirements, policy) {
        // 1. Risk rules
        if (policy?.riskThreshold !== undefined) {
            const riskScore = this.calculateRiskScore(result);
            if (riskScore > policy.riskThreshold) {
                return {
                    ...result,
                    valid: false,
                    error: `Risk score ${riskScore} exceeds threshold ${policy.riskThreshold}`
                };
            }
        }
        // 2. Compliance rules
        if (policy?.requireKYC) {
            // Check if KYC is required for this amount
            const amount = BigInt(requirements.maxAmountRequired);
            const kycThreshold = BigInt('1000000000'); // 1000 USDC in smallest units
            if (amount > kycThreshold && result.kytStatus !== 'passed') {
                return {
                    ...result,
                    valid: false,
                    error: 'KYC required for this amount'
                };
            }
        }
        // 3. Jurisdiction rules
        if (policy?.jurisdictionRules) {
        // Apply jurisdiction-specific rules
        // This would integrate with geo-detection
        // For now, pass through
        }
        return result;
    }
    /**
   * Calculate risk score (0-100)
   */ calculateRiskScore(result) {
        let score = 0;
        // KYT status
        if (result.kytStatus === 'blocked') score += 50;
        else if (result.kytStatus === 'flagged') score += 25;
        // OFAC status
        if (result.ofacStatus === 'blocked') score += 50;
        else if (result.ofacStatus === 'flagged') score += 25;
        // Error status
        if (!result.success || !result.valid) score += 30;
        return Math.min(100, score);
    }
    /**
   * Calculate compliance score (0-100)
   */ calculateComplianceScore(result) {
        let score = 100;
        // Deduct for compliance issues
        if (result.kytStatus === 'blocked') score -= 50;
        else if (result.kytStatus === 'flagged') score -= 25;
        if (result.ofacStatus === 'blocked') score -= 50;
        else if (result.ofacStatus === 'flagged') score -= 25;
        return Math.max(0, score);
    }
    /**
   * Build decision trace for explainer/debugger UI
   * Compact format for logging and future UI display
   */ async buildDecisionTrace(selected, eligible, requirements, preferences, policy) {
        // Score candidates to get detailed info
        const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$facilitators$2f$facilitator$2d$router$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFacilitatorRouter"])();
        const scored = await router.scoreFacilitators(eligible, requirements, preferences, policy);
        const candidates = eligible.map((f)=>{
            const scoredEntry = scored.find((s)=>s.facilitator.id === f.id);
            const score = scoredEntry?.score || 0;
            const reasons = scoredEntry?.reasons || [];
            return {
                facilitatorId: f.id,
                facilitatorName: f.name,
                score,
                eligible: true,
                reasons
            };
        });
        return {
            timestamp: new Date().toISOString(),
            reason: this.getRoutingReason(selected, preferences, policy),
            constraints: {
                preferences,
                policy: policy ? {
                    requireHealthCheck: policy.requireHealthCheck,
                    preferCheapest: policy.preferCheapest,
                    requireKYC: policy.requireKYC
                } : undefined,
                requirements
            },
            candidates,
            selected: {
                facilitatorId: selected.id,
                score: scored.find((s)=>s.facilitator.id === selected.id)?.score || 100,
                alternativesConsidered: eligible.length - 1
            }
        };
    }
    /**
   * Get routing reason for logging/analytics
   */ getRoutingReason(facilitator, preferences, policy) {
        const reasons = [];
        if (preferences?.priority === 'cost') reasons.push('cost-optimized');
        if (preferences?.priority === 'speed') reasons.push('speed-optimized');
        if (preferences?.priority === 'compliance') reasons.push('compliance-optimized');
        if (preferences?.priority === 'reliability') reasons.push('reliability-optimized');
        if (preferences?.preferredNetworks) reasons.push('network-preference');
        if (policy?.preferCheapest) reasons.push('cheapest-selected');
        if (facilitator.config.priority === 1) reasons.push('primary-facilitator');
        return reasons.join(', ') || 'default-routing';
    }
    /**
   * Handle failover to alternative facilitator
   */ async handleFailover(payment, requirements, preferences, policy, originalError, routeId) {
        logger.warn({
            originalError,
            requirements
        }, 'Attempting failover');
        // Get all facilitators
        const facilitators = this.router.getFacilitators();
        const eligible = facilitators.filter((f)=>f.supports(requirements.network, requirements.asset, requirements.scheme, requirements.settlementMode) && f.config.enabled);
        // Try each facilitator in order of priority
        for (const facilitator of eligible.sort((a, b)=>a.config.priority - b.config.priority)){
            const attemptStartTime = Date.now();
            try {
                const result = await facilitator.verify(payment, requirements);
                const attemptLatency = Date.now() - attemptStartTime;
                // Log failover attempt
                if (routeId) {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRouteAttempt"])({
                        route_id: routeId,
                        facilitator_id: facilitator.id,
                        phase: 'verify',
                        result: result.success && result.valid ? 'success' : 'failure',
                        latency_ms: attemptLatency,
                        is_probe: false,
                        error_code: result.error || null,
                        raw_status: null
                    });
                }
                if (result.success && result.valid) {
                    logger.info({
                        facilitatorId: facilitator.id,
                        routeId
                    }, 'Failover successful');
                    // Update route with successful facilitator
                    if (routeId) {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateRouteStatus"])(routeId, 'settled', new Date().toISOString());
                    }
                    return {
                        ...result,
                        facilitatorUsed: facilitator.id,
                        routingReason: 'failover',
                        alternativesConsidered: eligible.length - 1
                    };
                }
            } catch (error) {
                const attemptLatency = Date.now() - attemptStartTime;
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                // Log failed failover attempt
                if (routeId) {
                    let attemptResult = 'failure';
                    if (errorMessage.includes('timeout')) {
                        attemptResult = 'timeout';
                    } else if (errorMessage.includes('rate') || errorMessage.includes('429')) {
                        attemptResult = 'rate_limited';
                    } else if (errorMessage.includes('network') || errorMessage.includes('ECONNREFUSED')) {
                        attemptResult = 'network_error';
                    }
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRouteAttempt"])({
                        route_id: routeId,
                        facilitator_id: facilitator.id,
                        phase: 'verify',
                        result: attemptResult,
                        latency_ms: attemptLatency,
                        is_probe: false,
                        error_code: errorMessage,
                        raw_status: null
                    });
                }
                logger.warn({
                    facilitatorId: facilitator.id,
                    error,
                    routeId
                }, 'Failover attempt failed');
                continue;
            }
        }
        // All facilitators failed
        throw new Error(`All facilitators failed. Original error: ${originalError instanceof Error ? originalError.message : 'Unknown error'}`);
    }
    /**
   * Get orchestrator status
   * Fixed: Aligns health semantics with facilitator health checks
   */ async getStatus() {
        const facilitators = this.router.getFacilitators();
        // Check health of all facilitators (use actual health checks, not cached)
        const healthChecks = await Promise.all(facilitators.map(async (f)=>{
            try {
                const health = await f.getHealth();
                return {
                    id: f.id,
                    name: f.name,
                    healthy: health.healthy,
                    lastChecked: health.lastChecked
                };
            } catch (error) {
                return {
                    id: f.id,
                    name: f.name,
                    healthy: false,
                    lastChecked: new Date().toISOString()
                };
            }
        }));
        const healthy = healthChecks.filter((h)=>h.healthy);
        const networks = new Set();
        const assets = new Set();
        facilitators.forEach((f)=>{
            f.config.networks.forEach((n)=>networks.add(n));
            f.config.assets.forEach((a)=>assets.add(a));
        });
        return {
            facilitators: facilitators.length,
            healthy: healthy.length,
            networks: Array.from(networks),
            assets: Array.from(assets),
            facilitatorDetails: healthChecks
        };
    }
}
// Singleton instance
let metaFacilitator = null;
function getMetaFacilitator() {
    if (!metaFacilitator) {
        metaFacilitator = new MetaFacilitator();
    }
    return metaFacilitator;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/integrations/x402/sessions/wallet-session.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// WALLET SESSION MANAGER
// =============================================================================
// Manages wallet-based sessions for reusable payment authorizations
// Supports subscription/session patterns, not just one-off payments
__turbopack_context__.s([
    "WalletSessionManager",
    ()=>WalletSessionManager,
    "getWalletSessionManager",
    ()=>getWalletSessionManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'WalletSession'
});
class WalletSessionManager {
    sessions = new Map();
    walletSessions = new Map();
    /**
   * Create a new wallet session from a payment authorization
   */ createSession(options) {
        const sessionId = this.generateSessionId();
        const now = Math.floor(Date.now() / 1000);
        const session = {
            id: sessionId,
            walletAddress: options.walletAddress.toLowerCase(),
            authorizedAmount: options.authorizedAmount,
            spentAmount: '0',
            validUntil: options.validUntil,
            validFrom: options.validFrom || now,
            network: options.network,
            asset: options.asset,
            reusable: options.reusable !== false,
            nonce: options.nonce,
            signature: options.signature,
            authorization: options.authorization,
            endpointId: options.endpointId,
            agentId: options.agentId,
            createdAt: now,
            lastUsedAt: now,
            usageCount: 0
        };
        // Store session
        this.sessions.set(sessionId, session);
        // Index by wallet address
        const walletKey = session.walletAddress;
        if (!this.walletSessions.has(walletKey)) {
            this.walletSessions.set(walletKey, new Set());
        }
        this.walletSessions.get(walletKey).add(sessionId);
        logger.info({
            sessionId,
            walletAddress: session.walletAddress,
            authorizedAmount: session.authorizedAmount,
            validUntil: session.validUntil
        }, 'Wallet session created');
        return session;
    }
    /**
   * Validate and retrieve a session
   */ validateSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            return {
                valid: false,
                error: 'Session not found'
            };
        }
        // Check if session has expired
        const now = Math.floor(Date.now() / 1000);
        if (now > session.validUntil) {
            this.sessions.delete(sessionId);
            this.walletSessions.get(session.walletAddress)?.delete(sessionId);
            return {
                valid: false,
                error: 'Session expired'
            };
        }
        // Check if session has started
        if (now < session.validFrom) {
            return {
                valid: false,
                error: 'Session not yet valid'
            };
        }
        // Calculate remaining amount
        const authorized = BigInt(session.authorizedAmount);
        const spent = BigInt(session.spentAmount);
        const remaining = authorized > spent ? authorized - spent : BigInt(0);
        return {
            valid: true,
            session,
            remainingAmount: remaining.toString()
        };
    }
    /**
   * Use a session (deduct amount)
   */ useSession(sessionId, amount) {
        const validation = this.validateSession(sessionId);
        if (!validation.valid || !validation.session) {
            return validation;
        }
        const session = validation.session;
        const amountToSpend = BigInt(amount);
        const remaining = BigInt(validation.remainingAmount || '0');
        // Check if session has enough remaining balance
        if (amountToSpend > remaining) {
            return {
                valid: false,
                session,
                error: 'Insufficient session balance',
                remainingAmount: remaining.toString()
            };
        }
        // Update session
        const newSpent = BigInt(session.spentAmount) + amountToSpend;
        session.spentAmount = newSpent.toString();
        session.lastUsedAt = Math.floor(Date.now() / 1000);
        session.usageCount += 1;
        const newRemaining = remaining - amountToSpend;
        logger.info({
            sessionId,
            amount,
            remainingAmount: newRemaining.toString(),
            usageCount: session.usageCount
        }, 'Session used');
        return {
            valid: true,
            session,
            remainingAmount: newRemaining.toString()
        };
    }
    /**
   * Get active sessions for a wallet
   */ getWalletSessions(walletAddress) {
        const walletKey = walletAddress.toLowerCase();
        const sessionIds = this.walletSessions.get(walletKey) || new Set();
        const sessions = [];
        for (const sessionId of sessionIds){
            const session = this.sessions.get(sessionId);
            if (session) {
                const now = Math.floor(Date.now() / 1000);
                if (now <= session.validUntil && now >= session.validFrom) {
                    sessions.push(session);
                }
            }
        }
        return sessions;
    }
    /**
   * Get session by ID
   */ getSession(sessionId) {
        return this.sessions.get(sessionId);
    }
    /**
   * Revoke a session
   */ revokeSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session) {
            return false;
        }
        this.sessions.delete(sessionId);
        this.walletSessions.get(session.walletAddress)?.delete(sessionId);
        logger.info({
            sessionId
        }, 'Session revoked');
        return true;
    }
    /**
   * Clean up expired sessions
   */ cleanupExpiredSessions() {
        const now = Math.floor(Date.now() / 1000);
        let cleaned = 0;
        for (const [sessionId, session] of this.sessions.entries()){
            if (now > session.validUntil) {
                this.sessions.delete(sessionId);
                this.walletSessions.get(session.walletAddress)?.delete(sessionId);
                cleaned++;
            }
        }
        if (cleaned > 0) {
            logger.info({
                cleaned
            }, 'Expired sessions cleaned up');
        }
        return cleaned;
    }
    /**
   * Generate a unique session ID
   */ generateSessionId() {
        // Generate UUID v4
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=>{
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    }
}
// Singleton instance
let sessionManager = null;
function getWalletSessionManager() {
    if (!sessionManager) {
        sessionManager = new WalletSessionManager();
        // Clean up expired sessions every 5 minutes
        setInterval(()=>{
            sessionManager?.cleanupExpiredSessions();
        }, 5 * 60 * 1000);
    }
    return sessionManager;
}
}),
"[project]/src/integrations/x402/sessions/subscription-manager.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// SUBSCRIPTION MANAGER
// =============================================================================
// Manages subscription billing patterns for recurring payments
__turbopack_context__.s([
    "SubscriptionManager",
    ()=>SubscriptionManager,
    "getSubscriptionManager",
    ()=>getSubscriptionManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'SubscriptionManager'
});
class SubscriptionManager {
    subscriptions = new Map();
    walletSubscriptions = new Map();
    plans = new Map();
    /**
   * Create a subscription plan
   */ createPlan(plan) {
        this.plans.set(plan.id, plan);
        logger.info({
            planId: plan.id,
            name: plan.name
        }, 'Subscription plan created');
        return plan;
    }
    /**
   * Get subscription plan
   */ getPlan(planId) {
        return this.plans.get(planId);
    }
    /**
   * Create an active subscription
   */ createSubscription(planId, walletAddress, sessionId) {
        const plan = this.getPlan(planId);
        if (!plan) {
            logger.warn({
                planId
            }, 'Subscription plan not found');
            return null;
        }
        const subscriptionId = this.generateSubscriptionId();
        const now = Math.floor(Date.now() / 1000);
        const periodEnd = this.calculatePeriodEnd(now, plan.billingPeriod);
        const subscription = {
            id: subscriptionId,
            planId: plan.id,
            walletAddress: walletAddress.toLowerCase(),
            endpointId: plan.endpointId,
            status: 'active',
            currentPeriodStart: now,
            currentPeriodEnd: periodEnd,
            usageCount: 0,
            sessionId,
            createdAt: now,
            updatedAt: now
        };
        this.subscriptions.set(subscriptionId, subscription);
        // Index by wallet
        const walletKey = subscription.walletAddress;
        if (!this.walletSubscriptions.has(walletKey)) {
            this.walletSubscriptions.set(walletKey, new Set());
        }
        this.walletSubscriptions.get(walletKey).add(subscriptionId);
        logger.info({
            subscriptionId,
            planId,
            walletAddress: subscription.walletAddress,
            periodEnd: subscription.currentPeriodEnd
        }, 'Subscription created');
        return subscription;
    }
    /**
   * Check if subscription is active and valid
   */ validateSubscription(subscriptionId) {
        const subscription = this.subscriptions.get(subscriptionId);
        if (!subscription) {
            return {
                valid: false,
                error: 'Subscription not found'
            };
        }
        if (subscription.status !== 'active') {
            return {
                valid: false,
                subscription,
                error: `Subscription is ${subscription.status}`
            };
        }
        const now = Math.floor(Date.now() / 1000);
        // Check if period has expired
        if (now > subscription.currentPeriodEnd) {
            subscription.status = 'expired';
            subscription.updatedAt = now;
            return {
                valid: false,
                subscription,
                error: 'Subscription period expired'
            };
        }
        // Check usage limits
        const plan = this.getPlan(subscription.planId);
        if (plan?.maxUsage && subscription.usageCount >= plan.maxUsage) {
            return {
                valid: false,
                subscription,
                error: 'Subscription usage limit reached'
            };
        }
        return {
            valid: true,
            subscription
        };
    }
    /**
   * Record subscription usage
   */ recordUsage(subscriptionId) {
        const validation = this.validateSubscription(subscriptionId);
        if (!validation.valid || !validation.subscription) {
            return false;
        }
        const subscription = validation.subscription;
        subscription.usageCount += 1;
        subscription.updatedAt = Math.floor(Date.now() / 1000);
        return true;
    }
    /**
   * Renew subscription period
   */ renewSubscription(subscriptionId, sessionId) {
        const subscription = this.subscriptions.get(subscriptionId);
        if (!subscription) {
            return false;
        }
        const plan = this.getPlan(subscription.planId);
        if (!plan) {
            return false;
        }
        const now = Math.floor(Date.now() / 1000);
        const periodEnd = this.calculatePeriodEnd(now, plan.billingPeriod);
        subscription.currentPeriodStart = now;
        subscription.currentPeriodEnd = periodEnd;
        subscription.usageCount = 0;
        subscription.sessionId = sessionId;
        subscription.updatedAt = now;
        if (subscription.status === 'expired') {
            subscription.status = 'active';
        }
        logger.info({
            subscriptionId,
            newPeriodEnd: periodEnd
        }, 'Subscription renewed');
        return true;
    }
    /**
   * Cancel subscription
   */ cancelSubscription(subscriptionId) {
        const subscription = this.subscriptions.get(subscriptionId);
        if (!subscription) {
            return false;
        }
        subscription.status = 'cancelled';
        subscription.updatedAt = Math.floor(Date.now() / 1000);
        logger.info({
            subscriptionId
        }, 'Subscription cancelled');
        return true;
    }
    /**
   * Get active subscriptions for a wallet
   */ getWalletSubscriptions(walletAddress) {
        const walletKey = walletAddress.toLowerCase();
        const subscriptionIds = this.walletSubscriptions.get(walletKey) || new Set();
        const subscriptions = [];
        for (const subscriptionId of subscriptionIds){
            const subscription = this.subscriptions.get(subscriptionId);
            if (subscription && subscription.status === 'active') {
                subscriptions.push(subscription);
            }
        }
        return subscriptions;
    }
    /**
   * Get subscription by ID
   */ getSubscription(subscriptionId) {
        return this.subscriptions.get(subscriptionId);
    }
    /**
   * Calculate period end timestamp
   */ calculatePeriodEnd(start, period) {
        const periods = {
            hourly: 3600,
            daily: 86400,
            weekly: 604800,
            monthly: 2592000
        };
        return start + periods[period];
    }
    /**
   * Generate subscription ID
   */ generateSubscriptionId() {
        return `sub_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    }
}
// Singleton instance
let subscriptionManager = null;
function getSubscriptionManager() {
    if (!subscriptionManager) {
        subscriptionManager = new SubscriptionManager();
    }
    return subscriptionManager;
}
}),
"[project]/src/integrations/x402/sessions/session-cache.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// SESSION CACHE
// =============================================================================
// In-memory and persistent cache for session state management
// Can be extended to use Redis or other distributed cache
__turbopack_context__.s([
    "SessionCache",
    ()=>SessionCache,
    "getSessionCache",
    ()=>getSessionCache
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'SessionCache'
});
class SessionCache {
    sessions = new Map();
    subscriptions = new Map();
    config;
    constructor(config = {}){
        this.config = {
            ttl: config.ttl || 3600,
            maxSize: config.maxSize || 10000
        };
        // Clean up expired entries every minute
        setInterval(()=>{
            this.cleanup();
        }, 60 * 1000);
    }
    /**
   * Store a session in cache
   */ setSession(session) {
        // Check cache size
        if (this.sessions.size >= this.config.maxSize) {
            this.evictOldestSession();
        }
        const expires = Date.now() + this.config.ttl * 1000;
        this.sessions.set(session.id, {
            data: session,
            expires
        });
        logger.debug({
            sessionId: session.id
        }, 'Session cached');
    }
    /**
   * Get a session from cache
   */ getSession(sessionId) {
        const entry = this.sessions.get(sessionId);
        if (!entry) {
            return null;
        }
        // Check if expired
        if (Date.now() > entry.expires) {
            this.sessions.delete(sessionId);
            return null;
        }
        return entry.data;
    }
    /**
   * Remove a session from cache
   */ deleteSession(sessionId) {
        this.sessions.delete(sessionId);
        logger.debug({
            sessionId
        }, 'Session removed from cache');
    }
    /**
   * Store a subscription in cache
   */ setSubscription(subscription) {
        // Check cache size
        if (this.subscriptions.size >= this.config.maxSize) {
            this.evictOldestSubscription();
        }
        const expires = Date.now() + this.config.ttl * 1000;
        this.subscriptions.set(subscription.id, {
            data: subscription,
            expires
        });
        logger.debug({
            subscriptionId: subscription.id
        }, 'Subscription cached');
    }
    /**
   * Get a subscription from cache
   */ getSubscription(subscriptionId) {
        const entry = this.subscriptions.get(subscriptionId);
        if (!entry) {
            return null;
        }
        // Check if expired
        if (Date.now() > entry.expires) {
            this.subscriptions.delete(subscriptionId);
            return null;
        }
        return entry.data;
    }
    /**
   * Remove a subscription from cache
   */ deleteSubscription(subscriptionId) {
        this.subscriptions.delete(subscriptionId);
        logger.debug({
            subscriptionId
        }, 'Subscription removed from cache');
    }
    /**
   * Clear all cached sessions
   */ clearSessions() {
        this.sessions.clear();
        logger.info('All sessions cleared from cache');
    }
    /**
   * Clear all cached subscriptions
   */ clearSubscriptions() {
        this.subscriptions.clear();
        logger.info('All subscriptions cleared from cache');
    }
    /**
   * Get cache statistics
   */ getStats() {
        return {
            sessions: this.sessions.size,
            subscriptions: this.subscriptions.size,
            maxSize: this.config.maxSize
        };
    }
    /**
   * Clean up expired entries
   */ cleanup() {
        const now = Date.now();
        let cleanedSessions = 0;
        let cleanedSubscriptions = 0;
        // Clean expired sessions
        for (const [sessionId, entry] of this.sessions.entries()){
            if (now > entry.expires) {
                this.sessions.delete(sessionId);
                cleanedSessions++;
            }
        }
        // Clean expired subscriptions
        for (const [subscriptionId, entry] of this.subscriptions.entries()){
            if (now > entry.expires) {
                this.subscriptions.delete(subscriptionId);
                cleanedSubscriptions++;
            }
        }
        if (cleanedSessions > 0 || cleanedSubscriptions > 0) {
            logger.debug({
                cleanedSessions,
                cleanedSubscriptions
            }, 'Cache cleanup completed');
        }
    }
    /**
   * Evict oldest session (LRU-like)
   */ evictOldestSession() {
        let oldestId = null;
        let oldestExpires = Infinity;
        for (const [sessionId, entry] of this.sessions.entries()){
            if (entry.expires < oldestExpires) {
                oldestExpires = entry.expires;
                oldestId = sessionId;
            }
        }
        if (oldestId) {
            this.sessions.delete(oldestId);
            logger.debug({
                sessionId: oldestId
            }, 'Evicted oldest session from cache');
        }
    }
    /**
   * Evict oldest subscription (LRU-like)
   */ evictOldestSubscription() {
        let oldestId = null;
        let oldestExpires = Infinity;
        for (const [subscriptionId, entry] of this.subscriptions.entries()){
            if (entry.expires < oldestExpires) {
                oldestExpires = entry.expires;
                oldestId = subscriptionId;
            }
        }
        if (oldestId) {
            this.subscriptions.delete(oldestId);
            logger.debug({
                subscriptionId: oldestId
            }, 'Evicted oldest subscription from cache');
        }
    }
}
// Singleton instance
let sessionCache = null;
function getSessionCache() {
    if (!sessionCache) {
        sessionCache = new SessionCache();
    }
    return sessionCache;
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/integrations/x402/sessions/session-tokens.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// SESSION TOKEN GENERATION
// =============================================================================
// JWT-based session tokens for wallet sessions
__turbopack_context__.s([
    "SessionTokenManager",
    ()=>SessionTokenManager,
    "getSessionTokenManager",
    ()=>getSessionTokenManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'SessionTokens'
});
class SessionTokenManager {
    secret;
    constructor(secret){
        // Use environment variable or generate a default (not secure for production!)
        this.secret = secret || process.env.SESSION_TOKEN_SECRET || 'change-me-in-production';
        if (this.secret === 'change-me-in-production') {
            logger.warn('Using default session token secret - set SESSION_TOKEN_SECRET in production!');
        }
    }
    /**
   * Generate a session token from a wallet session
   */ generateToken(session) {
        const now = Math.floor(Date.now() / 1000);
        // Token expires when session expires (or 24 hours, whichever is sooner)
        const maxTokenExpiry = now + 24 * 60 * 60; // 24 hours
        const tokenExpiry = Math.min(session.validUntil, maxTokenExpiry);
        const payload = {
            sessionId: session.id,
            walletAddress: session.walletAddress,
            endpointId: session.endpointId,
            agentId: session.agentId,
            iat: now,
            exp: tokenExpiry
        };
        // Simple base64 encoding for now (can upgrade to proper JWT library)
        // In production, use a proper JWT library like 'jsonwebtoken'
        const token = this.encodeToken(payload);
        logger.debug({
            sessionId: session.id,
            walletAddress: session.walletAddress,
            expiresAt: tokenExpiry
        }, 'Session token generated');
        return {
            token,
            expiresAt: tokenExpiry,
            sessionId: session.id
        };
    }
    /**
   * Validate and decode a session token
   */ validateToken(token) {
        try {
            const payload = this.decodeToken(token);
            if (!payload) {
                return {
                    valid: false,
                    error: 'Invalid token format'
                };
            }
            // Check expiration
            const now = Math.floor(Date.now() / 1000);
            if (payload.exp < now) {
                return {
                    valid: false,
                    error: 'Token expired'
                };
            }
            return {
                valid: true,
                payload
            };
        } catch (error) {
            return {
                valid: false,
                error: error instanceof Error ? error.message : 'Token validation failed'
            };
        }
    }
    /**
   * Encode token payload (simple base64 + HMAC for now)
   * TODO: Upgrade to proper JWT library (jsonwebtoken) in production
   */ encodeToken(payload) {
        // Simple encoding: base64(payload) + '.' + HMAC signature
        const payloadJson = JSON.stringify(payload);
        const payloadB64 = Buffer.from(payloadJson).toString('base64url');
        // Create HMAC signature
        const crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
        const hmac = crypto.createHmac('sha256', this.secret);
        hmac.update(payloadB64);
        const signature = hmac.digest('base64url');
        return `${payloadB64}.${signature}`;
    }
    /**
   * Decode and verify token
   */ decodeToken(token) {
        try {
            const parts = token.split('.');
            if (parts.length !== 2) {
                return null;
            }
            const [payloadB64, signature] = parts;
            // Verify signature
            const crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
            const hmac = crypto.createHmac('sha256', this.secret);
            hmac.update(payloadB64);
            const expectedSignature = hmac.digest('base64url');
            if (signature !== expectedSignature) {
                logger.warn('Token signature mismatch');
                return null;
            }
            // Decode payload
            const payloadJson = Buffer.from(payloadB64, 'base64url').toString('utf-8');
            const payload = JSON.parse(payloadJson);
            return payload;
        } catch (error) {
            logger.error({
                error
            }, 'Failed to decode token');
            return null;
        }
    }
}
// Singleton instance
let tokenManager = null;
function getSessionTokenManager() {
    if (!tokenManager) {
        tokenManager = new SessionTokenManager();
    }
    return tokenManager;
}
}),
"[project]/src/integrations/x402/sessions/session-middleware.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// SESSION MIDDLEWARE
// =============================================================================
// Middleware for checking and validating sessions in requests
__turbopack_context__.s([
    "checkSessionToken",
    ()=>checkSessionToken,
    "createSessionFromPayment",
    ()=>createSessionFromPayment,
    "useSessionForPayment",
    ()=>useSessionForPayment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$wallet$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/sessions/wallet-session.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$session$2d$tokens$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/sessions/session-tokens.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'SessionMiddleware'
});
function checkSessionToken(request) {
    // Check for session token in headers
    const sessionToken = request.headers.get('x-session-token') || request.headers.get('authorization')?.replace('Bearer ', '');
    if (!sessionToken) {
        return {
            hasSession: false
        };
    }
    // Validate token
    const tokenManager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$session$2d$tokens$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionTokenManager"])();
    const tokenValidation = tokenManager.validateToken(sessionToken);
    if (!tokenValidation.valid || !tokenValidation.payload) {
        return {
            hasSession: true,
            valid: false,
            error: tokenValidation.error || 'Invalid session token'
        };
    }
    const payload = tokenValidation.payload;
    // Validate session exists and is still valid
    const sessionManager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$wallet$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWalletSessionManager"])();
    const sessionValidation = sessionManager.validateSession(payload.sessionId);
    if (!sessionValidation.valid || !sessionValidation.session) {
        return {
            hasSession: true,
            sessionId: payload.sessionId,
            walletAddress: payload.walletAddress,
            valid: false,
            error: sessionValidation.error || 'Session invalid'
        };
    }
    return {
        hasSession: true,
        sessionId: payload.sessionId,
        walletAddress: payload.walletAddress,
        valid: true,
        remainingAmount: sessionValidation.remainingAmount
    };
}
function useSessionForPayment(sessionId, amount) {
    const sessionManager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$wallet$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWalletSessionManager"])();
    const result = sessionManager.useSession(sessionId, amount);
    if (!result.valid) {
        return {
            success: false,
            error: result.error,
            remainingAmount: result.remainingAmount
        };
    }
    return {
        success: true,
        remainingAmount: result.remainingAmount
    };
}
async function createSessionFromPayment(paymentHeader, endpointId, agentId) {
    try {
        // Parse and verify payment
        const { parseAndVerifyPaymentHeader } = await __turbopack_context__.A("[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript, async loader)");
        const parsed = await parseAndVerifyPaymentHeader(paymentHeader);
        if (!parsed.valid || !parsed.payment) {
            return {
                success: false,
                error: parsed.error || 'Invalid payment header'
            };
        }
        const payment = parsed.payment;
        // Create session
        const sessionManager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$wallet$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getWalletSessionManager"])();
        const session = sessionManager.createSession({
            walletAddress: payment.authorization.from,
            authorizedAmount: payment.authorization.value,
            validUntil: parseInt(payment.authorization.validBefore),
            validFrom: parseInt(payment.authorization.validAfter || Math.floor(Date.now() / 1000).toString()),
            network: payment.network,
            asset: payment.authorization.to,
            nonce: payment.authorization.nonce,
            signature: payment.signature,
            authorization: payment.authorization,
            endpointId,
            agentId,
            reusable: true
        });
        // Generate token
        const tokenManager = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$session$2d$tokens$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionTokenManager"])();
        const tokenResult = tokenManager.generateToken(session);
        logger.info({
            sessionId: session.id,
            walletAddress: session.walletAddress,
            endpointId
        }, 'Session created from payment');
        return {
            success: true,
            sessionId: session.id,
            token: tokenResult.token,
            expiresAt: tokenResult.expiresAt
        };
    } catch (error) {
        logger.error({
            error
        }, 'Failed to create session from payment');
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}
}),
"[project]/src/integrations/x402/sessions/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// SESSIONS MODULE EXPORTS
// =============================================================================
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$wallet$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/sessions/wallet-session.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$subscription$2d$manager$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/sessions/subscription-manager.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$session$2d$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/sessions/session-cache.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$session$2d$tokens$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/sessions/session-tokens.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$session$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/sessions/session-middleware.ts [app-route] (ecmascript)");
;
;
;
;
;
}),
"[project]/src/integrations/x402/caip-utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// CAIP (Chain Agnostic Improvement Proposals) Utilities
// =============================================================================
// Utilities for parsing, formatting, and validating CAIP identifiers
// CAIP-2: Blockchain ID Specification
// CAIP-19: Asset ID Specification
/**
 * CAIP-2 Network Identifier
 * Format: <namespace>:<reference>
 * Examples:
 * - eip155:1 (Ethereum Mainnet)
 * - eip155:8453 (Base)
 * - eip155:56 (BNB Chain)
 * - eip155:137 (Polygon)
 * - solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp (Solana Mainnet)
 */ __turbopack_context__.s([
    "CAIP_ASSETS",
    ()=>CAIP_ASSETS,
    "CAIP_NETWORKS",
    ()=>CAIP_NETWORKS,
    "caipToNetwork",
    ()=>caipToNetwork,
    "formatCAIPAsset",
    ()=>formatCAIPAsset,
    "formatCAIPNetwork",
    ()=>formatCAIPNetwork,
    "getChainId",
    ()=>getChainId,
    "getTokenAddress",
    ()=>getTokenAddress,
    "isEVMNetwork",
    ()=>isEVMNetwork,
    "isSolanaNetwork",
    ()=>isSolanaNetwork,
    "networkToCAIP",
    ()=>networkToCAIP,
    "parseCAIPAsset",
    ()=>parseCAIPAsset,
    "parseCAIPNetwork",
    ()=>parseCAIPNetwork,
    "tokenToCAIP",
    ()=>tokenToCAIP,
    "validateCAIPAsset",
    ()=>validateCAIPAsset,
    "validateCAIPNetwork",
    ()=>validateCAIPNetwork
]);
function parseCAIPNetwork(caip) {
    try {
        const [namespace, reference] = caip.split(':');
        if (!namespace || !reference) {
            return null;
        }
        // For EVM chains (eip155), reference is the chain ID
        let chainId;
        if (namespace === 'eip155') {
            chainId = parseInt(reference, 10);
            if (isNaN(chainId)) {
                return null;
            }
        }
        return {
            namespace,
            reference,
            chainId
        };
    } catch  {
        return null;
    }
}
function formatCAIPNetwork(namespace, reference) {
    return `${namespace}:${reference}`;
}
function parseCAIPAsset(caip) {
    try {
        const parts = caip.split('/');
        if (parts.length !== 2) {
            return null;
        }
        const networkPart = parts[0];
        const assetPart = parts[1];
        const network = parseCAIPNetwork(networkPart);
        if (!network) {
            return null;
        }
        const [assetNamespace, assetReference] = assetPart.split(':');
        if (!assetNamespace || !assetReference) {
            return null;
        }
        return {
            network,
            assetNamespace,
            assetReference,
            address: assetNamespace === 'erc20' ? assetReference : undefined
        };
    } catch  {
        return null;
    }
}
function formatCAIPAsset(network, assetNamespace, assetReference) {
    return `${network}/${assetNamespace}:${assetReference}`;
}
function networkToCAIP(network) {
    const networkMap = {
        ethereum: 'eip155:1',
        mainnet: 'eip155:1',
        base: 'eip155:8453',
        'base-mainnet': 'eip155:8453',
        bnb: 'eip155:56',
        'bnb-chain': 'eip155:56',
        'bsc': 'eip155:56',
        polygon: 'eip155:137',
        'polygon-mainnet': 'eip155:137',
        arbitrum: 'eip155:42161',
        'arbitrum-one': 'eip155:42161',
        optimism: 'eip155:10',
        'optimism-mainnet': 'eip155:10',
        avalanche: 'eip155:43114',
        'avalanche-mainnet': 'eip155:43114',
        solana: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
        'solana-mainnet': 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'
    };
    const normalized = network.toLowerCase().replace(/_/g, '-');
    return networkMap[normalized] || null;
}
function caipToNetwork(caip) {
    const parsed = parseCAIPNetwork(caip);
    if (!parsed) {
        return null;
    }
    if (parsed.namespace === 'eip155') {
        const chainIdMap = {
            1: 'ethereum',
            8453: 'base',
            56: 'bnb',
            137: 'polygon',
            42161: 'arbitrum',
            10: 'optimism',
            43114: 'avalanche'
        };
        return chainIdMap[parsed.chainId] || null;
    }
    if (parsed.namespace === 'solana') {
        return 'solana';
    }
    return null;
}
function getChainId(caip) {
    const parsed = parseCAIPNetwork(caip);
    if (parsed?.namespace === 'eip155' && parsed.chainId) {
        return parsed.chainId;
    }
    return null;
}
function isEVMNetwork(caip) {
    const parsed = parseCAIPNetwork(caip);
    return parsed?.namespace === 'eip155' || false;
}
function isSolanaNetwork(caip) {
    const parsed = parseCAIPNetwork(caip);
    return parsed?.namespace === 'solana' || false;
}
function validateCAIPNetwork(caip) {
    return parseCAIPNetwork(caip) !== null;
}
function validateCAIPAsset(caip) {
    return parseCAIPAsset(caip) !== null;
}
function getTokenAddress(caip) {
    const parsed = parseCAIPAsset(caip);
    if (parsed?.assetNamespace === 'erc20') {
        return parsed.address || null;
    }
    return null;
}
function tokenToCAIP(network, tokenAddress) {
    const networkCAIP = networkToCAIP(network);
    if (!networkCAIP) {
        return null;
    }
    return formatCAIPAsset(networkCAIP, 'erc20', tokenAddress);
}
const CAIP_NETWORKS = {
    ETHEREUM: 'eip155:1',
    BASE: 'eip155:8453',
    BNB_CHAIN: 'eip155:56',
    POLYGON: 'eip155:137',
    ARBITRUM: 'eip155:42161',
    OPTIMISM: 'eip155:10',
    AVALANCHE: 'eip155:43114',
    SOLANA: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'
};
const CAIP_ASSETS = {
    USDC_ETHEREUM: 'eip155:1/erc20:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    USDC_BASE: 'eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    USDC_POLYGON: 'eip155:137/erc20:0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    USDC_ARBITRUM: 'eip155:42161/erc20:0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    USDC_OPTIMISM: 'eip155:10/erc20:0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
    ETH_ETHEREUM: 'eip155:1/slip44:60'
};
}),
"[project]/src/integrations/x402/chain-registry.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// CHAIN REGISTRY
// =============================================================================
// Registry of supported blockchain networks with metadata
__turbopack_context__.s([
    "ChainRegistry",
    ()=>ChainRegistry,
    "getChainRegistry",
    ()=>getChainRegistry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/caip-utils.ts [app-route] (ecmascript)");
;
class ChainRegistry {
    networks = new Map();
    constructor(){
        this.registerDefaultNetworks();
    }
    /**
   * Register a network
   */ register(network) {
        this.networks.set(network.caip, network);
    }
    /**
   * Get network metadata by CAIP identifier
   */ get(caip) {
        return this.networks.get(caip);
    }
    /**
   * Get network by legacy name
   */ getByLegacyName(name) {
        for (const network of this.networks.values()){
            if (network.name.toLowerCase() === name.toLowerCase()) {
                return network;
            }
        }
        return undefined;
    }
    /**
   * Get all registered networks
   */ getAll() {
        return Array.from(this.networks.values());
    }
    /**
   * Get all EVM networks
   */ getEVMs() {
        return Array.from(this.networks.values()).filter((n)=>n.isEVM);
    }
    /**
   * Get all Solana networks
   */ getSolanas() {
        return Array.from(this.networks.values()).filter((n)=>n.isSolana);
    }
    /**
   * Check if network is registered
   */ has(caip) {
        return this.networks.has(caip);
    }
    /**
   * Register default networks
   */ registerDefaultNetworks() {
        // Ethereum Mainnet
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].ETHEREUM,
            name: 'ethereum',
            displayName: 'Ethereum',
            chainId: 1,
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: [
                'https://eth.llamarpc.com'
            ],
            blockExplorers: [
                {
                    name: 'Etherscan',
                    url: 'https://etherscan.io'
                }
            ],
            isTestnet: false,
            isEVM: true,
            isSolana: false,
            supportsEIP1559: true,
            averageGasPrice: '30000000000',
            averageBlockTime: 12
        });
        // Base
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].BASE,
            name: 'base',
            displayName: 'Base',
            chainId: 8453,
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: [
                'https://mainnet.base.org'
            ],
            blockExplorers: [
                {
                    name: 'BaseScan',
                    url: 'https://basescan.org'
                }
            ],
            isTestnet: false,
            isEVM: true,
            isSolana: false,
            supportsEIP1559: true,
            averageGasPrice: '1000000',
            averageBlockTime: 2
        });
        // BNB Chain
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].BNB_CHAIN,
            name: 'bnb',
            displayName: 'BNB Chain',
            chainId: 56,
            nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18
            },
            rpcUrls: [
                'https://bsc-dataseed.binance.org'
            ],
            blockExplorers: [
                {
                    name: 'BscScan',
                    url: 'https://bscscan.com'
                }
            ],
            isTestnet: false,
            isEVM: true,
            isSolana: false,
            supportsEIP1559: false,
            averageGasPrice: '3000000000',
            averageBlockTime: 3
        });
        // Polygon
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].POLYGON,
            name: 'polygon',
            displayName: 'Polygon',
            chainId: 137,
            nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
            },
            rpcUrls: [
                'https://polygon-rpc.com'
            ],
            blockExplorers: [
                {
                    name: 'PolygonScan',
                    url: 'https://polygonscan.com'
                }
            ],
            isTestnet: false,
            isEVM: true,
            isSolana: false,
            supportsEIP1559: true,
            averageGasPrice: '30000000000',
            averageBlockTime: 2
        });
        // Arbitrum One
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].ARBITRUM,
            name: 'arbitrum',
            displayName: 'Arbitrum One',
            chainId: 42161,
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: [
                'https://arb1.arbitrum.io/rpc'
            ],
            blockExplorers: [
                {
                    name: 'Arbiscan',
                    url: 'https://arbiscan.io'
                }
            ],
            isTestnet: false,
            isEVM: true,
            isSolana: false,
            supportsEIP1559: true,
            averageGasPrice: '100000000',
            averageBlockTime: 0.25
        });
        // Optimism
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].OPTIMISM,
            name: 'optimism',
            displayName: 'Optimism',
            chainId: 10,
            nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: [
                'https://mainnet.optimism.io'
            ],
            blockExplorers: [
                {
                    name: 'Optimistic Etherscan',
                    url: 'https://optimistic.etherscan.io'
                }
            ],
            isTestnet: false,
            isEVM: true,
            isSolana: false,
            supportsEIP1559: true,
            averageGasPrice: '1000000',
            averageBlockTime: 2
        });
        // Avalanche
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].AVALANCHE,
            name: 'avalanche',
            displayName: 'Avalanche',
            chainId: 43114,
            nativeCurrency: {
                name: 'AVAX',
                symbol: 'AVAX',
                decimals: 18
            },
            rpcUrls: [
                'https://api.avax.network/ext/bc/C/rpc'
            ],
            blockExplorers: [
                {
                    name: 'Snowtrace',
                    url: 'https://snowtrace.io'
                }
            ],
            isTestnet: false,
            isEVM: true,
            isSolana: false,
            supportsEIP1559: true,
            averageGasPrice: '25000000000',
            averageBlockTime: 2
        });
        // Solana Mainnet (placeholder - full support when SDK available)
        this.register({
            caip: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CAIP_NETWORKS"].SOLANA,
            name: 'solana',
            displayName: 'Solana',
            chainId: null,
            nativeCurrency: {
                name: 'SOL',
                symbol: 'SOL',
                decimals: 9
            },
            rpcUrls: [
                'https://api.mainnet-beta.solana.com'
            ],
            blockExplorers: [
                {
                    name: 'Solana Explorer',
                    url: 'https://explorer.solana.com'
                }
            ],
            isTestnet: false,
            isEVM: false,
            isSolana: true,
            averageBlockTime: 0.4
        });
    }
}
// Singleton instance
let chainRegistry = null;
function getChainRegistry() {
    if (!chainRegistry) {
        chainRegistry = new ChainRegistry();
    }
    return chainRegistry;
}
}),
"[project]/src/integrations/x402/chain-detection.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// CHAIN DETECTION AND VALIDATION
// =============================================================================
// Utilities for detecting and validating blockchain networks
__turbopack_context__.s([
    "areNetworksCompatible",
    ()=>areNetworksCompatible,
    "detectChain",
    ()=>detectChain,
    "getCompatibleNetworks",
    ()=>getCompatibleNetworks,
    "normalizeToCAIP",
    ()=>normalizeToCAIP,
    "validateAssetOnNetwork",
    ()=>validateAssetOnNetwork,
    "validateChain",
    ()=>validateChain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$chain$2d$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/chain-registry.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/caip-utils.ts [app-route] (ecmascript)");
;
;
function detectChain(input) {
    const chainRegistry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$chain$2d$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChainRegistry"])();
    // Try as CAIP identifier first
    if (typeof input === 'string' && input.includes(':')) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateCAIPNetwork"])(input)) {
            const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCAIPNetwork"])(input);
            const network = chainRegistry.get(input);
            return {
                detected: true,
                network: input,
                legacyName: network?.name,
                chainId: parsed?.chainId || undefined,
                isEVM: parsed?.namespace === 'eip155',
                isSolana: parsed?.namespace === 'solana'
            };
        }
    }
    // Try as legacy network name
    if (typeof input === 'string') {
        const caip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["networkToCAIP"])(input);
        if (caip) {
            const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCAIPNetwork"])(caip);
            const network = chainRegistry.get(caip);
            return {
                detected: true,
                network: caip,
                legacyName: input.toLowerCase(),
                chainId: parsed?.chainId || undefined,
                isEVM: parsed?.namespace === 'eip155',
                isSolana: parsed?.namespace === 'solana'
            };
        }
    }
    // Try as chain ID (EVM only)
    if (typeof input === 'number') {
        const network = chainRegistry.getAll().find((n)=>n.chainId === input);
        if (network) {
            return {
                detected: true,
                network: network.caip,
                legacyName: network.name,
                chainId: input,
                isEVM: network.isEVM,
                isSolana: network.isSolana
            };
        }
    }
    return {
        detected: false,
        error: `Could not detect chain from input: ${input}`
    };
}
function validateChain(caip) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateCAIPNetwork"])(caip)) {
        return {
            valid: false,
            supported: false,
            error: 'Invalid CAIP-2 network identifier format'
        };
    }
    const chainRegistry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$chain$2d$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChainRegistry"])();
    const network = chainRegistry.get(caip);
    if (!network) {
        return {
            valid: true,
            supported: false,
            error: 'Network not supported'
        };
    }
    return {
        valid: true,
        supported: true,
        network
    };
}
function validateAssetOnNetwork(asset, network) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateCAIPAsset"])(asset)) {
        return {
            valid: false,
            supported: false,
            error: 'Invalid CAIP-19 asset identifier format'
        };
    }
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCAIPAsset"])(asset);
    if (!parsed) {
        return {
            valid: false,
            supported: false,
            error: 'Could not parse CAIP-19 asset identifier'
        };
    }
    // Check if asset network matches requested network
    // parsed.network is a ParsedCAIPNetwork object, need to reconstruct CAIP
    const assetNetworkCAIP = `${parsed.network.namespace}:${parsed.network.reference}`;
    if (assetNetworkCAIP !== network) {
        return {
            valid: true,
            supported: false,
            error: `Asset network ${assetNetworkCAIP} does not match requested network ${network}`
        };
    }
    return {
        valid: true,
        supported: true
    };
}
function getCompatibleNetworks(asset) {
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCAIPAsset"])(asset);
    if (!parsed) {
        return [];
    }
    const chainRegistry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$chain$2d$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getChainRegistry"])();
    const compatible = [];
    // For ERC20 tokens, find all EVM networks that might support this token
    if (parsed.assetNamespace === 'erc20') {
        const evmNetworks = chainRegistry.getEVMs();
        for (const network of evmNetworks){
            // In a real implementation, you'd check if the token contract exists on that network
            // For now, we'll return all EVM networks as potentially compatible
            compatible.push(network.caip);
        }
    }
    return compatible;
}
function normalizeToCAIP(input) {
    const detection = detectChain(input);
    return detection.detected ? detection.network || null : null;
}
function areNetworksCompatible(network1, network2) {
    const parsed1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCAIPNetwork"])(network1);
    const parsed2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCAIPNetwork"])(network2);
    if (!parsed1 || !parsed2) {
        return false;
    }
    // Same namespace means compatible (e.g., both EVM, both Solana)
    return parsed1.namespace === parsed2.namespace;
}
}),
"[project]/src/integrations/x402/test-verification.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// TEST-ONLY X402 VERIFICATION
// =============================================================================
// Fake x402 verification helper for safe testing without real funds
// DO NOT USE IN PRODUCTION - This bypasses all real payment verification
__turbopack_context__.s([
    "TEST_TOKEN_HEADER",
    ()=>TEST_TOKEN_HEADER,
    "TEST_TOKEN_VALUE",
    ()=>TEST_TOKEN_VALUE,
    "isTestModeEnabled",
    ()=>isTestModeEnabled,
    "verifyPaymentTestOnly",
    ()=>verifyPaymentTestOnly
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'TestX402Verification'
});
const TEST_TOKEN_HEADER = 'x-easepay-test-token';
const TEST_TOKEN_VALUE = 'demo-ok';
function verifyPaymentTestOnly(request) {
    // Check for test token header
    const testToken = request.headers.get(TEST_TOKEN_HEADER) || request.headers.get(TEST_TOKEN_HEADER.toUpperCase());
    // Check for config flag (environment variable)
    const testModeEnabled = process.env.X402_TEST_MODE === 'true' || process.env.EASEPAY_TEST_MODE === 'true';
    if (testToken === TEST_TOKEN_VALUE || testModeEnabled) {
        logger.info('Test payment verification passed', {
            testToken: testToken === TEST_TOKEN_VALUE ? 'present' : 'missing',
            testModeEnabled
        });
        return {
            success: true,
            x402TxHash: 'TEST_TX_HASH',
            facilitator: 'TEST_FACILITATOR'
        };
    }
    // No test token or flag - payment required
    logger.info('Test payment verification failed - no test token', {
        testToken: testToken || 'missing',
        testModeEnabled
    });
    return {
        success: false,
        errorCode: 'PAYMENT_REQUIRED'
    };
}
function isTestModeEnabled() {
    return process.env.X402_TEST_MODE === 'true' || process.env.EASEPAY_TEST_MODE === 'true';
}
}),
"[project]/src/integrations/x402/x402-call-log.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// X402 CALL LOG
// =============================================================================
// Canonical x402 log event interface and logging utilities
// Maps to UsageLog in database for persistence
__turbopack_context__.s([
    "getX402CallLogs",
    ()=>getX402CallLogs,
    "logX402Call",
    ()=>logX402Call,
    "usageLogToX402CallLog",
    ()=>usageLogToX402CallLog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/metered-endpoints.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'X402CallLog'
});
/**
 * Convert X402CallLog to UsageLog for database persistence
 */ function x402CallLogToUsageLog(x402Log) {
    return {
        endpointId: x402Log.endpointId,
        method: 'POST',
        path: new URL(x402Log.resource).pathname,
        statusCode: x402Log.status === 'success' ? 200 : x402Log.errorCode === 'PAYMENT_REQUIRED' ? 402 : 400,
        responseTime: x402Log.latencyMs,
        units: 1,
        conversationId: x402Log.customerId || undefined,
        agentId: x402Log.agentId || undefined,
        x402TxHash: x402Log.x402TxHash || undefined,
        failureCode: x402Log.status === 'failed' ? x402Log.errorCode || 'UNKNOWN_ERROR' : undefined
    };
}
function usageLogToX402CallLog(usageLog, metadata) {
    // Determine status from statusCode and failureCode
    const status = usageLog.statusCode === 200 && !usageLog.failureCode ? 'success' : 'failed';
    // Reconstruct resource URL from path
    const baseUrl = ("TURBOPACK compile-time value", "https://www.nexflowapp.app") || 'http://localhost:3001';
    // Ensure path starts with / (fix for paths like "3001/api/..." that should be "/api/...")
    const normalizedPath = usageLog.path.startsWith('/') ? usageLog.path : `/${usageLog.path.replace(/^\d+\//, '')}`;
    const resource = metadata?.resource || `${baseUrl}${normalizedPath}`;
    // Infer facilitator from verify mode if not provided in metadata
    // This handles cases where facilitator wasn't stored in the database
    let facilitator = metadata?.facilitator;
    if (!facilitator) {
        const verifyMode = process.env.X402_VERIFY_MODE?.toLowerCase();
        if (verifyMode === 'cdp') {
            facilitator = 'CDP';
        } else if (verifyMode === 'test') {
            facilitator = 'TEST_FACILITATOR';
        } else {
            facilitator = 'UNKNOWN';
        }
    }
    return {
        id: usageLog.id,
        timestamp: usageLog.timestamp,
        customerId: usageLog.conversationId || null,
        endpointId: usageLog.endpointId,
        agentId: usageLog.agentId || null,
        facilitator,
        chainId: metadata?.chainId || 'eip155:8453',
        asset: metadata?.asset || 'USDC_TEST',
        amount: metadata?.amount || '10000',
        status,
        errorCode: usageLog.failureCode,
        x402TxHash: usageLog.x402TxHash,
        latencyMs: usageLog.responseTime,
        resource
    };
}
async function getX402CallLogs(endpointId, options) {
    try {
        const usageLogs = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listUsageLogs"])({
            endpointId
        });
        // Sort by timestamp descending (most recent first)
        usageLogs.sort((a, b)=>new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        // Apply date filters if provided
        let filtered = usageLogs;
        if (options?.startDate) {
            filtered = filtered.filter((log)=>log.timestamp >= options.startDate);
        }
        if (options?.endDate) {
            filtered = filtered.filter((log)=>log.timestamp <= options.endDate);
        }
        // Apply limit
        if (options?.limit) {
            filtered = filtered.slice(0, options.limit);
        }
        // Convert to X402CallLog
        // Note: We lose some metadata (facilitator, chainId, asset, amount, resource) when converting back
        // In a production system, we'd store these in the UsageLog or a separate metadata table
        // For now, we use verify mode and heuristics to reconstruct:
        // - Infer from X402_VERIFY_MODE first (most reliable) - ALWAYS use this when set
        // - Test facilitator: if x402TxHash starts with 'TEST_'
        // - CDP facilitator: if x402TxHash is a real transaction hash (starts with '0x')
        // - Unknown: only if we can't determine from verify mode or txHash
        const verifyMode = process.env.X402_VERIFY_MODE?.toLowerCase();
        return filtered.map((log)=>{
            let facilitator;
            // ALWAYS infer from verify mode first (most reliable)
            // This ensures that when X402_VERIFY_MODE=cdp, all logs show facilitator: "CDP"
            // even if there's no txHash (e.g., on errors)
            if (verifyMode === 'cdp') {
                facilitator = 'CDP';
            } else if (verifyMode === 'test') {
                facilitator = 'TEST_FACILITATOR';
            }
            // If verify mode didn't set it, use heuristics from txHash as fallback
            // (This handles cases where verify mode isn't set but we can infer from txHash)
            if (!facilitator && log.x402TxHash) {
                if (log.x402TxHash.startsWith('TEST_')) {
                    facilitator = 'TEST_FACILITATOR';
                } else if (log.x402TxHash.startsWith('0x')) {
                    facilitator = 'CDP';
                }
            }
            // If still not set, usageLogToX402CallLog will infer from verify mode
            // But we should have set it above if verify mode is configured
            return usageLogToX402CallLog(log, {
                facilitator,
                chainId: 'eip155:8453',
                asset: 'USDC_TEST',
                amount: '10000',
                resource: (()=>{
                    const baseUrl = ("TURBOPACK compile-time value", "https://www.nexflowapp.app") || 'http://localhost:3001';
                    const normalizedPath = log.path.startsWith('/') ? log.path : `/${log.path.replace(/^\d+\//, '')}`;
                    return `${baseUrl}${normalizedPath}`;
                })()
            });
        });
    } catch (error) {
        logger.error('Error querying x402 call logs', {
            error,
            endpointId
        });
        throw error;
    }
}
async function logX402Call(x402Log) {
    const timestamp = new Date().toISOString();
    // Log to structured logger (Pino)
    logger.info('x402 call', {
        endpointId: x402Log.endpointId,
        facilitator: x402Log.facilitator,
        chainId: x402Log.chainId,
        asset: x402Log.asset,
        amount: x402Log.amount,
        status: x402Log.status,
        errorCode: x402Log.errorCode,
        x402TxHash: x402Log.x402TxHash,
        latencyMs: x402Log.latencyMs,
        resource: x402Log.resource,
        customerId: x402Log.customerId,
        agentId: x402Log.agentId
    });
    // Persist to database via UsageLog
    try {
        const usageLogData = x402CallLogToUsageLog(x402Log);
        console.log('X402_LOG_DEBUG', JSON.stringify(usageLogData, null, 2));
        const usageLog = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createUsageLog"])(usageLogData);
        return {
            id: usageLog.id,
            timestamp: usageLog.timestamp,
            customerId: x402Log.customerId,
            endpointId: x402Log.endpointId,
            agentId: x402Log.agentId,
            facilitator: x402Log.facilitator,
            chainId: x402Log.chainId,
            asset: x402Log.asset,
            amount: x402Log.amount,
            status: x402Log.status,
            errorCode: x402Log.errorCode,
            x402TxHash: x402Log.x402TxHash,
            latencyMs: x402Log.latencyMs,
            resource: x402Log.resource
        };
    } catch (error) {
        // Log error but don't fail the request
        const errorMessage = error instanceof Error ? error.message : String(error);
        const errorDetails = error instanceof Error ? {
            message: error.message,
            stack: error.stack,
            name: error.name
        } : {
            error
        };
        console.error('X402_LOG_DB_ERROR', {
            error: errorMessage,
            errorDetails,
            x402Log: {
                endpointId: x402Log.endpointId,
                status: x402Log.status,
                facilitator: x402Log.facilitator
            }
        });
        logger.error('Failed to persist x402 call log', {
            error: errorMessage,
            errorDetails,
            x402Log: {
                endpointId: x402Log.endpointId,
                status: x402Log.status,
                facilitator: x402Log.facilitator
            }
        });
        // Return log with generated ID (for consistency, even if DB write failed)
        return {
            id: `temp-${Date.now()}`,
            timestamp,
            ...x402Log
        };
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/query-helper.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// DATABASE QUERY HELPER
// =============================================================================
// Helper functions for executing raw SQL queries that work with both SQLite and PostgreSQL
// This is used for new tables that aren't yet in the adapter interface
__turbopack_context__.s([
    "executeQuery",
    ()=>executeQuery,
    "executeQueryOne",
    ()=>executeQueryOne,
    "executeUpdate",
    ()=>executeUpdate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/client.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function executeQuery(query, params = []) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    // Check if it's PostgreSQL adapter
    if ('pool' in db && typeof db.pool?.query === 'function') {
        const pool = db.pool;
        const result = await pool.query(query, params);
        return result.rows;
    }
    // Check if it's SQLite adapter
    if ('db' in db && typeof db.db?.prepare === 'function') {
        const dbInstance = db.db;
        const stmt = dbInstance.prepare(query);
        return stmt.all(...params);
    }
    // Fallback: try direct access
    if (typeof db.query === 'function') {
        const result = await db.query(query, params);
        return result.rows || result;
    }
    if (typeof db.prepare === 'function') {
        const stmt = db.prepare(query);
        return stmt.all(...params);
    }
    throw new Error('Unable to execute query: database adapter not recognized');
}
async function executeQueryOne(query, params = []) {
    const results = await executeQuery(query, params);
    return results.length > 0 ? results[0] : null;
}
async function executeUpdate(query, params = []) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    // Check if it's PostgreSQL adapter
    if ('pool' in db && typeof db.pool?.query === 'function') {
        const pool = db.pool;
        const result = await pool.query(query, params);
        return {
            rowCount: result.rowCount
        };
    }
    // Check if it's SQLite adapter
    if ('db' in db && typeof db.db?.prepare === 'function') {
        const dbInstance = db.db;
        const stmt = dbInstance.prepare(query);
        const result = stmt.run(...params);
        return {
            changes: result.changes
        };
    }
    // Fallback
    if (typeof db.query === 'function') {
        const result = await db.query(query, params);
        return {
            rowCount: result.rowCount
        };
    }
    if (typeof db.prepare === 'function') {
        const stmt = db.prepare(query);
        const result = stmt.run(...params);
        return {
            changes: result.changes
        };
    }
    throw new Error('Unable to execute update: database adapter not recognized');
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/metrics.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// METRICS DATABASE
// =============================================================================
// Database operations for metrics storage
__turbopack_context__.s([
    "cleanupOldMetrics",
    ()=>cleanupOldMetrics,
    "getAggregatedMetrics",
    ()=>getAggregatedMetrics,
    "getMetrics",
    ()=>getMetrics,
    "recordMetric",
    ()=>recordMetric,
    "recordMetrics",
    ()=>recordMetrics
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/query-helper.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
/**
 * Convert database row to Metric
 */ function rowToMetric(row) {
    return {
        name: row.name,
        value: parseFloat(row.value),
        timestamp: parseInt(row.timestamp),
        tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags
    };
}
async function recordMetric(metric) {
    const id = metric.id || `m_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const db = __turbopack_context__.r("[project]/src/db/client.ts [app-route] (ecmascript)").getDb();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const query = isPostgres ? `INSERT INTO metrics (id, name, value, timestamp, tags, created_at)
       VALUES ($1, $2, $3, $4, $5, $6)` : `INSERT INTO metrics (id, name, value, timestamp, tags, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [
        id,
        metric.name,
        metric.value.toString(),
        metric.timestamp.toString(),
        JSON.stringify(metric.tags || {}),
        new Date().toISOString()
    ];
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeUpdate"])(query, params);
}
async function recordMetrics(metrics) {
    // Batch insert for better performance
    for (const metric of metrics){
        await recordMetric(metric);
    }
}
async function getMetrics(name, startTime, endTime, tags) {
    const db = __turbopack_context__.r("[project]/src/db/client.ts [app-route] (ecmascript)").getDb();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    let query = 'SELECT * FROM metrics WHERE name = ';
    const params = [];
    let paramIndex = 1;
    if (isPostgres) {
        query += `$${paramIndex++}`;
    } else {
        query += '?';
    }
    params.push(name);
    if (startTime !== undefined) {
        if (isPostgres) {
            query += ` AND timestamp >= $${paramIndex++}`;
        } else {
            query += ' AND timestamp >= ?';
        }
        params.push(startTime.toString());
    }
    if (endTime !== undefined) {
        if (isPostgres) {
            query += ` AND timestamp <= $${paramIndex++}`;
        } else {
            query += ' AND timestamp <= ?';
        }
        params.push(endTime.toString());
    }
    // Tag filtering (simplified - for complex queries, consider using JSONB operators in PostgreSQL)
    if (tags && Object.keys(tags).length > 0) {
        // This is a simplified approach - for production, use proper JSONB queries
        query += ' AND tags IS NOT NULL';
    }
    query += ' ORDER BY timestamp DESC LIMIT 10000'; // Limit to prevent memory issues
    const rows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQuery"])(query, params);
    return rows.map(rowToMetric);
}
async function getAggregatedMetrics(name, startTime, endTime, tags) {
    const metrics = await getMetrics(name, startTime, endTime, tags);
    if (metrics.length === 0) {
        return null;
    }
    // Filter by tags if provided
    let filtered = metrics;
    if (tags) {
        filtered = metrics.filter((m)=>{
            if (!m.tags) return false;
            return Object.entries(tags).every(([key, value])=>m.tags[key] === value);
        });
    }
    if (filtered.length === 0) {
        return null;
    }
    // Calculate aggregations
    const values = filtered.map((m)=>m.value).sort((a, b)=>a - b);
    const count = values.length;
    const sum = values.reduce((a, b)=>a + b, 0);
    const min = values[0];
    const max = values[values.length - 1];
    const average = sum / count;
    // Calculate percentiles
    const p50Index = Math.floor(count * 0.5);
    const p95Index = Math.floor(count * 0.95);
    const p99Index = Math.floor(count * 0.99);
    return {
        name,
        count,
        sum,
        min,
        max,
        average,
        p50: values[p50Index] || average,
        p95: values[p95Index] || max,
        p99: values[p99Index] || max,
        tags: tags || filtered[0]?.tags
    };
}
async function cleanupOldMetrics(olderThanDays = 30) {
    const cutoffTime = Date.now() - olderThanDays * 24 * 60 * 60 * 1000;
    const db = __turbopack_context__.r("[project]/src/db/client.ts [app-route] (ecmascript)").getDb();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const query = isPostgres ? `DELETE FROM metrics WHERE timestamp < $1` : `DELETE FROM metrics WHERE timestamp < ?`;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeUpdate"])(query, [
        cutoffTime.toString()
    ]);
    return result.rowCount ?? result.changes ?? 0;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/metrics-collector.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// Metrics Collector
// =============================================================================
// Collects and aggregates metrics for monitoring and observability
// In-memory metrics store (can be extended to Redis for distributed systems)
__turbopack_context__.s([
    "clearMetrics",
    ()=>clearMetrics,
    "getAggregatedMetrics",
    ()=>getAggregatedMetrics,
    "getMetricNames",
    ()=>getMetricNames,
    "getRecentMetrics",
    ()=>getRecentMetrics,
    "recordCircuitBreakerMetric",
    ()=>recordCircuitBreakerMetric,
    "recordErrorMetric",
    ()=>recordErrorMetric,
    "recordMetric",
    ()=>recordMetric,
    "recordMetrics",
    ()=>recordMetrics,
    "recordPaymentMetric",
    ()=>recordPaymentMetric,
    "recordRequestMetric",
    ()=>recordRequestMetric
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/metrics.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'MetricsCollector'
});
async function recordMetric(metric) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordMetric"](metric);
    } catch (error) {
        logger.error('Failed to record metric', {
            metric,
            error
        });
    }
}
async function recordMetrics(metrics) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordMetrics"](metrics);
    } catch (error) {
        logger.error('Failed to record metrics', {
            count: metrics.length,
            error
        });
    }
}
async function getAggregatedMetrics(name, startTime, endTime, tags) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAggregatedMetrics"](name, startTime, endTime, tags);
    //TURBOPACK unreachable
    ;
}
function getMetricNames() {
    return Array.from(metricsStore.keys());
}
function getRecentMetrics(name, limit = 100) {
    const metrics = metricsStore.get(name);
    if (!metrics) {
        return [];
    }
    return metrics.slice(-limit);
}
function clearMetrics(name) {
    if (name) {
        metricsStore.delete(name);
    } else {
        metricsStore.clear();
    }
}
async function recordRequestMetric(endpoint, method, statusCode, durationMs, tags) {
    await recordMetric({
        name: 'http.request',
        value: durationMs,
        timestamp: Date.now(),
        tags: {
            endpoint,
            method,
            statusCode: statusCode.toString(),
            ...tags
        }
    });
    // Record status code count
    await recordMetric({
        name: 'http.request.count',
        value: 1,
        timestamp: Date.now(),
        tags: {
            endpoint,
            method,
            statusCode: statusCode.toString(),
            ...tags
        }
    });
}
async function recordPaymentMetric(endpointId, facilitator, amount, success, durationMs) {
    await recordMetric({
        name: 'payment.verification',
        value: durationMs,
        timestamp: Date.now(),
        tags: {
            endpointId,
            facilitator,
            success: success.toString()
        }
    });
    if (success) {
        await recordMetric({
            name: 'payment.amount',
            value: parseFloat(amount) / 1e6,
            timestamp: Date.now(),
            tags: {
                endpointId,
                facilitator
            }
        });
    }
}
async function recordErrorMetric(errorCode, endpoint, tags) {
    await recordMetric({
        name: 'error.count',
        value: 1,
        timestamp: Date.now(),
        tags: {
            errorCode,
            endpoint: endpoint || 'unknown',
            ...tags
        }
    });
}
async function recordCircuitBreakerMetric(upstreamUrl, state) {
    await recordMetric({
        name: 'circuit_breaker.state',
        value: state === 'open' ? 1 : 0,
        timestamp: Date.now(),
        tags: {
            upstreamUrl,
            state
        }
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/webhook-deliveries.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// WEBHOOK DELIVERIES DATABASE
// =============================================================================
// Database operations for webhook delivery logs
__turbopack_context__.s([
    "createDeliveryRecord",
    ()=>createDeliveryRecord,
    "getDeliveryRecord",
    ()=>getDeliveryRecord,
    "getDeliveryRecords",
    ()=>getDeliveryRecords,
    "listWebhookDeliveries",
    ()=>listWebhookDeliveries,
    "markDeliveryFailed",
    ()=>markDeliveryFailed,
    "markDeliverySuccess",
    ()=>markDeliverySuccess,
    "updateDeliveryAttempt",
    ()=>updateDeliveryAttempt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/query-helper.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
async function createDeliveryRecord(data) {
    const id = `wd_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const { getDb } = await __turbopack_context__.A("[project]/src/db/client.ts [app-route] (ecmascript, async loader)");
    const db = getDb();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const query = isPostgres ? `INSERT INTO webhook_deliveries (id, webhook_config_id, event_id, event_type, url, payload, signature, status, attempts, max_attempts, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)` : `INSERT INTO webhook_deliveries (id, webhook_config_id, event_id, event_type, url, payload, signature, status, attempts, max_attempts, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
        id,
        data.webhookConfigId,
        data.eventId,
        data.eventType,
        data.url,
        data.payload,
        data.signature,
        'pending',
        0,
        data.maxAttempts || 3,
        new Date().toISOString()
    ];
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeUpdate"])(query, params);
    return id;
}
async function updateDeliveryAttempt(webhookConfigId, eventId, updates) {
    const { getDb } = await __turbopack_context__.A("[project]/src/db/client.ts [app-route] (ecmascript, async loader)");
    const db = getDb();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const query = isPostgres ? `UPDATE webhook_deliveries 
       SET attempts = $1, last_attempt_at = $2 
       WHERE webhook_config_id = $3 AND event_id = $4` : `UPDATE webhook_deliveries 
       SET attempts = ?, last_attempt_at = ? 
       WHERE webhook_config_id = ? AND event_id = ?`;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeUpdate"])(query, [
        updates.attempt,
        updates.lastAttemptAt,
        webhookConfigId,
        eventId
    ]);
}
async function markDeliverySuccess(webhookConfigId, eventId, result) {
    const { getDb } = await __turbopack_context__.A("[project]/src/db/client.ts [app-route] (ecmascript, async loader)");
    const db = getDb();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const now = new Date().toISOString();
    const query = isPostgres ? `UPDATE webhook_deliveries 
       SET status = 'delivered', delivered_at = $1, last_response_code = $2, last_response_body = $3
       WHERE webhook_config_id = $4 AND event_id = $5` : `UPDATE webhook_deliveries 
       SET status = 'delivered', delivered_at = ?, last_response_code = ?, last_response_body = ?
       WHERE webhook_config_id = ? AND event_id = ?`;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeUpdate"])(query, [
        now,
        result.statusCode || null,
        result.responseBody || null,
        webhookConfigId,
        eventId
    ]);
}
async function markDeliveryFailed(webhookConfigId, eventId, result) {
    const { getDb } = await __turbopack_context__.A("[project]/src/db/client.ts [app-route] (ecmascript, async loader)");
    const db = getDb();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const status = result.nextRetryAt ? 'pending' : 'failed';
    const query = isPostgres ? `UPDATE webhook_deliveries 
       SET status = $1, attempts = $2, last_response_code = $3, last_response_body = $4, 
           error_message = $5, next_retry_at = $6, last_attempt_at = $7
       WHERE webhook_config_id = $8 AND event_id = $9` : `UPDATE webhook_deliveries 
       SET status = ?, attempts = ?, last_response_code = ?, last_response_body = ?, 
           error_message = ?, next_retry_at = ?, last_attempt_at = ?
       WHERE webhook_config_id = ? AND event_id = ?`;
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeUpdate"])(query, [
        status,
        result.attempt,
        result.statusCode || null,
        result.responseBody || null,
        result.errorMessage || null,
        result.nextRetryAt || null,
        new Date().toISOString(),
        webhookConfigId,
        eventId
    ]);
}
async function listWebhookDeliveries(filters) {
    const { getDb } = await __turbopack_context__.A("[project]/src/db/client.ts [app-route] (ecmascript, async loader)");
    const db = getDb();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    let query = 'SELECT * FROM webhook_deliveries WHERE 1=1';
    const params = [];
    let paramIndex = 1;
    if (filters?.webhookConfigId) {
        if (isPostgres) {
            query += ` AND webhook_config_id = $${paramIndex++}`;
        } else {
            query += ' AND webhook_config_id = ?';
        }
        params.push(filters.webhookConfigId);
    }
    if (filters?.eventType) {
        if (isPostgres) {
            query += ` AND event_type = $${paramIndex++}`;
        } else {
            query += ' AND event_type = ?';
        }
        params.push(filters.eventType);
    }
    if (filters?.status) {
        if (isPostgres) {
            query += ` AND status = $${paramIndex++}`;
        } else {
            query += ' AND status = ?';
        }
        params.push(filters.status);
    }
    query += ' ORDER BY created_at DESC';
    if (filters?.limit) {
        query += ` LIMIT ${filters.limit}`;
    } else {
        query += ' LIMIT 100';
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQuery"])(query, params);
}
async function getDeliveryRecords(webhookConfigId, filters) {
    return listWebhookDeliveries({
        webhookConfigId,
        ...filters
    });
}
async function getDeliveryRecord(id) {
    const { getDb } = await __turbopack_context__.A("[project]/src/db/client.ts [app-route] (ecmascript, async loader)");
    const db = getDb();
    const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
    const query = isPostgres ? 'SELECT * FROM webhook_deliveries WHERE id = $1' : 'SELECT * FROM webhook_deliveries WHERE id = ?';
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQueryOne"])(query, [
        id
    ]);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/webhook-delivery.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// Webhook Delivery System
// =============================================================================
// Handles webhook event delivery with retry logic, HMAC signing, and status tracking
//
// Features:
// - Exponential backoff with jitter
// - Dead letter queue (DLQ) for failed webhooks
// - Delivery metrics tracking
// - Circuit breaker per endpoint
// - Structured logging
__turbopack_context__.s([
    "WEBHOOK_CONFIG",
    ()=>WEBHOOK_CONFIG,
    "createWebhookEvent",
    ()=>createWebhookEvent,
    "deliverWebhook",
    ()=>deliverWebhook,
    "generateWebhookSignature",
    ()=>generateWebhookSignature,
    "getWebhookConfigsForEvent",
    ()=>getWebhookConfigsForEvent,
    "getWebhookMetrics",
    ()=>getWebhookMetrics,
    "queueWebhookDelivery",
    ()=>queueWebhookDelivery,
    "triggerWebhook",
    ()=>triggerWebhook,
    "verifyWebhookSignature",
    ()=>verifyWebhookSignature
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$webhook$2d$deliveries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/webhook-deliveries.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$webhook$2d$deliveries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$webhook$2d$deliveries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
// Lazy import to avoid blocking if bullmq is not available
async function getWebhookQueue() {
    try {
        const { enqueueWebhookDelivery } = await __turbopack_context__.A("[project]/src/lib/webhook-queue.ts [app-route] (ecmascript, async loader)");
        return enqueueWebhookDelivery;
    } catch (error) {
        logger.warn('Webhook queue not available (bullmq may not be installed)', {
            error
        });
        return null;
    }
}
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'WebhookDelivery'
});
const WEBHOOK_CONFIG = {
    /** Maximum number of delivery attempts */ maxAttempts: parseInt(process.env.WEBHOOK_MAX_ATTEMPTS || '5', 10),
    /** Base delay for exponential backoff (ms) */ baseDelay: parseInt(process.env.WEBHOOK_BASE_DELAY_MS || '1000', 10),
    /** Maximum delay between retries (ms) */ maxDelay: parseInt(process.env.WEBHOOK_MAX_DELAY_MS || '300000', 10),
    /** Request timeout (ms) */ requestTimeout: parseInt(process.env.WEBHOOK_TIMEOUT_MS || '10000', 10),
    /** Enable dead letter queue for failed webhooks */ enableDLQ: process.env.WEBHOOK_ENABLE_DLQ !== 'false',
    /** Jitter factor (0-1) for randomizing delays */ jitterFactor: parseFloat(process.env.WEBHOOK_JITTER_FACTOR || '0.2')
};
const metrics = {
    delivered: 0,
    failed: 0,
    retried: 0,
    dlqCount: 0,
    byEndpoint: new Map(),
    lastReset: Date.now()
};
const METRICS_RESET_INTERVAL = 60 * 60 * 1000; // 1 hour
function recordDeliveryMetric(url, success, isRetry = false) {
    // Reset metrics hourly
    if (Date.now() - metrics.lastReset > METRICS_RESET_INTERVAL) {
        metrics.delivered = 0;
        metrics.failed = 0;
        metrics.retried = 0;
        metrics.byEndpoint.clear();
        metrics.lastReset = Date.now();
    }
    if (success) {
        metrics.delivered++;
    } else {
        metrics.failed++;
    }
    if (isRetry) {
        metrics.retried++;
    }
    // Track by endpoint (use hostname only)
    try {
        const hostname = new URL(url).hostname;
        const endpointMetrics = metrics.byEndpoint.get(hostname) || {
            delivered: 0,
            failed: 0
        };
        if (success) {
            endpointMetrics.delivered++;
        } else {
            endpointMetrics.failed++;
        }
        metrics.byEndpoint.set(hostname, endpointMetrics);
    } catch  {
    // Invalid URL, skip endpoint tracking
    }
}
function getWebhookMetrics() {
    const total = metrics.delivered + metrics.failed;
    const byEndpoint = {};
    metrics.byEndpoint.forEach((stats, hostname)=>{
        const endpointTotal = stats.delivered + stats.failed;
        byEndpoint[hostname] = {
            ...stats,
            successRate: endpointTotal > 0 ? (stats.delivered / endpointTotal * 100).toFixed(2) + '%' : '0%'
        };
    });
    return {
        delivered: metrics.delivered,
        failed: metrics.failed,
        retried: metrics.retried,
        dlqCount: metrics.dlqCount,
        successRate: total > 0 ? (metrics.delivered / total * 100).toFixed(2) + '%' : '0%',
        byEndpoint,
        lastReset: new Date(metrics.lastReset).toISOString()
    };
}
function generateWebhookSignature(payload, secret) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHmac('sha256', secret).update(payload).digest('hex');
}
function verifyWebhookSignature(payload, signature, secret) {
    const expectedSignature = generateWebhookSignature(payload, secret);
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}
function createWebhookEvent(event, data) {
    return {
        id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        event,
        timestamp: new Date().toISOString(),
        data
    };
}
async function deliverWebhook(config, event, attempt = 1) {
    const payload = JSON.stringify(event);
    const signature = generateWebhookSignature(payload, config.secret);
    const isRetry = attempt > 1;
    const startTime = Date.now();
    try {
        const response = await fetch(config.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Webhook-Signature': signature,
                'X-Webhook-Event': event.event,
                'X-Webhook-Timestamp': event.timestamp,
                'X-Webhook-Delivery-Id': event.id,
                'X-Webhook-Attempt': attempt.toString(),
                'User-Agent': 'NexFlow-Webhooks/1.0'
            },
            body: payload,
            signal: AbortSignal.timeout(WEBHOOK_CONFIG.requestTimeout)
        });
        const responseBody = await response.text().catch(()=>'');
        const latencyMs = Date.now() - startTime;
        if (response.ok) {
            recordDeliveryMetric(config.url, true, isRetry);
            logger.info({
                webhookConfigId: config.id,
                eventId: event.id,
                eventType: event.event,
                statusCode: response.status,
                latencyMs,
                attempt
            }, 'Webhook delivered successfully');
            return {
                success: true,
                statusCode: response.status
            };
        } else {
            const retryable = isRetryableStatus(response.status);
            const retryDelay = retryable ? calculateRetryDelay(attempt - 1) : undefined;
            recordDeliveryMetric(config.url, false, isRetry);
            logger.warn({
                webhookConfigId: config.id,
                eventId: event.id,
                eventType: event.event,
                statusCode: response.status,
                responseBody: responseBody.substring(0, 200),
                latencyMs,
                attempt,
                retryable,
                retryDelay
            }, 'Webhook delivery failed');
            return {
                success: false,
                statusCode: response.status,
                error: `HTTP ${response.status}: ${responseBody.substring(0, 100)}`,
                retryable,
                retryDelay
            };
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const retryable = error instanceof Error && isRetryableError(error);
        const retryDelay = retryable ? calculateRetryDelay(attempt - 1) : undefined;
        const latencyMs = Date.now() - startTime;
        recordDeliveryMetric(config.url, false, isRetry);
        logger.error({
            webhookConfigId: config.id,
            eventId: event.id,
            eventType: event.event,
            error: errorMessage,
            latencyMs,
            attempt,
            retryable,
            retryDelay
        }, 'Webhook delivery error');
        return {
            success: false,
            error: errorMessage,
            retryable,
            retryDelay
        };
    }
}
/**
 * Calculate next retry delay with exponential backoff and jitter
 * 
 * Formula: delay = min(maxDelay, baseDelay * 2^attempt) * (1 + random * jitter)
 * 
 * @param attempt - Current attempt number (0-indexed)
 * @returns Delay in milliseconds
 */ function calculateRetryDelay(attempt) {
    const { baseDelay, maxDelay, jitterFactor } = WEBHOOK_CONFIG;
    // Exponential backoff
    const exponentialDelay = baseDelay * Math.pow(2, attempt);
    const cappedDelay = Math.min(exponentialDelay, maxDelay);
    // Add jitter (random variance to prevent thundering herd)
    const jitter = 1 + (Math.random() * jitterFactor * 2 - jitterFactor);
    return Math.round(cappedDelay * jitter);
}
/**
 * Determine if an HTTP status code is retryable
 */ function isRetryableStatus(statusCode) {
    // Retry on server errors (5xx) and some client errors
    if (statusCode >= 500 && statusCode < 600) return true;
    if (statusCode === 408) return true; // Request Timeout
    if (statusCode === 429) return true; // Too Many Requests
    return false;
}
/**
 * Determine if an error is retryable
 */ function isRetryableError(error) {
    const message = error.message.toLowerCase();
    return message.includes('timeout') || message.includes('econnrefused') || message.includes('econnreset') || message.includes('enotfound') || message.includes('socket hang up') || message.includes('network');
}
async function queueWebhookDelivery(config, event) {
    try {
        const payload = JSON.stringify(event);
        const signature = generateWebhookSignature(payload, config.secret);
        // Create delivery record in database
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$webhook$2d$deliveries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDeliveryRecord"]({
            webhookConfigId: config.id,
            eventId: event.id,
            eventType: event.event,
            url: config.url,
            payload,
            signature,
            maxAttempts: WEBHOOK_CONFIG.maxAttempts
        });
        // Enqueue job in BullMQ (lazy import)
        const enqueueWebhookDelivery = await getWebhookQueue();
        if (enqueueWebhookDelivery) {
            await enqueueWebhookDelivery({
                webhookConfigId: config.id,
                eventId: event.id,
                eventType: event.event,
                url: config.url,
                payload,
                signature
            });
            logger.info({
                webhookConfigId: config.id,
                eventId: event.id,
                eventType: event.event,
                url: config.url,
                maxAttempts: WEBHOOK_CONFIG.maxAttempts
            }, 'Webhook queued for delivery');
        } else {
            // Fallback: deliver with retry logic inline
            logger.warn({
                webhookConfigId: config.id,
                eventId: event.id
            }, 'Webhook queue not available, delivering with inline retry');
            await deliverWithRetry(config, event);
        }
    } catch (error) {
        logger.error({
            webhookConfigId: config.id,
            eventId: event.id,
            error
        }, 'Failed to queue webhook delivery');
        throw error;
    }
}
/**
 * Deliver webhook with retry logic (inline, without queue)
 */ async function deliverWithRetry(config, event) {
    let attempt = 1;
    while(attempt <= WEBHOOK_CONFIG.maxAttempts){
        const result = await deliverWebhook(config, event, attempt);
        if (result.success) {
            return;
        }
        // Check if we should retry
        if (!result.retryable || attempt >= WEBHOOK_CONFIG.maxAttempts) {
            // No retry - check if should go to DLQ
            if (WEBHOOK_CONFIG.enableDLQ) {
                await sendToDeadLetterQueue(config, event, result.error || 'Unknown error', attempt);
            }
            logger.error({
                webhookConfigId: config.id,
                eventId: event.id,
                eventType: event.event,
                attempts: attempt,
                error: result.error,
                sentToDLQ: WEBHOOK_CONFIG.enableDLQ
            }, 'Webhook delivery failed permanently');
            return;
        }
        // Wait before retry
        const delay = result.retryDelay || calculateRetryDelay(attempt - 1);
        logger.info({
            webhookConfigId: config.id,
            eventId: event.id,
            attempt,
            nextAttempt: attempt + 1,
            delayMs: delay
        }, 'Scheduling webhook retry');
        await new Promise((resolve)=>setTimeout(resolve, delay));
        attempt++;
    }
}
/**
 * Send failed webhook to dead letter queue for manual review
 */ async function sendToDeadLetterQueue(config, event, error, attempts) {
    metrics.dlqCount++;
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$webhook$2d$deliveries$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["markDeliveryFailed"]({
            eventId: event.id,
            webhookConfigId: config.id,
            error,
            attempts,
            sentToDLQ: true
        });
        logger.warn({
            webhookConfigId: config.id,
            eventId: event.id,
            eventType: event.event,
            error,
            attempts
        }, 'Webhook sent to dead letter queue');
    } catch (dlqError) {
        logger.error({
            webhookConfigId: config.id,
            eventId: event.id,
            dlqError
        }, 'Failed to send webhook to dead letter queue');
    }
}
/**
 * Attempt webhook delivery with retry logic (used by BullMQ worker)
 */ async function attemptWebhookDelivery(config, event, delivery) {
    delivery.attempts++;
    const result = await deliverWebhook(config, event, delivery.attempts);
    delivery.lastAttemptAt = new Date().toISOString();
    delivery.lastResponseCode = result.statusCode;
    if (result.success) {
        delivery.status = 'delivered';
        delivery.deliveredAt = new Date().toISOString();
        logger.info({
            webhookConfigId: config.id,
            eventId: event.id,
            attempts: delivery.attempts
        }, 'Webhook delivered');
        return;
    }
    // Check if we should retry
    const canRetry = result.retryable && delivery.attempts < delivery.maxAttempts;
    if (!canRetry) {
        delivery.status = 'failed';
        // Send to DLQ if enabled
        if (WEBHOOK_CONFIG.enableDLQ) {
            await sendToDeadLetterQueue(config, event, result.error || 'Unknown error', delivery.attempts);
        }
        logger.error({
            webhookConfigId: config.id,
            eventId: event.id,
            attempts: delivery.attempts,
            maxAttempts: delivery.maxAttempts,
            error: result.error,
            retryable: result.retryable,
            sentToDLQ: WEBHOOK_CONFIG.enableDLQ
        }, 'Webhook delivery failed after max attempts');
        return;
    }
    // Schedule retry
    const retryDelay = result.retryDelay || calculateRetryDelay(delivery.attempts - 1);
    delivery.nextRetryAt = new Date(Date.now() + retryDelay).toISOString();
    delivery.status = 'pending';
    logger.info({
        webhookConfigId: config.id,
        eventId: event.id,
        attempts: delivery.attempts,
        maxAttempts: delivery.maxAttempts,
        nextRetryAt: delivery.nextRetryAt,
        retryDelayMs: retryDelay
    }, 'Webhook scheduled for retry');
    // Schedule retry (in production, BullMQ handles this)
    setTimeout(async ()=>{
        await attemptWebhookDelivery(config, event, delivery);
    }, retryDelay);
}
async function getWebhookConfigsForEvent(eventType, endpointId) {
    try {
        const { getWebhookConfigs } = await __turbopack_context__.A("[project]/src/lib/webhook-config-store.ts [app-route] (ecmascript, async loader)");
        const allConfigs = await getWebhookConfigs({
            endpointId: endpointId || undefined,
            enabled: true
        });
        return allConfigs.filter((config)=>{
            if (!config.enabled) return false;
            if (!config.events.includes(eventType)) return false;
            if (endpointId && config.endpointId && config.endpointId !== endpointId) return false;
            return true;
        });
    } catch (error) {
        logger.error('Failed to get webhook configs', {
            eventType,
            endpointId,
            error
        });
        return [];
    }
}
async function triggerWebhook(eventType, data, endpointId) {
    try {
        const event = createWebhookEvent(eventType, data);
        const configs = await getWebhookConfigsForEvent(eventType, endpointId);
        // Filter enabled configs
        const enabledConfigs = configs.filter((c)=>c.enabled);
        // Filter by endpoint if specified
        const relevantConfigs = endpointId ? enabledConfigs.filter((c)=>!c.endpointId || c.endpointId === endpointId) : enabledConfigs.filter((c)=>!c.endpointId);
        // Queue delivery for each config
        for (const config of relevantConfigs){
            await queueWebhookDelivery(config, event);
        }
        logger.info('Webhooks triggered', {
            eventType,
            endpointId,
            configCount: relevantConfigs.length
        });
    } catch (error) {
        logger.error('Failed to trigger webhook', {
            eventType,
            endpointId,
            error
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/concurrent-request-limiter.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// Concurrent Request Limiter
// =============================================================================
// Prevents resource exhaustion by limiting concurrent requests per user/IP/endpoint
// Uses in-memory semaphore pattern (can upgrade to Redis for multi-instance)
__turbopack_context__.s([
    "acquireConcurrentSlot",
    ()=>acquireConcurrentSlot,
    "checkConcurrentLimit",
    ()=>checkConcurrentLimit,
    "createEndpointIdentifier",
    ()=>createEndpointIdentifier,
    "createGlobalIdentifier",
    ()=>createGlobalIdentifier,
    "createUserIdentifier",
    ()=>createUserIdentifier,
    "getConcurrentLimits",
    ()=>getConcurrentLimits
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'ConcurrentRequestLimiter'
});
// In-memory store: { identifier: RequestTracker }
const requestTrackers = new Map();
// Cleanup old trackers every 5 minutes
setInterval(()=>{
    const now = Date.now();
    const maxAge = 5 * 60 * 1000; // 5 minutes
    const keysToDelete = [];
    requestTrackers.forEach((tracker, key)=>{
        // Delete if no active requests and last reset was more than maxAge ago
        if (tracker.activeRequests.size === 0 && now - tracker.lastReset > maxAge) {
            keysToDelete.push(key);
        }
    });
    keysToDelete.forEach((key)=>requestTrackers.delete(key));
}, 5 * 60 * 1000);
function checkConcurrentLimit(config) {
    const windowMs = config.windowMs || 60 * 1000; // Default 1 minute
    const now = Date.now();
    const identifier = config.identifier;
    let tracker = requestTrackers.get(identifier);
    // Initialize tracker if it doesn't exist
    if (!tracker) {
        tracker = {
            count: 0,
            lastReset: now,
            activeRequests: new Set()
        };
        requestTrackers.set(identifier, tracker);
    }
    // Reset count if window expired
    if (now - tracker.lastReset > windowMs) {
        tracker.count = 0;
        tracker.lastReset = now;
        tracker.activeRequests.clear();
    }
    // Check if we're at the limit
    const currentActive = tracker.activeRequests.size;
    const allowed = currentActive < config.maxConcurrent;
    return {
        allowed,
        current: currentActive,
        limit: config.maxConcurrent,
        identifier
    };
}
function acquireConcurrentSlot(config, requestId) {
    const check = checkConcurrentLimit(config);
    if (!check.allowed) {
        logger.warn('Concurrent request limit exceeded', {
            identifier: config.identifier,
            current: check.current,
            limit: check.limit,
            requestId
        });
        return {
            success: false,
            release: ()=>{},
            current: check.current,
            limit: check.limit
        };
    }
    // Acquire slot
    const tracker = requestTrackers.get(config.identifier);
    tracker.activeRequests.add(requestId);
    tracker.count++;
    logger.debug('Concurrent request slot acquired', {
        identifier: config.identifier,
        current: tracker.activeRequests.size,
        limit: config.maxConcurrent,
        requestId
    });
    // Return release function
    return {
        success: true,
        release: ()=>{
            const currentTracker = requestTrackers.get(config.identifier);
            if (currentTracker) {
                currentTracker.activeRequests.delete(requestId);
            // Don't decrement count - let it reset with the window
            }
        },
        current: tracker.activeRequests.size,
        limit: config.maxConcurrent
    };
}
function getConcurrentLimits() {
    return {
        global: parseInt(process.env.MAX_CONCURRENT_REQUESTS_GLOBAL || '50', 10),
        endpoint: parseInt(process.env.MAX_CONCURRENT_REQUESTS_ENDPOINT || '20', 10),
        user: parseInt(process.env.MAX_CONCURRENT_REQUESTS_USER || '30', 10)
    };
}
function createGlobalIdentifier(ip) {
    return `global:ip:${ip}`;
}
function createEndpointIdentifier(endpointId, ip) {
    return `endpoint:${endpointId}:ip:${ip}`;
}
function createUserIdentifier(apiKeyHash) {
    return `user:${apiKeyHash}`;
}
}),
"[project]/src/app/api/v1/metered/[endpointId]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/metered-endpoints.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$upstream$2d$proxy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/upstream-proxy.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$upstream$2d$proxy$2d$enhanced$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/upstream-proxy-enhanced.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/request-id.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$unified$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rate-limit-unified.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$nextjs$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/nextjs-adapter.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$resource$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/resource-server.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$input$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/input-validator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$orchestrator$2f$meta$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/integrations/x402/orchestrator/meta-facilitator.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/integrations/x402/sessions/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$session$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/sessions/session-middleware.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/caip-utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$chain$2d$detection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/chain-detection.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$test$2d$verification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/test-verification.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$x402$2d$call$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/x402-call-log.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/amount-utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metrics$2d$collector$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/metrics-collector.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$webhook$2d$delivery$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/webhook-delivery.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$concurrent$2d$request$2d$limiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/concurrent-request-limiter.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$orchestrator$2f$meta$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$x402$2d$call$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metrics$2d$collector$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$webhook$2d$delivery$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$orchestrator$2f$meta$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$x402$2d$call$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metrics$2d$collector$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$webhook$2d$delivery$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// Maximum request body size (10MB default, configurable via env)
const MAX_REQUEST_BODY_SIZE = parseInt(process.env.MAX_REQUEST_BODY_SIZE || '10485760', 10); // 10MB in bytes
async function POST(request, { params }) {
    const requestId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOrCreateRequestId"])(request);
    const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRequestLogger"])(requestId);
    const { endpointId } = await params; // Next.js 15+ requires awaiting params
    const startTime = Date.now();
    // Extract tracing fields early for error logging
    const conversationId = request.headers.get('x-conversation-id') || request.headers.get('x-request-id') || requestId;
    const agentId = request.headers.get('x-agent-id') || undefined;
    // Extract IP and API key for concurrent limiting
    const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const authHeader = request.headers.get('authorization');
    const apiKeyToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7).trim() : authHeader?.trim() || null;
    const apiKeyHash = apiKeyToken ? apiKeyToken.substring(0, 16) : null;
    // SECURITY: Check request body size before processing
    const contentLength = request.headers.get('content-length');
    if (contentLength) {
        const bodySize = parseInt(contentLength, 10);
        if (bodySize > MAX_REQUEST_BODY_SIZE) {
            logger.warn('Request body too large', {
                bodySize,
                maxSize: MAX_REQUEST_BODY_SIZE,
                endpointId,
                ip
            });
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
    // SECURITY: Check concurrent request limits
    const concurrentLimits = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$concurrent$2d$request$2d$limiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getConcurrentLimits"])();
    let concurrentSlot = null;
    // Check global IP limit first
    const globalSlot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$concurrent$2d$request$2d$limiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["acquireConcurrentSlot"])({
        maxConcurrent: concurrentLimits.global,
        identifier: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$concurrent$2d$request$2d$limiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createGlobalIdentifier"])(ip)
    }, requestId);
    if (!globalSlot.success) {
        logger.warn('Global concurrent request limit exceeded', {
            ip,
            current: globalSlot.current,
            limit: globalSlot.limit,
            endpointId
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Too many concurrent requests',
            code: 'CONCURRENT_LIMIT_EXCEEDED',
            message: `Maximum ${globalSlot.limit} concurrent requests allowed per IP`,
            retryAfter: 60
        }, {
            status: 429
        });
    }
    // Check endpoint-specific limit
    const endpointSlot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$concurrent$2d$request$2d$limiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["acquireConcurrentSlot"])({
        maxConcurrent: concurrentLimits.endpoint,
        identifier: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$concurrent$2d$request$2d$limiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createEndpointIdentifier"])(endpointId, ip)
    }, requestId);
    if (!endpointSlot.success) {
        globalSlot.release(); // Release global slot
        logger.warn('Endpoint concurrent request limit exceeded', {
            endpointId,
            ip,
            current: endpointSlot.current,
            limit: endpointSlot.limit
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Too many concurrent requests for this endpoint',
            code: 'ENDPOINT_CONCURRENT_LIMIT_EXCEEDED',
            message: `Maximum ${endpointSlot.limit} concurrent requests allowed per endpoint per IP`,
            retryAfter: 60
        }, {
            status: 429
        });
    }
    // Check user-specific limit (if API key provided)
    if (apiKeyHash) {
        const userSlot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$concurrent$2d$request$2d$limiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["acquireConcurrentSlot"])({
            maxConcurrent: concurrentLimits.user,
            identifier: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$concurrent$2d$request$2d$limiter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createUserIdentifier"])(apiKeyHash)
        }, requestId);
        if (!userSlot.success) {
            globalSlot.release(); // Release global slot
            endpointSlot.release(); // Release endpoint slot
            logger.warn('User concurrent request limit exceeded', {
                apiKeyHash,
                current: userSlot.current,
                limit: userSlot.limit
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Too many concurrent requests for this API key',
                code: 'USER_CONCURRENT_LIMIT_EXCEEDED',
                message: `Maximum ${userSlot.limit} concurrent requests allowed per API key`,
                retryAfter: 60
            }, {
                status: 429
            });
        }
        concurrentSlot = userSlot;
    } else {
        concurrentSlot = endpointSlot;
    }
    // Release function that releases all acquired slots
    const releaseAllSlots = ()=>{
        globalSlot.release();
        endpointSlot.release();
        if (concurrentSlot && concurrentSlot !== endpointSlot) {
            concurrentSlot.release();
        }
    };
    try {
        // SECURITY: Validate endpoint ID
        const endpointIdValidation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$input$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateEndpointId"])(endpointId);
        if (!endpointIdValidation.valid) {
            logger.warn('Invalid endpoint ID', {
                endpointId,
                errors: endpointIdValidation.errors
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid endpoint ID',
                code: 'INVALID_ENDPOINT_ID',
                details: endpointIdValidation.errors
            }, {
                status: 400
            });
        }
        // Get endpoint from database
        const endpoint = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpoint"])(endpointId);
        if (!endpoint) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Endpoint not found',
                code: 'NOT_FOUND'
            }, {
                status: 404
            });
        }
        if (endpoint.status !== 'active') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Endpoint is not active',
                code: 'ENDPOINT_INACTIVE',
                status: endpoint.status
            }, {
                status: 403
            });
        }
        // PHASE 1.2: Check for session token first (wallet-based sessions)
        const sessionCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$session$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkSessionToken"])(request);
        let paymentVerified = false;
        let sessionUsed = false;
        let transactionHash;
        let paymentId; // Declare at function scope for usage logging
        let verifyResult; // Declare at function scope for metrics
        if (sessionCheck.hasSession && sessionCheck.valid && sessionCheck.sessionId) {
            // Session exists and is valid - use session balance
            const useResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$session$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["useSessionForPayment"])(sessionCheck.sessionId, endpoint.price);
            if (useResult.success && useResult.remainingAmount) {
                paymentVerified = true;
                sessionUsed = true;
                logger.info('Payment via session', {
                    sessionId: sessionCheck.sessionId,
                    walletAddress: sessionCheck.walletAddress,
                    amount: endpoint.price,
                    remainingAmount: useResult.remainingAmount
                });
            } else {
                // Session doesn't have enough balance
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Insufficient session balance',
                    code: 'INSUFFICIENT_SESSION_BALANCE',
                    remainingAmount: useResult.remainingAmount,
                    details: useResult.error
                }, {
                    status: 402
                });
            }
        }
        // Check for test token ONLY if in test mode
        // In CDP mode, test tokens should be ignored and real payment required
        const verifyMode = process.env.X402_VERIFY_MODE?.toLowerCase();
        const testToken = request.headers.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$test$2d$verification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TEST_TOKEN_HEADER"]) || request.headers.get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$test$2d$verification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TEST_TOKEN_HEADER"].toUpperCase());
        const testModeEnabled = verifyMode === 'test';
        // Only use test verification if explicitly in test mode
        // In CDP mode, ignore test tokens and require real payment
        if (!paymentVerified && testModeEnabled && testToken === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$test$2d$verification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TEST_TOKEN_VALUE"]) {
            // Test mode: bypass payment verification
            const testResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$test$2d$verification$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyPaymentTestOnly"])(request);
            if (testResult.success) {
                paymentVerified = true;
                transactionHash = testResult.x402TxHash;
                logger.info('Payment bypassed via test token (test mode)', {
                    testToken: testToken,
                    facilitator: testResult.facilitator
                });
                // Log test mode success
                const testLatencyMs = Date.now() - startTime;
                try {
                    const networkCAIP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(endpoint.network);
                    const chainId = networkCAIP.split(':')[1] || '8453';
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$x402$2d$call$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logX402Call"])({
                        customerId: conversationId || null,
                        endpointId: endpoint.id,
                        agentId,
                        facilitator: testResult.facilitator || 'TEST_FACILITATOR',
                        chainId,
                        asset: endpoint.tokenAddress || 'USDC',
                        amount: endpoint.price,
                        status: 'success',
                        x402TxHash: testResult.x402TxHash,
                        latencyMs: testLatencyMs,
                        resource: `${request.headers.get('host') || 'localhost:3001'}${request.nextUrl.pathname}`
                    });
                } catch (logError) {
                    logger.error('Failed to log test mode success', {
                        error: logError
                    });
                }
                // Create payment entry for test mode (for E2E testing)
                if (testResult.x402TxHash) {
                    logger.info('Creating test mode payment entry', {
                        txHash: testResult.x402TxHash,
                        endpointId: endpoint.id,
                        testModeEnabled,
                        testToken: testToken || 'missing'
                    });
                    try {
                        // Extract from address from test token or use a default
                        const testFromAddress = request.headers.get('x-test-from-address') || '0x0000000000000000000000000000000000000000';
                        logger.info('Calling createPayment', {
                            endpointId: endpoint.id,
                            txHash: testResult.x402TxHash,
                            fromAddress: testFromAddress,
                            toAddress: endpoint.recipientAddress,
                            amount: endpoint.price,
                            tokenAddress: endpoint.tokenAddress,
                            network: endpoint.network
                        });
                        const payment = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPayment"])({
                            endpointId: endpoint.id,
                            txHash: testResult.x402TxHash,
                            fromAddress: testFromAddress,
                            toAddress: endpoint.recipientAddress,
                            amount: endpoint.price,
                            tokenAddress: endpoint.tokenAddress,
                            network: endpoint.network,
                            kytStatus: 'passed',
                            ofacStatus: 'passed',
                            facilitator: (testResult.facilitator || 'TEST_FACILITATOR').toLowerCase()
                        });
                        paymentId = payment.id;
                        // Also log to console for visibility in test output
                        console.log('[TEST MODE] Payment created:', {
                            paymentId: payment.id,
                            endpointId: endpoint.id,
                            txHash: testResult.x402TxHash
                        });
                        // Create mock verifyResult for metrics (test mode)
                        verifyResult = {
                            valid: true,
                            success: true,
                            transactionHash: testResult.x402TxHash,
                            facilitatorId: (testResult.facilitator || 'TEST_FACILITATOR').toLowerCase(),
                            verifiedAt: new Date().toISOString(),
                            kytStatus: 'passed',
                            ofacStatus: 'passed',
                            facilitatorUsed: testResult.facilitator || 'TEST_FACILITATOR',
                            routingReason: 'Test mode - bypass verification',
                            alternativesConsidered: 0
                        };
                        logger.info('Test mode payment entry created successfully', {
                            paymentId: payment.id,
                            txHash: testResult.x402TxHash,
                            endpointId: endpoint.id
                        });
                    } catch (error) {
                        const errorMsg = error instanceof Error ? error.message : String(error);
                        const errorStack = error instanceof Error ? error.stack : undefined;
                        logger.error('Failed to create test mode payment entry', {
                            error: errorMsg,
                            stack: errorStack,
                            endpointId: endpoint.id,
                            txHash: testResult.x402TxHash
                        });
                        // Also log to console for visibility in server output
                        console.error('[TEST MODE] Payment creation ERROR:', errorMsg);
                        if (errorStack) {
                            console.error('[TEST MODE] Stack:', errorStack);
                        }
                    // Continue even if payment recording fails
                    }
                } else {
                    logger.warn('Test mode payment not created - no x402TxHash', {
                        testResult,
                        endpointId: endpoint.id
                    });
                }
            }
        }
        // If no valid session and no test token, check for payment header
        const paymentHeaderRaw = request.headers.get('x-payment') || request.headers.get('X-Payment');
        if (!paymentVerified && !paymentHeaderRaw) {
            // No session, no test token, and no payment - return 402
            // Log the 402 response
            const latencyMs = Date.now() - startTime;
            try {
                const networkCAIP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(endpoint.network);
                const chainId = networkCAIP.split(':')[1] || '8453';
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$x402$2d$call$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logX402Call"])({
                    customerId: conversationId || null,
                    endpointId: endpoint.id,
                    agentId,
                    facilitator: 'NONE',
                    chainId,
                    asset: endpoint.tokenAddress || 'USDC',
                    amount: endpoint.price,
                    status: 'failed',
                    errorCode: 'PAYMENT_REQUIRED',
                    latencyMs,
                    resource: `${request.headers.get('host') || 'localhost:3001'}${request.nextUrl.pathname}`
                });
            } catch (logError) {
                logger.error('Failed to log 402 response', {
                    error: logError
                });
            }
            // Initialize resource server (registers Bazaar extension)
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$resource$2d$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getX402ResourceServer"])();
            // Return 402 Payment Required with x402 v2 Bazaar-compliant response
            // This includes discovery metadata for Bazaar cataloging
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$nextjs$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["create402Response"])(request, endpoint);
        }
        // If we have a payment header but no session, verify payment and optionally create session
        if (!paymentVerified && paymentHeaderRaw) {
            // SECURITY: Validate payment header
            const paymentHeaderValidation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$input$2d$validator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validatePaymentHeader"])(paymentHeaderRaw);
            if (!paymentHeaderValidation.valid) {
                logger.warn('Invalid payment header', {
                    errors: paymentHeaderValidation.errors
                });
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Invalid payment header',
                    code: 'INVALID_PAYMENT_HEADER',
                    details: paymentHeaderValidation.errors
                }, {
                    status: 400
                });
            }
            const paymentHeader = paymentHeaderValidation.sanitized || paymentHeaderRaw;
            // Parse payment header (don't verify yet - meta-facilitator will handle verification)
            const { parseX402Header } = await __turbopack_context__.A("[project]/src/integrations/x402/payment-header-parser.ts [app-route] (ecmascript, async loader)");
            const parseResult = parseX402Header(paymentHeader);
            if (!parseResult.valid || !parseResult.parsed) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Invalid payment header',
                    code: 'INVALID_PAYMENT_HEADER',
                    details: parseResult.error
                }, {
                    status: 400
                });
            }
            const parsed = parseResult.parsed;
            // Use meta-facilitator for orchestration (supports multi-facilitator routing)
            const metaFacilitator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$orchestrator$2f$meta$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getMetaFacilitator"])();
            // Build payment requirements with CAIP support
            const baseUrl = ("TURBOPACK compile-time value", "https://www.nexflowapp.app") || (request.headers.get('x-forwarded-proto') === 'https' ? 'https' : 'http') + '://' + (request.headers.get('host') || 'localhost:3001');
            const resourceUrl = `${baseUrl}/api/v1/metered/${endpoint.id}`;
            // Convert legacy network/asset to CAIP if needed
            const networkCAIP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["networkToCAIP"])(endpoint.network) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$chain$2d$detection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeToCAIP"])(endpoint.network);
            const assetCAIP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$caip$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tokenToCAIP"])(endpoint.network, endpoint.tokenAddress);
            // Extract routing preferences from headers (if provided by agent/SDK)
            // Support both legacy and CAIP formats
            const preferredNetworksRaw = request.headers.get('x-preferred-networks')?.split(',').map((n)=>n.trim()) || [];
            const preferredNetworksCAIP = preferredNetworksRaw.map((n)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$chain$2d$detection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeToCAIP"])(n)).filter((n)=>n !== null);
            const preferredNetworks = preferredNetworksRaw.filter((n)=>!n.includes(':')); // Legacy format
            const preferredAssetsRaw = request.headers.get('x-preferred-assets')?.split(',').map((a)=>a.trim()) || [];
            const preferredAssetsCAIP = preferredAssetsRaw.filter((a)=>a.includes('/')); // CAIP-19 format
            const preferredAssets = preferredAssetsRaw.filter((a)=>!a.includes('/')); // Legacy format
            const avoidNetworksRaw = request.headers.get('x-avoid-networks')?.split(',').map((n)=>n.trim()) || [];
            const avoidNetworksCAIP = avoidNetworksRaw.map((n)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$chain$2d$detection$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeToCAIP"])(n)).filter((n)=>n !== null);
            const avoidNetworks = avoidNetworksRaw.filter((n)=>!n.includes(':')); // Legacy format
            const routingPriority = request.headers.get('x-routing-priority');
            // Build payment requirements with both legacy and CAIP support
            const paymentRequirements = {
                scheme: 'exact',
                network: endpoint.network,
                networks: networkCAIP ? [
                    networkCAIP
                ] : undefined,
                maxAmountRequired: endpoint.price,
                resource: resourceUrl,
                description: endpoint.description || endpoint.name,
                mimeType: 'application/json',
                payTo: endpoint.recipientAddress,
                maxTimeoutSeconds: 300,
                asset: endpoint.tokenAddress,
                assets: assetCAIP ? [
                    assetCAIP
                ] : undefined
            };
            // Verify payment using meta-facilitator (handles routing, failover, business logic)
            logger.debug('Calling meta-facilitator.verifyPayment', {
                hasPaymentHeader: !!paymentHeader,
                paymentRequirements: {
                    scheme: paymentRequirements.scheme,
                    network: paymentRequirements.network,
                    payTo: paymentRequirements.payTo,
                    maxAmountRequired: paymentRequirements.maxAmountRequired,
                    resource: paymentRequirements.resource
                }
            });
            try {
                verifyResult = await metaFacilitator.verifyPayment(paymentHeader, paymentRequirements, {
                    preferredNetworks: preferredNetworks.length > 0 ? preferredNetworks : undefined,
                    preferredNetworksCAIP: preferredNetworksCAIP.length > 0 ? preferredNetworksCAIP : undefined,
                    preferredAssets: preferredAssets.length > 0 ? preferredAssets : undefined,
                    preferredAssetsCAIP: preferredAssetsCAIP.length > 0 ? preferredAssetsCAIP : undefined,
                    avoidNetworks: avoidNetworks.length > 0 ? avoidNetworks : undefined,
                    avoidNetworksCAIP: avoidNetworksCAIP.length > 0 ? avoidNetworksCAIP : undefined,
                    priority: routingPriority,
                    requireCompliance: true
                }, {
                    requireHealthCheck: true,
                    preferCheapest: routingPriority === 'cost',
                    requireKYC: false
                }, {
                    requestId,
                    correlationId: conversationId,
                    clientId: apiKeyHash,
                    agentId
                });
            } catch (verifyError) {
                logger.error('Meta-facilitator verification threw error', {
                    error: verifyError,
                    stack: verifyError instanceof Error ? verifyError.stack : undefined
                });
                throw verifyError;
            }
            if (!verifyResult.valid || !verifyResult.success) {
                // Log detailed error for debugging
                const facilitator = verifyResult.facilitatorUsed || 'CDP';
                logger.error('Payment verification failed', {
                    error: verifyResult.error,
                    errorDetails: verifyResult.errorDetails,
                    kytStatus: verifyResult.kytStatus,
                    ofacStatus: verifyResult.ofacStatus,
                    facilitatorUsed: facilitator,
                    routingReason: verifyResult.routingReason
                });
                // Log x402 call with correct facilitator (even on failure)
                const latencyMs = Date.now() - startTime;
                try {
                    const networkCAIP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(endpoint.network);
                    const chainId = networkCAIP.split(':')[1] || '8453';
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$x402$2d$call$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logX402Call"])({
                        customerId: conversationId || null,
                        endpointId: endpoint.id,
                        agentId,
                        facilitator,
                        chainId,
                        asset: endpoint.tokenAddress || 'USDC',
                        amount: endpoint.price,
                        status: 'failed',
                        errorCode: verifyResult.error || 'VERIFICATION_FAILED',
                        latencyMs,
                        resource: `${request.headers.get('host') || 'localhost:3001'}${request.nextUrl.pathname}`
                    });
                } catch (logError) {
                    logger.error('Failed to log CDP verification failure', {
                        error: logError
                    });
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Payment verification failed',
                    code: verifyResult.error || 'VERIFICATION_FAILED',
                    details: verifyResult.error,
                    errorDetails: verifyResult.errorDetails,
                    kytStatus: verifyResult.kytStatus,
                    ofacStatus: verifyResult.ofacStatus
                }, {
                    status: 400
                });
            }
            // Check KYT/OFAC status
            if (verifyResult.kytStatus === 'blocked' || verifyResult.ofacStatus === 'blocked') {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Payment blocked by compliance check',
                    code: 'COMPLIANCE_BLOCKED',
                    kytStatus: verifyResult.kytStatus,
                    ofacStatus: verifyResult.ofacStatus
                }, {
                    status: 403
                });
            }
            // Verify payment amount matches endpoint price (optional - can be flexible)
            const paidAmount = BigInt(parsed.authorization.value);
            const requiredAmount = BigInt(endpoint.price);
            if (paidAmount < requiredAmount) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Insufficient payment',
                    code: 'INSUFFICIENT_PAYMENT',
                    required: endpoint.price,
                    paid: parsed.authorization.value
                }, {
                    status: 400
                });
            }
            // PHASE 1.2: Optionally create session from payment for future reuse
            // Check if client wants session (via header)
            const createSession = request.headers.get('x-create-session') === 'true';
            if (createSession) {
                const sessionResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$sessions$2f$session$2d$middleware$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSessionFromPayment"])(paymentHeader, endpoint.id, agentId);
                if (sessionResult.success && sessionResult.token) {
                    // Include session token in response headers
                    logger.info('Session created from payment', {
                        sessionId: sessionResult.sessionId,
                        walletAddress: parsed.authorization.from
                    });
                }
            }
            paymentVerified = true;
            transactionHash = verifyResult.transactionHash;
            // Log successful CDP verification
            const facilitator = verifyResult.facilitatorUsed || 'CDP';
            logger.info('Payment verified via meta-facilitator', {
                facilitator,
                transactionHash: verifyResult.transactionHash,
                kytStatus: verifyResult.kytStatus,
                ofacStatus: verifyResult.ofacStatus
            });
            // Log x402 call with correct facilitator
            const latencyMs = Date.now() - startTime;
            try {
                const networkCAIP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(endpoint.network);
                const chainId = networkCAIP.split(':')[1] || '8453';
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$x402$2d$call$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logX402Call"])({
                    customerId: conversationId || null,
                    endpointId: endpoint.id,
                    agentId,
                    facilitator,
                    chainId,
                    asset: endpoint.tokenAddress || 'USDC',
                    amount: endpoint.price,
                    status: 'success',
                    x402TxHash: verifyResult.transactionHash || undefined,
                    latencyMs,
                    resource: `${request.headers.get('host') || 'localhost:3001'}${request.nextUrl.pathname}`
                });
            } catch (logError) {
                logger.error('Failed to log CDP verification success', {
                    error: logError
                });
            }
            // Record payment in database
            if (verifyResult.transactionHash) {
                try {
                    const payment = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPayment"])({
                        endpointId: endpoint.id,
                        txHash: verifyResult.transactionHash,
                        fromAddress: parsed.authorization.from,
                        toAddress: parsed.authorization.to,
                        amount: parsed.authorization.value,
                        tokenAddress: endpoint.tokenAddress,
                        network: endpoint.network,
                        kytStatus: verifyResult.kytStatus,
                        ofacStatus: verifyResult.ofacStatus,
                        facilitator: facilitator.toLowerCase()
                    });
                    paymentId = payment.id;
                    // Trigger webhook for payment verified
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$webhook$2d$delivery$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["triggerWebhook"])('payment.verified', {
                        paymentId: payment.id,
                        endpointId: endpoint.id,
                        txHash: verifyResult.transactionHash,
                        amount: parsed.authorization.value,
                        tokenAddress: endpoint.tokenAddress,
                        network: endpoint.network,
                        facilitator: facilitator.toLowerCase(),
                        fromAddress: parsed.authorization.from,
                        toAddress: parsed.authorization.to
                    }, endpoint.id);
                } catch (error) {
                    logger.error('Failed to record payment', {
                        error
                    });
                // Continue even if payment recording fails
                }
            }
        }
        // At this point, payment should be verified (either via session or payment header)
        if (!paymentVerified) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Payment required',
                code: 'PAYMENT_REQUIRED'
            }, {
                status: 402
            });
        }
        // Get request body for proxying
        // SECURITY: Check body size again after reading (Content-Length header might be missing or incorrect)
        let requestBody = null;
        try {
            const bodyText = await request.text();
            const bodySize = new TextEncoder().encode(bodyText).length;
            if (bodySize > MAX_REQUEST_BODY_SIZE) {
                logger.warn('Request body too large (after reading)', {
                    bodySize,
                    maxSize: MAX_REQUEST_BODY_SIZE,
                    endpointId,
                    ip
                });
                releaseAllSlots();
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
            // If body reading fails, continue with null (GET requests don't have bodies)
            requestBody = null;
        }
        // Proxy request to upstream with retry logic and circuit breaker
        // Use enhanced proxy for production reliability
        const useEnhancedProxy = process.env.USE_ENHANCED_PROXY !== 'false'; // Default to true
        const proxyResult = useEnhancedProxy ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$upstream$2d$proxy$2d$enhanced$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["proxyRequestWithRetry"])({
            upstreamUrl: endpoint.upstreamUrl,
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
        }) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$upstream$2d$proxy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["proxyRequest"])({
            upstreamUrl: endpoint.upstreamUrl,
            method: request.method,
            headers: request.headers,
            body: requestBody,
            timeout: 30000
        });
        // Extract x402 tx hash (from payment or session)
        const x402TxHash = transactionHash || undefined;
        const failureCode = proxyResult.statusCode >= 400 ? `HTTP_${proxyResult.statusCode}` : undefined;
        // Log usage with tracing
        try {
            const usageLog = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createUsageLog"])({
                endpointId: endpoint.id,
                paymentId,
                method: request.method,
                path: new URL(request.url).pathname,
                statusCode: proxyResult.statusCode,
                responseTime: proxyResult.responseTime,
                units: 1,
                ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
                userAgent: request.headers.get('user-agent') || undefined,
                // Observability fields
                conversationId,
                agentId,
                x402TxHash,
                failureCode
            });
            // Trigger webhook for usage recorded
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$webhook$2d$delivery$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["triggerWebhook"])('usage.recorded', {
                usageLogId: usageLog.id,
                endpointId: endpoint.id,
                paymentId,
                method: request.method,
                statusCode: proxyResult.statusCode,
                responseTime: proxyResult.responseTime,
                units: 1
            }, endpoint.id);
        } catch (error) {
            logger.error('Failed to log usage', {
                error
            });
        // Continue even if logging fails
        }
        // Return upstream response with x402 verification info in headers
        const responseHeaders = {
            ...proxyResult.headers,
            'X-x402-Verified': 'true',
            'X-x402-Payment-Method': sessionUsed ? 'session' : 'payment'
        };
        // Add payment-specific headers if payment was used (not session)
        if (!sessionUsed && transactionHash) {
            responseHeaders['X-x402-TxHash'] = transactionHash;
        // Note: verifyResult and parsed are only available in payment flow
        // For session flow, we don't have these details
        }
        const response = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](proxyResult.body, {
            status: proxyResult.statusCode,
            headers: responseHeaders
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addRequestIdToResponse"])(response, requestId);
        // Add rate limit headers
        const rateLimitHeaders = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$unified$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRateLimitHeaders"])(request, endpointId);
        if (rateLimitHeaders) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$unified$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addRateLimitHeaders"])(response, rateLimitHeaders);
        }
        const totalDuration = Date.now() - startTime;
        logger.info('Request completed successfully', {
            responseTime: totalDuration,
            statusCode: proxyResult.statusCode
        });
        // Record metrics (fire and forget - don't block response)
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metrics$2d$collector$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordRequestMetric"])(`/api/v1/metered/${endpointId}`, request.method, proxyResult.statusCode, totalDuration, {
            endpointId,
            paymentMethod: sessionUsed ? 'session' : 'payment'
        }).catch((err)=>logger.error('Failed to record request metric', {
                error: err
            }));
        if (paymentVerified && transactionHash && verifyResult) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metrics$2d$collector$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordPaymentMetric"])(endpointId, verifyResult.facilitatorUsed || 'UNKNOWN', endpoint.price, true, totalDuration).catch((err)=>logger.error('Failed to record payment metric', {
                    error: err
                }));
        }
        return response;
    } catch (error) {
        // Determine facilitator and error code based on verify mode
        // If we're in CDP mode, the error likely occurred during CDP verification
        const verifyMode = process.env.X402_VERIFY_MODE?.toLowerCase();
        const facilitator = verifyMode === 'cdp' ? 'CDP' : 'UNKNOWN';
        // Use CDP-specific error code when in CDP mode
        // This distinguishes CDP internal errors from other system errors
        const failureCode = verifyMode === 'cdp' ? 'CDP_INTERNAL_ERROR' : 'INTERNAL_ERROR';
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        // Try to extract CDP-specific error details if available
        let cdpErrorCode = failureCode;
        if (verifyMode === 'cdp' && error instanceof Error) {
            // Check if error message contains CDP-specific error indicators
            const errorMsg = error.message.toLowerCase();
            if (errorMsg.includes('invalidreason') || errorMsg.includes('invalid_reason')) {
                // Try to extract the actual CDP error code from the error
                cdpErrorCode = error.message.includes('CDP_') ? error.message : 'CDP_VERIFICATION_ERROR';
            } else if (errorMsg.includes('network') || errorMsg.includes('fetch')) {
                cdpErrorCode = 'CDP_NETWORK_ERROR';
            } else if (errorMsg.includes('timeout')) {
                cdpErrorCode = 'CDP_REQUEST_TIMEOUT';
            }
        }
        // Try to log the failure
        try {
            const endpoint = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpoint"])(endpointId).catch(()=>null);
            if (endpoint) {
                // Log to usage_logs
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createUsageLog"])({
                    endpointId: endpoint.id,
                    method: request.method,
                    path: new URL(request.url).pathname,
                    statusCode: 500,
                    responseTime: Date.now() - startTime,
                    units: 0,
                    conversationId,
                    agentId,
                    failureCode: cdpErrorCode
                });
                // Log to x402_call_logs with correct facilitator and CDP-specific error code
                const latencyMs = Date.now() - startTime;
                const networkCAIP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$amount$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeNetwork"])(endpoint.network);
                const chainId = networkCAIP.split(':')[1] || '8453';
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$x402$2d$call$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logX402Call"])({
                    customerId: conversationId || null,
                    endpointId: endpoint.id,
                    agentId,
                    facilitator,
                    chainId,
                    asset: endpoint.tokenAddress || 'USDC',
                    amount: endpoint.price,
                    status: 'failed',
                    errorCode: cdpErrorCode,
                    latencyMs,
                    resource: `${request.headers.get('host') || 'localhost:3001'}${request.nextUrl.pathname}`
                });
            }
        } catch (logError) {
            // Ignore logging errors
            logger.error('Failed to log error', {
                logError
            });
        }
        const errorDuration = Date.now() - startTime;
        const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
        const userAgent = request.headers.get('user-agent') || undefined;
        // Enhanced error logging with full context
        logger.error('Metered endpoint error', {
            error,
            responseTime: errorDuration,
            failureCode,
            stack: error instanceof Error ? error.stack : undefined,
            endpointId,
            method: request.method,
            path: new URL(request.url).pathname,
            ip,
            userAgent,
            conversationId,
            agentId,
            facilitator,
            component: 'metered-endpoint'
        });
        // Record error metric (fire and forget)
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metrics$2d$collector$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordErrorMetric"])(failureCode, endpointId, {
            endpointId,
            method: request.method
        }).catch((err)=>logger.error('Failed to record error metric', {
                error: err
            }));
        // Record failed request metric (fire and forget)
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$metrics$2d$collector$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["recordRequestMetric"])(`/api/v1/metered/${endpointId}`, request.method, 500, errorDuration, {
            endpointId,
            error: failureCode
        });
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error',
            code: failureCode,
            details: errorMessage,
            requestId
        }, {
            status: 500
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addRequestIdToResponse"])(response, requestId);
        // Release concurrent request slots
        releaseAllSlots();
        return response;
    } finally{
        // Ensure slots are released even if something goes wrong
        try {
            releaseAllSlots();
        } catch (releaseError) {
            // Ignore release errors
            logger.error('Failed to release concurrent slots', {
                error: releaseError
            });
        }
    }
}
async function GET(request, { params }) {
    const { endpointId } = await params; // Next.js 15+ requires awaiting params
    // Get endpoint from database
    const endpoint = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpoint"])(endpointId);
    if (!endpoint) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Endpoint not found',
            code: 'NOT_FOUND'
        }, {
            status: 404
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        endpointId: endpoint.id,
        name: endpoint.name,
        description: endpoint.description,
        paymentRequired: true,
        scheme: 'x402',
        network: endpoint.network,
        chainId: endpoint.chainId,
        token: endpoint.tokenSymbol,
        tokenAddress: endpoint.tokenAddress,
        recipientAddress: endpoint.recipientAddress,
        price: endpoint.price,
        status: endpoint.status
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__84a15516._.js.map