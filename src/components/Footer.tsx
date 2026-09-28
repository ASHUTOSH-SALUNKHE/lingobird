'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="sb-footer">
      {/* Wavy top edge */}
      <div className="sb-wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: 70 }}>
          <path
            d="M0,20 C200,60 400,0 600,30 C800,60 1000,5 1200,35 C1320,52 1390,20 1440,15 L1440,70 L0,70 Z"
            fill="#FFF3E0"
          />
        </svg>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 40px' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 36,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: '2.5px solid #5A3E36',
                  boxShadow: '3px 3px 0 #5A3E36',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/lingobird-logo.png"
                  alt="LingoBird"
                  width={44}
                  height={44}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div>
                <div style={{ fontFamily: 'Fredoka, Baloo 2, sans-serif', fontWeight: 600, fontSize: '1.25rem', color: '#E76F51' }}>
                  LingoBird
                </div>
                <div style={{ fontSize: '0.6rem', color: '#8B6359', fontWeight: 700, letterSpacing: '0.06em', fontFamily: 'Caveat, cursive' }}>
                  learn while you chat ✨
                </div>
              </div>
            </Link>
            <p style={{ color: '#8B6359', fontSize: '0.88rem', lineHeight: 1.7, fontWeight: 600, marginBottom: 18 }}>
              Turn WhatsApp Web into your cozy little language classroom. 🐦
            </p>
            {/* Quick action sticker icons */}
            <div style={{ display: 'flex', gap: 10 }}>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="sb-sticker"
                style={{ width: 42, height: 42, background: '#FFE8A3', fontSize: '1.1rem', textDecoration: 'none' }}
                aria-label="Twitter"
              >
                🐦
              </a>
              <Link
                href="/download"
                className="sb-sticker"
                style={{ width: 42, height: 42, fontSize: '1.1rem', textDecoration: 'none' }}
                aria-label="Download"
              >
                ⬇️
              </Link>
              <Link
                href="/contact"
                className="sb-sticker"
                style={{ width: 42, height: 42, background: '#FFF3E0', fontSize: '1.1rem', textDecoration: 'none' }}
                aria-label="Contact"
              >
                💌
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3
              style={{
                fontFamily: 'Fredoka, Baloo 2, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                color: '#5A3E36',
                marginBottom: 16,
              }}
            >
              Product
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { href: '/features', label: '✨ Features' },
                { href: '/ai-models', label: '🤖 AI Models' },
                { href: '/how-to-use', label: '📖 How to Use' },
                { href: '/download', label: '⬇️ Download' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      color: '#8B6359',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      fontFamily: 'Nunito, sans-serif',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E76F51')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8B6359')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Providers */}
          <div>
            <h3
              style={{
                fontFamily: 'Fredoka, Baloo 2, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                color: '#5A3E36',
                marginBottom: 16,
              }}
            >
              Providers
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Chrome Built-in AI', 'Google Translate', 'DeepL', 'LibreTranslate', 'Gemini AI', 'Ollama (Local)'].map(p => (
                <li key={p} style={{ color: '#8B6359', fontWeight: 600, fontSize: '0.88rem', fontFamily: 'Nunito, sans-serif' }}>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3
              style={{
                fontFamily: 'Fredoka, Baloo 2, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                color: '#5A3E36',
                marginBottom: 16,
              }}
            >
              Resources
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { href: '/contact', label: '💬 Get in Touch' },
                { href: '/how-to-use#faq', label: '❓ FAQ' },
                { href: '/download', label: '⬇️ Download Extension' },
                { href: 'https://aistudio.google.com/apikey', label: '🔑 Gemini API Key', external: true },
              ].map(link => (
                <li key={link.href}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#8B6359', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', fontFamily: 'Nunito, sans-serif' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#E76F51')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#8B6359')}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      style={{ color: '#8B6359', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', fontFamily: 'Nunito, sans-serif' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#E76F51')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#8B6359')}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Handwritten sign-off */}
        <div
          style={{
            borderTop: '2px dashed #C4A99F',
            paddingTop: 24,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p
            style={{
              fontFamily: 'Caveat, cursive',
              color: '#8B6359',
              fontSize: '1.1rem',
              fontWeight: 700,
              margin: 0,
            }}
          >
            Made with 🐦 and ☕ — © {new Date().getFullYear()} LingoBird · All rights reserved
          </p>
          <p style={{ color: '#C4A99F', fontSize: '0.75rem', fontWeight: 600, margin: 0, maxWidth: 440, textAlign: 'right', fontFamily: 'Nunito, sans-serif' }}>
            ⚠️ LingoBird overlays WhatsApp Web for personal language learning only. Review WhatsApp&apos;s Terms of Service before use.
          </p>
        </div>
      </div>
    </footer>
  );
}
