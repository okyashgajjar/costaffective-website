import Link from 'next/link';
import { Shield, Cpu, RefreshCw, Layers, Terminal, Linkedin, Github, Twitter } from 'lucide-react';
import Script from 'next/script';
import ArchitectureVisualizer from '@/components/ArchitectureVisualizer';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import ASTSandbox from '@/components/ASTSandbox';
import ModuleBrowser from '@/components/ModuleBrowser';
import Configurator from '@/components/Configurator';

export default function Home() {
  // JSON-LD structured schemas for homepage (SEO/GEO)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'CostAffective-MCP',
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Linux, macOS, Windows',
    'offers': {
      '@type': 'Offer',
      'price': '0.00',
      'priceCurrency': 'USD'
    },
    'description': 'Local-first MCP server for repository intelligence and semantic code retrieval, designed to reduce context sizes and costs for coding agents.',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '142'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div>
            <div className="vibe-pill">
              <span className="pill-dot animate-pulse"></span>
              <span className="pill-text">Local-First Repo Intelligence</span>
            </div>
            <h1 className="hero-title text-charcoal font-bold leading-tight">
              Convert Your Remaining <span>Cost Into Coffee ☕</span>
            </h1>
            <p className="hero-subtitle text-light leading-relaxed">
              Reduce repository exploration costs, shrink context windows by up to 45.9%, and help AI coding agents find deterministic codebase answers faster.
            </p>
            <div className="hero-actions">
              <div className="install-block">
                <span className="terminal-prompt">$</span>
                <input
                  type="text"
                  value="curl -fsSL https://raw.githubusercontent.com/okyashgajjar/costaffective-mcp/main/install.sh | bash"
                  readOnly
                />
              </div>
              <div className="flex gap-3 mt-2 sm:mt-0">
                <Link href="/docs/install" className="btn btn-action">
                  Get Started
                </Link>
                <Link href="/benchmarks" className="btn btn-secondary">
                  View Benchmarks
                </Link>
              </div>
            </div>
          </div>
          <div>
            <InteractiveTerminal />
          </div>
        </div>
      </section>

      {/* Prime Claim Banner */}
      <div className="bg-[#FAF9F6] border-y border-[#E5E5E0] py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-y-2 gap-x-6 text-center text-xs md:text-sm font-mono text-charcoal font-semibold">
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold">45.9%</span> fewer tokens
          </div>
          <span className="text-grey/40 hidden md:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold">54.3%</span> fewer exploration loops
          </div>
          <span className="text-grey/40 hidden md:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold">42.1%</span> fewer tool interactions
          </div>
          <span className="text-grey/40 hidden md:inline">•</span>
          <div className="flex items-center gap-2">
            <span className="text-[#0066CC] font-bold">100%</span> Local-First
          </div>
        </div>
      </div>

      {/* Core Claims Grid */}
      <section className="benefits-section">
        <div className="grid-benefits">
          <div className="benefit-card">
            <div className="benefit-icon">
              <Shield size={20} />
            </div>
            <h3 className="font-serif font-bold text-lg text-charcoal">100% Local-First</h3>
            <p className="text-light text-xs mt-2">
              All index calculations, SQLite queries, and AST compiles execute locally. No code telemetry egress.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">
              <Cpu size={20} />
            </div>
            <h3 className="font-serif font-bold text-lg text-charcoal">MCP Compatible</h3>
            <p className="text-light text-xs mt-2">
              Plugs seamlessly into Claude Code, Cursor, Codex, VS Code, and any client supporting the stdio protocol.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">
              <RefreshCw size={20} />
            </div>
            <h3 className="font-serif font-bold text-lg text-charcoal">8ms Sync Watchdog</h3>
            <p className="text-light text-xs mt-2">
              Incremental watchdog captures file modifications on-save and updates only changed checksums instantly.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">
              <Layers size={20} />
            </div>
            <h3 className="font-serif font-bold text-lg text-charcoal">Context Compress</h3>
            <p className="text-light text-xs mt-2">
              Returns compressed, semantic code definitions instead of bloated files, preserving LLM context size.
            </p>
          </div>
        </div>
      </section>

      {/* Benchmarks Section */}
      <section className="section-container" id="benchmarks">
        <div className="section-header">
          <span className="section-pill">Retriever Performance</span>
          <h2 className="font-serif font-bold text-3xl">Quality Benchmarks</h2>
          <p className="section-desc">
            Direct measurements of context efficiency and API footprint comparing CostAffective against CodeGraph on large repositories.
          </p>
        </div>

        {/* Static Comparison Table */}
        <div className="bg-white border border-[#E5E5E0] rounded-lg overflow-hidden shadow-sm max-w-4xl mx-auto mb-6">
          <div className="p-6 border-b border-[#E5E5E0] flex justify-between items-center bg-[#FAF9F6]">
            <div>
              <h3 className="font-serif font-bold text-lg text-charcoal">Featured Case Study: Continue OSS (3,203 Files)</h3>
              <span className="text-[10px] text-grey uppercase tracking-wider font-semibold">CostAffective vs CodeGraph</span>
            </div>
            <span className="text-[10px] bg-green-500 text-white font-mono px-2 py-0.5 rounded font-bold uppercase">
              45.9% Savings
            </span>
          </div>
          <div className="overflow-x-auto font-sans text-sm">
            <table className="w-full text-left">
              <thead className="bg-[#FAF9F6] text-grey uppercase text-[10px] font-bold border-b border-[#E5E5E0]">
                <tr>
                  <th className="p-4">Evaluation Metric</th>
                  <th className="p-4">CostAffective</th>
                  <th className="p-4">CodeGraph</th>
                  <th className="p-4">Winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E0]">
                {[
                  { metric: 'Total Tokens', costAffective: '4,708,835', codeGraph: '8,707,328', winner: '🏆 CostAffective' },
                  { metric: 'Subagent Calls (Exploration Loops)', costAffective: '43', codeGraph: '94', winner: '🏆 CostAffective' },
                  { metric: 'API Calls (Tool Interactions)', costAffective: '89', codeGraph: '134', winner: '🏆 CostAffective' },
                  { metric: 'Deliverables Generated', costAffective: '4', codeGraph: '4', winner: 'Tie' }
                ].map((row) => (
                  <tr key={row.metric} className={row.metric === 'Total Tokens' ? 'bg-[#0066CC]/5 font-semibold' : ''}>
                    <td className="p-4 font-semibold text-charcoal">{row.metric}</td>
                    <td className="p-4 font-mono text-[#0066CC] font-bold">{row.costAffective}</td>
                    <td className="p-4 font-mono text-grey">{row.codeGraph}</td>
                    <td className="p-4 font-mono text-green-700 font-semibold">{row.winner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/benchmarks" className="btn btn-primary font-mono text-xs inline-flex items-center gap-1">
            View Full Benchmarks Suite →
          </Link>
        </div>
      </section>

      {/* How It Works Section (AST Sandbox) */}
      <section className="section-container border-t border-[#E5E5E0]">
        <div className="section-header">
          <span className="section-pill">Static Analysis</span>
          <h2 className="font-serif font-bold text-3xl">How It Works</h2>
          <p className="section-desc">
            CostAffective indexes codebases statically using compilers to map declarations. Experience it live inside our AST compiler simulator.
          </p>
        </div>
        <ASTSandbox />
      </section>

      {/* Architecture Section */}
      <section className="section-container border-t border-[#E5E5E0]" id="architecture">
        <div className="section-header">
          <span className="section-pill">System Layout</span>
          <h2 className="font-serif font-bold text-3xl">Architectural Overview</h2>
          <p className="section-desc">
            Hover or click components inside the relational flow diagram to examine operational modules.
          </p>
        </div>
        <ArchitectureVisualizer />
        <div className="text-center mt-8">
          <Link href="/architecture" className="btn btn-secondary font-medium text-xs">
            Deep-Dive Architecture Documentation & Diagrams →
          </Link>
        </div>
      </section>

      {/* Codebase Explorer Section */}
      <section className="section-container border-t border-[#E5E5E0]">
        <div className="section-header">
          <span className="section-pill">Module Maps</span>
          <h2 className="font-serif font-bold text-3xl">Codebase Inspector</h2>
          <p className="section-desc">
            Browse through directories of the actual CostAffective local codebase to verify its architecture.
          </p>
        </div>
        <ModuleBrowser />
      </section>

      {/* Configuration Section */}
      <section className="section-container border-t border-[#E5E5E0]" id="configuration">
        <div className="section-header">
          <span className="section-pill">Setup Guides</span>
          <h2 className="font-serif font-bold text-3xl">Editor Configurator</h2>
          <p className="section-desc">
            Select your IDE platform below to generate setup profiles.
          </p>
        </div>
        <Configurator />
      </section>

      {/* Comparison Overview Section */}
      <section className="section-container border-t border-[#E5E5E0]">
        <div className="section-header">
          <span className="section-pill">Comparisons</span>
          <h2 className="font-serif font-bold text-3xl">CostAffective vs Alternatives</h2>
          <p className="section-desc">
            See how CostAffective outperforms legacy dependency graphs and simple file search tools.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { slug: 'codegraph', name: 'CodeGraph', desc: 'Saves 43.8% token context compared to heavy code-graph pointer files.' },
            { slug: 'serena', name: 'Serena', desc: 'Restores offline security and local parsing without cloud data egress.' },
            { slug: 'graphify', name: 'Graphify', desc: 'Opt for optimized symbol arrays instead of complex spatial coordinates.' },
            { slug: 'ripgrep', name: 'ripgrep', desc: 'Retrieves logical scopes rather than noisy, generic text lines.' }
          ].map((item) => (
            <div key={item.slug} className="benefit-card flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-charcoal">{item.name}</h3>
                <p className="text-light text-xs mt-2 leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-6">
                <Link href={`/compare/${item.slug}`} className="text-xs font-semibold text-primary hover:underline">
                  Read comparison & migration →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Teaser Section */}
      <section className="section-container border-t border-[#E5E5E0]">
        <div className="section-header">
          <span className="section-pill">Questions</span>
          <h2 className="font-serif font-bold text-3xl">Frequently Asked Questions</h2>
          <p className="section-desc">
            Find answers to common questions about indexing, token optimization, and IDE integrations.
          </p>
        </div>
        <div className="max-width-[800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-b pb-4">
            <h3 className="font-serif font-bold text-lg text-charcoal mb-2">How does CostAffective save prompt tokens?</h3>
            <p className="text-light text-sm">
              Instead of piping full files to LLMs during coding tasks, CostAffective extracts only structural declarations and scopes, trimming down input contexts by up to 45.9%.
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-serif font-bold text-lg text-charcoal mb-2">Does it send my codebase to external cloud APIs?</h3>
            <p className="text-light text-sm">
              No. CostAffective operates fully local. All compilation and SQLite index writes are done locally on your computer.
            </p>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link href="/faq" className="btn btn-secondary font-medium text-xs">
            Browse All 30 Frequently Asked Questions →
          </Link>
        </div>
      </section>

      {/* Developer Profile Section */}
      <section className="section-container border-t border-[#E5E5E0]">
        <div className="section-header">
          <span className="section-pill">Creator</span>
          <h2 className="font-serif font-bold text-3xl text-charcoal">Developed by Yash Gajjar</h2>
          <p className="section-desc">
            Connect with the developer of CostAffective-MCP.
          </p>
        </div>
        <div className="max-w-[750px] mx-auto flex flex-col items-center gap-6">
          <Script
            src="https://platform.linkedin.com/badges/js/profile.js"
            strategy="afterInteractive"
          />
          <div className="w-full flex justify-center overflow-x-auto py-2">
            <div
              className="badge-base LI-profile-badge"
              data-locale="en_US"
              data-size="large"
              data-theme="light"
              data-type="HORIZONTAL"
              data-vanity="okyashgajjar"
              data-version="v1"
            >
              <a
                className="badge-base__link LI-simple-link"
                href="https://in.linkedin.com/in/okyashgajjar?trk=profile-badge"
              >
                Yash Gajjar
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 justify-center mt-2">
            <a
              href="https://github.com/okyashgajjar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-charcoal hover:text-primary transition font-semibold"
            >
              <Github size={14} />
              GitHub
            </a>
            <a
              href="https://x.com/okyashgajjar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-charcoal hover:text-primary transition font-semibold"
            >
              <Twitter size={14} />
              X / Twitter
            </a>
            <a
              href="https://huggingface.co/okyashgajjar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-charcoal hover:text-primary transition font-semibold"
            >
              <span className="text-[10px] font-mono border border-charcoal/30 px-1 rounded">HF</span>
              HuggingFace
            </a>
            <a
              href="https://ko-fi.com/okyashgajjar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-charcoal hover:text-primary transition font-semibold"
            >
              ☕ Ko-Fi
            </a>
          </div>
        </div>
      </section>

      {/* GitHub Stars CTA */}
      <section className="bg-[#FAF9F6] border-t border-[#E5E5E0] py-16 px-6">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-serif font-bold text-3xl text-charcoal mb-4">⭐ Support the Project</h2>
          <p className="text-light text-sm max-w-[500px] mx-auto mb-8 leading-relaxed">
            CostAffective is open-source (MIT). Star the repo on GitHub to help others discover local-first repository intelligence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/okyashgajjar/costaffective-mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-action py-3 px-8 font-bold text-sm inline-flex items-center gap-2"
            >
              <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              Star on GitHub
            </a>
            <a
              href="https://github.com/okyashgajjar/costaffective-mcp/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary py-3 px-8 font-bold text-sm"
            >
              Report Issue
            </a>
          </div>
        </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="bg-charcoal text-white py-20 px-6 border-t border-[#E5E5E0]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="font-serif font-bold text-4xl mb-4 text-white">Save Context. Write Code.</h2>
          <p className="text-gray-400 max-w-[600px] mx-auto mb-8 text-sm">
            Install the local-first repository intelligence server now and enjoy sub-millisecond, token-efficient semantic retrievals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="install-block bg-neutral-900 border-neutral-800 text-white font-mono text-sm py-2 px-4 rounded-md">
              <span className="text-blue-500 mr-2">$</span>
              <span>npm install -g costaffective-mcp</span>
            </div>
            <Link href="/docs/install" className="btn btn-action py-2.5 px-6 font-bold">
              View Guide
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
