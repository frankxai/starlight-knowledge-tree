---
name: kt-mcp
description: Use when changing or testing the Starlight Knowledge Tree MCP server (scripts/starlight-knowledge-mcp.ts), its tools, resources, or shipped MCP config.
---

# KT MCP

The shipped server is a zero-daemon stdio JSON-RPC server over `data/`. Every advertised tool and resource must resolve. A tool that returns zero for data that exists is a defect, not an empty result.

## Conformance smoke

Start the server and speak JSON-RPC lines on stdin: `initialize`, `tools/list`, then `tools/call` for `query_benchmarks` and `search_graph`, then `resources/list` and `resources/read` for `starlight://master-canon`.

Pass bars:

- `query_benchmarks` returns every record in `data/benchmarks.json`. Benchmark records carry no `type` field in data. The loader tags them at load time. If the count is zero, the loader regressed.
- `resources/read` resolves every URI that `resources/list` advertises, or returns a named error explaining the missing build step. Method-not-found for an advertised capability is a failure.
- Tool descriptions derive counts from the loaded graph, never from literals (guard: `node scripts/verify-canon-counts.mjs`).

## Shipped config

Community config points at the repo toolchain (`npx tsx scripts/starlight-knowledge-mcp.ts` from a checkout). Never ship an absolute machine path or a package name that does not exist.

## Protocol posture

Current MCP specification is 2026-07-28 (stateless Streamable HTTP). This server still speaks the older stdio shape with protocolVersion 2024-11-05. That is compatible for local stdio clients today. The hosted HTTP migration is tracked backlog in `docs/production-system.md`. Do not claim current-spec conformance until a bare conformance run proves it.
