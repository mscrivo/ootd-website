# Outlook on the Desktop Website

Static replacement for the Drupal site at `outlookonthedesktop.com`.

## Commands

- `mise install` installs the Node.js and pnpm versions for this repo.
- `mise run install` installs project dependencies with pnpm.
- `mise run dev` starts local development.
- `mise run build` writes the static site to `dist/` and generates `sitemap-index.xml` / `sitemap-0.xml`.

## Notes

- AdSense is configured in `src/components/AdSense.astro`.
- Public appcast/update files live in `public/` so their existing URLs continue to work.
- Legacy Drupal aliases are listed in `public/_redirects` for hosts that support Netlify-style redirects.
