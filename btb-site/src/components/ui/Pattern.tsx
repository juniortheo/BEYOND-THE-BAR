import clsx from 'clsx'
import type { CSSProperties } from 'react'
import { asset } from '../../lib/asset'

/** The BTB brand pattern as a recolourable mask. Colour follows `currentColor`. */
export function Pattern({ className, size = 440, style }: { className?: string; size?: number; style?: CSSProperties }) {
  const url = `url("${asset('img/btb-pattern.svg')}")`
  return (
    <div
      aria-hidden="true"
      className={clsx('pointer-events-none absolute', className)}
      style={{
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: `${size}px auto`,
        maskSize: `${size}px auto`,
        WebkitMaskRepeat: 'repeat',
        maskRepeat: 'repeat',
        backgroundColor: 'currentColor',
        ...style,
      }}
    />
  )
}
