'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS } from '@/data/seoData';
import { PIPER_VOICE_LANGUAGES } from '@/data/lingobirdData';

export function FaqBand() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((cur) => (cur === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-24 px-5 sm:px-8 border-t"
      style={{ background: 'var(--bg-sky)', borderColor: 'var(--border)' }}
      aria-label="Frequently Asked Questions and Language Learning Guide"
    >
      <div className="max-w-5xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Search &amp; FAQ Knowledge Base</span>
          </div>

          <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl leading-tight" style={{ color: 'var(--text-primary)' }}>
            Everything You Need to Know About <span className="calm-gradient-text">Language Practicing</span>
          </h2>

          <p className="text-base sm:text-lg font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Explore how LingoBird transforms Windows into the ultimate local-first language learning application — combining scientific FSRS spaced repetition, real-time AI speech, and complete offline autonomy.
          </p>
        </div>

        {/* Supported Languages Grid */}
        <div
          className="calm-card p-6 sm:p-8 space-y-5"
          style={{ background: 'var(--bg-surface)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
            <div>
              <span className="calm-eyebrow">Supported Languages</span>
              <h3 className="font-display font-semibold text-xl m-0" style={{ color: 'var(--text-primary)' }}>
                Master 10 Core Languages Across All 6 Skill Pillars
              </h3>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full shrink-0" style={{ background: 'var(--mint-soft)', color: 'var(--mint)' }}>
              Speaking · Listening · Reading · Writing · Vocab · Grammar
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {PIPER_VOICE_LANGUAGES.map((item) => (
              <div
                key={item.language}
                className="p-3.5 rounded-2xl border text-center transition-all hover:-translate-y-0.5"
                style={{
                  background: 'var(--bg-surface-soft)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="text-2xl mb-1">{item.flag}</div>
                <div className="text-xs font-extrabold text-[var(--text-primary)]">
                  {item.language}
                </div>
                <div className="text-[10px] font-semibold text-[var(--text-muted)] mt-0.5">
                  Piper Neural TTS
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List with Schema.org Microdata */}
        <div className="space-y-3.5" role="region" aria-label="Language Learning FAQ Accordion">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="calm-card overflow-hidden transition-all duration-200"
                style={{
                  background: 'var(--bg-surface)',
                  borderColor: isOpen ? 'var(--accent-muted)' : 'var(--border)',
                  boxShadow: isOpen ? 'var(--shadow-clay-hover)' : 'var(--shadow-clay)',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-base sm:text-lg pr-2" style={{ color: 'var(--text-primary)' }}>
                    {item.question}
                  </span>
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200"
                    style={{
                      background: isOpen ? 'var(--accent-soft)' : 'var(--bg-surface-soft)',
                      borderColor: 'var(--border)',
                      color: isOpen ? 'var(--accent)' : 'var(--text-muted)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
                    <p className="text-sm sm:text-base leading-relaxed font-medium m-0" style={{ color: 'var(--text-secondary)' }}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Search Topic Badges */}
        <div className="text-center space-y-4 pt-4">
          <span className="calm-eyebrow">Popular Search Clusters &amp; Capabilities</span>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {[
              { label: 'Language Learning Application', href: '/features' },
              { label: 'AI Voice Tutor for Windows', href: '/ai-engine' },
              { label: 'FSRS v5 Spaced Repetition', href: '/features#flashcards' },
              { label: 'Offline Piper Neural Voices', href: '/ai-engine' },
              { label: 'Local Whisper Speech Recognition', href: '/ai-engine' },
              { label: 'Writing Atelier Translation', href: '/features#reading-writing' },
              { label: '9 Mini Games Curriculum', href: '/features#conversation-games' },
              { label: 'Free Microsoft Store App', href: '/download' },
            ].map((badge) => (
              <Link
                key={badge.label}
                href={badge.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all no-underline hover:-translate-y-0.5"
                style={{
                  background: 'var(--bg-surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-secondary)',
                }}
              >
                <span>{badge.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

