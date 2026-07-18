import { KnowledgeTreeNode, NodeSchema, EdgeSchema } from "@starlight/graph-schema";
import * as fs from "fs";
import * as path from "path";

// ── Load all nodes ────────────────────────────────────────────────────────────

const NODE_FILES = [
  "concepts.json",
  "skills.json",
  "tools.json",
  "papers.json",
  "experiments.json",
  "artifacts.json",
  "open-problems.json",
  "contribution-tasks.json",
];

const DOMAIN_FILES = [
  "ai-architect.json",
  "space-builder.json",
  "bio-human-intelligence.json",
  "creator-founder.json",
];

export function loadAllNodes(dataDir: string): KnowledgeTreeNode[] {
  const nodes: KnowledgeTreeNode[] = [];

  for (const file of NODE_FILES) {
    const filePath = path.join(dataDir, "nodes", file);
    if (!fs.existsSync(filePath)) continue;
    const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (Array.isArray(raw)) {
      nodes.push(...raw);
    }
  }

  for (const file of DOMAIN_FILES) {
    const filePath = path.join(dataDir, "domains", file);
    if (!fs.existsSync(filePath)) continue;
    const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
    nodes.push(raw);
  }

  return nodes;
}

// ── Validation ────────────────────────────────────────────────────────────────

export interface ValidationError {
  nodeId: string;
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  nodeCount: number;
  edgeCount: number;
}

export function validateGraph(dataDir: string): ValidationResult {
  const nodes = loadAllNodes(dataDir);
  const nodeIds = new Set(nodes.map((n) => n.id));
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  let edgeCount = 0;

  for (const node of nodes) {
    // Schema validation
    const result = NodeSchema.safeParse(node);
    if (!result.success) {
      for (const issue of result.error.issues) {
        errors.push({
          nodeId: node.id ?? "unknown",
          field: issue.path.join("."),
          message: issue.message,
        });
      }
    }

    // Edge target resolution
    for (const edge of node.edges ?? []) {
      edgeCount++;
      if (!nodeIds.has(edge.target)) {
        warnings.push({
          nodeId: node.id,
          field: `edges[target=${edge.target}]`,
          message: `Edge target '${edge.target}' does not resolve to a known node ID`,
        });
      }
    }
  }

  // Detect duplicate IDs
  const seen = new Map<string, number>();
  for (const node of nodes) {
    seen.set(node.id, (seen.get(node.id) ?? 0) + 1);
  }
  for (const [id, count] of seen.entries()) {
    if (count > 1) {
      errors.push({
        nodeId: id,
        field: "id",
        message: `Duplicate node ID: '${id}' appears ${count} times`,
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    nodeCount: nodes.length,
    edgeCount,
  };
}

// ── Graph traversal ────────────────────────────────────────────────────────────

export function buildNodeIndex(nodes: KnowledgeTreeNode[]): Map<string, KnowledgeTreeNode> {
  return new Map(nodes.map((n) => [n.id, n]));
}

export function getPrerequisites(
  nodeId: string,
  index: Map<string, KnowledgeTreeNode>
): string[] {
  const node = index.get(nodeId);
  if (!node) return [];
  return node.edges
    .filter((e) => e.type === "requires")
    .map((e) => e.target);
}

export function getUnlocks(
  nodeId: string,
  index: Map<string, KnowledgeTreeNode>
): string[] {
  const node = index.get(nodeId);
  if (!node) return [];
  return node.edges
    .filter((e) => e.type === "unlocks")
    .map((e) => e.target);
}

export function getNodesByDomain(
  domain: string,
  nodes: KnowledgeTreeNode[]
): KnowledgeTreeNode[] {
  return nodes.filter((node) =>
    "domain" in node ? node.domain === domain : node.type === "domain" && node.id === domain
  );
}

export function getNodesByType(
  type: string,
  nodes: KnowledgeTreeNode[]
): KnowledgeTreeNode[] {
  return nodes.filter((n) => n.type === type);
}

export * from "./fiction-world";
