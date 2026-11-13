'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Bookmark, BarChart3, Zap, Palette, RotateCw, Layers } from 'lucide-react';
import { speakPhrase, playSoftChime } from '@/lib/speechDemo';
import { SavedWordsShowcase } from './SavedWordsShowcase';

interface ShowcaseCard {
  id: string;
  word: string;
  phonetic: string;
  pos: string;
  meaning: string;
  example: string;
  langCode: string;
  langBadge: string;
  image?: string;
}

const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: 'serenity',
    word: 'serenity',
    phonetic: 'suh-REN-i-tee',
    pos: 'n.',
    meaning: 'peaceful calmness',
    example: 'Quiet study brings serenity to daily language practice.',
    langCode: 'en-US',
    langBadge: 'English · Scenery Card',
    image: '/images/art/card-serenity.jpg',
  },
  {
    id: 'desayuno',
    word: 'Desayuno',
    phonetic: 'de-sa-YU-no',
    pos: 'n.',
    meaning: 'quiet morning breakfast',
    example: 'Tomo un desayuno tranquilo antes de leer.',
    langCode: 'es-ES',
    langBadge: 'Spanish · Custom HTML/CSS',
    image: '/images/art/card-desayuno.jpg',
  },
  {
    id: 'kissaten',
    word: '喫茶店',
    phonetic: 'きっさてん (kissaten)',
    pos: 'n.',
    meaning: 'cozy traditional café',
    example: '静かな喫茶店で日本語の本を読みます。',
    langCode: 'ja-JP',
    langBadge: 'Japanese N5 · FSRS Active',
    image: '/images/art/card-kissaten.jpg',
  },
];

const FSRS_CHIPS = [
  { label: 'Again', next: '<1m' },
  { label: 'Hard', next: '12m' },
  { label: 'Good', next: '3d' },
  { label: 'Easy', next: '7d' },
];

export function FlashcardsBand() {
  const [showcaseTab, setShowcaseTab] = useState<'flashcards' | 'library'>('flashcards');
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [aiStyle, setAiStyle] = useState(false);
  const [ratedNote, setRatedNote] = useState<string | null>(null);

  const card = SHOWCASE_CARDS[idx];

  const switchShowcaseTab = (tab: 'flashcards' | 'library') => {
    if (tab === showcaseTab) return;
    playSoftChime('tap');
    setShowcaseTab(tab);
  };

  const handleNextCard = () => {
    playSoftChime('tap');
    setFlipped(false);
    setRatedNote(null);
    setIdx((cur) => (cur + 1) % SHOWCASE_CARDS.length);
  };

  const handleFlip = () => {
    playSoftChime('tap');
    setFlipped((f) => !f);
  };

  const handleFsrsRate = (label: string, next: string) => {
    playSoftChime('success');
    setRatedNote(`Scheduled: ${label} (${next})`);
    setTimeout(() => {
      handleNextCard();
    }, 550);
  };

  return (
    <section id="flashcards" className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 px-5 sm:px-8" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Top-Right Segmented Pill Switcher (Flashcards <-> Word Library) */}
        <div className="flex justify-center lg:justify-end mb-6 sm:mb-8">
          <div
            role="tablist"
            aria-label="Switch between Flashcards and Word Library"
            className="inline-flex items-center gap-1 p-1.5 rounded-full border"
            style={{
              background: 'var(--bg-surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <button
              type="button"
              role="tab"
              aria-selected={showcaseTab === 'flashcards'}
              onClick={() => switchShowcaseTab('flashcards')}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer transition-all"
              style={
                showcaseTab === 'flashcards'
                  ? { background: 'var(--mint-soft)', color: 'var(--mint)' }
                  : { background: 'transparent', color: 'var(--text-secondary)' }
              }
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flashcards</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={showcaseTab === 'library'}
              onClick={() => switchShowcaseTab('library')}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer transition-all"
              style={
                showcaseTab === 'library'
                  ? { background: 'var(--mint-soft)', color: 'var(--mint)' }
                  : { background: 'transparent', color: 'var(--text-secondary)' }
              }
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Word Library</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: Switchable Interactive Stage (Flashcards Stack or Saved Words Library) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <AnimatePresence mode="wait">
              {showcaseTab === 'flashcards' ? (
                <motion.div
                  key="flashcards-stage"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="relative w-full max-w-[440px] py-4">
            {/* Popped-out Back Definition Mini Card peeking behind & right like reference */}
            <button
              type="button"
              onClick={handleFlip}
              className="hidden sm:flex flex-col justify-center items-start text-left absolute -right-4 top-1/2 -translate-y-1/2 w-44 rounded-2xl border p-4 cursor-pointer transition-all hover:translate-x-1 z-10"
              style={{
                background: 'var(--bg-surface-soft)',
                borderColor: 'var(--border-strong)',
                boxShadow: 'var(--shadow-clay)',
                transform: 'translateY(-42%) rotate(3deg)',
              }}
              aria-label="Reveal flashcard back"
            >
              <span className="text-xs font-mono-code font-bold mb-1" style={{ color: 'var(--accent)' }}>
                {card.pos}
              </span>
              <span className="font-display font-medium text-base leading-snug" style={{ color: 'var(--text-primary)' }}>
                {card.meaning}
              </span>
              <span className="text-[10px] font-bold mt-2" style={{ color: 'var(--text-muted)' }}>
                Tap card to flip
              </span>
            </button>

            {/* Curved delicate arrow connector */}
            <svg
              aria-hidden="true"
              viewBox="0 0 80 48"
              className="hidden sm:block absolute -top-2 right-16 w-16 h-10 z-20 pointer-events-none"
              style={{ color: 'var(--text-muted)' }}
            >
              <path
                d="M10,36 C26,6 56,10 66,30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M60,26 L67,32 L70,22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Primary Tilted Flashcard */}
            <div
              role="button"
              tabIndex={0}
              onClick={handleFlip}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleFlip();
                }
              }}
              className="relative z-20 w-full sm:w-[320px] mx-auto sm:ml-4 rounded-[26px] border p-4 transition-all duration-300 -rotate-2 hover:rotate-0 cursor-pointer select-none"
              style={
                aiStyle
                  ? {
                      background:
                        'linear-gradient(145deg, rgba(39,116,173,0.12) 0%, var(--bg-surface) 58%, rgba(44,126,88,0.12) 100%)',
                      borderColor: 'var(--accent)',
                      boxShadow: 'var(--shadow-clay-hover)',
                    }
                  : {
                      background: 'var(--bg-surface)',
                      borderColor: 'var(--border-strong)',
                      boxShadow: 'var(--shadow-clay-hover)',
                    }
              }
            >
              <AnimatePresence mode="wait">
                {!flipped ? (
                  <motion.div
                    key={`${card.id}-front`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-4 text-center pb-2"
                  >
                    {card.image ? (
                      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                        <Image
                          src={card.image}
                          alt={card.word}
                          fill
                          className="object-cover"
                        />
                        {aiStyle && (
                          <span
                            className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm"
                            style={{ background: 'var(--bg-surface)', color: 'var(--accent)' }}
                          >
                            AI HTML/CSS Slot
                          </span>
                        )}
                      </div>
                    ) : (
                      <div
                        className="aspect-[16/10] w-full rounded-2xl border flex flex-col items-center justify-center p-4"
                        style={{
                          background: aiStyle
                            ? 'linear-gradient(135deg, var(--accent-soft), var(--mint-soft))'
                            : 'var(--bg-surface-soft)',
                          borderColor: 'var(--border)',
                        }}
                      >
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-2" style={{ background: 'var(--bg-surface)', color: 'var(--accent)' }}>
                          {aiStyle ? 'AI HTML/CSS Card Slot' : card.langBadge}
                        </span>
                        <span className="font-mono-code text-xs" style={{ color: 'var(--text-muted)' }}>
                          /{card.phonetic}/
                        </span>
                      </div>
                    )}

                    <div className="space-y-1.5 pt-1">
                      <div className="font-display font-semibold text-3xl" style={{ color: 'var(--text-primary)' }}>
                        {card.word}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          void speakPhrase(card.word, card.langCode);
                        }}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-full border cursor-pointer transition-colors"
                        style={{
                          background: 'var(--bg-surface-soft)',
                          borderColor: 'var(--border)',
                          color: 'var(--text-primary)',
                        }}
                        aria-label={`Pronounce ${card.word}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${card.id}-back`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="py-5 px-2 space-y-4 text-center min-h-[250px] flex flex-col justify-between"
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                      {card.langBadge}
                    </div>
                    <div className="space-y-2">
                      <div className="font-display font-semibold text-2xl" style={{ color: 'var(--text-primary)' }}>
                        {card.pos} {card.meaning}
                      </div>
                      <p className="text-xs sm:text-sm font-medium leading-relaxed m-0 px-2" style={{ color: 'var(--text-secondary)' }}>
                        &ldquo;{card.example}&rdquo;
                      </p>
                    </div>
                    <div className="text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                      Tap card to return · Rate recall below
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Minimalist Interactive Bar below Cards */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <button
              type="button"
              onClick={handleNextCard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <RotateCw className="w-3 h-3" />
              <span>Card {idx + 1} / {SHOWCASE_CARDS.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setAiStyle((s) => !s)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer"
              style={{
                background: aiStyle ? 'var(--accent-soft)' : 'var(--bg-surface)',
                borderColor: aiStyle ? 'var(--accent-muted)' : 'var(--border)',
                color: aiStyle ? 'var(--accent)' : 'var(--text-secondary)',
              }}
            >
              <Palette className="w-3 h-3" />
              <span>{aiStyle ? 'AI CSS Active' : 'AI Card Styling'}</span>
            </button>

            {FSRS_CHIPS.map((r) => (
              <button
                key={r.label}
                type="button"
                onClick={() => handleFsrsRate(r.label, r.next)}
                className="px-2.5 py-1.5 rounded-full text-[11px] font-bold border cursor-pointer transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              >
                {r.label}
              </button>
            ))}
          </div>

                  {ratedNote && (
                    <span className="text-xs font-bold mt-2" style={{ color: 'var(--mint)' }}>
                      {ratedNote}
                    </span>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="library-stage"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="w-full flex flex-col items-center"
                >
                  <SavedWordsShowcase />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Editorial Copy */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            <span className="calm-eyebrow">FLASHCARDS &amp; LIBRARY</span>
            <h2
              className="font-display font-medium leading-[1.12]"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', color: 'var(--text-primary)' }}
            >
              Learn Smarter, <br />
              Remember Longer
            </h2>
            <p className="text-base leading-relaxed font-medium max-w-lg mx-auto lg:mx-0" style={{ color: 'var(--text-secondary)' }}>
              Use Anki-grade FSRS spaced repetition flashcards, design custom front and back templates directly via HTML/CSS or ChatGPT prompts, export self-contained <code className="font-mono-code text-xs">.lbdeck</code> files, and build your personal word library. Practice active recall by adding meanings and creating sentences, checked instantly by AI.
            </p>

            {/* 3 Calm Horizontal Icon Callouts matching Reference */}
            <div className="grid grid-cols-3 gap-4 pt-2 max-w-md mx-auto lg:mx-0">
              {[
                { icon: Zap, label: 'Spaced\nRepetition', targetTab: 'flashcards' as const },
                { icon: Bookmark, label: 'Personal\nLibrary', targetTab: 'library' as const },
                { icon: BarChart3, label: 'Track Your\nProgress', targetTab: null },
              ].map((item) => {
                const Icon = item.icon;
                const interactive = item.targetTab !== null;
                if (interactive) {
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => switchShowcaseTab(item.targetTab!)}
                      className="flex items-center gap-2.5 text-left bg-transparent border-0 p-0 cursor-pointer transition-opacity hover:opacity-80"
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'var(--mint-soft)', color: 'var(--mint)' }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold leading-tight whitespace-pre-line" style={{ color: 'var(--text-primary)' }}>
                        {item.label}
                      </span>
                    </button>
                  );
                }
                return (
                  <div key={item.label} className="flex items-center gap-2.5 text-left">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'var(--mint-soft)', color: 'var(--mint)' }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold leading-tight whitespace-pre-line" style={{ color: 'var(--text-primary)' }}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
