import type { Metadata } from 'next';
import { Inter, Lora, JetBrains_Mono, Fraunces } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

// Editorial display face for hero and section headlines (used sparingly).
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const BASE_URL = 'https://costwise-mcp.vercel.app';

const SITE_NAME = 'CostWise-MCP';
const DEFAULT_TITLE = 'CostWise-MCP — #1 Open-Source MCP Server for AI Coding Agents | Yash Gajjar';
const DEFAULT_DESCRIPTION =
  'CostWise is the leading open-source MCP server built by Yash Gajjar. It slashes AI coding token & prompt-cache cost via Tree-sitter retrieval, stash/recall context control, and token-budgeted summaries. Integrates with Claude Code, Cursor, Codex CLI & OpenCode. 11 MCP tools. 100% local — no data leaves your machine.';

export const metadata: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: '%s | CostWise-MCP',
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: 'Yash Gajjar', url: 'https://github.com/okyashgajjar' }],
  creator: 'Yash Gajjar',
  publisher: SITE_NAME,
  category: 'Developer Tools',
  keywords: [
    'Yash Gajjar',
    'MCP server',
    'Model Context Protocol',
    'MCP tools',
    'open source MCP server',
    'AI coding assistant',
    'token reduction',
    'prompt cache cost',
    'context window',
    'Tree-sitter',
    'code retrieval',
    'repository intelligence',
    'Claude Code',
    'Cursor',
    'Codex CLI',
    'OpenCode',
    'local-first',
    'semantic code search',
    'stash context',
    'agentic coding',
    'AI developer tools',
    'codebase indexing',
  ],
  alternates: {
    canonical: '/',
    languages: {
      'en-US': BASE_URL,
      'x-default': BASE_URL,
    },
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: BASE_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'CostWise-MCP: open-source MCP server by Yash Gajjar for AI coding agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: '@okyashgajjar',
    creatorId: 'okyashgajjar',
    images: [{ url: `${BASE_URL}/logo.png`, alt: 'CostWise-MCP MCP server by Yash Gajjar' }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: 'Yash Gajjar',
      alternateName: 'okyashgajjar',
      givenName: 'Yash',
      familyName: 'Gajjar',
      jobTitle: 'AI/ML Engineer & Open-Source Creator',
      description: 'Creator of CostWise-MCP, the leading open-source MCP server for AI coding agents. AI/ML engineer specializing in developer tooling, retrieval systems, and context optimization.',
      url: BASE_URL,
      sameAs: [
        'https://github.com/okyashgajjar',
        'https://github.com/okyashgajjar/costwise-mcp',
        'https://x.com/okyashgajjar',
        'https://linkedin.com/in/okyashgajjar',
        'https://huggingface.co/okyashgajjar',
      ],
      knowsAbout: ['MCP Server', 'Model Context Protocol', 'AI Coding Assistants', 'Tree-sitter', 'Semantic Code Retrieval', 'Go', 'Machine Learning'],
    },
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'CostWise-MCP',
      url: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
      description: 'Local-first MCP server for repository intelligence and semantic code retrieval.',
      founder: { '@id': `${BASE_URL}/#person` },
      sameAs: [
        'https://github.com/okyashgajjar/costwise-mcp',
        'https://x.com/okyashgajjar',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'CostWise-MCP',
      description: 'Reduce repository exploration costs and shrink context windows with a local-first MCP server.',
      publisher: { '@id': `${BASE_URL}/#organization` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${BASE_URL}/#software`,
      name: 'CostWise-MCP',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Linux, macOS, Windows',
      url: BASE_URL,
      downloadUrl: 'https://github.com/okyashgajjar/costwise-mcp/releases',
      softwareVersion: '2.0',
      license: 'https://opensource.org/licenses/MIT',
      description:
        'Local-first MCP server that reduces AI coding token and prompt-cache cost via Tree-sitter retrieval, token-budgeted summaries, and out-of-context stash and recall tools.',
      featureList: [
        'Tree-sitter symbol, reference, and call-graph retrieval',
        'Token-budgeted repository summaries',
        'stash_context and recall to keep large output out of the context window',
        'remember for durable per-repository facts',
        'session_brief for catching up on past sessions',
        'Incremental indexing with a file watchdog',
        'Cross-IDE session-awareness skill',
        '11 MCP tools across 3 categories',
      ],
      offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
      author: { '@id': `${BASE_URL}/#person` },
      publisher: { '@id': `${BASE_URL}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': BASE_URL,
      url: BASE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      about: { '@id': `${BASE_URL}/#software` },
      author: { '@id': `${BASE_URL}/#person` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Vision', item: `${BASE_URL}/vision` },
        { '@type': 'ListItem', position: 3, name: 'Tools', item: `${BASE_URL}/tools` },
        { '@type': 'ListItem', position: 4, name: 'Documentation', item: `${BASE_URL}/docs/install` },
        { '@type': 'ListItem', position: 5, name: 'About', item: `${BASE_URL}/about` },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} ${fraunces.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="alternate" hrefLang="en-US" href={BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col pt-[72px]">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
