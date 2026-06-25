---
title: "ADR 0019: Use Rule-Based Stack Detector before AI skill selection"
description: Decision record for detecting project technologies with deterministic rules before using AI-based selection.
---

# ADR 0019: Use Rule-Based Stack Detector before AI skill selection

## Status

Proposed

## Context

The future ProfDocs AI Context Engine should select relevant skills based on the current project stack.

For this repository, the known stack includes:

- Angular 21.
- TypeScript.
- SCSS.
- Angular Material/CDK.
- NestJS foundation.
- Astro/Starlight documentation.
- PostgreSQL 18 with Docker Compose.
- Playwright visual evidence.
- GitHub Actions.
- GitHub Pages.
- pnpm workspaces.
- Documentation as Code.
- Architecture Decision Records.

A future system could use AI to infer this stack, but that would be unnecessary for the first implementation.

The stack can be detected through deterministic files such as:

- `package.json`
- `pnpm-workspace.yaml`
- `angular.json`
- `apps/docs/astro.config.mjs`
- `playwright.config.ts`
- `docker-compose.yml`
- `.github/workflows/`

## Decision

ProfDocs AI will use a **Rule-Based Stack Detector** before any AI-based skill selection.

The detector should inspect safe project files and produce an explainable stack report.

It must not require:

- real AI providers,
- embeddings,
- RAG,
- remote services,
- external skill registries.

## Expected output

A future stack report may include:

```ts
type ProjectStackReport = {
  packageManager: "pnpm" | "npm" | "yarn" | "unknown";
  frontend: string[];
  backend: string[];
  documentation: string[];
  database: string[];
  testing: string[];
  ci: string[];
  architecturePractices: string[];
  confidence: "low" | "medium" | "high";
  evidence: StackEvidence[];
};
```

## Stack evidence

Every detected technology should have explainable evidence.

```ts
type StackEvidence = {
  technology: string;
  sourceFile: string;
  matchedSignal: string;
  confidence: "low" | "medium" | "high";
};
```

## Angular implementation boundary

A future Angular UI for stack detection should not call real AI.

It should first consume mock or local reports and render them with:

- smart/container components,
- presentational cards,
- typed view models,
- signals for local UI state,
- Material/CDK UI primitives,
- config-driven lists,
- no shell execution buttons,
- clear “future concept” and “mock data” labels where needed.

## Backend implementation boundary

Backend implementation should come later and should start with:

- safe file-reading contracts,
- denied path rules,
- DTOs,
- tests,
- mock reports,
- no mutation,
- no command execution,
- no provider calls.

## Denied sources

The detector must not inspect:

- `.env`
- `.env.*`
- `.git`
- `node_modules`
- `dist`
- `coverage`
- `playwright-report`
- `test-results`
- private keys
- credentials
- generated temporary files

## Consequences

This decision makes stack detection:

- free,
- testable,
- explainable,
- suitable for CI,
- independent from model providers,
- safer for early implementation.

The trade-off is that rule-based detection may be less flexible than AI-based classification.

That is acceptable for the MVP because ProfDocs AI currently targets a known monorepo stack.

## Future direction

AI-based skill selection may be considered later only after the rule-based baseline exists and is covered by tests.

AI may assist, but it must not replace explicit evidence and safety rules.
