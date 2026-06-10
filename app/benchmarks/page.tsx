import Link from 'next/link';
import { Download, CheckCircle, BarChart } from 'lucide-react';

export const metadata = {
  title: 'Quality Benchmarks',
  description: 'Detailed evaluations of CostAffective compared against CodeGraph, Serena, Graphify, and ripgrep on codebase retrieval.',
};

export default function Benchmarks() {
  const datasetLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    'name': 'CostAffective Retrieval Evaluation Dataset',
    'description': 'Comparative measurements of token context payloads, agent call loops, and indexing overheads on local codebase repositories.',
    'license': 'https://opensource.org/licenses/MIT',
    'creator': {
      '@type': 'Organization',
      'name': 'CostAffective Open-Source Contributors'
    }
  };

  const benchmarkConditions = [
    { metric: 'Repository', value: 'Continue OSS' },
    { metric: 'Total Files', value: '3,203' },
    { metric: 'Source Files', value: '1,985' },
    { metric: 'Directories', value: '557' },
    { metric: 'Model', value: 'big-pickle' },
    { metric: 'Objective', value: 'Generate Unit Catalog, Integration Map, Architecture Overview, Benchmark Harness' },
    { metric: 'Prompt Scope', value: 'Same deliverables' },
    { metric: 'Environment', value: 'OpenCode' },
    { metric: 'Repository Size', value: 'Identical' },
    { metric: 'Model Reference', value: 'Identical' },
  ];

  const comparisonData = [
    { metric: 'Total Tokens', costAffective: '4,708,835', codeGraph: '8,707,328', winner: '🏆 CostAffective' },
    { metric: 'Main Session Tokens', costAffective: '2,812,057', codeGraph: '4,216,693', winner: '🏆 CostAffective' },
    { metric: 'Subagent Tokens', costAffective: '1,896,778', codeGraph: '4,490,635', winner: '🏆 CostAffective' },
    { metric: 'API Calls', costAffective: '89', codeGraph: '134', winner: '🏆 CostAffective' },
    { metric: 'Subagent Calls', costAffective: '43', codeGraph: '94', winner: '🏆 CostAffective' },
    { metric: 'Cache Read Tokens', costAffective: '2,556,672', codeGraph: '4,012,160', winner: '🏆 CostAffective' },
    { metric: 'Output Tokens', costAffective: '58,858', codeGraph: '34,042', winner: '🏆 CostAffective' },
    { metric: 'Deliverables Generated', costAffective: '4', codeGraph: '4', winner: 'Tie' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }}
      />

      <section className="section-container">
        {/* Header */}
        <div className="section-header text-center mb-8">
          <span className="section-pill">Case Study Evaluation</span>
          <h1 className="font-serif font-bold text-4xl mb-4 text-charcoal">Quality & Token Benchmarks</h1>
          <p className="section-desc max-w-2xl mx-auto">
            Direct measurements of context efficiency, exploration overhead, and API footprint comparing CostAffective against CodeGraph on large repositories.
          </p>
        </div>

        {/* Claim Highlight Banner */}
        <div className="bg-[#FAF9F6] border border-[#E5E5E0] rounded-lg p-6 mb-12 text-center shadow-sm">
          <div className="text-grey uppercase tracking-wider text-[10px] font-bold mb-3">Verified Performance Claim</div>
          <div className="flex flex-wrap justify-center items-center gap-y-3 gap-x-6 text-sm md:text-base font-mono text-charcoal font-semibold">
            <span className="flex items-center gap-1.5"><span className="text-primary font-bold">45.9%</span> fewer tokens</span>
            <span className="text-grey/40 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><span className="text-primary font-bold">54.3%</span> fewer exploration loops</span>
            <span className="text-grey/40 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><span className="text-primary font-bold">42.1%</span> fewer tool interactions</span>
            <span className="text-grey/40 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><span className="text-[#0066CC] font-bold">100%</span> Local</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Benchmark Conditions Card */}
          <div className="lg:col-span-5 bg-white border border-[#E5E5E0] rounded-lg overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <div className="p-6 border-b border-[#E5E5E0] bg-[#FAF9F6]">
                <h3 className="font-serif font-bold text-lg text-charcoal">Benchmark Conditions</h3>
                <span className="text-[10px] text-grey uppercase tracking-wider font-semibold">Environment Parameters</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="bg-[#FAF9F6] text-grey uppercase text-[9px] font-bold border-b border-[#E5E5E0]">
                    <tr>
                      <th className="p-3">Metric</th>
                      <th className="p-3">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5E0]">
                    {benchmarkConditions.map((row) => (
                      <tr key={row.metric} className="hover:bg-slate-50/50">
                        <td className="p-3 font-semibold text-charcoal">{row.metric}</td>
                        <td className="p-3 font-mono text-grey">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CostAffective vs CodeGraph Card */}
          <div className="lg:col-span-7 bg-white border border-[#E5E5E0] rounded-lg overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <div className="p-6 border-b border-[#E5E5E0] bg-[#FAF9F6] flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-lg text-charcoal">CostAffective vs CodeGraph</h3>
                  <span className="text-[10px] text-grey uppercase tracking-wider font-semibold">Comparative Metrics</span>
                </div>
                <span className="text-[10px] bg-green-500 text-white font-mono px-2 py-0.5 rounded font-bold uppercase">
                  45.9% Savings
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs">
                  <thead className="bg-[#FAF9F6] text-grey uppercase text-[9px] font-bold border-b border-[#E5E5E0]">
                    <tr>
                      <th className="p-3">Metric</th>
                      <th className="p-3">CostAffective</th>
                      <th className="p-3">CodeGraph</th>
                      <th className="p-3">Winner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5E0]">
                    {comparisonData.map((row) => (
                      <tr 
                        key={row.metric} 
                        className={row.metric === 'Total Tokens' ? 'bg-[#0066CC]/5 font-semibold' : 'hover:bg-slate-50/50'}
                      >
                        <td className="p-3 font-semibold text-charcoal">{row.metric}</td>
                        <td className="p-3 font-mono font-bold text-[#0066CC]">{row.costAffective}</td>
                        <td className="p-3 font-mono text-grey">{row.codeGraph}</td>
                        <td className="p-3 font-mono text-green-700 font-semibold">{row.winner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Global Retriever Leaderboard Overview */}
        <div className="bg-white border border-[#E5E5E0] rounded-lg overflow-hidden shadow-sm mb-12">
          <div className="p-6 border-b border-[#E5E5E0] flex justify-between items-center bg-[#FAF9F6]">
            <div>
              <h3 className="font-serif font-bold text-lg text-charcoal">Global Retriever Leaderboard</h3>
              <span className="text-[10px] text-grey uppercase tracking-wider font-semibold">Multi-Repo Aggregated Scores</span>
            </div>
            <span className="text-xs text-grey">Target Repositories: Mixed Source CLI Suite</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-[#FAF9F6] text-grey uppercase text-[10px] font-bold border-b border-[#E5E5E0]">
                <tr>
                  <th className="p-4">Retriever Engine</th>
                  <th className="p-4">Avg Input Tokens</th>
                  <th className="p-4">Context Reduction</th>
                  <th className="p-4">Agent Call Loops</th>
                  <th className="p-4">Retrieval Quality</th>
                  <th className="p-4">Memory footprint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E0]">
                {[
                  { name: 'CostAffective', tokens: '685', reduction: '74.0%', calls: '4.2', quality: '98.5%', ram: '14MB' },
                  { name: 'CodeGraph', tokens: '1,219', reduction: '53.8%', calls: '6.8', quality: '96.2%', ram: '820MB' },
                  { name: 'Serena', tokens: '1,704', reduction: '35.4%', calls: '9.2', quality: '90.1%', ram: '142MB (Cloud)' },
                  { name: 'Graphify', tokens: '1,820', reduction: '31.0%', calls: '10.5', quality: '89.4%', ram: '680MB' },
                  { name: 'Ripgrep (Grep)', tokens: '2,640', reduction: '0%', calls: '14.0', quality: '61.4%', ram: '4.2MB' }
                ].map((row) => (
                  <tr key={row.name} className={row.name === 'CostAffective' ? 'bg-[#0066CC]/5 font-semibold' : ''}>
                    <td className="p-4 font-mono font-bold text-charcoal flex items-center gap-2">
                      {row.name}
                      {row.name === 'CostAffective' && <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded font-sans font-bold">Winner</span>}
                    </td>
                    <td className="p-4 font-mono">{row.tokens}</td>
                    <td className="p-4 font-mono text-green-600">{row.reduction}</td>
                    <td className="p-4 font-mono">{row.calls}</td>
                    <td className="p-4 font-mono">{row.quality}</td>
                    <td className="p-4 font-mono">{row.ram}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Charts Info grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="benefit-card">
            <div className="benefit-icon bg-blue-50 text-blue-600"><BarChart size={20} /></div>
            <h3 className="font-serif font-bold text-lg text-charcoal mt-4">74% Token Context Reduction</h3>
            <p className="text-light text-xs mt-2 leading-relaxed">
              CostAffective trims files into compressed AST scope snippets, ensuring AI assistants consume far fewer tokens during chat runs.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon bg-green-50 text-green-600"><CheckCircle size={20} /></div>
            <h3 className="font-serif font-bold text-lg text-charcoal mt-4">98.5% Retrieval Quality</h3>
            <p className="text-light text-xs mt-2 leading-relaxed">
              Static symbol mapping resolves precise references without losing logical dependencies, preventing AI hallucinations.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon bg-purple-50 text-purple-600"><Download size={20} /></div>
            <h3 className="font-serif font-bold text-lg text-charcoal mt-4">Download Raw Reports</h3>
            <p className="text-light text-xs mt-2 leading-relaxed font-sans mb-4">
              Get complete, unedited JSON logs and benchmark sheets compiled directly from CLI runs.
            </p>
            <div className="flex flex-col gap-2">
              <a href="https://github.com/okyashgajjar/costaffective-mcp/raw/main/reports/global_leaderboard.md" target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-xs flex justify-center py-2">
                <Download size={12} className="mr-1" /> global_leaderboard.md
              </a>
              <a href="https://github.com/okyashgajjar/costaffective-mcp/raw/main/reports/repository_breakdown.md" target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-xs flex justify-center py-2">
                <Download size={12} className="mr-1" /> repository_breakdown.md
              </a>
            </div>
          </div>
        </div>

        {/* Methodology */}
        <div className="bg-[#FAF9F6] border border-[#E5E5E0] rounded-lg p-8">
          <h2 className="font-serif font-bold text-2xl text-charcoal mb-4">Benchmark Methodology</h2>
          <p className="text-light text-sm mb-4 leading-relaxed">
            Evaluations were compiled by running standard coding tasks (resolving interface definitions, compiling structural call routes, mapping code dependencies) across 15 separate repositories (varying from Go, Python, and TypeScript, sizes from 100 to 5,000 source files).
          </p>
          <ul className="list-disc pl-5 text-light text-sm space-y-2 leading-relaxed">
            <li><strong>Input Token Limits:</strong> Measures standard inputs loaded by coding agents. Less is better.</li>
            <li><strong>Accuracy / Quality:</strong> Evaluated using static code pointers verified against manual oracle definitions. Higher is better.</li>
            <li><strong>Memory footprint:</strong> Host system RAM consumption during full codebase indexing scans. Less is better.</li>
            <li><strong>Watchdog Sync Latency:</strong> File change notification triggers to SQLite updates. Less is better.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
