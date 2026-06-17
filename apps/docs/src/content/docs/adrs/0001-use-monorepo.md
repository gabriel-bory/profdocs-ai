---
title: "ADR 0001: Use a Monorepo"
description: Decision record for using a monorepo structure.
---

## Status

Accepted

## Context

ProfDocs AI includes a frontend, backend and documentation site.

## Decision

Use a monorepo with the following structure:

```text
apps/web
apps/api
apps/docs
```

## Consequences

- Easier project review.
- Centralized documentation.
- Shared workflow.
- Simpler portfolio presentation.
