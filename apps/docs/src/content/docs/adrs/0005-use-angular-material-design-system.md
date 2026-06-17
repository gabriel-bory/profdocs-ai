---
title: "ADR 0005: Use Angular Material Design System"
description: Decision record for using Angular Material as the main UI foundation.
---

## Status

Accepted

## Context

ProfDocs AI needs a professional, accessible and responsive user interface for a SaaS-style document intelligence platform.

The frontend is built with Angular 21, so the UI foundation should align with Angular best practices and remain realistic for implementation.

The project also needs a clear design system that supports:

- Dashboard layouts
- Document tables and cards
- Upload flows
- Status indicators
- Future RAG chat interfaces
- Light and dark mode
- Accessibility
- Responsive behavior

## Decision

Use Angular Material as the primary UI component foundation for the ProfDocs AI web application.

The design direction will follow a modern Material Design 3 inspired interface.

AI-assisted design tools such as Stitch may be used for visual exploration and prototyping, but generated designs will be reviewed and translated manually into Angular Material based implementation.

## Consequences

Positive consequences:

- Strong alignment with Angular
- Faster creation of consistent UI components
- Better accessibility baseline
- Easier light and dark theme support
- More realistic implementation path
- Professional dashboard-oriented interface

Trade-offs:

- The UI may look generic if Angular Material is used without customization
- A project-specific visual identity must still be defined
- Custom layout and spacing rules will be needed
- AI-generated designs must be adapted carefully before implementation

## Implementation Notes

The initial Angular UI should prioritize:

- Application shell
- Responsive navigation
- Dashboard cards
- Document status indicators
- Document library layout
- Upload flow
- Future RAG chat placeholder

The project should avoid implementing complex AI UI interactions before document ingestion and RAG foundations exist.
