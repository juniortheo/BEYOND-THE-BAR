import { useRef, type ReactNode } from 'react'
import clsx from 'clsx'
import { TLink } from './TLink'
import { Eyebrow } from './ui/Eyebrow'
import { Pattern } from './ui/Pattern'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '../lib/gsap'

type Crumb = { to?: string; label: string }

/** Shared opening for every inner page: breadcrumb, eyebrow, display title, serif intro. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  aside,
  className,
}: {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  crumbs: Crumb[]
  aside?: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const tl = gsap.timeline({ delay: 0.35 })
      SplitText.create('.ph-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => gsap.from(self.lines, { yPercent: 115, duration: 1.3, stagger: 0.09, delay: 0.35 }),
      })
      tl.from('.ph-fade', { y: 26, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.25)
      tl.from('.ph-rule', { scaleX: 0, transformOrigin: 'left center', duration: 1.6, ease: 'expo.inOut' }, 0.2)
    },
    { scope: ref },
  )

  return (
    <header ref={ref} className={clsx('relative overflow-hidden pt-[calc(var(--nav-h)+env(safe-area-inset-top,0px)+48px)] md:pt-[calc(var(--nav-h)+80px)]', className)}>
      <Pattern className="top-0 right-[-12%] h-[115%] w-[62%] text-navy opacity-[0.03]" size={420} />
      <div className="wrap relative">
        <nav aria-label="Breadcrumb" className="ph-fade">
          <ol className="flex flex-wrap items-center gap-2 text-[13px] text-taupe-ink">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="text-line">/</span>}
                {c.to ? (
                  <TLink to={c.to} className="link-u hover:text-navy">
                    {c.label}
                  </TLink>
                ) : (
                  <span aria-current="page" className="text-navy">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Eyebrow className="ph-fade mt-10">{eyebrow}</Eyebrow>
        <h1 className="ph-title h-display mt-6 max-w-[16ch] text-[clamp(2.7rem,7vw,6.4rem)]">{title}</h1>
        {(intro || aside) && (
          <div className="mt-10 grid items-end gap-10 md:mt-14 lg:grid-cols-12">
            {intro && <div className="ph-fade prose-btb text-[1.2rem] md:text-[1.35rem] lg:col-span-7">{intro}</div>}
            {aside && <div className="ph-fade lg:col-span-4 lg:col-start-9">{aside}</div>}
          </div>
        )}
      </div>
      <div className="wrap">
        <div className="ph-rule hairline mt-14 md:mt-20" />
      </div>
    </header>
  )
}
