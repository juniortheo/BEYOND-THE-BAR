import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
gsap.defaults({ ease: 'expo.out', duration: 1 })
ScrollTrigger.config({ ignoreMobileResize: true })

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let refreshTimer: number | undefined
/** Debounced ScrollTrigger refresh, for images and fonts that change layout after load. */
export function queueRefresh(delay = 120) {
  window.clearTimeout(refreshTimer)
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), delay)
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
