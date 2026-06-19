import Link from 'next/link';
import ArchitectureVisualizer from '@/components/ArchitectureVisualizer';
import { ArrowRight, Cpu, Key, Database, RefreshCw, Zap } from 'lucide-react';

export const metadata = {
  title: 'System Architecture',
  description: 'Detailed analysis of the CostAffective indexer, SQLite knowledge store, and tree-sitter relational query parser.',
};

export default function Architecture() {
  const systemLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'CostAffective-MCP Architecture',
    'description': 'Statically compiled relational index parser mapping declarations, imports, and references inside local SQLite stores.'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(systemLd) }}
      />

      <section className="section-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-pill">Core Design</span>
          <h1 className="font-serif font-bold text-4xl mb-4 text-charcoal">System Architecture</h1>
          <p className="section-desc">
            Explore the internal pipeline that maps, stores, and compresses repository contexts locally.
          </p>
        </div>

        {/* Interactive Visualization Block */}
        <div className="mb-16">
          <ArchitectureVisualizer />
        </div>

        {/* Pipeline Components detail */}
        <div className="border-t border-[#E5E5E0] pt-16 mb-16">
          <h2 className="font-serif font-bold text-2xl text-charcoal mb-8">Pipeline Subcomponents</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="benefit-card">
              <div className="benefit-icon bg-blue-50 text-blue-600"><Cpu size={20} /></div>
              <h3 className="font-serif font-bold text-lg text-charcoal mt-4">1. Tree-sitter AST Parser</h3>
              <p className="text-light text-xs mt-2 leading-relaxed">
                Statically parses source code to compile tree nodes. Maps variables, structures, and function bounds to extract symbol-level boundaries.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon bg-green-50 text-green-600"><Database size={20} /></div>
              <h3 className="font-serif font-bold text-lg text-charcoal mt-4">2. SQLite Knowledge Store</h3>
              <p className="text-light text-xs mt-2 leading-relaxed">
                Stores relational data maps including file hashes, tag names, call trees, and references. Optimized index triggers ensure query results return in microseconds.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon bg-purple-50 text-purple-600"><RefreshCw size={20} /></div>
              <h3 className="font-serif font-bold text-lg text-charcoal mt-4">3. Watchdog Daemon</h3>
              <p className="text-light text-xs mt-2 leading-relaxed">
                Passive background file watcher using system notification boundaries. When files are saved, watchdog re-parses only the changed file paths in 8ms.
              </p>
            </div>
          </div>
        </div>

        {/* Execution Flow Diagram */}
        <div className="border-t border-[#E5E5E0] pt-16 mb-16">
          <h2 className="font-serif font-bold text-2xl text-charcoal mb-6">Execution Flow: Code Sync to Tool Query</h2>
          <p className="text-light text-sm mb-8">
            This flowchart traces the lifecycle of a code edit and how it translates to token-saving context injection.
          </p>

          <div className="bg-[#FAF9F6] border border-[#E5E5E0] rounded-lg p-8 overflow-x-auto flex justify-center">
            <svg viewBox="0 0 760 180" className="max-w-[700px] w-full h-auto">
              {/* Box 1: File Change */}
              <rect x="10" y="50" width="120" height="60" rx="4" fill="#FFFFFF" stroke="#E5E5E0" strokeWidth="1.5" />
              <text x="70" y="80" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fontWeight="600" fill="#191919">1. File Saved</text>
              <text x="70" y="94" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#888880">fsnotify watchdog</text>

              <path d="M 130,80 L 160,80" stroke="#0066CC" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />

              {/* Box 2: AST Parse */}
              <rect x="160" y="50" width="120" height="60" rx="4" fill="#FFFFFF" stroke="#E5E5E0" strokeWidth="1.5" />
              <text x="220" y="80" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fontWeight="600" fill="#191919">2. AST Parse</text>
              <text x="220" y="94" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#888880">tree-sitter query</text>

              <path d="M 280,80 L 310,80" stroke="#0066CC" strokeWidth="1.5" fill="none" />

              {/* Box 3: Update SQL */}
              <rect x="310" y="50" width="120" height="60" rx="4" fill="#FFFFFF" stroke="#E5E5E0" strokeWidth="1.5" />
              <text x="370" y="80" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fontWeight="600" fill="#191919">3. Sync SQLite</text>
              <text x="370" y="94" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#888880">incremental write</text>

              <path d="M 430,80 L 460,80" stroke="#0066CC" strokeWidth="1.5" fill="none" />

              {/* Box 4: Agent Tool */}
              <rect x="460" y="50" width="120" height="60" rx="4" fill="#FFFFFF" stroke="#E5E5E0" strokeWidth="1.5" />
              <text x="520" y="80" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fontWeight="600" fill="#191919">4. Tool Query</text>
              <text x="520" y="94" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#888880">find_symbol call</text>

              <path d="M 580,80 L 610,80" stroke="#7000FF" strokeWidth="1.5" fill="none" />

              {/* Box 5: Compress */}
              <rect x="610" y="50" width="140" height="60" rx="4" fill="#7000FF" fillOpacity="0.05" stroke="#7000FF" strokeWidth="1.5" />
              <text x="680" y="80" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fontWeight="600" fill="#7000FF">5. Context Sent</text>
              <text x="680" y="94" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#7000FF">scoped context sent</text>
            </svg>
          </div>
        </div>

        {/* Database Schema Map */}
        <div className="bg-[#FAF9F6] border border-[#E5E5E0] rounded-lg p-8">
          <h2 className="font-serif font-bold text-2xl text-charcoal mb-4">Relational Index Database Schema</h2>
          <p className="text-light text-sm mb-6 leading-relaxed">
            CostAffective maps directory relationships statically into four unified SQLite tables.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs text-charcoal">
            <div className="bg-white border border-[#E5E5E0] p-5 rounded shadow-sm">
              <div className="text-blue-700 font-bold border-b pb-2 mb-3">TABLE files</div>
              <ul className="space-y-1 text-light">
                <li>• <span className="font-semibold text-charcoal">hash</span> TEXT PRIMARY KEY</li>
                <li>• <span className="font-semibold text-charcoal">path</span> TEXT UNIQUE</li>
                <li>• <span className="font-semibold text-charcoal">indexed_at</span> TIMESTAMP</li>
              </ul>
            </div>
            <div className="bg-white border border-[#E5E5E0] p-5 rounded shadow-sm">
              <div className="text-blue-700 font-bold border-b pb-2 mb-3">TABLE symbols</div>
              <ul className="space-y-1 text-light">
                <li>• <span className="font-semibold text-charcoal">id</span> INTEGER PRIMARY KEY</li>
                <li>• <span className="font-semibold text-charcoal">file_path</span> TEXT</li>
                <li>• <span className="font-semibold text-charcoal">name</span> TEXT</li>
                <li>• <span className="font-semibold text-charcoal">kind</span> TEXT (func, struct, interface)</li>
                <li>• <span className="font-semibold text-charcoal">start_line</span> INTEGER</li>
                <li>• <span className="font-semibold text-charcoal">end_line</span> INTEGER</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
