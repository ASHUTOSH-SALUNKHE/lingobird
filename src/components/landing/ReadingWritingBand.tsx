'use client';

import { useState } from 'react';
import { Volume2, BookOpen, PenLine, Check, RotateCcw, Wand2 } from 'lucide-react';
import { speakPhrase, playSoftChime } from '@/lib/speechDemo';
import { WaveDivider } from './WaveDivider';

interface StoryWord {
  text: string;
  reading?: string;
  meaning?: string;
}

const READING_SENTENCE: StoryWord[] = [
  { text: '雨', reading: 'あめ (ame)', meaning: 'rain' },
  { text: 'の日に、' },
  { text: '静かな', reading: 'しずかな', meaning: 'quiet / calm' },
  { text: '喫茶店', reading: 'きっさてん (kissaten)', meaning: 'small café' },
  { text: 'に入りました。' },
];

const WRITING_PROMPTS = [
  {
    langCode: 'fr-FR',
    prompt: 'Le voyage est incroyable.',
    translation: 'The journey is incredible.',
  },
  {
    langCode: 'es-ES',
    prompt: 'El café está muy caliente.',
    translation: 'The coffee is very warm.',
  },
];

function normalizeAccents(val: string) {
  return val
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function ReadingWritingBand() {
  const [mode, setMode] = useState<'writing' | 'reading'>('writing');
  const [promptIdx, setPromptIdx] = useState(0);
  const currentPrompt = WRITING_PROMPTS[promptIdx];

  const [typed, setTyped] = useState('Le voyage est incroyable.');
  const [selectedWord, setSelectedWord] = useState<StoryWord>(READING_SENTENCE[3]);

  const isExactMatch = normalizeAccents(typed) === normalizeAccents(currentPrompt.prompt);

  const handleSwitchPrompt = () => {
    const nextIdx = (promptIdx + 1) % WRITING_PROMPTS.length;
    setPromptIdx(nextIdx);
    setTyped(WRITING_PROMPTS[nextIdx].prompt);
  };

  const handleHint = () => {
    playSoftChime('tap');
    const target = currentPrompt.prompt;
    if (typed.trim().length >= target.length) {
      setTyped(target);
      return;
    }
    let nextSpace = target.indexOf(' ', typed.length + 1);
    if (nextSpace === -1) nextSpace = target.length;
    setTyped(target.slice(0, nextSpace));
  };

  return (
    <section id="reading-writing" className="relative">
      <WaveDivider fill="var(--bg-sage)" variant={2} />

      <div className="py-12 sm:py-16 px-5 sm:px-8" style={{ background: 'var(--bg-sage)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Copy Column */}
          <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
            <span className="calm-eyebrow">READING &amp; WRITING PRACTICE</span>
            <h2
              className="font-display font-medium leading-[1.12]"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', color: 'var(--text-primary)' }}
            >
              Read, Write, <br />
              Improve
            </h2>
            <p className="text-base leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
              Read graded stories (N5–B2) with tap-to-inspect word definitions, practice writing line by line, and let LingoBird catch subtle spelling or accent mistakes calmly.
            </p>

            {/* Interactive Mode Switch Pills matching Reference */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-1">
              <button
                type="button"
                onClick={() => setMode('reading')}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-left transition-all cursor-pointer"
                style={{
                  background:
                    mode === 'reading'
                      ? 'var(--bg-surface)'
                      : 'color-mix(in srgb, var(--bg-surface) 58%, transparent)',
                  borderColor: mode === 'reading' ? 'var(--mint)' : 'var(--border)',
                  boxShadow: mode === 'reading' ? 'var(--shadow-soft)' : 'none',
                }}
              >
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'var(--mint-soft)', color: 'var(--mint)' }}
                >
                  <BookOpen className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                  Read-Aloud <br />
                  Stories
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMode('writing')}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-left transition-all cursor-pointer"
                style={{
                  background:
                    mode === 'writing'
                      ? 'var(--bg-surface)'
                      : 'color-mix(in srgb, var(--bg-surface) 58%, transparent)',
                  borderColor: mode === 'writing' ? 'var(--mint)' : 'var(--border)',
                  boxShadow: mode === 'writing' ? 'var(--shadow-soft)' : 'none',
                }}
              >
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'var(--mint-soft)', color: 'var(--mint)' }}
                >
                  <PenLine className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                  Writing with <br />
                  Feedback
                </span>
              </button>
            </div>
          </div>

          {/* Right Floating Interactive Card */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div
              className="w-full max-w-[540px] rounded-[26px] border p-5 sm:p-7 space-y-4 transition-all"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border-strong)',
                boxShadow: 'var(--shadow-clay-hover)',
              }}
            >
              {mode === 'writing' ? (
                <>
                  {/* Top sentence bar */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => void speakPhrase(currentPrompt.prompt, currentPrompt.langCode)}
                        className="w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer shrink-0"
                        style={{
                          background: 'var(--bg-surface-soft)',
                          borderColor: 'var(--border)',
                          color: 'var(--text-primary)',
                        }}
                        aria-label="Listen to writing prompt"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div>
                        <div className="text-sm sm:text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                          {currentPrompt.prompt}
                        </div>
                        <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                          {currentPrompt.translation}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleSwitchPrompt}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer shrink-0"
                      style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                    >
                      {currentPrompt.langCode.startsWith('fr') ? '🇫🇷 FR' : '🇪🇸 ES'}
                    </button>
                  </div>

                  {/* Interactive Input Strip mimicking handwriting card in reference */}
                  <div
                    className="rounded-2xl border p-4 flex items-center justify-between gap-3"
                    style={{
                      background: 'var(--bg-surface-soft)',
                      borderColor: isExactMatch ? 'rgba(44,126,88,0.35)' : 'var(--border-strong)',
                    }}
                  >
                    <input
                      type="text"
                      value={typed}
                      onChange={(e) => setTyped(e.target.value)}
                      aria-label="Practice typing target phrase"
                      className="w-full bg-transparent border-0 outline-none font-display italic text-xl sm:text-2xl"
                      style={{ color: 'var(--text-primary)' }}
                    />
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: isExactMatch ? 'var(--mint)' : 'var(--amber-soft)',
                        color: isExactMatch ? '#ffffff' : 'var(--amber)',
                      }}
                    >
                      {isExactMatch ? <Check className="w-4 h-4" /> : <PenLine className="w-3.5 h-3.5" />}
                    </span>
                  </div>

                  {/* Feedback & subtle controls */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold"
                      style={{
                        background: isExactMatch ? 'var(--mint-soft)' : 'var(--amber-soft)',
                        color: isExactMatch ? 'var(--mint)' : 'var(--amber)',
                      }}
                    >
                      {isExactMatch ? <Check className="w-3.5 h-3.5" /> : null}
                      <span>{isExactMatch ? 'Great job!' : 'Keep typing — accents are accent-forgiving'}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleHint}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold cursor-pointer"
                        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                      >
                        <Wand2 className="w-3 h-3" />
                        <span>Hint</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTyped('')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold cursor-pointer"
                        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                        aria-label="Clear typing input"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Try typing</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <span className="calm-tag">Japanese N5 Story · Tap Any Word</span>
                    <button
                      type="button"
                      onClick={() => void speakPhrase('雨の日に、静かな喫茶店に入りました。', 'ja-JP')}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold cursor-pointer"
                      style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)', color: 'var(--accent)' }}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Read Aloud</span>
                    </button>
                  </div>

                  <div className="rounded-2xl border p-4 space-y-2" style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)' }}>
                    <p className="font-lang text-xl font-bold leading-relaxed m-0" style={{ color: 'var(--text-primary)' }}>
                      {READING_SENTENCE.map((w, i) =>
                        w.meaning ? (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              playSoftChime('tap');
                              setSelectedWord(w);
                            }}
                            className="inline border-0 bg-transparent px-1 rounded-lg font-[inherit] cursor-pointer"
                            style={{
                              background: selectedWord.text === w.text ? 'var(--accent-soft)' : 'transparent',
                              color: 'var(--accent)',
                              borderBottom: '2px dotted var(--accent-bright)',
                            }}
                          >
                            {w.text}
                          </button>
                        ) : (
                          <span key={i}>{w.text}</span>
                        )
                      )}
                    </p>
                    <p className="text-xs font-medium m-0" style={{ color: 'var(--text-muted)' }}>
                      On a rainy day, I entered a quiet café.
                    </p>
                  </div>

                  <div className="rounded-xl border px-4 py-3 flex items-center justify-between gap-3" style={{ background: 'var(--bg-surface)', borderColor: 'var(--accent-muted)' }}>
                    <div>
                      <span className="font-lang font-bold text-sm mr-2" style={{ color: 'var(--text-primary)' }}>
                        {selectedWord.text}
                      </span>
                      <span className="text-xs font-mono-code" style={{ color: 'var(--text-muted)' }}>
                        {selectedWord.reading}
                      </span>
                    </div>
                    <span className="text-xs font-extrabold" style={{ color: 'var(--mint)' }}>
                      = {selectedWord.meaning}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-sage)' }}>
        <WaveDivider fill="var(--bg-forest)" variant={3} />
      </div>
    </section>
  );
}
