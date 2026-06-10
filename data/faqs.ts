export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'core' | 'performance' | 'compatibility' | 'security';
}

export const faqsData: FAQItem[] = [
  {
    id: 'why-not-ripgrep',
    question: 'Why not just use ripgrep?',
    answer: 'Ripgrep is exceptionally fast at finding text patterns, but it has no semantic understanding of code. It doesn\'t know the difference between a variable declaration and a string literal, nor can it follow call trees. CostAffective uses Tree-sitter AST queries to build structural maps, returning precise code scopes and relationships instead of raw, noisy regex matches.',
    category: 'core'
  },
  {
    id: 'why-not-codegraph',
    question: 'Why not use CodeGraph?',
    answer: 'CodeGraph builds heavy, memory-resident dependency graphs that can bloat context sizes and consume massive RAM. CostAffective uses a lightweight SQLite index and returns compressed, symbol-level AST contexts, lowering daily prompt token usage by 45.9% compared to traditional code graphs.',
    category: 'core'
  },
  {
    id: 'what-is-repo-intelligence',
    question: 'What is repository intelligence?',
    answer: 'Repository intelligence is the process of statically parsing and indexing codebases to map structure (definitions, types, call graphs, references) into a querying system. This allows AI editors and coding agents to navigate code bases dynamically and accurately, without reading every file.',
    category: 'core'
  },
  {
    id: 'context-savings',
    question: 'How much context can CostAffective save?',
    answer: 'In global leaderboard evaluations, CostAffective reduced token consumption by 45.9%, exploration loops by 54.3%, and tool interaction latency by 88% compared to standard naive context retrievals.',
    category: 'performance'
  },
  {
    id: 'works-with-codex',
    question: 'Does it work with Codex CLI?',
    answer: 'Yes. CostAffective is fully compatible with Codex CLI, Claude Code, Cursor, OpenCode, Antigravity, and any other IDE client supporting the standard Model Context Protocol (MCP).',
    category: 'compatibility'
  },
  {
    id: 'data-privacy',
    question: 'Does my code leave my machine?',
    answer: 'No. CostAffective is 100% local-first. All AST parsing, index updates, search queries, and database lookups run locally on your system. No network egress, no telemetry, and no external code leaks.',
    category: 'security'
  },
  {
    id: 'indexing-keys',
    question: 'Do I need an LLM API key to index repositories?',
    answer: 'No. Indexing is performed statically using local tree-sitter AST parsers and SQLite compilation. No LLM APIs or cloud tokens are consumed during codebase indexing.',
    category: 'core'
  },
  {
    id: 'watchdog-sync',
    question: 'How does the watchdog update indexes?',
    answer: 'CostAffective integrates a system directory watchdog (using fsnotify). When a file save occurs, the watchdog computes the file\'s hash delta and updates only the modified files in the SQLite database, completing incremental updates in under 8ms.',
    category: 'performance'
  },
  {
    id: 'db-footprint',
    question: 'What is the SQLite database file footprint?',
    answer: 'The local SQLite index is highly optimized. On average codebases (e.g., 500 files), the database file size is less than 20MB, and memory footprint during search queries is under 15MB.',
    category: 'performance'
  },
  {
    id: 'supported-platforms',
    question: 'What platforms are supported? Does it run on macOS, Windows, and Linux?',
    answer: 'Yes. CostAffective binaries are compiled for Linux (amd64) and Windows (amd64). macOS and Linux ARM architectures can be built from source using local Go compilers.',
    category: 'compatibility'
  },
  {
    id: 'languages-supported',
    question: 'What languages does CostAffective support?',
    answer: 'CostAffective currently parses Go, Python, TypeScript, JavaScript, Rust, C++, C#, Java, and HTML/CSS out-of-the-box using official Tree-sitter parsers.',
    category: 'core'
  },
  {
    id: 'mcp-tools-exposed',
    question: 'What MCP tools does CostAffective expose?',
    answer: 'It exposes six core tools: search_code, find_symbol, find_references, find_callers, grep_code, and get_repository_summary.',
    category: 'core'
  },
  {
    id: 'search-vs-grep',
    question: 'How does search_code differ from grep_code?',
    answer: '`search_code` leverages tree-sitter AST maps to identify functional blocks matching semantic search intents. `grep_code` is a full-text regex scanner used as a fallback for strings, comments, and untracked code chunks.',
    category: 'core'
  },
  {
    id: 'monorepo-support',
    question: 'Can it index large monorepos?',
    answer: 'Yes. CostAffective is designed to handle monorepos. It leverages fast SQLite transactions and selective indexing, easily scaling to codebases containing thousands of source files.',
    category: 'performance'
  },
  {
    id: 'cursor-setup',
    question: 'How do I configure CostAffective for Cursor?',
    answer: 'Add CostAffective to Cursor\'s settings under "MCP" by specifying command "costaffective" and argument "serve" with stdio transport.',
    category: 'compatibility'
  },
  {
    id: 'docker-dependency',
    question: 'Does it require Docker?',
    answer: 'No. CostAffective runs as a standalone compiled native binary. It has zero dependencies on Docker, Docker containers, or node runtimes.',
    category: 'core'
  },
  {
    id: 'doctor-command',
    question: 'What does the costaffective doctor command validate?',
    answer: '`costaffective doctor` checks binary permissions, PATH environment variables, MCP configuration maps in user directories, SQLite read/write states, and active server run status.',
    category: 'compatibility'
  },
  {
    id: 'cpu-utilization',
    question: 'Does it consume CPU cycles when idle?',
    answer: 'No. The background watcher relies on passive OS file notification triggers. CPU cycles are consumed only for brief moments (usually <10ms) when files are modified.',
    category: 'performance'
  },
  {
    id: 'token-budget-custom',
    question: 'Can I customize the token budget?',
    answer: 'Yes. AI clients can supply token budgets as parameters to MCP tools, forcing CostAffective to compress retrieval chunks if they exceed context limits.',
    category: 'performance'
  },
  {
    id: 'claude-code-setup',
    question: 'How do I add CostAffective to Claude Code?',
    answer: 'CostAffective integrates automatically. You can install it by configuring settings in `~/.claude.json` or by running the auto-setup command `costaffective install --target claude`.',
    category: 'compatibility'
  },
  {
    id: 'external-dependencies',
    question: 'Does it index third-party vendor dependencies?',
    answer: 'By default, CostAffective ignores vendored folders (like node_modules or vendor/) to keep the index clean, but you can configure files to track internal libraries.',
    category: 'core'
  },
  {
    id: 'free-open-source',
    question: 'Is CostAffective free and open-source?',
    answer: 'Yes. CostAffective is released under the permissive MIT license and its repository is fully hosted on GitHub.',
    category: 'core'
  },
  {
    id: 'custom-ignores',
    question: 'Does it support custom ignore globs?',
    answer: 'Yes. You can configure directories, file extensions, and size thresholds in the configuration files to skip indexing unwanted files.',
    category: 'core'
  },
  {
    id: 'static-alias-resolution',
    question: 'What is static alias resolution?',
    answer: 'It is the technique of mapping import paths and structural aliases statically, allowing the resolver to find correct declarations even if import paths use directory alias pointers (e.g. `@/components`).',
    category: 'core'
  },
  {
    id: 'mcp-specification',
    question: 'What is the Model Context Protocol (MCP)?',
    answer: 'The Model Context Protocol (MCP) is an open standard created by Anthropic that connects AI models to secure local or remote data sources and developer tools.',
    category: 'compatibility'
  },
  {
    id: 'session-isolation',
    question: 'Are search caches isolated across sessions?',
    answer: 'Yes. The session manager isolates query caches, temporary index modifications, and search history boundaries for every active developer workspace.',
    category: 'security'
  },
  {
    id: 'build-from-source',
    question: 'How do I build CostAffective from source?',
    answer: 'Clone the repository and run `go build ./cmd/costaffective`. This compiles a standalone binary in the current directory.',
    category: 'compatibility'
  },
  {
    id: 'real-time-sync',
    question: 'What happens if files change during a chat session?',
    answer: 'The incremental watchdog registers the changes and updates the index. The next tool call issued by the coding agent instantly queries the fresh code state.',
    category: 'performance'
  },
  {
    id: 'index-sharing',
    question: 'Can I export the database index?',
    answer: 'Yes, the index is stored as a standard SQLite `.db` file in the repository cache, allowing users to copy it to speed up first-time indexing on other machines.',
    category: 'core'
  },
  {
    id: 'why-buy-coffee',
    question: 'What is "Save tokens. Buy Coffee"?',
    answer: 'It is a reminder that prompt tokens are expensive. By saving 45.9% on prompt contexts, developers can convert their cloud spending into real coffee.',
    category: 'core'
  }
];
