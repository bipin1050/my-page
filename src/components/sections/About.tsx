import Image from "next/image";
import { certifications, education, languages, profile } from "@/content/site";
import { Contours } from "../Contours";
import { LocalTime } from "../LocalTime";
import { Reveal } from "../Reveal";
import { Scribble } from "../Scribble";
import { Section } from "../Section";
import { Spotlight } from "../Spotlight";

const langCode: Record<string, string> = { English: "en", Nepali: "ne", Hindi: "hi", Sanskrit: "sa" };

export function About() {
  return (
    <Section
      id="about"
      title={
        <>
          A little bit <span className="font-serif font-normal italic text-gradient">about me</span>.
        </>
      }
    >
      <div className="grid auto-rows-auto grid-cols-1 gap-4 md:grid-cols-6">
        <Reveal className="relative md:col-span-2 md:row-span-2">
          <Scribble className="absolute -top-10 right-3 z-10">yep, that&rsquo;s me</Scribble>
          <figure className="card group relative h-full min-h-[420px] overflow-hidden">
            <Image
              src="/images/portrait.jpg"
              alt={`Portrait of ${profile.name}`}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover object-[38%_30%] grayscale-[0.35] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6">
              <div className="eyebrow !text-snow/70">That&rsquo;s me</div>
              <div className="mt-1 text-2xl font-semibold tracking-tight">{profile.name}</div>
              <div className="text-sm text-mist">{profile.headline}</div>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="md:col-span-4" delay={0.05}>
          <Spotlight className="h-full p-7 sm:p-10">
            <Contours
              seed="about-bio"
              className="pointer-events-none absolute -top-10 -right-24 h-[140%] w-[70%] opacity-[0.18]"
              levels={12}
              showSummit={false}
            />
            <div className="relative space-y-5 text-lg leading-relaxed text-snow/85 sm:text-xl">
              {profile.bio.map((p) => (
                <p key={p} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>
          </Spotlight>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.1}>
          <Spotlight className="h-full p-7" color="255 158 122">
            <div className="eyebrow">Local time · Kathmandu</div>
            <div className="mt-5">
              <LocalTime />
            </div>
            <p className="mt-6 font-mono text-[11px] leading-relaxed text-dusk">UTC+5:45. Yes, the 45 minutes are real.</p>
          </Spotlight>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.15}>
          <Spotlight className="h-full p-7">
            <div className="eyebrow">Education</div>
            <ul className="mt-5 space-y-5">
              {education.map((e) => (
                <li key={e.school}>
                  <div className="text-lg leading-tight font-medium">{e.school}</div>
                  <div className="mt-1 text-sm text-mist">{e.detail}</div>
                  {e.note && <div className="mt-2 text-sm text-alpenglow">▲ {e.note}</div>}
                </li>
              ))}
            </ul>
          </Spotlight>
        </Reveal>

        <Reveal className="md:col-span-3" delay={0.1}>
          <Spotlight className="h-full p-7" color="255 197 107">
            <div className="eyebrow">Certifications</div>
            <ul className="mt-5 divide-y divide-white/8">
              {certifications.map((c) => (
                <li key={c.name} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <span className="font-medium">{c.name}</span>
                  <span className="shrink-0 font-mono text-[11px] text-dusk">{c.issuer}</span>
                </li>
              ))}
            </ul>
          </Spotlight>
        </Reveal>

        <Reveal className="md:col-span-3" delay={0.15}>
          <Spotlight className="h-full p-7">
            <div className="eyebrow">Speaks</div>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5">
              {languages.map((l) => (
                <li key={l.name} className="group/lang">
                  <div
                    className="text-2xl font-medium tracking-tight transition-colors group-hover/lang:text-aurora"
                    lang={langCode[l.name]}
                  >
                    {l.native}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.2em] text-dusk uppercase">{l.name}</div>
                </li>
              ))}
            </ul>
          </Spotlight>
        </Reveal>
      </div>
    </Section>
  );
}
