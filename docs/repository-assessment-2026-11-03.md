# Repository assessment — 3 November 2026

Inspected main at `2d98f7ae70c2fcb7ee676cc7ff5ca93d941e2607`.

## Verdict

A credible research prototype with a working public catalogue and unusually careful Atlas evidence boundaries. It is not yet a demonstrated learner capability system. Editorial scope has grown faster than complete learning paths and proof of learner outcomes. This is a code and data assessment, not a deployment, scientific-content or penetration-test certification.

| Dimension | Assessment | Evidence |
| --- | --- | --- |
| Data foundation | Useful, structured seed | 250 knowledge nodes, 14 domains, 7 benchmarks; 304 explicit edges |
| Learning completeness | Incomplete | 47 unresolved references across domain paths, seeds and root problems; 20 skill definitions; no artifact nodes |
| Evidence architecture | Strongest subsystem | Atlas normalization, revision history, claim support and public projection tests; scientific review cannot be fabricated by metadata |
| Public application | Buildable prototype | Root workspace build passes; generated search projection covers all 271 records |
| Capability proof | Undemonstrated | 20 `evidenced_by` edges are structural links, not proof of reviewed learner performance |
| Reproducibility | Needs release discipline | No committed dependency lockfile; CI resolves dependencies afresh |
| Release readiness | Not established | Next.js pinned to 14.2.0; installer flags it as vulnerable. Deployment state, abuse resistance and live integrations were not verified |

## Implemented evolution

`npm run health:graph` emits deterministic JSON covering type counts, duplicate identities across all canonical groups, domain membership, unresolved references and public search drift. It includes benchmarks, unlike the graph utility loader. CI blocks duplicate identities, invalid domains and stale public projections. Unresolved references remain visible backlog diagnostics; this change does not invent knowledge to make the report green.

Public projection validation compares identities and fields, including labels, descriptions, tags, domain, difficulty, type aliases and destinations. Equal totals no longer hide missing records, duplicates, substituted IDs or stale text. The existing generator remains independent so parity tests can detect its drift.

Both CI workflows now run the new regression suite. The graph workflow invokes root validation; the distribution workflow also runs existing schema, utility and Atlas tests. Script edits trigger graph validation.

## Next acceptance gates

| Priority | Deliverable | Acceptance evidence |
| --- | --- | --- |
| P0 | Dependency and release baseline | Upgrade the flagged Next.js dependency to a supported patched release, commit a reproducible lockfile, run advisory review, build and route smoke tests; verify a deployment at the exact revision |
| P1 | One complete AI Architect path | All path references resolve; every skill has a concrete exercise, artifact contract and explicit reviewer rubric |
| P1 | One capability proof | A consenting learner submits an artifact; review records the revision, rubric, limitations and decision; only approved public evidence enters this repository |
| P2 | Repair remaining path references | Health report unresolved count reaches zero through reviewed additions or explicit removal of invalid references |
| P2 | Measure usefulness | Track path starts, artifact submissions, reviewed completions and time to first useful artifact; report denominators and observation windows |

Do not prioritize more domains or a graph database before a learner completes the first proof loop. Keep private learner identity, raw submissions and consent records outside this public repository. Runtime authentication, review storage and SIS integration need a separate implementation boundary.

## Validation for this change

- Six graph-health regression tests passed.
- Existing Atlas, graph-schema and graph-utils suite: 42 tests passed.
- `npm run validate` and `npm run validate:atlas` passed.
- `npm run build` passed across all workspaces, including Next.js production compilation and route generation.
- No public deployment, learner outcome, live signup or independently reviewed scientific claim is asserted by these results.
