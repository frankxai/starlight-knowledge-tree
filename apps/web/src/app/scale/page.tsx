import type { Metadata } from "next";
import { DemandCaptureWaitlist } from "@/components/DemandCaptureWaitlist";

export const metadata: Metadata = {
  title: "Planetary Scale & Economics — Starlight Knowledge Tree",
  description: "The 7 Pillars of Scale, empirical benchmarks, sub-linear cost economics, and swarm concurrency architecture.",
};

const PILLARS = [
  {
    number: "01",
    title: "Queue-Backed Concurrency",
    subtitle: "Durable Task Dispatch & Backoff",
    description: "Decouples client intake from worker execution using priority queues, token rate-limit sharding, exponential backoff with jitter, and dead-letter queues to prevent 429 cascades.",
    tech: "BullMQ • Redis • SQLite Durable Queues",
    badge: "Concurrency"
  },
  {
    number: "02",
    title: "KV-Cache Prefix Economics",
    subtitle: "80% Latency & 75% Cost Reduction",
    description: "Structures prompts with immutable static prefixes (system lore, contracts, tool schemas) so models reuse cached attention states, unlocking 80-90% prompt discounts.",
    tech: "Static Prefix Alignment • Anthropic / Gemini Cache",
    badge: "Cost Reduction"
  },
  {
    number: "03",
    title: "Hierarchical Graph Partitioning",
    subtitle: "2-Hop Neighborhood Loading",
    description: "Shards the knowledge graph by domain clusters. Agents query only the 2-hop radius of their specific problem, fitting rich graph context into <8,000 tokens.",
    tech: "Topological Traversal • Subgraph Extraction",
    badge: "Context Scaling"
  },
  {
    number: "04",
    title: "Memory Guardian & OOM Protection",
    subtitle: "Host Stability Under 50+ Workers",
    description: "Standing telemetry process monitoring WSL2 RAM, VRAM, and swap. Throttles concurrent worktrees and enforces text-only fallbacks when free memory drops below 50GB.",
    tech: "Dynamic Throttling • Swap Prevention",
    badge: "Stability"
  },
  {
    number: "05",
    title: "Entity Resolution & Deduplication",
    subtitle: "Automated Graph SSOT Unification",
    description: "Merges overlapping papers, tools, and author nodes from automated scrapers using normalized string distance and dense vector cosine similarity (>0.92).",
    tech: "Jaro-Winkler • Vector Cosine Disambiguation",
    badge: "Data Quality"
  },
  {
    number: "06",
    title: "Columnar Disk Vectors (LanceDB)",
    subtitle: "Zero-Daemon Millions of Embeddings",
    description: "Transitions flat JSON files past 10,000 entities to serverless, disk-backed Lance columnar files, offering sub-millisecond vector similarity search with zero RAM overhead.",
    tech: "LanceDB • Apache Lance • Rust Native Bindings",
    badge: "Storage Engine"
  },
  {
    number: "07",
    title: "Incremental Static Regeneration (ISR)",
    subtitle: "Edge Delivery for 10,000+ Pages",
    description: "Pre-renders critical hub routes at build time while lazily compiling long-tail entity pages on-demand, paired with client-side Orama WebAssembly search.",
    tech: "Next.js 14 App Router • Orama WASM • Vercel Edge",
    badge: "Web Delivery"
  }
];

const BENCHMARKS = [
  {
    label: "Direct Entity Lookup",
    value: "0.12 ms",
    subtext: "0.0119 µs/op across 10k lookups",
    status: "94.7x faster than linear find",
    indicator: "text-emerald-400"
  },
  {
    label: "2-Hop Subgraph Extraction",
    value: "0.002 ms",
    subtext: "1,000 queries on 5,000-node graph",
    status: "445,137 queries/sec throughput",
    indicator: "text-cyan-primary"
  },
  {
    label: "Full-Estate Entity Scan",
    value: "0.99 ms",
    subtext: "5 multi-field scan passes over 5k nodes",
    status: "11,457 entities matched",
    indicator: "text-amber-authority"
  },
  {
    label: "5k Nodes Payload Size",
    value: "2.32 MB",
    subtext: "Serialized JSON Memory Footprint",
    status: "LanceDB threshold at 10k nodes",
    indicator: "text-blue-400"
  }
];

const COST_ROWS = [
  {
    dimension: "Model Ingestion",
    naive: "Full context reinjected every turn ($5.00/M tokens)",
    starlight: "KV-Cache Prefix Alignment ($0.50/M tokens cached)",
    savings: "90% Savings"
  },
  {
    dimension: "Model Routing",
    naive: "Route every task to frontier models ($15–$75/M tokens)",
    starlight: "Kilo Tier Router: Free models for scans, Frontier for review only",
    savings: "85% Savings"
  },
  {
    dimension: "Knowledge Retrieval",
    naive: "Inject entire 500-page repos into agent prompts (100k tokens)",
    starlight: "2-Hop Subgraph Partitioning (<8k tokens targeted context)",
    savings: "92% Savings"
  },
  {
    dimension: "Vector / Graph DB",
    naive: "Cloud SaaS vector DBs (Pinecone/Milvus: $70–$350/mo)",
    starlight: "LanceDB / sqlite-vec / Kùzu (Local disk, zero-daemon, $0)",
    savings: "100% DB Savings"
  },
  {
    dimension: "Web & API Hosting",
    naive: "24/7 Node.js VPS / Docker clusters ($80–$250/mo)",
    starlight: "Next.js 14 SSG on Vercel + SDS idle TTL on localhost",
    savings: "~90% Hosting Savings"
  },
  {
    dimension: "Per-Feature Run Cost",
    naive: "$15.00 – $45.00 per feature task",
    starlight: "$0.20 – $1.10 per verified feature task",
    savings: "~95% Net Reduction"
  }
];

export default function ScalePage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-4 border border-cyan-primary/20 bg-cyan-primary/5 text-xs text-cyan-primary font-medium tracking-wide">
          <span>🚀</span> Planetary Concurrency & Sub-Linear Economics
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          The <span className="text-gradient-cyan">7 Pillars of Scale</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          How Starlight scales autonomous multi-agent swarms and knowledge graphs from hundreds of curated entities to millions of tokens with sub-millisecond retrieval and 95% cost efficiency.
        </p>
      </div>

      {/* Empirical Benchmark Telemetry */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>⚡</span> Empirical Stress-Test Benchmarks (5,000 Simulated Nodes)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BENCHMARKS.map((b) => (
            <div key={b.label} className="glass-card p-5 rounded-xl border border-white/10 bg-navy-900/60">
              <div className="text-xs font-mono text-white/50 uppercase tracking-wider mb-1">{b.label}</div>
              <div className={`text-3xl font-bold font-mono mb-2 ${b.indicator}`}>{b.value}</div>
              <div className="text-xs text-white/70 mb-1">{b.subtext}</div>
              <div className="text-[11px] font-mono text-cyan-primary/90">{b.status}</div>
            </div>
          ))}
        </div>
      </section>

      {/* The 7 Pillars Grid */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🏛️</span> Architectural Pillars of Scale
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PILLARS.map((p) => (
            <div
              key={p.number}
              className="glass-card p-6 rounded-xl border border-white/10 bg-navy-900/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-cyan-primary font-bold">{p.number}</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-amber-authority border border-amber-authority/20">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{p.title}</h3>
                <div className="text-xs font-mono text-cyan-primary/80 mb-3">{p.subtitle}</div>
                <p className="text-white/70 text-xs leading-relaxed mb-4">{p.description}</p>
              </div>
              <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-white/40">
                Stack: <span className="text-white/70">{p.tech}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cost Reduction Matrix */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>💰</span> Cost Reduction & Optimization Matrix
        </h2>
        <div className="glass-card overflow-hidden border border-white/10 rounded-xl bg-navy-900/60">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-white/50 uppercase font-mono">
                  <th className="py-3 px-4 font-semibold">Architectural Layer</th>
                  <th className="py-3 px-4 font-semibold">Naive Swarm Approach</th>
                  <th className="py-3 px-4 font-semibold">Starlight Smart Stack</th>
                  <th className="py-3 px-4 font-semibold text-right">Net Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/70">
                {COST_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">{row.dimension}</td>
                    <td className="py-3.5 px-4 text-red-400/80">{row.naive}</td>
                    <td className="py-3.5 px-4 text-cyan-primary">{row.starlight}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                      {row.savings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Founder Leverage & ROI Equation */}
      <section className="glass-card p-8 rounded-xl border border-cyan-primary/20 bg-gradient-to-b from-cyan-primary/5 to-transparent">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-2">The 1-to-25 Founder Leverage Ratio</h3>
            <p className="text-white/70 text-xs leading-relaxed mb-4">
              By grounding autonomous agents in verified domain canon, using KV-cache prompt reuse, and executing through isolated worktrees, a single human architect commands the throughput, rigor, and distribution velocity of a 25-person engineering and content organization with near-zero overhead.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-cyan-primary">
              <span className="px-2.5 py-1 rounded bg-cyan-primary/10 border border-cyan-primary/20">95%+ Digital Margins</span>
              <span className="px-2.5 py-1 rounded bg-cyan-primary/10 border border-cyan-primary/20">Zero Cloud DB Burn</span>
              <span className="px-2.5 py-1 rounded bg-cyan-primary/10 border border-cyan-primary/20">Continuous Self-Refinement</span>
            </div>
          </div>
          <div className="shrink-0 p-5 rounded-xl bg-black/40 border border-white/10 text-center">
            <div className="text-xs font-mono text-white/50 uppercase mb-1">Average Run Cost</div>
            <div className="text-3xl font-bold font-mono text-emerald-400 mb-1">$0.20 – $1.10</div>
            <div className="text-[11px] text-white/40">per verified feature PR</div>
          </div>
        </div>
      </section>

      {/* Demand Capture Waitlist */}
      <section className="pt-6">
        <DemandCaptureWaitlist
          productId="starlight-knowledge-tree"
          productName="Starlight Scale & Intelligence Engine"
          foundingBenefit="Founding cohort gets direct access to the 7-Pillar telemetry suite, BullMQ worker templates, and LiteLLM sharding configs."
        />
      </section>
    </div>
  );
}
