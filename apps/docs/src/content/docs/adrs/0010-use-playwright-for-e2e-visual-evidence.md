---
title: Use Playwright for E2E and visual evidence
description: Decision record for the ProfDocs AI Playwright foundation.
---

# ADR 0010: Use Playwright for E2E and visual evidence

## Status

Accepted

## Context

ProfDocs AI needs a professional testing foundation for the Angular web application. The project already has a visual shell, responsive navigation, light/dark mode, mock dashboard, mock document library, upload placeholder and AI/RAG preview placeholder.

The next quality milestone is to validate the current UI through automated browser tests without changing the Angular architecture. Playwright will also become the future foundation for user manual screenshots, visual evidence, responsive checks, accessibility checks and CI validation.

During the initial local setup, Playwright browsers could not be downloaded because of network timeouts. The project therefore uses the local Chrome installation temporarily on Windows. Video recording is disabled because the local Playwright browser dependency for ffmpeg is not available yet.

## Decision

Use Playwright as the E2E testing foundation for the Angular web app.

For the current foundation:

- Use the local Chrome channel on Windows when Playwright browsers are not available.
- Keep screenshots enabled on failure.
- Keep traces enabled on failure.
- Keep the HTML report enabled.
- Disable video temporarily with `video: 'off'`.
- Keep manual screenshot generation separate from the normal smoke suite.
- Reduce local parallelism to keep the Windows/Git Bash execution stable.
- Store generated documentation evidence under `apps/docs/public/evidence/manual` when it needs to be referenced directly by Starlight.
- Do not restructure Angular as part of this testing milestone.

## Consequences

Positive consequences:

- The project gets a first executable browser testing foundation.
- The current shell, navigation and theme behavior can be validated.
- Future documentation screenshots can be generated from the same testing foundation.
- CI integration becomes possible after local execution is stable.

Trade-offs:

- Video evidence is temporarily unavailable.
- Local Windows execution depends on an installed Chrome browser.
- Visual regression and accessibility checks remain future iterations.
- Manual screenshot generation is slower and runs separately from smoke tests.

## Follow-up

After stable local execution:

1. Add CI execution for Playwright.
2. Add a test domain architecture.
3. Add stable screenshot generation for Starlight documentation.
4. Add responsive viewport coverage.
5. Add accessibility smoke checks.
6. Add visual regression when the UI stabilizes further.
