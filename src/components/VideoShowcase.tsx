'use client';

import { Volume2, Mic, Cpu, ExternalLink, Maximize2, X, CheckCircle2 } from 'lucide-react';
import type { MediaAvailability } from '@/lib/mediaRegistry';
import {
  YOUTUBE_DEMO_URL,
  YOUTUBE_DEMO_EMBED,
  YOUTUBE_DEMO_TITLE,
  YOUTUBE_CHANNEL_URL,
} from '@/data/lingobirdData';

interface VideoShowcaseProps {
  availability?: MediaAvailability;
  onClose?: () => void;
  onOpenModal?: () => void;
}

const VIDEO_HIGHLIGHTS = [
  {
    icon: Volume2,
    accent: 'var(--mint)',
    accentBg: 'var(--mint-soft)',
    title: 'Synchronized Voice Streaming',
    detail:
      'Piper neural voices read replies with live word-by-word streaming, phonetic subtitles, and 0.8×/1.0× playback speed toggles.',
  },
  {
    icon: Mic,
    accent: 'var(--accent)',
    accentBg: 'var(--accent-soft)',
    title: 'Whisper Speech-to-Text',
    detail:
      'Transcribe your spoken pronunciation on-device with zero cloud lag, or tap any unfamiliar tutor word for instant translation and flashcard capture.',
  },
  {
    icon: Cpu,
    accent: 'var(--violet)',
    accentBg: 'var(--violet-soft)',
    title: 'Gemma 4 26B & Local Ollama',
    detail:
      'Connect Google AI Studio (14,400 free daily queries) or run Ollama models 100% offline for private, unlimited voice tutoring.',
  },
];

export function VideoShowcase({ onClose, onOpenModal }: VideoShowcaseProps) {
  return (
    <div className="space-y-6">
      {/* Video Stage Card */}
      <div className="calm-card p-3 sm:p-5 overflow-hidden">
        <div className="space-y-4">
          {/* Top Bar with YouTube badge and action buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
            <div className="flex items-center gap-3">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold"
                style={{ background: 'rgba(255, 0, 51, 0.12)', color: '#d9222a' }}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span>Official Walkthrough</span>
              </span>
              <h3 className="font-display font-semibold text-base sm:text-lg m-0" style={{ color: 'var(--text-primary)' }}>
                {YOUTUBE_DEMO_TITLE}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onOpenModal && (
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer"
                  style={{
                    background: 'var(--bg-surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                  title="Expand to Fullscreen Cinema Modal"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Theater View</span>
                </button>
              )}

              <a
                href={YOUTUBE_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all no-underline"
                style={{
                  background: 'var(--bg-surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-secondary)',
                }}
              >
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-7 h-7 rounded-full flex items-center justify-center border transition-all cursor-pointer"
                  style={{
                    background: 'var(--bg-surface-soft)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-muted)',
                  }}
                  aria-label="Close demo video"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* YouTube Responsive 16:9 Iframe */}
          <div
            className="aspect-video w-full rounded-2xl overflow-hidden border bg-black shadow-2xl relative"
            style={{ borderColor: 'var(--border)' }}
          >
            <iframe
              src={`${YOUTUBE_DEMO_EMBED}?autoplay=1&rel=0`}
              title={YOUTUBE_DEMO_TITLE}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          {/* Video Description & Channel attribution */}
          <div className="px-2 pt-1 pb-2">
            <p className="text-sm font-medium leading-relaxed m-0" style={{ color: 'var(--text-secondary)' }}>
              Watch a complete live session: synchronized Piper neural voices stream tutor speech in real-time,
              Whisper local speech recognition transcribes pronunciation with zero cloud lag, and Google Gemma 4 26B
              or local Ollama powers free, private conversational practice.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Core Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {VIDEO_HIGHLIGHTS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-4 rounded-2xl border flex flex-col justify-between"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow-clay)',
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: item.accentBg, color: item.accent }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-display font-semibold text-sm m-0" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs leading-relaxed font-medium m-0" style={{ color: 'var(--text-secondary)' }}>
                  {item.detail}
                </p>
              </div>

              <div className="pt-3 flex items-center gap-1.5 text-[11px] font-bold" style={{ color: item.accent }}>
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Demonstrated in Video</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Channel Strip */}
      <div
        className="p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-medium"
        style={{
          background: 'var(--bg-surface-soft)',
          borderColor: 'var(--border)',
          color: 'var(--text-secondary)',
        }}
      >
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--mint)' }} />
          <span>Subscribe to the official LingoBird channel for new feature walk-throughs &amp; language tips.</span>
        </span>
        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold no-underline hover:underline shrink-0"
          style={{ color: 'var(--accent)' }}
        >
          <span>Visit @lingobird_app</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
