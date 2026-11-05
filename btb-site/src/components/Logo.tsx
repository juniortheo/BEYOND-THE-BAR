import type { CSSProperties } from 'react'
import clsx from 'clsx'
import { MONO_SVG, MONO_VIEWBOX, WORD_SVG, WORD_VIEWBOX } from './logoPaths'

type Tone = 'brand' | 'light'
const toneStyle = (tone: Tone): CSSProperties | undefined =>
  tone === 'light' ? ({ '--logo-ink': '#f4efe6', '--logo-pillar': '#cfa071' } as CSSProperties) : undefined

export function Monogram({ className, tone = 'brand', title }: { className?: string; tone?: Tone; title?: string }) {
  return (
    <svg
      viewBox={MONO_VIEWBOX}
      className={className}
      style={toneStyle(tone)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      dangerouslySetInnerHTML={{ __html: MONO_SVG }}
    />
  )
}

export function Wordmark({ className, tone = 'brand' }: { className?: string; tone?: Tone }) {
  return <svg viewBox={WORD_VIEWBOX} className={className} style={toneStyle(tone)} aria-hidden="true" dangerouslySetInnerHTML={{ __html: WORD_SVG }} />
}

/** Horizontal lockup used in the navigation and footer. */
export function LogoLockup({ tone = 'brand', className }: { tone?: Tone; className?: string }) {
  return (
    <span className={clsx('inline-flex items-center gap-3', className)} role="img" aria-label="Beyond the Bar">
      <Monogram tone={tone} className="h-9 w-auto shrink-0" />
      <span
        className={clsx('h-7 w-px', tone === 'light' ? 'bg-ivory/30' : 'bg-navy/20')}
        aria-hidden="true"
      />
      <span className="flex flex-col gap-[5px]">
        <Wordmark tone={tone} className="h-[10px] w-auto" />
        <span className={clsx('hidden text-[9px] font-medium uppercase tracking-[0.28em] sm:block', tone === 'light' ? 'text-gold' : 'text-taupe-ink')}>
          Re-thinking legal practice
        </span>
      </span>
    </span>
  )
}
