import type { Metadata } from 'next';
import Link from 'next/link';
import { Volume2, Mic, Cpu, Languages, ShieldCheck, ArrowRight } from 'lucide-react';
import {
  AI_MODEL_OPTIONS,
  OPUS_TRANSLATION_PACKS,
  PIPER_VOICE_LANGUAGES,
  STT_OPTIONS,
} from '@/data/lingobirdData';
import { getMediaAvailability } from '@/lib/mediaServer';
import { SCREENSHOT_SLOTS } from '@/lib/mediaRegistry';
import { MediaSlot } from '@/components/MediaSlot';
import { VideoShowcase } from '@/components/VideoShowcase';

export const metadata: Metadata = {
  title: 'AI Language Engine — Offline Piper Neural Voices, Whisper STT, Ollama & Gemma | LingoBird',
  description:
    'Discover LingoBird’s hybrid neural engine: 20 offline Piper TTS voices across 10 languages, Whisper WebAssembly speech-to-text, 12 OPUS-MT offline translators, Google Gemma 4 API, and 100% local Ollama LLMs.',
  keywords: [
    'offline language learning AI',
    'Piper TTS voices language learning',
    'Whisper speech recognition offline',
    'Ollama language tutor Windows',
    'Gemma language practice app',
    'local AI language tutor',
    'private voice tutor app',
    'OPUS-MT offline translation',
    'AI voice tutor desktop',
    'real time language conversation AI',
  ],
  alternates: {
    canonical: '/ai-engine',
  },
  openGraph: {
    title: 'Offline Neural Voices & Local AI Engine — LingoBird',
    description:
      'Zero subscription lock-in. Real-time neural conversation via Piper, Whisper STT, and Local Ollama.',
    url: '/ai-engine',
  },
};

export default function AIEnginePage() {
  const availability = getMediaAvailability();

  return (
    <main className="pt-28 sm:pt-32">
      {/* Header */}
      <section className="px-5 sm:px-6 pb-14 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="calm-tag">Hybrid Offline + Cloud Architecture</span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl leading-tight" style={{ color: 'var(--text-primary)' }}>
            Neural Speech &amp; AI <span className="calm-gradient-text">On Your Terms</span>
          </h1>
          <p className="text-base sm:text-lg leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
            LingoBird runs neural voices, microphone transcription, and translation models directly inside Windows via WebAssembly &amp; ONNX — and optionally pairs with free Gemini/Gemma API or Local Ollama.
          </p>
        </div>
      </section>

      {/* AI Tutor Video Showcase */}
      <section className="px-5 sm:px-6 py-12" style={{ background: 'var(--bg-sky)' }}>
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-display font-semibold text-2xl sm:text-3xl" style={{ color: 'var(--text-primary)' }}>
              AI Tutor &amp; Speech Pipeline in Action
            </h2>
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Drop your AI Tutor screen recordings into <code className="font-mono-code">public/videos/</code> to feature them automatically here.
            </p>
          </div>
          <VideoShowcase availability={availability} />
        </div>
      </section>

      {/* Cloud & Local AI Models */}
      <section className="px-5 sm:px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="calm-tag">
                <Cpu className="w-3.5 h-3.5" />
                AI Tutor &amp; Grading Models
              </span>
              <h2 className="font-display font-semibold text-3xl" style={{ color: 'var(--text-primary)' }}>
                Free Google AI Studio or 100% Local Ollama
              </h2>
            </div>
            <Link href="/how-to-use" className="text-sm font-extrabold no-underline hover:underline inline-flex items-center gap-1" style={{ color: 'var(--accent)' }}>
              <span>View setup walkthrough</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {AI_MODEL_OPTIONS.map((model) => (
              <div key={model.name} className="calm-card p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                    {model.provider}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: 'var(--mint-soft)', color: 'var(--mint)' }}>
                    {model.badge}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-xl m-0" style={{ color: 'var(--text-primary)' }}>
                  {model.name}
                </h3>
                <div className="text-xs font-mono-code px-3 py-1.5 rounded-xl border inline-block" style={{ background: 'var(--bg-input)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                  {model.identifier}
                </div>
                <p className="text-sm leading-relaxed font-medium m-0" style={{ color: 'var(--text-secondary)' }}>
                  {model.highlight}
                </p>
              </div>
            ))}
          </div>

          <MediaSlot slot={SCREENSHOT_SLOTS.settingsOfflineAi} availability={availability} />
        </div>
      </section>

      {/* Offline Piper Voices & Whisper STT */}
      <section className="px-5 sm:px-6 py-16" style={{ background: 'var(--bg-sky)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Piper Neural Voices */}
          <div className="lg:col-span-7 calm-card p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-xl m-0" style={{ color: 'var(--text-primary)' }}>
                  20 Offline Piper Neural Voices
                </h2>
                <p className="text-xs font-semibold m-0" style={{ color: 'var(--text-muted)' }}>
                  Female &amp; Male ONNX voices across 10 languages (+ Japanese OpenJTalk) cached locally
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PIPER_VOICE_LANGUAGES.map((v) => (
                <div
                  key={v.language}
                  className="rounded-xl border px-3.5 py-2.5 flex items-center justify-between gap-2"
                  style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)' }}
                >
                  <div>
                    <div className="text-xs font-extrabold" style={{ color: 'var(--text-primary)' }}>
                      {v.flag} {v.language}
                    </div>
                    <div className="text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                      {v.voices}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono-code font-semibold shrink-0" style={{ color: 'var(--accent)' }}>
                    {v.sizeRange}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Whisper STT + OPUS-MT Summary */}
          <div className="lg:col-span-5 space-y-5">
            <div className="calm-card p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--violet-soft)', color: 'var(--violet)' }}>
                  <Mic className="w-4 h-4" />
                </div>
                <h2 className="font-display font-semibold text-xl m-0" style={{ color: 'var(--text-primary)' }}>
                  Speech-to-Text (STT)
                </h2>
              </div>

              <div className="space-y-3">
                {STT_OPTIONS.map((stt) => (
                  <div key={stt.name} className="rounded-xl border p-3.5 space-y-1" style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)' }}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold" style={{ color: 'var(--text-primary)' }}>
                        {stt.name}
                      </span>
                      <span className="text-[10px] font-mono-code font-bold" style={{ color: 'var(--violet)' }}>
                        {stt.size}
                      </span>
                    </div>
                    <p className="text-xs font-medium m-0" style={{ color: 'var(--text-secondary)' }}>
                      {stt.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="calm-card p-6 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--mint-soft)', color: 'var(--mint)' }}>
                  <Languages className="w-4 h-4" />
                </div>
                <h2 className="font-display font-semibold text-xl m-0" style={{ color: 'var(--text-primary)' }}>
                  Offline OPUS-MT Translators
                </h2>
              </div>
              <p className="text-xs font-medium m-0" style={{ color: 'var(--text-secondary)' }}>
                12 quantized neural pairs (~31–39 MB each) run offline via Transformers.js inside the Overview Translator and study views.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {OPUS_TRANSLATION_PACKS.map((p) => (
                  <span
                    key={p.id}
                    className="px-2.5 py-1 rounded-full border text-[11px] font-bold"
                    style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  >
                    {p.flag} {p.pair}
                  </span>
                ))}
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-xs font-bold" style={{ color: 'var(--mint)' }}>
                <ShieldCheck className="w-4 h-4" />
                <span>Audio captured during mic exercises stays in volatile RAM.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

