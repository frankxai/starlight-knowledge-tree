---
name: kt-canon
description: Use when changing, recounting, exporting, or reviewing Starlight Knowledge Tree canon data (data/nodes, data/domains, benchmarks) in frankxai/starlight-knowledge-tree.
---

# KT Canon

Canon counts come from data, never from prose. Nodes and domains are different things and never summed.

## Verify before any claim

Run from repo root. Paste real output in the PR, never a remembered count.

```powershell
node scripts/verify-canon-counts.mjs
npm run validate
```

- `verify-canon-counts.mjs` recounts nodes, unique ids, domains, edges, benchmarks, swarm patterns, and MCP integrations from `data/`, then scans shipped scripts and README for hard-coded count claims. A drift line means the prose is wrong, not the data.
- Duplicate ids, dangling edges, and undefined rendered fields are blockers, not warnings.

## Exports must be deterministic

```powershell
npm run export:notebooklm
npm run export:dist
```

Run each export twice. The second run must produce byte-identical output. Exporters derive every count from loaded arrays. Benchmark records carry `name`, `metric`, `sota_target`, `source_url`. Render those fields. Never render a field the record does not carry.

## Change discipline

- One node or one fix per PR. Atomic diffs only.
- Deprecate, never delete. No fabricated sources, no private data, no absolute local paths in committed data.
- Agents propose `seed` or `draft`. Only a human promotes to `stable`, on evidence.
- Estate index generation (`scripts/index-estate.ts`) needs an explicit estate root input and stores portable labels only. Its markdown audit is local operator output. Never commit it.

## Done when

Validate is green, exports are deterministic, the guard reports zero drift, and an independent verifier from a different harness recounts from a clean clone.
