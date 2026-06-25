# ProfDocs AI

**Professional Document Intelligence Platform with Context Engine Architecture**

ProfDocs AI is a full-stack portfolio project focused on building a professional document intelligence platform with a safe, incremental path toward context-aware AI workflows.

The project is designed as a modern SaaS-style application where users will eventually be able to upload professional documents, process their content, create private knowledge bases, and interact with source-grounded assistance.

Beyond document intelligence, ProfDocs AI now includes a documented **Context Engine** direction. This future layer is designed to support prompt interpretation, local skill routing, safe context selection, prompt rewriting, human approval, mock provider workflows, and future Retrieval-Augmented Generation.

## Current Status

**MVP 0.1 — Full-Stack Monorepo Foundation + Context Engine Study**

This version focuses on building a clean, professional, and well-documented foundation before implementing real AI features.

Current work includes:

* Public GitHub repository
* Professional README
* pnpm monorepo structure
* Angular 21 frontend application under `apps/web`
* NestJS backend application under `apps/api`
* Astro/Starlight documentation site under `apps/docs`
* Docker Compose with PostgreSQL 18
* Documentation as Code
* Product and architecture documentation
* Architecture Decision Records
* Conventional Commits
* GitHub Actions
* GitHub Pages documentation deployment
* Professional app shell and dashboard-oriented UI foundation
* Playwright visual evidence
* User manual documentation
* DOCX/PDF manual export workflow
* Context Engine architecture study
* Context Engine UI study
* Free-first AI provider strategy
* Human Approval Gate architecture
* Prompt injection and context safety boundaries
* Secure local Skill Registry architecture study

Real AI, embeddings, pgvector search, document ingestion, Retrieval-Augmented Generation, real model providers, autonomous agents, local desktop automation, automatic skill installation, shell execution and cloud backend deployment are **not implemented yet**. They remain future roadmap or research-track capabilities.

## Product Direction

ProfDocs AI is intentionally evolving in small, verifiable steps:

```text
Document Intelligence Foundation
  -> Context Engine Architecture
  -> Secure Local Skill Registry
  -> Prompt Orchestrator Contracts
  -> Mock Provider
  -> Safe Repository Context Retriever
  -> Future RAG with PostgreSQL + pgvector
```

The long-term universal assistant vision is treated as a **research track**, not as the current product scope.

## Tech Stack

### Frontend

* Angular 21
* TypeScript
* SCSS
* Angular Material/CDK
* Standalone components
* Responsive product shell
* Dashboard-oriented UI foundation

### Backend

* NestJS
* TypeScript
* Modular architecture
* REST API foundation
* Future Context Engine contracts
* Future Mock Provider foundation

### Documentation Site

* Astro
* Starlight
* Markdown / MDX
* Documentation as Code
* Light and dark mode
* Architecture Decision Records
* Product studies
* User manual
* Visual evidence pages

### Database

* PostgreSQL 18
* Docker Compose for local development
* pgvector planned for future semantic search

### DevOps and Quality

* pnpm workspaces
* Docker Compose
* GitHub Actions
* GitHub Pages
* Playwright
* Conventional Commits
* Husky + Commitlint

### AI / Context Engine Roadmap

* Mock Provider as default
* Project Stack Detector
* Local Skill Registry
* Skill Manifest
* Skill Candidate Selector
* Skill Safety Policy
* Prompt Orchestrator
* Human Approval Gate
* Feedback Memory mock
* Safe Repo Context Retriever
* AI provider abstraction
* Future embeddings
* Future PostgreSQL + pgvector
* Future Retrieval-Augmented Generation

## Repository Structure

```text
profdocs-ai/
├── apps/
│   ├── web/
│   ├── api/
│   └── docs/
├── docs/
│   ├── product-vision.md
│   ├── architecture.md
│   ├── roadmap.md
│   ├── database-model.md
│   ├── development-workflow.md
│   ├── package-management.md
│   ├── fullstack-foundation.md
│   └── documentation-site.md
├── docker/
│   └── postgres/
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
├── .env.example
├── .gitattributes
├── .gitignore
├── commitlint.config.cjs
├── docker-compose.yml
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md
```

## Documentation

Core repository documentation:

* [Product Vision](docs/product-vision.md)
* [Architecture](docs/architecture.md)
* [Roadmap](docs/roadmap.md)
* [Database Model](docs/database-model.md)
* [Development Workflow](docs/development-workflow.md)
* [Package Management](docs/package-management.md)
* [Full-Stack Foundation](docs/fullstack-foundation.md)
* [Documentation Site](docs/documentation-site.md)

The Starlight documentation site contains the main product, architecture, ADR, manual and evidence pages.

## Applications

| Application | Path        | Technology      | Purpose            |
| ----------- | ----------- | --------------- | ------------------ |
| Web         | `apps/web`  | Angular 21      | Product frontend   |
| API         | `apps/api`  | NestJS          | Backend REST API   |
| Docs        | `apps/docs` | Astro/Starlight | Documentation site |

## Available Scripts

From the repository root:

```bash
pnpm build:api
pnpm build:web
pnpm build:docs
```

Development scripts:

```bash
pnpm dev:api
pnpm dev:web
pnpm dev:docs
```

## Architecture Principles

ProfDocs AI follows these principles:

* Document the architecture before implementing complex AI behavior.
* Keep the MVP free-first and local-first.
* Use Mock Provider before real model providers.
* Require Human Approval Gate before any action-oriented workflow.
* Treat retrieved context as untrusted.
* Do not index secrets or generated/dependency folders.
* Avoid autonomous execution.
* Keep Universal Assistant concepts as research until the product foundation is mature.

## Author

Built by **Gabriel Bory Prevez**

Full-stack Developer focused on Angular, TypeScript, Astro, NestJS, Java, Spring Boot, technical documentation and applied AI.

* GitHub: https://github.com/gabriel-bory
* LinkedIn: https://www.linkedin.com/in/gabriel-bory-prevez
