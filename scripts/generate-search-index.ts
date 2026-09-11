import * as fs from "fs";
import * as path from "path";

const dataDir = path.resolve(__dirname, "../data");
const webDataDir = path.resolve(__dirname, "../apps/web/src/data");

if (!fs.existsSync(webDataDir)) {
  fs.mkdirSync(webDataDir, { recursive: true });
}

interface SearchItem {
  id: string;
  type: string;
  label: string;
  description: string;
  domain?: string;
  tags?: string[];
  href: string;
}

const items: SearchItem[] = [];

// Books
const books = JSON.parse(fs.readFileSync(path.join(dataDir, "nodes/books.json"), "utf8"));
for (const b of books) {
  items.push({
    id: b.id,
    type: "book",
    label: b.title || b.label,
    description: b.summary || b.description,
    domain: b.domain,
    tags: b.tags,
    href: "/library"
  });
}

// Papers
const papers = JSON.parse(fs.readFileSync(path.join(dataDir, "nodes/papers.json"), "utf8"));
for (const p of papers) {
  items.push({
    id: p.id,
    type: "paper",
    label: p.title || p.label,
    description: p.abstract || p.description,
    domain: p.domain,
    tags: p.tags,
    href: "/papers"
  });
}

// MCP
const mcp = JSON.parse(fs.readFileSync(path.join(dataDir, "nodes/mcp.json"), "utf8"));
for (const m of mcp) {
  items.push({
    id: m.id,
    type: "mcp_server",
    label: m.label,
    description: m.description,
    tags: m.tags,
    href: "/mcp-tools"
  });
}

// Swarms
const swarms = JSON.parse(fs.readFileSync(path.join(dataDir, "nodes/swarm-patterns.json"), "utf8"));
for (const s of swarms) {
  items.push({
    id: s.id,
    type: "swarm_pattern",
    label: s.label,
    description: s.description,
    tags: s.tags,
    href: "/mcp-tools"
  });
}

// Concepts
const concepts = JSON.parse(fs.readFileSync(path.join(dataDir, "nodes/concepts.json"), "utf8"));
for (const c of concepts) {
  items.push({
    id: c.id,
    type: "concept",
    label: c.label,
    description: c.description,
    domain: c.domain,
    tags: c.tags,
    href: "/tree"
  });
}

const outputPath = path.join(webDataDir, "search-index.json");
fs.writeFileSync(outputPath, JSON.stringify(items, null, 2), "utf8");
console.log(`✅ Successfully generated search index with ${items.length} searchable items at ${outputPath}`);
