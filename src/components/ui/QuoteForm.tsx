import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { CircleCheck, ShieldCheck } from 'lucide-react'
import type { CompanyInfo, Service } from '../../types'
import { cn, toTelHref } from '../../lib/utils'

interface QuoteFormProps {
  company: CompanyInfo
  services: Service[]
  title?: string
  subtitle?: string
  buttonLabel?: string
  className?: string
}

export function QuoteForm({
  company,
  services,
  title = 'Get Your Free Roof Inspection',
  subtitle = 'Fill this out and we\u2019ll call you back within 2 business hours.',
  buttonLabel = 'Get My Free Quote',
  className,
}: QuoteFormProps) {
  const baseId = useId()
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className={cn('card overflow-hidden', className)}>
      <div className="border-b border-roof-200 bg-roof-100 px-6 py-4">
        <h3 className="heading-3 flex items-center gap-2 text-xl">
          <ShieldCheck size={20} className="text-brand-700" aria-hidden="true" />
          {title}
        </h3>
        <p className="mt-1 text-sm text-ink-600">{subtitle}</p>
      </div>

      {submitted ? (
        <div className="px-6 py-10 text-center" role="status" aria-live="polite">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
            <CircleCheck size={30} aria-hidden="true" />
          </span>
          <h4 className="heading-4 mt-4 text-lg">
            Request received{name ? `, ${name}` : ''}!
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            {company.name} will call you back within 2 business hours.{' '}
            {company.emergency_service && (
              <>
                Need help right now?{' '}
                <a
                  href={toTelHref(company.phone)}
                  className="link-inline"
                >
                  Call {company.phone}
                </a>
                .
              </>
            )}
          </p>
        </div>
      ) : (
        <form className="space-y-4 px-6 py-6" onSubmit={handleSubmit}>
          <div className="field">
            <label className="field-label" htmlFor={`${baseId}-name`}>
              Full name
            </label>
            <input
              id={`${baseId}-name`}
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="John Carter"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="field-input"
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor={`${baseId}-phone`}>
              Phone number
            </label>
            <input
              id={`${baseId}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              placeholder="(555) 555-5555"
              className="field-input"
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor={`${baseId}-service`}>
              What do you need?
            </label>
            <select
              id={`${baseId}-service`}
              name="service"
              defaultValue=""
              required
              className="field-select"
            >
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
              <option value="other">Not sure / Other</option>
            </select>
          </div>

          <div className="field">
            <label className="field-label" htmlFor={`${baseId}-address`}>
              Street address / ZIP
            </label>
            <input
              id={`${baseId}-address`}
              name="address"
              type="text"
              autoComplete="street-address"
              placeholder={`e.g. ${company.city}, ${company.state}`}
              className="field-input"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg btn-full">
            {buttonLabel}
          </button>
          <p className="text-center text-xs text-ink-400">
            No pressure. No spam. A licensed inspector will reach out.
          </p>
        </form>
      )}
    </div>
  )
}