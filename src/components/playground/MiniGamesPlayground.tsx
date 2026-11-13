'use client';

import { useState } from 'react';
import { Puzzle, Grid2x2, RotateCcw, CheckCircle2, Sparkles } from 'lucide-react';
import { playSoftChime, speakPhrase } from '@/lib/speechDemo';

interface MatchPair {
  id: string;
  target: string;
  english: string;
}

const MATCH_PAIRS: MatchPair[] = [
  { id: '1', target: 'Mañana', english: 'Morning' },
  { id: '2', target: 'Biblioteca', english: 'Library' },
  { id: '3', target: 'Tranquilo', english: 'Calm' },
  { id: '4', target: 'Aprender', english: 'To learn' },
];

const RIGHT_SHUFFLED: MatchPair[] = [
  MATCH_PAIRS[2],
  MATCH_PAIRS[0],
  MATCH_PAIRS[3],
  MATCH_PAIRS[1],
];

const SENTENCE_CHIPS = [
  { id: 'c1', text: 'Me gusta' },
  { id: 'c2', text: 'estudiar' },
  { id: 'c3', text: 'idiomas' },
  { id: 'c4', text: 'por la mañana' },
];

const SCRAMBLED_CHIPS = [
  SENTENCE_CHIPS[2],
  SENTENCE_CHIPS[0],
  SENTENCE_CHIPS[3],
  SENTENCE_CHIPS[1],
];

export function MiniGamesPlayground({ onEarnXp }: { onEarnXp: (xp: number) => void }) {
  const [gameMode, setGameMode] = useState<'matching' | 'sentence'>('matching');

  // Matching Pairs state
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [mismatchPair, setMismatchPair] = useState<string | null>(null);

  // Sentence Builder state
  const [chosenIds, setChosenIds] = useState<string[]>([]);
  const [sentenceChecked, setSentenceChecked] = useState<'idle' | 'correct' | 'try-again'>('idle');

  const handlePickLeft = (pair: MatchPair) => {
    if (matchedIds.includes(pair.id)) return;
    playSoftChime('tap');
    void speakPhrase(pair.target, 'es-ES');
    setSelectedLeft(pair.id);
    setMismatchPair(null);
  };

  const handlePickRight = (pair: MatchPair) => {
    if (matchedIds.includes(pair.id) || !selectedLeft) return;

    if (selectedLeft === pair.id) {
      playSoftChime('success');
      onEarnXp(10);
      setMatchedIds((prev) => [...prev, pair.id]);
      setSelectedLeft(null);
    } else {
      playSoftChime('gentle');
      setMismatchPair(pair.id);
      setTimeout(() => {
        setMismatchPair(null);
        setSelectedLeft(null);
      }, 450);
    }
  };

  const resetMatching = () => {
    setSelectedLeft(null);
    setMatchedIds([]);
    setMismatchPair(null);
  };

  const toggleChip = (id: string) => {
    playSoftChime('tap');
    setSentenceChecked('idle');
    setChosenIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const checkSentence = () => {
    const built = chosenIds.map((id) => SENTENCE_CHIPS.find((c) => c.id === id)?.text).join(' ');
    if (built === 'Me gusta estudiar idiomas por la mañana') {
      playSoftChime('success');
      onEarnXp(15);
      setSentenceChecked('correct');
      void speakPhrase(built, 'es-ES');
    } else {
      playSoftChime('gentle');
      setSentenceChecked('try-again');
    }
  };

  const allMatched = matchedIds.length === MATCH_PAIRS.length;

  return (
    <div className="space-y-4">
      {/* Sub-game switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 p-1 rounded-full border" style={{ background: 'var(--bg-input)', borderColor: 'var(--border)' }}>
          <button
            type="button"
            onClick={() => setGameMode('matching')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border-0 cursor-pointer"
            style={{
              background: gameMode === 'matching' ? 'var(--bg-surface)' : 'transparent',
              color: gameMode === 'matching' ? 'var(--accent)' : 'var(--text-muted)',
              boxShadow: gameMode === 'matching' ? 'var(--shadow-soft)' : 'none',
            }}
          >
            <Grid2x2 className="w-3.5 h-3.5" />
            <span>Matching Pairs</span>
          </button>
          <button
            type="button"
            onClick={() => setGameMode('sentence')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border-0 cursor-pointer"
            style={{
              background: gameMode === 'sentence' ? 'var(--bg-surface)' : 'transparent',
              color: gameMode === 'sentence' ? 'var(--accent)' : 'var(--text-muted)',
              boxShadow: gameMode === 'sentence' ? 'var(--shadow-soft)' : 'none',
            }}
          >
            <Puzzle className="w-3.5 h-3.5" />
            <span>Sentence Builder</span>
          </button>
        </div>

        <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
          2 of 9 built-in games
        </span>
      </div>

      {gameMode === 'matching' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            <span>Tap a Spanish word, then tap its English partner</span>
            <span>{matchedIds.length} / {MATCH_PAIRS.length} paired</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Left column: Spanish */}
            <div className="space-y-2.5">
              {MATCH_PAIRS.map((pair) => {
                const matched = matchedIds.includes(pair.id);
                const active = selectedLeft === pair.id;
                return (
                  <button
                    key={pair.id}
                    type="button"
                    disabled={matched}
                    onClick={() => handlePickLeft(pair)}
                    className="w-full py-3 px-4 rounded-2xl border font-lang text-sm font-bold text-center transition-all cursor-pointer disabled:opacity-45"
                    style={{
                      background: matched
                        ? 'var(--mint-soft)'
                        : active
                        ? 'var(--accent-soft)'
                        : 'var(--bg-surface)',
                      borderColor: matched
                        ? 'var(--mint)'
                        : active
                        ? 'var(--accent)'
                        : 'var(--border-strong)',
                      color: matched
                        ? 'var(--mint)'
                        : active
                        ? 'var(--accent)'
                        : 'var(--text-primary)',
                    }}
                  >
                    {pair.target}
                  </button>
                );
              })}
            </div>

            {/* Right column: English */}
            <div className="space-y-2.5">
              {RIGHT_SHUFFLED.map((pair) => {
                const matched = matchedIds.includes(pair.id);
                const wrong = mismatchPair === pair.id;
                return (
                  <button
                    key={pair.id}
                    type="button"
                    disabled={matched}
                    onClick={() => handlePickRight(pair)}
                    className="w-full py-3 px-4 rounded-2xl border text-sm font-bold text-center transition-all cursor-pointer disabled:opacity-45"
                    style={{
                      background: matched
                        ? 'var(--mint-soft)'
                        : wrong
                        ? 'var(--amber-soft)'
                        : 'var(--bg-surface-soft)',
                      borderColor: matched
                        ? 'var(--mint)'
                        : wrong
                        ? 'var(--amber)'
                        : 'var(--border)',
                      color: matched
                        ? 'var(--mint)'
                        : wrong
                        ? 'var(--amber)'
                        : 'var(--text-secondary)',
                    }}
                  >
                    {pair.english}
                  </button>
                );
              })}
            </div>
          </div>

          {allMatched && (
            <div
              className="rounded-2xl border p-3.5 flex items-center justify-between gap-2 text-xs font-bold"
              style={{ background: 'var(--mint-soft)', borderColor: 'rgba(47,158,111,0.3)', color: 'var(--mint)' }}
            >
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>All pairs matched cleanly!</span>
              </span>
              <button
                type="button"
                onClick={resetMatching}
                className="px-3 py-1 rounded-full border cursor-pointer inline-flex items-center gap-1 text-xs font-bold"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Play Again</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border p-4 space-y-2" style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)' }}>
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Assemble the Spanish sentence
            </div>
            <div className="font-display font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
              &ldquo;I like studying languages in the morning.&rdquo;
            </div>
          </div>

          {/* Drop zone */}
          <div
            className="min-h-[60px] rounded-2xl border p-3 flex flex-wrap items-center gap-2"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-strong)' }}
          >
            {chosenIds.length === 0 ? (
              <span className="text-xs font-semibold px-1" style={{ color: 'var(--text-muted)' }}>
                Click word tiles below in the right order…
              </span>
            ) : (
              chosenIds.map((id) => {
                const chip = SENTENCE_CHIPS.find((c) => c.id === id);
                if (!chip) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleChip(id)}
                    className="px-3.5 py-1.5 rounded-full border text-sm font-lang font-bold cursor-pointer"
                    style={{ background: 'var(--accent-soft)', borderColor: 'var(--accent)', color: 'var(--accent)' }}
                  >
                    {chip.text}
                  </button>
                );
              })
            )}
          </div>

          {/* Word Bank */}
          <div className="flex flex-wrap gap-2">
            {SCRAMBLED_CHIPS.map((chip) => {
              const used = chosenIds.includes(chip.id);
              return (
                <button
                  key={chip.id}
                  type="button"
                  disabled={used}
                  onClick={() => toggleChip(chip.id)}
                  className="px-3.5 py-1.5 rounded-full border text-sm font-lang font-bold cursor-pointer disabled:opacity-35"
                  style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                >
                  {chip.text}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={chosenIds.length < SENTENCE_CHIPS.length}
                onClick={checkSentence}
                className="calm-btn-primary text-xs py-2 px-5 disabled:opacity-45"
              >
                Check Order
              </button>
              <button
                type="button"
                onClick={() => {
                  setChosenIds([]);
                  setSentenceChecked('idle');
                }}
                className="calm-btn-secondary text-xs py-2 px-4"
              >
                Reset
              </button>
            </div>

            {sentenceChecked === 'correct' && (
              <span className="text-xs font-bold inline-flex items-center gap-1.5" style={{ color: 'var(--mint)' }}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Perfect! &ldquo;Me gusta estudiar idiomas por la mañana.&rdquo;</span>
              </span>
            )}
            {sentenceChecked === 'try-again' && (
              <span className="text-xs font-bold" style={{ color: 'var(--amber)' }}>
                Almost there — tap chips to reorder starting with &ldquo;Me gusta&rdquo;.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

