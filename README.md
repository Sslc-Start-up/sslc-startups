# SSLC Startup — marketing website

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · Framer Motion (LazyMotion).

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build && npm start
```

## Structure

```
src/
  app/                 layout (metadata, JSON-LD), page, sitemap, robots, icons, OG image
    api/inquiry/       POST endpoint for the project-inquiry form
  content/site.ts      ALL copy and data — services, case studies, process, contact details
  lib/                 inquiry submission, prefill signal, site URL, cn()
  components/
    navigation/        sticky glass header + fullscreen mobile menu
    hero/              hero, 3D WebGL logo scene (three.js), tagline, trust strip
    problem/ services/ statement/ architecture/ case-studies/ ai/
    ecosystem/ process/ why/ cta/ contact/ footer/
    assistant/         "Talk to SSLC" — frontend-only project assistant (no fake AI)
    ui/                buttons, reveal, section heading, logo, icons, spotlight, magnetic
brand/                 original logo source file
```

Design tokens (colours, type scale, motion, textures) live in `src/app/globals.css` under `@theme`.

## Configuration

Copy `.env.example` to `.env.local` (or set in your host):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin, used for canonical URLs, sitemap, Open Graph and JSON-LD. Auto-detected on Vercel. |
| `INQUIRY_WEBHOOK_URL` | Where project inquiries are delivered (JSON POST). Works with Formspree, Zapier, Make, n8n, Slack webhooks or your CRM. |

### Project inquiries

`submitProjectInquiry()` (`src/lib/inquiry.ts`) posts to `/api/inquiry`, which validates the
brief and forwards it to `INQUIRY_WEBHOOK_URL`. **Until that variable is set, nothing is
delivered server-side** — the visitor instead gets a pre-written email to
`sslcstartup@gmail.com` containing their full brief, so no lead is lost.

## Content still to supply

Everything below is wired to render automatically once filled in `src/content/site.ts`:

- **Real client projects** — add `caseStudies` entries with `kind: "project"` (only verified facts and metrics).
- **Real product screenshots** — the solution-card visuals are illustrative CSS mock-ups (`components/case-studies/visuals.tsx`).
- **Social profiles** — `company.social[].href` (LinkedIn, Instagram, GitHub are hidden while empty).

The three "Solution blueprint" cards describe how SSLC builds each class of system; they are not client work.

## 3D hero

`components/hero/hero-scene.tsx` rebuilds the SSLC mark in three.js (extruded ribbons, bloom, particles,
orbit rings). three.js loads only after the page is idle on desktop, or on the first touch/scroll on
phones; a static mark is shown until then and for browsers without WebGL. Reduced-motion users get a
still frame.
