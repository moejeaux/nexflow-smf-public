# AgentCard Submission Guide

Add your AI agent service to the NexFlow AgentCard catalog and make it discoverable by AI agents worldwide.

---

## Prerequisites

Before submitting, ensure:

- ✅ Your service is **publicly accessible** (or documented as private/gated)
- ✅ Your service supports **x402 payments** through NexFlow SMF
- ✅ You have a **NexFlow facilitator endpoint** configured
- ✅ Your service has been **tested** and is operational

---

## Step 1: Copy the Template

```bash
# Clone the repo
git clone https://github.com/your-org/nexflow-smf-public.git
cd nexflow-smf-public/agentcards

# Copy template
cp template.json community/your-service-name.json
```

---

## Step 2: Fill Out Your Card

Edit `community/your-service-name.json`:

```json
{
  "name": "Your Service Name",
  "url": "https://api.yourservice.com/v1/endpoint",
  "description": "Clear, concise description of what your service does. Be specific about capabilities and use cases.",
  "version": "1.0",
  "provider": "your-company-or-username",
  
  "capabilities": {
    "x402": true,
    "streaming": false,
    "batch": false
  },
  
  "payment_details": {
    "payment_protocol": "x402",
    "payment_url": "https://your-nexflow-facilitator.com/verify",
    "asset": "USDC",
    "network": "base-mainnet",
    "amount": "0.01",
    "scheme": "exact"
  },
  
  "tags": [
    "ai",
    "data-processing",
    "analysis",
    "your-category"
  ],
  
  "contact": {
    "email": "support@yourservice.com",
    "website": "https://yourservice.com",
    "docs": "https://docs.yourservice.com"
  },
  
  "x_custom": {
    "rate_limit": "100/hour",
    "authentication": "x402-only",
    "additional_info": "Any service-specific metadata"
  }
}
```

### Field Guidelines

#### Required Fields

**`name`** (string)
- Human-readable service name
- Example: `"AI Image Generator"`, `"Sentiment Analysis API"`

**`url`** (string)
- Your service's primary endpoint URL
- Must be HTTPS in production
- Example: `"https://api.example.com/v1/generate"`

**`description`** (string)
- Clear, concise description (1-3 sentences)
- Explain what the service does and key capabilities
- Example: `"Generate high-quality images from text prompts using AI. Supports multiple styles, resolutions, and formats."`

#### Payment Fields (Required)

**`payment_details`** (object)
- `payment_protocol`: Always `"x402"`
- `payment_url`: Your NexFlow facilitator x402 verification endpoint
- `asset`: Payment asset (e.g., `"USDC"`, `"ETH"`)
- `network`: Blockchain network (e.g., `"base-mainnet"`, `"ethereum"`)
- `amount`: Price per request (string, e.g., `"0.01"`)
- `scheme`: Payment scheme, usually `"exact"`

#### Recommended Fields

**`tags`** (array of strings)
- Relevant keywords for discovery
- Use lowercase, hyphenated format
- Examples: `["ai", "image-generation", "stable-diffusion"]`

**`capabilities`** (object)
- `x402`: Boolean - x402 payment support (should be `true`)
- Add any other capability flags your service supports

**`version`** (string)
- Your service's API version
- Example: `"1.0"`, `"2.1.0"`

**`provider`** (string)
- Your company/username
- Example: `"acme-ai"`, `"john-doe"`

**`contact`** (object)
- `email`: Support email
- `website`: Your service's website
- `docs`: API documentation URL

---

## Step 3: Validate Your Card

### Check JSON Syntax

```bash
# Validate JSON
jq empty community/your-service-name.json && echo "✅ Valid JSON" || echo "❌ Invalid JSON"
```

### Check Required Fields

```bash
# Check for required fields
jq 'has("name") and has("url") and has("description") and has("payment_details")' \
  community/your-service-name.json
```

### Test Your Service

Before submitting, verify:

```bash
# Test service endpoint is reachable
curl -I https://api.yourservice.com/v1/endpoint

# Test payment endpoint
curl -X POST https://your-nexflow-facilitator.com/verify \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

---

## Step 4: Submit Pull Request

```bash
# Create a branch
git checkout -b add-your-service-card

# Add your card
git add agentcards/community/your-service-name.json

# Commit with descriptive message
git commit -m "Add AgentCard: Your Service Name"

# Push to your fork
git push origin add-your-service-card

# Open PR on GitHub
```

### PR Checklist

Your PR should include:

- ✅ Card file in `agentcards/community/`
- ✅ Filename matches pattern: `lowercase-with-hyphens.json`
- ✅ All required fields present
- ✅ Valid JSON syntax
- ✅ Service is operational and tested
- ✅ PR description explains what your service does

### PR Template

```markdown
## Add AgentCard: [Your Service Name]

**Service:** [Brief description]
**Endpoint:** https://api.yourservice.com/v1/endpoint
**Pricing:** $0.01 USDC per request

### Checklist
- [x] Service is publicly accessible
- [x] x402 payments tested and working
- [x] JSON validated
- [x] All required fields present
- [x] Service documentation available

### Additional Notes
[Any special information reviewers should know]
```

---

## Step 5: Review Process

After submission:

1. **Automated checks** run (JSON validation, required fields)
2. **Manual review** by NexFlow team (1-3 business days)
3. **Feedback** provided if changes needed
4. **Merge** when approved
5. **Indexed** in discovery platforms within 24 hours

### Common Review Issues

❌ **Missing required fields**
- Solution: Add all required fields per template

❌ **Invalid JSON syntax**
- Solution: Use `jq` or online validator to check

❌ **Service not reachable**
- Solution: Verify URL is correct and publicly accessible

❌ **x402 payment not working**
- Solution: Test payment flow end-to-end before submitting

❌ **Insufficient description**
- Solution: Provide clear, detailed description of service

---

## Examples

### Minimal Card

```json
{
  "name": "Simple AI Service",
  "url": "https://api.example.com/v1/process",
  "description": "Process data with AI",
  "payment_details": {
    "payment_protocol": "x402",
    "payment_url": "https://nexflow.example.com/verify",
    "asset": "USDC",
    "network": "base-mainnet",
    "amount": "0.01"
  },
  "tags": ["ai", "processing"]
}
```

### Complete Card

```json
{
  "name": "Advanced AI Vision API",
  "url": "https://api.visionai.example.com/v2/analyze",
  "description": "State-of-the-art computer vision API for object detection, image classification, and scene understanding. Supports batch processing and real-time streaming.",
  "version": "2.1.0",
  "provider": "visionai-labs",
  
  "capabilities": {
    "x402": true,
    "streaming": true,
    "batch": true,
    "async": true
  },
  
  "payment_details": {
    "payment_protocol": "x402",
    "payment_url": "https://facilitator.visionai.example.com/x402/verify",
    "asset": "USDC",
    "network": "base-mainnet",
    "amount": "0.05",
    "scheme": "exact"
  },
  
  "tags": [
    "ai",
    "computer-vision",
    "image-analysis",
    "object-detection",
    "classification"
  ],
  
  "contact": {
    "email": "support@visionai.example.com",
    "website": "https://visionai.example.com",
    "docs": "https://docs.visionai.example.com/api/v2",
    "support": "https://support.visionai.example.com"
  },
  
  "rate_limits": {
    "requests_per_minute": 100,
    "requests_per_day": 10000
  },
  
  "sla": {
    "uptime": "99.9%",
    "response_time_ms": 200,
    "support_response_hours": 24
  },
  
  "x_custom": {
    "supported_formats": ["jpg", "png", "webp"],
    "max_file_size_mb": 10,
    "models": ["yolov8", "efficientnet", "resnet"]
  }
}
```

---

## Best Practices

### Naming
- Use clear, descriptive names
- Avoid generic names like "AI API"
- Include key differentiator: "AI Image Generator - Anime Style"

### Descriptions
- Start with what the service does
- Include key capabilities in first sentence
- Mention unique features or advantages
- Keep it under 200 characters if possible

### Pricing
- Be transparent about costs
- Use standard units (0.01, 0.005, etc.)
- Consider competitive pricing
- Document any volume discounts in description

### Tags
- Use 3-7 relevant tags
- Include general category (`"ai"`, `"data"`)
- Include specific technology (`"gpt-4"`, `"stable-diffusion"`)
- Include use case (`"image-generation"`, `"text-analysis"`)

### URLs
- Always use HTTPS in production
- Use versioned endpoints (`.../v1/...`)
- Keep URLs stable (don't change frequently)
- Use meaningful path structures

---

## Updates

Need to update your card?

```bash
# Edit your card
nano agentcards/community/your-service-name.json

# Submit update PR
git checkout -b update-your-service-card
git add agentcards/community/your-service-name.json
git commit -m "Update: Your Service Name - [what changed]"
git push origin update-your-service-card
```

---

## Removal

To remove your card:

1. Open an issue explaining why
2. Submit PR removing the file
3. We'll process within 48 hours

---

## Questions?

- **General questions:** Open a GitHub issue
- **Technical support:** support@nexflowapp.app
- **Security concerns:** security@nexflowapp.app

---

## Resources

- [AgentCard Schema](./SCHEMA.md)
- [NexFlow SMF Documentation](../docs/)
- [x402 Protocol](https://x402.org/)
- [Example Services](./community/)

---

**Ready to submit? Let's make your service discoverable! 🚀**
