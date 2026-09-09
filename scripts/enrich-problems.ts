import * as fs from "fs";
import * as path from "path";

const problemsPath = path.resolve(__dirname, "../data/nodes/open-problems.json");
const existing = fs.existsSync(problemsPath) ? JSON.parse(fs.readFileSync(problemsPath, "utf8")) : [];

const newProblems = [
  {
    id: "problem-ai-generated-search-dilution",
    type: "open_problem",
    label: "Search Dilution by AI-Generated Content Farms",
    description: "How high-signal publishers and domain authorities maintain search rank and reader trust when millions of low-effort AI articles flood index results.",
    domain: "domain-content-seo-publishing",
    tags: ["seo", "ai-search", "information-gain", "content-quality"],
    status: "stable",
    difficulty: "hard",
    prize_or_benchmark: "E-E-A-T and Information Gain patents",
    related_papers: [],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "part_of", target: "domain-content-seo-publishing" }]
  },
  {
    id: "problem-content-monetization-decay",
    type: "open_problem",
    label: "Decay of Traditional Ad & Affiliate Monetization",
    description: "Addressing the rapid collapse of display ad CPMs and third-party affiliate cookies through direct sovereign software sales and high-ticket masterminds.",
    domain: "domain-content-seo-publishing",
    tags: ["monetization", "business-models", "publishing", "sovereignty"],
    status: "stable",
    difficulty: "accessible",
    prize_or_benchmark: null,
    related_papers: [],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "part_of", target: "domain-content-seo-publishing" }]
  },
  {
    id: "problem-funnel-conversion-friction",
    type: "open_problem",
    label: "Conversion Friction in Multi-Device Sales Funnels",
    description: "Minimizing checkout abandonment, wallet connection fatigue, and mobile checkout friction in high-ticket digital product sales.",
    domain: "domain-social-attraction-funnels",
    tags: ["conversion-rate-optimization", "funnels", "checkout", "ecommerce"],
    status: "stable",
    difficulty: "accessible",
    prize_or_benchmark: null,
    related_papers: [],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "part_of", target: "domain-social-attraction-funnels" }]
  },
  {
    id: "problem-inflationary-capital-decay",
    type: "open_problem",
    label: "Purchasing Power Decay in Fiat Capital Reserves",
    description: "Constructing treasury portfolios that reliably preserve real purchasing power across currency debasement and debt cycle transitions.",
    domain: "domain-investing-wealth-capital",
    tags: ["inflation", "treasury-management", "capital-preservation", "sovereign-wealth"],
    status: "stable",
    difficulty: "hard",
    prize_or_benchmark: "Dalio All-Weather / Barbell Index",
    related_papers: [],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "part_of", target: "domain-investing-wealth-capital" }]
  },
  {
    id: "problem-asymmetric-risk-mispricing",
    type: "open_problem",
    label: "Mispricing of Tail Risks & AI Exponential Compounding",
    description: "Traditional financial models fail to price the non-linear returns of autonomous AI systems and the catastrophic tail risks of centralized platform dependencies.",
    domain: "domain-investing-wealth-capital",
    tags: ["asymmetric-risk", "tail-risk", "venture-capital", "ai-economics"],
    status: "stable",
    difficulty: "hard",
    prize_or_benchmark: null,
    related_papers: [],
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "part_of", target: "domain-investing-wealth-capital" }]
  }
];

const merged = [...existing.filter(e => !newProblems.some(n => n.id === e.id)), ...newProblems];
fs.writeFileSync(problemsPath, JSON.stringify(merged, null, 2), "utf8");
console.log(`✅ Successfully enriched open-problems.json! Total problems: ${merged.length}`);
