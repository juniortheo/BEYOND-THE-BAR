import clsx from 'clsx'
import { asset } from '../lib/asset'
import type { Programme } from '../data/site'
import { Pattern } from './ui/Pattern'

/**
 * A gold panel with the programme's object standing in it and breaking out of the top edge,
 * the same treatment on the home page, the programmes index and each programme page.
 */
export function ProgrammeVisual({
  p,
  className,
  numberSize = 'text-[9rem]',
  eager,
}: {
  p: Programme
  className?: string
  numberSize?: string
  eager?: boolean
}) {
  const v = p.visual
  const loading = eager ? 'eager' : 'lazy'
  const isPhoto = v.kind === 'photo'

  return (
    <div className={clsx('pv relative isolate', className)}>
      {/* panel */}
      <div
        className={clsx(
          'pv-panel absolute inset-x-0 bottom-0 overflow-hidden rounded-[28px] bg-gold',
          isPhoto ? 'top-[6%]' : 'top-[18%]',
        )}
      >
        <Pattern className="inset-0 text-navy opacity-[0.05]" size={300} />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.35),transparent_60%)]" />
        <span
          aria-hidden="true"
          className={clsx(
            'font-display-x absolute -bottom-[0.18em] right-4 leading-none font-extrabold text-navy/[0.09] tabular',
            numberSize,
          )}
        >
          {p.number}
        </span>
        {isPhoto && (
          <>
            <img
              src={asset(v.src)}
              alt={v.alt}
              loading={loading}
              className="pv-object absolute inset-0 h-full w-full object-cover mix-blend-multiply"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-navy/10 to-transparent" />
          </>
        )}
      </div>

      {/* object breaking out of the panel; clipped only at the panel's bottom edge */}
      {!isPhoto && (
        <div
          className="absolute inset-0"
          style={{ clipPath: 'inset(-60% 0 0 0 round 0 0 28px 28px)' }}
        >
          {v.kind === 'cutout' && (
            <div className="absolute inset-0 flex items-end justify-center">
              <img
                src={asset(v.src)}
                alt={v.alt}
                loading={loading}
                className={clsx('pv-object relative shrink-0 object-contain drop-shadow-[0_24px_30px_rgba(8,38,64,0.28)]', v.className)}
              />
            </div>
          )}
          {v.kind === 'svg' && (
            <img
              src={asset(v.src)}
              alt={v.alt}
              loading={loading}
              className="pv-object absolute bottom-0 left-0 w-full"
            />
          )}
          {v.kind === 'pair' && (
            <div className="pv-object absolute inset-x-[4%] bottom-0 flex h-[100%] items-end justify-center" role="img" aria-label={v.alt}>
              <img
                src={asset(v.srcs[0])}
                alt=""
                loading={loading}
                className="relative z-10 -mr-[8%] h-[96%] w-auto object-contain drop-shadow-[0_24px_30px_rgba(8,38,64,0.28)]"
              />
              <img
                src={asset(v.srcs[1])}
                alt=""
                loading={loading}
                className="h-[90%] w-auto object-contain drop-shadow-[0_24px_30px_rgba(8,38,64,0.28)]"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
