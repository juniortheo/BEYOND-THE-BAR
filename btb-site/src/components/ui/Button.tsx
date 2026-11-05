import { useRef, type ReactNode } from 'react'
import clsx from 'clsx'
import { ArrowUpRight } from 'lucide-react'
import { TLink } from '../TLink'
import { gsap, useGSAP } from '../../lib/gsap'

type Variant = 'navy' | 'gold' | 'ghost' | 'light' | 'ghost-light'
type Props = {
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: Variant
  children: ReactNode
  className?: string
  icon?: ReactNode
  magnetic?: boolean
}

const styles: Record<Variant, string> = {
  navy: 'bg-navy text-ivory [--fill:var(--color-navy-3)] [--chip:var(--color-gold)] [--chip-fg:var(--color-navy)]',
  gold: 'bg-gold text-navy [--fill:var(--color-gold-soft)] [--chip:var(--color-navy)] [--chip-fg:var(--color-ivory)]',
  light: 'bg-ivory text-navy [--fill:#ffffff] [--chip:var(--color-navy)] [--chip-fg:var(--color-ivory)]',
  ghost: 'bg-transparent text-navy ring-1 ring-inset ring-navy/25 [--fill:rgba(8,38,64,0.06)] [--chip:var(--color-navy)] [--chip-fg:var(--color-ivory)]',
  'ghost-light': 'bg-transparent text-ivory ring-1 ring-inset ring-ivory/30 [--fill:rgba(244,239,230,0.08)] [--chip:var(--color-gold)] [--chip-fg:var(--color-navy)]',
}

/** Pill button with a magnetic pull and an arrow chip that turns on hover. */
export function Button({ to, href, onClick, type = 'button', variant = 'navy', children, className, icon, magnetic = true }: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || !magnetic || window.matchMedia('(hover: none)').matches) return
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * 0.18)
        yTo((e.clientY - (r.top + r.height / 2)) * 0.28)
      }
      const leave = () => {
        xTo(0)
        yTo(0)
      }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      return () => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
      }
    },
    { dependencies: [magnetic] },
  )

  const inner = (
    <span
      ref={ref}
      className={clsx(
        'group/btn relative inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-full py-1.5 pr-1.5 pl-6 text-[15px] font-medium tracking-[0.01em] transition-shadow duration-300',
        styles[variant],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-[var(--fill)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:scale-y-100"
      />
      <span className="relative">{children}</span>
      <span className="relative grid size-9 place-items-center rounded-full bg-[var(--chip)] text-[var(--chip-fg)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/btn:rotate-45">
        {icon ?? <ArrowUpRight className="size-4" strokeWidth={2} />}
      </span>
    </span>
  )

  if (to) return <TLink to={to} className="inline-flex rounded-full">{inner}</TLink>
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full">
        {inner}
      </a>
    )
  return (
    <button type={type} onClick={onClick} className="inline-flex rounded-full">
      {inner}
    </button>
  )
}
