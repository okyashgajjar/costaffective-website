import Link from 'next/link';
import {
  Shield, Cpu, RefreshCw, Layers, Github, ArrowRight, Database,
  Archive, Search, BookMarked, Terminal, BarChart3, Sparkles,
  ChevronRight, Play, FileText
} from 'lucide-react';
import Script from 'next/script';
import ArchitectureVisualizer from '@/components/ArchitectureVisualizer';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import ASTSandbox from '@/components/ASTSandbox';
import ModuleBrowser from '@/components/ModuleBrowser';
import Configurator from '@/components/Configurator';
import Reveal from '@/components/Reveal';
import CopyCommand from '@/components/CopyCommand';

const INSTALL_CMD = 'curl -fsSL https://raw.githubusercontent.com/okyashgajjar/costwise-mcp/main/install.sh | bash';

export const metadata = {
  title: 'CostWise-MCP — Open-Source MCP Server for AI Coding Agents | Yash Gajjar',
  description:
    'CostWise is the #1 open-source MCP server built by Yash Gajjar. Slash AI coding token & prompt-cache cost with 11 MCP tools: Tree-sitter retrieval, stash/recall context control, and token-budgeted summaries. Works with Claude Code, Cursor, Codex CLI & OpenCode. 100% local.',
  openGraph: {
    title: 'CostWise-MCP — Open-Source MCP Server for AI Coding Agents',
    description:
      'Slash AI coding token costs with 11 open-source MCP tools. Tree-sitter retrieval, stash_context/recall, and token-budgeted summaries. Built by Yash Gajjar.',
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CostWise-MCP',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Linux, macOS, Windows',
    offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD' },
    description:
      'Local-first MCP server for repository intelligence and semantic code retrieval, designed to reduce context size and prompt-cache cost for AI coding agents.',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '142' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ========================== HERO ========================== */}
      <section className="hero-section" id="hero">
        <div className="hero-grid-bg" />
        <div className="hero-container">
          <div>
            <Reveal y={20}>
              <div className="vibe-pill">
                <span className="pill-dot animate-pulse" />
                <span className="pill-text">Local-First Repository Intelligence</span>
              </div>
            </Reveal>

            <Reveal y={24} delay={0.05}>
              <h1 className="hero-title">
                Coding agents should&nbsp;behave like&nbsp;<span className="hero-gradient-text">experienced engineers</span>.
              </h1>
            </Reveal>

            <Reveal y={20} delay={0.1}>
              <p className="hero-subtitle">
                An experienced engineer does not re-read the same files every turn, rediscover the same symbols,
                or carry a 5,000-line log in memory. CostWise gives your AI coding agent the same instincts —
                from a local index, not from file dumps.
              </p>
            </Reveal>

            <Reveal y={16} delay={0.18}>
              <div className="hero-actions">
                <CopyCommand command={INSTALL_CMD} />
                <div className="flex gap-3">
                  <Link href="/docs/install" className="btn btn-action">
                    Get Started
                  </Link>
                  <Link href="/vision" className="btn btn-secondary">
                    Read the Vision
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal y={10} delay={0.22}>
              <div className="trust-bar">
                <span className="trust-label">Works with</span>
                {['Claude Code', 'Cursor', 'Codex', 'OpenCode', 'Antigravity'].map((c) => (
                  <span key={c} className="trust-chip">
                    <span className="dot" />
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal y={20} delay={0.15}>
            <InteractiveTerminal />
          </Reveal>
        </div>
      </section>

      {/* ========================== STAT STRIP ========================== */}
      <section className="section-container section-tight">
        <Reveal>
          <div className="stat-strip">
            {[
              { num: '100%', lbl: 'Local-first', sub: 'No data ever leaves your machine' },
            ].map((s) => (
              <div key={s.lbl} className="stat-cell">
                <div className="num">{s.num}</div>
                <span className="lbl">{s.lbl}</span>
                <span className="stat-sub">{s.sub}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>


      {/* ========================== PROOF ========================== */}
      <section className="section-container" id="proof">
        <Reveal>
          <div className="section-header">
            <span className="eyebrow">See it in action</span>
            <h2 className="font-bold text-3xl mt-3">Without CostWise vs with</h2>
            <p className="section-desc">
              Same task. Same model. The left side reads files. The right side uses the index.
            </p>
          </div>
        </Reveal>

        <div className="proof-grid">
          <Reveal delay={0.05}>
            <div className="proof-card">
              <div className="proof-label">
                <span className="proof-badge bad">Without</span>
                <span>Naive file reads — no index</span>
              </div>
              <a
                href="https://raw.githubusercontent.com/okyashgajjar/costwise-mcp/main/proofs/without-mcp-smallrepo-opencode.png"
                target="_blank"
                rel="noopener noreferrer"
                className="proof-image-link"
              >
                <img
                  src="https://raw.githubusercontent.com/okyashgajjar/costwise-mcp/main/proofs/without-mcp-smallrepo-opencode.png"
                  alt="OpenCode without CostWise — many tool calls, high token count"
                  className="proof-image"
                  loading="lazy"
                />
              </a>
              <a
                href="https://raw.githubusercontent.com/okyashgajjar/costwise-mcp/main/proofs/opencode-without-costwise.webm"
                target="_blank"
                rel="noopener noreferrer"
                className="proof-video-link"
              >
                <Play size={12} /> Watch video
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="proof-card">
              <div className="proof-label">
                <span className="proof-badge good">With</span>
                <span>Index-backed tool calls</span>
              </div>
              <a
                href="https://raw.githubusercontent.com/okyashgajjar/costwise-mcp/main/proofs/with-mcp-smallrepo-opencode.png"
                target="_blank"
                rel="noopener noreferrer"
                className="proof-image-link"
              >
                <img
                  src="https://raw.githubusercontent.com/okyashgajjar/costwise-mcp/main/proofs/with-mcp-smallrepo-opencode.png"
                  alt="OpenCode with CostWise — minimal tool calls, low token count"
                  className="proof-image"
                  loading="lazy"
                />
              </a>
              <a
                href="https://raw.githubusercontent.com/okyashgajjar/costwise-mcp/main/proofs/opencode-with-costwise.webm"
                target="_blank"
                rel="noopener noreferrer"
                className="proof-video-link"
              >
                <Play size={12} /> Watch video
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================== THE PROBLEM ========================== */}
      <section className="benefits-section">
        <div className="section-container">
          <Reveal>
            <div className="section-header">
              <span className="eyebrow">The problem</span>
              <h2 className="font-bold text-3xl mt-3">Why long sessions get expensive</h2>
              <p className="section-desc">
                The expensive part is not the model&apos;s output. It is everything around it.
              </p>
            </div>
          </Reveal>

          <div className="problem-grid">
            {[
              {
                title: 'Repositories get re-explored',
                body: 'Ask your coding agent "where is X defined" and it reads the file. Ask again five minutes later — it reads the same file again. Each read puts thousands of tokens into the context window.',
                stat: '2-5x redundant file reads per session',
              },
              {
                title: 'Context grows without being useful',
                body: 'A typical session starts small. Then the model dumps a file to answer a question. Then a test output. Then a build log. None of these leave — they accumulate in the resident context window.',
                stat: 'Accumulated context persists across turns, driving up costs',
              },
              {
                title: 'The prompt cache makes it worse',
                body: 'Every turn pays to read the entire resident context. Any change or idle gap forces a full rewrite. In one measured call, $2.84 of a $2.95 charge was the cache write — the output was under 4K tokens.',
                stat: 'Cache writes dominate API cost vs actual output',
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="problem-card">
                  <h3 className="font-bold text-lg text-charcoal">{item.title}</h3>
                  <p className="text-light text-sm mt-2 leading-relaxed">{item.body}</p>
                  <div className="problem-stat">{item.stat}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="text-center mt-10">
              <Link href="/vision" className="link-anim text-sm inline-flex items-center gap-1">
                Read the full reasoning <ArrowRight size={13} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================== THE SOLUTION ========================== */}
      <section className="section-container">
        <Reveal>
          <div className="section-header">
            <span className="eyebrow">How CostWise fixes it</span>
            <h2 className="font-bold text-3xl mt-3">One lever: shrink the context window</h2>
            <p className="section-desc">
              A server cannot control how the client caches. It can only control how many tokens ever enter the window.
            </p>
          </div>
        </Reveal>

        <div className="solution-grid">
          {[
            {
              icon: <Database size={22} />,
              title: 'Answer from a local index',
              body: 'Navigation questions — "where is this defined", "who calls this" — are answered from a Tree-sitter SQLite index in a few tokens instead of by dumping source files.',
            },
            {
              icon: <BookMarked size={22} />,
              title: 'Remember facts instead of repeating',
              body: 'The remember tool persists a durable fact per repository. The recall tool retrieves it later. Facts are written down once instead of re-derived every turn.',
            },
            {
              icon: <Archive size={22} />,
              title: 'Stash large output instead of pasting',
              body: 'Stash_context parks a large blob out of context behind a ~20 token handle. Recall pulls back only the matching slice, within a token budget. Lossless.',
            },
            {
              icon: <Sparkles size={22} />,
              title: 'Session-awareness skill',
              body: 'A 275-token guidance delivered to every MCP client teaches the model the lean workflow automatically. Also installable as a native Claude Code skill.',
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <div className="benefit-card h-full">
                <div className="benefit-icon">{item.icon}</div>
                <h3 className="font-bold text-lg text-charcoal">{item.title}</h3>
                <p className="text-light text-xs mt-2 leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================== CORE BENEFITS ========================== */}
      <section className="benefits-section">
        <div className="section-container">
          <Reveal>
            <div className="section-header">
              <span className="eyebrow">Why teams use it</span>
              <h2 className="font-bold text-3xl mt-3">Built for cost, speed, and privacy</h2>
              <p className="section-desc">Four properties that hold no matter how large the repository gets.</p>
            </div>
          </Reveal>
          <div className="grid-benefits !px-0">
            {[
              { icon: <Shield size={20} />, title: '100% Local-First', body: 'All indexing, SQLite queries, and AST parsing run locally. No telemetry, no code egress.' },
              { icon: <Cpu size={20} />, title: 'MCP Compatible', body: 'Plugs into Claude Code, Cursor, Codex, OpenCode, Antigravity, and any stdio MCP client.' },
              { icon: <RefreshCw size={20} />, title: 'Incremental Sync', body: 'A file watchdog re-indexes only changed files on save, so the index stays fresh without full rebuilds.' },
              { icon: <Layers size={20} />, title: 'Context Control', body: 'Returns compressed scopes, budgeted summaries, and out-of-context stashes instead of bloated files.' },
            ].map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="benefit-card h-full">
                  <div className="benefit-icon">{b.icon}</div>
                  <h3 className="font-bold text-lg text-charcoal">{b.title}</h3>
                  <p className="text-light text-xs mt-2 leading-relaxed">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== STASH → RECALL → REMEMBER ========================== */}
      <section className="section-container">
        <Reveal>
          <div className="section-header">
            <span className="eyebrow">Context control</span>
            <h2 className="font-bold text-3xl mt-3">Stash the monster, recall the slice</h2>
            <p className="section-desc">
              Three tools form one loop that keeps the window small without ever losing information.
            </p>
          </div>
        </Reveal>
        <div className="loop-steps">
          {[
            { n: 1, icon: <Archive size={18} />, h: 'stash_context', p: 'A 5,000-line log goes to disk and returns a ~20 token handle instead of flooding the window.' },
            { n: 2, icon: <Search size={18} />, h: 'recall', p: 'Pull back only the lines that match your query, trimmed to a token budget.' },
            { n: 3, icon: <BookMarked size={18} />, h: 'remember', p: 'Keep the durable conclusion as a fact so it is never re-derived next turn.' },
          ].map((s, i) => (
            <Reveal key={s.h} delay={i * 0.08}>
              <div className="loop-step">
                <span className="step-num">{s.n}</span>
                <h4 className="flex items-center gap-2">{s.icon}{s.h}</h4>
                <p>{s.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="text-center text-light text-sm mt-8 max-w-2xl mx-auto">
            The <strong className="text-charcoal">costwise-session</strong> skill teaches your editor to do this
            automatically, delivered to every MCP client through the protocol&apos;s instructions field.
          </p>
        </Reveal>
      </section>

      {/* ========================== TOOLS ========================== */}
      <section className="benefits-section">
        <div className="section-container">
          <Reveal>
            <div className="section-header">
              <span className="eyebrow">The toolset</span>
              <h2 className="font-bold text-3xl mt-3">Eleven tools, one goal</h2>
              <p className="section-desc">
                Retrieval answers questions in a few tokens. Context-control keeps large content and durable facts
                out of the window entirely.
              </p>
            </div>
          </Reveal>
          <div className="tool-grid">
            {[
              { name: 'search_code', tag: 'retrieval', desc: 'Semantic AST search that returns relevant scopes, not whole files.' },
              { name: 'find_symbol', tag: 'retrieval', desc: 'Resolve a definition to a location in a single index lookup.' },
              { name: 'read_symbol', tag: 'retrieval', desc: 'Return a symbol\'s implementation body by name, from the indexed line range.' },
              { name: 'find_references', tag: 'retrieval', desc: 'Every usage of a symbol, precomputed for impact analysis.' },
              { name: 'find_callers', tag: 'retrieval', desc: 'Who calls this function, from stored call edges.' },
              { name: 'get_repository_summary', tag: 'maint', desc: 'Token-budgeted repo map with drill-down. Stays small on any repo.' },
              { name: 'index_repository', tag: 'maint', desc: 'Manual re-index. Usually unnecessary; the watchdog handles it.' },
              { name: 'remember', tag: 'context', desc: 'Persist a durable fact per repository so it is never repeated inline.' },
              { name: 'stash_context', tag: 'context', desc: 'Park a large blob out of context; get back a tiny handle. Lossless.' },
              { name: 'recall', tag: 'context', desc: 'Pull back only the slice a query needs, from a stash or from facts.' },
              { name: 'session_brief', tag: 'context', desc: 'Compact summary of past sessions — facts, stashes, reindex events.' },
            ].map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 0.05} as="div">
                <div className="tool-card h-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="tool-name">{t.name}</span>
                    <span className={`tool-tag ${t.tag}`}>{t.tag === 'maint' ? 'maintain' : t.tag}</span>
                  </div>
                  <p className="tool-desc">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/tools" className="btn btn-secondary font-medium text-xs">
              View full tool catalog with schemas
            </Link>
          </div>
        </div>
      </section>

      {/* ========================== ARCHITECTURE ========================== */}
      <section className="section-container" id="architecture">
        <Reveal>
          <div className="section-header">
            <span className="eyebrow">System layout</span>
            <h2 className="font-bold text-3xl mt-3">Architecture</h2>
            <p className="section-desc">Hover or click components in the flow diagram to inspect each module.</p>
          </div>
        </Reveal>
        <ArchitectureVisualizer />
        <div className="text-center mt-8">
          <Link href="/architecture" className="btn btn-secondary font-medium text-xs">
            Deep-dive architecture documentation
          </Link>
        </div>
      </section>

      {/* ========================== AST SANDBOX ========================== */}
      <section className="benefits-section">
        <div className="section-container">
          <Reveal>
            <div className="section-header">
              <span className="eyebrow">Static analysis</span>
              <h2 className="font-bold text-3xl mt-3">How retrieval works</h2>
              <p className="section-desc">
                CostWise indexes code structurally with Tree-sitter. Explore it live in the AST simulator.
              </p>
            </div>
          </Reveal>
          <ASTSandbox />
        </div>
      </section>

      {/* ========================== CODEBASE INSPECTOR ========================== */}
      <section className="section-container">
        <Reveal>
          <div className="section-header">
            <span className="eyebrow">Module maps</span>
            <h2 className="font-bold text-3xl mt-3">Codebase inspector</h2>
            <p className="section-desc">Browse the actual CostWise codebase to verify its structure.</p>
          </div>
        </Reveal>
        <ModuleBrowser />
      </section>

      {/* ========================== CONFIGURATOR ========================== */}
      <section className="benefits-section" id="configuration">
        <div className="section-container">
          <Reveal>
            <div className="section-header">
              <span className="eyebrow">Setup</span>
              <h2 className="font-bold text-3xl mt-3">Editor configurator</h2>
              <p className="section-desc">Select your IDE to generate a setup profile.</p>
            </div>
          </Reveal>
          <Configurator />
        </div>
      </section>

      {/* ========================== COMPARISONS ========================== */}
      <section className="section-container">
        <Reveal>
          <div className="section-header">
            <span className="eyebrow">Comparisons</span>
            <h2 className="font-bold text-3xl mt-3">CostWise vs alternatives</h2>
            <p className="section-desc">How it compares to dependency graphs and plain text search.</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { slug: 'codegraph', name: 'CodeGraph', desc: 'Scoped AST lookups instead of heavy code-graph pointer files.' },
            { slug: 'serena', name: 'Serena', desc: 'Restores offline parsing without cloud data egress.' },
            { slug: 'graphify', name: 'Graphify', desc: 'Optimized symbol arrays instead of complex spatial coordinates.' },
            { slug: 'ripgrep', name: 'ripgrep', desc: 'Retrieves logical scopes rather than noisy text lines.' },
          ].map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.05}>
              <div className="benefit-card flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-bold text-lg text-charcoal">{item.name}</h3>
                  <p className="text-light text-xs mt-2 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-6">
                  <Link href={`/compare/${item.slug}`} className="link-anim text-xs">
                    Read comparison
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================== FAQ TEASER ========================== */}
      <section className="benefits-section">
        <div className="section-container">
          <Reveal>
            <div className="section-header">
              <span className="eyebrow">Questions</span>
              <h2 className="font-bold text-3xl mt-3">Frequently asked</h2>
              <p className="section-desc">Indexing, token optimization, and IDE integration.</p>
            </div>
          </Reveal>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: 'How does it save prompt tokens?',
                a: 'It returns structural declarations and scopes from a local index instead of whole files, and lets the model park large output out of context, trimming input significantly.',
              },
              {
                q: 'Does my code leave my machine?',
                a: 'No. All parsing and SQLite index writes happen locally. There are no API keys and no cloud indexing.',
              },
              {
                q: 'How is this different from grep or ripgrep?',
                a: 'grep returns lines. CostWise understands structure — it knows where a function body starts and ends, who calls it, and what it references. From a pre-built index, in microseconds.',
              },
              {
                q: 'Does it work with any LLM provider?',
                a: 'It works with any editor that supports MCP tools — Claude Code, Cursor, OpenCode, Codex CLI, and any stdio-based MCP client.',
              },
            ].map((item) => (
              <div key={item.q} className="border-b pb-4">
                <h3 className="font-bold text-lg text-charcoal mb-2">{item.q}</h3>
                <p className="text-light text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/faq" className="btn btn-secondary font-medium text-xs">
              Browse all FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* ========================== BOTTOM CTA ========================== */}
      <section className="cta-section">
        <div className="max-w-[800px] mx-auto text-center">
          <Reveal y={20}>
            <h2 className="cta-title">Save context. Write code.</h2>
            <p className="cta-subtitle">
              Install the local-first repository intelligence server and keep your AI coding sessions fast, private,
              and token-efficient.
            </p>
            <div className="flex flex-col items-center gap-4">
              <CopyCommand command={INSTALL_CMD} dark />
              <div className="flex gap-3">
                <Link href="/docs/install" className="btn btn-action py-2.5 px-6 font-bold">
                  View Guide
                </Link>
                <a
                  href="https://github.com/okyashgajjar/costwise-mcp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary py-2.5 px-6 font-bold !text-white !border-white/20 hover:!bg-white/10 inline-flex items-center gap-2"
                >
                  <Github size={16} /> Star on GitHub
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Script src="https://platform.linkedin.com/badges/js/profile.js" strategy="afterInteractive" />
    </>
  );
}
