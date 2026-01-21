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
class PostgresAdapter {
    pool;
    constructor(connectionString){
        this.pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
            connectionString,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000
        });
        // Handle pool errors
        this.pool.on('error', (err)=>{
            console.error('[PostgresAdapter] Unexpected pool error:', err);
        });
    }
    async healthCheck() {
        try {
            const result = await this.pool.query('SELECT 1');
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
        const result = await this.pool.query(`INSERT INTO endpoints (
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
        const result = await this.pool.query('SELECT * FROM endpoints WHERE id = $1 AND status != $2', [
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
            const result = await this.pool.query(query, params);
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
        const result = await this.pool.query(`UPDATE endpoints SET ${setClauses.join(', ')} WHERE id = $${paramIndex} RETURNING *`, values);
        if (result.rows.length === 0) return null;
        return this.mapRowToEndpoint(result.rows[0]);
    }
    async deleteEndpoint(endpointId) {
        const result = await this.pool.query('UPDATE endpoints SET status = $1, updated_at = $2 WHERE id = $3', [
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
        const result = await this.pool.query(`INSERT INTO payments (
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
        const result = await this.pool.query('SELECT * FROM payments WHERE id = $1', [
            paymentId
        ]);
        if (result.rows.length === 0) return null;
        return this.mapRowToPayment(result.rows[0]);
    }
    async getPaymentByTxHash(txHash) {
        const result = await this.pool.query('SELECT * FROM payments WHERE tx_hash = $1', [
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
        const result = await this.pool.query(query, params);
        return result.rows.map((row)=>this.mapRowToPayment(row));
    }
    async getPaymentsForEndpoint(endpointId, limit = 100) {
        const result = await this.pool.query('SELECT * FROM payments WHERE endpoint_id = $1 ORDER BY verified_at DESC LIMIT $2', [
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
        const result = await this.pool.query(`INSERT INTO usage_logs (
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
        const result = await this.pool.query(query, params);
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
        const result = await this.pool.query(query, params);
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
        await this.pool.query(`INSERT INTO api_keys (id, key_hash, name, role, user_id, rate_limit, expires_at, created_at, updated_at)
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
        const result = await this.pool.query(`SELECT * FROM api_keys WHERE key_hash = $1 AND revoked_at IS NULL`, [
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
        await this.pool.query(`UPDATE api_keys SET last_used_at = NOW(), last_used_ip = $2, updated_at = NOW() WHERE id = $1`, [
            keyId,
            ipAddress || null
        ]);
    }
    async updateApiKeyX402DemoAllowance(keyId, callsUsed, amountUsed) {
        await this.pool.query(`UPDATE api_keys SET x402_demo_calls_used = $2, x402_demo_amount_used = $3, updated_at = NOW() WHERE id = $1`, [
            keyId,
            callsUsed,
            amountUsed
        ]);
    }
    async updateApiKeyX402DemoLimits(keyId, callsLimit, amountLimit) {
        if (callsLimit !== undefined && amountLimit !== undefined) {
            await this.pool.query(`UPDATE api_keys SET x402_demo_calls_limit = $2, x402_demo_amount_limit = $3, updated_at = NOW() WHERE id = $1`, [
                keyId,
                callsLimit,
                amountLimit
            ]);
        } else if (callsLimit !== undefined) {
            await this.pool.query(`UPDATE api_keys SET x402_demo_calls_limit = $2, updated_at = NOW() WHERE id = $1`, [
                keyId,
                callsLimit
            ]);
        } else if (amountLimit !== undefined) {
            await this.pool.query(`UPDATE api_keys SET x402_demo_amount_limit = $2, updated_at = NOW() WHERE id = $1`, [
                keyId,
                amountLimit
            ]);
        }
    }
    async revokeApiKey(keyId) {
        const result = await this.pool.query(`UPDATE api_keys SET revoked_at = NOW(), updated_at = NOW() WHERE id = $1 AND revoked_at IS NULL`, [
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
        const result = await this.pool.query(query, params);
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
__turbopack_context__.s([
    "closeDb",
    ()=>closeDb,
    "getDb",
    ()=>getDb
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
async function getRouteAttemptsForHealth(facilitatorId, network, token, windowStart, windowEnd) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/api/v1/smf/metrics/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// SMF Metrics API
// =============================================================================
// GET /api/v1/smf/metrics
// Returns detailed metrics suitable for dashboards
__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/smf.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'SMFMetricsAPI'
});
async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const facilitatorId = searchParams.get('facilitator_id');
        const network = searchParams.get('network') || 'base';
        const token = searchParams.get('token') || '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
        const windowMinutes = parseInt(searchParams.get('window_minutes') || '60', 10);
        // Get facilitators from database instead of router (avoids loading CDP SDK)
        let facilitators = [];
        try {
            const { getDb } = await __turbopack_context__.A("[project]/src/db/client.ts [app-route] (ecmascript, async loader)");
            const db = getDb();
            const isPostgres = 'pool' in db || typeof db.pool?.query === 'function';
            if (isPostgres) {
                let query = 'SELECT id, name, status FROM facilitators WHERE status = $1';
                const params = [
                    'active'
                ];
                if (facilitatorId) {
                    query += ' AND id = $2';
                    params.push(facilitatorId);
                }
                const result = await db.pool.query(query, params);
                facilitators = result.rows;
            } else {
                let query = 'SELECT id, name, status FROM facilitators WHERE status = ?';
                const params = [
                    'active'
                ];
                if (facilitatorId) {
                    query += ' AND id = ?';
                    params.push(facilitatorId);
                }
                const stmt = db.db.prepare(query);
                facilitators = stmt.all(...params);
            }
        } catch (error) {
            logger.warn({
                error
            }, 'Failed to load facilitators from database, using defaults');
            // Fallback to default CDP facilitator
            if (!facilitatorId || facilitatorId === 'cdp') {
                facilitators = [
                    {
                        id: 'cdp',
                        name: 'Coinbase Developer Platform'
                    }
                ];
            }
        }
        const metrics = await Promise.all(facilitators.map(async (facilitator)=>{
            try {
                // Get latest health snapshot
                const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLatestHealthSnapshot"])(facilitator.id, network, token);
                // Get capabilities
                const capabilities = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFacilitatorCapabilities"])(facilitator.id, network, token);
                // Get recent attempts for detailed metrics
                const windowEnd = new Date();
                const windowStart = new Date(windowEnd.getTime() - windowMinutes * 60 * 1000);
                const attempts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$smf$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRouteAttemptsForHealth"])(facilitator.id, network, token, windowStart.toISOString(), windowEnd.toISOString());
                // Calculate additional metrics
                const attemptsByPhase = attempts.reduce((acc, a)=>{
                    acc[a.phase] = (acc[a.phase] || 0) + 1;
                    return acc;
                }, {});
                const attemptsByResult = attempts.reduce((acc, a)=>{
                    acc[a.result] = (acc[a.result] || 0) + 1;
                    return acc;
                }, {});
                const latencies = attempts.map((a)=>a.latency_ms).filter((l)=>l > 0);
                const avgLatency = latencies.length > 0 ? latencies.reduce((a, b)=>a + b, 0) / latencies.length : null;
                return {
                    facilitatorId: facilitator.id,
                    name: facilitator.name,
                    network,
                    token,
                    window: {
                        start: windowStart.toISOString(),
                        end: windowEnd.toISOString(),
                        minutes: windowMinutes
                    },
                    health: snapshot ? {
                        status: snapshot.status,
                        successRate: Number(snapshot.success_rate),
                        errorRate: Number(snapshot.error_rate),
                        p50LatencyMs: snapshot.p50_latency_ms,
                        p95LatencyMs: snapshot.p95_latency_ms,
                        p99LatencyMs: snapshot.p99_latency_ms,
                        lastErrorType: snapshot.last_error_type,
                        lastUpdated: snapshot.window_end
                    } : null,
                    capabilities: capabilities.map((c)=>({
                            network: c.network,
                            token: c.token,
                            minAmount: c.min_amount,
                            maxAmount: c.max_amount,
                            feeBps: c.fee_bps,
                            regions: c.regions,
                            supportsDeferred: c.supports_deferred,
                            supportsSubscriptions: c.supports_subscriptions
                        })),
                    attempts: {
                        total: attempts.length,
                        byPhase: attemptsByPhase,
                        byResult: attemptsByResult,
                        averageLatencyMs: avgLatency
                    },
                    recentAttempts: attempts.slice(-10).map((a)=>({
                            id: a.id,
                            phase: a.phase,
                            result: a.result,
                            latencyMs: a.latency_ms,
                            errorCode: a.error_code,
                            rawStatus: a.raw_status,
                            timestamp: a.created_at
                        }))
                };
            } catch (error) {
                logger.error({
                    error,
                    facilitatorId: facilitator.id,
                    network,
                    token
                }, 'Failed to get metrics');
                return {
                    facilitatorId: facilitator.id,
                    name: facilitator.name,
                    network,
                    token,
                    error: error instanceof Error ? error.message : 'Unknown error'
                };
            }
        }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            metrics,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logger.error({
            error
        }, 'Failed to get SMF metrics');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e3360927._.js.map