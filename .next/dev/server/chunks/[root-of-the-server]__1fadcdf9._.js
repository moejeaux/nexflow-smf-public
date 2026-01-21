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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

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
"[project]/src/db/api-keys.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// API Keys Database Layer
// =============================================================================
__turbopack_context__.s([
    "createApiKey",
    ()=>createApiKey,
    "findApiKeyByHash",
    ()=>findApiKeyByHash,
    "findApiKeyById",
    ()=>findApiKeyById,
    "findApiKeyByToken",
    ()=>findApiKeyByToken,
    "generateApiKey",
    ()=>generateApiKey,
    "hasX402DemoAllowance",
    ()=>hasX402DemoAllowance,
    "hashApiKey",
    ()=>hashApiKey,
    "listApiKeys",
    ()=>listApiKeys,
    "revokeApiKey",
    ()=>revokeApiKey,
    "updateApiKeyLastUsed",
    ()=>updateApiKeyLastUsed,
    "updateApiKeyX402DemoAllowance",
    ()=>updateApiKeyX402DemoAllowance,
    "updateApiKeyX402DemoLimits",
    ()=>updateApiKeyX402DemoLimits
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/client.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function generateApiKey() {
    // Use 32 bytes (256 bits) of entropy for strong security
    const randomBytes = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32);
    // Base64url encoding of 32 bytes gives ~43 characters (no padding needed)
    const key = randomBytes.toString('base64url');
    return `nf_live_${key}`;
}
function hashApiKey(key) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash('sha256').update(key).digest('hex');
}
async function createApiKey(input) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const id = `key_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const token = generateApiKey();
    const keyHash = hashApiKey(token);
    const now = new Date().toISOString();
    const apiKey = {
        id,
        keyHash,
        name: input.name,
        role: input.role || 'user',
        userId: input.userId,
        rateLimit: input.rateLimit || 1000,
        expiresAt: input.expiresAt,
        createdAt: now,
        updatedAt: now
    };
    // Use adapter to insert
    await db.createApiKey(apiKey);
    return {
        ...apiKey,
        token
    };
}
async function findApiKeyByHash(keyHash) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.findApiKeyByHash(keyHash);
}
async function findApiKeyByToken(token) {
    const keyHash = hashApiKey(token);
    return await findApiKeyByHash(keyHash);
}
async function updateApiKeyLastUsed(keyId, ipAddress) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    await db.updateApiKeyLastUsed(keyId, ipAddress);
}
async function revokeApiKey(keyId) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.revokeApiKey(keyId);
}
async function listApiKeys(userId) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    return await db.listApiKeys(userId);
}
async function updateApiKeyX402DemoAllowance(keyId, callsUsed, amountUsed) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    await db.updateApiKeyX402DemoAllowance(keyId, callsUsed, amountUsed);
}
function hasX402DemoAllowance(apiKey) {
    const callsUsed = apiKey.x402DemoCallsUsed || 0;
    const callsLimit = apiKey.x402DemoCallsLimit || 200;
    const amountUsed = BigInt(apiKey.x402DemoAmountUsed || '0');
    const amountLimit = BigInt(apiKey.x402DemoAmountLimit || '1000000');
    if (callsUsed >= callsLimit) {
        return {
            hasAllowance: false,
            callsRemaining: 0,
            amountRemaining: '0',
            reason: 'Calls limit reached'
        };
    }
    if (amountUsed >= amountLimit) {
        return {
            hasAllowance: false,
            callsRemaining: callsLimit - callsUsed,
            amountRemaining: '0',
            reason: 'Amount limit reached'
        };
    }
    return {
        hasAllowance: true,
        callsRemaining: callsLimit - callsUsed,
        amountRemaining: (amountLimit - amountUsed).toString()
    };
}
async function updateApiKeyX402DemoLimits(keyId, callsLimit, amountLimit) {
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    await db.updateApiKeyX402DemoLimits(keyId, callsLimit, amountLimit);
}
async function findApiKeyById(keyId) {
    const allKeys = await listApiKeys();
    return allKeys.find((k)=>k.id === keyId) || null;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// Authentication Middleware
// =============================================================================
__turbopack_context__.s([
    "authenticateRequest",
    ()=>authenticateRequest,
    "extractApiKey",
    ()=>extractApiKey,
    "hasRole",
    ()=>hasRole,
    "requireAnyRole",
    ()=>requireAnyRole,
    "requireAuth",
    ()=>requireAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$api$2d$keys$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/api-keys.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$api$2d$keys$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$api$2d$keys$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
function extractApiKey(request) {
    // First try x-api-key header (standard for API keys)
    const apiKeyHeader = request.headers.get('x-api-key');
    if (apiKeyHeader) {
        return apiKeyHeader.trim();
    }
    // Fall back to Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return null;
    // Support both "Bearer <token>" and "<token>" formats
    if (authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7).trim();
    }
    return authHeader.trim();
}
async function authenticateRequest(request) {
    const token = extractApiKey(request);
    if (!token) {
        return {
            error: 'Authentication required',
            status: 401
        };
    }
    // Validate token format (nf_live_...)
    if (!token.startsWith('nf_live_')) {
        return {
            error: 'Invalid API key format',
            status: 401
        };
    }
    // Find API key in database
    const apiKey = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$api$2d$keys$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findApiKeyByToken"])(token);
    if (!apiKey) {
        return {
            error: 'Invalid API key',
            status: 401
        };
    }
    // Check if key is expired
    if (apiKey.expiresAt && new Date(apiKey.expiresAt) < new Date()) {
        return {
            error: 'API key has expired',
            status: 401
        };
    }
    // Extract IP address for tracking
    const ipAddress = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || undefined;
    // Update last used timestamp and IP (fire and forget)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$api$2d$keys$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateApiKeyLastUsed"])(apiKey.id, ipAddress).catch((err)=>{
        console.error('[auth] Failed to update last used:', err);
    });
    return {
        apiKey
    };
}
function hasRole(apiKey, requiredRole) {
    const roleHierarchy = {
        'read-only': 1,
        'user': 2,
        'admin': 3
    };
    return roleHierarchy[apiKey.role] >= roleHierarchy[requiredRole];
}
async function requireAuth(request, requiredRole = 'user') {
    const authResult = await authenticateRequest(request);
    if ('error' in authResult) {
        return {
            response: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: authResult.error,
                code: 'UNAUTHORIZED'
            }, {
                status: authResult.status
            })
        };
    }
    // Check role
    if (!hasRole(authResult.apiKey, requiredRole)) {
        return {
            response: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Insufficient permissions',
                code: 'FORBIDDEN',
                details: `Required role: ${requiredRole}, your role: ${authResult.apiKey.role}`
            }, {
                status: 403
            })
        };
    }
    return {
        apiKey: authResult.apiKey
    };
}
async function requireAnyRole(request, allowedRoles) {
    const authResult = await authenticateRequest(request);
    if ('error' in authResult) {
        return {
            response: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: authResult.error,
                code: 'UNAUTHORIZED'
            }, {
                status: authResult.status
            })
        };
    }
    // Check if API key has any of the allowed roles
    const hasAllowedRole = allowedRoles.some((role)=>hasRole(authResult.apiKey, role));
    if (!hasAllowedRole) {
        return {
            response: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Insufficient permissions',
                code: 'FORBIDDEN',
                details: `Required one of roles: ${allowedRoles.join(', ')}, your role: ${authResult.apiKey.role}`
            }, {
                status: 403
            })
        };
    }
    return {
        apiKey: authResult.apiKey
    };
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
"[project]/src/db/x402-agents.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// x402 Agents Database Operations
// =============================================================================
__turbopack_context__.s([
    "createAgent",
    ()=>createAgent,
    "createRevenueShare",
    ()=>createRevenueShare,
    "createRouteConfig",
    ()=>createRouteConfig,
    "createX402Payment",
    ()=>createX402Payment,
    "getActiveRouteConfig",
    ()=>getActiveRouteConfig,
    "getAgent",
    ()=>getAgent,
    "getRevenueShares",
    ()=>getRevenueShares,
    "getRouteConfigs",
    ()=>getRouteConfigs,
    "listAgents",
    ()=>listAgents,
    "listPayments",
    ()=>listPayments,
    "updateAgent",
    ()=>updateAgent,
    "updatePaymentStatus",
    ()=>updatePaymentStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/query-helper.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-node/v4.js [app-route] (ecmascript) <export default as v4>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function createAgent(ownerUserId, input) {
    const db = getDb();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
    const now = new Date();
    const agent = {
        id,
        owner_user_id: ownerUserId,
        name: input.name,
        description: input.description || null,
        status: 'active',
        x402_identity: input.x402_identity,
        x402_endpoint: input.x402_endpoint || null,
        chain: input.chain || 'base',
        created_at: now,
        updated_at: now
    };
    // Use raw SQL since we need to extend the adapter
    const query = `
    INSERT INTO x402_agents (
      id, owner_user_id, name, description, status, x402_identity, x402_endpoint, chain, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQueryOne"])(query, [
        agent.id,
        agent.owner_user_id,
        agent.name,
        agent.description,
        agent.status,
        agent.x402_identity,
        agent.x402_endpoint,
        agent.chain,
        agent.created_at,
        agent.updated_at
    ]);
    if (!result) throw new Error('Failed to create agent');
    return mapRowToAgent(result);
}
async function getAgent(agentId) {
    const db = getDb();
    const query = 'SELECT * FROM x402_agents WHERE id = $1';
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQueryOne"])(query, [
        agentId
    ]);
    if (!result) {
        return null;
    }
    return mapRowToAgent(result);
}
async function listAgents(ownerUserId) {
    const db = getDb();
    const query = 'SELECT * FROM x402_agents WHERE owner_user_id = $1 ORDER BY created_at DESC';
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQuery"])(query, [
        ownerUserId
    ]);
    return result.map(mapRowToAgent);
}
async function updateAgent(agentId, updates) {
    const db = getDb();
    const setClauses = [];
    const values = [];
    let paramIndex = 1;
    if (updates.name !== undefined) {
        setClauses.push(`name = $${paramIndex++}`);
        values.push(updates.name);
    }
    if (updates.description !== undefined) {
        setClauses.push(`description = $${paramIndex++}`);
        values.push(updates.description);
    }
    if (updates.status !== undefined) {
        setClauses.push(`status = $${paramIndex++}`);
        values.push(updates.status);
    }
    if (updates.x402_endpoint !== undefined) {
        setClauses.push(`x402_endpoint = $${paramIndex++}`);
        values.push(updates.x402_endpoint);
    }
    if (setClauses.length === 0) {
        return getAgent(agentId);
    }
    setClauses.push(`updated_at = $${paramIndex++}`);
    values.push(new Date());
    values.push(agentId);
    const query = `
    UPDATE x402_agents
    SET ${setClauses.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING *
  `;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQueryOne"])(query, values);
    if (!result) {
        return null;
    }
    return mapRowToAgent(result);
}
async function createRouteConfig(agentId, input) {
    const db = getDb();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
    const now = new Date();
    const config = {
        id,
        agent_id: agentId,
        chain: input.chain,
        stablecoin: input.stablecoin,
        fee_bps: input.fee_bps,
        revenue_share_bps: input.revenue_share_bps,
        min_amount: input.min_amount || null,
        max_amount: input.max_amount || null,
        status: input.status || 'active',
        created_at: now,
        updated_at: now
    };
    const query = `
    INSERT INTO payment_route_configs (
      id, agent_id, chain, stablecoin, fee_bps, revenue_share_bps, min_amount, max_amount, status, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *
  `;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQueryOne"])(query, [
        config.id,
        config.agent_id,
        config.chain,
        config.stablecoin,
        config.fee_bps,
        config.revenue_share_bps,
        config.min_amount,
        config.max_amount,
        config.status,
        config.created_at,
        config.updated_at
    ]);
    if (!result) throw new Error('Failed to create route config');
    return mapRowToRouteConfig(result);
}
async function getRouteConfigs(agentId) {
    const db = getDb();
    const query = 'SELECT * FROM payment_route_configs WHERE agent_id = $1 ORDER BY created_at DESC';
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQuery"])(query, [
        agentId
    ]);
    return result.map(mapRowToRouteConfig);
}
async function getActiveRouteConfig(agentId, chain) {
    const db = getDb();
    let query = `
    SELECT * FROM payment_route_configs
    WHERE agent_id = $1 AND status IN ('active', 'test_only')
    ORDER BY created_at DESC
    LIMIT 1
  `;
    const params = [
        agentId
    ];
    if (chain) {
        query = `
      SELECT * FROM payment_route_configs
      WHERE agent_id = $1 AND chain = $2 AND status IN ('active', 'test_only')
      ORDER BY created_at DESC
      LIMIT 1
    `;
        params.push(chain);
    }
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQueryOne"])(query, params);
    if (!result) {
        return null;
    }
    return mapRowToRouteConfig(result);
}
async function createX402Payment(agentId, routeConfigId, direction, amount, currency, chain, chainTxHash, status, meta) {
    const db = getDb();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
    const now = new Date();
    const payment = {
        id,
        agent_id: agentId,
        route_config_id: routeConfigId,
        direction,
        amount,
        currency: currency,
        chain: chain,
        chain_tx_hash: chainTxHash,
        status,
        meta,
        created_at: now,
        confirmed_at: status === 'confirmed' ? now : null
    };
    const query = `
    INSERT INTO x402_payments (
      id, agent_id, route_config_id, direction, amount, currency, chain, chain_tx_hash, status, meta, created_at, confirmed_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *
  `;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQueryOne"])(query, [
        payment.id,
        payment.agent_id,
        payment.route_config_id,
        payment.direction,
        payment.amount,
        payment.currency,
        payment.chain,
        payment.chain_tx_hash,
        payment.status,
        JSON.stringify(payment.meta),
        payment.created_at,
        payment.confirmed_at
    ]);
    if (!result) throw new Error('Failed to create payment');
    return mapRowToPayment(result);
}
async function updatePaymentStatus(paymentId, status, chainTxHash) {
    const db = getDb();
    const confirmedAt = status === 'confirmed' ? new Date() : null;
    const query = `
    UPDATE x402_payments
    SET status = $1, chain_tx_hash = COALESCE($2, chain_tx_hash), confirmed_at = COALESCE($3, confirmed_at)
    WHERE id = $4
    RETURNING *
  `;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQueryOne"])(query, [
        status,
        chainTxHash || null,
        confirmedAt,
        paymentId
    ]);
    if (!result) {
        return null;
    }
    return mapRowToPayment(result);
}
async function listPayments(filters) {
    const db = getDb();
    const conditions = [];
    const params = [];
    let paramIndex = 1;
    if (filters.agentId) {
        conditions.push(`agent_id = $${paramIndex++}`);
        params.push(filters.agentId);
    }
    if (filters.status) {
        conditions.push(`status = $${paramIndex++}`);
        params.push(filters.status);
    }
    if (filters.from) {
        conditions.push(`created_at >= $${paramIndex++}`);
        params.push(filters.from);
    }
    if (filters.to) {
        conditions.push(`created_at <= $${paramIndex++}`);
        params.push(filters.to);
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const limitClause = filters.limit ? `LIMIT $${paramIndex++}` : '';
    if (filters.limit) params.push(filters.limit);
    const offsetClause = filters.offset ? `OFFSET $${paramIndex++}` : '';
    if (filters.offset) params.push(filters.offset);
    const query = `
    SELECT * FROM x402_payments
    ${whereClause}
    ORDER BY created_at DESC
    ${limitClause}
    ${offsetClause}
  `;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQuery"])(query, params);
    return result.map(mapRowToPayment);
}
async function createRevenueShare(agentId, paymentId, grossAmount, feeAmount, shareAmount) {
    const db = getDb();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
    const now = new Date();
    const revenueShare = {
        id,
        agent_id: agentId,
        payment_id: paymentId,
        gross_amount: grossAmount,
        fee_amount: feeAmount,
        share_amount: shareAmount,
        settlement_tx_hash: null,
        status: 'pending',
        created_at: now,
        updated_at: now
    };
    const query = `
    INSERT INTO agent_revenue_shares (
      id, agent_id, payment_id, gross_amount, fee_amount, share_amount, settlement_tx_hash, status, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `;
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQueryOne"])(query, [
        revenueShare.id,
        revenueShare.agent_id,
        revenueShare.payment_id,
        revenueShare.gross_amount,
        revenueShare.fee_amount,
        revenueShare.share_amount,
        revenueShare.settlement_tx_hash,
        revenueShare.status,
        revenueShare.created_at,
        revenueShare.updated_at
    ]);
    if (!result) throw new Error('Failed to create revenue share');
    return mapRowToRevenueShare(result);
}
async function getRevenueShares(agentId) {
    const db = getDb();
    const query = 'SELECT * FROM agent_revenue_shares WHERE agent_id = $1 ORDER BY created_at DESC';
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$query$2d$helper$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQuery"])(query, [
        agentId
    ]);
    return result.map(mapRowToRevenueShare);
}
// Helper functions to map database rows to types
function mapRowToAgent(row) {
    return {
        id: row.id,
        owner_user_id: row.owner_user_id,
        name: row.name,
        description: row.description,
        status: row.status,
        x402_identity: row.x402_identity,
        x402_endpoint: row.x402_endpoint,
        chain: row.chain,
        created_at: new Date(row.created_at),
        updated_at: new Date(row.updated_at)
    };
}
function mapRowToRouteConfig(row) {
    return {
        id: row.id,
        agent_id: row.agent_id,
        chain: row.chain,
        stablecoin: row.stablecoin,
        fee_bps: row.fee_bps,
        revenue_share_bps: row.revenue_share_bps,
        min_amount: row.min_amount,
        max_amount: row.max_amount,
        status: row.status,
        created_at: new Date(row.created_at),
        updated_at: new Date(row.updated_at)
    };
}
function mapRowToPayment(row) {
    return {
        id: row.id,
        agent_id: row.agent_id,
        route_config_id: row.route_config_id,
        direction: row.direction,
        amount: row.amount,
        currency: row.currency,
        chain: row.chain,
        chain_tx_hash: row.chain_tx_hash,
        status: row.status,
        meta: row.meta ? typeof row.meta === 'string' ? JSON.parse(row.meta) : row.meta : null,
        created_at: new Date(row.created_at),
        confirmed_at: row.confirmed_at ? new Date(row.confirmed_at) : null
    };
}
function mapRowToRevenueShare(row) {
    return {
        id: row.id,
        agent_id: row.agent_id,
        payment_id: row.payment_id,
        gross_amount: row.gross_amount,
        fee_amount: row.fee_amount,
        share_amount: row.share_amount,
        settlement_tx_hash: row.settlement_tx_hash,
        status: row.status,
        created_at: new Date(row.created_at),
        updated_at: new Date(row.updated_at)
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/x402-agents/aggregation.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// x402 Agent Aggregation Helpers
// =============================================================================
// Pure functions to calculate summary statistics
__turbopack_context__.s([
    "computeAgentSummary",
    ()=>computeAgentSummary,
    "computeGlobalSummary",
    ()=>computeGlobalSummary,
    "computeRevenueSummary",
    ()=>computeRevenueSummary
]);
function computeAgentSummary(args) {
    const { payments, revenueShares, agentId } = args;
    // Filter to this agent's confirmed payments
    const agentPayments = payments.filter((p)=>p.agent_id === agentId && p.status === 'confirmed');
    // Sum total volume (all confirmed payments)
    const totalVolume = agentPayments.reduce((sum, p)=>{
        return (BigInt(sum) + BigInt(p.amount)).toString();
    }, '0');
    // Count total payments
    const totalPayments = agentPayments.length;
    // Sum total fees from revenue shares
    const agentRevenueShares = revenueShares.filter((rs)=>rs.agent_id === agentId);
    const totalFees = agentRevenueShares.reduce((sum, rs)=>{
        return (BigInt(sum) + BigInt(rs.fee_amount)).toString();
    }, '0');
    // Sum total revenue shared
    const totalRevenueShared = agentRevenueShares.reduce((sum, rs)=>{
        return (BigInt(sum) + BigInt(rs.share_amount)).toString();
    }, '0');
    return {
        agentId,
        totalVolume,
        totalPayments,
        totalFees,
        totalRevenueShared
    };
}
function computeGlobalSummary(args) {
    const { payments } = args;
    // Filter to last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentPayments = payments.filter((p)=>p.status === 'confirmed' && new Date(p.created_at) >= thirtyDaysAgo);
    // Sum total volume
    const totalVolume30d = recentPayments.reduce((sum, p)=>{
        return (BigInt(sum) + BigInt(p.amount)).toString();
    }, '0');
    // Count total payments
    const totalPayments30d = recentPayments.length;
    // Group by agent and calculate volume per agent
    const agentVolumes = new Map();
    for (const payment of recentPayments){
        const current = agentVolumes.get(payment.agent_id) || BigInt(0);
        agentVolumes.set(payment.agent_id, current + BigInt(payment.amount));
    }
    // Sort by volume and get top 10
    const topAgents = Array.from(agentVolumes.entries()).map(([agentId, volume])=>({
            agentId,
            volume: volume.toString()
        })).sort((a, b)=>{
        const aBig = BigInt(a.volume);
        const bBig = BigInt(b.volume);
        if (aBig > bBig) return -1;
        if (aBig < bBig) return 1;
        return 0;
    }).slice(0, 10);
    return {
        totalVolume30d,
        totalPayments30d,
        topAgentsByVolume: topAgents
    };
}
function computeRevenueSummary(args) {
    const { payments, revenueShares, agentId } = args;
    // Filter to this agent's confirmed payments
    const agentPayments = payments.filter((p)=>p.agent_id === agentId && p.status === 'confirmed');
    // Sum total volume
    const totalVolume = agentPayments.reduce((sum, p)=>{
        return (BigInt(sum) + BigInt(p.amount)).toString();
    }, '0');
    // Filter revenue shares for this agent
    const agentRevenueShares = revenueShares.filter((rs)=>rs.agent_id === agentId);
    // Sum total fees
    const totalFees = agentRevenueShares.reduce((sum, rs)=>{
        return (BigInt(sum) + BigInt(rs.fee_amount)).toString();
    }, '0');
    // Sum total revenue shared
    const totalRevenueShared = agentRevenueShares.reduce((sum, rs)=>{
        return (BigInt(sum) + BigInt(rs.share_amount)).toString();
    }, '0');
    // Count pending settlements
    const pendingSettlementCount = agentRevenueShares.filter((rs)=>rs.status === 'pending').length;
    return {
        totalVolume,
        totalFees,
        totalRevenueShared,
        pendingSettlementCount
    };
}
}),
"[project]/src/app/api/v1/x402/agents/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// x402 Agent Detail API Routes
// =============================================================================
__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$x402$2d$agents$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/x402-agents.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$x402$2d$agents$2f$aggregation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/x402-agents/aggregation.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$x402$2d$agents$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$x402$2d$agents$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
async function GET(request, { params }) {
    const { id: agentId } = await params; // Next.js 15+ requires awaiting params
    try {
        const authResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireAuth"])(request, 'user');
        if ('response' in authResult) {
            return authResult.response;
        }
        const { apiKey } = authResult;
        const ownerUserId = apiKey.userId || apiKey.id;
        // Get agent
        const agent = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$x402$2d$agents$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAgent"])(agentId);
        if (!agent) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Agent not found',
                code: 'NOT_FOUND'
            }, {
                status: 404
            });
        }
        // Verify ownership
        if (agent.owner_user_id !== ownerUserId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Forbidden',
                code: 'FORBIDDEN'
            }, {
                status: 403
            });
        }
        // Get route configs
        const routeConfigs = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$x402$2d$agents$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRouteConfigs"])(agentId);
        // Get payments and revenue shares
        const payments = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$x402$2d$agents$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listPayments"])({
            agentId
        });
        const revenueShares = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$x402$2d$agents$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRevenueShares"])(agentId);
        // Calculate summaries
        const summary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$x402$2d$agents$2f$aggregation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeAgentSummary"])({
            payments,
            revenueShares,
            agentId
        });
        const revenueSummary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$x402$2d$agents$2f$aggregation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeRevenueSummary"])({
            payments,
            revenueShares,
            agentId
        });
        // Filter to last 30 days for 30d stats
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentPayments = payments.filter((p)=>p.status === 'confirmed' && new Date(p.created_at) >= thirtyDaysAgo);
        const recentRevenueShares = revenueShares.filter((rs)=>new Date(rs.created_at) >= thirtyDaysAgo);
        const summary30d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$x402$2d$agents$2f$aggregation$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeAgentSummary"])({
            payments: recentPayments,
            revenueShares: recentRevenueShares,
            agentId
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            agent,
            routeConfigs,
            summary: {
                totalVolume: summary.totalVolume,
                totalPayments: summary.totalPayments,
                totalFees: summary.totalFees,
                totalRevenueShared: summary.totalRevenueShared,
                volume30d: summary30d.totalVolume,
                payments30d: summary30d.totalPayments
            },
            revenue: revenueSummary
        });
    } catch (error) {
        console.error('[x402/agents/:id] GET error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message || 'Failed to get agent',
            code: 'INTERNAL_ERROR'
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1fadcdf9._.js.map