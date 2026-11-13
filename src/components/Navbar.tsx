'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, X, ArrowRight } from 'lucide-react';
import { useSiteTheme } from './ThemeProvider';
import { MICROSOFT_STORE_URL } from '@/data/lingobirdData';
import { MicrosoftIcon } from './landing/MicrosoftIcon';

const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/ai-engine', label: 'Languages & AI' },
  { href: '/how-to-use', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useSiteTheme();
  const [scrolled, setScrolled] = useState(false);
  const [openMenuPath, setOpenMenuPath] = useState<string | null>(null);
  const menuOpen = openMenuPath === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Over the full-bleed Hero video at scroll top on `/`, use luminous light links matching the scene
  const overDarkHeroVideo = pathname === '/' && !scrolled;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'var(--bg-pill)'
          : overDarkHeroVideo
          ? 'linear-gradient(180deg, rgba(14, 19, 17, 0.56) 0%, rgba(14, 19, 17, 0) 100%)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0">
          <Image
            src="/lingobird-logo.png"
            alt="LingoBird logo"
            width={34}
            height={34}
            className="rounded-xl border"
            style={{ borderColor: overDarkHeroVideo ? 'rgba(255,255,255,0.28)' : 'var(--border)' }}
            priority
          />
          <span
            className="font-display font-semibold text-xl tracking-tight transition-colors"
            style={{
              color: overDarkHeroVideo ? '#ffffff' : 'var(--text-primary)',
              textShadow: overDarkHeroVideo ? '0 1px 10px rgba(0,0,0,0.35)' : 'none',
            }}
          >
            LingoBird
          </span>
        </Link>

        {/* Clean Centered Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-sm font-bold transition-all no-underline"
                style={{
                  color: overDarkHeroVideo
                    ? 'rgba(255, 255, 255, 0.92)'
                    : active
                    ? 'var(--accent)'
                    : 'var(--text-primary)',
                  background: active ? 'var(--accent-soft)' : 'transparent',
                  textShadow: overDarkHeroVideo ? '0 1px 8px rgba(0,0,0,0.35)' : 'none',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'calm' ? 'Neon midnight' : 'Calm daylight'} theme`}
            title={`Theme: ${theme === 'calm' ? 'Calm Daylight' : 'Midnight Neon'}`}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors cursor-pointer"
            style={{
              background: overDarkHeroVideo ? 'rgba(255,255,255,0.16)' : 'var(--bg-surface)',
              borderColor: overDarkHeroVideo ? 'rgba(255,255,255,0.26)' : 'var(--border)',
              color: overDarkHeroVideo ? '#ffffff' : 'var(--text-secondary)',
              backdropFilter: overDarkHeroVideo ? 'blur(8px)' : 'none',
            }}
          >
            {theme === 'calm' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <a
            href={MICROSOFT_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold border no-underline transition-transform hover:-translate-y-0.5"
            style={{
              background: '#ffffff',
              borderColor: overDarkHeroVideo ? 'rgba(255,255,255,0.45)' : 'var(--border-strong)',
              color: '#1a2421',
              boxShadow: 'var(--shadow-soft)',
            }}
          >
            <MicrosoftIcon className="w-3.5 h-3.5 shrink-0" />
            <span>Download on Microsoft Store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setOpenMenuPath((cur) => (cur === pathname ? null : pathname))}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border cursor-pointer"
            style={{
              background: overDarkHeroVideo ? 'rgba(255,255,255,0.16)' : 'var(--bg-surface)',
              borderColor: overDarkHeroVideo ? 'rgba(255,255,255,0.26)' : 'var(--border)',
              color: overDarkHeroVideo ? '#ffffff' : 'var(--text-primary)',
            }}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="md:hidden mx-4 mb-3 p-3 rounded-3xl border flex flex-col gap-1"
          style={{
            background: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
            boxShadow: 'var(--shadow-clay)',
          }}
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpenMenuPath(null)}
                className="px-4 py-2.5 rounded-2xl text-sm font-bold no-underline"
                style={{
                  color: active ? 'var(--accent)' : 'var(--text-primary)',
                  background: active ? 'var(--accent-soft)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={MICROSOFT_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpenMenuPath(null)}
            className="calm-btn-gold mt-2 text-center text-sm py-2.5"
          >
            <MicrosoftIcon className="w-4 h-4 shrink-0" />
            <span>Download on Microsoft Store</span>
          </a>
        </div>
      )}
    </header>
  );
}
