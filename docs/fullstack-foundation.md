# Full-Stack Foundation

This document describes the initial full-stack foundation for ProfDocs AI.

## Scope

This foundation belongs to:

```text
MVP 0.1 — Project Foundation
```

The goal is to initialize the two main applications of the monorepo:

```text
apps/web  -> Angular 21 frontend
apps/api  -> NestJS backend
```

No real AI, RAG, authentication, document ingestion or database integration is implemented in this step.

## Monorepo Structure

```text
profdocs-ai/
├── apps/
│   ├── web/
│   └── api/
├── docs/
├── docker/
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

## Frontend Application

Location:

```text
apps/web
```

Technology:

- Angular 21
- TypeScript
- Angular Router
- CSS
- Standalone application structure

Current responsibility:

- Provide the initial frontend foundation.
- Prepare the project for a future SaaS-style dashboard.
- Serve as the future UI for workspaces, documents, ingestion and RAG chat.

## Backend Application

Location:

```text
apps/api
```

Technology:

- NestJS
- TypeScript
- Modular backend architecture
- REST API foundation

Current responsibility:

- Provide the initial backend foundation.
- Prepare the project for future modules such as health, workspaces, documents, chunks, RAG and AI provider abstraction.

## Package Manager

ProfDocs AI uses pnpm as the official package manager.

The monorepo is managed with:

```text
pnpm-workspace.yaml
```

Initial workspace packages:

```yaml
packages:
  - "apps/*"
```

## Recommended Root Scripts

The root `package.json` should expose scripts that make the monorepo easier to use:

```json
{
  "scripts": {
    "prepare": "husky",
    "commitlint": "commitlint --from HEAD~1 --to HEAD --verbose",
    "dev:web": "pnpm --filter web start",
    "dev:api": "pnpm --filter api start:dev",
    "build": "pnpm -r build",
    "build:web": "pnpm --filter web build",
    "build:api": "pnpm --filter api build"
  }
}
```

## Verification Commands

Backend build:

```bash
pnpm --filter api build
```

Frontend build:

```bash
pnpm --filter web build
```

Both builds should complete successfully before merging the branch.

## Next Steps

After this foundation is merged, the next technical step should be to add minimal health and app-info endpoints to the API and replace the default Angular starter content with a clean dashboard shell.
