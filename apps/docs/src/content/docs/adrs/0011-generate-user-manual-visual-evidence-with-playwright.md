---
title: Generate user manual visual evidence with Playwright
description: Decision record for automated user manual screenshots in ProfDocs AI.
---

# ADR 0011: Generate user manual visual evidence with Playwright

## Status

Accepted

## Context

ProfDocs AI uses Angular for the web app and Astro Starlight for documentation. The project already has a Playwright foundation capable of validating the app shell, navigation, theme behavior and manual screenshot generation.

The next documentation milestone is to create a user manual that evolves with the real application. Screenshots should not be manually pasted or maintained separately. They should be generated from the real UI through Playwright.

## Decision

Use Playwright to generate visual evidence for the Starlight user manual.

Manual screenshots will be:

- Generated from real Angular user flows.
- Stored under `apps/docs/public/evidence/manual`.
- Referenced from Starlight Markdown/MDX pages.
- Executed separately from smoke tests.
- Named deterministically according to screen, viewport and theme.

## Consequences

Positive consequences:

- Documentation stays aligned with the real UI.
- Screenshots can be regenerated after UI changes.
- The manual becomes part of the documentation-as-code workflow.
- CI can eventually generate documentation evidence before GitHub Pages deployment.

Trade-offs:

- Screenshot tests are slower than smoke tests.
- Visual evidence requires careful naming and cleanup.
- Generated images can increase repository or artifact size if committed without curation.

## Follow-up

1. Add CI execution for manual evidence after local workflow is stable.
2. Add more screenshots only when new product areas are implemented.
3. Add accessibility checks in a separate testing milestone.
4. Add visual regression after the UI stabilizes further.
