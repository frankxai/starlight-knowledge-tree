import * as fs from "fs";
import * as path from "path";

const conceptsFilePath = path.resolve(__dirname, "../data/nodes/concepts.json");
const existing = fs.existsSync(conceptsFilePath) ? JSON.parse(fs.readFileSync(conceptsFilePath, "utf8")) : [];

const newConcepts = [
  {
    id: "concept-modular-scale",
    type: "concept",
    label: "Modular Typographic Scales & Mathematical Harmony",
    description: "Deriving font sizes from a fixed base size and geometric ratio (Major Third 1.25, Perfect Fourth 1.333, Golden Ratio 1.618) to ensure harmonic proportional hierarchy across screen sizes.",
    domain: "domain-web-graphic-design",
    tags: ["typography", "modular-scale", "font-sizes", "design-system"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-baseline-grid" }]
  },
  {
    id: "concept-baseline-grid",
    type: "concept",
    label: "Baseline Grids & Vertical Rhythm",
    description: "Aligning text baselines to a regular vertical increment (typically 4px or 8px) so paragraphs, headings, blockquotes, and images conform to a continuous rhythmic cadence.",
    domain: "domain-web-graphic-design",
    tags: ["typography", "vertical-rhythm", "baseline-grid", "layout"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: []
  },
  {
    id: "concept-aesthetic-usability-effect",
    type: "concept",
    label: "The Aesthetic-Usability Effect",
    description: "Users perceive aesthetically pleasing designs as more usable, forgiving minor usability hurdles and experiencing higher emotional trust and task satisfaction.",
    domain: "domain-web-graphic-design",
    tags: ["ui-ux", "cognitive-psychology", "usability", "visual-design"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-micro-interactions" }]
  },
  {
    id: "concept-micro-interactions",
    type: "concept",
    label: "Micro-Interactions & State Feedback",
    description: "Subtle single-purpose animations, hover states, button compressions, and loading pulses that acknowledge user intent and provide immediate kinetic feedback.",
    domain: "domain-web-graphic-design",
    tags: ["micro-interactions", "ui-ux", "feedback", "animation"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: []
  },
  {
    id: "concept-brand-dna-matrix",
    type: "concept",
    label: "Brand DNA Matrix & Modernist Restraint",
    description: "The core semantic guidelines defining typography, palette ratios, geometry, voice, and negative space that keep all sub-products visually locked to brand identity.",
    domain: "domain-web-graphic-design",
    tags: ["brand-dna", "vignelli", "identity", "design-tokens"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-vector-first-assets" }]
  },
  {
    id: "concept-vector-first-assets",
    type: "concept",
    label: "Vector-First Asset Architecture",
    description: "Building all icons, badges, logos, and UI decorations as clean resolution-independent SVGs with direct CSS stroke and fill controls, eliminating bitmap pixelation.",
    domain: "domain-web-graphic-design",
    tags: ["svg", "vector-graphics", "asset-pipeline", "crisp-rendering"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: []
  },
  {
    id: "concept-topical-authority",
    type: "concept",
    label: "Topical Authority & Semantic Entity Graphs",
    description: "Structuring content to exhaustively cover a domain through interrelated entity nodes, demonstrating subject-matter depth to search engines and ranking algorithms.",
    domain: "domain-content-seo-publishing",
    tags: ["seo", "topical-authority", "semantic-search", "entity-graphs"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-information-gain-score" }]
  },
  {
    id: "concept-information-gain-score",
    type: "concept",
    label: "Information Gain Scoring & Original Research",
    description: "Maximizing the net-new data, proprietary benchmarks, and primary evidence provided in content relative to what already exists in search engine indexes.",
    domain: "domain-content-seo-publishing",
    tags: ["information-gain", "google-patents", "seo", "original-research"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-programmatic-seo" }]
  },
  {
    id: "concept-programmatic-seo",
    type: "concept",
    label: "Programmatic SEO & Template Scalability",
    description: "Generating thousands of indexable, high-utility landing pages dynamically from structured databases (e.g. tool registries, prompt libraries, comparison matrices).",
    domain: "domain-content-seo-publishing",
    tags: ["programmatic-seo", "nextjs", "dynamic-routes", "database-driven"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: []
  },
  {
    id: "concept-pillar-cluster-model",
    type: "concept",
    label: "Pillar-Cluster Content Architecture",
    description: "Organizing website content around comprehensive high-level pillar guides that bidirectionally link to specialized sub-topic cluster articles.",
    domain: "domain-content-seo-publishing",
    tags: ["content-architecture", "pillar-pages", "topic-clusters", "internal-linking"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-mdx-publishing-pipeline" }]
  },
  {
    id: "concept-mdx-publishing-pipeline",
    type: "concept",
    label: "Headless MDX Publishing & Code-First Content",
    description: "Authoring articles in Markdown with embedded interactive React components, syntax-highlighted code blocks, KaTeX math rendering, and automated RSS/Sitemap generation.",
    domain: "domain-content-seo-publishing",
    tags: ["mdx", "nextjs", "publishing", "content-layer"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: []
  },
  {
    id: "concept-market-sophistication-stages",
    type: "concept",
    label: "Eugene Schwartz Market Sophistication Stages",
    description: "The 5 evolutionary stages of market awareness and skepticism that determine whether copy must focus on simple claims, expanded claims, unique mechanisms, or brand identification.",
    domain: "domain-content-seo-publishing",
    tags: ["copywriting", "market-sophistication", "positioning", "eugene-schwartz"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-direct-response-copywriting" }]
  },
  {
    id: "concept-direct-response-copywriting",
    type: "concept",
    label: "Direct-Response Copywriting & The 4 U's",
    description: "Persuasive sales writing focused on measurable response and immediate conversion using the 4 U's formula (Urgent, Unique, Ultra-specific, Useful) and proof stacking.",
    domain: "domain-content-seo-publishing",
    tags: ["copywriting", "direct-response", "conversion", "headlines"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: []
  },
  {
    id: "concept-organic-distribution-loops",
    type: "concept",
    label: "Organic Social Distribution Loops",
    description: "Designing self-reinforcing content mechanisms where social posts drive newsletter subscribers, who share insights, triggering algorithmic amplification without paid ad spend.",
    domain: "domain-social-attraction-funnels",
    tags: ["distribution", "social-media", "organic-growth", "viral-loops"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-scroll-stopping-hooks" }]
  },
  {
    id: "concept-scroll-stopping-hooks",
    type: "concept",
    label: "Scroll-Stopping Visual & Textual Hooks",
    description: "Opening 3 seconds or headline frames designed to disrupt timeline complacency through cognitive dissonance, counter-intuitive data, or high-contrast imagery.",
    domain: "domain-social-attraction-funnels",
    tags: ["hooks", "social-media", "retention", "attention-capture"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-social-flywheel" }]
  },
  {
    id: "concept-social-flywheel",
    type: "concept",
    label: "The Cross-Platform Social Flywheel",
    description: "Repurposing deep-dive long-form essays into X threads, LinkedIn carousel decks, YouTube shorts, and newsletter digests to maximize content ROI across algorithms.",
    domain: "domain-social-attraction-funnels",
    tags: ["flywheel", "content-repurposing", "multi-channel", "growth"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: []
  },
  {
    id: "concept-grand-slam-offers",
    type: "concept",
    label: "Hormozi Grand Slam Offers & Value Equations",
    description: "Constructing unbeatable product offers that combine high dream outcomes, proven guarantees, effortless speed, and unmatchable bonuses to eliminate price competition.",
    domain: "domain-social-attraction-funnels",
    tags: ["offers", "hormozi", "pricing", "value-equation", "monetization"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-value-ladder-architecture" }]
  },
  {
    id: "concept-value-ladder-architecture",
    type: "concept",
    label: "Value Ladder Architecture & Customer Ascension",
    description: "Structuring digital products across price tiers: Lead Magnet (Free) -> Tripwire ($27-$97) -> Core Course ($497-$997) -> Sovereign Advisory ($5k-$25k).",
    domain: "domain-social-attraction-funnels",
    tags: ["value-ladder", "funnels", "ascension", "customer-ltv"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-vsl-funnel-architecture" }]
  },
  {
    id: "concept-vsl-funnel-architecture",
    type: "concept",
    label: "Video Sales Letter (VSL) Funnels",
    description: "High-converting single-page sales funnels driven by an 8-15 minute structured video narrative using the Epiphany Bridge and one-click checkout.",
    domain: "domain-social-attraction-funnels",
    tags: ["vsl", "sales-page", "conversion", "funnel-optimization"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-lifecycle-email-automation" }]
  },
  {
    id: "concept-lifecycle-email-automation",
    type: "concept",
    label: "Lifecycle Email Sequences & Soap Opera Dramas",
    description: "Automated trigger-based email flows (Welcome Soap Opera, Abandoned Cart, Post-Purchase Onboarding, Evergreen Re-engagement) that nurture leads on autopilot.",
    domain: "domain-social-attraction-funnels",
    tags: ["email-marketing", "automation", "drip-campaigns", "nurturing"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: []
  },
  {
    id: "concept-margin-of-safety",
    type: "concept",
    label: "Margin of Safety & Downside Protection",
    description: "The fundamental principle of investing: demanding an entry price significantly below conservative intrinsic value to insulate against forecasting errors and unexpected panics.",
    domain: "domain-investing-wealth-capital",
    tags: ["margin-of-safety", "value-investing", "risk-management", "capital-preservation"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-circle-of-competence" }, { type: "unlocks", target: "concept-intrinsic-value-dcf" }]
  },
  {
    id: "concept-circle-of-competence",
    type: "concept",
    label: "Circle of Competence & Mental Latticework",
    description: "Charlie Munger doctrine of operating strictly within the boundaries of businesses and technologies you understand intimately, ignoring opportunities outside your circle.",
    domain: "domain-investing-wealth-capital",
    tags: ["circle-of-competence", "munger", "mental-models", "decision-making"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: []
  },
  {
    id: "concept-intrinsic-value-dcf",
    type: "concept",
    label: "Intrinsic Value & Discounted Cash Flows",
    description: "Calculating the true underlying value of a business by estimating its future owner earnings and discounting them back to the present with an appropriate risk rate.",
    domain: "domain-investing-wealth-capital",
    tags: ["intrinsic-value", "dcf", "valuation", "cash-flow"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: []
  },
  {
    id: "concept-second-level-thinking",
    type: "concept",
    label: "Second-Level Thinking & Contrarian Edge",
    description: "Howard Marks framework of evaluating not just the immediate consensus view, but what the consensus has already priced in, identifying mispriced asymmetries.",
    domain: "domain-investing-wealth-capital",
    tags: ["second-level-thinking", "howard-marks", "contrarian", "alpha"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-macro-credit-cycles" }]
  },
  {
    id: "concept-macro-credit-cycles",
    type: "concept",
    label: "Macro Credit Cycles & Deleveraging Mechanics",
    description: "Ray Dalio template of tracking central bank interest rates, debt-to-income ratios, liquidity expansions, and beautiful deleveragings to navigate asset bubbles.",
    domain: "domain-investing-wealth-capital",
    tags: ["macroeconomics", "credit-cycles", "ray-dalio", "liquidity"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: []
  },
  {
    id: "concept-barbell-capital-allocation",
    type: "concept",
    label: "The Sovereign Barbell Capital Allocation",
    description: "Allocating 80-90% of assets into hyper-safe, liquid, inflation-resistant sovereign stores of value, and 10-20% into asymmetric, convex, highly scalable venture bets.",
    domain: "domain-investing-wealth-capital",
    tags: ["barbell-strategy", "taleb", "portfolio-allocation", "sovereign-wealth"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-permissionless-leverage" }]
  },
  {
    id: "concept-permissionless-leverage",
    type: "concept",
    label: "Permissionless Leverage (Code, Media & Swarms)",
    description: "Naval Ravikant framework of building non-linear wealth by deploying software algorithms, digital media content, and autonomous AI agents that work 24/7 without permission.",
    domain: "domain-investing-wealth-capital",
    tags: ["permissionless-leverage", "naval", "automation", "swarms"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-sovereign-wealth-engine" }]
  },
  {
    id: "concept-sovereign-wealth-engine",
    type: "concept",
    label: "The Autonomous Sovereign Wealth Engine",
    description: "A self-sustaining loop where cashflow from agentic digital products is automatically swept into hard assets, research grants, and compute capacity, compounding sovereign freedom.",
    domain: "domain-investing-wealth-capital",
    tags: ["sovereign-wealth", "cashflow-engine", "compounding", "financial-sovereignty"],
    status: "stable",
    created_at: "2026-08-23T00:00:00Z",
    updated_at: "2026-08-23T00:00:00Z",
    edges: []
  }
];

const merged = [...existing.filter(e => !newConcepts.some(n => n.id === e.id)), ...newConcepts];
fs.writeFileSync(conceptsFilePath, JSON.stringify(merged, null, 2), "utf8");
console.log(`✅ Successfully enriched concepts.json! Total concepts: ${merged.length}`);
