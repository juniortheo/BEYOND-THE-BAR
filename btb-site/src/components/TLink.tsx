import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { useHref } from 'react-router-dom'
import { useGo } from '../lib/transition'

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string; children: ReactNode }

/** Internal link that plays the page transition before navigating. */
export function TLink({ to, children, onClick, ...rest }: Props) {
  const go = useGo()
  const href = useHref(to)
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    go(to)
  }
  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  )
}
