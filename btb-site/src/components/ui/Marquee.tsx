import clsx from 'clsx'
import type { ReactNode } from 'react'

/** Infinite ticker. Pauses on hover and stops under reduced motion. */
export function Marquee({ items, className, duration = 50 }: { items: ReactNode[]; className?: string; duration?: number }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <li key={i} className="flex items-center">
          {it}
        </li>
      ))}
    </ul>
  )
  return (
    <div className={clsx('marquee overflow-hidden', className)}>
      <div className="marquee-track flex w-max" style={{ ['--marquee-duration' as string]: `${duration}s` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
