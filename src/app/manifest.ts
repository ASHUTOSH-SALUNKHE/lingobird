import type { MetadataRoute } from 'next';
import { SITE_NAME, PRIMARY_TITLE, PRIMARY_DESCRIPTION } from '@/data/seoData';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: PRIMARY_TITLE,
    short_name: SITE_NAME,
    description: PRIMARY_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#faf8f2',
    theme_color: '#2774ad',
    icons: [
      {
        src: '/lingobird-logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}

