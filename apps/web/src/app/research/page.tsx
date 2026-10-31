import type { Metadata } from "next";
import Link from "next/link";
import { canonDomains, canonItems, domainSlug } from "@/lib/canon-stats";

export const metadata: Metadata = {
  title: "Research — Starlight Knowledge Tree",
  description: "Root-node open problems and research frontiers across all domains.",
};

const DIFFICULTY_STYLES: Record<string, { label: string; class: string }> = {
  accessible: { label: "Accessible", class: "text-green-400 border-green-400/20 bg-green-400/5" },
  medium: { label: "Medium", class: "text-yellow-300 border-yellow-300/20 bg-yellow-300/5" },
  hard: { label: "Hard", class: "text-amber-authority border-amber-authority/20 bg-amber-authority/5" },
  unsolved: { label: "Unsolved", class: "text-red-400 border-red-400/20 bg-red-400/5" },
};

export default function ResearchPage() {
  const domainById = new Map(canonDomains.map((d) => [d.id, d]));
  const problems = canonItems
    .filter((i) => i.type === "open_problem")
    .map((i) => ({
      id: i.id,
      label: i.label,
      description: i.description,
      difficulty: i.difficulty || "hard",
      domainLabel: i.domain ? domainById.get(i.domain)?.label || i.domain : "Cross-domain",
      domainHref: i.domain ? `/paths/${domainSlug(i.domain)}` : "/tree",
    }));
  const byDifficulty = (d: string) => problems.filter((p) => p.difficulty === d).length;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Research <span className="text-gradient-amber">Radar</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            All {problems.length} root-node open problems in canon, across every domain. These are the
            questions at the frontier — the ones that unlock the most downstream capability when solved.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">{byDifficulty("unsolved")}</div>
            <div className="text-xs text-white/40">Unsolved</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-amber-authority mb-1">{byDifficulty("hard")}</div>
            <div className="text-xs text-white/40">Hard</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-yellow-300 mb-1">{byDifficulty("medium")}</div>
            <div className="text-xs text-white/40">Medium</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">{byDifficulty("accessible")}</div>
            <div className="text-xs text-white/40">Accessible</div>
          </div>
        </div>

        <div className="space-y-4">
          {problems.map((p) => {
            const style = DIFFICULTY_STYLES[p.difficulty] ?? DIFFICULTY_STYLES.hard;
            return (
              <div key={p.id} className="glass-card p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white/90 mb-1">{p.label}</h3>
                    <Link href={p.domainHref} className="text-xs text-cyan-primary hover:underline">
                      {p.domainLabel} →
                    </Link>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border self-start shrink-0 ${style.class}`}>
                    {style.label}
                  </span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{p.description}</p>
                <div className="mt-4">
                  <span className="text-xs font-mono text-white/20">{p.id}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm mb-4">
            Know of a missing open problem? Add it to the graph.
          </p>
          <Link href="/contribute" className="btn-primary">
            Propose an open problem →
          </Link>
        </div>
      </div>
    </div>
  );
}
