import test from 'node:test';
import assert from 'node:assert/strict';
import { findIndexDrift, inspectGraph, projectSearchItem, readCanon } from '../graph-health.mjs';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const records = [
  { id: 'domain-demo', type: 'domain', label: 'Demo', description: 'Domain', paths: [{ id: 'path-demo', nodes: ['skill-demo'] }] },
  { id: 'skill-demo', type: 'skill', domain: 'domain-demo', label: 'Skill', description: 'Build', tags: ['demo'], prerequisites: ['missing'], edges: [{ type: 'evidenced_by', target: 'artifact-demo' }] },
  { id: 'artifact-demo', type: 'artifact', domain: 'domain-demo', label: 'Artifact', description: 'Output' },
];

test('same-size ID substitution cannot pass index parity', () => {
  const index = records.map(projectSearchItem);
  index[1] = { ...index[1], id: 'wrong' };
  assert.deepEqual(findIndexDrift(records, index), ['Unexpected search ID: wrong', 'Missing search ID: skill-demo']);
});

test('duplicate index IDs, stale metadata, alias and route drift are detected', () => {
  const mcp = { id: 'mcp-demo', type: 'mcp', label: 'MCP', description: 'Tools' };
  const correct = projectSearchItem(mcp);
  assert.equal(correct.type, 'mcp_server');
  assert.equal(correct.href, '/mcp-tools');
  assert.deepEqual(findIndexDrift([mcp], [correct]), []);
  const errors = findIndexDrift([mcp], [{ ...correct, type: 'mcp', href: '/tree', description: 'Old' }, correct]);
  assert.equal(errors.length, 4);
  assert.ok(errors.includes('Duplicate search ID: mcp-demo'));
});

test('diagnostics distinguish structural evidence links from reviewed proof', () => {
  const report = inspectGraph(records);
  assert.equal(report.evidenceEdges, 1);
  assert.deepEqual(report.unresolved, [{ id: 'skill-demo', field: 'prerequisites', target: 'missing' }]);
  assert.deepEqual(report.invalidDomains, []);
  assert.deepEqual(report.duplicateIds, []);
});

test('all reference-bearing learning fields and cross-kind duplicates are inspected', () => {
  const report = inspectGraph([{ ...records[0], seed_nodes: ['seed-missing'], root_problems: ['problem-missing'] },
    { ...records[1], domain: 'domain-missing', required_skills: ['skill-missing'], related_papers: ['paper-missing'] }, records[1]]);
  assert.deepEqual(report.duplicateIds, ['skill-demo']);
  assert.equal(report.invalidDomains.length, 1);
  for (const field of ['seed_nodes', 'root_problems', 'prerequisites', 'required_skills', 'related_papers', 'edges.evidenced_by']) {
    assert.ok(report.unresolved.some(r => r.field === field), field);
  }
});

test('canon loader includes benchmarks and fails on malformed node containers', () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'knowledge-health-'));
  try {
    mkdirSync(path.join(dir, 'nodes')); mkdirSync(path.join(dir, 'domains'));
    writeFileSync(path.join(dir, 'nodes/a.json'), JSON.stringify([records[1]]));
    writeFileSync(path.join(dir, 'domains/a.json'), JSON.stringify(records[0]));
    writeFileSync(path.join(dir, 'benchmarks.json'), JSON.stringify([{ id: 'benchmark-demo', type: 'benchmark' }]));
    assert.equal(readCanon(dir).length, 3);
    writeFileSync(path.join(dir, 'nodes/a.json'), '{}');
    assert.throws(() => readCanon(dir), /Unexpected canon shape/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('index validation is order independent and rejects non-array data', () => {
  assert.deepEqual(findIndexDrift(records, records.map(projectSearchItem).reverse()), []);
  assert.ok(findIndexDrift(records, {}).length);
});
