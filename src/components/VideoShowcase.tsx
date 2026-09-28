'use client';

import { useState } from 'react';
import Image from 'next/image';

// 🎬 Customize your YouTube video here!
// You can replace this ID with your actual YouTube video ID (e.g. from https://www.youtube.com/watch?v=YOUR_ID)
const DEFAULT_YOUTUBE_ID = 'dQw4w9WgXcQ';

export default function VideoShowcase() {
  const [activeTab, setActiveTab] = useState<'video' | 'duo-ai' | 'local-ai' | 'overlay' | 'flashcards'>('video');
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoId, setVideoId] = useState(DEFAULT_YOUTUBE_ID);
  const [showConfig, setShowConfig] = useState(false);

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto' }}>
      {/* Tab Switcher */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          justifyContent: 'center',
          marginBottom: 24,
        }}
      >
        {[
          { id: 'video', label: '🎬 YouTube Video Demo', badge: 'Watch 60s' },
          { id: 'duo-ai', label: '🤖 Duo AI Breakdown', badge: 'Screenshot' },
          { id: 'local-ai', label: '💻 Local AI (Ollama)', badge: 'Screenshot' },
          { id: 'overlay', label: '💬 WhatsApp Overlay', badge: 'Screenshot' },
          { id: 'flashcards', label: '🎴 SRS Flashcards', badge: 'Screenshot' },
        ].map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              style={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 800,
                fontSize: '0.92rem',
                padding: '10px 18px',
                borderRadius: 50,
                border: active ? '2px solid #169FE5' : '2px solid #C8E0F0',
                background: active ? '#169FE5' : '#FFFFFF',
                color: active ? '#FFFFFF' : '#1A3A4C',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: active ? '0 6px 16px rgba(22,159,229,0.3)' : '0 2px 6px rgba(26,58,76,0.04)',
                transform: active ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{tab.label}</span>
              <span
                style={{
                  fontSize: '0.68rem',
                  padding: '2px 8px',
                  borderRadius: 20,
                  background: active ? 'rgba(255,255,255,0.25)' : '#EBF5FB',
                  color: active ? '#FFFFFF' : '#169FE5',
                  fontWeight: 900,
                }}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Showcase Device Window */}
      <div
        className="lb-card"
        style={{
          borderRadius: 28,
          border: '3px solid #C8E0F0',
          background: '#FFFFFF',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(22,159,229,0.18), 0 4px 16px rgba(26,58,76,0.06)',
        }}
      >
        {/* Cartoon Window Top Bar */}
        <div
          style={{
            background: 'linear-gradient(180deg, #F0F8FF 0%, #E8F4FD 100%)',
            padding: '14px 20px',
            borderBottom: '2px solid #C8E0F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Window dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56', display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E', display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F', display: 'inline-block' }} />
            <span
              style={{
                marginLeft: 12,
                fontSize: '0.82rem',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 800,
                color: '#4A7A96',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              🐦 LingoBird · WhatsApp Web Language Learning Assistant
            </span>
          </div>

          {/* Quick config toggle for video URL */}
          {activeTab === 'video' && (
            <button
              onClick={() => setShowConfig(!showConfig)}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #C8E0F0',
                borderRadius: 20,
                padding: '4px 12px',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#169FE5',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              ⚙️ {showConfig ? 'Hide Settings' : 'Custom Video ID'}
            </button>
          )}
        </div>

        {/* Optional YouTube Video ID input bar */}
        {activeTab === 'video' && showConfig && (
          <div
            style={{
              padding: '12px 20px',
              background: '#FFF9E6',
              borderBottom: '1.5px solid #FFE699',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 280 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#805B00' }}>
                YouTube Video ID:
              </span>
              <input
                type="text"
                value={videoId}
                onChange={(e) => {
                  setVideoId(e.target.value.trim());
                  setIsPlaying(false);
                }}
                placeholder="e.g. dQw4w9WgXcQ"
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #FFD85A',
                  borderRadius: 10,
                  padding: '6px 12px',
                  fontSize: '0.85rem',
                  fontFamily: 'monospace',
                  color: '#1A3A4C',
                  outline: 'none',
                  flex: 1,
                  maxWidth: 240,
                }}
              />
            </div>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#997300', fontWeight: 700 }}>
              💡 Tip: Paste your video ID here or update <code>DEFAULT_YOUTUBE_ID</code> in <code>VideoShowcase.tsx</code>
            </p>
          </div>
        )}

        {/* Content Body Based on Tab */}
        <div style={{ position: 'relative', background: '#F8FCFF' }}>
          {/* TAB 1: YOUTUBE VIDEO */}
          {activeTab === 'video' && (
            <div>
              <div
                style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  background: '#0D232F',
                }}
              >
                {isPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title="LingoBird Extension Walkthrough"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                  />
                ) : (
                  <div
                    onClick={() => setIsPlaying(true)}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'radial-gradient(circle at center, #1E4E68 0%, #0F2837 100%)',
                      color: '#FFFFFF',
                      padding: 24,
                      textAlign: 'center',
                    }}
                  >
                    {/* Floating mascot badge */}
                    <div className="animate-float" style={{ marginBottom: 16 }}>
                      <Image
                        src="/lingobird-logo.png"
                        alt="LingoBird Play Demo"
                        width={80}
                        height={80}
                        style={{
                          filter: 'drop-shadow(0 8px 20px rgba(22,159,229,0.5))',
                          borderRadius: 24,
                        }}
                      />
                    </div>

                    {/* Big Cartoon Play Button */}
                    <div
                      className="animate-pulse-blue"
                      style={{
                        width: 76,
                        height: 76,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #169FE5 0%, #0878B8 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 16,
                        boxShadow: '0 8px 28px rgba(22,159,229,0.5)',
                        border: '3px solid #FFFFFF',
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <span style={{ fontSize: '2rem', marginLeft: 4, color: '#FFFFFF' }}>▶</span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'Nunito, sans-serif',
                        fontWeight: 900,
                        fontSize: '1.4rem',
                        margin: '0 0 6px',
                        color: '#FFFFFF',
                      }}
                    >
                      Click to Watch LingoBird in Action
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#90CAF9', fontWeight: 600 }}>
                      Real-time translation · Duo AI explanations · Local Ollama setup (60s demo)
                    </p>
                  </div>
                )}
              </div>

              {/* Video Chapters / Interactive Timeline */}
              <div
                style={{
                  padding: '18px 24px',
                  background: '#FFFFFF',
                  borderTop: '2px solid #C8E0F0',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 12,
                }}
              >
                {[
                  { time: '0:00', title: 'Click-to-Translate', desc: 'Instant WhatsApp bubble translation' },
                  { time: '0:18', title: 'Duo AI Breakdown', desc: 'Grammar, tone & native examples' },
                  { time: '0:35', title: 'Local AI (Ollama)', desc: '100% private on-device model' },
                  { time: '0:50', title: 'SRS Flashcards', desc: 'Save vocabulary directly to deck' },
                ].map((chapter) => (
                  <div
                    key={chapter.time}
                    onClick={() => setIsPlaying(true)}
                    style={{
                      background: '#F0F8FF',
                      border: '1.5px solid #C8E0F0',
                      borderRadius: 14,
                      padding: '10px 14px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#169FE5';
                      e.currentTarget.style.background = '#E8F4FD';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#C8E0F0';
                      e.currentTarget.style.background = '#F0F8FF';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 900,
                          background: '#169FE5',
                          color: '#FFFFFF',
                          borderRadius: 6,
                          padding: '1px 6px',
                        }}
                      >
                        {chapter.time}
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1A3A4C' }}>
                        {chapter.title}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#4A7A96', fontWeight: 600 }}>
                      {chapter.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DUO AI EXPLANATION SCREENSHOT SPACE */}
          {activeTab === 'duo-ai' && (
            <div style={{ padding: '36px 28px' }}>
              <div
                style={{
                  border: '3px dashed #169FE5',
                  borderRadius: 24,
                  background: 'linear-gradient(135deg, #F0F8FF 0%, #FFFFFF 100%)',
                  padding: '48px 24px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 22,
                    background: 'rgba(22,159,229,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.4rem',
                  }}
                >
                  🤖
                </div>

                <div>
                  <span
                    style={{
                      background: '#D6EEFA',
                      color: '#169FE5',
                      fontWeight: 900,
                      fontSize: '0.78rem',
                      padding: '4px 12px',
                      borderRadius: 50,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Reserved Screenshot Space
                  </span>
                  <h3
                    style={{
                      fontFamily: 'Nunito, sans-serif',
                      fontWeight: 900,
                      fontSize: '1.6rem',
                      color: '#1A3A4C',
                      margin: '10px 0 6px',
                    }}
                  >
                    📸 Duo AI / Deep Grammar Breakdown Screenshot
                  </h3>
                  <p
                    style={{
                      color: '#4A7A96',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      maxWidth: 620,
                      margin: '0 auto',
                      lineHeight: 1.6,
                    }}
                  >
                    Place your screenshot showing the WhatsApp chat with the Duo AI popup open:
                    word breakdown, parts of speech, grammar tips, nuance analysis, and "Save to Flashcard" button!
                  </p>
                </div>

                {/* Example simulated preview card */}
                <div
                  style={{
                    maxWidth: 500,
                    width: '100%',
                    background: '#FFFFFF',
                    borderRadius: 18,
                    border: '2px solid #C8E0F0',
                    padding: 20,
                    textAlign: 'left',
                    boxShadow: '0 8px 24px rgba(22,159,229,0.1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <Image src="/lingobird-logo.png" alt="" width={24} height={24} style={{ borderRadius: 6 }} />
                    <span style={{ fontWeight: 900, fontSize: '0.9rem', color: '#1A3A4C' }}>Duo AI Explanation</span>
                    <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: '#76B87A', fontWeight: 800 }}>● Active</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#169FE5', fontWeight: 800, marginBottom: 4 }}>
                    Phrase: &quot;¿Tienes tiempo para hablar?&quot;
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#4A7A96', lineHeight: 1.5, margin: 0, fontWeight: 600 }}>
                    <strong>Tienes</strong>: 2nd-person present of <em>tener</em> (to have). Informal/friendly register commonly used among friends on WhatsApp.
                  </p>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#7BAFC8', fontWeight: 700 }}>
                  📁 Put your image into <code>public/screenshots/duo-ai.png</code> to display it here
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOCAL AI & OLLAMA CONFIGURATION */}
          {activeTab === 'local-ai' && (
            <div style={{ padding: '36px 28px' }}>
              <div
                style={{
                  border: '3px dashed #76B87A',
                  borderRadius: 24,
                  background: 'linear-gradient(135deg, #F5FAF6 0%, #FFFFFF 100%)',
                  padding: '48px 24px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 22,
                    background: 'rgba(118,184,122,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.4rem',
                  }}
                >
                  💻
                </div>

                <div>
                  <span
                    style={{
                      background: '#E4F4E5',
                      color: '#2E7D32',
                      fontWeight: 900,
                      fontSize: '0.78rem',
                      padding: '4px 12px',
                      borderRadius: 50,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Reserved Screenshot Space
                  </span>
                  <h3
                    style={{
                      fontFamily: 'Nunito, sans-serif',
                      fontWeight: 900,
                      fontSize: '1.6rem',
                      color: '#1A3A4C',
                      margin: '10px 0 6px',
                    }}
                  >
                    📸 Configuring Local AI (Ollama) Screenshot
                  </h3>
                  <p
                    style={{
                      color: '#4A7A96',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      maxWidth: 620,
                      margin: '0 auto',
                      lineHeight: 1.6,
                    }}
                  >
                    Place your screenshot showing the LingoBird Settings tab configured with Local AI (Ollama)
                    running <code>http://localhost:11434</code> with Llama 3 or Gemma 2!
                  </p>
                </div>

                {/* Simulated CLI preview */}
                <div
                  style={{
                    maxWidth: 520,
                    width: '100%',
                    background: '#19343D',
                    borderRadius: 16,
                    padding: '16px 20px',
                    textAlign: 'left',
                    color: '#A5D6A7',
                    fontFamily: 'monospace',
                    fontSize: '0.82rem',
                    lineHeight: 1.6,
                  }}
                >
                  <div style={{ color: '#7BAFC8', marginBottom: 6 }}># 1. Start Ollama with browser extension CORS</div>
                  <div>$ export OLLAMA_ORIGINS=&quot;*&quot; &amp;&amp; ollama serve</div>
                  <div style={{ color: '#7BAFC8', margin: '8px 0 6px' }}># 2. In LingoBird Settings → Select Local AI (Ollama)</div>
                  <div style={{ color: '#FFD85A' }}>Endpoint: http://localhost:11434 | Model: llama3.2</div>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#7BAFC8', fontWeight: 700 }}>
                  📁 Put your image into <code>public/screenshots/local-ai.png</code> to display it here
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WHATSAPP OVERLAY */}
          {activeTab === 'overlay' && (
            <div style={{ padding: '36px 28px' }}>
              <div
                style={{
                  border: '3px dashed #FF9E5E',
                  borderRadius: 24,
                  background: 'linear-gradient(135deg, #FFF7F2 0%, #FFFFFF 100%)',
                  padding: '48px 24px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 22,
                    background: 'rgba(255,158,94,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.4rem',
                  }}
                >
                  💬
                </div>

                <div>
                  <span
                    style={{
                      background: '#FFE8DB',
                      color: '#E65100',
                      fontWeight: 900,
                      fontSize: '0.78rem',
                      padding: '4px 12px',
                      borderRadius: 50,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Reserved Screenshot Space
                  </span>
                  <h3
                    style={{
                      fontFamily: 'Nunito, sans-serif',
                      fontWeight: 900,
                      fontSize: '1.6rem',
                      color: '#1A3A4C',
                      margin: '10px 0 6px',
                    }}
                  >
                    📸 WhatsApp Web In-Chat Overlay Screenshot
                  </h3>
                  <p
                    style={{
                      color: '#4A7A96',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      maxWidth: 620,
                      margin: '0 auto',
                      lineHeight: 1.6,
                    }}
                  >
                    Showcase the real WhatsApp Web interface with the LingoBird blue pill indicator,
                    underlined word-by-word glosses, and translation bubble.
                  </p>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#7BAFC8', fontWeight: 700 }}>
                  📁 Put your image into <code>public/screenshots/whatsapp-overlay.png</code> to display it here
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SRS FLASHCARDS */}
          {activeTab === 'flashcards' && (
            <div style={{ padding: '36px 28px' }}>
              <div
                style={{
                  border: '3px dashed #9B7FE8',
                  borderRadius: 24,
                  background: 'linear-gradient(135deg, #F8F5FF 0%, #FFFFFF 100%)',
                  padding: '48px 24px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 22,
                    background: 'rgba(155,127,232,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.4rem',
                  }}
                >
                  🎴
                </div>

                <div>
                  <span
                    style={{
                      background: '#ECE4FC',
                      color: '#673AB7',
                      fontWeight: 900,
                      fontSize: '0.78rem',
                      padding: '4px 12px',
                      borderRadius: 50,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Reserved Screenshot Space
                  </span>
                  <h3
                    style={{
                      fontFamily: 'Nunito, sans-serif',
                      fontWeight: 900,
                      fontSize: '1.6rem',
                      color: '#1A3A4C',
                      margin: '10px 0 6px',
                    }}
                  >
                    📸 Spaced Repetition (SRS) Flashcards Screenshot
                  </h3>
                  <p
                    style={{
                      color: '#4A7A96',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      maxWidth: 620,
                      margin: '0 auto',
                      lineHeight: 1.6,
                    }}
                  >
                    Showcase the review session inside the extension popup: card flip animation,
                    SM-2 rating buttons (Again, Hard, Good, Easy), and daily streak counter.
                  </p>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#7BAFC8', fontWeight: 700 }}>
                  📁 Put your image into <code>public/screenshots/flashcards.png</code> to display it here
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
