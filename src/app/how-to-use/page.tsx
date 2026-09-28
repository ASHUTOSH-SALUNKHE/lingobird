import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'How to Use — Complete Setup & User Guide',
  description:
    'Step-by-step guide to installing, configuring, and getting the most out of LingoBird. Covers installation, language setup, AI providers, translation, flashcards, and FAQs.',
};

function ScreenshotPlaceholder({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="lb-screenshot-frame" style={{ minHeight: 200 }}>
      <Image src="/lingobird-icon.png" alt="placeholder" width={40} height={40} style={{ opacity: 0.35, borderRadius: 10 }} />
      <div>
        <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800, color: '#169FE5' }}>📸 {label}</p>
        <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#7BAFC8', fontWeight: 600 }}>{hint}</p>
      </div>
    </div>
  );
}

export default function HowToUsePage() {
  const steps = [
    {
      id: 'install',
      num: '01',
      title: 'Install the Extension',
      emoji: '📦',
      color: '#169FE5',
      bg: 'rgba(22,159,229,0.08)',
      desc: 'LingoBird is not on the Chrome Web Store yet — you load the extension package directly into Chrome. It only takes 2 minutes!',
      instructions: [
        {
          title: 'Step 1: Download the extension package',
          text: 'Download the LingoBird extension package (.zip) from our Download page and extract it to a folder on your computer.',
        },
        {
          title: 'Step 2: Enable Chrome Developer Mode',
          text: 'Navigate to chrome://extensions in Chrome, and toggle on "Developer mode" in the top-right corner.',
        },
        {
          title: 'Step 3: Load the extension',
          text: 'Click "Load unpacked" and select your extracted LingoBird folder. The bird icon will appear in your toolbar!',
        },
      ],
      screenshotLabel: 'Chrome Extensions → Load Unpacked',
      screenshotHint: 'Screenshot: Chrome extension developer mode with LingoBird loaded',
    },
    {
      id: 'languages',
      num: '02',
      title: 'Set Your Language Pair',
      emoji: '🌍',
      color: '#76B87A',
      bg: 'rgba(118,184,122,0.08)',
      desc: 'Click the LingoBird bird icon in your Chrome toolbar to open the popup. Set your source and target languages.',
      instructions: [
        { title: 'Open LingoBird popup', text: 'Click the 🐦 icon in your Chrome toolbar (pin it for quick access).' },
        { title: 'Choose your languages', text: 'Select source language (the language you\'re learning) and target language (your native language). Use the ↔ button to swap them.' },
        { title: 'Start a WhatsApp chat', text: 'Navigate to web.whatsapp.com and open any conversation. The LingoBird mode pill appears in the top-right.' },
      ],
      screenshotLabel: 'LingoBird Popup — Language Picker',
      screenshotHint: 'Screenshot: Popup showing language pair selector with swap button',
    },
    {
      id: 'duo-ai',
      num: '03',
      title: 'Configure Duo AI & Cloud Explanations',
      emoji: '🤖',
      color: '#169FE5',
      bg: 'rgba(22,159,229,0.08)',
      desc: 'Set up your AI explanation engine (Gemini or Chrome Prompt API). Duo AI provides deep grammatical insights, usage notes, and formality analysis.',
      instructions: [
        { title: 'Free Gemini API Key', text: 'Get your free key from Google AI Studio (aistudio.google.com/apikey). Paste it into LingoBird Popup → Settings → Providers.' },
        { title: 'Chrome Prompt API (Zero Setup)', text: 'On Chrome 127+, enable chrome://flags/#optimization-guide-on-device-model for built-in Gemini Nano.' },
        { title: 'Encrypted Storage', text: 'Keys are immediately encrypted with AES-GCM (256-bit) and never leave your browser.' },
      ],
      screenshotLabel: 'Duo AI Explanation Setup & Popup',
      screenshotHint: 'Screenshot: Configuring Duo AI in Settings + Duo AI explanation popover in chat',
    },
    {
      id: 'local-ai',
      num: '04',
      title: 'Configure Local AI (Ollama) for 100% Privacy',
      emoji: '💻',
      color: '#76B87A',
      bg: 'rgba(118,184,122,0.08)',
      desc: 'Want completely offline, zero-data-leakage AI? Connect LingoBird to your locally running Ollama instance with Llama 3 or Gemma 2.',
      instructions: [
        { title: 'Start Ollama with Browser CORS', code: 'export OLLAMA_ORIGINS="chrome-extension://*,http://localhost:*"\nollama serve' },
        { title: 'Pull your favorite model', code: 'ollama run llama3.2' },
        { title: 'Set Host in LingoBird', text: 'In Settings → Provider: choose "Ollama", set Host: http://localhost:11434, and Model: llama3.2.' },
      ],
      screenshotLabel: 'Configuring Local AI (Ollama)',
      screenshotHint: 'Screenshot: Local AI endpoint settings and terminal running Ollama',
    },
    {
      id: 'learning-mode',
      num: '05',
      title: 'Enable Learning Mode & Word Glosses',
      emoji: '🎓',
      color: '#FF9E5E',
      bg: 'rgba(255,158,94,0.08)',
      desc: 'Toggle between Normal Mode (lightweight) and Learning Mode (full features). Learning Mode unlocks word glosses and live compose translation.',
      instructions: [
        { title: 'Find the mode pill', text: 'In any WhatsApp chat, look for the LingoBird pill in the top-right corner of the chat area.' },
        { title: 'Toggle to Learning Mode', text: 'Click the pill to switch. It turns blue and shows a graduation cap icon 🎓 when active.' },
        { title: 'Word glosses', text: 'Hover any underlined word to see its instant translation and grammatical breakdown.' },
      ],
      screenshotLabel: 'Mode Pill — Learning vs Normal',
      screenshotHint: 'Screenshot: LingoBird pill in Learning Mode with underlined word glosses',
    },
    {
      id: 'translating',
      num: '06',
      title: 'Translate Messages',
      emoji: '💬',
      color: '#0EA5AC',
      bg: 'rgba(14,165,172,0.08)',
      desc: 'Click any message bubble to instantly translate it. A popover appears with the translation and an Explain button.',
      instructions: [
        { title: 'Click a message', text: 'Click on any message bubble in a WhatsApp conversation. A popover appears above the message.' },
        { title: 'See the translation', text: 'The Layer 1 translation appears instantly (from cache if seen before, otherwise from your provider).' },
        { title: 'Dismiss the popover', text: 'Click anywhere outside the popover to dismiss it, or press Escape.' },
      ],
      screenshotLabel: 'Message Popover with Translation',
      screenshotHint: 'Screenshot: WhatsApp message with LingoBird translation popover',
    },
    {
      id: 'explaining',
      num: '07',
      title: 'Get Deep AI Explanations',
      emoji: '🧠',
      color: '#9B7FE8',
      bg: 'rgba(155,127,232,0.08)',
      desc: 'After translating, click the Explain button to get a full linguistic breakdown from your chosen AI engine.',
      instructions: [
        { title: 'Click Explain', text: 'In the translation popover, click the "Explain" button. LingoBird sends the text to your AI provider.' },
        { title: 'Review the breakdown', text: 'You\'ll see literal meaning, part of speech, usage notes, a native example sentence, and tone/formality info.' },
        { title: 'Save to vocabulary', text: 'Click "Save to vocabulary" to add words to your SRS flashcard deck for later review.' },
      ],
      screenshotLabel: 'Deep AI Explanation Panel',
      screenshotHint: 'Screenshot: Expanded explanation card with grammar breakdown',
    },
    {
      id: 'flashcards',
      num: '08',
      title: 'Review Flashcards',
      emoji: '📚',
      color: '#76B87A',
      bg: 'rgba(118,184,122,0.08)',
      desc: 'Open the LingoBird popup and tap "Due Now" to start a spaced-repetition flashcard session.',
      instructions: [
        { title: 'Open the popup', text: 'Click the 🐦 icon in the Chrome toolbar.' },
        { title: 'Check due cards', text: 'The "Due now" counter shows how many words are ready for review today based on the SM-2 schedule.' },
        { title: 'Rate your recall', text: 'For each card: Again (forgot), Hard, Good, or Easy. The algorithm schedules the next review automatically.' },
      ],
      screenshotLabel: 'Flashcard Review Session',
      screenshotHint: 'Screenshot: Flashcard popup with word, answer, and SM-2 rating buttons',
    },
    {
      id: 'lessons',
      num: '09',
      title: 'Lesson & Quiz Modes',
      emoji: '🎯',
      color: '#F585B0',
      bg: 'rgba(245,133,176,0.08)',
      desc: 'LingoBird also includes a full Lesson Mode and Quiz Mode to drill your saved vocabulary in structured sessions.',
      instructions: [
        { title: 'Open Lesson Mode', text: 'In the popup, tap "Lessons" to enter a guided lesson using your saved vocabulary words.' },
        { title: 'Take a Quiz', text: 'Tap "Quiz" for a multiple-choice quiz based on your saved words. Great for drilling recall.' },
        { title: 'Export your vocabulary', text: 'Export your entire saved vocabulary to CSV or JSON from the popup for use in other apps.' },
      ],
      screenshotLabel: 'Lesson Mode & Quiz',
      screenshotHint: 'Screenshot: Lesson Mode interface with vocabulary questions',
    },
  ];

  const faqs = [
    { q: 'Is LingoBird free?', a: 'Yes! The extension itself is completely free to use. You only pay if you use a paid provider like Google Cloud Translate or DeepL Pro — Chrome Built-in and Ollama are entirely free.' },
    { q: 'Does LingoBird read my WhatsApp messages?', a: 'LingoBird reads message text only when you click on a message to translate it. It does not scan, store, or upload your messages. Translation results are cached locally in IndexedDB on your device.' },
    { q: 'How is my API key secured?', a: 'All API keys are encrypted with AES-GCM (256-bit) before being stored in chrome.storage.local. The encryption key is randomly generated per-device and never transmitted anywhere.' },
    { q: 'What\'s the best provider combo for beginners?', a: 'Chrome Built-in Translator (free, on-device) for Layer 1 + Gemini API (free tier from AI Studio) for Layer 2. This gives you excellent quality at zero cost.' },
    { q: 'Can I use LingoBird offline?', a: 'Partly. If you use Chrome Built-in as your translation provider, translation works offline. AI explanations (Gemini, Chrome Prompt API) also work offline if using on-device models. Cloud providers require internet.' },
    { q: 'Why do I need to enable Developer Mode in Chrome?', a: 'LingoBird is not yet published to the Chrome Web Store, so you must load it as an unpacked extension. This requires Chrome\'s Developer Mode toggle. It\'s perfectly safe for personal use.' },
    { q: 'What languages are supported?', a: 'Any ISO 639-1 language pair. Chrome Built-in supports ~37 languages. Google Translate and DeepL support 100+. You\'re not limited to any particular language.' },
  ];

  return (
    <main style={{ paddingTop: 68 }}>

      {/* Hero */}
      <section className="lb-sky-bg lb-grid-bg" style={{ padding: '72px 24px 64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          <div>
            <div className="lb-section-tag">📖 Complete Guide</div>
            <h1
              style={{
                fontFamily: 'Nunito', fontWeight: 900,
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: '#1A3A4C', letterSpacing: '-0.02em', marginBottom: 18,
              }}
            >
              How to Use{' '}
              <span className="lb-gradient-text">LingoBird</span>
            </h1>
            <p style={{ color: '#4A7A96', fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.7, maxWidth: 560, marginBottom: 28 }}>
              From installation to your first flashcard review — everything you need to start learning languages on WhatsApp in under 5 minutes.
            </p>
            {/* Quick nav */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {steps.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  style={{
                    background: 'white',
                    border: '1.5px solid #C8E0F0',
                    borderRadius: 50,
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: '#169FE5',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  {s.num} {s.emoji}
                </a>
              ))}
            </div>
          </div>
          <div className="animate-float">
            <Image
              src="/lingobird-logo.png"
              alt="LingoBird mascot"
              width={160}
              height={160}
              style={{ filter: 'drop-shadow(0 12px 32px rgba(22,159,229,0.3))' }}
            />
          </div>
        </div>
      </section>

      {/* Steps */}
      {steps.map((step, idx) => (
        <section
          key={step.id}
          id={step.id}
          style={{
            background: idx % 2 === 0 ? 'white' : '#F5FAFF',
            padding: '72px 24px',
          }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 52,
              alignItems: 'flex-start',
              direction: idx % 2 === 1 ? 'rtl' : 'ltr',
            }}>
              <div style={{ direction: 'ltr' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                  <div
                    style={{
                      width: 56, height: 56, borderRadius: 18,
                      background: step.bg,
                      border: `2px solid ${step.color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.8rem', flexShrink: 0,
                    }}
                  >
                    {step.emoji}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: step.color, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Step {step.num}
                    </div>
                    <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '1.5rem', color: '#1A3A4C', margin: 0 }}>
                      {step.title}
                    </h2>
                  </div>
                </div>

                <p style={{ color: '#4A7A96', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 600, marginBottom: 24 }}>
                  {step.desc}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {step.instructions.map((ins, i) => (
                    <div
                      key={i}
                      style={{
                        background: '#F8FBFF',
                        border: '1.5px solid #C8E0F0',
                        borderRadius: 16,
                        padding: 16,
                      }}
                    >
                      <div style={{ fontFamily: 'Nunito', fontWeight: 800, fontSize: '0.88rem', color: '#1A3A4C', marginBottom: 6 }}>
                        {ins.title}
                      </div>
                      {'code' in ins ? (
                        <pre
                          style={{
                            background: '#1A3A4C',
                            color: '#5EC5F5',
                            borderRadius: 10,
                            padding: 12,
                            fontSize: '0.8rem',
                            fontFamily: 'monospace',
                            margin: 0,
                            overflow: 'auto',
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {ins.code}
                        </pre>
                      ) : (
                        <div style={{ fontSize: '0.85rem', color: '#4A7A96', fontWeight: 600, lineHeight: 1.7 }}>{ins.text}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ direction: 'ltr' }}>
                <ScreenshotPlaceholder label={step.screenshotLabel} hint={step.screenshotHint} />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="lb-sky-bg" style={{ padding: '80px 24px' }} id="faq">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="lb-section-tag" style={{ justifyContent: 'center' }}>❓ FAQ</div>
            <h2 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '2rem', color: '#1A3A4C' }}>
              Frequently Asked <span className="lb-gradient-text">Questions</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faqs.map(faq => (
              <div
                key={faq.q}
                className="lb-card"
                style={{ padding: 28 }}
              >
                <h3 style={{ fontFamily: 'Nunito', fontWeight: 900, fontSize: '1rem', color: '#1A3A4C', marginBottom: 10, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#169FE5', flexShrink: 0 }}>Q.</span>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#4A7A96', fontWeight: 700, lineHeight: 1.7, margin: 0, paddingLeft: 24 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <p style={{ color: '#4A7A96', fontWeight: 700, marginBottom: 20 }}>Still have questions?</p>
            <Link href="/contact" className="lb-btn-primary">💬 Contact Us →</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
