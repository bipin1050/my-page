// Everything personal on the site lives here — edit this file to update content.

// Canonical origin for SEO (the apex domain redirects to www).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.khanalbipin.com.np").replace(/\/$/, "");

export const RESUME_URL = "https://resume-nine-psi.vercel.app/";

export const profile = {
  name: "Bipin Khanal",
  firstName: "Bipin",
  lastName: "Khanal",
  role: "Full-Stack Developer",
  headline: "Computer Engineer · IOE Pulchowk",
  description:
    "Bipin Khanal is a full-stack developer and computer engineer from IOE Pulchowk, Nepal, building fast, polished web products with React, Next.js, Django and Node.",
  email: "bipin.khanal1050@gmail.com",
  phone: "+977 9863490911",
  location: "Putalisadak, Kathmandu",
  hometown: "Syangja, Nepal",
  coordinates: "27.7172° N · 85.3240° E",
  timeZone: "Asia/Kathmandu",
  bio: [
    "I studied computer engineering at IOE Pulchowk, and these days I spend most of my time building web apps from start to finish: the screens people use, and the APIs, databases and servers behind them.",
    "I've been doing this professionally since 2023, mostly with React, Next.js and Django, and lately a lot of Python for ERP and automation work. I like software that's fast and simple to use, and I'm always happy to talk shop.",
  ],
};

export const socials = [
  { label: "GitHub", handle: "bipin1050", href: "https://github.com/bipin1050", icon: "github" },
  {
    label: "LinkedIn",
    handle: "bipin-khanal",
    href: "https://www.linkedin.com/in/bipin-khanal-66a082244/",
    icon: "linkedin",
  },
  { label: "X / Twitter", handle: "@bpin_khanal", href: "https://twitter.com/bpin_khanal", icon: "x" },
  { label: "Instagram", handle: "@_bip_in_", href: "https://www.instagram.com/_bip_in_/", icon: "instagram" },
  { label: "Facebook", handle: "bipin.khanal1050", href: "https://facebook.com/bipin.khanal1050", icon: "facebook" },
] as const;

export type SocialIcon = (typeof socials)[number]["icon"];

export const education = [
  {
    school: "IOE, Pulchowk Campus",
    detail: "Bachelor of Computer Engineering · 2018 — 2023",
    note: "Ranked 35th of ~16,000 in the entrance exam",
  },
  { school: "St. Xavier's College, Maitighar", detail: "+2 Science · 2016 — 2018" },
];

export const certifications = [
  { name: "Front-End Web Development with React", issuer: "Coursera" },
  { name: "Front-End Developer Capstone", issuer: "Coursera" },
  { name: "AWS Academy Cloud Foundations", issuer: "AWS Academy" },
];

export const languages = [
  { name: "English", native: "English" },
  { name: "Nepali", native: "नेपाली" },
  { name: "Hindi", native: "हिन्दी" },
  { name: "Sanskrit", native: "संस्कृतम्" },
];

export const skillGroups = [
  {
    title: "Languages",
    blurb: "What I write most days.",
    items: ["JavaScript", "Python", "C / C++", "HTML", "CSS"],
  },
  {
    title: "Frameworks & runtimes",
    blurb: "What I build with.",
    items: ["React", "Next.js", "Node.js", "Express", "Django", "Tailwind CSS"],
  },
  {
    title: "Data & infrastructure",
    blurb: "Where things end up running.",
    items: ["PostgreSQL", "MongoDB", "Firebase", "AWS", "Nginx", "Vercel"],
  },
  {
    title: "AI copilots",
    blurb: "Yes, I use these too. A lot.",
    items: ["ChatGPT", "Claude", "Gemini"],
  },
];

export const experience = [
  {
    role: "Full Stack Developer",
    company: "DFW IT Partner",
    period: "Jul 2024 — Present",
    summary:
      "ERP work, business automation and a lot of integrations, mostly the stuff that keeps day-to-day operations running smoothly.",
    stack: ["Python", "JavaScript", "PostgreSQL", "ERP", "Automation", "Integrations"],
  },
  {
    role: "Full Stack Developer · Part-time",
    company: "Mach Records",
    period: "May 2024 — Dec 2025",
    summary:
      "Built and deployed the company's web app pretty much end to end. React and Django on PostgreSQL, running behind Nginx on AWS.",
    stack: ["React", "Django", "PostgreSQL", "Nginx", "AWS"],
  },
  {
    role: "Full Stack Developer · Full-time",
    company: "Sandbox Software Pvt. Ltd.",
    period: "Jul 2023 — Jun 2024",
    summary:
      "My first full-time job. Worked across the stack on client projects with React, Django and PostgreSQL, and learned a ton.",
    stack: ["React", "Django", "PostgreSQL"],
  },
];

export const leadership = [
  {
    role: "Event Manager",
    org: "LOCUS 2023",
    place: "IOE, Pulchowk Campus",
    period: "2022 — 2023",
    summary: "Part of the organizing team for the 19th National Technological Festival. 30+ events, very little sleep.",
    stat: "30+",
    statLabel: "events",
  },
  {
    role: "Program Coordinator",
    org: "SXC Physics Club",
    place: "St. Xavier's College, Maitighar",
    period: "2017 — 2018",
    summary: "Helped run the Physics Olympiad and a bunch of classes and programs for fellow students.",
    stat: "2017",
    statLabel: "where leading started",
  },
];

export type Project = {
  name: string;
  summary: string;
  stack: string[];
  live?: string;
  code?: string;
  hue: number;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Mach Records",
    summary: "A platform for selling the music recorded at Mach Studio. I designed, built and deployed most of it.",
    stack: ["React", "Django", "PostgreSQL", "Nginx", "AWS"],
    hue: 268,
    featured: true,
  },
  {
    name: "KalikaNet",
    summary:
      "KalikaNet is our small internet service provider. I built its website and the customer panels subscribers use to manage their accounts.",
    stack: ["Next.js", "Supabase"],
    hue: 200,
  },
  {
    name: "AgroTech",
    summary:
      "An online marketplace where farmers and retailers can trade directly, with Stripe payments and email notifications.",
    stack: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    code: "https://github.com/bipin1050/AgroTech",
    hue: 140,
  },
  {
    name: "Inventory Management",
    summary: "A simple web app for keeping track of inventory items.",
    stack: ["React", "Node.js", "MySQL"],
    hue: 22,
  },
];

// The site is a climb: each section is a camp on the Everest south-col route.
export const camps = [
  { id: "top", label: "Trailhead", short: "TH", altitude: 0, nav: "Home" },
  { id: "about", label: "Base Camp", short: "BC", altitude: 5364, nav: "About" },
  { id: "skills", label: "Camp I", short: "C1", altitude: 6065, nav: "Skills" },
  { id: "experience", label: "Camp II", short: "C2", altitude: 6400, nav: "Experience" },
  { id: "projects", label: "Camp III", short: "C3", altitude: 7162, nav: "Projects" },
  { id: "beyond", label: "Camp IV", short: "C4", altitude: 7950, nav: "Beyond" },
  { id: "contact", label: "Summit", short: "▲", altitude: 8849, nav: "Contact" },
] as const;

export type CampId = (typeof camps)[number]["id"];

export function camp(id: CampId) {
  return camps.find((c) => c.id === id)!;
}
