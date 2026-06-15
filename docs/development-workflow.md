# Development Workflow

This document defines the development workflow for ProfDocs AI.

The goal is to keep the repository professional, consistent and easy to review from the first MVP.

## Package Manager

ProfDocs AI uses **pnpm** as the official package manager.

Reasons:

- Better fit for monorepos.
- Workspace support through `pnpm-workspace.yaml`.
- Faster and more disk-efficient dependency management.
- Clearer structure for future `apps/web` and `apps/api` packages.

Do not mix package managers in this repository.

Use:

```bash
pnpm install
pnpm add <package>
pnpm add -D <package>
pnpm exec <command>
pnpm dlx <package>
```

Do not use:

```bash
npm install
npm install <package>
yarn
```

## Monorepo Workspace

The repository will use a pnpm workspace with the following structure:

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

The initial `pnpm-workspace.yaml` should include:

```yaml
packages:
  - "apps/*"
```

## Commit Convention

ProfDocs AI follows the Conventional Commits specification.

Commit messages must use this structure:

```text
<type>(optional-scope): <short description>
```

Examples:

```text
docs: define project foundation
chore: add repository line ending rules
chore: add pnpm workspace configuration
feat(api): add health check endpoint
fix(web): correct dashboard card layout
refactor(api): simplify workspace service
test(api): add document chunking tests
```

## Allowed Commit Types

The initial allowed commit types are:

```text
feat
fix
docs
style
refactor
perf
test
build
ci
chore
revert
```

## Recommended Scopes

Scopes are optional, but recommended when they clarify the affected area.

Suggested scopes:

```text
api
web
docs
docker
db
rag
ai
auth
workspace
documents
chunks
config
github
```

Examples:

```text
feat(api): add workspace module
docs(architecture): describe RAG pipeline
chore(docker): configure PostgreSQL 18 service
feat(web): create dashboard shell
```

## Local Commit Enforcement

The project uses Husky and Commitlint to enforce commit message quality locally.

Tooling:

- Husky for Git hooks.
- Commitlint for validating commit messages.
- Conventional Commits as the message standard.
- pnpm as the package manager.

The `commit-msg` hook rejects commits that do not follow the required format.

## Setup Commands

From the repository root:

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm -v
pnpm init
pnpm add -D husky @commitlint/cli @commitlint/config-conventional
pnpm exec husky init
```

Remove the default pre-commit hook if it is not needed yet:

```bash
rm -f .husky/pre-commit
```

Create `commitlint.config.cjs`:

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

Create `.husky/commit-msg`:

```sh
pnpm exec commitlint --edit "$1"
```

## Testing Commitlint

Valid message:

```bash
echo "chore: test conventional commit setup" | pnpm exec commitlint
```

Invalid message:

```bash
echo "mensaje malo" | pnpm exec commitlint
```

The invalid message should fail.

## Branch Naming Convention

Use descriptive branch names:

```text
docs/project-foundation
chore/commitlint-husky
setup/fullstack-foundation
feat/api-health-check
feat/web-dashboard-shell
feat/document-ingestion
feat/minimal-rag
```

## Pull Request Rules

Each Pull Request should include:

- Clear title using Conventional Commit style.
- Summary of changes.
- Scope of the PR.
- Checklist.
- No unrelated changes.
- Documentation updates when needed.

## MVP 0.1 Workflow

For MVP 0.1, the recommended flow is:

```text
main
  └── docs/project-foundation
  └── chore/commitlint-husky
  └── setup/fullstack-foundation
```

## General Principles

- Keep commits small and meaningful.
- Do not mix unrelated changes.
- Prefer documentation updates in the same PR when architecture changes.
- Use Pull Requests even when working alone.
- Keep `main` stable.
