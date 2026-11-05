import { useRef } from 'react'
import { ArrowUpRight, CalendarDays, Play, Users, Video } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { CTABand } from '../components/CTABand'
import { TLink } from '../components/TLink'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Pattern } from '../components/ui/Pattern'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { programmes, site } from '../data/site'
import { webinarTwo } from '../data/webinarTwo'
import { asset } from '../lib/asset'
import { useReveal } from '../lib/useReveal'

export default function Sessions() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)
  const series = programmes[0]

  return (
    <div ref={ref}>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Sessions' }]}
        eyebrow="Webinar & Talk Show Series"
        title={
          <>
            Monthly conversations <span className="accent text-gold-ink">re-thinking</span> legal practice.
          </>
        }
        intro={<p>{series.intro[0]}</p>}
      />

      {/* featured session */}
      <section className="py-16 md:py-24" aria-labelledby="latest-h">
        <div className="wrap">
          <Eyebrow data-reveal>Latest session</Eyebrow>
          <TLink
            to="/sessions/ai-in-legal-practice"
            data-reveal
            className="group relative mt-6 grid overflow-hidden rounded-[32px] bg-navy text-ivory lg:grid-cols-[1.15fr_0.85fr]"
          >
            <Pattern className="inset-0 text-ivory opacity-[0.04]" size={340} />
            <div className="relative p-8 md:p-12 lg:p-14">
              <div className="flex flex-wrap gap-2 text-[12px] font-medium">
                <span className="rounded-full bg-gold px-3 py-1 text-navy">{webinarTwo.series}</span>
                <span className="rounded-full bg-ivory/10 px-3 py-1">{webinarTwo.kind}</span>
              </div>
              <h2 id="latest-h" className="h-display mt-8 text-[clamp(2.4rem,5vw,4.6rem)]">{webinarTwo.title}</h2>
              <p className="font-display-x mt-3 text-[clamp(1.15rem,2vw,1.6rem)] font-medium text-gold">{webinarTwo.subtitle}</p>
              <p className="mt-6 flex items-center gap-4 font-serif text-xl italic text-ivory/80">
                <span className="h-px w-10 bg-ivory/40" />
                {webinarTwo.theme}
              </p>
              <dl className="mt-10 grid gap-4 text-[15px] text-ivory/75 sm:grid-cols-3">
                <div className="flex items-center gap-2.5">
                  <CalendarDays className="size-4.5 text-gold" />
                  <dt className="sr-only">Date</dt>
                  <dd>{webinarTwo.date}</dd>
                </div>
                <div className="flex items-center gap-2.5">
                  <Video className="size-4.5 text-gold" />
                  <dt className="sr-only">Format</dt>
                  <dd>Zoom + EALS YouTube</dd>
                </div>
                <div className="flex items-center gap-2.5">
                  <Users className="size-4.5 text-gold" />
                  <dt className="sr-only">Attendance</dt>
                  <dd>{webinarTwo.attendees} attendees</dd>
                </div>
              </dl>
              <span className="mt-10 inline-flex items-center gap-3 text-[15px] font-medium">
                <span className="link-u">Read the session report</span>
                <span className="grid size-10 place-items-center rounded-full bg-gold text-navy transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </span>
            </div>
            <div className="relative flex flex-col justify-end gap-6 border-t border-ivory/10 p-8 md:p-12 lg:border-t-0 lg:border-l">
              <p className="eyebrow text-gold">Who was in the room</p>
              <ul className="grid grid-cols-2 gap-3">
                {webinarTwo.room.map((r) => (
                  <li key={r.name} className="flex items-center gap-3">
                    <img src={asset(r.photo)} alt="" className="size-12 rounded-full object-cover ring-2 ring-ivory/10" loading="lazy" />
                    <span className="text-[13px] leading-tight">
                      <span className="block text-ivory">{r.name}</span>
                      <span className="text-ivory/55">
                        {r.badge} · {r.tag}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-end gap-4 border-t border-ivory/10 pt-6">
                <p className="font-display-x text-6xl leading-none font-bold tabular">88%</p>
                <p className="pb-1 text-[14px] leading-snug text-ivory/70">of polled attendees already use AI in their work</p>
              </div>
            </div>
          </TLink>
          <div data-reveal className="mt-6 flex flex-wrap gap-3">
            <Button href={webinarTwo.youtube} variant="ghost" icon={<Play className="size-4" />}>
              Watch on the EALS YouTube channel
            </Button>
          </div>
        </div>
      </section>

      {/* themes */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="themes-h">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow data-reveal>What we talk about</Eyebrow>
            <h2 id="themes-h" data-split className="h-section mt-6 text-[clamp(2rem,3.8vw,3.4rem)]">
              Eight themes, <span className="accent text-gold-ink">one question:</span> what changes next?
            </h2>
            <p data-reveal className="mt-6 max-w-[46ch] font-serif text-lg leading-relaxed text-navy/75">
              {series.intro[1]}
            </p>
          </div>
          <ul data-stagger className="grid gap-px overflow-hidden rounded-[24px] bg-line ring-1 ring-line sm:grid-cols-2 lg:col-span-7">
            {series.items.map((t) => (
              <li key={t.text} className="flex items-center gap-4 bg-ivory p-6">
                <Icon name={t.icon} className="size-6 shrink-0 text-gold-ink" />
                <span className="text-[16px] leading-snug font-medium">{t.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* how it works */}
      <section className="py-24 md:py-32" aria-labelledby="how-h">
        <div className="wrap">
          <Eyebrow data-reveal>How sessions run</Eyebrow>
          <h2 id="how-h" data-split className="h-section mt-6 max-w-[20ch] text-[clamp(2rem,3.8vw,3.4rem)]">
            Expert panels, live polls and a report you can <span className="accent text-gold-ink">act on.</span>
          </h2>
          <ol data-stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              { k: 'Before', t: 'A panel drawn from across the region', d: 'Experts from law, business, technology, governance, finance and development, with a moderator who presses for the practical breaking point.' },
              { k: 'During', t: 'Live, with polls', d: 'Webinar Two ran on Zoom, was livestreamed on the East Africa Law Society YouTube channel, and used two live polls to show where the room stood.' },
              { k: 'After', t: 'A report you can use', d: 'The Webinar Two report recorded the arguments, the poll results and two checklists for what to do on Monday, so the learning outlasts the hour.' },
            ].map((s) => (
              <li key={s.k} className="rounded-[24px] bg-paper p-8 ring-1 ring-line">
                <p className="eyebrow text-gold-ink">{s.k}</p>
                <p className="h-card mt-5 text-2xl">{s.t}</p>
                <p className="mt-4 font-serif text-[1.05rem] leading-relaxed text-navy/75">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTABand
        eyebrow="Next session"
        title={
          <>
            Get the next invitation <span className="accent text-gold">in your inbox.</span>
          </>
        }
        text={`Sessions are announced monthly. Write to ${site.email} and ask to join the invitation list.`}
        primary={{ to: '/contact?interest=webinar-series', label: 'Ask for an invitation' }}
        secondary={{ to: '/programmes/webinar-series', label: 'About the series' }}
      />
    </div>
  )
}
