import Link from 'next/link';
import { ArrowRight, Code, Key, List, Search, GitBranch } from 'lucide-react';

export const metadata = {
  title: 'MCP Tools Catalog',
  description: 'Examine the complete suite of MCP tools provided by the CostAffective server for coding agents.',
};

export default function ToolsIndex() {
  const toolsLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "CostAffective MCP Tools Catalog",
    "description": "Lists search_code, find_symbol, find_references, find_callers, and get_repository_summary tools."
  };

  const list = [
    {
      slug: 'search-code',
      name: 'search_code',
      desc: 'Searches matching AST scopes based on fuzzy query inputs, compressing output arrays to match target token constraints.',
      icon: <Search size={18} />
    },
    {
      slug: 'find-symbol',
      name: 'find_symbol',
      desc: 'Retrieves the exact code definition file and line coordinates of functions, structs, classes, or interface declarations.',
      icon: <Key size={18} />
    },
    {
      slug: 'find-references',
      name: 'find_references',
      desc: 'Extracts all file and line number references calling a specific symbol, returning lines of context.',
      icon: <List size={18} />
    },
    {
      slug: 'find-callers',
      name: 'find_callers',
      desc: 'Builds functional caller hierarchy grids statically, mapping code execution trees.',
      icon: <GitBranch size={18} />
    },
    {
      slug: 'repository-summary',
      name: 'get_repository_summary',
      desc: 'Details repository scopes including file tallies, language distribution tables, and SQL DB status.',
      icon: <Code size={18} />
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
          <span className="section-pill">API Catalog</span>
          <h1 className="font-serif font-bold text-4xl mb-4 text-charcoal">Model Context Protocol (MCP) Tools</h1>
          <p className="section-desc">
            Explore the developer APIs exposed by the CostAffective server to AI assistants.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((tool) => (
            <div key={tool.slug} className="benefit-card flex flex-col justify-between h-full">
              <div>
                <div className="benefit-icon">
                  {tool.icon}
                </div>
                <h3 className="font-mono font-bold text-base text-charcoal mt-4 mb-2">{tool.name}</h3>
                <p className="text-light text-xs leading-relaxed">{tool.desc}</p>
              </div>
              <div className="mt-6 border-t pt-4">
                <Link href={`/tools/${tool.slug}`} className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
                  View schemas & parameters <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
