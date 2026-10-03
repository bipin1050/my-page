// A string of lungta prayer flags — blue, white, red, green, yellow — strung across the summit.
const COLORS = ["#3b82f6", "#f3f1ec", "#ef4444", "#22c55e", "#facc15"];

export function PrayerFlags({ className, count = 26 }: { className?: string; count?: number }) {
  const W = 1200;
  const sag = 70;
  // quadratic bezier from (0,10) via (W/2, 10 + 2*sag) to (W,10)
  const point = (t: number) => {
    const x = W * t;
    const y = (1 - t) * (1 - t) * 10 + 2 * (1 - t) * t * (10 + 2 * sag) + t * t * 10;
    return { x, y };
  };
  const flags = Array.from({ length: count }, (_, i) => {
    const t = (i + 0.5) / count;
    return { ...point(t), color: COLORS[i % COLORS.length], i };
  });
  const fw = (W / count) * 0.78;

  return (
    <svg viewBox={`0 0 ${W} ${sag * 2 + 90}`} className={className} preserveAspectRatio="none" aria-hidden>
      <path d={`M0,10 Q${W / 2},${10 + 2 * sag} ${W},10`} fill="none" stroke="#f3f1ec" strokeOpacity="0.35" strokeWidth="1.2" />
      {flags.map((f) => (
        <rect
          key={f.i}
          x={f.x - fw / 2}
          y={f.y}
          width={fw}
          height={fw * 1.15}
          rx="1.5"
          fill={f.color}
          fillOpacity={f.color === "#f3f1ec" ? 0.75 : 0.72}
          className="animate-flutter [transform-box:fill-box] [transform-origin:top_center]"
          style={{ animationDelay: `${-(f.i * 0.23) % 3.2}s` }}
        />
      ))}
    </svg>
  );
}
