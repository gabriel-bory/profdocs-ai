---
title: "ADR 0015: Prefer PostgreSQL and pgvector for future RAG storage"
description: Decision record comparing PostgreSQL pgvector and external vector databases for ProfDocs AI.
---

# ADR 0015: Prefer PostgreSQL and pgvector for future RAG storage

## Status

Proposed

## Context

ProfDocs AI already uses PostgreSQL as part of its full-stack architecture.

Future RAG functionality will require storing document metadata, chunks, embeddings, retrieval events, feedback, and evaluation data.

The project could use an external vector database such as ChromaDB, or it could extend PostgreSQL with pgvector.

Because ProfDocs AI is a portfolio project with a cost-zero constraint, the first RAG storage path should minimize infrastructure complexity.

## Decision

ProfDocs AI will prefer PostgreSQL plus pgvector as the default future path for vector search and RAG storage.

ChromaDB, SQLite vector extensions, Neo4j, and other storage options will remain research alternatives.

No pgvector migration should be created until the project has a real ingestion and chunking workflow.

## Rationale

PostgreSQL plus pgvector is preferred because:

- PostgreSQL is already part of the stack.
- It reduces the number of services required.
- It keeps metadata, chunks, feedback, and embeddings close together.
- It is easier to explain in a full-stack portfolio project.
- It fits NestJS, Docker Compose, and future local development.
- It avoids introducing a second persistence layer too early.

## Non-goals

This ADR does not implement:

- pgvector.
- Embedding generation.
- Document ingestion.
- Chunking.
- Semantic search.
- RAG answer generation.
- Evaluation datasets.

## Alternatives considered

### ChromaDB

ChromaDB is useful for quick AI retrieval prototypes and may be a good research option.

It is not selected as the default now because it adds another service and another persistence model before ProfDocs AI has real ingestion.

### SQLite vector extensions

SQLite-based vector search may be useful for small local experiments.

It is not selected as the default because PostgreSQL is already present and better aligned with the product architecture.

### Neo4j

Neo4j may be useful for future graph-based retrieval and entity relationship modeling.

It is not selected now because graph retrieval would be overengineering before basic RAG exists.

### In-memory search

In-memory search is acceptable for Level 0 and early tests.

It is not a durable RAG storage strategy.

## Consequences

This decision keeps the future RAG architecture:

- Simple.
- Local-first.
- Cost-aware.
- Aligned with the existing stack.
- Easier to validate and document.

The trade-off is that ProfDocs AI will delay specialized vector database experimentation until there is a real need.
