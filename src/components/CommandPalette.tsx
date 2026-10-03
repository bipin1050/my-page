"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { camps, profile, socials } from "@/content/site";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import { ArrowUpRight, Copy, FileText, Hash, Mail, Search, SocialGlyph } from "./icons";
import { usePalette } from "./Providers";

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  keywords?: string;
  run: () => void;
};

export function CommandPalette() {
  const { open, setOpen } = usePalette();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const items = useMemo<Item[]>(() => {
    const go = (id: string) => {
      if (pathname === "/") scrollToId(id);
      else router.push(id === "top" ? "/" : `/#${id}`);
    };
    return [
      ...camps.map((c) => ({
        id: `nav-${c.id}`,
        group: "Navigate",
        label: c.nav,
        hint: `${c.label} · ${c.altitude.toLocaleString("en-US")} m`,
        icon: <Hash />,
        keywords: c.label,
        run: () => go(c.id),
      })),
      {
        id: "resume",
        group: "Actions",
        label: "Open resume",
        icon: <FileText />,
        keywords: "cv resume",
        run: () => router.push("/resume"),
      },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        icon: <Copy />,
        run: () => {
          navigator.clipboard.writeText(profile.email).then(
            () => toast.success("Email copied!"),
            () => toast.error("Couldn't copy. It's " + profile.email),
          );
        },
      },
      {
        id: "mail",
        group: "Actions",
        label: "Write an email",
        icon: <Mail />,
        run: () => (window.location.href = `mailto:${profile.email}`),
      },
      ...socials.map((s) => ({
        id: `social-${s.icon}`,
        group: "Elsewhere",
        label: s.label,
        hint: s.handle,
        icon: <SocialGlyph icon={s.icon} />,
        run: () => window.open(s.href, "_blank", "noopener,noreferrer"),
      })),
    ];
  }, [pathname, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.keywords ?? ""}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const choose = (item: Item | undefined) => {
    if (!item) return;
    setOpen(false);
    // Let the dialog close before scrolling so Lenis isn't stopped.
    requestAnimationFrame(() => item.run());
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(filtered[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            aria-label="Close command menu"
            className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="card relative w-full max-w-xl overflow-hidden !rounded-2xl !bg-ink-900/95 shadow-2xl shadow-black/60"
            initial={{ y: 16, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 8, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-white/8 px-4">
              <Search className="shrink-0 text-mist" />
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Where to? Search sections, links, actions…"
                className="h-14 w-full bg-transparent text-[15px] text-snow placeholder:text-dusk focus:outline-none focus-visible:outline-none"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={filtered[active] ? `palette-${filtered[active].id}` : undefined}
              />
              <kbd className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-mist">ESC</kbd>
            </div>
            <div
              ref={listRef}
              id="palette-list"
              role="listbox"
              data-lenis-prevent
              className="max-h-[52vh] overflow-y-auto overscroll-contain p-2"
            >
              {filtered.length === 0 && (
                <p className="px-3 py-10 text-center text-sm text-mist">Nothing found. Try “projects”.</p>
              )}
              {filtered.map((item, index) => {
                const header = item.group !== lastGroup ? item.group : null;
                lastGroup = item.group;
                return (
                  <div key={item.id}>
                    {header && <div className="eyebrow px-3 pt-3 pb-1.5 !text-[10px]">{header}</div>}
                    <button
                      id={`palette-${item.id}`}
                      role="option"
                      aria-selected={index === active}
                      data-index={index}
                      onMouseMove={() => setActive(index)}
                      onClick={() => choose(item)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] transition-colors",
                        index === active ? "bg-white/[0.07] text-snow" : "text-mist",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-8 place-items-center rounded-lg border border-white/8",
                          index === active && "text-aurora",
                        )}
                      >
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {item.hint && <span className="hidden font-mono text-xs text-dusk sm:inline">{item.hint}</span>}
                      {item.group === "Elsewhere" && <ArrowUpRight className="text-dusk" width={14} height={14} />}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t border-white/8 px-4 py-2.5 font-mono text-[10px] tracking-wider text-dusk uppercase">
              <span>↑↓ to move · ↵ to go</span>
              <span>⌘K / Ctrl K anywhere</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
