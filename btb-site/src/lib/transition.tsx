import { createContext, useCallback, useContext, useLayoutEffect, useRef, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'
import { useLenis } from './smooth'
import { MONO_SVG, MONO_VIEWBOX } from '../components/logoPaths'

type Go = (to: string) => void
const TransitionContext = createContext<Go>(() => {})
export const useGo = () => useContext(TransitionContext)

/** Navy curtain with the BTB monogram that covers the screen between pages. */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const lenis = useLenis()
  const curtain = useRef<HTMLDivElement>(null)
  const mark = useRef<HTMLDivElement>(null)
  const covering = useRef(false)

  const scrollToHash = useCallback(
    (hash: string) => {
      const el = document.getElementById(hash)
      if (!el) return false
      const y = el.getBoundingClientRect().top + window.scrollY - 96
      if (lenis) lenis.scrollTo(y, { duration: 1.2 })
      else window.scrollTo({ top: y, behavior: 'smooth' })
      return true
    },
    [lenis],
  )

  const go = useCallback<Go>(
    (to) => {
      const [path, hash] = to.split('#')
      const pathOnly = path.split('?')[0]
      const samePage = (pathOnly || location.pathname) === location.pathname
      if (samePage) {
        if (path.includes('?')) navigate(path, { replace: true })
        if (hash && scrollToHash(hash)) return
        if (lenis) lenis.scrollTo(0, { duration: 1.2 })
        else window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      if (covering.current) return
      if (prefersReducedMotion() || !curtain.current) {
        navigate(path)
        return
      }
      covering.current = true
      lenis?.stop()
      gsap
        .timeline()
        .set(curtain.current, { display: 'flex', yPercent: 100 })
        .set(mark.current, { opacity: 0, scale: 0.85 })
        .to(curtain.current, { yPercent: 0, duration: 0.6, ease: 'expo.inOut' })
        .to(mark.current, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }, '-=0.25')
        .add(() => navigate(path))
    },
    [lenis, location.pathname, navigate, scrollToHash],
  )

  // After every route change: jump to top, recalc triggers, lift the curtain.
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    lenis?.scrollTo(0, { immediate: true, force: true })
    ScrollTrigger.refresh()
    if (covering.current && curtain.current) {
      gsap
        .timeline({
          onComplete: () => {
            covering.current = false
            lenis?.start()
          },
        })
        .to(mark.current, { opacity: 0, duration: 0.25, ease: 'power1.in' }, 0.1)
        .to(curtain.current, { yPercent: -100, duration: 0.7, ease: 'expo.inOut' }, 0.15)
        .set(curtain.current, { display: 'none' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <TransitionContext.Provider value={go}>
      {children}
      <div
        ref={curtain}
        aria-hidden="true"
        className="fixed inset-0 z-[100] hidden items-center justify-center bg-navy"
        style={{ willChange: 'transform' }}
      >
        <div ref={mark} className="w-24 [--logo-ink:#f4efe6] [--logo-pillar:#cfa071]">
          <svg viewBox={MONO_VIEWBOX} className="h-auto w-full" dangerouslySetInnerHTML={{ __html: MONO_SVG }} />
        </div>
      </div>
    </TransitionContext.Provider>
  )
}
