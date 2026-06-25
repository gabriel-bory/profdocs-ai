---
title: "ADR 0022: Use Prompt Orchestrator contracts before runtime implementation"
description: Decision record for defining Prompt Orchestrator contracts before adding runtime behavior.
---

# ADR 0022: Use Prompt Orchestrator contracts before runtime implementation

## Status

Proposed

## Context

ProfDocs AI now documents a future Prompt Orchestrator as part of the Context Engine architecture.

The orchestrator is expected to coordinate:

```text
Prompt Intake
  -> Intent Classification
  -> Stack Report
  -> Skill Candidate Selection
  -> Skill Safety Policy
  -> Prompt Rewriting
  -> Response Planning
  -> Human Approval Gate
```

It would be risky to implement runtime behavior before defining stable contracts.

The backend is not yet implementing real Context Engine services.

The Angular app currently has a professional UI shell and mock/product study evidence, but it should not depend on a non-existing backend AI layer.

## Decision

ProfDocs AI will define **Prompt Orchestrator contracts** before implementing runtime services.

The first code-oriented phase after ADRs should focus on:

- TypeScript types,
- interfaces,
- DTOs,
- mock fixtures,
- validation expectations,
- tests,
- no real provider calls,
- no real RAG,
- no command execution.

## Suggested contract areas

Future contracts may include:

```ts
type PromptRequest = {
  id: string;
  userPrompt: string;
  projectArea?: ProjectArea;
  currentBranch?: string;
  allowedSources?: string[];
  deniedSources?: string[];
  riskMode: "safe" | "review-required";
};
```

```ts
type PromptIntent = {
  primaryArea: ProjectArea;
  secondaryAreas: ProjectArea[];
  confidence: number;
  riskLevel: "low" | "medium" | "high";
  rationale: string;
};
```

```ts
type ResponsePlan = {
  summary: string;
  selectedSkillId: string;
  contextSources: string[];
  excludedSources: string[];
  steps: string[];
  validationCommands: string[];
  suggestedCommitMessage: string;
  suggestedPrTitle: string;
  safetyNotes: string[];
};
```

## Angular implementation pattern

When the UI is implemented, Angular should follow the established frontend architecture direction:

- smart/container components orchestrate data and UI state,
- presentational components render typed inputs,
- Signals are used for local state when they simplify the flow,
- Angular Material/CDK provides the UI primitives,
- SCSS keeps styling maintainable,
- config-driven lists render repeated sections,
- shared wrappers are used only when they reduce duplication,
- Playwright captures visual evidence,
- no component executes shell commands,
- no component calls real providers directly.

The first Angular Context Engine UI should use mock data.

## Backend implementation pattern

Because backend functionality is not implemented yet, NestJS work should start with contracts and mock services.

The first backend step should not include:

- real model providers,
- real embeddings,
- RAG,
- pgvector integration,
- file mutation,
- command execution,
- autonomous agents,
- cloud deployment.

Recommended first backend direction:

- `context-engine` module contracts,
- DTOs,
- mock provider service,
- skill registry mock service,
- stack detector mock service,
- unit tests,
- no persistence requirement.

## Human Approval Gate

Every response plan must be treated as a suggestion.

The system may generate:

- plan summary,
- suggested commands,
- validation steps,
- suggested commit message,
- suggested PR title.

The system must not execute those suggestions automatically.

## Consequences

This decision makes the next implementation phase small, testable and honest.

It prevents the project from jumping directly into complex AI runtime behavior.

It also allows Angular and NestJS to evolve independently through typed contracts.

## Future direction

After contracts are documented and tested, ProfDocs AI may add:

- mock prompt orchestrator,
- rule-based skill candidate selector,
- local stack detector,
- mock provider responses,
- safe repo context retriever.

Real AI and RAG remain future phases.
