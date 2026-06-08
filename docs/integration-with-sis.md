# Integration with Starlight Intelligence System

## Summary

Starlight Knowledge Tree is a **vertical** of the Starlight Intelligence System (SIS) and Starlight Intelligence Protocol (SIP). It does not rebuild SIS infrastructure. It consumes SIS as a substrate and provides the public-facing knowledge graph layer.

---

## What SIS/SIP Provides

| Capability | SIS/SIP Responsibility |
|---|---|
| Memory and context persistence | SIS memory vaults |
| Agent-readable context | SIP protocol and MCP tools |
| Sovereign identity | SIP identity primitives |
| Private evidence storage | SIS encrypted vaults |
| Agent orchestration | SIS agent runtime |
| Cross-session context | SIS session memory |

Starlight Knowledge Tree does **not** implement any of the above.

---

## What Starlight Knowledge Tree Provides

| Capability | This Repo |
|---|---|
| Public knowledge graph | `data/` — JSON nodes, edges, domains |
| Skill path definitions | `data/domains/<domain>.json` → `paths` |
| Evidence type registry | `ONTOLOGY.md` → Evidence Types |
| Open problems and research gaps | `data/nodes/open-problems.json` |
| Contribution quests | `data/nodes/contribution-tasks.json` |
| Public web interface | `apps/web/` |
| Agent instruction files | `agents/` |

---

## Integration Points

### 1. MCP Tool Exposure (Planned — Phase 4)

In Phase 4, the graph data will be exposed as MCP tools, allowing SIS-connected agents to:

- Query nodes by type, domain, or tag
- Traverse prerequisite chains
- Look up evidence requirements for a skill
- Return open problems in a domain

Example (future MCP tool call):
```json
{
  "tool": "knowledge_tree.query",
  "input": {
    "domain": "ai-architect",
    "type": "skill",
    "status": "stable"
  }
}
```

### 2. Private Evidence Vault (Planned — Phase 4)

Evidence for individual contributors will be stored in SIS private vaults, not in this public repository. The public graph tracks **what evidence types are required** for each skill; individual progress is sovereign and private.

This ensures:
- No personal data in the public repo
- Contributors own their capability record
- The graph remains objective and population-level

### 3. Agent Context Injection (Planned — Phase 4)

SIS-connected agent sessions will be able to inject the current state of the knowledge graph as context. An agent that knows a user's evidence record (from their private vault) and the public graph structure can produce accurate, personalized capability assessments.

---

## Architectural Boundary

The boundary between SIS and Starlight Knowledge Tree is intentionally clear:

```
┌─────────────────────────────────────────────────────┐
│               Starlight Knowledge Tree               │
│                                                     │
│  data/ (public graph)   apps/web (public site)      │
│  agents/ (instructions) packages/ (validation)      │
└─────────────────────┬───────────────────────────────┘
                      │  consumes as substrate
┌─────────────────────▼───────────────────────────────┐
│         Starlight Intelligence System (SIS/SIP)      │
│                                                     │
│  Memory Vaults  │  MCP Tools  │  Agent Runtime      │
│  SIP Protocol   │  Identity   │  Session Memory     │
└─────────────────────────────────────────────────────┘
```

**Rule:** Starlight Knowledge Tree never imports from, overrides, or replicates the SIS substrate. Any interface between the two systems is defined by SIP protocols and implemented by SIS.

---

## SIP Attestation

> *Built on Starlight Intelligence Protocol (SIP). Attestation: pending.*

When the formal SIP attestation process is available, this document will be updated with the protocol version and verification hash.
