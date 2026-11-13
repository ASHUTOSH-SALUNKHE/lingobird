'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { PILLAR_EXPLORER } from '@/data/lingobirdData';
import { SCREENSHOT_SLOTS, type MediaAvailability } from '@/lib/mediaRegistry';
import { MediaSlot } from './MediaSlot';

export function PillarExplorer({ availability }: { availability: MediaAvailability }) {
  const [activeId, setActiveId] = useState(PILLAR_EXPLORER[0].id);
  const current = PILLAR_EXPLORER.find((p) => p.id === activeId) ?? PILLAR_EXPLORER[0];
  const slot = SCREENSHOT_SLOTS[current.screenshotKey];

  return (
    <div className="space-y-8">
      {/* Segment pills */}
      <div className="flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="LingoBird Application Pillars">
        {PILLAR_EXPLORER.map((pillar) => {
          const active = pillar.id === current.id;
          return (
            <button
              key={pillar.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveId(pillar.id)}
              className="px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer"
              style={{
                background: active ? 'var(--accent)' : 'var(--bg-surface)',
                borderColor: active ? 'var(--accent)' : 'var(--border)',
                color: active ? '#ffffff' : 'var(--text-secondary)',
                boxShadow: active ? 'var(--shadow-pill)' : 'var(--shadow-soft)',
              }}
            >
              {pillar.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Calm side-by-side layout */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-5 space-y-4">
            <span className="calm-tag">{current.eyebrow}</span>
            <h3 className="font-display font-semibold text-2xl sm:text-3xl leading-snug" style={{ color: 'var(--text-primary)' }}>
              {current.title}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
              {current.description}
            </p>
            <ul className="space-y-2.5 list-none p-0 m-0">
              {current.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--mint)' }} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                href={current.id === 'offline-ai' ? '/ai-engine' : '/features'}
                className="inline-flex items-center gap-1.5 text-sm font-extrabold no-underline hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                <span>Explore full {current.id === 'offline-ai' ? 'AI & Speech' : 'feature'} breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <MediaSlot slot={slot} availability={availability} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

