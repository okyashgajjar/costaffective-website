import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

export function generateStaticParams() {
  return [
    { slug: 'context-compression-and-ast-parsing' },
    { slug: 'sqlite-codebase-query-pipelines' },
    { slug: 'mcp-transport-handshake-details' }
  ];
}

interface ArticleDetail {
  slug: string;
  title: string;
  date: string;
  author: string;
  readTime: string;
  summary: string;
  contentHtml: string;
}

const ARTICLES: Record<string, ArticleDetail> = {
  'context-compression-and-ast-parsing': {
    slug: 'context-compression-and-ast-parsing',
    title: 'Deep Dive into CostAffective: Context Compression & AST Parsing',
    date: 'June 10, 2026',
    author: 'okyashgajjar [Yash Gajjar]',
    readTime: '8 min read',
    summary: 'How CostAffective leverages tree-sitter to parse source files into concrete syntax trees, extracting local scopes and definitions to trim prompt payloads.',
    contentHtml: `
      <p>Modern AI coding agents face a major performance bottleneck: <strong>context window bloat</strong>. When an agent explores a repository to answer questions or write code, it routinely reads full files containing thousands of lines of code. This behavior wastes tokens, degrades model attention, and increases latency.</p>
      
      <h3>The Mechanics of Static AST Parsing</h3>
      <p>CostAffective-MCP resolves this by applying compiler-level static analysis directly within your workspace. Using tree-sitter, the server builds a concrete syntax tree (CST) for every source file. Instead of looking at code as unstructured text, CostAffective analyzes its grammar.</p>
      
      <p>When a coding agent queries a symbol definition, the server maps the query directly to AST coordinates (StartLine, EndLine) and extracts only the relevant code range:</p>
      
      <pre><code>// Instead of sending a 1000-line database.go file
// CostAffective sends only the exact structural scope:
func (m *Manager) GetSession(id string) (*Session, error) {
    m.mu.RLock()
    defer m.mu.RUnlock()
    session, ok := m.sessions[id]
    if !ok {
        return nil, ErrSessionNotFound
    }
    return session, nil
}</code></pre>

      <h3>AST Scope Invalidation & Watchdogs</h3>
      <p>Rather than rebuilding the entire index every time you save, CostAffective runs an internal watcher. This watchdog monitors file descriptors for modifications and triggers AST scans only for the affected scopes. This maintains index consistency in under 8ms, ensuring the agent always works with current, accurate codebase structures.</p>
      
      <h3>Key Architectural Gains</h3>
      <ul>
        <li><strong>Grammar-Aware Filtering:</strong> Separates functions, methods, struct interfaces, and variables.</li>
        <li><strong>Reduced Context Payload:</strong> Drops unrelated comments, imports, and utility functions, compressing inputs by up to 82%.</li>
        <li><strong>Deterministic Lookups:</strong> Ensures agents find definition ranges instantly, bypassing fuzzy text-matching issues.</li>
      </ul>
    `
  },
  'sqlite-codebase-query-pipelines': {
    slug: 'sqlite-codebase-query-pipelines',
    title: 'Relational SQLite Storage & Codebase Query Pipelines',
    date: 'June 08, 2026',
    author: 'okyashgajjar [Yash Gajjar]',
    readTime: '7 min read',
    summary: 'Understanding how CostAffective organizes codebase entities (symbols, references, calls) into lightweight SQLite relational database schemas.',
    contentHtml: `
      <p>Codebase intelligence tools need to serve queries in milliseconds. Storing indexes as raw JSON files or keeping heavy memory-pointer graphs in JVM heaps is slow and resource-heavy. CostAffective uses a local <strong>SQLite database</strong> built directly inside your repository directory.</p>
      
      <h3>The Schema Structure</h3>
      <p>By mapping declarations and usages into structured tables, CostAffective converts repository exploration into SQL query execution. The database implements three core schemas:</p>
      
      <pre><code>CREATE TABLE symbols (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    kind TEXT NOT NULL,
    filepath TEXT NOT NULL,
    start_line INTEGER NOT NULL,
    end_line INTEGER NOT NULL,
    signature TEXT
);

CREATE TABLE references (
    symbol_id TEXT,
    filepath TEXT NOT NULL,
    line_number INTEGER NOT NULL,
    line_content TEXT NOT NULL,
    FOREIGN KEY(symbol_id) REFERENCES symbols(id)
);

CREATE TABLE calls (
    caller_id TEXT,
    callee_name TEXT NOT NULL,
    filepath TEXT NOT NULL,
    line_number INTEGER NOT NULL
);</code></pre>

      <h3>Fast Query Pipelines</h3>
      <p>When you ask a coding agent to trace a function\'s usage, it invokes the <code>find_references</code> tool. The tool runs a single indexed query: <code>SELECT * FROM references WHERE symbol_id = ?</code>. This query returns accurate result sets in less than 2 milliseconds, bypassing slow workspace searches.</p>
      
      <h3>Performance Optimization</h3>
      <ul>
        <li><strong>Local Cache Isolation:</strong> Indexes are kept inside <code>.mycli-fts</code> directories in your project root, ensuring privacy.</li>
        <li><strong>Fast Indexes:</strong> B-Tree indexing on columns like <code>name</code> and <code>symbol_id</code> guarantees fast lookups even in large codebases.</li>
        <li><strong>Sub-Millisecond Execution:</strong> SQLite processes relational lookups without starting external network servers or opening sockets.</li>
      </ul>
    `
  },
  'mcp-transport-handshake-details': {
    slug: 'mcp-transport-handshake-details',
    title: 'Model Context Protocol: Standardizing Stdio Handshakes & Tool Execution',
    date: 'June 06, 2026',
    author: 'okyashgajjar [Yash Gajjar]',
    readTime: '6 min read',
    summary: 'A comprehensive technical breakdown of how CostAffective handles stdio-based JSON-RPC handshakes to interface with Claude Code and Cursor.',
    contentHtml: `
      <p>The Model Context Protocol (MCP), created by Anthropic, is an open standard that allows local applications and AI assistants to securely interface with local system tools. CostAffective operates as an MCP server using a stdio transport channel.</p>
      
      <h3>Stdio Bidirectional JSON-RPC Streams</h3>
      <p>When you run <code>costaffective serve</code>, the host editor (such as Cursor or Claude Code) starts CostAffective as a background subprocess. The host and server communicate by writing JSON-RPC 2.0 payloads to <code>stdin</code> and reading responses from <code>stdout</code>.</p>
      
      <pre><code>// Client -> Server Handshake Invitation
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {},
    "clientInfo": { "name": "claude-code", "version": "1.0.0" }
  }
}</code></pre>

      <h3>Tool Registry & Call Processing</h3>
      <p>During initialization, CostAffective registers its available tools: <code>search_code</code>, <code>find_symbol</code>, <code>find_references</code>, <code>find_callers</code>, and <code>get_repository_summary</code>. When the assistant needs repository context, it executes a tool call: <code>tools/call</code> with parameters matching the JSON schema.</p>
      
      <h3>Security & Isolation</h3>
      <p>Because communication occurs over stdio streams, the server operates with several security advantages:</p>
      <ul>
        <li><strong>No Network Ports:</strong> Avoids firewall warnings and prevents remote network access.</li>
        <li><strong>Client Lifecycle Control:</strong> The process exits automatically when the host editor closes, preventing background memory leaks.</li>
        <li><strong>Host-Controlled Permissions:</strong> The server runs with the user\'s local permissions, preventing privilege escalation.</li>
      </ul>
    `
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: 'Article Not Found' };
  
  return {
    title: `${article.title} | Blog`,
    description: article.summary,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) {
    notFound();
  }

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': article.title,
    'datePublished': article.date,
    'description': article.summary,
    'author': {
      '@type': 'Person',
      'name': article.author
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <section className="section-container max-w-[800px]">
        {/* Navigation Link */}
        <Link href="/blog" className="flex items-center gap-2 text-xs text-grey mb-8 hover:text-primary">
          <ArrowLeft size={12} /> Back to Blog List
        </Link>

        {/* Article Metadata */}
        <div className="border-b border-[#E5E5E0] pb-6 mb-8">
          <h1 className="font-serif font-bold text-4xl text-charcoal mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs text-grey">
            <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
            <span className="flex items-center gap-1"><User size={14} /> {article.author}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime}</span>
          </div>
        </div>

        {/* Content Body */}
        <article 
          className="prose max-w-full text-sm text-light leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </section>
    </>
  );
}
