import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — LingoBird',
  description:
    'LingoBird Privacy Policy. We prioritize your privacy: no chat logging, AES-GCM encrypted local credentials, on-device translation options, and zero data selling.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 28, 2026';

  const sections = [
    {
      id: 'overview',
      title: '1. Overview & Single Purpose',
      content: `LingoBird is a language learning browser extension designed specifically to assist users while communicating on WhatsApp Web. Our single purpose is to provide real-time translations, AI-powered grammar and nuance explanations, and spaced-repetition vocabulary flashcards. 

We firmly believe that personal conversations should remain private. LingoBird is designed around local-first data principles: we do not maintain central servers that collect, log, or track your private chats, contact lists, or personal identification.`,
    },
    {
      id: 'data-collection',
      title: '2. Information We Do (and Do Not) Collect',
      subsections: [
        {
          heading: 'Chat Messages & WhatsApp Data',
          text: 'LingoBird NEVER automatically reads, records, scans, or exports your chat logs. The extension only accesses the text of an individual message bubble when you explicitly click on it to request a translation or AI explanation. Once translated, results are saved only to your local browser storage (IndexedDB / Dexie cache) on your own device.',
        },
        {
          heading: 'API Keys & Credentials',
          text: 'If you choose to use third-party AI or translation providers (such as Google Gemini, DeepL, or Google Cloud Translate), your API keys are encrypted using industry-standard AES-GCM (256-bit) encryption before being saved locally in chrome.storage.local. The encryption key is randomly generated on your device and is never transmitted to us or any remote server.',
        },
        {
          heading: 'Personal Data & Analytics',
          text: 'We do not collect personal identifiers such as your name, email address, phone number, IP address, or device fingerprint. We do not use third-party behavioral analytics, telemetry tracking, or tracking cookies inside the extension.',
        },
        {
          heading: 'Saved Vocabulary & Review Data',
          text: 'Words, idioms, and definitions you choose to save into your spaced repetition (SM-2) deck are stored entirely on your computer within your browser profile. You can export or delete this data at any time from the extension popup.',
        },
      ],
    },
    {
      id: 'permissions',
      title: '3. Browser Permissions & Justifications',
      subsections: [
        {
          heading: 'storage',
          text: 'Required to store your language preferences (e.g. Spanish to English), locally encrypted API keys, and your personal SRS vocabulary deck in your local browser storage.',
        },
        {
          heading: 'scripting & activeTab',
          text: 'Used to safely inject the LingoBird translation bubble and gloss overlay directly into the active WhatsApp Web tab when you interact with the extension. The overlay runs inside an isolated Shadow DOM to prevent any styling or script conflicts with WhatsApp.',
        },
        {
          heading: 'declarativeNetRequest',
          text: 'Used solely to manage required cross-origin headers (such as CORS) when connecting to self-hosted, on-device AI backends (e.g., local Ollama instances at localhost:11434) from within the extension without exposing external network requests.',
        },
        {
          heading: 'alarms',
          text: 'Used locally to schedule periodic flashcard review notifications when your saved vocabulary words are due for repetition according to the SM-2 algorithm, and for local cache maintenance.',
        },
        {
          heading: 'Host Permission (web.whatsapp.com)',
          text: 'Restricted strictly to web.whatsapp.com to enable the interactive click-to-translate and glossing overlays directly on message bubbles inside your WhatsApp Web chats.',
        },
      ],
    },
    {
      id: 'third-parties',
      title: '4. Third-Party Services & Remote Processing',
      content: `When you request a translation or AI explanation, text is processed only according to the provider you have chosen in your settings:
• Chrome Built-in AI / Translator: 100% on-device processing. No text leaves your computer.
• Local Ollama: 100% on-device processing on your localhost instance. No network transmission.
• Cloud Providers (Gemini Flash, DeepL, Google Translate): Only the specific phrase you select is transmitted securely via HTTPS directly to that provider's official API using your own API key. Please consult their respective privacy policies regarding how they handle standard API traffic. We never route your requests through an intermediate proxy server.`,
    },
    {
      id: 'remote-code',
      title: '5. No Remote Code Execution',
      content: `In compliance with Manifest V3 and browser developer security policies, LingoBird does NOT load or execute remote code, remote scripts, or dynamic WebAssembly. 100% of all executable logic, components, and libraries are packaged locally within the published extension archive.`,
    },
    {
      id: 'data-sharing',
      title: '6. Zero Data Sale or Transfer',
      content: `We certify that:
1. We do not sell, rent, monetize, or transfer any user data to third-party data brokers, advertising networks, or marketing platforms.
2. We do not use or transfer user data for assessing creditworthiness or lending purposes.
3. User data is used strictly to provide and improve the core language learning functionality requested directly by the user.`,
    },
    {
      id: 'contact',
      title: '7. Contact Us & Data Rights',
      content: `Because all your data is stored locally on your device, you have complete control over it. You can clear your saved cards, cache, and settings at any time by clicking "Reset Data" in the extension popup or by uninstalling the extension.

If you have any questions or feedback regarding this Privacy Policy, please reach out to us via our contact page: https://lingobird.vercel.app/contact or email us directly at support@lingobird.app.`,
    },
  ];

  return (
    <main style={{ paddingTop: 68, minHeight: '100vh', background: 'linear-gradient(180deg, #FFF3E0 0%, #FFF8F0 100%)' }}>

      {/* Header */}
      <section style={{ padding: '64px 24px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div className="sb-tag" style={{ marginBottom: 16 }}>🔒 Privacy & Data Protection</div>
          <h1
            style={{
              fontFamily: 'Fredoka, Baloo 2, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              color: '#5A3E36',
              marginBottom: 16,
            }}
          >
            LingoBird <span className="sb-gradient-text">Privacy Policy</span>
          </h1>
          <p style={{ color: '#8B6359', fontSize: '1rem', fontWeight: 600, lineHeight: 1.7, maxWidth: 580, margin: '0 auto' }}>
            We built LingoBird with a privacy-first mindset. Your chats are yours alone — no logging, no tracking, and no data sales.
          </p>
          <div style={{ marginTop: 12, color: '#B0887D', fontFamily: 'Caveat, cursive', fontSize: '1.1rem' }}>
            Last updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div
            className="sb-card"
            style={{
              padding: '40px 36px',
              display: 'flex',
              flexDirection: 'column',
              gap: 36,
            }}
          >
            {sections.map(sec => (
              <div key={sec.id} style={{ borderBottom: sec.id === 'contact' ? 'none' : '1.5px dashed #FFD9B3', paddingBottom: sec.id === 'contact' ? 0 : 32 }}>
                <h2
                  style={{
                    fontFamily: 'Fredoka, Baloo 2, sans-serif',
                    fontSize: '1.4rem',
                    color: '#5A3E36',
                    marginBottom: 14,
                    fontWeight: 600,
                  }}
                >
                  {sec.title}
                </h2>

                {sec.content && (
                  <p
                    style={{
                      color: '#5A3E36',
                      lineHeight: 1.8,
                      fontSize: '0.96rem',
                      fontWeight: 500,
                      whiteSpace: 'pre-line',
                      margin: 0,
                    }}
                  >
                    {sec.content}
                  </p>
                )}

                {sec.subsections && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 12 }}>
                    {sec.subsections.map(sub => (
                      <div
                        key={sub.heading}
                        style={{
                          background: '#FFF8F0',
                          border: '2px solid #FFD9B3',
                          borderRadius: 16,
                          padding: '16px 20px',
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: 'Fredoka, Baloo 2, sans-serif',
                            fontSize: '1.05rem',
                            color: '#E76F51',
                            margin: '0 0 6px',
                            fontWeight: 600,
                          }}
                        >
                          {sub.heading}
                        </h3>
                        <p
                          style={{
                            color: '#5A3E36',
                            lineHeight: 1.7,
                            fontSize: '0.92rem',
                            fontWeight: 500,
                            margin: 0,
                          }}
                        >
                          {sub.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick links banner */}
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link href="/" className="sb-btn" style={{ textDecoration: 'none' }}>
              ← Return to Home
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
