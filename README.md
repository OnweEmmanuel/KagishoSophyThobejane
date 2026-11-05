# Kagisho Sophy Thobejane · Digital CV

A one-page animated CV for an admitted attorney, built with **React 19 + Vite + TypeScript** and **GSAP** (ScrollTrigger, DrawSVG). Hosted on **Netlify** (free plan).

Palette: Egyptian Blue `#03203D` (canvas) · Stone Blue `#639CC5` (support) · Scarlet Red `#EB2F33` (accent).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run lint
```

## Where things live

| Path | What |
|---|---|
| `src/data/profile.ts` | **All content.** Unknowns are `ph('...')` placeholders; replace them with plain strings. |
| `src/sections/` | One component per section: Hero, About, Statement, Focus, Path, Experience, Credentials, Skills, Honours, Service, Contact, Footer. |
| `src/components/` | Artwork and UI pieces: courthouse, scales, wax seal, crime-scene tape, medals, icons, nav, draft notice. |
| `src/lib/config.ts` | Draft mode and contact-form settings (from `.env`). |
| `src/lib/useScrollAnimations.ts` | Site-wide scroll animations (`.reveal`, `[data-stagger]`, `.draw`, `[data-count]`). |
| `src/lib/useCardFX.ts` | Cursor spotlight and 3D tilt on cards. |
| `src/styles/global.css` | Design tokens and all styles. |
| `public/og.png` | Link-preview image (WhatsApp, LinkedIn, email). |
| `docs/content-brief.md` | Source content from LinkedIn and open questions. |

All animation switches off for visitors with *reduced motion* enabled.

## Deploying (Netlify)

Netlify builds automatically from GitHub: every push to `main` updates the live site. `netlify.toml` holds the build settings and, while in draft, tells search engines not to index the site.

## Draft preview vs. going live

The site ships in **draft mode**: a "Draft preview" notice, dashed placeholder chips, a locked contact form, and search engines blocked.

**Going live checklist** (once she approves):

1. `src/data/profile.ts`: replace every `ph(...)`, add `photo`, `email`, `phone`; confirm the "Before the bar" lessons with her
2. Contact form: create a free form at [formspree.io](https://formspree.io) (submissions are emailed to her), then set `VITE_FORM_ENDPOINT` in `.env`
3. `.env`: `VITE_DRAFT=false` and `VITE_ROBOTS=index, follow`
4. `public/robots.txt`: change `Disallow: /` to `Allow: /`
5. `netlify.toml`: delete the `X-Robots-Tag` headers block
6. Link previews pick up the live address automatically on Netlify (see `vite.config.ts`)
7. Optional: add her custom domain in Netlify → Site configuration → Domain management
