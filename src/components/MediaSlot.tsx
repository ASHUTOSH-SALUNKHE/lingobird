import Image from 'next/image';
import { ImagePlus, Monitor } from 'lucide-react';
import type { MediaAvailability, ScreenshotSlotSpec } from '@/lib/mediaRegistry';

interface MediaSlotProps {
  slot: ScreenshotSlotSpec;
  availability?: MediaAvailability;
  aspectClass?: string;
}

const ACCENT_MAP = {
  sky: {
    badgeBg: 'var(--accent-soft)',
    badgeText: 'var(--accent)',
    border: 'var(--accent-muted)',
  },
  mint: {
    badgeBg: 'var(--mint-soft)',
    badgeText: 'var(--mint)',
    border: 'rgba(47, 158, 111, 0.25)',
  },
  amber: {
    badgeBg: 'var(--amber-soft)',
    badgeText: 'var(--amber)',
    border: 'rgba(217, 130, 24, 0.25)',
  },
  violet: {
    badgeBg: 'var(--violet-soft)',
    badgeText: 'var(--violet)',
    border: 'rgba(115, 87, 201, 0.25)',
  },
};

export function MediaSlot({
  slot,
  availability = {},
  aspectClass = 'aspect-[16/10]',
}: MediaSlotProps) {
  const hasRealImage = Boolean(availability[slot.src]);
  const accent = ACCENT_MAP[slot.accent];

  if (hasRealImage) {
    return (
      <figure className="calm-card overflow-hidden p-2 sm:p-3 m-0">
        {/* Clean desktop window top bar */}
        <div
          className="flex items-center justify-between px-3 py-2 mb-2 rounded-xl text-xs font-semibold"
          style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}
        >
          <span className="flex items-center gap-2">
            <Monitor className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span style={{ color: 'var(--text-primary)' }}>{slot.title}</span>
          </span>
          <span>LingoBird · Windows</span>
        </div>
        <div className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden border`} style={{ borderColor: 'var(--border)' }}>
          <Image
            src={slot.src}
            alt={slot.title}
            fill
            className="object-cover"
          />
        </div>
        <figcaption className="px-2 pt-3 pb-1 text-xs leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
          {slot.caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <div className="calm-card p-3 sm:p-4">
      <div
        className={`relative w-full ${aspectClass} rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center px-6 py-8 overflow-hidden`}
        style={{
          background: 'linear-gradient(155deg, var(--bg-surface-soft) 0%, var(--bg-input) 100%)',
          borderColor: accent.border,
        }}
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
          style={{ background: accent.badgeBg, color: accent.badgeText }}
        >
          <ImagePlus className="w-6 h-6" />
        </div>

        <span
          className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-2"
          style={{ background: accent.badgeBg, color: accent.badgeText }}
        >
          Reserved Screenshot Space
        </span>

        <h3 className="font-display font-semibold text-base sm:text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
          {slot.title}
        </h3>

        <p className="text-xs sm:text-sm max-w-md leading-relaxed mb-4 font-medium" style={{ color: 'var(--text-secondary)' }}>
          {slot.caption}
        </p>

        <div
          className="px-3.5 py-2 rounded-xl border text-[11px] font-mono-code font-semibold"
          style={{
            background: 'var(--bg-surface)',
            borderColor: 'var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          Add image at <span style={{ color: 'var(--accent)' }}>public{slot.src}</span> · {slot.recommendedSize}
        </div>
      </div>
    </div>
  );
}

