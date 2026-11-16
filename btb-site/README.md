# Beyond the Bar — website

React + TypeScript + Vite, styled with Tailwind CSS v4, animated with GSAP (ScrollTrigger, SplitText) and Lenis smooth scrolling.

## Run it

```bash
npm install
npm run dev          # local development at http://localhost:5173
npm run build        # production build in dist/ (clean URLs, e.g. /programmes/conferences)
npm run build:preview  # relative, hash-routed build that runs from any folder
```

Deploy `dist/` to any static host. Clean URLs need a fallback to `index.html`:
`vercel.json` (Vercel) and `public/_redirects` (Netlify) are already included.

## Pages

| Route | Content |
| --- | --- |
| `/` | Home: scroll-driven Lady Justice, who we are, mission and vision, audiences, the seven programmes (horizontal scroll), Webinar Two highlights, secretariat, founders |
| `/about` | Who we are, mission, vision, background, "established to", founding partnership |
| `/programmes` | Index of all programmes |
| `/programmes/:slug` | One page per programme: `webinar-series`, `executive-training`, `conferences`, `community-impact`, `research-hub`, `cross-border-desk`, `alumni-network` |
| `/sessions` | Webinar & Talk Show Series and the latest session |
| `/reports` | All reports, each with a Download PDF button |
| `/secretariat` | All ten secretariat members, filterable by country |
| `/contact` | Email, phone numbers, LinkedIn and an enquiry form that writes an email to the secretariat |

## Phones and tablets

Below 1024px the site switches to a lighter mobile version. Desktop (1024px and up) is unaffected.

- Lady Justice sits in the hero and scrolls away with the page instead of following you down it.
- Sections take their natural height, and the programmes become a swipeable row.
- No fade-in-on-scroll, counting numbers, parallax or page-change curtain: content is there as soon as it scrolls in, and pages open instantly.
- Touch details: no grey tap flash, instant taps, a small press effect on buttons, the menu locks the page behind it, and the phone's status bar matches the top of the page.

Keep new mobile changes behind `max-lg:` classes, `(pointer: coarse)` media queries, or `isDesktop()` / `DESKTOP_MOTION_QUERY` from `src/lib/gsap.ts`, so desktop stays as it is.

## Reports

`/reports` is the central Reports page, in the main menu on desktop and mobile. Each report is a card with its cover, a short description and a **Download PDF** button.

To publish a new report:

1. Add the PDF to `public/downloads/` and a cover image (page 1 of the PDF works well) to `public/img/`.
2. Add an entry at the top of `reports` in `src/data/site.ts` with its title, description, file, page count and size.

The old report page address (`/sessions/ai-in-legal-practice`) redirects to `/reports` through `public/_redirects`.

## Editing content

All words live in two files, so nobody needs to touch the layout to update text:

- `src/data/site.ts` — contact details, about text, mission and vision, programmes, secretariat
- `src/data/webinarTwo.ts` — Webinar Two details used on the home and Sessions pages

Images are in `public/img/`. Brand colours and fonts are tokens at the top of `src/styles/index.css`.

## Brand

- Logo: vector, taken from the BTB brand guide (`public/img/btb-mono.svg`, `btb-word.svg`, `btb-stack.svg`)
- Colours: navy `#082640`, taupe `#82786e`, gold `#cfa071`, blue `#5184fb` (focus rings), plus darker text tints for contrast
- Pattern: the brand-guide pattern, used as a recolourable texture
- Type: Archivo (headlines), Source Serif 4 (reading text and accents), Rubik (interface, from the brand guide).
  The guide's primary font is "Intro Demo", a demo licence that cannot be used on a public website; Archivo stands in until BTB licenses the full Intro family.

## Things for BTB to confirm

- Sheba's surname is spelt "Ganyanna" in the profile and "Ganyana" in the Webinar Two report. Both spellings are kept where they appear; change them in the data files once confirmed.
- The profile and report use a single-"B" logo, while the brand guide uses the double-"B" pillar monogram. The site uses the brand guide version.
- LinkedIn: no profile URL was supplied, so the link opens a LinkedIn search for "Beyond the Bar (BTB)". Replace `linkedinUrl` in `src/data/site.ts` with the real page URL.
- Forms open a pre-written email to beyondthebar.a@gmail.com. To receive submissions directly, connect a form service (for example Formspree) in `src/components/EnquiryForm.tsx`.
- The Cross-Border Desk page adds one line saying legal advice is given by the founding or partner firms under their own engagement terms. Remove it from `src/data/site.ts` if BTB prefers.
