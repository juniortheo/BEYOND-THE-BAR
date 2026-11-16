import { useRef, type ReactNode } from 'react'
import { Button } from './ui/Button'
import { Pattern } from './ui/Pattern'
import { Eyebrow } from './ui/Eyebrow'
import { site } from '../data/site'
import { useReveal } from '../lib/useReveal'
import { asset } from '../lib/asset'

/**
 * Navy closing band used at the foot of every page.
 * Pass `aside` (for example a form) to show it beside the text on desktop and under the
 * heading on phones and tablets. Pass `primary={null}` to drop the main button.
 */
export function CTABand({
  eyebrow = 'Join the conversation',
  title,
  text,
  primary = { to: '/contact', label: 'Get in touch' },
  secondary = { to: '/sessions', label: 'See the sessions' },
  aside,
}: {
  eyebrow?: string
  title?: ReactNode
  text?: string
  primary?: { to: string; label: string } | null
  secondary?: { to: string; label: string }
  aside?: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  const heading = (
    <>
      <Eyebrow light data-reveal>
        {eyebrow}
      </Eyebrow>
      <h2 data-split className="h-section mt-6 text-[clamp(2.4rem,5.6vw,5rem)]">
        {title ?? (
          <>
            Beyond the bar, <span className="accent text-gold">together.</span>
          </>
        )}
      </h2>
      <p data-reveal className="mt-6 max-w-2xl font-serif text-xl leading-relaxed text-ivory/75">
        {text ??
          'Monthly webinars, executive training, regional forums and a cross-border desk. Tell us what you would like to take part in, and the secretariat will come back to you.'}
      </p>
    </>
  )

  if (aside) {
    // Text and buttons on the left, `aside` on the right (desktop). Phones and tablets:
    // heading, then `aside`, then the buttons and contact details.
    return (
      <section ref={ref} data-reveal-root="" className="on-navy relative overflow-hidden bg-navy-2 text-ivory">
        <Pattern className="inset-0 text-ivory opacity-[0.04]" size={380} />
        <img
          src={asset('img/statue-justice-sm.webp')}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute -bottom-10 right-[4%] hidden h-[115%] w-auto opacity-[0.18] lg:block"
        />
        <div className="wrap relative grid gap-10 py-24 md:py-32 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0">
          <div className="lg:col-span-6 lg:row-start-1">{heading}</div>
          <div data-reveal className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-center xl:col-span-5 xl:col-start-8">
            {aside}
          </div>
          <div className="lg:col-span-6 lg:row-start-2">
            <div data-reveal className="flex flex-wrap gap-3 lg:mt-10">
              {primary && (
                <Button to={primary.to} variant="gold">
                  {primary.label}
                </Button>
              )}
              <Button to={secondary.to} variant="ghost-light">
                {secondary.label}
              </Button>
            </div>
            <dl data-reveal className="mt-14 grid gap-6 border-t border-ivory/15 pt-8 text-[15px] text-ivory/70 sm:grid-cols-3 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <dt className="eyebrow text-gold">Email</dt>
                <dd className="mt-2 break-all text-ivory select-all">{site.email}</dd>
              </div>
              {site.offices.map((o) => (
                <div key={o.country}>
                  <dt className="eyebrow text-gold">{o.country}</dt>
                  {o.phones.map((p) => (
                    <dd key={p.tel} className="mt-2 tabular">
                      {p.display}
                    </dd>
                  ))}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} data-reveal-root="" className="on-navy relative overflow-hidden bg-navy-2 text-ivory">
      <Pattern className="inset-0 text-ivory opacity-[0.04]" size={380} />
      <img
        src={asset('img/statue-justice-sm.webp')}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -bottom-10 right-[4%] hidden h-[115%] w-auto opacity-[0.18] lg:block"
      />
      <div className="wrap relative grid gap-10 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-8 xl:col-span-7">
          <Eyebrow light data-reveal>
            {eyebrow}
          </Eyebrow>
          <h2 data-split className="h-section mt-6 text-[clamp(2.4rem,5.6vw,5rem)]">
            {title ?? (
              <>
                Beyond the bar, <span className="accent text-gold">together.</span>
              </>
            )}
          </h2>
          <p data-reveal className="mt-6 max-w-2xl font-serif text-xl leading-relaxed text-ivory/75">
            {text ??
              'Monthly webinars, executive training, regional forums and a cross-border desk. Tell us what you would like to take part in, and the secretariat will come back to you.'}
          </p>
          <div data-reveal className="mt-10 flex flex-wrap gap-3">
            {primary && (
              <Button to={primary.to} variant="gold">
                {primary.label}
              </Button>
            )}
            <Button to={secondary.to} variant="ghost-light">
              {secondary.label}
            </Button>
          </div>
          <dl data-reveal className="mt-14 grid gap-6 border-t border-ivory/15 pt-8 text-[15px] text-ivory/70 sm:grid-cols-3">
            <div>
              <dt className="eyebrow text-gold">Email</dt>
              <dd className="mt-2 break-all text-ivory select-all">{site.email}</dd>
            </div>
            {site.offices.map((o) => (
              <div key={o.country}>
                <dt className="eyebrow text-gold">{o.country}</dt>
                {o.phones.map((p) => (
                  <dd key={p.tel} className="mt-2 tabular">
                    {p.display}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
