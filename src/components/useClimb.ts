"use client";

import { useEffect, useState } from "react";
import { camps } from "@/content/site";

export type Climb = { altitude: number; index: number; progress: number };

const MIN = camps[0].altitude;

/** Maps scroll position onto the Everest route: altitude rises as you read. */
export function useClimb(): Climb {
  const [climb, setClimb] = useState<Climb>({ altitude: MIN, index: 0, progress: 0 });

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      // Each camp is "reached" once its section's top crosses 45% of the viewport.
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const reachAt = camps.map((c, i) => {
        if (i === 0) return 0;
        const el = document.getElementById(c.id);
        if (!el) return Infinity;
        const top = el.getBoundingClientRect().top + y - window.innerHeight * 0.45;
        return Math.min(Math.max(top, 0), maxScroll);
      });

      let index = 0;
      for (let i = 0; i < reachAt.length; i++) if (y >= reachAt[i] - 1) index = i;

      let altitude: number = camps[index].altitude;
      let f = 0;
      const next = camps[index + 1];
      if (next && Number.isFinite(reachAt[index + 1]) && reachAt[index + 1] > reachAt[index]) {
        f = Math.min(Math.max((y - reachAt[index]) / (reachAt[index + 1] - reachAt[index]), 0), 1);
        altitude += f * (next.altitude - camps[index].altitude);
      }
      // Progress is per-camp (evenly spaced on the rail), not proportional to altitude.
      setClimb({ altitude: Math.round(altitude), index, progress: (index + f) / (camps.length - 1) });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return climb;
}
