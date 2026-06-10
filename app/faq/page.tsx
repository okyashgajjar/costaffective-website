'use client';

import { useState, useMemo } from 'react';
import { faqsData } from '@/data/faqs';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'core' | 'performance' | 'compatibility' | 'security'>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = useMemo(() => {
    return faqsData.filter((faq) => {
      const matchCat = activeCategory === 'all' || faq.category === activeCategory;
      const matchQuery = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [searchTerm, activeCategory]);

  // JSON-LD schema output for FAQ list (SEO/GEO)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqsData.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="section-container max-w-[900px]">
        {/* Header */}
        <div className="section-header">
          <span className="section-pill">FAQ Database</span>
          <h1 className="font-serif font-bold text-4xl mb-4 text-charcoal">Frequently Asked Questions</h1>
          <p className="section-desc">
            Find immediate, structured answers to questions about tokens, security, database indexing, and IDE connectors.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-[350px]">
            <Search className="absolute left-3 top-2.5 text-grey" size={16} />
            <input
              type="text"
              placeholder="Search FAQ keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#E5E5E0] rounded-md text-xs font-sans text-charcoal bg-white focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
            {['all', 'core', 'performance', 'compatibility', 'security'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`py-1.5 px-3 rounded text-xs capitalize transition font-sans ${activeCategory === cat ? 'bg-primary text-white font-semibold' : 'bg-[#FAF9F6] border border-[#E5E5E0] text-light hover:text-charcoal'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-grey font-mono text-xs">
              No matching questions found.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = !!expandedIds[faq.id];
              return (
                <div 
                  key={faq.id} 
                  className={`border border-[#E5E5E0] rounded-md overflow-hidden bg-white transition-shadow ${isExpanded ? 'shadow-sm' : ''}`}
                >
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between hover:bg-[#FAF9F6] transition"
                  >
                    <span className="font-serif font-bold text-base text-charcoal flex items-start gap-2.5">
                      <HelpCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </span>
                    <span className="text-grey ml-4 flex-shrink-0">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="p-5 border-t border-[#E5E5E0] text-light text-sm leading-relaxed bg-[#FAF9F6]/20">
                      {faq.answer}
                      <div className="mt-4 text-[10px] uppercase font-bold text-grey">
                        Category: {faq.category}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
