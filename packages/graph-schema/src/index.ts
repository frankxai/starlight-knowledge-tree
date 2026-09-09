import { z } from "zod";

// ── Edge ──────────────────────────────────────────────────────────────────────

export const EdgeTypeSchema = z.enum([
  "requires",
  "unlocks",
  "applies_to",
  "evidenced_by",
  "contributes_to",
  "contradicts",
  "updated_by",
  "part_of",
  "teaches",
  "tests",
  "orchestrates",
  "benchmarks",
  "supersedes",
  "references",
]);

export type EdgeType = z.infer<typeof EdgeTypeSchema>;

export const EdgeSchema = z.object({
  type: EdgeTypeSchema,
  target: z.string().regex(/^[a-z][a-z0-9-]*$/),
  weight: z.number().min(0).max(1).optional(),
  note: z.string().max(500).optional(),
  deprecated: z.boolean().optional(),
});

export type Edge = z.infer<typeof EdgeSchema>;

// ── Node type ──────────────────────────────────────────────────────────────────

export const NodeTypeSchema = z.enum([
  "domain",
  "concept",
  "skill",
  "tool",
  "paper",
  "book",
  "mcp",
  "swarm_pattern",
  "workflow",
  "benchmark",
  "dataset",
  "experiment",
  "artifact",
  "credential",
  "open_problem",
  "contribution_task",
]);

export type NodeType = z.infer<typeof NodeTypeSchema>;

// ── Status ────────────────────────────────────────────────────────────────────

export const StatusSchema = z.enum(["seed", "draft", "stable", "evergreen", "deprecated"]);
export type Status = z.infer<typeof StatusSchema>;

// ── Evidence types ────────────────────────────────────────────────────────────

export const EvidenceTypeSchema = z.enum([
  "explanation",
  "implementation",
  "public_artifact",
  "experiment_log",
  "reproducible_notebook",
  "contribution",
  "teaching_artifact",
]);

export type EvidenceType = z.infer<typeof EvidenceTypeSchema>;

// ── SIP Attestation & Repo Pointers ──────────────────────────────────────────

export const RepoOriginSchema = z.object({
  repo: z.string(),
  file_path: z.string(),
  anchor: z.string().optional(),
});

export type RepoOrigin = z.infer<typeof RepoOriginSchema>;

export const SipAttestationSchema = z.object({
  verified_by: z.string(),
  verified_at: z.string(),
  citations: z.array(
    z.object({
      path: z.string(),
      anchor: z.string().optional(),
      retrieved_at: z.string(),
    })
  ),
  framing: z.enum(["lens", "fact", "canon"]),
  privacy_class: z.enum(["public", "internal", "local_core", "secret"]),
  survived: z.array(z.string()).optional(),
});

export type SipAttestation = z.infer<typeof SipAttestationSchema>;

// ── Base node ─────────────────────────────────────────────────────────────────

const CommonNodeSchema = z.object({
  id: z.string().regex(/^[a-z][a-z0-9-]*$/),
  type: NodeTypeSchema,
  label: z.string().min(2).max(200),
  description: z.string().min(10).max(1500),
  tags: z.array(z.string()).min(1).max(25),
  status: StatusSchema,
  edges: z.array(EdgeSchema),
  repo_origin: RepoOriginSchema.optional(),
  sip_attestation: SipAttestationSchema.optional(),
  vercel_url: z.string().url().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

const BaseNodeSchema = CommonNodeSchema.extend({
  domain: z.string().regex(/^domain-[a-z][a-z0-9-]*$/),
});

const DomainPathSchema = z.object({
  id: z.string().regex(/^path-[a-z][a-z0-9-]*$/),
  label: z.string().min(2).max(200),
  description: z.string().max(500).optional(),
  nodes: z.array(z.string()).min(1),
});

export const DomainNodeSchema = CommonNodeSchema.extend({
  id: z.string().regex(/^domain-[a-z][a-z0-9-]*$/),
  type: z.literal("domain"),
  root_problems: z.array(z.string()).min(1),
  paths: z.array(DomainPathSchema).min(1),
  seed_nodes: z.array(z.string()).min(1),
  privacy_warning: z.string().min(10).optional(),
});

export type DomainNode = z.infer<typeof DomainNodeSchema>;

// ── Skill node ────────────────────────────────────────────────────────────────

export const SkillNodeSchema = BaseNodeSchema.extend({
  type: z.literal("skill"),
  prerequisites: z.array(z.string()),
  evidence_types: z.array(EvidenceTypeSchema).min(1),
  unlock_criteria: z.string().min(10),
});

export type SkillNode = z.infer<typeof SkillNodeSchema>;

// ── Paper node ────────────────────────────────────────────────────────────────

export const PaperNodeSchema = BaseNodeSchema.extend({
  type: z.literal("paper"),
  authors: z.array(z.string()).min(1),
  year: z.number().int().min(1900).max(2100),
  url: z.string().url(),
  abstract: z.string().optional(),
  key_findings: z.array(z.string()).optional(),
  significance: z.string().optional(),
});

export type PaperNode = z.infer<typeof PaperNodeSchema>;

// ── Book node ─────────────────────────────────────────────────────────────────

export const MentalModelSchema = z.object({
  name: z.string(),
  description: z.string(),
  application: z.string(),
});

export const CoreChapterSchema = z.object({
  number: z.union([z.number(), z.string()]),
  title: z.string(),
  takeaway: z.string(),
});

export const CrossRepoApplicationSchema = z.object({
  repo: z.string(),
  context: z.string(),
  direct_link: z.string().optional(),
});

export const QuoteSchema = z.object({
  quote: z.string(),
  source: z.string(),
});

export const BookNodeSchema = BaseNodeSchema.extend({
  type: z.literal("book"),
  title: z.string(),
  subtitle: z.string().optional(),
  authors: z.array(z.string()).min(1),
  year: z.number().int().min(1900).max(2100),
  isbn: z.string().optional(),
  publisher: z.string().optional(),
  canonical_url: z.string().url().optional(),
  summary: z.string(),
  key_mental_models: z.array(MentalModelSchema).optional(),
  core_chapters: z.array(CoreChapterSchema).optional(),
  cross_repo_applications: z.array(CrossRepoApplicationSchema).optional(),
  quotes: z.array(QuoteSchema).optional(),
});

export type BookNode = z.infer<typeof BookNodeSchema>;

// ── MCP node ──────────────────────────────────────────────────────────────────

export const MCPToolDefSchema = z.object({
  name: z.string(),
  description: z.string(),
  parameters: z.record(z.any()).optional(),
  safety_level: z.enum(["read_only", "idempotent_write", "destructive", "financial_transaction"]),
});

export const MCPResourceDefSchema = z.object({
  uri: z.string(),
  name: z.string(),
  mimeType: z.string().optional(),
});

export const MCPNodeSchema = BaseNodeSchema.extend({
  type: z.literal("mcp"),
  server_name: z.string(),
  protocol_version: z.string().default("2024-11-05"),
  transport: z.enum(["stdio", "sse", "websocket", "http"]),
  tools: z.array(MCPToolDefSchema),
  resources: z.array(MCPResourceDefSchema).optional(),
  auth_model: z.string(),
  install_command: z.string().optional(),
  verified_in_repos: z.array(z.string()).optional(),
  latency_tier: z.enum(["low", "medium", "high"]),
});

export type MCPNode = z.infer<typeof MCPNodeSchema>;

// ── Swarm Pattern node ────────────────────────────────────────────────────────

export const SwarmPatternNodeSchema = BaseNodeSchema.extend({
  type: z.literal("swarm_pattern"),
  pattern_name: z.string(),
  maker_roles: z.array(z.string()).min(1),
  checker_roles: z.array(z.string()).min(1),
  convergence_rule: z.string(),
  failure_modes: z.array(z.string()),
  token_budget_profile: z.enum(["light", "standard", "heavy", "frontier_intensive"]),
  code_example: z.string().optional(),
  live_reference_file: z.string().optional(),
});

export type SwarmPatternNode = z.infer<typeof SwarmPatternNodeSchema>;

// ── Workflow node ─────────────────────────────────────────────────────────────

export const PipelineStageSchema = z.object({
  stage_num: z.number(),
  name: z.string(),
  owner_agent: z.string(),
  input: z.string(),
  output: z.string(),
});

export const WorkflowNodeSchema = BaseNodeSchema.extend({
  type: z.literal("workflow"),
  trigger: z.string(),
  schedule: z.string().optional(),
  pipeline_stages: z.array(PipelineStageSchema).min(1),
  state_storage_path: z.string(),
});

export type WorkflowNode = z.infer<typeof WorkflowNodeSchema>;

// ── Benchmark node ────────────────────────────────────────────────────────────

export const BenchmarkNodeSchema = BaseNodeSchema.extend({
  type: z.literal("benchmark"),
  metric: z.string(),
  eval_dataset: z.string(),
  baseline_score: z.string(),
  target_score: z.string(),
  verified_date: z.string(),
  evaluator_script: z.string().optional(),
});

export type BenchmarkNode = z.infer<typeof BenchmarkNodeSchema>;

// ── Open problem node ─────────────────────────────────────────────────────────

export const OpenProblemNodeSchema = BaseNodeSchema.extend({
  type: z.literal("open_problem"),
  difficulty: z.enum(["accessible", "hard", "unsolved"]),
  prize_or_benchmark: z.string().nullable(),
  related_papers: z.array(z.string()),
});

export type OpenProblemNode = z.infer<typeof OpenProblemNodeSchema>;

// ── Contribution task node ────────────────────────────────────────────────────

export const ContributionTaskNodeSchema = BaseNodeSchema.extend({
  type: z.literal("contribution_task"),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  estimated_hours: z.number().nullable(),
  required_skills: z.array(z.string()),
  output_type: z.string(),
});

export type ContributionTaskNode = z.infer<typeof ContributionTaskNodeSchema>;

// ── Generic node ──────────────────────────────────────────────────────────────

export const NodeSchema = z.union([
  DomainNodeSchema,
  SkillNodeSchema,
  PaperNodeSchema,
  BookNodeSchema,
  MCPNodeSchema,
  SwarmPatternNodeSchema,
  WorkflowNodeSchema,
  BenchmarkNodeSchema,
  OpenProblemNodeSchema,
  ContributionTaskNodeSchema,
  BaseNodeSchema,
]);

export type KnowledgeTreeNode = z.infer<typeof NodeSchema>;

// ── Path ──────────────────────────────────────────────────────────────────────

export const PathBranchSchema = z.object({
  condition: z.string(),
  nodes: z.array(z.string()).min(1),
});

export const PathSchema = z.object({
  id: z.string().regex(/^path-[a-z][a-z0-9-]*$/),
  label: z.string().min(2).max(200),
  description: z.string().max(500).optional(),
  domain: z.string().regex(/^domain-[a-z][a-z0-9-]*$/),
  nodes: z.array(z.string()).min(2),
  branches: z.array(PathBranchSchema).optional(),
  status: StatusSchema.optional(),
});

export type Path = z.infer<typeof PathSchema>;

export * from "./fiction-world";
