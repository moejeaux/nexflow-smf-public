# NexFlow AgentCard Catalog

Public catalog of discoverable AI agent services with x402 payment routing through NexFlow SMF.

## Browse Cards

### Official NexFlow Services

Production-ready services operated by NexFlow:

- **[Pulse Scheduler](./nexflow/nexflow-pulse-scheduler.json)** - Cron-as-a-Service for AI agents ($0.0015 USDC/execution)
- **[URL Enrichment API](./nexflow/nexflow-url-enrichment.json)** - Generate AgentCards from URLs ($0.005 USDC)
- **[ACP Facilitator](./nexflow/nexflow-acp-facilitator.json)** - Agent payment routing & settlement
- **[Complete Catalog](./nexflow/catalog.json)** - All NexFlow services

### Community Services

Services contributed by the community:

- Browse `./community/` for agent services built on NexFlow
- See [CONTRIBUTING.md](../CONTRIBUTING.md) to add your service

---

## What is an AgentCard?

An **AgentCard** is a JSON document that describes an AI agent service in a machine-readable format. It includes:

- Service metadata (name, description, capabilities)
- Payment requirements (x402, asset, amount)
- Endpoint URLs and authentication
- Provider/operator information

**Example card structure:**

```json
{
  "name": "My AI Service",
  "url": "https://api.example.com/v1/service",
  "description": "AI-powered data analysis",
  "capabilities": {
    "x402": true
  },
  "payment_details": {
    "payment_protocol": "x402",
    "payment_url": "https://nexflow.example.com/verify",
    "asset": "USDC",
    "network": "base-mainnet",
    "amount": "0.01"
  },
  "tags": ["ai", "data", "analysis"]
}
```

---

## Using These Cards

### For AI Agents

```typescript
import { NexflowClient } from '@nexflow/sdk';

// Fetch a card
const card = await fetch('https://raw.githubusercontent.com/your-org/nexflow-smf-public/main/agentcards/nexflow/nexflow-pulse-scheduler.json');

// Use with NexFlow SDK
const client = new NexflowClient();
await client.callService(card);
```

### For Developers

```bash
# Browse all cards
curl https://api.github.com/repos/your-org/nexflow-smf-public/contents/agentcards

# Fetch specific card
curl https://raw.githubusercontent.com/your-org/nexflow-smf-public/main/agentcards/nexflow/nexflow-pulse-scheduler.json
```

---

## Directory Structure

```
agentcards/
├── README.md                    # This file
├── SUBMISSION_GUIDE.md          # How to add your card
├── template.json                # Card template
├── nexflow/                     # Official NexFlow cards
│   ├── catalog.json            # Complete catalog
│   ├── nexflow-pulse-scheduler.json
│   ├── nexflow-acp-facilitator.json
│   └── ...
└── community/                   # Community-contributed cards
    ├── example-service.json
    └── your-service.json
```

---

## Submit Your Service

Want to add your AI agent service to this catalog?

1. **Read the [Submission Guide](./SUBMISSION_GUIDE.md)**
2. **Copy [template.json](./template.json)**
3. **Fill in your service details**
4. **Submit a PR to `agentcards/community/`**

**Requirements:**
- Service must support x402 payments through NexFlow
- Valid JSON structure following AgentCard schema
- Working endpoint URLs
- Clear description and tags

---

## Card Standards

All cards in this catalog follow these conventions:

### Required Fields
- `name` - Human-readable service name
- `url` - Service endpoint URL
- `description` - Clear description of what the service does

### Payment Fields
- `payment_details.payment_protocol` - Must be `"x402"`
- `payment_details.payment_url` - NexFlow x402 verification endpoint
- `payment_details.asset` - Payment asset (e.g., "USDC")
- `payment_details.network` - Blockchain network (e.g., "base-mainnet")

### Recommended Fields
- `tags` - Array of relevant keywords
- `capabilities.x402` - Boolean indicating x402 support
- `version` - Service API version
- `provider` - Service operator name

---

## Validation

All submissions are automatically validated for:

- ✅ Valid JSON syntax
- ✅ Required fields present
- ✅ URLs are valid and reachable
- ✅ Payment details properly configured
- ✅ No malicious content

---

## Discovery Platforms

Cards in this catalog are indexed by:

- [x402 Index](https://x402index.com/)
- [Coinbase Bazaar](https://www.coinbase.com/bazaar)
- [NexFlow Dashboard](https://nexflowapp.app/cards)

---

## License

All cards in this catalog are provided under the MIT License. See [LICENSE](../LICENSE) for details.

Service providers retain all rights to their services and data.

---

## Support

- **Questions?** Open an issue
- **Need help?** Join our Discord
- **Found a bug?** Submit a PR

---

**Powered by [NexFlow SMF](https://github.com/your-org/nexflow-smf-public)**
