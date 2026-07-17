# Repository Instructions

This repo is part of the FrankX / Starlight / Arcanea agent estate.

## Classification

- Repo: starlight-knowledge-tree
- Class: tooling
- Default health command: `npm run build`
- Remote: https://github.com/frankxai/starlight-knowledge-tree.git

## What This Repo Is

An open intelligence graph (concepts, skills, tools, papers, experiments, open problems) with
seed data under `data/domains/` and `data/nodes/`, Zod schemas in `packages/graph-schema/`,
graph traversal utilities in `packages/graph-utils/`, a Next.js public-site scaffold in
`apps/web/`, and agent instruction files in `agents/`. See `README.md` for the full model and
`ONTOLOGY.md` for node/edge types.

## Real Commands (npm workspaces — this repo has no lockfile yet, run `npm install` before scripts)

- `npm run validate` — validates graph data via `packages/graph-utils`
- `npm run build` — builds all workspaces (also the CI/health check, see `.github/workflows/validate-graph.yml`)
- `npm run lint` — lints all workspaces (`--if-present`)
- `npm run dev` — runs the `apps/web` dev server

## Agent Rules

- Read this file before making changes.
- Preserve existing user work and unrelated dirty files.
- Keep edits scoped to the requested task.
- Prefer existing repo conventions over new abstractions.
- Run the health command before handoff when feasible.
- Do not publish secrets, private memory, credentials, or internal-only strategy.
- This is a **public** repo (MIT licensed) — never commit private health/genetic/biometric data
  or personal identifiers, per the privacy warning in `README.md`.

## Class-Specific Guidance

- Keep utility commands safe and documented.
- Validate scripts before recommending operational use.
- New knowledge/skill/tool nodes belong under `data/`, validated against `data/schemas/`.

## Handoff

Summarize changed files, validation run, risks, and any follow-up needed.

## Design Taste Kernel

For any site, app, landing page, dashboard, visual identity, brand, motion, media, social, or frontend task, apply the shared Design Taste Kernel before handoff:

- C:\Users\frank\starlight\repos\DESIGN_TASTE.md
- C:\Users\frank\starlight\repos\WEB_EXPERIENCE_STANDARD.md
- C:\Users\frank\starlight\repos\MOTION_TASTE_RUBRIC.md
- C:\Users\frank\starlight\repos\MULTI_AGENT_DESIGN_COUNCIL.md
- C:\Users\frank\starlight\repos\VISUAL_QA_GATE.md

When motion, scroll, generated media, GIF/video, or premium polish matters, route through the Motion Design Studio plugin/skills and verify the result visually.

