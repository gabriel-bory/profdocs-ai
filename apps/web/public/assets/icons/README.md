# Local icon assets

This folder is reserved for local SVG icons.

Current strategy:

- Avoid remote icon fonts or external CDN icon styles.
- Prefer inline SVG, CSS text markers or local SVG icons.
- If Angular Material icons are needed later, register local SVG files with `MatIconRegistry`.
- Do not depend on Google Material Symbols from the network in the app shell.

Recommended future structure:

```text
assets/icons/
  dashboard.svg
  documents.svg
  upload.svg
  ai-preview.svg
```
