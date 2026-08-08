# AGENTS.md

Guidance for coding agents working in this repository.

## Scope

- Repo is an Astro 5 static site for the Rust India conference/community.
- Home page (`src/pages/index.astro`) is the hub: hero art, latest blog posts,
  upcoming events, past events, community links, mailing list, and a
  contributors callout.
- Content-driven: blog posts and events are Markdown collections in
  `src/content/` (blog, events), loaded via glob in `src/content.config.ts`
  with typed frontmatter schemas.
- Conference/community data lives in `src/data/` (`2026-conference.ts` for
  sponsors, `contributors.ts` for the contributors page).
- The 2026 conference is archived under `src/pages/archive/` (schedule,
  sponsors). Treat it as historical; do not treat it as the current campaign.
- An RSS feed is generated from the blog via `src/pages/rss.xml.ts`.

## Commands

- Install: `pnpm install`
- Dev: `pnpm dev`
- Build check: `pnpm build`

Always run `pnpm build` after non-trivial edits.

## Version Control (Commit Frequently)

- Commit work frequently: commit as soon as a subtask is done. Do not batch
  unrelated changes into one commit; keep commits small and logical (one
  change per commit).
- Recommended local CLI, in priority order:
  1. **jj** (Jujutsu) — the repo is a colocated jj + git repo.
     - `jj describe` to set a commit message, `jj commit` to finalize,
       `jj squash` to merge into a parent, `jj branch create` for branches,
       `jj git push -b <branch>` to push.
  2. **git** — `git add` + `git commit` with small, focused commits.
  3. **Other alternatives** (e.g. radicle — a `rad` remote exists) — only when
     jj and git are not suitable for the task.
- Commit messages: summary on line 1, ≤50 chars, imperative mood, capitalized,
  no trailing period; blank line, then body wrapped at ≤72 chars explaining
  what and why (not how).

## Architecture

- Global layout: `src/layouts/BaseLayout.astro`
- UI components live in `src/components/*` (SiteHeader, MailingList,
  PastEventCard)
- Pages: `src/pages/` — index, blog (`[...slug]` + index), events, community,
  contributors, conduct, archive (2026/schedule/sponsors)
- Content collections: `src/content/blog/*.md`, `src/content/events/*.md`
- Data: `src/data/2026-conference.ts`, `src/data/contributors.ts`
- Global styling + Tailwind import in `src/styles/global.css`
- Hero/art images in `src/assets/art/*.png`; Ferris assets in
  `src/assets/ferris`; sponsor logos at `src/assets/*.svg`

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
- New blog posts and events go in the content collections (`src/content/`),
  not as new pages; keep frontmatter matching `src/content.config.ts`.
- Keep content for conference details consistent across sections.
- Do not move Ferris SVGs out of `src/assets/ferris`.
- Use ASCII unless a file already uses non-ASCII.

## Validation Checklist

Before finishing:

1. Run `pnpm build`.
2. Confirm no broken imports.
3. Confirm major CTAs still exist:
   - Mailing list signup (`MailingList.astro` on the home page)
   - RSS subscribe link (`/rss.xml`)
   - Community links (Discord, X, Bluesky, Matrix, LinkedIn, Telegram)
   - Sponsor contact on the 2026 archive pages
