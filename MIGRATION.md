# Graph migration ledger

## 2026-09-04 — Provenance and schema enforcement

| ID | Prior state | Migration | Reason |
|---|---|---|---|
| KTG-001 | Four domain nodes omitted the schema-required `domain` field | Added each node's own ID as its domain | Preserve the existing model while making data and schema agree |
| KTG-002 | `experiment-implement-miniGPT` violated the lowercase ID contract | Renamed to `experiment-implement-minigpt` | The old validator workflow never reached graph validation; no inbound references existed |
| KTG-003 | Specialist nodes could fall through the generic base schema | Generic node types now exclude paper, skill, open-problem, and contribution-task types | Prevent malformed research records from passing |
| KTG-004 | CI used npm cache/`npm ci` without a lockfile and packages used a non-npm workspace protocol | Removed lockfile-dependent caching, installs npm workspaces, and uses npm-compatible local workspace links | Restore an executable validation path |

No nodes were deleted. Unresolved edge targets remain warnings and require separate graph-completion work.
