'use client';

import { useState, useEffect } from 'react';

const LOG_LINES = [
  { text: 'Initializing CostWise MCP Server...', type: 't-cyan' },
  { text: 'Loading tree-sitter parser engines (Go, Python, TS)...', type: 't-grey' },
  { text: 'Connecting local SQLite store [size: 14.2MB, hashes: 4,192]', type: 't-grey' },
  { text: 'File system watchdog active. Monitoring /Research-Architectures/CLI', type: 't-grey' },
  { text: 'MCP stdio server transport open. Ready for assistant query calls.', type: 't-green' },
  { text: '>> [watchdog] File saved: internal/retriever/treesitter.go', type: 't-yellow' },
  { text: '>> [watchdog] File hash changed. Scanning AST modifications...', type: 't-grey' },
  { text: '>> [indexer] Re-indexed treesitter.go in 6ms. Found 4 symbols.', type: 't-green' },
  { text: '>> [retriever] Incoming tool call: find_symbol { "symbol": "GetAST" }', type: 't-cyan' },
  { text: '>> [db] Index search complete: 1 match found in sqlite_master. 41us.', type: 't-grey' },
  { text: '>> [retriever] Context budget: 1000 tokens. Relational context resolved.', type: 't-grey' },
  { text: '>> [retriever] Response payload compressed: 685 tokens sent. Scoped to relevant symbols.', type: 't-green' },
];

export default function InteractiveTerminal() {
  const [lines, setLines] = useState<typeof LOG_LINES>([]);

  useEffect(() => {
    let active = true;
    let timerId: NodeJS.Timeout | null = null;
    let index = 0;

    const tick = () => {
      if (!active) return;

      if (index < 5) {
        setLines(prev => {
          const nextLine = LOG_LINES[index];
          if (!nextLine) return prev;
          // Avoid duplicate appends if state updates run out-of-sync
          if (prev.some(l => l.text === nextLine.text)) return prev;
          return [...prev, nextLine];
        });
        index++;
        timerId = setTimeout(tick, 400);
      } else if (index < LOG_LINES.length) {
        setLines(prev => {
          const nextLine = LOG_LINES[index];
          if (!nextLine) return prev;
          if (prev.some(l => l.text === nextLine.text)) return prev;
          return [...prev, nextLine];
        });
        index++;
        timerId = setTimeout(tick, 2500);
      } else {
        // Reset to first 5 lines and repeat from index 5
        setLines(LOG_LINES.slice(0, 5));
        index = 5;
        timerId = setTimeout(tick, 2500);
      }
    };

    tick();

    return () => {
      active = false;
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  return (
    <div className="hero-terminal font-mono">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="btn-dot close"></span>
          <span className="btn-dot minimize"></span>
          <span className="btn-dot expand"></span>
        </div>
        <div className="terminal-title">costwise --serve</div>
        <span className="terminal-tab">logs</span>
      </div>
      <div className="terminal-body">
        {lines.map((line, i) => {
          if (!line) return null;
          return (
            <div key={i} className={`terminal-line ${line.type || ''}`}>
              {line.text}
            </div>
          );
        })}
        <div className="terminal-line animate-pulse t-green mt-2">_</div>

        <div className="stats-card-line">
          <div className="terminal-stat text-white">
            <span className="stat-lbl">Savings Rate</span>
            <span className="stat-val text-green-400 font-bold">Active</span>
          </div>
          <div className="terminal-stat text-white">
            <span className="stat-lbl">Index Sync</span>
            <span className="stat-val text-blue-400 font-bold">8ms</span>
          </div>
          <div className="terminal-stat text-white">
            <span className="stat-lbl">Egress Data</span>
            <span className="stat-val font-bold text-gray-300">0 KB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
