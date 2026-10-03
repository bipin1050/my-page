import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { profile, RESUME_URL } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name} — ${profile.role}, ${profile.headline}.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main className="flex h-[100svh] flex-col bg-ink-950">
      <header className="flex items-center gap-3 border-b border-white/8 px-3 py-2.5 sm:px-5">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-mist transition hover:bg-white/5 hover:text-snow"
        >
          <ArrowLeft width={16} height={16} className="transition-transform group-hover:-translate-x-0.5" />
          Back
        </Link>
        <div className="mx-auto flex items-center gap-2 text-sm font-medium">
          <Logo className="size-5" />
          <h1>{profile.name} · Resume</h1>
        </div>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-snow px-4 py-2 text-sm font-medium text-ink-950 transition hover:bg-white"
        >
          <span className="hidden sm:inline">Open in new tab</span>
          <span className="sm:hidden">Open</span>
          <ArrowUpRight width={15} height={15} />
        </a>
      </header>
      <iframe
        src={RESUME_URL}
        title={`${profile.name} — Resume`}
        className="w-full flex-1 bg-white"
        allow="clipboard-write; fullscreen"
      />
    </main>
  );
}
