import clsx from 'clsx'
import type { HTMLAttributes, ReactNode } from 'react'

/** Uppercase section label with a short gold rule, as used in BTB's session reports. */
export function Eyebrow({
  children,
  className,
  light,
  ...rest
}: { children: ReactNode; className?: string; light?: boolean } & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={clsx('eyebrow flex items-center gap-3', light ? 'text-gold' : 'text-gold-ink', className)} {...rest}>
      <span aria-hidden="true" className={clsx('h-px w-8 shrink-0', light ? 'bg-gold' : 'bg-gold-ink')} />
      {children}
    </p>
  )
}
