# ADR-0001 — Namespaced Method Identity and Evidence-First Canon
**Status:** proposed; owner and independent review required. **Date:** 2026-11-09.

## Evidence and ownership
Reviewed [Registry authority](https://github.com/frankxai/agentic-ops/blob/main/registry/README.md), [artifact placement](https://github.com/frankxai/agentic-ops/blob/main/registry/artifact_authorities.yaml), [Knowledge Tree ontology](https://github.com/frankxai/starlight-knowledge-tree/blob/main/ONTOLOGY.md), [Research Intelligence OS agent rules](https://github.com/frankxai/research-intelligence-os/blob/main/AGENTS.md) and [Notion Founder OS audit](https://app.notion.com/p/40e26ac2b7f6816faab4dd57c500936e). The Knowledge Tree owns authored public encyclopedia records; Research Intelligence OS owns reusable research methods; private Empire Registry owns portfolio identity and policy. Existing graph node schema and Atlas corpus remain unchanged.

## Decision
Add a reversible sidecar **editorial method schema**, not a replacement for the existing graph schema or canonical Registry glossary. Immutable IDs use `method:<namespace>:<slug>`. Four STELLAR expansions are independent historical/proposed records; FLOW/WAVE/ACT expansions remain unresolved. Display-name aliases are not equivalence assertions. Supersession requires explicit directional reviewed links. Separate status, origin, evidence and rights.

## Source and rights contract
Record original source URI, source revision/hash where available, publisher/author, exact inspected locator, inspection scope, verified_at, license/rights, classification, tenant, extraction version, reviewer and contradictions. A URL without inspection is a **candidate source**, not a verified citation. All third-party methods require attribution. Do not ingest private notes or copyrighted source full text into public records.

## Agent behavior
Resolve namespace and ID before expansion. Search may return multiple conflicting STELLAR records. Never promote `proposed` or `historical_assumption` to approved automatically. For authority, rights, exclusions and accepted architecture, fetch exact reviewed Registry sources, never vector-only summaries. Source-linked proposals are not live deployment or publication.

## Alternatives
- New canonical ontology database: rejected, duplicate authority.
- Immediate mutation of generic concept-node schema: deferred, requires compatibility tests.
- Sidecar schema and 12 editorial seeds: chosen, reversible, no runtime changes.

## Acceptance / rollback
Validate 12 entries, distinct IDs, source locators, unverified flags and four disambiguated STELLAR interpretations. Independent bibliographic/rights review and owner naming decision before public publication. Rollback: remove sidecar proposal files; no migration needed. Later adapter may project approved entries into existing graph concept nodes.

Tracks [issue #527](https://github.com/frankxai/agentic-ops/issues/527).