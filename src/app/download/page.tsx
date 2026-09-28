import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Download & Install — LingoBird Chrome Extension',
  description:
    'Download and install the LingoBird Chrome extension. Easy step-by-step setup guide to transform WhatsApp Web into a language learning classroom.',
};

export default function DownloadPage() {
  return (
    <main style={{ paddingTop: 68 }}>

      {/* Hero */}
      <section className="lb-sky-bg lb-grid-bg" style={{ padding: '72px 24px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div className="animate-float" style={{ marginBottom: 20 }}>
            <Image
              src="/lingobird-logo.png"
              alt="LingoBird"
              width={100}
              height={100}
              style={{ display: 'block', margin: '0 auto', filter: 'drop-shadow(0 8px 24px rgba(22,159,229,0.4))' }}
            />
          </div>
          <div className="lb-section-tag" style={{ justifyContent: 'center' }}>⬇️ Direct Download</div>
          <h1
            style={{
              fontFamily: 'Nunito', fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: '#1A3A4C', letterSpacing: '-0.02em', marginBottom: 18,
            }}
          >
            Get <span className="lb-gradient-text">LingoBird</span> — Free Forever
          </h1>
          <p style={{ color: '#4A7A96', fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.7, marginBottom: 32, maxWidth: 560, margin: '0 auto 32px' }}>
            Install LingoBird directly into Chrome and transform WhatsApp Web into your cozy language-learning companion in under 2 minutes.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            <a
              href="#install-steps"
              className="lb-btn-primary"
              style={{ fontSize: '1.05rem', padding: '15px 32px' }}
            >
              ⬇️ Installation Steps
            </a>
            <Link
              href="/how-to-use"
              className="lb-btn-secondary"
              style={{ fontSize: '1.05rem', padding: '14px 28px' }}
            >
              📖 Setup Guide
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section style={{ background: 'white', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="lb-section-tag" style={{ justifyContent: 'center' }}>📦 What You Get</div>
            <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '2rem', color: '#1A3A4C' }}>
              Everything <span className="lb-gradient-text">Included</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { emoji: '🌐', title: 'WhatsApp Overlay', desc: 'Full content script with Shadow DOM isolation — zero CSS conflicts with WhatsApp.' },
              { emoji: '🧠', title: 'Dual-Layer AI', desc: '4 translation providers + 3 AI explanation engines, all configurable from the popup.' },
              { emoji: '📚', title: 'SRS Flashcards', desc: 'SM-2 spaced repetition deck built right into the extension popup.' },
              { emoji: '🎓', title: 'Lesson + Quiz Mode', desc: 'Structured lessons and multiple-choice quizzes from your saved vocabulary.' },
              { emoji: '🔒', title: 'AES-GCM Encryption', desc: 'API keys encrypted before storage. Your keys never leave your device in plaintext.' },
              { emoji: '💽', title: 'Local Cache', desc: 'SHA-256 hash cache via Dexie/IndexedDB — never translates the same text twice.' },
            ].map(item => (
              <div
                key={item.title}
                className="lb-card-feature"
                style={{ padding: 24, textAlign: 'center' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>{item.emoji}</div>
                <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '0.95rem', color: '#1A3A4C', marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: '0.82rem', color: '#4A7A96', fontWeight: 600, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="lb-sky-bg" style={{ padding: '72px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="lb-section-tag" style={{ justifyContent: 'center' }}>💻 Requirements</div>
            <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '2rem', color: '#1A3A4C' }}>
              System <span className="lb-gradient-text">Requirements</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {[
              {
                title: '⚙️ Browser Compatibility',
                items: [
                  { label: 'Google Chrome', value: 'Version 88+ (127+ for Built-in AI)' },
                  { label: 'Chromium Browsers', value: 'Brave, Edge, Opera, Vivaldi' },
                  { label: 'Operating System', value: 'Windows, macOS, or Linux' },
                  { label: 'Platform', value: 'WhatsApp Web (web.whatsapp.com)' },
                ],
                color: '#169FE5',
                bg: 'rgba(22,159,229,0.08)',
              },
              {
                title: '🔑 Optional AI Integrations',
                items: [
                  { label: 'Gemini API', value: 'Free key from Google AI Studio' },
                  { label: 'Google Translate', value: 'Optional API key via Google Cloud' },
                  { label: 'DeepL', value: 'Free or Pro key at deepl.com' },
                  { label: 'Ollama', value: 'Free local AI on your computer' },
                ],
                color: '#9B7FE8',
                bg: 'rgba(155,127,232,0.08)',
              },
            ].map(box => (
              <div key={box.title} style={{ background: box.bg, border: `2px solid ${box.color}22`, borderRadius: 20, padding: 28 }}>
                <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '1rem', color: box.color, marginBottom: 18 }}>{box.title}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {box.items.map(item => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{ fontSize: '0.85rem', color: '#4A7A96', fontWeight: 800, flexShrink: 0 }}>{item.label}</span>
                      <span style={{ fontSize: '0.82rem', color: '#7BAFC8', fontWeight: 600, textAlign: 'right' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section id="install-steps" style={{ background: 'white', padding: '72px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="lb-section-tag" style={{ justifyContent: 'center' }}>📦 Installation</div>
            <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '2rem', color: '#1A3A4C' }}>
              Install in Chrome in <span className="lb-gradient-text">3 Simple Steps</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              {
                num: 1,
                title: 'Download the Extension Package',
                desc: 'Download the extension package (.zip) and extract the folder onto your computer.',
                code: `1. Click the download package link\n2. Extract the .zip file to a folder (e.g., Desktop or Documents)\n3. Keep the extracted folder handy`,
                color: '#169FE5',
              },
              {
                num: 2,
                title: 'Enable Developer Mode in Chrome',
                desc: 'Open the Chrome extensions manager and toggle developer mode.',
                code: `1. Open Google Chrome and go to: chrome://extensions\n2. Turn ON the "Developer mode" toggle in the top-right corner\n3. Three new buttons will appear at the top-left`,
                color: '#9B7FE8',
              },
              {
                num: 3,
                title: 'Load Unpacked & Start Learning!',
                desc: 'Select the extracted folder and start learning on WhatsApp Web.',
                code: `1. Click "Load unpacked" at top-left\n2. Select your extracted LingoBird folder\n3. Pin the 🐦 icon to your toolbar\n4. Open web.whatsapp.com and begin learning!`,
                color: '#76B87A',
              },
            ].map(step => (
              <div
                key={step.num}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: 24,
                  alignItems: 'flex-start',
                }}
              >
                <div className="lb-step-num" style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}BB)` }}>
                  {step.num}
                </div>
                <div
                  style={{
                    background: '#F8FBFF',
                    border: '1.5px solid #C8E0F0',
                    borderRadius: 20,
                    padding: 24,
                  }}
                >
                  <h3 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '1.1rem', color: '#1A3A4C', marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: '#4A7A96', fontWeight: 700, marginBottom: 16 }}>{step.desc}</p>
                  <pre
                    style={{
                      background: '#1A3A4C',
                      color: '#5EC5F5',
                      borderRadius: 14,
                      padding: '14px 18px',
                      fontSize: '0.82rem',
                      fontFamily: 'monospace',
                      margin: 0,
                      overflow: 'auto',
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.8,
                    }}
                  >
                    {step.code}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ollama CORS note */}
      <section className="lb-sky-bg" style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div
            style={{
              background: 'rgba(255,158,94,0.08)',
              border: '2px solid rgba(255,158,94,0.3)',
              borderRadius: 24,
              padding: 32,
            }}
          >
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ fontSize: '2rem', flexShrink: 0 }}>🦙</div>
              <div>
                <h3 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '1.1rem', color: '#1A3A4C', marginBottom: 12 }}>
                  Using Ollama? Enable CORS First
                </h3>
                <p style={{ color: '#4A7A96', fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.7, marginBottom: 16 }}>
                  Ollama blocks requests from <code style={{ background: '#E8F4FD', padding: '2px 6px', borderRadius: 6, color: '#169FE5' }}>chrome-extension://</code> origins by default. Start it with the CORS environment variable:
                </p>
                <pre style={{ background: '#1A3A4C', color: '#5EC5F5', borderRadius: 14, padding: '14px 18px', fontSize: '0.82rem', fontFamily: 'monospace', margin: 0, whiteSpace: 'pre-wrap' }}>
{`# macOS / Linux
OLLAMA_ORIGINS="chrome-extension://*" ollama serve

# Windows (PowerShell)
$env:OLLAMA_ORIGINS="chrome-extension://*"; ollama serve`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Firefox note */}
      <section style={{ background: 'white', padding: '60px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ background: 'rgba(22,159,229,0.06)', border: '2px solid rgba(22,159,229,0.2)', borderRadius: 24, padding: 28, textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>🦊</div>
            <h3 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '1.1rem', color: '#1A3A4C', marginBottom: 10 }}>Firefox Support</h3>
            <p style={{ color: '#4A7A96', fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
              Firefox support is not currently available. LingoBird uses Chrome-specific APIs (chrome.storage, Shadow DOM in MV3, Chrome Built-in Translator). Firefox compatibility is on the roadmap.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #169FE5 0%, #0878B8 100%)', padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '2rem', color: 'white', marginBottom: 12 }}>
            Questions? We&apos;re Here to Help 🐦
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', fontWeight: 600, marginBottom: 28 }}>
            Have questions about setup or need troubleshooting help? Send us a note.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'white', color: '#169FE5',
              fontFamily: 'Nunito', fontWeight: 800, fontSize: '1rem',
              padding: '13px 28px', borderRadius: 50, textDecoration: 'none',
            }}>
              💬 Contact Support
            </Link>
            <Link href="/how-to-use" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.15)', color: 'white',
              fontFamily: 'Nunito', fontWeight: 800, fontSize: '1rem',
              padding: '13px 28px', borderRadius: 50, textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.35)',
            }}>
              📖 View Setup Guide
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
