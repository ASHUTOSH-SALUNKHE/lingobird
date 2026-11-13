import type { Metadata } from 'next';
import { getMediaAvailability } from '@/lib/mediaServer';
import { HomeClient } from '@/components/HomeClient';
import { PRIMARY_TITLE, PRIMARY_DESCRIPTION, SEO_KEYWORDS } from '@/data/seoData';

export const metadata: Metadata = {
  title: PRIMARY_TITLE,
  description: PRIMARY_DESCRIPTION,
  keywords: SEO_KEYWORDS.slice(0, 30),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: PRIMARY_TITLE,
    description: PRIMARY_DESCRIPTION,
    url: '/',
  },
  twitter: {
    title: PRIMARY_TITLE,
    description: PRIMARY_DESCRIPTION,
  },
};

export default function HomePage() {
  const availability = getMediaAvailability();
  return <HomeClient availability={availability} />;
}
