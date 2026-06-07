import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

const DOMAIN_META: Record<
  string,
  {
    label: string;
    description: string;
    tagline: string;
    paths: Array<{ id: string; label: string; description: string; nodes: string[] }>;
    rootProblems: Array<{ id: string; label: string; difficulty: string }>;
  }
> = {
  "ai-architect": {
    label: "AI Architect",
    tagline: "From mathematical foundations to deployed AI systems.",
    description:
      "The domain of understanding, designing, and building AI systems — from neural network basics through large language models, agents, reasoning, and alignment.",
    paths: [
      {
        id: "path-ai-architect-foundation",
        label: "AI Foundation",
        description: "Mathematical and conceptual prerequisites for deep learning.",
        nodes: [
          "concept-linear-algebra",
          "concept-probability-statistics",
          "concept-gradient-descent",
          "concept-backpropagation",
          "concept-neural-network-basics",
          "skill-train-basic-nn",
        ],
      },
      {
        id: "path-ai-architect-transformers",
        label: "Transformer Architecture",
        description: "From attention mechanisms to modern foundation models.",
        nodes: [
          "concept-attention-mechanism",
          "concept-transformer-architecture",
          "concept-pretraining-objectives",
          "skill-implement-transformer",
          "skill-finetune-llm",
          "skill-evaluate-llm",
        ],
      },
      {
        id: "path-ai-architect-agents",
        label: "AI Agents",
        description: "Building autonomous, tool-using, multi-step AI agents.",
        nodes: [
          "concept-llm-prompting",
          "concept-tool-use",
          "concept-agent-loop",
          "concept-memory-context",
          "skill-build-agent",
          "skill-multi-agent-coordination",
        ],
      },
      {
        id: "path-ai-architect-alignment",
        label: "Alignment and Safety",
        description: "Foundations and practice of making AI systems safe and aligned.",
        nodes: [
          "concept-rlhf",
          "concept-constitutional-ai",
          "concept-interpretability",
          "concept-mechanistic-interpretability",
          "skill-red-team-llm",
          "skill-evaluate-alignment",
        ],
      },
    ],
    rootProblems: [
      { id: "problem-alignment-superhumanai", label: "Alignment of Superhuman AI", difficulty: "unsolved" },
      { id: "problem-reasoning-reliability", label: "Reliable Multi-Step Reasoning", difficulty: "hard" },
      { id: "problem-agent-safety", label: "Safe Agentic AI", difficulty: "hard" },
    ],
  },
  "space-builder": {
    label: "Space Builder",
    tagline: "Orbital mechanics to mission design to space systems engineering.",
    description:
      "The domain of understanding, designing, and building space systems — from orbital mechanics and propulsion through mission design and spacecraft engineering.",
    paths: [
      {
        id: "path-space-builder-orbital-mechanics",
        label: "Orbital Mechanics",
        description: "Kepler to Hohmann — foundations of orbital motion.",
        nodes: [
          "concept-newtonian-gravity",
          "concept-keplers-laws",
          "concept-orbital-elements",
          "concept-hohmann-transfer",
          "concept-delta-v-budget",
          "skill-calculate-orbit",
          "skill-plan-trajectory",
        ],
      },
      {
        id: "path-space-builder-propulsion",
        label: "Propulsion Systems",
        description: "Chemical, electric, and advanced propulsion concepts.",
        nodes: [
          "concept-tsiolkovsky-rocket-equation",
          "concept-specific-impulse",
          "concept-chemical-propulsion",
          "concept-electric-propulsion",
          "skill-size-propulsion-system",
        ],
      },
      {
        id: "path-space-builder-mission-design",
        label: "Mission Design",
        description: "End-to-end spacecraft and mission engineering.",
        nodes: [
          "concept-mission-requirements",
          "concept-systems-engineering",
          "concept-mass-budget",
          "concept-power-budget",
          "skill-design-cubesat-mission",
        ],
      },
    ],
    rootProblems: [
      { id: "problem-reusable-launch-cost", label: "Sub-$100/kg to LEO", difficulty: "hard" },
      { id: "problem-in-situ-resource-utilization", label: "ISRU at Scale", difficulty: "hard" },
      { id: "problem-radiation-biology-deep-space", label: "Radiation Biology in Deep Space", difficulty: "hard" },
    ],
  },
  "bio-human-intelligence": {
    label: "Bio / Human Intelligence",
    tagline: "Neuroscience, longevity, and cognitive performance — evidence-grounded.",
    description:
      "The domain of understanding human cognition, neuroscience, longevity, performance, and biosystems. All content is grounded in peer-reviewed science. No personal health data.",
    paths: [
      {
        id: "path-bio-neuroscience-foundations",
        label: "Neuroscience Foundations",
        description: "From neurons to networks.",
        nodes: [
          "concept-neuron-anatomy",
          "concept-action-potential",
          "concept-synaptic-transmission",
          "concept-plasticity",
          "skill-read-neuroscience-paper",
        ],
      },
      {
        id: "path-bio-longevity",
        label: "Longevity Science",
        description: "Mechanistic understanding of aging and healthspan interventions.",
        nodes: [
          "concept-hallmarks-of-aging",
          "concept-mtor-pathway",
          "concept-senescence",
          "concept-epigenetic-clocks",
          "skill-evaluate-longevity-intervention",
        ],
      },
      {
        id: "path-bio-cognitive-performance",
        label: "Cognitive Performance",
        description: "Evidence-based approaches to understanding cognitive function.",
        nodes: [
          "concept-working-memory",
          "concept-attention-and-focus",
          "concept-sleep-and-cognition",
          "concept-exercise-and-brain",
          "skill-design-cognitive-experiment",
        ],
      },
    ],
    rootProblems: [
      { id: "problem-aging-mechanism", label: "Primary Causal Mechanism of Aging", difficulty: "unsolved" },
      { id: "problem-consciousness-hard-problem", label: "The Hard Problem of Consciousness", difficulty: "unsolved" },
      { id: "problem-cognitive-enhancement-safety", label: "Safe Cognitive Enhancement", difficulty: "hard" },
    ],
  },
  "creator-founder": {
    label: "Creator-Founder",
    tagline: "Products, companies, leverage, distribution.",
    description:
      "The domain of building products, companies, creative systems, and audiences — combining leverage, distribution, execution, and taste into compounding output.",
    paths: [
      {
        id: "path-creator-founder-product",
        label: "Product Thinking",
        description: "From user insight to product definition and iteration.",
        nodes: [
          "concept-jobs-to-be-done",
          "concept-product-market-fit",
          "concept-user-research",
          "skill-conduct-user-interview",
          "skill-write-product-spec",
          "skill-ship-mvp",
        ],
      },
      {
        id: "path-creator-founder-distribution",
        label: "Distribution and Audience",
        description: "Building and sustaining an audience across platforms.",
        nodes: [
          "concept-content-leverage",
          "concept-distribution-channels",
          "concept-network-effects",
          "skill-write-high-signal-post",
          "skill-grow-audience",
        ],
      },
      {
        id: "path-creator-founder-company",
        label: "Company Building",
        description: "From idea to operating company.",
        nodes: [
          "concept-business-model",
          "concept-unit-economics",
          "concept-fundraising-mechanics",
          "skill-build-financial-model",
          "skill-pitch-investors",
          "skill-close-first-customers",
        ],
      },
    ],
    rootProblems: [
      { id: "problem-distribution-cold-start", label: "Distribution Cold-Start Problem", difficulty: "accessible" },
      { id: "problem-product-market-fit-detection", label: "Detecting Product-Market Fit", difficulty: "accessible" },
      { id: "problem-creative-consistency-at-scale", label: "Creative Consistency at Scale", difficulty: "hard" },
    ],
  },
};

type Props = { params: { domain: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = DOMAIN_META[params.domain];
  if (!meta) return { title: "Not Found" };
  return {
    title: `${meta.label} Path — Starlight Knowledge Tree`,
    description: meta.description,
  };
}

export function generateStaticParams() {
  return Object.keys(DOMAIN_META).map((domain) => ({ domain }));
}

const DIFFICULTY_COLORS: Record<string, string> = {
  accessible: "text-green-400",
  hard: "text-amber-authority",
  unsolved: "text-red-400",
};

export default function PathPage({ params }: Props) {
  const meta = DOMAIN_META[params.domain];
  if (!meta) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/tree" className="hover:text-white/70 transition-colors">
            Tree
          </Link>
          <span>/</span>
          <span className="text-white/70">{meta.label}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">{meta.label}</h1>
          <p className="text-cyan-primary text-lg mb-4">{meta.tagline}</p>
          <p className="text-white/50 max-w-2xl leading-relaxed">{meta.description}</p>
        </div>

        {/* Paths */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6">
            Skill Paths
          </h2>
          <div className="space-y-4">
            {meta.paths.map((path) => (
              <div key={path.id} className="glass-card p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white/90">{path.label}</h3>
                  <span className="text-xs font-mono text-white/30">{path.nodes.length} nodes</span>
                </div>
                <p className="text-sm text-white/50 mb-4">{path.description}</p>
                <div className="flex flex-wrap gap-2">
                  {path.nodes.map((nodeId, i) => (
                    <div key={nodeId} className="flex items-center gap-1">
                      <span className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/5 text-white/60 font-mono">
                        {nodeId}
                      </span>
                      {i < path.nodes.length - 1 && (
                        <span className="text-cyan-primary/30 text-xs">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Open Problems */}
        <section className="mb-16">
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-6">
            Root-Node Open Problems
          </h2>
          <div className="space-y-3">
            {meta.rootProblems.map((problem) => (
              <div key={problem.id} className="glass-card p-4 flex items-center justify-between">
                <div>
                  <span className="text-sm font-mono text-white/30 mr-3">{problem.id}</span>
                  <span className="text-white/80">{problem.label}</span>
                </div>
                <span className={`text-xs font-medium ${DIFFICULTY_COLORS[problem.difficulty] ?? "text-white/40"}`}>
                  {problem.difficulty}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex gap-4">
          <Link href="/contribute" className="btn-primary">
            Contribute to this path
          </Link>
          <Link href="/research" className="btn-secondary">
            View open problems
          </Link>
        </div>
      </div>
    </div>
  );
}
