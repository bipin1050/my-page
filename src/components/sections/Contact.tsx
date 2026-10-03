import { profile, socials } from "@/content/site";
import { CopyEmail } from "../CopyEmail";
import { ArrowUpRight, Mail, Phone, Pin, SocialGlyph } from "../icons";
import { PrayerFlags } from "../PrayerFlags";
import { Reveal } from "../Reveal";
import { Scribble } from "../Scribble";
import { Section } from "../Section";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <div className="relative">
      <PrayerFlags className="pointer-events-none absolute inset-x-0 top-0 h-28 w-full opacity-80 sm:h-40" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80%] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,158,122,0.10),transparent)]"
        aria-hidden
      />
      <Section
        id="contact"
        className="pt-40 sm:pt-52"
        title={
          <>
            You made it to the top. <span className="font-serif font-normal italic text-gradient">Say hi!</span>
          </>
        }
        kicker="Got a project, a job, or just a question? Send me a message and I&rsquo;ll get back to you."
      >
        <div className="grid gap-4 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="card p-5 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
          <Reveal className="relative space-y-4 lg:col-span-2" delay={0.08}>
            <Scribble className="mt-6 ml-auto w-fit lg:absolute lg:-top-11 lg:right-4 lg:mt-0">or just email me</Scribble>
            <div className="card divide-y divide-white/8 px-6">
              <div className="flex items-center gap-4 py-5">
                <Mail className="shrink-0 text-aurora" />
                <a href={`mailto:${profile.email}`} className="min-w-0 flex-1 truncate hover:text-aurora">
                  {profile.email}
                </a>
                <CopyEmail />
              </div>
              <div className="flex items-center gap-4 py-5">
                <Phone className="shrink-0 text-aurora" />
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:text-aurora">
                  {profile.phone}
                </a>
              </div>
              <div className="flex items-center gap-4 py-5">
                <Pin className="shrink-0 text-aurora" />
                <span>
                  {profile.location}
                  <span className="block text-sm text-mist">Hometown · {profile.hometown}</span>
                </span>
              </div>
            </div>
            <ul className="card grid grid-cols-1 p-2">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-white/[0.05]"
                  >
                    <SocialGlyph icon={s.icon} className="text-mist transition-colors group-hover:text-snow" />
                    <span className="flex-1">{s.label}</span>
                    <span className="font-mono text-xs text-dusk">{s.handle}</span>
                    <ArrowUpRight
                      width={15}
                      height={15}
                      className="text-dusk transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-snow"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
