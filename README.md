# Starlight Knowledge Tree

> An open intelligence graph for human capability, scientific knowledge, and contribution paths.

Most learning systems track consumption.  
**Starlight Knowledge Tree tracks capability.**

It maps domains, concepts, skills, tools, papers, experiments, artifacts, open problems, and contribution quests into a living graph of what humans can understand, build, prove, and share.

---

## What This Is

Starlight Knowledge Tree is a public research and skill-progression graph. It organizes human knowledge and capability across domains into a structured, evidence-first graph — not a course catalogue, not a content library.

It is built to answer four questions:

- **What exists?** — The current frontier of knowledge in a domain.
- **What matters?** — Root-node problems and high-leverage concepts.
- **What can I build?** — Skills, tools, and paths from novice to mastery.
- **What can I contribute?** — Open problems, research gaps, and contribution quests.

---

## Why It Exists

Learning has been gamified into completion theater. Watch a video, get a badge. Finish a course, claim a skill. None of this produces evidence of capability.

Starlight Knowledge Tree is built on a different rule:

> **A skill is not complete because someone watched a video, read a thread, or finished a course.**  
> **A skill becomes real when there is evidence.**

Evidence includes:

- An explanation (in your own words, to a real audience)
- An implementation (code, design, system, experiment)
- A public artifact (post, repo, paper, tool)
- An experiment log (notebook, protocol, results)
- A contribution (PR, dataset, peer review, teaching artifact)

---

## How It Relates to Starlight Intelligence System

This repo is a **vertical built on top of Starlight Intelligence System (SIS) and the Starlight Intelligence Protocol (SIP)**.

| Layer | Responsibility |
|---|---|
| **SIS / SIP** | Protocol, memory vaults, MCP tools, agent context, sovereign intelligence infrastructure |
| **Starlight Knowledge Tree** | Knowledge graph, research maps, skill paths, root-node problems, evidence-based progression |

Starlight Knowledge Tree does **not** rebuild SIS infrastructure. It consumes SIS as the substrate and provides the public-facing knowledge and contribution layer.

---

## The Core Progression Loop

```
Concept → Skill → Practice → Artifact → Evidence → Contribution → Identity
```

Each stage has a clear definition:

| Stage | Definition |
|---|---|
| **Concept** | A unit of knowledge with defined prerequisites and relationships |
| **Skill** | Applied capability built from one or more concepts |
| **Practice** | Deliberate exercises and experiments that build the skill |
| **Artifact** | A public output that demonstrates capability |
| **Evidence** | Verified proof that the skill has been exercised |
| **Contribution** | Adding value to the graph itself — new nodes, research, tools |
| **Identity** | The emergent profile of a builder defined by their evidence, not their credentials |

---

## Initial Paths

| Path | Description |
|---|---|
| [AI Architect](data/domains/ai-architect.json) | Foundation models, agents, reasoning, alignment, inference systems |
| [Space Builder](data/domains/space-builder.json) | Orbital mechanics, propulsion, mission design, space systems engineering |
| [Bio / Human Intelligence](data/domains/bio-human-intelligence.json) | Neuroscience, cognitive science, longevity, biosystems, performance |
| [Creator-Founder](data/domains/creator-founder.json) | Products, companies, creative systems, leverage, distribution |

---

## Ontology

A **node** can be one of:

| Type | Description |
|---|---|
| `domain` | A top-level field of knowledge |
| `concept` | A defined unit of understanding |
| `skill` | An applied capability |
| `tool` | A software or hardware instrument |
| `paper` | A research artifact |
| `dataset` | Structured data for research or training |
| `experiment` | A reproducible test or investigation |
| `artifact` | A public output demonstrating capability |
| `credential` | A verifiable evidence token |
| `open_problem` | An unsolved question or research gap |
| `contribution_task` | A concrete open quest for contributors |

An **edge** can be one of:

| Type | Semantics |
|---|---|
| `requires` | A must precede B |
| `unlocks` | Completing A makes B accessible |
| `applies_to` | A is used in the context of B |
| `evidenced_by` | A is demonstrated by B |
| `contributes_to` | A adds to B |
| `contradicts` | A challenges or refutes B |
| `updated_by` | A supersedes or revises B |
| `part_of` | A is a sub-component of B |
| `teaches` | A is an effective path for learning B |
| `tests` | A verifies or probes B |

See [ONTOLOGY.md](ONTOLOGY.md) for full specification.

---

## Contribution Guide

Everyone is welcome to contribute. Starlight Knowledge Tree is designed to grow through community research.

**What you can contribute:**

- New concepts, skills, tools, papers, or datasets
- Skill paths and learning sequences
- Experiment logs and reproducible notebooks
- Open problems and research gaps
- Contribution quests for others

**How to contribute:**

1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Use the [issue templates](.github/ISSUE_TEMPLATE/) to propose new nodes
3. Follow the [agent operating rules](docs/agent-operating-rules.md) if you are an AI agent
4. Validate your additions using `npm run validate` in the root

> ⚠️ **Privacy warning:** This is a public repository. **Never commit private health data, genetic data, biometric data, personal identifiers, or any data covered by GDPR/HIPAA.** The `bio-human-intelligence` domain covers scientific and population-level research only.

---

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the full plan.

| Phase | Goal |
|---|---|
| **0 — Foundation** | Repo structure, ontology, seed data, agent rules |
| **1 — Public Site** | Deploy knowledge graph viewer at `starlightintelligence.org/knowledge-tree` |
| **2 — Contribution Engine** | Issue templates, validation CI, community review |
| **3 — Live Graph** | Interactive skill path explorer, evidence ledger |
| **4 — SIS Integration** | Connect graph to SIS memory and MCP tools |

---

## Built on SIP

> *This repository is a vertical of the Starlight Intelligence Protocol (SIP). SIS/SIP attestation: pending.*

---

## License

[MIT](LICENSE)

---

## Structure

```
starlight-knowledge-tree/
  README.md
  ONTOLOGY.md
  ROADMAP.md
  CONTRIBUTING.md
  docs/
    manifesto.md
    architecture.md
    integration-with-sis.md
    contribution-model.md
    agent-operating-rules.md
  data/
    domains/          ← seed data for the four initial paths
    nodes/            ← concept, skill, tool, paper … node lists
    schemas/          ← Zod-compatible JSON schemas
  agents/             ← agent instruction files (Claude, Copilot, Cursor, Codex …)
  apps/web/           ← Next.js public site scaffold
  packages/
    graph-schema/     ← shared Zod schemas
    graph-utils/      ← shared graph traversal utilities
  .github/
    ISSUE_TEMPLATE/   ← contribution issue forms
    workflows/        ← CI validation
```
