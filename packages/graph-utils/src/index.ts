import { KnowledgeTreeNode, NodeSchema, EdgeSchema } from "@starlight/graph-schema";
import * as fs from "fs";
import * as path from "path";

// ── Load all nodes dynamically ────────────────────────────────────────────────

export function loadAllNodes(dataDir: string): KnowledgeTreeNode[] {
  const nodes: KnowledgeTreeNode[] = [];

  // Load from data/nodes/
  const nodesDir = path.join(dataDir, "nodes");
  if (fs.existsSync(nodesDir)) {
    const files = fs.readdirSync(nodesDir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const filePath = path.join(nodesDir, file);
      try {
        const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
        if (Array.isArray(raw)) {
          nodes.push(...raw);
        } else if (raw && typeof raw === "object") {
          nodes.push(raw);
        }
      } catch (err) {
        console.error(`Error parsing node file: ${filePath}`, err);
      }
    }
  }

  // Load from data/domains/
  const domainsDir = path.join(dataDir, "domains");
  if (fs.existsSync(domainsDir)) {
    const files = fs.readdirSync(domainsDir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const filePath = path.join(domainsDir, file);
      try {
        const raw = JSON.parse(fs.readFileSync(filePath, "utf8"));
        if (raw && typeof raw === "object") {
          nodes.push(raw);
        }
      } catch (err) {
        console.error(`Error parsing domain file: ${filePath}`, err);
      }
    }
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

// ── Graph traversal & Query Helpers ───────────────────────────────────────────

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

export function searchGraph(
  query: string,
  nodes: KnowledgeTreeNode[]
): KnowledgeTreeNode[] {
  const q = query.toLowerCase();
  return nodes.filter(
    (n) =>
      n.label.toLowerCase().includes(q) ||
      n.description.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export * from "./fiction-world";
