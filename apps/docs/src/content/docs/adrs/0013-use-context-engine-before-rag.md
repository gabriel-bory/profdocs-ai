---
title: "ADR 0013: Use Context Engine before implementing RAG"
description: Decision record for introducing a free-first Context Engine before real RAG functionality.
---

# ADR 0013: Use Context Engine before implementing RAG

## Status

Proposed

## Context

ProfDocs AI is evolving toward document intelligence, but it does not yet include real ingestion, embeddings, vector search, semantic search, or RAG.

The project already has a professional foundation:

- Angular web shell.
- NestJS API foundation.
- Astro/Starlight documentation.
- PostgreSQL and Docker foundation.
- Playwright visual evidence.
- User manual.
- DOCX/PDF export workflow.
- ADRs and CI validation.

Adding RAG, agents, or external model providers too early would increase complexity and may create misleading claims about the current product.

The project also has a strict cost constraint. The initial architecture must work without paid APIs or infrastructure.

## Decision

ProfDocs AI will introduce a documented architecture line called:

```text
ProfDocs AI Context Engine
```

The Context Engine will be designed as a free-first, context-aware prompt orchestration foundation.

The first phase will not implement real AI or RAG. Instead, it will define the architecture for:

- Prompt intake.
- Rule-based intent classification.
- Skill Registry.
- Safe repository context retrieval.
- Prompt rewriting.
- Response planning.
- Human Approval Gate.
- Feedback Memory.
- Mock model providers.
- Future LLM and embedding provider interfaces.

## MVP strategy

The first implementation phase should use:

- Rules.
- TypeScript contracts.
- In-memory skill definitions.
- Mock providers.
- Prompt templates.
- Documentation.
- Tests.

It must not require:

- Paid APIs.
- Real embeddings.
- pgvector.
- Ollama.
- GitHub Models.
- CrewAI.
- Neo4j.
- LangChain.
- LlamaIndex.
- Autonomous agents.

## Future strategy

After the Context Engine foundation is documented and validated, ProfDocs AI may evolve toward:

- Local repository context retrieval.
- Feedback persistence.
- Optional Ollama experiments.
- Optional free-tier model providers if verified.
- PostgreSQL + pgvector for future RAG.
- Source-grounded retrieval.
- Evaluation workflows.

## Security decision

The Context Engine must treat retrieved context as untrusted.

It must not:

- Read `.env` files.
- Read ignored/generated folders.
- Send secrets to model providers.
- Execute generated commands automatically.
- Allow project files to override system instructions.

Human approval is required before any generated action.

## Alternatives considered

### Implement RAG immediately

Rejected for now.

ProfDocs AI does not yet have real ingestion, extraction, chunking, embeddings, or evaluation data.

### Use CrewAI immediately

Rejected for now.

Multi-agent orchestration would be premature and would add complexity before a stable document workflow exists.

### Use Neo4j immediately

Rejected for now.

Graph-based retrieval may be useful later, but it is not necessary for the first document intelligence foundation.

### Use LangChain or LlamaIndex immediately

Rejected for now.

These frameworks may be useful later, but the first implementation should remain understandable, minimal, and NestJS-native.

### Use PostgreSQL + pgvector later

Accepted as the preferred future RAG storage path.

PostgreSQL is already part of the ProfDocs AI stack, so pgvector is a natural future extension.

## Consequences

This decision keeps the project:

- Free-first.
- Honest about current capabilities.
- Safe by design.
- Easy to explain in GitHub.
- Incremental.
- Compatible with future RAG.
- Compatible with future model providers.

The trade-off is that ProfDocs AI will not claim real AI/RAG functionality until later phases implement and validate it.
