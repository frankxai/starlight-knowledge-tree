#!/usr/bin/env node
// verify-canon-counts.mjs - the shipped count claims must equal the data.
// History: 250 entries in data/nodes plus 14 domain files were summed and sold
// as "264 nodes" (PR title, NotebookLM dossiers, MCP tool description). Nodes
// and domains are different things; this guard fails when any hardcoded count
// in the export/MCP scripts drifts from data/. Run: node scripts/verify-canon-counts.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'data');

export function countCanon(data = dataDir) {
  let nodes = 0;
  let edges = 0;
  const ids = new Set();
  for (const f of fs.readdirSync(path.join(data, 'nodes')).filter((x) => x.endsWith('.json'))) {
    const arr = JSON.parse(fs.readFileSync(path.join(data, 'nodes', f), 'utf8'));
    if (!Array.isArray(arr)) continue;
    for (const n of arr) {
      nodes += 1;
      if (n.id) ids.add(n.id);
      edges += Array.isArray(n.edges) ? n.edges.length : 0;
    }
  }
  const domains = fs.readdirSync(path.join(data, 'domains')).filter((x) => x.endsWith('.json')).length;
  const benchmarks = JSON.parse(fs.readFileSync(path.join(data, 'benchmarks.json'), 'utf8')).length;
  const swarmPatterns = JSON.parse(fs.readFileSync(path.join(data, 'nodes', 'swarm-patterns.json'), 'utf8')).length;
  const mcpIntegrations = JSON.parse(fs.readFileSync(path.join(data, 'nodes', 'mcp.json'), 'utf8')).length;
  return { nodes, uniqueIds: ids.size, domains, edges, benchmarks, swarmPatterns, mcpIntegrations };
}

export function findCountViolations(text, counts, file) {
  const violations = [];
  // Up to three words may sit between the number and the noun ("6 empirical
  // frontier benchmarks"). The immediate-adjacency form missed that sentence.
  const patterns = [
    { re: /(\d+)\+?\s+(?:[\w-]+\s+){0,2}nodes?\b/gi, actual: counts.nodes, label: 'nodes' },
    { re: /(\d+)\s+(?:[\w-]+\s+){0,2}domains?\b/gi, actual: counts.domains, label: 'domains' },
    { re: /(\d+)\s+(?:[\w-]+\s+){0,3}benchmarks?\b/gi, actual: counts.benchmarks, label: 'benchmarks' },
    { re: /(\d+)\s+(?:[\w-]+\s+){0,2}edges?\b/gi, actual: counts.edges, label: 'edges' },
    { re: /(\d+)\s+(?:[\w-]+\s+){0,2}swarm patterns?\b/gi, actual: counts.swarmPatterns, label: 'swarm patterns' },
    { re: /(\d+)\s+MCP (?:server )?integrations?\b/gi, actual: counts.mcpIntegrations, label: 'MCP integrations' },
  ];
  for (const { re, actual, label } of patterns) {
    for (const m of text.matchAll(re)) {
      if (Number(m[1]) !== actual) violations.push(`${file}: claims ${m[1]} ${label}, data has ${actual} ("${m[0]}")`);
    }
  }
  return violations;
}

function main() {
  const counts = countCanon();
  const files = ['scripts/export-for-notebooklm.ts', 'scripts/starlight-knowledge-mcp.ts', 'scripts/export-community-distribution.ts', 'README.md'];
  const violations = [];
  for (const f of files) {
    const p = path.join(root, f);
    if (fs.existsSync(p)) violations.push(...findCountViolations(fs.readFileSync(p, 'utf8'), counts, f));
  }
  console.log(`canon counts: nodes=${counts.nodes} uniqueIds=${counts.uniqueIds} domains=${counts.domains} edges=${counts.edges} benchmarks=${counts.benchmarks}`);
  if (counts.uniqueIds !== counts.nodes) violations.push(`duplicate node ids: ${counts.nodes - counts.uniqueIds} rows share an id`);
  if (violations.length) {
    for (const v of violations) console.error(`COUNT DRIFT: ${v}`);
    process.exit(1);
  }
  console.log('all hard-coded count claims match data/');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
