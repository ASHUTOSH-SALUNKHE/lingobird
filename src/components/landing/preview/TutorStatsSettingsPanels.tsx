'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Bot,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  BarChart3,
  Trophy,
  Flame,
  TrendingUp,
  Clock,
  Settings,
  Cpu,
  Globe,
  Headphones,
  Check,
} from 'lucide-react';
import { speakPhrase, playSoftChime } from '@/lib/speechDemo';
import { BB } from './previewData';

/* ── 8. AI TUTOR PANEL ────────────────────────────────────── */

const TUTOR_WAVE_HEIGHTS = [10, 18, 26, 16, 28, 22, 30, 14, 24, 18, 12];

const INITIAL_TUTOR_CHAT = [
  {
    role: 'tutor' as const,
    text: '¡Hola! Soy LingoBird. ¿Qué te gustaría ordenar en el café hoy?',
    en: 'Hi! I am LingoBird. What would you like to order at the café today?',
  },
  {
    role: 'user' as const,
    text: 'Me gustaría un café tranquilo, por favor.',
    en: 'I would like a calm coffee, please.',
  },
];

export function AiTutorPreview({ onEarnXp }: { onEarnXp: (xp: number) => void }) {
  const [micActive, setMicActive] = useState(true);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [modelMode, setModelMode] = useState<'gemini' | 'ollama'>('gemini');
  const [messages, setMessages] = useState(INITIAL_TUTOR_CHAT);

  const handleToggleMic = () => {
    playSoftChime('tap');
    setMicActive((m) => !m);
  };

  const handleSendSample = () => {
    playSoftChime('success');
    onEarnXp(15);
    const replyText = '¡Excelente pronunciación! ¿Prefieres leche de avena o normal?';
    setMessages((prev) => [
      ...prev.slice(0, 2),
      {
        role: 'tutor' as const,
        text: replyText,
        en: 'Great pronunciation! Do you prefer oat milk or regular?',
      },
    ]);
    if (!voiceMuted) {
      void speakPhrase(replyText, 'es-ES');
    }
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl border flex items-center justify-center shrink-0"
            style={{ background: BB.purpleSoft, borderColor: 'rgba(124, 58, 237, 0.35)', color: BB.purple }}
          >
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-extrabold m-0" style={{ color: BB.textPrimary }}>
                AI Voice Tutor
              </h3>
              <span
                className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full border"
                style={{ background: BB.purpleSoft, color: BB.purple, borderColor: 'rgba(124, 58, 237, 0.25)' }}
              >
                Whisper Base
              </span>
            </div>
            <p className="text-[11px] font-semibold m-0" style={{ color: BB.textMuted }}>
              Real-time voice chat with synchronized Piper speech
            </p>
          </div>
        </div>

        {/* Cloud / Local Ollama Switcher */}
        <button
          type="button"
          onClick={() => setModelMode((m) => (m === 'gemini' ? 'ollama' : 'gemini'))}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] font-bold cursor-pointer"
          style={{ background: BB.surface, borderColor: BB.border, color: BB.textPrimary }}
          title="Switch between Google Gemini and Local Ollama"
        >
          <Cpu className="w-3 h-3" style={{ color: BB.purple }} />
          <span>{modelMode === 'gemini' ? 'Gemini 2.5 Flash' : 'Local Ollama'}</span>
        </button>
      </div>

      {/* Chat Messages Container */}
      <div
        className="rounded-2xl border p-3 space-y-2 max-h-[170px] overflow-y-auto"
        style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}
      >
        {messages.map((msg, i) => {
          const isUser = msg.role === 'user';
          return (
            <div key={i} className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <Image
                  src="/images/tutor-bird.png"
                  alt="AI Tutor mascot"
                  width={26}
                  height={26}
                  className="rounded-lg border object-contain shrink-0 mt-0.5"
                  style={{ background: BB.surfaceSubtle, borderColor: BB.border }}
                />
              )}
              <div
                className="max-w-[85%] rounded-xl px-3 py-2 border"
                style={{
                  background: isUser ? BB.surfaceSubtle : BB.inputBg,
                  borderColor: isUser ? 'rgba(51, 115, 176, 0.28)' : BB.border,
                }}
              >
                <div className="font-lang text-xs font-extrabold" style={{ color: BB.textPrimary }}>
                  {msg.text}
                </div>
                <div className="text-[10px] font-semibold mt-0.5" style={{ color: BB.textSecondary }}>
                  {msg.en}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Voice Controls + Waveform Deck */}
      <div
        className="rounded-2xl border p-3 flex flex-wrap items-center justify-between gap-3"
        style={{
          background: micActive
            ? 'linear-gradient(120deg, rgba(124, 58, 237, 0.10) 0%, #ffffff 55%, #e7f1fb 100%)'
            : BB.surface,
          borderColor: micActive ? 'rgba(124, 58, 237, 0.35)' : BB.border,
          boxShadow: BB.cardShadow,
        }}
      >
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleToggleMic}
            aria-pressed={micActive}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border-0 text-[11px] font-extrabold text-white cursor-pointer transition-transform active:scale-95"
            style={{
              background: micActive ? BB.purple : '#64748b',
              boxShadow: micActive ? '0 3px 12px rgba(124, 58, 237, 0.30)' : 'none',
            }}
          >
            {micActive ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            <span>{micActive ? 'Mic Listening' : 'Mic Paused'}</span>
          </button>

          {/* Animated Audio Waveform */}
          <div className="flex items-center gap-1 h-7 px-1" aria-hidden="true">
            {TUTOR_WAVE_HEIGHTS.map((h, i) => (
              <span
                key={i}
                className={micActive ? 'animate-wave-bar w-1 rounded-full' : 'w-1 rounded-full transition-all'}
                style={{
                  height: micActive ? `${h}px` : '6px',
                  background: micActive
                    ? 'linear-gradient(180deg, #8b5cf6 0%, #3373b0 100%)'
                    : '#9db4cc',
                  animationDelay: `${i * 0.09}s`,
                  opacity: micActive ? 0.92 : 0.45,
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setVoiceMuted((m) => !m)}
            aria-label={voiceMuted ? 'Unmute tutor voice' : 'Mute tutor voice'}
            className="p-2 rounded-xl border cursor-pointer"
            style={{ background: BB.inputBg, borderColor: BB.border, color: voiceMuted ? BB.amber : BB.accent }}
          >
            {voiceMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={handleSendSample}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border-0 text-[11px] font-extrabold text-white cursor-pointer"
            style={{ background: BB.accent }}
          >
            <Send className="w-3 h-3" />
            <span>Practice Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 9. ANALYTICS PANEL ───────────────────────────────────── */

const WEEKLY_DATA = [
  { day: 'Mon', words: 12 },
  { day: 'Tue', words: 18 },
  { day: 'Wed', words: 14 },
  { day: 'Thu', words: 24 },
  { day: 'Fri', words: 20 },
  { day: 'Sat', words: 16 },
  { day: 'Sun', words: 22 },
];

const ACTIVITY_FEED = [
  { title: 'Flashcards · Japanese Core Essentials', meta: '14 cards · 93% accuracy', time: 'Today' },
  { title: 'Writing Atelier · Morning Coffee', meta: '100% sentence match', time: 'Yesterday' },
  { title: 'AI Voice Tutor · Ordering at a Café', meta: '6 mins · Piper Voice', time: '2d ago' },
];

export function AnalyticsPreview() {
  const [range, setRange] = useState<'7d' | '30d'>('7d');
  const maxVal = range === '7d' ? 28 : 40;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-xl border flex items-center justify-center shrink-0"
            style={{ background: BB.surface, borderColor: BB.border, color: BB.accent }}
          >
            <BarChart3 className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold m-0" style={{ color: BB.textPrimary }}>
              Learning Analytics
            </h3>
            <p className="text-[11px] font-semibold m-0" style={{ color: BB.textMuted }}>
              Local progress stored securely inside Windows SQLite
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {(['7d', '30d'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className="px-2.5 py-1 rounded-lg border text-[10px] font-bold cursor-pointer uppercase"
              style={{
                background: range === r ? BB.accent : BB.surface,
                borderColor: range === r ? BB.accentEdge : BB.border,
                color: range === r ? '#ffffff' : BB.textSecondary,
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border p-2.5" style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}>
          <div className="flex items-center gap-1 text-[10px] font-bold" style={{ color: BB.textMuted }}>
            <TrendingUp className="w-3 h-3" style={{ color: BB.accent }} />
            <span>Words Grown</span>
          </div>
          <div className="text-base font-extrabold mt-0.5" style={{ color: BB.textPrimary }}>
            {range === '7d' ? '+64' : '+248'}
          </div>
        </div>

        <div className="rounded-xl border p-2.5" style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}>
          <div className="flex items-center gap-1 text-[10px] font-bold" style={{ color: BB.correct }}>
            <Trophy className="w-3 h-3" />
            <span>Accuracy</span>
          </div>
          <div className="text-base font-extrabold mt-0.5" style={{ color: BB.correct }}>
            {range === '7d' ? '91%' : '89%'}
          </div>
        </div>

        <div className="rounded-xl border p-2.5" style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}>
          <div className="flex items-center gap-1 text-[10px] font-bold" style={{ color: BB.amber }}>
            <Flame className="w-3 h-3" />
            <span>Streak</span>
          </div>
          <div className="text-base font-extrabold mt-0.5" style={{ color: BB.amber }}>
            7 Days
          </div>
        </div>
      </div>

      {/* Vocabulary Growth Bar Chart */}
      <div
        className="rounded-2xl border p-3 space-y-2"
        style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}
      >
        <div className="flex items-center justify-between text-[11px] font-extrabold" style={{ color: BB.textPrimary }}>
          <span>Vocabulary Growth ({range === '7d' ? 'Past 7 Days' : '4-Week Pace'})</span>
          <span className="text-[10px] font-semibold" style={{ color: BB.textMuted }}>
            Cards / Day
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 items-end h-[88px] pt-2">
          {WEEKLY_DATA.map((item) => {
            const val = range === '7d' ? item.words : Math.round(item.words * 1.4);
            const pct = Math.min(100, Math.round((val / maxVal) * 100));
            return (
              <div key={item.day} className="flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full max-w-[26px] rounded-t-md flex-1 flex items-end" style={{ background: BB.inputBg }}>
                  <div
                    className="w-full rounded-t-md transition-all duration-300"
                    style={{
                      height: `${pct}%`,
                      background: 'linear-gradient(180deg, #3373b0 0%, #38a169 100%)',
                    }}
                    title={`${item.day}: ${val} cards`}
                  />
                </div>
                <span className="text-[9px] font-bold" style={{ color: BB.textMuted }}>
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity History */}
      <div
        className="rounded-2xl border p-2.5 space-y-1.5"
        style={{ background: BB.surface, borderColor: BB.border }}
      >
        {ACTIVITY_FEED.map((row) => (
          <div
            key={row.title}
            className="flex items-center justify-between gap-2 px-2 py-1 rounded-lg"
            style={{ background: BB.inputBg }}
          >
            <div className="min-w-0">
              <div className="text-[11px] font-extrabold truncate" style={{ color: BB.textPrimary }}>
                {row.title}
              </div>
              <div className="text-[10px] font-semibold truncate" style={{ color: BB.textSecondary }}>
                {row.meta}
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold shrink-0" style={{ color: BB.textMuted }}>
              <Clock className="w-2.5 h-2.5" />
              <span>{row.time}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 10. SETTINGS PANEL ───────────────────────────────────── */

const VOICE_OPTIONS = [
  { id: 'es', label: 'Sharvard (Spanish F)', phrase: 'Buenos días, practicamos con calma.', langCode: 'es-ES' },
  { id: 'fr', label: 'Siwis (French F)', phrase: 'Bonjour ! La pratique est agréable.', langCode: 'fr-FR' },
  { id: 'ja', label: 'Captain (Japanese)', phrase: '毎日少しずつ練習しましょう。', langCode: 'ja-JP' },
];

export function SettingsPreview() {
  const [targetLang, setTargetLang] = useState('Japanese');
  const [voiceIdx, setVoiceIdx] = useState(0);
  const [sttEngine, setSttEngine] = useState<'tiny' | 'base'>('base');
  const [showStartupGuide, setShowStartupGuide] = useState(true);
  const [testedVoice, setTestedVoice] = useState(false);

  const selectedVoice = VOICE_OPTIONS[voiceIdx];

  const handleTestVoice = async () => {
    setTestedVoice(true);
    await speakPhrase(selectedVoice.phrase, selectedVoice.langCode);
    setTimeout(() => setTestedVoice(false), 1400);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-xl border flex items-center justify-center shrink-0"
            style={{ background: BB.surface, borderColor: BB.border, color: BB.accent }}
          >
            <Settings className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold m-0" style={{ color: BB.textPrimary }}>
              Application Settings
            </h3>
            <p className="text-[11px] font-semibold m-0" style={{ color: BB.textMuted }}>
              Offline voices, Whisper STT, AI models & preferences
            </p>
          </div>
        </div>

        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded-full border"
          style={{ background: BB.correctSoft, borderColor: 'rgba(45, 138, 91, 0.25)', color: BB.correct }}
        >
          100% Local Data
        </span>
      </div>

      {/* Settings List */}
      <div className="space-y-2">
        {/* Language Preference */}
        <div
          className="rounded-2xl border p-3 flex flex-wrap items-center justify-between gap-2"
          style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 shrink-0" style={{ color: BB.accent }} />
            <div>
              <div className="text-xs font-extrabold" style={{ color: BB.textPrimary }}>
                Default Learning Language
              </div>
              <div className="text-[10px] font-semibold" style={{ color: BB.textMuted }}>
                Used across Overview, Decks & Daily Goals
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {['Japanese', 'Spanish', 'French'].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setTargetLang(lang)}
                className="px-2.5 py-1 rounded-lg border text-[10px] font-bold cursor-pointer"
                style={{
                  background: targetLang === lang ? BB.accent : BB.inputBg,
                  borderColor: targetLang === lang ? BB.accentEdge : BB.border,
                  color: targetLang === lang ? '#ffffff' : BB.textSecondary,
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Piper Offline Voice */}
        <div
          className="rounded-2xl border p-3 flex flex-wrap items-center justify-between gap-2"
          style={{ background: BB.surface, borderColor: BB.border, boxShadow: BB.cardShadow }}
        >
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 shrink-0" style={{ color: BB.accent }} />
            <div>
              <div className="text-xs font-extrabold" style={{ color: BB.textPrimary }}>
                Piper Neural TTS Voice
              </div>
              <div className="text-[10px] font-semibold" style={{ color: BB.textMuted }}>
                {selectedVoice.label} · ONNX WebAssembly
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setVoiceIdx((i) => (i + 1) % VOICE_OPTIONS.length)}
              className="px-2.5 py-1 rounded-lg border text-[10px] font-bold cursor-pointer"
              style={{ background: BB.inputBg, borderColor: BB.border, color: BB.textSecondary }}
            >
              Switch Voice
            </button>
            <button
              type="button"
              onClick={handleTestVoice}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border-0 text-[10px] font-bold text-white cursor-pointer"
              style={{ background: BB.accent }}
            >
              {testedVoice ? <Check className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              <span>{testedVoice ? 'Speaking' : 'Test'}</span>
            </button>
          </div>
        </div>

        {/* Offline Whisper STT & Guide Toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div
            className="rounded-2xl border p-3 flex items-center justify-between gap-2"
            style={{ background: BB.surface, borderColor: BB.border }}
          >
            <div>
              <div className="text-xs font-extrabold" style={{ color: BB.textPrimary }}>
                Whisper Offline STT
              </div>
              <div className="text-[10px] font-semibold" style={{ color: BB.textMuted }}>
                {sttEngine === 'base' ? 'Whisper Base (~73 MB)' : 'Whisper Tiny (~39 MB)'}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSttEngine((s) => (s === 'base' ? 'tiny' : 'base'))}
              className="px-2.5 py-1 rounded-lg border text-[10px] font-bold cursor-pointer"
              style={{ background: BB.surfaceSubtle, borderColor: BB.border, color: BB.accent }}
            >
              {sttEngine === 'base' ? 'Base' : 'Tiny'}
            </button>
          </div>

          <div
            className="rounded-2xl border p-3 flex items-center justify-between gap-2"
            style={{ background: BB.surface, borderColor: BB.border }}
          >
            <div>
              <div className="text-xs font-extrabold" style={{ color: BB.textPrimary }}>
                Startup Guide
              </div>
              <div className="text-[10px] font-semibold" style={{ color: BB.textMuted }}>
                Show walkthrough on launch
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={showStartupGuide}
              onClick={() => setShowStartupGuide((g) => !g)}
              className="w-10 h-5 rounded-full border-0 p-0.5 cursor-pointer transition-colors flex items-center"
              style={{
                background: showStartupGuide ? BB.correct : '#b7cadc',
                justifyContent: showStartupGuide ? 'flex-end' : 'flex-start',
              }}
              aria-label="Toggle startup guide visibility"
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

