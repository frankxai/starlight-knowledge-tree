# Contributing to Starlight Knowledge Tree

Thank you for helping grow the graph. This document explains how to add nodes, edges, skill paths, papers, experiments, and contribution quests.

---

## Ground Rules

1. **Evidence first.** Every skill node must include at least one evidence type. Do not mark a skill as achievable through consumption alone.
2. **No private data.** This is a public repository. Never commit personal health data, genetic data, biometric data, private identifiers, or data covered by GDPR/HIPAA/CCPA. The `bio-human-intelligence` domain covers scientific and population-level research only.
3. **Cite sources.** Papers, claims, and edges should reference primary sources wherever possible.
4. **Respect ontology.** All nodes must conform to the schemas in `data/schemas/`. Run `npm run validate` before submitting.
5. **Atomic PRs.** One concept, one path, or one domain per pull request. Keep diffs small and reviewable.
6. **No credential inflation.** Do not add credential nodes that reward consumption. Credentials must reference evidence artifacts.

---

## Ways to Contribute

| Type | How |
|---|---|
| New concept node | Open an [Add Node issue](.github/ISSUE_TEMPLATE/add-node.yml) |
| New paper / dataset | Open an [Add Paper issue](.github/ISSUE_TEMPLATE/add-paper.yml) |
| New skill path | Open an [Add Skill Path issue](.github/ISSUE_TEMPLATE/add-skill-path.yml) |
| New experiment | Open an [Add Experiment issue](.github/ISSUE_TEMPLATE/add-experiment.yml) |
| Fix data errors | Open a PR directly with corrections |
| Improve docs | Open a PR against any file in `docs/` |

---

## Adding a Node (Manual)

1. Fork the repository.
2. Add your node to the appropriate file in `data/nodes/` or `data/domains/`.
3. Every node must include: `id`, `type`, `label`, `description`, `domain`, `tags`, and at least one `edge`.
4. Run `npm run validate` in the repo root to check schema conformance.
5. Open a PR with a clear title: `feat(nodes): add [node-id]`

### Example concept node

```json
{
  "id": "transformer-attention",
  "type": "concept",
  "label": "Transformer Self-Attention",
  "description": "The scaled dot-product attention mechanism that allows a model to weigh the importance of different positions in a sequence.",
  "domain": "ai-architect",
  "tags": ["transformers", "attention", "deep-learning"],
  "edges": [
    { "type": "requires", "target": "linear-algebra-basics" },
    { "type": "unlocks", "target": "transformer-architecture" },
    { "type": "evidenced_by", "target": "attention-is-all-you-need" }
  ],
  "evidence_types": ["explanation", "implementation", "experiment"],
  "status": "stable"
}
```

---

## Adding a Skill Path

A skill path is an ordered list of node IDs with optional branching. Paths live in `data/domains/<domain>.json` under the `paths` key.

```json
{
  "id": "path-foundation-llm",
  "label": "Foundation LLM Engineering",
  "domain": "ai-architect",
  "nodes": [
    "linear-algebra-basics",
    "probability-statistics",
    "gradient-descent",
    "transformer-attention",
    "transformer-architecture",
    "pretraining-objectives",
    "finetuning-methods",
    "rlhf"
  ]
}
```

---

## Validation

Before opening a PR:

```bash
npm run validate
```

This runs the graph validator in `packages/graph-utils` and checks:
- Schema conformance for all node and edge files
- No orphaned node references
- No circular `requires` chains
- Required fields present

---

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

## Questions?

Open a discussion or an issue with the `question` label.
