'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, RotateCw, Sparkles, Palette, CheckCircle2 } from 'lucide-react';
import { speakPhrase, playSoftChime } from '@/lib/speechDemo';

interface FlashcardItem {
  id: string;
  front: string;
  phonetic: string;
  back: string;
  example: string;
  exampleTranslation: string;
  langCode: string;
  tip: string;
}

const DECKS: Record<'spanish' | 'japanese', { title: string; badge: string; cards: FlashcardItem[] }> = {
  spanish: {
    title: 'Everyday Spanish Café',
    badge: 'ES → EN · FSRS Active',
    cards: [
      {
        id: 'es-1',
        front: 'Desayuno',
        phonetic: 'de-sa-YU-no',
        back: 'Breakfast',
        example: 'Tomo un desayuno tranquilo en casa.',
        exampleTranslation: 'I have a quiet breakfast at home.',
        langCode: 'es-ES',
        tip: 'Also works as the verb form "yo desayuno" (I eat breakfast).',
      },
      {
        id: 'es-2',
        front: 'Tranquilo',
        phonetic: 'tran-KEE-lo',
        back: 'Calm / Peaceful',
        example: 'Es una mañana muy tranquila.',
        exampleTranslation: 'It is a very peaceful morning.',
        langCode: 'es-ES',
        tip: 'Changes ending (-o/-a) to match the noun gender.',
      },
      {
        id: 'es-3',
        front: '¿Me trae la cuenta?',
        phonetic: 'me TRA-e la KWEN-ta',
        back: 'Could you bring me the bill?',
        example: 'Perdón, ¿me trae la cuenta, por favor?',
        exampleTranslation: 'Excuse me, could you bring the bill, please?',
        langCode: 'es-ES',
        tip: 'Polite third-person "usted" phrasing ideal for cafés.',
      },
    ],
  },
  japanese: {
    title: 'Japanese N5 Essentials',
    badge: 'JA → EN · FSRS Active',
    cards: [
      {
        id: 'ja-1',
        front: '喫茶店',
        phonetic: 'きっさてん (kissaten)',
        back: 'Traditional café / Tea house',
        example: '雨の日に小さな喫茶店に入りました。',
        exampleTranslation: 'I stepped into a small café on a rainy day.',
        langCode: 'ja-JP',
        tip: 'Often refers to cozy, classic Japanese coffee houses.',
      },
      {
        id: 'ja-2',
        front: '少しずつ',
        phonetic: 'すこしずつ (sukoshizutsu)',
        back: 'Little by little',
        example: '毎日少しずつ練習しましょう。',
        exampleTranslation: 'Let us practice a little every day.',
        langCode: 'ja-JP',
        tip: 'Attach "ずつ" to quantities to express steady pacing.',
      },
      {
        id: 'ja-3',
        front: '大丈夫',
        phonetic: 'だいじょうぶ (daijoubu)',
        back: 'Alright / It is okay',
        example: '漢字は難しくても大丈夫ですよ。',
        exampleTranslation: 'Even if kanji feels hard, it is okay!',
        langCode: 'ja-JP',
        tip: 'Functions as a Na-adjective and comforting reassurance.',
      },
    ],
  },
};

const FSRS_RATINGS = [
  { label: 'Again', interval: '< 1m', color: 'var(--coral)', bg: 'var(--coral-soft)' },
  { label: 'Hard', interval: '12m', color: 'var(--amber)', bg: 'var(--amber-soft)' },
  { label: 'Good', interval: '3d', color: 'var(--mint)', bg: 'var(--mint-soft)' },
  { label: 'Easy', interval: '7d', color: 'var(--accent)', bg: 'var(--accent-soft)' },
];

export function FlashcardPlayground({ onEarnXp }: { onEarnXp: (xp: number) => void }) {
  const [lang, setLang] = useState<'spanish' | 'japanese'>('spanish');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [customStyle, setCustomStyle] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const deck = DECKS[lang];
  const card = deck.cards[index];

  const handleLangSwitch = (next: 'spanish' | 'japanese') => {
    setLang(next);
    setIndex(0);
    setFlipped(false);
    setCompleted(false);
  };

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setSpeaking(true);
    await speakPhrase(card.front, card.langCode);
    setSpeaking(false);
  };

  const handleRate = () => {
    playSoftChime('success');
    onEarnXp(10);
    setFlipped(false);
    if (index + 1 >= deck.cards.length) {
      setCompleted(true);
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="space-y-5">
      {/* Top toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-full border" style={{ background: 'var(--bg-input)', borderColor: 'var(--border)' }}>
          {(['spanish', 'japanese'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleLangSwitch(key)}
              className="px-3 py-1 rounded-full text-xs font-bold capitalize transition-all cursor-pointer border-0"
              style={{
                background: lang === key ? 'var(--bg-surface)' : 'transparent',
                color: lang === key ? 'var(--accent)' : 'var(--text-muted)',
                boxShadow: lang === key ? 'var(--shadow-soft)' : 'none',
              }}
            >
              {key === 'spanish' ? '🇪🇸 Spanish' : '🇯🇵 Japanese'}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCustomStyle((s) => !s)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer"
          style={{
            background: customStyle ? 'var(--violet-soft)' : 'var(--bg-surface-soft)',
            borderColor: customStyle ? 'var(--violet)' : 'var(--border)',
            color: customStyle ? 'var(--violet)' : 'var(--text-secondary)',
          }}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>{customStyle ? 'AI Custom HTML/CSS Card' : 'Switch to AI Card Style'}</span>
        </button>
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
          <span>{deck.title}</span>
          <span>
            {completed ? deck.cards.length : index + 1} / {deck.cards.length} cards
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-input)' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${completed ? 100 : Math.round(((index + (flipped ? 0.5 : 0.15)) / deck.cards.length) * 100)}%`,
              background: 'linear-gradient(90deg, var(--accent), var(--mint))',
            }}
          />
        </div>
      </div>

      {completed ? (
        <div
          className="rounded-2xl border p-8 text-center space-y-4"
          style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)' }}
        >
          <div
            className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center"
            style={{ background: 'var(--mint-soft)', color: 'var(--mint)' }}
          >
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-display font-semibold text-xl" style={{ color: 'var(--text-primary)' }}>
              Session Complete
            </h4>
            <p className="text-sm font-medium mt-1" style={{ color: 'var(--text-secondary)' }}>
              FSRS has scheduled your next intervals cleanly. Try switching to AI Card Style or Japanese above.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIndex(0);
              setFlipped(false);
              setCompleted(false);
            }}
            className="calm-btn-secondary text-xs py-2.5 px-5"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Review Deck Again</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Interactive Card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              playSoftChime('tap');
              setFlipped((f) => !f);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setFlipped((f) => !f);
              }
            }}
            className="rounded-3xl border p-6 sm:p-8 cursor-pointer select-none min-h-[250px] flex flex-col justify-between transition-all"
            style={
              customStyle
                ? {
                    background:
                      'linear-gradient(145deg, rgba(115, 87, 201, 0.14) 0%, var(--bg-surface) 55%, rgba(47, 158, 111, 0.1) 100%)',
                    borderColor: 'var(--violet)',
                    boxShadow: 'var(--shadow-clay)',
                  }
                : {
                    background: 'var(--bg-surface-soft)',
                    borderColor: 'var(--border-strong)',
                    boxShadow: 'var(--shadow-soft)',
                  }
            }
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: customStyle ? 'var(--violet-soft)' : 'var(--accent-soft)',
                  color: customStyle ? 'var(--violet)' : 'var(--accent)',
                }}
              >
                {customStyle ? 'Custom Template Slot · Front/Back CSS' : deck.badge}
              </span>

              <button
                type="button"
                onClick={handleSpeak}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer"
                style={{
                  background: 'var(--bg-surface)',
                  borderColor: 'var(--border)',
                  color: speaking ? 'var(--accent)' : 'var(--text-secondary)',
                }}
                aria-label="Pronounce word"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{speaking ? 'Speaking…' : 'Listen'}</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {!flipped ? (
                <motion.div
                  key="front"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  className="text-center py-6 space-y-2.5"
                >
                  <div className="font-lang font-bold text-3xl sm:text-4xl" style={{ color: 'var(--text-primary)' }}>
                    {card.front}
                  </div>
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-mono-code font-semibold border"
                    style={{
                      background: 'var(--bg-surface)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    /{card.phonetic}/
                  </div>
                  <p className="text-xs font-medium pt-2" style={{ color: 'var(--text-muted)' }}>
                    Click card to flip for meaning & context
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="back"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  className="py-4 space-y-3 text-center"
                >
                  <div className="font-display font-semibold text-2xl sm:text-3xl" style={{ color: 'var(--accent)' }}>
                    {card.back}
                  </div>
                  <div
                    className="max-w-md mx-auto rounded-2xl border p-3.5 text-left space-y-1"
                    style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                  >
                    <div className="font-lang text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {card.example}
                    </div>
                    <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                      {card.exampleTranslation}
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                    <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--amber)' }} />
                    <span>{card.tip}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-center text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
              {flipped ? 'Rate how comfortably you recalled this card' : 'Tap anywhere on card to reveal'}
            </div>
          </div>

          {/* FSRS Rating Row */}
          {flipped ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {FSRS_RATINGS.map((r) => (
                <button
                  key={r.label}
                  type="button"
                  onClick={handleRate}
                  className="py-2.5 px-3 rounded-2xl border text-center transition-transform hover:-translate-y-0.5 cursor-pointer"
                  style={{ background: r.bg, borderColor: 'var(--border)', color: r.color }}
                >
                  <div className="text-xs font-extrabold">{r.label}</div>
                  <div className="text-[11px] font-semibold opacity-80">{r.interval}</div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setFlipped(true)}
                className="calm-btn-primary text-xs py-2.5 px-6"
              >
                Show Answer
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

