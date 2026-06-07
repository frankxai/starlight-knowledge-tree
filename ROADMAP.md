# Roadmap

Starlight Knowledge Tree is built in phases. Each phase ships a complete, usable foundation before the next begins.

---

## Phase 0 — Foundation ✅ (current)

**Goal:** Clean, public, well-documented foundation.

- [x] Repository structure and file hierarchy
- [x] README with thesis, architecture, and contribution model
- [x] ONTOLOGY.md — full node and edge type specification
- [x] Seed data for four initial domains
- [x] JSON schemas for nodes, edges, and paths (Zod-compatible)
- [x] Agent instruction files (Claude Code, Copilot, Cursor, Codex)
- [x] GitHub issue templates for contribution
- [x] CI validation workflow
- [x] Next.js web scaffold

---

## Phase 1 — Public Site

**Goal:** Deploy a live knowledge graph viewer.

- [ ] Deploy `apps/web` to Vercel at `starlightintelligence.org/knowledge-tree`
- [ ] `/` — manifesto and hero page
- [ ] `/tree` — visual overview of the full knowledge graph (Mermaid or D3)
- [ ] `/paths/ai-architect`, `/paths/space-builder`, `/paths/bio-human-intelligence`, `/paths/creator-founder`
- [ ] `/research` — root-node open problems and research radar
- [ ] `/contribute` — how to add nodes, paths, and quests
- [ ] `/about` — built on Starlight Intelligence Protocol

---

## Phase 2 — Contribution Engine

**Goal:** Make contribution fast and safe.

- [ ] GitHub issue form validation (auto-link to schema rules)
- [ ] Automated PR reviews for new node submissions
- [ ] Contribution leaderboard and quests dashboard
- [ ] Evidence submission guidelines and templates
- [ ] Peer review workflow for disputed edges

---

## Phase 3 — Live Graph

**Goal:** Make the graph interactive and queryable.

- [ ] Interactive skill path explorer (click through nodes)
- [ ] Evidence ledger — link skills to public artifacts
- [ ] Graph search (by concept, domain, tool, author)
- [ ] Mermaid-generated path diagrams auto-built from JSON
- [ ] Prerequisite chains and unlock maps

---

## Phase 4 — SIS Integration

**Goal:** Connect the public graph to Starlight Intelligence System infrastructure.

- [ ] SIS/SIP protocol attestation
- [ ] MCP tools for graph queries from agent sessions
- [ ] Vault-aware evidence storage (private progress, public graph)
- [ ] Agent-writable contribution paths
- [ ] Sovereign identity linkage (no centralized accounts required)

---

## Phase 5 — Research Radar

**Goal:** Track the frontier.

- [ ] Root-node problem registry with open research status
- [ ] Automated paper ingestion from arXiv, PubMed, and Semantic Scholar
- [ ] Research agent (see `agents/research-ingestion-agent.md`) for live graph updates
- [ ] Citation graph overlay on skill path nodes
- [ ] Contradiction detection — flag when new evidence challenges existing edges

---

## Non-Goals

These are explicitly out of scope for Starlight Knowledge Tree:

- **No LMS features.** No courses, no video hosting, no lesson plans.
- **No social network.** No user profiles, no follower counts.
- **No credential inflation.** No badges for watching content.
- **No private data.** No health records, biometrics, or personal identifiers.
- **No SIS rebuild.** This repo does not replicate SIS/SIP infrastructure.
