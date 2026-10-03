import { contours, hashString } from "@/lib/terrain";

/** A generated topographic map — unique per `seed`, rendered as static SVG. */
export function Contours({
  seed,
  hue = 268,
  className,
  width = 600,
  height = 360,
  summits = 2,
  levels = 10,
  showSummit = true,
}: {
  seed: string;
  hue?: number;
  className?: string;
  width?: number;
  height?: number;
  summits?: number;
  levels?: number;
  showSummit?: boolean;
}) {
  const { rings, tops } = contours({ seed: hashString(seed), width, height, summits, levels });
  const id = `c-${hashString(seed).toString(36)}`;
  const top = tops[0];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <radialGradient id={id} cx={top.x} cy={top.y} r={Math.max(width, height) * 0.7} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={`hsl(${hue} 90% 78%)`} stopOpacity="0.95" />
          <stop offset="1" stopColor={`hsl(${hue} 60% 55%)`} stopOpacity="0.25" />
        </radialGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`}>
        {rings.map((r, i) => (
          <path key={i} d={r.d} strokeWidth={r.level % 5 === 0 ? 1.4 : 0.8} strokeOpacity={r.level % 5 === 0 ? 0.9 : 0.55} />
        ))}
      </g>
      {showSummit && (
        <g>
          <path
            d={`M${top.x - 6},${top.y + 5} L${top.x},${top.y - 6} L${top.x + 6},${top.y + 5} Z`}
            fill={`hsl(${hue} 95% 80%)`}
          />
        </g>
      )}
    </svg>
  );
}
