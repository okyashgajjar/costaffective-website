import type { Metadata } from 'next';
import { Inter, Lora, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
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

export const metadata: Metadata = {
  title: {
    default: 'CostAffective-MCP | Repository Intelligence & Semantic Retrieval',
    template: '%s | CostAffective-MCP'
  },
  description: 'Convert your remaining cost into coffee. Rebuild prompt context payloads with local Tree-sitter AST queries, and decrease daily token usage by 45.9%.',
  metadataBase: new URL('https://costaffective.dev'),
  openGraph: {
    title: 'CostAffective-MCP | Repository Intelligence & Semantic Retrieval',
    description: 'Convert your remaining cost into coffee. Rebuild prompt context payloads with local Tree-sitter AST queries, and decrease daily token usage by 45.9%.',
    url: 'https://costaffective.dev',
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
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} ${jetbrains.variable}`}>
      <body className="antialiased min-h-screen flex flex-col pt-[72px]">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
