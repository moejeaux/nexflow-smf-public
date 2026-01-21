module.exports=[25372,(e,t,s)=>{t.exports=e.x("better-sqlite3",()=>require("better-sqlite3"))},62528,e=>{"use strict";var t=e.i(25372),s=e.i(14747),a=e.i(22734);class i{db;constructor(e){const i=e||s.default.join(process.cwd(),"data","metered-endpoints.db");a.default.existsSync(s.default.dirname(i))||a.default.mkdirSync(s.default.dirname(i),{recursive:!0}),this.db=new t.default(i),this.db.pragma("journal_mode = WAL"),function(e){e.exec(`
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
  `);try{e.prepare("PRAGMA table_info(endpoints)").all().some(e=>"recipient_address"===e.name)||(e.exec("ALTER TABLE endpoints ADD COLUMN recipient_address TEXT"),console.log("[db] Added recipient_address column"))}catch(e){e.message?.includes("duplicate column name")||e.message?.includes("no such column")||console.warn("[db] Migration warning:",e.message)}e.exec(`
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
  `),e.exec(`
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
  `),e.exec(`
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
  `),e.exec(`
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
  `),e.exec(`
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
  `),e.exec(`
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
  `),e.exec(`
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
  `),e.exec(`
    CREATE INDEX IF NOT EXISTS idx_accounts_email ON accounts(email);
    CREATE INDEX IF NOT EXISTS idx_accounts_status ON accounts(status);
    CREATE INDEX IF NOT EXISTS idx_account_plans_account_id ON account_plans(account_id);
  `),0===e.prepare("SELECT COUNT(*) as count FROM plans").get().count&&e.exec(`
      INSERT INTO plans (id, name, description, daily_limit, monthly_limit, price_cents, features) VALUES
      ('free', 'Free', 'Free tier for getting started', 1000, 10000, 0, '["1,000 API calls/day","10,000 API calls/month","Basic analytics","Community support"]'),
      ('starter', 'Starter', 'For small projects', 10000, 100000, 2900, '["10,000 API calls/day","100,000 API calls/month","Full analytics","Email support","Webhook notifications"]'),
      ('pro', 'Pro', 'For growing businesses', 100000, 1000000, 9900, '["100,000 API calls/day","1,000,000 API calls/month","Advanced analytics","Priority support","Custom webhooks","API key management"]'),
      ('enterprise', 'Enterprise', 'Custom solutions', 999999999, 999999999, 0, '["Unlimited API calls","Custom SLAs","Dedicated support","Custom integrations","On-premise deployment"]')
    `),e.exec(`
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
  `),e.exec(`
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
  `),e.exec(`
    CREATE INDEX IF NOT EXISTS idx_cron_job_runs_job_id ON cron_job_runs(job_id);
    CREATE INDEX IF NOT EXISTS idx_cron_job_runs_status ON cron_job_runs(status);
    CREATE INDEX IF NOT EXISTS idx_cron_job_runs_started_at ON cron_job_runs(started_at);
    CREATE INDEX IF NOT EXISTS idx_cron_job_runs_job_status ON cron_job_runs(job_id, status);
    CREATE INDEX IF NOT EXISTS idx_cron_job_runs_created_at ON cron_job_runs(created_at);
  `),0===e.prepare("SELECT COUNT(*) as count FROM cron_job_config").get().count&&e.exec(`
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
    `)}(this.db)}async healthCheck(){try{return this.db.prepare("SELECT 1").get(),!0}catch{return!1}}async query(e,t){let s=e;t&&t.length>0&&(s=e.replace(/\$(\d+)/g,()=>"?"));let a=/^\s*SELECT/i.test(s.trim());try{if(a){let e=this.db.prepare(s).all(...t||[]);return{rows:e,rowCount:e.length}}{let e=this.db.prepare(s).run(...t||[]);return{rows:[],rowCount:e.changes}}}catch(t){throw console.error("[SQLite] Query error:",t.message),console.error("[SQLite] Original query:",e),console.error("[SQLite] Converted query:",s),t}}async createEndpoint(e){let t=e.id||`ep_${Date.now()}_${Math.random().toString(36).substring(2,9)}`,s=new Date().toISOString();return this.db.prepare(`
      INSERT INTO endpoints (
        id, name, description, upstream_url, price, network, token_address,
        token_symbol, chain_id, recipient_address, status, created_at, updated_at, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(t,e.name,e.description||null,e.upstreamUrl,e.price,e.network,e.tokenAddress,e.tokenSymbol,e.chainId,e.recipientAddress,e.status,s,s,e.createdBy||null),Promise.resolve({...e,id:t,createdAt:s,updatedAt:s})}async getEndpoint(e){let t=this.db.prepare("SELECT * FROM endpoints WHERE id = ? AND status != ?").get(e,"deleted");return t?Promise.resolve(this.mapRowToEndpoint(t)):Promise.resolve(null)}async listEndpoints(e){let t="SELECT * FROM endpoints WHERE status != ?",s=["deleted"];return e?.status&&(t+=" AND status = ?",s.push(e.status)),e?.createdBy&&(t+=" AND created_by = ?",s.push(e.createdBy)),t+=" ORDER BY created_at DESC",Promise.resolve(this.db.prepare(t).all(...s).map(e=>this.mapRowToEndpoint(e)))}async updateEndpoint(e,t){let s=["name","description","upstreamUrl","price","network","tokenAddress","tokenSymbol","chainId","recipientAddress","status"],a=[],i=[];for(let[e,r]of Object.entries(t))if(s.includes(e)&&void 0!==r){let t="upstreamUrl"===e?"upstream_url":"tokenAddress"===e?"token_address":"tokenSymbol"===e?"token_symbol":"chainId"===e?"chain_id":"recipientAddress"===e?"recipient_address":"createdAt"===e?"created_at":"updatedAt"===e?"updated_at":"createdBy"===e?"created_by":e;a.push(`${t} = ?`),i.push(r)}return 0===a.length||(a.push("updated_at = ?"),i.push(new Date().toISOString()),i.push(e),this.db.prepare(`UPDATE endpoints SET ${a.join(", ")} WHERE id = ?`).run(...i)),this.getEndpoint(e)}async deleteEndpoint(e){return Promise.resolve(this.db.prepare("UPDATE endpoints SET status = ?, updated_at = ? WHERE id = ?").run("deleted",new Date().toISOString(),e).changes>0)}async createPayment(e){let t=`pay_${Date.now()}_${Math.random().toString(36).substring(2,9)}`,s=new Date().toISOString();return this.db.prepare(`
      INSERT INTO payments (
        id, endpoint_id, tx_hash, from_address, to_address, amount,
        token_address, network, verified_at, kyt_status, ofac_status, facilitator
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(t,e.endpointId,e.txHash,e.fromAddress,e.toAddress,e.amount,e.tokenAddress,e.network,s,e.kytStatus||null,e.ofacStatus||null,e.facilitator),Promise.resolve({...e,id:t,verifiedAt:s})}async getPayment(e){let t=this.db.prepare("SELECT * FROM payments WHERE id = ?").get(e);return t?Promise.resolve(this.mapRowToPayment(t)):Promise.resolve(null)}async getPaymentByTxHash(e){let t=this.db.prepare("SELECT * FROM payments WHERE tx_hash = ?").get(e);return t?Promise.resolve(this.mapRowToPayment(t)):Promise.resolve(null)}async listPayments(e){let t="SELECT * FROM payments WHERE 1=1",s=[];return e?.endpointId&&(t+=" AND endpoint_id = ?",s.push(e.endpointId)),e?.fromAddress&&(t+=" AND from_address = ?",s.push(e.fromAddress)),t+=" ORDER BY verified_at DESC",Promise.resolve(this.db.prepare(t).all(...s).map(e=>this.mapRowToPayment(e)))}async getPaymentsForEndpoint(e,t=100){return Promise.resolve(this.db.prepare("SELECT * FROM payments WHERE endpoint_id = ? ORDER BY verified_at DESC LIMIT ?").all(e,t).map(e=>this.mapRowToPayment(e)))}async createUsageLog(e){let t=`log_${Date.now()}_${Math.random().toString(36).substring(2,9)}`,s=new Date().toISOString();try{this.db.exec(`
        ALTER TABLE usage_logs ADD COLUMN conversation_id TEXT;
        ALTER TABLE usage_logs ADD COLUMN agent_id TEXT;
        ALTER TABLE usage_logs ADD COLUMN x402_tx_hash TEXT;
        ALTER TABLE usage_logs ADD COLUMN failure_code TEXT;
      `)}catch(e){e.message?.includes("duplicate column")||console.warn("[SQLite] Migration warning:",e.message)}try{this.db.prepare(`
        INSERT INTO usage_logs (
          id, endpoint_id, payment_id, timestamp, method, path,
          status_code, response_time, units, ip_address, user_agent,
          conversation_id, agent_id, x402_tx_hash, failure_code
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(t,e.endpointId,e.paymentId||null,s,e.method,e.path,e.statusCode,e.responseTime,e.units,e.ipAddress||null,e.userAgent||null,e.conversationId||null,e.agentId||null,e.x402TxHash||null,e.failureCode||null)}catch(t){throw console.error("[SQLite] Insert error details:",JSON.stringify({message:t.message||String(t),code:t.code||"unknown",errno:t.errno,sql:t.sql,endpointId:e.endpointId,table:"usage_logs"},null,2)),Error(`SQLite insert failed: ${t.message||String(t)}. Table: usage_logs, EndpointId: ${e.endpointId}, Error code: ${t.code||"unknown"}, SQL: ${t.sql||"N/A"}`)}return Promise.resolve({...e,id:t,timestamp:s})}async listUsageLogs(e){let t="SELECT * FROM usage_logs WHERE 1=1",s=[];return e?.endpointId&&(t+=" AND endpoint_id = ?",s.push(e.endpointId)),e?.paymentId&&(t+=" AND payment_id = ?",s.push(e.paymentId)),t+=" ORDER BY timestamp DESC LIMIT 1000",Promise.resolve(this.db.prepare(t).all(...s).map(e=>this.mapRowToUsageLog(e)))}async getUsageStats(e,t,s){let a=`
      SELECT
        COUNT(*) as total_requests,
        COUNT(DISTINCT payment_id) as total_payments,
        COALESCE(SUM(CAST(p.amount AS INTEGER)), 0) as total_revenue,
        COALESCE(AVG(response_time), 0) as avg_response_time
      FROM usage_logs ul
      LEFT JOIN payments p ON ul.payment_id = p.id
      WHERE ul.endpoint_id = ?
    `,i=[e];t&&(a+=" AND ul.timestamp >= ?",i.push(t)),s&&(a+=" AND ul.timestamp <= ?",i.push(s));let r=this.db.prepare(a).get(...i);return Promise.resolve({totalRequests:r.total_requests||0,totalPayments:r.total_payments||0,totalRevenue:r.total_revenue?.toString()||"0",averageResponseTime:r.avg_response_time||0})}mapRowToEndpoint(e){return{id:e.id,name:e.name,description:e.description,upstreamUrl:e.upstream_url,price:e.price,network:e.network,tokenAddress:e.token_address,tokenSymbol:e.token_symbol,chainId:e.chain_id,recipientAddress:e.recipient_address,status:e.status,createdAt:e.created_at,updatedAt:e.updated_at,createdBy:e.created_by}}mapRowToPayment(e){return{id:e.id,endpointId:e.endpoint_id,txHash:e.tx_hash,fromAddress:e.from_address,toAddress:e.to_address,amount:e.amount,tokenAddress:e.token_address,network:e.network,verifiedAt:e.verified_at,kytStatus:e.kyt_status,ofacStatus:e.ofac_status,facilitator:e.facilitator}}mapRowToUsageLog(e){return{id:e.id,endpointId:e.endpoint_id,paymentId:e.payment_id,timestamp:e.timestamp,method:e.method,path:e.path,statusCode:e.status_code,responseTime:e.response_time,units:e.units,ipAddress:e.ip_address,userAgent:e.user_agent,conversationId:e.conversation_id,agentId:e.agent_id,x402TxHash:e.x402_tx_hash,failureCode:e.failure_code}}async createApiKey(e){return this.db.prepare(`INSERT INTO api_keys (id, key_hash, name, role, user_id, rate_limit, expires_at, x402_demo_calls_used, x402_demo_calls_limit, x402_demo_amount_used, x402_demo_amount_limit, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(e.id,e.keyHash,e.name,e.role,e.userId||null,e.rateLimit,e.expiresAt||null,e.x402DemoCallsUsed||0,e.x402DemoCallsLimit||200,e.x402DemoAmountUsed||"0",e.x402DemoAmountLimit||"1000000",e.createdAt,e.updatedAt),this.findApiKeyByHash(e.keyHash)}async findApiKeyByHash(e){let t=this.db.prepare("SELECT * FROM api_keys WHERE key_hash = ? AND revoked_at IS NULL").get(e);return t?{id:t.id,keyHash:t.key_hash,name:t.name,role:t.role,userId:t.user_id,rateLimit:t.rate_limit,lastUsedAt:t.last_used_at,lastUsedIp:t.last_used_ip,expiresAt:t.expires_at,x402DemoCallsUsed:t.x402_demo_calls_used||0,x402DemoCallsLimit:t.x402_demo_calls_limit||200,x402DemoAmountUsed:t.x402_demo_amount_used||"0",x402DemoAmountLimit:t.x402_demo_amount_limit||"1000000",createdAt:t.created_at,updatedAt:t.updated_at,revokedAt:t.revoked_at}:null}async updateApiKeyLastUsed(e,t){let s=new Date().toISOString();this.db.prepare("UPDATE api_keys SET last_used_at = ?, last_used_ip = ?, updated_at = ? WHERE id = ?").run(s,t||null,s,e)}async updateApiKeyX402DemoAllowance(e,t,s){let a=new Date().toISOString();this.db.prepare("UPDATE api_keys SET x402_demo_calls_used = ?, x402_demo_amount_used = ?, updated_at = ? WHERE id = ?").run(t,s,a,e)}async updateApiKeyX402DemoLimits(e,t,s){let a=new Date().toISOString();void 0!==t&&void 0!==s?this.db.prepare("UPDATE api_keys SET x402_demo_calls_limit = ?, x402_demo_amount_limit = ?, updated_at = ? WHERE id = ?").run(t,s,a,e):void 0!==t?this.db.prepare("UPDATE api_keys SET x402_demo_calls_limit = ?, updated_at = ? WHERE id = ?").run(t,a,e):void 0!==s&&this.db.prepare("UPDATE api_keys SET x402_demo_amount_limit = ?, updated_at = ? WHERE id = ?").run(s,a,e)}async revokeApiKey(e){let t=new Date().toISOString();return this.db.prepare("UPDATE api_keys SET revoked_at = ?, updated_at = ? WHERE id = ? AND revoked_at IS NULL").run(t,t,e).changes>0}async listApiKeys(e){let t="SELECT * FROM api_keys WHERE revoked_at IS NULL",s=[];return e&&(t+=" AND user_id = ?",s.push(e)),t+=" ORDER BY created_at DESC",Promise.resolve(this.db.prepare(t).all(...s).map(e=>({id:e.id,keyHash:e.key_hash,name:e.name,role:e.role,userId:e.user_id,rateLimit:e.rate_limit,lastUsedAt:e.last_used_at,lastUsedIp:e.last_used_ip,expiresAt:e.expires_at,x402DemoCallsUsed:e.x402_demo_calls_used||0,x402DemoCallsLimit:e.x402_demo_calls_limit||200,x402DemoAmountUsed:e.x402_demo_amount_used||"0",x402DemoAmountLimit:e.x402_demo_amount_limit||"1000000",createdAt:e.created_at,updatedAt:e.updated_at,revokedAt:e.revoked_at})))}close(){this.db.close()}}e.s(["SqliteAdapter",()=>i])},45151,e=>e.a(async(t,s)=>{try{var a=e.i(30056),i=t([a]);[a]=i.then?(await i)():i;let r={maxPoolSize:parseInt(process.env.DB_POOL_MAX||"20",10),minPoolSize:parseInt(process.env.DB_POOL_MIN||"2",10),idleTimeoutMs:parseInt(process.env.DB_IDLE_TIMEOUT_MS||"30000",10),connectionTimeoutMs:parseInt(process.env.DB_CONNECTION_TIMEOUT_MS||"5000",10),maxLifetimeMs:parseInt(process.env.DB_MAX_LIFETIME_MS||"1800000",10),statementTimeoutMs:parseInt(process.env.DB_STATEMENT_TIMEOUT_MS||"30000",10),queryTimeoutMs:parseInt(process.env.DB_QUERY_TIMEOUT_MS||"30000",10),acquireRetries:parseInt(process.env.DB_ACQUIRE_RETRIES||"3",10),acquireRetryDelayMs:parseInt(process.env.DB_ACQUIRE_RETRY_DELAY_MS||"100",10)};class n{pool;statementTimeoutMs;constructor(e){this.statementTimeoutMs=r.statementTimeoutMs,this.pool=new a.Pool({connectionString:e,max:r.maxPoolSize,min:r.minPoolSize,idleTimeoutMillis:r.idleTimeoutMs,connectionTimeoutMillis:r.connectionTimeoutMs,maxLifetimeSeconds:Math.floor(r.maxLifetimeMs/1e3),keepAlive:!0,keepAliveInitialDelayMillis:1e4,application_name:process.env.APP_NAME||"nexflow-api"}),this.pool.on("error",e=>{console.error("[PostgresAdapter] Unexpected pool error:",e)}),console.log("[PostgresAdapter] Pool initialized:",{maxSize:r.maxPoolSize,minSize:r.minPoolSize,statementTimeoutMs:this.statementTimeoutMs,maxLifetimeMs:r.maxLifetimeMs})}async queryWithTimeout(e,t,s){let a=s||this.statementTimeoutMs,i=await this.pool.connect();try{return await i.query(`SET statement_timeout = ${a}`),await i.query(e,t)}finally{i.release()}}getPoolStats(){return{totalCount:this.pool.totalCount,idleCount:this.pool.idleCount,waitingCount:this.pool.waitingCount}}async query(e,t){let s=await this.queryWithTimeout(e,t);return{rows:s.rows,rowCount:s.rowCount}}async healthCheck(){try{return(await this.queryWithTimeout("SELECT 1",[],5e3)).rows.length>0}catch(e){return console.error("[PostgresAdapter] Health check failed:",e),!1}}async createEndpoint(e){let t=e.id||`ep_${Date.now()}_${Math.random().toString(36).substring(2,9)}`,s=new Date().toISOString(),a=await this.query(`INSERT INTO endpoints (
        id, name, description, upstream_url, price, network, token_address,
        token_symbol, chain_id, recipient_address, status, created_at, updated_at, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`,[t,e.name,e.description||null,e.upstreamUrl,e.price,e.network,e.tokenAddress,e.tokenSymbol,e.chainId,e.recipientAddress,e.status,s,s,e.createdBy||null]);return this.mapRowToEndpoint(a.rows[0])}async getEndpoint(e){let t=await this.query("SELECT * FROM endpoints WHERE id = $1 AND status != $2",[e,"deleted"]);return 0===t.rows.length?null:this.mapRowToEndpoint(t.rows[0])}async listEndpoints(e){let t="SELECT * FROM endpoints WHERE status != $1",s=["deleted"],a=2;e?.status&&(t+=` AND status = $${a}`,s.push(e.status),a++),e?.createdBy&&(t+=` AND created_by = $${a}`,s.push(e.createdBy),a++),t+=" ORDER BY created_at DESC";try{return(await this.query(t,s)).rows.map(e=>this.mapRowToEndpoint(e))}catch(e){throw console.error("[PostgresAdapter] listEndpoints error:",e),console.error("[PostgresAdapter] Query:",t),console.error("[PostgresAdapter] Params:",s),e}}async updateEndpoint(e,t){let s=["name","description","upstreamUrl","price","network","tokenAddress","tokenSymbol","chainId","recipientAddress","status"],a=[],i=[],r=1;for(let[e,n]of Object.entries(t))if(s.includes(e)&&void 0!==n){let t="upstreamUrl"===e?"upstream_url":"tokenAddress"===e?"token_address":"tokenSymbol"===e?"token_symbol":"chainId"===e?"chain_id":"recipientAddress"===e?"recipient_address":"createdAt"===e?"created_at":"updatedAt"===e?"updated_at":"createdBy"===e?"created_by":e;a.push(`${t} = $${r}`),i.push(n),r++}if(0===a.length)return this.getEndpoint(e);a.push(`updated_at = $${r}`),i.push(new Date().toISOString()),r++,i.push(e);let n=await this.query(`UPDATE endpoints SET ${a.join(", ")} WHERE id = $${r} RETURNING *`,i);return 0===n.rows.length?null:this.mapRowToEndpoint(n.rows[0])}async deleteEndpoint(e){let t=await this.query("UPDATE endpoints SET status = $1, updated_at = $2 WHERE id = $3",["deleted",new Date().toISOString(),e]);return null!==t.rowCount&&t.rowCount>0}async createPayment(e){let t=`pay_${Date.now()}_${Math.random().toString(36).substring(2,9)}`,s=new Date().toISOString(),a=`inv_${Date.now()}_${Math.random().toString(36).substring(2,9)}`,i=(e.tokenAddress,"USDC"),r=e.tokenAddress,n=await this.query(`INSERT INTO payments (
        id, endpoint_id, invoice_id, tx_hash, from_address, to_address, amount,
        currency, token, token_address, network, status, created_at, verified_at, kyt_status, ofac_status, facilitator
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *`,[t,e.endpointId,a,e.txHash,e.fromAddress,e.toAddress,e.amount,i,r,e.tokenAddress,e.network,"verified",s,s,e.kytStatus||null,e.ofacStatus||null,e.facilitator]);return this.mapRowToPayment(n.rows[0])}async getPayment(e){let t=await this.query("SELECT * FROM payments WHERE id = $1",[e]);return 0===t.rows.length?null:this.mapRowToPayment(t.rows[0])}async getPaymentByTxHash(e){let t=await this.query("SELECT * FROM payments WHERE tx_hash = $1",[e]);return 0===t.rows.length?null:this.mapRowToPayment(t.rows[0])}async listPayments(e){let t="SELECT * FROM payments WHERE 1=1",s=[],a=1;return e?.endpointId&&(t+=` AND endpoint_id = $${a}`,s.push(e.endpointId),a++),e?.fromAddress&&(t+=` AND from_address = $${a}`,s.push(e.fromAddress),a++),t+=" ORDER BY verified_at DESC",(await this.query(t,s)).rows.map(e=>this.mapRowToPayment(e))}async getPaymentsForEndpoint(e,t=100){return(await this.query("SELECT * FROM payments WHERE endpoint_id = $1 ORDER BY verified_at DESC LIMIT $2",[e,t])).rows.map(e=>this.mapRowToPayment(e))}async createUsageLog(e){let t=`log_${Date.now()}_${Math.random().toString(36).substring(2,9)}`,s=new Date().toISOString(),a=await this.query(`INSERT INTO usage_logs (
        id, endpoint_id, payment_id, timestamp, method, path,
        status_code, response_time, units, ip_address, user_agent,
        conversation_id, agent_id, x402_tx_hash, failure_code
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,[t,e.endpointId,e.paymentId||null,s,e.method,e.path,e.statusCode,e.responseTime,e.units,e.ipAddress||null,e.userAgent||null,e.conversationId||null,e.agentId||null,e.x402TxHash||null,e.failureCode||null]);return this.mapRowToUsageLog(a.rows[0])}async listUsageLogs(e){let t="SELECT * FROM usage_logs WHERE 1=1",s=[],a=1;return e?.endpointId&&(t+=` AND endpoint_id = $${a}`,s.push(e.endpointId),a++),e?.paymentId&&(t+=` AND payment_id = $${a}`,s.push(e.paymentId),a++),t+=" ORDER BY timestamp DESC LIMIT 1000",(await this.query(t,s)).rows.map(e=>this.mapRowToUsageLog(e))}async getUsageStats(e,t,s){let a=`
      SELECT
        COUNT(*) as total_requests,
        COUNT(DISTINCT payment_id) as total_payments,
        COALESCE(SUM(p.amount), '0') as total_revenue,
        COALESCE(AVG(response_time), 0) as avg_response_time
      FROM usage_logs ul
      LEFT JOIN payments p ON ul.payment_id = p.id
      WHERE ul.endpoint_id = $1
    `,i=[e],r=2;t&&(a+=` AND ul.timestamp >= $${r}`,i.push(t),r++),s&&(a+=` AND ul.timestamp <= $${r}`,i.push(s),r++);let n=(await this.query(a,i)).rows[0];return{totalRequests:parseInt(n.total_requests)||0,totalPayments:parseInt(n.total_payments)||0,totalRevenue:n.total_revenue||"0",averageResponseTime:parseFloat(n.avg_response_time)||0}}mapRowToEndpoint(e){return{id:e.id,name:e.name,description:e.description,upstreamUrl:e.upstream_url,price:e.price,network:e.network,tokenAddress:e.token_address,tokenSymbol:e.token_symbol,chainId:e.chain_id,recipientAddress:e.recipient_address,status:e.status,createdAt:e.created_at,updatedAt:e.updated_at,createdBy:e.created_by}}mapRowToPayment(e){return{id:e.id,endpointId:e.endpoint_id,txHash:e.tx_hash,fromAddress:e.from_address,toAddress:e.to_address,amount:e.amount,tokenAddress:e.token_address,network:e.network,verifiedAt:e.verified_at,kytStatus:e.kyt_status,ofacStatus:e.ofac_status,facilitator:e.facilitator}}mapRowToUsageLog(e){return{id:e.id,endpointId:e.endpoint_id,paymentId:e.payment_id,timestamp:e.timestamp,method:e.method,path:e.path,statusCode:e.status_code,responseTime:e.response_time,units:e.units,ipAddress:e.ip_address,userAgent:e.user_agent,conversationId:e.conversation_id,agentId:e.agent_id,x402TxHash:e.x402_tx_hash,failureCode:e.failure_code}}async createApiKey(e){return await this.query(`INSERT INTO api_keys (id, key_hash, name, role, user_id, rate_limit, expires_at, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,[e.id,e.keyHash,e.name,e.role,e.userId||null,e.rateLimit,e.expiresAt||null,e.createdAt,e.updatedAt]),this.findApiKeyByHash(e.keyHash)}async findApiKeyByHash(e){let t=await this.query("SELECT * FROM api_keys WHERE key_hash = $1 AND revoked_at IS NULL",[e]);if(0===t.rows.length)return null;let s=t.rows[0];return{id:s.id,keyHash:s.key_hash,name:s.name,role:s.role,userId:s.user_id,rateLimit:s.rate_limit,lastUsedAt:s.last_used_at,lastUsedIp:s.last_used_ip,expiresAt:s.expires_at,x402DemoCallsUsed:s.x402_demo_calls_used||0,x402DemoCallsLimit:s.x402_demo_calls_limit||200,x402DemoAmountUsed:s.x402_demo_amount_used||"0",x402DemoAmountLimit:s.x402_demo_amount_limit||"1000000",createdAt:s.created_at,updatedAt:s.updated_at,revokedAt:s.revoked_at}}async updateApiKeyLastUsed(e,t){await this.query("UPDATE api_keys SET last_used_at = NOW(), last_used_ip = $2, updated_at = NOW() WHERE id = $1",[e,t||null])}async updateApiKeyX402DemoAllowance(e,t,s){await this.query("UPDATE api_keys SET x402_demo_calls_used = $2, x402_demo_amount_used = $3, updated_at = NOW() WHERE id = $1",[e,t,s])}async updateApiKeyX402DemoLimits(e,t,s){void 0!==t&&void 0!==s?await this.query("UPDATE api_keys SET x402_demo_calls_limit = $2, x402_demo_amount_limit = $3, updated_at = NOW() WHERE id = $1",[e,t,s]):void 0!==t?await this.query("UPDATE api_keys SET x402_demo_calls_limit = $2, updated_at = NOW() WHERE id = $1",[e,t]):void 0!==s&&await this.query("UPDATE api_keys SET x402_demo_amount_limit = $2, updated_at = NOW() WHERE id = $1",[e,s])}async revokeApiKey(e){return(await this.query("UPDATE api_keys SET revoked_at = NOW(), updated_at = NOW() WHERE id = $1 AND revoked_at IS NULL",[e])).rowCount>0}async listApiKeys(e){let t="SELECT * FROM api_keys WHERE revoked_at IS NULL",s=[];return e&&(t+=" AND user_id = $1",s.push(e)),t+=" ORDER BY created_at DESC",(await this.query(t,s)).rows.map(e=>({id:e.id,keyHash:e.key_hash,name:e.name,role:e.role,userId:e.user_id,rateLimit:e.rate_limit,lastUsedAt:e.last_used_at,lastUsedIp:e.last_used_ip,expiresAt:e.expires_at,x402DemoCallsUsed:e.x402_demo_calls_used||0,x402DemoCallsLimit:e.x402_demo_calls_limit||200,x402DemoAmountUsed:e.x402_demo_amount_used||"0",x402DemoAmountLimit:e.x402_demo_amount_limit||"1000000",createdAt:e.created_at,updatedAt:e.updated_at,revokedAt:e.revoked_at}))}async close(){await this.pool.end()}}e.s(["PostgresAdapter",()=>n]),s()}catch(e){s(e)}},!1),24924,e=>e.a(async(t,s)=>{try{var a=e.i(62528),i=e.i(45151),r=t([i]);[i]=r.then?(await r)():r;let l=null;function n(){if(l)return l;let e=process.env.DATABASE_URL;return e&&e.startsWith("postgresql://")?(console.log("[db] Using PostgreSQL adapter"),l=new i.PostgresAdapter(e)):(console.log("[db] Using SQLite adapter (development mode)"),l=new a.SqliteAdapter),l}function o(){return l&&l instanceof i.PostgresAdapter?l.getPoolStats():null}async function d(){l&&("close"in l&&"function"==typeof l.close&&await l.close(),l=null)}function _(e){return e&&(e instanceof i.PostgresAdapter||"pool"in e||"function"==typeof e?.pool?.query)}e.s(["closeDb",()=>d,"getDb",()=>n,"getPoolStats",()=>o,"isPostgres",()=>_]),s()}catch(e){s(e)}},!1)];

//# sourceMappingURL=%5Broot-of-the-server%5D__e9c70ed4._.js.map