import { Footer } from "@/components/Footer";
import { Hero } from "@/components/hero/Hero";
import { Hud } from "@/components/Hud";
import { About } from "@/components/sections/About";
import { Beyond } from "@/components/sections/Beyond";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only z-[80] rounded-full bg-snow px-4 py-2 text-ink-950 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Hud />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Beyond />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
