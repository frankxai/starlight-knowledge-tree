# Agent Operating Rules

Rules for all AI agents (Claude Code, GitHub Copilot, Cursor, Codex, and others) operating in this repository.

---

## Core Principle

Agents in this repository maintain and extend a knowledge graph. The graph must remain accurate, well-structured, and evidence-grounded. Agents are allowed to propose additions but must not corrupt existing structure or introduce false claims.

---

## General Rules

1. **Never fabricate sources.** All `paper` nodes must reference real, verifiable publications. If you cannot find a real source, omit the node and note the gap as an `open_problem`.

2. **Never mark a skill as `stable` without evidence.** A skill node may be created with `status: "seed"` or `status: "draft"`. Only human reviewers or validated evidence links can promote a skill to `stable`.

3. **Never delete nodes.** Mark deprecated nodes with `status: "deprecated"` and add a note. Deleting a node breaks edges and paths silently.

4. **Never commit private data.** This is a public repository. No personal identifiers, health records, biometric data, or data covered by GDPR/HIPAA/CCPA may be committed. This applies even if a user requests it.

5. **Preserve schema conformance.** All nodes must conform to `data/schemas/node.schema.json`. Run the validator before proposing changes.

6. **Cite your reasoning.** When adding or modifying a node, include a comment or commit message that explains why the change is accurate.

7. **One node per PR.** Keep PRs atomic. Do not bundle unrelated nodes in a single submission.

---

## Agent-Specific Rules

### Claude Code / Anthropic

- Use the `agents/cartographer.md` system prompt when mapping new concepts
- Use the `agents/research-ingestion-agent.md` system prompt when ingesting papers
- Always run `npm run validate` after modifying files in `data/`

### GitHub Copilot

- Respect the `.github/ISSUE_TEMPLATE/` formats when generating issue descriptions
- Do not auto-close issues unless validation passes
- When suggesting node additions, check for existing nodes before creating duplicates

### Cursor

- Use the workspace rules in this file as your operating context
- When refactoring schema files, run the validator immediately after
- Flag any schema changes that would break existing node data as breaking changes

### Codex / GPT-based agents

- Follow the same rules as Claude Code
- Be especially careful with paper nodes: verify arXiv IDs or DOIs before committing

---

## Permitted Agent Actions

| Action | Permitted |
|---|---|
| Add `seed` or `draft` nodes | ✅ Yes |
| Add `paper` nodes with verified URLs | ✅ Yes |
| Add edges between existing nodes | ✅ Yes |
| Add `open_problem` nodes | ✅ Yes |
| Add `contribution_task` nodes | ✅ Yes |
| Promote node to `stable` | ❌ No (human review required) |
| Delete a node | ❌ No (deprecate instead) |
| Commit private data | ❌ Never |
| Fabricate a paper URL or DOI | ❌ Never |
| Modify `data/schemas/` | ⚠️ Only with a breaking change notice |

---

## Cartographer Role

The primary agent role in this repository is the **Cartographer**. See `agents/cartographer.md` for the full system prompt.

The Cartographer:
- Maps new concepts to existing nodes
- Identifies missing prerequisite chains
- Detects gaps and proposes `open_problem` nodes
- Maintains topological consistency in the graph

---

## Validation Command

Always run before committing data changes:

```bash
npm run validate
```

If validation fails, fix errors before opening a PR. Do not open PRs with failing validation.
