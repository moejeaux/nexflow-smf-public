module.exports=[87768,t=>t.a(async(e,a)=>{try{var r=t.i(50377),i=t.i(30056),n=e([i]);[i]=n.then?(await n)():n;let h=(0,r.createLogger)({component:"FacilitatorMetricsService"}),v=null;function o(){if(v)return v;let t=process.env.DATABASE_URL;return t&&t.startsWith("postgresql://")?v=new i.Pool({connectionString:t,max:5,idleTimeoutMillis:3e4,connectionTimeoutMillis:5e3}):null}async function s(t){let e=o();if(!e||0===t.length)return;let a=await e.connect();try{for(let e of(await a.query("BEGIN"),t))await a.query(`
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
      `,[e.kind,e.facilitatorId,e.resourceUrl||null,e.serverId||null,e.network||null,e.timeframe,e.bucketMinutes,e.timeBucketStart,e.timeBucketEnd,e.invocations,e.successCount,e.failureCount,e.count2xx,e.count3xx,e.count4xx,e.count5xx,e.errorRate,e.avgLatencyMs||null,e.p50LatencyMs||null,e.p90LatencyMs||null,e.p95LatencyMs||null,e.p99LatencyMs||null,e.methods?JSON.stringify(e.methods):null,e.fetchedAt]);await a.query("COMMIT"),h.info({count:t.length,facilitatorId:t[0]?.facilitatorId,timeframe:t[0]?.timeframe,msg:"Facilitator metrics upserted to database"})}catch(t){throw await a.query("ROLLBACK"),t}finally{a.release()}}async function c(t,e){let a=o();if(!a)return[];let r=`
    SELECT * FROM smf_facilitator_metrics
    WHERE fetched_at > NOW() - INTERVAL '30 days'
  `,i=[],n=1;return t&&(r+=` AND facilitator_id = $${n}`,i.push(t),n++),e&&(r+=` AND timeframe = $${n}`,i.push(e),n++),r+=" ORDER BY time_bucket_start DESC LIMIT 1000",(await a.query(r,i)).rows.map(l)}function l(t){return{kind:t.kind||"facilitator-global",facilitatorId:t.facilitator_id,resourceUrl:t.resource_url||void 0,serverId:t.server_id||void 0,network:t.network||void 0,timeframe:t.timeframe,bucketMinutes:t.bucket_minutes,timeBucketStart:t.time_bucket_start?.toISOString()||t.time_bucket_start,timeBucketEnd:t.time_bucket_end?.toISOString()||t.time_bucket_end,invocations:t.invocations,successCount:t.success_count,failureCount:t.failure_count,count2xx:t.count_2xx,count3xx:t.count_3xx,count4xx:t.count_4xx,count5xx:t.count_5xx,errorRate:parseFloat(t.error_rate)||0,avgLatencyMs:t.avg_latency_ms?parseFloat(t.avg_latency_ms):void 0,p50LatencyMs:t.p50_latency_ms?parseFloat(t.p50_latency_ms):void 0,p90LatencyMs:t.p90_latency_ms?parseFloat(t.p90_latency_ms):void 0,p95LatencyMs:t.p95_latency_ms?parseFloat(t.p95_latency_ms):void 0,p99LatencyMs:t.p99_latency_ms?parseFloat(t.p99_latency_ms):void 0,methods:t.methods||void 0,fetchedAt:t.fetched_at?.toISOString()||t.fetched_at}}async function u(t){let e=o();if(!e)return;let a=t.dataStart&&t.dataStart.length>0?t.dataStart:null,r=t.dataEnd&&t.dataEnd.length>0?t.dataEnd:null;0!==t.totalInvocations||a||r?(await e.query(`
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
  `,[t.facilitatorId,t.timeframe,t.totalInvocations,t.totalSuccesses,t.totalFailures,t.overallErrorRate,t.avgP50LatencyMs||null,t.avgP90LatencyMs||null,t.avgP99LatencyMs||null,JSON.stringify(t.topMethods),a,r,t.fetchedAt]),h.info({facilitatorId:t.facilitatorId,timeframe:t.timeframe,totalInvocations:t.totalInvocations,msg:"Facilitator summary upserted to database"})):h.debug({facilitatorId:t.facilitatorId,timeframe:t.timeframe,msg:"Skipping summary with no data"})}async function _(){let t=o();if(!t)return{};let e=await t.query(`
    SELECT * FROM smf_facilitator_summaries
    ORDER BY fetched_at DESC
  `),a={};for(let t of e.rows)a[`${t.facilitator_id}:${t.timeframe}`]={facilitatorId:t.facilitator_id,timeframe:t.timeframe,totalInvocations:parseInt(t.total_invocations)||0,totalSuccesses:parseInt(t.total_successes)||0,totalFailures:parseInt(t.total_failures)||0,overallErrorRate:parseFloat(t.overall_error_rate)||0,avgP50LatencyMs:t.avg_p50_latency_ms?parseFloat(t.avg_p50_latency_ms):void 0,avgP90LatencyMs:t.avg_p90_latency_ms?parseFloat(t.avg_p90_latency_ms):void 0,avgP99LatencyMs:t.avg_p99_latency_ms?parseFloat(t.avg_p99_latency_ms):void 0,topMethods:t.top_methods||[],dataStart:t.data_start?.toISOString()||t.data_start,dataEnd:t.data_end?.toISOString()||t.data_end,fetchedAt:t.fetched_at?.toISOString()||t.fetched_at};return a}async function d(t){if(0===t.length)return void h.debug("No metrics to upsert");if(o())try{await s(t);return}catch(t){throw h.error({error:t,msg:"Failed to upsert metrics to database"}),t}h.warn({count:t.length,msg:"Database not available, metrics not persisted"})}async function m(){if(o())try{return await _()}catch(t){h.error({error:t,msg:"Failed to load summaries from database"})}return{}}async function f(t){if(o())try{await u(t);return}catch(t){throw h.error({error:t,msg:"Failed to upsert summary to database"}),t}h.warn({facilitatorId:t.facilitatorId,msg:"Database not available, summary not persisted"})}async function E(t){for(let e of t)await f(e)}async function y(t,e){if(o())try{return await c(t,e)}catch(t){h.error({error:t,msg:"Failed to get metrics for facilitator"})}return[]}async function g(t,e){return(await m())[`${t}:${e}`]??null}t.s(["getMetricsForFacilitator",()=>y,"getSummary",()=>g,"loadAllSummaries",()=>m,"upsertFacilitatorPathMetrics",()=>d,"upsertFacilitatorSummaries",()=>E]),a()}catch(t){a(t)}},!1),3004,t=>t.a(async(e,a)=>{try{var r=t.i(50377),i=t.i(30056),n=e([i]);[i]=n.then?(await n)():n;let E=(0,r.createLogger)({component:"FacilitatorVolumeService"}),y=null;function o(){if(y)return y;let t=process.env.DATABASE_URL;return t&&t.startsWith("postgresql://")?y=new i.Pool({connectionString:t,max:5,idleTimeoutMillis:3e4,connectionTimeoutMillis:5e3}):null}async function s(t){let e=o();if(!e||0===t.length)return;let a=await e.connect(),r=new Date().toISOString(),i=crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(36).slice(2)}`;try{for(let e of(await a.query("BEGIN"),t))await a.query(`
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
      `,[e.facilitatorId,e.period,e.volumeUsd3d,e.txCount3d,e.uniqueBuyers3d,e.uniqueSellers3d,e.volumeUsdAllTime,JSON.stringify(e.chains),e.volumeChangeRate??null,e.txChangeRate??null,r]),await a.query(`
        INSERT INTO smf_scattering_history (
          snapshot_id, facilitator_id, period,
          volume_usd_3d, tx_count_3d, unique_buyers_3d, unique_sellers_3d,
          volume_usd_all_time, chains, volume_change_rate, tx_change_rate,
          fetched_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `,[i,e.facilitatorId,e.period,e.volumeUsd3d,e.txCount3d,e.uniqueBuyers3d,e.uniqueSellers3d,e.volumeUsdAllTime,JSON.stringify(e.chains),e.volumeChangeRate??null,e.txChangeRate??null,r]);await a.query("COMMIT");let e=t.reduce((t,e)=>t+e.volumeUsd3d,0),n=t.reduce((t,e)=>t+e.txCount3d,0);E.info({facilitatorCount:t.length,totalVolume3d:`$${f(e)}`,totalTxns3d:f(n),msg:"Scattering metrics upserted to database"})}catch(t){throw await a.query("ROLLBACK"),t}finally{a.release()}}async function c(){let t=o();if(!t)return{};let e=await t.query(`
    SELECT * FROM smf_scattering_metrics
    ORDER BY fetched_at DESC
  `),a={};for(let t of e.rows)a[t.facilitator_id]=l(t);return a}function l(t){return{facilitatorId:t.facilitator_id,period:t.period||"3d",volumeUsd3d:parseFloat(t.volume_usd_3d)||0,txCount3d:parseInt(t.tx_count_3d)||0,uniqueBuyers3d:t.unique_buyers_3d||0,uniqueSellers3d:t.unique_sellers_3d||0,volumeUsdAllTime:parseFloat(t.volume_usd_all_time)||0,chains:t.chains||[],volumeChangeRate:t.volume_change_rate?parseFloat(t.volume_change_rate):void 0,txChangeRate:t.tx_change_rate?parseFloat(t.tx_change_rate):void 0,fetchedAt:t.fetched_at?.toISOString()||t.fetched_at}}async function u(t){if(0===t.length)return void E.debug("No Scattering metrics to upsert");if(o())try{await s(t);return}catch(t){throw E.error({error:t,msg:"Failed to upsert Scattering metrics to database"}),t}let e=t.reduce((t,e)=>t+e.volumeUsd3d,0),a=t.reduce((t,e)=>t+e.txCount3d,0);E.warn({facilitatorCount:t.length,totalVolume3d:`$${f(e)}`,totalTxns3d:f(a),msg:"Database not available, Scattering metrics not persisted"})}async function _(t){let e=o();if(!e)return null;try{let a=await e.query(`
      SELECT * FROM smf_scattering_metrics
      WHERE facilitator_id = $1
      ORDER BY fetched_at DESC
      LIMIT 1
    `,[t]);if(0===a.rows.length)return null;return l(a.rows[0])}catch(e){return E.error({error:e,facilitatorId:t,msg:"Failed to get Scattering metrics"}),null}}async function d(t){let e=new Map;if(!o()){for(let a of t)e.set(a,null);return e}try{let a=await c();for(let r of t)e.set(r,a[r]??null);return e}catch(a){for(let r of(E.error({error:a,msg:"Failed to get Scattering metrics for facilitators"}),t))e.set(r,null);return e}}function m(t){let e=Math.min(t.volumeUsd3d/2e5,1),a=Math.min(t.txCount3d/3e6,1),r=Math.min(t.uniqueBuyers3d/15e3,1),i=Math.min(t.uniqueSellers3d/1e3,1),n=.5;void 0!==t.volumeChangeRate&&(n=(Math.max(-100,Math.min(100,t.volumeChangeRate))+100)/200);let o=.3*e+.3*a+.2*r+.1*i+.1*n;return Math.min(Math.max(o,0),1)}function f(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}K`:t.toFixed(2)}t.s(["computeActivityScore",()=>m,"getScatteringMetricsForFacilitator",()=>_,"getScatteringMetricsForFacilitators",()=>d,"upsertScatteringMetrics",()=>u]),a()}catch(t){a(t)}},!1)];

//# sourceMappingURL=src_services_b76bdbea._.js.map