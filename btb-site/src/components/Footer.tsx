import { ArrowUpRight } from 'lucide-react'
import { TLink } from './TLink'
import { Monogram, Wordmark } from './Logo'
import { Pattern } from './ui/Pattern'
import { Flag } from './ui/Flag'
import { programmes, site } from '../data/site'
import { asset } from '../lib/asset'

const explore = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About BTB' },
  { to: '/programmes', label: 'Programmes' },
  { to: '/sessions', label: 'Sessions' },
  { to: '/sessions/ai-in-legal-practice', label: 'Webinar Two report' },
  { to: '/secretariat', label: 'Secretariat' },
  { to: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="on-navy relative overflow-hidden bg-navy text-ivory">
      <Pattern className="-top-10 right-0 h-[120%] w-[55%] text-ivory opacity-[0.035]" size={520} />
      <div className="wrap relative pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-5">
              <Monogram tone="light" className="h-16 w-auto" />
              <div className="h-12 w-px bg-ivory/20" />
              <div className="flex flex-col gap-2">
                <Wordmark tone="light" className="h-[14px] w-auto" />
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">Re-thinking legal practice</span>
              </div>
            </div>
            <p className="mt-8 max-w-md font-serif text-lg leading-relaxed text-ivory/75">
              A regional legal, business and professional development platform for East Africa and beyond.
            </p>
            <div className="mt-10">
              <p className="eyebrow text-gold">An initiative by</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {site.founders.map((f) => (
                  <div key={f.name} className="flex h-20 items-center gap-3 rounded-2xl bg-ivory px-5">
                    <img src={asset(f.logo)} alt={f.name} className="h-11 w-auto" loading="lazy" />
                    <Flag code={f.code} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7" aria-label="Footer">
            <div>
              <p className="eyebrow text-gold">Explore</p>
              <ul className="mt-5 space-y-2.5">
                {explore.map((l) => (
                  <li key={l.to}>
                    <TLink to={l.to} className="link-u text-[15px] text-ivory/80 hover:text-ivory">
                      {l.label}
                    </TLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-gold">Programmes</p>
              <ul className="mt-5 space-y-2.5">
                {programmes.map((p) => (
                  <li key={p.slug}>
                    <TLink to={`/programmes/${p.slug}`} className="link-u text-[15px] text-ivory/80 hover:text-ivory">
                      {p.short}
                    </TLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="eyebrow text-gold">Get in touch</p>
              <ul className="mt-5 space-y-5 text-[15px] text-ivory/80">
                <li>
                  <a href={`mailto:${site.email}`} className="link-u select-all break-all hover:text-ivory">
                    {site.email}
                  </a>
                </li>
                {site.offices.map((o) => (
                  <li key={o.country}>
                    <span className="flex items-center gap-2 text-ivory">
                      <Flag code={o.code} className="h-3 w-[18px]" /> {o.country}
                    </span>
                    {o.phones.map((ph) => (
                      <a key={ph.tel} href={`tel:${ph.tel}`} className="mt-1 block tabular hover:text-ivory">
                        {ph.display}
                      </a>
                    ))}
                  </li>
                ))}
                <li>
                  <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" className="link-u inline-flex items-center gap-1 hover:text-ivory">
                    LinkedIn · {site.linkedinLabel} <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="hairline mt-20" />
        <div className="mt-6 flex flex-col gap-3 text-[13px] text-ivory/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Beyond the Bar · {site.regions}</p>
          <p className="max-w-xl md:text-right">Content on this site is published for general information. It is not legal advice.</p>
        </div>
      </div>
    </footer>
  )
}
