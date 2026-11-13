import Image from 'next/image';
import { WaveDivider } from './WaveDivider';

export function QuietMoreBand() {
  return (
    <section id="playground" className="relative w-full overflow-hidden">
      {/* Full-bleed sunlit botanical café backdrop */}
      <div className="relative w-full min-h-[480px] sm:min-h-[580px] lg:min-h-[650px] flex flex-col justify-start">
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
          <Image
            src="/images/art/community-cafe-banner.jpg"
            alt="People conversing naturally in a sunlit botanical café while using LingoBird"
            fill
            sizes="100vw"
            className="object-cover object-[50%_65%]"
          />
          {/* Subtle upper dusk-sage gradient for luminous typography while keeping faces bright */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(16, 26, 21, 0.56) 0%, rgba(16, 26, 21, 0.34) 38%, rgba(16, 26, 21, 0.04) 72%, transparent 100%)',
            }}
          />
        </div>

        {/* Top organic cream wave transitioning smoothly from ConversationBand */}
        <div className="relative z-20 -mt-px">
          <WaveDivider fill="var(--bg-page)" flip variant={1} />
        </div>

        {/* Crisp Editorial Typography matching HeroBand in the upper sunlit canopy */}
        <div className="relative z-10 max-w-4xl mx-auto w-full px-5 sm:px-8 pt-4 sm:pt-8 pb-56 sm:pb-72 lg:pb-80 text-center">
          <p
            className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.26em] m-0 mb-2"
            style={{
              color: 'rgba(255, 255, 255, 0.92)',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.38)',
            }}
          >
            Thousands of users are
          </p>
          <h2
            className="font-display font-medium leading-[1.08] m-0"
            style={{
              fontSize: 'clamp(2.15rem, 4.8vw, 3.6rem)',
              color: '#ffffff',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.42)',
            }}
          >
            <span style={{ color: '#86e3ab' }}>Learning</span>{' '}
            <span
              className="font-script italic font-bold text-[1.18em] inline-block pr-1"
              style={{ color: '#f2b749', textShadow: '0 3px 18px rgba(0, 0, 0, 0.38)' }}
            >
              20× faster
            </span>
          </h2>
          <p
            className="text-sm sm:text-base font-bold m-0 mt-1.5"
            style={{
              color: 'rgba(255, 255, 255, 0.92)',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.38)',
            }}
          >
            using our application
          </p>
        </div>

        {/* Bottom organic cream wave melting seamlessly into ClosingCtaBand */}
        <div className="absolute inset-x-0 bottom-0 z-20 -mb-px">
          <WaveDivider fill="var(--bg-page)" variant={2} />
        </div>
      </div>
    </section>
  );
}
