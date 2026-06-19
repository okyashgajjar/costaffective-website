import { comparisonsData } from '@/data/comparisons';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, X, Shield, ArrowRight } from 'lucide-react';

export function generateStaticParams() {
  return [
    { slug: 'codegraph' },
    { slug: 'serena' },
    { slug: 'graphify' },
    { slug: 'ripgrep' }
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = comparisonsData[slug];
  if (!data) return { title: 'Not Found' };
  
  return {
    title: `CostAffective vs ${data.name} | Feature & Benchmark Comparison`,
    description: `Compare CostAffective with ${data.name}. Discover token cost savings, offline security benefits, and complete code migration guides.`,
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const data = comparisonsData[slug];
  if (!data) {
    notFound();
  }

  // Schema for comparison page (SEO/GEO)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': `CostAffective-MCP vs ${data.name}`,
    'description': data.description,
    'offers': {
      '@type': 'Offer',
      'price': '0.00',
      'priceCurrency': 'USD'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="section-container">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-grey mb-6">
          <Link href="/">Home</Link>
          <ArrowRight size={10} />
          <span>Compare</span>
          <ArrowRight size={10} />
          <span className="text-charcoal font-semibold">{data.name}</span>
        </div>

        {/* Header */}
        <div className="section-header text-left max-w-full mb-12">
          <span className="section-pill uppercase text-xs">Comparison Guide</span>
          <h1 className="font-serif font-bold text-4xl text-charcoal mb-4 mt-2">
            CostAffective vs {data.name}
          </h1>
          <p className="text-light text-base max-w-[700px] leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white border border-[#E5E5E0] rounded-lg overflow-hidden shadow-sm mb-12">
          <div className="p-6 border-b border-[#E5E5E0] bg-[#FAF9F6]">
            <h3 className="font-serif font-bold text-lg text-charcoal">Feature Breakdown</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-[#FAF9F6] text-grey uppercase text-[10px] font-bold border-b border-[#E5E5E0]">
                <tr>
                  <th className="p-4">Feature Capabilities</th>
                  <th className="p-4">CostAffective</th>
                  <th className="p-4">{data.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E0]">
                {data.features.map((row) => (
                  <tr key={row.feature}>
                    <td className="p-4 text-charcoal font-medium">{row.feature}</td>
                    <td className="p-4 font-mono flex items-center gap-1.5 text-blue-700">
                      <Check size={14} className="text-blue-600" /> {row.costAffective}
                    </td>
                    <td className="p-4 font-mono text-grey">
                      {row.status === 'yes' ? (
                        <span className="flex items-center gap-1.5"><Check size={14} className="text-green-600" /> {row.competitor}</span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-red-600"><X size={14} className="text-red-500" /> {row.competitor}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side-by-Side Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-50/20 border border-green-200/50 rounded-lg p-6">
            <h3 className="font-serif font-bold text-lg text-green-800 mb-4 flex items-center gap-2">
              <Check size={18} /> CostAffective Advantages
            </h3>
            <ul className="space-y-3">
              {data.strengths.map((str, idx) => (
                <li key={idx} className="text-sm text-green-900 flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-orange-50/20 border border-orange-200/50 rounded-lg p-6">
            <h3 className="font-serif font-bold text-lg text-orange-800 mb-4 flex items-center gap-2">
              <X size={18} /> {data.name} Tradeoffs
            </h3>
            <ul className="space-y-3">
              {data.weaknesses.map((weak, idx) => (
                <li key={idx} className="text-sm text-orange-950 flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span>{weak}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Architectural Comparison */}
        <div className="mb-12 border-t border-[#E5E5E0] pt-12">
          <h2 className="font-serif font-bold text-2xl text-charcoal mb-6">Structural Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="benefit-card">
              <h3 className="font-serif font-bold text-base text-charcoal mb-3">CostAffective Architecture</h3>
              <p className="text-light text-xs leading-relaxed">{data.architecture.costAffective}</p>
            </div>
            <div className="benefit-card">
              <h3 className="font-serif font-bold text-base text-charcoal mb-3">{data.name} Architecture</h3>
              <p className="text-light text-xs leading-relaxed">{data.architecture.competitor}</p>
            </div>
          </div>
          <div className="bg-blue-50/10 border border-blue-200/40 rounded p-5 mt-6 text-xs text-blue-900 leading-relaxed">
            {data.architecture.details}
          </div>
        </div>

        {/* Migration Guide */}
        <div className="border-t border-[#E5E5E0] pt-12">
          <h2 className="font-serif font-bold text-2xl text-charcoal mb-4">Migration Guide: Moving to CostAffective</h2>
          <p className="text-light text-sm mb-6 leading-relaxed">
            Switching is quick. CostAffective integrates into the same Model Context Protocol slots as {data.name}.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h4 className="font-serif font-bold text-sm text-charcoal mb-3">Setup Instructions</h4>
              <ol className="list-decimal pl-5 text-light text-sm space-y-3 leading-relaxed">
                {data.migration.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="bg-charcoal text-white rounded-lg p-6 font-mono text-xs overflow-x-auto">
              <div className="text-gray-400 mb-2">// BEFORE ({data.name})</div>
              <pre className="text-red-400 mb-6">{data.migration.configBefore}</pre>
              <div className="text-gray-400 mb-2">// AFTER (CostAffective)</div>
              <pre className="text-green-400">{data.migration.configAfter}</pre>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
