import Link from 'next/link';
import Image from 'next/image';
import { Coffee, Mail } from 'lucide-react';
import { DEVELOPER_EMAIL, MICROSOFT_STORE_URL } from '@/data/lingobirdData';
import { MicrosoftIcon } from './landing/MicrosoftIcon';

export default function Footer() {
  return (
    <footer className="border-t" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Brand */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <Image
              src="/lingobird-logo.png"
              alt="LingoBird"
              width={36}
              height={36}
              className="rounded-xl border"
              style={{ borderColor: 'var(--border)' }}
            />
            <div>
              <div className="font-display font-semibold text-lg leading-tight" style={{ color: 'var(--text-primary)' }}>
                LingoBird
              </div>
              <div className="text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                Learn · Practice · Grow
              </div>
            </div>
          </Link>

          {/* Center Minimal Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold">
            <Link href="/features" className="no-underline hover:underline" style={{ color: 'var(--text-secondary)' }}>
              Features
            </Link>
            <Link href="/ai-engine" className="no-underline hover:underline" style={{ color: 'var(--text-secondary)' }}>
              Languages &amp; AI
            </Link>
            <Link href="/how-to-use" className="no-underline hover:underline" style={{ color: 'var(--text-secondary)' }}>
              How to Use
            </Link>
            <Link href="/privacy" className="no-underline hover:underline" style={{ color: 'var(--text-secondary)' }}>
              Privacy
            </Link>
            <Link href="/contact" className="no-underline hover:underline" style={{ color: 'var(--text-secondary)' }}>
              Contact
            </Link>
          </nav>

          {/* Right Badge & Quick Icons */}
          <div className="flex items-center gap-3">
            <a
              href={MICROSOFT_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-left no-underline transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)' }}
            >
              <MicrosoftIcon className="w-4 h-4 shrink-0" />
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider leading-none" style={{ color: 'var(--text-muted)' }}>
                  Available on
                </div>
                <div className="text-xs font-extrabold leading-tight" style={{ color: 'var(--text-primary)' }}>
                  Microsoft Store
                </div>
              </div>
            </a>

            <a
              href={`mailto:${DEVELOPER_EMAIL}`}
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
              style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              aria-label="Email Developer"
              title={`Email Ashutosh Salunkhe (${DEVELOPER_EMAIL})`}
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href="https://buymeacoffee.com/ashutosh___10"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors"
              style={{ background: 'var(--bg-surface-soft)', borderColor: 'var(--border)', color: 'var(--amber)' }}
              aria-label="Buy Me a Coffee"
              title="Buy Me a Coffee"
            >
              <Coffee className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div
          className="pt-5 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
        >
          <span>© 2026 LingoBird · Built by Ashutosh Salunkhe (India)</span>
          <span>100% Local SQLite Storage · Zero Telemetry · Windows 10 &amp; 11</span>
        </div>
      </div>
    </footer>
  );
}
