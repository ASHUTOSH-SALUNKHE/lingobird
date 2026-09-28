import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Features — Everything LingoBird Can Do',
  description:
    'Explore LingoBird\'s full feature set: instant translation, deep AI explanations, spaced-repetition SRS flashcards, live compose panel, word glosses, and more.',
};

function ScreenshotPlaceholder({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="lb-screenshot-frame" style={{ minHeight: 260 }}>
      <Image src="/lingobird-icon.png" alt="placeholder" width={44} height={44} style={{ opacity: 0.35, borderRadius: 10 }} />
      <div>
        <p style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: '#169FE5' }}>📸 {label}</p>
        <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#7BAFC8', fontWeight: 600 }}>{hint}</p>
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <main style={{ paddingTop: 68 }}>

      {/* Hero */}
      <section className="lb-sky-bg lb-grid-bg" style={{ padding: '72px 24px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="lb-section-tag" style={{ justifyContent: 'center' }}>✨ Full Feature List</div>
          <h1
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: '#1A3A4C',
              letterSpacing: '-0.02em',
              marginBottom: 18,
            }}
          >
            Everything LingoBird{' '}
            <span className="lb-gradient-text">Can Do For You</span>
          </h1>
          <p style={{ color: '#4A7A96', fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
            From instant click-to-translate to deep AI grammar breakdowns and a full spaced-repetition system — all inside WhatsApp Web. No separate app needed.
          </p>
        </div>
      </section>

      {/* ─── Feature 1: Translation ──────────────────────────────── */}
      <section style={{ background: 'white', padding: '80px 24px' }} id="translation">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div className="lb-section-tag">🌐 Layer 1</div>
              <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '2rem', color: '#1A3A4C', marginBottom: 16 }}>
                Instant Translation — <span className="lb-gradient-text">Four Providers</span>
              </h2>
              <p style={{ color: '#4A7A96', fontSize: '1rem', lineHeight: 1.8, fontWeight: 600, marginBottom: 24 }}>
                Click any WhatsApp message bubble and get an instant translation. You choose your provider: free on-device Chrome AI, Google Translate, DeepL, or self-hosted LibreTranslate.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { name: 'Chrome Built-in', desc: 'On-device, free, works offline. 37+ languages. Requires Chrome 127+.', emoji: '🌐', color: '#76B87A' },
                  { name: 'Google Translate', desc: 'Cloud translation for 100+ languages. Requires a Google API key.', emoji: '🔤', color: '#169FE5' },
                  { name: 'DeepL', desc: 'High-quality translations with a generous free tier.', emoji: '🎯', color: '#9B7FE8' },
                  { name: 'LibreTranslate', desc: 'Self-hosted, fully private. Configure your own instance URL.', emoji: '🔓', color: '#0EA5AC' },
                ].map(p => (
                  <div key={p.name} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 44, height: 44, borderRadius: 14,
                        background: `${p.color}18`,
                        border: `2px solid ${p.color}33`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.3rem', flexShrink: 0,
                      }}
                    >
                      {p.emoji}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '0.95rem', color: '#1A3A4C', marginBottom: 2 }}>{p.name}</div>
                      <div style={{ fontSize: '0.85rem', color: '#4A7A96', fontWeight: 600 }}>{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ScreenshotPlaceholder
              label="Message Popover Translation"
              hint="Screenshot: Click a WhatsApp bubble → translation appears instantly"
            />
          </div>
        </div>
      </section>

      {/* ─── Feature 2: AI Explanations ─────────────────────────── */}
      <section className="lb-sky-bg" style={{ padding: '80px 24px' }} id="ai-explanations">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <ScreenshotPlaceholder
              label="Deep AI Explanation Panel"
              hint="Screenshot: Gemini/Ollama breakdown with grammar, usage, examples"
            />
            <div>
              <div className="lb-section-tag">🧠 Layer 2</div>
              <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '2rem', color: '#1A3A4C', marginBottom: 16 }}>
                Deep AI Explanations —{' '}
                <span className="lb-gradient-text-warm">Not Just Translation</span>
              </h2>
              <p style={{ color: '#4A7A96', fontSize: '1rem', lineHeight: 1.8, fontWeight: 600, marginBottom: 24 }}>
                Hit &quot;Explain&quot; on any translated message and LingoBird sends it to your chosen AI engine for a full linguistic breakdown.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: '📝', text: 'Literal word-by-word meaning' },
                  { icon: '🏷️', text: 'Part of speech labeling' },
                  { icon: '💡', text: 'Usage notes and context' },
                  { icon: '💬', text: 'Native example sentence' },
                  { icon: '🎭', text: 'Tone and formality level' },
                  { icon: '💾', text: 'Save explanation to your vocabulary' },
                ].map(item => (
                  <div key={item.text} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.95rem', color: '#4A7A96', fontWeight: 700 }}>
                    <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Feature 3: Word Glosses ─────────────────────────────── */}
      <section style={{ background: 'white', padding: '80px 24px' }} id="word-glosses">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div className="lb-section-tag">🔤 Word-Level</div>
              <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '2rem', color: '#1A3A4C', marginBottom: 16 }}>
                Per-Word Gloss Tooltips — <span className="lb-gradient-text">Hover Any Word</span>
              </h2>
              <p style={{ color: '#4A7A96', fontSize: '1rem', lineHeight: 1.8, fontWeight: 600, marginBottom: 24 }}>
                In Learning Mode, every word in every message is underlined with a dotted blue line. Hover to see the translation, click to save it to your flashcard deck.
              </p>
              <div style={{ background: '#F0F8FF', border: '2px solid #C8E0F0', borderRadius: 20, padding: 20 }}>
                <div style={{ fontSize: '0.75rem', color: '#7BAFC8', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
                  How it looks in the chat
                </div>
                <p style={{ fontSize: '1rem', color: '#1A3A4C', lineHeight: 2, fontWeight: 600, margin: 0 }}>
                  ¿
                  <span style={{ borderBottom: '2px dotted #169FE5', paddingBottom: 1 }}>Cuándo</span>
                  {' '}vamos a{' '}
                  <span style={{ borderBottom: '2px dotted #169FE5', paddingBottom: 1 }}>cenar</span>
                  {' '}
                  <span style={{ borderBottom: '2px dotted #169FE5', paddingBottom: 1 }}>esta</span>
                  {' '}
                  <span style={{ borderBottom: '2px dotted #169FE5', paddingBottom: 1 }}>noche</span>
                  ?
                </p>
                <div style={{ marginTop: 10, display: 'inline-block', background: '#1A3A4C', color: 'white', borderRadius: 10, padding: '8px 12px', fontSize: '0.8rem', fontWeight: 700 }}>
                  <div style={{ color: '#5EC5F5' }}>cenar</div>
                  <div style={{ color: '#FFD85A', fontSize: '0.7rem' }}>= to have dinner • click to save</div>
                </div>
              </div>
            </div>
            <ScreenshotPlaceholder
              label="Word Gloss Tooltip"
              hint="Screenshot: Hovering a word shows the translation tooltip"
            />
          </div>
        </div>
      </section>

      {/* ─── Feature 4: SRS Flashcards ──────────────────────────── */}
      <section className="lb-sky-bg" style={{ padding: '80px 24px' }} id="srs">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <ScreenshotPlaceholder
              label="SRS Flashcard Session"
              hint="Screenshot: Flashcard popup with SM-2 rating buttons"
            />
            <div>
              <div className="lb-section-tag">📚 Vocabulary</div>
              <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '2rem', color: '#1A3A4C', marginBottom: 16 }}>
                SM-2 Spaced Repetition —{' '}
                <span className="lb-gradient-text">Like Anki, but Built-In</span>
              </h2>
              <p style={{ color: '#4A7A96', fontSize: '1rem', lineHeight: 1.8, fontWeight: 600, marginBottom: 24 }}>
                Save words from your WhatsApp conversations and they automatically get added to an SM-2 spaced repetition deck right inside the extension popup. No Anki account required.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { step: '1', text: 'Translate a message → click Explain → hit Save to vocabulary', color: '#169FE5' },
                  { step: '2', text: 'The popup shows a Due now counter when cards are ready', color: '#9B7FE8' },
                  { step: '3', text: 'Review cards and rate recall: Again / Hard / Good / Easy', color: '#76B87A' },
                  { step: '4', text: 'SM-2 algorithm schedules your next review automatically', color: '#FF9E5E' },
                ].map(s => (
                  <div key={s.step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: `${s.color}22`,
                        border: `2px solid ${s.color}44`,
                        color: s.color,
                        fontFamily: 'Nunito',
                        fontWeight: 900,
                        fontSize: '0.85rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {s.step}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#4A7A96', fontWeight: 700, paddingTop: 4 }}>{s.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Feature 5: Live Compose ─────────────────────────────── */}
      <section style={{ background: 'white', padding: '80px 24px' }} id="compose">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div className="lb-section-tag">⌨️ Live Compose</div>
              <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '2rem', color: '#1A3A4C', marginBottom: 16 }}>
                Translate As You Type — <span className="lb-gradient-text">Learn While Writing</span>
              </h2>
              <p style={{ color: '#4A7A96', fontSize: '1rem', lineHeight: 1.8, fontWeight: 600, marginBottom: 24 }}>
                As you type a message in the WhatsApp compose box, LingoBird shows you a live translation with per-word glosses after a 450ms debounce. Write in your target language with confidence.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {[
                  '450ms debounce — not intrusive',
                  'Per-word gloss on translated output',
                  'Works in Learning Mode only',
                  'No message data stored server-side',
                ].map(item => (
                  <span
                    key={item}
                    className="lb-pill"
                    style={{ background: 'rgba(22,159,229,0.08)', color: '#169FE5', border: '1.5px solid rgba(22,159,229,0.2)' }}
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
            <ScreenshotPlaceholder
              label="Live Compose Panel"
              hint="Screenshot: Typing in WhatsApp → live translation panel below"
            />
          </div>
        </div>
      </section>

      {/* ─── Feature 6: Privacy ─────────────────────────────────── */}
      <section className="lb-sky-bg" style={{ padding: '80px 24px' }} id="privacy">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <ScreenshotPlaceholder
              label="Encrypted Settings Panel"
              hint="Screenshot: Settings page showing encrypted API key storage"
            />
            <div>
              <div className="lb-section-tag">🔒 Privacy First</div>
              <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '2rem', color: '#1A3A4C', marginBottom: 16 }}>
                Your Data Stays{' '}
                <span className="lb-gradient-text">Yours, Always</span>
              </h2>
              <p style={{ color: '#4A7A96', fontSize: '1rem', lineHeight: 1.8, fontWeight: 600, marginBottom: 24 }}>
                LingoBird was designed with privacy at its core. Your API keys never leave your device in plaintext, and we never scrape or upload your message content.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: '🔐', text: 'AES-GCM 256-bit encryption for all stored API keys', color: '#169FE5' },
                  { icon: '🏠', text: 'Chrome Built-in translation is 100% on-device', color: '#76B87A' },
                  { icon: '🚫', text: 'Zero message scraping or off-device data exfiltration', color: '#E05D52' },
                  { icon: '💽', text: 'Translation cache is local IndexedDB — never synced to cloud', color: '#9B7FE8' },
                  { icon: '🔑', text: 'Encryption key is per-device, randomly generated, never transmitted', color: '#FF9E5E' },
                ].map(item => (
                  <div key={item.text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{item.icon}</span>
                    <div style={{ fontSize: '0.92rem', color: '#4A7A96', fontWeight: 700, paddingTop: 2 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: 'linear-gradient(135deg, #169FE5 0%, #0878B8 100%)',
          padding: '72px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="animate-float" style={{ marginBottom: 16 }}>
            <Image src="/lingobird-logo.png" alt="LingoBird" width={72} height={72} style={{ display: 'block', margin: '0 auto', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.2))' }} />
          </div>
          <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '2rem', color: 'white', marginBottom: 14 }}>
            Ready to Try All These Features?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', fontWeight: 600, marginBottom: 32 }}>
            100% free to use, and ready in 2 minutes.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            <Link href="/download" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'white', color: '#169FE5',
              fontFamily: 'Nunito', fontWeight: 800, fontSize: '1rem',
              padding: '14px 28px', borderRadius: 50, textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              transition: 'all 0.2s ease',
            }}>
              🐦 Get Started Free
            </Link>
            <Link href="/how-to-use" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.15)', color: 'white',
              fontFamily: 'Nunito', fontWeight: 800, fontSize: '1rem',
              padding: '14px 28px', borderRadius: 50, textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.35)',
              transition: 'all 0.2s ease',
            }}>
              📖 How to Use
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
