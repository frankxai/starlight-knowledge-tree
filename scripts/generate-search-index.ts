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
  difficulty?: string;
  href: string;
}

// Every canonical node file feeds the index. A hand-maintained file list
// silently capped the explorer at 166 of 250 nodes; dynamic by construction.
const HREF_BY_TYPE: Record<string, string> = {
  book: "/library",
  paper: "/papers",
  mcp: "/mcp-tools",
  swarm_pattern: "/mcp-tools",
};

const items: SearchItem[] = [];
const seen = new Set<string>();

function pushItem(raw: any) {
  if (!raw || typeof raw !== "object" || !raw.id || seen.has(raw.id)) return;
  seen.add(raw.id);
  items.push({
    id: raw.id,
    type: raw.type === "mcp" ? "mcp_server" : raw.type,
    label: raw.title || raw.label || raw.name || raw.id,
    description: raw.summary || raw.abstract || raw.description || "",
    domain: raw.domain,
    tags: raw.tags,
    difficulty: raw.difficulty,
    href: HREF_BY_TYPE[raw.type] || "/tree",
  });
}

for (const file of fs.readdirSync(path.join(dataDir, "nodes")).filter((f) => f.endsWith(".json")).sort()) {
  const content = JSON.parse(fs.readFileSync(path.join(dataDir, "nodes", file), "utf8"));
  if (Array.isArray(content)) for (const n of content) pushItem(n);
}

for (const file of fs.readdirSync(path.join(dataDir, "domains")).filter((f) => f.endsWith(".json")).sort()) {
  pushItem(JSON.parse(fs.readFileSync(path.join(dataDir, "domains", file), "utf8")));
}

for (const b of JSON.parse(fs.readFileSync(path.join(dataDir, "benchmarks.json"), "utf8"))) {
  pushItem({ ...b, label: b.label || b.name });
}

const outputPath = path.join(webDataDir, "search-index.json");
fs.writeFileSync(outputPath, JSON.stringify(items, null, 2), "utf8");
console.log(`✅ Generated search index with ${items.length} searchable items at ${outputPath}`);
