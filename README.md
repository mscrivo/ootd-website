# Outlook on the Desktop Website

The web site for [outlookonthedesktop.com](https://outlookonthedesktop.com), a static
[Astro](https://astro.build) based site.

## Tech stack

- **Astro** (static output) + **TypeScript**
- **pnpm** for package management, **mise** for pinning Node/pnpm versions
- **ESLint** + **Prettier** for linting/formatting
- **Playwright** for end-to-end tests
- **GitHub Actions** for CI and **Renovate** for dependency updates

## Project structure

- `src/pages/` — one file per route (`/`, `/download`, `/screenshots`, `/faq`, `/legacy-release-notes`).
- `src/data/site.ts` — shared content: site metadata, nav items, screenshots, features, and FAQs.
- `src/components/` — `AdSense.astro` (loader, rendered once in `<head>`) and `AdUnit.astro` (a placeable ad unit).
- `src/layouts/BaseLayout.astro` — shared shell (header, nav/hamburger, footer).
- `src/content/legacy-release-notes.html` — ported release history, injected on the legacy notes page.
- `src/styles/global.css` — all site styles.
- `public/` — static assets plus the appcast/update XML files and `_redirects` (legacy Drupal aliases).
- `tests/` — Playwright end-to-end tests.

## Getting started

```sh
mise install        # install the pinned Node.js and pnpm versions
pnpm install        # install dependencies
pnpm exec playwright install --with-deps chromium  # browsers for e2e tests (first run)
pnpm dev            # start the dev server
```

## Scripts

| Command         | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| `pnpm dev`      | Start the local dev server.                                        |
| `pnpm build`    | Build the static site to `dist/` (also writes the sitemaps).       |
| `pnpm preview`  | Serve the built `dist/` locally.                                   |
| `pnpm check`    | Type-check `.astro`/`.ts` with `astro check`.                      |
| `pnpm lint`     | Run ESLint (`lint:fix` to auto-fix).                               |
| `pnpm format`   | Format with Prettier (`format:check` to verify only).              |
| `pnpm test:e2e` | Run the Playwright tests (build first, or have `preview` running). |

## Quality gates

- **Pre-commit** (husky + lint-staged): formats and lints staged files, then runs `astro check`.
- **CI** (`.github/workflows/ci.yml`) on push to `main` and PRs: Prettier check → ESLint → type check → build → Playwright e2e.
- **Renovate** (`renovate.json`): opens dependency-update PRs (minimum release age of 3 days) and automerges them once CI passes.
