import { useId, useRef, useState, type FormEvent } from 'react'
import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { Button } from './ui/Button'
import { site } from '../data/site'

/**
 * Registration for the next session, handled by Netlify Forms.
 *
 * Netlify only detects forms that exist in the deployed HTML, so a hidden copy of this
 * form (same name, same fields) lives in index.html. If you add, rename or remove a field
 * here, change it there too.
 */
export const SESSION_FORM_NAME = 'next-session-registration'
const COUNTRIES = ['Uganda', 'Rwanda', 'Other']

type Fields = { name: string; email: string; organisation: string; country: string }
type Status = 'idle' | 'sending' | 'sent' | 'error'

export function SessionRegistrationForm() {
  const uid = useId()
  const [f, setF] = useState<Fields>({ name: '', email: '', organisation: '', country: '' })
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const done = useRef<HTMLParagraphElement>(null)

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF((s) => ({ ...s, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: undefined }))
    if (status === 'error') setStatus('idle')
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    const er: typeof errors = {}
    if (!f.name.trim()) er.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) er.email = 'Enter an email address like name@example.com.'
    setErrors(er)
    if (Object.keys(er).length) {
      document.getElementById(`${uid}-${Object.keys(er)[0]}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const body = new URLSearchParams({
        'form-name': SESSION_FORM_NAME,
        name: f.name.trim(),
        email: f.email.trim(),
        organisation: f.organisation.trim(),
        country: f.country,
        'bot-field': honeypot,
      })
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
      requestAnimationFrame(() => done.current?.focus())
    } catch {
      setStatus('error')
    }
  }

  const label = 'text-[13px] font-medium tracking-wide text-ivory/85'
  const field =
    'mt-2 w-full rounded-xl border border-transparent bg-ivory px-4 py-3.5 text-[16px] text-navy outline-none transition-[border-color,box-shadow] placeholder:text-taupe/80 focus:border-gold focus:ring-2 focus:ring-gold/40'
  const error = 'mt-1.5 text-[13px] text-[#f4b7a8]'

  return (
    <div className="rounded-[28px] bg-navy/85 p-6 ring-1 ring-ivory/15 sm:p-8 lg:backdrop-blur-sm">
      {status === 'sent' ? (
        <div className="py-6" role="status">
          <p className="eyebrow text-gold">Registered</p>
          <p ref={done} tabIndex={-1} className="mt-4 font-serif text-[1.35rem] leading-snug text-ivory outline-none">
            Thank you – you’ll receive the invitation for the next session by email.
          </p>
        </div>
      ) : (
        <form
          name={SESSION_FORM_NAME}
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={submit}
          noValidate
          className="grid gap-5"
          aria-labelledby={`${uid}-title`}
        >
          <input type="hidden" name="form-name" value={SESSION_FORM_NAME} />
          <p hidden>
            <label>
              Leave this empty: <input name="bot-field" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <p id={`${uid}-title`} className="eyebrow text-gold">
            Register for the next session
          </p>

          <div>
            <label htmlFor={`${uid}-name`} className={label}>
              Full name
            </label>
            <input
              id={`${uid}-name`}
              name="name"
              className={field}
              value={f.name}
              onChange={set('name')}
              autoComplete="name"
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            />
            {errors.name && (
              <p id={`${uid}-name-err`} className={error}>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`${uid}-email`} className={label}>
              Email
            </label>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className={field}
              value={f.email}
              onChange={set('email')}
              autoComplete="email"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${uid}-email-err` : undefined}
            />
            {errors.email && (
              <p id={`${uid}-email-err`} className={error}>
                {errors.email}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 sm:items-end">
            <div>
              <label htmlFor={`${uid}-organisation`} className={label}>
                Organisation / role <span className="font-normal text-ivory/55">(optional)</span>
              </label>
              <input
                id={`${uid}-organisation`}
                name="organisation"
                className={field}
                value={f.organisation}
                onChange={set('organisation')}
                autoComplete="organization"
              />
            </div>
            <div>
              <label htmlFor={`${uid}-country`} className={label}>
                Country
              </label>
              <div className="relative">
                <select
                  id={`${uid}-country`}
                  name="country"
                  className={clsx(field, 'appearance-none pr-11', !f.country && 'text-taupe-ink')}
                  value={f.country}
                  onChange={set('country')}
                >
                  <option value="">Select</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c} className="text-navy">
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 mt-1 size-4 -translate-y-1/2 text-navy/60" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-4">
            <Button type="submit" variant="gold" magnetic={false}>
              {status === 'sending' ? 'Registering…' : 'Register for the next session'}
            </Button>
          </div>

          {status === 'error' && (
            <p className={error} role="alert">
              Your registration didn’t go through. Please try again, or email {site.email}.
            </p>
          )}
        </form>
      )}
    </div>
  )
}
