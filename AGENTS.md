# AGENTS.md

Guidance for coding agents working in this repository.

## Scope

- Repo is an Astro 5 static site for Rust India conference/community.
- Primary page is `src/pages/index.astro`.

## Commands

- Install: `pnpm install`
- Dev: `pnpm dev`
- Build check: `pnpm build`

Always run `pnpm build` after non-trivial edits.

## Architecture

- Global layout: `src/layouts/BaseLayout.astro`
- UI sections live in `src/components/*`
- Global styling + Tailwind import in `src/styles/global.css`
- Ferris assets in `src/assets/ferris`

## Styling Rules

- Keep the visual direction intentional and minimal-modern.
- Avoid adding many micro-animations.
- Preserve the current interaction model:
  - Ferris cursor on fine pointers
  - Click stamps (not persisted)
  - Subtle parallax background

## Tailwind v4 Safelist Caveat

This repo relies on `@source inline("...")` in `src/styles/global.css` for utility generation stability.

If you add/remove utility classes in `.astro` files, update the inline list, or styles may silently not render.

## Editing Guidelines

- Prefer editing existing components over creating unnecessary new files.
- Keep content for conference details consistent across sections.
- Do not move Ferris SVGs out of `src/assets/ferris`.
- Use ASCII unless a file already uses non-ASCII.

## Validation Checklist

Before finishing:

1. Run `pnpm build`.
2. Confirm no broken imports.
3. Confirm major CTAs still exist:
   - CFP
   - Mailing list signup
   - Sponsor contact

