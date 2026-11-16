import { useRef } from 'react'
import { CalendarDays, Download, FileText, Play } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { CTABand } from '../components/CTABand'
import { Button } from '../components/ui/Button'
import { reports } from '../data/site'
import { asset } from '../lib/asset'
import { useReveal } from '../lib/useReveal'

/** Central page for all BTB reports. Each report is a card with its cover and a PDF download. */
export default function Reports() {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)

  return (
    <div ref={ref}>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Reports' }]}
        eyebrow="Reports"
        title={
          <>
            Reports from <span className="accent text-gold-ink">Beyond the Bar.</span>
          </>
        }
        intro={<p>Session reports and research from BTB's programmes. Each one is free to download as a PDF.</p>}
      />

      <section className="py-14 md:py-20" aria-label="Available reports">
        <div className="wrap">
          <p className="text-[13px] text-taupe-ink tabular">
            {reports.length} {reports.length === 1 ? 'report' : 'reports'} available
          </p>
          <ul className="mt-6 grid gap-6">
            {reports.map((r) => (
              <li key={r.id} id={r.id}>
                <article
                  aria-labelledby={`${r.id}-title`}
                  className="grid gap-8 rounded-[28px] bg-paper p-5 ring-1 ring-line sm:p-8 md:grid-cols-[minmax(0,15rem)_1fr] md:items-center md:gap-10 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-14 lg:p-10"
                >
                  <a
                    href={asset(r.file)}
                    download={r.downloadName}
                    className="group block max-md:mx-auto max-md:w-[min(62%,15rem)]"
                    aria-label={`Download ${r.title} (PDF, ${r.size})`}
                  >
                    <img
                      src={asset(r.cover)}
                      alt=""
                      width={720}
                      height={1018}
                      loading="lazy"
                      className="aspect-[720/1018] w-full rounded-lg object-cover shadow-[0_24px_40px_-16px_rgba(8,38,64,0.45)] ring-1 ring-navy/10 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1"
                    />
                  </a>

                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-[12px] font-medium">
                      <span className="rounded-full bg-navy px-3 py-1 text-ivory">{r.kind}</span>
                      <span className="rounded-full bg-gold/30 px-3 py-1 text-gold-ink">{r.series}</span>
                    </p>
                    <h2 id={`${r.id}-title`} className="h-section mt-5 text-[clamp(1.9rem,3.6vw,3.2rem)]">
                      {r.title}
                    </h2>
                    <p className="font-display-x mt-2 text-[clamp(1.05rem,1.6vw,1.35rem)] leading-snug font-medium text-gold-ink">{r.subtitle}</p>
                    <p className="mt-5 max-w-[62ch] font-serif text-[1.08rem] leading-relaxed text-navy/80">{r.description}</p>

                    <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-taupe-ink">
                      <div className="flex items-center gap-2">
                        <dt className="sr-only">Session date</dt>
                        <CalendarDays className="size-4 text-gold-ink" aria-hidden="true" />
                        <dd>{r.date}</dd>
                      </div>
                      <div className="flex items-center gap-2">
                        <dt className="sr-only">File</dt>
                        <FileText className="size-4 text-gold-ink" aria-hidden="true" />
                        <dd className="tabular">
                          PDF · {r.pages} pages · {r.size}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <Button href={asset(r.file)} download={r.downloadName} icon={<Download className="size-4" strokeWidth={2} />}>
                        Download PDF
                      </Button>
                      {r.watch && (
                        <Button href={r.watch} variant="ghost" icon={<Play className="size-4" />}>
                          Watch the session
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand
        eyebrow="Stay informed"
        title={
          <>
            Get the next session <span className="accent text-gold">in your inbox.</span>
          </>
        }
        text="Reports follow BTB's sessions. Ask the secretariat to add you to the invitation list and you'll hear about the next one."
        primary={{ to: '/contact?interest=webinar-series', label: 'Ask for an invitation' }}
        secondary={{ to: '/sessions', label: 'See the sessions' }}
      />
    </div>
  )
}
