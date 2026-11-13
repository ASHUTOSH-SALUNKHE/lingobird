import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { DEVELOPER_EMAIL } from '@/data/lingobirdData';

export const metadata: Metadata = {
  title: 'Privacy Statement — 100% Local-First & Zero Telemetry | LingoBird',
  description:
    'LingoBird privacy statement: SQLite and IndexedDB data stays on your PC, Piper neural voices run locally via WebAssembly, and zero tracking or advertising is ever used.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Statement — LingoBird Local-First Desktop App',
    description:
      '100% offline autonomy, no analytics, no account requirements, and complete user data ownership.',
    url: '/privacy',
  },
};

const SECTIONS = [
  {
    title: '1. Local-First Principles & Data Minimization',
    body: 'LingoBird requires no user account, email login, or behavioral telemetry. We do not collect names, phone numbers, billing details, IP logs, or advertising profiles.',
  },
  {
    title: '2. Local Persistence (SQLite & Browser Sandbox)',
    body: 'Flashcards, custom HTML/CSS card templates, FSRS memory intervals, Saved Words, Reading/Writing practice stats, and media attachments are stored locally inside your Windows user profile sandbox (SQLite & IndexedDB). You can export complete .lbdeck or JSON backups or delete data anytime.',
  },
  {
    title: '3. Offline Speech & Microphone Capabilities',
    body: 'Text-to-speech playback runs directly on your machine using cached Piper ONNX neural voices (or Windows system speech). If you use Speech-to-Text exercises, microphone audio is processed transiently in volatile memory (RAM) via local Whisper WebAssembly models or your opted-in Speech provider — never stored on remote servers.',
  },
  {
    title: '4. Optional Cloud AI Endpoints vs. Local Ollama',
    body: 'By default, LingoBird needs no cloud AI connection. If you configure an optional Google Gemini / Gemma API key or Groq Whisper key, requests are transmitted directly via HTTPS/TLS 1.3 from your device to that provider without any intermediate LingoBird server. Using Local Ollama keeps inference 100% inside localhost.',
  },
  {
    title: '5. Zero Ads, Cookies & Regulatory Compliance',
    body: `LingoBird contains no third-party advertising SDKs, cross-site tracking cookies, or telemetry pipelines, supporting compliance with GDPR, CCPA/CPRA, and COPPA guidelines. Contact Ashutosh Salunkhe at ${DEVELOPER_EMAIL} for any privacy questions.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="pt-28 sm:pt-32 px-5 sm:px-6 pb-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="calm-tag">
            <ShieldCheck className="w-3.5 h-3.5" />
            Effective October 2026 · Windows Desktop Application
          </span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl" style={{ color: 'var(--text-primary)' }}>
            LingoBird <span className="calm-gradient-text">Privacy Statement</span>
          </h1>
          <p className="text-sm sm:text-base leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
            Publisher: <strong>Ashutosh Salunkhe</strong> (India) · Application: <strong>LingoBird for Windows</strong>
          </p>
        </div>

        <div className="calm-card p-6 sm:p-10 space-y-6">
          {SECTIONS.map((sec) => (
            <section key={sec.title} className="space-y-2 pb-5 border-b last:border-b-0 last:pb-0" style={{ borderColor: 'var(--border)' }}>
              <h2 className="font-display font-semibold text-xl m-0" style={{ color: 'var(--text-primary)' }}>
                {sec.title}
              </h2>
              <p className="text-sm leading-relaxed font-medium m-0" style={{ color: 'var(--text-secondary)' }}>
                {sec.body}
              </p>
            </section>
          ))}
        </div>

        <div className="text-center">
          <Link href="/" className="calm-btn-secondary text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

