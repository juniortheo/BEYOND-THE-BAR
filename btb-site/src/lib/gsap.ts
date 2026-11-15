import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
gsap.defaults({ ease: 'expo.out', duration: 1 })
ScrollTrigger.config({ ignoreMobileResize: true })

/** Layouts at and above this width are "desktop". Below it, motion is kept to hero entrances only. */
export const DESKTOP_QUERY = '(min-width: 1024px)'
export const DESKTOP_MOTION_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
export const isDesktop = () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches

/**
 * Heading lines revealed through a SplitText mask start this far below their resting place.
 * The masks (.split-line-mask) clip a little beyond each line so descenders like g, p and y
 * are never cut off; this offset clears that extra area so nothing peeks out at the start.
 */
export const LINE_FROM = 155

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let refreshTimer: number | undefined
/** Debounced ScrollTrigger refresh, for images and fonts that change layout after load. */
export function queueRefresh(delay = 120) {
  window.clearTimeout(refreshTimer)
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), delay)
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
