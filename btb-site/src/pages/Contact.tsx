import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowUpRight, Check, Copy, Mail, Phone } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { EnquiryForm, interestOptions } from '../components/EnquiryForm'
import { Eyebrow } from '../components/ui/Eyebrow'
import { Flag } from '../components/ui/Flag'
import { Pattern } from '../components/ui/Pattern'
import { site } from '../data/site'
import { useReveal } from '../lib/useReveal'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [params] = useSearchParams()
  const [copied, setCopied] = useState(false)
  useReveal(ref)
  const wanted = params.get('interest') ?? ''
  const interest = interestOptions.some((o) => o.value === wanted) ? wanted : 'webinar-series'

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* the address stays selectable */
    }
  }

  return (
    <div ref={ref}>
      <PageHero
        crumbs={[{ to: '/', label: 'Home' }, { label: 'Contact' }]}
        eyebrow="Get in touch"
        title={
          <>
            Let's talk about what's <span className="accent text-gold-ink">beyond the bar.</span>
          </>
        }
        intro={<p>Questions about a programme, an invitation to the next webinar, a partnership or a cross-border opportunity: the secretariat in Uganda and Rwanda reads every message.</p>}
      />

      <section className="py-16 md:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <aside className="space-y-4 lg:col-span-5">
            <div data-reveal className="relative overflow-hidden rounded-[28px] bg-navy p-8 text-ivory md:p-10">
              <Pattern className="inset-0 text-ivory opacity-[0.045]" size={280} />
              <p className="eyebrow relative text-gold">Email</p>
              <p className="relative mt-4 font-display-x text-[clamp(1.2rem,2.2vw,1.6rem)] font-semibold break-all select-all">{site.email}</p>
              <div className="relative mt-6 flex flex-wrap gap-2">
                <button type="button" onClick={copyEmail} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-4 text-[14px] font-medium text-navy">
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {copied ? 'Copied' : 'Copy address'}
                </button>
                <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[14px] ring-1 ring-ivory/30 ring-inset">
                  <Mail className="size-4" /> Write now
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {site.offices.map((o, i) => (
                <div key={o.country} data-reveal data-delay={String(i * 0.08)} className="rounded-[24px] bg-paper p-7 ring-1 ring-line">
                  <p className="flex items-center gap-2.5 text-[15px] font-medium">
                    <Flag code={o.code} /> {o.country}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {o.phones.map((ph) => (
                      <li key={ph.tel}>
                        <a href={`tel:${ph.tel}`} className="group flex items-center gap-2.5 text-[1.1rem] tabular select-all">
                          <Phone className="size-4 text-gold-ink" />
                          <span className="link-u">{ph.display}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <a
              data-reveal
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-[24px] bg-paper p-7 ring-1 ring-line"
            >
              <span>
                <span className="eyebrow block text-taupe-ink">LinkedIn</span>
                <span className="mt-2 block text-[1.1rem] font-medium">{site.linkedinLabel}</span>
              </span>
              <span className="grid size-12 place-items-center rounded-full ring-1 ring-navy/20 transition-all duration-500 group-hover:rotate-45 group-hover:bg-navy group-hover:text-gold">
                <ArrowUpRight className="size-5" />
              </span>
            </a>
          </aside>

          <div className="lg:col-span-7">
            <div data-reveal className="rounded-[28px] bg-paper p-6 ring-1 ring-line md:p-10">
              <Eyebrow>Send an enquiry</Eyebrow>
              <h2 className="h-section mt-5 text-[clamp(1.8rem,3vw,2.6rem)]">Tell us what you're interested in.</h2>
              <p className="mt-3 mb-8 font-serif text-[1.05rem] leading-relaxed text-navy/70">
                We'll prepare an email to the secretariat with your details filled in. Nothing is stored on this website.
              </p>
              <EnquiryForm key={interest} defaultInterest={interest} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
