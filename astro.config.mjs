import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://outlookonthedesktop.com',
  trailingSlash: 'never',
  integrations: [sitemap()],
});