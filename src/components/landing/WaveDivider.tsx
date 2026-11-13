export function WaveDivider({
  fill = 'var(--bg-page)',
  flip = false,
  variant = 1,
}: {
  fill?: string;
  flip?: boolean;
  variant?: 1 | 2 | 3;
}) {
  const paths: Record<1 | 2 | 3, string> = {
    1: 'M0,56 C220,16 420,88 720,44 C1020,0 1240,72 1440,34 L1440,96 L0,96 Z',
    2: 'M0,38 C280,82 540,8 860,52 C1100,84 1280,22 1440,46 L1440,96 L0,96 Z',
    3: 'M0,64 C320,12 640,86 980,30 C1180,-2 1330,42 1440,22 L1440,96 L0,96 Z',
  };

  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden leading-none pointer-events-none select-none"
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        className="w-full h-12 sm:h-16 md:h-20 block"
      >
        <path d={paths[variant]} fill={fill} />
      </svg>
    </div>
  );
}

