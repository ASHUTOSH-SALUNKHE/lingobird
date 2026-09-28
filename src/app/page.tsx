'use client';

import Link from 'next/link';
import Image from 'next/image';
import VideoShowcase from '@/components/VideoShowcase';
import { useEffect } from 'react';

/* ── Inline SVG doodle components ────────────────────────────── */

function Sun({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-sun"
      style={{ pointerEvents: 'none', ...style }}
    >
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <line
          key={i}
          x1={40 + Math.cos((deg * Math.PI) / 180) * 24}
          y1={40 + Math.sin((deg * Math.PI) / 180) * 24}
          x2={40 + Math.cos((deg * Math.PI) / 180) * 34}
          y2={40 + Math.sin((deg * Math.PI) / 180) * 34}
          stroke="#F4A261"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
      {/* Face */}
      <circle cx="40" cy="40" r="18" fill="#FFE8A3" stroke="#5A3E36" strokeWidth="2.5" />
      {/* Eyes */}
      <circle cx="34" cy="37" r="2.5" fill="#5A3E36" />
      <circle cx="46" cy="37" r="2.5" fill="#5A3E36" />
      {/* Smile */}
      <path d="M33 44 Q40 50 47 44" stroke="#5A3E36" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Cloud({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-cloud"
      style={{ pointerEvents: 'none', ...style }}
    >
      <ellipse cx="50" cy="40" rx="36" ry="18" fill="#FFF8F0" stroke="#5A3E36" strokeWidth="2" />
      <ellipse cx="34" cy="34" rx="22" ry="16" fill="#FFF8F0" stroke="#5A3E36" strokeWidth="2" />
      <ellipse cx="64" cy="32" rx="20" ry="14" fill="#FFF8F0" stroke="#5A3E36" strokeWidth="2" />
    </svg>
  );
}

function Star({ style = {}, size = 24 }: { style?: React.CSSProperties; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-twinkle"
      style={{ width: size, height: size, pointerEvents: 'none', ...style }}
    >
      <path
        d="M12 2 L13.8 8.2 L20 9 L15 14 L16.5 20.5 L12 17 L7.5 20.5 L9 14 L4 9 L10.2 8.2 Z"
        fill="#FFE8A3"
        stroke="#5A3E36"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Heart({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-heartbeat"
      style={{ width: 28, height: 28, pointerEvents: 'none', ...style }}
    >
      <path
        d="M16 27 C16 27 4 19 4 10.5 C4 7 7 4 10.5 4 C12.5 4 14.4 5.1 16 7 C17.6 5.1 19.5 4 21.5 4 C25 4 28 7 28 10.5 C28 19 16 27 16 27Z"
        fill="#E76F51"
        stroke="#5A3E36"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Flower({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-wiggle"
      style={{ width: 40, height: 40, pointerEvents: 'none', ...style }}
    >
      <ellipse cx="30" cy="16" rx="8" ry="13" fill="#FFD9B3" stroke="#5A3E36" strokeWidth="1.8" />
      <ellipse cx="30" cy="44" rx="8" ry="13" fill="#FFD9B3" stroke="#5A3E36" strokeWidth="1.8" />
      <ellipse cx="16" cy="30" rx="13" ry="8" fill="#FFD9B3" stroke="#5A3E36" strokeWidth="1.8" />
      <ellipse cx="44" cy="30" rx="13" ry="8" fill="#FFD9B3" stroke="#5A3E36" strokeWidth="1.8" />
      <circle cx="30" cy="30" r="9" fill="#FFE8A3" stroke="#5A3E36" strokeWidth="2" />
    </svg>
  );
}

function Bird({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 50 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-float"
      style={{ width: 40, height: 32, pointerEvents: 'none', ...style }}
    >
      <path d="M8 20 Q18 8 32 16 Q40 10 46 14 Q38 20 32 16 Q26 28 14 26 Z" fill="#6BB7A8" stroke="#5A3E36" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="35" cy="14" r="2.5" fill="#5A3E36" />
      <path d="M38 12 L44 10 L40 14 Z" fill="#F4A261" stroke="#5A3E36" strokeWidth="1" />
    </svg>
  );
}

/* ── Page ──────────────────────────────────────────────────────── */

export default function HomePage() {
  /* Custom cursor */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.textContent = '⭐';
    document.body.appendChild(cursor);

    const cursorSymbols = ['⭐', '✨', '🌸', '💛', '⭐'];
    let symIdx = 0;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';

      // trail particle
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.textContent = cursorSymbols[symIdx % cursorSymbols.length];
      symIdx++;
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      document.body.appendChild(trail);
      setTimeout(() => trail.remove(), 600);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cursor.remove();
    };
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      emoji: '🌐', title: 'Instant Translation',
      desc: 'Click any WhatsApp message bubble for instant translation. Supports Chrome Built-in (on-device), Google Translate, DeepL, and LibreTranslate.',
      bg: '#FFF0D6', tilt: 'tilt-left',
    },
    {
      emoji: '🧠', title: 'Deep AI Explanations',
      desc: 'Powered by Gemini, Ollama, or Chrome Prompt API. Get literal meaning, part of speech, usage notes, and example sentences.',
      bg: '#FFD9B3', tilt: 'tilt-right',
    },
    {
      emoji: '📚', title: 'SRS Flashcards',
      desc: 'Save words and review them with the SM-2 spaced repetition algorithm. Your WhatsApp chats become your vocabulary deck.',
      bg: '#FFF0D6', tilt: 'tilt-left2',
    },
    {
      emoji: '⌨️', title: 'Live Compose Panel',
      desc: 'See translations of what you\'re typing in real-time. Every word is glossed as you write, so you learn while composing.',
      bg: '#FFE8A3', tilt: 'tilt-right2',
    },
    {
      emoji: '🔒', title: 'Privacy First',
      desc: 'API keys are AES-GCM encrypted before storage. Chrome Built-in translation is 100% on-device. No data leaves without your consent.',
      bg: '#FFD9B3', tilt: 'tilt-left',
    },
    {
      emoji: '🌍', title: 'Any Language Pair',
      desc: 'Not hardcoded to any language. Any ISO 639-1 pair works — Spanish, Japanese, Arabic, Hindi, and 100+ more.',
      bg: '#FFF0D6', tilt: 'tilt-right',
    },
  ];

  return (
    <main style={{ paddingTop: 82 }}>

      {/* ══════════════════════════════════════════════════════
          HERO
         ══════════════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '60px 24px 0',
          background: 'linear-gradient(160deg, #FFF3E0 0%, #FFF8E7 60%, #FFE8CC 100%)',
        }}
      >
        {/* Doodle decorations */}
        <Sun style={{ position: 'absolute', top: 30, right: '8%', width: 80, height: 80, opacity: 0.9 }} />
        <Cloud style={{ position: 'absolute', top: 60, left: '4%', width: 120, opacity: 0.7, animationDelay: '1s' }} />
        <Cloud style={{ position: 'absolute', top: 140, right: '22%', width: 90, opacity: 0.5, animationDelay: '2.5s' }} />
        <Star style={{ position: 'absolute', top: 100, left: '20%', opacity: 0.7, animationDelay: '0.5s' }} size={28} />
        <Star style={{ position: 'absolute', top: 220, right: '12%', opacity: 0.5, animationDelay: '1.5s' }} size={20} />
        <Heart style={{ position: 'absolute', bottom: 120, left: '8%', opacity: 0.65 }} />
        <Flower style={{ position: 'absolute', bottom: 100, right: '6%', opacity: 0.7 }} />
        <Bird style={{ position: 'absolute', top: 180, left: '40%', opacity: 0.5, animationDelay: '2s' }} />

        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          {/* Badge */}
          <div
            className="animate-fade-in"
            style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}
          >
            <span className="sb-tag">🐦 Free Chrome Extension · WhatsApp Web</span>
          </div>

          {/* Headline */}
          <h1
            className="animate-slide-up"
            style={{
              fontFamily: 'Fredoka, Baloo 2, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(2.6rem, 7vw, 4.2rem)',
              lineHeight: 1.15,
              color: '#5A3E36',
              marginBottom: 24,
              letterSpacing: '0.01em',
            }}
          >
            Learn Any Language{' '}
            <span className="sb-gradient-text">While You Chat</span>{' '}
            on WhatsApp 🌍
          </h1>

          <p
            className="animate-slide-up"
            style={{
              fontSize: '1.15rem',
              color: '#8B6359',
              lineHeight: 1.85,
              fontWeight: 600,
              marginBottom: 36,
              animationDelay: '100ms',
              maxWidth: 560,
              margin: '0 auto 36px',
            }}
          >
            LingoBird overlays real-time translation, word-by-word glosses, deep AI explanations, and spaced-repetition flashcards directly onto WhatsApp Web. No tab-switching, ever. 🌸
          </p>

          {/* CTA buttons */}
          <div
            className="animate-slide-up"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              justifyContent: 'center',
              marginBottom: 36,
              animationDelay: '200ms',
            }}
          >
            <Link href="/download" className="sb-btn" style={{ fontSize: '1.1rem', padding: '16px 36px' }}>
              🐦 Add to Chrome — Free
            </Link>
            <Link href="/how-to-use" className="sb-btn-outline" style={{ fontSize: '1.1rem', padding: '15px 34px' }}>
              📖 How It Works
            </Link>
          </div>

          {/* Social proof */}
          <div
            className="animate-slide-up"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 14,
              animationDelay: '300ms',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {[0, 1, 2, 3, 4].map(i => (
                <span key={i} style={{ fontSize: 18, color: '#F4A261' }}>★</span>
              ))}
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#8B6359', marginLeft: 6 }}>
                Loved by language learners
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['🔒 100% Private', '⚡ Offline AI', '🆓 Free Forever'].map(badge => (
                <span
                  key={badge}
                  style={{
                    background: '#FFE8A3',
                    border: '2px solid #5A3E36',
                    borderRadius: 50,
                    boxShadow: '2px 2px 0 #5A3E36',
                    padding: '4px 14px',
                    fontWeight: 700,
                    color: '#5A3E36',
                    fontFamily: 'Caveat, cursive',
                    fontSize: '0.95rem',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Hero mockup card */}
          <div
            className="animate-bounce-in sb-card"
            style={{
              marginTop: 52,
              padding: 24,
              maxWidth: 400,
              margin: '52px auto 0',
              transform: 'rotate(-1deg)',
              background: '#FFF8F0',
            }}
          >
            {/* Mock header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Image src="/lingobird-logo.png" alt="" width={30} height={30} style={{ borderRadius: 8, border: '2px solid #5A3E36' }} />
              <div>
                <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#5A3E36' }}>LingoBird</div>
                <div style={{ fontSize: '0.68rem', color: '#8B6359', fontWeight: 700, fontFamily: 'Caveat, cursive' }}>Learning Mode Active 🌱</div>
              </div>
              <span style={{ marginLeft: 'auto', background: '#FFE8A3', border: '2px solid #5A3E36', borderRadius: 50, boxShadow: '2px 2px 0 #5A3E36', padding: '3px 10px', fontSize: '0.75rem', fontWeight: 700, color: '#5A3E36', fontFamily: 'Caveat, cursive' }}>EN → ES</span>
            </div>
            {/* Mock message */}
            <div style={{ background: '#FFF0D6', borderRadius: 14, border: '2px solid #C4A99F', padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: '0.75rem', color: '#8B6359', fontWeight: 700, marginBottom: 6, fontFamily: 'Caveat, cursive' }}>WhatsApp message:</div>
              <p style={{ fontSize: '0.95rem', color: '#5A3E36', lineHeight: 1.6, margin: 0, fontWeight: 700 }}>
                ¿<span style={{ borderBottom: '2.5px dotted #E76F51', cursor: 'pointer' }}>Cuándo</span>{' '}
                vamos a{' '}
                <span style={{ borderBottom: '2.5px dotted #E76F51', cursor: 'pointer' }}>cenar</span>{' '}
                esta noche?
              </p>
            </div>
            {/* Translation result */}
            <div style={{ background: '#E76F51', borderRadius: 12, padding: 12, marginBottom: 12, border: '2px solid #5A3E36' }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,251,245,0.8)', fontWeight: 700, marginBottom: 4, fontFamily: 'Caveat, cursive' }}>✨ Translation</div>
              <div style={{ fontSize: '0.9rem', color: '#FFFBF5', fontWeight: 700 }}>
                &quot;When are we going to have dinner tonight?&quot;
              </div>
            </div>
            {/* Stats row */}
            <div style={{ display: 'flex', gap: 8 }}>
              {[{ emoji: '🔥', label: '7-day streak' }, { emoji: '📚', label: '42 words saved' }, { emoji: '⏰', label: '5 due now' }].map(stat => (
                <div
                  key={stat.label}
                  style={{
                    flex: 1,
                    background: '#FFF0D6',
                    border: '2px solid #C4A99F',
                    borderRadius: 12,
                    padding: '8px 6px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '1rem' }}>{stat.emoji}</div>
                  <div style={{ fontSize: '0.62rem', color: '#8B6359', fontWeight: 800, fontFamily: 'Caveat, cursive', lineHeight: 1.3 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wavy divider */}
        <div className="sb-wave-divider" style={{ marginTop: 60 }} aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ height: 80 }}>
            <path
              d="M0,30 C240,70 480,5 720,40 C960,70 1200,10 1440,35 L1440,80 L0,80 Z"
              fill="#FFD9B3"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VIDEO SHOWCASE
         ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#FFD9B3', padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div className="reveal" style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
            <span className="sb-tag">🎬 Live Demonstration</span>
          </div>
          <h2
            className="reveal"
            style={{
              fontFamily: 'Fredoka, Baloo 2, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)',
              color: '#5A3E36',
              marginBottom: 14,
              animationDelay: '100ms',
            }}
          >
            Watch LingoBird{' '}
            <span className="sb-gradient-text">In Action</span> 📺
          </h2>
          <p
            className="reveal"
            style={{
              color: '#8B6359',
              fontSize: '1.05rem',
              fontWeight: 600,
              marginBottom: 40,
              lineHeight: 1.75,
              maxWidth: 620,
              margin: '0 auto 40px',
              animationDelay: '200ms',
            }}
          >
            Instant click-to-translate, AI grammar breakdowns, and seamless local AI privacy — all inside WhatsApp Web.
          </p>
          <div className="reveal" style={{ animationDelay: '300ms' }}>
            <VideoShowcase />
          </div>
        </div>

        <div className="sb-wave-divider" style={{ marginTop: 60 }} aria-hidden="true">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: 70 }}>
            <path
              d="M0,40 C360,5 720,65 1080,25 C1260,10 1380,50 1440,45 L1440,70 L0,70 Z"
              fill="#FFF3E0"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURES — tilted sticker cards
         ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#FFF3E0', padding: '60px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Corner doodles */}
        <Star style={{ position: 'absolute', top: 30, right: 40, opacity: 0.4 }} size={32} />
        <Flower style={{ position: 'absolute', bottom: 40, left: 30, opacity: 0.35 }} />

        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }} className="reveal">
            <span className="sb-tag" style={{ marginBottom: 12, display: 'inline-flex' }}>✨ What&apos;s Inside</span>
            <h2
              style={{
                fontFamily: 'Fredoka, Baloo 2, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                color: '#5A3E36',
                display: 'block',
                marginTop: 8,
              }}
            >
              Everything You Need to{' '}
              <span className="sb-gradient-text">Actually Learn</span>
            </h2>
          </div>

          <div
            className="stagger-children"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 28,
            }}
          >
            {features.map((f, idx) => (
              <div
                key={f.title}
                className={`sb-card reveal ${f.tilt}`}
                style={{ padding: 28, background: f.bg, animationDelay: `${idx * 80}ms` }}
              >
                <div
                  className="sb-icon-wrap"
                  style={{ marginBottom: 18, background: '#FFF8F0' }}
                >
                  {f.emoji}
                </div>
                <h3
                  style={{
                    fontFamily: 'Fredoka, Baloo 2, sans-serif',
                    fontWeight: 600,
                    fontSize: '1.2rem',
                    color: '#5A3E36',
                    marginBottom: 10,
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ color: '#8B6359', fontSize: '0.9rem', lineHeight: 1.75, fontWeight: 600, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 44 }} className="reveal">
            <Link href="/features" className="sb-btn-outline">
              Explore All Features →
            </Link>
          </div>
        </div>

        <div className="sb-wave-divider" style={{ marginTop: 60 }} aria-hidden="true">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: 70 }}>
            <path
              d="M0,35 C240,65 480,10 720,45 C960,75 1200,15 1440,40 L1440,70 L0,70 Z"
              fill="#FFE8A3"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COZY QUOTE — torn paper strip
         ══════════════════════════════════════════════════════ */}
      <section
        className="sb-torn-paper"
        style={{ padding: '60px 24px', position: 'relative' }}
      >
        {/* Doodle accents */}
        <Bird style={{ position: 'absolute', top: 20, right: '10%', opacity: 0.5 }} />
        <Heart style={{ position: 'absolute', bottom: 20, left: '8%', opacity: 0.5 }} />
        <Star style={{ position: 'absolute', top: 30, left: '5%', opacity: 0.4 }} size={24} />

        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }} className="reveal">
          <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🌻</div>
          <p
            style={{
              fontFamily: 'Caveat, cursive',
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
              color: '#5A3E36',
              lineHeight: 1.6,
              marginBottom: 20,
            }}
          >
            &ldquo;The best time to learn a language is <em>right now</em>, in the middle of a conversation you&apos;re already having.&rdquo;
          </p>
          <p
            style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '1.1rem',
              color: '#8B6359',
              fontWeight: 600,
            }}
          >
            — The LingoBird Team 🐦
          </p>
        </div>

        <div className="sb-wave-divider" style={{ marginTop: 48 }} aria-hidden="true">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: 70 }}>
            <path
              d="M0,25 C300,65 600,5 900,40 C1100,65 1300,20 1440,35 L1440,70 L0,70 Z"
              fill="#FFF3E0"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — 3 steps
         ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#FFF3E0', padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }} className="reveal">
            <span className="sb-tag" style={{ marginBottom: 12, display: 'inline-flex' }}>🚀 Quick Start</span>
            <h2
              style={{
                fontFamily: 'Fredoka, Baloo 2, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                color: '#5A3E36',
                display: 'block',
                marginTop: 8,
              }}
            >
              Up and Running in{' '}
              <span className="sb-gradient-text">3 Easy Steps</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
            {[
              {
                step: '1',
                title: 'Install the Extension',
                desc: 'Download the extension package and load it into Chrome in under 2 minutes. Quick, clean, and ready to go!',
                sub: ['Download the extension package', 'Open chrome://extensions and enable Developer Mode', 'Click "Load unpacked" and select the folder'],
                screenshotLabel: 'Chrome Extensions → Load Unpacked',
                reverse: false,
              },
              {
                step: '2',
                title: 'Configure Your Languages & AI',
                desc: 'Click the LingoBird icon. Choose your language pair and pick your translation & AI provider.',
                sub: ['Select language pair (e.g., Spanish → English)', 'Choose translation provider (Chrome Built-in is free!)', 'Add Gemini API key or set up local Ollama'],
                screenshotLabel: 'LingoBird Popup → Settings',
                reverse: true,
              },
              {
                step: '3',
                title: 'Chat & Learn!',
                desc: 'Open WhatsApp Web and start chatting. Click any message to translate it. Save words to your SRS deck!',
                sub: ['Click message bubble → instant translation', 'Click "Explain" for deep AI breakdown', 'Hit "Save" for spaced-repetition flashcards'],
                screenshotLabel: 'WhatsApp Web + LingoBird Overlay',
                reverse: false,
              },
            ].map((s, idx) => (
              <div
                key={s.step}
                className="reveal"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 40,
                  alignItems: 'center',
                  direction: s.reverse ? 'rtl' : 'ltr',
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                <div style={{ direction: 'ltr' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div className="sb-step-num">{s.step}</div>
                    <h3
                      style={{
                        fontFamily: 'Fredoka, Baloo 2, sans-serif',
                        fontWeight: 600,
                        fontSize: '1.4rem',
                        color: '#5A3E36',
                        margin: 0,
                      }}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <p style={{ color: '#8B6359', fontSize: '1rem', lineHeight: 1.8, fontWeight: 600, marginBottom: 20 }}>
                    {s.desc}
                  </p>
                  <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {s.sub.map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.93rem', color: '#8B6359', fontWeight: 700 }}>
                        <span style={{ color: '#E76F51', fontSize: '1rem', marginTop: 1, flexShrink: 0 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ direction: 'ltr' }}>
                  <div
                    className="lb-screenshot-frame"
                    style={{ minHeight: 200 }}
                  >
                    <Image src="/lingobird-icon.png" alt="LingoBird" width={44} height={44} style={{ opacity: 0.4, borderRadius: 10 }} />
                    <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#E76F51', fontFamily: 'Caveat, cursive' }}>
                      📸 {s.screenshotLabel}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }} className="reveal">
            <Link href="/how-to-use" className="sb-btn">
              📖 Full Setup Guide →
            </Link>
          </div>
        </div>

        <div className="sb-wave-divider" style={{ marginTop: 60 }} aria-hidden="true">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: 70 }}>
            <path
              d="M0,45 C240,10 480,65 720,30 C960,5 1200,60 1440,35 L1440,70 L0,70 Z"
              fill="#FFD9B3"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          AI PROVIDERS — on peach
         ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#FFD9B3', padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }} className="reveal">
            <span className="sb-tag" style={{ marginBottom: 12, display: 'inline-flex' }}>🤖 Powered By</span>
            <h2
              style={{
                fontFamily: 'Fredoka, Baloo 2, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                color: '#5A3E36',
                display: 'block',
                marginTop: 8,
              }}
            >
              You Choose Your{' '}
              <span className="sb-gradient-text">AI & Translation Stack</span>
            </h2>
            <p style={{ color: '#8B6359', fontSize: '1rem', fontWeight: 600, maxWidth: 520, margin: '12px auto 0' }}>
              From free on-device privacy to powerful cloud AI — LingoBird works with providers you already love. 🌸
            </p>
          </div>

          {/* Translation providers */}
          <h3
            style={{
              fontFamily: 'Caveat, cursive',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#8B6359',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            ⚡ Translation (Layer 1 — Fast)
          </h3>
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18, marginBottom: 44 }}
            className="stagger-children"
          >
            {[
              { name: 'Chrome Built-in', emoji: '🌐', tag: 'Free · On-Device', bg: '#FFF0D6' },
              { name: 'Google Translate', emoji: '🔤', tag: 'Pay-per-use · Cloud', bg: '#FFF8F0' },
              { name: 'DeepL', emoji: '🎯', tag: 'Free Tier · Premium', bg: '#FFE8A3' },
              { name: 'LibreTranslate', emoji: '🔓', tag: 'Free · Self-hosted', bg: '#FFF0D6' },
            ].map(p => (
              <div
                key={p.name}
                className="sb-card reveal tilt-left"
                style={{ padding: 22, textAlign: 'center', background: p.bg }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>{p.emoji}</div>
                <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#5A3E36', marginBottom: 8 }}>{p.name}</div>
                <span className="sb-tag" style={{ fontSize: '0.8rem', padding: '3px 12px' }}>{p.tag}</span>
              </div>
            ))}
          </div>

          {/* AI providers */}
          <h3
            style={{
              fontFamily: 'Caveat, cursive',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#8B6359',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            🧠 AI Explanation (Layer 2 — Deep)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }} className="stagger-children">
            {[
              { name: 'Gemini API', emoji: '✨', desc: 'Google\'s Gemini Flash — fast, accurate, generous free tier. Just add your API key.', bg: '#FFF0D6', tilt: 'tilt-right' },
              { name: 'Ollama (Local)', emoji: '🦙', desc: 'Run llama3 or any model 100% on-device. Maximum privacy, zero cloud costs.', bg: '#FFE8A3', tilt: 'tilt-left' },
              { name: 'Chrome Prompt API', emoji: '🔮', desc: 'Experimental on-device AI built right into Chrome. No setup needed.', bg: '#FFF8F0', tilt: 'tilt-right2' },
            ].map(p => (
              <div key={p.name} className={`sb-card reveal ${p.tilt}`} style={{ padding: 26, background: p.bg }}>
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>{p.emoji}</div>
                <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#5A3E36', marginBottom: 8 }}>{p.name}</div>
                <p style={{ color: '#8B6359', fontSize: '0.9rem', lineHeight: 1.75, fontWeight: 600, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }} className="reveal">
            <Link href="/ai-models" className="sb-btn-outline">View AI Models Deep-Dive →</Link>
          </div>
        </div>

        <div className="sb-wave-divider" style={{ marginTop: 60 }} aria-hidden="true">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: 70 }}>
            <path
              d="M0,30 C360,70 720,5 1080,45 C1260,60 1380,20 1440,30 L1440,70 L0,70 Z"
              fill="#FFF3E0"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SRS FLASHCARDS HIGHLIGHT
         ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#FFF3E0', padding: '60px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        <Cloud style={{ position: 'absolute', top: 30, right: '5%', width: 100, opacity: 0.4, animationDelay: '1.5s' }} />
        <Star style={{ position: 'absolute', bottom: 60, left: '4%', opacity: 0.3 }} size={28} />

        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 56, alignItems: 'center' }}>
            {/* Left: flashcard mock */}
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Front card */}
              <div
                className="sb-card tilt-left"
                style={{
                  background: '#E76F51',
                  padding: 32,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,251,245,0.8)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14, fontFamily: 'Caveat, cursive' }}>
                  📚 Flashcard · Due Today
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 600, color: '#FFFBF5', marginBottom: 6, fontFamily: 'Fredoka, sans-serif' }}>cenar</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,251,245,0.8)', fontWeight: 600, fontFamily: 'Caveat, cursive' }}>from your WhatsApp conversation</div>
              </div>
              {/* Back card */}
              <div className="sb-card tilt-right" style={{ background: '#FFF8F0', padding: 22 }}>
                <div style={{ fontSize: '0.75rem', color: '#8B6359', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'Caveat, cursive' }}>Answer</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#5A3E36', fontFamily: 'Fredoka, sans-serif', marginBottom: 6 }}>to have dinner</div>
                <div style={{ fontSize: '0.85rem', color: '#8B6359', fontWeight: 600, marginBottom: 18, fontFamily: 'Nunito, sans-serif' }}>
                  &quot;¿Cuándo vamos a <strong>cenar</strong> esta noche?&quot;
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { label: '😞 Again', bg: '#FFF0D6' },
                    { label: '😐 Hard', bg: '#FFE8A3' },
                    { label: '🙂 Good', bg: '#FFF8F0' },
                    { label: '😄 Easy', bg: '#FFD9B3' },
                  ].map(b => (
                    <button
                      key={b.label}
                      style={{
                        flex: 1, padding: '8px 4px',
                        background: b.bg, color: '#5A3E36',
                        border: '2px solid #5A3E36', borderRadius: 10,
                        fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '0.8rem',
                        cursor: 'pointer', boxShadow: '2px 2px 0 #5A3E36',
                      }}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: copy */}
            <div className="reveal" style={{ animationDelay: '150ms' }}>
              <span className="lb-section-tag">📚 Spaced Repetition</span>
              <h2
                style={{
                  fontFamily: 'Fredoka, Baloo 2, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                  color: '#5A3E36',
                  marginBottom: 18,
                }}
              >
                Words From Real Chats Become Your{' '}
                <span className="sb-gradient-text">Personal Deck</span>
              </h2>
              <p style={{ color: '#8B6359', fontSize: '1rem', lineHeight: 1.85, fontWeight: 600, marginBottom: 24 }}>
                Every word you save gets added to an SM-2 spaced repetition deck inside the popup. Review what&apos;s due, rate your recall, and the algorithm schedules the next review automatically. No separate app needed!
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {[
                  '🔥 SM-2 algorithm (same as Anki)',
                  '💬 Words come from your real chats',
                  '📊 Track streaks and review counts',
                  '📥 Export vocabulary to CSV or JSON',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.95rem', color: '#5A3E36', fontWeight: 700 }}>
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/features#srs" className="sb-btn">
                Learn About Flashcards →
              </Link>
            </div>
          </div>
        </div>

        <div className="sb-wave-divider" style={{ marginTop: 60 }} aria-hidden="true">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: 70 }}>
            <path
              d="M0,20 C300,65 700,5 1000,42 C1200,65 1380,15 1440,28 L1440,70 L0,70 Z"
              fill="#FFE8A3"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS STRIP — warm butter
         ══════════════════════════════════════════════════════ */}
      <section style={{ background: '#FFE8A3', padding: '52px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 10, left: 20, opacity: 0.3 }}><Bird /></div>
        <div style={{ position: 'absolute', top: 10, right: 20, opacity: 0.3 }}><Flower /></div>

        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 28, textAlign: 'center' }}
            className="stagger-children"
          >
            {[
              { num: '100+', label: 'Languages Supported', emoji: '🌍' },
              { num: '4', label: 'Translation Providers', emoji: '⚡' },
              { num: '3', label: 'AI Explanation Engines', emoji: '🧠' },
              { num: 'SM-2', label: 'SRS Algorithm', emoji: '📚' },
              { num: '0', label: 'Data Sent Without Consent', emoji: '🔒' },
            ].map(stat => (
              <div key={stat.label} className="reveal">
                <div style={{ fontSize: '1.8rem', marginBottom: 4 }}>{stat.emoji}</div>
                <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: '2.2rem', color: '#5A3E36', lineHeight: 1, marginBottom: 6 }}>
                  {stat.num}
                </div>
                <div style={{ color: '#8B6359', fontWeight: 700, fontFamily: 'Caveat, cursive', fontSize: '1.1rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sb-wave-divider" style={{ marginTop: 48 }} aria-hidden="true">
          <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: 70 }}>
            <path
              d="M0,40 C240,5 480,65 720,30 C960,5 1200,55 1440,35 L1440,70 L0,70 Z"
              fill="#FFF3E0"
            />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA
         ══════════════════════════════════════════════════════ */}
      <section
        style={{
          background: '#FFF3E0',
          padding: '80px 24px 100px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Floating doodles */}
        <Sun style={{ position: 'absolute', top: 20, left: '6%', width: 70, opacity: 0.5 }} />
        <Cloud style={{ position: 'absolute', top: 50, right: '5%', width: 110, opacity: 0.4, animationDelay: '2s' }} />
        <Star style={{ position: 'absolute', bottom: 80, left: '14%', opacity: 0.35 }} size={30} />
        <Star style={{ position: 'absolute', top: 80, right: '15%', opacity: 0.3, animationDelay: '1s' }} size={22} />
        <Heart style={{ position: 'absolute', bottom: 60, right: '10%', opacity: 0.4 }} />
        <Flower style={{ position: 'absolute', bottom: 40, left: '4%', opacity: 0.3 }} />

        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }} className="reveal">
          {/* Mascot */}
          <div className="animate-bird-bob" style={{ marginBottom: 24 }}>
            <Image
              src="/lingobird-logo.png"
              alt="LingoBird mascot"
              width={96}
              height={96}
              style={{
                display: 'block',
                margin: '0 auto',
                filter: 'drop-shadow(4px 4px 0 #5A3E36)',
              }}
            />
          </div>

          <span className="sb-tag" style={{ marginBottom: 20, display: 'inline-flex' }}>🚀 Start Learning Today</span>

          <h2
            style={{
              fontFamily: 'Fredoka, Baloo 2, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: '#5A3E36',
              marginBottom: 18,
              marginTop: 16,
            }}
          >
            Ready to Turn Your Chats into{' '}
            <span className="sb-gradient-text">Language Lessons?</span>
          </h2>

          <p style={{ color: '#8B6359', fontSize: '1.1rem', lineHeight: 1.85, fontWeight: 600, marginBottom: 40 }}>
            It&apos;s 100% free to use and takes just 2 minutes to set up. Your WhatsApp conversations are waiting to become your classroom. 🐦
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
            <Link href="/download" className="sb-btn" style={{ fontSize: '1.1rem', padding: '16px 38px' }}>
              🐦 Get LingoBird — Free
            </Link>
            <Link href="/contact" className="sb-btn-outline" style={{ fontSize: '1.1rem', padding: '15px 36px' }}>
              💬 Ask a Question
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
