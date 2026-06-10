'use client';

import { useState } from 'react';

interface CodeSnippet {
  name: string;
  lang: string;
  lines: string[];
  stats: {
    time: string;
    tokens: string;
    compression: string;
  };
  symbols: string[];
  refs: string[];
}

const SNIPPETS: Record<string, CodeSnippet> = {
  go: {
    name: 'installer.go',
    lang: 'go',
    stats: { time: '8ms', tokens: '425', compression: '52.3%' },
    symbols: ['func SetupClient', 'type ConfigStruct', 'func InjectConfig'],
    refs: ['sqlite.DB', 'os.Path', 'path.Join'],
    lines: [
      `package main`,
      `import "fmt"`,
      `// SetupClient registers transport configurations`,
      `func SetupClient(target string) error {`,
      `    fmt.Printf("Injecting configuration paths for: %s\\n", target)`,
      `    err := InjectConfig(target)`,
      `    if err != nil {`,
      `        return fmt.Errorf("failed to setup: %w", err)`,
      `    }`,
      `    return nil`,
      `}`
    ]
  },
  python: {
    name: 'parser.py',
    lang: 'python',
    stats: { time: '12ms', tokens: '685', compression: '45.9%' },
    symbols: ['class Parser', 'def parse_file', 'def extract_symbols'],
    refs: ['tree_sitter', 'sqlite3', 'sys.argv'],
    lines: [
      `import tree_sitter`,
      `class Parser:`,
      `    def __init__(self, language):`,
      `        self.language = language`,
      `    def parse_file(self, filepath):`,
      `        """Extract functions and calls from path"""`,
      `        print(f"Parsing AST for: {filepath}")`,
      `        tree = self.language.parse(filepath)`,
      `        return self.extract_symbols(tree.root_node)`
    ]
  },
  typescript: {
    name: 'config.ts',
    lang: 'typescript',
    stats: { time: '4ms', tokens: '204', compression: '61.2%' },
    symbols: ['interface ServerSetting', 'const DefaultConfig', 'function loadConfig'],
    refs: ['fs.readFileSync', 'JSON.parse', 'path.resolve'],
    lines: [
      `import * as fs from 'fs';`,
      `import * as path from 'path';`,
      `interface ServerSetting {`,
      `  command: string;`,
      `  args: string[];`,
      `}`,
      `export function loadConfig(configPath: string): ServerSetting {`,
      `  const raw = fs.readFileSync(path.resolve(configPath), 'utf-8');`,
      `  return JSON.parse(raw) as ServerSetting;`,
      `}`
    ]
  }
};

export default function ASTSandbox() {
  const [activeSnippet, setActiveSnippet] = useState<string>('python');
  const [indexingState, setIndexingState] = useState<'idle' | 'scanning' | 'done'>('done');

  const selected = SNIPPETS[activeSnippet] || SNIPPETS.python;

  const handleIndexClick = () => {
    setIndexingState('scanning');
    setTimeout(() => {
      setIndexingState('done');
    }, 1200);
  };

  return (
    <div className="sandbox-layout">
      {/* Code Editor Mock */}
      <div className="sandbox-editor-card">
        <div className="editor-header">
          <div className="editor-tabs">
            {Object.keys(SNIPPETS).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveSnippet(key);
                  setIndexingState('done');
                }}
                className={`editor-tab ${activeSnippet === key ? 'active' : ''}`}
              >
                {SNIPPETS[key].name}
              </button>
            ))}
          </div>
          <button 
            onClick={handleIndexClick}
            disabled={indexingState === 'scanning'}
            className="btn btn-action py-1 px-4 text-xs font-bold font-sans"
          >
            {indexingState === 'scanning' ? 'Scanning...' : 'Index File'}
          </button>
        </div>
        <div className="editor-body">
          <pre className="code-container">
            <code>
              {selected.lines.map((line, idx) => {
                // simple syntax highlighter matching
                let renderedLine = line;
                
                // Highlight keywords
                const kw = ['func', 'package', 'import', 'class', 'def', 'if', 'return', 'interface', 'const', 'export', 'function'];
                kw.forEach(w => {
                  const reg = new RegExp(`\\b${w}\\b`, 'g');
                  renderedLine = renderedLine.replace(reg, `<span class="ast-keyword">${w}</span>`);
                });

                // Highlight types
                const types = ['error', 'string', 'ServerSetting', 'Parser'];
                types.forEach(t => {
                  const reg = new RegExp(`\\b${t}\\b`, 'g');
                  renderedLine = renderedLine.replace(reg, `<span class="ast-type">${t}</span>`);
                });

                return (
                  <div key={idx} dangerouslySetInnerHTML={{ __html: renderedLine }} />
                );
              })}
            </code>
          </pre>
        </div>
      </div>

      {/* Analysis Details Panel */}
      <div className="sandbox-analysis-card">
        <div className="diag-status">
          <span className={`diag-pip ${indexingState === 'scanning' ? 'indexing' : 'active'}`} />
          <span className="diag-text">
            {indexingState === 'scanning' ? 'Running AST Indexer...' : 'Local Watchdog Idle'}
          </span>
        </div>

        <div className="analysis-stats">
          <div className="stat-row">
            <span className="text-light">Parsing speed:</span>
            <span className="font-mono font-bold text-charcoal">
              {indexingState === 'scanning' ? '--' : selected.stats.time}
            </span>
          </div>
          <div className="stat-row">
            <span className="text-light">Tokens compressed:</span>
            <span className="font-mono font-bold text-charcoal">
              {indexingState === 'scanning' ? '--' : selected.stats.tokens}
            </span>
          </div>
          <div className="stat-row highlight">
            <span className="text-charcoal font-bold">Context reduction:</span>
            <span className="font-mono font-bold text-green-600">
              {indexingState === 'scanning' ? '--' : selected.stats.compression}
            </span>
          </div>
        </div>

        <div className="parsed-symbols-box">
          <h4 className="font-serif font-bold text-sm text-charcoal mb-2">Extracted AST Nodes</h4>
          
          <div className="symbols-list">
            {indexingState === 'scanning' ? (
              <div className="text-grey font-mono text-center pt-8">Indexing...</div>
            ) : (
              <>
                <div className="mb-2">
                  <div className="text-grey text-[10px] uppercase font-bold mb-1">Declarations</div>
                  {selected.symbols.map((sym) => (
                    <span key={sym} className="sym-tag symbol">{sym}</span>
                  ))}
                </div>
                <div>
                  <div className="text-grey text-[10px] uppercase font-bold mb-1">References</div>
                  {selected.refs.map((ref) => (
                    <span key={ref} className="sym-tag ref">{ref}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
