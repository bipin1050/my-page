import { camp, type CampId } from "@/content/site";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

// The light warms as you climb: cool violet at base camp, dawn colours further up.
// Each section opens with a soft "horizon" (a hairline that fades out at both ends, with a
// faint tinted glow), and alternate sections sit on a slightly lifted band, so sections read
// as separate without hard dividers. Contact already has the prayer flags, so it gets nothing.
const tones: Partial<Record<CampId, { rgb: string; x: string; band?: boolean }>> = {
  about: { rgb: "167 139 250", x: "-12rem" },
  skills: { rgb: "129 140 248", x: "calc(100% - 40rem)", band: true },
  experience: { rgb: "192 132 252", x: "-8rem" },
  projects: { rgb: "236 132 200", x: "calc(100% - 42rem)", band: true },
  beyond: { rgb: "255 158 122", x: "-10rem" },
};

/** A page section framed as one camp on the climb. */
export function Section({
  id,
  title,
  kicker,
  children,
  className,
}: {
  id: CampId;
  title: React.ReactNode;
  kicker?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const c = camp(id);
  const tone = tones[id];
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("relative scroll-mt-24 py-24 sm:py-32", className)}>
      {tone && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-40 bottom-0 -z-10 overflow-hidden">
          {tone.band && (
            <div
              className="absolute inset-x-0 top-40 bottom-0"
              style={{
                background: `linear-gradient(180deg, transparent, rgb(${tone.rgb} / 0.035) 12%, rgb(255 255 255 / 0.025) 50%, rgb(${tone.rgb} / 0.02) 88%, transparent)`,
              }}
            />
          )}
          <div
            className="absolute top-0 h-[40rem] w-[52rem]"
            style={{
              left: tone.x,
              background: `radial-gradient(closest-side, rgb(${tone.rgb} / 0.11), rgb(${tone.rgb} / 0.035) 55%, transparent)`,
            }}
          />
          {/* horizon */}
          <div
            className="absolute top-40 left-1/2 h-24 w-[min(56rem,90%)] -translate-x-1/2"
            style={{ background: `radial-gradient(50% 100% at 50% 0%, rgb(${tone.rgb} / 0.12), transparent)` }}
          />
          <div
            className="absolute top-40 left-1/2 h-px w-[min(64rem,92%)] -translate-x-1/2"
            style={{
              background: `linear-gradient(90deg, transparent, rgb(${tone.rgb} / 0.35) 30%, rgb(255 255 255 / 0.18) 50%, rgb(${tone.rgb} / 0.35) 70%, transparent)`,
            }}
          />
        </div>
      )}
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-12 sm:mb-16">
          <div className="eyebrow flex items-center gap-3">
            <span className="text-aurora">{c.short}</span>
            <span className="h-px w-10 bg-white/15" />
            <span>
              {c.label} · {c.altitude.toLocaleString("en-US")} m
            </span>
          </div>
          <h2
            id={`${id}-title`}
            className="mt-5 max-w-3xl text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl"
          >
            {title}
          </h2>
          {kicker && <p className="mt-5 max-w-2xl text-lg text-mist text-pretty">{kicker}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
