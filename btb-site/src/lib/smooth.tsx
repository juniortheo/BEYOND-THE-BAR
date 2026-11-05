import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion, queueRefresh } from './gsap'

const LenisContext = createContext<Lenis | null>(null)

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion(),
    })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)

    document.fonts?.ready.then(() => queueRefresh(0))
    const onLoad = () => queueRefresh(0)
    window.addEventListener('load', onLoad)
    return () => {
      window.removeEventListener('load', onLoad)
      gsap.ticker.remove(tick)
      instance.destroy()
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)
