import * as fs from "fs";
import * as path from "path";

const dataDir = path.resolve(__dirname, "../data");

// 1. Swarm Patterns with SOTA Empirical Mechanics and Concrete Bindings
const swarmPatternsPath = path.join(dataDir, "nodes/swarm-patterns.json");
const existingSwarms = fs.existsSync(swarmPatternsPath) ? JSON.parse(fs.readFileSync(swarmPatternsPath, "utf8")) : [];

const hardenedSwarms = [
  {
    id: "pattern-queen-conductor-worker",
    type: "swarm_pattern",
    label: "Hierarchical Queen-Conductor-Worker Swarm",
    description: "Decouples meta-strategic planning from task decomposition and task execution. The Queen manages the global objective, Conductor orchestrates worktrees, and Workers execute bounded tasks in parallel isolated branches.",
    domain: "domain-ai-architect",
    tags: ["orchestration", "hierarchical-swarm", "queen", "conductor", "worktree-isolation"],
    status: "evergreen",
    maker_role: "Worker Agent (Execution / Code Generation / File Edits)",
    checker_role: "Queen / Conductor (Goal Verification & Integration Gate)",
    convergence_rule: "All subagent worktrees pass unit tests (npm test), static linting (npm run lint), and git diff verification before conductor executes merge into primary integration branch.",
    failure_modes_mitigated: [
      "Context drift in long execution loops",
      "Conflicting parallel file writes across worktrees",
      "Premature goal termination before complete verification"
    ],
    live_reference_file: "C:/Users/frank/starlight/repos/Starlight-Intelligence-System/skills/sis-activate/SKILL.md",
    cross_repo_applications: [
      { repo: "C:/Users/frank/starlight/repos/Starlight-Intelligence-System", context: "Queen meta-orchestration for estate-wide maintenance." },
      { repo: "C:/Users/frank/starlight/repos/starlight-agent-canvas", context: "Visual task tree execution and worker telemetry." }
    ],
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-08-25T00:00:00Z",
    edges: [
      { type: "unlocks", target: "pattern-semantic-model-router" },
      { type: "unlocks", target: "pattern-blackboard-workspace" }
    ]
  },
  {
    id: "pattern-semantic-model-router",
    type: "swarm_pattern",
    label: "Dynamic Semantic Dispatch & Model Routing",
    description: "Routes agent tasks dynamically based on cognitive load and cost tier: fast lightweight models for mechanical lookups and scans (Shift/Flow gates); high-reasoning frontier models for architecture, judgment, and adversarial reviews (Crown/Unity gates).",
    domain: "domain-ai-architect",
    tags: ["model-routing", "cost-optimization", "semantic-dispatch", "latency-tuning"],
    status: "evergreen",
    maker_role: "Semantic Dispatcher (Task Classifier)",
    checker_role: "Quality Sentinel (Performance & Hallucination Auditor)",
    convergence_rule: "Routing heuristic: Single-file edits and AST lookups (<2k tokens) route to Free Tier / Haiku; multi-file refactors and architectural reviews route to Frontier Tier (Opus / GPT-5.6 Sol) with automatic fallback to secondary provider if error rate > 0%.",
    failure_modes_mitigated: [
      "Overspending on trivial text formatting tasks",
      "Under-reasoning on complex architectural decisions",
      "Single-provider outage vulnerabilities"
    ],
    live_reference_file: "C:/Users/frank/kilo.json",
    cross_repo_applications: [
      { repo: "C:/Users/frank/kilo.json", context: "Default free auto-router mapped to frontier escalation." },
      { repo: "C:/Users/frank/starlight/repos/ai-capability-registry", context: "Universal provider capability matrix and fallback routes." }
    ],
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-08-25T00:00:00Z",
    edges: [
      { type: "unlocks", target: "concept-permissionless-agent-economy" }
    ]
  },
  {
    id: "pattern-evaluator-optimizer",
    type: "swarm_pattern",
    label: "Evaluator-Optimizer & Self-Refining Teleprompters",
    description: "Iterative feedback loop where an Optimizer agent generates candidate prompts or code, an Evaluator agent scores against a suite of assertion tests, and teleprompter algorithms compile few-shot examples into optimized execution weights.",
    domain: "domain-ai-architect",
    tags: ["dspy", "evaluator-optimizer", "prompt-compilation", "self-refinement"],
    status: "evergreen",
    maker_role: "Optimizer / Generator",
    checker_role: "Evaluator / Test Suite Runner",
    convergence_rule: "Iteration stops when test suite assertion pass rate >= 95.0% across 50 holdout validation prompts, or when performance score delta across 3 consecutive iterations is < 0.01.",
    failure_modes_mitigated: [
      "Superficial prompt tuning without ground-truth metrics",
      "Regression errors in multi-turn tool calling",
      "Model drift across provider updates"
    ],
    live_reference_file: "C:/Users/frank/starlight/repos/prompt-library/README.md",
    cross_repo_applications: [
      { repo: "C:/Users/frank/starlight/repos/prompt-library", context: "Automated evaluation and ranking of system prompts." }
    ],
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-08-25T00:00:00Z",
    edges: [
      { type: "unlocks", target: "swarm-pattern-santa-loop" }
    ]
  },
  {
    id: "pattern-blackboard-workspace",
    type: "swarm_pattern",
    label: "Blackboard Architecture & Shared Observable Workspace",
    description: "A centralized, observable state repository where autonomous specialist agents read shared problem states, post intermediate discoveries, and react to changes asynchronously without tight peer-to-peer coupling.",
    domain: "domain-ai-architect",
    tags: ["blackboard-architecture", "shared-state", "decoupled-swarms", "observability"],
    status: "evergreen",
    maker_role: "Specialist Contributor Agents",
    checker_role: "Blackboard Controller / Arbiter",
    convergence_rule: "Arbiter verifies: 1) Zero unresolved merge conflicts, 2) All required field schemas validated via Zod, 3) 100% test pass rate, and 4) State SHA-256 checksum matches integration target.",
    failure_modes_mitigated: [
      "N-squared communication explosion in large swarms",
      "State desynchronization across parallel subagents",
      "Lost intermediate discoveries during agent restarts"
    ],
    live_reference_file: "C:/Users/frank/starlight/repos/starlight-agent-canvas/README.md",
    cross_repo_applications: [
      { repo: "C:/Users/frank/starlight/repos/starlight-agent-canvas", context: "Visual blackboard surface for human and agent interaction." },
      { repo: "C:/Users/frank/starlight/repos/second-brain-vault", context: "Persistent markdown blackboard for daily knowledge logs." }
    ],
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-08-25T00:00:00Z",
    edges: [
      { type: "unlocks", target: "concept-hierarchical-memory-paging" }
    ]
  },
  {
    id: "pattern-map-reduce-scanner",
    type: "swarm_pattern",
    label: "Map-Reduce Parallel Swarm Scanner",
    description: "Fan-out of dozens of lightweight scout agents to inspect distinct files, repositories, or API endpoints in parallel (Map), followed by a synthesis agent that aggregates, deduplicates, and condenses findings into a single coherent dossier (Reduce).",
    domain: "domain-ai-architect",
    tags: ["map-reduce", "parallel-scouts", "fan-out", "estate-audit"],
    status: "evergreen",
    maker_role: "Scout Agents (Parallel Readers)",
    checker_role: "Synthesizer / Reducer Agent",
    convergence_rule: "100% of mapped repository paths return valid JSON AST receipts, and reducer verifies zero duplicate node IDs before compiling master estate index.",
    failure_modes_mitigated: [
      "Sequential bottleneck in multi-repo scanning",
      "Context window overflow from massive code dumps",
      "Incomplete estate discovery"
    ],
    live_reference_file: "C:/Users/frank/starlight/repos/starlight-knowledge-tree/scripts/index-estate.ts",
    cross_repo_applications: [
      { repo: "C:/Users/frank/starlight/repos/starlight-knowledge-tree", context: "Estate indexing script scanning 221 repositories in parallel." }
    ],
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-08-25T00:00:00Z",
    edges: []
  },
  {
    id: "pattern-adversarial-debate",
    type: "swarm_pattern",
    label: "Multi-Agent Adversarial Debate & Red-Teaming",
    description: "Two or more frontier models debate an architectural, security, or strategic proposition from opposing stances (Thesis vs Antithesis), moderated by an impartial Judge model that extracts synthesized truth (Synthesis).",
    domain: "domain-ai-architect",
    tags: ["adversarial-debate", "red-team", "dialectic-synthesis", "cross-model"],
    status: "evergreen",
    maker_role: "Advocate & Red-Team Challenger",
    checker_role: "Judge / Synthesis Model",
    convergence_rule: "Judge model extracts non-contradicted propositions with >= 90/100 rubric score, generates reconciled AST diff, and verifies 0 logical contradictions against CANON_LOCKED.md.",
    failure_modes_mitigated: [
      "Model confirmation bias and sycophancy",
      "Overlooking subtle security vulnerabilities",
      "Premature consensus on suboptimal architectures"
    ],
    live_reference_file: "C:/Users/frank/starlight/repos/Starlight-Intelligence-System/skills/thesis-debate/SKILL.md",
    cross_repo_applications: [
      { repo: "C:/Users/frank/starlight/repos/Starlight-Intelligence-System", context: "Thesis debate protocol for strategic investments and architecture." }
    ],
    created_at: "2026-08-25T00:00:00Z",
    updated_at: "2026-08-25T00:00:00Z",
    edges: []
  }
];

const mergedSwarms = [...existingSwarms.filter((e: any) => !hardenedSwarms.some(n => n.id === e.id)), ...hardenedSwarms];
fs.writeFileSync(swarmPatternsPath, JSON.stringify(mergedSwarms, null, 2), "utf8");
console.log(`✅ Successfully hardened swarm-patterns.json! Total patterns: ${mergedSwarms.length}`);
