'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Search,
  Star,
  BookOpen,
  Eye,
  Wand2,
  AlertTriangle,
  CheckCircle2,
  BookmarkPlus,
} from 'lucide-react';
import { speakPhrase, playSoftChime } from '@/lib/speechDemo';
import { BB } from './previewData';

/* ── 1. FLASHCARDS PANEL ──────────────────────────────────── */

const PREVIEW_CARDS = [
  {
    id: 'fc-1',
    deck: 'Japanese Core Essentials',
    front: '喫茶店',
    phonetic: 'きっさてん · kissaten',
    back: 'Traditional café / Tea house',
    example: '雨の日に小さな喫茶店に入りました。',
    exampleEn: 'I entered a small café on a rainy day.',
    langCode: 'ja-JP',
  },
  {
    id: 'fc-2',
    deck: 'Spanish Morning Routine',
    front: 'Desayuno',
    phonetic: 'de-sa-YU-no',
    back: 'Breakfast',
    example: 'Tomo un desayuno tranquilo en casa.',
    exampleEn: 'I have a calm breakfast at home.',
    langCode: 'es-ES',
  },
  {
    id: 'fc-3',
    deck: 'French Daily Calm',
    front: 'Bonjour',
    phonetic: 'bon-ZHOOR',
    back: 'Good morning / Hello',
    example: 'Bonjour ! Un café crème, s’il vous plaît.',
    exampleEn: 'Good morning! A coffee with cream, please.',
    langCode: 'fr-FR',
  },
];

const FSRS_OPTS = [
  { label: 'Again', interval: '<1m', bg: '#fff1f0', color: '#c53030' },
  { label: 'Hard', interval: '12m', bg: '#fef4e2', color: '#c4760a' },
  { label: 'Good', interval: '3d', bg: '#e8f7ef', color: '#2d8a5b' },
  { label: 'Easy', interval: '7d', bg: '#e7f1fb', color: '#3373b0' },
];

export function FlashcardsPreview({ onEarnXp }: { onEarnXp: (xp: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [ratedCount, setRatedCount] = useState(0);

  const card = PREVIEW_CARDS[idx];

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setSpeaking(true);
    await speakPhrase(card.front, card.langCode);
    setSpeaking(false);
  };

  const goStep = (delta: number) => {
    playSoftChime('tap');
    setFlipped(false);
    setIdx((i) => (i + delta + PREVIEW_CARDS.length) % PREVIEW_CARDS.length);
  };

  const handleRate = () => {
    playSoftChime('success');
    onEarnXp(10);
    setRatedCount((c) => c + 1);
    setFlipped(false);
    setIdx((i) => (i + 1) % PREVIEW_CARDS.length);
  };

  return (
    <div className="space-y-3">
      {/* Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-extrabold m-0" style={{ color: BB.textPrimary }}>
            {card.deck}
          </h3>
          <p className="text-[11px] font-semibold m-0" style={{ color: BB.textMuted }}>
            FSRS Spaced Repetition · Reviewed {ratedCount} in preview
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => goStep(-1)}
            aria-label="Previous flashcard"
            className="p-1.5 rounded-lg border cursor-pointer hover:brightness-95"
            style={{ background: BB.surface, borderColor: BB.border, color: BB.textSecondary }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span
            className="text-[11px] font-mono-code font-bold px-2 py-1 rounded-lg border"
            style={{ background: BB.surface, borderColor: BB.border, color: BB.textPrimary }}
          >
            {idx + 1} / {PREVIEW_CARDS.length}
          </span>
          <button
            type="button"
            onClick={() => goStep(1)}
            aria-label="Next flashcard"
            className="p-1.5 rounded-lg border cursor-pointer hover:brightness-95"
            style={{ background: BB.surface, borderColor: BB.border, color: BB.textSecondary }}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Flashcard Surface */}
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
        className="rounded-2xl border p-4 sm:p-5 cursor-pointer select-none min-h-[210px] flex flex-col justify-between transition-colors hover:border-[#3373b0]/45"
        style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
            style={{ background: BB.surfaceSubtle, color: BB.accent, borderColor: BB.border }}
          >
            Click card to flip
          </span>

          <button
            type="button"
            onClick={handleSpeak}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] font-bold cursor-pointer"
            style={{
              background: speaking ? BB.accentSoft : BB.inputBg,
              borderColor: BB.border,
              color: BB.accent,
            }}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{speaking ? 'Speaking…' : 'Pronounce'}</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!flipped ? (
            <motion.div
              key={`${card.id}-front`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.16 }}
              className="text-center py-4 space-y-2"
            >
              <div className="font-lang font-bold text-2xl sm:text-3xl" style={{ color: BB.textPrimary }}>
                {card.front}
              </div>
              <div
                className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono-code font-semibold border"
                style={{ background: BB.inputBg, borderColor: BB.border, color: BB.textMuted }}
              >
                /{card.phonetic}/
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`${card.id}-back`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.16 }}
              className="py-2 space-y-2.5 text-center"
            >
              <div className="text-lg sm:text-xl font-extrabold" style={{ color: BB.accent }}>
                {card.back}
              </div>
              <div
                className="max-w-sm mx-auto rounded-xl border p-2.5 text-left space-y-0.5"
                style={{ background: BB.inputBg, borderColor: BB.border }}
              >
                <div className="font-lang text-xs font-bold" style={{ color: BB.textPrimary }}>
                  {card.example}
                </div>
                <div className="text-[11px] font-medium" style={{ color: BB.textSecondary }}>
                  {card.exampleEn}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold" style={{ color: BB.textMuted }}>
          <RotateCw className="w-3 h-3" />
          <span>{flipped ? 'Choose FSRS interval below' : 'Reveal back & context example'}</span>
        </div>
      </div>

      {/* FSRS Rating Row */}
      <div className="grid grid-cols-4 gap-2">
        {FSRS_OPTS.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={handleRate}
            className="py-2 px-2 rounded-xl border text-center cursor-pointer transition-transform hover:-translate-y-0.5"
            style={{ background: opt.bg, borderColor: BB.border, color: opt.color }}
          >
            <div className="text-[11px] font-extrabold">{opt.label}</div>
            <div className="text-[10px] font-semibold opacity-85">{opt.interval}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── 2. SAVED VOCABULARY PANEL ────────────────────────────── */

const SAVED_ITEMS = [
  { id: 'sv1', word: '木漏れ日', reading: 'komorebi', meaning: 'Sunlight filtering through trees', lang: 'Japanese', langCode: 'ja-JP', difficulty: 'Easy', starred: true },
  { id: 'sv2', word: 'Desayuno', reading: 'de-sa-YU-no', meaning: 'Breakfast', lang: 'Spanish', langCode: 'es-ES', difficulty: 'Easy', starred: true },
  { id: 'sv3', word: '静か', reading: 'shizuka', meaning: 'Quiet / peaceful', lang: 'Japanese', langCode: 'ja-JP', difficulty: 'Medium', starred: false },
  { id: 'sv4', word: 'Flâner', reading: 'fla-NE', meaning: 'To stroll slowly', lang: 'French', langCode: 'fr-FR', difficulty: 'Medium', starred: true },
  { id: 'sv5', word: 'Sobremesa', reading: 'so-bre-ME-sa', meaning: 'Conversation after a meal', lang: 'Spanish', langCode: 'es-ES', difficulty: 'Hard', starred: false },
  { id: 'sv6', word: '喫茶店', reading: 'kissaten', meaning: 'Classic Japanese café', lang: 'Japanese', langCode: 'ja-JP', difficulty: 'Hard', starred: true },
];

export function SavedPreview() {
  const [query, setQuery] = useState('');
  const [langFilter, setLangFilter] = useState<'All' | 'Japanese' | 'Spanish' | 'French'>('All');
  const [starredIds, setStarredIds] = useState<string[]>(['sv1', 'sv2', 'sv4', 'sv6']);

  const filtered = SAVED_ITEMS.filter((item) => {
    const matchLang = langFilter === 'All' || item.lang === langFilter;
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q || item.word.toLowerCase().includes(q) || item.meaning.toLowerCase().includes(q);
    return matchLang && matchQuery;
  });

  const toggleStar = (id: string) => {
    playSoftChime('tap');
    setStarredIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-extrabold m-0" style={{ color: BB.textPrimary }}>
            Saved Words Notebook
          </h3>
          <p className="text-[11px] font-semibold m-0" style={{ color: BB.textMuted }}>
            Organize vocabulary by language, difficulty, and priority stars
          </p>
        </div>

        <span
          className="text-[10px] font-extrabold px-2.5 py-1 rounded-full border"
          style={{ background: BB.surface, borderColor: BB.border, color: BB.accent }}
        >
          {filtered.length} saved words
        </span>
      </div>

      {/* Search + Language filter row */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div
          className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl border"
          style={{ background: BB.surface, borderColor: BB.border }}
        >
          <Search className="w-3.5 h-3.5 shrink-0" style={{ color: BB.textMuted }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search saved vocabulary…"
            aria-label="Search saved vocabulary"
            className="w-full bg-transparent border-0 outline-none text-xs font-semibold"
            style={{ color: BB.textPrimary }}
          />
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          {(['All', 'Japanese', 'Spanish', 'French'] as const).map((lang) => {
            const active = langFilter === lang;
            return (
              <button
                key={lang}
                type="button"
                onClick={() => setLangFilter(lang)}
                className="px-2.5 py-1.5 rounded-xl border text-[11px] font-bold cursor-pointer transition-colors"
                style={{
                  background: active ? BB.accent : BB.surface,
                  borderColor: active ? BB.accentEdge : BB.border,
                  color: active ? '#ffffff' : BB.textSecondary,
                }}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </div>

      {/* Words Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filtered.map((item) => {
          const isStarred = starredIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="rounded-xl border p-2.5 flex items-center justify-between gap-2"
              style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-lang text-xs font-extrabold truncate" style={{ color: BB.textPrimary }}>
                    {item.word}
                  </span>
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                    style={{ background: BB.surfaceSubtle, color: BB.accent }}
                  >
                    {item.lang}
                  </span>
                </div>
                <div className="text-[11px] font-semibold truncate" style={{ color: BB.textSecondary }}>
                  {item.meaning}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleStar(item.id)}
                  aria-label={`Star ${item.word}`}
                  className="p-1.5 rounded-lg border-0 bg-transparent cursor-pointer hover:bg-[#e7f1fb]"
                  style={{ color: isStarred ? '#d97706' : BB.textMuted }}
                >
                  <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-amber-400' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={() => void speakPhrase(item.word, item.langCode)}
                  aria-label={`Pronounce ${item.word}`}
                  className="p-1.5 rounded-lg border cursor-pointer"
                  style={{ background: BB.inputBg, borderColor: BB.border, color: BB.accent }}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── 3. READING PANEL ─────────────────────────────────────── */

const READING_TOKENS = [
  { text: '雨', word: '雨', reading: 'あめ (ame)', pos: 'Noun', meaning: 'Rain' },
  { text: 'の日に、' },
  { text: '静かな', word: '静か', reading: 'しずか (shizuka)', pos: 'Na-Adj', meaning: 'Quiet / calm' },
  { text: '喫茶店', word: '喫茶店', reading: 'きっさてん (kissaten)', pos: 'Noun', meaning: 'Traditional café' },
  { text: 'に入りました。' },
  { text: '毎日', word: '毎日', reading: 'まいにち (mainichi)', pos: 'Noun', meaning: 'Every day' },
  { text: '少しずつ', word: '少しずつ', reading: 'すこしずつ (sukoshizutsu)', pos: 'Adverb', meaning: 'Little by little' },
  { text: '練習', word: '練習', reading: 'れんしゅう (renshuu)', pos: 'Noun', meaning: 'Practice' },
  { text: 'しましょう。' },
];

export function ReadingPreview({ onEarnXp }: { onEarnXp: (xp: number) => void }) {
  const [selectedToken, setSelectedToken] = useState(READING_TOKENS[3]);
  const [showGloss, setShowGloss] = useState(true);
  const [savedWordFlag, setSavedWordFlag] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-7 h-7 rounded-xl border flex items-center justify-center shrink-0"
            style={{ background: BB.surface, borderColor: BB.border, color: BB.accent }}
          >
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-extrabold m-0 truncate" style={{ color: BB.textPrimary }}>
              雨の日の小さな喫茶店 · Rainy Day Café
            </h3>
            <span className="text-[10px] font-bold" style={{ color: BB.accent }}>
              Japanese · Beginner N5 · Tap any underlined word
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowGloss((s) => !s)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] font-bold cursor-pointer"
            style={{ background: BB.surface, borderColor: BB.border, color: BB.textSecondary }}
          >
            <Eye className="w-3 h-3" />
            <span>{showGloss ? 'Hide Romaji' : 'Romaji'}</span>
          </button>

          <button
            type="button"
            onClick={() =>
              void speakPhrase(
                '雨の日に、静かな喫茶店に入りました。毎日少しずつ練習しましょう。',
                'ja-JP'
              )
            }
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border-0 text-[10px] font-bold text-white cursor-pointer"
            style={{ background: BB.accent }}
          >
            <Volume2 className="w-3 h-3" />
            <span>Read Aloud</span>
          </button>
        </div>
      </div>

      {/* Story Body */}
      <div
        className="rounded-2xl border p-3.5 space-y-2"
        style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}
      >
        <p className="font-lang text-sm sm:text-base font-bold leading-loose m-0" style={{ color: BB.textPrimary }}>
          {READING_TOKENS.map((tok, i) =>
            tok.meaning ? (
              <button
                key={i}
                type="button"
                onClick={() => {
                  playSoftChime('tap');
                  setSelectedToken(tok);
                  setSavedWordFlag(false);
                }}
                className="inline border-0 px-1 py-0.5 rounded-md font-[inherit] cursor-pointer transition-colors"
                style={{
                  background: selectedToken.word === tok.word ? BB.accentSoft : 'rgba(51, 115, 176, 0.08)',
                  color: BB.accent,
                  borderBottom: '2px dotted #3373b0',
                }}
              >
                {tok.text}
              </button>
            ) : (
              <span key={i}>{tok.text}</span>
            )
          )}
        </p>

        {showGloss && (
          <div className="space-y-0.5 pt-1 border-t" style={{ borderColor: BB.border }}>
            <div className="text-[11px] font-mono-code" style={{ color: BB.textMuted }}>
              Ame no hi ni, shizuka na kissaten ni hairimashita. Mainichi sukoshizutsu renshuu shimashou.
            </div>
            <div className="text-[11px] font-semibold" style={{ color: BB.textSecondary }}>
              On a rainy day, I entered a quiet café. Let us practice little by little every day.
            </div>
          </div>
        )}
      </div>

      {/* Tap Inspector Bar */}
      <div
        className="rounded-2xl border p-3 flex flex-wrap items-center justify-between gap-2"
        style={{ background: BB.surface, borderColor: BB.border }}
      >
        <div>
          <div className="flex items-center gap-1.5">
            <span
              className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded"
              style={{ background: BB.surfaceSubtle, color: BB.accent }}
            >
              {selectedToken.pos}
            </span>
            <span className="font-lang text-sm font-extrabold" style={{ color: BB.textPrimary }}>
              {selectedToken.word}
            </span>
            <span className="text-[11px] font-mono-code" style={{ color: BB.textMuted }}>
              {selectedToken.reading}
            </span>
          </div>
          <div className="text-xs font-bold mt-0.5" style={{ color: BB.textSecondary }}>
            Meaning: <span style={{ color: BB.textPrimary }}>{selectedToken.meaning}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => void speakPhrase(selectedToken.word || '', 'ja-JP')}
            className="px-2.5 py-1 rounded-lg border text-[11px] font-bold cursor-pointer inline-flex items-center gap-1"
            style={{ background: BB.inputBg, borderColor: BB.border, color: BB.accent }}
          >
            <Volume2 className="w-3 h-3" />
            <span>Hear</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSoftChime('success');
              onEarnXp(5);
              setSavedWordFlag(true);
            }}
            className="px-2.5 py-1 rounded-lg border-0 text-[11px] font-bold cursor-pointer inline-flex items-center gap-1"
            style={{
              background: savedWordFlag ? BB.correctSoft : BB.accent,
              color: savedWordFlag ? BB.correct : '#ffffff',
            }}
          >
            {savedWordFlag ? <CheckCircle2 className="w-3 h-3" /> : <BookmarkPlus className="w-3 h-3" />}
            <span>{savedWordFlag ? 'Saved' : 'Save Word'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 4. WRITING PANEL ─────────────────────────────────────── */

const WRITING_TARGET = 'El café está caliente hoy.';

function normalizeChar(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

const RECENT_MISTAKES = [
  { word: 'caliente', expected: 'warm / hot', misses: 2, recovery: '2/3 streaks' },
  { word: 'está', expected: 'is (location / state)', misses: 1, recovery: '1/3 streaks' },
];

export function WritingPreview({ onEarnXp }: { onEarnXp: (xp: number) => void }) {
  const [typed, setTyped] = useState('El cafe esta ');
  const [showMistakes, setShowMistakes] = useState(false);

  const isExact = normalizeChar(typed.trim()) === normalizeChar(WRITING_TARGET);

  const handleAssist = () => {
    playSoftChime('tap');
    const nextLen = Math.min(WRITING_TARGET.length, typed.length + 6);
    const updated = WRITING_TARGET.slice(0, nextLen);
    setTyped(updated);
    if (normalizeChar(updated.trim()) === normalizeChar(WRITING_TARGET)) {
      playSoftChime('success');
      onEarnXp(15);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-extrabold m-0" style={{ color: BB.textPrimary }}>
            Writing Atelier · Spanish Prose
          </h3>
          <p className="text-[11px] font-semibold m-0" style={{ color: BB.textMuted }}>
            Real-time character validation & gentle accent forgiveness
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowMistakes((m) => !m)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] font-bold cursor-pointer"
          style={{
            background: showMistakes ? BB.amberSoft : BB.surface,
            borderColor: showMistakes ? 'rgba(196, 118, 10, 0.35)' : BB.border,
            color: showMistakes ? BB.amber : BB.textSecondary,
          }}
        >
          <AlertTriangle className="w-3 h-3" />
          <span>{showMistakes ? 'Back to Practice' : 'Mistakes Review (2)'}</span>
        </button>
      </div>

      {showMistakes ? (
        <div
          className="rounded-2xl border p-3.5 space-y-2.5"
          style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}
        >
          <div className="text-xs font-extrabold" style={{ color: BB.textPrimary }}>
            Writing Mistakes Recovery Queue
          </div>
          {RECENT_MISTAKES.map((m) => (
            <div
              key={m.word}
              className="rounded-xl border p-2.5 flex items-center justify-between gap-2"
              style={{ background: BB.inputBg, borderColor: BB.border }}
            >
              <div>
                <div className="font-lang text-xs font-extrabold" style={{ color: BB.textPrimary }}>
                  {m.word}
                </div>
                <div className="text-[10px] font-semibold" style={{ color: BB.textSecondary }}>
                  Meaning: {m.expected} · {m.recovery}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowMistakes(false);
                  setTyped('El café está ');
                }}
                className="px-2.5 py-1 rounded-lg border-0 text-[10px] font-bold text-white cursor-pointer"
                style={{ background: BB.accent }}
              >
                Practice
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl border p-3.5 space-y-3"
          style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: BB.textMuted }}>
                Translate into Spanish
              </div>
              <div className="text-sm font-extrabold" style={{ color: BB.textPrimary }}>
                &ldquo;The coffee is warm today.&rdquo;
              </div>
            </div>
            <button
              type="button"
              onClick={() => void speakPhrase(WRITING_TARGET, 'es-ES')}
              className="p-2 rounded-xl border cursor-pointer shrink-0"
              style={{ background: BB.inputBg, borderColor: BB.border, color: BB.accent }}
              aria-label="Hear Spanish sentence"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Live Character Feedback Bar */}
          <div
            className="rounded-xl border px-3 py-2 flex flex-wrap items-center gap-0.5 font-lang text-sm font-bold min-h-[36px]"
            style={{ background: BB.inputBg, borderColor: BB.border }}
          >
            {WRITING_TARGET.split('').map((expected, i) => {
              const actual = typed[i];
              if (actual === undefined) {
                return (
                  <span key={i} style={{ color: BB.textMuted, opacity: 0.45 }}>
                    {expected === ' ' ? '\u00A0' : '·'}
                  </span>
                );
              }
              const ok = normalizeChar(actual) === normalizeChar(expected);
              return (
                <span
                  key={i}
                  style={{
                    color: ok ? BB.correct : BB.amber,
                    textDecoration: ok ? 'none' : 'underline dotted',
                  }}
                >
                  {actual === ' ' ? '\u00A0' : actual}
                </span>
              );
            })}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              aria-label="Type Spanish translation"
              placeholder="Finish typing: caliente hoy."
              className="flex-1 min-w-0 px-3 py-2 rounded-xl border text-xs font-bold outline-none"
              style={{
                background: BB.surface,
                borderColor: isExact ? BB.correct : BB.borderStrong,
                color: BB.textPrimary,
              }}
            />
            <button
              type="button"
              onClick={handleAssist}
              className="px-3 py-2 rounded-xl border text-[11px] font-bold cursor-pointer inline-flex items-center gap-1 shrink-0"
              style={{ background: BB.amberSoft, borderColor: 'rgba(196, 118, 10, 0.25)', color: BB.amber }}
            >
              <Wand2 className="w-3 h-3" />
              <span>Hint</span>
            </button>
          </div>

          {isExact && (
            <div className="text-[11px] font-extrabold flex items-center gap-1.5" style={{ color: BB.correct }}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Exact sentence match! Mistakes workout automatically tracks tricky spelling.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

