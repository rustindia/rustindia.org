# Rust India Website

Conference landing page for Rust India, built with Astro 5 and Tailwind CSS v4.

## Tech Stack

- Astro 5
- Tailwind CSS v4 (`@tailwindcss/vite`)
- TypeScript config via `astro/tsconfigs/strict`

## Quick Start

```bash
pnpm install
pnpm dev
```

Open `http://localhost:4321`.

## Scripts

- `pnpm dev` - Start local dev server
- `pnpm build` - Build static site into `dist/`
- `pnpm preview` - Preview built site

## Project Structure

```text
src/
  assets/
    ferris/
  components/
    SiteHeader.astro
    HeroCampaign.astro
    ConferenceSections.astro
    CommunityPulse.astro
  layouts/
    BaseLayout.astro
  pages/
    index.astro
  styles/
    global.css
```

## Notes

- Ferris SVGs are stored in `src/assets/ferris`.
- The site includes:
  - Custom Ferris cursor on fine pointers (desktop)
  - Click-to-stamp Ferris badges (session-only; clears on refresh)
  - Subtle space/grid background with pointer parallax

## Tailwind v4 Important Note

This project currently uses a class safelist via `@source inline(...)` inside `src/styles/global.css` to ensure utility classes are emitted reliably for `.astro` usage in this setup.

When adding/removing utility classes in Astro files, update that safelist accordingly.

