import { useRef, useState } from 'react'
import clsx from 'clsx'
import { ArrowRight, ArrowUpRight, GraduationCap, Globe, Landmark, Mic, Play } from 'lucide-react'
import { asset } from '../lib/asset'
import { gsap, ScrollTrigger, SplitText, useGSAP, queueRefresh, LINE_FROM } from '../lib/gsap'
import { useReveal } from '../lib/useReveal'
import { about, programmes, secretariat, site } from '../data/site'
import { webinarTwo } from '../data/webinarTwo'
import { Button } from '../components/ui/Button'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Pattern } from '../components/ui/Pattern'
import { Marquee } from '../components/ui/Marquee'
import { Flag } from '../components/ui/Flag'
import { Icon } from '../components/ui/Icon'
import { TLink } from '../components/TLink'
import { ProgrammeVisual } from '../components/ProgrammeVisual'

const quick = [
  { slug: 'webinar-series', icon: Mic },
  { slug: 'executive-training', icon: GraduationCap },
  { slug: 'conferences', icon: Landmark },
  { slug: 'cross-border-desk', icon: Globe },
].map((q) => ({ ...q, p: programmes.find((p) => p.slug === q.slug)! }))

/* positions of the audience chips around the statue (desktop) */
const ring = [
  'lg:left-[6%] lg:top-[22%]',
  'lg:left-[14%] lg:top-[46%]',
  'lg:left-[4%] lg:top-[70%]',
  'lg:right-[6%] lg:top-[20%]',
  'lg:right-[15%] lg:top-[44%]',
  'lg:right-[5%] lg:top-[66%]',
  'lg:left-1/2 lg:-translate-x-1/2 lg:bottom-[6%]',
]

export default function Home() {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  useReveal(root)

  /* ---------------- the journey: Lady Justice moves through the first four sections ---------------- */
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          desktop: '(min-width: 1024px)',
          mobile: '(max-width: 1023.98px)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean }
          if (reduce) return

          // Phones and tablets: a single hero entrance. No sticky stage, nothing tied to scroll.
          if (!desktop) {
            const intro = gsap.timeline({ delay: 0.15 })
            intro.from('.j-statue-m', { yPercent: 8, opacity: 0, duration: 1, ease: 'expo.out' }, 0.25)
            SplitText.create('.j-h1', {
              type: 'lines',
              mask: 'lines',
            linesClass: 'split-line',
              autoSplit: true,
              onSplit: (self) => gsap.from(self.lines, { yPercent: LINE_FROM, duration: 0.9, stagger: 0.06, delay: 0.15, ease: 'expo.out' }),
            })
            intro.from('.j-fade', { y: 12, opacity: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out' }, 0.3)
            return
          }

          // intro
          const intro = gsap.timeline({ delay: 0.2 })
          intro
            .from('.j-statue-inner', { yPercent: 30, opacity: 0, duration: 2, ease: 'expo.out' }, 0.1)
            .from('.j-glow', { opacity: 0, scale: 0.6, duration: 2.2 }, 0.2)
          SplitText.create('.j-giant', {
            type: 'chars',
            onSplit: (self) => gsap.from(self.chars, { yPercent: 60, opacity: 0, duration: 1.4, stagger: 0.05, delay: 0.45 }),
          })
          SplitText.create('.j-h1', {
            type: 'lines',
            mask: 'lines',
            linesClass: 'split-line',
            autoSplit: true,
            onSplit: (self) => gsap.from(self.lines, { yPercent: LINE_FROM, duration: 1.3, stagger: 0.1, delay: 0.55 }),
          })
          intro.from('.j-fade', { y: 24, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.7)

          // scroll states
          const W = () => window.innerWidth
          const H = () => window.innerHeight
          type S = gsap.TweenVars
          const states: S[] = [
            { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
            { x: () => W() * 0.25, y: () => H() * 0.02, scale: 0.88, rotation: 3, opacity: 1 },
            { x: 0, y: () => -H() * 0.05, scale: 0.7, rotation: 0, opacity: 1 },
          ]
          ;['.j-mission', '.j-ring'].forEach((sel, i) => {
            gsap.fromTo('.j-statue', states[i], {
              ...states[i + 1],
              ease: 'none',
              immediateRender: false,
              scrollTrigger: { trigger: sel, start: 'top bottom', end: 'top 12%', scrub: 1.1, invalidateOnRefresh: true },
            })
          })
          gsap.to('.j-giant-wrap', {
            yPercent: -40,
            opacity: 0,
            ease: 'none',
            scrollTrigger: { trigger: '.j-mission', start: 'top bottom', end: 'top 35%', scrub: true },
          })
          gsap.fromTo(
            '.j-glow',
            { opacity: 1 },
            { opacity: 0.45, ease: 'none', scrollTrigger: { trigger: '.j-mission', start: 'top bottom', end: 'top top', scrub: true } },
          )
          gsap.from('.j-chip', {
            opacity: 0,
            scale: 0.85,
            y: 20,
            stagger: 0.08,
            duration: 1,
            scrollTrigger: { trigger: '.j-ring', start: 'top 55%', once: true },
          })
        },
      )

      /* ---------------- programmes: horizontal pinned scroll on large screens ---------------- */
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const track = document.querySelector<HTMLElement>('.h-track')
        const pin = document.querySelector<HTMLElement>('.h-pin')
        if (!track || !pin) return
        const distance = () => track.scrollWidth - window.innerWidth
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
        gsap.utils.toArray<HTMLElement>('.hcard-item').forEach((card) => {
          const obj = card.querySelector('.pv-object')
          if (obj)
            gsap.fromTo(
              obj,
              { yPercent: 10 },
              {
                yPercent: -4,
                ease: 'none',
                scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
              },
            )
        })
        gsap.to('.h-progress', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${distance()}`, scrub: true },
        })
      })
    },
    { scope: root },
  )

  const q = quick[active]

  return (
    <div ref={root}>
      {/* ============================ JOURNEY ============================ */}
      <div className="relative">
        {/* sticky stage with Lady Justice */}
        <div className="pointer-events-none sticky top-0 z-0 h-[100svh] overflow-hidden max-lg:hidden" aria-hidden="true">
          <div className="j-giant-wrap absolute inset-x-0 top-[30%] flex justify-center lg:top-[24%]">
            <p className="j-giant outline-word font-display-x text-[clamp(5.5rem,21vw,22rem)] leading-none font-extrabold whitespace-nowrap [font-variation-settings:'wdth'_125]">
              BEYOND
            </p>
          </div>
          <div className="j-statue absolute inset-x-0 -bottom-[4svh] flex origin-bottom justify-center sm:bottom-0">
            <div className="j-statue-inner relative h-[54svh] sm:h-[66svh] lg:h-[86svh]" style={{ aspectRatio: '455 / 944' }}>
              <div className="j-glow absolute top-[8%] left-1/2 aspect-square w-[180%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(207,160,113,0.55)_0%,rgba(207,160,113,0.18)_38%,transparent_66%)]" />
              <img
                src={asset('img/statue-justice.webp')}
                alt=""
                width={910}
                height={1888}
                fetchPriority="high"
                onLoad={() => queueRefresh()}
                className="relative h-full w-full object-contain drop-shadow-[0_40px_50px_rgba(8,38,64,0.28)]"
              />
            </div>
          </div>
        </div>

        {/* ---- 1. hero ---- */}
        <section className="relative z-10 flex flex-col pt-[calc(var(--nav-h)+env(safe-area-inset-top,0px)+28px)] pb-12 lg:-mt-[100svh] lg:min-h-[100svh] lg:pt-[calc(var(--nav-h)+48px)] lg:pb-8">
          <div className="wrap grid flex-1 grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow className="j-fade">{site.regions}</Eyebrow>
              <h1 className="j-h1 h-display mt-6 text-[clamp(2.6rem,4.3vw,4rem)]">
                <span className="whitespace-nowrap">Re-thinking</span> <span className="accent text-gold-ink">legal</span> practice
              </h1>
              <p className="j-fade mt-6 max-w-[36ch] font-serif text-[1.1rem] leading-relaxed text-navy/80">
                A regional platform bridging legal practice, business innovation, leadership and regional integration.<span className="hidden sm:inline"> Founded by Cavenbridge Advocates and Trust Law Chambers.</span>
              </p>
            </div>

            {/* quick programme switcher (desktop) */}
            <div className="j-fade hidden lg:col-span-3 lg:col-start-10 lg:block">
              <div className="flex gap-3" role="tablist" aria-label="Programmes">
                {quick.map((item, i) => (
                  <button
                    key={item.slug}
                    role="tab"
                    aria-selected={i === active}
                    aria-label={item.p.short}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={clsx(
                      'grid size-14 place-items-center rounded-full ring-1 transition-all duration-500',
                      i === active ? 'bg-gold text-navy ring-gold' : 'bg-ivory/60 text-gold-ink ring-gold/60 hover:bg-sand',
                    )}
                  >
                    <item.icon className="size-5" strokeWidth={1.6} />
                  </button>
                ))}
              </div>
              <div className="mt-8 min-h-[150px]" role="tabpanel">
                <TLink to={`/programmes/${q.p.slug}`} className="group flex items-start gap-3">
                  <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-gold-ink transition-transform group-hover:rotate-45" />
                  <span>
                    <span className="block text-[17px] font-medium text-navy">{q.p.short}</span>
                    <span className="mt-2 block font-serif text-[15px] leading-relaxed text-navy/70">{q.p.lede}</span>
                  </span>
                </TLink>
              </div>
              <ul className="mt-2 space-y-3 border-t border-navy/10 pt-5">
                {quick
                  .filter((_, i) => i !== active)
                  .map((item) => (
                    <li key={item.slug}>
                      <TLink to={`/programmes/${item.p.slug}`} className="group flex items-center gap-3 text-[15px] text-taupe-ink hover:text-navy">
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        {item.p.short}
                      </TLink>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Lady Justice in the page flow on phones and tablets */}
          <div className="wrap mt-6 lg:hidden" aria-hidden="true">
            <div className="relative mx-auto h-[min(54svh,520px)]" style={{ aspectRatio: '455 / 944' }}>
              <div className="absolute top-[8%] left-1/2 aspect-square w-[170%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(207,160,113,0.4)_0%,rgba(207,160,113,0.12)_38%,transparent_66%)]" />
              <img
                src={asset('img/statue-justice.webp')}
                alt=""
                width={910}
                height={1888}
                className="j-statue-m relative h-full w-full object-contain drop-shadow-[0_28px_32px_rgba(8,38,64,0.24)]"
              />
            </div>
          </div>
        </section>

        {/* ---- 3. mission & vision ---- */}
        <section className="j-mission relative z-10 flex items-center py-16 max-lg:bg-paper lg:min-h-[100svh] lg:py-24">
          <div className="wrap grid lg:grid-cols-12">
            <div className="space-y-10 lg:col-span-6 lg:space-y-12">
              <div>
                <Eyebrow data-reveal>Our mission</Eyebrow>
                <p data-split className="mt-5 font-serif text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.22] tracking-[-0.01em] text-navy">
                  {about.mission}
                </p>
              </div>
              <div className="hairline" />
              <div>
                <Eyebrow data-reveal>Our vision</Eyebrow>
                <p data-split className="mt-5 font-serif text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.22] tracking-[-0.01em] text-navy">
                  To become the <span className="italic text-gold-ink">leading regional platform</span> for legal innovation, professional excellence, and cross-border collaboration in Africa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- 4. who we bring together ---- */}
        <section className="j-ring relative z-10 py-16 lg:min-h-[100svh] lg:py-24">
          <div className="wrap text-center">
            <Eyebrow data-reveal className="justify-center">
              Who we bring together
            </Eyebrow>
            <h2 data-split className="h-section mx-auto mt-6 max-w-[18ch] text-[clamp(2.2rem,4.4vw,4rem)]">
              One room for law, business and <span className="accent text-gold-ink">policy.</span>
            </h2>
          </div>
          <ul className="wrap mt-10 flex flex-wrap justify-center gap-2 lg:absolute lg:inset-0 lg:mt-0 lg:block">
            {about.audiences.map((a, i) => (
              <li
                key={a}
                className={clsx(
                  'j-chip rounded-full bg-paper/90 px-4 py-2 text-[15px] font-medium text-navy ring-1 ring-gold/40 lg:absolute lg:px-6 lg:py-3 lg:text-[17px] lg:shadow-[0_10px_30px_-12px_rgba(8,38,64,0.35)] lg:backdrop-blur',
                  ring[i],
                )}
              >
                <span className="mr-2 text-gold-ink max-lg:hidden">◆</span>
                {a}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* ============================ PROGRAMMES (horizontal) ============================ */}
      <section className="relative z-10 bg-paper" aria-labelledby="prog-h">
        <div className="h-pin relative flex flex-col justify-center overflow-hidden py-16 lg:min-h-[100svh] lg:py-0">
          <div className="wrap flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow data-reveal>Our programmes</Eyebrow>
              <h2 id="prog-h" data-split className="h-section mt-5 max-w-[16ch] text-[clamp(2.2rem,4.4vw,4rem)]">
                Six programmes and a <span className="accent text-gold-ink">lifelong</span> network.
              </h2>
            </div>
            <div data-reveal className="flex items-center gap-6">
              <div className="hidden h-[2px] w-40 overflow-hidden rounded bg-line lg:block">
                <div className="h-progress h-full w-full origin-left scale-x-0 bg-navy" />
              </div>
              <Button to="/programmes" variant="ghost">
                All programmes
              </Button>
              <span className="text-[13px] text-taupe-ink lg:hidden">Swipe to see all seven</span>
            </div>
          </div>

          <div className="h-track mt-8 flex gap-4 px-[var(--gutter)] max-lg:snap-x max-lg:snap-mandatory max-lg:scroll-px-[var(--gutter)] max-lg:overflow-x-auto max-lg:overscroll-x-contain max-lg:pb-2 max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden lg:mt-14 lg:w-max lg:flex-row lg:gap-10 lg:pr-[12vw]">
            {programmes.map((p) => (
              <article
                key={p.slug}
                className="hcard-item grid gap-8 max-lg:w-[min(84vw,440px)] max-lg:shrink-0 max-lg:snap-start max-lg:content-start max-lg:gap-5 lg:w-[min(1040px,78vw)] lg:shrink-0 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-12"
              >
                <TLink to={`/programmes/${p.slug}`} className="block rounded-[28px]" aria-label={p.title}>
                  <ProgrammeVisual p={p} className="h-[320px] min-h-[300px] sm:h-[360px] lg:h-[58vh] lg:max-h-[560px]" />
                </TLink>
                <div className="pb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-display-x text-sm font-semibold text-gold-ink tabular">{p.number}</span>
                    <span className="rounded-full bg-sand px-3 py-1 text-[12px] font-medium text-taupe-ink">
                      {p.items.length} {p.unit}
                    </span>
                  </div>
                  <h3 className="h-card mt-4 text-[clamp(1.8rem,2.6vw,2.6rem)]">{p.title}</h3>
                  <p className="mt-4 max-w-[48ch] font-serif text-[1.08rem] leading-relaxed text-navy/75">{p.lede}</p>
                  <ul className="mt-6 grid gap-2.5 border-t border-navy/10 pt-5">
                    {p.items.slice(0, 3).map((it) => (
                      <li key={it.text} className="flex items-center gap-3 text-[15px] text-navy/80">
                        <Icon name={it.icon} className="size-4.5 shrink-0 text-gold-ink" />
                        {it.text}
                      </li>
                    ))}
                  </ul>
                  <TLink to={`/programmes/${p.slug}`} className="group mt-7 inline-flex items-center gap-2 text-[15px] font-medium">
                    <span className="link-u">Explore the programme</span>
                    <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                  </TLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ THEMES MARQUEE ============================ */}
      <div className="relative z-10 border-y border-navy/10 bg-gold py-5 text-navy">
        <Marquee
          duration={60}
          items={programmes[0].items.map((t) => (
            <span key={t.text} className="flex items-center gap-6 px-6">
              <span className="font-display-x text-[clamp(1.2rem,2vw,1.6rem)] font-semibold whitespace-nowrap">{t.text}</span>
              <span aria-hidden="true" className="size-2 rotate-45 bg-navy" />
            </span>
          ))}
        />
      </div>

      {/* ============================ LATEST SESSION ============================ */}
      <section className="on-navy relative z-10 overflow-hidden bg-navy text-ivory" aria-labelledby="sess-h">
        <Pattern className="top-0 left-0 h-full w-[50%] text-ivory opacity-[0.035]" size={420} />
        <div className="wrap relative grid gap-8 py-24 md:py-32 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow light data-reveal>
              {webinarTwo.series} · {webinarTwo.date}
            </Eyebrow>
            <h2 id="sess-h" data-split className="h-section mt-6 text-[clamp(2.4rem,5vw,4.6rem)]">
              {webinarTwo.title}
            </h2>
            <p data-reveal className="mt-4 font-display-x text-[clamp(1.2rem,2vw,1.6rem)] font-medium text-gold">
              {webinarTwo.subtitle}
            </p>
            <p data-reveal className="mt-8 flex items-center gap-4 font-serif text-xl italic text-ivory/85">
              <span className="h-px w-12 bg-ivory/40" /> {webinarTwo.theme}
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p data-reveal className="max-w-[56ch] font-serif text-lg leading-relaxed text-ivory/75">
              {webinarTwo.conversation[1].split('. ').slice(0, 3).join('. ')}.
            </p>
            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <Button to="/reports" variant="gold">
                Read the session report
              </Button>
              <Button href={webinarTwo.youtube} variant="ghost-light" icon={<Play className="size-4" />}>
                Watch on YouTube
              </Button>
            </div>
            <ul data-stagger className="mt-10 flex flex-wrap gap-3">
              {webinarTwo.room.slice(0, 4).map((r) => (
                <li key={r.name} className="flex items-center gap-3 rounded-full bg-ivory/[0.06] py-1.5 pr-4 pl-1.5 ring-1 ring-ivory/10">
                  <img src={asset(r.photo)} alt="" className="size-9 rounded-full object-cover" loading="lazy" />
                  <span className="text-[13px] leading-tight">
                    <span className="block text-ivory">{r.name}</span>
                    <span className="text-ivory/60">
                      {r.badge} · {r.tag}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================ SECRETARIAT ============================ */}
      <section className="relative z-10 overflow-hidden py-24 md:py-32" aria-labelledby="team-h">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <Eyebrow data-reveal>The secretariat</Eyebrow>
            <h2 id="team-h" data-split className="h-section mt-6 text-[clamp(2.2rem,4.4vw,4rem)]">
              Nine people, <span className="accent text-gold-ink">two countries,</span> one platform.
            </h2>
            <p data-reveal className="mt-6 max-w-[44ch] font-serif text-lg leading-relaxed text-navy/75">
              BTB is run by a secretariat split between Uganda and Rwanda, covering projects and events, innovation and technology, legal and corporate affairs, communications, sustainability and governance.
            </p>
            <div data-reveal className="mt-8">
              <Button to="/secretariat" variant="navy">
                Meet the secretariat
              </Button>
            </div>
          </div>
          <ul data-stagger className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:col-span-7">
            {secretariat.map((m) => (
              <li key={m.name} className="group relative w-[calc((100%-2rem)/5)] sm:w-[calc((100%-3rem)/5)]">
                <TLink to="/secretariat" className="block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-b from-navy-3 to-navy">
                    <Pattern className="inset-0 text-ivory opacity-[0.05]" size={200} />
                    <img
                      src={asset(m.photo)}
                      alt={m.name}
                      loading="lazy"
                      className="absolute bottom-0 left-1/2 h-[92%] w-auto max-w-none -translate-x-1/2 object-contain transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                    />
                    <Flag code={m.country} className="absolute top-2 left-2 h-3 w-[18px]" />
                  </div>
                  <p className="mt-2 hidden text-[12px] leading-tight text-navy/80 md:block">{m.name}</p>
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  )
}

// ensure ScrollTrigger is bundled with this page
void ScrollTrigger
