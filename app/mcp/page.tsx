import Link from 'next/link';
import { Shield, GitCommit, HelpCircle, Terminal } from 'lucide-react';

export const metadata = {
  title: 'MCP Specification Details',
  description: 'Technical breakdown of the Model Context Protocol (MCP) server stdio handshake sequences.',
};

export default function MCPSpecs() {
  const mcpLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'Model Context Protocol Specifications',
    'description': 'Handshake protocols, JSON schema standards, and transport specifications used by CostAffective.'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mcpLd) }}
      />

      <section className="section-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-pill">Protocol Specs</span>
          <h1 className="font-serif font-bold text-4xl mb-4 text-charcoal">Model Context Protocol</h1>
          <p className="section-desc">
            Understand how CostAffective integrates into the open standard designed by Anthropic.
          </p>
        </div>

        {/* Handshake flow info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
          <div>
            <h2 className="font-serif font-bold text-2xl text-charcoal mb-4">The Stdio Handshake</h2>
            <p className="text-light text-sm mb-4 leading-relaxed">
              When an assistant client starts CostAffective via the <code>costaffective serve</code> subprocess command, it initializes a bidirectional JSON-RPC channel over standard I/O (stdio).
            </p>
            <p className="text-light text-sm mb-4 leading-relaxed">
              Client sends initialization payloads containing client info and capabilities, and the server returns registered tool names, schemas, and descriptions.
            </p>
            <div className="flex gap-4">
              <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-xs">
                Official MCP Website
              </a>
              <Link href="/docs/install" className="btn btn-action text-xs">
                Setup Server
              </Link>
            </div>
          </div>
          <div className="bg-charcoal text-white rounded-lg p-6 font-mono text-xs overflow-x-auto">
            <div className="text-gray-400 mb-2">// Request Initialization Handshake</div>
            <pre className="text-blue-300">{`{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {},
    "clientInfo": {
      "name": "claude-code",
      "version": "1.0.0"
    }
  }
}`}</pre>
          </div>
        </div>

        {/* Schema validation details */}
        <div className="bg-[#FAF9F6] border border-[#E5E5E0] rounded-lg p-8">
          <h2 className="font-serif font-bold text-2xl text-charcoal mb-4">Schema Mappings & Validation</h2>
          <p className="text-light text-sm mb-6">
            CostAffective implements strict validation structures for incoming tool queries, ensuring data format matching.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E5E5E0] p-5 rounded shadow-sm">
              <h4 className="font-serif font-bold text-base text-charcoal mb-2">JSON-RPC 2.0</h4>
              <p className="text-light text-xs leading-relaxed">
                Standard payload wrappers specifying request identifiers, execution methods, and status parameters.
              </p>
            </div>
            <div className="bg-white border border-[#E5E5E0] p-5 rounded shadow-sm">
              <h4 className="font-serif font-bold text-base text-charcoal mb-2">Stdio Streams</h4>
              <p className="text-light text-xs leading-relaxed">
                No network sockets are opened. Inputs are loaded from stdin, and outputs are written to stdout, avoiding firewall complications.
              </p>
            </div>
            <div className="bg-white border border-[#E5E5E0] p-5 rounded shadow-sm">
              <h4 className="font-serif font-bold text-base text-charcoal mb-2">Capabilities</h4>
              <p className="text-light text-xs leading-relaxed">
                Declares <code>tools</code> capabilities to clients, presenting relational queries statically to LLMs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
