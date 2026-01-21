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
"[project]/src/lib/circuit-breaker.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// CIRCUIT BREAKER
// =============================================================================
// Protects against cascading failures from external services.
// Implements the circuit breaker pattern with three states:
// - CLOSED: Normal operation, requests pass through
// - OPEN: Failure threshold exceeded, requests fail fast
// - HALF_OPEN: Testing if service recovered
__turbopack_context__.s([
    "CircuitBreaker",
    ()=>CircuitBreaker,
    "CircuitBreakerError",
    ()=>CircuitBreakerError,
    "facilitatorProbeCircuitBreaker",
    ()=>facilitatorProbeCircuitBreaker,
    "getAllCircuitBreakerStats",
    ()=>getAllCircuitBreakerStats,
    "getCircuitBreaker",
    ()=>getCircuitBreaker,
    "resetAllCircuitBreakers",
    ()=>resetAllCircuitBreakers,
    "scatteringCircuitBreaker",
    ()=>scatteringCircuitBreaker,
    "x402scanCircuitBreaker",
    ()=>x402scanCircuitBreaker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'CircuitBreaker'
});
class CircuitBreaker {
    config;
    state;
    failures;
    successes;
    lastFailure;
    lastSuccess;
    openedAt;
    totalRequests;
    failedRequests;
    constructor(config){
        this.config = config;
        this.state = 'CLOSED';
        this.failures = [];
        this.successes = 0;
        this.totalRequests = 0;
        this.failedRequests = 0;
    }
    /**
   * Execute a function with circuit breaker protection
   */ async execute(fn) {
        this.totalRequests++;
        // Check if circuit is open
        if (this.state === 'OPEN') {
            if (this.shouldAttemptReset()) {
                this.transitionTo('HALF_OPEN');
            } else {
                this.failedRequests++;
                logger.warn({
                    circuit: this.config.name,
                    state: this.state,
                    openedAt: this.openedAt
                }, 'Circuit breaker is OPEN - failing fast');
                if (this.config.fallback) {
                    return this.config.fallback();
                }
                throw new CircuitBreakerError(`Circuit breaker ${this.config.name} is OPEN`, this.config.name);
            }
        }
        // Execute the function
        try {
            const result = await this.executeWithTimeout(fn);
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure(error);
            throw error;
        }
    }
    /**
   * Execute function with optional timeout
   */ async executeWithTimeout(fn) {
        if (!this.config.requestTimeout) {
            return fn();
        }
        return Promise.race([
            fn(),
            new Promise((_, reject)=>setTimeout(()=>reject(new Error(`Request timeout after ${this.config.requestTimeout}ms`)), this.config.requestTimeout))
        ]);
    }
    /**
   * Handle successful execution
   */ onSuccess() {
        this.lastSuccess = new Date();
        if (this.state === 'HALF_OPEN') {
            this.successes++;
            if (this.successes >= this.config.successThreshold) {
                this.transitionTo('CLOSED');
            }
        } else if (this.state === 'CLOSED') {
            // Clear old failures outside the window
            this.pruneOldFailures();
        }
    }
    /**
   * Handle failed execution
   */ onFailure(error) {
        this.failedRequests++;
        this.lastFailure = new Date();
        this.failures.push({
            timestamp: Date.now()
        });
        logger.warn({
            circuit: this.config.name,
            state: this.state,
            error: error instanceof Error ? error.message : 'Unknown error',
            failureCount: this.failures.length
        }, 'Circuit breaker recorded failure');
        if (this.state === 'HALF_OPEN') {
            // Any failure in HALF_OPEN reopens the circuit
            this.transitionTo('OPEN');
        } else if (this.state === 'CLOSED') {
            this.pruneOldFailures();
            if (this.failures.length >= this.config.failureThreshold) {
                this.transitionTo('OPEN');
            }
        }
    }
    /**
   * Check if we should attempt to reset from OPEN to HALF_OPEN
   */ shouldAttemptReset() {
        if (!this.openedAt) return true;
        return Date.now() - this.openedAt.getTime() >= this.config.resetTimeout;
    }
    /**
   * Remove failures outside the failure window
   */ pruneOldFailures() {
        const cutoff = Date.now() - this.config.failureWindow;
        this.failures = this.failures.filter((f)=>f.timestamp > cutoff);
    }
    /**
   * Transition to a new state
   */ transitionTo(newState) {
        const oldState = this.state;
        this.state = newState;
        logger.info({
            circuit: this.config.name,
            from: oldState,
            to: newState,
            failures: this.failures.length,
            successes: this.successes
        }, 'Circuit breaker state transition');
        if (newState === 'OPEN') {
            this.openedAt = new Date();
        } else if (newState === 'CLOSED') {
            this.failures = [];
            this.successes = 0;
            this.openedAt = undefined;
        } else if (newState === 'HALF_OPEN') {
            this.successes = 0;
        }
    }
    /**
   * Get current statistics
   */ getStats() {
        return {
            name: this.config.name,
            state: this.state,
            failures: this.failures.length,
            successes: this.successes,
            lastFailure: this.lastFailure,
            lastSuccess: this.lastSuccess,
            openedAt: this.openedAt,
            totalRequests: this.totalRequests,
            failedRequests: this.failedRequests,
            successRate: this.totalRequests > 0 ? (this.totalRequests - this.failedRequests) / this.totalRequests : 1
        };
    }
    /**
   * Manually reset the circuit breaker
   */ reset() {
        this.transitionTo('CLOSED');
        this.totalRequests = 0;
        this.failedRequests = 0;
        logger.info({
            circuit: this.config.name
        }, 'Circuit breaker manually reset');
    }
    /**
   * Check if circuit is allowing requests
   */ isAllowingRequests() {
        if (this.state === 'CLOSED') return true;
        if (this.state === 'HALF_OPEN') return true;
        return this.shouldAttemptReset();
    }
}
class CircuitBreakerError extends Error {
    circuitName;
    constructor(message, circuitName){
        super(message), this.circuitName = circuitName;
        this.name = 'CircuitBreakerError';
    }
}
// =============================================================================
// CIRCUIT BREAKER REGISTRY
// =============================================================================
const circuitBreakers = new Map();
function getCircuitBreaker(config) {
    let breaker = circuitBreakers.get(config.name);
    if (!breaker) {
        breaker = new CircuitBreaker(config);
        circuitBreakers.set(config.name, breaker);
        logger.info({
            circuit: config.name
        }, 'Created new circuit breaker');
    }
    return breaker;
}
function getAllCircuitBreakerStats() {
    return Array.from(circuitBreakers.values()).map((cb)=>cb.getStats());
}
function resetAllCircuitBreakers() {
    circuitBreakers.forEach((cb)=>cb.reset());
    logger.info({
        count: circuitBreakers.size
    }, 'Reset all circuit breakers');
}
const x402scanCircuitBreaker = getCircuitBreaker({
    name: 'x402scan',
    failureThreshold: 3,
    successThreshold: 2,
    resetTimeout: 60000,
    failureWindow: 300000,
    requestTimeout: 30000
});
const scatteringCircuitBreaker = getCircuitBreaker({
    name: 'scattering',
    failureThreshold: 3,
    successThreshold: 2,
    resetTimeout: 60000,
    failureWindow: 300000,
    requestTimeout: 30000
});
const facilitatorProbeCircuitBreaker = getCircuitBreaker({
    name: 'facilitator-probes',
    failureThreshold: 5,
    successThreshold: 3,
    resetTimeout: 30000,
    failureWindow: 120000,
    requestTimeout: 10000
});
}),
"[project]/src/lib/security-monitor.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// SECURITY MONITORING & THREAT DETECTION
// =============================================================================
// Real-time security monitoring and threat detection for all requests
// Implements agent-based security scanning for all in/out traffic
//
// Configuration (environment variables):
// - SECURITY_SHADOW_MODE: 'true' (default) = log-only, 'false' = enforce
// - SECURITY_ENFORCE_SQL_INJECTION: 'true' = block SQL injection attempts
// - SECURITY_ENFORCE_XSS: 'true' = block XSS attempts
// - SECURITY_ENFORCE_PATH_TRAVERSAL: 'true' = block path traversal
// - SECURITY_ENFORCE_COMMAND_INJECTION: 'true' = block command injection
// - SECURITY_ENFORCE_AUTH_BYPASS: 'true' = block auth bypass attempts
// - SECURITY_VIOLATION_THRESHOLD: Number of violations before auto-block (default: 10)
// - SECURITY_VIOLATION_WINDOW_MS: Time window for violations (default: 300000 = 5min)
// - SECURITY_MAX_BLOCKS_PER_HOUR: Safety cap (default: 100)
// - SECURITY_MAX_BLOCKS_PER_DAY: Safety cap (default: 1000)
__turbopack_context__.s([
    "getBlockedIps",
    ()=>getBlockedIps,
    "getSecurityConfig",
    ()=>getSecurityConfig,
    "getSecurityMetrics",
    ()=>getSecurityMetrics,
    "getThreatHistory",
    ()=>getThreatHistory,
    "getViolationRateLimitedIps",
    ()=>getViolationRateLimitedIps,
    "isCategoryEnforced",
    ()=>isCategoryEnforced,
    "resetSecurityMetrics",
    ()=>resetSecurityMetrics,
    "scanRequest",
    ()=>scanRequest,
    "shouldBlockIp",
    ()=>shouldBlockIp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'SecurityMonitor'
});
// =============================================================================
// CONFIGURATION
// =============================================================================
// Global shadow mode (master switch)
const SHADOW_MODE_ENABLED = process.env.SECURITY_SHADOW_MODE !== 'false'; // Default to true for safety
// Per-category enforcement flags (granular control)
const ENFORCEMENT_FLAGS = {
    sql_injection: process.env.SECURITY_ENFORCE_SQL_INJECTION === 'true',
    xss: process.env.SECURITY_ENFORCE_XSS === 'true',
    path_traversal: process.env.SECURITY_ENFORCE_PATH_TRAVERSAL === 'true',
    command_injection: process.env.SECURITY_ENFORCE_COMMAND_INJECTION === 'true',
    auth_bypass: process.env.SECURITY_ENFORCE_AUTH_BYPASS === 'true',
    suspicious_user_agent: process.env.SECURITY_ENFORCE_SUSPICIOUS_UA === 'true',
    suspicious_path: process.env.SECURITY_ENFORCE_SUSPICIOUS_PATH === 'true',
    missing_auth: false
};
// Violation-based rate limiting
const VIOLATION_THRESHOLD = parseInt(process.env.SECURITY_VIOLATION_THRESHOLD || '10', 10);
const VIOLATION_WINDOW_MS = parseInt(process.env.SECURITY_VIOLATION_WINDOW_MS || '300000', 10); // 5 minutes
// Safety caps to prevent mass blocking
const MAX_BLOCKS_PER_HOUR = parseInt(process.env.SECURITY_MAX_BLOCKS_PER_HOUR || '100', 10);
const MAX_BLOCKS_PER_DAY = parseInt(process.env.SECURITY_MAX_BLOCKS_PER_DAY || '1000', 10);
// =============================================================================
// IN-MEMORY STORES
// =============================================================================
// Threat store (upgrade to Redis in production)
const threatStore = new Map();
// Violation rate limiting store
const violationStore = new Map();
// Track blocks per time window
const blocksThisHour = new Map();
const blocksThisDay = new Map();
// Shadow mode metrics
const shadowModeMetrics = {
    startTime: Date.now(),
    totalScanned: 0,
    wouldHaveBlocked: 0,
    blockedByCategory: new Map(),
    actuallyBlocked: 0,
    actuallyAllowed: 0,
    threatsByCategory: new Map()
};
// =============================================================================
// CLEANUP INTERVALS
// =============================================================================
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
// Cleanup violation store every 10 minutes
setInterval(()=>{
    const now = Date.now();
    const keysToDelete = [];
    violationStore.forEach((value, key)=>{
        if (now - value.windowStart > VIOLATION_WINDOW_MS * 2) {
            keysToDelete.push(key);
        }
    });
    keysToDelete.forEach((key)=>violationStore.delete(key));
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
    // Update metrics
    shadowModeMetrics.totalScanned++;
    // Track threats by category
    for (const threat of threats){
        const currentCount = shadowModeMetrics.threatsByCategory.get(threat.category) || 0;
        shadowModeMetrics.threatsByCategory.set(threat.category, currentCount + 1);
    }
    // Determine if we would block this request
    const wouldBlock = shouldBlockRequest(threats, ip);
    // Track shadow mode "would have blocked" metrics
    if (wouldBlock && SHADOW_MODE_ENABLED) {
        shadowModeMetrics.wouldHaveBlocked++;
        for (const threat of threats){
            const currentCount = shadowModeMetrics.blockedByCategory.get(threat.category) || 0;
            shadowModeMetrics.blockedByCategory.set(threat.category, currentCount + 1);
            threat.wouldHaveBlocked = true;
        }
    }
    // Log threats
    if (threats.length > 0) {
        logger.warn({
            requestId,
            ip,
            path,
            method,
            threatCount: threats.length,
            riskScore,
            wouldBlock,
            shadowMode: SHADOW_MODE_ENABLED,
            threats: threats.map((t)=>({
                    type: t.type,
                    severity: t.severity,
                    category: t.category,
                    wouldHaveBlocked: t.wouldHaveBlocked
                }))
        }, SHADOW_MODE_ENABLED && wouldBlock ? 'Security threats detected (SHADOW MODE - would have blocked)' : 'Security threats detected');
    }
    // Store threats for IP tracking
    if (threats.length > 0) {
        storeThreat(ip, threats);
        // Track violations for rate limiting
        trackViolation(ip, threats.length);
    }
    // Track enforcement stats
    if (!SHADOW_MODE_ENABLED && wouldBlock) {
        shadowModeMetrics.actuallyBlocked++;
    } else {
        shadowModeMetrics.actuallyAllowed++;
    }
    return {
        safe: threats.length === 0,
        threats,
        riskScore,
        recommendations,
        shadowMode: SHADOW_MODE_ENABLED,
        wouldBlock
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
/**
 * Determine if a request should be blocked based on threats and enforcement settings
 */ function shouldBlockRequest(threats, ip) {
    if (threats.length === 0) return false;
    // Check if IP is rate limited due to violations
    if (isIpViolationRateLimited(ip)) {
        return true;
    }
    // Check global shadow mode
    if (SHADOW_MODE_ENABLED) {
        // In shadow mode, check if ANY category would have blocked
        // This is for metrics - we won't actually block
        for (const threat of threats){
            const categoryKey = threat.category;
            if (ENFORCEMENT_FLAGS[categoryKey]) {
                return true; // Would have blocked
            }
        }
        // Also check severity-based blocking
        if (threats.some((t)=>t.severity === 'critical')) {
            return true;
        }
        return false;
    }
    // Enforcement mode - check per-category flags
    for (const threat of threats){
        const categoryKey = threat.category;
        if (ENFORCEMENT_FLAGS[categoryKey]) {
            return true;
        }
    }
    // Block on critical severity
    if (threats.some((t)=>t.severity === 'critical')) {
        return true;
    }
    return false;
}
/**
 * Track a violation for rate limiting purposes
 */ function trackViolation(ip, count) {
    const now = Date.now();
    const existing = violationStore.get(ip);
    if (existing) {
        // Check if we're still in the same window
        if (now - existing.windowStart < VIOLATION_WINDOW_MS) {
            existing.violations += count;
            // Check if threshold exceeded
            if (existing.violations >= VIOLATION_THRESHOLD && !existing.blocked) {
                existing.blocked = true;
                logger.warn({
                    ip,
                    violations: existing.violations,
                    threshold: VIOLATION_THRESHOLD,
                    windowMs: VIOLATION_WINDOW_MS
                }, 'IP rate limited due to security violations');
            }
        } else {
            // Start new window
            violationStore.set(ip, {
                violations: count,
                windowStart: now,
                blocked: false
            });
        }
    } else {
        violationStore.set(ip, {
            violations: count,
            windowStart: now,
            blocked: false
        });
    }
}
/**
 * Check if an IP is rate limited due to violations
 */ function isIpViolationRateLimited(ip) {
    const record = violationStore.get(ip);
    if (!record) return false;
    const now = Date.now();
    // Check if still in the rate limit window
    if (now - record.windowStart > VIOLATION_WINDOW_MS) {
        // Window expired, reset
        record.blocked = false;
        record.violations = 0;
        record.windowStart = now;
        return false;
    }
    return record.blocked;
}
function isCategoryEnforced(category) {
    if (SHADOW_MODE_ENABLED) return false;
    const categoryKey = category;
    return ENFORCEMENT_FLAGS[categoryKey] ?? false;
}
function getSecurityConfig() {
    return {
        shadowMode: SHADOW_MODE_ENABLED,
        enforcementFlags: {
            ...ENFORCEMENT_FLAGS
        },
        violationThreshold: VIOLATION_THRESHOLD,
        violationWindowMs: VIOLATION_WINDOW_MS,
        maxBlocksPerHour: MAX_BLOCKS_PER_HOUR,
        maxBlocksPerDay: MAX_BLOCKS_PER_DAY
    };
}
function getThreatHistory(ip) {
    return threatStore.get(ip) || null;
}
function shouldBlockIp(ip) {
    // Check violation-based rate limiting first (works even in shadow mode if violation threshold exceeded)
    if (isIpViolationRateLimited(ip)) {
        // Still respect shadow mode for actual blocking
        if (SHADOW_MODE_ENABLED) {
            logger.info({
                ip
            }, 'IP would be blocked (violation rate limit) - SHADOW MODE');
            return false;
        }
        return true;
    }
    // Shadow mode: log-only, don't block
    if (SHADOW_MODE_ENABLED) {
        return false; // Log-only mode
    }
    // Safety caps: prevent mass blocking
    const hourCount = blocksThisHour.get(ip) || 0;
    const dayCount = blocksThisDay.get(ip) || 0;
    if (hourCount >= MAX_BLOCKS_PER_HOUR) {
        logger.warn({
            ip,
            hourCount
        }, 'Block cap reached for hour');
        return false; // Cap reached, don't block more
    }
    if (dayCount >= MAX_BLOCKS_PER_DAY) {
        logger.warn({
            ip,
            dayCount
        }, 'Block cap reached for day');
        return false; // Cap reached, don't block more
    }
    const history = threatStore.get(ip);
    if (!history) return false;
    // Block if:
    // - More than 10 threats in last hour
    // - Any critical severity threat with enforcement enabled
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const recentThreats = history.events.filter((e)=>new Date(e.timestamp).getTime() > oneHourAgo);
    if (recentThreats.length > 10) {
        blocksThisHour.set(ip, hourCount + 1);
        blocksThisDay.set(ip, dayCount + 1);
        return true;
    }
    // Check for critical threats with enforcement
    const criticalEnforcedThreats = recentThreats.filter((e)=>{
        if (e.severity !== 'critical') return false;
        const categoryKey = e.category;
        return ENFORCEMENT_FLAGS[categoryKey] ?? false;
    });
    if (criticalEnforcedThreats.length > 0) {
        blocksThisHour.set(ip, hourCount + 1);
        blocksThisDay.set(ip, dayCount + 1);
        return true;
    }
    return false;
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
function getViolationRateLimitedIps() {
    const rateLimited = [];
    const now = Date.now();
    violationStore.forEach((record, ip)=>{
        if (record.blocked && now - record.windowStart < VIOLATION_WINDOW_MS) {
            rateLimited.push({
                ip,
                violations: record.violations,
                windowStart: record.windowStart
            });
        }
    });
    return rateLimited;
}
function getSecurityMetrics() {
    // Convert Map to object for threatsByCategory
    const threatsByCategory = {};
    shadowModeMetrics.threatsByCategory.forEach((count, category)=>{
        threatsByCategory[category] = count;
    });
    // Convert Map to object for blockedByCategory
    const blockedCategories = {};
    shadowModeMetrics.blockedByCategory.forEach((count, category)=>{
        blockedCategories[category] = count;
    });
    // Build per-category enforcement stats
    const byCategory = {};
    Object.keys(ENFORCEMENT_FLAGS).forEach((category)=>{
        const totalForCategory = threatsByCategory[category] || 0;
        const blockedForCategory = blockedCategories[category] || 0;
        byCategory[category] = {
            blocked: blockedForCategory,
            allowed: totalForCategory - blockedForCategory
        };
    });
    // Count rate-limited IPs
    let ipsRateLimited = 0;
    let violationsInWindow = 0;
    const now = Date.now();
    violationStore.forEach((record)=>{
        if (record.blocked && now - record.windowStart < VIOLATION_WINDOW_MS) {
            ipsRateLimited++;
        }
        if (now - record.windowStart < VIOLATION_WINDOW_MS) {
            violationsInWindow += record.violations;
        }
    });
    return {
        threatsByCategory,
        shadowModeStats: {
            enabled: SHADOW_MODE_ENABLED,
            wouldHaveBlocked: shadowModeMetrics.wouldHaveBlocked,
            totalScanned: shadowModeMetrics.totalScanned,
            blockedCategories
        },
        enforcementStats: {
            blocked: shadowModeMetrics.actuallyBlocked,
            allowed: shadowModeMetrics.actuallyAllowed,
            byCategory
        },
        violationRateLimiting: {
            ipsRateLimited,
            violationsInWindow
        },
        since: new Date(shadowModeMetrics.startTime).toISOString()
    };
}
function resetSecurityMetrics() {
    shadowModeMetrics.startTime = Date.now();
    shadowModeMetrics.totalScanned = 0;
    shadowModeMetrics.wouldHaveBlocked = 0;
    shadowModeMetrics.blockedByCategory.clear();
    shadowModeMetrics.actuallyBlocked = 0;
    shadowModeMetrics.actuallyAllowed = 0;
    shadowModeMetrics.threatsByCategory.clear();
    violationStore.clear();
    threatStore.clear();
    blocksThisHour.clear();
    blocksThisDay.clear();
    logger.info('Security metrics reset');
}
}),
"[project]/src/app/api/health/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// GET /api/health - Comprehensive Health Check
// =============================================================================
// Returns health status of all critical services
// Used by load balancers, monitoring systems, and deployment checks
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "HEAD",
    ()=>HEAD
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$circuit$2d$breaker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/circuit-breaker.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2d$monitor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/security-monitor.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'HealthCheck'
});
// =============================================================================
// HEALTH CHECKS
// =============================================================================
async function checkDatabase() {
    const start = Date.now();
    try {
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        const healthy = await db.healthCheck();
        const latency = Date.now() - start;
        const poolStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPoolStats"])();
        if (!healthy) {
            return {
                status: 'unhealthy',
                latencyMs: latency,
                message: 'Database health check failed'
            };
        }
        // Warn if latency is high
        if (latency > 500) {
            return {
                status: 'degraded',
                latencyMs: latency,
                message: 'Database responding slowly',
                details: poolStats ? {
                    pool: poolStats
                } : undefined
            };
        }
        return {
            status: 'healthy',
            latencyMs: latency,
            details: poolStats ? {
                pool: poolStats
            } : undefined
        };
    } catch (error) {
        return {
            status: 'unhealthy',
            latencyMs: Date.now() - start,
            message: error instanceof Error ? error.message : 'Database connection failed'
        };
    }
}
async function checkRedis() {
    const start = Date.now();
    try {
        // Check if Upstash Redis is configured
        const hasUpstash = !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
        const hasRedis = !!process.env.REDIS_URL;
        if (!hasUpstash && !hasRedis) {
            return {
                status: 'healthy',
                message: 'Using in-memory store (no Redis configured)',
                details: {
                    type: 'in-memory'
                }
            };
        }
        // If Upstash is configured, try a simple operation
        if (hasUpstash) {
            const { Redis } = await __turbopack_context__.A("[project]/node_modules/@upstash/redis/nodejs.mjs [app-route] (ecmascript, async loader)");
            const redis = new Redis({
                url: process.env.UPSTASH_REDIS_REST_URL,
                token: process.env.UPSTASH_REDIS_REST_TOKEN
            });
            await redis.ping();
            const latency = Date.now() - start;
            return {
                status: latency > 200 ? 'degraded' : 'healthy',
                latencyMs: latency,
                details: {
                    type: 'upstash'
                },
                message: latency > 200 ? 'Redis responding slowly' : undefined
            };
        }
        return {
            status: 'healthy',
            message: 'Redis configured but not checked',
            details: {
                type: 'ioredis'
            }
        };
    } catch (error) {
        return {
            status: 'degraded',
            latencyMs: Date.now() - start,
            message: error instanceof Error ? error.message : 'Redis check failed',
            details: {
                fallback: 'in-memory'
            }
        };
    }
}
function checkCircuitBreakers() {
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$circuit$2d$breaker$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllCircuitBreakerStats"])();
    const result = {};
    for (const stat of stats){
        result[stat.name] = {
            state: stat.state,
            failures: stat.failures,
            successRate: Math.round(stat.successRate * 100) + '%'
        };
    }
    return result;
}
function checkSecurity() {
    try {
        const metrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2d$monitor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSecurityMetrics"])();
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$security$2d$monitor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSecurityConfig"])();
        return {
            status: 'healthy',
            details: {
                shadowMode: config.shadowMode,
                totalScanned: metrics.shadowModeStats.totalScanned,
                wouldHaveBlocked: metrics.shadowModeStats.wouldHaveBlocked,
                ipsRateLimited: metrics.violationRateLimiting.ipsRateLimited
            }
        };
    } catch (error) {
        return {
            status: 'degraded',
            message: 'Security metrics unavailable'
        };
    }
}
async function GET(request) {
    const start = Date.now();
    // Run health checks in parallel
    const [dbHealth, redisHealth] = await Promise.all([
        checkDatabase(),
        checkRedis()
    ]);
    const securityHealth = checkSecurity();
    const circuitBreakers = checkCircuitBreakers();
    // Determine overall status
    const services = {
        database: dbHealth,
        redis: redisHealth,
        security: securityHealth
    };
    let overallStatus = 'healthy';
    for (const service of Object.values(services)){
        if (service.status === 'unhealthy') {
            overallStatus = 'unhealthy';
            break;
        }
        if (service.status === 'degraded' && overallStatus === 'healthy') {
            overallStatus = 'degraded';
        }
    }
    // Check if any circuit breaker is open
    const hasOpenCircuit = Object.values(circuitBreakers).some((cb)=>cb.state === 'OPEN');
    if (hasOpenCircuit && overallStatus === 'healthy') {
        overallStatus = 'degraded';
    }
    const response = {
        status: overallStatus,
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '0.0.0',
        environment: ("TURBOPACK compile-time value", "development") || 'development',
        uptime: Math.round(process.uptime()),
        services,
        circuitBreakers: Object.keys(circuitBreakers).length > 0 ? circuitBreakers : undefined,
        memory: {
            heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
            heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
            rss: Math.round(process.memoryUsage().rss / 1024 / 1024)
        }
    };
    const latency = Date.now() - start;
    logger.info({
        status: overallStatus,
        latencyMs: latency,
        services: Object.fromEntries(Object.entries(services).map(([k, v])=>[
                k,
                v.status
            ]))
    }, 'Health check completed');
    // Return appropriate status code
    const statusCode = overallStatus === 'unhealthy' ? 503 : 200;
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(response, {
        status: statusCode,
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'X-Health-Check-Latency': `${latency}ms`
        }
    });
}
async function HEAD() {
    try {
        const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        const healthy = await db.healthCheck();
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
            status: healthy ? 200 : 503
        });
    } catch  {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
            status: 503
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8b43f3f9._.js.map