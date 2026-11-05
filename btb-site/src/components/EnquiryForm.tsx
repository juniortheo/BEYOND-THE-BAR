import { useId, useMemo, useState, type FormEvent } from 'react'
import clsx from 'clsx'
import { Check, Copy, Mail } from 'lucide-react'
import { programmes, site } from '../data/site'
import { Button } from './ui/Button'

const extra = [
  { value: 'webinar-two-report', label: 'The Webinar Two session report' },
  { value: 'partnership', label: 'Partnership or sponsorship' },
  { value: 'other', label: 'Something else' },
]
export const interestOptions = [...programmes.map((p) => ({ value: p.slug, label: p.short })), ...extra]

type Fields = { name: string; email: string; organisation: string; country: string; interest: string; message: string }

/**
 * Builds a ready-to-send email to the BTB secretariat.
 * Opens the visitor's mail app, and always shows the text with a copy button
 * in case no mail app is set up.
 */
export function EnquiryForm({ defaultInterest = 'webinar-series', compact }: { defaultInterest?: string; compact?: boolean }) {
  const uid = useId()
  const [f, setF] = useState<Fields>({ name: '', email: '', organisation: '', country: 'Uganda', interest: defaultInterest, message: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [ready, setReady] = useState(false)
  const [copied, setCopied] = useState(false)

  const interestLabel = interestOptions.find((o) => o.value === f.interest)?.label ?? 'General enquiry'
  const subject = `BTB enquiry: ${interestLabel}`
  const body = useMemo(
    () =>
      [
        'Hello Beyond the Bar team,',
        '',
        f.message.trim() || `I would like to know more about: ${interestLabel}.`,
        '',
        `Name: ${f.name}`,
        `Email: ${f.email}`,
        f.organisation ? `Organisation: ${f.organisation}` : '',
        `Country: ${f.country}`,
        `Interested in: ${interestLabel}`,
      ]
        .filter((l, i, a) => !(l === '' && a[i - 1] === ''))
        .join('\n'),
    [f, interestLabel],
  )
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF((s) => ({ ...s, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: undefined }))
    setReady(false)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const er: typeof errors = {}
    if (!f.name.trim()) er.name = 'Enter your name so the secretariat knows who is writing.'
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) er.email = 'Enter an email address like name@example.com.'
    setErrors(er)
    if (Object.keys(er).length) return
    setReady(true)
    window.location.href = mailto
  }

  const copy = async () => {
    const text = `To: ${site.email}\nSubject: ${subject}\n\n${body}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      const el = document.getElementById(`${uid}-preview`)
      if (el) {
        const r = document.createRange()
        r.selectNodeContents(el)
        const sel = window.getSelection()
        sel?.removeAllRanges()
        sel?.addRange(r)
      }
    }
  }

  const field = 'mt-2 w-full rounded-xl border border-line bg-paper px-4 py-3.5 text-[16px] text-navy outline-none transition-colors placeholder:text-taupe/70 focus:border-navy focus-visible:outline-none focus:ring-2 focus:ring-blue/40'
  const label = 'text-[13px] font-medium tracking-wide text-navy'

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      <div className={clsx('grid gap-5', !compact && 'md:grid-cols-2')}>
        <div>
          <label htmlFor={`${uid}-name`} className={label}>Full name</label>
          <input id={`${uid}-name`} className={field} value={f.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${uid}-name-err` : undefined} />
          {errors.name && <p id={`${uid}-name-err`} className="mt-1.5 text-[13px] text-[#a3361f]">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={label}>Email</label>
          <input id={`${uid}-email`} type="email" className={field} value={f.email} onChange={set('email')} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}-email-err` : undefined} />
          {errors.email && <p id={`${uid}-email-err`} className="mt-1.5 text-[13px] text-[#a3361f]">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor={`${uid}-org`} className={label}>
            Organisation <span className="font-normal text-taupe-ink">(optional)</span>
          </label>
          <input id={`${uid}-org`} className={field} value={f.organisation} onChange={set('organisation')} autoComplete="organization" />
        </div>
        <div>
          <label htmlFor={`${uid}-country`} className={label}>Country</label>
          <select id={`${uid}-country`} className={field} value={f.country} onChange={set('country')}>
            {['Uganda', 'Rwanda', 'Kenya', 'Tanzania', 'Burundi', 'South Sudan', 'DR Congo', 'Other'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor={`${uid}-interest`} className={label}>I'm interested in</label>
        <select id={`${uid}-interest`} className={field} value={f.interest} onChange={set('interest')}>
          {interestOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${uid}-msg`} className={label}>
          Message <span className="font-normal text-taupe-ink">(optional)</span>
        </label>
        <textarea id={`${uid}-msg`} rows={compact ? 4 : 5} className={clsx(field, 'resize-y')} value={f.message} onChange={set('message')} />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="navy" icon={<Mail className="size-4" />}>
          Write the email
        </Button>
        <p className="text-[13px] text-taupe-ink">Opens your mail app, addressed to {site.email}</p>
      </div>

      {ready && (
        <div className="rounded-2xl border border-line bg-sand/60 p-5" role="status">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[15px] font-medium">Your email is ready. If your mail app didn't open, copy it and send it to {site.email}.</p>
            <div className="flex gap-2">
              <button type="button" onClick={copy} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-navy px-4 text-[14px] text-ivory">
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />} {copied ? 'Copied' : 'Copy email'}
              </button>
              <a href={mailto} className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[14px] ring-1 ring-inset ring-navy/25">
                <Mail className="size-4" /> Open mail app
              </a>
            </div>
          </div>
          <pre id={`${uid}-preview`} className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-paper p-4 font-serif text-[15px] leading-relaxed text-navy/85">
            {`To: ${site.email}\nSubject: ${subject}\n\n${body}`}
          </pre>
        </div>
      )}
    </form>
  )
}
