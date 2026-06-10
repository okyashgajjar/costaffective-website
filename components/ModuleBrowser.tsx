'use client';

import { useState } from 'react';

interface ModuleDetail {
  path: string;
  type: string;
  desc: string;
  filesCount: number;
  symbols: { name: string; type: 'func' | 'struct' }[];
}

const MODULES: Record<string, ModuleDetail> = {
  cmd: {
    path: 'cmd/costaffective',
    type: 'Binary Entrypoint',
    desc: 'Houses the main executable compiler setup. Parses command-line inputs and initiates the stdio MCP server loop.',
    filesCount: 2,
    symbols: [
      { name: 'func main()', type: 'func' },
      { name: 'func Execute()', type: 'func' }
    ]
  },
  mcpserver: {
    path: 'internal/mcpserver',
    type: 'Protocol Handlers',
    desc: 'Translates standard Model Context Protocol schema payloads into internal query logic, ensuring structural integrations for Claude Code and Cursor.',
    filesCount: 4,
    symbols: [
      { name: 'type Server struct', type: 'struct' },
      { name: 'func NewServer()', type: 'func' },
      { name: 'func handleCallTool()', type: 'func' }
    ]
  },
  retriever: {
    path: 'internal/retriever',
    type: 'Semantic Search Engines',
    desc: 'Implements the core 9 indexing algorithms (treesitter, grep, fts, auto, naive) used to measure benchmark scores.',
    filesCount: 11,
    symbols: [
      { name: 'type Retriever interface', type: 'struct' },
      { name: 'func (t *TreeSitter) Retrieve()', type: 'func' },
      { name: 'func (a *AutoRouter) Route()', type: 'func' }
    ]
  },
  watcher: {
    path: 'internal/watcher',
    type: 'Incremental File Watcher',
    desc: 'Monitors file saves in the host project workspace and triggers background AST parses on changed file checksums.',
    filesCount: 3,
    symbols: [
      { name: 'type Watchdog struct', type: 'struct' },
      { name: 'func (w *Watchdog) Start()', type: 'func' }
    ]
  },
  store: {
    path: 'internal/store',
    type: 'Local SQLite Index',
    desc: 'Manages read and write operations for the local index, saving declarations, hashes, and call paths.',
    filesCount: 3,
    symbols: [
      { name: 'type SQLiteStore struct', type: 'struct' },
      { name: 'func (s *SQLiteStore) SaveSymbols()', type: 'func' },
      { name: 'func (s *SQLiteStore) QueryReferences()', type: 'func' }
    ]
  }
};

export default function ModuleBrowser() {
  const [activeModule, setActiveModule] = useState<string>('retriever');

  const selected = MODULES[activeModule] || MODULES.retriever;

  return (
    <div className="explorer-layout">
      {/* Tree panel directory */}
      <div className="tree-panel">
        <div className="panel-header font-mono uppercase text-xs font-bold text-grey">Repository Modules</div>
        <div className="tree-nodes">
          {Object.entries(MODULES).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveModule(key)}
              className={`tree-node w-full text-left flex items-center gap-2 ${activeModule === key ? 'active' : ''}`}
            >
              <span className="node-icon">📁</span>
              <span className="node-name truncate">{value.path}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Details Inspector Panel */}
      <div className="inspector-panel">
        <div className="inspector-header">
          <span className="node-icon text-2xl">📦</span>
          <div>
            <h4 className="font-mono font-bold text-lg text-charcoal">{selected.path}</h4>
            <span className="text-xs uppercase font-bold text-primary">{selected.type}</span>
          </div>
        </div>

        <div className="inspector-body">
          <p className="text-light text-sm mb-6 leading-relaxed">{selected.desc}</p>
          
          <div className="insp-meta-grid">
            <div className="insp-meta-item">
              <span className="text-grey text-[10px] uppercase font-bold">Files Count</span>
              <span className="insp-meta-val text-charcoal font-bold">{selected.filesCount} source files</span>
            </div>
            <div className="insp-meta-item">
              <span className="text-grey text-[10px] uppercase font-bold">Access Boundary</span>
              <span className="insp-meta-val text-green-600 font-bold">Local Stdio only</span>
            </div>
          </div>

          <div className="insp-symbols-box">
            <h5 className="text-grey text-[10px] uppercase font-bold mb-3">Compiled AST Symbols</h5>
            <div className="insp-symbols-list">
              {selected.symbols.map((sym) => (
                <div key={sym.name} className="insp-symbol-row">
                  <span className={`symbol-type ${sym.type === 'func' ? 'func' : 'struct'}`}>
                    {sym.type}
                  </span>
                  <span className="text-charcoal font-medium font-mono truncate">{sym.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
