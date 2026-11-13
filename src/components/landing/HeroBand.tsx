'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Home,
  BookOpen,
  Gamepad2,
  Bot,
  Settings,
  ShieldCheck,
  Volume2,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import type { MediaAvailability } from '@/lib/mediaRegistry';
import { MICROSOFT_STORE_URL } from '@/data/lingobirdData';
import { MicrosoftIcon } from './MicrosoftIcon';
import { WaveDivider } from './WaveDivider';

type MockNavTab = 'home' | 'library' | 'practice' | 'tutor' | 'settings';

const MOCK_TABS: {
  id: MockNavTab;
  label: string;
  icon: typeof Home;
  headline: string;
  subline: string;
  goalLabel: string;
  goalValue: string;
  progressPct: number;
}[] = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    headline: 'Bonjour !',
    subline: 'Great job! Stay unhurried today.',
    goalLabel: 'Daily Goal',
    goalValue: '7 / 10 min',
    progressPct: 70,
  },
  {
    id: 'library',
    label: 'Library',
    icon: BookOpen,
    headline: '喫茶店 · Café',
    subline: 'Saved words & 20 offline Piper voices',
    goalLabel: 'Deck Mastery',
    goalValue: '18 / 24 words',
    progressPct: 75,
  },
  {
    id: 'practice',
    label: 'Practice',
    icon: Gamepad2,
    headline: 'FSRS + 9 Games',
    subline: '12 cards ready for calm review',
    goalLabel: 'Focus Streak',
    goalValue: '5 sessions',
    progressPct: 84,
  },
  {
    id: 'tutor',
    label: 'Tutor',
    icon: Bot,
    headline: 'AI Voice Tutor',
    subline: 'Gemini, Gemma 4 or Local Ollama',
    goalLabel: 'Speech Engine',
    goalValue: 'Whisper Base',
    progressPct: 90,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    headline: 'Calm Daylight',
    subline: 'Local SQLite · Drop hero screenshot in /public',
    goalLabel: 'Data Ownership',
    goalValue: '100% Local',
    progressPct: 100,
  },
];

export function HeroBand({ availability }: { availability: MediaAvailability }) {
  const [activeMock, setActiveMock] = useState<MockNavTab>('home');

  const currentTab = MOCK_TABS.find((t) => t.id === activeMock) ?? MOCK_TABS[0];
  const hasHeroScreenshot = Boolean(availability['/screenshots/hero-overview.png']);

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      {/* Full-bleed Atmospheric Book-Flipping Video Background */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/art/hero-horizon.jpg"
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/book_pages_flipping.mp4" type="video/mp4" />
        </video>

        {/* Warm dusk gradient scrim matching reference image for crisp white text contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(96deg, rgba(16, 22, 19, 0.72) 0%, rgba(16, 22, 19, 0.48) 46%, rgba(16, 22, 19, 0.24) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(14, 18, 16, 0.62) 100%)',
          }}
        />
      </div>

      {/* Main Hero Container */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 sm:pt-10 pb-10 sm:pb-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Copy Column — Luminously Styled Over the Video */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <h1
              className="font-display font-medium tracking-tight leading-[1.08]"
              style={{
                fontSize: 'clamp(2.45rem, 5.2vw, 4rem)',
                color: '#ffffff',
                textShadow: '0 3px 22px rgba(0, 0, 0, 0.35)',
              }}
            >
              Learn a language <br className="hidden sm:inline" />
              the way it was <br className="hidden sm:inline" />
              meant to{' '}
              <span
                className="font-script italic font-bold text-[1.24em] inline-block pr-1"
                style={{ color: '#86e3ab', textShadow: '0 2px 16px rgba(0, 0, 0, 0.32)' }}
              >
                feel
              </span>
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed font-medium max-w-md mx-auto lg:mx-0"
              style={{
                color: 'rgba(255, 255, 255, 0.92)',
                textShadow: '0 1px 12px rgba(0, 0, 0, 0.35)',
              }}
            >
              Smart flashcards. Natural conversations. Offline neural voices.
              <br />A calmer, human way to learn on Windows.
            </p>

            {/* Primary CTA Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
              <a
                href={MICROSOFT_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="calm-btn-gold"
              >
                <MicrosoftIcon className="w-4 h-4 shrink-0" />
                <span>Download on Microsoft Store</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#flashcards"
                className="text-sm font-bold px-3 py-2 rounded-full transition-colors no-underline hover:underline"
                style={{ color: '#dff5e7', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
              >
                Try interactive demos ↓
              </a>
            </div>

            {/* Compact Authentic Cohort & Specs Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="flex -space-x-2" aria-hidden="true">
                {[
                  { bg: '#e3f1fa', src: '/images/hero/girl.png' },
                  { bg: '#e2f1e8', src: '/images/hero/boy.png' },
                  { bg: '#fef4e3', src: '/images/hero/woman.png' },
                  { bg: '#f2effd', src: '/images/hero/man.png' },
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="relative w-9 h-9 rounded-full border-2 overflow-hidden pt-1 px-0.5 flex items-end justify-center shadow-sm"
                    style={{ background: item.bg, borderColor: 'rgba(255,255,255,0.9)' }}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      width={36}
                      height={36}
                      className="w-full h-full object-contain object-bottom"
                    />
                  </span>
                ))}
              </div>
              <div className="text-left">
                <div
                  className="text-xs font-extrabold flex items-center gap-1.5"
                  style={{ color: '#ffffff', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
                >
                  <ShieldCheck className="w-3.5 h-3.5" style={{ color: '#86e3ab' }} />
                  <span>10 Languages · 20 Offline Voices</span>
                </div>
                <div
                  className="text-[11px] font-semibold"
                  style={{ color: 'rgba(255, 255, 255, 0.8)', textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
                >
                  Local SQLite Privacy · Free Gemini or Ollama
                </div>
              </div>
            </div>
          </div>

          {/* Right Tilted Windows Desktop Window Mockup (Preserved Exactly as Requested) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div
              className="w-full max-w-[540px] rounded-[22px] border p-2 sm:p-2.5 transition-transform duration-500 lg:rotate-[1.8deg] hover:rotate-0"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border-strong)',
                boxShadow: '0 24px 54px rgba(0, 0, 0, 0.34)',
              }}
            >
              {/* Windows 11 App Chrome Header */}
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                  <Image
                    src="/lingobird-logo.png"
                    alt="LingoBird"
                    width={20}
                    height={20}
                    className="rounded-md"
                  />
                  <span className="font-display font-semibold text-xs sm:text-sm" style={{ color: 'var(--text-primary)' }}>
                    LingoBird
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[11px] font-bold" style={{ color: 'var(--text-muted)' }} aria-hidden="true">
                  <span>—</span>
                  <span>□</span>
                  <span>✕</span>
                </div>
              </div>

              {hasHeroScreenshot ? (
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                  <Image
                    src="/screenshots/hero-overview.png"
                    alt="LingoBird Windows Desktop Application Overview"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div
                  className="grid grid-cols-12 gap-2.5 p-2 sm:p-3 rounded-2xl border overflow-hidden"
                  style={{
                    background: 'var(--bg-surface-soft)',
                    borderColor: 'var(--border)',
                  }}
                >
                  {/* Interactive Mini Sidebar */}
                  <div className="col-span-4 sm:col-span-3 flex flex-col gap-1 pr-1">
                    {MOCK_TABS.map((tab) => {
                      const Icon = tab.icon;
                      const active = tab.id === currentTab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveMock(tab.id)}
                          className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-[11px] font-bold transition-all cursor-pointer border-0 text-left"
                          style={{
                            background: active ? 'var(--accent-soft)' : 'transparent',
                            color: active ? 'var(--accent)' : 'var(--text-secondary)',
                          }}
                        >
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Mini Main Workspace */}
                  <div className="col-span-8 sm:col-span-9 space-y-2.5">
                    {/* Scenic Sky Banner inside App */}
                    <div
                      className="relative rounded-2xl p-4 sm:p-5 overflow-hidden flex items-center justify-between gap-2 min-h-[145px]"
                      style={{
                        background:
                          'linear-gradient(135deg, #d7ecfc 0%, #eaf5fe 52%, #e4f1e6 100%)',
                      }}
                    >
                      <div className="relative z-10 space-y-1 max-w-[65%]">
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                          style={{ background: 'rgba(255,255,255,0.8)', color: '#2774ad' }}
                        >
                          <Volume2 className="w-2.5 h-2.5" />
                          <span>Calm Study</span>
                        </span>
                        <div className="font-display font-semibold text-xl sm:text-2xl leading-tight" style={{ color: '#14283d' }}>
                          {currentTab.headline}
                        </div>
                        <div className="text-xs font-semibold" style={{ color: '#3b5875' }}>
                          {currentTab.subline}
                        </div>
                      </div>

                      <div className="relative z-10 shrink-0 animate-calm-float">
                        <Image
                          src="/images/studious-bird.png"
                          alt="LingoBird bluebird mascot"
                          width={108}
                          height={90}
                          className="object-contain max-h-24 w-auto"
                        />
                      </div>
                    </div>

                    {/* Daily Goal Footer inside Mockup */}
                    <div
                      className="rounded-xl border px-3.5 py-2.5 space-y-1.5"
                      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                    >
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="inline-flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
                          <Sparkles className="w-3 h-3" style={{ color: 'var(--mint)' }} />
                          <span>{currentTab.goalLabel}</span>
                        </span>
                        <span style={{ color: 'var(--text-secondary)' }}>{currentTab.goalValue}</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-input)' }}>
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${currentTab.progressPct}%`,
                            background: 'linear-gradient(90deg, var(--mint), #47b57d)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Minimal Centered Scroll Indicator */}
        <div className="mt-8 sm:mt-10 pt-2 flex items-center justify-center">
          <a
            href="#flashcards"
            aria-label="Scroll to flashcards section"
            className="p-1.5 rounded-full text-white/90 hover:text-white transition-transform hover:translate-y-0.5 no-underline"
          >
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Organic cream curve into Band 2 */}
      <div className="relative z-10 -mb-px">
        <WaveDivider fill="var(--bg-page)" variant={1} />
      </div>
    </section>
  );
}
