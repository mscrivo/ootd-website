import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://outlookonthedesktop.com',
  trailingSlash: 'never',
  // Emit page.html instead of page/index.html so Caddy serves clean URLs
  // (e.g. /download) without a trailing-slash redirect.
  build: { format: 'file' },
  integrations: [
    sitemap({
      serialize(item) {
        item.lastmod = new Date().toISOString();
        if (item.url === 'https://outlookonthedesktop.com') {
          item.priority = 1.0;
          item.changefreq = 'monthly';
        } else if (item.url.endsWith('/download')) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else if (item.url.includes('legacy')) {
          item.priority = 0.4;
          item.changefreq = 'yearly';
        } else {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
});
