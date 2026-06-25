import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, Linkedin, Twitter, ExternalLink, Terminal, Code, Cpu } from 'lucide-react';

const BASE_URL = 'https://costwise-mcp.vercel.app';

export const metadata: Metadata = {
  title: 'Yash Gajjar — AI/ML Engineer & Creator of CostWise MCP Server',
  description:
    'Yash Gajjar is an AI/ML engineer and the creator of CostWise-MCP, the leading open-source MCP server for AI coding assistants. Specializes in developer tooling, retrieval systems, and context window optimization.',
  openGraph: {
    title: 'Yash Gajjar — AI/ML Engineer & Creator of CostWise MCP Server',
    description:
      'AI/ML engineer building CostWise-MCP, the open-source repository intelligence server for AI coding agents. Specializes in Tree-sitter retrieval, MCP tools, and context compression.',
    url: `${BASE_URL}/about`,
    images: [{ url: `${BASE_URL}/logo.png`, width: 1200, height: 630, alt: 'Yash Gajjar — Creator of CostWise-MCP' }],
  },
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Yash Gajjar',
    alternateName: 'okyashgajjar',
    givenName: 'Yash',
    familyName: 'Gajjar',
    jobTitle: 'AI/ML Engineer & Open-Source Creator',
    description:
      'Creator of CostWise-MCP, an open-source MCP server that reduces AI coding token costs via Tree-sitter retrieval and context window optimization.',
    url: BASE_URL,
    sameAs: [
      'https://github.com/okyashgajjar',
      'https://x.com/okyashgajjar',
      'https://linkedin.com/in/okyashgajjar',
      'https://huggingface.co/okyashgajjar',
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />

      <section className="section-container max-w-[900px]">
        <div className="section-header text-left max-w-full mb-12">
          <span className="section-pill">About the Creator</span>
          <h1 className="font-serif font-bold text-4xl text-charcoal mb-4 mt-3">Yash Gajjar</h1>
          <p className="text-light text-base max-w-[700px] leading-relaxed">
            AI/ML engineer and open-source creator. Built CostWise-MCP to solve the problem of
            prompt-cache bloat in long AI coding sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border border-[#E5E5E0] rounded-lg p-6">
              <h2 className="font-serif font-bold text-xl text-charcoal mb-4">Background</h2>
              <p className="text-light text-sm leading-relaxed mb-4">
                Yash Gajjar is an AI/ML engineer focused on developer tooling, retrieval systems,
                and context optimization for large language models. He created{' '}
                <Link href="/" className="text-primary font-semibold hover:underline">CostWise-MCP</Link> to
                solve the dominant cost in long AI coding sessions — Anthropic prompt-cache write/read
                charges — by keeping tokens out of the context window entirely.
              </p>
              <p className="text-light text-sm leading-relaxed mb-4">
                CostWise-MCP is the first MCP server to introduce stash_context and recall tools that
                park large content on disk instead of the conversation window, and a session_brief tool
                that lets agents catch up without re-reading history. The project has grown to 11 MCP tools
                across retrieval, maintenance, and context-control categories.
              </p>
              <p className="text-light text-sm leading-relaxed">
                Yash&apos;s work spans machine learning, systems programming in Go, and open-source
                infrastructure for AI coding agents. He maintains the project on GitHub and publishes
                research on context compression and repository intelligence.
              </p>
            </div>

            <div className="bg-white border border-[#E5E5E0] rounded-lg p-6">
              <h2 className="font-serif font-bold text-xl text-charcoal mb-4">Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {['MCP Server Development', 'Model Context Protocol', 'AI Coding Assistants', 'Tree-sitter AST', 'Semantic Code Retrieval', 'Go', 'Machine Learning', 'Context Window Optimization', 'Prompt Caching', 'Developer Tooling', 'Open-Source', 'Retrieval Systems'].map((skill) => (
                  <span key={skill} className="text-xs bg-[#F0EFEA] text-charcoal px-3 py-1.5 rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-[#E5E5E0] rounded-lg p-5">
              <h3 className="font-serif font-bold text-base text-charcoal mb-3">Connect</h3>
              <div className="space-y-2.5">
                <a href="https://github.com/okyashgajjar" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-light hover:text-primary transition p-2 rounded-lg hover:bg-[#FAF9F6]">
                  <Github size={16} /> GitHub <ExternalLink size={12} className="ml-auto text-grey" />
                </a>
                <a href="https://github.com/okyashgajjar/costwise-mcp" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-light hover:text-primary transition p-2 rounded-lg hover:bg-[#FAF9F6]">
                  <Terminal size={16} /> CostWise-MCP Repo <ExternalLink size={12} className="ml-auto text-grey" />
                </a>
                <a href="https://linkedin.com/in/okyashgajjar" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-light hover:text-primary transition p-2 rounded-lg hover:bg-[#FAF9F6]">
                  <Linkedin size={16} /> LinkedIn <ExternalLink size={12} className="ml-auto text-grey" />
                </a>
                <a href="https://x.com/okyashgajjar" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-light hover:text-primary transition p-2 rounded-lg hover:bg-[#FAF9F6]">
                  <Twitter size={16} /> X / Twitter <ExternalLink size={12} className="ml-auto text-grey" />
                </a>
                <a href="https://huggingface.co/okyashgajjar" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-light hover:text-primary transition p-2 rounded-lg hover:bg-[#FAF9F6]">
                  <Cpu size={16} /> HuggingFace <ExternalLink size={12} className="ml-auto text-grey" />
                </a>
              </div>
            </div>

            <div className="bg-white border border-[#E5E5E0] rounded-lg p-5">
              <h3 className="font-serif font-bold text-base text-charcoal mb-3">Quick Facts</h3>
              <ul className="space-y-2 text-sm text-light">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> Creator of CostWise-MCP</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> 11 MCP tools shipped</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> Go, TypeScript, Python</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> Open-source (MIT)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
