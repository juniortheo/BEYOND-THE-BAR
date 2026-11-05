import type { RefObject } from 'react'
import { gsap, SplitText, useGSAP, prefersReducedMotion } from './gsap'

/**
 * Scroll reveals inside a scope:
 *  [data-reveal]  rises and fades in (optional data-delay)
 *  [data-stagger] children rise in sequence
 *  [data-split]   heading lines slide up from a mask
 */
export function useReveal(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useGSAP(
    () => {
      if (prefersReducedMotion() || !scope.current) return
      const root = scope.current

      gsap.utils.toArray<HTMLElement>('[data-reveal]', root).forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 1.1,
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-stagger]', root).forEach((group) => {
        gsap.from(group.children, {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.07,
          scrollTrigger: { trigger: group, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-split]', root).forEach((el) => {
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.2,
              stagger: 0.08,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            }),
        })
      })
    },
    { scope, dependencies: deps },
  )
}
