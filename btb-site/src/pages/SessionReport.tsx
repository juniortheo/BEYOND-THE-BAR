import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { CalendarDays, Check, Play, Quote, Video } from 'lucide-react'
import { webinarTwo as W } from '../data/webinarTwo'
import { site } from '../data/site'
import { asset } from '../lib/asset'
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { useReveal } from '../lib/useReveal'
import { useGo } from '../lib/transition'
import { TLink } from '../components/TLink'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Pattern } from '../components/ui/Pattern'
import { Flag } from '../components/ui/Flag'
import { Button } from '../components/ui/Button'
import { Counter } from '../components/ui/Counter'
import { CTABand } from '../components/CTABand'

const sections = [
  { id: 'conversation', label: 'The conversation' },
  { id: 'polls', label: 'What the room told us' },
  { id: 'room', label: 'Who was in the room' },
  { id: 'panel', label: 'Around the panel' },
  { id: 'monday', label: 'What to do on Monday' },
  { id: 'watch', label: 'Watch' },
]

/* ticked checklist items persist per viewer as a convenience */
function useChecklist(key: string, size: number) {
  const [done, setDone] = useState<boolean[]>(() => {
    try {
      const raw = localStorage.getItem(key)
      const arr = raw ? (JSON.parse(raw) as boolean[]) : []
      return Array.from({ length: size }, (_, i) => !!arr[i])
    } catch {
      return Array(size).fill(false)
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(done))
    } catch {
      /* storage unavailable */
    }
  }, [key, done])
  const toggle = (i: number) => setDone((d) => d.map((v, j) => (j === i ? !v : v)))
  return { done, toggle, count: done.filter(Boolean).length }
}

export default function SessionReport() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useGo()
  const [current, setCurrent] = useState('conversation')
  useReveal(ref)
  const qs = useChecklist('btb-w2-questions', W.monday.questions.items.length)
  const pts = useChecklist('btb-w2-points', W.monday.points.items.length)

  useGSAP(
    () => {
      // scrollspy
      sections.forEach((s) =>
        ScrollTrigger.create({
          trigger: `#${s.id}`,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => self.isActive && setCurrent(s.id),
          onLeaveBack: () => s.id === 'conversation' && setCurrent('conversation'),
        }),
      )
      if (prefersReducedMotion()) return
      const tl = gsap.timeline({ delay: 0.35 })
      SplitText.create('.sr-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => gsap.from(self.lines, { yPercent: 115, duration: 1.3, stagger: 0.08, delay: 0.35 }),
      })
      tl.from('.sr-fade', { y: 24, opacity: 0, stagger: 0.07, duration: 1.1 }, 0.2)
        .from('.sr-dot', { scale: 0, opacity: 0, duration: 0.5, stagger: { each: 0.008, from: 'start' }, ease: 'back.out(2)' }, 0.4)
      gsap.utils.toArray<HTMLElement>('.sr-bar').forEach((bar) =>
        gsap.from(bar, { scaleX: 0, transformOrigin: 'left center', duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: bar, start: 'top 90%', once: true } }),
      )
    },
    { scope: ref },
  )

  const dots = Array.from({ length: W.attendees }, (_, i) => i < W.polled)

  return (
    <div ref={ref}>
      {/* ================= cover ================= */}
      <header className="on-navy relative overflow-hidden bg-navy text-ivory">
        <Pattern className="top-0 right-0 h-full w-[60%] text-ivory opacity-[0.035]" size={420} />
        <div className="wrap relative pt-[calc(var(--nav-h)+env(safe-area-inset-top,0px)+40px)] pb-16 md:pt-[calc(var(--nav-h)+72px)] md:pb-24">
          <nav aria-label="Breadcrumb" className="sr-fade">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-ivory/60">
              <li>
                <TLink to="/" className="link-u hover:text-ivory">Home</TLink>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <TLink to="/sessions" className="link-u hover:text-ivory">Sessions</TLink>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ivory">{W.series}</li>
            </ol>
          </nav>
          <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="sr-fade eyebrow text-gold">
                {W.series} · {W.kind}
              </p>
              <h1 className="sr-title h-display mt-6 text-[clamp(3rem,7.4vw,7rem)]">{W.title}</h1>
              <p className="sr-fade font-display-x mt-5 max-w-[22ch] text-[clamp(1.4rem,2.6vw,2.2rem)] leading-tight font-semibold text-gold">{W.subtitle}</p>
              <p className="sr-fade mt-8 flex items-center gap-4 font-serif text-[1.6rem] italic text-ivory/90">
                <span className="h-[2px] w-14 bg-taupe" /> {W.theme}
              </p>
            </div>
            <figure className="lg:col-span-4 lg:col-start-9" aria-label={`${W.polled} of ${W.attendees} attendees polled`}>
              <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-[5px]" aria-hidden="true">
                {dots.map((filled, i) => (
                  <span key={i} className={clsx('sr-dot aspect-square rounded-[2px]', filled ? 'bg-gold' : 'ring-1 ring-ivory/40 ring-inset')} />
                ))}
              </div>
              <figcaption className="sr-fade eyebrow mt-4 text-right text-ivory/80">
                {W.polled} of {W.attendees} attendees polled
              </figcaption>
            </figure>
          </div>
          <div className="sr-fade mt-16 grid gap-6 border-t border-ivory/15 pt-8 text-[15px] text-ivory/75 md:grid-cols-[auto_auto_1fr] md:items-center md:gap-12">
            <p className="flex items-center gap-2.5">
              <CalendarDays className="size-4.5 text-gold" /> {W.date}
            </p>
            <p className="flex items-center gap-2.5">
              <Video className="size-4.5 text-gold" /> {W.venue}
            </p>
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <span className="text-[12px] tracking-[0.18em] text-ivory/50 uppercase">With</span>
              {site.sessionPartners.map((s) => (
                <img key={s.name} src={asset(s.logo)} alt={s.name} className="h-10 w-auto rounded-md" />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ================= in-page nav ================= */}
      <nav aria-label="Report sections" className="sticky top-[env(safe-area-inset-top,0px)] z-30 border-b border-line bg-ivory/90 backdrop-blur-xl">
        <ul className="wrap flex gap-1 overflow-x-auto py-3 [scrollbar-width:none]">
          {sections.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  go(`/sessions/ai-in-legal-practice#${s.id}`)
                }}
                className={clsx(
                  'block rounded-full px-4 py-2 text-[13px] font-medium whitespace-nowrap transition-colors',
                  current === s.id ? 'bg-navy text-ivory' : 'text-navy/70 hover:bg-sand',
                )}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ================= the conversation ================= */}
      <section id="conversation" className="scroll-mt-28 py-20 md:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow data-reveal>The conversation</Eyebrow>
            <p data-reveal className="mt-4 text-[13px] tracking-wide text-taupe-ink">Session report · 02</p>
          </div>
          <div className="lg:col-span-8">
            <p data-split className="font-serif text-[clamp(1.45rem,2.4vw,2rem)] leading-[1.4] text-navy">
              {W.conversation[0]}
            </p>
            <div data-reveal className="prose-btb mt-10 max-w-[64ch]">
              {W.conversation.slice(1).map((t) => (
                <p key={t.slice(0, 24)}>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= polls ================= */}
      <section id="polls" className="on-navy scroll-mt-28 bg-navy py-24 text-ivory md:py-32">
        <div className="wrap">
          <Eyebrow light data-reveal>
            What the room told us · two live polls
          </Eyebrow>
          <h2 data-split className="h-display mt-6 text-[clamp(2.6rem,6vw,5.6rem)]">
            {W.polls.headline[0]} <span className="text-gold">{W.polls.headline[1]}</span>
          </h2>
          <p data-reveal className="mt-8 max-w-[60ch] font-serif text-lg leading-relaxed text-ivory/75">{W.polls.intro}</p>

          <div className="mt-16 grid gap-16 lg:grid-cols-2">
            <div data-reveal>
              <p className="eyebrow text-ivory/60">Poll one</p>
              <p className="mt-3 font-serif text-xl">{W.polls.one.question}</p>
              <div className="mt-6 flex h-20 overflow-hidden rounded-xl">
                <div className="sr-bar flex flex-col justify-center bg-gold px-5 text-navy" style={{ width: `${W.polls.one.yes.pct}%` }}>
                  <span className="font-display-x text-3xl leading-none font-bold tabular">
                    <Counter value={W.polls.one.yes.pct} suffix="%" />
                  </span>
                  <span className="mt-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
                    Yes · {W.polls.one.yes.count} of {W.polls.one.yes.of}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center bg-navy-3 px-3">
                  <span className="font-display-x text-2xl leading-none font-bold tabular">{W.polls.one.no.pct}%</span>
                  <span className="mt-1 text-[11px] font-semibold tracking-[0.12em] uppercase">No · {W.polls.one.no.count}</span>
                </div>
              </div>
            </div>
            <div data-reveal>
              <p className="eyebrow text-ivory/60">Poll two</p>
              <p className="mt-3 font-serif text-xl">{W.polls.two.question}</p>
              <ul className="mt-6 space-y-4">
                {W.polls.two.answers.map((a) => (
                  <li key={a.label} className="grid grid-cols-[4rem_1fr] items-center gap-x-4 gap-y-1.5 md:grid-cols-[4rem_1fr_15rem]">
                    <span className={clsx('font-display-x text-2xl font-bold tabular', a.highlight ? 'text-gold' : 'text-ivory')}>{a.pct}%</span>
                    <span className="h-9 overflow-hidden rounded-md bg-navy-3">
                      <span className={clsx('sr-bar block h-full', a.highlight ? 'bg-gold' : 'bg-taupe')} style={{ width: `${a.pct}%` }} />
                    </span>
                    <span className="col-start-2 text-[14px] leading-snug text-ivory/80 md:col-start-3">
                      {a.label} <span className="text-ivory/50 tabular">{a.count} of {a.of}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div data-reveal className="rounded-[24px] bg-ivory p-8 text-navy md:p-10 lg:col-span-7">
              <p className="eyebrow text-taupe-ink">The reading</p>
              <p className="mt-4 font-serif text-[1.35rem] leading-snug">{W.polls.reading}</p>
            </div>
            <p data-reveal className="text-[13px] leading-relaxed text-ivory/55 lg:col-span-4 lg:col-start-9">{W.polls.note}</p>
          </div>
        </div>
      </section>

      {/* ================= who was in the room ================= */}
      <section id="room" className="scroll-mt-28 py-24 md:py-32">
        <div className="wrap">
          <Eyebrow data-reveal>Who was in the room</Eyebrow>
          <h2 data-split className="h-section mt-6 text-[clamp(2rem,3.8vw,3.4rem)]">
            Three jurisdictions, <span className="accent text-gold-ink">a regulator's lens.</span>
          </h2>
          <ul data-stagger className="mt-12 border-t border-line">
            {W.room.map((r) => (
              <li key={r.name} className="grid grid-cols-[4.5rem_1fr] items-center gap-5 border-b border-line py-5 md:grid-cols-[6rem_1fr_auto] md:gap-8">
                <div className="relative">
                  <img src={asset(r.photo)} alt={`Portrait of ${r.name}`} className="aspect-square w-full rounded-xl object-cover" loading="lazy" />
                  {r.country && <Flag code={r.country} className="absolute -bottom-1 -left-1 h-3.5 w-[21px]" />}
                </div>
                <div>
                  <p className="flex flex-wrap items-baseline gap-x-3">
                    <span className="h-card text-[1.35rem] md:text-[1.6rem]">{r.name}</span>
                    {r.badge !== 'Panellist' && <span className="eyebrow text-gold-ink">{r.badge}</span>}
                  </p>
                  <p className="mt-1 font-serif text-[1.02rem] text-navy/70">{r.role}</p>
                </div>
                <p className="eyebrow col-start-2 text-taupe-ink md:col-start-3">{r.tag}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= around the panel ================= */}
      <section id="panel" className="scroll-mt-28 bg-paper py-24 md:py-32">
        <div className="wrap">
          <Eyebrow data-reveal>Around the panel</Eyebrow>
          <div className="mt-14 space-y-28">
            {W.panel.map((p, i) => (
              <article key={p.id} className="grid gap-10 lg:grid-cols-12" aria-labelledby={`${p.id}-h`}>
                <div className="lg:col-span-7">
                  <div data-reveal className="flex items-center gap-5">
                    <div className="relative w-20 shrink-0 md:w-24">
                      <img src={asset(p.photo)} alt="" className="aspect-square w-full rounded-2xl object-cover" loading="lazy" />
                      <Flag code={p.country} className="absolute -bottom-1 -left-1 h-3.5 w-[21px]" />
                    </div>
                    <div>
                      <p className="text-[12px] tracking-[0.18em] text-taupe-ink uppercase tabular">
                        {['One', 'Two', 'Three', 'Four'][i]} of four
                      </p>
                      <h3 id={`${p.id}-h`} className="h-section mt-1 text-[clamp(1.9rem,3.4vw,3rem)]">
                        {p.name}
                      </h3>
                      <p className="eyebrow mt-1 text-gold-ink">
                        {p.place} · {p.role}
                      </p>
                    </div>
                  </div>
                  <p data-reveal className="prose-btb mt-8">
                    {p.intro}
                  </p>
                </div>
                <figure data-reveal className="relative self-start overflow-hidden rounded-[24px] bg-navy p-8 text-ivory md:p-10 lg:col-span-5">
                  <Pattern className="inset-0 text-ivory opacity-[0.04]" size={240} />
                  <Quote className="relative size-8 text-gold" />
                  <blockquote className="relative mt-5 font-serif text-[1.4rem] leading-snug">“{p.quote}”</blockquote>
                  <figcaption className="relative mt-8 flex items-center justify-between border-t border-ivory/15 pt-4 text-[13px]">
                    <span className="eyebrow text-gold">{p.name}</span>
                    <a
                      href={`${W.youtube}&t=${p.time.split(':').reverse().reduce((acc, v, k) => acc + Number(v) * 60 ** k, 0)}s`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-ivory/80 tabular hover:text-gold"
                      aria-label={`Watch ${p.first} at ${p.time} on YouTube`}
                    >
                      <Play className="size-3.5 fill-current" /> {p.time}
                    </a>
                  </figcaption>
                </figure>

                <div className="lg:col-span-12">
                  <p data-reveal className="eyebrow text-taupe-ink">What {p.first} argued</p>
                  <ul data-stagger className="mt-6 grid gap-x-12 gap-y-6 md:grid-cols-2">
                    {p.argued.map((a) => (
                      <li key={a.slice(0, 24)} className="border-l-2 border-gold/50 pl-5 font-serif text-[1.05rem] leading-relaxed text-navy/85">
                        {a}
                      </li>
                    ))}
                  </ul>
                  <p data-reveal className="mt-10 border-t-2 border-taupe pt-5 text-[1.15rem] leading-snug md:text-[1.3rem]">
                    <span className="font-medium text-gold-ink">In one line: </span>
                    <span className="font-semibold">{p.oneLine}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= monday ================= */}
      <section id="monday" className="scroll-mt-28 py-24 md:py-32">
        <div className="wrap">
          <Eyebrow data-reveal>Session report · 09</Eyebrow>
          <h2 data-split className="h-display mt-6 text-[clamp(2.6rem,6vw,5.4rem)]">
            What to do on <span className="accent text-gold-ink">Monday.</span>
          </h2>
          <p data-reveal className="mt-6 max-w-[64ch] font-serif text-lg leading-relaxed text-navy/75">{W.monday.intro}</p>
          <p data-reveal className="mt-2 text-[13px] text-taupe-ink">Tick items off as you go. Your progress stays in this browser.</p>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {[
              { list: W.monday.questions, state: qs, items: W.monday.questions.items.map((t) => ({ head: '', text: t })) },
              { list: W.monday.points, state: pts, items: W.monday.points.items },
            ].map(({ list, state, items }) => (
              <div key={list.title} data-reveal className="rounded-[28px] bg-paper p-6 ring-1 ring-line md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="h-card text-[1.6rem]">{list.title}</h3>
                  <span className="shrink-0 rounded-full bg-navy px-3 py-1 text-[12px] font-medium text-ivory tabular">
                    {state.count}/{items.length}
                  </span>
                </div>
                <p className="mt-3 font-serif text-[15px] italic leading-relaxed text-navy/65">{list.by}</p>
                <div className="mt-5 h-1 overflow-hidden rounded bg-line">
                  <div className="h-full bg-gold transition-[width] duration-500" style={{ width: `${(state.count / items.length) * 100}%` }} />
                </div>
                <ol className="mt-6 space-y-1">
                  {items.map((it, i) => (
                    <li key={i}>
                      <label className="group flex cursor-pointer gap-4 rounded-xl p-3 transition-colors hover:bg-sand/60">
                        <input type="checkbox" className="peer sr-only" checked={state.done[i]} onChange={() => state.toggle(i)} />
                        <span
                          className={clsx(
                            'mt-0.5 grid size-6 shrink-0 place-items-center rounded-md ring-1 transition-colors peer-focus-visible:outline-3 peer-focus-visible:outline-blue',
                            state.done[i] ? 'bg-navy text-gold ring-navy' : 'ring-navy/30',
                          )}
                        >
                          {state.done[i] && <Check className="size-4" strokeWidth={3} />}
                        </span>
                        <span className={clsx('flex gap-3 text-[16px] leading-snug transition-colors', state.done[i] && 'text-navy/50')}>
                          <span className="font-display-x pt-px text-[13px] font-semibold text-gold-ink tabular">{String(i + 1).padStart(2, '0')}</span>
                          <span>
                            {it.head && <span className="font-semibold">{it.head}. </span>}
                            {it.text}
                          </span>
                        </span>
                      </label>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= watch + about ================= */}
      <section id="watch" className="scroll-mt-28 border-t border-line bg-paper py-24 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <a
            href={W.youtube}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-[28px] bg-navy text-ivory lg:col-span-7"
          >
            <Pattern className="inset-0 text-ivory opacity-[0.05]" size={300} />
            <img src={asset('img/statue-justice-sm.webp')} alt="" aria-hidden="true" className="absolute right-[8%] bottom-0 h-[90%] w-auto opacity-25" loading="lazy" />
            <span className="relative flex flex-col items-center gap-5 text-center">
              <span className="grid size-20 place-items-center rounded-full bg-gold text-navy transition-transform duration-500 group-hover:scale-110">
                <Play className="ml-1 size-8 fill-current" />
              </span>
              <span className="text-[15px] font-medium">Watch the full session</span>
              <span className="text-[13px] text-ivory/60">East Africa Law Society YouTube channel</span>
            </span>
          </a>
          <div className="lg:col-span-5">
            <Eyebrow data-reveal>About BTB</Eyebrow>
            <p data-reveal className="prose-btb mt-6">{W.aboutBtb}</p>
            <p data-reveal className="mt-8 rounded-2xl bg-sand/70 p-5 text-[14px] leading-relaxed text-navy/75">{W.disclaimer}</p>
            <div data-reveal className="mt-8">
              <Button href={W.youtube} variant="navy" icon={<Play className="size-4" />}>
                Open on YouTube
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Bring this to your organisation"
        title={
          <>
            Ready to put an <span className="accent text-gold">AI policy</span> in place?
          </>
        }
        text="BTB's executive training covers Artificial Intelligence and the Law, and Data Protection and Privacy. Ask the secretariat about sessions for your team."
        primary={{ to: '/contact?interest=executive-training', label: 'Ask about training' }}
        secondary={{ to: '/programmes/executive-training', label: 'Executive Training' }}
      />
    </div>
  )
}
