// Deterministic, dependency-free terrain generators. They run at build time on the
// server, so the hero ridgelines and the project "trail maps" ship as plain SVG.

export function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}

export function hashString(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** 1D value noise with a few octaves — gives ridges their rocky texture. */
function fbm1d(rand: () => number, length: number, octaves = 4) {
  const tables = Array.from({ length: octaves }, () => Array.from({ length: 64 }, () => rand() * 2 - 1));
  return (x: number) => {
    let sum = 0;
    let amp = 1;
    let norm = 0;
    for (let o = 0; o < octaves; o++) {
      const freq = (2 ** o * 6) / length;
      const t = x * freq;
      const i = Math.floor(t);
      const f = t - i;
      const u = f * f * (3 - 2 * f);
      const table = tables[o];
      const a = table[i & 63];
      const b = table[(i + 1) & 63];
      sum += (a + (b - a) * u) * amp;
      norm += amp;
      amp *= 0.5;
    }
    return sum / norm;
  };
}

type Peak = { x: number; height: number; width: number };

export type Ridge = { d: string; peaks: { x: number; y: number }[] };

/**
 * A closed silhouette path for one mountain range layer.
 * `peaks` are positioned as fractions of `width`; heights are in px above `base`.
 */
export function ridge({
  seed,
  width,
  height,
  base,
  peaks,
  roughness,
  step = 6,
}: {
  seed: number;
  width: number;
  height: number;
  base: number;
  peaks: Peak[];
  roughness: number;
  step?: number;
}): Ridge {
  const rand = rng(seed);
  const noise = fbm1d(rand, width);
  const yAt = (x: number) => {
    let lift = 0;
    for (const p of peaks) {
      const px = p.x * width;
      const t = Math.max(0, 1 - Math.abs(x - px) / (p.width * width));
      lift = Math.max(lift, p.height * Math.pow(t, 1.35));
    }
    return base - lift - noise(x) * roughness * (0.35 + lift / 260);
  };

  const pts: string[] = [];
  for (let x = 0; x <= width; x += step) pts.push(`${x},${yAt(x).toFixed(1)}`);
  return {
    d: `M0,${height} L${pts.join(" L")} L${width},${height} Z`,
    peaks: peaks.map((p) => ({ x: p.x * width, y: yAt(p.x * width) })),
  };
}

/** Smooth closed path through points (Catmull-Rom → cubic Bézier). */
function smoothClosed(points: [number, number][]) {
  const n = points.length;
  let d = `M${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return `${d} Z`;
}

/** Topographic contour rings around one or more summits, like a trail map. */
export function contours({
  seed,
  width,
  height,
  summits = 2,
  levels = 9,
}: {
  seed: number;
  width: number;
  height: number;
  summits?: number;
  levels?: number;
}) {
  const rand = rng(seed);
  const rings: { d: string; level: number }[] = [];
  const tops: { x: number; y: number }[] = [];
  const maxR = Math.hypot(width, height) * 0.42;

  for (let s = 0; s < summits; s++) {
    const cx = width * (0.2 + rand() * 0.6);
    const cy = height * (0.2 + rand() * 0.6);
    tops.push({ x: cx, y: cy });
    const harmonics = Array.from({ length: 4 }, (_, j) => ({
      amp: (0.22 / (j + 1)) * (0.5 + rand()),
      phase: rand() * Math.PI * 2,
      drift: (rand() - 0.5) * 0.5,
    }));
    const stretch = 0.7 + rand() * 0.6;
    const count = s === 0 ? levels : Math.ceil(levels * 0.6);
    for (let k = 1; k <= count; k++) {
      const r = (maxR * k) / (levels + 1) / (s === 0 ? 1 : 1.5);
      const pts: [number, number][] = [];
      const N = 48;
      for (let i = 0; i < N; i++) {
        const t = (i / N) * Math.PI * 2;
        let m = 1;
        harmonics.forEach((h, j) => {
          m += h.amp * Math.sin((j + 2) * t + h.phase + h.drift * k);
        });
        pts.push([cx + Math.cos(t) * r * m * stretch, cy + Math.sin(t) * r * m]);
      }
      rings.push({ d: smoothClosed(pts), level: k });
    }
  }
  return { rings, tops };
}
