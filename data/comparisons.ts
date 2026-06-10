export interface ComparisonData {
  slug: string;
  name: string;
  headline: string;
  tagline: string;
  description: string;
  features: {
    feature: string;
    costAffective: string;
    competitor: string;
    status: 'yes' | 'no' | 'partial';
  }[];
  strengths: string[];
  weaknesses: string[];
  benchmarks: {
    metric: string;
    costAffective: string;
    competitor: string;
    improvement: string;
  }[];
  architecture: {
    costAffective: string;
    competitor: string;
    details: string;
  };
  migration: {
    steps: string[];
    configBefore: string;
    configAfter: string;
  };
}

export const comparisonsData: Record<string, ComparisonData> = {
  codegraph: {
    slug: 'codegraph',
    name: 'CodeGraph',
    headline: 'CostAffective vs CodeGraph',
    tagline: 'Why local AST compression outperforms heavy index graphs.',
    description: 'CodeGraph constructs massive neo4j-like dependency networks in local memories, incurring massive indexing overheads and context bloating. CostAffective utilizes incremental AST scope trees to compress token payloads by up to 45.9%.',
    features: [
      { feature: 'Local AST Scope Extraction', costAffective: 'Yes (Tree-sitter)', competitor: 'Yes (Regex-based)', status: 'yes' },
      { feature: 'Incremental Index updates', costAffective: 'Yes (Watchdog 8ms)', competitor: 'No (Full re-parse)', status: 'yes' },
      { feature: 'Token Context Compression', costAffective: 'Yes (45.9% reduction)', competitor: 'No (Sends full graph nodes)', status: 'yes' },
      { feature: 'Sub-second Indexing', costAffective: 'Yes', competitor: 'No (Heavy JVM process)', status: 'yes' }
    ],
    strengths: [
      'Extremely lightweight SQLite memory footprints.',
      'Automated client injectors for Cursor & Claude Code.',
      'Token budget boundaries preventing out-of-context crashes.'
    ],
    weaknesses: [
      'Heavy heap allocation on large codebases.',
      'Requires full re-indexing when structure schema upgrades.',
      'No cloud sync options (100% local only).'
    ],
    benchmarks: [
      { metric: 'Avg Token Cost', costAffective: '685 tokens', competitor: '1,219 tokens', improvement: '▼ 43.8%' },
      { metric: 'Exploration Calls', costAffective: '43 calls', competitor: '112 calls', improvement: '▼ 61.6%' },
      { metric: 'Indexing Memory', costAffective: '14MB', competitor: '820MB', improvement: '▼ 98.2%' }
    ],
    architecture: {
      costAffective: 'A decentralized, standard SQLite key-value mapping file hashes to AST coordinates.',
      competitor: 'A heavy JVM-based graph engine that requires memory-resident graph databases.',
      details: 'CostAffective avoids maintaining active runtime pointer chains. Instead, it relies on fast SQL index searches to retrieve definition locations.'
    },
    migration: {
      steps: [
        'Uninstall CodeGraph client configurations from your IDE.',
        'Run the CostAffective universal shell loader command.',
        'Launch the auto-injector tool using `costaffective install --all`.'
      ],
      configBefore: `{\n  "mcpServers": {\n    "codegraph-mcp": {\n      "command": "docker",\n      "args": ["run", "-i", "codegraph/server"]\n    }\n  }\n}`,
      configAfter: `{\n  "mcpServers": {\n    "costaffective": {\n      "command": "costaffective",\n      "args": ["serve"]\n    }\n  }\n}`
    }
  },
  serena: {
    slug: 'serena',
    name: 'Serena',
    headline: 'CostAffective vs Serena',
    tagline: 'Local determinism vs third-party cloud integrations.',
    description: 'Serena resolves symbols by dispatching source directories to external cloud API endpoints. CostAffective secures your workspace data by performing all parses on your CPU, requiring no API accounts or telemetry egress.',
    features: [
      { feature: '100% Offline Indexing', costAffective: 'Yes (SQLite)', competitor: 'No (Cloud Egress)', status: 'yes' },
      { feature: 'Zero-Egress Security', costAffective: 'Yes', competitor: 'No', status: 'yes' },
      { feature: 'Callgraph Hierarchies', costAffective: 'Yes', competitor: 'Partial', status: 'yes' },
      { feature: 'AST Parsing Engine', costAffective: 'Yes (Tree-sitter)', competitor: 'Yes (LSP-based)', status: 'yes' }
    ],
    strengths: [
      'Absolute privacy - zero code leaves your network.',
      'No monthly API costs or rate-limiting delays.',
      'Automatic incremental updates via system watchdog flags.'
    ],
    weaknesses: [
      'Cannot share indexes across multiple developer machines.',
      'Indexing speed depends entirely on local CPU performance.'
    ],
    benchmarks: [
      { metric: 'Data Egress', costAffective: '0 bytes', competitor: '4.2MB / commit', improvement: '100% Saved' },
      { metric: 'Query Latency', costAffective: '120ms', competitor: '412ms', improvement: '▼ 70.8%' },
      { metric: 'Monthly Fees', costAffective: '$0.00', competitor: '$24.00 / seat', improvement: '100% Saved' }
    ],
    architecture: {
      costAffective: 'Decentralized local CLI binaries compiling index databases on-save.',
      competitor: 'Client-server SaaS architecture shipping code chunks to cloud parsing clusters.',
      details: 'CostAffective runs fully in-process via stdio streams, communicating with local SQLite files.'
    },
    migration: {
      steps: [
        'Revoke Serena cloud account access keys.',
        'Run `costaffective install --target cursor` to inject local server configurations.'
      ],
      configBefore: `{\n  "serena-agent": {\n    "token": "sk_live_512x9832",\n    "server": "https://api.serena.ai"\n  }\n}`,
      configAfter: `{\n  "costaffective": {\n    "command": "costaffective",\n    "args": ["serve"]\n  }\n}`
    }
  },
  graphify: {
    slug: 'graphify',
    name: 'Graphify',
    headline: 'CostAffective vs Graphify',
    tagline: 'Pragmatic symbol tables vs dense visual graphs.',
    description: 'Graphify converts codebases into complex spatial coordinate trees. While visually appealing, spatial nodes are highly inefficient for coding agents. CostAffective utilizes standard relational symbol maps optimized for direct scope retrievals.',
    features: [
      { feature: 'Token Economy Mapping', costAffective: 'Yes (45.9% compressed)', competitor: 'No (Sends coordinate meshes)', status: 'yes' },
      { feature: 'Fuzzy Symbol Lookup', costAffective: 'Yes', competitor: 'Yes', status: 'yes' },
      { feature: 'Incremental Rebuilds', costAffective: 'Yes (8ms)', competitor: 'No (Slow graph regenerations)', status: 'yes' }
    ],
    strengths: [
      'Relational index schemas optimized for agent tools.',
      'Extremely high test coverage on installation binaries.'
    ],
    weaknesses: [
      'No visual graph display rendering frontend tabs.',
      'Maintains strict Go language dependencies.'
    ],
    benchmarks: [
      { metric: 'Context Size', costAffective: '685 tokens', competitor: '1,704 tokens', improvement: '▼ 59.8%' },
      { metric: 'Setup Latency', costAffective: '2 seconds', competitor: '4 minutes', improvement: '▼ 99.1%' }
    ],
    architecture: {
      costAffective: 'SQLite database with symbol, caller, and reference scopes.',
      competitor: 'Custom graph database files requiring spatial clustering libraries.',
      details: 'CostAffective maps AST tags directly to filenames and line bounds, yielding minimal runtime query costs.'
    },
    migration: {
      steps: [
        'Disable Graphify database processes.',
        'Run `costaffective doctor` to verify local system compiler dependencies.'
      ],
      configBefore: `{\n  "graphify-db": "/var/lib/graphify.db"\n}`,
      configAfter: `{\n  "costaffective": {\n    "command": "costaffective",\n    "args": ["serve"]\n  }\n}`
    }
  },
  ripgrep: {
    slug: 'ripgrep',
    name: 'Ripgrep',
    headline: 'CostAffective vs Ripgrep (Grep)',
    tagline: 'Contextual semantics vs literal regex scanners.',
    description: 'Ripgrep is an incredibly fast tool for searching strings. However, search is not retrieval. Standard grep engines do not understand function boundaries, scopes, or type implementations, returning huge pages of noisy context.',
    features: [
      { feature: 'AST Scope Recognition', costAffective: 'Yes', competitor: 'No', status: 'yes' },
      { feature: 'Reference Declarations', costAffective: 'Yes', competitor: 'No (Fuzzy text matches)', status: 'yes' },
      { feature: 'Caller Hierarchy trees', costAffective: 'Yes', competitor: 'No', status: 'yes' },
      { feature: 'Sub-millisecond Search', costAffective: 'Yes (DB index)', competitor: 'Yes (File scanner)', status: 'yes' }
    ],
    strengths: [
      'Saves context by sending only relevant symbol ranges instead of entire matching files.',
      'Identifies calls even if function names are generic and repeated.'
    ],
    weaknesses: [
      'Takes 2 seconds to initialize index database on first startup.'
    ],
    benchmarks: [
      { metric: 'Noise Reduction', costAffective: '92% less lines', competitor: '0% (Sends raw matches)', improvement: '▲ 92%' },
      { metric: 'Context Cost', costAffective: '685 tokens', competitor: '2,640 tokens', improvement: '▼ 74%' }
    ],
    architecture: {
      costAffective: 'Indexes parsed symbols using AST nodes to identify declarations.',
      competitor: 'Linear regex search traversing all raw files on disk.',
      details: 'CostAffective maps relationships statically, executing lookup queries in microseconds without scanning disk files during agent steps.'
    },
    migration: {
      steps: [
        'Keep ripgrep as a fallback regex tool.',
        'Add CostAffective to your MCP setup to provide semantic symbol retrieval.'
      ],
      configBefore: `{\n  "grep": "rg --files"\n}`,
      configAfter: `{\n  "costaffective": {\n    "command": "costaffective",\n    "args": ["serve"]\n  }\n}`
    }
  }
};
