# ProfDocs AI

**Professional Document Intelligence Platform**

ProfDocs AI is a full-stack portfolio project focused on building a professional document intelligence platform with a clear path toward Retrieval-Augmented Generation, semantic search and AI-assisted document workflows.

The project is designed as a modern SaaS-style application where users will eventually be able to upload professional documents, process their content, create a private knowledge base and ask questions grounded in document sources.

## Current Status

**MVP 0.1 — Full-Stack Monorepo Foundation**

This version focuses on creating a clean and professional foundation before implementing real AI features.

MVP 0.1 includes:

* Public GitHub repository
* Professional README
* pnpm monorepo structure
* Angular 21 frontend application under `apps/web`
* NestJS backend application under `apps/api`
* Astro Starlight documentation site under `apps/docs`
* Docker Compose with PostgreSQL 18
* Initial documentation under `docs/`
* Documentation as code structure
* Product vision
* Architecture overview
* Roadmap
* Initial database model
* Development workflow documentation
* Package management documentation
* Initial Architecture Decision Records
* Environment example file
* Conventional Commits
* Husky + Commitlint

AI, embeddings, pgvector search, document ingestion and RAG will be introduced incrementally in later versions.

## Tech Stack

### Frontend

* Angular 21
* TypeScript
* Standalone components
* Dashboard-oriented UI foundation

### Backend

* NestJS
* TypeScript
* Modular architecture
* REST API
* Prisma planned

### Documentation Site

* Astro
* Starlight
* Markdown / MDX
* Documentation as code
* Light and dark mode
* Search support with Pagefind
* Architecture Decision Records

### Database

* PostgreSQL 18
* pgvector planned for semantic search

### DevOps

* Docker Compose
* Environment-based configuration
* GitHub project management
* pnpm workspaces
* Conventional Commits
* Husky + Commitlint

### AI / RAG Roadmap

* AI provider abstraction
* Text chunking
* Embeddings
* Vector search
* Retrieval-Augmented Generation
* Source references

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

* [Product Vision](docs/product-vision.md)
* [Architecture](docs/architecture.md)
* [Roadmap](docs/roadmap.md)
* [Database Model](docs/database-model.md)
* [Development Workflow](docs/development-workflow.md)
* [Package Management](docs/package-management.md)
* [Full-Stack Foundation](docs/fullstack-foundation.md)
* [Documentation Site](docs/documentation-site.md)

## Applications

| Application | Path        | Technology      | Purpose            |
| ----------- | ----------- | --------------- | ------------------ |
| Web         | `apps/web`  | Angular 21      | Product frontend   |
| API         | `apps/api`  | NestJS          | Backend REST API   |
| Docs        | `apps/docs` | Astro Starlight | Documentation site |

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

## Author

Built by **Gabriel Bory Prevez**

Full-stack Developer focused on Angular, TypeScript, Astro, NestJS, Java, Spring Boot, technical documentation and applied AI.

* GitHub: https://github.com/gabriel-bory
* LinkedIn: https://www.linkedin.com/in/gabriel-bory-prevez
