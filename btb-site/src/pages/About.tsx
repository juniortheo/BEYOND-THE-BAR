import { useRef } from 'react'
import { PageHero } from '../components/PageHero'
import { CTABand } from '../components/CTABand'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Pattern } from '../components/ui/Pattern'
import { Flag } from '../components/ui/Flag'
import { Icon } from '../components/ui/Icon'
import { Monogram } from '../components/Logo'
import { about, site } from '../data/site'
import { asset } from '../lib/asset'
import { useReveal } from '../lib/useReveal'
import { gsap, useGSAP } from '../lib/gsap'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.ab-skyline', { yPercent: 12 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.ab-where', start: 'top bottom', end: 'bottom top', scrub: true } })
        gsap.fromTo('.ab-column', { yPercent: 10 }, { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.ab-who', start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref}>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { label: 'About' }]}
        eyebrow="About Beyond the Bar"
        title={
          <>
            A platform that extends <span className="accent text-gold-ink">beyond</span> traditional legal practice.
          </>
        }
        intro={<p>{about.whoWeAre[0]}</p>}
        aside={
          <dl className="grid grid-cols-2 gap-6 border-l border-line pl-6">
            <div>
              <dt className="text-[13px] text-taupe-ink">Founded by</dt>
              <dd className="font-display-x mt-1 text-3xl font-semibold">2 firms</dd>
            </div>
            <div>
              <dt className="text-[13px] text-taupe-ink">Programmes</dt>
              <dd className="font-display-x mt-1 text-3xl font-semibold">6 + 1</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[13px] text-taupe-ink">Where we work</dt>
              <dd className="mt-1 text-[17px] font-medium">{site.regions} and beyond</dd>
            </div>
          </dl>
        }
      />

      {/* who we are */}
      <section className="ab-who relative overflow-hidden py-24 md:py-32" aria-labelledby="who-h">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="relative hidden lg:col-span-4 lg:block">
            <div className="sticky top-32 h-[70vh]">
              <img src={asset('img/programmes/research-column.webp')} alt="" aria-hidden="true" className="ab-column mx-auto h-full w-auto object-contain opacity-90" loading="lazy" />
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Eyebrow data-reveal>Who we are</Eyebrow>
            <h2 id="who-h" data-split className="h-section mt-6 text-[clamp(2rem,3.8vw,3.4rem)]">
              Cross-border collaboration, knowledge exchange and <span className="accent text-gold-ink">professional growth.</span>
            </h2>
            <div data-reveal className="prose-btb mt-8">
              <p>{about.whoWeAre[1]}</p>
              <p>{about.whoWeAre[2]}</p>
            </div>
            <ul data-stagger className="mt-10 flex flex-wrap gap-2">
              {about.audiences.map((a) => (
                <li key={a} className="rounded-full bg-paper px-4 py-2 text-[14px] font-medium ring-1 ring-line">
                  {a}
                </li>
              ))}
            </ul>

            <div className="mt-16 grid gap-5 md:grid-cols-2">
              <article data-reveal className="relative overflow-hidden rounded-[28px] bg-navy p-8 text-ivory md:p-10">
                <Pattern className="inset-0 text-ivory opacity-[0.05]" size={260} />
                <p className="eyebrow relative text-gold">Our mission</p>
                <p className="relative mt-5 font-serif text-[1.35rem] leading-snug">{about.mission}</p>
              </article>
              <article data-reveal data-delay="0.1" className="relative overflow-hidden rounded-[28px] bg-gold p-8 text-navy md:p-10">
                <Pattern className="inset-0 text-navy opacity-[0.06]" size={260} />
                <p className="eyebrow relative text-navy/70">Our vision</p>
                <p className="relative mt-5 font-serif text-[1.35rem] leading-snug">{about.vision}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* background */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="bg-h">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow data-reveal>Background</Eyebrow>
              <h2 id="bg-h" data-split className="h-section mt-6 text-[clamp(2rem,3.8vw,3.4rem)]">
                Conceived from a <span className="accent text-gold-ink">shared vision.</span>
              </h2>
            </div>
            <div data-reveal className="prose-btb lg:col-span-7">
              {about.background.map((t) => (
                <p key={t.slice(0, 20)}>{t}</p>
              ))}
            </div>
          </div>

          <h3 data-reveal className="eyebrow mt-20 text-taupe-ink">BTB was therefore established to</h3>
          <ul data-stagger className="mt-6 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {about.establishedTo.map((e) => (
              <li key={e.text} className="group flex gap-5 border-b border-line py-8 sm:pr-8 lg:[&:nth-child(3n+2)]:border-x lg:[&:nth-child(3n+2)]:px-8 lg:[&:nth-child(3n)]:pl-8">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gold/25 text-gold-ink transition-colors duration-500 group-hover:bg-navy group-hover:text-gold">
                  <Icon name={e.icon} className="size-5" />
                </span>
                <p className="pt-2 text-[17px] leading-snug text-navy">{e.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* founders */}
      <section className="py-24 md:py-32" aria-labelledby="f-h">
        <div className="wrap">
          <Eyebrow data-reveal>The founding partnership</Eyebrow>
          <h2 id="f-h" data-split className="h-section mt-6 max-w-[20ch] text-[clamp(2rem,3.8vw,3.4rem)]">
            Two firms, two jurisdictions, <span className="accent text-gold-ink">one independent platform.</span>
          </h2>
          <div className="mt-14 grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
            {site.founders.map((f, i) => (
              <div key={f.name} className="contents">
                {i === 1 && (
                  <div data-reveal className="flex items-center justify-center py-2 md:px-4">
                    <div className="grid size-24 place-items-center rounded-full bg-navy p-5">
                      <Monogram tone="light" className="w-full" />
                    </div>
                  </div>
                )}
                <article data-reveal className="flex flex-col justify-between gap-10 rounded-[28px] bg-paper p-8 ring-1 ring-line md:p-10">
                  <img src={asset(f.logo)} alt={f.name} className="h-20 w-auto self-start mix-blend-multiply" loading="lazy" />
                  <div>
                    <p className="h-card text-2xl">{f.name}</p>
                    <p className="mt-2 flex items-center gap-2 text-[15px] text-taupe-ink">
                      <Flag code={f.code} className="h-3 w-[18px]" /> {f.country}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* where we work */}
      <section className="ab-where on-navy relative overflow-hidden bg-navy text-ivory" aria-labelledby="w-h">
        <div className="wrap relative grid gap-10 pt-24 md:pt-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow light data-reveal>
              Today
            </Eyebrow>
            <p id="w-h" data-split className="mt-6 font-serif text-[clamp(1.7rem,3.2vw,2.8rem)] leading-[1.22]">
              {about.today}
            </p>
          </div>
          <div data-reveal className="self-end lg:col-span-4 lg:col-start-9">
            <ul className="space-y-3 text-[17px]">
              <li className="flex items-center gap-3">
                <Flag code="ug" /> Uganda
              </li>
              <li className="flex items-center gap-3">
                <Flag code="rw" /> Rwanda
              </li>
              <li className="flex items-center gap-3 text-ivory/70">
                <span className="grid h-4 w-6 place-items-center rounded-[2px] bg-gold/30 text-[9px] text-gold">EA</span> East Africa and beyond
              </li>
            </ul>
          </div>
        </div>
        <div className="relative mt-16 h-[34vw] max-h-[420px] min-h-[180px] overflow-hidden">
          <img src={asset('img/kigali-skyline.webp')} alt="City skyline in East Africa" loading="lazy" className="ab-skyline absolute inset-x-0 bottom-0 w-full object-cover object-bottom" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/10 to-transparent" />
        </div>
      </section>

      <CTABand />
    </div>
  )
}
