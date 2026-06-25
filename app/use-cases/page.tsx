import Link from 'next/link';
import { Shield, GitPullRequest, Code, Search, Layers } from 'lucide-react';

export const metadata = {
  title: 'MCP Server Use Cases — AI Coding, Code Review & Repository Intelligence | CostWise',
  description: 'Real-world use cases for the CostWise MCP server: slash AI coding token costs, accelerate code reviews with AST-aware search, navigate monorepos with token-budgeted summaries, and audit codebases with call-graph analysis.',
};

export default function UseCases() {
  const casesLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'CostWise MCP Use Cases',
    'description': 'Identifies key developer workflows including monorepo search, agent context optimization, and structural codebase review audits.'
  };

  const list = [
    {
      title: 'AI Coding Agents',
      desc: 'Coding agents often query wide scopes, loading massive file volumes into prompt context. CostWise intercepts calls, statically locates exact symbol references, and returns only logical bounds, saving substantially on token expenses.',
      icon: <Layers className="text-blue-600" />
    },
    {
      title: 'Large Monorepos',
      desc: 'Standard regex grep scanners choke on monorepos with thousands of files. CostWise utilizes fast SQLite b-tree indexes to query symbol locations, returning matches in microseconds without scanning disk directories on every query.',
      icon: <Search className="text-green-600" />
    },
    {
      title: 'Code Reviews',
      desc: 'Understand the impact of incoming commits. CostWise traces function caller hierarchies, indicating which structures depend on changes to help developers audit side-effects.',
      icon: <GitPullRequest className="text-purple-600" />
    },
    {
      title: 'Repository Audits',
      desc: 'Verify architectural health and validate implementation standards. The get_repository_summary tool reports file distribution, language split ratios, and missing implementations.',
      icon: <Shield className="text-orange-600" />
    },
    {
      title: 'MCP Development',
      desc: 'Serve as an outstanding reference model for developing custom local tools. Learn stdio protocol handshake, system fsnotify watcher setups, and tree-sitter relational mapping.',
      icon: <Code className="text-pink-600" />
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(casesLd) }}
      />

      <section className="section-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-pill">Workflows</span>
          <h1 className="font-serif font-bold text-4xl mb-4 text-charcoal">Use Case Studies</h1>
          <p className="section-desc">
            Explore how teams leverage local AST relational lookups to scale context efficiencies.
          </p>
        </div>

        {/* Use Case Cards */}
        <div className="space-y-8">
          {list.map((item, idx) => (
            <div key={idx} className="bg-white border border-[#E5E5E0] rounded-lg p-8 flex flex-col md:flex-row gap-6 shadow-sm items-start">
              <div className="bg-[#FAF9F6] p-4 rounded-lg border border-[#E5E5E0] flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-charcoal mb-3">{item.title}</h3>
                <p className="text-light text-sm leading-relaxed mb-4">{item.desc}</p>
                <Link href="/docs/install" className="text-xs font-semibold text-primary hover:underline">
                  Read integration guide →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
