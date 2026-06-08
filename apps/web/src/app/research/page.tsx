import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research — Starlight Knowledge Tree",
  description: "Root-node open problems and research frontiers across all domains.",
};

const OPEN_PROBLEMS = [
  {
    id: "problem-alignment-superhumanai",
    label: "Alignment of Superhuman AI Systems",
    domain: "AI Architect",
    domainHref: "/paths/ai-architect",
    difficulty: "unsolved",
    description:
      "How do we ensure that AI systems that surpass human-level capability remain aligned with human values in situations their designers did not anticipate?",
  },
  {
    id: "problem-reasoning-reliability",
    label: "Reliable Multi-Step Reasoning in LLMs",
    domain: "AI Architect",
    domainHref: "/paths/ai-architect",
    difficulty: "hard",
    description:
      "Language models still fail systematically on multi-step mathematical and logical reasoning. What architectural or training changes would produce reliably correct reasoning?",
  },
  {
    id: "problem-agent-safety",
    label: "Safe Agentic AI in Open Environments",
    domain: "AI Architect",
    domainHref: "/paths/ai-architect",
    difficulty: "hard",
    description:
      "How do we build AI agents that act safely and reversibly in open-ended environments where mistakes have real-world consequences?",
  },
  {
    id: "problem-reusable-launch-cost",
    label: "Sub-$100/kg to LEO Launch Cost",
    domain: "Space Builder",
    domainHref: "/paths/space-builder",
    difficulty: "hard",
    description:
      "What combination of reusability, materials, and manufacturing would reduce launch cost to LEO below $100/kg at scale?",
  },
  {
    id: "problem-in-situ-resource-utilization",
    label: "In-Situ Resource Utilization at Scale",
    domain: "Space Builder",
    domainHref: "/paths/space-builder",
    difficulty: "hard",
    description:
      "What processing and manufacturing systems would allow a human settlement on the Moon or Mars to produce propellant, structures, and life support from local resources?",
  },
  {
    id: "problem-aging-mechanism",
    label: "Primary Causal Mechanism of Aging",
    domain: "Bio / Human Intelligence",
    domainHref: "/paths/bio-human-intelligence",
    difficulty: "unsolved",
    description:
      "Is aging driven primarily by information loss in epigenetics, senescent cell accumulation, mitochondrial dysfunction, or another mechanism? What intervention best addresses the root cause?",
  },
  {
    id: "problem-consciousness-hard-problem",
    label: "The Hard Problem of Consciousness",
    domain: "Bio / Human Intelligence",
    domainHref: "/paths/bio-human-intelligence",
    difficulty: "unsolved",
    description:
      "Why does subjective experience exist at all? How does physical neural activity give rise to the felt quality of experience?",
  },
  {
    id: "problem-distribution-cold-start",
    label: "Distribution Cold-Start Problem",
    domain: "Creator-Founder",
    domainHref: "/paths/creator-founder",
    difficulty: "accessible",
    description:
      "How does a new creator or product get its first 1000 genuine, engaged users in a world of algorithmic gatekeeping and attention scarcity?",
  },
];

const DIFFICULTY_STYLES: Record<string, { label: string; class: string }> = {
  accessible: { label: "Accessible", class: "text-green-400 border-green-400/20 bg-green-400/5" },
  hard: { label: "Hard", class: "text-amber-authority border-amber-authority/20 bg-amber-authority/5" },
  unsolved: { label: "Unsolved", class: "text-red-400 border-red-400/20 bg-red-400/5" },
};

export default function ResearchPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Research <span className="text-gradient-amber">Radar</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            Root-node open problems across all domains. These are the questions at the frontier — the ones that unlock
            the most downstream capability when solved.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">3</div>
            <div className="text-xs text-white/40">Unsolved</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-amber-authority mb-1">4</div>
            <div className="text-xs text-white/40">Hard</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">1</div>
            <div className="text-xs text-white/40">Accessible</div>
          </div>
        </div>

        {/* Problems */}
        <div className="space-y-4">
          {OPEN_PROBLEMS.map((p) => {
            const style = DIFFICULTY_STYLES[p.difficulty] ?? DIFFICULTY_STYLES.hard;
            return (
              <div key={p.id} className="glass-card p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white/90 mb-1">{p.label}</h3>
                    <Link
                      href={p.domainHref}
                      className="text-xs text-cyan-primary hover:underline"
                    >
                      {p.domain} →
                    </Link>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border self-start shrink-0 ${style.class}`}
                  >
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

        {/* CTA */}
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
