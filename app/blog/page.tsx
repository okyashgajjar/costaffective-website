import Link from 'next/link';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Blog | CostAffective Context Research',
  description: 'Explore our latest articles, case studies, and research on repository intelligence and prompt context savings.',
};

export default function BlogIndex() {
  const blogListLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'CostAffective Context Research Blog',
    'description': 'Latest developer updates and engineering articles from the CostAffective contributors.'
  };

  const list = [
    {
      slug: 'context-compression-and-ast-parsing',
      title: 'Deep Dive into CostAffective: Context Compression & AST Parsing',
      date: 'June 10, 2026',
      author: 'okyashgajjar [Yash Gajjar]',
      readTime: '8 min read',
      summary: 'How CostAffective leverages tree-sitter to parse source files into concrete syntax trees, extracting local scopes and definitions to trim prompt payloads.'
    },
    {
      slug: 'sqlite-codebase-query-pipelines',
      title: 'Relational SQLite Storage & Codebase Query Pipelines',
      date: 'June 08, 2026',
      author: 'okyashgajjar [Yash Gajjar]',
      readTime: '7 min read',
      summary: 'Understanding how CostAffective organizes codebase entities (symbols, references, calls) into lightweight SQLite relational database schemas.'
    },
    {
      slug: 'mcp-transport-handshake-details',
      title: 'Model Context Protocol: Standardizing Stdio Handshakes & Tool Execution',
      date: 'June 06, 2026',
      author: 'okyashgajjar [Yash Gajjar]',
      readTime: '6 min read',
      summary: 'A comprehensive technical breakdown of how CostAffective handles stdio-based JSON-RPC handshakes to interface with Claude Code and Cursor.'
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListLd) }}
      />

      <section className="section-container max-w-[900px]">
        {/* Header */}
        <div className="section-header text-left max-w-full mb-12">
          <span className="section-pill">Engineering</span>
          <h1 className="font-serif font-bold text-4xl text-charcoal mb-4">Context Research Blog</h1>
          <p className="text-light text-base max-w-[600px] leading-relaxed">
            Latest insights, technical write-ups, and compiler tutorials from the CostAffective creator.
          </p>
        </div>

        {/* Chronological List */}
        <div className="space-y-8 divide-y divide-[#E5E5E0]">
          {list.map((post, index) => (
            <div key={post.slug} className={`pt-8 ${index === 0 ? 'pt-0' : ''}`}>
              <div className="flex flex-wrap items-center gap-4 text-xs text-grey mb-3">
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-charcoal hover:text-primary transition mb-3">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="text-light text-sm mb-4 leading-relaxed">{post.summary}</p>
              <Link href={`/blog/${post.slug}`} className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
                Read article <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
