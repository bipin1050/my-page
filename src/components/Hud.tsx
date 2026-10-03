"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { camps, socials } from "@/content/site";
import { cn } from "@/lib/cn";
import { scrollToId } from "@/lib/scroll";
import { useClimb } from "./useClimb";
import { SocialGlyph } from "./icons";
import { Logo } from "./Logo";
import { usePalette } from "./Providers";

const navCamps = camps.filter((c) => ["about", "skills", "experience", "projects", "contact"].includes(c.id));

/** Floating nav, the altimeter rail and the mobile progress line. */
export function Hud() {
  const { altitude, index, progress } = useClimb();
  const { setOpen } = usePalette();
  const current = camps[index];

  const [menuOpen, setMenuOpen] = useState(false);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToId(id);
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const close = () => setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", close);
    };
  }, [menuOpen]);

  return (
    <>
      {/* mobile / tablet progress */}
      <div className="fixed inset-x-0 top-0 z-50 h-[2px] xl:hidden" aria-hidden>
        <div
          className="h-full origin-left bg-gradient-to-r from-aurora via-alpenglow to-ember transition-transform duration-150"
          style={{ transform: `scaleX(${Math.max(progress, 0.02)})` }}
        />
      </div>

      <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-5">
        {menuOpen && (
          <button
            className="fixed inset-0 -z-10 cursor-default md:hidden"
            aria-hidden
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
          />
        )}
        <div className="relative w-full max-w-3xl">
          <nav
            aria-label="Primary"
            className="flex items-center gap-1 rounded-full border border-white/10 bg-ink-900/70 p-1.5 pl-4 shadow-lg shadow-black/30 backdrop-blur-xl"
          >
            <a
              href="#top"
              onClick={go("top")}
              className="mr-auto flex items-center gap-2 rounded-full py-1 text-sm font-semibold tracking-tight"
            >
              <Logo className="size-6" />
              Bipin Khanal
            </a>
            <ul className="hidden items-center md:flex">
              {navCamps.map((c) => {
                const isActive = current.id === c.id;
                return (
                  <li key={c.id}>
                    <a
                      href={`#${c.id}`}
                      onClick={go(c.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative block rounded-full px-3.5 py-2 text-sm transition-colors",
                        isActive ? "text-snow" : "text-mist hover:text-snow",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]"
                          transition={{ type: "spring", stiffness: 400, damping: 34 }}
                        />
                      )}
                      {c.nav}
                    </a>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={() => setOpen(true)}
              className="hidden items-center rounded-full px-3 py-2 text-mist transition-colors hover:bg-white/5 hover:text-snow md:flex"
              aria-label="Open command menu"
            >
              <kbd className="rounded-md border border-white/10 px-1.5 font-mono text-[11px]">⌘K</kbd>
            </button>
            <Link
              href="/resume"
              className="hidden rounded-full bg-snow px-4 py-2 text-sm font-medium text-ink-950 transition hover:bg-white hover:shadow-[0_0_24px_-4px] hover:shadow-aurora/70 md:block"
            >
              Resume
            </Link>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="grid size-10 place-items-center rounded-full text-snow transition-colors hover:bg-white/5 md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="relative block h-3 w-[18px]" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300",
                    menuOpen ? "top-[5px] rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300",
                    menuOpen ? "top-[5px] -rotate-45" : "top-[10px]",
                  )}
                />
              </span>
            </button>
          </nav>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                id="mobile-menu"
                className="absolute inset-x-0 top-full mt-2 overflow-hidden rounded-3xl border border-white/10 bg-ink-900/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl md:hidden"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <ul>
                  {navCamps.map((c) => (
                    <li key={c.id}>
                      <a
                        href={`#${c.id}`}
                        onClick={go(c.id)}
                        className={cn(
                          "flex items-baseline justify-between rounded-2xl px-4 py-3 text-lg transition-colors hover:bg-white/5",
                          current.id === c.id ? "text-snow" : "text-mist",
                        )}
                      >
                        {c.nav}
                        <span className="font-mono text-[11px] text-dusk">{c.altitude.toLocaleString("en-US")} m</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex items-center gap-2 border-t border-white/8 px-2 pt-3 pb-1">
                  <Link
                    href="/resume"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 rounded-full bg-snow py-3 text-center font-medium text-ink-950"
                  >
                    Resume
                  </Link>
                  {socials.slice(0, 2).map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid size-12 place-items-center rounded-full border border-white/10 text-mist"
                    >
                      <SocialGlyph icon={s.icon} />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* altimeter */}
      <aside
        aria-label="Altitude — your progress through the page"
        className="group fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex"
      >
        <div className="text-right">
          <div className="font-mono text-[11px] tracking-[0.2em] text-dusk uppercase">Altitude</div>
          <div className="font-mono text-lg text-snow tabular-nums">
            {altitude.toLocaleString("en-US")}
            <span className="ml-1 text-xs text-mist">m</span>
          </div>
          <div className="font-mono text-[11px] text-aurora">{current.label}</div>
        </div>
        <div className="relative h-[42vh] w-10">
          <div className="absolute top-0 right-[7px] bottom-0 w-px bg-white/10" />
          <div
            className="absolute right-[7px] bottom-0 w-px bg-gradient-to-t from-aurora via-alpenglow to-ember"
            style={{ height: `${progress * 100}%` }}
          />
          {camps.map((c, i) => {
            const pos = i / (camps.length - 1);
            const reached = i <= index;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                onClick={go(c.id)}
                className="absolute right-0 flex translate-y-1/2 items-center gap-2"
                style={{ bottom: `${pos * 100}%` }}
                aria-label={`${c.label}, ${c.altitude} metres — ${c.nav}`}
              >
                <span
                  className={cn(
                    "font-mono text-[10px] whitespace-nowrap transition-all duration-300",
                    i === index
                      ? "text-snow opacity-100"
                      : "translate-x-1 text-mist opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                  )}
                >
                  {c.nav}
                </span>
                <span
                  className={cn(
                    "block size-[15px] rounded-full border transition-colors duration-300",
                    reached ? "border-aurora bg-ink-950" : "border-white/20 bg-ink-950",
                    i === index && "border-alpenglow shadow-[0_0_12px] shadow-alpenglow/60",
                  )}
                >
                  <span
                    className={cn(
                      "m-[4px] block size-[5px] rounded-full",
                      reached ? "bg-aurora" : "bg-transparent",
                      i === index && "bg-alpenglow",
                    )}
                  />
                </span>
              </a>
            );
          })}
        </div>
      </aside>
    </>
  );
}
