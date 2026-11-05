import clsx from 'clsx'
import { asset } from '../../lib/asset'
import { countryName, type Country } from '../../data/site'

const flagSrc: Record<Country, string> = {
  ug: 'img/flags/ug.webp',
  rw: 'img/flags/rw.webp',
  ke: 'img/flags/ke.webp',
}

export function Flag({ code, className }: { code: Country; className?: string }) {
  return (
    <img
      src={asset(flagSrc[code])}
      alt={`${countryName[code]} flag`}
      width={24}
      height={16}
      className={clsx('h-4 w-6 rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(8,38,64,0.12)]', className)}
      loading="lazy"
    />
  )
}
