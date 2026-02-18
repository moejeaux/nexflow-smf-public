# NexFlow SMF Agent Skills

Standalone [Cursor-style](https://cursor.com) agent skills for the NexFlow Smart Meta-Facilitator (SMF). Each folder is a self-contained skill bundle that teaches an AI agent how to call a specific SMF HTTP API. No proprietary data or secrets—safe to install in any skills-compatible agent.

**Base URL:** `https://api.nexflow.xyz/api/smf/v1/`

## Skills

| Skill | Purpose |
|-------|--------|
| [smf-route-matrix](./smf-route-matrix/) | Compare facilitators (fees, latency, success rate) for a given amount/asset/network. |
| [smf-route-quote](./smf-route-quote/) | Get a single quote for a chosen facilitator (fee and expiry). |
| [smf-settlement-receipt](./smf-settlement-receipt/) | Fetch a settlement receipt by `payment_id` for logging, audit, or verification. |
| [smf-list-facilitators](./smf-list-facilitators/) | List active facilitators, optionally by network/asset. |
| [smf-healthcheck](./smf-healthcheck/) | Ping SMF for status and latency (no payment). |
| [smf-simulate-charge](./smf-simulate-charge/) | See 402 pricing headers without paying. |
| [smf-budget-plan](./smf-budget-plan/) | Map a USDC budget to an approximate number of API calls. |

## Installation

Copy the skill folder(s) you need into your agent’s skills directory, for example:

- **Cursor:** `.cursor/skills/` (project) or `~/.cursor/skills/` (user)
- **Other:** Consult your agent’s docs for “skills” or “SKILL.md” layout

Each skill is a single folder containing `SKILL.md` (e.g. `nexflow-smf-skills/smf-route-matrix/SKILL.md`). Copy the whole folder so the agent can discover it.

## Test mode

For non-production use, send header `X-Nexflow-Test: 1` to get deterministic, non-settling responses where applicable.

## License

Same as the parent repo (MIT). Skills contain only public API docs and examples.
