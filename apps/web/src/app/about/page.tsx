import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Starlight Knowledge Tree",
  description: "Built on Starlight Intelligence Protocol. An open intelligence graph for human capability.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            About Starlight
            <br />
            <span className="text-gradient-cyan">Knowledge Tree</span>
          </h1>
        </div>

        {/* What it is */}
        <section className="mb-12">
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-4">
            What It Is
          </h2>
          <div className="glass-card p-6 space-y-4 text-white/70 leading-relaxed">
            <p>
              Starlight Knowledge Tree is a public research and skill-progression graph. It maps domains, concepts,
              skills, tools, papers, experiments, artifacts, open problems, and contribution quests into a structured,
              evidence-first knowledge graph.
            </p>
            <p>
              It is not a course platform. Not a social network. Not a credential inflation machine.
            </p>
            <p>
              It is a living map of human capability — built in the open, growing through evidence, and organized to
              answer four questions:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                "What exists? — The current frontier of knowledge in a domain.",
                "What matters? — Root-node problems and high-leverage concepts.",
                "What can I build? — Skills, tools, and paths from novice to mastery.",
                "What can I contribute? — Open problems, research gaps, and contribution quests.",
              ].map((q) => (
                <li key={q} className="text-white/60 text-sm">
                  <span className="text-cyan-primary">→</span> {q}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Built on SIP */}
        <section className="mb-12">
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-4">
            Built on SIP
          </h2>
          <div className="glass-card p-6">
            <p className="text-white/70 leading-relaxed mb-4">
              Starlight Knowledge Tree is a vertical of the{" "}
              <span className="text-cyan-primary font-medium">Starlight Intelligence System (SIS)</span> and the{" "}
              <span className="text-cyan-primary font-medium">Starlight Intelligence Protocol (SIP)</span>.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-white/40 font-medium">Layer</th>
                    <th className="text-left py-2 text-white/40 font-medium">Responsibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 text-cyan-primary font-mono text-xs">SIS / SIP</td>
                    <td className="py-3 text-white/60">Protocol, memory vaults, MCP tools, agent context, sovereign intelligence infrastructure</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-amber-authority font-mono text-xs">Knowledge Tree</td>
                    <td className="py-3 text-white/60">Knowledge graph, research maps, skill paths, root-node problems, evidence-based progression</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-white/40 font-mono">
                SIP Attestation: pending — will be updated when the formal attestation process is available
              </p>
            </div>
          </div>
        </section>

        {/* The rule */}
        <section className="mb-12">
          <div className="glass-card p-8 text-center">
            <p className="text-sm text-amber-authority font-medium tracking-widest uppercase mb-6">
              The Core Rule
            </p>
            <blockquote className="text-xl text-white/80 leading-relaxed font-light italic mb-4">
              "A skill is not complete because someone watched a video, read a thread, or finished a course."
            </blockquote>
            <p className="text-white/50">
              A skill becomes real when there is{" "}
              <span className="text-cyan-primary font-medium">evidence</span>.
            </p>
          </div>
        </section>

        {/* Quick links */}
        <section>
          <div className="flex flex-wrap gap-3">
            <Link href="/tree" className="btn-primary">
              Explore the graph
            </Link>
            <Link href="/contribute" className="btn-secondary">
              Contribute
            </Link>
            <a
              href="https://github.com/frankxai/starlight-knowledge-tree"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
