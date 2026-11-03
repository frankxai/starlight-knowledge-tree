import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Structural diagnostics only: a citation or an evidence edge is not verification.
export function readCanon(dataDir) {
  const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
  const records = (dir, array) => fs.readdirSync(path.join(dataDir, dir)).filter(f => f.endsWith('.json')).sort().flatMap(f => {
    const value = read(path.join(dataDir, dir, f));
    if (array ? !Array.isArray(value) : !value || Array.isArray(value) || typeof value !== 'object') {
      throw new Error(`Unexpected canon shape: ${dir}/${f}`);
    }
    return array ? value : [value];
  });
  const benchmarks = read(path.join(dataDir, 'benchmarks.json'));
  if (!Array.isArray(benchmarks)) throw new Error('Expected benchmark array');
  return [...records('nodes', true), ...records('domains', false), ...benchmarks];
}

export function inspectGraph(records) {
  const ids = new Set(records.map(n => n.id));
  const domains = new Set(records.filter(n => n.type === 'domain').map(n => n.id));
  const seen = new Set();
  const duplicateIds = [];
  const unresolved = [];
  const invalidDomains = [];
  const byType = {};
  let edges = 0;
  let evidenceEdges = 0;
  for (const n of records) {
    if (seen.has(n.id)) duplicateIds.push(n.id);
    seen.add(n.id);
    byType[n.type] = (byType[n.type] || 0) + 1;
    if (n.type !== 'domain' && !domains.has(n.domain)) invalidDomains.push({ id: n.id, domain: n.domain ?? null });
    const refs = (field, values) => {
      for (const target of values || []) if (!ids.has(target)) unresolved.push({ id: n.id, field, target });
    };
    for (const e of n.edges || []) {
      edges++;
      if (e.type === 'evidenced_by') evidenceEdges++;
      refs(`edges.${e.type}`, [e.target]);
    }
    for (const field of ['prerequisites', 'seed_nodes', 'root_problems', 'required_skills', 'related_papers']) refs(field, n[field]);
    for (const p of n.paths || []) refs(`paths.${p.id}`, p.nodes);
  }
  return { records: records.length, byType, edges, evidenceEdges, duplicateIds, invalidDomains, unresolved };
}

// Match the generator's public projection, including its intentional MCP alias.
export function projectSearchItem(n) {
  const hrefs = { book: '/library', paper: '/papers', mcp: '/mcp-tools', swarm_pattern: '/mcp-tools' };
  return JSON.parse(JSON.stringify({
    id: n.id, type: n.type === 'mcp' ? 'mcp_server' : n.type,
    label: n.title || n.label || n.name || n.id,
    description: n.summary || n.abstract || n.description || '',
    domain: n.domain, tags: n.tags, difficulty: n.difficulty,
    href: Object.hasOwn(hrefs, n.type) ? hrefs[n.type] : '/tree',
  }));
}

export function findIndexDrift(records, index) {
  if (!Array.isArray(index)) return ['Search index must be an array'];
  const expected = new Map(records.map(n => [n.id, projectSearchItem(n)]));
  const seen = new Set();
  const errors = [];
  const fields = ['id', 'type', 'label', 'description', 'domain', 'tags', 'difficulty', 'href'];
  for (const item of index) {
    if (!item || typeof item !== 'object') { errors.push('Invalid search record'); continue; }
    if (seen.has(item.id)) errors.push(`Duplicate search ID: ${item.id}`);
    seen.add(item.id);
    const wanted = expected.get(item.id);
    if (!wanted) { errors.push(`Unexpected search ID: ${item.id}`); continue; }
    for (const field of fields) if (JSON.stringify(item[field]) !== JSON.stringify(wanted[field])) errors.push(`${item.id}: stale search field ${field}`);
  }
  for (const id of expected.keys()) if (!seen.has(id)) errors.push(`Missing search ID: ${id}`);
  return errors;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const records = readCanon(path.join(root, 'data'));
  const report = inspectGraph(records);
  const index = JSON.parse(fs.readFileSync(path.join(root, 'apps/web/src/data/search-index.json'), 'utf8'));
  const indexDrift = findIndexDrift(records, index);
  console.log(JSON.stringify({ ...report, indexDrift }, null, 2));
  // Unresolved references are backlog diagnostics; duplicate identities and stale
  // projections corrupt what the public reads and block CI immediately.
  if (report.duplicateIds.length || report.invalidDomains.length || indexDrift.length) process.exitCode = 1;
}
