---
name: kt-contribution-review
description: Use when triaging or reviewing a Starlight Knowledge Tree contribution (issue template or node PR) in frankxai/starlight-knowledge-tree.
---

# KT Contribution Review

Contributions enter through GitHub issue templates (add-node, add-paper, add-skill-path, add-experiment, atlas-correction) and land as atomic PRs. The merge closes the issue with a live node URL.

## Review checklist

1. One node or one correction per PR. Split anything wider.
2. Schema holds: required fields present, status is seed or draft from an agent, edges point at existing ids.
3. Evidence is real: source links resolve, no fabricated citations, benchmark claims name source and version.
4. Privacy holds: no personal identifiers, no absolute local paths, no private repository names or purposes.
5. `npm run validate` green on the exact head, export diff reviewed, MCP smoke still passes.
6. Verifier harness differs from maker harness. A verifier who authored the change stops and hands over.
7. Promotion to stable needs a named human on evidence. Record who and why in the PR.

## Verdicts

- Pass: every line above holds, with command output quoted.
- Revise: named defects with file pointers. A new push invalidates the verdict.
- Block: fabricated source, private data, seeded numbers, or a count claim the data contradicts.

## Operating truth

Queue age is a product metric. A contribution waiting over 7 days without a verdict is a team failure, escalated by the coordinator in the weekly numbers.
