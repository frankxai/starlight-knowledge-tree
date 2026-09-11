import type { Metadata } from "next";
import * as fs from "fs";
import * as path from "path";

export const metadata: Metadata = {
  title: "Landmark Research Papers — Starlight Knowledge Tree",
  description: "Seminal papers on generative agents, reflexion, reasoning models, transformers, and longevity.",
};

interface Paper {
  id: string;
  label: string;
  description: string;
  domain: string;
  tags: string[];
  authors: string[];
  year: number;
  url: string;
  abstract?: string;
  key_findings?: string[];
  significance?: string;
}

function getPapers(): Paper[] {
  const filePath = path.resolve(process.cwd(), "../../data/nodes/papers.json");
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch {}
  }
  return [];
}

export default function PapersPage() {
  const papers = getPapers();

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-4 border border-cyan-primary/20 bg-cyan-primary/5 text-xs text-cyan-primary font-medium tracking-wide">
          <span>🔬</span> Peer-Reviewed & Preprint Foundations
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Seminal <span className="text-gradient-cyan">Research Papers</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          The scientific breakthroughs powering Starlight agent trajectories, reflection trees, verbal RL, and neural reasoning.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6">
        {papers.map((paper) => (
          <article
            key={paper.id}
            className="glass-card p-8 border border-white/10 hover:border-cyan-primary/40 transition-all rounded-2xl bg-navy-900/60"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-primary/80 px-2.5 py-1 rounded bg-cyan-primary/10 border border-cyan-primary/20 mr-3">
                  {paper.domain.replace("domain-", "")}
                </span>
                <span className="text-xs text-white/40 font-mono">
                  {paper.authors.slice(0, 3).join(", ")}{paper.authors.length > 3 ? " et al." : ""} • {paper.year}
                </span>
                <h2 className="text-2xl font-bold text-white mt-2">
                  {paper.label}
                </h2>
              </div>
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-primary hover:text-white transition-colors font-mono whitespace-nowrap self-start border border-cyan-primary/30 px-3 py-1.5 rounded-lg bg-cyan-primary/5"
              >
                Read Paper ↗
              </a>
            </div>

            <p className="text-white/80 text-sm leading-relaxed mb-4">
              {paper.description}
            </p>

            {paper.abstract && (
              <details className="mb-4 group">
                <summary className="text-xs font-mono text-cyan-primary/70 hover:text-cyan-primary cursor-pointer select-none">
                  ▶ Toggle Abstract
                </summary>
                <div className="mt-2 text-xs text-white/60 leading-relaxed pl-4 border-l border-white/10 italic">
                  {paper.abstract}
                </div>
              </details>
            )}

            {paper.key_findings && paper.key_findings.length > 0 && (
              <div className="mb-4 bg-white/[0.02] border border-white/5 rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-authority mb-2">
                  Key Findings & Mechanisms
                </h3>
                <ul className="list-disc list-inside text-xs text-white/70 space-y-1">
                  {paper.key_findings.map((kf, idx) => (
                    <li key={idx}>{kf}</li>
                  ))}
                </ul>
              </div>
            )}

            {paper.significance && (
              <div className="text-xs text-cyan-primary/90 font-mono bg-cyan-primary/5 p-3 rounded-lg border border-cyan-primary/10">
                <strong>Starlight Significance:</strong> {paper.significance}
              </div>
            )}

            {/* Tags */}
            <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
              {paper.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono text-white/40 bg-white/[0.03] px-2 py-0.5 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
