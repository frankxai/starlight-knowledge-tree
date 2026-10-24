import * as fs from "fs";
import * as path from "path";

interface CandidateEntity {
  id: string;
  type: "book" | "paper" | "swarm_pattern" | "concept" | "tool";
  label: string;
  description: string;
  domain: string;
  source: string;
  tags?: string[];
  edges?: Array<{ type: string; target: string }>;
  [key: string]: any;
}

const dataDir = path.resolve(__dirname, "../data");
const stagedDir = path.resolve(dataDir, "staged");

if (!fs.existsSync(stagedDir)) {
  fs.mkdirSync(stagedDir, { recursive: true });
}

console.log(`\n======================================================`);
console.log(`📡 STARLIGHT INTELLIGENCE SCOUT & INGESTION RADAR`);
console.log(`======================================================`);

// 1. Load existing node IDs and labels for deduplication
const existingNodes: Array<{ id: string; label: string; type: string }> = [];
const nodeFiles = fs.readdirSync(path.join(dataDir, "nodes")).filter(f => f.endsWith(".json"));

for (const file of nodeFiles) {
  const content = JSON.parse(fs.readFileSync(path.join(dataDir, "nodes", file), "utf8"));
  if (Array.isArray(content)) {
    content.forEach((n: any) => {
      existingNodes.push({ id: n.id, label: n.label.toLowerCase(), type: n.type });
    });
  }
}

console.log(`Active Knowledge Index: ${existingNodes.length} nodes loaded for deduplication matching.`);

// Word-level Jaccard token similarity metric
function computeSimilarity(s1: string, s2: string): number {
  const words1 = new Set(s1.toLowerCase().split(/\W+/).filter(w => w.length > 2));
  const words2 = new Set(s2.toLowerCase().split(/\W+/).filter(w => w.length > 2));
  if (words1.size === 0 || words2.size === 0) return 0;
  let intersection = 0;
  for (const w of words1) {
    if (words2.has(w)) intersection++;
  }
  const union = new Set([...words1, ...words2]).size;
  return intersection / union;
}

// 2. Simulated / Incoming Scout Candidates (from arXiv, GitHub Trending, Community Submissions)
const scoutCandidates: CandidateEntity[] = [
  {
    id: "paper-tree-of-thoughts",
    type: "paper",
    label: "Tree of Thoughts: Deliberate Problem Solving with Large Language Models",
    description: "Yao et al. paradigm enabling language models to explore multiple reasoning paths, self-evaluate intermediate choices, and perform lookahead or backtracking when problem solving.",
    domain: "domain-ai-architect",
    source: "arXiv:2305.10601",
    authors: ["Shunyu Yao", "Dian Yu", "Jeffrey Zhao", "Izhak Shafran", "Thomas L. Griffiths", "Yuan Cao", "Karthik Narasimhan"],
    year: 2023,
    tags: ["tree-of-thoughts", "deliberate-reasoning", "search-algorithms", "lookahead"],
    edges: [{ type: "unlocks", target: "pattern-evaluator-optimizer" }]
  },
  {
    id: "tool-litellm-proxy",
    type: "tool",
    label: "LiteLLM Proxy & Universal Gateway",
    description: "High-throughput proxy server allowing 100+ LLMs in OpenAI-compatible format with built-in load balancing, fallbacks, spend tracking, and rate-limit sharding.",
    domain: "domain-scale-distributed-agentics",
    source: "https://github.com/BerriAI/litellm",
    tags: ["litellm", "proxy", "load-balancing", "gateway", "cost-tracking"],
    edges: [{ type: "applies_to", target: "pattern-semantic-model-router" }]
  },
  {
    id: "concept-prefix-kv-cache-residence",
    type: "concept",
    label: "KV-Cache Prefix Alignment & Context Compaction", // Duplicate test intentionally
    description: "Testing deduplication filter against existing concept in tree.",
    domain: "domain-scale-distributed-agentics",
    source: "Test Duplicate Filter"
  }
];

// 3. Deduplication & Staging Evaluation
console.log(`\nEvaluating ${scoutCandidates.length} candidate discoveries...`);

const approvedForStaging: CandidateEntity[] = [];
const rejectedDuplicates: Array<{ candidate: string; matchedWith: string; similarity: number }> = [];

for (const candidate of scoutCandidates) {
  const normLabel = candidate.label.toLowerCase();
  
  // Exact ID match check
  const idMatch = existingNodes.find(n => n.id === candidate.id);
  if (idMatch) {
    rejectedDuplicates.push({ candidate: candidate.label, matchedWith: idMatch.id, similarity: 1.0 });
    continue;
  }

  // Similarity match check
  let highestSim = 0;
  let bestMatch: any = null;

  for (const existing of existingNodes) {
    const sim = computeSimilarity(normLabel, existing.label);
    if (sim > highestSim) {
      highestSim = sim;
      bestMatch = existing;
    }
  }

  if (highestSim >= 0.88) {
    rejectedDuplicates.push({ candidate: candidate.label, matchedWith: bestMatch.id, similarity: highestSim });
  } else {
    approvedForStaging.push(candidate);
  }
}

// 4. Output Results
console.log(`\n[Deduplication Audit Results]:`);
console.log(`- Approved Net-New Candidates: ${approvedForStaging.length}`);
console.log(`- Rejected Duplicate Proposals: ${rejectedDuplicates.length}`);

rejectedDuplicates.forEach(r => {
  console.log(`  ❌ Rejected: "${r.candidate}" (matches existing "${r.matchedWith}" with ${(r.similarity * 100).toFixed(1)}% similarity)`);
});

approvedForStaging.forEach(a => {
  console.log(`  ✅ Staged: [${a.type.toUpperCase()}] "${a.label}" from ${a.source}`);
});

// Write approved candidates to staging receipt
const stagingReceipt = {
  timestamp: new Date().toISOString(),
  staged_count: approvedForStaging.length,
  candidates: approvedForStaging
};

const receiptPath = path.join(stagedDir, "scout-inbox.json");
fs.writeFileSync(receiptPath, JSON.stringify(stagingReceipt, null, 2), "utf8");
console.log(`\nStaging inbox saved -> ${receiptPath}`);
console.log(`Ready for adversarial review before canonical graph merge.\n`);
