import { ridge } from "@/lib/terrain";
import { HeroScene, type Layer } from "./HeroScene";

const W = 2400;
const H = 900;

// Back to front. The first layer carries the snowline and the Sagarmatha label.
function buildLayers(): Layer[] {
  const far = ridge({
    seed: 8849,
    width: W,
    height: H,
    base: 650,
    roughness: 46,
    step: 5,
    peaks: [
      { x: 0.79, height: 440, width: 0.12 },
      { x: 0.68, height: 340, width: 0.09 },
      { x: 0.88, height: 290, width: 0.08 },
      { x: 0.58, height: 250, width: 0.08 },
      { x: 0.47, height: 260, width: 0.1 },
      { x: 0.3, height: 300, width: 0.11 },
      { x: 0.1, height: 230, width: 0.12 },
    ],
  });
  const mid = ridge({
    seed: 6812,
    width: W,
    height: H,
    base: 730,
    roughness: 36,
    peaks: [
      { x: 0.04, height: 250, width: 0.1 },
      { x: 0.22, height: 220, width: 0.11 },
      { x: 0.4, height: 190, width: 0.1 },
      { x: 0.58, height: 230, width: 0.1 },
      { x: 0.84, height: 210, width: 0.11 },
      { x: 1.0, height: 240, width: 0.09 },
    ],
  });
  const near = ridge({
    seed: 5364,
    width: W,
    height: H,
    base: 805,
    roughness: 26,
    peaks: [
      { x: 0.12, height: 150, width: 0.14 },
      { x: 0.36, height: 120, width: 0.13 },
      { x: 0.64, height: 165, width: 0.12 },
      { x: 0.9, height: 145, width: 0.12 },
    ],
  });
  const front = ridge({
    seed: 1400,
    width: W,
    height: H,
    base: 875,
    roughness: 14,
    peaks: [
      { x: 0.0, height: 120, width: 0.14 },
      { x: 0.3, height: 70, width: 0.18 },
      { x: 0.55, height: 60, width: 0.14 },
      { x: 0.8, height: 110, width: 0.15 },
    ],
  });

  return [
    { d: far.d, fill: "url(#hero-snow)", depth: 1, rim: true, label: far.peaks[0] },
    { d: mid.d, fill: "url(#hero-mid)", depth: 2 },
    { d: near.d, fill: "#100e19", depth: 3 },
    { d: front.d, fill: "#06060a", depth: 4 },
  ];
}

export function Hero() {
  return <HeroScene layers={buildLayers()} width={W} height={H} />;
}
