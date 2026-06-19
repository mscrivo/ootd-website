import { site } from '@/data/site';

const routes = ['/', '/download', '/screenshots', '/faq', '/release-notes', '/changelog'];

export function GET() {
  const updated = new Date().toISOString();
  const urls = routes
    .map((route) => {
      const loc = new URL(route, site.url).toString();
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${updated}</lastmod>\n  </url>`;
    })
    .join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml' },
  });
}