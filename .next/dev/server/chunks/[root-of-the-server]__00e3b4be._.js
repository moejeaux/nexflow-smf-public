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
    // Plans table - subscription plans
    db.exec(`
    CREATE TABLE IF NOT EXISTS plans (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      daily_limit INTEGER NOT NULL DEFAULT 1000,
      monthly_limit INTEGER NOT NULL DEFAULT 10000,
      price_cents INTEGER NOT NULL DEFAULT 0,
      features TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
    // Accounts table - user accounts
    db.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT,
      status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'deleted')),
      email_verified INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
    // Account plans table - links accounts to their current plan
    db.exec(`
    CREATE TABLE IF NOT EXISTS account_plans (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      account_id TEXT NOT NULL REFERENCES accounts(id),
      plan_id TEXT NOT NULL REFERENCES plans(id),
      daily_limit INTEGER NOT NULL DEFAULT 1000,
      monthly_limit INTEGER NOT NULL DEFAULT 10000,
      started_at TEXT NOT NULL DEFAULT (datetime('now')),
      ends_at TEXT,
      is_current INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
    // Account indexes
    db.exec(`
    CREATE INDEX IF NOT EXISTS idx_accounts_email ON accounts(email);
    CREATE INDEX IF NOT EXISTS idx_accounts_status ON accounts(status);
    CREATE INDEX IF NOT EXISTS idx_account_plans_account_id ON account_plans(account_id);
  `);
    // Seed default plans if empty
    const planCount = db.prepare('SELECT COUNT(*) as count FROM plans').get();
    if (planCount.count === 0) {
        db.exec(`
      INSERT INTO plans (id, name, description, daily_limit, monthly_limit, price_cents, features) VALUES
      ('free', 'Free', 'Free tier for getting started', 1000, 10000, 0, '["1,000 API calls/day","10,000 API calls/month","Basic analytics","Community support"]'),
      ('starter', 'Starter', 'For small projects', 10000, 100000, 2900, '["10,000 API calls/day","100,000 API calls/month","Full analytics","Email support","Webhook notifications"]'),
      ('pro', 'Pro', 'For growing businesses', 100000, 1000000, 9900, '["100,000 API calls/day","1,000,000 API calls/month","Advanced analytics","Priority support","Custom webhooks","API key management"]'),
      ('enterprise', 'Enterprise', 'Custom solutions', 999999999, 999999999, 0, '["Unlimited API calls","Custom SLAs","Dedicated support","Custom integrations","On-premise deployment"]')
    `);
    }
    // Cron job runs table - tracks execution of scheduled jobs
    db.exec(`
    CREATE TABLE IF NOT EXISTS cron_job_runs (
      id TEXT PRIMARY KEY,
      job_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'timeout')),
      started_at TEXT NOT NULL DEFAULT (datetime('now')),
      completed_at TEXT,
      duration_ms INTEGER,
      trigger_source TEXT NOT NULL DEFAULT 'cron' CHECK (trigger_source IN ('cron', 'manual', 'retry')),
      attempt_number INTEGER NOT NULL DEFAULT 1,
      input_params TEXT,
      output_summary TEXT,
      error_message TEXT,
      error_stack TEXT,
      metadata TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
    // Cron job config table - configuration for each job
    db.exec(`
    CREATE TABLE IF NOT EXISTS cron_job_config (
      job_id TEXT PRIMARY KEY,
      display_name TEXT NOT NULL,
      description TEXT,
      schedule TEXT,
      enabled INTEGER NOT NULL DEFAULT 1,
      timeout_ms INTEGER NOT NULL DEFAULT 60000,
      max_retries INTEGER NOT NULL DEFAULT 0,
      retry_delay_ms INTEGER NOT NULL DEFAULT 5000,
      alert_on_failure INTEGER NOT NULL DEFAULT 1,
      consecutive_failures INTEGER NOT NULL DEFAULT 0,
      last_success_at TEXT,
      last_failure_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
    // Indexes for cron job tables
    db.exec(`
    CREATE INDEX IF NOT EXISTS idx_cron_job_runs_job_id ON cron_job_runs(job_id);
    CREATE INDEX IF NOT EXISTS idx_cron_job_runs_status ON cron_job_runs(status);
    CREATE INDEX IF NOT EXISTS idx_cron_job_runs_started_at ON cron_job_runs(started_at);
    CREATE INDEX IF NOT EXISTS idx_cron_job_runs_job_status ON cron_job_runs(job_id, status);
    CREATE INDEX IF NOT EXISTS idx_cron_job_runs_created_at ON cron_job_runs(created_at);
  `);
    // Seed default job configurations if table is empty
    const configCount = db.prepare('SELECT COUNT(*) as count FROM cron_job_config').get();
    if (configCount.count === 0) {
        db.exec(`
      INSERT INTO cron_job_config (job_id, display_name, description, schedule, timeout_ms, max_retries, alert_on_failure) VALUES
      ('dogfood', 'Dogfood Agent', 'Exercises NexFlow routes end-to-end', '*/5 * * * *', 30000, 0, 1),
      ('scout', 'Scout Agent', 'Tests under-used facilitator routes', '*/15 * * * *', 60000, 0, 1),
      ('coord', 'Coordinator Agent', 'Runs AI optimization loop', '0 */2 * * *', 120000, 1, 1),
      ('recommendation-applier', 'Recommendation Applier', 'Applies agent recommendations', '*/10 * * * *', 60000, 1, 1),
      ('pull-metrics', 'Metrics Puller', 'Fetches external metrics', '0 */4 * * *', 120000, 2, 1),
      ('social-reply', 'Social Reply', 'Processes social reply queue', '*/15 * * * *', 60000, 0, 1),
      ('house-x402-job', 'House x402', 'Internal x402 traffic', '*/10 * * * *', 30000, 0, 0),
      ('crawl-actions', 'Action Crawler', 'Crawls discovery actions', '0 */6 * * *', 300000, 1, 1),
      ('x402-discovery', 'x402 Discovery', 'Discovers new x402 resources', '0 0 * * *', 600000, 1, 1),
      ('facilitator-probes', 'Facilitator Probes', 'Health checks for payment facilitators', '*/5 * * * *', 30000, 0, 1)
    `);
    }
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
    /**
   * Generic query method for raw SQL
   * SQLite implementation using better-sqlite3
   */ async query(text, params) {
        // Convert PostgreSQL-style $1, $2 placeholders to SQLite-style ?
        let sqliteQuery = text;
        if (params && params.length > 0) {
            sqliteQuery = text.replace(/\$(\d+)/g, ()=>'?');
        }
        // Determine if this is a SELECT query or a modification query
        const isSelect = /^\s*SELECT/i.test(sqliteQuery.trim());
        try {
            if (isSelect) {
                const rows = this.db.prepare(sqliteQuery).all(...params || []);
                return {
                    rows,
                    rowCount: rows.length
                };
            } else {
                const result = this.db.prepare(sqliteQuery).run(...params || []);
                return {
                    rows: [],
                    rowCount: result.changes
                };
            }
        } catch (error) {
            console.error('[SQLite] Query error:', error.message);
            console.error('[SQLite] Original query:', text);
            console.error('[SQLite] Converted query:', sqliteQuery);
            throw error;
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
   * Public interface for raw SQL queries
   */ async query(text, params) {
        const result = await this.queryWithTimeout(text, params);
        return {
            rows: result.rows,
            rowCount: result.rowCount
        };
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
    ()=>getPoolStats,
    "isPostgres",
    ()=>isPostgres
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
function isPostgres(db) {
    return db && (db instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$adapters$2f$postgres$2d$adapter$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostgresAdapter"] || 'pool' in db || typeof db?.pool?.query === 'function');
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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
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
    // Validate token format (nf_live_... or nf_test_...)
    if (!token.startsWith('nf_live_') && !token.startsWith('nf_test_')) {
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
"[project]/src/lib/schemas/endpoint.schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// ENDPOINT SCHEMAS
// =============================================================================
// Zod schemas for endpoint creation and updates
__turbopack_context__.s([
    "createEndpointSchema",
    ()=>createEndpointSchema,
    "endpointIdSchema",
    ()=>endpointIdSchema,
    "updateEndpointSchema",
    ()=>updateEndpointSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
const createEndpointSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters').regex(/^[a-zA-Z0-9\s_-]+$/, 'Name can only contain letters, numbers, spaces, hyphens, and underscores'),
    upstreamUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url('Must be a valid URL').max(2048, 'URL must be less than 2048 characters').refine((url)=>{
        // Ensure URL uses http or https
        return url.startsWith('http://') || url.startsWith('https://');
    }, 'URL must use http:// or https://'),
    price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d+$/, 'Price must be a positive integer in smallest units').refine((val)=>{
        const num = BigInt(val);
        const zero = BigInt(0);
        const max = BigInt('1000000000000000000');
        return num > zero && num <= max; // Max 1M tokens
    }, 'Price must be between 1 and 1000000000000000000').optional().default('1000000'),
    network: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Network is required').max(50, 'Network must be less than 50 characters').refine((val)=>{
        // Accept legacy network names or CAIP-2 identifiers
        return val.includes(':') ? /^[a-z0-9]+:[a-z0-9]+$/i.test(val) : true;
    }, 'Network must be a legacy name (e.g., "base") or CAIP-2 identifier (e.g., "eip155:8453")').optional().default('base'),
    asset: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^0x[a-fA-F0-9]{40}$/, 'Asset must be a valid Ethereum address').or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^[a-zA-Z0-9_-]+$/, 'Asset must be alphanumeric')).or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^[a-z0-9]+:[a-z0-9]+\/[a-z0-9]+:[a-z0-9]+$/i, 'Asset must be a CAIP-19 identifier (e.g., "eip155:8453/erc20:0x...")')).optional().default('0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(500, 'Description must be less than 500 characters').optional(),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional(),
    // Metered endpoint pricing fields
    pricePerCall: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d+\.?\d*$/, 'Price per call must be a decimal number').refine((val)=>parseFloat(val) >= 0 && parseFloat(val) <= 1000, 'Price per call must be between 0 and 1000').optional().default('0.001'),
    platformFeeBps: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int('Platform fee must be an integer').min(0, 'Platform fee cannot be negative').max(10000, 'Platform fee cannot exceed 100%').optional().default(200),
    recipientAddress: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^0x[a-fA-F0-9]{40}$/, 'Recipient must be a valid Ethereum address')
});
const updateEndpointSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters').regex(/^[a-zA-Z0-9\s_-]+$/, 'Name can only contain letters, numbers, spaces, hyphens, and underscores').optional(),
    upstreamUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url('Must be a valid URL').max(2048, 'URL must be less than 2048 characters').refine((url)=>{
        return url.startsWith('http://') || url.startsWith('https://');
    }, 'URL must use http:// or https://').optional(),
    price: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^\d+$/, 'Price must be a positive integer in smallest units').refine((val)=>{
        const num = BigInt(val);
        const zero = BigInt(0);
        const max = BigInt('1000000000000000000');
        return num > zero && num <= max;
    }, 'Price must be between 1 and 1000000000000000000').optional(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(500, 'Description must be less than 500 characters').optional(),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional(),
    enabled: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().optional()
}).strict().refine((data)=>Object.keys(data).length > 0, 'At least one field must be provided for update');
const endpointIdSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^ep_\d+_[a-z0-9]+$/, 'Invalid endpoint ID format').max(100, 'Endpoint ID too long');
}),
"[project]/src/lib/schemas/api-key.schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// API KEY SCHEMAS
// =============================================================================
// Zod schemas for API key operations
__turbopack_context__.s([
    "apiKeyIdSchema",
    ()=>apiKeyIdSchema,
    "createApiKeySchema",
    ()=>createApiKeySchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
const createApiKeySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters').regex(/^[a-zA-Z0-9\s_-]+$/, 'Name can only contain letters, numbers, spaces, hyphens, and underscores'),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        'admin',
        'user',
        'read-only'
    ], {
        errorMap: ()=>({
                message: 'Role must be admin, user, or read-only'
            })
    }),
    rateLimit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int('Rate limit must be an integer').min(1, 'Rate limit must be at least 1').max(1000000, 'Rate limit must be less than 1,000,000').optional(),
    expiresAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().datetime('Must be a valid ISO datetime string').optional(),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional()
}).strict();
const apiKeyIdSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^ak_[a-z0-9]+$/, 'Invalid API key ID format').max(100, 'API key ID too long');
}),
"[project]/src/lib/schemas/payment.schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// PAYMENT SCHEMAS
// =============================================================================
// Zod schemas for payment verification
__turbopack_context__.s([
    "paymentHeaderSchema",
    ()=>paymentHeaderSchema,
    "paymentVerificationSchema",
    ()=>paymentVerificationSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
const paymentHeaderSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(10, 'Payment header too short').max(10000, 'Payment header too long').refine((val)=>val.startsWith('x402 ') || val.startsWith('exact '), 'Payment header must start with "x402 " or "exact "').refine((val)=>{
    const parts = val.split(' ');
    if (parts.length < 2) return false;
    // Check if second part is valid base64
    const base64Part = parts.slice(1).join(' ');
    try {
        atob(base64Part);
        return true;
    } catch  {
        return false;
    }
}, 'Payment header must contain valid base64-encoded payment data');
const paymentVerificationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    paymentHeader: paymentHeaderSchema,
    endpointId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().regex(/^ep_\d+_[a-z0-9]+$/, 'Invalid endpoint ID format').optional(),
    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()).optional()
}).strict();
}),
"[project]/src/lib/schemas/index.ts [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// SCHEMA EXPORTS
// =============================================================================
// Central export for all Zod schemas
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schemas$2f$endpoint$2e$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/schemas/endpoint.schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schemas$2f$api$2d$key$2e$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/schemas/api-key.schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schemas$2f$payment$2e$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/schemas/payment.schema.ts [app-route] (ecmascript)");
;
;
;
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
"[project]/src/lib/validate-request.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// REQUEST VALIDATION MIDDLEWARE
// =============================================================================
// Helper functions for validating requests with Zod schemas
__turbopack_context__.s([
    "createValidationErrorResponse",
    ()=>createValidationErrorResponse,
    "validateQueryParams",
    ()=>validateQueryParams,
    "validateRequestBody",
    ()=>validateRequestBody,
    "validateUrlParam",
    ()=>validateUrlParam
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'RequestValidator'
});
async function validateRequestBody(request, schema) {
    try {
        const body = await request.json();
        const data = schema.parse(body);
        return {
            valid: true,
            data
        };
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            const errors = error.errors.map((err)=>({
                    field: err.path.join('.'),
                    message: err.message,
                    code: err.code
                }));
            logger.warn({
                errors,
                path: request.nextUrl.pathname
            }, 'Request validation failed');
            return {
                valid: false,
                errors,
                statusCode: 422
            };
        }
        // JSON parse error or other error
        logger.error({
            error
        }, 'Failed to parse request body');
        return {
            valid: false,
            errors: [
                {
                    field: 'body',
                    message: 'Invalid JSON in request body',
                    code: 'invalid_json'
                }
            ],
            statusCode: 400
        };
    }
}
function validateUrlParam(param, schema) {
    const paramValue = Array.isArray(param) ? param[0] : param;
    if (!paramValue) {
        return {
            valid: false,
            errors: [
                {
                    field: 'param',
                    message: 'Required parameter is missing',
                    code: 'missing_param'
                }
            ],
            statusCode: 400
        };
    }
    try {
        const data = schema.parse(paramValue);
        return {
            valid: true,
            data
        };
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            const errors = error.errors.map((err)=>({
                    field: err.path.join('.'),
                    message: err.message,
                    code: err.code
                }));
            return {
                valid: false,
                errors,
                statusCode: 400
            };
        }
        return {
            valid: false,
            errors: [
                {
                    field: 'param',
                    message: 'Invalid parameter format',
                    code: 'invalid_param'
                }
            ],
            statusCode: 400
        };
    }
}
function validateQueryParams(request, schema) {
    try {
        const params = Object.fromEntries(request.nextUrl.searchParams.entries());
        const data = schema.parse(params);
        return {
            valid: true,
            data
        };
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            const errors = error.errors.map((err)=>({
                    field: err.path.join('.'),
                    message: err.message,
                    code: err.code
                }));
            return {
                valid: false,
                errors,
                statusCode: 400
            };
        }
        return {
            valid: false,
            errors: [
                {
                    field: 'query',
                    message: 'Invalid query parameters',
                    code: 'invalid_query'
                }
            ],
            statusCode: 400
        };
    }
}
function createValidationErrorResponse(result) {
    return Response.json({
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: result.errors
    }, {
        status: result.statusCode
    });
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
"[project]/src/lib/request-logging.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// Request Logging Helper
// =============================================================================
// Provides helpers for consistent request logging across all API routes
__turbopack_context__.s([
    "createErrorResponse",
    ()=>createErrorResponse,
    "extractRequestContext",
    ()=>extractRequestContext,
    "logRequestCompletion",
    ()=>logRequestCompletion,
    "wrapResponse",
    ()=>wrapResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/request-id.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sentry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sentry.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$api$2d$keys$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/api-keys.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$api$2d$keys$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$api$2d$keys$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
async function extractRequestContext(request, endpoint) {
    const requestId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOrCreateRequestId"])(request);
    const ip = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || undefined;
    // Try to get API key ID for context
    let apiKeyId;
    try {
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractApiKey"])(request);
        if (token) {
            const apiKey = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$api$2d$keys$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findApiKeyByToken"])(token);
            if (apiKey) {
                apiKeyId = apiKey.id;
            }
        }
    } catch  {
    // Ignore errors when extracting API key (not critical for logging)
    }
    // Set Sentry context
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sentry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setSentryContext"])({
        requestId,
        apiKeyId,
        endpoint: endpoint || request.nextUrl.pathname,
        method: request.method
    });
    return {
        requestId,
        apiKeyId,
        endpoint: endpoint || request.nextUrl.pathname,
        method: request.method,
        ip,
        startTime: Date.now()
    };
}
function logRequestCompletion(ctx, statusCode, error) {
    const duration = Date.now() - ctx.startTime;
    const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRequestLogger"])(ctx.requestId, {
        method: ctx.method,
        endpoint: ctx.endpoint,
        ip: ctx.ip
    });
    const logContext = {
        requestId: ctx.requestId,
        apiKeyId: ctx.apiKeyId,
        endpoint: ctx.endpoint,
        method: ctx.method,
        statusCode,
        durationMs: duration,
        ip: ctx.ip
    };
    if (error) {
        logContext.error = error;
        logContext.errorCode = error.code || 'UNKNOWN_ERROR';
        logContext.stack = error.stack;
        logger.error(logContext, `Request failed: ${ctx.method} ${ctx.endpoint}`);
        // Capture in Sentry
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sentry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["captureException"])(error, {
            requestId: ctx.requestId,
            apiKeyId: ctx.apiKeyId,
            endpoint: ctx.endpoint
        });
    } else {
        logger.info(logContext, `Request completed: ${ctx.method} ${ctx.endpoint}`);
    }
}
function wrapResponse(response, ctx, error) {
    // Add request ID to response
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addRequestIdToResponse"])(response, ctx.requestId);
    // Log completion
    logRequestCompletion(ctx, response.status, error);
    return response;
}
function createErrorResponse(ctx, error, statusCode = 500, code) {
    const errorObj = error instanceof Error ? error : new Error(error);
    const errorCode = code || errorObj.code || 'INTERNAL_ERROR';
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: errorObj.message,
        code: errorCode,
        requestId: ctx.requestId
    }, {
        status: statusCode
    });
    return wrapResponse(response, ctx, errorObj);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/api/v1/endpoints/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schemas$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/schemas/index.ts [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schemas$2f$endpoint$2e$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/schemas/endpoint.schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validate$2d$request$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validate-request.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$unified$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rate-limit-unified.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$logging$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/request-logging.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$logging$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$logging$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'EndpointsAPI'
});
;
async function POST(request) {
    const ctx = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$logging$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractRequestContext"])(request, '/api/v1/endpoints');
    try {
        // Check rate limit (per API key)
        const rateLimitResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$unified$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimitByApiKey"])(request);
        if (rateLimitResult && !rateLimitResult.allowed) {
            logger.warn({
                apiKeyId: ctx.apiKeyId,
                limit: rateLimitResult.limit
            }, 'Rate limit exceeded');
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$logging$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["wrapResponse"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$unified$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRateLimitResponse"])(rateLimitResult), ctx);
        }
        // Require authentication
        const authResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireAuth"])(request, 'user');
        if ('response' in authResult) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$logging$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["wrapResponse"])(authResult.response, ctx);
        }
        const { apiKey } = authResult;
        // Update context with API key ID
        ctx.apiKeyId = apiKey.id;
        // Validate request body with Zod schema
        const validation = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validate$2d$request$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateRequestBody"])(request, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$schemas$2f$endpoint$2e$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createEndpointSchema"]);
        if (!validation.valid) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validate$2d$request$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createValidationErrorResponse"])(validation);
        }
        const { name, description, upstreamUrl, price = '1000000', network = 'base', asset, pricePerCall = '0.001', platformFeeBps = 200, recipientAddress } = validation.data;
        // Validate that recipient is not the USDC contract (blacklisted)
        const USDC_CONTRACT = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
        if (recipientAddress.toLowerCase() === USDC_CONTRACT.toLowerCase()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid recipient address',
                code: 'VALIDATION_ERROR',
                details: [
                    {
                        field: 'recipientAddress',
                        message: 'Cannot be the USDC contract address (blacklisted). Use your wallet address instead.',
                        code: 'blacklisted'
                    }
                ]
            }, {
                status: 400
            });
        }
        // Use asset from schema or default
        const tokenAddress = asset || '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
        const tokenSymbol = 'USDC';
        const chainId = 8453;
        // Create endpoint (use API key ID as createdBy, link to account)
        const endpoint = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createEndpoint"])({
            name,
            description,
            upstreamUrl,
            price: price.toString(),
            network,
            tokenAddress,
            tokenSymbol,
            chainId,
            recipientAddress,
            status: 'active',
            createdBy: apiKey.id
        });
        // Update endpoint with pricing fields and account link using raw query
        const db = await __turbopack_context__.A("[project]/src/db/client.ts [app-route] (ecmascript, async loader)").then((m)=>m.getDb());
        await db.query(`
      UPDATE endpoints 
      SET price_per_call = $1, platform_fee_bps = $2, account_id = $3
      WHERE id = $4
    `, [
            pricePerCall,
            platformFeeBps,
            apiKey.userId,
            endpoint.id
        ]);
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            endpoint: {
                ...endpoint,
                pricePerCall,
                platformFeeBps,
                accountId: apiKey.userId
            }
        });
        // Add rate limit headers
        if (rateLimitResult) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$unified$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addRateLimitHeaders"])(response, rateLimitResult);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$logging$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["wrapResponse"])(response, ctx);
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$logging$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])(ctx, error instanceof Error ? error : new Error('Failed to create endpoint'), 500, 'INTERNAL_ERROR');
    }
}
async function GET(request) {
    const ctx = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$logging$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractRequestContext"])(request, '/api/v1/endpoints');
    try {
        // Check rate limit (per API key)
        const rateLimitResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$unified$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimitByApiKey"])(request);
        if (rateLimitResult && !rateLimitResult.allowed) {
            logger.warn({
                apiKeyId: ctx.apiKeyId,
                limit: rateLimitResult.limit
            }, 'Rate limit exceeded');
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$logging$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["wrapResponse"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$unified$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createRateLimitResponse"])(rateLimitResult), ctx);
        }
        // Require authentication
        const authResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireAuth"])(request, 'read-only');
        if ('response' in authResult) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$logging$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["wrapResponse"])(authResult.response, ctx);
        }
        // Update context with API key ID
        ctx.apiKeyId = authResult.apiKey.id;
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const createdBy = searchParams.get('createdBy');
        const filters = {};
        if (status) filters.status = status;
        if (createdBy) filters.createdBy = createdBy;
        const endpoints = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listEndpoints"])(filters);
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            endpoints,
            count: endpoints.length
        });
        // Add rate limit headers
        if (rateLimitResult) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rate$2d$limit$2d$unified$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addRateLimitHeaders"])(response, rateLimitResult);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$logging$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["wrapResponse"])(response, ctx);
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$request$2d$logging$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createErrorResponse"])(ctx, error instanceof Error ? error : new Error('Failed to list endpoints'), 500, 'INTERNAL_ERROR');
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__00e3b4be._.js.map