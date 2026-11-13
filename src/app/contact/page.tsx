import type { Metadata } from 'next';
import { ContactFormClient } from '@/components/ContactFormClient';

export const metadata: Metadata = {
  title: 'Contact & Support — LingoBird Windows Application',
  description:
    'Get in touch with developer Ashutosh Salunkhe for help with LingoBird offline voices, AI model configurations, FSRS decks, or feedback.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact & Support — LingoBird',
    description:
      'Get in touch with developer Ashutosh Salunkhe for LingoBird assistance and feedback.',
    url: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="pt-28 sm:pt-32 px-5 sm:px-6 pb-16">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="calm-tag">Friendly Support</span>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl" style={{ color: 'var(--text-primary)' }}>
            Questions or <span className="calm-gradient-text">Suggestions?</span>
          </h1>
          <p className="text-sm sm:text-base leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
            Whether you need help connecting Ollama, tuning FSRS intervals, or sharing feedback on LingoBird Windows, drop us a note below.
          </p>
        </div>

        <ContactFormClient />
      </div>
    </main>
  );
}

