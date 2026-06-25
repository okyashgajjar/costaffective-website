'use client';

import { useState } from 'react';
import { MonitorSmartphone, Cable, Binary, Database, Boxes } from 'lucide-react';
import type { ReactNode } from 'react';

interface NodeDetail {
  id: string;
  label: string;
  sub: string;
  icon: ReactNode;
  title: string;
  description: string;
  files: string[];
}

const NODES: NodeDetail[] = [
  {
    id: 'client',
    label: 'AI Editor Client',
    sub: 'Claude Code, Cursor, Codex, OpenCode',
    icon: <MonitorSmartphone size={18} />,
    title: 'AI Editor Client Layer',
    description:
      'The IDE or agent issues tool calls to the local CostWise server inside the chat context. It also loads the session-awareness guidance the server advertises on connect.',
    files: ['~/.cursor/mcp.json', '~/.claude.json', 'internal/installer/targets/'],
  },
  {
    id: 'mcp',
    label: 'MCP Server (stdio)',
    sub: 'serves tools + session instructions',
    icon: <Cable size={18} />,
    title: 'MCP Server Transport',
    description:
      'Handles Model Context Protocol messages over local stdio, registers the ten tools, and advertises the costwise-session guidance through the protocol instructions field so every client receives it automatically.',
    files: ['internal/mcpserver/server.go', 'internal/mcpserver/tools.go', 'internal/skill/'],
  },
  {
    id: 'engine',
    label: 'AST Parser & Watcher',
    sub: 'tree-sitter, incremental indexing',
    icon: <Binary size={18} />,
    title: 'AST Parser and Watcher',
    description:
      'Parses files structurally with tree-sitter to extract symbols, references, and call edges. A background fsnotify watchdog re-indexes only changed files on save, so the index stays fresh without full rebuilds.',
    files: ['internal/treesitter/', 'internal/watcher/watchdog.go', 'internal/retrieval/'],
  },
  {
    id: 'sqlite',
    label: 'Local SQLite Index',
    sub: 'symbols, references, call graph',
    icon: <Database size={18} />,
    title: 'Local SQLite Index Store',
    description:
      'A per-repository SQLite index of symbols, references, and caller hierarchies under the repository index directory. Queries return in microseconds, and nothing ever leaves the machine.',
    files: ['internal/treesitter/db.go', '.mycli-fts/'],
  },
  {
    id: 'tools',
    label: 'Context-Control Tools',
    sub: 'stash · recall · remember',
    icon: <Boxes size={18} />,
    title: 'Context-Control Tools',
    description:
      'stash_context parks large blobs out of the window behind a handle, recall pulls back only the slice a query needs, and remember persists durable facts per repository. Together they keep the context window small without losing information.',
    files: ['internal/stash/stash.go', 'internal/kmemory/kmemory.go', 'internal/session/repo_session.go'],
  },
];

export default function ArchitectureVisualizer() {
  const [activeId, setActiveId] = useState<string>('mcp');
  const selected = NODES.find((n) => n.id === activeId) || NODES[1];

  return (
    <div className="architecture-visualizer">
      {/* Vertical pipeline */}
      <div className="svg-wrapper">
        <div className="arch-pipeline">
          {NODES.map((node, i) => (
            <div key={node.id}>
              <button
                type="button"
                onClick={() => setActiveId(node.id)}
                className={`arch-node-card ${activeId === node.id ? 'active' : ''}`}
                aria-pressed={activeId === node.id}
              >
                <span className="arch-node-icon">{node.icon}</span>
                <span className="arch-node-text">
                  <span className="arch-node-label">{node.label}</span>
                  <span className="arch-node-sub">{node.sub}</span>
                </span>
              </button>
              {i < NODES.length - 1 && (
                <span className={`arch-connector ${activeId === node.id || activeId === NODES[i + 1].id ? 'lit' : ''}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Info panel */}
      <div className="architecture-info">
        <h4 className="font-serif font-bold text-xl">{selected.title}</h4>
        <p className="text-light text-sm mt-3 leading-relaxed">{selected.description}</p>

        <div className="arch-info-files-box mt-4 border-t pt-4">
          <h5 className="text-xs uppercase font-bold text-grey">Relevant repository paths</h5>
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
