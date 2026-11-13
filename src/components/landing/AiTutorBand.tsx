'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play, X, ExternalLink } from 'lucide-react';
import type { MediaAvailability } from '@/lib/mediaRegistry';
import { VideoShowcase } from '@/components/VideoShowcase';
import { WaveDivider } from './WaveDivider';
import {
  YOUTUBE_DEMO_URL,
  YOUTUBE_DEMO_EMBED,
  YOUTUBE_DEMO_TITLE,
} from '@/data/lingobirdData';

const WAVE_HEIGHTS = [16, 28, 42, 62, 34, 78, 52, 92, 46, 86, 68, 98, 56, 74, 38, 60, 26, 40, 20];

export function AiTutorBand({ availability }: { availability: MediaAvailability }) {
  const [showVideos, setShowVideos] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Smoothly scroll to drawer when opened
  useEffect(() => {
    if (showVideos && drawerRef.current) {
      drawerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [showVideos]);

  // Handle ESC key and scroll locking for Cinema Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    if (showModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showModal]);

  return (
    <section id="ai-tutor" className="relative overflow-hidden" style={{ background: 'var(--bg-forest)' }}>
      {/* Atmospheric Listener Photo + Dark Forest Blend */}
      <div className="relative min-h-[380px] sm:min-h-[430px] flex items-center py-12 sm:py-16 px-5 sm:px-8">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <Image
            src="/images/art/tutor-listener.jpg"
            alt="Calm learner listening to LingoBird AI Voice Tutor"
            fill
            className="object-cover object-left opacity-80"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(92deg, rgba(23,38,31,0.18) 0%, rgba(23,38,31,0.68) 48%, rgba(23,38,31,0.94) 76%, var(--bg-forest) 100%)',
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Center Audio Waveform Visual matching Reference */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end pr-0 lg:pr-6 pt-24 lg:pt-0">
            <div className="flex items-center gap-1.5 h-24 px-5 py-3 rounded-full" aria-hidden="true">
              {WAVE_HEIGHTS.map((h, i) => (
                <span
                  key={i}
                  className="animate-wave-bar w-1 rounded-full"
                  style={{
                    height: `${Math.round(h * 0.72)}px`,
                    background: 'linear-gradient(180deg, #e7f6ff 0%, #7ad1ff 50%, #50b6e8 100%)',
                    boxShadow: '0 0 12px rgba(122, 209, 255, 0.45)',
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Dark Atmospheric Copy */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left lg:pl-6">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.14em]" style={{ color: '#9fc5b2' }}>
              AI VOICE TUTOR
            </span>
            <h2
              className="font-display font-medium leading-[1.12] text-white m-0"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)' }}
            >
              Have a Real <br />
              Conversation
            </h2>
            <p className="text-sm sm:text-base leading-relaxed font-medium max-w-md mx-auto lg:mx-0" style={{ color: '#d4e2db' }}>
              Talk with our AI voice tutor in real-time using offline Piper neural voices, Whisper local speech recognition, Google Gemma 4 / Gemini, or 100% local Ollama.
            </p>

            <div className="pt-2 flex flex-wrap justify-center lg:justify-start items-center gap-3">
              <button
                type="button"
                onClick={() => setShowVideos((v) => !v)}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white border cursor-pointer transition-all hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(12px)',
                  borderColor: 'rgba(255,255,255,0.28)',
                }}
              >
                <span className="w-6 h-6 rounded-full bg-white text-[#17261f] flex items-center justify-center">
                  {showVideos ? <X className="w-3.5 h-3.5" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                </span>
                <span>{showVideos ? 'Hide Video Walkthrough' : 'Watch Demo'}</span>
              </button>

              <a
                href={YOUTUBE_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold text-[#d4e2db] hover:text-white border border-white/15 hover:border-white/35 transition-all no-underline"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <svg className="w-3.5 h-3.5 fill-current text-[#ff0033]" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span>YouTube Walkthrough</span>
                <ExternalLink className="w-3 h-3 text-[#9fc5b2]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable AI Tutor YouTube Video Drawer */}
      {showVideos && (
        <div ref={drawerRef} className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pb-12">
          <div className="rounded-3xl p-4 sm:p-6" style={{ background: 'var(--bg-page)' }}>
            <VideoShowcase
              availability={availability}
              onClose={() => setShowVideos(false)}
              onOpenModal={() => setShowModal(true)}
            />
          </div>
        </div>
      )}

      {/* Fullscreen Cinema Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="AI Tutor Video Demo"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-[#0d1724]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal top bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#162233]">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#ff0033] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[240px] sm:max-w-md">
                  {YOUTUBE_DEMO_TITLE}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={YOUTUBE_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#8eb8d4] hover:text-white px-3 py-1 rounded-full border border-white/15 transition-colors no-underline inline-flex items-center gap-1"
                >
                  <span>Open on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close video modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal video iframe */}
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`${YOUTUBE_DEMO_EMBED}?autoplay=1&rel=0`}
                title={YOUTUBE_DEMO_TITLE}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <WaveDivider fill="var(--bg-page)" variant={1} />
    </section>
  );
}
