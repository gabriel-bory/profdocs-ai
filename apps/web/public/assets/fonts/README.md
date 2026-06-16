# Local font assets

This folder is reserved for self-hosted web fonts.

Current strategy:

- The MVP uses system fonts for speed and resilience.
- Do not load Google Fonts or external CDN fonts from the app shell.
- If a licensed font is added later, place `.woff2` files here.
- Use `font-display: swap` in `src/styles.css`.
- Never commit font files unless their license explicitly allows redistribution.

Example future CSS:

```css
@font-face {
  font-family: 'Inter';
  src: url('/assets/fonts/inter-var.woff2') format('woff2');
  font-display: swap;
}
```
