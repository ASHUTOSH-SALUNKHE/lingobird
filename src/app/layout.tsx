import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'LingoBird — Learn Languages While You Chat on WhatsApp',
    template: '%s | LingoBird',
  },
  description:
    'LingoBird is a free Chrome extension that overlays real-time translation, AI explanations, and spaced-repetition flashcards directly onto WhatsApp Web. Learn any language while you chat.',
  keywords: [
    'language learning', 'WhatsApp translation', 'Chrome extension',
    'spaced repetition', 'AI language tutor', 'LingoBird', 'learn while you chat',
  ],
  authors: [{ name: 'LingoBird' }],
  openGraph: {
    title: 'LingoBird — Learn Languages While You Chat',
    description: 'Free Chrome extension: real-time translation + AI explanations + SRS flashcards on WhatsApp Web.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LingoBird — Learn Languages While You Chat',
    description: 'Free Chrome extension: real-time translation + AI explanations + SRS flashcards on WhatsApp Web.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Caveat:wght@400;500;600;700&family=Nunito:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
