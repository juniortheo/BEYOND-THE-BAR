import { Button } from '../components/ui/Button'
import { asset } from '../lib/asset'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden pt-[var(--nav-h)]">
      <img src={asset('img/statue-justice-sm.webp')} alt="" aria-hidden="true" className="absolute right-[6%] bottom-0 hidden h-[80%] w-auto opacity-80 md:block" />
      <div className="wrap relative">
        <p className="eyebrow text-gold-ink">Error 404</p>
        <h1 className="h-display mt-6 max-w-[14ch] text-[clamp(2.8rem,7vw,6rem)]">
          This page is <span className="accent text-gold-ink">out of court.</span>
        </h1>
        <p className="mt-6 max-w-[44ch] font-serif text-xl leading-relaxed text-navy/75">
          The address may be mistyped, or the page may have moved. Head back to the home page or browse the programmes.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/">Back to home</Button>
          <Button to="/programmes" variant="ghost">
            Programmes
          </Button>
        </div>
      </div>
    </section>
  )
}
