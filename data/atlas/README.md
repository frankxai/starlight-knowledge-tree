# Starlight Atlas source records

This is the authored encyclopedia collection for a checked Atlas feature in the existing Starlight website. Formal portfolio Registry admission remains pending in `frankxai/agentic-ops` PR #231; the protected check has not executed successfully. Five initial entries are editorial research drafts. Evidence standing, inspection scope, versions and uncertainty remain separate from software release state and product registration.

`corpus.json` holds original short paraphrases, atomic claims, source metadata and coverage. `packages/atlas-contract` owns its provider-neutral validation/export contract. The implementation candidate in `frankxai/starlightintelligence.ai` PR #120 consumes a digest-checked projection pinned to a Git commit. Its production deployment must be verified separately before describing the reader as live. This repository's `apps/web` scaffold is not the consuming Starlight website and is not another source authority.

Run `npm run validate:atlas` to reject unsafe sources, dangling citations, duplicate IDs, missing scopes, uninspected metadata used as support, missing or corrupt prior revisions, and silent approval. Run `npm run test:atlas` for the adversarial contract/export/history checks. Both gates run in Validate Graph CI.

## Contribution

Use the Atlas correction issue form for a scoped source or claim improvement. For a PR:

1. Cite an accessible original source and the precise relevant section.
2. Separate the observation from its interpretation; retain limitations and counterevidence.
3. Preserve stable IDs. Increment a changed claim's revision and retain prior text in the revision history.
4. Record publication/version/access dates, source inspection mode and specific rights.
5. Keep authored records public-safe; add no publisher full text, private notes or third-party media.
6. Run graph and Atlas validation. A separate reviewer inspects the exact change before release.

A released reader is not scientific certification. This first editorial-draft contract rejects `independent_review: true`; it does not implement verification of scientific-review receipts. A later revision must model, verify and bind a real receipt to a precise claim/revision before enabling that promotion. Agent agreement or a receipt filename is insufficient. Physical/computational replication and field consensus need their own evidence.

Source update status uses the exact states exported as `ATLAS_SOURCE_UPDATE_STATUSES`; unknown, mixed-case and alias values are rejected. `retracted` and `withdrawn` support requires reassessment to `unresolved` or `contradicted_within_scope`. A detailed correction or version notice belongs in the recorded update-check scope/URL. Inspected arXiv/preprint citations remain separate from journal DOI/date metadata. Markdown and CSL exports retain source rights.

History validation covers its public metadata envelope, retained versions, ownership, references and dates. It checks the predecessor digest's format; it does not reconstruct or cryptographically verify a predecessor snapshot. Compare unchanged retained history and original source bytes through exact Git revisions during review. Do not present a well-formed digest as verified history by itself.

Retained `supported_within_scope` and `tentative` claims need a support edge, and no retained claim may use a currently metadata-only record as support. These checks use the retained source inventory; they do not reconstruct its historical inspection state. Current retracted/withdrawn sources require current claim reassessment. For prior revisions, a recorded `update_checked_on` on or before the prior claim's `last_source_checked_on` also requires reassessment; a later recorded status check preserves the earlier standing as historical text, without endorsing it today. Missing update-check chronology cannot authorize an unreassessed historical use. This comparison records editorial knowledge dates, not a verified notice effective date or proof of source validity at the time.

Existing historical source corpora, research methods and authored fictional canon retain their owners. Atlas references those sources rather than relocating them.

The existing repository `LICENSE` remains unchanged. The Atlas collection metadata is `not_assigned_pending_owner_review`; it does not ratify a license for the encyclopedia's authored content or the consuming website. Source-specific rights remain separate; publication here grants no redistribution rights to third-party material. The pending Registry request is linked above as a request, with no affirmative `admission_receipt` in the public corpus.

## Projection and export boundaries

`compileAtlas` and `validateAtlas` reject historical publication, update, issue, event, access, completed search, created-record, completed claim-check and completed editorial-review dates after `projection.compiled_on`. Future `next_review_on` values schedule work and remain allowed. A digest authenticates normalized bytes only; an exact source commit still needs separate release verification.

Search accepts `offset` as an integer from 0 through 10000 (the corpus bound), default 0, and `limit` from 1 through 50. Results retain corpus order and include `offset`, `total`, `next_offset` (number or null), and `truncated` (`offset + limit < total`). Pagination applies after the query/domain/lens filters. Markdown citation numbers follow the first claim mention of each source, with one definition per source and all individual evidence locators retained.

Keyword search indexes the claim and source inventories once per call, then follows each article's own claim/evidence/related-source references. Empty or whitespace-only queries filter articles directly without reading the evidence inventories. Regression checks count inventory accesses at the 10000-record bound instead of depending on a machine-specific timing threshold.

## Author metadata checked on 2026-10-13

Only bibliographic names were recorded; this check does not expand the original text-inspection scope or establish scientific review. Citation exports use literal author names so personal names and verified collective bylines are not guessed into family/given-name fields.

| Source | Primary author record | Recorded attribution |
| --- | --- | --- |
| Bennu paper | [Nature author list](https://www.nature.com/articles/s41561-025-01838-6) | All 14 authors, in publisher order |
| Pompeii paper | [Nature author list](https://www.nature.com/articles/s41467-025-66634-7), checked through publisher search indexing; [PubMed bibliographic record](https://pubmed.ncbi.nlm.nih.gov/41366210/) cross-check | All 11 authors, in publisher order; live publisher retrieval remains blocked by its cookie redirect |
| DESI inspected v3 paper | [Exact arXiv v3 metadata](https://arxiv.org/abs/2503.14738v3) | Verified collective author `DESI Collaboration`; no invented or truncated individual-author list |
| Saguaro inspected v2 paper | [Exact arXiv v2 metadata](https://arxiv.org/abs/2507.17738v2) | All 26 authors, in the inspected version's order |
| NASA LRD report | [NASA report byline](https://science.nasa.gov/missions/webb/nasa-webb-explores-family-tree-of-newly-discovered-distant-objects/) | `NASA Webb Mission Team` |
| MIT Pompeii report | [MIT report byline](https://news.mit.edu/2025/pompeii-offers-insights-ancient-roman-building-technology-1209) | Existing `Zach Winn` attribution rechecked |

Reports without an explicit retrievable author byline remain without a guessed author. The Webb paper remains a related record with abstract-only inspection and is not exported as claim evidence. Paper author metadata does not attach a published journal DOI/date to an inspected arXiv citation; those versions remain distinct.

