import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { profile, RESUME_URL, SITE_URL, socials } from "@/content/site";
import { Providers } from "@/components/Providers";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-caveat",
  display: "swap",
});

const title = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${profile.name}` },
  description: profile.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Bipin Khanal portfolio",
    "full-stack developer",
    "React developer",
    "Next.js developer",
    "Django developer",
    "software engineer Nepal",
    "IOE Pulchowk",
    "Kathmandu",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.description,
    firstName: profile.firstName,
    lastName: profile.lastName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.description,
    creator: "@bpin_khanal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#06060a",
  colorScheme: "dark",
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: profile.name,
      url: SITE_URL,
      image: `${SITE_URL}/images/avatar.jpg`,
      jobTitle: profile.role,
      description: profile.description,
      email: `mailto:${profile.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Kathmandu", addressCountry: "NP" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Institute of Engineering, Pulchowk Campus" },
      knowsAbout: [
        "React",
        "Next.js",
        "Django",
        "Node.js",
        "Python",
        "PostgreSQL",
        "AWS",
        "ERP integrations",
        "Business automation",
        "Full-stack web development",
      ],
      knowsLanguage: ["English", "Nepali", "Hindi", "Sanskrit"],
      sameAs: [...socials.map((s) => s.href), RESUME_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: profile.name,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable} ${caveat.variable}`}
    >
      {/* browser extensions (e.g. ColorZilla) inject attributes on <body>; ignore those mismatches */}
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Providers>{children}</Providers>
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            className: "!bg-ink-800 !border-white/10 !text-snow !font-sans !rounded-2xl",
          }}
        />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
