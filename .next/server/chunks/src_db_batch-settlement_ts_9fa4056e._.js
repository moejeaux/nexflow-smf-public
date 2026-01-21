module.exports=[19502,e=>e.a(async(t,a)=>{try{var r=e.i(24924),n=e.i(50377),i=t([r]);function _(e){return"pool"in e||"function"==typeof e?.pool?.query}function s(e){return null==e?null:e.toString()}function o(e){return null==e?null:BigInt(e)}function d(e){return{id:e.id,batch_id:e.batch_id,created_at:new Date(e.created_at),submitted_at:e.submitted_at?new Date(e.submitted_at):null,settled_at:e.settled_at?new Date(e.settled_at):null,status:e.status,payment_count:Number(e.payment_count),total_amount_wei:BigInt(e.total_amount_wei||"0"),total_fees_wei:BigInt(e.total_fees_wei||"0"),merkle_root:e.merkle_root,transaction_hash:e.transaction_hash,block_number:e.block_number?BigInt(e.block_number):null,error_message:e.error_message,retry_count:Number(e.retry_count),max_retries:Number(e.max_retries),network:e.network,token_address:e.token_address,facilitator_id:e.facilitator_id,settlement_contract:e.settlement_contract,gas_used:e.gas_used?BigInt(e.gas_used):null,gas_price_wei:e.gas_price_wei?BigInt(e.gas_price_wei):null,updated_at:new Date(e.updated_at)}}function u(e){return{id:e.id,batch_id:e.batch_id,payment_id:e.payment_id,order_index:Number(e.order_index),recipient_address:e.recipient_address,amount_wei:BigInt(e.amount_wei||"0"),fee_wei:BigInt(e.fee_wei||"0"),status:e.status,merkle_leaf:e.merkle_leaf,proof_path:e.proof_path,route_id:e.route_id,metadata:e.metadata,created_at:new Date(e.created_at),updated_at:new Date(e.updated_at)}}function c(e){return{id:e.id,payment_id:e.payment_id,facilitator_id:e.facilitator_id,network:e.network,token_address:e.token_address,recipient_address:e.recipient_address,amount_wei:BigInt(e.amount_wei||"0"),fee_wei:BigInt(e.fee_wei||"0"),priority:Number(e.priority),route_id:e.route_id,metadata:e.metadata,expires_at:e.expires_at?new Date(e.expires_at):null,created_at:new Date(e.created_at)}}function l(e){return{id:e.id,facilitator_id:e.facilitator_id,token_address:e.token_address,chain_id:e.chain_id,escrow_address:e.escrow_address,balance_wei:BigInt(e.balance_wei||"0"),pending_settlement_wei:BigInt(e.pending_settlement_wei||"0"),minimum_balance_wei:BigInt(e.minimum_balance_wei||"0"),status:e.status,last_on_chain_sync:e.last_on_chain_sync?new Date(e.last_on_chain_sync):null,last_audit_at:e.last_audit_at?new Date(e.last_audit_at):null,audit_block_number:e.audit_block_number?BigInt(e.audit_block_number):null,created_at:new Date(e.created_at),updated_at:new Date(e.updated_at)}}function p(e){return{id:e.id,batch_id:e.batch_id,merkle_root:e.merkle_root,merkle_depth:Number(e.merkle_depth),total_leaves:Number(e.total_leaves),leaves_hash:e.leaves_hash,custody_proof_hash:e.custody_proof_hash,solvency_verified:!!e.solvency_verified,solvency_check_at:e.solvency_check_at?new Date(e.solvency_check_at):null,verification_status:e.verification_status,verified_at:e.verified_at?new Date(e.verified_at):null,verifier_signature:e.verifier_signature,created_at:new Date(e.created_at)}}function E(e){return{id:e.id,batch_id:e.batch_id,payment_id:e.payment_id,facilitator_id:e.facilitator_id,network:e.network,token_address:e.token_address,fee_amount_wei:BigInt(e.fee_amount_wei||"0"),fee_bps:Number(e.fee_bps),payment_amount_wei:BigInt(e.payment_amount_wei||"0"),status:e.status,captured_at:e.captured_at?new Date(e.captured_at):null,withdrawal_tx:e.withdrawal_tx,withdrawn_at:e.withdrawn_at?new Date(e.withdrawn_at):null,created_at:new Date(e.created_at)}}async function w(e){var t,a;let n,i,s=(0,r.getDb)(),o=crypto.randomUUID(),u=(t=e.facilitator_id,a=e.network,e.token_address,n=Date.now(),i=Math.random().toString(36).substring(2,8),`batch_${t}_${a}_${n}_${i}`),c=new Date().toISOString();if(_(s)){let t=await s.pool.query(`INSERT INTO batch_settlements (
        id, batch_id, facilitator_id, network, token_address, 
        settlement_contract, max_retries, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,[o,u,e.facilitator_id,e.network,e.token_address,e.settlement_contract||null,e.max_retries||3,c,c]);return d(t.rows[0])}{s.prepare(`
      INSERT INTO batch_settlements (
        id, batch_id, facilitator_id, network, token_address,
        settlement_contract, max_retries, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(o,u,e.facilitator_id,e.network,e.token_address,e.settlement_contract||null,e.max_retries||3,c,c);let t=s.prepare("SELECT * FROM batch_settlements WHERE id = ?").get(o);return d(t)}}async function m(e){let t=(0,r.getDb)();if(_(t)){let a=await t.pool.query("SELECT * FROM batch_settlements WHERE id = $1",[e]);return a.rows[0]?d(a.rows[0]):null}{let a=t.prepare("SELECT * FROM batch_settlements WHERE id = ?").get(e);return a?d(a):null}}async function f(e){let t=(0,r.getDb)();if(_(t)){let a=await t.pool.query("SELECT * FROM batch_settlements WHERE batch_id = $1",[e]);return a.rows[0]?d(a.rows[0]):null}{let a=t.prepare("SELECT * FROM batch_settlements WHERE batch_id = ?").get(e);return a?d(a):null}}async function h(e,t=10){let a=(0,r.getDb)();if(_(a)){let r=`
      SELECT * FROM batch_settlements 
      WHERE status = 'pending' AND payment_count > 0
    `,n=[];return e&&(r+=" AND facilitator_id = $1",n.push(e)),r+=` ORDER BY created_at ASC LIMIT $${n.length+1}`,n.push(t),(await a.pool.query(r,n)).rows.map(d)}{let r=`
      SELECT * FROM batch_settlements 
      WHERE status = 'pending' AND payment_count > 0
    `,n=[];return e&&(r+=" AND facilitator_id = ?",n.push(e)),r+=" ORDER BY created_at ASC LIMIT ?",n.push(t),a.prepare(r).all(...n).map(d)}}async function S(e,t,a){let n=(0,r.getDb)(),i=new Date().toISOString(),o=["status = $2","updated_at = $3"],d=[e,t,i],u=4;if("submitted"===t&&(o.push(`submitted_at = $${u++}`),d.push(i)),"confirmed"===t&&(o.push(`settled_at = $${u++}`),d.push(i)),a?.merkle_root&&(o.push(`merkle_root = $${u++}`),d.push(a.merkle_root)),a?.transaction_hash&&(o.push(`transaction_hash = $${u++}`),d.push(a.transaction_hash)),a?.block_number!==void 0&&(o.push(`block_number = $${u++}`),d.push(s(a.block_number))),a?.error_message&&(o.push(`error_message = $${u++}`),d.push(a.error_message)),a?.gas_used!==void 0&&(o.push(`gas_used = $${u++}`),d.push(s(a.gas_used))),a?.gas_price_wei!==void 0&&(o.push(`gas_price_wei = $${u++}`),d.push(s(a.gas_price_wei))),_(n))await n.pool.query(`UPDATE batch_settlements SET ${o.join(", ")} WHERE id = $1`,d);else{let e=`UPDATE batch_settlements SET ${o.map((e,t)=>e.replace(/\$\d+/g,"?")).join(", ")} WHERE id = ?`;n.prepare(e).run(...d)}}async function D(e){let t=(0,r.getDb)(),a=new Date().toISOString();if(_(t)){let r=await t.pool.query(`UPDATE batch_settlements 
       SET retry_count = retry_count + 1, updated_at = $2 
       WHERE id = $1 
       RETURNING retry_count`,[e,a]);return Number(r.rows[0]?.retry_count||0)}{t.prepare("UPDATE batch_settlements SET retry_count = retry_count + 1, updated_at = ? WHERE id = ?").run(a,e);let r=t.prepare("SELECT retry_count FROM batch_settlements WHERE id = ?").get(e);return Number(r?.retry_count||0)}}async function b(e,t){let a=(0,r.getDb)(),n=crypto.randomUUID(),i=new Date().toISOString(),o=0;if(_(a)){let t=await a.pool.query("SELECT COUNT(*) as count FROM batch_payments WHERE batch_id = $1",[e]);o=Number(t.rows[0].count)}else{let t=a.prepare("SELECT COUNT(*) as count FROM batch_payments WHERE batch_id = ?").get(e);o=Number(t?.count||0)}if(_(a)){let r=await a.pool.query(`INSERT INTO batch_payments (
        id, batch_id, payment_id, order_index, recipient_address,
        amount_wei, fee_wei, route_id, metadata, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,[n,e,t.payment_id,o,t.recipient_address,s(t.amount_wei),s(t.fee_wei||BigInt(0)),t.route_id||null,t.metadata?JSON.stringify(t.metadata):null,i,i]);return await a.pool.query(`UPDATE batch_settlements SET 
        payment_count = payment_count + 1,
        total_amount_wei = total_amount_wei + $2,
        total_fees_wei = total_fees_wei + $3,
        updated_at = $4
       WHERE id = $1`,[e,s(t.amount_wei),s(t.fee_wei||BigInt(0)),i]),u(r.rows[0])}{a.prepare(`
      INSERT INTO batch_payments (
        id, batch_id, payment_id, order_index, recipient_address,
        amount_wei, fee_wei, route_id, metadata, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(n,e,t.payment_id,o,t.recipient_address,s(t.amount_wei),s(t.fee_wei||BigInt(0)),t.route_id||null,t.metadata?JSON.stringify(t.metadata):null,i,i),a.prepare(`
      UPDATE batch_settlements SET 
        payment_count = payment_count + 1,
        total_amount_wei = total_amount_wei + ?,
        total_fees_wei = total_fees_wei + ?,
        updated_at = ?
       WHERE id = ?
    `).run(s(t.amount_wei),s(t.fee_wei||BigInt(0)),i,e);let r=a.prepare("SELECT * FROM batch_payments WHERE id = ?").get(n);return u(r)}}async function g(e){let t=(0,r.getDb)();return _(t)?(await t.pool.query("SELECT * FROM batch_payments WHERE batch_id = $1 ORDER BY order_index",[e])).rows.map(u):t.prepare("SELECT * FROM batch_payments WHERE batch_id = ? ORDER BY order_index").all(e).map(u)}async function $(e,t,a){let n=(0,r.getDb)(),i=new Date().toISOString();_(n)?await n.pool.query(`UPDATE batch_payments SET 
        merkle_leaf = $2, 
        proof_path = $3,
        status = 'included',
        updated_at = $4
       WHERE payment_id = $1`,[e,t,JSON.stringify(a),i]):n.prepare(`
      UPDATE batch_payments SET 
        merkle_leaf = ?, 
        proof_path = ?,
        status = 'included',
        updated_at = ?
       WHERE payment_id = ?
    `).run(t,JSON.stringify(a),i,e)}async function y(e,t){let a=(0,r.getDb)(),n=new Date().toISOString();_(a)?await a.pool.query("UPDATE batch_payments SET status = $2, updated_at = $3 WHERE payment_id = $1",[e,t,n]):a.prepare("UPDATE batch_payments SET status = ?, updated_at = ? WHERE payment_id = ?").run(t,n,e)}async function R(e){let t=(0,r.getDb)(),a=crypto.randomUUID(),n=new Date().toISOString();if(_(t)){let r=await t.pool.query(`INSERT INTO batch_queue (
        id, payment_id, facilitator_id, network, token_address,
        recipient_address, amount_wei, fee_wei, priority,
        route_id, metadata, expires_at, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,[a,e.payment_id,e.facilitator_id,e.network,e.token_address,e.recipient_address,s(e.amount_wei),s(e.fee_wei||BigInt(0)),e.priority||0,e.route_id||null,e.metadata?JSON.stringify(e.metadata):null,e.expires_at?.toISOString()||null,n]);return c(r.rows[0])}{t.prepare(`
      INSERT INTO batch_queue (
        id, payment_id, facilitator_id, network, token_address,
        recipient_address, amount_wei, fee_wei, priority,
        route_id, metadata, expires_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(a,e.payment_id,e.facilitator_id,e.network,e.token_address,e.recipient_address,s(e.amount_wei),s(e.fee_wei||BigInt(0)),e.priority||0,e.route_id||null,e.metadata?JSON.stringify(e.metadata):null,e.expires_at?.toISOString()||null,n);let r=t.prepare("SELECT * FROM batch_queue WHERE id = ?").get(a);return c(r)}}async function T(e,t,a,n=100){let i=(0,r.getDb)();return _(i)?(await i.pool.query(`SELECT * FROM batch_queue 
       WHERE facilitator_id = $1 AND network = $2 AND token_address = $3
         AND (expires_at IS NULL OR expires_at > NOW())
       ORDER BY priority DESC, created_at ASC
       LIMIT $4`,[e,t,a,n])).rows.map(c):i.prepare(`SELECT * FROM batch_queue 
       WHERE facilitator_id = ? AND network = ? AND token_address = ?
         AND (expires_at IS NULL OR expires_at > datetime('now'))
       ORDER BY priority DESC, created_at ASC
       LIMIT ?`).all(e,t,a,n).map(c)}async function N(e){if(0===e.length)return;let t=(0,r.getDb)();if(_(t))await t.pool.query("DELETE FROM batch_queue WHERE payment_id = ANY($1)",[e]);else{let a=e.map(()=>"?").join(",");t.prepare(`DELETE FROM batch_queue WHERE payment_id IN (${a})`).run(...e)}}async function I(){let e=(0,r.getDb)();return _(e)?(await e.pool.query("DELETE FROM batch_queue WHERE expires_at IS NOT NULL AND expires_at < NOW() RETURNING id")).rowCount||0:e.prepare("DELETE FROM batch_queue WHERE expires_at IS NOT NULL AND expires_at < datetime('now')").run().changes||0}async function O(e){let t=(0,r.getDb)(),a=crypto.randomUUID(),n=new Date().toISOString();if(_(t)){let r=await t.pool.query(`INSERT INTO escrow_accounts (
        id, facilitator_id, token_address, chain_id, escrow_address,
        minimum_balance_wei, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (facilitator_id, token_address, chain_id)
      DO UPDATE SET
        escrow_address = EXCLUDED.escrow_address,
        minimum_balance_wei = COALESCE(EXCLUDED.minimum_balance_wei, escrow_accounts.minimum_balance_wei),
        updated_at = EXCLUDED.updated_at
      RETURNING *`,[a,e.facilitator_id,e.token_address,e.chain_id,e.escrow_address,s(e.minimum_balance_wei||BigInt(0)),n,n]);return l(r.rows[0])}{let r=t.prepare("SELECT * FROM escrow_accounts WHERE facilitator_id = ? AND token_address = ? AND chain_id = ?").get(e.facilitator_id,e.token_address,e.chain_id);if(r){t.prepare(`
        UPDATE escrow_accounts SET
          escrow_address = ?,
          minimum_balance_wei = COALESCE(?, minimum_balance_wei),
          updated_at = ?
        WHERE id = ?
      `).run(e.escrow_address,s(e.minimum_balance_wei),n,r.id);let a=t.prepare("SELECT * FROM escrow_accounts WHERE id = ?").get(r.id);return l(a)}{t.prepare(`
        INSERT INTO escrow_accounts (
          id, facilitator_id, token_address, chain_id, escrow_address,
          minimum_balance_wei, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(a,e.facilitator_id,e.token_address,e.chain_id,e.escrow_address,s(e.minimum_balance_wei||BigInt(0)),n,n);let r=t.prepare("SELECT * FROM escrow_accounts WHERE id = ?").get(a);return l(r)}}}async function A(e,t,a){let n=(0,r.getDb)();if(_(n)){let r=await n.pool.query(`SELECT * FROM escrow_accounts 
       WHERE facilitator_id = $1 AND token_address = $2 AND chain_id = $3`,[e,t,a]);return r.rows[0]?l(r.rows[0]):null}{let r=n.prepare(`SELECT * FROM escrow_accounts 
       WHERE facilitator_id = ? AND token_address = ? AND chain_id = ?`).get(e,t,a);return r?l(r):null}}async function L(e,t,a){let n=(0,r.getDb)(),i=new Date().toISOString();_(n)?await n.pool.query(`UPDATE escrow_accounts SET
        balance_wei = $2,
        status = COALESCE($3, status),
        last_on_chain_sync = $4,
        updated_at = $4
       WHERE id = $1`,[e,s(t),a||null,i]):a?n.prepare(`
        UPDATE escrow_accounts SET
          balance_wei = ?,
          status = ?,
          last_on_chain_sync = ?,
          updated_at = ?
         WHERE id = ?
      `).run(s(t),a,i,i,e):n.prepare(`
        UPDATE escrow_accounts SET
          balance_wei = ?,
          last_on_chain_sync = ?,
          updated_at = ?
         WHERE id = ?
      `).run(s(t),i,i,e)}async function k(e,t){let a=(0,r.getDb)(),n=new Date().toISOString();_(a)?await a.pool.query("UPDATE escrow_accounts SET pending_settlement_wei = $2, updated_at = $3 WHERE id = $1",[e,s(t),n]):a.prepare("UPDATE escrow_accounts SET pending_settlement_wei = ?, updated_at = ? WHERE id = ?").run(s(t),n,e)}async function C(e){let t=(0,r.getDb)(),a=crypto.randomUUID(),n=new Date().toISOString();if(_(t)){let r=await t.pool.query(`INSERT INTO settlement_proofs (
        id, batch_id, merkle_root, merkle_depth, total_leaves,
        leaves_hash, custody_proof_hash, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,[a,e.batch_id,e.merkle_root,e.merkle_depth,e.total_leaves,e.leaves_hash,e.custody_proof_hash||null,n]);return p(r.rows[0])}{t.prepare(`
      INSERT INTO settlement_proofs (
        id, batch_id, merkle_root, merkle_depth, total_leaves,
        leaves_hash, custody_proof_hash, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(a,e.batch_id,e.merkle_root,e.merkle_depth,e.total_leaves,e.leaves_hash,e.custody_proof_hash||null,n);let r=t.prepare("SELECT * FROM settlement_proofs WHERE id = ?").get(a);return p(r)}}async function H(e){let t=(0,r.getDb)();if(_(t)){let a=await t.pool.query("SELECT * FROM settlement_proofs WHERE batch_id = $1",[e]);return a.rows[0]?p(a.rows[0]):null}{let a=t.prepare("SELECT * FROM settlement_proofs WHERE batch_id = ?").get(e);return a?p(a):null}}async function U(e,t,a){let n=(0,r.getDb)(),i=new Date().toISOString();_(n)?await n.pool.query(`UPDATE settlement_proofs SET 
        verification_status = $2,
        verified_at = CASE WHEN $2 = 'verified' THEN $3 ELSE verified_at END,
        verifier_signature = COALESCE($4, verifier_signature)
       WHERE id = $1`,[e,t,i,a||null]):"verified"===t?n.prepare(`
        UPDATE settlement_proofs SET 
          verification_status = ?,
          verified_at = ?,
          verifier_signature = COALESCE(?, verifier_signature)
         WHERE id = ?
      `).run(t,i,a||null,e):n.prepare(`
        UPDATE settlement_proofs SET verification_status = ? WHERE id = ?
      `).run(t,e)}async function W(e){let t=(0,r.getDb)(),a=crypto.randomUUID(),n=new Date().toISOString();if(_(t)){let r=await t.pool.query(`INSERT INTO settlement_audit_logs (
        id, batch_id, escrow_id, action, amount_wei,
        previous_balance_wei, new_balance_wei, actor,
        transaction_hash, details, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,[a,e.batch_id||null,e.escrow_id||null,e.action,s(e.amount_wei),s(e.previous_balance_wei),s(e.new_balance_wei),e.actor,e.transaction_hash||null,e.details?JSON.stringify(e.details):null,n]);return{...r.rows[0],amount_wei:o(r.rows[0].amount_wei),previous_balance_wei:o(r.rows[0].previous_balance_wei),new_balance_wei:o(r.rows[0].new_balance_wei),created_at:new Date(r.rows[0].created_at)}}{t.prepare(`
      INSERT INTO settlement_audit_logs (
        id, batch_id, escrow_id, action, amount_wei,
        previous_balance_wei, new_balance_wei, actor,
        transaction_hash, details, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(a,e.batch_id||null,e.escrow_id||null,e.action,s(e.amount_wei),s(e.previous_balance_wei),s(e.new_balance_wei),e.actor,e.transaction_hash||null,e.details?JSON.stringify(e.details):null,n);let r=t.prepare("SELECT * FROM settlement_audit_logs WHERE id = ?").get(a);return{...r,amount_wei:o(r.amount_wei),previous_balance_wei:o(r.previous_balance_wei),new_balance_wei:o(r.new_balance_wei),created_at:new Date(r.created_at)}}}async function B(e){let t=(0,r.getDb)();return _(t)?(await t.pool.query("SELECT * FROM settlement_audit_logs WHERE batch_id = $1 ORDER BY created_at",[e])).rows.map(e=>({...e,amount_wei:o(e.amount_wei),previous_balance_wei:o(e.previous_balance_wei),new_balance_wei:o(e.new_balance_wei),created_at:new Date(e.created_at)})):t.prepare("SELECT * FROM settlement_audit_logs WHERE batch_id = ? ORDER BY created_at").all(e).map(e=>({...e,amount_wei:o(e.amount_wei),previous_balance_wei:o(e.previous_balance_wei),new_balance_wei:o(e.new_balance_wei),created_at:new Date(e.created_at)}))}async function M(e){let t=(0,r.getDb)(),a=crypto.randomUUID(),n=new Date().toISOString();if(_(t)){let r=await t.pool.query(`INSERT INTO platform_fees (
        id, batch_id, payment_id, facilitator_id, network, token_address,
        fee_amount_wei, fee_bps, payment_amount_wei, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,[a,e.batch_id||null,e.payment_id||null,e.facilitator_id,e.network,e.token_address,s(e.fee_amount_wei),e.fee_bps,s(e.payment_amount_wei),n]);return E(r.rows[0])}{t.prepare(`
      INSERT INTO platform_fees (
        id, batch_id, payment_id, facilitator_id, network, token_address,
        fee_amount_wei, fee_bps, payment_amount_wei, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(a,e.batch_id||null,e.payment_id||null,e.facilitator_id,e.network,e.token_address,s(e.fee_amount_wei),e.fee_bps,s(e.payment_amount_wei),n);let r=t.prepare("SELECT * FROM platform_fees WHERE id = ?").get(a);return E(r)}}async function F(e){let t=(0,r.getDb)(),a=new Date().toISOString();_(t)?await t.pool.query("UPDATE platform_fees SET status = 'captured', captured_at = $2 WHERE id = $1",[e,a]):t.prepare("UPDATE platform_fees SET status = 'captured', captured_at = ? WHERE id = ?").run(a,e)}async function v(e,t,a){let n=(0,r.getDb)(),i="SELECT COALESCE(SUM(fee_amount_wei), 0) as total FROM platform_fees WHERE status = 'pending'",s=[];if(_(n)){let r=1;e&&(i+=` AND facilitator_id = $${r++}`,s.push(e)),t&&(i+=` AND network = $${r++}`,s.push(t)),a&&(i+=` AND token_address = $${r++}`,s.push(a));let _=await n.pool.query(i,s);return BigInt(_.rows[0]?.total||"0")}{e&&(i+=" AND facilitator_id = ?",s.push(e)),t&&(i+=" AND network = ?",s.push(t)),a&&(i+=" AND token_address = ?",s.push(a));let r=n.prepare(i).get(...s);return BigInt(r?.total||"0")}}async function q(e){let t=(0,r.getDb)();if(_(t)){let a=await t.pool.query("SELECT * FROM platform_fees WHERE id = $1",[e]);return a.rows[0]?E(a.rows[0]):null}{let a=t.prepare("SELECT * FROM platform_fees WHERE id = ?").get(e);return a?E(a):null}}async function P(e){let t=(0,r.getDb)();return _(t)?(await t.pool.query("SELECT * FROM platform_fees WHERE batch_id = $1 ORDER BY created_at",[e])).rows.map(E):t.prepare("SELECT * FROM platform_fees WHERE batch_id = ? ORDER BY created_at").all(e).map(E)}async function x(e,t){let a=(0,r.getDb)(),n=t?.limit??100,i=t?.offset??0;if(_(a)){let r="SELECT * FROM platform_fees WHERE facilitator_id = $1",_=[e],s=2;return t?.status&&(r+=` AND status = $${s++}`,_.push(t.status)),t?.tokenAddress&&(r+=` AND token_address = $${s++}`,_.push(t.tokenAddress)),t?.network&&(r+=` AND network = $${s++}`,_.push(t.network)),r+=` ORDER BY created_at DESC LIMIT $${s++} OFFSET $${s}`,_.push(n,i),(await a.pool.query(r,_)).rows.map(E)}{let r="SELECT * FROM platform_fees WHERE facilitator_id = ?",_=[e];return t?.status&&(r+=" AND status = ?",_.push(t.status)),t?.tokenAddress&&(r+=" AND token_address = ?",_.push(t.tokenAddress)),t?.network&&(r+=" AND network = ?",_.push(t.network)),r+=" ORDER BY created_at DESC LIMIT ? OFFSET ?",_.push(n,i),a.prepare(r).all(..._).map(E)}}async function Y(e){let t=(0,r.getDb)();if(_(t)){let a=(await t.pool.query(`SELECT 
        COALESCE(SUM(fee_amount_wei), 0) as total,
        COALESCE(SUM(CASE WHEN status = 'pending' THEN fee_amount_wei ELSE 0 END), 0) as pending,
        COALESCE(SUM(CASE WHEN status = 'captured' THEN fee_amount_wei ELSE 0 END), 0) as captured,
        COALESCE(SUM(CASE WHEN status = 'withdrawn' THEN fee_amount_wei ELSE 0 END), 0) as withdrawn
       FROM platform_fees WHERE token_address = $1`,[e])).rows[0];return{total:BigInt(a.total||"0"),pending:BigInt(a.pending||"0"),captured:BigInt(a.captured||"0"),withdrawn:BigInt(a.withdrawn||"0")}}{let a=t.prepare(`SELECT 
        COALESCE(SUM(fee_amount_wei), 0) as total,
        COALESCE(SUM(CASE WHEN status = 'pending' THEN fee_amount_wei ELSE 0 END), 0) as pending,
        COALESCE(SUM(CASE WHEN status = 'captured' THEN fee_amount_wei ELSE 0 END), 0) as captured,
        COALESCE(SUM(CASE WHEN status = 'withdrawn' THEN fee_amount_wei ELSE 0 END), 0) as withdrawn
       FROM platform_fees WHERE token_address = ?`).get(e);return{total:BigInt(a?.total||"0"),pending:BigInt(a?.pending||"0"),captured:BigInt(a?.captured||"0"),withdrawn:BigInt(a?.withdrawn||"0")}}}async function V(e,t,a){let n=(0,r.getDb)(),i=new Date().toISOString();_(n)?"captured"===t?await n.pool.query("UPDATE platform_fees SET status = $2, captured_at = $3 WHERE id = $1",[e,t,i]):"withdrawn"===t&&a?await n.pool.query("UPDATE platform_fees SET status = $2, withdrawal_tx = $3, withdrawn_at = $4 WHERE id = $1",[e,t,a,i]):await n.pool.query("UPDATE platform_fees SET status = $2 WHERE id = $1",[e,t]):"captured"===t?n.prepare("UPDATE platform_fees SET status = ?, captured_at = ? WHERE id = ?").run(t,i,e):"withdrawn"===t&&a?n.prepare("UPDATE platform_fees SET status = ?, withdrawal_tx = ?, withdrawn_at = ? WHERE id = ?").run(t,a,i,e):n.prepare("UPDATE platform_fees SET status = ? WHERE id = ?").run(t,e)}async function G(e,t){let a=(0,r.getDb)(),n=t?.limit??100;if(_(a)){let r="SELECT * FROM settlement_audit_logs WHERE action = $1",i=[e],_=2;return t?.batchId&&(r+=` AND batch_id = $${_++}`,i.push(t.batchId)),t?.escrowId&&(r+=` AND escrow_id = $${_++}`,i.push(t.escrowId)),t?.startDate&&(r+=` AND created_at >= $${_++}`,i.push(t.startDate.toISOString())),t?.endDate&&(r+=` AND created_at <= $${_++}`,i.push(t.endDate.toISOString())),r+=` ORDER BY created_at DESC LIMIT $${_}`,i.push(n),(await a.pool.query(r,i)).rows.map(e=>({...e,amount_wei:o(e.amount_wei),previous_balance_wei:o(e.previous_balance_wei),new_balance_wei:o(e.new_balance_wei),created_at:new Date(e.created_at)}))}{let r="SELECT * FROM settlement_audit_logs WHERE action = ?",i=[e];return t?.batchId&&(r+=" AND batch_id = ?",i.push(t.batchId)),t?.escrowId&&(r+=" AND escrow_id = ?",i.push(t.escrowId)),t?.startDate&&(r+=" AND created_at >= ?",i.push(t.startDate.toISOString())),t?.endDate&&(r+=" AND created_at <= ?",i.push(t.endDate.toISOString())),r+=" ORDER BY created_at DESC LIMIT ?",i.push(n),a.prepare(r).all(...i).map(e=>({...e,amount_wei:o(e.amount_wei),previous_balance_wei:o(e.previous_balance_wei),new_balance_wei:o(e.new_balance_wei),created_at:new Date(e.created_at)}))}}async function J(e){let t=(0,r.getDb)(),a=e?.limit??100,n=e?.offset??0;if(_(t)){let r="SELECT * FROM settlement_audit_logs WHERE 1=1",i=[],_=1;return e?.action&&(r+=` AND action = $${_++}`,i.push(e.action)),e?.startDate&&(r+=` AND created_at >= $${_++}`,i.push(e.startDate.toISOString())),e?.endDate&&(r+=` AND created_at <= $${_++}`,i.push(e.endDate.toISOString())),r+=` ORDER BY created_at DESC LIMIT $${_++} OFFSET $${_}`,i.push(a,n),(await t.pool.query(r,i)).rows.map(e=>({...e,amount_wei:o(e.amount_wei),previous_balance_wei:o(e.previous_balance_wei),new_balance_wei:o(e.new_balance_wei),created_at:new Date(e.created_at)}))}{let r="SELECT * FROM settlement_audit_logs WHERE 1=1",i=[];return e?.action&&(r+=" AND action = ?",i.push(e.action)),e?.startDate&&(r+=" AND created_at >= ?",i.push(e.startDate.toISOString())),e?.endDate&&(r+=" AND created_at <= ?",i.push(e.endDate.toISOString())),r+=" ORDER BY created_at DESC LIMIT ? OFFSET ?",i.push(a,n),t.prepare(r).all(...i).map(e=>({...e,amount_wei:o(e.amount_wei),previous_balance_wei:o(e.previous_balance_wei),new_balance_wei:o(e.new_balance_wei),created_at:new Date(e.created_at)}))}}[r]=i.then?(await i)():i,(0,n.createLogger)({component:"BatchSettlementDB"}),e.s(["addPaymentToBatch",()=>b,"capturePlatformFee",()=>F,"cleanupExpiredQueueItems",()=>I,"createAuditLog",()=>W,"createBatchSettlement",()=>w,"createPlatformFee",0,M,"createSettlementProof",()=>C,"dequeuePayments",()=>N,"enqueuePayment",()=>R,"getAllAuditLogs",()=>J,"getAuditLogsByAction",()=>G,"getBatchAuditLogs",()=>B,"getBatchPayments",()=>g,"getBatchSettlement",()=>m,"getBatchSettlementByBatchId",()=>f,"getEscrowAccount",()=>A,"getPendingBatches",()=>h,"getPlatformFee",()=>q,"getPlatformFeesByBatch",()=>P,"getPlatformFeesByFacilitator",()=>x,"getQueuedPayments",()=>T,"getSettlementProof",()=>H,"getTotalFeesByToken",()=>Y,"getTotalPendingFees",()=>v,"incrementBatchRetry",()=>D,"recordPlatformFee",()=>M,"updateBatchStatus",()=>S,"updateEscrowBalance",()=>L,"updatePaymentMerkleData",()=>$,"updatePaymentStatus",()=>y,"updatePendingSettlement",()=>k,"updatePlatformFeeStatus",()=>V,"updateProofVerificationStatus",()=>U,"upsertEscrowAccount",()=>O]),a()}catch(e){a(e)}},!1)];

//# sourceMappingURL=src_db_batch-settlement_ts_9fa4056e._.js.map