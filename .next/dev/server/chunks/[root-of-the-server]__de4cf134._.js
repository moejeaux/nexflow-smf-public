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
    const appUrl = ("TURBOPACK compile-time value", "https://www.nexflowapp.app");
    const baseUrl = appUrl || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'http://localhost:3001');
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
                    const appUrl = ("TURBOPACK compile-time value", "https://www.nexflowapp.app");
                    const baseUrl = appUrl || (("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'http://localhost:3001');
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
"[project]/src/app/api/x402/metrics/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// =============================================================================
// X402 METRICS API
// =============================================================================
// Public API endpoint for x402 health and metrics
// Feeds the public metrics dashboard
__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$x402$2d$call$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/x402-call-log.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/metered-endpoints.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$cdp$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/integrations/x402/cdp-facilitator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$x402$2d$call$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$x402$2d$call$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'X402Metrics'
});
async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const endpointId = searchParams.get('endpointId') || undefined;
        const hours = parseInt(searchParams.get('hours') || '24', 10);
        // Calculate time window
        const now = new Date();
        const startDate = new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
        // Get usage logs with safe defaults
        let usageLogs = [];
        try {
            const logsResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listUsageLogs"])({
                endpointId
            });
            usageLogs = Array.isArray(logsResult) ? logsResult : [];
        } catch (error) {
            logger.warn('Failed to fetch usage logs', {
                error,
                endpointId
            });
            usageLogs = [];
        }
        if (!Array.isArray(usageLogs)) {
            logger.warn('Usage logs is not an array', {
                type: typeof usageLogs,
                endpointId
            });
            usageLogs = [];
        }
        const recentLogs = usageLogs.filter((log)=>log && log.timestamp && log.timestamp >= startDate);
        // Get x402 call logs for facilitator breakdown with safe defaults
        let x402Logs = [];
        try {
            if (endpointId) {
                const logsResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$x402$2d$call$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getX402CallLogs"])(endpointId, {
                    startDate
                });
                x402Logs = Array.isArray(logsResult) ? logsResult : [];
            } else {
                // Get all endpoints and fetch logs for each
                const endpointsResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listEndpoints"])();
                const endpoints = Array.isArray(endpointsResult) ? endpointsResult : [];
                if (endpoints.length === 0) {
                    logger.debug('No endpoints found for metrics query');
                    x402Logs = [];
                } else {
                    const logPromises = endpoints.map(async (ep)=>{
                        try {
                            const endpointLogs = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$x402$2d$call$2d$log$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getX402CallLogs"])(ep.id, {
                                startDate,
                                limit: 1000
                            });
                            return Array.isArray(endpointLogs) ? endpointLogs : [];
                        } catch (error) {
                            logger.warn('Failed to fetch x402 logs for endpoint', {
                                endpointId: ep.id,
                                error
                            });
                            return [];
                        }
                    });
                    const logArrays = await Promise.all(logPromises);
                    x402Logs = logArrays.flat().filter((log)=>log != null);
                }
            }
        } catch (error) {
            logger.error('Failed to fetch x402 call logs', {
                error,
                endpointId
            });
            x402Logs = [];
        }
        if (!Array.isArray(x402Logs)) {
            logger.warn('X402 logs is not an array', {
                type: typeof x402Logs,
                endpointId
            });
            x402Logs = [];
        }
        // Calculate metrics with safe defaults
        const totalRequests = recentLogs.length;
        const successfulRequests = recentLogs.filter((log)=>log && log.statusCode === 200).length;
        const failedRequests = recentLogs.filter((log)=>log && log.statusCode >= 400).length;
        const paymentRequiredRequests = recentLogs.filter((log)=>log && log.statusCode === 402).length;
        // Facilitator breakdown with safe iteration
        const facilitatorCounts = {};
        if (Array.isArray(x402Logs)) {
            x402Logs.forEach((log)=>{
                if (log && log.facilitator) {
                    facilitatorCounts[log.facilitator] = (facilitatorCounts[log.facilitator] || 0) + 1;
                }
            });
        }
        // Error breakdown with safe iteration
        const errorCounts = {};
        if (Array.isArray(recentLogs)) {
            recentLogs.forEach((log)=>{
                if (log && log.failureCode) {
                    errorCounts[log.failureCode] = (errorCounts[log.failureCode] || 0) + 1;
                }
            });
        }
        // Average response time with safe defaults
        const avgResponseTime = recentLogs.length > 0 && Array.isArray(recentLogs) ? recentLogs.reduce((sum, log)=>{
            const responseTime = log && typeof log.responseTime === 'number' ? log.responseTime : 0;
            return sum + responseTime;
        }, 0) / recentLogs.length : 0;
        // P95 response time with safe defaults
        const sortedResponseTimes = Array.isArray(recentLogs) ? recentLogs.map((log)=>log && typeof log.responseTime === 'number' ? log.responseTime : 0).filter((rt)=>rt >= 0).sort((a, b)=>a - b) : [];
        const p95Index = sortedResponseTimes.length > 0 ? Math.floor(sortedResponseTimes.length * 0.95) : 0;
        const p95ResponseTime = sortedResponseTimes[p95Index] || 0;
        // Check CDP health
        let cdpHealth = {
            healthy: false,
            error: 'Not checked'
        };
        try {
            const cdp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$integrations$2f$x402$2f$cdp$2d$facilitator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCDPFacilitator"])();
            cdpHealth = await cdp.healthCheck();
        } catch (error) {
            cdpHealth = {
                healthy: false,
                error: error instanceof Error ? error.message : 'Health check failed'
            };
        }
        // Get endpoint info if specified
        let endpointInfo = null;
        if (endpointId) {
            const endpoint = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$metered$2d$endpoints$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpoint"])(endpointId);
            if (endpoint) {
                endpointInfo = {
                    id: endpoint.id,
                    name: endpoint.name,
                    status: endpoint.status,
                    price: endpoint.price,
                    network: endpoint.network
                };
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            timestamp: now.toISOString(),
            timeWindow: {
                hours,
                startDate,
                endDate: now.toISOString()
            },
            health: {
                cdp: cdpHealth,
                verifyMode: process.env.X402_VERIFY_MODE || 'off'
            },
            metrics: {
                totalRequests,
                successfulRequests,
                failedRequests,
                paymentRequiredRequests,
                successRate: totalRequests > 0 ? successfulRequests / totalRequests * 100 : 0,
                avgResponseTime: Math.round(avgResponseTime),
                p95ResponseTime: Math.round(p95ResponseTime)
            },
            breakdown: {
                byFacilitator: facilitatorCounts,
                byError: errorCounts
            },
            endpoint: endpointInfo
        });
    } catch (error) {
        const errorEndpointId = request.nextUrl.searchParams.get('endpointId') || undefined;
        logger.error('Failed to fetch x402 metrics', {
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            endpointId: errorEndpointId
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch metrics',
            message: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
        }, {
            status: 500
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__de4cf134._.js.map