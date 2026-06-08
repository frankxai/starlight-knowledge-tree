# Ontology

Starlight Knowledge Tree uses a typed graph to represent knowledge, capability, and contribution. This document defines all node types, edge types, and the rules governing their use.

---

## Node Types

| Type | ID key | Description |
|---|---|---|
| `domain` | `domain-*` | A top-level field of knowledge (e.g., `domain-ai-architect`) |
| `concept` | `concept-*` | A defined unit of understanding with prerequisites |
| `skill` | `skill-*` | An applied capability built from one or more concepts |
| `tool` | `tool-*` | A software or hardware instrument used in a domain |
| `paper` | `paper-*` | A research artifact (journal, preprint, thesis) |
| `dataset` | `dataset-*` | Structured data for research or model training |
| `experiment` | `experiment-*` | A reproducible test or scientific investigation |
| `artifact` | `artifact-*` | A public output demonstrating capability |
| `credential` | `credential-*` | A verifiable evidence token linked to artifacts |
| `open_problem` | `problem-*` | An unsolved question or research gap |
| `contribution_task` | `task-*` | A concrete open quest for contributors |

### Required fields for all nodes

```typescript
{
  id: string;           // unique, kebab-case, prefixed by type
  type: NodeType;       // one of the types above
  label: string;        // human-readable name
  description: string;  // 1–3 sentences
  domain: string;       // domain ID this node belongs to
  tags: string[];       // 1–10 keywords
  status: "seed" | "draft" | "stable" | "deprecated";
  edges: Edge[];        // see Edge Types below
  created_at: string;   // ISO 8601
  updated_at: string;   // ISO 8601
}
```

### Additional fields by type

**`skill` nodes must include:**
```typescript
{
  evidence_types: EvidenceType[];  // at least one required
  prerequisites: string[];         // node IDs that must come before
  unlock_criteria: string;         // plain-language description of what "done" means
}
```

**`paper` nodes must include:**
```typescript
{
  authors: string[];
  year: number;
  url: string;          // DOI, arXiv, or PubMed link
  abstract: string;
}
```

**`open_problem` nodes must include:**
```typescript
{
  difficulty: "accessible" | "hard" | "unsolved";
  prize_or_benchmark: string | null;
  related_papers: string[];
}
```

**`contribution_task` nodes must include:**
```typescript
{
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_hours: number | null;
  required_skills: string[];
  output_type: string;
}
```

---

## Edge Types

| Type | Semantics | Directionality |
|---|---|---|
| `requires` | A must precede B (hard prerequisite) | A → B |
| `unlocks` | Completing A makes B accessible | A → B |
| `applies_to` | A is used in the context of B | A → B |
| `evidenced_by` | A (skill/concept) is demonstrated by B (paper/artifact) | A → B |
| `contributes_to` | A adds to or builds on B | A → B |
| `contradicts` | A challenges or refutes B | A ↔ B (symmetric) |
| `updated_by` | A supersedes or revises B | A → B |
| `part_of` | A is a sub-component of B | A → B |
| `teaches` | A (tool/artifact) is an effective path for learning B | A → B |
| `tests` | A (experiment/artifact) verifies or probes B | A → B |

### Edge schema

```typescript
{
  type: EdgeType;
  target: string;    // target node ID
  weight?: number;   // 0.0–1.0, optional confidence or strength
  note?: string;     // optional human-readable annotation
}
```

---

## Evidence Types

A skill is only meaningfully progressed when evidence exists. Valid evidence types:

| Type | Description |
|---|---|
| `explanation` | A written or verbal explanation in the contributor's own words |
| `implementation` | Working code, design, system, or protocol |
| `public_artifact` | A published post, repo, paper, video, or demo |
| `experiment_log` | A documented experiment with method, results, and reflection |
| `reproducible_notebook` | An executable notebook (Jupyter, Observable, etc.) |
| `contribution` | A PR, dataset, peer review, or teaching artifact accepted by a project |
| `teaching_artifact` | A tutorial, workshop, lecture, or mentorship session |

---

## Status Values

| Value | Meaning |
|---|---|
| `seed` | Added but not yet reviewed or cross-linked |
| `draft` | Under active review; edges may be incomplete |
| `stable` | Reviewed, cross-linked, and considered accurate |
| `deprecated` | Superseded or no longer relevant |

---

## The Progression Loop

```
Concept → Skill → Practice → Artifact → Evidence → Contribution → Identity
```

Each stage is represented by nodes and edges in the graph. Identity is not a node — it is the emergent pattern of a contributor's evidence across the graph.

---

## Naming Conventions

- Node IDs: `type-kebab-case` (e.g., `concept-transformer-attention`, `skill-finetune-llm`)
- Domain IDs: `domain-<name>` (e.g., `domain-ai-architect`)
- Path IDs: `path-<domain>-<name>` (e.g., `path-ai-architect-foundation`)

---

## Versioning

Node and schema versions follow the graph version in `data/schemas/node.schema.json`. Breaking changes to the schema require a major version bump and a migration script.
