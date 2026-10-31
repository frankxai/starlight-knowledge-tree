import type { Metadata } from "next";
import Link from "next/link";
import { canonDomains, canonNodes, countByDomain, countByType, domainSlug } from "@/lib/canon-stats";

export const metadata: Metadata = {
  title: "Knowledge Tree — Starlight",
  description: "Visual overview of the Starlight Knowledge Tree graph.",
};

const NODE_TYPE_DESCRIPTIONS: Record<string, string> = {
  concept: "Units of understanding",
  skill: "Applied capabilities with evidence requirements",
  tool: "Instruments used by practitioners",
  paper: "Research artifacts",
  book: "Canonical books",
  open_problem: "Unsolved research frontiers",
  contribution_task: "Open quests for contributors",
  experiment: "Reproducible investigations",
  swarm_pattern: "Multi-agent orchestration patterns",
  workflow: "Repeatable operating procedures",
  benchmark: "Empirical frontier benchmarks",
  mcp_server: "Model Context Protocol servers",
  dataset: "Curated datasets",
  artifact: "Produced artifacts",
  credential: "Credentials and attestations",
};

export default function TreePage() {
  const domains = [...canonDomains]
    .map((d) => ({ ...d, nodeCount: countByDomain(d.id) }))
    .sort((a, b) => b.nodeCount - a.nodeCount);
  const nodeTypes = Object.keys(NODE_TYPE_DESCRIPTIONS)
    .map((type) => ({ type, count: countByType(type), description: NODE_TYPE_DESCRIPTIONS[type] }))
    .filter((nt) => nt.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            The Knowledge <span className="text-gradient-cyan">Tree</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A structured graph of {domains.length} domains and {canonNodes.length} nodes: concepts,
            skills, tools, papers, and open problems.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6">Domains</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {domains.map((d) => (
              <Link key={d.id} href={`/paths/${domainSlug(d.id)}`} className="glass-card p-6 group">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white/90 group-hover:text-cyan-primary transition-colors">
                    {d.label}
                  </h3>
                  <span className="text-xs text-white/30 font-mono">{d.nodeCount} nodes</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{d.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6">Node Types</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {nodeTypes.map((nt) => (
              <div key={nt.type} className="glass-card p-4">
                <div className="text-xs font-mono text-cyan-primary mb-1">{nt.type}</div>
                <div className="text-2xl font-bold text-white mb-1">{nt.count}</div>
                <div className="text-xs text-white/40">{nt.description}</div>
              </div>
            ))}
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
