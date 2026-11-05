import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react'
import { TLink } from './TLink'
import { LogoLockup } from './Logo'
import { Button } from './ui/Button'
import { programmes, site } from '../data/site'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { useLenis } from '../lib/smooth'

const links = [
  { to: '/about', label: 'About' },
  { to: '/programmes', label: 'Programmes', mega: true },
  { to: '/sessions', label: 'Sessions' },
  { to: '/secretariat', label: 'Secretariat' },
  { to: '/contact', label: 'Contact' },
]

export function Nav() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  const bar = useRef<HTMLElement>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)

  const darkHero = pathname.startsWith('/sessions/')
  const light = open || (darkHero && !scrolled)

  // hide on scroll down, show on scroll up
  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll()
        setScrolled(y > 24)
        if (!bar.current) return
        const hide = self.direction === 1 && y > 320
        gsap.to(bar.current, { yPercent: hide ? -110 : 0, duration: 0.5, ease: 'power3.out', overwrite: true })
        if (hide) setMega(false)
      },
    })
    return () => st.kill()
  }, [])

  // close menus on route change
  useEffect(() => {
    setOpen(false)
    setMega(false)
    if (bar.current) gsap.set(bar.current, { yPercent: 0 })
  }, [pathname])

  // mobile overlay animation
  useEffect(() => {
    const el = overlay.current
    if (!el) return
    if (open) {
      lenis?.stop()
      gsap.set(el, { display: 'flex' })
      if (prefersReducedMotion()) {
        gsap.set(el, { clipPath: 'inset(0 0 0% 0)' })
        return
      }
      gsap
        .timeline()
        .fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'expo.inOut' })
        .from(el.querySelectorAll('[data-m]'), { yPercent: 120, opacity: 0, stagger: 0.05, duration: 0.8 }, '-=0.3')
    } else {
      lenis?.start()
      gsap.to(el, {
        clipPath: 'inset(0 0 100% 0)',
        duration: prefersReducedMotion() ? 0 : 0.5,
        ease: 'expo.inOut',
        onComplete: () => {
          gsap.set(el, { display: 'none' })
        },
      })
    }
  }, [open, lenis])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMega(false)
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`)

  return (
    <>
      <header
        ref={bar}
        className="fixed inset-x-0 top-0 z-50"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        onMouseLeave={() => setMega(false)}
      >
        <div
          className={clsx(
            'absolute inset-0 transition-all duration-500',
            (scrolled || mega) && !open ? 'border-b border-navy/10 bg-ivory/85 backdrop-blur-xl' : 'border-b border-transparent',
          )}
        />
        <nav className="wrap relative flex h-[var(--nav-h)] items-center justify-between gap-6" aria-label="Main">
          <TLink to="/" className="shrink-0 rounded-md" aria-label="Beyond the Bar, home">
            <LogoLockup tone={light ? 'light' : 'brand'} />
          </TLink>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.to} className="relative" onMouseEnter={() => setMega(!!l.mega)}>
                <TLink
                  to={l.to}
                  className={clsx(
                    'group relative flex items-center gap-1 rounded-full px-4 py-2 text-[15px] transition-colors',
                    light ? 'text-ivory/85 hover:text-ivory' : 'text-navy/75 hover:text-navy',
                    isActive(l.to) && (light ? 'text-ivory' : 'text-navy'),
                  )}
                  aria-current={isActive(l.to) ? 'page' : undefined}
                  onFocus={() => setMega(!!l.mega)}
                >
                  {l.label}
                  {l.mega && <ChevronDown className={clsx('size-3.5 transition-transform', mega && 'rotate-180')} />}
                  <span
                    className={clsx(
                      'absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-gold transition-all duration-300',
                      isActive(l.to) ? 'opacity-100' : 'scale-0 opacity-0',
                    )}
                  />
                </TLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <span className="hidden lg:block">
              <Button to="/contact?interest=webinar-series" variant={light ? 'gold' : 'navy'} className="min-h-11 text-[14px]">
                Join a session
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className={clsx(
                'flex min-h-11 items-center gap-2 rounded-full px-4 text-[14px] font-medium ring-1 ring-inset lg:hidden',
                open ? 'text-ivory ring-ivory/30' : light ? 'text-ivory ring-ivory/30' : 'text-navy ring-navy/20',
              )}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>

        {/* Programmes mega menu */}
        <div
          className={clsx(
            'absolute inset-x-0 top-full hidden transition-all duration-400 lg:block',
            mega ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0',
          )}
          onMouseEnter={() => setMega(true)}
        >
          <div className="border-b border-navy/10 bg-ivory/95 backdrop-blur-xl">
            <div className="wrap grid grid-cols-12 gap-8 py-8">
              <div className="col-span-3 flex flex-col justify-between border-r border-navy/10 pr-8">
                <div>
                  <p className="eyebrow text-gold-ink">Programmes</p>
                  <p className="h-card mt-3 text-2xl">Six programmes and a lifelong network.</p>
                </div>
                <TLink to="/programmes" className="link-u mt-6 inline-flex w-fit items-center gap-1 text-sm font-medium" tabIndex={mega ? 0 : -1}>
                  See all programmes <ArrowUpRight className="size-4" />
                </TLink>
              </div>
              <ul className="col-span-9 grid grid-cols-2 gap-x-8 gap-y-1 xl:grid-cols-3">
                {programmes.map((p) => (
                  <li key={p.slug}>
                    <TLink
                      to={`/programmes/${p.slug}`}
                      tabIndex={mega ? 0 : -1}
                      className="group flex gap-4 rounded-2xl p-3 transition-colors hover:bg-sand/70"
                    >
                      <span className="font-display-x pt-0.5 text-sm font-semibold text-gold-ink tabular">{p.number}</span>
                      <span>
                        <span className="block text-[15px] font-medium text-navy">{p.short}</span>
                        <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-taupe-ink">{p.lede}</span>
                      </span>
                    </TLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={overlay}
        className="fixed inset-0 z-40 hidden flex-col overflow-y-auto bg-navy text-ivory"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
        aria-hidden={!open}
      >
        <div className="wrap flex min-h-full flex-col pt-[calc(var(--nav-h)+env(safe-area-inset-top,0px)+24px)] pb-10">
          <ul className="flex flex-col">
            {[{ to: '/', label: 'Home' }, ...links].map((l) => (
              <li key={l.to} className="overflow-hidden border-b border-ivory/10">
                <TLink to={l.to} className="flex items-baseline justify-between py-4" tabIndex={open ? 0 : -1}>
                  <span data-m className="h-section block text-[2.4rem]">
                    {l.label}
                  </span>
                  <ArrowUpRight data-m className="size-5 text-gold" />
                </TLink>
              </li>
            ))}
          </ul>
          <p data-m className="eyebrow mt-8 text-gold">Programmes</p>
          <ul className="mt-3 grid gap-1">
            {programmes.map((p) => (
              <li key={p.slug} className="overflow-hidden">
                <TLink to={`/programmes/${p.slug}`} className="flex gap-3 py-1.5 text-ivory/80" tabIndex={open ? 0 : -1}>
                  <span data-m className="font-display-x w-6 text-sm text-gold tabular">
                    {p.number}
                  </span>
                  <span data-m>{p.short}</span>
                </TLink>
              </li>
            ))}
          </ul>
          <div data-m className="mt-auto pt-10 text-sm text-ivory/70">
            <p className="select-all">{site.email}</p>
            {site.offices.map((o) => (
              <p key={o.country} className="mt-1">
                {o.country}: {o.phones.map((ph) => ph.display).join(' · ')}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
