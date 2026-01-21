module.exports = [
"[project]/src/lib/webhook-queue.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================================================
// WEBHOOK DELIVERY QUEUE
// =============================================================================
// BullMQ queue for webhook delivery with retry logic
// Note: bullmq may not be installed - this module handles missing dependencies gracefully
__turbopack_context__.s([
    "cleanupQueue",
    ()=>cleanupQueue,
    "enqueueWebhookDelivery",
    ()=>enqueueWebhookDelivery,
    "getQueueStats",
    ()=>getQueueStats,
    "webhookQueue",
    ()=>webhookQueue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/logger.ts [app-route] (ecmascript)");
;
const logger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createLogger"])({
    component: 'WebhookQueue'
});
// Lazy load bullmq to handle missing dependencies
let Queue;
let QueueOptions;
let webhookQueueInstance = null;
async function loadBullMQ() {
    if (!Queue) {
        try {
            // Use dynamic import with webpack ignore comment to prevent build-time resolution
            // @ts-ignore - bullmq may not be installed
            const bullmq = await import(/* webpackIgnore: true */ 'bullmq').catch(()=>{
                // Fallback: return null if module doesn't exist
                return null;
            });
            if (!bullmq) {
                throw new Error('bullmq package not installed');
            }
            Queue = bullmq.Queue;
            QueueOptions = bullmq.QueueOptions;
        } catch (error) {
            logger.warn({
                error
            }, 'bullmq not available - webhook queue features will be disabled');
            throw new Error('bullmq package not installed');
        }
    }
    return {
        Queue,
        QueueOptions
    };
}
async function getWebhookQueue() {
    if (!webhookQueueInstance) {
        try {
            const { Queue: QueueClass, QueueOptions: QueueOptionsType } = await loadBullMQ();
            // Redis connection configuration
            const redisConnection = {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT || '6379'),
                password: process.env.REDIS_PASSWORD,
                // Use REDIS_URL if provided (for cloud Redis like Upstash)
                ...process.env.REDIS_URL ? {
                    url: process.env.REDIS_URL
                } : {}
            };
            // Queue options
            const queueOptions = {
                connection: redisConnection,
                defaultJobOptions: {
                    attempts: 3,
                    backoff: {
                        type: 'exponential',
                        delay: 2000
                    },
                    removeOnComplete: {
                        age: 24 * 3600,
                        count: 1000
                    },
                    removeOnFail: {
                        age: 7 * 24 * 3600
                    }
                }
            };
            // Create webhook delivery queue
            webhookQueueInstance = new QueueClass('webhook-delivery', queueOptions);
        } catch (error) {
            logger.warn({
                error
            }, 'Failed to initialize webhook queue');
            return null;
        }
    }
    return webhookQueueInstance;
}
const webhookQueue = {
    get instance () {
        // This will only work in runtime, not during build
        // Use getWebhookQueue() instead for async access
        return webhookQueueInstance;
    }
};
async function enqueueWebhookDelivery(data) {
    try {
        const queue = await getWebhookQueue();
        if (!queue) {
            throw new Error('Webhook queue not available (bullmq not installed or Redis not configured)');
        }
        const job = await queue.add('deliver', data, {
            jobId: `webhook_${data.webhookConfigId}_${data.eventId}_${Date.now()}`
        });
        logger.info('Webhook delivery job enqueued', {
            jobId: job.id,
            webhookConfigId: data.webhookConfigId,
            eventId: data.eventId,
            url: data.url
        });
        return job.id;
    } catch (error) {
        logger.error('Failed to enqueue webhook delivery', {
            webhookConfigId: data.webhookConfigId,
            eventId: data.eventId,
            error
        });
        throw error;
    }
}
async function getQueueStats() {
    const queue = await getWebhookQueue();
    if (!queue) {
        return {
            waiting: 0,
            active: 0,
            completed: 0,
            failed: 0,
            delayed: 0,
            total: 0,
            available: false
        };
    }
    const [waiting, active, completed, failed, delayed] = await Promise.all([
        queue.getWaitingCount(),
        queue.getActiveCount(),
        queue.getCompletedCount(),
        queue.getFailedCount(),
        queue.getDelayedCount()
    ]);
    return {
        waiting,
        active,
        completed,
        failed,
        delayed,
        total: waiting + active + completed + failed + delayed,
        available: true
    };
}
async function cleanupQueue() {
    try {
        const queue = await getWebhookQueue();
        if (!queue) {
            logger.warn('Cannot cleanup queue - webhook queue not available');
            return;
        }
        // Clean up old completed jobs (beyond retention period)
        await queue.clean(24 * 3600 * 1000, 1000, 'completed');
        // Clean up old failed jobs (beyond retention period)
        await queue.clean(7 * 24 * 3600 * 1000, 1000, 'failed');
        logger.info('Queue cleanup completed');
    } catch (error) {
        logger.error('Failed to cleanup queue', {
            error
        });
    }
}
}),
];

//# sourceMappingURL=src_lib_webhook-queue_ts_cdea9e52._.js.map