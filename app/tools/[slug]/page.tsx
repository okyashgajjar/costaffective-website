import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Code, HelpCircle } from 'lucide-react';

export function generateStaticParams() {
  return [
    { slug: 'search-code' },
    { slug: 'find-symbol' },
    { slug: 'find-references' },
    { slug: 'find-callers' },
    { slug: 'repository-summary' }
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
    purpose: 'Returns a high-level overview of the entire repository scope, including file counters, index structures, active watchdog locks, and tracked extensions.',
    inputs: [
      { name: 'repo_path', type: 'string', required: true, desc: 'Absolute path to the workspace root.' }
    ],
    outputs: 'Summary object detailing language distribution, file counts, and index file size.',
    bestPractices: [
      'Execute this on first chat connection to learn file sizes and language scopes.',
      'Check file count scales before running wide recursive grep tool calls.'
    ],
    exampleInput: `{\n  "repo_path": "/home/mryg/Research-Architectures/CLI"\n}`,
    exampleOutput: `{\n  "status": "ready",\n  "file_count": 28,\n  "languages": {\n    "go": "82%",\n    "markdown": "12%",\n    "yaml": "6%"\n  },\n  "index_size_mb": 14.2,\n  "watchdog": "active"\n}`
  }
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tool = TOOLS[slug];
  if (!tool) return { title: 'Tool Not Found' };
  
  return {
    title: `MCP Tool: ${tool.name} | CostAffective Specs`,
    description: `Learn how AI coding agents execute the ${tool.name} tool. Explore arguments, outputs, and copy-paste schemas.`,
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
    'name': `CostAffective MCP Tool: ${tool.name}`,
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
