import * as fs from "fs";
import * as path from "path";

interface GraphNode {
  id: string;
  type: string;
  label: string;
  description: string;
  domain?: string;
  edges?: Array<{ type: string; target: string }>;
  [key: string]: any;
}

const dataDir = path.resolve(__dirname, "../data");
const outputDir = path.resolve(__dirname, "../dist");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Load all node files
const nodeFiles = fs.readdirSync(path.join(dataDir, "nodes")).filter(f => f.endsWith(".json"));
const allNodes: GraphNode[] = [];

for (const file of nodeFiles) {
  const content = JSON.parse(fs.readFileSync(path.join(dataDir, "nodes", file), "utf8"));
  if (Array.isArray(content)) {
    allNodes.push(...content);
  }
}

// Load domains
const domainFiles = fs.readdirSync(path.join(dataDir, "domains")).filter(f => f.endsWith(".json"));
const domains: GraphNode[] = [];

for (const file of domainFiles) {
  const content = JSON.parse(fs.readFileSync(path.join(dataDir, "domains", file), "utf8"));
  domains.push(content);
}

// Group nodes by domain
const domainGroups: { [domainId: string]: GraphNode[] } = {};
for (const d of domains) {
  domainGroups[d.id] = [];
}
domainGroups["general"] = [];

for (const node of allNodes) {
  const d = node.domain || "general";
  if (!domainGroups[d]) {
    domainGroups[d] = [];
  }
  domainGroups[d].push(node);
}

// Layout parameters
const canvasNodes: any[] = [];
const canvasEdges: any[] = [];

const colorMap: { [key: string]: string } = {
  "domain": "1", // Red
  "book": "2",   // Orange
  "paper": "3",  // Yellow
  "concept": "4",// Green
  "tool": "5",   // Cyan
  "mcp_server": "6", // Purple
  "swarm_pattern": "6"
};

let groupX = 0;
const GROUP_WIDTH = 1200;
const CARD_WIDTH = 340;
const CARD_HEIGHT = 160;
const PADDING = 40;

// Generate Visual Layout
for (const d of domains) {
  const nodesInDomain = domainGroups[d.id] || [];
  const cols = 3;
  const rows = Math.ceil(nodesInDomain.length / cols);
  const groupHeight = Math.max(600, rows * (CARD_HEIGHT + PADDING) + 200);

  // Add Domain Group Frame
  canvasNodes.push({
    id: `group-${d.id}`,
    type: "group",
    x: groupX,
    y: 0,
    width: GROUP_WIDTH,
    height: groupHeight,
    label: d.label,
    color: "1"
  });

  // Add Domain Header Card
  canvasNodes.push({
    id: d.id,
    type: "text",
    x: groupX + PADDING,
    y: PADDING,
    width: GROUP_WIDTH - (PADDING * 2),
    height: 120,
    text: `## 🌌 ${d.label}\n${d.description}`,
    color: "1"
  });

  // Add Child Node Cards inside the Group
  nodesInDomain.forEach((node, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    const x = groupX + PADDING + (col * (CARD_WIDTH + PADDING));
    const y = 200 + (row * (CARD_HEIGHT + PADDING));

    let markdown = `### ${node.type.toUpperCase()}: ${node.label}\n${node.description.slice(0, 180)}...`;
    if (node.authors) {
      markdown = `### 📚 ${node.label}\n**Authors:** ${node.authors.join(", ")} (${node.year || ''})\n\n${node.summary || node.description}`;
    } else if (node.arxiv_id) {
      markdown = `### 📄 ${node.label}\n**Venue:** ${node.arxiv_id}\n\n${node.abstract || node.description}`;
    }

    canvasNodes.push({
      id: node.id,
      type: "text",
      x,
      y,
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      text: markdown,
      color: colorMap[node.type] || "4"
    });

    // Edges
    if (Array.isArray(node.edges)) {
      for (const edge of node.edges) {
        canvasEdges.push({
          id: `edge-${node.id}-${edge.target}-${edge.type}`,
          fromNode: node.id,
          toNode: edge.target,
          fromSide: "right",
          toSide: "left",
          label: edge.type
        });
      }
    }
  });

  groupX += GROUP_WIDTH + 200;
}

const canvasPayload = {
  nodes: canvasNodes,
  edges: canvasEdges
};

const outputPath = path.join(outputDir, "starlight-knowledge-tree.canvas");
fs.writeFileSync(outputPath, JSON.stringify(canvasPayload, null, 2), "utf8");
console.log(`✅ Successfully generated JSON Canvas with ${canvasNodes.length} nodes and ${canvasEdges.length} edges!`);
console.log(`   Saved to: ${outputPath}`);

// Copy to second-brain-vault if available
const vaultCanvasDir = path.resolve("C:/Users/frank/starlight/repos/second-brain-vault/Canvases");
if (fs.existsSync(vaultCanvasDir)) {
  fs.writeFileSync(path.join(vaultCanvasDir, "starlight-knowledge-tree.canvas"), JSON.stringify(canvasPayload, null, 2), "utf8");
  console.log(`✅ Mirrored canvas to Obsidian Second Brain: ${path.join(vaultCanvasDir, "starlight-knowledge-tree.canvas")}`);
}
