'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface ConfigDetails {
  name: string;
  path: string;
  code: string;
}

const CONFIGS: Record<string, ConfigDetails> = {
  claude: {
    name: 'Claude Code',
    path: '~/.claude.json',
    code: `{
  "mcpServers": {
    "costwise": {
      "command": "costwise",
      "args": ["serve"]
    }
  }
}`
  },
  cursor: {
    name: 'Cursor IDE',
    path: 'Settings > MCP > Add New Helper',
    code: `{
  "mcpServers": {
    "costwise": {
      "command": "costwise",
      "args": ["serve"]
    }
  }
}`
  },
  vscode: {
    name: 'VS Code (Codex)',
    path: 'Settings > Extensions > Codex MCP Servers',
    code: `{
  "mcpServers": {
    "costwise": {
      "command": "costwise",
      "args": ["serve"]
    }
  }
}`
  },
  antigravity: {
    name: 'Antigravity IDE',
    path: 'Workspace Config > mcp.json',
    code: `{
  "mcpServers": {
    "costwise": {
      "command": "costwise",
      "args": ["serve"]
    }
  }
}`
  }
};

export default function Configurator() {
  const [activeEditor, setActiveEditor] = useState<string>('claude');
  const [copied, setCopied] = useState<boolean>(false);

  const selected = CONFIGS[activeEditor] || CONFIGS.claude;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selected.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy configuration', err);
    }
  };

  return (
    <div className="configurator-layout">
      {/* Editor selector tabs */}
      <div className="editor-selector-tabs">
        {Object.entries(CONFIGS).map(([key, value]) => (
          <button
            key={key}
            onClick={() => {
              setActiveEditor(key);
              setCopied(false);
            }}
            className={`selector-tab ${activeEditor === key ? 'active' : ''}`}
          >
            {value.name}
          </button>
        ))}
      </div>

      {/* Editor Details configuration block */}
      <div className="configurator-details">
        <div className="config-path-box text-charcoal">
          <span className="path-label">Config Location:</span>
          <span className="path-value">{selected.path}</span>
        </div>

        <div className="config-code-card">
          <div className="card-header">
            <span>settings.json</span>
            <button onClick={handleCopy} className="btn-copy">
              {copied ? (
                <>
                  <Check size={12} className="text-green-500" />
                  <span className="text-green-500 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy Block</span>
                </>
              )}
            </button>
          </div>
          <pre className="config-code-block font-mono">
            <code>{selected.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
