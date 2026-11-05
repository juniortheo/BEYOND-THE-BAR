import { useRef, useState } from 'react'
import clsx from 'clsx'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { CTABand } from '../components/CTABand'
import { ProgrammeVisual } from '../components/ProgrammeVisual'
import { TLink } from '../components/TLink'
import { Icon } from '../components/ui/Icon'
import { programmes } from '../data/site'
import { gsap, useGSAP } from '../lib/gsap'
import { useReveal } from '../lib/useReveal'

export default function Programmes() {
  const ref = useRef<HTMLDivElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<number | null>(null)
  useReveal(ref)

  // floating preview that follows the pointer over the list (desktop, fine pointer)
  useGSAP(
    () => {
      const el = preview.current
      if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
      const move = (e: PointerEvent) => {
        xTo(e.clientX + 32)
        yTo(e.clientY - 180)
      }
      window.addEventListener('pointermove', move)
      return () => window.removeEventListener('pointermove', move)
    },
    { scope: ref },
  )

  return (
    <div ref={ref}>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Programmes' }]}
        eyebrow="Our programmes"
        title={
          <>
            Six programmes and a <span className="accent text-gold-ink">lifelong</span> network.
          </>
        }
        intro={
          <p>
            From monthly webinars to a cross-border advisory desk, each programme equips professionals and institutions with the knowledge, networks and opportunities to thrive across the region.
          </p>
        }
      />

      <section className="py-16 md:py-24" aria-label="All programmes">
        <ol className="wrap" onMouseLeave={() => setHover(null)}>
          {programmes.map((p, i) => (
            <li key={p.slug} data-reveal className="border-b border-line first:border-t">
              <TLink
                to={`/programmes/${p.slug}`}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-7 md:grid-cols-[5rem_1fr_16rem_auto] md:gap-8 md:py-10"
              >
                <span className="font-display-x self-start pt-2 text-[15px] font-semibold text-gold-ink tabular md:text-lg">{p.number}</span>
                <span>
                  <span className="h-card block text-[clamp(1.5rem,3.4vw,2.9rem)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
                    {p.title}
                  </span>
                  <span className="mt-3 block max-w-[56ch] font-serif text-[1.05rem] leading-relaxed text-navy/70">{p.lede}</span>
                </span>
                <span className="hidden flex-wrap gap-1.5 md:flex">
                  {p.items.slice(0, 4).map((it) => (
                    <span key={it.text} title={it.text} className="grid size-10 place-items-center rounded-full bg-paper text-gold-ink ring-1 ring-line">
                      <Icon name={it.icon} className="size-4.5" />
                    </span>
                  ))}
                  {p.items.length > 4 && (
                    <span className="grid size-10 place-items-center rounded-full bg-paper text-[12px] font-medium text-taupe-ink ring-1 ring-line">+{p.items.length - 4}</span>
                  )}
                </span>
                <span className="grid size-12 place-items-center rounded-full ring-1 ring-navy/20 transition-all duration-500 group-hover:rotate-45 group-hover:bg-navy group-hover:text-gold md:size-14">
                  <ArrowUpRight className="size-5" />
                </span>
              </TLink>
            </li>
          ))}
        </ol>
      </section>

      {/* pointer-following preview */}
      <div
        ref={preview}
        aria-hidden="true"
        className={clsx(
          'pointer-events-none fixed top-0 left-0 z-30 hidden w-[300px] transition-[opacity,scale] duration-500 lg:block',
          hover === null ? 'scale-90 opacity-0' : 'scale-100 opacity-100',
        )}
      >
        {programmes.map((p, i) => (
          <div key={p.slug} className={clsx('absolute inset-x-0 top-0 transition-opacity duration-300', hover === i ? 'opacity-100' : 'opacity-0')}>
            <ProgrammeVisual p={p} className="h-[300px]" numberSize="text-[6rem]" />
          </div>
        ))}
      </div>

      <CTABand
        eyebrow="Not sure where to start?"
        title={
          <>
            Tell us what you need. <span className="accent text-gold">We'll point the way.</span>
          </>
        }
        text="Whether you want to attend a webinar, train a team, sponsor a forum or explore a new market, the secretariat will match you with the right programme."
      />
    </div>
  )
}
