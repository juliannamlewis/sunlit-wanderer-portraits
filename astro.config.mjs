import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const HIDDEN_PAGES = [
  '/resources',
  '/albums-and-keepsakes',
  '/local-favorites',
  '/prop-library',
];

export default defineConfig({
  site: 'https://portraits.thesunlitwanderer.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !HIDDEN_PAGES.some((hidden) => page.includes(hidden)),
    }),
  ],
});
