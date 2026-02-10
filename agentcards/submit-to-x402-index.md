# Submit NexFlow AgentCards to x402 Index

Quick guide to submit your NexFlow services to the x402 Index for public discovery.

---

## Submission Form

**x402 Index Submission Form:** https://tally.so/r/3xozxv

---

## NexFlow Services to Submit

### 1. NexFlow Pulse - Cloud Scheduler

**Copy this information into the form:**

- **Product Name:** NexFlow Pulse - Cloud Scheduler
- **Website/Service URL:** https://api.nexflowapp.app/v1/pulse
- **Description:** Cron-as-a-Service API for AI agents. Schedule recurring tasks, webhooks, and compute jobs with x402 micropayments. Reliable at-least-once execution with retries and monitoring.
- **x402 Facilitator URL:** https://caas.nexflowapp.app/api/v1/facilitator/x402/verify
- **Submitter Wallet Address:** [Your wallet address from ACP_FACILITATOR_WALLET]
- **AgentCard URL:** https://nexflow-agentcards.pages.dev/nexflow/nexflow-pulse-scheduler.json
- **Documentation:** https://docs.nexflowapp.app/pulse
- **Pricing:** $0.0015 USDC per execution
- **Tags:** pulse, scheduler, cron, ai-agents, x402, automation

---

### 2. NexFlow URL Enrichment API

**Copy this information into the form:**

- **Product Name:** NexFlow URL Enrichment API
- **Website/Service URL:** https://api.nexflowapp.app/api/v1/enrich
- **Description:** x402-gated URL enrichment service. Generate AgentCards with payment metadata from any URL. Extracts x402 capabilities, payment requirements, and service metadata.
- **x402 Facilitator URL:** https://caas.nexflowapp.app/api/v1/facilitator/x402/verify
- **Submitter Wallet Address:** [Your wallet address from ACP_FACILITATOR_WALLET]
- **AgentCard URL:** https://nexflow-agentcards.pages.dev/nexflow/nexflow-url-enrichment.json
- **Documentation:** https://docs.nexflowapp.app/enrichment
- **Pricing:** $0.005 USDC per request
- **Tags:** enrichment, agentcards, x402, metadata, discovery

---

### 3. NexFlow ACP Facilitator

**Copy this information into the form:**

- **Product Name:** NexFlow ACP Facilitator
- **Website/Service URL:** https://api.nexflowapp.app/acp/facilitator/status
- **Description:** Virtuals Protocol ACP Facilitator service. Agent payment routing and settlement for AI agents. Handles job acceptance, payment processing, and on-chain settlement.
- **x402 Facilitator URL:** https://caas.nexflowapp.app/api/v1/facilitator/x402/verify
- **Submitter Wallet Address:** [Your wallet address from ACP_FACILITATOR_WALLET]
- **AgentCard URL:** https://nexflow-agentcards.pages.dev/nexflow/nexflow-acp-facilitator.json
- **Documentation:** https://docs.nexflowapp.app/acp
- **Pricing:** Variable by job
- **Tags:** acp, virtuals, facilitator, payments, settlement

---

## Get Your Wallet Address

On your server:

```bash
cd ~/nexflow-deploy/packages/caas
cat .env | grep ACP_FACILITATOR_WALLET=
```

Copy the wallet address (starts with `0x...`).

---

## Quick Submission Steps

1. **Open the form:** https://tally.so/r/3xozxv

2. **For each service (do 3 times):**
   - Fill in the product details above
   - Paste your wallet address
   - Submit

3. **Wait for approval** (usually 24-48 hours)

4. **Verify listing:**
   ```bash
   curl https://x402index.com/api/all | jq '.[] | select(.name | contains("NexFlow"))'
   ```

---

## Update After Approval

Once listed, update your documentation:

**README.md:**
```markdown
## Discovery

Find our services on:
- [x402 Index](https://x402index.com/)
- [AgentCard Catalog](https://nexflow-agentcards.pages.dev/)
```

**Social Media:**
```
🎉 NexFlow is now listed on x402 Index!

Discover our AI agent services:
- Pulse Scheduler ($0.0015 USDC)
- URL Enrichment API ($0.005 USDC)
- ACP Facilitator

All payments via x402 micropayments on Base
→ https://x402index.com/
```

---

## Alternative: Contact x402 Index

If the form doesn't work or you want to submit in bulk:

- **Email:** support@x402.org (if available)
- **GitHub:** Open an issue on x402 repo
- **Discord:** Join x402 community
- **Twitter/X:** Tag @x402org with your submission

---

## After Submission

Your services will be discoverable via:

1. **x402 Index Directory:** https://x402index.com/
2. **x402 Index API:** `GET https://x402index.com/api/all`
3. **Your Cloudflare Pages:** https://nexflow-agentcards.pages.dev/
4. **GitHub:** https://github.com/moejeaux/nexflow-smf-public/tree/main/agentcards

---

**Ready to submit? Open the form and add your services now!** 🚀

https://tally.so/r/3xozxv
