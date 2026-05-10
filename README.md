<div align="center">

# ShadowPrice MCP Server

**Inject leaked B2B SaaS pricing directly into Claude & Cursor.**

[![npm version](https://img.shields.io/npm/v/shadowprice.svg?style=flat-square&color=cb3837)](https://www.npmjs.com/package/shadowprice)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

</div>

---

## What is ShadowPrice?

ShadowPrice connects your AI assistant — Claude Desktop or Cursor — to a curated database of **leaked B2B SaaS contracts**, historical discount data, and negotiation playbooks.

Ask a simple question like _"How much should I pay for HubSpot Enterprise?"_ and get back real pricing benchmarks sourced from actual contracts — not vendor list prices.

### Key Capabilities

- 🔍 **Contract Pricing Intelligence** — Access leaked pricing from real SaaS deals.
- 📉 **Historical Discount Data** — See what discounts others have negotiated over time.
- 🤝 **Negotiation Tactics** — AI-generated strategies tailored to each vendor.
- ⚡ **Zero Setup** — Runs instantly via `npx`. No cloning, no building.

---

## Installation

### Prerequisites

- [Claude Desktop](https://claude.ai/download) or [Cursor](https://cursor.com) installed.
- A ShadowPrice API key — get yours at **[shadowprice.dev](https://shadowprice.dev)**.

### Connect to Claude Desktop

Open your Claude Desktop config file:

| OS      | Path                                                              |
| ------- | ----------------------------------------------------------------- |
| macOS   | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json`                     |

Add the following configuration:

```json
{
  "mcpServers": {
    "shadowprice": {
      "command": "npx",
      "args": ["-y", "shadowprice"],
      "env": {
        "SHADOWPRICE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

> [!IMPORTANT]
> Replace `your_api_key_here` with the API key from your [shadowprice.dev](https://shadowprice.dev) dashboard.

Save the file, then **quit and reopen** Claude Desktop. The ShadowPrice tools will appear in the 🔨 tools menu.

---

## Usage

Once connected, just ask Claude naturally:

| Prompt                                                           | What you get                                     |
| ---------------------------------------------------------------- | ------------------------------------------------ |
| _"What's the typical pricing for HubSpot Enterprise?"_           | Contract benchmarks, seat pricing, tier breakdown |
| _"Give me negotiation tactics for renewing our Datadog contract"_ | Discount ranges, leverage points, timing advice  |
| _"How much discount can I get on Slack Business+?"_              | Historical discount data from real deals          |

### Available Tool

#### `get_saas_pricing_intel`

Retrieve leaked B2B SaaS pricing, historical discounts, and negotiation tactics.

| Parameter   | Type   | Required | Description                         |
| ----------- | ------ | -------- | ----------------------------------- |
| `saas_name` | string | ✅       | Name of the SaaS product to look up |

---

## License

MIT — see [LICENSE](LICENSE) for details.
