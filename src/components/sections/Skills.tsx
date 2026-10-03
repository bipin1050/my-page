import { skillGroups } from "@/content/site";
import { Reveal } from "../Reveal";
import { Section } from "../Section";
import { Spotlight } from "../Spotlight";

const all = skillGroups.flatMap((g) => g.items);

function Marquee() {
  const row = [...all, ...all];
  return (
    <div className="mask-fade-x relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-2" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {row.map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-5xl font-semibold tracking-tight whitespace-nowrap text-transparent transition-colors duration-300 [-webkit-text-stroke:1px_rgb(255_255_255/0.22)] hover:text-snow sm:text-7xl"
          >
            {s}
            <span className="text-2xl text-aurora/60 [-webkit-text-stroke:0]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      title={
        <>
          Stuff I <span className="font-serif font-normal italic text-gradient">work with</span>.
        </>
      }
      kicker="Not everything I've ever touched, just the tools I actually use day to day."
    >
      <Marquee />
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {skillGroups.map((g, gi) => (
          <Reveal key={g.title} delay={gi * 0.08}>
            <Spotlight className="h-full p-7" color={["167 139 250", "255 158 122", "255 197 107", "125 211 252"][gi % 4]}>
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-dusk">0{gi + 1}</span>
                <span className="font-mono text-xs text-dusk">{g.items.length} items</span>
              </div>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight">{g.title}</h3>
              <p className="mt-1 text-sm text-mist">{g.blurb}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-snow/90 transition-colors hover:border-white/25 hover:bg-white/[0.07]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
