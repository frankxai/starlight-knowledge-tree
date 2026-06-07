# Contribution Model

## Philosophy

Starlight Knowledge Tree grows through distributed, evidence-weighted contributions. Anyone can propose a node. Not everyone's node will be accepted. The graph favors accuracy over volume.

---

## Who Can Contribute

| Contributor Type | What They Bring |
|---|---|
| **Researchers** | Papers, open problems, datasets, experiment designs |
| **Engineers** | Tools, implementations, skill paths, experiment logs |
| **Students** | Questions, gaps, beginner-accessible paths |
| **Founders** | Creator-founder paths, tools, leverage maps |
| **Educators** | Teaching artifacts, structured paths, concept explanations |
| **AI Agents** | Automated node proposals, paper ingestion, gap detection |

---

## Contribution Types and Pathways

### 1. Adding a Node

Use the GitHub issue template or submit a PR directly.

- All nodes must conform to `data/schemas/node.schema.json`
- Run `npm run validate` before submitting
- Include at least one edge connecting the node to the existing graph

### 2. Adding a Skill Path

Skill paths connect existing nodes in a meaningful learning sequence. They live in `data/domains/<domain>.json` under the `paths` array.

Requirements:
- All node IDs in the path must already exist
- Path must have a `label` and a `domain`
- Optional: branching (`branches` array with condition logic)

### 3. Fixing Errors

If a node is inaccurate, outdated, or poorly described:

- Open a PR with corrections
- Reference the source (paper URL, documentation link)
- If the change deprecates an edge, mark the old edge as `deprecated: true` rather than deleting it

### 4. Adding Evidence

Evidence links exist as edges between skill nodes and artifact/paper/experiment nodes. To add evidence for a skill:

1. Ensure the artifact/paper/experiment node exists (add it if not)
2. Add an `evidenced_by` edge from the skill to the artifact
3. Ensure the artifact node has the correct `type` and required fields

### 5. Contributing as an Agent

AI agents must follow the rules in `docs/agent-operating-rules.md`. Agents may:

- Propose new nodes via issue templates
- Submit PRs for paper ingestion (type: `paper`)
- Flag potential gaps as `open_problem` nodes
- Validate schema conformance

Agents must not:
- Claim skills are `stable` without human review
- Delete or deprecate nodes without a stated reason
- Generate fictional papers or sources

---

## Review Process

1. **Automated validation** — CI checks schema conformance
2. **Domain review** — a domain maintainer checks accuracy and coverage
3. **Merge** — accepted contributions are merged to `main`
4. **Propagation** — the web site rebuilds automatically

---

## Credit

Contributors are credited in the commit history and, in Phase 2, in a contribution leaderboard on the website. Contribution is a public artifact — a form of evidence in itself.

---

## Governance

Starlight Knowledge Tree is currently maintained by the Starlight Intelligence team. As the community grows, governance will move toward a domain-based maintainer model where each domain (`ai-architect`, `space-builder`, etc.) has a dedicated reviewer group.
