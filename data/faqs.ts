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
    answer: 'Ripgrep is exceptionally fast at finding text patterns, but it has no semantic understanding of code. It doesn\'t know the difference between a variable declaration and a string literal, nor can it follow call trees. CostWise uses Tree-sitter AST queries to build structural maps, returning precise code scopes and relationships instead of raw, noisy regex matches.',
    category: 'core'
  },
  {
    id: 'why-not-codegraph',
    question: 'Why not use CodeGraph?',
    answer: 'CodeGraph builds heavy, memory-resident dependency graphs that can bloat context sizes and consume massive RAM. CostWise uses a lightweight SQLite index and returns compressed, symbol-level AST contexts instead of raw file contents.',
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
    question: 'How much context can CostWise save?',
    answer: 'CostWise reduces unnecessary context accumulation by answering from a local index, budgeting summaries, and moving large output out of the context window with stash and recall. This keeps every turn\'s context smaller than naive file-reading approaches.',
    category: 'performance'
  },
  {
    id: 'prompt-cache-cost',
    question: 'How does CostWise reduce prompt-cache cost in long sessions?',
    answer: 'In long sessions the dominant cost is usually the prompt cache, not the model output: every turn pays to read the entire resident context, and any change to earlier context or a short idle gap forces a full rewrite of it. A server cannot control how a client caches, but it can control how many tokens enter the context window. CostWise keeps that window small by answering from a local index, budgeting summaries, and moving large output out of context with stash_context and recall, which makes every turn cheaper to read and cheaper to rewrite.',
    category: 'performance'
  },
  {
    id: 'stash-recall',
    question: 'What do the stash_context and recall tools do?',
    answer: 'stash_context parks a large blob (a whole file, a long command output, a generated report) out of the conversation and returns a short handle, so it does not sit in the context window being re-cached every turn. recall pulls back only the slice that matches a query, within a token budget. Nothing is lost: the full content is written to disk and is always re-fetchable. This is lossless context reduction: it relocates tokens rather than deleting them.',
    category: 'core'
  },
  {
    id: 'session-skill',
    question: 'What is the costwise-session skill?',
    answer: 'It is a small piece of session-awareness guidance, about 275 tokens, that teaches the AI assistant to keep the session lean automatically: route large output through stash_context and recall, persist durable facts with remember, and prefer narrow retrieval over reading whole files. It is delivered to every MCP client through the protocol instructions field, plus a native Claude Code skill, so it applies once per session without you having to ask each time.',
    category: 'core'
  },
  {
    id: 'works-with-codex',
    question: 'Does it work with Codex CLI?',
    answer: 'Yes. CostWise is fully compatible with Codex CLI, Claude Code, Cursor, OpenCode, Antigravity, and any other IDE client supporting the standard Model Context Protocol (MCP).',
    category: 'compatibility'
  },
  {
    id: 'data-privacy',
    question: 'Does my code leave my machine?',
    answer: 'No. CostWise is 100% local-first. All AST parsing, index updates, search queries, and database lookups run locally on your system. No network egress, no telemetry, and no external code leaks.',
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
    answer: 'CostWise integrates a system directory watchdog (using fsnotify). When a file save occurs, the watchdog computes the file\'s hash delta and updates only the modified files in the SQLite database, completing incremental updates in under 8ms.',
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
    answer: 'Yes. CostWise binaries are compiled for Linux (amd64) and Windows (amd64). macOS and Linux ARM architectures can be built from source using local Go compilers.',
    category: 'compatibility'
  },
  {
    id: 'languages-supported',
    question: 'What languages does CostWise support?',
    answer: 'CostWise currently parses Go, Python, TypeScript, JavaScript, Rust, C++, C#, Java, and HTML/CSS out-of-the-box using official Tree-sitter parsers.',
    category: 'core'
  },
  {
    id: 'mcp-tools-exposed',
    question: 'What MCP tools does CostWise expose?',
    answer: 'It exposes eleven MCP tools: five for retrieval (search_code, find_symbol, read_symbol, find_references, find_callers), two for maintenance (get_repository_summary, index_repository), and four for context control (remember, stash_context, recall, session_brief).',
    category: 'core'
  },
  {
    id: 'monorepo-support',
    question: 'Can it index large monorepos?',
    answer: 'Yes. CostWise is designed to handle monorepos. It leverages fast SQLite transactions and selective indexing, easily scaling to codebases containing thousands of source files.',
    category: 'performance'
  },
  {
    id: 'cursor-setup',
    question: 'How do I configure CostWise for Cursor?',
    answer: 'Add CostWise to Cursor\'s settings under "MCP" by specifying command "costwise" and argument "serve" with stdio transport.',
    category: 'compatibility'
  },
  {
    id: 'docker-dependency',
    question: 'Does it require Docker?',
    answer: 'No. CostWise runs as a standalone compiled native binary. It has zero dependencies on Docker, Docker containers, or node runtimes.',
    category: 'core'
  },
  {
    id: 'doctor-command',
    question: 'What does the costwise doctor command validate?',
    answer: '`costwise doctor` checks binary permissions, PATH environment variables, MCP configuration maps in user directories, SQLite read/write states, and active server run status.',
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
    answer: 'Yes. AI clients can supply token budgets as parameters to MCP tools, forcing CostWise to compress retrieval chunks if they exceed context limits.',
    category: 'performance'
  },
  {
    id: 'claude-code-setup',
    question: 'How do I add CostWise to Claude Code?',
    answer: 'CostWise integrates automatically. You can install it by configuring settings in `~/.claude.json` or by running the auto-setup command `costwise install --target claude`.',
    category: 'compatibility'
  },
  {
    id: 'external-dependencies',
    question: 'Does it index third-party vendor dependencies?',
    answer: 'By default, CostWise ignores vendored folders (like node_modules or vendor/) to keep the index clean, but you can configure files to track internal libraries.',
    category: 'core'
  },
  {
    id: 'free-open-source',
    question: 'Is CostWise free and open-source?',
    answer: 'Yes. CostWise is released under the permissive MIT license and its repository is fully hosted on GitHub.',
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
    question: 'How do I build CostWise from source?',
    answer: 'Clone the repository and run `go build ./cmd/costwise`. This compiles a standalone binary in the current directory.',
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
    answer: 'It is a reminder that prompt tokens are expensive and caching them across long sessions adds up fast. By keeping the context window lean, developers can reduce their cloud spending.',
    category: 'core'
  }
];
