import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass } from 'lucide-react';
import { MICROSOFT_STORE_URL } from '@/data/lingobirdData';
import { MicrosoftIcon } from './MicrosoftIcon';

export function ClosingCtaBand() {
  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--bg-page)' }}>
      <div className="relative min-h-[370px] sm:min-h-[420px] flex items-center justify-center px-5 sm:px-8 py-16 text-center" style={{ background: 'var(--bg-page)' }}>
        {/* Panoramic Perched Bluebird Backdrop */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <Image
            src="/images/art/closing-horizon.jpg"
            alt="Bluebird overlooking serene misty valley"
            fill
            className="object-cover object-bottom opacity-95"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, var(--bg-page) 8%, color-mix(in srgb, var(--bg-page) 78%, transparent) 44%, color-mix(in srgb, var(--bg-page) 22%, transparent) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-5 -mt-6">
          <h2
            className="font-display font-medium leading-[1.12]"
            style={{ fontSize: 'clamp(2rem, 4.2vw, 3.1rem)', color: 'var(--text-primary)' }}
          >
            Start Your Language Journey Today
          </h2>
          <p className="text-sm sm:text-base font-semibold max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Download LingoBird for Windows and learn with offline neural voices, custom flashcards, and total peace of mind.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
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

            <Link
              href="/how-to-use"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-left no-underline transition-transform hover:-translate-y-0.5"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border-strong)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
              >
                <Compass className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-extrabold leading-tight" style={{ color: 'var(--text-primary)' }}>
                Read App <br />
                Setup Guide
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

