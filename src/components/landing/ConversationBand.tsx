'use client';

import { useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Globe,
  Star,
  Volume2,
  User,
} from 'lucide-react';
import { speakPhrase, playSoftChime } from '@/lib/speechDemo';

const DIALOGUE_OPTIONS = [
  { label: 'I am fine', correct: true },
  { label: 'Good morning', correct: false },
  { label: 'Thank you', correct: false },
];

const MINI_MATCH_PAIRS = [
  { id: 'm1', es: 'Mañana', en: 'Morning' },
  { id: 'm2', es: 'Tranquilo', en: 'Calm' },
  { id: 'm3', es: 'Aprender', en: 'To learn' },
];

const MINI_MATCH_RIGHT = [MINI_MATCH_PAIRS[1], MINI_MATCH_PAIRS[2], MINI_MATCH_PAIRS[0]];

const GRAMMAR_OPTIONS = ['es', 'está', 'son'];

export function ConversationBand() {
  const [slide, setSlide] = useState<1 | 2 | 3>(1);

  // Slide 1 state
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);

  // Slide 2 state (Matching Mini Game)
  const [pickLeft, setPickLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);

  // Slide 3 state (Fill Blank)
  const [grammarPick, setGrammarPick] = useState<string | null>(null);

  const prevSlide = () => setSlide((s) => (s === 1 ? 3 : ((s - 1) as 1 | 2 | 3)));
  const nextSlide = () => setSlide((s) => (s === 3 ? 1 : ((s + 1) as 1 | 2 | 3)));

  return (
    <section id="conversation-games" className="py-16 sm:py-24 px-5 sm:px-8" style={{ background: 'var(--bg-page)' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        {/* Left Copy Column */}
        <div className="lg:col-span-4 space-y-4 text-center lg:text-left">
          <span className="calm-eyebrow">CONVERSATION &amp; MINI GAMES</span>
          <h2
            className="font-display font-medium leading-[1.12]"
            style={{ fontSize: 'clamp(1.95rem, 3.5vw, 2.75rem)', color: 'var(--text-primary)' }}
          >
            Real-Life Dialogues
          </h2>
          <p className="text-sm sm:text-base leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
            Explore everyday branched conversations, tap words inline, and reinforce memory with 9 gentle mini games.
          </p>

          <ul className="space-y-2 list-none p-0 m-0 inline-block lg:block text-left">
            {[
              'Branched Dialogues & Audio',
              '9 Built-In Mini Games',
              'Grammar & Fill in the Blanks',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'var(--mint-soft)', color: 'var(--mint)' }}
                >
                  <Check className="w-3 h-3" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Center Floating Interactive Card (1/3 Pager) */}
        <div className="lg:col-span-4 flex justify-center">
          <div
            className="w-full max-w-[360px] rounded-[24px] border p-4 sm:p-5 space-y-3.5"
            style={{
              background: 'var(--bg-surface)',
              borderColor: 'var(--border-strong)',
              boxShadow: 'var(--shadow-clay-hover)',
            }}
          >
            {slide === 1 && (
              <div className="space-y-3">
                {/* Partner turn */}
                <div className="flex items-start gap-2">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                  >
                    <User className="w-3.5 h-3.5" />
                  </span>
                  <button
                    type="button"
                    onClick={() => void speakPhrase('Bonjour ! Comment ça va ?', 'fr-FR')}
                    className="px-3 py-2 rounded-2xl border text-xs font-bold text-left cursor-pointer flex items-center gap-2"
                    style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  >
                    <span>Bonjour ! Comment ça va ?</span>
                    <Volume2 className="w-3 h-3 shrink-0" style={{ color: 'var(--accent)' }} />
                  </button>
                </div>

                {/* User reply */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => void speakPhrase('Ça va bien, merci !', 'fr-FR')}
                    className="px-3.5 py-2 rounded-2xl border text-xs font-bold cursor-pointer inline-flex items-center gap-1.5"
                    style={{
                      background: 'var(--accent-soft)',
                      borderColor: 'var(--accent-muted)',
                      color: 'var(--accent)',
                    }}
                  >
                    <span>Ça va bien, merci !</span>
                    <Volume2 className="w-3 h-3 shrink-0" />
                  </button>
                </div>

                {/* Question prompt */}
                <div className="flex items-center gap-2 pt-1">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'var(--mint-soft)', color: 'var(--mint)' }}
                  >
                    <User className="w-3 h-3" />
                  </span>
                  <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                    What does this mean?
                  </span>
                </div>

                {/* Clickable Options */}
                <div className="grid grid-cols-3 gap-1.5">
                  {DIALOGUE_OPTIONS.map((opt) => {
                    const active = selectedMeaning === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => {
                          setSelectedMeaning(opt.label);
                          playSoftChime(opt.correct ? 'success' : 'gentle');
                        }}
                        className="py-2 px-1.5 rounded-xl border text-[11px] font-bold cursor-pointer transition-all"
                        style={{
                          background: active
                            ? opt.correct
                              ? 'var(--mint-soft)'
                              : 'var(--amber-soft)'
                            : 'var(--bg-surface-soft)',
                          borderColor: active
                            ? opt.correct
                              ? 'var(--mint)'
                              : 'var(--amber)'
                            : 'var(--border)',
                          color: active
                            ? opt.correct
                              ? 'var(--mint)'
                              : 'var(--amber)'
                            : 'var(--text-primary)',
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {selectedMeaning && (
                  <div className="text-[11px] font-bold text-center" style={{ color: selectedMeaning === 'I am fine' ? 'var(--mint)' : 'var(--amber)' }}>
                    {selectedMeaning === 'I am fine'
                      ? 'Exact! "Ça va bien, merci !" means "I am fine, thank you!"'
                      : 'Hint: Look at "bien" (well/fine) and "merci" (thanks).'}
                  </div>
                )}
              </div>
            )}

            {slide === 2 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
                  <span>Matching Pairs Mini Game</span>
                  <span style={{ color: 'var(--mint)' }}>{matched.length} / {MINI_MATCH_PAIRS.length}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    {MINI_MATCH_PAIRS.map((p) => {
                      const done = matched.includes(p.id);
                      const active = pickLeft === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          disabled={done}
                          onClick={() => {
                            playSoftChime('tap');
                            void speakPhrase(p.es, 'es-ES');
                            setPickLeft(p.id);
                          }}
                          className="w-full py-2 px-2.5 rounded-xl border text-xs font-bold cursor-pointer disabled:opacity-45"
                          style={{
                            background: done ? 'var(--mint-soft)' : active ? 'var(--accent-soft)' : 'var(--bg-surface-soft)',
                            borderColor: done ? 'var(--mint)' : active ? 'var(--accent)' : 'var(--border)',
                            color: done ? 'var(--mint)' : 'var(--text-primary)',
                          }}
                        >
                          {p.es}
                        </button>
                      );
                    })}
                  </div>
                  <div className="space-y-1.5">
                    {MINI_MATCH_RIGHT.map((p) => {
                      const done = matched.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          disabled={done}
                          onClick={() => {
                            if (!pickLeft) return;
                            if (pickLeft === p.id) {
                              playSoftChime('success');
                              setMatched((prev) => [...prev, p.id]);
                              setPickLeft(null);
                            } else {
                              playSoftChime('gentle');
                              setPickLeft(null);
                            }
                          }}
                          className="w-full py-2 px-2.5 rounded-xl border text-xs font-bold cursor-pointer disabled:opacity-45"
                          style={{
                            background: done ? 'var(--mint-soft)' : 'var(--bg-surface)',
                            borderColor: done ? 'var(--mint)' : 'var(--border)',
                            color: done ? 'var(--mint)' : 'var(--text-secondary)',
                          }}
                        >
                          {p.en}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {matched.length === MINI_MATCH_PAIRS.length && (
                  <button
                    type="button"
                    onClick={() => {
                      setMatched([]);
                      setPickLeft(null);
                    }}
                    className="w-full py-1.5 rounded-xl border text-xs font-bold cursor-pointer"
                    style={{ background: 'var(--mint-soft)', borderColor: 'transparent', color: 'var(--mint)' }}
                  >
                    All matched! Play again
                  </button>
                )}
              </div>
            )}

            {slide === 3 && (
              <div className="space-y-3 py-1">
                <div className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                  Grammar Arena · Fill in the blank
                </div>
                <div className="rounded-xl border p-3.5 text-center font-display text-lg font-medium" style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                  El café <span style={{ color: 'var(--accent)' }}>{grammarPick ?? '____'}</span> caliente hoy.
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {GRAMMAR_OPTIONS.map((opt) => {
                    const active = grammarPick === opt;
                    const ok = opt === 'está';
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setGrammarPick(opt);
                          playSoftChime(ok ? 'success' : 'gentle');
                        }}
                        className="py-2 rounded-xl border text-xs font-bold cursor-pointer"
                        style={{
                          background: active ? (ok ? 'var(--mint-soft)' : 'var(--amber-soft)') : 'var(--bg-surface-soft)',
                          borderColor: active ? (ok ? 'var(--mint)' : 'var(--amber)') : 'var(--border)',
                          color: active ? (ok ? 'var(--mint)' : 'var(--amber)') : 'var(--text-primary)',
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {grammarPick && (
                  <p className="text-[11px] font-bold text-center m-0" style={{ color: grammarPick === 'está' ? 'var(--mint)' : 'var(--amber)' }}>
                    {grammarPick === 'está'
                      ? 'Correct! Use "está" for temperature or temporary states.'
                      : 'Try "está" for temporary conditions like coffee warmth.'}
                  </p>
                )}
              </div>
            )}

            {/* Clean Pager Row matching Reference */}
            <div className="flex items-center justify-between pt-2 border-t text-xs font-bold" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
              <button
                type="button"
                onClick={prevSlide}
                className="p-1 rounded-full hover:opacity-75 cursor-pointer bg-transparent border-0"
                style={{ color: 'var(--text-primary)' }}
                aria-label="Previous interactive example"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>{slide} / 3</span>
              <button
                type="button"
                onClick={nextSlide}
                className="p-1 rounded-full hover:opacity-75 cursor-pointer bg-transparent border-0"
                style={{ color: 'var(--text-primary)' }}
                aria-label="Next interactive example"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Compact Honest 3-Column Metrics Card */}
        <div className="lg:col-span-4 flex justify-center">
          <div
            className="w-full rounded-[24px] border p-5 sm:p-6 grid grid-cols-3 divide-x text-center"
            style={{
              background: 'var(--bg-surface-soft)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <div className="px-2 space-y-1.5 flex flex-col items-center" style={{ borderColor: 'var(--border)' }}>
              <Download className="w-5 h-5" style={{ color: 'var(--mint)' }} />
              <div className="font-display font-semibold text-2xl sm:text-3xl leading-none" style={{ color: 'var(--text-primary)' }}>
                8
              </div>
              <div className="text-[11px] font-bold" style={{ color: 'var(--text-muted)' }}>
                Studios
              </div>
            </div>

            <div className="px-2 space-y-1.5 flex flex-col items-center" style={{ borderColor: 'var(--border)' }}>
              <Globe className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              <div className="font-display font-semibold text-2xl sm:text-3xl leading-none" style={{ color: 'var(--text-primary)' }}>
                20
              </div>
              <div className="text-[11px] font-bold" style={{ color: 'var(--text-muted)' }}>
                Offline Voices
              </div>
            </div>

            <div className="px-2 space-y-1.5 flex flex-col items-center" style={{ borderColor: 'var(--border)' }}>
              <Star className="w-5 h-5 fill-current" style={{ color: 'var(--mint)' }} />
              <div className="font-display font-semibold text-2xl sm:text-3xl leading-none" style={{ color: 'var(--text-primary)' }}>
                100%
              </div>
              <div className="text-[11px] font-bold" style={{ color: 'var(--text-muted)' }}>
                Local Privacy
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

