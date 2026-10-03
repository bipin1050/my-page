"use client";

import { motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { experience } from "@/content/site";
import { Reveal } from "../Reveal";
import { Section } from "../Section";
import { Spotlight } from "../Spotlight";

export function Experience() {
  const trail = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trail, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section
      id="experience"
      title={
        <>
          Where I&rsquo;ve <span className="font-serif font-normal italic text-gradient">worked</span>.
        </>
      }
      kicker={
        <>
          The short version. The full story is in my{" "}
          <Link href="/resume" className="text-snow underline decoration-white/30 underline-offset-4 hover:decoration-aurora">
            resume
          </Link>
          .
        </>
      }
    >
      <div ref={trail} className="relative pl-10 sm:pl-16">
        <div className="absolute top-2 bottom-2 left-[11px] w-px bg-white/10 sm:left-[19px]" aria-hidden />
        <motion.div
          className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-gradient-to-b from-aurora via-alpenglow to-ember sm:left-[19px]"
          style={{ scaleY }}
          aria-hidden
        />
        <ol className="space-y-6">
          {experience.map((job, i) => (
            <li key={job.company} className="relative">
              <Reveal delay={i * 0.06}>
                <span
                  className="absolute top-8 -left-10 grid size-[23px] place-items-center rounded-full border border-aurora/60 bg-ink-950 sm:-left-16 sm:size-[39px]"
                  aria-hidden
                >
                  <span className="size-2 rounded-full bg-aurora shadow-[0_0_12px_2px] shadow-aurora/60 sm:size-2.5" />
                </span>
                <Spotlight className="p-7 sm:p-9">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{job.company}</h3>
                      <p className="mt-1 text-lg text-aurora">{job.role}</p>
                    </div>
                    {job.period && (
                      <span className="self-start rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-mist">
                        {job.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-5 max-w-2xl text-mist text-pretty">{job.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
                    {job.stack.map((s) => (
                      <li key={s} className="rounded-md bg-white/[0.05] px-2.5 py-1 font-mono text-xs text-snow/80">
                        {s}
                      </li>
                    ))}
                  </ul>
                </Spotlight>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
