'use client';

import { useState } from 'react';

interface ComponentDetail {
  title: string;
  description: string;
  files: string[];
}

const DETAILS: Record<string, ComponentDetail> = {
  client: {
    title: 'AI Editor Client Layer',
    description: 'Developer IDE interface (Claude Code CLI, Cursor, or VS Code) which communicates with local tools. Coding agents issue tool queries to the CostAffective server inside chat contexts.',
    files: ['~/.cursor/mcp.json', '~/.claude.json', 'internal/mcpserver/handlers.go']
  },
  mcp: {
    title: 'MCP Transport Protocol',
    description: 'Handles standard Model Context Protocol messages over local standard input/output channels. Translates agent queries to internal relational symbol lookups.',
    files: ['internal/mcpserver/server.go', 'internal/mcpserver/handlers.go']
  },
  engine: {
    title: 'AST Relational Parser & Watcher',
    description: 'Parses files statically using tree-sitter compiler definitions to extract symbols, implementations, and call relationships. Monitored by a background fsnotify watchdog.',
    files: ['internal/watcher/watcher.go', 'internal/watcher/watchdog.go', 'internal/parser/ast.go']
  },
  sqlite: {
    title: 'SQLite Store Index',
    description: 'Relational local database mapping file hashes, AST scopes, caller hierarchies, and symbol bounds. Ensures sub-millisecond search latencies and local file isolation.',
    files: ['internal/store/sqlite.go', 'internal/store/schema.sql']
  }
};

export default function ArchitectureVisualizer() {
  const [activeLayer, setActiveLayer] = useState<string>('engine');

  const selected = DETAILS[activeLayer] || DETAILS.engine;

  return (
    <div className="architecture-visualizer">
      {/* Interactive SVG Diagram */}
      <div className="svg-wrapper">
        <svg viewBox="0 0 500 320" className="arch-svg">
          {/* Defs for gradients & shadow filters */}
          <defs>
            <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.05" />
            </filter>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Flow Lines */}
          <path d="M 120,70 L 120,130" stroke="#E5E5E0" strokeWidth="2" fill="none" />
          <path d="M 120,130 L 250,130" stroke="#0066CC" strokeWidth="1.5" strokeDasharray="5" className="flow-line" fill="none" />
          
          <path d="M 320,130 L 380,130" stroke="#E5E5E0" strokeWidth="2" fill="none" />
          <path d="M 380,130 L 380,210" stroke="#E5E5E0" strokeWidth="2" fill="none" />
          
          <path d="M 320,240 L 250,240" stroke="#7000FF" strokeWidth="1.5" strokeDasharray="5" className="flow-line" fill="none" />
          <path d="M 120,240 L 120,180" stroke="#E5E5E0" strokeWidth="2" fill="none" />

          {/* AI Client Node */}
          <g 
            id="node-client" 
            className={`arch-node ${activeLayer === 'client' ? 'active' : ''}`}
            onClick={() => setActiveLayer('client')}
            filter="url(#shadow)"
          >
            <rect x="30" y="20" width="180" height="50" rx="6" fill="#FFFFFF" stroke="#E5E5E0" strokeWidth="1.5" />
            <text x="120" y="50" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12" fontWeight="600" fill="#191919">AI Editor Client (Cursor/Claude)</text>
          </g>

          {/* MCP Stdio transport Node */}
          <g 
            id="node-mcp" 
            className={`arch-node ${activeLayer === 'mcp' ? 'active' : ''}`}
            onClick={() => setActiveLayer('mcp')}
            filter="url(#shadow)"
          >
            <rect x="30" y="130" width="180" height="50" rx="6" fill="#FFFFFF" stroke="#E5E5E0" strokeWidth="1.5" />
            <text x="120" y="160" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12" fontWeight="600" fill="#191919">MCP Server transport (stdio)</text>
          </g>

          {/* Relational engine Node */}
          <g 
            id="node-engine" 
            className={`arch-node ${activeLayer === 'engine' ? 'active' : ''}`}
            onClick={() => setActiveLayer('engine')}
            filter="url(#shadow)"
          >
            <rect x="290" y="100" width="180" height="60" rx="6" fill="#FFFFFF" stroke="#E5E5E0" strokeWidth="1.5" />
            <text x="380" y="130" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12" fontWeight="600" fill="#191919">AST Parser & Watcher</text>
            <text x="380" y="146" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#888880">treesitter static mapping</text>
          </g>

          {/* SQLite DB Node */}
          <g 
            id="node-sqlite" 
            className={`arch-node ${activeLayer === 'sqlite' ? 'active' : ''}`}
            onClick={() => setActiveLayer('sqlite')}
            filter="url(#shadow)"
          >
            <rect x="290" y="210" width="180" height="60" rx="6" fill="#FFFFFF" stroke="#E5E5E0" strokeWidth="1.5" />
            <text x="380" y="240" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12" fontWeight="600" fill="#191919">Local SQLite DB</text>
            <text x="380" y="256" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#888880">relational index store</text>
          </g>
        </svg>
      </div>

      {/* Info details panel */}
      <div className="architecture-info">
        <h4 className="font-serif font-bold text-xl">{selected.title}</h4>
        <p className="text-light text-sm mt-3">{selected.description}</p>
        
        <div className="arch-info-files-box mt-4 border-t pt-4">
          <h5 className="text-xs uppercase font-bold text-grey">Relevant Repository Files</h5>
          <ul className="file-list mt-2">
            {selected.files.map((file) => (
              <li key={file} className="font-mono text-xs text-charcoal">
                {file}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
