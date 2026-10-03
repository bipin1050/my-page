import { ImageResponse } from "next/og";
import { profile } from "@/content/site";
import { ridge } from "@/lib/terrain";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const far = ridge({
    seed: 8849,
    width: 1200,
    height: 630,
    base: 500,
    roughness: 30,
    peaks: [
      { x: 0.74, height: 300, width: 0.16 },
      { x: 0.6, height: 220, width: 0.12 },
      { x: 0.9, height: 200, width: 0.12 },
      { x: 0.3, height: 150, width: 0.18 },
    ],
  });
  const near = ridge({
    seed: 1400,
    width: 1200,
    height: 630,
    base: 590,
    roughness: 18,
    peaks: [
      { x: 0.15, height: 120, width: 0.2 },
      { x: 0.55, height: 90, width: 0.22 },
      { x: 0.95, height: 110, width: 0.18 },
    ],
  });

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "linear-gradient(180deg, #05050a 0%, #0c0a18 45%, #2a1a33 100%)",
        color: "#f3f1ec",
        fontFamily: "sans-serif",
      }}
    >
      <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="snow" x1="0" y1="190" x2="0" y2="420" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f6e9f0" />
            <stop offset="0.2" stopColor="#c9b6e6" />
            <stop offset="0.5" stopColor="#4a3a78" />
            <stop offset="1" stopColor="#1a1529" />
          </linearGradient>
        </defs>
        <path d={far.d} fill="url(#snow)" />
        <path d={near.d} fill="#06060a" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", padding: "72px 80px", position: "relative" }}>
        <div style={{ fontSize: 22, letterSpacing: 6, color: "#a3a1b4", textTransform: "uppercase" }}>{profile.coordinates}</div>
        <div style={{ fontSize: 112, fontWeight: 800, letterSpacing: -4, marginTop: 24, lineHeight: 1 }}>{profile.name}</div>
        <div style={{ fontSize: 38, marginTop: 20, color: "#ff9e7a" }}>{profile.role}</div>
        <div style={{ fontSize: 28, marginTop: 8, color: "#a3a1b4" }}>{profile.headline}</div>
      </div>
    </div>,
    size,
  );
}
