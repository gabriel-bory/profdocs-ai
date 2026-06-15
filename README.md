# ProfDocs AI

**Professional Document Intelligence Platform**

ProfDocs AI is a full-stack portfolio project focused on building a professional document intelligence platform with a clear path toward Retrieval-Augmented Generation, semantic search and AI-assisted document workflows.

The project is designed as a modern SaaS-style application where users will eventually be able to upload professional documents, process their content, create a private knowledge base and ask questions grounded in document sources.

## Current Status

**MVP 0.1 — Project Foundation**

This version focuses on creating a clean and professional foundation before implementing real AI features.

MVP 0.1 includes:

- Public GitHub repository
- Professional README
- Monorepo structure
- Angular 21 frontend foundation
- NestJS backend application
- Docker Compose with PostgreSQL 18
- Initial documentation under `docs/`
- Product vision
- Architecture overview
- Roadmap
- Initial database model
- Environment example file
- Dashboard shell or initial UI mock

AI, embeddings, pgvector search, document ingestion and RAG will be introduced incrementally in later versions.

## Tech Stack

### Frontend

- Angular 21
- TypeScript
- Standalone components
- Dashboard-oriented UI

### Backend

- NestJS
- TypeScript
- Modular architecture
- REST API
- Prisma planned

### Database

- PostgreSQL 18
- pgvector planned for semantic search

### DevOps

- Docker Compose
- Environment-based configuration
- GitHub project management

### AI / RAG Roadmap

- AI provider abstraction
- Text chunking
- Embeddings
- Vector search
- Retrieval-Augmented Generation
- Source references

## Repository Structure

```text
profdocs-ai/
├── apps/
│   ├── web/
│   └── api/
├── docs/
│   ├── product-vision.md
│   ├── architecture.md
│   ├── roadmap.md
│   └── database-model.md
├── docker/
│   └── postgres/
├── .github/
│   └── ISSUE_TEMPLATE/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── LICENSE
└── README.md
```

## Documentation

- [Product Vision](docs/product-vision.md)
- [Architecture](docs/architecture.md)
- [Roadmap](docs/roadmap.md)
- [Database Model](docs/database-model.md)

## Author

Built by **Gabriel Bory Prevez**

Full-stack Developer focused on Angular, TypeScript, Astro, NestJS, Java, Spring Boot, technical documentation and applied AI.

- GitHub: https://github.com/gabriel-bory
- LinkedIn: https://www.linkedin.com/in/gabriel-bory-prevez
