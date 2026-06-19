import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Archive, Search, BookMarked } from 'lucide-react';
import Reveal from '@/components/Reveal';

const BASE_URL = 'https://costaffective-mcp.vercel.app';

export const metadata: Metadata = {
  title: 'The Vision: Why CostAffective Cuts Prompt-Cache Cost',
  description:
    'The reasoning behind CostAffective: in long AI coding sessions the dominant cost is the prompt cache re-reading and re-writing the context window. The only lever a local MCP server controls is how many tokens enter that window. Here is how we shrink it without losing information.',
  alternates: { canonical: '/vision' },
  openGraph: {
    title: 'The Vision: Why CostAffective Cuts Prompt-Cache Cost',
    description:
      'In long AI coding sessions the dominant cost is the prompt cache, not the model output. CostAffective keeps tokens out of the context window, losslessly.',
    url: `${BASE_URL}/vision`,
    type: 'article',
  },
};

export default function VisionPage() {
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Why CostAffective Cuts Prompt-Cache Cost',
    description:
      'The reasoning behind CostAffective: the dominant cost in long AI coding sessions is the prompt cache re-reading and re-writing the context window.',
    author: { '@type': 'Person', name: 'Yash Gajjar' },
    publisher: { '@type': 'Organization', name: 'CostAffective-MCP', logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` } },
    mainEntityOfPage: `${BASE_URL}/vision`,
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why is the prompt cache the main cost in long AI coding sessions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Providers cache the conversation so repeated context is cheaper to resend, but every turn still pays to read the entire resident context, and any change to earlier context or a short idle gap forces a full rewrite of everything resident. In long sessions this dominates the bill. In one measured call, $2.84 of a $2.95 charge was the cache write of about 455,000 tokens, while the model output was under 4,000 tokens.',
        },
      },
      {
        '@type': 'Question',
        name: 'What can an MCP server actually control about caching?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nothing about how or when the client caches; breakpoints and time-to-live are decided by the client. The only lever a server controls is how many tokens ever enter the resident context window. Shrinking that makes every turn cheaper to read and cheaper to rewrite.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does CostAffective reduce the context window without losing information?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It answers from a local index instead of dumping files, budgets repository summaries, and provides stash_context and recall to move large output out of the window behind a small handle. Stashing relocates tokens to disk rather than deleting them, so the full content is always recoverable.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-grid-bg" />
        <div className="section-container" style={{ paddingTop: 96, paddingBottom: 48 }}>
          <div className="vision-prose text-center">
            <span className="eyebrow">The Vision</span>
            <h1 className="hero-title font-bold text-charcoal mt-4" style={{ fontSize: 46, lineHeight: 1.1 }}>
              The expensive part isn&apos;t the answer.
              <br />
              It&apos;s the <span className="hero-gradient-text">context</span>.
            </h1>
            <p className="mt-6" style={{ fontSize: 19 }}>
              CostAffective exists for one reason: in long AI coding sessions, the dominant cost is the prompt cache
              carrying and re-caching the context window, not the model thinking. This page explains the problem, the
              one lever that actually moves it, and how every feature is built around that lever.
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-container" style={{ paddingTop: 24 }}>
        <article className="vision-prose">
          <Reveal>
            <h2>The problem</h2>
            <p>
              An AI coding assistant working in a real repository spends most of its budget on two things, and neither
              of them is thinking.
            </p>
            <p>
              <strong>Rediscovery.</strong> The model reads the same files over and over to answer questions it has
              effectively already answered: where is this defined, who calls this, what does this module do. Each read
              pushes thousands of tokens into the context window.
            </p>
            <p>
              <strong>The prompt cache.</strong> Providers cache the conversation so repeated context is cheaper to
              resend. But the cache is not free. Every turn pays to <strong>read</strong> the entire resident context.
              And any change to earlier context, or a short idle gap, invalidates the cache and forces a full{' '}
              <strong>rewrite</strong> of everything resident.
            </p>
          </Reveal>

          <Reveal>
            <div className="vision-callout">
              <p>
                A single measured call was billed at <strong>$2.95</strong>, of which <strong>$2.84 was the cache
                write</strong> of roughly 455,000 tokens of resident context. The model&apos;s output that turn was under
                4,000 tokens. The expensive part was the size of the context being carried, not the answer.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2>The insight</h2>
            <p>
              A tool that connects to an editor over MCP <strong>cannot control how or when the client caches</strong>.
              Cache breakpoints and time-to-live are decided by the client, not the server. There is exactly one lever a
              server does control:
            </p>
            <p style={{ fontSize: 20, color: 'var(--color-text)', fontWeight: 600 }}>
              How many tokens ever enter the resident context window in the first place.
            </p>
            <p>
              Shrink that, and both costs fall at once: a smaller window is cheaper to read every turn and cheaper to
              rewrite when the cache is invalidated. Every design decision in CostAffective serves this one goal: keep
              tokens out of the window without losing information.
            </p>
          </Reveal>

          <Reveal>
            <h2>The approach</h2>
            <p>CostAffective is a local MCP server that does three things in service of that goal.</p>

            <h3>1. Answer from a local index, not from raw files</h3>
            <p>
              It parses your repository once with Tree-sitter and stores symbols, references, and call edges in a local
              SQLite index. Navigation questions are answered from that index in a few tokens instead of by dumping
              files. A token-budgeted repository summary gives the high-level map without ever emitting a giant tree at
              session start.
            </p>

            <h3>2. Give the model tools to keep large content out of the window</h3>
            <p>
              The context-control tools are the loop below. They let the model move large output and durable facts out of
              the resident window, losslessly, because the content is relocated to disk, not deleted.
            </p>
          </Reveal>

          <Reveal>
            <div className="loop-steps" style={{ margin: '28px 0' }}>
              {[
                { n: 1, icon: <Archive size={18} />, h: 'stash_context', p: 'Park a large blob out of context and get back a short handle. The full content is written to disk.' },
                { n: 2, icon: <Search size={18} />, h: 'recall', p: 'Pull back only the slice a query needs, within a token budget, never the whole blob.' },
                { n: 3, icon: <BookMarked size={18} />, h: 'remember', p: 'Persist the durable conclusion as a per-repository fact so it is not re-derived next turn.' },
              ].map((s) => (
                <div key={s.h} className="loop-step">
                  <span className="step-num">{s.n}</span>
                  <h4 className="flex items-center gap-2">{s.icon}{s.h}</h4>
                  <p>{s.p}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <h3>3. Make the model use all of this, automatically</h3>
            <p>
              None of it helps if the model does not reach for it. The <code>costaffective-session</code> skill is a
              small piece of session-awareness guidance (about 275 tokens) that teaches the model the lean workflow
              once per session. It is delivered through the MCP protocol&apos;s instructions field, so every connected
              editor loads it on connect, plus a native Claude Code skill on top. That fixed, tiny cost pays for itself
              the first time it prevents a single large blob from entering the window.
            </p>
          </Reveal>

          <Reveal>
            <h2>Why not just summarize or delete old context?</h2>
            <p>
              Because that loses information. Summarizing collapses detail you may need later; deleting drops it outright.
              Stashing <strong>relocates</strong> tokens rather than discarding them. The full content stays on disk and
              is always recoverable with <code>recall</code>. That was a hard design constraint from the start: reduce the
              window without ever dropping context.
            </p>
          </Reveal>

          <Reveal>
            <h2>The result</h2>
            <p>
              The same philosophy runs end to end: answer from the index, budget the summaries, stash the large stuff,
              recall only the slice, remember the conclusions, and make the editor do it by default. On the Continue OSS
              repository this adds up to fewer tokens burned on redundant context, fewer exploration loops, and fewer
              tool interactions, entirely local.
            </p>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap gap-3 mt-10">
              <Link href="/docs/install" className="btn btn-action">
                Install CostAffective
              </Link>
              <Link href="/tools" className="btn btn-secondary inline-flex items-center gap-1">
                See the tools <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </article>
      </section>
    </>
  );
}
