import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://outlookonthedesktop.com',
  trailingSlash: 'never',
  // Emit page.html instead of page/index.html so Caddy serves clean URLs
  // (e.g. /download) without a trailing-slash redirect.
  build: { format: 'file' },
  integrations: [sitemap()],
});
