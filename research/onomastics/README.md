# Ancient Lexicon — Etymology, Phonetics & Naming Intelligence

**Status:** research seed; not published naming approval, not Arcanea canon. **Owner:** Starlight Knowledge Tree research vertical. **Date:** 2026-10-18.

## Purpose

Build a *source-grounded, reusable* lexicon for semantic search, language evolution, name generation and editorial storytelling across Starlight Intelligence, Arcanea, GenCreator and FrankX. Distinguish:
1. **Attested words**: historical lemmas with dictionary evidence and language/meaning context.
2. **Roots**: reconstructed proto-forms (asterisk denotes reconstruction, not surviving inscription); never conflated with attested words.
3. **Coined names**: newly invented blends with explicit provenance, independent of any etymological claim.
4. **Approved names**: authorized by each brand's registry, collision review and human owner. Seed lexemes are *not* this category.

## Key comparison

| Name | Lineage | Literal semantic field | Caution |
|---|---|---|---|
| **Sol** | Latin *sōl* ← PIE *sawel-* | sun, light | **LOCKED** as an Arcanea Godbeast; cannot mint a new Arcanea role with it |
| **Argon** | Modern Latin (1894) ← Ancient Greek *argós* (a- 'without' + *ergon* 'work') | inactivity/inertness | New scientific coinage from ancient roots; ironic choice for a productive agent |
| **Opus** | Latin *opus* ← PIE *op-* | work, creation | Unlike *ergon*, not the same reconstructed root |

Reference records: [Sol](https://www.etymonline.com/word/sol), [Argon](https://www.etymonline.com/word/argon), [Opus](https://www.etymonline.com/word/opus).

## Source files

- `lexemes.seed.json`: 41 editorial seed records, 11 with linked source checks and 30 provisional research candidates.
- `lexemes.schema.json`: deliberately independent from the Knowledge Tree node schema; use only after normalization and evidence audit.
- `NAMING_AGENT.md`: reproducible research and creative approval protocol.

## Brand registers

- **Starlight Intelligence:** precise, compact, scientific, luminous; prioritize knowledge and actual system capability over mysticism.
- **GenCreator:** invention, artistic practice, expression, constructive flow; energetic but not generic AI jargon.
- **FrankX:** philosophical clarity, rigorous thought, music, human meaning; editorial and memorable.
- **Arcanea:** cinematic, mythic and culturally layered *inside established phonological registers*. Real-world roots are research material, **not** permission to invent, rename or canonize a God, Godbeast, Guardian, place or title.

**Mandatory Arcanea dependency:** [Arcanea Naming Registry](https://github.com/frankxai/arcanea/blob/main/.arcanea/lore/NAMING_REGISTRY.md) is marked **STAGING**, while [CANON_LOCKED](https://github.com/frankxai/arcanea/blob/main/.arcanea/lore/CANON_LOCKED.md) governs locked entities. Arcanea agent-created names require existing registry rules, sound-family and edit-distance checks, the G-test, superseded-name review and explicit creator canon approval. This research pack neither overrides nor supersedes them.

## Data sourcing roadmap (do not blindly import)

| Source | Use | Status / reuse |
|---|---|---|
| [Etymonline](https://www.etymonline.com/) | human-checked etymology and root notes | Cite URLs; do not scrape and republish full prose |
| [Kaikki / Wiktextract](https://kaikki.org/dictionary/rawdata.html) | multilingual lexemes, senses, inflections, pronunciations | Integrate selectively with Wiktionary attribution/share-alike review; large exports are unnecessary for first release |
| [Wikidata Lexemes](https://www.wikidata.org/wiki/Wikidata:Lexicographical_data/en) | multilingual lexical entity, form and sense identifiers | Inspect statement-level provenance, coverage and licensing |
| [CMUdict](https://github.com/cmusphinx/cmudict) | English phoneme sequence and stress features | English pronunciations only; not ancient-language authority |
| [CLTK](https://cltk.org/) | classical language NLP, Latin/Greek morphological processing | Inspect module/corpus licenses individually |
| [ConceptNet](https://github.com/commonsense/conceptnet5/wiki/Copying-and-sharing-ConceptNet) | semantic relationships, analogy and concepts | CC BY-SA 4.0 obligations; isolate from proprietary datasets where licensing matters |

**Do not ingest an unrestricted multilingual corpus into a public MIT-licensed repo.** Dataset licenses and confidence travel with every imported record; indexes should store source identifiers, provenance and transformations.

## Graph interfaces — next implementation slice

```
Lexeme -> (attested_in) Language
Lexeme -> (derived_from) HistoricalRoot
Lexeme -> (related_to) Concept
Lexeme -> (pronounced_as) Pronunciation
CoinedName -> (inspired_by) Lexeme
CoinedName -> (proposed_for) BrandNamespace
CoinedName -> (screened_against) Registry + Trademark + Domain
ApprovedName -> (authorized_by) BrandOwner
```

Treat `attested_in`, `derived_from` etc. as **proposed future lexicon graph edges**: they are not registered edge types in `ONTOLOGY.md` today. Implement a separate typed extension or graph schema migration before emitting nodes/edges into the Knowledge Tree production graph. Do not falsely claim graph integration.

## Agent-backed product direction

A **Naming Studio** should generate three different *strategies*, not 100 near-duplicate random names: (1) authentic historical words, (2) carefully engineered new composites, (3) novel phonotactic inventions. Return source provenance, IPA/voice test when verified, register conformity, web and trademark clearance status, and a human-review gate. Integrate with Figma brand naming explorations, narrative concept cards, voice performances and agent registry metadata only after review.

## Editorial rules

- Source status `checked` = source URL manually identified and meaning paraphrased; **not** peer-reviewed linguistic certainty or cleared IP.
- `provisional_needs_dictionary_review` records have intentionally **empty sources**, no asserted proto-root, and are excluded from automated approved-name output.
- Preserve polysemy and sensitive religious/cultural associations.
- Explicitly distinguish a *modern invented form derived from ancient words* from an *authentic ancient word*.
- Keep all candidate product names under collision, trademark, and pronunciation checks. A public word's age does not imply availability as a brand.

## Acceptance criteria for a future production PR

- Expand verified Latin/Greek corpus with cited lexeme/sense IDs.
- Add IPA and phonotactic feature extraction (language-aware; no fabricated pronunciations).
- Implement lexical search by intent/sound/etymology, similarity and collision checks.
- Include clear licensing and provenance in the UI.
- Pass Arcanea named-entity registry checks, reviewed by owner for canon changes.
