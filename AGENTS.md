# Repository Guidelines

## Project Overview

Static Astro site for [outlookonthedesktop.com](https://outlookonthedesktop.com), promoting **Outlook on the Desktop (OotD)** — a Windows utility that pins Outlook calendar, inbox & tasks to the desktop. The site doubles as the app's update hub: `public/` hosts the live Sparkle-style appcast (`ootdAppcast.xml`) and release notes the desktop app polls, plus legacy installer `.exe`s (Git LFS). Current installers live in GitHub Releases of a separate repo (`github.com/mscrivo/OotD`). Fully SSG: no dynamic routes, no Content Collections, no server logic.

## Architecture & Data Flow

- **Single data module**: `src/data/site.ts` is the single source of truth — site config (name, url, `latestVersion`, `releaseDate`, download URLs, AdSense `publisherId`, `ogImage`), `navItems`, `screenshots` (resolved at build time via eager `import.meta.glob('../assets/screenshots/*.jpg')` → `ImageMetadata`), `features`, and `faqs` (+ exported `FaqItem` type).
- **Pages are thin templates** over that data; JSON-LD structured data (`SoftwareApplication`, `FAQPage`) is derived from the same arrays — content and SEO share one source.
- **One layout owns all chrome**: `src/layouts/BaseLayout.astro` (props: `title?`, `description?`, `image?`, `structuredData?`). It emits head SEO meta, canonical URLs (with `.html`/trailing-slash stripping to compensate for `build.format: 'file'` + Caddy clean-URL serving), header nav rendered from `navItems`, a mobile hamburger driven by an inline vanilla-JS script (no framework), footer, AdSense loader, GoatCounter.
- **Data flow**: `site.ts` → page frontmatter imports → layout props → HTML. Screenshots go through astro:assets `<Image format="webp">`; brand assets (`ootd-logo.svg`, `favicon.ico`, `og-card.png`) come from `public/` unprocessed, referenced by absolute URL.
- **`src/content/` is not Content Collections** — it holds one raw HTML changelog (`legacy-release-notes.html`) consumed via `import … ?raw` + `set:html`. Don't add a collections config to match it; the pattern here is deliberate.

## Key Directories

| Path                      | Purpose                                                                                                                                                                                                                                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/pages/`              | One file per route: `index`, `download`, `screenshots`, `faq`, `legacy-release-notes`, `404`. No dynamic routes.                                                                                                                                                                                               |
| `src/components/`         | `AdSense.astro` (head loader, used by BaseLayout); `AdUnit.astro` (ad unit with `slot`/`format`/`responsive` props — **currently unused** anywhere in src).                                                                                                                                                    |
| `src/data/site.ts`        | All site data + types (see above).                                                                                                                                                                                                                                                                             |
| `src/styles/global.css`   | The only stylesheet, imported once in BaseLayout.                                                                                                                                                                                                                                                              |
| `src/assets/screenshots/` | `.jpg` screenshots processed by astro:assets.                                                                                                                                                                                                                                                                  |
| `public/`                 | Served verbatim: brand assets, appcast XMLs (`ootdAppcast.xml` live; `ootdAppcastx64/x86.xml` legacy per-arch feeds, frozen), `ootdReleaseNotes.md`, legacy installers (LFS), `ads.txt`, `robots.txt`, `_redirects` (Netlify-format 301s from legacy Drupal `/node/*` URLs), search-engine verification files. |
| `tests/`                  | Flat Playwright specs (`smoke.spec.ts`, `navigation.spec.ts`).                                                                                                                                                                                                                                                 |
| `scripts/`                | `generate-og-image.mjs` — OG card generator.                                                                                                                                                                                                                                                                   |

## Development Commands

Setup: `mise install && pnpm install && pnpm exec playwright install --with-deps chromium`

| Command                             | Purpose                                                                                                                                       |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`                          | Dev server (`astro dev --host 0.0.0.0`)                                                                                                       |
| `pnpm build`                        | Static build → `dist/`                                                                                                                        |
| `pnpm preview`                      | Serves `dist/` on port 4321 (this is what Playwright's webServer runs)                                                                        |
| `pnpm check`                        | Type check (`astro check`)                                                                                                                    |
| `pnpm lint` / `pnpm lint:fix`       | ESLint over the repo                                                                                                                          |
| `pnpm format` / `pnpm format:check` | Prettier write / verify                                                                                                                       |
| `pnpm test:e2e`                     | Playwright — **requires `pnpm build` first** (preview serves `dist/`, there is no dev-server fallback)                                        |
| `pnpm og:image`                     | Regenerates `public/assets/og-card.png` (1200×630, sharp) from `ootd-logo.svg`; output is checked in — re-run only when logo/branding changes |

## Code Conventions & Common Patterns

- **Imports**: always via the `@/` alias → `src/` (tsconfig paths).
- **Frontmatter** in `.astro` files: imports and derived consts only (e.g. `releaseDate`, `structuredData`) — no YAML keys; page metadata is passed as layout props.
- **Components**: PascalCase filename, one component per file, local `interface Props` + `Astro.props` destructuring with defaults.
- **Styling**: plain hand-written CSS, no framework, no scoped styles. Flat kebab-case classes (`.feature-grid`, `.faq-item`, `.nav-toggle`, `.callout`); design tokens as `:root` custom properties; responsive breakpoints for tablet/mobile widths.
- **Formatting**: Prettier — settings in `.prettierrc.json`, `prettier-plugin-astro` handles `.astro`; ignore list in `.prettierignore`.
- **Dates**: formatted with `toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric', timeZone:'UTC' })`.
- **HTML injection** is deliberate and limited to trusted static content: the `?raw` legacy-notes import and optional `answerHtml` on FAQ items (`set:html`).
- **Icons**: inline SVG path data in a `Record<string, string>` map (e.g. `iconPaths` in `index.astro` frontmatter), keyed by the `icon` field of data entries.
- **Content changes have test consequences**: e2e specs assert literal element counts and exact copy — update assertions when content changes.

## Important Files

- `astro.config.mjs` — site URL; `trailingSlash: 'never'` + `build: { format: 'file' }` (emits `page.html` so Caddy serves clean URLs); `@astrojs/sitemap` with a custom `serialize` setting per-URL `priority`/`changefreq`/`lastmod`.
- `src/data/site.ts`, `src/layouts/BaseLayout.astro` — the two files that shape every page.
- `playwright.config.ts` — webServer = `pnpm preview` at `127.0.0.1:4321`; projects `chromium` (desktop) + `mobile` (emulated phone); CI-aware reporter/retries/`forbidOnly`.
- `.github/workflows/ci.yml` — the only workflow. `checks` job (frozen lockfile): format:check → lint → check → build → e2e, uploads `dist/` + report. `deploy` job on `main`: custom **SSH/rsync** deploy (not Netlify/Vercel/GH Pages) to `$DEPLOY_PATH/releases/$SHA` with `--link-dest` hardlinks, atomic symlink swap via `current`, retention of recent releases.
- `pnpm-workspace.yaml` — declares which native dependencies may run install scripts; also carries Renovate release-age exclusions.
- `.husky/pre-commit` — runs `pnpm exec lint-staged` then `pnpm exec astro check` on every commit; lint-staged config lives in `package.json`.
- `public/ootdAppcast.xml` + `public/ootdReleaseNotes.md` — the live app-update feed; edit carefully, the desktop app consumes them. (Known quirk: `ootdAppcastx86.xml`'s `<link>` tag erroneously references the x64 file.)

## Runtime/Tooling Preferences

- **Runtime is Node + pnpm** — versions are pinned in `package.json` (`packageManager`) and `mise.toml`; use mise to get the right ones. Not Bun; use `pnpm`, not npm/yarn.
- **TypeScript dual aliasing (do not "fix")**: `package.json` aliases both `typescript` and `@typescript/native` to specific TypeScript distributions so the compiler API available to ESLint, `astro check`, and the language server stays compatible — do not dedupe or re-pin these aliases.
- **Renovate** is fully automated (recommended config, automerge, lockfile maintenance) — dependency PRs merge themselves once CI passes.
- `.gitattributes` routes only `public/*.exe` through Git LFS and defines **no line-ending rules**; don't add CRLF/`text=auto` rules.
- `.astro/` is generated output (content types, dev state) — never edit; it's gitignored and excluded from lint/format.

## Testing & QA

- **Playwright e2e only** — no unit-test framework exists. Specs live flat in `tests/<area>.spec.ts`; new spec = new file there.
- Run: `pnpm build` then `pnpm test:e2e`. Target one file/project with `pnpm exec playwright test tests/smoke.spec.ts` or `--project=chromium`; interactive via `--ui`.
- **Project gating**: layout-specific tests skip by project name — `test.skip(testInfo.project.name === 'mobile', …)` (and the inverse) rather than separate files.
- Selector conventions: role locators (`getByRole('link', { name })`) for interactive elements, class selectors (`.feature`, `.faq-item`, `.nav-toggle`) for structural counts; set `exact` explicitly when names are ambiguous.
- Locally: `list` reporter, no retries. CI: GitHub + HTML reporters, retries, `forbidOnly` on, traces on first retry.
- **Quality gates** (CI order): `format:check` → `lint` → `check` → `build` → `test:e2e`. Pre-commit enforces lint-staged (eslint --fix + prettier on staged files) plus a full `astro check`, so commits that fail type-checking are blocked locally.
