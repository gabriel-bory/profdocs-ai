---
title: "ADR 0021: Keep Universal Assistant as research track"
description: Decision record for keeping the universal assistant vision separate from the current ProfDocs AI product scope.
---

# ADR 0021: Keep Universal Assistant as research track

## Status

Proposed

## Context

ProfDocs AI has a long-term vision that may eventually borrow patterns from universal assistant architectures.

That vision may include:

- local models,
- Ollama,
- source-grounded RAG,
- pgvector,
- ChromaDB research,
- Neo4j research,
- CrewAI research,
- local desktop agents,
- ephemeral execution environments,
- multi-domain workflows.

However, the current product is not a universal assistant.

The current product is:

```text
ProfDocs AI
Professional Document Intelligence Platform with Context Engine Architecture
```

The project has not implemented:

- real AI,
- embeddings,
- RAG,
- pgvector search,
- real model providers,
- autonomous agents,
- command execution,
- local desktop automation,
- cloud backend deployment.

## Decision

ProfDocs AI will keep the **Universal Assistant** idea as a research track, not as the current product identity or MVP scope.

The public positioning should remain:

```text
Professional Document Intelligence Platform with Context Engine Architecture
```

## Current product boundary

Current and near-term work should focus on:

- document intelligence foundation,
- documentation as code,
- Angular UI foundation,
- NestJS API foundation,
- Context Engine architecture,
- local Skill Registry,
- prompt orchestration contracts,
- mock provider,
- Human Approval Gate,
- future RAG path.

## Research-track boundary

Research-only concepts include:

- CrewAI,
- Neo4j,
- ChromaDB as a required store,
- local desktop agent,
- operating system automation,
- ephemeral containers,
- autonomous multi-agent workflows,
- universal multi-domain assistant behavior.

These may be studied later, but they must not be presented as current capabilities.

## Angular implication

The Angular product UI should not present ProfDocs AI as an autonomous assistant.

It may show future UI studies and mock previews, but they should be clearly labeled as:

- future concept,
- mock provider,
- not implemented yet,
- human approval required.

## Backend implication

The NestJS backend should not be designed as a universal agent runtime at this stage.

Backend work should remain incremental:

- DTOs,
- contracts,
- local mock services,
- rule-based selection,
- safe context retrieval,
- tests.

## Consequences

This decision protects the credibility of the repository.

It prevents overclaiming and keeps the roadmap technically realistic.

It also leaves space for research without making the MVP impossible to finish.

## Future direction

The Universal Assistant track may be revisited after ProfDocs AI has:

- working document ingestion,
- safe context retrieval,
- source-grounded responses,
- provider abstraction,
- tests,
- security boundaries,
- clear deployment strategy.

Until then, it remains a documented research direction.
