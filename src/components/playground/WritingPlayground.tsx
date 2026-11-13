'use client';

import { useState } from 'react';
import { Eye, EyeOff, Wand2, RotateCcw, Volume2, CheckCircle2 } from 'lucide-react';
import { speakPhrase, playSoftChime } from '@/lib/speechDemo';

interface WritingExercise {
  id: string;
  title: string;
  language: string;
  langCode: string;
  sourceEnglish: string;
  targetSentence: string;
  wordHints: { source: string; target: string }[];
}

const EXERCISES: WritingExercise[] = [
  {
    id: 'coffee',
    title: 'Morning Coffee',
    language: 'Spanish',
    langCode: 'es-ES',
    sourceEnglish: 'The coffee is very warm today.',
    targetSentence: 'El café está muy caliente hoy.',
    wordHints: [
      { source: 'The coffee', target: 'El café' },
      { source: 'is', target: 'está' },
      { source: 'very warm', target: 'muy caliente' },
      { source: 'today', target: 'hoy' },
    ],
  },
  {
    id: 'study',
    title: 'Daily Practice',
    language: 'Spanish',
    langCode: 'es-ES',
    sourceEnglish: 'I study a little every day.',
    targetSentence: 'Estudio un poco cada día.',
    wordHints: [
      { source: 'I study', target: 'Estudio' },
      { source: 'a little', target: 'un poco' },
      { source: 'every day', target: 'cada día' },
    ],
  },
];

function normalizeAccents(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function WritingPlayground({ onEarnXp }: { onEarnXp: (xp: number) => void }) {
  const [exIdx, setExIdx] = useState(0);
  const exercise = EXERCISES[exIdx];

  const [typed, setTyped] = useState('');
  const [showTarget, setShowTarget] = useState(true);
  const [selectedHint, setSelectedHint] = useState<{ source: string; target: string } | null>(null);
  const [completed, setCompleted] = useState(false);

  const target = exercise.targetSentence;

  const handleChange = (val: string) => {
    setTyped(val);
    if (showTarget && val.length >= 2) {
      setShowTarget(false);
    }
    if (normalizeAccents(val.trim()) === normalizeAccents(target)) {
      if (!completed) {
        setCompleted(true);
        playSoftChime('success');
        onEarnXp(15);
      }
    } else {
      setCompleted(false);
    }
  };

  const handleHintNextWord = () => {
    playSoftChime('tap');
    // Append up to the next space so accents & spelling feel effortless
    const cleanTypedLen = typed.length;
    if (cleanTypedLen >= target.length) return;
    let nextSpace = target.indexOf(' ', cleanTypedLen + 1);
    if (nextSpace === -1) nextSpace = target.length;
    const assisted = target.slice(0, nextSpace === target.length ? nextSpace : nextSpace + 1);
    setTyped(assisted);
    if (normalizeAccents(assisted.trim()) === normalizeAccents(target)) {
      setCompleted(true);
      playSoftChime('success');
      onEarnXp(10);
    }
  };

  const resetExercise = (nextIdx = exIdx) => {
    setExIdx(nextIdx);
    setTyped('');
    setShowTarget(true);
    setSelectedHint(null);
    setCompleted(false);
  };

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 p-1 rounded-full border" style={{ background: 'var(--bg-input)', borderColor: 'var(--border)' }}>
          {EXERCISES.map((ex, i) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => resetExercise(i)}
              className="px-3 py-1 rounded-full text-xs font-bold border-0 cursor-pointer transition-all"
              style={{
                background: exIdx === i ? 'var(--bg-surface)' : 'transparent',
                color: exIdx === i ? 'var(--accent)' : 'var(--text-muted)',
                boxShadow: exIdx === i ? 'var(--shadow-soft)' : 'none',
              }}
            >
              {ex.title}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowTarget((v) => !v)}
            className="px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer inline-flex items-center gap-1"
            style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          >
            {showTarget ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showTarget ? 'Hide Guide' : 'Peek Answer'}</span>
          </button>

          <button
            type="button"
            onClick={() => void speakPhrase(target, exercise.langCode)}
            className="px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer inline-flex items-center gap-1"
            style={{ background: 'var(--accent-soft)', borderColor: 'var(--border)', color: 'var(--accent)' }}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Hear Target</span>
          </button>
        </div>
      </div>

      {/* English Prompt & Tap Gloss Chips */}
      <div className="rounded-2xl border p-4 sm:p-5 space-y-3" style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)' }}>
        <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Translate into {exercise.language} (tap any phrase hint below)
        </div>
        <div className="font-display font-semibold text-xl sm:text-2xl" style={{ color: 'var(--text-primary)' }}>
          &ldquo;{exercise.sourceEnglish}&rdquo;
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {exercise.wordHints.map((h) => (
            <button
              key={h.source}
              type="button"
              onClick={() => {
                playSoftChime('tap');
                setSelectedHint(h);
              }}
              className="px-2.5 py-1 rounded-full text-xs font-bold border cursor-pointer transition-colors"
              style={{
                background: selectedHint?.source === h.source ? 'var(--accent-soft)' : 'var(--bg-surface)',
                borderColor: selectedHint?.source === h.source ? 'var(--accent)' : 'var(--border)',
                color: selectedHint?.source === h.source ? 'var(--accent)' : 'var(--text-secondary)',
              }}
            >
              {h.source}
            </button>
          ))}
        </div>

        {selectedHint && (
          <div className="text-xs font-bold px-3 py-1.5 rounded-xl inline-block" style={{ background: 'var(--bg-surface)', color: 'var(--accent)' }}>
            {selectedHint.source} → <span className="font-lang">{selectedHint.target}</span>
          </div>
        )}
      </div>

      {/* Live Character Preview */}
      <div className="rounded-2xl border p-4 space-y-3" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        {showTarget ? (
          <div className="flex items-center justify-between gap-2 pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
              Guide Preview (auto-hides as you type):
            </span>
            <span className="font-lang text-sm font-bold" style={{ color: 'var(--accent)' }}>
              {target}
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-0.5 text-base font-lang font-bold min-h-[28px]">
            {target.split('').map((expectedChar, idx) => {
              const userChar = typed[idx];
              if (userChar === undefined) {
                return (
                  <span key={idx} style={{ color: 'var(--text-muted)', opacity: 0.45 }}>
                    {expectedChar === ' ' ? '\u00A0' : '·'}
                  </span>
                );
              }
              const matches = normalizeAccents(userChar) === normalizeAccents(expectedChar);
              return (
                <span
                  key={idx}
                  style={{
                    color: matches ? 'var(--mint)' : 'var(--amber)',
                    textDecoration: matches ? 'none' : 'underline dotted',
                  }}
                >
                  {userChar === ' ' ? '\u00A0' : userChar}
                </span>
              );
            })}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={typed}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Start typing the translation here…"
            aria-label="Type translation"
            className="flex-1 px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none"
            style={{
              background: 'var(--bg-input)',
              borderColor: completed ? 'var(--mint)' : 'var(--border-strong)',
              color: 'var(--text-primary)',
            }}
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleHintNextWord}
              className="px-3.5 py-2.5 rounded-xl border text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              style={{ background: 'var(--amber-soft)', borderColor: 'var(--border)', color: 'var(--amber)' }}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Hint Word</span>
            </button>

            <button
              type="button"
              onClick={() => resetExercise(exIdx)}
              className="p-2.5 rounded-xl border cursor-pointer"
              style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}
              aria-label="Clear writing input"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {completed && (
        <div
          className="rounded-2xl border p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs font-bold"
          style={{ background: 'var(--mint-soft)', borderColor: 'rgba(47,158,111,0.3)', color: 'var(--mint)' }}
        >
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Exact match! Notice how Writing Atelier accepts unaccented characters calmly while reinforcing natural spelling.</span>
          </span>
          <button
            type="button"
            onClick={() => resetExercise((exIdx + 1) % EXERCISES.length)}
            className="px-3 py-1 rounded-full border cursor-pointer text-xs font-bold"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            Next Prompt →
          </button>
        </div>
      )}
    </div>
  );
}

