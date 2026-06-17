---
title: "ADR 0009: Use config-driven UI and shared wrappers"
description: "Record the decision to use typed config-driven UI wrappers for repeated frontend views."
---

# ADR 0009: Use config-driven UI and shared wrappers

## Status

Accepted

## Context

ProfDocs AI will include repeated domain views such as:

- document lists;
- future workspace lists;
- future template lists;
- future upload queues;
- future processing states.

These views will likely share common patterns:

- page headers;
- search;
- filters;
- responsive table/card rendering;
- row actions;
- global actions;
- loading states;
- empty states;
- error states.

Duplicating these patterns in every feature would increase maintenance cost and create inconsistent UX.

## Decision

ProfDocs AI will introduce typed config-driven UI wrappers for repeated view patterns.

The first target will be list views.

The pattern will use:

- parent orchestrator pages per feature;
- typed configuration files per domain;
- shared wrappers for repeated layout;
- presentational UI components for smaller pieces;
- typed event outputs for user actions.

Shared wrappers must not:

- call HTTP;
- inject domain stores;
- contain business rules;
- execute strings as logic;
- render arbitrary HTML from configuration.

## Consequences

### Positive

- Less duplication across domains.
- More consistent UX.
- Easier future migration from mock data to API data.
- Better separation between domain decisions and shared rendering.
- Stronger foundation for accessibility and presentational security.

### Negative

- Requires careful type design.
- Can become over-engineered if applied too broadly.
- Some views should remain custom when they do not fit the pattern.

## Alternatives considered

### Fully custom pages for every domain

Rejected because repeated list/filter/action states would duplicate quickly.

### Remote JSON-driven screen rendering

Rejected because it increases security and maintainability risk at this stage.

### Fully dynamic forms and dashboards now

Deferred until there is a real need.

## Implementation guidance

Start with:

```text
shared/shells/config-driven-list-page/
features/documents/config/document-list.config.ts
```

Do not start with:

- dynamic forms;
- dynamic dashboards;
- remote-driven screen definitions;
- universal CRUD generation.

## Validation

The first validation will be a future branch:

```text
feat/web-config-driven-list-foundation
```

That branch should migrate part of the mocked Document Library into typed config while preserving the existing UI behavior.
