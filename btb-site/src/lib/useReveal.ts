import type { RefObject } from 'react'
import { gsap, SplitText, useGSAP, DESKTOP_MOTION_QUERY, LINE_FROM } from './gsap'

/**
 * Scroll reveals inside a scope (desktop only):
 *  [data-reveal]  rises and fades in (optional data-delay)
 *  [data-stagger] children rise in sequence
 *  [data-split]   heading lines slide up from a mask
 *
 * Phones and tablets get no scroll reveals: content is visible the moment it
 * scrolls in, so fast scrollers are never waiting on an animation.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useGSAP(
    () => {
      if (!scope.current) return
      const root = scope.current
      const mm = gsap.matchMedia()
      mm.add(DESKTOP_MOTION_QUERY, () => {
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
            linesClass: 'split-line',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: LINE_FROM,
                duration: 1.2,
                stagger: 0.08,
                scrollTrigger: { trigger: el, start: 'top 90%', once: true },
              }),
          })
        })
      })
    },
    { scope, dependencies: deps },
  )
}
