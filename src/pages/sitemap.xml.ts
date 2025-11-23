import type { APIRoute } from 'astro';
import { supportedLanguages, defaultLanguage } from '../i18n/utils';

const site = 'https://caremetrics.se';

// Define all pages and their paths
const pages = [
  { path: '', priority: 1.0, changefreq: 'weekly' },
  { path: 'privacy', priority: 0.5, changefreq: 'monthly' },
  { path: 'terms', priority: 0.5, changefreq: 'monthly' },
];

export const GET: APIRoute = () => {
  const urls: string[] = [];

  // Generate URLs for each language and page
  supportedLanguages.forEach((lang) => {
    pages.forEach((page) => {
      const langPrefix = lang === defaultLanguage ? '' : `/${lang}`;
      const fullPath = page.path 
        ? `${langPrefix}/${page.path}`.replace(/\/+/g, '/')
        : (langPrefix || '/');
      const url = `${site}${fullPath}`;
      
      // Generate alternate language URLs
      const alternateUrls = supportedLanguages
        .filter(l => l !== lang)
        .map(l => {
          const altLangPrefix = l === defaultLanguage ? '' : `/${l}`;
          const altPath = page.path 
            ? `${altLangPrefix}/${page.path}`.replace(/\/+/g, '/')
            : (altLangPrefix || '/');
          return `<xhtml:link rel="alternate" hreflang="${l}" href="${site}${altPath}" />`;
        })
        .join('\n    ');
      
      urls.push(`
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}" />
    ${alternateUrls}
  </url>`);
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

