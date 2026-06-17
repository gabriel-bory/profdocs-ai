---
title: "ADR 0002: Use pnpm Workspaces"
description: Decision record for pnpm workspaces.
---

## Status

Accepted

## Context

The repository contains multiple applications under `apps/`.

## Decision

Use pnpm workspaces as the official package management strategy.

## Consequences

- One lockfile.
- Workspace-aware commands.
- Better monorepo structure.
- Avoid mixing package managers.
