"use client";

import { profile } from "@/content/site";
import { scrollToId } from "@/lib/scroll";
import { ArrowUp } from "./icons";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-white/8">
      <div className="mx-auto max-w-6xl px-5 pt-12 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
              <Logo className="size-7" />
              {profile.name}
            </div>
            <p className="mt-3 max-w-sm text-sm text-mist">Built by me with Next.js and way too many cups of chiya.</p>
          </div>
          <button
            onClick={() => scrollToId("top")}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-mist transition hover:border-white/25 hover:text-snow"
          >
            <span className="hidden sm:inline">Back to top</span>
            <span className="sm:hidden">Top</span>
            <ArrowUp width={15} height={15} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
        <div className="mt-10 flex flex-col gap-1 border-t border-white/8 pt-6 text-xs text-mist sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-dusk">0 m → 8,849 m</p>
        </div>
      </div>
    </footer>
  );
}
