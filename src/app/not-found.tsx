import type { Metadata } from "next";
import Link from "next/link";
import { Contours } from "@/components/Contours";
import { ArrowLeft } from "@/components/icons";

export const metadata: Metadata = {
  title: "Off route",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden px-5 text-center">
      <Contours
        seed="lost-in-the-himalaya"
        width={1200}
        height={800}
        summits={3}
        levels={16}
        className="absolute inset-0 -z-10 h-full w-full opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(closest-side,transparent,#06060a)]" />
      <div>
        <p className="eyebrow">Altitude · ???? m · Signal lost</p>
        <h1 className="mt-6 text-[clamp(5rem,22vw,14rem)] leading-[0.85] font-bold tracking-[-0.06em]">
          4<span className="font-serif font-normal italic text-gradient">0</span>4
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-mist">
          Looks like this page doesn&rsquo;t exist. Maybe it moved, maybe it never did.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-snow px-6 py-3.5 font-medium text-ink-950 transition hover:shadow-[0_0_40px_-6px] hover:shadow-alpenglow"
        >
          <ArrowLeft /> Back to base camp
        </Link>
      </div>
    </main>
  );
}
