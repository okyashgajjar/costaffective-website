import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Code, HelpCircle } from 'lucide-react';

export function generateStaticParams() {
  return [
    { slug: 'search-code' },
    { slug: 'find-symbol' },
    { slug: 'find-references' },
    { slug: 'find-callers' },
    { slug: 'read-symbol' },
    { slug: 'repository-summary' },
    { slug: 'session-brief' },
    { slug: 'index-repository' },
    { slug: 'remember' },
    { slug: 'stash-context' },
    { slug: 'recall' }
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface ToolDetail {
  name: string;
  purpose: string;
  inputs: { name: string; type: string; required: boolean; desc: string }[];
  outputs: string;
  bestPractices: string[];
  exampleInput: string;
  exampleOutput: string;
}

const TOOLS: Record<string, ToolDetail> = {
  'search-code': {
    name: 'search_code',
    purpose: 'Executes static AST fuzzy searches matching semantic keywords or variable names across indexed codebase files.',
    inputs: [
      { name: 'query', type: 'string', required: true, desc: 'Fuzzy search pattern or functional keyword.' },
      { name: 'budget', type: 'string', required: false, desc: 'Token boundary limit (small: 500, medium: 1500, large: 3000).' }
    ],
    outputs: 'Returns an array of file records containing coordinates, matched lines, and symbol scopes.',
    bestPractices: [
      'Supply a token budget to prevent AI prompt overflow on wide matches.',
      'Use exact function names where possible to trigger direct SQLite lookups.'
    ],
    exampleInput: `{\n  "query": "NewServer",\n  "budget": "small"\n}`,
    exampleOutput: `[\n  {\n    "file": "internal/mcpserver/server.go",\n    "line": 42,\n    "content": "func NewServer(addr string) *Server {",\n    "context": "AST scope: func NewServer (lines 42-60)"\n  }\n]`
  },
  'find-symbol': {
    name: 'find_symbol',
    purpose: 'Queries the relational index to find the exact declaration bounds of a symbol (class, struct, interface, function, or global variable).',
    inputs: [
      { name: 'symbol', type: 'string', required: true, desc: 'The exact symbol name to resolve.' },
      { name: 'repo_path', type: 'string', required: true, desc: 'Absolute path to the workspace root.' }
    ],
    outputs: 'Returns the source file path, declaration kind, and line numbers of the matching symbol.',
    bestPractices: [
      'Avoid regex expressions; this tool expects exact symbol tokens.',
      'Always query repository_summary first if you are unsure of symbol naming conventions.'
    ],
    exampleInput: `{\n  "symbol": "TreeSitterRetriever",\n  "repo_path": "/home/mryg/Research-Architectures/CLI"\n}`,
    exampleOutput: `{\n  "file": "internal/retriever/treesitter.go",\n  "kind": "struct",\n  "lines": "12-45",\n  "content": "type TreeSitterRetriever struct {\\n\\tDB *sql.DB\\n}"\n}`
  },
  'find-references': {
    name: 'find_references',
    purpose: 'Locates all files and line references accessing a specific symbol name statically across the repository.',
    inputs: [
      { name: 'symbol', type: 'string', required: true, desc: 'The target symbol token.' },
      { name: 'repo_path', type: 'string', required: true, desc: 'Absolute path to the workspace root.' }
    ],
    outputs: 'Returns a list of occurrences with filenames, line bounds, and adjacent line contents.',
    bestPractices: [
      'Perfect for assessing the impact of refactoring functions.',
      'Helps agents verify how mock interfaces are set up in test files.'
    ],
    exampleInput: `{\n  "symbol": "QueryReferences",\n  "repo_path": "/home/mryg/Research-Architectures/CLI"\n}`,
    exampleOutput: `[\n  {\n    "file": "internal/store/sqlite.go",\n    "line": 112,\n    "content": "return s.QueryReferences(sym)"\n  }\n]`
  },
  'find-callers': {
    name: 'find_callers',
    purpose: 'Constructs call tree trees indicating which methods invoke a target function.',
    inputs: [
      { name: 'function', type: 'string', required: true, desc: 'Function identifier.' },
      { name: 'repo_path', type: 'string', required: true, desc: 'Absolute path to the workspace root.' }
    ],
    outputs: 'Returns names of calling functions mapped to files.',
    bestPractices: [
      'Use this to understand call execution routes without trace analyzers.',
      'Combines with find_references to audit recursive dependencies.'
    ],
    exampleInput: `{\n  "function": "SaveSymbols",\n  "repo_path": "/home/mryg/Research-Architectures/CLI"\n}`,
    exampleOutput: `[\n  {\n    "caller": "func ReIndexFile",\n    "file": "internal/watcher/watchdog.go",\n    "line": 84\n  }\n]`
  },
  'repository-summary': {
    name: 'get_repository_summary',
    purpose: 'Returns a token-budgeted overview of the repository: languages, the top modules by symbol count, and key symbols. The output is hard-capped so it stays small no matter how large the repository is. Pass a module to drill into one directory on demand.',
    inputs: [
      { name: 'repo_path', type: 'string', required: true, desc: 'Absolute path to the workspace root.' },
      { name: 'budget', type: 'string', required: false, desc: 'Output token cap: small (~500), medium (~1500), large (~3000). Default small.' },
      { name: 'module', type: 'string', required: false, desc: 'Optional module name or directory path to drill into instead of the whole repo.' }
    ],
    outputs: 'A compact text overview: file and symbol counts, language mix, top modules with a "+N more" rollup, and entry points, all within the token budget.',
    bestPractices: [
      'Call this on first connection to learn the repo shape cheaply, without dumping a file tree into context.',
      'Use the module argument to drill into one directory instead of widening the whole summary.'
    ],
    exampleInput: `{\n  "repo_path": "/path/to/repo",\n  "budget": "small"\n}`,
    exampleOutput: `Files: 100\nSymbols: 988\nTest Files: 22\nLanguages: go:99, python:1\nModules:\n  retrieval (go) - 26 files, 296 symbols\n  treesitter (go) - 12 files, 105 symbols\n  +23 more modules (62 files, 587 symbols)\nEntry Points: cmd/costwise/main.go`
  },
  'read-symbol': {
    name: 'read_symbol',
    purpose: 'Return the full source code of a symbol (function, method, or type) by name — the implementation body itself, not just its location. Use this instead of reading a whole file when you need to see how something is implemented.',
    inputs: [
      { name: 'repo_path', type: 'string', required: true, desc: 'Absolute path to the workspace root.' },
      { name: 'symbol', type: 'string', required: true, desc: 'Symbol name to read (function/method/type).' },
      { name: 'budget', type: 'string', required: false, desc: 'Token budget: small (500), medium (1500), large (3000). Default medium.' }
    ],
    outputs: 'The full source code of the matching symbol, extracted from the indexed line range.',
    bestPractices: [
      'Use this instead of reading a whole file when you need to see how a specific function or type is implemented.',
      'Pair with find_symbol to first locate the definition, then read the body.'
    ],
    exampleInput: `{\n  "symbol": "NewServer",\n  "repo_path": "/path/to/repo",\n  "budget": "medium"\n}`,
    exampleOutput: `// internal/mcpserver/server.go:42-60\nfunc NewServer() *Server {\n\treturn &Server{\n\t\ttools:   make(map[string]mcp.Tool),\n\t\thandlers: make(map[string]func(mcp.CallToolRequest) (*mcp.CallToolResult, error)),\n\t}\n}`
  },
  'index-repository': {
    name: 'index_repository',
    purpose: 'Manually trigger a re-index of the repository. Usually unnecessary because the file watchdog re-indexes changed files automatically on save.',
    inputs: [
      { name: 'repo_path', type: 'string', required: true, desc: 'Absolute path to the workspace root.' }
    ],
    outputs: 'A short report of how many files were changed, skipped, deleted, and the new total.',
    bestPractices: [
      'Use only after a large external change (e.g. a branch switch) if you want to force a refresh immediately.',
      'In normal use the watchdog keeps the index fresh, so you rarely need this.'
    ],
    exampleInput: `{\n  "repo_path": "/path/to/repo"\n}`,
    exampleOutput: `Repository re-indexed successfully.\nChanged: 12\nSkipped: 88\nDeleted: 0\nTotal: 100`
  },
  'remember': {
    name: 'remember',
    purpose: 'Persist a small durable fact (a decision, an entrypoint, a gotcha) to a per-repository store, so it does not have to be repeated inline in the conversation every time it is relevant. This keeps the context window small.',
    inputs: [
      { name: 'repo_path', type: 'string', required: true, desc: 'Absolute path to the workspace root.' },
      { name: 'key', type: 'string', required: true, desc: 'Short label for the fact, e.g. "auth-entrypoint".' },
      { name: 'fact', type: 'string', required: true, desc: 'The fact to remember, in one or two sentences.' }
    ],
    outputs: 'A short confirmation. The fact is stored per repository and survives across sessions.',
    bestPractices: [
      'Write down conclusions you would otherwise re-derive or re-paste each turn.',
      'Retrieve facts later with recall instead of restating them inline.'
    ],
    exampleInput: `{\n  "repo_path": "/path/to/repo",\n  "key": "auth-entrypoint",\n  "fact": "Auth starts in server/auth.go Login()."\n}`,
    exampleOutput: `Remembered "auth-entrypoint". Use recall(query="auth-entrypoint") to retrieve it.`
  },
  'stash-context': {
    name: 'stash_context',
    purpose: 'Park a large blob (a whole file, a long command or test output, a generated report) out of the conversation and get back a short handle. Nothing is lost: the full content is written to disk and remains re-fetchable with recall. This is the most direct lever on context-window size.',
    inputs: [
      { name: 'repo_path', type: 'string', required: true, desc: 'Absolute path to the workspace root.' },
      { name: 'content', type: 'string', required: true, desc: 'The large text to stash out of context.' },
      { name: 'label', type: 'string', required: false, desc: 'Optional short label describing the content.' }
    ],
    outputs: 'A tiny confirmation containing the handle and approximate token size kept out of context.',
    bestPractices: [
      'Stash large output instead of pasting it inline, where it would be re-cached every turn.',
      'Then use recall with the handle to pull back only the slice you actually need.'
    ],
    exampleInput: `{\n  "repo_path": "/path/to/repo",\n  "content": "<5,000 lines of build log>",\n  "label": "ci-build-log"\n}`,
    exampleOutput: `Stashed "ci-build-log" -> a1b2c3d4e5f6 (~18000 tokens kept out of context). Read only what you need with recall(source="a1b2c3d4e5f6", query=...).`
  },
  'session-brief': {
    name: 'session_brief',
    purpose: 'Get a compact summary of what happened in past session(s) on this repo — facts remembered, content stashed, files reindexed. Use this to catch up before starting work, instead of re-deriving context from scratch.',
    inputs: [
      { name: 'repo_path', type: 'string', required: true, desc: 'Absolute path to the workspace root.' },
      { name: 'scope', type: 'string', required: false, desc: 'Scope: "last" (default, since last session boundary), "today", "all".' },
      { name: 'budget', type: 'string', required: false, desc: 'Token budget (default 300). Events are oldest-first within scope.' },
      { name: 'sessions', type: 'string', required: false, desc: 'Number of past sessions to return (e.g. "5" for last 5). Overrides scope.' }
    ],
    outputs: 'A compact text summary of past session activity: facts remembered, content stashed, and files reindexed, within the budget.',
    bestPractices: [
      'Call this at the start of a new session to catch up on context without re-reading earlier conversations.',
      'Use the scope or sessions parameter to control how far back to look.'
    ],
    exampleInput: `{\n  "repo_path": "/path/to/repo",\n  "scope": "last",\n  "budget": "300"\n}`,
    exampleOutput: `=== Session Brief (last session) ===\nRemembered facts:\n  auth-entrypoint: "Auth starts in server/auth.go Login()."\nStashed content:\n  ci-build-log (handle: a1b2c3, ~18k tokens)\nFiles reindexed: 0`
  },
  'recall': {
    name: 'recall',
    purpose: 'Take back only what you need: the budgeted slice of a stashed blob (by handle), or matching remembered facts, instead of re-reading the whole thing. This is the read side of the stash/recall loop.',
    inputs: [
      { name: 'repo_path', type: 'string', required: true, desc: 'Absolute path to the workspace root.' },
      { name: 'query', type: 'string', required: true, desc: 'What to look for within the source.' },
      { name: 'source', type: 'string', required: false, desc: 'A stash handle to read from, or "facts" for remembered facts. Omit to search both.' },
      { name: 'budget', type: 'string', required: false, desc: 'Token budget for the returned slice (small, medium, large).' }
    ],
    outputs: 'Only the matching lines from the stash (or matching facts), trimmed to the token budget.',
    bestPractices: [
      'Pair with stash_context: stash the monster, then recall only the lines that match your query.',
      'Narrow the query or raise the budget if the result is truncated.'
    ],
    exampleInput: `{\n  "repo_path": "/path/to/repo",\n  "source": "a1b2c3d4e5f6",\n  "query": "error",\n  "budget": "small"\n}`,
    exampleOutput: `internal/build/step.go:142: error: undefined symbol "Foo"\n... +3 more matching lines (narrow the query or raise budget)`
  }
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tool = TOOLS[slug];
  if (!tool) return { title: 'Tool Not Found' };
  
  return {
    title: `MCP Tool: ${tool.name} | CostWise Specs`,
    description: `Learn how AI coding agents execute the ${tool.name} tool. Explore arguments, outputs, and copy-paste schemas.`,
    alternates: { canonical: `/tools/${slug}` },
  };
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = TOOLS[slug];
  if (!tool) {
    notFound();
  }

  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': `CostWise MCP Tool: ${tool.name}`,
    'description': tool.purpose
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />

      <section className="section-container">
        {/* Back Link */}
        <Link href="/tools" className="flex items-center gap-2 text-xs text-grey mb-8 hover:text-primary">
          <ArrowLeft size={12} /> Back to Tools Overview
        </Link>

        {/* Header */}
        <div className="section-header text-left max-w-full mb-12">
          <span className="section-pill font-mono uppercase text-[10px]">{tool.name} tool</span>
          <h1 className="font-serif font-bold text-4xl text-charcoal mb-4 mt-2">
            Tool: {tool.name}
          </h1>
          <p className="text-light text-base max-w-[700px] leading-relaxed">
            {tool.purpose}
          </p>
        </div>

        {/* Input Parameters Schema */}
        <div className="bg-white border border-[#E5E5E0] rounded-lg overflow-hidden shadow-sm mb-12">
          <div className="p-6 border-b border-[#E5E5E0] bg-[#FAF9F6]">
            <h3 className="font-serif font-bold text-lg text-charcoal">Arguments Schema</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-[#FAF9F6] text-grey uppercase text-[10px] font-bold border-b border-[#E5E5E0]">
                <tr>
                  <th className="p-4">Parameter</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Required</th>
                  <th className="p-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E0]">
                {tool.inputs.map((param) => (
                  <tr key={param.name}>
                    <td className="p-4 font-mono font-bold text-charcoal">{param.name}</td>
                    <td className="p-4 font-mono text-grey">{param.type}</td>
                    <td className="p-4 font-mono">
                      {param.required ? (
                        <span className="text-red-600 font-semibold text-xs">Required</span>
                      ) : (
                        <span className="text-grey text-xs">Optional</span>
                      )}
                    </td>
                    <td className="p-4 text-light text-xs">{param.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Examples Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-charcoal text-white rounded-lg p-6 font-mono text-xs overflow-x-auto">
            <div className="text-gray-400 border-b border-gray-800 pb-2 mb-4 flex justify-between">
              <span>Tool Input JSON</span>
              <span className="text-[10px] text-blue-400">Request</span>
            </div>
            <pre className="text-blue-300">{tool.exampleInput}</pre>
          </div>
          <div className="bg-charcoal text-white rounded-lg p-6 font-mono text-xs overflow-x-auto">
            <div className="text-gray-400 border-b border-gray-800 pb-2 mb-4 flex justify-between">
              <span>Tool Response JSON</span>
              <span className="text-[10px] text-green-400">Response</span>
            </div>
            <pre className="text-green-300">{tool.exampleOutput}</pre>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-[#FAF9F6] border border-[#E5E5E0] rounded-lg p-8">
          <h3 className="font-serif font-bold text-xl text-charcoal mb-4">Developer Best Practices</h3>
          <ul className="space-y-3">
            {tool.bestPractices.map((bp, idx) => (
              <li key={idx} className="text-sm text-light flex items-start gap-3 leading-relaxed">
                <Check size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                <span>{bp}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
