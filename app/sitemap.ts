import type { MetadataRoute } from 'next';

const WEBSITE_URL = 'https://costaffective-mcp.vercel.app';

const staticRoutes: { url: string; priority: number; changeFreq: 'weekly' | 'daily' | 'monthly' }[] = [
  { url: '/', priority: 1.0, changeFreq: 'weekly' },
  { url: '/vision', priority: 0.9, changeFreq: 'monthly' },
  { url: '/architecture', priority: 0.8, changeFreq: 'monthly' },
  { url: '/benchmarks', priority: 0.9, changeFreq: 'weekly' },
  { url: '/blog', priority: 0.7, changeFreq: 'weekly' },
  { url: '/faq', priority: 0.6, changeFreq: 'monthly' },
  { url: '/mcp', priority: 0.7, changeFreq: 'monthly' },
  { url: '/tools', priority: 0.8, changeFreq: 'monthly' },
  { url: '/use-cases', priority: 0.6, changeFreq: 'monthly' },
];

const blogRoutes: string[] = [
  '/blog/context-compression-and-ast-parsing',
  '/blog/sqlite-codebase-query-pipelines',
  '/blog/mcp-transport-handshake-details',
];

const docRoutes: string[] = [
  '/docs/install',
  '/docs/opencode',
  '/docs/codex',
  '/docs/claude-code',
  '/docs/cursor',
  '/docs/antigravity',
  '/docs/troubleshooting',
];

const toolRoutes: string[] = [
  '/tools/search-code',
  '/tools/find-symbol',
  '/tools/find-references',
  '/tools/find-callers',
  '/tools/grep-code',
  '/tools/repository-summary',
  '/tools/index-repository',
  '/tools/remember',
  '/tools/stash-context',
  '/tools/recall',
];

const compareRoutes: string[] = [
  '/compare/codegraph',
  '/compare/serena',
  '/compare/graphify',
  '/compare/ripgrep',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const allRoutes: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    allRoutes.push({
      url: `${WEBSITE_URL}${route.url}`,
      lastModified: new Date(),
      changeFrequency: route.changeFreq,
      priority: route.priority,
    });
  }

  for (const url of blogRoutes) {
    allRoutes.push({
      url: `${WEBSITE_URL}${url}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  }

  for (const url of docRoutes) {
    allRoutes.push({
      url: `${WEBSITE_URL}${url}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  for (const url of toolRoutes) {
    allRoutes.push({
      url: `${WEBSITE_URL}${url}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  }

  for (const url of compareRoutes) {
    allRoutes.push({
      url: `${WEBSITE_URL}${url}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    });
  }

  return allRoutes;
}
