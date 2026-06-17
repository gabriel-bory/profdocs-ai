---
title: "ADR 0008: Use Angular frontend architecture baseline"
description: "Record the frontend architecture baseline for ProfDocs AI."
---

# ADR 0008: Use Angular frontend architecture baseline

## Status

Accepted

## Context

ProfDocs AI now has an Angular web application with:

- Angular 21.
- Angular Material/CDK.
- SCSS.
- Responsive app shell.
- Light/dark theme.
- Dashboard mock.
- Document Library mock.
- Upload placeholder.
- Future AI preview placeholder.

The project needs clear frontend architecture rules before adding real backend integration, authentication, upload processing, vector search or RAG functionality.

## Decision

ProfDocs AI will use a feature-based Angular frontend architecture with:

- `core` for application-level infrastructure;
- `shared` for reusable business-agnostic UI;
- `features` for domain-specific pages, UI and data-access;
- `styles` for global SCSS tokens, layout, Material overrides and accessibility helpers.

Feature pages will act as parent orchestrators.

Presentational components and shared wrappers must remain business-agnostic and should not call HTTP services or inject domain stores.

Angular Signals will be preferred for local reactive state. NgRx SignalStore may be introduced later when real feature state requires loading, error handling, caching and async workflows.

## Consequences

### Positive

- Clear frontend boundaries.
- Better maintainability as features grow.
- Easier transition from mocked UI to real data.
- Safer config-driven UI foundation.
- Better alignment with Angular standalone components.

### Negative

- More structure than a minimal demo.
- Requires discipline to avoid over-abstracting early.
- Some decisions remain deferred until real backend integration exists.

## Alternatives considered

### Flat component structure

Rejected because it would not scale beyond the MVP shell.

### Full NgRx Store/Effects from the beginning

Rejected for now because it would add boilerplate before real domain state exists.

### Generic CRUD generator

Rejected for now because ProfDocs AI needs controlled UI composition, not a universal screen generator.

## Validation

The baseline is validated by:

- existing Angular web build;
- existing responsive app shell;
- documentation as code;
- future config-driven list implementation;
- future API client and data-access foundation.
