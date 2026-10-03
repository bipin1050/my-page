import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b0b12" }}>
      <svg viewBox="0 0 32 32" width="180" height="180">
        <defs>
          <linearGradient id="g" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#a78bfa" />
            <stop offset="0.6" stopColor="#ff9e7a" />
            <stop offset="1" stopColor="#ffc56b" />
          </linearGradient>
        </defs>
        <path d="M4 25 13 10l5 8 3-4 7 11Z" fill="url(#g)" />
        <path d="M13 10 15.2 13.6 13 12.9 11 13.8Z" fill="#f3f1ec" />
        <path d="M13 10V4.8l4.2 1.5L13 7.8" fill="none" stroke="#f3f1ec" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    </div>,
    size,
  );
}
