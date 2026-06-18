'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyCommandProps {
  command: string;
  /** Render for a dark background (e.g. the bottom CTA). */
  dark?: boolean;
}

/**
 * CopyCommand shows an install command with a one-click copy button.
 * Replaces the old read-only input so the displayed command is always the
 * real, current install line.
 */
export default function CopyCommand({ command, dark = false }: CopyCommandProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable; no-op */
    }
  };

  // Inline styles win over the .install-block class, so the dark variant
  // actually renders dark (the class alone was being overridden to light).
  const containerStyle = dark
    ? { gap: 8, background: '#0E0E0E', border: '1px solid rgba(255,255,255,0.12)' }
    : { gap: 8 };

  return (
    <div className={`install-block ${dark ? 'cmd-dark' : ''}`} style={containerStyle}>
      <span className="terminal-prompt" style={dark ? { color: '#5B9DFF' } : undefined}>
        $
      </span>
      <code
        className="font-mono text-sm overflow-x-auto whitespace-nowrap"
        style={{ flex: 1, color: dark ? 'rgba(255,255,255,0.92)' : 'var(--color-text)' }}
      >
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy install command"
        className="btn-copy flex-shrink-0"
        style={dark ? { color: 'rgba(255,255,255,0.6)' } : undefined}
      >
        {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
      </button>
    </div>
  );
}
