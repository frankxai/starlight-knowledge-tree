# Knowledge Tree Production System

Status: design and operating contract, authored by Muse Code, 2026-10-20.
Proof mission owner: knowledge-proof team. Canonical profile lives in
starlight-agent-config at `core/teams/knowledge-proof-team.team-profile.json`
(one team identity estate-wide; this repo carries no duplicate profile).
Review state: unreviewed draft. Merges and public claims stay human-gated.

## What "live" means

Live means the reviewed canon is on `main` at one recorded commit and every
surface reads that canon. Nothing counts from a branch.

- Counts on `main` equal an approved manifest. Unreviewed nodes stay `seed`
  or `draft`. Humans only promote to `stable`.
- `npm run validate` green from a clean clone. Duplicate ids 0. Dangling
  edges 0. Absolute local paths in committed data 0. Private data 0.
- Exports (`export:notebooklm`, `export:dist`) run twice byte-identical.
  Every count in exported prose derives from loaded data. Rendered fields
  always exist on the record.
- MCP: every advertised tool and resource resolves. `query_benchmarks`
  returns every benchmark record. `resources/read` serves
  `starlight://master-canon`.
- Web routes render canon-derived counts. Every CTA resolves. The waitlist
  persists real rows in configured storage, or stays visibly closed. It
  never displays a count or position it did not read from storage.
- One independent exact-head review from a different harness closes the
  proof. The maker never checks its own work.

## Production pipeline

```text
issue (template) -> triage -> atomic branch agent/<harness>/<scope>
  -> draft PR -> validate + count guard + export diff + MCP smoke
  -> independent review (different harness) -> human gate (stable, publish)
  -> merge closes issue -> live node URL -> weekly numbers
```

- One node or one fix per PR. One writer per worktree. Team WIP cap: 3 open PRs.
- Required checks on every PR: `validate-graph`, `community-ci`, count guard.
- Receipts quote command output. A claim without output is a claim, not proof.

## Team operation

Roles, triggers, kill criteria, and renewal live in the team profile, not
here. Operating rules that bind every role:

- Proactive work starts from triggers (CI failure, new contribution issue,
  queue older than 7 days, count drift), not from chat ideas.
- Weekly numbers publish on the team lane: merged PRs, gate first-pass
  rate, revert rate, validated nodes merged, review queue median age,
  tokens per merged PR.
- Skills are procedures with owners. A skill without an eval ages out.
  Promotion needs an L2 judge eval with absolute numbers.
- Frank holds: stable promotion, publish, DNS, spend, pricing, external
  sends, legal and brand claims. Agents stage. Humans execute.

## GitHub-connected surface

- Contribution entry: issue templates `add-node`, `add-paper`,
  `add-skill-path`, `add-experiment`, `atlas-correction`, linked from the
  contribute page. The merge closes the issue.
- Distribution: master canon JSON, JSON Canvas for Obsidian, NotebookLM
  dossiers, MCP config pointing at the repo toolchain. All generated, all
  reproducible from `data/`.
- Landability rule: a repo counts as operable only when it has a sanctioned
  local home, a working required gate for the maker harness, and a
  maker-not-checker receipt path. Fix landability before scaling lanes.

## Later waves (entry conditions, not dates)

- Users: mentor-style next steps from canon. Entry: live canon plus a
  working contribution loop. No accounts, no LMS, no social features.
  Those stay non-goals.
- Contributors at scale: median issue-to-merge time published, evidence
  queue median under 7 days, second human gate holder named.
- Integrations: projections only, canon stays canonical. SIS consumption by
  MCP client after a negative test proves private data cannot reach KT
  exports. NotebookLM bundles carry provenance and node links. Canvas
  regeneration diff stays empty on unchanged canon. No write-back.
- Algorithms, in order: traversal and neighborhood behind fixtures, search
  ranking on a 50-query golden set with no-regression rules, scout
  ingestion scoring (seed-only output, schema-validated before any file
  changes), benchmark integrity (source, version, hash per record).
- Hosted MCP: migrate stdio to MCP spec 2026-07-28 stateless Streamable
  HTTP behind auth, proven by a bare conformance run. Stdio stays the
  local default until that run passes.

## Known limits at authoring

- Waitlist storage needs `KV_REST_API_URL` and `KV_REST_API_TOKEN` in the
  deployment. Until then signup fails closed by design.
- The community MCP server is not packaged. It runs from a checkout.
- Editorial review capacity decides the live node count. Shipping below
  the full candidate count at a reviewed manifest is a valid live state.
