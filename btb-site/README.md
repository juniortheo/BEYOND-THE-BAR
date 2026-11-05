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
| `/sessions/ai-in-legal-practice` | The full Webinar Two session report, with polls, panel and interactive checklists |
| `/secretariat` | All ten secretariat members, filterable by country |
| `/contact` | Email, phone numbers, LinkedIn and an enquiry form that writes an email to the secretariat |

## Editing content

All words live in two files, so nobody needs to touch the layout to update text:

- `src/data/site.ts` — contact details, about text, mission and vision, programmes, secretariat
- `src/data/webinarTwo.ts` — the Webinar Two session report

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
