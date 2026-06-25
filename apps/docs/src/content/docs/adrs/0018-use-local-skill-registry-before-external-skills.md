---
title: "ADR 0018: Use Local Skill Registry before external skills"
description: Decision record for starting ProfDocs AI skills with a local, curated and reviewable registry.
---

# ADR 0018: Use Local Skill Registry before external skills

## Status

Proposed

## Context

ProfDocs AI is evolving from a document intelligence platform toward a safer Context Engine architecture.

The project now documents:

- Context Engine architecture.
- Context Engine UI study.
- Secure Local Skill Registry architecture.
- Rule-Based Stack Detector.
- Skill Safety Policy.
- Prompt Orchestrator.
- Human Approval Gate.
- Free-first provider strategy.

External skill ecosystems and agent-skill patterns are useful references, but adopting remote or executable skills too early would introduce unnecessary risk.

Risks include:

- supply-chain risk,
- unsafe remote skill installation,
- hidden scripts,
- prompt injection through skill instructions,
- secret exposure,
- dependency on external services,
- misleading claims about autonomous agents.

ProfDocs AI must stay credible, safe and free-first.

## Decision

ProfDocs AI will start with a **Local Skill Registry** before considering any external skill source.

The first Skill Registry must be:

- local,
- curated,
- versioned,
- inspectable,
- documentation-driven,
- rule-based,
- non-executable by default,
- compatible with Mock Provider workflows,
- guarded by the Human Approval Gate.

## Scope

The Local Skill Registry will describe skills such as:

- `angular-material-ui-review`
- `nestjs-api-architecture-review`
- `starlight-docs-review`
- `playwright-evidence-review`
- `context-engine-safety-review`
- `free-tier-deployment-review`

These skills will initially represent **reviewable instructions and contracts**, not executable agents.

## Frontend boundary

When the Skill Registry is later represented in Angular, the UI should follow the existing ProfDocs AI frontend direction:

- Angular 21 standalone components.
- Angular Material/CDK.
- SCSS.
- Signals where they simplify state.
- Smart/container components for orchestration.
- Presentational components for rendering.
- Typed configuration-driven lists.
- Shared UI wrappers where useful.
- No business logic hidden inside presentational components.
- No direct provider or shell execution from the UI.

## Backend boundary

The NestJS backend does not yet implement real Context Engine services.

Future backend work must start with:

- contracts,
- DTOs,
- interfaces,
- mock services,
- unit tests,
- no real provider calls,
- no RAG,
- no command execution.

## Consequences

This decision keeps the project safe and explainable.

It also delays remote skill adoption until the local model is proven.

That delay is intentional because the current priority is a professional foundation, not agentic execution.

## Rejected alternatives

### Use remote skills immediately

Rejected because it creates supply-chain risk and is unnecessary for the MVP.

### Install skills automatically

Rejected because it conflicts with the Human Approval Gate and free-first safety strategy.

### Use agent frameworks as the first implementation

Rejected because CrewAI, autonomous agents and similar frameworks are research-track concepts, not current product scope.

## Future direction

External skills may be studied later only if ProfDocs AI has:

- a manifest format,
- lock file or hash verification,
- manual review workflow,
- risk classification,
- denied-context enforcement,
- test coverage,
- Human Approval Gate enforcement.

Until then, all skills remain local and reviewable.
