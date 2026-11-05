import { useRef, useState } from 'react'
import clsx from 'clsx'
import { PageHero } from '../components/PageHero'
import { CTABand } from '../components/CTABand'
import { Flag } from '../components/ui/Flag'
import { Pattern } from '../components/ui/Pattern'
import { countryName, secretariat, type Country } from '../data/site'
import { asset } from '../lib/asset'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { useReveal } from '../lib/useReveal'

type Filter = 'all' | Country

export default function Secretariat() {
  const ref = useRef<HTMLDivElement>(null)
  const grid = useRef<HTMLUListElement>(null)
  const [filter, setFilter] = useState<Filter>('all')
  useReveal(ref)

  const people = secretariat.filter((m) => filter === 'all' || m.country === filter)
  const counts: Record<string, number> = { all: secretariat.length, ug: secretariat.filter((m) => m.country === 'ug').length, rw: secretariat.filter((m) => m.country === 'rw').length }

  useGSAP(
    () => {
      if (prefersReducedMotion() || !grid.current) return
      gsap.from(grid.current.children, { y: 40, opacity: 0, duration: 0.9, stagger: 0.05, ease: 'expo.out' })
    },
    { dependencies: [filter], scope: ref },
  )

  return (
    <div ref={ref}>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Secretariat' }]}
        eyebrow="Meet our secretariat"
        title={
          <>
            The people who run <span className="accent text-gold-ink">Beyond the Bar.</span>
          </>
        }
        intro={<p>Ten people across Uganda and Rwanda lead BTB's projects and events, innovation and technology, legal and corporate affairs, communication, sustainability and community impact.</p>}
      />

      <section className="py-14 md:py-20" aria-label="Secretariat members">
        <div className="wrap">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by country">
            {(['all', 'ug', 'rw'] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={clsx(
                  'flex min-h-11 items-center gap-2 rounded-full px-5 text-[14px] font-medium ring-1 ring-inset transition-colors duration-300',
                  filter === f ? 'bg-navy text-ivory ring-navy' : 'text-navy ring-navy/20 hover:bg-sand',
                )}
              >
                {f !== 'all' && <Flag code={f} className="h-3 w-[18px]" />}
                {f === 'all' ? 'Everyone' : countryName[f]}
                <span className={clsx('tabular text-[12px]', filter === f ? 'text-gold' : 'text-taupe-ink')}>{counts[f]}</span>
              </button>
            ))}
          </div>

          <ul ref={grid} className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {people.map((m) => (
              <li key={m.name} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-gradient-to-b from-navy-3 via-navy-2 to-navy">
                  <Pattern className="inset-0 text-ivory opacity-[0.05]" size={220} />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gold/25 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <img
                    src={asset(m.photo)}
                    alt={`Portrait of ${m.name}`}
                    loading="lazy"
                    className="absolute bottom-0 left-1/2 h-[90%] w-auto max-w-none -translate-x-1/2 object-contain transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                  <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-ivory/90 py-1 pr-2.5 pl-1.5 text-[11px] font-medium text-navy backdrop-blur">
                    <Flag code={m.country} className="h-3 w-[18px]" />
                    {countryName[m.country]}
                  </span>
                </div>
                <p className="font-display-x mt-4 text-[1.05rem] leading-tight font-semibold tracking-[-0.01em] uppercase [font-variation-settings:'wdth'_110]">{m.name}</p>
                <p className="mt-1.5 text-[14px] leading-snug text-taupe-ink">{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand
        eyebrow="Work with the secretariat"
        title={
          <>
            Questions, ideas or partnerships? <span className="accent text-gold">Start here.</span>
          </>
        }
        text="The secretariat coordinates every BTB programme, from monthly webinars to community legal clinics. Write to the team and they will route your note to the right lead."
        secondary={{ to: '/programmes', label: 'See the programmes' }}
      />
    </div>
  )
}
