import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  SITE_URL,
  PRIMARY_TITLE,
  PRIMARY_DESCRIPTION,
  SEO_KEYWORDS,
  SOFTWARE_APPLICATION_SCHEMA,
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  VIDEO_OBJECT_SCHEMA,
  FAQ_SCHEMA,
} from '@/data/seoData';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PRIMARY_TITLE,
    template: '%s | LingoBird',
  },
  description: PRIMARY_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: 'Ashutosh Salunkhe', url: SITE_URL }],
  creator: 'Ashutosh Salunkhe',
  publisher: 'LingoBird',
  applicationName: 'LingoBird',
  category: 'education',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: PRIMARY_TITLE,
    description: PRIMARY_DESCRIPTION,
    siteName: 'LingoBird',
    images: [
      {
        url: '/images/art/community-cafe-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'LingoBird — Best Language Learning & Practicing Application for Windows',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PRIMARY_TITLE,
    description: PRIMARY_DESCRIPTION,
    creator: '@lingobird_app',
    site: '@lingobird_app',
    images: ['/images/art/community-cafe-banner.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/lingobird-logo.png',
    apple: '/lingobird-logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = [
    SOFTWARE_APPLICATION_SCHEMA,
    ORGANIZATION_SCHEMA,
    WEBSITE_SCHEMA,
    VIDEO_OBJECT_SCHEMA,
    FAQ_SCHEMA,
  ];

  return (
    <html lang="en" data-theme="calm" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
