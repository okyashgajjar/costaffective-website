import Link from 'next/link';
import { ArrowRight, Code, Key, List, Search, GitBranch, Archive, BookMarked, RefreshCw, Terminal, BarChart3 } from 'lucide-react';

export const metadata = {
  title: '11 MCP Tools — Complete Catalog of CostWise MCP Server Tools | Yash Gajjar',
  description:
    'Explore all 11 CostWise MCP tools: retrieval (search_code, find_symbol, read_symbol, find_references, find_callers), maintenance (get_repository_summary, index_repository), and context control (remember, stash_context, recall, session_brief). Full argument schemas and examples.',
  alternates: { canonical: '/tools' },
};

export default function ToolsIndex() {
  const toolsLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "CostWise MCP Tools Catalog",
    "description": "Lists search_code, find_symbol, read_symbol, find_references, find_callers, get_repository_summary, index_repository, remember, stash_context, recall, and session_brief tools."
  };

  const list = [
    {
      slug: 'search-code',
      name: 'search_code',
      group: 'Retrieval',
      desc: 'Searches matching AST scopes based on fuzzy query inputs, compressing output to match target token constraints.',
      icon: <Search size={18} />
    },
    {
      slug: 'find-symbol',
      name: 'find_symbol',
      group: 'Retrieval',
      desc: 'Retrieves the exact definition file and line coordinates of functions, structs, classes, or interfaces.',
      icon: <Key size={18} />
    },
    {
      slug: 'find-references',
      name: 'find_references',
      group: 'Retrieval',
      desc: 'Extracts all file and line references to a specific symbol, returning lines of context.',
      icon: <List size={18} />
    },
    {
      slug: 'find-callers',
      name: 'find_callers',
      group: 'Retrieval',
      desc: 'Builds the caller hierarchy for a function from stored call edges, mapping execution trees.',
      icon: <GitBranch size={18} />
    },
    {
      slug: 'read-symbol',
      name: 'read_symbol',
      group: 'Retrieval',
      desc: 'Return a symbol\'s implementation body by name, from the indexed line range.',
      icon: <Terminal size={18} />
    },
    {
      slug: 'repository-summary',
      name: 'get_repository_summary',
      group: 'Maintenance',
      desc: 'Token-budgeted repository overview with module drill-down. Stays small no matter the repo size.',
      icon: <Code size={18} />
    },
    {
      slug: 'index-repository',
      name: 'index_repository',
      group: 'Maintenance',
      desc: 'Manually refresh or rebuild the index. Usually unnecessary; the watchdog re-indexes on save.',
      icon: <RefreshCw size={18} />
    },
    {
      slug: 'remember',
      name: 'remember',
      group: 'Context control',
      desc: 'Persist a small durable fact per repository so it is never repeated inline in the conversation.',
      icon: <BookMarked size={18} />
    },
    {
      slug: 'stash-context',
      name: 'stash_context',
      group: 'Context control',
      desc: 'Park a large blob out of context and get back a tiny handle. Lossless: the content stays on disk.',
      icon: <Archive size={18} />
    },
    {
      slug: 'recall',
      name: 'recall',
      group: 'Context control',
      desc: 'Take back only the slice you need: the budgeted match from a stash, or remembered facts.',
      icon: <Search size={18} />
    },
    {
      slug: 'session-brief',
      name: 'session_brief',
      group: 'Context control',
      desc: 'Compact summary of past sessions — facts, stashes, reindex events — to catch up without re-reading history.',
      icon: <BarChart3 size={18} />
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsLd) }}
      />

      <section className="section-container">
        {/* Header */}
        <div className="section-header">
          <span className="eyebrow">API Catalog</span>
          <h1 className="font-display font-bold text-4xl mb-4 mt-3 text-charcoal">Model Context Protocol (MCP) Tools</h1>
          <p className="section-desc">
            Eleven tools in three groups. Retrieval answers questions in a few tokens. Maintenance keeps the index fresh.
            Context control keeps large content and durable facts out of the window.
          </p>
        </div>

        {/* Tools grouped by category */}
        {['Retrieval', 'Maintenance', 'Context control'].map((group) => (
          <div key={group} className="mb-12">
            <h2 className="font-mono text-xs uppercase tracking-wider text-grey mb-5 border-b border-[#E5E5E0] pb-2">
              {group}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list
                .filter((t) => t.group === group)
                .map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="tool-card flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="benefit-icon">{tool.icon}</div>
                      <h3 className="tool-name mt-4 mb-2">{tool.name}</h3>
                      <p className="tool-desc !mt-0">{tool.desc}</p>
                    </div>
                    <span className="mt-6 link-anim text-xs inline-flex items-center gap-1">
                      View schemas &amp; parameters <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
