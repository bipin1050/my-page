import { projects, socials } from "@/content/site";
import { cn } from "@/lib/cn";
import { Contours } from "../Contours";
import { ArrowUpRight, SocialGlyph } from "../icons";
import { Reveal } from "../Reveal";
import { Section } from "../Section";
import { Spotlight } from "../Spotlight";

const github = socials.find((s) => s.icon === "github")!;

export function Projects() {
  return (
    <Section
      id="projects"
      title={
        <>
          A few things I&rsquo;ve <span className="font-serif font-normal italic text-gradient">built</span>.
        </>
      }
      kicker="Some work projects, some side projects. The little maps are generated from each project&rsquo;s name, just for fun."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((p, i) => {
          const { featured, live, code } = p;
          return (
            <Reveal key={p.name} delay={featured ? 0 : ((i - 1) % 3) * 0.08} className={cn(featured && "md:col-span-3")}>
              <Spotlight color={`${hslToRgb(p.hue)}`} className={cn("flex h-full flex-col", featured && "md:flex-row")}>
                <div
                  className={cn(
                    "relative overflow-hidden border-b border-white/8 bg-ink-950/60",
                    featured ? "aspect-[16/9] md:aspect-auto md:w-[55%] md:border-r md:border-b-0" : "aspect-[16/10]",
                  )}
                >
                  <Contours
                    seed={p.name}
                    hue={p.hue}
                    summits={featured ? 3 : 2}
                    levels={featured ? 14 : 10}
                    className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-out group-hover/spot:scale-[1.06] group-hover/spot:rotate-[0.6deg]"
                  />
                  <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.2em] text-snow/60 uppercase">
                    Route {String(i + 1).padStart(2, "0")}
                  </div>
                  {featured && (
                    <div className="absolute top-4 right-4 rounded-full border border-white/15 bg-ink-950/60 px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-snow/80 uppercase backdrop-blur">
                      Featured
                    </div>
                  )}
                </div>
                <div className={cn("flex flex-1 flex-col p-6", featured && "sm:p-7 md:p-10")}>
                  <h3 className={cn("font-semibold tracking-tight", featured ? "text-3xl sm:text-4xl" : "text-xl")}>{p.name}</h3>
                  <p className={cn("mt-3 text-mist text-pretty", !featured && "text-[15px] leading-relaxed")}>{p.summary}</p>
                  {p.stack.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
                      {p.stack.map((s) => (
                        <li key={s} className="rounded-md bg-white/[0.05] px-2.5 py-1 font-mono text-xs text-snow/80">
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                  {(live || code) && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-8">
                      {live && (
                        <a
                          href={live}
                          target="_blank"
                          rel="noreferrer"
                          className="group/btn inline-flex items-center gap-1.5 rounded-full bg-snow px-4 py-2 text-sm font-medium text-ink-950 transition hover:bg-white"
                        >
                          Live site
                          <ArrowUpRight
                            width={15}
                            height={15}
                            className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                          />
                          <span className="sr-only">for {p.name}</span>
                        </a>
                      )}
                      {code && (
                        <a
                          href={code}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-snow/90 transition hover:border-white/30 hover:bg-white/5"
                        >
                          <SocialGlyph icon="github" width={15} height={15} />
                          Source<span className="sr-only"> code for {p.name}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </Spotlight>
            </Reveal>
          );
        })}

        <Reveal delay={0.08} className="md:col-span-3">
          <a
            href={github.href}
            target="_blank"
            rel="noreferrer"
            className="card group flex items-center gap-4 !rounded-2xl px-5 py-4 transition-colors hover:border-white/20"
          >
            <SocialGlyph icon="github" width={20} height={20} className="shrink-0 text-mist group-hover:text-snow" />
            <span className="flex-1 text-[15px]">
              More on GitHub
              <span className="hidden text-mist sm:inline"> · college projects, small experiments and things in progress</span>
            </span>
            <span className="hidden font-mono text-xs text-aurora md:inline">github.com/{github.handle}</span>
            <ArrowUpRight
              width={16}
              height={16}
              className="shrink-0 text-mist transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-snow"
            />
          </a>
        </Reveal>
      </div>
    </Section>
  );
}

function hslToRgb(h: number, s = 0.85, l = 0.72) {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((v) => Math.round(v * 255)).join(" ");
}
