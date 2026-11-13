import type { Metadata } from 'next';
import { Compass, Layers, CheckCircle2, HelpCircle } from 'lucide-react';
import { MICROSOFT_STORE_URL } from '@/data/lingobirdData';
import { getMediaAvailability } from '@/lib/mediaServer';
import { SCREENSHOT_SLOTS } from '@/lib/mediaRegistry';
import { MediaSlot } from '@/components/MediaSlot';

export const metadata: Metadata = {
  title: 'How to Use LingoBird — Setup Guide for AI Models, Offline Voices & Flashcards',
  description:
    'Step-by-step onboarding guide for LingoBird Windows: how to configure offline Piper voices, local Whisper STT, Gemini or Ollama AI models, and design custom HTML/CSS flashcards with FSRS.',
  keywords: [
    'how to use LingoBird',
    'setup offline language tutor',
    'configure Ollama language tutor',
    'Piper TTS setup guide',
    'FSRS flashcards tutorial',
    'HTML CSS flashcards guide',
    'language practice guide Windows',
  ],
  alternates: {
    canonical: '/how-to-use',
  },
  openGraph: {
    title: 'How to Use LingoBird — Complete Windows Setup & Study Guide',
    description:
      'Get up and running in minutes with offline neural voices, speech recognition, and custom flashcards.',
    url: '/how-to-use',
  },
};

const STARTUP_STEPS = [
  {
    step: '01',
    title: 'Optional Environment Overview',
    detail:
      'Open Settings anytime — flashcards, reading, writing, and starter decks already work offline immediately without adding any API keys.',
  },
  {
    step: '02',
    title: 'Add an AI Model (Gemini API or Local Ollama)',
    detail:
      'Paste a free Google AI Studio key for Gemma 4 26B / 31B (up to 14.4K daily requests) or click "Scan Installed Ollama Models" if running Ollama on localhost:11434.',
  },
  {
    step: '03',
    title: 'Configure Speech-to-Text (Whisper / Groq)',
    detail:
      'Pick Whisper Tiny (~39 MB) or Base (~73 MB) in Settings → Speech so spoken tutor exercises transcribe privately offline, or pair a Groq Whisper key.',
  },
  {
    step: '04',
    title: 'Download Neural Voices & Offline Translator Packs',
    detail:
      'Cache female & male Piper TTS voices (~60 MB) and Helsinki-NLP OPUS-MT translator models (~32 MB) so Overview Translator and Reading play instantly offline.',
  },
];

const FLASHCARD_STEPS = [
  {
    num: '1',
    title: 'Click New Deck & Set Languages',
    text: 'Enter your deck title, description, source language, and target language inside the Flashcards hub.',
  },
  {
    num: '2',
    title: 'Open Advanced Card Styling & Fields',
    text: 'Define the template fields you want (word, phonetic reading, meaning, example sentence, notes).',
  },
  {
    num: '3',
    title: 'Copy the Built-In AI Prompt & Paste HTML/CSS',
    text: 'Click Copy AI Prompt, generate your custom front and back card layout in ChatGPT or any AI, and paste the HTML/CSS right back into LingoBird.',
  },
  {
    num: '4',
    title: 'Create Deck, Add Cards & Preview',
    text: 'Click Create Deck, add vocabulary items (or media), open Preview / Study with FSRS, and export anytime as .lbdeck.',
  },
];

const FAQS = [
  {
    q: 'Do I have to configure an AI API key before using LingoBird?',
    a: 'Not at all. Flashcards, FSRS scheduling, Graded Reading, Writing Atelier, Mini Games, Saved Words, and Grammar starter packs all run without any API key.',
  },
  {
    q: 'Why does LingoBird offer both Piper voices and Whisper locally?',
    a: 'Pre-downloading compact neural weights removes cloud latency and preserves privacy: listening and speaking practice responds on your own Windows hardware even without Wi-Fi.',
  },
  {
    q: 'Can I turn off the startup guide and re-enable it later?',
    a: 'Yes. Choosing "Never show instructions again" confirms gently once, and you can toggle Startup Guide or Flashcard Creation Guide back ON anytime in Settings → Appearance / Guides.',
  },
  {
    q: 'Can I share custom HTML/CSS flashcard decks with friends or back up my progress?',
    a: 'Yes! Export individual decks as self-contained .lbdeck files (including templates & attached media), or export your entire SQLite/IndexedDB progress to a portable JSON backup in Settings → Data & Backup.',
  },
];

export default function HowToUsePage() {
  const availability = getMediaAvailability();

  return (
    <main className="pt-28 sm:pt-32">
      {/* Hero */}
      <section className="px-5 sm:px-6 pb-14 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="calm-tag">
            <Compass className="w-3.5 h-3.5" />
            Gentle Setup Walkthrough
          </span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl leading-tight" style={{ color: 'var(--text-primary)' }}>
            Up and Running in <span className="calm-gradient-text">Calm Minutes</span>
          </h1>
          <p className="text-base sm:text-lg leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
            Everything inside LingoBird mirrors the in-app Onboarding Guide and Flashcards Studio Guide — never forced, always available when you want it.
          </p>
        </div>
      </section>

      {/* Startup Onboarding Walkthrough */}
      <section className="px-5 sm:px-6 py-14" style={{ background: 'var(--bg-sky)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-display font-semibold text-2xl sm:text-3xl m-0" style={{ color: 'var(--text-primary)' }}>
              1. Optional Environment Setup
            </h2>
            <div className="space-y-3">
              {STARTUP_STEPS.map((item) => (
                <div key={item.step} className="calm-card p-4 flex gap-3.5 items-start">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0"
                    style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                  >
                    {item.step}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-display font-semibold text-base m-0" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed font-medium m-0" style={{ color: 'var(--text-secondary)' }}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <MediaSlot slot={SCREENSHOT_SLOTS.onboardingGuides} availability={availability} />
          </div>
        </div>
      </section>

      {/* Flashcards Guide Section */}
      <section id="flashcard-guide" className="px-5 sm:px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="calm-tag">
              <Layers className="w-3.5 h-3.5" />
              Flashcard Studio Workflow
            </span>
            <h2 className="font-display font-semibold text-3xl" style={{ color: 'var(--text-primary)' }}>
              2. Design Custom AI Flashcards Step by Step
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FLASHCARD_STEPS.map((step) => (
              <div key={step.num} className="calm-card p-5 space-y-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-white"
                  style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-bright))' }}
                >
                  {step.num}
                </div>
                <h3 className="font-display font-semibold text-base m-0" style={{ color: 'var(--text-primary)' }}>
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed font-medium m-0" style={{ color: 'var(--text-secondary)' }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <MediaSlot slot={SCREENSHOT_SLOTS.flashcardsStudio} availability={availability} />
          </div>
        </div>
      </section>

      {/* Quiet FAQ */}
      <section className="px-5 sm:px-6 py-14" style={{ background: 'var(--bg-sky)' }}>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="calm-tag">
              <HelpCircle className="w-3.5 h-3.5" />
              Common Questions
            </span>
            <h2 className="font-display font-semibold text-3xl" style={{ color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq) => (
              <div key={faq.q} className="calm-card p-5 space-y-1.5">
                <h3 className="font-display font-semibold text-base flex items-start gap-2 m-0" style={{ color: 'var(--text-primary)' }}>
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-1" style={{ color: 'var(--mint)' }} />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm leading-relaxed font-medium pl-6 m-0" style={{ color: 'var(--text-secondary)' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <a
              href={MICROSOFT_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="calm-btn-primary"
            >
              Download on Microsoft Store →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

