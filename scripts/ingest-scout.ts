import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

interface CandidateNode {
  id: string;
  type: string;
  label: string;
  description: string;
  domain?: string;
  source?: string;
  authors?: string[];
  year?: number;
  tags?: string[];
  edges?: Array<{
    type: string;
    target: string;
  }>;
  [key: string]: any;
}

interface ScoutInbox {
  timestamp: string;
  staged_count: number;
  candidates: CandidateNode[];
}

const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const inboxPath = path.join(dataDir, "staged/scout-inbox.json");
const historyPath = path.join(dataDir, "staged/ingested-history.json");

function wordJaccard(s1?: string, s2?: string): number {
  if (!s1 || !s2) return 0.0;
  const w1 = new Set(s1.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean));
  const w2 = new Set(s2.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean));
  if (w1.size === 0 && w2.size === 0) return 1.0;
  if (w1.size === 0 || w2.size === 0) return 0.0;
  let intersection = 0;
  for (const item of w1) {
    if (w2.has(item)) intersection++;
  }
  return intersection / (w1.size + w2.size - intersection);
}

function loadAllExistingNodes(): Map<string, { id: string; label: string; file: string }> {
  const nodeMap = new Map<string, { id: string; label: string; file: string }>();
  
  const files = [
    "nodes/concepts.json",
    "nodes/papers.json",
    "nodes/tools.json",
    "nodes/books.json",
    "nodes/mcp.json",
    "nodes/swarm-patterns.json",
    "nodes/workflows.json",
    "nodes/open-problems.json",
    "benchmarks.json",
  ];

  for (const rel of files) {
    const p = path.join(dataDir, rel);
    if (!fs.existsSync(p)) continue;
    try {
      const list = JSON.parse(fs.readFileSync(p, "utf8"));
      if (Array.isArray(list)) {
        for (const item of list) {
          const lbl = item.label || item.title || item.id;
          nodeMap.set(item.id, { id: item.id, label: lbl, file: rel });
        }
      }
    } catch (e) {
      console.error(`Error reading ${p}:`, e);
    }
  }
  return nodeMap;
}

function getDestinationFile(type: string): string {
  switch (type) {
    case "paper":
      return "nodes/papers.json";
    case "tool":
      return "nodes/tools.json";
    case "concept":
      return "nodes/concepts.json";
    case "swarm_pattern":
      return "nodes/swarm-patterns.json";
    case "mcp_server":
      return "nodes/mcp.json";
    case "benchmark":
      return "benchmarks.json";
    case "book":
      return "nodes/books.json";
    default:
      return "nodes/concepts.json";
  }
}

export function runIngest() {
  console.log("=== Starlight Knowledge Tree: Scout Ingestion Gate ===");
  if (!fs.existsSync(inboxPath)) {
    console.log("No scout inbox found at:", inboxPath);
    return;
  }

  const inbox: ScoutInbox = JSON.parse(fs.readFileSync(inboxPath, "utf8"));
  if (!inbox.candidates || inbox.candidates.length === 0) {
    console.log("Inbox is empty. No candidates to ingest.");
    return;
  }

  console.log(`Found ${inbox.candidates.length} candidate(s) in inbox.`);
  const existingNodes = loadAllExistingNodes();

  const accepted: CandidateNode[] = [];
  const rejected: Array<{ candidate: CandidateNode; reason: string }> = [];

  for (const c of inbox.candidates) {
    // 1. Check ID collision
    if (existingNodes.has(c.id)) {
      rejected.push({ candidate: c, reason: `Exact ID collision with ${c.id}` });
      continue;
    }

    // 2. Check label Jaccard similarity
    let isDupe = false;
    for (const [_, existing] of existingNodes) {
      const sim = wordJaccard(c.label, existing.label);
      if (sim > 0.88) {
        rejected.push({
          candidate: c,
          reason: `High label similarity (${(sim * 100).toFixed(1)}%) with existing node '${existing.id}'`,
        });
        isDupe = true;
        break;
      }
    }
    if (isDupe) continue;

    // 3. Schema validation & normalization
    if (!c.id || !c.label || !c.description || !c.type) {
      rejected.push({ candidate: c, reason: "Missing required fields (id, label, description, type)" });
      continue;
    }

    c.status = c.status || "stable";
    c.created_at = c.created_at || new Date().toISOString();
    c.updated_at = c.updated_at || new Date().toISOString();
    c.edges = c.edges || [];
    if (!c.url) {
      c.url = c.source && c.source.startsWith("http") ? c.source : "https://starlightintelligence.ai";
    }

    accepted.push(c);
  }

  console.log(`\nReview Results: ${accepted.length} accepted, ${rejected.length} rejected.`);
  for (const r of rejected) {
    console.log(`❌ Rejected '${r.candidate.label}': ${r.reason}`);
  }

  if (accepted.length === 0) {
    console.log("No new candidates accepted.");
    return;
  }

  // Group accepted by target file
  const fileGroups = new Map<string, CandidateNode[]>();
  for (const c of accepted) {
    const targetRel = getDestinationFile(c.type);
    if (!fileGroups.has(targetRel)) {
      fileGroups.set(targetRel, []);
    }
    fileGroups.get(targetRel)!.push(c);
  }

  for (const [targetRel, candidates] of fileGroups) {
    const fullPath = path.join(dataDir, targetRel);
    let list: any[] = [];
    if (fs.existsSync(fullPath)) {
      list = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    }
    list.push(...candidates);
    fs.writeFileSync(fullPath, JSON.stringify(list, null, 2), "utf8");
    console.log(`✅ Appended ${candidates.length} node(s) to ${targetRel}`);
  }

  // Record history
  let history: any[] = [];
  if (fs.existsSync(historyPath)) {
    try {
      history = JSON.parse(fs.readFileSync(historyPath, "utf8"));
    } catch {
      history = [];
    }
  }
  history.push({
    ingested_at: new Date().toISOString(),
    count: accepted.length,
    accepted: accepted.map((a) => ({ id: a.id, label: a.label, type: a.type })),
    rejected: rejected.map((r) => ({ id: r.candidate.id, label: r.candidate.label, reason: r.reason })),
  });
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), "utf8");

  // Clear processed candidates from inbox
  inbox.candidates = [];
  inbox.staged_count = 0;
  inbox.timestamp = new Date().toISOString();
  fs.writeFileSync(inboxPath, JSON.stringify(inbox, null, 2), "utf8");
  console.log("Cleared scout inbox.");

  // Regenerate distribution artifacts
  console.log("\nRegenerating search index & community distribution bundle...");
  try {
    execSync("npx tsx scripts/generate-search-index.ts", { cwd: rootDir, stdio: "inherit" });
    execSync("npx tsx scripts/export-community-distribution.ts", { cwd: rootDir, stdio: "inherit" });
    console.log("🎉 Ingestion & distribution sync complete!");
  } catch (err) {
    console.error("Warning: Error regenerating distribution artifacts:", err);
  }
}

if (require.main === module) {
  runIngest();
}
