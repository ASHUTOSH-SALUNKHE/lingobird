import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Monitor, CheckCircle2, HardDrive, ShieldCheck, ArrowRight } from 'lucide-react';
import { DEVELOPER_EMAIL, MICROSOFT_STORE_URL } from '@/data/lingobirdData';
import { getMediaAvailability } from '@/lib/mediaServer';
import { SCREENSHOT_SLOTS } from '@/lib/mediaRegistry';
import { MediaSlot } from '@/components/MediaSlot';
import { MicrosoftIcon } from '@/components/landing/MicrosoftIcon';

export const metadata: Metadata = {
  title: 'Download LingoBird for Windows — Microsoft Store & Direct Desktop App',
  description:
    'Download LingoBird on Windows 10 & 11 via the official Microsoft Store. Includes FSRS flashcards, 20 Piper neural voices, Whisper speech-to-text, and local AI support.',
  keywords: [
    'download LingoBird Windows',
    'Microsoft Store language learning app',
    'language practice application download',
    'Windows 11 language learning software',
    'offline language app PC',
    'free language tutor download Windows',
    'FSRS flashcards Windows download',
  ],
  alternates: {
    canonical: '/download',
  },
  openGraph: {
    title: 'Download LingoBird for Windows — Microsoft Store',
    description:
      'Get LingoBird from the Microsoft Store for Windows 10 & 11. 100% private, local-first language practice.',
    url: '/download',
  },
};

const INCLUDED = [
  'FSRS Spaced Repetition + Visual HTML/CSS Card Studio + .lbdeck packages',
  'Graded Reading Stories, Tap Word Inspector, Audio & Comprehension Checks',
  'Writing Atelier with character-level feedback, hints & Mistakes Workout',
  'Conversation Arena, 9 Mini Games & Structured Grammar Curriculum',
  'AI Voice Tutor supporting Google Gemma/Gemini & 100% Local Ollama',
  '20 Offline Piper Neural Voices (10 Languages), Whisper Local STT & 12 OPUS-MT Translators',
];

export default function DownloadPage() {
  const availability = getMediaAvailability();

  return (
    <main className="pt-28 sm:pt-32">
      {/* Hero */}
      <section className="px-5 sm:px-6 pb-14 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="flex justify-center">
            <Image
              src="/images/chatting-bird.png"
              alt="LingoBird Windows Desktop"
              width={220}
              height={170}
              className="object-contain max-h-40 w-auto animate-calm-float"
            />
          </div>
          <span className="calm-tag">
            <Monitor className="w-3.5 h-3.5" />
            Windows 10 &amp; Windows 11 Desktop
          </span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl leading-tight" style={{ color: 'var(--text-primary)' }}>
            Bring <span className="calm-gradient-text">LingoBird</span> to Your Desktop
          </h1>
          <p className="text-base sm:text-lg leading-relaxed font-medium max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Packaged as a clean Tauri v2 + WebView2 Windows desktop app — local SQLite storage, fast cold starts, and zero background trackers.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={MICROSOFT_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="calm-btn-gold"
            >
              <MicrosoftIcon className="w-4 h-4 shrink-0" />
              <span>Download on Microsoft Store</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link href="/how-to-use" className="calm-btn-secondary">
              Read Setup Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Release & Requirements */}
      <section id="windows-release" className="px-5 sm:px-6 py-14" style={{ background: 'var(--bg-sky)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-5">
            <div className="calm-card p-6 space-y-4">
              <h2 className="font-display font-semibold text-2xl m-0" style={{ color: 'var(--text-primary)' }}>
                Windows Package Details
              </h2>
              <div className="space-y-2.5 text-sm">
                {[
                  { label: 'Operating System', value: 'Windows 10 (1903+) or Windows 11 (x64)' },
                  { label: 'Runtime', value: 'Native Tauri v2 + Microsoft Edge WebView2' },
                  { label: 'App Storage', value: '~150 MB base (+ optional 30–75 MB voice/STT models)' },
                  { label: 'Local Database', value: 'Embedded SQLite + IndexedDB sandbox + JSON Backup' },
                  { label: 'Developer & Publisher', value: 'Ashutosh Salunkhe' },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-2 border-b last:border-b-0"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <span className="font-bold text-xs" style={{ color: 'var(--text-muted)' }}>
                      {row.label}
                    </span>
                    <span className="font-bold text-xs sm:text-sm sm:text-right" style={{ color: 'var(--text-primary)' }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <div
                className="rounded-2xl border p-4 text-xs leading-relaxed font-semibold"
                style={{ background: 'var(--accent-soft)', borderColor: 'var(--accent-muted)', color: 'var(--accent)' }}
              >
                LingoBird is live on the{' '}
                <a
                  href={MICROSOFT_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-extrabold"
                  style={{ color: 'var(--accent)' }}
                >
                  Microsoft Store
                </a>{' '}
                for Windows 10 &amp; Windows 11. Questions or feedback? Email{' '}
                <a href={`mailto:${DEVELOPER_EMAIL}`} className="underline font-extrabold" style={{ color: 'var(--accent)' }}>
                  {DEVELOPER_EMAIL}
                </a>
                .
              </div>
            </div>

            <div className="calm-card p-6 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                <HardDrive className="w-4 h-4" style={{ color: 'var(--mint)' }} />
                <span>What Comes Inside</span>
              </div>
              <ul className="space-y-2 list-none p-0 m-0">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs sm:text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--mint)' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <MediaSlot slot={SCREENSHOT_SLOTS.heroOverview} availability={availability} />

            <div className="calm-card p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--mint-soft)', color: 'var(--mint)' }}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold" style={{ color: 'var(--text-primary)' }}>
                    No Account Required
                  </div>
                  <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Install and open directly — zero sign-ups or telemetry.
                  </div>
                </div>
              </div>
              <Link href="/how-to-use" className="text-xs font-extrabold no-underline hover:underline inline-flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                <span>Setup Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

