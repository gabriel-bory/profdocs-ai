# Architecture

ProfDocs AI follows a modular full-stack architecture designed to evolve gradually from a clean foundation into a Retrieval-Augmented Generation platform.

## MVP 0.1 Architecture

```text
Angular Web App
    |
    v
NestJS API
    |
    v
PostgreSQL 18 via Docker Compose
```

## Main Applications

### Frontend

Located in:

```text
apps/web
```

Responsibilities:

- Dashboard shell
- User interface
- Future document upload UI
- Future document preview UI
- Future RAG chat UI

### Backend

Located in:

```text
apps/api
```

Responsibilities:

- REST API
- Modular backend architecture
- Future document ingestion
- Future chunking pipeline
- Future RAG pipeline
- Future AI provider abstraction

### Database

PostgreSQL 18 will be used as the main database.

In MVP 0.3, pgvector will be added for vector similarity search.

## Planned Modules

The backend will gradually evolve into the following modules:

- Health module
- Workspaces module
- Documents module
- Chunks module
- RAG module
- AI provider module
- Conversations module
- Auth module

## Architectural Principles

- Start small
- Keep modules clear
- Document decisions
- Avoid premature complexity
- Keep AI provider integration abstract
- Build incrementally
- Prioritize maintainability over feature quantity

## Future Architecture Direction

Future versions may introduce:

- pgvector for semantic search
- AI provider abstraction
- PDF processing
- Conversation history
- Background jobs
- External integrations
- Worker services
- Agent-based workflows
