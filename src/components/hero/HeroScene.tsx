"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/site";
import { scrollToId } from "@/lib/scroll";
import { ArrowDown, ArrowUpRight } from "../icons";
import { Starfield } from "../Starfield";

export type Layer = {
  d: string;
  fill: string;
  depth: number;
  rim?: boolean;
  label?: { x: number; y: number };
};

const words = ["web apps", "APIs", "dashboards", "ERP tools", "side projects"];
const longest = words.reduce((a, b) => (b.length > a.length ? b : a));

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {/* reserve the width of the longest word so the line doesn't jump */}
      <span className="invisible col-start-1 row-start-1 font-serif italic">{longest}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          className="col-start-1 row-start-1 font-serif text-alpenglow italic"
          initial={{ y: "60%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-60%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function SplitLetters({ text, delay }: { text: string; delay: number }) {
  return (
    <span aria-hidden>
      {text.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span className="intro-rise inline-block" style={{ animationDelay: `${delay + i * 0.045}s` }}>
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
}

function RidgeLayer({
  layer,
  width,
  height,
  progress,
  mx,
}: {
  layer: Layer;
  width: number;
  height: number;
  progress: MotionValue<number>;
  mx: MotionValue<number>;
}) {
  // Distant ranges barely move; the foreground slides most — classic parallax.
  const y = useTransform(progress, [0, 1], [0, (5 - layer.depth) * 70]);
  const x = useTransform(mx, (v) => v * layer.depth * -6);
  return (
    <motion.svg
      viewBox={`0 0 ${width} ${height}`}
      className="absolute inset-0 h-full w-full"
      style={{ y, x }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, delay: 0.15 * layer.depth, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    >
      {layer.depth === 1 && (
        <defs>
          <linearGradient id="hero-snow" x1="0" y1="200" x2="0" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f6e9f0" />
            <stop offset="0.16" stopColor="#c9b6e6" />
            <stop offset="0.42" stopColor="#4a3a78" />
            <stop offset="1" stopColor="#1a1529" />
          </linearGradient>
          <linearGradient id="hero-mid" x1="0" y1="440" x2="0" y2="760" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#2b2343" />
            <stop offset="1" stopColor="#141120" />
          </linearGradient>
        </defs>
      )}
      <path d={layer.d} fill={layer.fill} />
      {layer.rim && <path d={layer.d} fill="none" stroke="#ff9e7a" strokeOpacity="0.35" strokeWidth="1.2" />}
      {layer.label && (
        <g className="hidden font-mono xl:inline" fill="#f3f1ec">
          <line
            x1={layer.label.x}
            x2={layer.label.x}
            y1={layer.label.y - 14}
            y2={layer.label.y - 92}
            stroke="#f3f1ec"
            strokeOpacity="0.45"
            strokeDasharray="3 4"
          />
          <circle cx={layer.label.x} cy={layer.label.y - 8} r="3.5" fill="#ff9e7a" />
          <text x={layer.label.x + 10} y={layer.label.y - 98} fontSize="17" letterSpacing="2.5" opacity="0.85">
            SAGARMATHA
          </text>
          <text x={layer.label.x + 10} y={layer.label.y - 76} fontSize="15" fill="#ff9e7a" opacity="0.9">
            8,848.86 m
          </text>
        </g>
      )}
    </motion.svg>
  );
}

export function HeroScene({ layers, width, height }: { layers: Layer[]; width: number; height: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mxRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 20 });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    mxRaw.set((e.clientX / window.innerWidth) * 2 - 1);
  };

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onPointerMove}
      aria-label="Introduction"
      className="relative isolate flex min-h-[640px] h-[100svh] flex-col overflow-hidden"
    >
      {/* sky */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#05050a_0%,#0c0a18_45%,#1d1430_75%,#2a1a33_100%)]" />
      <motion.div
        className="absolute inset-x-0 bottom-[8%] -z-10 mx-auto h-[70%] w-[min(1400px,140%)] rounded-full bg-[radial-gradient(closest-side,rgba(255,158,122,0.32),rgba(167,139,250,0.16)_55%,transparent)] blur-2xl md:left-[25%]"
        style={{ scale: glowScale }}
        aria-hidden
      />
      <Starfield className="absolute inset-0 -z-10 h-[75%] w-full" />

      {/* ranges */}
      <div
        className="absolute bottom-0 left-1/2 -z-10 aspect-[8/3] w-[max(100%,calc(78svh*8/3))] -translate-x-[76%] md:right-0 md:left-auto md:translate-x-0"
        aria-hidden
      >
        {layers.map((layer) => (
          <RidgeLayer key={layer.depth} layer={layer} width={width} height={height} progress={scrollYProgress} mx={mx} />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-ink-950" aria-hidden />
      {/* soft shade behind the copy so it stays readable over the snowy peaks */}
      <div className="hero-shade absolute inset-0 -z-10" aria-hidden />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-start px-5 pt-[clamp(7rem,18vh,11rem)] [text-shadow:0_2px_16px_rgba(6,6,10,0.75)] sm:px-8"
      >
        <p className="eyebrow intro-fade flex items-center gap-3">
          <span className="inline-block size-1.5 rounded-full bg-alpenglow shadow-[0_0_10px_2px] shadow-alpenglow/60" />
          {profile.coordinates}
        </p>

        <p className="intro-fade mt-6 text-lg text-mist [animation-delay:0.15s] sm:text-xl">
          <span lang="ne">नमस्ते</span> — hello, I&rsquo;m
        </p>

        <h1 className="mt-2 text-[clamp(3.6rem,13vw,10.5rem)] leading-[0.86] font-bold tracking-[-0.045em]">
          <span className="sr-only">{profile.name}</span>
          <SplitLetters text={profile.firstName} delay={0.25} />{" "}
          {/* gradient text can't be split per letter (background-clip breaks), so it rises as one word */}
          <span className="inline-block overflow-hidden pr-[0.18em] pb-[0.1em] align-bottom" aria-hidden>
            <span className="intro-rise inline-block font-serif font-normal tracking-[-0.02em] italic text-gradient [animation-delay:0.5s] [text-shadow:none]">
              {profile.lastName}
            </span>
          </span>
        </h1>

        <p className="intro-fade mt-7 max-w-xl text-xl leading-snug text-snow/90 [animation-delay:0.95s] sm:text-2xl">
          Full-stack developer who enjoys building <RotatingWord />
          <span className="mt-2 block text-base text-mist sm:text-lg">{profile.headline}</span>
        </p>

        <div className="intro-fade mt-9 flex flex-wrap items-center gap-2 [animation-delay:1.1s] [text-shadow:none] sm:gap-3">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("about");
            }}
            className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-snow px-4 py-3.5 text-[15px] font-medium whitespace-nowrap text-ink-950 transition hover:shadow-[0_0_40px_-6px] hover:shadow-alpenglow sm:flex-none sm:px-6 sm:text-base"
          >
            Start the climb
            <ArrowDown width={16} height={16} className="transition-transform group-hover:translate-y-0.5" />
          </a>
          <Link
            href="/resume"
            className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-ink-950/40 px-4 py-3.5 text-[15px] font-medium whitespace-nowrap backdrop-blur transition hover:border-white/30 hover:bg-white/[0.06] sm:flex-none sm:px-6 sm:text-base"
          >
            View resume
            <ArrowUpRight
              width={16}
              height={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </motion.div>

      <div className="intro-fade relative mx-auto mb-6 flex w-full max-w-6xl items-end px-5 font-mono text-[11px] tracking-[0.18em] text-mist uppercase [animation-delay:1.6s] sm:px-8">
        <span className="flex items-center gap-3">
          <span className="relative block h-10 w-px overflow-hidden bg-white/10">
            <span className="absolute inset-0 bg-snow motion-safe:animate-[scroll-cue_2.2s_ease-in-out_infinite]" />
          </span>
          Scroll to ascend
        </span>
      </div>
    </section>
  );
}
