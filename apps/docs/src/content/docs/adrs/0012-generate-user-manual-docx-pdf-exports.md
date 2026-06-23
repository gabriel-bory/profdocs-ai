---
title: "ADR 0012: Generate user manual DOCX and PDF exports"
description: Decision record for generating downloadable Word and PDF versions of the ProfDocs AI user manual.
---

# ADR 0012: Generate user manual DOCX and PDF exports

## Status

Accepted

## Context

ProfDocs AI now includes a Starlight-based user manual with Playwright-generated visual evidence.

The manual is useful as a documentation site, but future users and reviewers may also need downloadable files, especially Word and PDF versions.

The project should avoid maintaining separate manual copies by hand. The web documentation should remain the canonical source.

## Decision

Generate DOCX and PDF exports from the Starlight user manual source.

The export workflow will use:

- MDX files in `apps/docs/src/content/docs/user-manual/` as the source of truth.
- Playwright-generated screenshots in `apps/docs/public/evidence/manual/`.
- A local export script in `scripts/docs/export-user-manual.mjs`.
- Generated files in `apps/docs/public/exports/`.

The expected generated outputs are:

```text
apps/docs/public/exports/ProfDocs_AI_User_Manual.docx
apps/docs/public/exports/ProfDocs_AI_User_Manual.pdf
```

## Consequences

This keeps the manual maintainable because the team edits the Starlight source and regenerates the downloadable files.

The export script is intentionally simple and local. It should not replace Starlight as the main documentation platform.

Future CI automation can be added after the export workflow is stable.
