import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/gsap'

/** Counts up to `value` when scrolled into view. */
export function Counter({ value, suffix = '', className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useGSAP(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const obj = { v: 0 }
    gsap.to(obj, {
      v: value,
      duration: 1.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onStart: () => {
        el.textContent = `0${suffix}`
      },
      onUpdate: () => {
        el.textContent = `${Math.round(obj.v)}${suffix}`
      },
    })
  }, [value, suffix])
  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
