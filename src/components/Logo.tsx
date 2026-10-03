export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="logo-g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="0.6" stopColor="#ff9e7a" />
          <stop offset="1" stopColor="#ffc56b" />
        </linearGradient>
      </defs>
      <path d="M3 26 13 9l5 8 3-4 8 13Z" fill="url(#logo-g)" />
      <path d="M13 9 15.4 13 13 12.2 10.8 13.2Z" fill="#f3f1ec" />
      <path d="M13 9V3.5l4.5 1.6L13 6.8" fill="none" stroke="#f3f1ec" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
