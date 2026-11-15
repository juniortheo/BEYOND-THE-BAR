import { useRef } from 'react'
import { gsap, useGSAP, DESKTOP_MOTION_QUERY } from '../../lib/gsap'

/** Counts up to `value` when scrolled into view (desktop only; phones show the number as is). */
export function Counter({ value, suffix = '', className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add(DESKTOP_MOTION_QUERY, () => {
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
      return () => {
        el.textContent = `${value}${suffix}`
      }
    })
  }, [value, suffix])
  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  )
}
