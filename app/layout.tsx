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

const BASE_URL = 'https://costaffective-mcp.vercel.app';

const SITE_NAME = 'CostAffective-MCP';
const DEFAULT_TITLE = 'CostAffective-MCP | Local MCP Server That Cuts AI Coding Token & Cache Cost';
const DEFAULT_DESCRIPTION =
  'CostAffective is a local-first MCP server for AI coding assistants. It answers code questions from a Tree-sitter index, keeps large content out of the context window with stash and recall, and cuts prompt-cache cost in long sessions. The result is 45.9% fewer tokens and 100% local execution.';

export const metadata: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: '%s | CostAffective-MCP',
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: 'Yash Gajjar', url: 'https://github.com/okyashgajjar' }],
  creator: 'Yash Gajjar',
  publisher: SITE_NAME,
  category: 'Developer Tools',
  keywords: [
    'MCP server',
    'Model Context Protocol',
    'AI coding assistant',
    'token reduction',
    'prompt cache cost',
    'context window',
    'Tree-sitter',
    'code retrieval',
    'repository intelligence',
    'Claude Code',
    'Cursor',
    'local-first',
    'semantic code search',
    'stash context',
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
        alt: 'CostAffective-MCP: local-first repository intelligence for AI coding agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: '@okyashgajjar',
    images: [`${BASE_URL}/logo.png`],
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
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'CostAffective-MCP',
      url: BASE_URL,
      logo: `${BASE_URL}/logo.png`,
      description: 'Local-first MCP server for repository intelligence and semantic code retrieval.',
      sameAs: [
        'https://github.com/okyashgajjar/costaffective-mcp',
        'https://x.com/okyashgajjar',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'CostAffective-MCP',
      description: 'Reduce repository exploration costs, shrink context windows by up to 45.9%.',
      publisher: { '@id': `${BASE_URL}/#organization` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${BASE_URL}/#software`,
      name: 'CostAffective-MCP',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Linux, macOS, Windows',
      url: BASE_URL,
      downloadUrl: 'https://github.com/okyashgajjar/costaffective-mcp/releases',
      softwareVersion: '2.0',
      license: 'https://opensource.org/licenses/MIT',
      description:
        'Local-first MCP server that reduces AI coding token and prompt-cache cost via Tree-sitter retrieval, token-budgeted summaries, and out-of-context stash and recall tools.',
      featureList: [
        'Tree-sitter symbol, reference, and call-graph retrieval',
        'Token-budgeted repository summaries',
        'stash_context and recall to keep large output out of the context window',
        'remember for durable per-repository facts',
        'Incremental indexing with a file watchdog',
        'Cross-IDE session-awareness skill',
      ],
      offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
      publisher: { '@id': `${BASE_URL}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Vision', item: `${BASE_URL}/vision` },
        { '@type': 'ListItem', position: 3, name: 'Benchmarks', item: `${BASE_URL}/benchmarks` },
        { '@type': 'ListItem', position: 4, name: 'Tools', item: `${BASE_URL}/tools` },
        { '@type': 'ListItem', position: 5, name: 'Documentation', item: `${BASE_URL}/docs/install` },
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
