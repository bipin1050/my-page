# Bipin Khanal — Portfolio

Personal site at **[khanalbipin.com.np](https://www.khanalbipin.com.np)**, built with Next.js (App Router), Tailwind CSS v4 and Motion.

The page is a climb up Everest: each section is a camp on the south-col route, and the altimeter on the right rises from the trailhead (0 m) to the summit (8,849 m) as you scroll.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script              | What it does                         |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Dev server with Turbopack            |
| `npm run build`     | Production build (all routes static) |
| `npm start`         | Serve the production build           |
| `npm run typecheck` | TypeScript check                     |

## Editing content

Everything personal — bio, experience, projects, skills, socials, resume link — lives in
[`src/content/site.ts`](src/content/site.ts). Edit that file; the components read from it.

## Structure

```
src/
  app/                 routes + SEO (metadata, sitemap, robots, manifest, OG image)
    resume/            embeds the resume from resume-nine-psi.vercel.app
    viewallmessage/    reads contact-form messages from Firestore (noindex)
  components/
    hero/              procedurally generated ridgelines + starfield
    sections/          About, Skills, Experience, Projects, Beyond, Contact
    Hud.tsx            floating nav + altimeter
    CommandPalette.tsx ⌘K / Ctrl+K menu
  content/site.ts      all copy and data
  lib/terrain.ts       seeded ridge + contour-map generators (run at build time)
```

## SEO

- Every route is statically prerendered, so crawlers get full HTML.
- Metadata API: canonical URLs, Open Graph / Twitter cards, `robots` rules.
- Generated `opengraph-image`, `sitemap.xml`, `robots.txt` and web manifest.
- JSON-LD `Person` + `WebSite` structured data.

Set `NEXT_PUBLIC_SITE_URL` if the site moves off `https://www.khanalbipin.com.np`.

## Deploying

Push to the connected Vercel project. Vercel detects Next.js automatically, so no extra config is needed.
