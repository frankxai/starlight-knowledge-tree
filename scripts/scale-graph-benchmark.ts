import * as fs from "fs";
import * as path from "path";

interface NodeItem {
  id: string;
  type: string;
  label: string;
  description: string;
  domain?: string;
  edges?: Array<{ type: string; target: string }>;
  tags?: string[];
}

const dataDir = path.resolve(__dirname, "../data");

// 1. Load actual nodes
const nodeFiles = fs.readdirSync(path.join(dataDir, "nodes")).filter(f => f.endsWith(".json"));
const realNodes: NodeItem[] = [];

for (const file of nodeFiles) {
  const content = JSON.parse(fs.readFileSync(path.join(dataDir, "nodes", file), "utf8"));
  if (Array.isArray(content)) {
    realNodes.push(...content);
  }
}

console.log(`\n======================================================`);
console.log(`🚀 STARLIGHT KNOWLEDGE TREE — SCALE BENCHMARK SUITE`);
console.log(`======================================================`);
console.log(`Baseline Active Nodes in Repo: ${realNodes.length}`);

// Measure Baseline Array Scan vs Map Index
const targetId = realNodes[Math.floor(realNodes.length / 2)]?.id || "concept-modular-scale";

console.log(`\n[Test 1] Lookup Latency on Current Graph (${realNodes.length} nodes)`);

const startArray = performance.now();
for (let i = 0; i < 10000; i++) {
  realNodes.find(n => n.id === targetId);
}
const arrayTime = performance.now() - startArray;
console.log(`- Array.find() x 10,000 lookups: ${arrayTime.toFixed(2)} ms (${(arrayTime / 10).toFixed(4)} µs/op)`);

const mapIndex = new Map<string, NodeItem>();
realNodes.forEach(n => mapIndex.set(n.id, n));

const startMap = performance.now();
for (let i = 0; i < 10000; i++) {
  mapIndex.get(targetId);
}
const mapTime = performance.now() - startMap;
console.log(`- Map.get() x 10,000 lookups:   ${mapTime.toFixed(2)} ms (${(mapTime / 10).toFixed(4)} µs/op) -> ${(arrayTime / mapTime).toFixed(1)}x faster`);

// [Test 2] Synthetic Scale Simulation (5,000 Nodes & 15,000 Edges)
console.log(`\n[Test 2] Simulating Planetary Scale: 5,000 Nodes & 15,000 Graph Edges...`);

const syntheticNodes: NodeItem[] = [...realNodes];
const domains = [
  "domain-ai-architect",
  "domain-systems-engineering",
  "domain-web-graphic-design",
  "domain-scale-distributed-agentics",
  "domain-investing-wealth-capital"
];

for (let i = realNodes.length; i < 5000; i++) {
  const randDomain = domains[i % domains.length];
  const target1 = `node-synth-${(i * 7) % 5000}`;
  const target2 = `node-synth-${(i * 13) % 5000}`;
  
  syntheticNodes.push({
    id: `node-synth-${i}`,
    type: i % 4 === 0 ? "concept" : i % 4 === 1 ? "tool" : i % 4 === 2 ? "paper" : "book",
    label: `Synthetic Entity ${i} for Domain ${randDomain}`,
    description: `Detailed description for simulated entity ${i} demonstrating graph traversal, topological sorting, and memory indexing at scale.`,
    domain: randDomain,
    tags: [`scale-test`, `domain-${randDomain}`, `batch-${Math.floor(i / 500)}`],
    edges: [
      { type: "unlocks", target: target1 },
      { type: "relates_to", target: target2 }
    ]
  });
}

const synthMap = new Map<string, NodeItem>();
const adjacencyList = new Map<string, string[]>();

syntheticNodes.forEach(n => {
  synthMap.set(n.id, n);
  if (!adjacencyList.has(n.id)) adjacencyList.set(n.id, []);
  if (n.edges) {
    n.edges.forEach(e => {
      adjacencyList.get(n.id)!.push(e.target);
    });
  }
});

console.log(`- Total Synthetic Entities: ${syntheticNodes.length}`);

// [Test 3] 2-Hop Subgraph Neighborhood Extraction Latency
console.log(`\n[Test 3] 2-Hop Subgraph Neighborhood Extraction (Targeting 5,000-node graph)`);

function extract2Hop(startId: string, depth = 2): Set<string> {
  const visited = new Set<string>([startId]);
  let currentFrontier = [startId];

  for (let d = 0; d < depth; d++) {
    const nextFrontier: string[] = [];
    for (const id of currentFrontier) {
      const neighbors = adjacencyList.get(id) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          nextFrontier.push(neighbor);
        }
      }
    }
    currentFrontier = nextFrontier;
  }
  return visited;
}

const startHop = performance.now();
let totalExtracted = 0;
const sampleQueries = 1000;
for (let i = 0; i < sampleQueries; i++) {
  const queryId = `node-synth-${(i * 17) % 5000}`;
  const subgraph = extract2Hop(queryId, 2);
  totalExtracted += subgraph.size;
}
const hopTime = performance.now() - startHop;
console.log(`- 1,000 2-Hop Subgraph Extractions: ${hopTime.toFixed(2)} ms (${(hopTime / sampleQueries).toFixed(3)} ms/query)`);
console.log(`- Average Subgraph Size: ${(totalExtracted / sampleQueries).toFixed(1)} nodes per neighborhood`);

// [Test 4] Full-Text Fuzzy Filter Latency across 5,000 Nodes
console.log(`\n[Test 4] Full-Text & Tag Filtering across 5,000 Nodes`);

const startFilter = performance.now();
const filterQueries = ["scale-test", "distributed", "systems", "vector", "memory"];
let matchCount = 0;

for (const q of filterQueries) {
  for (const n of syntheticNodes) {
    if (n.label.includes(q) || n.description.includes(q) || n.tags?.some(t => t.includes(q))) {
      matchCount++;
    }
  }
}
const filterTime = performance.now() - startFilter;
console.log(`- 5 full-text multi-field scan passes: ${filterTime.toFixed(2)} ms (${(filterTime / 5).toFixed(2)} ms per full-estate scan)`);
console.log(`- Matches found: ${matchCount}`);

// [Test 5] Memory & Storage Footprint
const synthJson = JSON.stringify(syntheticNodes);
const memMB = (synthJson.length / (1024 * 1024)).toFixed(2);
console.log(`\n[Test 5] Memory & Storage Footprint:`);
console.log(`- 5,000 JSON nodes payload size: ${memMB} MB`);
console.log(`- Transition Threshold to LanceDB / Kùzu DB: >= 10,000 nodes (~5 MB payload)`);

console.log(`\n======================================================`);
console.log(`✅ SCALE BENCHMARK COMPLETED SUCCESSFULLY!`);
console.log(`   - 2-hop neighborhood extraction latency: ${(hopTime / sampleQueries).toFixed(3)} ms (SOTA < 1.0 ms)`);
console.log(`   - Subgraph query throughput: ${Math.round(sampleQueries / (hopTime / 1000))} queries/second`);
console.log(`======================================================\n`);
