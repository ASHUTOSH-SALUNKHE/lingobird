'use client';

import { useState } from 'react';
import {
  Volume2,
  RotateCcw,
  CheckCircle2,
  Flame,
  Gamepad2,
  PenTool,
  MessagesSquare,
} from 'lucide-react';
import { speakPhrase, playSoftChime } from '@/lib/speechDemo';
import { BB } from './previewData';

/* ── 5. CONVERSATION PANEL ────────────────────────────────── */

interface TurnItem {
  speaker: 'partner' | 'user';
  name: string;
  text: string;
  en: string;
}

const INITIAL_TURNS: TurnItem[] = [
  {
    speaker: 'partner',
    name: 'Sofía (Barista)',
    text: '¡Buenos días! ¿Qué te gustaría tomar hoy?',
    en: 'Good morning! What would you like to drink today?',
  },
];

const DIALOGUE_CHOICES = [
  {
    user: 'Un café con leche, por favor.',
    userEn: 'A coffee with milk, please.',
    reply: '¡Perfecto! Enseguida te lo preparo caliente.',
    replyEn: 'Perfect! I will make it hot for you right away.',
  },
  {
    user: 'Quisiera un té verde tranquilo.',
    userEn: 'I would like a soothing green tea.',
    reply: 'Excelente elección. Siéntate junto a la ventana.',
    replyEn: 'Excellent choice. Have a seat by the window.',
  },
];

export function ConversationPreview({ onEarnXp }: { onEarnXp: (xp: number) => void }) {
  const [turns, setTurns] = useState<TurnItem[]>(INITIAL_TURNS);
  const [replied, setReplied] = useState(false);

  const pickChoice = (choice: (typeof DIALOGUE_CHOICES)[number]) => {
    playSoftChime('success');
    onEarnXp(15);
    setTurns([
      ...INITIAL_TURNS,
      { speaker: 'user', name: 'You', text: choice.user, en: choice.userEn },
      { speaker: 'partner', name: 'Sofía (Barista)', text: choice.reply, en: choice.replyEn },
    ]);
    setReplied(true);
    void speakPhrase(choice.reply, 'es-ES');
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-xl border flex items-center justify-center shrink-0"
            style={{ background: BB.surface, borderColor: BB.border, color: BB.accent }}
          >
            <MessagesSquare className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold m-0" style={{ color: BB.textPrimary }}>
              Café in Madrid · Dialogue Arena
            </h3>
            <p className="text-[11px] font-semibold m-0" style={{ color: BB.textMuted }}>
              Tap speaker icons for native audio or reply below
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setTurns(INITIAL_TURNS);
            setReplied(false);
          }}
          className="p-1.5 rounded-lg border cursor-pointer"
          style={{ background: BB.surface, borderColor: BB.border, color: BB.textSecondary }}
          aria-label="Restart dialogue"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Chat Thread */}
      <div
        className="rounded-2xl border p-3 space-y-2.5 max-h-[215px] overflow-y-auto"
        style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}
      >
        {turns.map((turn, i) => {
          const isUser = turn.speaker === 'user';
          return (
            <div key={i} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
              <span className="text-[10px] font-bold px-1 mb-0.5" style={{ color: BB.textMuted }}>
                {turn.name}
              </span>
              <div
                className="max-w-[90%] rounded-xl px-3 py-2 border flex items-start gap-2.5"
                style={{
                  background: isUser ? BB.surfaceSubtle : BB.inputBg,
                  borderColor: isUser ? 'rgba(51, 115, 176, 0.35)' : BB.border,
                }}
              >
                <div>
                  <div className="font-lang text-xs font-extrabold" style={{ color: BB.textPrimary }}>
                    {turn.text}
                  </div>
                  <div className="text-[10px] font-semibold mt-0.5" style={{ color: BB.textSecondary }}>
                    {turn.en}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => void speakPhrase(turn.text, 'es-ES')}
                  aria-label="Play dialogue line"
                  className="p-1 rounded-lg border-0 bg-transparent cursor-pointer shrink-0 hover:bg-white/70"
                  style={{ color: BB.accent }}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Reply Options */}
      {!replied ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {DIALOGUE_CHOICES.map((c) => (
            <button
              key={c.user}
              type="button"
              onClick={() => pickChoice(c)}
              className="text-left p-2.5 rounded-xl border cursor-pointer transition-all hover:border-[#3373b0]/50"
              style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}
            >
              <div className="font-lang text-xs font-extrabold" style={{ color: BB.accent }}>
                {c.user}
              </div>
              <div className="text-[10px] font-semibold mt-0.5" style={{ color: BB.textSecondary }}>
                {c.userEn}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div
          className="rounded-xl border px-3 py-2 flex items-center justify-between gap-2 text-[11px] font-bold"
          style={{ background: BB.correctSoft, borderColor: 'rgba(45, 138, 91, 0.28)', color: BB.correct }}
        >
          <span>Turn completed! Scenario progress synced cleanly.</span>
          <button
            type="button"
            onClick={() => {
              setTurns(INITIAL_TURNS);
              setReplied(false);
            }}
            className="px-2.5 py-1 rounded-lg border-0 text-[10px] font-bold cursor-pointer"
            style={{ background: BB.surface, color: BB.textPrimary }}
          >
            Replay
          </button>
        </div>
      )}
    </div>
  );
}

/* ── 6. MINI GAMES PANEL ──────────────────────────────────── */

const EXISTING_GAME_MODES = [
  { id: 'matching', name: 'Matching Pairs', badge: 'Live Below', color: '#2d8a5b', bg: '#e8f7ef' },
  { id: 'flashcards', name: 'Mini Flashcards', badge: '3D + Voice', color: '#3373b0', bg: '#e7f1fb' },
  { id: 'sentence', name: 'Sentence Fill', badge: 'Context', color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.12)' },
  { id: 'dialogue', name: 'Dialogue Reply', badge: 'Roleplay', color: '#c4760a', bg: '#fef4e2' },
];

const MINI_PAIRS = [
  { id: 'p1', left: 'Mañana', right: 'Morning' },
  { id: 'p2', left: 'Tranquilo', right: 'Calm' },
  { id: 'p3', left: 'Biblioteca', right: 'Library' },
];

const RIGHT_ORDER = [MINI_PAIRS[1], MINI_PAIRS[2], MINI_PAIRS[0]];

export function MiniGamesPreview({ onEarnXp }: { onEarnXp: (xp: number) => void }) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);

  const pickLeft = (id: string, word: string) => {
    if (matched.includes(id)) return;
    playSoftChime('tap');
    void speakPhrase(word, 'es-ES');
    setSelectedLeft(id);
  };

  const pickRight = (id: string) => {
    if (matched.includes(id) || !selectedLeft) return;
    if (selectedLeft === id) {
      playSoftChime('success');
      onEarnXp(10);
      setMatched((m) => [...m, id]);
      setStreak((s) => s + 1);
    } else {
      playSoftChime('gentle');
      setStreak(0);
    }
    setSelectedLeft(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-xl border flex items-center justify-center shrink-0"
            style={{ background: BB.surface, borderColor: BB.border, color: BB.accent }}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold m-0" style={{ color: BB.textPrimary }}>
              Mini Games Arena
            </h3>
            <p className="text-[11px] font-semibold m-0" style={{ color: BB.textMuted }}>
              Built from your Saved Words, Flashcard Decks & Mistakes
            </p>
          </div>
        </div>

        <span
          className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-1 rounded-full border"
          style={{ background: BB.amberSoft, borderColor: 'rgba(196, 118, 10, 0.25)', color: BB.amber }}
        >
          <Flame className="w-3 h-3" />
          <span>{streak}x Streak</span>
        </span>
      </div>

      {/* Existing Game Modes Badges Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {EXISTING_GAME_MODES.map((g) => (
          <div
            key={g.id}
            className="rounded-xl border px-2.5 py-1.5"
            style={{ background: BB.surface, borderColor: BB.border }}
          >
            <div className="text-[11px] font-extrabold truncate" style={{ color: BB.textPrimary }}>
              {g.name}
            </div>
            <span
              className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded mt-0.5"
              style={{ background: g.bg, color: g.color }}
            >
              {g.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Playable Matching Pairs Sprint Board */}
      <div
        className="rounded-2xl border p-3 space-y-2.5"
        style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}
      >
        <div className="flex items-center justify-between text-[11px] font-bold" style={{ color: BB.textSecondary }}>
          <span>Matching Pairs Sprint: Tap Spanish → English</span>
          <button
            type="button"
            onClick={() => {
              setMatched([]);
              setSelectedLeft(null);
              setStreak(0);
            }}
            className="text-[10px] font-bold border-0 bg-transparent cursor-pointer underline"
            style={{ color: BB.accent }}
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            {MINI_PAIRS.map((p) => {
              const done = matched.includes(p.id);
              const active = selectedLeft === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  disabled={done}
                  onClick={() => pickLeft(p.id, p.left)}
                  className="w-full py-2 px-3 rounded-xl border font-lang text-xs font-bold cursor-pointer disabled:opacity-45"
                  style={{
                    background: done ? BB.correctSoft : active ? BB.accentSoft : BB.inputBg,
                    borderColor: done ? BB.correct : active ? BB.accent : BB.border,
                    color: done ? BB.correct : active ? BB.accent : BB.textPrimary,
                  }}
                >
                  {p.left}
                </button>
              );
            })}
          </div>

          <div className="space-y-1.5">
            {RIGHT_ORDER.map((p) => {
              const done = matched.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  disabled={done}
                  onClick={() => pickRight(p.id)}
                  className="w-full py-2 px-3 rounded-xl border text-xs font-bold cursor-pointer disabled:opacity-45"
                  style={{
                    background: done ? BB.correctSoft : BB.surface,
                    borderColor: done ? BB.correct : BB.borderStrong,
                    color: done ? BB.correct : BB.textSecondary,
                  }}
                >
                  {p.right}
                </button>
              );
            })}
          </div>
        </div>

        {matched.length === MINI_PAIRS.length && (
          <div className="text-[11px] font-extrabold flex items-center gap-1.5" style={{ color: BB.correct }}>
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Sprint complete! +{MINI_PAIRS.length * 10} XP earned in preview.</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── 7. GRAMMAR PANEL ─────────────────────────────────────── */

const GRAMMAR_TOPICS = [
  {
    id: 'ser-estar',
    title: 'Ser vs. Estar',
    rule: 'Use "estar" for temporary states, mood, temperature, or location; use "ser" for permanent identity.',
    example: 'El café está caliente hoy.',
    langCode: 'es-ES',
    question: 'El café ____ caliente hoy.',
    options: ['es', 'está', 'son'],
    answer: 'está',
    why: 'Temperature and current condition use "estar" (está).',
  },
  {
    id: 'wa-ga',
    title: 'Particles は vs. が',
    rule: 'は (wa) introduces the topic of discussion; が (ga) spotlights new grammatical subjects.',
    example: '漢字は少しずつ練習しましょう。',
    langCode: 'ja-JP',
    question: '日本語 ____ 大好きです！',
    options: ['を', 'が', 'に'],
    answer: 'が',
    why: 'Adjectives of preference like 大好き take が to mark what is liked.',
  },
];

export function GrammarPreview({ onEarnXp }: { onEarnXp: (xp: number) => void }) {
  const [topicIdx, setTopicIdx] = useState(0);
  const [chosenOpt, setChosenOpt] = useState<string | null>(null);

  const topic = GRAMMAR_TOPICS[topicIdx];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-xl border flex items-center justify-center shrink-0"
            style={{ background: BB.surface, borderColor: BB.border, color: BB.accent }}
          >
            <PenTool className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold m-0" style={{ color: BB.textPrimary }}>
              Grammar Syllabus & Drills
            </h3>
            <p className="text-[11px] font-semibold m-0" style={{ color: BB.textMuted }}>
              Structured topics, usage examples & instant checks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {GRAMMAR_TOPICS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTopicIdx(i);
                setChosenOpt(null);
              }}
              className="px-2.5 py-1 rounded-lg border text-[10px] font-bold cursor-pointer"
              style={{
                background: topicIdx === i ? BB.accent : BB.surface,
                borderColor: topicIdx === i ? BB.accentEdge : BB.border,
                color: topicIdx === i ? '#ffffff' : BB.textSecondary,
              }}
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>

      {/* Rule Card */}
      <div
        className="rounded-2xl border p-3.5 space-y-2"
        style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}
      >
        <div className="text-xs font-extrabold" style={{ color: BB.accent }}>
          {topic.title}
        </div>
        <p className="text-xs font-semibold m-0 leading-relaxed" style={{ color: BB.textSecondary }}>
          {topic.rule}
        </p>

        <div
          className="rounded-xl border px-3 py-2 flex items-center justify-between gap-2"
          style={{ background: BB.inputBg, borderColor: BB.border }}
        >
          <span className="font-lang text-xs font-extrabold" style={{ color: BB.textPrimary }}>
            {topic.example}
          </span>
          <button
            type="button"
            onClick={() => void speakPhrase(topic.example, topic.langCode)}
            aria-label="Hear grammar example"
            className="p-1 rounded-lg border-0 bg-transparent cursor-pointer"
            style={{ color: BB.accent }}
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Practice Question */}
      <div
        className="rounded-2xl border p-3.5 space-y-2.5"
        style={{ background: BB.surface, borderColor: BB.border }}
      >
        <div className="text-xs font-extrabold" style={{ color: BB.textPrimary }}>
          Practice: {topic.question}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {topic.options.map((opt) => {
            const active = chosenOpt === opt;
            const correct = opt === topic.answer;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setChosenOpt(opt);
                  if (correct) {
                    playSoftChime('success');
                    onEarnXp(10);
                  } else {
                    playSoftChime('gentle');
                  }
                }}
                className="py-2 px-3 rounded-xl border font-lang text-xs font-extrabold cursor-pointer"
                style={{
                  background: active ? (correct ? BB.correctSoft : BB.amberSoft) : BB.inputBg,
                  borderColor: active ? (correct ? BB.correct : BB.amber) : BB.border,
                  color: active ? (correct ? BB.correct : BB.amber) : BB.textPrimary,
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {chosenOpt && (
          <div className="text-[11px] font-bold" style={{ color: chosenOpt === topic.answer ? BB.correct : BB.amber }}>
            {topic.why}
          </div>
        )}
      </div>
    </div>
  );
}

