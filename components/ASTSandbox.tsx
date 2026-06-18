'use client';

import { useState } from 'react';

interface CodeSnippet {
  name: string;
  lang: string;
  lines: string[];
  stats: { time: string; tokens: string; compression: string };
  /** Identifiers declared in this file (underlined cyan when indexed). */
  declarations: string[];
  /** Symbols and member calls referenced (underlined purple when indexed). */
  references: string[];
}

const SNIPPETS: Record<string, CodeSnippet> = {
  go: {
    name: 'installer.go',
    lang: 'go',
    stats: { time: '8ms', tokens: '425', compression: '52.3%' },
    declarations: ['SetupClient'],
    references: ['InjectConfig', 'fmt.Printf', 'fmt.Errorf'],
    lines: [
      'package main',
      'import "fmt"',
      '',
      '// SetupClient registers transport configurations',
      'func SetupClient(target string) error {',
      '    fmt.Printf("Injecting config for: %s", target)',
      '    err := InjectConfig(target)',
      '    if err != nil {',
      '        return fmt.Errorf("setup failed: %w", err)',
      '    }',
      '    return nil',
      '}',
    ],
  },
  python: {
    name: 'parser.py',
    lang: 'python',
    stats: { time: '12ms', tokens: '685', compression: '45.9%' },
    declarations: ['Parser', 'parse_file'],
    references: ['tree_sitter', 'extract_symbols'],
    lines: [
      'import tree_sitter',
      '',
      'class Parser:',
      '    def __init__(self, language):',
      '        self.language = language',
      '',
      '    def parse_file(self, filepath):',
      '        tree = self.language.parse(filepath)',
      '        return self.extract_symbols(tree.root_node)',
    ],
  },
  typescript: {
    name: 'config.ts',
    lang: 'typescript',
    stats: { time: '4ms', tokens: '204', compression: '61.2%' },
    declarations: ['ServerSetting', 'loadConfig'],
    references: ['fs.readFileSync', 'path.resolve', 'JSON.parse'],
    lines: [
      "import * as fs from 'fs';",
      "import * as path from 'path';",
      '',
      'interface ServerSetting {',
      '  command: string;',
      '  args: string[];',
      '}',
      '',
      'export function loadConfig(configPath: string): ServerSetting {',
      "  const raw = fs.readFileSync(path.resolve(configPath), 'utf-8');",
      '  return JSON.parse(raw) as ServerSetting;',
      '}',
    ],
  },
};

type Seg = { text: string; cls?: string };
type Rule = { source: string; cls: string };

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Splits a line into classified segments. Each rule only acts on text that has
// not been classified yet, so an inserted class name can never be re-matched
// (the bug that previously leaked raw `class="..."` markup into the page).
function tokenize(line: string, rules: Rule[]): Seg[] {
  let segs: Seg[] = [{ text: line }];
  for (const rule of rules) {
    const out: Seg[] = [];
    for (const seg of segs) {
      if (seg.cls) {
        out.push(seg);
        continue;
      }
      const re = new RegExp(rule.source, 'g');
      let last = 0;
      let m: RegExpExecArray | null;
      while ((m = re.exec(seg.text)) !== null) {
        if (m.index > last) out.push({ text: seg.text.slice(last, m.index) });
        out.push({ text: m[0], cls: rule.cls });
        last = m.index + m[0].length;
        if (m[0].length === 0) re.lastIndex++;
      }
      if (last < seg.text.length) out.push({ text: seg.text.slice(last) });
    }
    segs = out;
  }
  return segs;
}

function buildRules(snippet: CodeSnippet, indexed: boolean): Rule[] {
  const rules: Rule[] = [
    { source: '(//[^\\n]*$)|(#[^\\n]*$)', cls: 'ast-comment' },
    { source: '(["\'`])(?:\\\\.|(?!\\1)[^\\\\])*\\1', cls: 'ast-string' },
  ];
  // Symbol underlines only appear after the file has been indexed.
  if (indexed) {
    for (const d of snippet.declarations) rules.push({ source: `\\b${escapeRe(d)}\\b`, cls: 'ast-symbol' });
    for (const r of snippet.references) rules.push({ source: `\\b${escapeRe(r)}`, cls: 'ast-ref' });
  }
  rules.push({
    source: '\\b(func|package|import|class|def|if|return|interface|const|export|function|as)\\b',
    cls: 'ast-keyword',
  });
  rules.push({ source: '\\b(error|string)\\b', cls: 'ast-type' });
  return rules;
}

export default function ASTSandbox() {
  const [activeSnippet, setActiveSnippet] = useState<string>('typescript');
  const [status, setStatus] = useState<'unindexed' | 'scanning' | 'done'>('unindexed');

  const selected = SNIPPETS[activeSnippet] || SNIPPETS.typescript;
  const indexed = status === 'done';
  const rules = buildRules(selected, indexed);

  const handleIndexClick = () => {
    setStatus('scanning');
    setTimeout(() => setStatus('done'), 1100);
  };

  const buttonLabel =
    status === 'scanning' ? 'Scanning...' : status === 'done' ? 'Re-index' : 'Index File';

  return (
    <div className="sandbox-layout">
      {/* Code editor */}
      <div className="sandbox-editor-card">
        <div className="editor-header">
          <div className="editor-tabs">
            {Object.keys(SNIPPETS).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveSnippet(key);
                  setStatus('unindexed');
                }}
                className={`editor-tab ${activeSnippet === key ? 'active' : ''}`}
              >
                {SNIPPETS[key].name}
              </button>
            ))}
          </div>
          <button
            onClick={handleIndexClick}
            disabled={status === 'scanning'}
            className="btn btn-action py-1 px-4 text-xs font-bold font-sans"
          >
            {buttonLabel}
          </button>
        </div>
        <div className="editor-body">
          <pre className="code-container">
            <code>
              {selected.lines.map((line, idx) => {
                const segs = tokenize(line, rules);
                return (
                  <div key={idx} className="ast-line">
                    {line === ''
                      ? ' '
                      : segs.map((seg, i) =>
                          seg.cls ? (
                            <span key={i} className={seg.cls}>
                              {seg.text}
                            </span>
                          ) : (
                            <span key={i}>{seg.text}</span>
                          )
                        )}
                  </div>
                );
              })}
            </code>
          </pre>
          {!indexed && status !== 'scanning' && (
            <div className="ast-hint">Click Index File to underline declarations and references</div>
          )}
        </div>
      </div>

      {/* Analysis panel */}
      <div className="sandbox-analysis-card">
        <div className="diag-status">
          <span
            className={`diag-pip ${status === 'scanning' ? 'indexing' : status === 'done' ? 'active' : ''}`}
          />
          <span className="diag-text">
            {status === 'scanning'
              ? 'Running AST indexer...'
              : status === 'done'
              ? 'Indexed and synced'
              : 'Local watchdog idle'}
          </span>
        </div>

        <div className="analysis-stats">
          <div className="stat-row">
            <span className="text-light">Parsing speed</span>
            <span className="font-mono font-bold text-charcoal">{indexed ? selected.stats.time : '--'}</span>
          </div>
          <div className="stat-row">
            <span className="text-light">Tokens after compression</span>
            <span className="font-mono font-bold text-charcoal">{indexed ? selected.stats.tokens : '--'}</span>
          </div>
          <div className="stat-row highlight">
            <span className="text-charcoal font-bold">Context reduction</span>
            <span className="font-mono font-bold text-green-600">{indexed ? selected.stats.compression : '--'}</span>
          </div>
        </div>

        <div className="parsed-symbols-box">
          <h4 className="font-serif font-bold text-sm text-charcoal mb-2">Extracted AST nodes</h4>
          <div className="symbols-list">
            {status === 'unindexed' && (
              <div className="text-grey font-mono text-center pt-8 text-[11px]">
                No nodes yet. Index the file to extract them.
              </div>
            )}
            {status === 'scanning' && (
              <div className="text-grey font-mono text-center pt-8">Indexing...</div>
            )}
            {status === 'done' && (
              <>
                <div className="mb-3">
                  <div className="text-grey text-[10px] uppercase font-bold mb-1">Declarations</div>
                  {selected.declarations.map((sym) => (
                    <span key={sym} className="sym-tag symbol">
                      {sym}
                    </span>
                  ))}
                </div>
                <div>
                  <div className="text-grey text-[10px] uppercase font-bold mb-1">References</div>
                  {selected.references.map((ref) => (
                    <span key={ref} className="sym-tag ref">
                      {ref}
                    </span>
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
