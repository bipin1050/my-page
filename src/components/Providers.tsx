"use client";

import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CommandPalette } from "./CommandPalette";

type PaletteCtx = { open: boolean; setOpen: (open: boolean) => void; toggle: () => void };

const PaletteContext = createContext<PaletteCtx | null>(null);

export function usePalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("usePalette must be used inside <Providers>");
  return ctx;
}

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { duration: 1.4 }, lerp: 0.1 });
    window.__lenis = lenis;
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) requestAnimationFrame(() => lenis.scrollTo(el as HTMLElement, { immediate: true }));
    }
    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle]);

  useSmoothScroll();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open]);

  return (
    <MotionConfig reducedMotion="user">
      <PaletteContext.Provider value={value}>
        {children}
        <CommandPalette />
      </PaletteContext.Provider>
    </MotionConfig>
  );
}
