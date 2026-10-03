import { leadership } from "@/content/site";
import { Reveal } from "../Reveal";
import { Section } from "../Section";
import { Spotlight } from "../Spotlight";

export function Beyond() {
  return (
    <Section
      id="beyond"
      title={
        <>
          Outside of <span className="font-serif font-normal italic text-gradient">code</span>.
        </>
      }
      kicker="Before coding was my job, I spent a lot of time organizing events and running clubs. Honestly, I learned as much there as in class."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {leadership.map((l, i) => (
          <Reveal key={l.org} delay={i * 0.08}>
            <Spotlight className="h-full p-7 sm:p-10" color={i ? "255 197 107" : "255 158 122"}>
              <div className="flex min-h-32 items-start justify-between gap-6">
                <div>
                  <span className="font-serif text-7xl leading-none italic text-gradient sm:text-8xl">{l.stat}</span>
                  <div className="eyebrow mt-2 whitespace-nowrap">{l.statLabel}</div>
                </div>
                <span className="eyebrow mt-2 text-right">
                  {l.place}
                  <span className="mt-1 block text-dusk">{l.period}</span>
                </span>
              </div>
              <h3 className="mt-10 text-3xl font-semibold tracking-tight">{l.org}</h3>
              <p className="mt-1 text-lg text-alpenglow">{l.role}</p>
              <p className="mt-4 text-mist text-pretty">{l.summary}</p>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
