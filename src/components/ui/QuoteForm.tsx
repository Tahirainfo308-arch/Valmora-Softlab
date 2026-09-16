import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { CircleCheck, ShieldCheck } from 'lucide-react'
import type { CompanyInfo, Service } from '../../types'
import { cn, toTelHref } from '../../lib/utils'
import { Button } from './Button'

interface QuoteFormProps {
  company: CompanyInfo
  services: Service[]
  title?: string
  subtitle?: string
  buttonLabel?: string
  /** Tighten paddings/typography so the full form fits above the fold. */
  compact?: boolean
  className?: string
}

export function QuoteForm({
  company,
  services,
  title = 'Get Your Free Roof Inspection',
  subtitle = 'Fill this out and we\u2019ll call you back within 2 business hours.',
  buttonLabel = 'Get My Free Quote',
  compact = false,
  className,
}: QuoteFormProps) {
  const baseId = useId()
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  const inputClass = cn('field-input', compact && 'py-2 text-[15px]')
  const selectClass = cn('field-select', compact && 'py-2')

  return (
    <div className={cn('card overflow-hidden', className)}>
      <div
        className={cn(
          'border-b border-roof-200 bg-roof-100',
          compact ? 'px-5 py-3' : 'px-6 py-4',
        )}
      >
        <h3
          className={cn(
            'heading-3 flex items-center gap-2',
            compact ? 'text-[17px]' : 'text-xl',
          )}
        >
          <ShieldCheck
            size={compact ? 17 : 20}
            className="shrink-0 text-brand-700"
            aria-hidden="true"
          />
          {title}
        </h3>
        <p className={cn('mt-0.5 text-ink-600', compact ? 'text-xs' : 'text-sm')}>
          {subtitle}
        </p>
      </div>

      {submitted ? (
        <div className="px-5 py-10 text-center" role="status" aria-live="polite">
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
                <a href={toTelHref(company.phone)} className="link-inline">
                  Call {company.phone}
                </a>
                .
              </>
            )}
          </p>
        </div>
      ) : (
        <form
          className={cn(compact ? 'space-y-1.5 px-5 py-4' : 'space-y-4 px-6 py-6')}
          onSubmit={handleSubmit}
        >
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
              className={inputClass}
            />
          </div>

          <div className={cn('grid sm:grid-cols-2', compact ? 'gap-3' : 'gap-4')}>
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
                className={inputClass}
              />
            </div>

            <div className="field">
              <label className="field-label" htmlFor={`${baseId}-zip`}>
                ZIP / city
              </label>
              <input
                id={`${baseId}-zip`}
                name="zip"
                type="text"
                autoComplete="postal-code"
                inputMode="numeric"
                maxLength={10}
                placeholder={company.city ? `${company.city} or 77056` : '77056'}
                className={inputClass}
              />
            </div>
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
              className={selectClass}
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
            <label className="field-label" htmlFor={`${baseId}-message`}>
              Details &amp; urgency
            </label>
            <textarea
              id={`${baseId}-message`}
              name="message"
              rows={compact ? 2 : 3}
              placeholder={`Leaks, storm damage, replacement… how soon do you need help${company.city ? ` in ${company.city}` : ''}?`}
              className={cn('field-textarea', compact && 'py-2 min-h-[3.75rem]')}
            />
          </div>

          <Button type="submit" variant="primary" size={compact ? 'md' : 'lg'} full>
            {buttonLabel}
          </Button>
          <p
            className={cn(
              'text-center text-ink-400',
              compact ? 'text-xs' : 'text-xs',
            )}
          >
            No pressure. No spam. A licensed inspector will reach out.
          </p>
        </form>
      )}
    </div>
  )
}