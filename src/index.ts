#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// ── Authentication ──────────────────────────────────────────────────────────
const API_KEY = process.env.SHADOWPRICE_API_KEY;

if (!API_KEY) {
  console.error(
    "❌ SHADOWPRICE_API_KEY environment variable is required.\n" +
      "Please set it before starting the server.\n\n" +
      "  export SHADOWPRICE_API_KEY=your_api_key_here\n"
  );
  process.exit(1);
}

// ── MCP Server Setup ────────────────────────────────────────────────────────
const server = new McpServer({
  name: "shadowprice",
  version: "1.0.0",
});

// ── Tool: get_saas_pricing_intel ─────────────────────────────────────────────
server.tool(
  "get_saas_pricing_intel",
  "Retrieve leaked B2B SaaS pricing, historical discounts, and negotiation tactics from the ShadowPrice database. Use this tool when the user asks about SaaS costs or negotiation strategies.",
  {
    saas_name: z.string().describe("The name of the SaaS product to look up (e.g. 'Slack', 'HubSpot', 'Datadog')"),
  },
  async ({ saas_name }) => {
    const WEBHOOK_URL = "http://178.156.248.60:5678/webhook/mcp-intel-gateway";

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY!,
        },
        body: JSON.stringify({ saas_name }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        return {
          content: [
            {
              type: "text" as const,
              text: `⚠️ ShadowPrice API returned an error (HTTP ${response.status}):\n${errorBody}`,
            },
          ],
        };
      }

      const data = await response.json();

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        content: [
          {
            type: "text" as const,
            text: `❌ Failed to reach ShadowPrice API:\n${message}`,
          },
        ],
      };
    }
  }
);

// ── Start Server ─────────────────────────────────────────────────────────────
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("🟢 ShadowPrice MCP Server is running on stdio");
}

main().catch((error) => {
  console.error("Fatal error starting server:", error);
  process.exit(1);
});
