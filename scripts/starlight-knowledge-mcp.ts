import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

// Starlight Knowledge Tree MCP 2.0 Server
// Zero-daemon, in-memory AST provider over JSON-RPC 2.0 stdio

// STARLIGHT_DATA_DIR may point at a data/ directory or at a single
// starlight-master-canon.json bundle file (community distribution).
const dataDir = process.env.STARLIGHT_DATA_DIR
  ? path.resolve(process.env.STARLIGHT_DATA_DIR)
  : path.resolve(__dirname, "../data");

// In-memory cache
interface NodeItem {
  id: string;
  type: string;
  label: string;
  description: string;
  domain?: string;
  tags?: string[];
  edges?: Array<{ type: string; target: string }>;
  [key: string]: any;
}

const nodeMap = new Map<string, NodeItem>();
const nodesByDomain = new Map<string, NodeItem[]>();
const nodesByType = new Map<string, NodeItem[]>();

function indexItem(item: NodeItem) {
  nodeMap.set(item.id, item);
  const dom = item.domain || "generic";
  if (!nodesByDomain.has(dom)) nodesByDomain.set(dom, []);
  nodesByDomain.get(dom)!.push(item);
  if (!nodesByType.has(item.type)) nodesByType.set(item.type, []);
  nodesByType.get(item.type)!.push(item);
}

function loadGraph() {
  // Bundle-file mode: STARLIGHT_DATA_DIR points at starlight-master-canon.json.
  if (fs.existsSync(dataDir) && fs.statSync(dataDir).isFile()) {
    const bundle = JSON.parse(fs.readFileSync(dataDir, "utf8"));
    for (const n of bundle.nodes || []) indexItem(n);
    for (const d of bundle.domains || []) {
      nodeMap.set(d.id, d);
      if (!nodesByType.has("domain")) nodesByType.set("domain", []);
      nodesByType.get("domain")!.push(d);
    }
    return;
  }
  // Every file in data/nodes is canon; a hand-maintained list silently dropped
  // skills, contribution tasks, and experiments (222 of 250 loaded). Dynamic by construction.
  const nodesDir = path.join(dataDir, "nodes");
  const nodeFiles = [
    ...fs.readdirSync(nodesDir).filter((f) => f.endsWith(".json")).sort().map((f) => `nodes/${f}`),
    "benchmarks.json",
  ];

  for (const rel of nodeFiles) {
    const p = path.join(dataDir, rel);
    if (!fs.existsSync(p)) continue;
    try {
      const items: NodeItem[] = JSON.parse(fs.readFileSync(p, "utf8"));
      for (const item of items) indexItem(item);
    } catch (e) {
      // ignore
    }
  }

  // Load domain definition nodes
  const domainDir = path.join(dataDir, "domains");
  if (fs.existsSync(domainDir)) {
    for (const f of fs.readdirSync(domainDir)) {
      if (f.endsWith(".json")) {
        try {
          const dom = JSON.parse(fs.readFileSync(path.join(domainDir, f), "utf8"));
          nodeMap.set(dom.id, dom);
          if (!nodesByType.has("domain")) nodesByType.set("domain", []);
          nodesByType.get("domain")!.push(dom);
        } catch {}
      }
    }
  }
}

loadGraph();

// Tool Definitions
const TOOLS = [
  {
    name: "search_graph",
    description: `Search the Starlight Knowledge Tree across ${nodeMap.size} graph entries (canonical nodes plus domain definitions: concepts, papers, tools, swarm patterns, benchmarks).`,
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keyword or semantic topic to search for." },
        domain: { type: "string", description: "Optional domain filter (e.g. domain-ai-architect, domain-systems-engineering)." },
        type: { type: "string", description: "Optional type filter (e.g. swarm_pattern, paper, tool, book, concept, benchmark)." },
        limit: { type: "number", description: "Maximum number of results to return (default: 10)." },
      },
      required: ["query"],
    },
  },
  {
    name: "get_node",
    description: "Retrieve full AST details, connections, citations, and failure mitigations for a specific node ID.",
    inputSchema: {
      type: "object",
      properties: {
        node_id: { type: "string", description: "Unique node ID (e.g. pattern-queen-conductor-worker, paper-tree-of-thoughts)." },
      },
      required: ["node_id"],
    },
  },
  {
    name: "traverse_subgraph",
    description: "Extract a 1-hop or 2-hop topological subgraph around an entity with all connections and relations (<8k tokens).",
    inputSchema: {
      type: "object",
      properties: {
        start_node_id: { type: "string", description: "The center node ID to traverse from." },
        hops: { type: "number", description: "Number of hops to traverse (1 or 2, default: 2)." },
      },
      required: ["start_node_id"],
    },
  },
  {
    name: "get_swarm_pattern",
    description: "Retrieve complete specification for a production-tested multi-agent swarm pattern with Maker/Checker roles and convergence rules.",
    inputSchema: {
      type: "object",
      properties: {
        pattern_id: { type: "string", description: "Swarm pattern ID (e.g. pattern-queen-conductor-worker, swarm-pattern-santa-loop, pattern-blackboard-workspace)." },
      },
      required: ["pattern_id"],
    },
  },
  {
    name: "list_domains",
    description: "List all 14 curated intelligence domains with descriptions, root problems, and node counts.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "query_benchmarks",
    description: "Retrieve empirical frontier benchmarks (SWE-bench Verified, GAIA, NIAH, HumanEval) with baselines and target scores.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

function handleToolCall(name: string, args: any): any {
  switch (name) {
    case "search_graph": {
      const q = (args.query || "").toLowerCase();
      const domainFilter = args.domain;
      const typeFilter = args.type;
      const limit = args.limit || 10;

      const results: any[] = [];
      for (const [_, node] of nodeMap) {
        if (domainFilter && node.domain !== domainFilter) continue;
        if (typeFilter && node.type !== typeFilter) continue;

        let score = 0;
        const lbl = (node.label || node.title || "").toLowerCase();
        const desc = (node.description || node.summary || "").toLowerCase();
        const id = node.id.toLowerCase();
        const tags = (node.tags || []).map((t: string) => t.toLowerCase());

        if (lbl.includes(q)) score += 10;
        if (id.includes(q)) score += 8;
        if (tags.some((t: string) => t.includes(q))) score += 5;
        if (desc.includes(q)) score += 2;

        if (score > 0) {
          results.push({
            id: node.id,
            type: node.type,
            label: node.label || node.title,
            domain: node.domain,
            description: desc.slice(0, 200) + (desc.length > 200 ? "..." : ""),
            tags: node.tags,
            score,
          });
        }
      }

      results.sort((a, b) => b.score - a.score);
      return {
        total_matches: results.length,
        results: results.slice(0, limit),
      };
    }

    case "get_node": {
      const node = nodeMap.get(args.node_id);
      if (!node) {
        return { error: `Node '${args.node_id}' not found in Knowledge Tree.` };
      }
      // Gather incoming edges
      const incomingEdges: any[] = [];
      for (const [_, n] of nodeMap) {
        if (Array.isArray(n.edges)) {
          for (const e of n.edges) {
            if (e.target === args.node_id) {
              incomingEdges.push({ from: n.id, from_label: n.label || n.title, type: e.type });
            }
          }
        }
      }
      return {
        node,
        incoming_edges: incomingEdges,
      };
    }

    case "traverse_subgraph": {
      const startId = args.start_node_id;
      const maxHops = Math.min(args.hops || 2, 2);
      const root = nodeMap.get(startId);
      if (!root) return { error: `Node '${startId}' not found.` };

      const visited = new Set<string>([startId]);
      const nodes: any[] = [{ id: root.id, label: root.label || root.title, type: root.type, domain: root.domain }];
      const edges: any[] = [];

      // Traverse both directions: a neighborhood includes who points at the
      // center, not only where the center points.
      const incoming = new Map<string, Array<{ from: string; type: string }>>();
      for (const n of nodeMap.values()) {
        if (Array.isArray(n.edges)) {
          for (const e of n.edges) {
            if (!incoming.has(e.target)) incoming.set(e.target, []);
            incoming.get(e.target)!.push({ from: n.id, type: e.type });
          }
        }
      }
      const pushNode = (id: string, bucket: string[]) => {
        if (visited.has(id)) return;
        visited.add(id);
        const tn = nodeMap.get(id);
        if (tn) {
          nodes.push({ id: tn.id, label: tn.label || tn.title, type: tn.type, domain: tn.domain });
          bucket.push(id);
        }
      };

      let currentHop = [startId];
      for (let hop = 1; hop <= maxHops; hop++) {
        const nextHop: string[] = [];
        for (const currId of currentHop) {
          const curr = nodeMap.get(currId);
          if (curr && Array.isArray(curr.edges)) {
            for (const e of curr.edges) {
              edges.push({ from: currId, to: e.target, type: e.type, direction: "outgoing" });
              pushNode(e.target, nextHop);
            }
          }
          for (const inc of incoming.get(currId) || []) {
            edges.push({ from: inc.from, to: currId, type: inc.type, direction: "incoming" });
            pushNode(inc.from, nextHop);
          }
        }
        currentHop = nextHop;
      }

      return {
        center_node: startId,
        hops_traversed: maxHops,
        node_count: nodes.length,
        edge_count: edges.length,
        nodes,
        edges,
      };
    }

    case "get_swarm_pattern": {
      const pat = nodeMap.get(args.pattern_id);
      if (!pat || pat.type !== "swarm_pattern") {
        const allPatterns = Array.from(nodeMap.values())
          .filter((n) => n.type === "swarm_pattern")
          .map((n) => ({ id: n.id, label: n.label }));
        return {
          error: `Swarm pattern '${args.pattern_id}' not found.`,
          available_patterns: allPatterns,
        };
      }
      return { pattern: pat };
    }

    case "list_domains": {
      const domains = Array.from(nodeMap.values())
        .filter((n) => n.type === "domain")
        .map((d) => ({
          id: d.id,
          label: d.label,
          description: d.description,
          node_count: (nodesByDomain.get(d.id) || []).length,
          root_problems: d.root_problems,
        }));
      return { total_domains: domains.length, domains };
    }

    case "query_benchmarks": {
      const benchmarks = Array.from(nodeMap.values()).filter((n) => n.type === "benchmark");
      return { total_benchmarks: benchmarks.length, benchmarks };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// JSON-RPC 2.0 stdio transport
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

function sendResponse(response: any) {
  process.stdout.write(JSON.stringify(response) + "\n");
}

rl.on("line", (line) => {
  if (!line.trim()) return;
  let req: any;
  try {
    req = JSON.parse(line);
  } catch (err) {
    sendResponse({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
    return;
  }

  const { id, method, params } = req;

  switch (method) {
    case "initialize":
      sendResponse({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          serverInfo: {
            name: "starlight-knowledge-tree-mcp",
            version: "2.0.0",
          },
          capabilities: {
            tools: {},
            resources: {},
          },
        },
      });
      break;

    case "tools/list":
      sendResponse({
        jsonrpc: "2.0",
        id,
        result: { tools: TOOLS },
      });
      break;

    case "tools/call":
      try {
        const toolResult = handleToolCall(params.name, params.arguments || {});
        sendResponse({
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify(toolResult, null, 2),
              },
            ],
          },
        });
      } catch (err: any) {
        sendResponse({
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify({ error: err.message }) }],
            isError: true,
          },
        });
      }
      break;

    case "resources/read": {
      const uri = params?.uri;
      if (uri === "starlight://master-canon") {
        const all = Array.from(nodeMap.values());
        sendResponse({
          jsonrpc: "2.0",
          id,
          result: {
            contents: [{
              uri,
              mimeType: "application/json",
              text: JSON.stringify({
                generated_from: "starlight-knowledge-mcp in-memory AST",
                total_entries: all.length,
                nodes: all.filter((n) => n.type !== "domain"),
                domains: all.filter((n) => n.type === "domain"),
              }),
            }],
          },
        });
      } else if (uri === "starlight://canvas") {
        const candidates = [
          process.env.STARLIGHT_CANVAS_PATH ? path.resolve(process.env.STARLIGHT_CANVAS_PATH) : null,
          path.resolve(__dirname, "starlight-knowledge-tree.canvas"),
          path.resolve(__dirname, "../dist/starlight-knowledge-tree.canvas"),
        ].filter(Boolean) as string[];
        const canvasPath = candidates.find((p) => fs.existsSync(p));
        if (canvasPath) {
          sendResponse({
            jsonrpc: "2.0",
            id,
            result: { contents: [{ uri, mimeType: "application/json", text: fs.readFileSync(canvasPath, "utf8") }] },
          });
        } else {
          sendResponse({
            jsonrpc: "2.0",
            id,
            error: { code: -32002, message: `Canvas not found (looked in: ${candidates.join(", ")}); run: npx tsx scripts/export-json-canvas.ts` },
          });
        }
      } else {
        sendResponse({
          jsonrpc: "2.0",
          id,
          error: { code: -32002, message: `Unknown resource: ${uri}` },
        });
      }
      break;
    }

    case "resources/list":
      sendResponse({
        jsonrpc: "2.0",
        id,
        result: {
          resources: [
            {
              uri: "starlight://master-canon",
              name: "Starlight Master Canon (Single-File AST)",
              mimeType: "application/json",
            },
            {
              uri: "starlight://canvas",
              name: "Starlight Knowledge Tree Visual Canvas 1.0",
              mimeType: "application/json",
            },
          ],
        },
      });
      break;

    default:
      sendResponse({
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Method '${method}' not found` },
      });
      break;
  }
});
