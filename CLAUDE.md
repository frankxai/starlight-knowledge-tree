# Claude Code / Agent Harness Map

This file provides the primary project map and command reference for Claude Code and compatible agent harnesses working on the **Starlight Knowledge Tree**.

## Project Map & Key Directories

- `data/domains/` – Seed data for initial capability paths (e.g., ai-architect, space-builder)
- `data/nodes/` – Lists of knowledge nodes (concepts, skills, tools, papers, etc.)
- `data/schemas/` – JSON schemas for data validation
- `packages/graph-schema/` – Zod schemas corresponding to knowledge nodes
- `packages/graph-utils/` – Utilities for graph traversal and validation
- `apps/web/` – Next.js public site scaffold (`npm run dev`)
- `agents/` – Agent instruction files for different personas (e.g., cartographer.md)
- `docs/` – Specifications, architecture, and protocol documents

## Installation & Commands

This is an npm workspace monorepo. It currently does not commit a lockfile.
**Always run `npm install` before running scripts.**

- **Install**: `npm install`
- **Build**: `npm run build` (builds all workspaces, used as the health check)
- **Validate Data**: `npm run validate` (validates graph data via `packages/graph-utils`)
- **Lint**: `npm run lint`
- **Validate Atlas Contract**: `npm run validate:atlas`
- **Test Atlas**: `npm run test:atlas` (Node's native test runner)

## Key Conventions

- **Data additions**: New knowledge, skills, or tools belong under `data/` and must validate against schemas in `packages/graph-schema/`.
- **Validation**: Always run `npm run validate` and `npm run build` to ensure your changes to the graph or tooling don't break health checks.
- **Privacy Hard Stop**: This is a public repository. NEVER commit private health, genetic, or biometric data, nor personal identifiers.
- **Secrets**: Do not touch auth, secrets, .env files, vercel.json, .github/workflows, or payment logic unless explicitly requested.

## Agent Rules Summary

Before proceeding, review [AGENTS.md](AGENTS.md) for the cross-harness operating contract.

- **One Agent = One Branch**: Keep work scoped to a single concern.
- **Preserve User Work**: Do not alter unrelated dirty files.
- **Do Not Publish Secrets**: No private memory, credentials, or internal strategy.
- **Handoff**: Summarize changed files, validation runs, risks, and follow-ups.
