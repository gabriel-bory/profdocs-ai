---
title: "ADR 0006: Use GitHub Actions for CI"
description: Decision record for using GitHub Actions as the initial CI platform.
---

# ADR 0006: Use GitHub Actions for CI

## Status

Accepted

## Context

ProfDocs AI is hosted on GitHub and uses a pull request based workflow.

The project already includes:

- pnpm workspaces
- Angular frontend
- NestJS backend
- Astro Starlight documentation site
- Conventional Commits
- Husky + Commitlint

The repository needs an automated validation step to ensure that new pull requests do not break the monorepo foundation.

## Decision

Use GitHub Actions as the initial Continuous Integration platform.

The first CI workflow will validate:

- Dependency installation with pnpm
- API build
- Web build
- Documentation build

The workflow will run on pull requests targeting `main`, pushes to `main`, and manual dispatch.

## Consequences

Positive consequences:

- Pull requests will show automated build checks.
- The repository becomes more professional and reliable.
- Broken builds are detected before merging.
- The workflow stays close to the local development commands.
- The project gains a foundation for future testing, linting and deployment automation.

Trade-offs:

- CI runs may take time because the monorepo has multiple applications.
- The first workflow only validates builds, not tests or linting.
- GitHub Actions configuration must be maintained as tool versions evolve.

## Implementation Notes

The initial workflow should use:

- GitHub-hosted Ubuntu runner
- pnpm as package manager
- Node.js 22
- Frozen lockfile install
- Explicit build steps for API, web and docs

Future CI improvements may add:

- Linting
- Unit tests
- E2E tests
- Dependency review
- Security scanning
- Documentation deployment
