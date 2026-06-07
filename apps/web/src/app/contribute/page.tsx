import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contribute — Starlight Knowledge Tree",
  description: "How to add nodes, skill paths, papers, and experiments to the Starlight Knowledge Tree.",
};

const CONTRIBUTION_TYPES = [
  {
    title: "Add a Node",
    description: "Propose a new concept, skill, tool, paper, or open problem.",
    href: "https://github.com/frankxai/starlight-knowledge-tree/issues/new?template=add-node.yml",
    cta: "Open issue →",
    difficulty: "Beginner",
  },
  {
    title: "Add a Paper",
    description: "Cite a foundational or recent research paper and link it to existing nodes.",
    href: "https://github.com/frankxai/starlight-knowledge-tree/issues/new?template=add-paper.yml",
    cta: "Open issue →",
    difficulty: "Beginner",
  },
  {
    title: "Add a Skill Path",
    description: "Design an ordered learning sequence for a domain or sub-domain.",
    href: "https://github.com/frankxai/starlight-knowledge-tree/issues/new?template=add-skill-path.yml",
    cta: "Open issue →",
    difficulty: "Intermediate",
  },
  {
    title: "Add an Experiment",
    description: "Write a reproducible experiment protocol that tests a skill node.",
    href: "https://github.com/frankxai/starlight-knowledge-tree/issues/new?template=add-experiment.yml",
    cta: "Open issue →",
    difficulty: "Intermediate",
  },
  {
    title: "Fix an Error",
    description: "Correct an inaccurate node description, broken edge, or outdated paper reference.",
    href: "https://github.com/frankxai/starlight-knowledge-tree/pulls",
    cta: "Open PR →",
    difficulty: "Any",
  },
];

const EVIDENCE_TYPES = [
  { type: "explanation", desc: "In your own words, to a real audience" },
  { type: "implementation", desc: "Working code, design, or system" },
  { type: "public_artifact", desc: "Published post, repo, paper, or demo" },
  { type: "experiment_log", desc: "Documented experiment with results" },
  { type: "reproducible_notebook", desc: "Executable notebook with verifiable outputs" },
  { type: "contribution", desc: "Accepted PR, dataset, or peer review" },
  { type: "teaching_artifact", desc: "Tutorial, workshop, or mentorship session" },
];

export default function ContributePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            How to <span className="text-gradient-cyan">Contribute</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            Starlight Knowledge Tree grows through community research. Anyone can propose nodes, paths, papers, and
            experiments. The graph favors accuracy over volume.
          </p>
        </div>

        {/* Privacy warning */}
        <div className="glass-card p-5 mb-10 border-amber-authority/20 bg-amber-authority/5">
          <p className="text-sm text-amber-authority font-medium mb-1">⚠️ Privacy Warning</p>
          <p className="text-sm text-white/60">
            This is a public repository. Never commit personal health records, genetic data, biometric data, or any data
            covered by GDPR/HIPAA. The bio-human-intelligence domain covers scientific and population-level research
            only.
          </p>
        </div>

        {/* Contribution types */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6">
            Contribution Types
          </h2>
          <div className="space-y-3">
            {CONTRIBUTION_TYPES.map((c) => (
              <div key={c.title} className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-white/90">{c.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-white/40">
                      {c.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-white/50">{c.description}</p>
                </div>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary shrink-0 text-xs"
                >
                  {c.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Evidence types */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6">
            Valid Evidence Types
          </h2>
          <p className="text-white/50 text-sm mb-6">
            A skill is only real when there is evidence. These are the only accepted evidence types:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EVIDENCE_TYPES.map((e) => (
              <div key={e.type} className="glass-card p-4">
                <div className="text-xs font-mono text-cyan-primary mb-1">{e.type}</div>
                <div className="text-sm text-white/60">{e.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg bg-red-400/5 border border-red-400/10">
            <p className="text-sm text-red-400">
              <span className="font-medium">Not valid:</span> Course completion certificates, watching videos, or
              consumption-only activity.
            </p>
          </div>
        </section>

        {/* Quick links */}
        <section>
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6">
            Quick Links
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="https://github.com/frankxai/starlight-knowledge-tree" className="btn-secondary text-xs">
              GitHub Repo →
            </Link>
            <Link href="https://github.com/frankxai/starlight-knowledge-tree/blob/main/CONTRIBUTING.md" className="btn-secondary text-xs">
              CONTRIBUTING.md →
            </Link>
            <Link href="https://github.com/frankxai/starlight-knowledge-tree/blob/main/ONTOLOGY.md" className="btn-secondary text-xs">
              ONTOLOGY.md →
            </Link>
            <Link href="https://github.com/frankxai/starlight-knowledge-tree/blob/main/docs/agent-operating-rules.md" className="btn-secondary text-xs">
              Agent Rules →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
