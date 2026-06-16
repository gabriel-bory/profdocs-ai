# CI Workflow

## Purpose

This document describes the initial Continuous Integration workflow for ProfDocs AI.

The goal of the CI workflow is to verify that the monorepo can be installed and built successfully before changes are merged into `main`.

## Scope

This workflow belongs to the project foundation stage.

It validates:

- pnpm dependency installation
- NestJS API build
- Angular web build
- Astro Starlight documentation build

It does not deploy the application yet.

## Workflow File

The CI workflow is defined in:

```text
.github/workflows/ci.yml
```

## Triggers

The workflow runs on:

- Pull requests targeting `main`
- Pushes to `main`
- Manual execution through `workflow_dispatch`

## Jobs

The initial workflow has a single job:

```text
build
```

This job runs on GitHub-hosted Ubuntu runners and performs the following steps:

1. Checkout repository
2. Install pnpm
3. Setup Node.js
4. Install dependencies with a frozen lockfile
5. Build the API
6. Build the web application
7. Build the documentation site

## Commands

The workflow validates the same build commands used locally:

```bash
pnpm build:api
pnpm build:web
pnpm build:docs
```

## Package Manager

The workflow uses pnpm as the only package manager.

The lockfile is treated as the source of truth:

```bash
pnpm install --frozen-lockfile
```

This helps detect dependency drift between `package.json` and `pnpm-lock.yaml`.

## Node.js Version

The workflow uses Node.js 22 to stay aligned with the local development environment used in the project foundation phase.

## Caching

The workflow enables pnpm dependency caching through the Node.js setup action.

This helps reduce install time across repeated CI runs.

## Current Limitations

The initial CI workflow does not include:

- Unit tests
- E2E tests
- Lint checks
- Format checks
- Security scanning
- Deployment
- Preview environments

These can be added incrementally in later workflow improvements.

## Future Improvements

Possible future additions:

- `pnpm test`
- `pnpm lint`
- Angular unit tests
- NestJS unit tests
- Starlight link checks
- Pull request preview deployments
- GitHub Pages deployment for documentation
- Dependency review
- CodeQL or security scanning
