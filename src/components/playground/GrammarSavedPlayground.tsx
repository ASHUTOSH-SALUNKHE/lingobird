'use client';

import { useState } from 'react';
import { Volume2, BookmarkCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { speakPhrase, playSoftChime } from '@/lib/speechDemo';
import type { SavedDemoWord } from './playgroundTypes';

const GRAMMAR_QUESTION = {
  prompt: 'Choose the natural Spanish verb for location or feeling:',
  sentence: 'El café ____ caliente hoy.',
  options: ['es', 'está', 'son', 'están'],
  correct: 'está',
  explanation: 'Use "estar" (está) for current temperature or state, and singular agreement with "el café".',
};

export function GrammarSavedPlayground({
  savedWords,
  onEarnXp,
}: {
  savedWords: SavedDemoWord[];
  onEarnXp: (xp: number) => void;
}) {
  const [chosen, setChosen] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      {/* Mini Grammar Drill */}
      <div className="rounded-2xl border p-4 sm:p-5 space-y-3" style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Grammar Arena Snippet</span>
          </span>
          <span className="text-[11px] font-bold" style={{ color: 'var(--text-muted)' }}>
            Ser vs. Estar
          </span>
        </div>

        <p className="text-xs font-semibold m-0" style={{ color: 'var(--text-secondary)' }}>
          {GRAMMAR_QUESTION.prompt}
        </p>

        <div className="font-lang font-bold text-lg sm:text-xl" style={{ color: 'var(--text-primary)' }}>
          {chosen === GRAMMAR_QUESTION.correct
            ? 'El café está muy caliente hoy.'
            : GRAMMAR_QUESTION.sentence}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {GRAMMAR_QUESTION.options.map((opt) => {
            const active = chosen === opt;
            const ok = opt === GRAMMAR_QUESTION.correct;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setChosen(opt);
                  if (ok) {
                    playSoftChime('success');
                    onEarnXp(10);
                  } else {
                    playSoftChime('gentle');
                  }
                }}
                className="py-2 px-3 rounded-xl border text-sm font-lang font-bold cursor-pointer transition-all"
                style={{
                  background: active ? (ok ? 'var(--mint-soft)' : 'var(--amber-soft)') : 'var(--bg-surface)',
                  borderColor: active ? (ok ? 'var(--mint)' : 'var(--amber)') : 'var(--border)',
                  color: active ? (ok ? 'var(--mint)' : 'var(--amber)') : 'var(--text-primary)',
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {chosen && (
          <p className="text-xs font-semibold m-0 flex items-center gap-1.5" style={{ color: chosen === GRAMMAR_QUESTION.correct ? 'var(--mint)' : 'var(--amber)' }}>
            {chosen === GRAMMAR_QUESTION.correct && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
            <span>{GRAMMAR_QUESTION.explanation}</span>
          </p>
        )}
      </div>

      {/* Live Saved Words Vault */}
      <div className="rounded-2xl border p-4 sm:p-5 space-y-3" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4" style={{ color: 'var(--mint)' }} />
            <h4 className="font-display font-semibold text-base m-0" style={{ color: 'var(--text-primary)' }}>
              Your Interactive Saved Notebook
            </h4>
          </div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: 'var(--mint-soft)', color: 'var(--mint)' }}>
            {savedWords.length} saved
          </span>
        </div>

        <p className="text-xs font-medium m-0" style={{ color: 'var(--text-secondary)' }}>
          Words saved from <strong>Conversation</strong> or <strong>Reading</strong> appear here immediately — just like LingoBird&apos;s Saved Words vault.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {savedWords.map((item) => (
            <div
              key={`${item.word}-${item.language}`}
              className="rounded-xl border p-3 flex items-center justify-between gap-2"
              style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)' }}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-lang font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                    {item.word}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                    {item.language}
                  </span>
                </div>
                <div className="text-xs font-semibold truncate" style={{ color: 'var(--text-secondary)' }}>
                  {item.meaning}
                </div>
              </div>

              <button
                type="button"
                onClick={() => void speakPhrase(item.word, item.language === 'Japanese' ? 'ja-JP' : 'es-ES')}
                className="p-1.5 rounded-full border-0 cursor-pointer shrink-0"
                style={{ background: 'var(--bg-surface)', color: 'var(--accent)' }}
                aria-label={`Pronounce ${item.word}`}
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

