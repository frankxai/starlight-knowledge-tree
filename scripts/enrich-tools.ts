import * as fs from "fs";
import * as path from "path";

const toolsPath = path.resolve(__dirname, "../data/nodes/tools.json");
const existing = fs.existsSync(toolsPath) ? JSON.parse(fs.readFileSync(toolsPath, "utf8")) : [];

const newTools = [
  {
    id: "tool-figma",
    type: "tool",
    label: "Figma",
    description: "Collaborative interface design and prototyping tool for design systems, vector assets, and token handoffs.",
    domain: "domain-web-graphic-design",
    tags: ["figma", "ui-ux", "design-system", "prototyping", "vector"],
    status: "evergreen",
    url: "https://figma.com",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "teaches", target: "concept-design-token-system" }]
  },
  {
    id: "tool-framer",
    type: "tool",
    label: "Framer",
    description: "Interactive canvas and CMS publishing platform that turns design layouts directly into production React websites with fluid animations.",
    domain: "domain-web-graphic-design",
    tags: ["framer", "web-design", "react", "motion", "cms"],
    status: "evergreen",
    url: "https://framer.com",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "teaches", target: "concept-micro-interactions" }]
  },
  {
    id: "tool-ahrefs",
    type: "tool",
    label: "Ahrefs",
    description: "SEO intelligence platform for backlink analysis, keyword clustering, search volume estimation, and competitor gap auditing.",
    domain: "domain-content-seo-publishing",
    tags: ["seo", "ahrefs", "keyword-research", "backlinks", "analytics"],
    status: "stable",
    url: "https://ahrefs.com",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "applies_to", target: "concept-topical-authority" }]
  },
  {
    id: "tool-beehiiv",
    type: "tool",
    label: "Beehiiv",
    description: "Newsletter platform built for sovereign creators with audience analytics, referral programs, and custom domains.",
    domain: "domain-content-seo-publishing",
    tags: ["newsletter", "beehiiv", "email", "publishing", "monetization"],
    status: "stable",
    url: "https://beehiiv.com",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "applies_to", target: "concept-organic-distribution-loops" }]
  },
  {
    id: "tool-stripe",
    type: "tool",
    label: "Stripe",
    description: "Financial infrastructure and checkout APIs powering global subscription billing, one-click payments, and creator revenue settlement.",
    domain: "domain-social-attraction-funnels",
    tags: ["stripe", "payments", "checkout", "billing", "fintech"],
    status: "evergreen",
    url: "https://stripe.com",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "applies_to", target: "concept-grand-slam-offers" }]
  },
  {
    id: "tool-tradingview",
    type: "tool",
    label: "TradingView",
    description: "Financial charting platform providing real-time market data, technical indicators, and macroeconomic asset ratio tracking.",
    domain: "domain-investing-wealth-capital",
    tags: ["tradingview", "charting", "markets", "technical-analysis", "macro"],
    status: "stable",
    url: "https://tradingview.com",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "applies_to", target: "concept-macro-credit-cycles" }]
  }
];

const merged = [...existing.filter(e => !newTools.some(n => n.id === e.id)), ...newTools];
fs.writeFileSync(toolsPath, JSON.stringify(merged, null, 2), "utf8");
console.log(`✅ Successfully enriched tools.json! Total tools: ${merged.length}`);
