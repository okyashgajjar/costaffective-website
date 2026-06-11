import type { Metadata } from 'next';
import { Inter, Lora, JetBrains_Mono } from 'next/font/google';
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

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const BASE_URL = 'https://costaffective-mcp.vercel.app';

export const metadata: Metadata = {
  title: {
    default: 'CostAffective-MCP | Repository Intelligence & Semantic Retrieval',
    template: '%s | CostAffective-MCP'
  },
  description: 'Convert your remaining cost into coffee. Rebuild prompt context payloads with local Tree-sitter AST queries, and decrease daily token usage by 45.9%.',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': `${BASE_URL}/en`,
      'x-default': BASE_URL,
    },
  },
  openGraph: {
    title: 'CostAffective-MCP | Repository Intelligence & Semantic Retrieval',
    description: 'Convert your remaining cost into coffee. Rebuild prompt context payloads with local Tree-sitter AST queries, and decrease daily token usage by 45.9%.',
    url: BASE_URL,
    siteName: 'CostAffective-MCP',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CostAffective-MCP | Repository Intelligence & Semantic Retrieval',
    description: 'Convert your remaining cost into coffee. Rebuild prompt context payloads with local Tree-sitter AST queries, and decrease daily token usage by 45.9%.',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'google-site-verification': '',
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
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}/#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Benchmarks', item: `${BASE_URL}/benchmarks` },
        { '@type': 'ListItem', position: 3, name: 'Documentation', item: `${BASE_URL}/docs/install` },
        { '@type': 'ListItem', position: 4, name: 'Tools', item: `${BASE_URL}/tools` },
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
    <html lang="en" className={`${inter.variable} ${lora.variable} ${jetbrains.variable}`}>
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
