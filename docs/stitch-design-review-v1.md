# Stitch Design Review v1

## Status

Accepted as a design direction draft. Not accepted as production implementation.

## Summary

This document records the first design review of the Stitch-generated UI concepts for **ProfDocs AI**.

The Stitch output is useful as a visual exploration for a professional document intelligence platform, but it must not be copied directly into the Angular application. The design should be translated into an accessible, maintainable, Angular Material-based UI.

The recommended strategy is:

- Use Stitch as visual inspiration.
- Keep the professional SaaS dashboard direction.
- Keep light and dark mode as a core design requirement.
- Keep the document workflow as the center of the product.
- Treat RAG chat, semantic chunks, source citations and confidence scores as future previews.
- Implement the first Angular UI incrementally, starting with UI Shell and Document Library.

## Design context

ProfDocs AI is a professional document intelligence platform. The product will allow users to upload documents, process them, build a private knowledge base and later ask questions grounded in document sources using Retrieval-Augmented Generation.

The current technical foundation is:

- Angular 21 in `apps/web`.
- Angular Material as the UI component system.
- NestJS in `apps/api`.
- PostgreSQL 18, with pgvector planned later.
- Astro Starlight in `apps/docs`.
- pnpm workspaces.
- GitHub Actions CI.
- Documentation as code.
- ADR-driven technical decisions.

The current product phase does not include real AI/RAG implementation yet. The UI may show the future direction, but it must not imply that real document processing, vector search or grounded chat already exist.

## Sources reviewed

The review was based on:

- Stitch web light design.
- Stitch web dark design.
- Stitch mobile design.
- NotebookLM design analysis.
- Internal ProfDocs AI documentation.
- ADR 0005: Angular Material Design System.
- UI design guidelines.
- Product vision and roadmap.
- Accessibility and usability references used in the NotebookLM review.
- UX/UI concepts from Jon Mircha materials included in the NotebookLM sources.

## Main decision

ProfDocs AI should not implement the full Stitch design immediately.

Instead, the project should document the design direction and then implement a controlled Angular Material MVP.

The first UI implementation should include:

1. UI Shell.
2. Toolbar.
3. Sidebar on desktop.
4. Mobile navigation.
5. Light/dark theme toggle.
6. Dashboard with mock metrics.
7. Document Library with mock document states.
8. Status chips.
9. Responsive layout.

The first implementation should not include real RAG, real vectorization, real semantic chunking or real source citations.

## What to keep from Stitch

| Element | Decision | Reason |
| --- | --- | --- |
| Professional SaaS dashboard layout | Keep | It fits the product and portfolio goal. |
| Light and dark mode | Keep | It shows product maturity and supports long work sessions. |
| Indigo / deep blue / slate direction | Keep | It supports a technical and trustworthy identity. |
| Knowledge Base Readiness Score | Keep | It provides professional gamification and system visibility. |
| Document Library with status states | Keep | It is central to the product workflow. |
| Upload pipeline visualization | Keep as mock/preview | It explains future processing stages without implementing them yet. |
| Technical metadata styling | Keep | IDs, logs and processing details strengthen the technical product feel. |
| RAG chat layout | Keep as future preview | It communicates vision, but must not be represented as implemented. |
| Mobile cards | Keep | Cards are better than dense tables on mobile. |

## What to modify

| Element | Required change | Priority |
| --- | --- | --- |
| Chat RAG screens | Mark clearly as Future Preview or Coming Soon. | High |
| Semantic chunks and confidence scores | Treat as mock/future data, not real processing. | High |
| Mobile document library | Use cards, large touch targets and reduced density. | High |
| Status chips | Use icon + label, never color alone. | High |
| Spacing | Normalize around an 8px spacing system. | Medium |
| Dark mode text | Check secondary text contrast carefully. | High |
| Light/dark/mobile consistency | Align metrics, labels and information hierarchy across variants. | Medium |
| Angular implementation | Rebuild with Angular Material components, not copied Stitch code. | High |

## What to avoid

- Do not copy generated Stitch code directly.
- Do not implement real RAG in the first UI phase.
- Do not add FastAPI, CrewAI, Neo4j, agents, webhooks or external automations.
- Do not make the interface look like production AI processing already works.
- Do not use color as the only status indicator.
- Do not use dense tables on mobile.
- Do not rely on heavy shadows for depth.

## Accessibility requirements

The UI implementation must prioritize:

- Sufficient contrast in light and dark mode.
- Visible focus states.
- Keyboard navigation.
- Touch targets appropriate for mobile.
- Labels and icons together for status indicators.
- Clear empty states.
- Text that remains legible on dark backgrounds.
- Avoiding color-only meaning.

## Angular Material mapping

| UI area | Angular Material components |
| --- | --- |
| App shell | `mat-sidenav`, `mat-toolbar` |
| Navigation | `mat-nav-list`, `mat-icon`, `mat-button`, `mat-icon-button` |
| Dashboard metrics | `mat-card`, `mat-progress-bar`, `mat-chip` |
| Document Library | `mat-table`, `mat-form-field`, `mat-input`, `mat-select`, `mat-chip`, `mat-menu` |
| Mobile document cards | `mat-card`, `mat-chip`, `mat-button`, `mat-menu` |
| Upload preview | `mat-card`, `mat-progress-bar`, `mat-button`, `mat-snack-bar` |
| Dialogs and confirmations | `mat-dialog` |
| Tooltips | `mat-tooltip` |
| Future RAG placeholder | `mat-card`, `mat-tabs`, custom layout CSS |

Angular Material should provide the component baseline, while CSS Grid/Flexbox should handle the page layout and responsive dashboard structure.

## Recommended visual system

### Color direction

- Primary: deep indigo / blue.
- Neutral: slate and soft gray.
- Dark mode base: deep navy.
- Dark surfaces: charcoal / elevated navy.
- Accent: subtle cyan or emerald.
- Status:
  - Uploaded: blue.
  - Processing: amber.
  - Ready: green.
  - Failed: red.

### Typography

- Main UI font: a clean sans-serif compatible with professional SaaS products.
- Technical metadata: monospace font such as JetBrains Mono.

### Spacing

Adopt an 8px spacing scale:

- 4px: micro adjustment.
- 8px: compact spacing.
- 16px: default spacing.
- 24px: section spacing.
- 32px: major layout spacing.
- 48px: page-level separation.

### Shape and depth

- Main cards: moderate radius.
- Smaller controls: smaller radius.
- Prefer tonal layering over heavy shadows.
- Use borders and surface tone shifts for separation.

## Recommended backlog

### Phase 1 — UI Shell

- App shell.
- Desktop sidebar.
- Top toolbar.
- Theme toggle.
- Responsive layout foundation.
- Mobile navigation placeholder.
- Basic routes.

### Phase 2 — Dashboard mock

- Total documents.
- Ready documents.
- Processing documents.
- Failed documents.
- Knowledge Base Readiness Score.
- Recent documents.
- First-user empty state.

### Phase 3 — Document Library mock

- Static mock document list.
- Status chips.
- Search input.
- Status filter.
- Desktop table.
- Mobile cards.
- View details placeholder.

### Phase 4 — Upload Flow placeholder

- Upload card.
- Supported formats.
- Mock upload queue.
- Mock processing pipeline.
- Success/error states as UI-only behavior.

### Phase 5 — Future RAG placeholder

- Future preview label.
- Chat layout mock.
- Source panel mock.
- Selected document context.
- Clear non-production messaging.

## Minimum implementation scope

The minimum Angular implementation with the highest portfolio value and lowest technical risk is:

- UI Shell.
- Light/dark themes.
- Dashboard mock.
- Document Library mock.
- Responsive desktop/mobile behavior.
- Status chips and basic interaction states.

This shows architecture, product thinking and UI maturity without requiring real AI, ingestion, embeddings or vector search.

## Decision

Use the Stitch output as a design exploration and translate it into a disciplined Angular Material implementation.

The next design iteration should reduce mobile density, clearly separate MVP from future AI features, improve accessibility and make all screens more consistent across light, dark and mobile variants.

## Stitch v2 follow-up

After the first review, Stitch was asked to generate a cleaner v2 focused on an implementable Angular Material MVP.

The v2 output is a better fit for the project because it introduces or reinforces:

- Clearer separation between MVP screens and future AI/RAG capabilities.
- Dedicated dashboard variants for light, dark and mobile.
- Dedicated Document Library variants for light, dark and mobile.
- Mobile card-based document lists instead of dense mobile tables.
- AI Chat screens explicitly framed as a future preview.
- Upload screens that can be treated as UI-only placeholders before real ingestion exists.
- Stronger alignment with the planned implementation path: UI Shell, Dashboard mock, Document Library mock and Upload placeholder.

### Accepted v2 improvements

| Area | Decision |
| --- | --- |
| Dashboard | Use v2 as the preferred visual reference for the first Angular dashboard mock. |
| Document Library | Use v2 as the preferred reference for desktop table and mobile card behavior. |
| Mobile | Prefer the v2 mobile direction because it reduces table density and supports bottom navigation. |
| AI Chat | Keep only as a Future Preview / Coming Soon screen. |
| Upload | Keep as placeholder UI with mock progress, not real document processing. |
| Theming | Preserve both light and dark mode as first-class requirements. |

### Remaining cautions

Even after v2, the implementation must remain conservative:

- Do not copy Stitch HTML/CSS directly.
- Do not implement real RAG yet.
- Do not implement real vectorization yet.
- Do not present semantic chunks, citations or confidence scores as real backend output.
- Do not create extra architectural complexity before the UI Shell and Document Library are stable.
- Keep all data static or mocked until the backend contract is intentionally designed.

### Final design direction after v2

The first Angular UI implementation should be:

1. UI Shell.
2. Light/dark theme system.
3. Dashboard mock.
4. Document Library mock.
5. Responsive desktop/mobile layout.
6. Upload placeholder.
7. AI Chat placeholder marked as future preview.

The first implementation should still avoid real AI, embeddings, vector search, ingestion pipelines and external automations.
