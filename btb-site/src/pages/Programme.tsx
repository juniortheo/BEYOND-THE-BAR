import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from 'lucide-react'
import { programmes } from '../data/site'
import { webinarTwo } from '../data/webinarTwo'
import { ProgrammeVisual } from '../components/ProgrammeVisual'
import { EnquiryForm } from '../components/EnquiryForm'
import { TLink } from '../components/TLink'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { Pattern } from '../components/ui/Pattern'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { useReveal } from '../lib/useReveal'
import NotFound from './NotFound'

export default function ProgrammePage() {
  const { slug } = useParams()
  const index = programmes.findIndex((p) => p.slug === slug)
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, [slug])

  useGSAP(
    () => {
      if (index < 0 || prefersReducedMotion()) return
      const tl = gsap.timeline({ delay: 0.35 })
      tl.from('.pp-hero .pv-panel', { scaleY: 0.6, opacity: 0, transformOrigin: 'bottom center', duration: 1.4, ease: 'expo.out' }, 0)
        .from('.pp-hero .pv-object', { yPercent: 25, opacity: 0, duration: 1.6, ease: 'expo.out' }, 0.25)
        .from('.pp-fade', { y: 26, opacity: 0, duration: 1.1, stagger: 0.07 }, 0.3)
      SplitText.create('.pp-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => gsap.from(self.lines, { yPercent: 115, duration: 1.3, stagger: 0.08, delay: 0.55 }),
      })
      gsap.fromTo('.pp-hero .pv-object', { y: 0 }, { y: -60, ease: 'none', scrollTrigger: { trigger: '.pp-hero', start: 'top top', end: 'bottom top', scrub: true } })
    },
    { scope: ref, dependencies: [slug] },
  )

  if (index < 0) return <NotFound />
  const p = programmes[index]
  const prev = programmes[(index - 1 + programmes.length) % programmes.length]
  const next = programmes[(index + 1) % programmes.length]

  return (
    <div ref={ref} key={p.slug}>
      {/* hero */}
      <header className="pp-hero relative overflow-hidden pt-[calc(var(--nav-h)+env(safe-area-inset-top,0px)+40px)] pb-20 md:pt-[calc(var(--nav-h)+64px)] md:pb-28">
        <div className="wrap">
          <nav aria-label="Breadcrumb" className="pp-fade">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-taupe-ink">
              <li>
                <TLink to="/" className="link-u hover:text-navy">Home</TLink>
              </li>
              <li aria-hidden="true" className="text-line">/</li>
              <li>
                <TLink to="/programmes" className="link-u hover:text-navy">Programmes</TLink>
              </li>
              <li aria-hidden="true" className="text-line">/</li>
              <li aria-current="page" className="text-navy">{p.short}</li>
            </ol>
          </nav>

          <div className="mt-10 grid items-center gap-14 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <ProgrammeVisual p={p} eager className="h-[58svh] min-h-[340px] lg:h-[74vh] lg:max-h-[700px]" numberSize="text-[12rem]" />

            <div>
              <div className="pp-fade flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-navy px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-ivory">
                  Programme {p.number} <span className="text-ivory/50">of 0{programmes.length}</span>
                </span>
                <span className="rounded-full bg-gold/30 px-3.5 py-1.5 text-[12px] font-medium text-gold-ink">
                  {p.items.length} {p.unit}
                </span>
              </div>
              <h1 className="pp-title h-display mt-6 text-[clamp(2.4rem,4.8vw,4.6rem)]">{p.title}</h1>
              <p className="pp-fade mt-5 font-serif text-[1.3rem] leading-snug text-gold-ink italic">{p.lede}</p>
              <div className="pp-fade prose-btb mt-6 max-w-[56ch]">
                {p.intro.map((t) => (
                  <p key={t.slice(0, 24)}>{t}</p>
                ))}
              </div>
              <dl className="pp-fade mt-10 grid grid-cols-[repeat(auto-fit,minmax(8.5rem,1fr))] gap-x-6 gap-y-8 border-t border-line pt-8">
                {p.facts.map((f) => (
                  <div key={f.label}>
                    <dt className="sr-only">{f.label}</dt>
                    <dd>
                      <span className="font-display-x block text-[clamp(1.7rem,2.6vw,2.4rem)] leading-none font-semibold tabular">{f.value}</span>
                      <span className="mt-2 block text-[13px] leading-snug text-taupe-ink">{f.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </header>

      {/* items */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="items-h">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow data-reveal>{p.short}</Eyebrow>
              <h2 id="items-h" data-split className="h-section mt-5 text-[clamp(2rem,3.8vw,3.4rem)]">
                {p.listLabel}
              </h2>
            </div>
            <p data-reveal className="font-display-x text-[clamp(3.5rem,7vw,6rem)] leading-none font-bold text-gold tabular">
              {String(p.items.length).padStart(2, '0')}
            </p>
          </div>
          <ul data-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {p.items.map((it, i) => (
              <li
                key={it.text}
                className="group relative flex min-h-[170px] flex-col justify-between overflow-hidden rounded-[22px] bg-ivory p-6 ring-1 ring-line transition-colors duration-500 hover:bg-navy hover:text-ivory md:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-full bg-gold/25 text-gold-ink transition-colors duration-500 group-hover:bg-gold group-hover:text-navy">
                    <Icon name={it.icon} className="size-5" />
                  </span>
                  <span className="font-display-x text-[13px] font-semibold text-taupe tabular group-hover:text-gold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-8 text-[1.15rem] leading-snug font-medium">{it.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* closing statement + note */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <Pattern className="top-0 left-[-10%] h-full w-[50%] text-navy opacity-[0.035]" size={380} />
        <div className="wrap relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <span aria-hidden="true" className="font-serif text-[6rem] leading-[0.5] text-gold">“</span>
            <p data-split className="mt-2 font-serif text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.25] tracking-[-0.01em]">
              {p.closing}
            </p>
            {p.note && (
              <p data-reveal className="mt-10 flex max-w-2xl gap-3 rounded-2xl bg-sand/70 p-5 text-[15px] leading-relaxed text-navy/85">
                <Info className="mt-0.5 size-5 shrink-0 text-gold-ink" />
                {p.note}
              </p>
            )}
          </div>
        </div>

        {(p.slug === 'webinar-series' || p.slug === 'research-hub' || p.slug === 'executive-training') && (
          <div className="wrap mt-16">
            <TLink
              to="/sessions/ai-in-legal-practice"
              data-reveal
              className="group relative grid gap-6 overflow-hidden rounded-[28px] bg-navy p-8 text-ivory md:grid-cols-[1fr_auto] md:items-center md:p-12"
            >
              <Pattern className="inset-0 text-ivory opacity-[0.04]" size={300} />
              <div className="relative">
                <p className="eyebrow text-gold">
                  {p.slug === 'research-hub' ? 'From the Hub' : 'From the series'} · {webinarTwo.series} · {webinarTwo.dateShort}
                </p>
                <p className="h-card mt-4 text-[clamp(1.6rem,3vw,2.6rem)]">
                  {webinarTwo.title}: <span className="accent text-gold">{webinarTwo.subtitle}</span>
                </p>
                <p className="mt-4 text-[15px] text-ivory/70">
                  {webinarTwo.attendees} attendees · panel from {webinarTwo.jurisdictions} · session report with two practical checklists
                </p>
              </div>
              <span className="relative grid size-16 place-items-center rounded-full bg-gold text-navy transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-6" />
              </span>
            </TLink>
          </div>
        )}
      </section>

      {/* take part */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="part-h">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow data-reveal>Take part</Eyebrow>
            <h2 id="part-h" data-split className="h-section mt-6 text-[clamp(2rem,3.8vw,3.4rem)]">
              Interested in <span className="accent text-gold-ink">{p.short}?</span>
            </h2>
            <p data-reveal className="mt-6 max-w-[42ch] font-serif text-lg leading-relaxed text-navy/75">
              Send the secretariat a note. Your email is pre-addressed and tagged with this programme so it reaches the right coordinator.
            </p>
          </div>
          <div data-reveal className="rounded-[28px] bg-ivory p-6 ring-1 ring-line md:p-10 lg:col-span-7">
            <EnquiryForm key={p.slug} defaultInterest={p.slug} />
          </div>
        </div>
      </section>

      {/* prev / next */}
      <nav className="border-t border-line" aria-label="More programmes">
        <div className="wrap grid md:grid-cols-2">
          {[
            { p: prev, dir: 'Previous', icon: <ArrowLeft className="size-5" /> },
            { p: next, dir: 'Next', icon: <ArrowRight className="size-5" /> },
          ].map(({ p: q, dir, icon }) => (
            <TLink
              key={dir}
              to={`/programmes/${q.slug}`}
              className={`group flex flex-col gap-3 py-12 md:py-16 ${dir === 'Next' ? 'border-t border-line md:items-end md:border-t-0 md:border-l md:pl-10 md:text-right' : 'md:pr-10'}`}
            >
              <span className="flex items-center gap-2 text-[13px] text-taupe-ink">
                {dir === 'Previous' && icon}
                {dir} programme · {q.number}
                {dir === 'Next' && icon}
              </span>
              <span className="h-card text-[clamp(1.5rem,2.6vw,2.4rem)] transition-colors group-hover:text-gold-ink">{q.title}</span>
            </TLink>
          ))}
        </div>
      </nav>

      <div className="wrap pb-20">
        <Button to="/programmes" variant="ghost">
          All programmes
        </Button>
      </div>
    </div>
  )
}
