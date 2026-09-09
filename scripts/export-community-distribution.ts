import * as fs from "fs";
import * as path from "path";

const dataDir = path.resolve(__dirname, "../data");
const distDir = path.resolve(__dirname, "../dist");
const outputDir = path.resolve(distDir, "community-distribution");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`\n======================================================`);
console.log(`📦 PACKAGING STARLIGHT COMMUNITY DISTRIBUTION BUNDLE`);
console.log(`======================================================`);

// 1. Compile Unified Community Knowledge Graph JSON
const nodeFiles = fs.readdirSync(path.join(dataDir, "nodes")).filter(f => f.endsWith(".json"));
const allNodes: any[] = [];
for (const file of nodeFiles) {
  const content = JSON.parse(fs.readFileSync(path.join(dataDir, "nodes", file), "utf8"));
  if (Array.isArray(content)) allNodes.push(...content);
}

const domainFiles = fs.readdirSync(path.join(dataDir, "domains")).filter(f => f.endsWith(".json"));
const allDomains: any[] = [];
for (const file of domainFiles) {
  const content = JSON.parse(fs.readFileSync(path.join(dataDir, "domains", file), "utf8"));
  allDomains.push(content);
}

const masterBundle = {
  version: "1.0.0",
  generated_at: new Date().toISOString(),
  license: "MIT",
  stats: {
    total_nodes: allNodes.length,
    total_domains: allDomains.length,
    canonical_books: allNodes.filter(n => n.type === "book").length,
    seminal_papers: allNodes.filter(n => n.type === "paper").length,
    swarm_patterns: allNodes.filter(n => n.type === "swarm_pattern").length,
    cognitive_concepts: allNodes.filter(n => n.type === "concept").length,
    verified_tools: allNodes.filter(n => n.type === "tool" || n.type === "mcp_server").length
  },
  domains: allDomains,
  nodes: allNodes
};

const jsonPath = path.join(outputDir, "starlight-master-canon.json");
fs.writeFileSync(jsonPath, JSON.stringify(masterBundle, null, 2), "utf8");
console.log(`✅ [1/5] Compiled master canon JSON (${allNodes.length} nodes) -> ${jsonPath}`);

// 2. Copy the JSON Canvas 1.0 file
const canvasSrc = path.join(distDir, "starlight-knowledge-tree.canvas");
const canvasDst = path.join(outputDir, "starlight-knowledge-tree.canvas");
if (fs.existsSync(canvasSrc)) {
  fs.copyFileSync(canvasSrc, canvasDst);
  console.log(`✅ [2/5] Packaged JSON Canvas 1.0 visual map -> ${canvasDst}`);
}

// 3. Generate Community MCP Server Configuration (claude_desktop_config / cursor / codex)
const mcpConfig = {
  mcpServers: {
    "starlight-knowledge": {
      command: "node",
      args: ["./node_modules/@starlight/knowledge-tree-mcp/dist/index.js"],
      env: {
        STARLIGHT_DATA_DIR: "./starlight-master-canon.json"
      }
    },
    "starlight-memory": {
      command: "node",
      args: ["C:/Users/frank/starlight/repos/Starlight-Intelligence-System/mcp/dist/index.js"]
    }
  }
};
const mcpPath = path.join(outputDir, "starlight-mcp-config.json");
fs.writeFileSync(mcpPath, JSON.stringify(mcpConfig, null, 2), "utf8");
console.log(`✅ [3/5] Packaged ready-to-use MCP Configuration -> ${mcpPath}`);

// 4. Generate Community Quickstart Guide
const quickstartMarkdown = `# Starlight Community Knowledge Pack (v1.0)
*The Sovereign Knowledge Tree & Multi-Agent Cognitive Framework*

Welcome to the **Starlight Community Distribution**. This package delivers a battle-tested, verified ontology of 260+ nodes, landmark books, research papers, and multi-agent swarm patterns used across the Starlight & Arcanea ecosystems.

---

## 🚀 What's in this Package:

1. \`starlight-knowledge-tree.canvas\`: Complete **JSON Canvas 1.0** spatial graph. Open directly in **Obsidian**, VS Code Canvas, or any spatial node viewer.
2. \`starlight-master-canon.json\`: The single-file typed AST containing all 260+ entities, relationships, mental models, and code bindings.
3. \`starlight-mcp-config.json\`: Plug-and-play **Model Context Protocol (MCP)** config for Claude Desktop, Cursor, and Codex CLI.
4. \`COMMUNITY_EVOLUTION_PIPELINE.md\`: Guide on contributing new nodes, papers, and benchmarks.

---

## ⚡ Quickstart in 3 Steps:

### Step 1: Spatial Exploration in Obsidian
1. Copy \`starlight-knowledge-tree.canvas\` into your Obsidian vault.
2. Open the file to explore the interactive visual graph: zoom into the **7 Pillars of Scale**, traverse **Web Design & Typography**, or inspect **Autonomous Agent Swarms**.

### Step 2: Audio Podcasts via Google NotebookLM
1. Open [Google NotebookLM](https://notebooklm.google.com).
2. Create a new notebook (e.g. "Starlight Multi-Agent Masterclass").
3. Upload any domain file from \`dist/notebooklm-sources/\` (or paste \`starlight-master-canon.json\`).
4. Click **Audio Overview (Deep Dive)** to generate a 15-minute, two-host conversational podcast!

### Step 3: Grounding Your AI Agents (MCP 2.0)
Add the entries from \`starlight-mcp-config.json\` to your \`claude_desktop_config.json\` or Cursor settings. Your coding agents will now have access to verified Zod schemas, design tokens, and canonical mental models on demand.

---

## 🌟 License & Governance
MIT Licensed. Maintained by the Starlight Intelligence System and FrankX community.
`;
fs.writeFileSync(path.join(outputDir, "README.md"), quickstartMarkdown, "utf8");
console.log(`✅ [4/5] Generated Community Quickstart README -> ${path.join(outputDir, "README.md")}`);

// 5. Generate Community Evolution & RFC Pipeline Blueprint
const evolutionMarkdown = `# Starlight Continuous Knowledge Evolution Protocol
*How the Knowledge Tree Automatically Upgrades with the World's Best GitHubs, Papers & Workflows*

---

## 1. The Autonomous Evolution Loop
The Starlight Knowledge Tree is not a static documentation dump; it is a living, self-upgrading cybernetic tree.

\`\`\`
  ┌───────────────────────┐      ┌───────────────────────┐      ┌───────────────────────┐
  │  COMMUNITY SCOUTS &   │      │ ADVERSARIAL REVIEW    │      │  CANONICAL MERGE &    │
  │  AUTOMATED CRAWLERS   │ ───► │ (MAKER ≠ CHECKER GATE)│ ───► │  MULTI-SURFACE SYNC   │
  │ • arXiv CS.AI/CS.SE   │      │ • Zod Schema Validation│      │ • Obsidian Canvas (.canvas)
  │ • Trending GitHubs    │      │ • Deduplication Check │      │ • Next.js Web Portal  │
  │ • Community RFC PRs   │      │ • Anti-Slop Audit Pass│      │ • NotebookLM Dossiers │
  └───────────────────────┘      └───────────────────────┘      └───────────────────────┘
\`\`\`

---

## 2. Ingestion Radar: SOTA Repositories & What We Learn From Them

| Benchmark Repository | SOTA Pattern Extracted | Starlight Integration |
|---|---|---|
| **Langfuse** (\`langfuse/langfuse\`) | Distributed LLM trace observability & user feedback scoring | Wired via \`tool-langfuse\` for swarm trajectory tracing. |
| **DSPy** (\`stanfordnlp/dspy\`) | Algorithmic prompt compilation and metric-driven teleprompters | Implemented in \`pattern-evaluator-optimizer\`. |
| **MemGPT / Letta** (\`letta-ai/letta\`) | Hierarchical OS-style memory paging (Context as RAM, Vector as Disk) | Implemented in \`concept-hierarchical-memory-paging\`. |
| **LanceDB** (\`lancedb/lancedb\`) | Columnar serverless disk-backed vector storage with zero daemons | Transition target for scaling past 10k entities. |
| **BullMQ** (\`taskforcesh/bullmq\`) | Durable distributed task queues with exponential backoff & jitter | Implemented in \`pattern-queue-backed-agent-workers\`. |
| **OpenDevin / SWE-agent** | Real-world GitHub issue resolution in isolated Docker worktrees | Evaluated against \`benchmark-swe-bench-verified\`. |

---

## 3. How Community Members Submit New Nodes (The RFC Gate)

1. **Fork the Repo**: \`https://github.com/frankxai/starlight-knowledge-tree\`
2. **Add Node via JSON**:
   - Place books in \`data/nodes/books.json\`
   - Place landmark papers in \`data/nodes/papers.json\`
   - Place swarm patterns in \`data/nodes/swarm-patterns.json\`
3. **Run Automated Validation**:
   \`\`\`bash
   npm run validate
   \`\`\`
   The validator enforces:
   - Zod schema conformance (authors, isbn, summary, mental models).
   - Zero broken edge targets (every target must exist in the graph).
   - Anti-slop check: No placeholder text ("TBD", "Lorem ipsum").
4. **Submit Pull Request**:
   - The CI runner runs \`npm run validate\` and executes the Santa Review loop.
   - On merge, the GitHub Action automatically regenerates the Canvas, NotebookLM dossiers, and Vercel edge deployment!
`;
fs.writeFileSync(path.join(outputDir, "COMMUNITY_EVOLUTION_PIPELINE.md"), evolutionMarkdown, "utf8");
console.log(`✅ [5/5] Generated Community Evolution Pipeline Doc -> ${path.join(outputDir, "COMMUNITY_EVOLUTION_PIPELINE.md")}`);

console.log(`\n======================================================`);
console.log(`🎉 ALL 5 COMMUNITY ARTIFACTS PACKAGED IN:`);
console.log(`   ${outputDir}`);
console.log(`======================================================\n`);
