import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'AI Models — Translation & Explanation Providers',
  description:
    'Understand how LingoBird\'s two-layer AI architecture works. Compare Chrome Built-in, Google Translate, DeepL, LibreTranslate, Gemini, Ollama, and Chrome Prompt API.',
};

function ScreenshotPlaceholder({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="lb-screenshot-frame" style={{ minHeight: 220 }}>
      <Image src="/lingobird-icon.png" alt="placeholder" width={40} height={40} style={{ opacity: 0.35, borderRadius: 10 }} />
      <div>
        <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800, color: '#169FE5' }}>📸 {label}</p>
        <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#7BAFC8', fontWeight: 600 }}>{hint}</p>
      </div>
    </div>
  );
}

export default function AIModelsPage() {
  return (
    <main style={{ paddingTop: 68 }}>

      {/* Hero */}
      <section className="lb-sky-bg lb-grid-bg" style={{ padding: '72px 24px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="lb-section-tag" style={{ justifyContent: 'center' }}>🤖 Under the Hood</div>
          <h1
            style={{
              fontFamily: 'Nunito', fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: '#1A3A4C', letterSpacing: '-0.02em', marginBottom: 18,
            }}
          >
            Two-Layer AI Architecture — <span className="lb-gradient-text">Fast + Deep</span>
          </h1>
          <p style={{ color: '#4A7A96', fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.7, maxWidth: 580, margin: '0 auto' }}>
            LingoBird uses a clever two-layer system: Layer 1 is fast translation for instant results, Layer 2 is deep AI for full linguistic explanations.
          </p>
        </div>
      </section>

      {/* Architecture diagram */}
      <section style={{ background: 'white', padding: '72px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '1.8rem', color: '#1A3A4C', textAlign: 'center', marginBottom: 40 }}>
            How the <span className="lb-gradient-text">Two Layers Work</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'center' }}>
            {/* Layer 1 */}
            <div
              style={{
                background: 'linear-gradient(135deg, #E8F8FF 0%, #D6EEFA 100%)',
                border: '2px solid #A8D4EE',
                borderRadius: 24,
                padding: 32,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>⚡</div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '1.2rem', color: '#169FE5', marginBottom: 8 }}>Layer 1 — Fast</div>
              <div style={{ fontSize: '0.85rem', color: '#4A7A96', fontWeight: 700, marginBottom: 16, lineHeight: 1.6 }}>
                Instant translation on every message click. Cached in local IndexedDB for zero repeat cost.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['🌐 Chrome Built-in', '🔤 Google Translate', '🎯 DeepL', '🔓 LibreTranslate'].map(p => (
                  <div key={p} style={{ background: 'white', border: '1.5px solid #C8E0F0', borderRadius: 10, padding: '8px 14px', fontSize: '0.85rem', fontWeight: 700, color: '#169FE5' }}>{p}</div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div style={{ textAlign: 'center', color: '#A8D4EE', fontSize: '1.5rem' }}>+</div>

            {/* Layer 2 */}
            <div
              style={{
                background: 'linear-gradient(135deg, #F5F0FF 0%, #EDE5FF 100%)',
                border: '2px solid #C9B8F0',
                borderRadius: 24,
                padding: 32,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🧠</div>
              <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '1.2rem', color: '#9B7FE8', marginBottom: 8 }}>Layer 2 — Deep</div>
              <div style={{ fontSize: '0.85rem', color: '#4A7A96', fontWeight: 700, marginBottom: 16, lineHeight: 1.6 }}>
                Triggered manually by clicking &quot;Explain&quot;. Full linguistic breakdown via your chosen AI.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['✨ Gemini API', '🦙 Ollama (Local)', '🔮 Chrome Prompt API'].map(p => (
                  <div key={p} style={{ background: 'white', border: '1.5px solid #C9B8F0', borderRadius: 10, padding: '8px 14px', fontSize: '0.85rem', fontWeight: 700, color: '#9B7FE8' }}>{p}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Translation Providers */}
      <section className="lb-sky-bg" style={{ padding: '72px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="lb-section-tag" style={{ justifyContent: 'center' }}>⚡ Layer 1</div>
            <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '2rem', color: '#1A3A4C' }}>
              Translation <span className="lb-gradient-text">Providers</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: 24 }}>
            {[
              {
                name: 'Chrome Built-in Translator',
                emoji: '🌐',
                tag: 'Free · On-Device · Recommended',
                tagColor: '#76B87A',
                pros: ['Zero cost', '100% on-device privacy', 'Works offline', 'No API key needed'],
                cons: ['Chrome 127+ only', '~37 languages', 'No custom models'],
                setup: 'Works out of the box on Chrome 127+. Enable via Settings → Providers.',
                color: '#76B87A',
                bg: 'rgba(118,184,122,0.08)',
              },
              {
                name: 'Google Cloud Translate',
                emoji: '🔤',
                tag: 'Pay-per-use · Cloud · 100+ Languages',
                tagColor: '#169FE5',
                pros: ['100+ languages', 'Very fast', 'High accuracy'],
                cons: ['Requires billing account', 'Data sent to Google cloud', 'API key required'],
                setup: 'Get a key at console.cloud.google.com → Enable Translation API → paste into LingoBird settings.',
                color: '#169FE5',
                bg: 'rgba(22,159,229,0.08)',
              },
              {
                name: 'DeepL',
                emoji: '🎯',
                tag: 'Free Tier · Premium Quality',
                tagColor: '#9B7FE8',
                pros: ['Industry-leading accuracy', 'Free tier: 500K chars/month', 'Great for European languages'],
                cons: ['Fewer languages than Google', 'Free tier has monthly limit', 'API key required'],
                setup: 'Sign up at deepl.com → Developers → copy your API key → paste into LingoBird.',
                color: '#9B7FE8',
                bg: 'rgba(155,127,232,0.08)',
              },
              {
                name: 'LibreTranslate',
                emoji: '🔓',
                tag: 'Free · Self-Hosted · Offline Ready',
                tagColor: '#0EA5AC',
                pros: ['Completely free', 'Self-hosted = full privacy', 'No rate limits on own instance'],
                cons: ['Requires self-hosting setup', 'Lower accuracy than cloud', 'CORS config needed'],
                setup: 'Deploy LibreTranslate via Docker, then set your host URL in LingoBird settings.',
                color: '#0EA5AC',
                bg: 'rgba(14,165,172,0.08)',
              },
            ].map(p => (
              <div key={p.name} className="lb-card" style={{ padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: p.bg, border: `2px solid ${p.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', flexShrink: 0 }}>{p.emoji}</div>
                  <div>
                    <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '1.05rem', color: '#1A3A4C' }}>{p.name}</div>
                    <span style={{ background: `${p.tagColor}18`, color: p.tagColor, borderRadius: 50, padding: '3px 10px', fontSize: '0.72rem', fontWeight: 800 }}>{p.tag}</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#76B87A', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>✓ Pros</div>
                    {p.pros.map(item => (
                      <div key={item} style={{ fontSize: '0.82rem', color: '#4A7A96', fontWeight: 700, marginBottom: 4 }}>• {item}</div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#E05D52', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>✗ Cons</div>
                    {p.cons.map(item => (
                      <div key={item} style={{ fontSize: '0.82rem', color: '#4A7A96', fontWeight: 700, marginBottom: 4 }}>• {item}</div>
                    ))}
                  </div>
                </div>

                <div style={{ background: '#F0F8FF', border: '1.5px solid #C8E0F0', borderRadius: 14, padding: 14 }}>
                  <div style={{ fontSize: '0.72rem', color: '#7BAFC8', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>⚙️ Setup</div>
                  <div style={{ fontSize: '0.83rem', color: '#4A7A96', fontWeight: 700, lineHeight: 1.6 }}>{p.setup}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Explanation Providers */}
      <section style={{ background: 'white', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="lb-section-tag" style={{ justifyContent: 'center' }}>🧠 Layer 2</div>
            <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '2rem', color: '#1A3A4C' }}>
              AI Explanation <span className="lb-gradient-text-warm">Engines</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
            {[
              {
                name: 'Gemini API',
                emoji: '✨',
                model: 'gemini-3.6-flash (default)',
                color: '#169FE5',
                bg: 'rgba(22,159,229,0.08)',
                desc: 'Google\'s Gemini Flash is fast, accurate, and has a generous free tier. Perfect for detailed grammar explanations with low latency.',
                features: ['Free tier via AI Studio', 'Configurable model name', 'Keys encrypted with AES-GCM', 'Supports all languages'],
                setupSteps: [
                  'Get a free key at aistudio.google.com/apikey',
                  'In LingoBird popup → Settings → Providers',
                  'Paste your Gemini API key',
                  'Click Save — key is immediately encrypted',
                ],
              },
              {
                name: 'Ollama (Local)',
                emoji: '🦙',
                model: 'llama3 (default, configurable)',
                color: '#9B7FE8',
                bg: 'rgba(155,127,232,0.08)',
                desc: 'Run any LLM completely on your own machine. Zero API cost, maximum privacy. Ideal if you\'re already using Ollama.',
                features: ['100% local & private', 'Any Ollama model', 'No API key needed', 'Configurable host URL'],
                setupSteps: [
                  'Install Ollama from ollama.ai',
                  'Start with OLLAMA_ORIGINS="chrome-extension://*" ollama serve',
                  'Set host URL in LingoBird (default: localhost:11434)',
                  'Choose your model (llama3, mistral, etc.)',
                ],
              },
              {
                name: 'Chrome Prompt API',
                emoji: '🔮',
                model: 'Gemini Nano (built into Chrome)',
                color: '#0EA5AC',
                bg: 'rgba(14,165,172,0.08)',
                desc: 'Experimental on-device AI built directly into Chrome. No API key, no setup, fully private. Enable a Chrome flag and it works.',
                features: ['Truly on-device', 'No API key needed', 'Chrome flag required', 'Experimental feature'],
                setupSteps: [
                  'Open chrome://flags/#optimization-guide-on-device-model',
                  'Enable "Prompt API for Gemini Nano"',
                  'Restart Chrome',
                  'Select Chrome Prompt API in LingoBird settings',
                ],
              },
            ].map(p => (
              <div key={p.name} className="lb-card-feature" style={{ padding: 30 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>{p.emoji}</div>
                  <div>
                    <div style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '1.1rem', color: '#1A3A4C' }}>{p.name}</div>
                    <div style={{ fontSize: '0.75rem', color: p.color, fontWeight: 700 }}>{p.model}</div>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#4A7A96', fontWeight: 700, lineHeight: 1.7, marginBottom: 18 }}>{p.desc}</p>

                <ScreenshotPlaceholder label={`${p.name} Configuration`} hint={`Screenshot: Configuring ${p.name} in LingoBird settings`} />

                <div style={{ marginTop: 18 }}>
                  <div style={{ fontSize: '0.72rem', color: '#7BAFC8', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>⚙️ Setup Steps</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {p.setupSteps.map((step, i) => (
                      <div key={step} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: '50%',
                          background: `${p.color}22`, color: p.color,
                          fontFamily: 'Nunito', fontWeight: 900, fontSize: '0.75rem',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>{i + 1}</div>
                        <div style={{ fontSize: '0.82rem', color: '#4A7A96', fontWeight: 700, paddingTop: 2 }}>{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #169FE5 0%, #0878B8 100%)', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div className="animate-float" style={{ marginBottom: 16 }}>
            <Image src="/lingobird-logo.png" alt="LingoBird" width={64} height={64} style={{ display: 'block', margin: '0 auto', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.2))' }} />
          </div>
          <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '2rem', color: 'white', marginBottom: 12 }}>
            Ready to Pick Your Stack?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', fontWeight: 600, marginBottom: 28 }}>
            Start free with Chrome Built-in + Gemini API. Swap providers anytime in settings.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            <Link href="/download" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'white', color: '#169FE5',
              fontFamily: 'Nunito', fontWeight: 800, fontSize: '1rem',
              padding: '13px 28px', borderRadius: 50, textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}>
              🐦 Get LingoBird Free
            </Link>
            <Link href="/how-to-use" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.15)', color: 'white',
              fontFamily: 'Nunito', fontWeight: 800, fontSize: '1rem',
              padding: '13px 28px', borderRadius: 50, textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.35)',
            }}>
              📖 Setup Guide
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
