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
  "dataset",
  "experiment",
  "artifact",
  "credential",
  "open_problem",
  "contribution_task",
]);

export type NodeType = z.infer<typeof NodeTypeSchema>;

// ── Status ────────────────────────────────────────────────────────────────────

export const StatusSchema = z.enum(["seed", "draft", "stable", "deprecated"]);
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

// ── Base node ─────────────────────────────────────────────────────────────────

const BaseNodeSchema = z.object({
  id: z.string().regex(/^[a-z][a-z0-9-]*$/),
  type: NodeTypeSchema,
  label: z.string().min(2).max(200),
  description: z.string().min(10).max(1000),
  domain: z.string().regex(/^domain-[a-z][a-z0-9-]*$/),
  tags: z.array(z.string()).min(1).max(20),
  status: StatusSchema,
  edges: z.array(EdgeSchema),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

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
});

export type PaperNode = z.infer<typeof PaperNodeSchema>;

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
  SkillNodeSchema,
  PaperNodeSchema,
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
