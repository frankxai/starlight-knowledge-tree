import * as fs from "fs";
import * as path from "path";

const dataDir = path.resolve(__dirname, "../data");

// 1. Open Problems for Scale
const problemsPath = path.join(dataDir, "nodes/open-problems.json");
const existingProblems = fs.existsSync(problemsPath) ? JSON.parse(fs.readFileSync(problemsPath, "utf8")) : [];

const scaleProblems = [
  {
    id: "problem-agent-concurrency-bottleneck",
    type: "open_problem",
    label: "Concurrent Agent Swarm Contention & State Race Conditions",
    description: "How to run 50+ autonomous coding and research agents simultaneously without triggering provider rate limits (429s), Git merge collisions, or machine OOM crashes.",
    domain: "domain-scale-distributed-agentics",
    tags: ["concurrency", "swarm-scaling", "race-conditions", "rate-limiting"],
    status: "stable",
    difficulty: "hard",
    prize_or_benchmark: "benchmark-swarm-concurrency-throughput",
    related_papers: [],
    created_at: "2026-09-09T00:00:00Z",
    updated_at: "2026-09-09T00:00:00Z",
    edges: [{ type: "part_of", target: "domain-scale-distributed-agentics" }]
  },
  {
    id: "problem-context-window-cost-exhaustion",
    type: "open_problem",
    label: "Context Window Cost & Latency Explosion in Extended Autonomy",
    description: "Long-running multi-day swarms generate millions of tokens; without static KV cache alignment and prompt compaction, inference costs scale non-linearly.",
    domain: "domain-scale-distributed-agentics",
    tags: ["kv-cache", "token-economics", "context-compaction", "cost-scaling"],
    status: "stable",
    difficulty: "hard",
    prize_or_benchmark: null,
    related_papers: [],
    created_at: "2026-09-09T00:00:00Z",
    updated_at: "2026-09-09T00:00:00Z",
    edges: [{ type: "part_of", target: "domain-scale-distributed-agentics" }]
  },
  {
    id: "problem-graph-memory-scaling-limits",
    type: "open_problem",
    label: "In-Memory Knowledge Graph Scaling Thresholds",
    description: "Flat JSON AST trees become unwieldy past 2,000 entities, requiring transition to columnar disk-backed stores (LanceDB/Kùzu) and localized subgraph partitioning.",
    domain: "domain-scale-distributed-agentics",
    tags: ["graph-scaling", "lancedb", "kuzu", "subgraph-partitioning"],
    status: "stable",
    difficulty: "medium",
    prize_or_benchmark: null,
    related_papers: [],
    created_at: "2026-09-09T00:00:00Z",
    updated_at: "2026-09-09T00:00:00Z",
    edges: [{ type: "part_of", target: "domain-scale-distributed-agentics" }]
  }
];

const mergedProblems = [...existingProblems.filter((e: any) => !scaleProblems.some(n => n.id === e.id)), ...scaleProblems];
fs.writeFileSync(problemsPath, JSON.stringify(mergedProblems, null, 2), "utf8");
console.log(`✅ Successfully enriched open-problems.json! Total: ${mergedProblems.length}`);

// 2. Swarm Patterns for Scale
const swarmPatternsPath = path.join(dataDir, "nodes/swarm-patterns.json");
const existingSwarms = fs.existsSync(swarmPatternsPath) ? JSON.parse(fs.readFileSync(swarmPatternsPath, "utf8")) : [];

const scaleSwarms = [
  {
    id: "pattern-queue-backed-agent-workers",
    type: "swarm_pattern",
    label: "Queue-Backed Durable Agent Worker Swarm",
    description: "A distributed job queue (BullMQ/Redis or SQLite durable queue) decouples user request dispatch from execution. Workers pull tasks from priority queues with token rate-limit sharding, exponential backoff with jitter, and dead-letter queues for failed trajectories.",
    domain: "domain-scale-distributed-agentics",
    tags: ["queue-workers", "concurrency", "bullmq", "backoff", "resilience"],
    status: "evergreen",
    maker_role: "Queue Worker Agent (Isolated Task Runner)",
    checker_role: "Dead-Letter Sentinel & Supervisor",
    convergence_rule: "Task payload produces verifiable git commit or signed artifact hash, updates job state to completed with zero unhandled exceptions, and cleans up temporary worktree.",
    failure_modes_mitigated: [
      "Provider 429 rate limit cascades",
      "Process crash losing in-memory agent state",
      "Uncontrolled memory spikes from simultaneous unthrottled spawns"
    ],
    live_reference_file: "C:/Users/frank/starlight/repos/Starlight-Intelligence-System/skills/queen/COORDINATION.md",
    cross_repo_applications: [
      { repo: "C:/Users/frank/starlight/repos/Starlight-Intelligence-System", context: "Coordinates multi-agent task queue and state handoffs." },
      { repo: "C:/Users/frank/starlight/repos/starlight-agent-canvas", context: "Visualizes job status, worker slots, and throughput telemetry." }
    ],
    created_at: "2026-09-09T00:00:00Z",
    updated_at: "2026-09-09T00:00:00Z",
    edges: [
      { type: "unlocks", target: "concept-token-rate-limit-sharding" },
      { type: "unlocks", target: "concept-memory-guardian-oom-prevention" }
    ]
  },
  {
    id: "pattern-kv-cache-prefix-compaction",
    type: "swarm_pattern",
    label: "KV-Cache Prefix Alignment & Context Compaction",
    description: "Maximizes provider prompt caching (Anthropic 90% discount, Gemini context caching) by structuring agent prompts with an immutable static prefix (System contract, tools schema, core lore) followed by dynamic turn deltas, reducing inference latency by 80% and token cost by 75%.",
    domain: "domain-scale-distributed-agentics",
    tags: ["kv-cache", "prompt-caching", "cost-reduction", "token-economics"],
    status: "evergreen",
    maker_role: "Context Compactor / Prompt Assembler",
    checker_role: "Cache Hit Telemetry Monitor",
    convergence_rule: "Prompt prefix hash remains identical across >= 90% of swarm turns, achieving verifiable cache hit rate >= 80% on supported model endpoints.",
    failure_modes_mitigated: [
      "Compounding API billing from repeated full-history reinjection",
      "Context processing latency spikes in multi-turn loops",
      "Context truncation shedding critical rules"
    ],
    live_reference_file: "C:/Users/frank/starlight/AGENTS.md",
    cross_repo_applications: [
      { repo: "C:/Users/frank/starlight", context: "Static prefix contract enforced across all harness adapters." },
      { repo: "C:/Users/frank/starlight/repos/prompt-library", context: "Prompt templates compiled with deterministic static-header blocks." }
    ],
    created_at: "2026-09-09T00:00:00Z",
    updated_at: "2026-09-09T00:00:00Z",
    edges: [
      { type: "unlocks", target: "concept-hierarchical-memory-paging" }
    ]
  },
  {
    id: "pattern-hierarchical-graph-partitioning",
    type: "swarm_pattern",
    label: "Hierarchical Graph Partitioning & 2-Hop Neighborhoods",
    description: "When the knowledge graph scales past thousands of entities, agents do not ingest the whole tree. The graph is sharded into domain clusters, and agents query only the 2-hop radius around target concepts via topological traversal or semantic vector filtering.",
    domain: "domain-scale-distributed-agentics",
    tags: ["graph-partitioning", "subgraph-retrieval", "scale", "topological-query"],
    status: "evergreen",
    maker_role: "Subgraph Extractor (Query Router)",
    checker_role: "Partition Boundary Validator",
    convergence_rule: "Extracted subgraph context fits within <= 8,000 tokens while capturing 100% of direct prerequisite and unlock edges for target problem.",
    failure_modes_mitigated: [
      "Context window exhaustion from loading whole-estate schemas",
      "Irrelevant distractors degrading agent reasoning accuracy",
      "Client-side bundle bloat on the web visualizer"
    ],
    live_reference_file: "C:/Users/frank/starlight/repos/starlight-knowledge-tree/packages/graph-utils/src/index.ts",
    cross_repo_applications: [
      { repo: "C:/Users/frank/starlight/repos/starlight-knowledge-tree", context: "Dynamic domain loader sharding data files." },
      { repo: "C:/Users/frank/starlight/repos/second-brain-vault", context: "Obsidian folder and tag partitioning." }
    ],
    created_at: "2026-09-09T00:00:00Z",
    updated_at: "2026-09-09T00:00:00Z",
    edges: [
      { type: "unlocks", target: "concept-lancedb-columnar-vector-scale" }
    ]
  },
  {
    id: "pattern-agent-sandbox-isolation",
    type: "swarm_pattern",
    label: "Agent Sandbox Isolation & Blast Radius Containment",
    description: "Executes untrusted code, web scraping, and third-party dependencies inside isolated lightweight containers or WASM sandboxes with restricted network access, virtualized filesystems, and strict Phone Link / root directory search bans.",
    domain: "domain-scale-distributed-agentics",
    tags: ["sandbox", "isolation", "security", "blast-radius", "safety-gate"],
    status: "evergreen",
    maker_role: "Sandboxed Worker",
    checker_role: "Security Sentinel & Egress Auditor",
    convergence_rule: "Execution finishes within resource limits (CPU, memory, timeout), produces signed outputs in scratch directory, and leaves host filesystem completely unaltered.",
    failure_modes_mitigated: [
      "Accidental deletion or corruption of host files",
      "Malicious code execution from third-party repositories",
      "Phone Link recursive sync triggering infinite mobile file downloads"
    ],
    live_reference_file: "C:/Users/frank/starlight/repos/Starlight-Intelligence-System/skills/safety-guard/SKILL.md",
    cross_repo_applications: [
      { repo: "C:/Users/frank/starlight/repos/Starlight-Intelligence-System", context: "Enforces execution safety gates and mutation permissions." }
    ],
    created_at: "2026-09-09T00:00:00Z",
    updated_at: "2026-09-09T00:00:00Z",
    edges: []
  }
];

const mergedSwarms = [...existingSwarms.filter((e: any) => !scaleSwarms.some(n => n.id === e.id)), ...scaleSwarms];
fs.writeFileSync(swarmPatternsPath, JSON.stringify(mergedSwarms, null, 2), "utf8");
console.log(`✅ Successfully enriched swarm-patterns.json! Total: ${mergedSwarms.length}`);

// 3. Concepts for Scale
const conceptsPath = path.join(dataDir, "nodes/concepts.json");
const existingConcepts = fs.existsSync(conceptsPath) ? JSON.parse(fs.readFileSync(conceptsPath, "utf8")) : [];

const scaleConcepts = [
  {
    id: "concept-token-rate-limit-sharding",
    type: "concept",
    label: "Token Rate-Limit Sharding & Key Pools",
    description: "Distributing high-concurrency swarm calls across multiple API keys, service tiers, and regional endpoints using token-bucket rate limiting to prevent 429 throttles during peak swarm bursts.",
    domain: "domain-scale-distributed-agentics",
    tags: ["rate-limiting", "token-bucket", "sharding", "high-availability"],
    status: "stable",
    created_at: "2026-09-09T00:00:00Z",
    updated_at: "2026-09-09T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-memory-guardian-oom-prevention" }]
  },
  {
    id: "concept-memory-guardian-oom-prevention",
    type: "concept",
    label: "Memory Guardian & WSL2 OOM Prevention",
    description: "Standing telemetry process that continuously samples system RAM, VRAM, and swap usage. When free memory drops below critical threshold (50GB free / 15% RAM), it throttles parallel agent worktrees and enforces text-only modes to prevent OS lockups.",
    domain: "domain-scale-distributed-agentics",
    tags: ["memory-guardian", "wsl2", "oom-prevention", "resource-governance"],
    status: "stable",
    created_at: "2026-09-09T00:00:00Z",
    updated_at: "2026-09-09T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-incremental-static-regeneration-isr" }]
  },
  {
    id: "concept-incremental-static-regeneration-isr",
    type: "concept",
    label: "Incremental Static Regeneration (ISR) at Scale",
    description: "Next.js architecture pattern that pre-renders key hub routes at build time while lazily generating and caching long-tail pages (10,000+ domain/concept paths) on first request, background revalidating stale caches without full site rebuilds.",
    domain: "domain-scale-distributed-agentics",
    tags: ["isr", "nextjs", "edge-caching", "web-scale", "on-demand-revalidation"],
    status: "stable",
    created_at: "2026-09-09T00:00:00Z",
    updated_at: "2026-09-09T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-entity-resolution-deduplication" }]
  },
  {
    id: "concept-entity-resolution-deduplication",
    type: "concept",
    label: "Entity Resolution & Automated Graph Deduplication",
    description: "Automated identity resolution using normalized string distance (Levenshtein/Jaro-Winkler) combined with dense embedding cosine similarity (>0.92) to detect duplicate authors, papers, or tools ingested from divergent sources and merge them into canonical SSOT nodes.",
    domain: "domain-scale-distributed-agentics",
    tags: ["entity-resolution", "deduplication", "data-quality", "knowledge-graph"],
    status: "stable",
    created_at: "2026-09-09T00:00:00Z",
    updated_at: "2026-09-09T00:00:00Z",
    edges: [{ type: "unlocks", target: "concept-lancedb-columnar-vector-scale" }]
  },
  {
    id: "concept-lancedb-columnar-vector-scale",
    type: "concept",
    label: "Columnar Disk-Backed Vector Storage (LanceDB)",
    description: "Serverless, embedded vector search engine built on the Lance columnar data format. Allows zero-daemon, sub-millisecond similarity search over millions of vector embeddings directly on local disk or S3/cloud storage without running heavy database servers.",
    domain: "domain-scale-distributed-agentics",
    tags: ["lancedb", "vector-database", "columnar", "zero-daemon", "scale"],
    status: "stable",
    created_at: "2026-09-09T00:00:00Z",
    updated_at: "2026-09-09T00:00:00Z",
    edges: []
  }
];

const mergedConcepts = [...existingConcepts.filter((e: any) => !scaleConcepts.some(n => n.id === e.id)), ...scaleConcepts];
fs.writeFileSync(conceptsPath, JSON.stringify(mergedConcepts, null, 2), "utf8");
console.log(`✅ Successfully enriched concepts.json! Total: ${mergedConcepts.length}`);

// 4. Tools for Scale
const toolsPath = path.join(dataDir, "nodes/tools.json");
const existingTools = fs.existsSync(toolsPath) ? JSON.parse(fs.readFileSync(toolsPath, "utf8")) : [];

const scaleTools = [
  {
    id: "tool-lancedb",
    type: "tool",
    label: "LanceDB",
    description: "Developer-friendly, serverless vector database for AI applications, written in Rust with native Node.js and Python bindings. Stores vectors and relational metadata in columnar Lance files.",
    domain: "domain-scale-distributed-agentics",
    tags: ["lancedb", "vector-db", "serverless", "rust", "columnar"],
    status: "evergreen",
    url: "https://lancedb.com",
    created_at: "2026-09-09T00:00:00Z",
    updated_at: "2026-09-09T00:00:00Z",
    edges: [{ type: "applies_to", target: "concept-lancedb-columnar-vector-scale" }]
  },
  {
    id: "tool-langfuse",
    type: "tool",
    label: "Langfuse",
    description: "Open source LLM engineering platform providing observability, trace visualization, prompt management, and automated evaluation metrics for multi-agent swarms.",
    domain: "domain-scale-distributed-agentics",
    tags: ["langfuse", "observability", "tracing", "evals", "telemetry"],
    status: "evergreen",
    url: "https://langfuse.com",
    created_at: "2026-09-09T00:00:00Z",
    updated_at: "2026-09-09T00:00:00Z",
    edges: [{ type: "applies_to", target: "pattern-evaluator-optimizer" }]
  },
  {
    id: "tool-redis-bullmq",
    type: "tool",
    label: "BullMQ & Redis",
    description: "High-performance, message-based distributed task queue for Node.js and TypeScript. Supports delayed jobs, parent-child task flows, rate limiting, and failure retries.",
    domain: "domain-scale-distributed-agentics",
    tags: ["bullmq", "redis", "task-queue", "distributed-jobs", "concurrency"],
    status: "stable",
    url: "https://bullmq.io",
    created_at: "2026-09-09T00:00:00Z",
    updated_at: "2026-09-09T00:00:00Z",
    edges: [{ type: "applies_to", target: "pattern-queue-backed-agent-workers" }]
  }
];

const mergedTools = [...existingTools.filter((e: any) => !scaleTools.some(n => n.id === e.id)), ...scaleTools];
fs.writeFileSync(toolsPath, JSON.stringify(mergedTools, null, 2), "utf8");
console.log(`✅ Successfully enriched tools.json! Total: ${mergedTools.length}`);

// 5. Benchmarks for Scale
const benchmarksPath = path.join(dataDir, "benchmarks.json");
const existingBenchmarks = fs.existsSync(benchmarksPath) ? JSON.parse(fs.readFileSync(benchmarksPath, "utf8")) : [];

const scaleBenchmarks = [
  {
    id: "benchmark-swarm-concurrency-throughput",
    name: "Swarm Concurrency & Task Throughput Benchmark",
    domain: "domain-scale-distributed-agentics",
    description: "Measures task completion rate (tasks/min), 429 rate-limit avoidance, peak RAM consumption, and git conflict rate under concurrent loads of 10 to 100 parallel agent workers.",
    metric: "Sustained Concurrency (Agents) & Task Throughput (Tasks/Min)",
    sota_target: "50 concurrent agents @ >= 98% success rate",
    source_url: "https://github.com/frankxai/starlight-knowledge-tree",
    created_at: "2026-09-09T00:00:00Z"
  }
];

const mergedBenchmarks = [...existingBenchmarks.filter((e: any) => !scaleBenchmarks.some(n => n.id === e.id)), ...scaleBenchmarks];
fs.writeFileSync(benchmarksPath, JSON.stringify(mergedBenchmarks, null, 2), "utf8");
console.log(`✅ Successfully enriched benchmarks.json! Total: ${mergedBenchmarks.length}`);
