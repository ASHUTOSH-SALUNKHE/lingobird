'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/features',   label: '✨ Features' },
  { href: '/ai-models',  label: '🤖 AI' },
  { href: '/how-to-use', label: '📖 How to Use' },
  { href: '/download',   label: '⬇️ Download' },
  { href: '/contact',    label: '💬 Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname                   = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '8px 16px' : '12px 16px',
        transition: 'padding 0.3s ease',
      }}
    >
      {/* Floating pill container */}
      <div
        className="sb-nav-pill"
        style={{
          maxWidth: 900,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 56,
          paddingLeft: 16,
          paddingRight: 16,
          boxShadow: scrolled ? '6px 6px 0 #5A3E36' : '4px 4px 0 #5A3E36',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div
            className="animate-bob"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              overflow: 'hidden',
              border: '2px solid #5A3E36',
              boxShadow: '2px 2px 0 #5A3E36',
              flexShrink: 0,
            }}
          >
            <Image
              src="/lingobird-logo.png"
              alt="LingoBird"
              width={36}
              height={36}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'Fredoka, Baloo 2, sans-serif',
                fontWeight: 600,
                fontSize: '1.2rem',
                lineHeight: 1,
                color: '#E76F51',
                letterSpacing: '0.01em',
              }}
            >
              LingoBird
            </div>
            <div style={{ fontSize: '0.58rem', color: '#8B6359', fontWeight: 700, letterSpacing: '0.06em', fontFamily: 'Caveat, cursive' }}>
              learn while you chat ✨
            </div>
          </div>
        </Link>

        {/* Desktop Nav links */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 2 }}
          className="hidden md:flex"
        >
          {navLinks.map(link => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'Fredoka, Baloo 2, sans-serif',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  color: active ? '#E76F51' : '#5A3E36',
                  textDecoration: 'none',
                  padding: '6px 12px',
                  borderRadius: 20,
                  background: active ? '#FFE8A3' : 'transparent',
                  border: active ? '2px solid #5A3E36' : '2px solid transparent',
                  transition: 'all 0.18s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  if (!active) {
                    el.style.background = '#FFD9B3';
                    el.style.border = '2px solid #5A3E36';
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  if (!active) {
                    el.style.background = 'transparent';
                    el.style.border = '2px solid transparent';
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link
            href="/download"
            className="sb-btn hidden md:inline-flex"
            style={{ fontSize: '0.88rem', padding: '9px 20px' }}
          >
            🐦 Get it Free
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              padding: 8,
              cursor: 'pointer',
              background: menuOpen ? '#FFD9B3' : 'transparent',
              border: '2px solid #5A3E36',
              borderRadius: 10,
              boxShadow: menuOpen ? '2px 2px 0 #5A3E36' : 'none',
              transition: 'all 0.2s ease',
            }}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 20,
                  height: 2,
                  background: '#5A3E36',
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(4px, 5px)'
                      : i === 2 ? 'rotate(-45deg) translate(4px, -5px)'
                      : 'none'
                    : 'none',
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            maxWidth: 900,
            margin: '8px auto 0',
            background: 'rgba(255, 248, 240, 0.97)',
            backdropFilter: 'blur(16px)',
            border: '3px solid #5A3E36',
            borderRadius: 24,
            boxShadow: '5px 5px 0 #5A3E36',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'Fredoka, Baloo 2, sans-serif',
                fontWeight: 600,
                fontSize: '1.05rem',
                color: pathname === link.href ? '#E76F51' : '#5A3E36',
                textDecoration: 'none',
                padding: '10px 16px',
                borderRadius: 16,
                background: pathname === link.href ? '#FFE8A3' : 'transparent',
                border: pathname === link.href ? '2px solid #5A3E36' : '2px solid transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/download"
            className="sb-btn"
            style={{ marginTop: 8, justifyContent: 'center' }}
          >
            🐦 Get LingoBird — Free
          </Link>
        </div>
      )}
    </nav>
  );
}
