import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Knowledge Tree — Starlight",
  description: "Visual overview of the Starlight Knowledge Tree graph.",
};

const DOMAINS = [
  {
    id: "domain-ai-architect",
    label: "AI Architect",
    href: "/paths/ai-architect",
    description: "Foundation models, agents, reasoning, alignment, inference systems.",
    nodeCount: "~40 nodes",
  },
  {
    id: "domain-space-builder",
    label: "Space Builder",
    href: "/paths/space-builder",
    description: "Orbital mechanics, propulsion, mission design, space systems engineering.",
    nodeCount: "~25 nodes",
  },
  {
    id: "domain-bio-human-intelligence",
    label: "Bio / Human Intelligence",
    href: "/paths/bio-human-intelligence",
    description: "Neuroscience, cognitive science, longevity, biosystems, performance.",
    nodeCount: "~30 nodes",
  },
  {
    id: "domain-creator-founder",
    label: "Creator-Founder",
    href: "/paths/creator-founder",
    description: "Products, companies, creative systems, leverage, distribution.",
    nodeCount: "~35 nodes",
  },
];

const NODE_TYPES = [
  { type: "concept", count: "70+", description: "Units of understanding" },
  { type: "skill", count: "40+", description: "Applied capabilities with evidence requirements" },
  { type: "tool", count: "15+", description: "Instruments used by practitioners" },
  { type: "paper", count: "20+", description: "Research artifacts" },
  { type: "experiment", count: "10+", description: "Reproducible investigations" },
  { type: "open_problem", count: "8+", description: "Unsolved research frontiers" },
  { type: "contribution_task", count: "10+", description: "Open quests for contributors" },
];

export default function TreePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            The Knowledge <span className="text-gradient-cyan">Tree</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A structured graph of domains, concepts, skills, tools, papers, and open problems.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6">Domains</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DOMAINS.map((d) => (
              <Link key={d.id} href={d.href} className="glass-card p-6 group">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white/90 group-hover:text-cyan-primary transition-colors">
                    {d.label}
                  </h3>
                  <span className="text-xs text-white/30 font-mono">{d.nodeCount}</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{d.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6">Node Types</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {NODE_TYPES.map((nt) => (
              <div key={nt.type} className="glass-card p-4">
                <div className="text-xs font-mono text-cyan-primary mb-1">{nt.type}</div>
                <div className="text-2xl font-bold text-white mb-1">{nt.count}</div>
                <div className="text-xs text-white/40">{nt.description}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6">
            Graph Architecture
          </h2>
          <div className="glass-card p-8 font-mono text-sm text-white/60 leading-relaxed">
            <p className="text-white/30 mb-4">{"/* Mermaid diagram — interactive in Phase 1 */"}</p>
            <pre className="overflow-x-auto whitespace-pre-wrap text-xs">
{`graph TD
  A[domain-ai-architect] --> B[concept-attention-mechanism]
  B --> C[concept-transformer-architecture]
  C --> D[skill-implement-transformer]
  D --> E[skill-finetune-llm]
  E --> F[skill-build-agent]

  H[domain-space-builder] --> I[concept-keplers-laws]
  I --> J[concept-delta-v-budget]
  J --> K[skill-plan-trajectory]

  L[domain-bio-human-intelligence] --> M[concept-hallmarks-of-aging]
  M --> N[skill-evaluate-longevity-intervention]

  O[domain-creator-founder] --> P[concept-product-market-fit]
  P --> Q[skill-ship-mvp]`}
            </pre>
          </div>
        </section>

        <div className="text-center">
          <Link href="/contribute" className="btn-primary">
            Add a node to the graph →
          </Link>
        </div>
      </div>
    </div>
  );
}
