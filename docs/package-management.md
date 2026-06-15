# Package Management

ProfDocs AI uses **pnpm** as the official package manager.

## Why pnpm

pnpm is selected because ProfDocs AI is structured as a monorepo and will contain multiple applications under `apps/`.

Initial applications:

```text
apps/web
apps/api
```

pnpm workspaces provide a clean way to manage dependencies across those applications while keeping the repository organized.

## Rules

Use pnpm for all dependency operations.

Allowed:

```bash
pnpm install
pnpm add <package>
pnpm add -D <package>
pnpm exec <command>
pnpm dlx <package>
```

Avoid:

```bash
npm install
npm install <package>
yarn
```

## Workspace File

The root workspace file is:

```text
pnpm-workspace.yaml
```

Initial content:

```yaml
packages:
  - "apps/*"
```

## Lockfile

The repository should track:

```text
pnpm-lock.yaml
```

The repository should not track:

```text
package-lock.json
yarn.lock
```

## Root Package

The root `package.json` is used for repository-level tooling:

- Husky
- Commitlint
- Shared scripts
- Future lint/test orchestration

Frontend and backend dependencies should belong to their own application folders once those apps are initialized.
