---
title: "ADR 0007: Use AI-assisted UI prototyping as design input"
description: "Record the decision to use Stitch and NotebookLM as design research inputs, not as direct implementation sources."
---

# ADR 0007: Use AI-assisted UI prototyping as design input

## Status

Accepted

## Context

ProfDocs AI is evolving from technical foundation into its first user interface implementation.

The project already has:

- Angular 21 for the web application.
- Angular Material as the selected design system.
- Astro Starlight for documentation.
- ADRs for architectural decisions.
- GitHub Actions CI.
- Documentation as code.

Stitch was used to generate exploratory UI concepts for web light mode, web dark mode and mobile. NotebookLM was used to review these outputs against internal documentation, UX/UI references, accessibility guidance and Angular Material implementation constraints.

The generated designs provide useful product direction, but they are not production-ready Angular code.

## Decision

ProfDocs AI will use AI-assisted design tools, including Stitch and NotebookLM, as **design research and prototyping inputs only**.

Generated design artifacts may inform:

- Visual direction.
- Layout decisions.
- Screen hierarchy.
- Responsive behavior.
- Component planning.
- Documentation.
- Future backlog.

Generated design artifacts must not be copied directly into the Angular application.

All implementation work must be rebuilt intentionally using:

- Angular.
- Angular Material.
- Project-owned CSS/layout patterns.
- Accessibility requirements.
- Existing project architecture.
- Documented ADRs.

## Consequences

### Positive

- Faster exploration of product UI directions.
- Better design discussion before implementation.
- Clearer separation between MVP features and future AI features.
- Better portfolio value through documented design reasoning.
- Lower risk of copying inconsistent generated code.

### Negative

- Additional documentation step before implementation.
- Generated designs may contain unrealistic or inconsistent details.
- Human review is required before accepting design decisions.

## Implementation guidance

The first Angular UI implementation should focus on:

- UI Shell.
- Toolbar.
- Sidebar.
- Light/dark themes.
- Dashboard mock.
- Document Library mock.
- Responsive behavior.
- Status chips.

The first UI implementation should not include:

- Real RAG.
- Real embeddings.
- Real vectorization.
- Real semantic chunks.
- Real source citation pipeline.
- External AI agents.
- FastAPI, CrewAI, Neo4j, webhooks or external automations.

## Related documents

- `docs/stitch-design-review-v1.md`
- `docs/ui-design-guidelines.md`
- `apps/docs/src/content/docs/product/stitch-design-review-v1.mdx`
- `apps/docs/src/content/docs/adrs/0005-use-angular-material-design-system.md`
