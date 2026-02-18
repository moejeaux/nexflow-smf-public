---
name: nexflow-smf-healthcheck-v1
description: >
  Ping NexFlow SMF for status and latency. Use to verify the service is up
  before routing payments or to monitor availability.
---

## When to use this skill

Use this skill when:
- You need to confirm NexFlow SMF is reachable before committing to a paid call.
- You are building health dashboards or uptime checks.
- You are debugging connectivity or deciding whether to retry after a failure.

Do not use for probing arbitrary x402 endpoints; use a generic x402 healthcheck capability for that.

## HTTP API

- Method: GET  
- URL: `https://api.nexflow.xyz/api/smf/v1/healthcheck`  
- Auth: none required for basic health.

### Response shape

On success (2xx):

```json
{
  "status": "ok",
  "service": "nexflow-smf",
  "version": "v1",
  "latency_ms": 42,
  "timestamp": "2026-02-17T16:20:00Z"
}
```

If the service is degraded, `status` may be "degraded" with optional `message` or `details`. Treat non-2xx or missing `status: ok` as unavailable.

## Pricing

This endpoint is free. No x402 payment is required for basic health.

## Test usage

- Add header: `X-Nexflow-Test: 1` if the test environment requires it.
- Use for smoke tests and CI to ensure the SMF base URL is reachable.

## Usage examples for agents

- "Check if NexFlow SMF is up before calling route-matrix."
- "Measure SMF latency for a status page."
- "Verify connectivity to api.nexflow.xyz SMF before retrying a failed payment."
