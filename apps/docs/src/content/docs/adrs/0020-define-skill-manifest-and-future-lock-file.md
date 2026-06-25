---
title: "ADR 0020: Define Skill Manifest and future lock file"
description: Decision record for defining inspectable skill manifests and a future lock-file strategy.
---

# ADR 0020: Define Skill Manifest and future lock file

## Status

Proposed

## Context

The future ProfDocs AI Skill Registry needs a way to describe skills safely and consistently.

Without a manifest, skills can become vague instructions that are hard to review, test or secure.

Without a future lock-file concept, external or shared skills would be difficult to verify.

ProfDocs AI should define the manifest structure before implementing runtime skill behavior.

## Decision

ProfDocs AI will define a **Skill Manifest** concept before implementing runtime Skill Registry behavior.

A skill must declare:

- stable ID,
- name,
- version,
- description,
- project areas,
- triggers,
- allowed context,
- denied context,
- output contract,
- validation commands as suggestions only,
- risk level,
- provider mode,
- Human Approval Gate requirement.

## Conceptual manifest shape

```ts
type SkillManifest = {
  id: string;
  name: string;
  version: string;
  description: string;
  projectAreas: ProjectArea[];
  triggers: string[];
  allowedContext: ContextRule[];
  deniedContext: ContextRule[];
  outputContract: string;
  validationCommands: string[];
  riskLevel: "low" | "medium" | "high";
  requiresHumanApproval: boolean;
  providerMode: "mock" | "future-provider";
};
```

## Local-first rule

The first implementation should use local manifests only.

Remote manifest loading is out of scope for Level 0.

## Validation commands

Skills may suggest validation commands, but those commands must never be executed automatically.

Example:

```text
pnpm build:docs
pnpm build:web
pnpm build:api
```

These are suggestions for the user or CI, not autonomous actions.

## Future lock file

A future lock file may store:

- skill ID,
- version,
- source,
- hash,
- review status,
- approved date,
- allowed scope,
- risk level.

Conceptual shape:

```ts
type SkillLockEntry = {
  id: string;
  version: string;
  source: "local" | "future-remote";
  hash: string;
  reviewed: boolean;
  approvedAt?: string;
  riskLevel: "low" | "medium" | "high";
};
```

## Angular implementation boundary

The Angular UI may eventually show:

- skill cards,
- manifest details,
- allowed context,
- denied context,
- risk level,
- validation suggestions,
- approval status.

The UI should stay presentational where possible and receive typed view models from container components.

It must not:

- install skills,
- sync remote registries,
- execute scripts,
- call model providers,
- bypass user review.

## Backend implementation boundary

NestJS implementation must not start with dynamic execution.

It should start with:

- interfaces,
- DTOs,
- schema validation,
- local fixtures,
- mock registry service,
- unit tests.

No backend skill execution is allowed in the first implementation.

## Consequences

This decision makes future skill behavior more auditable and easier to test.

It also requires additional design work before implementation.

That is acceptable because ProfDocs AI is intentionally architecture-first.

## Future direction

The manifest format may later evolve into:

- JSON schema validation,
- generated documentation,
- local fixtures,
- unit tests,
- optional lock file,
- optional remote skill review workflow.
