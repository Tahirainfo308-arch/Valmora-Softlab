import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { CircleCheck, ShieldCheck } from 'lucide-react'
import type { CompanyInfo, Service } from '../../types'
import { cn, toTelHref } from '../../lib/utils'
import { Button } from './Button'

const SERVICE_OPTIONS = [
  { value: 'roof-repair', label: 'Roof Repair' },
  { value: 'roof-replacement', label: 'Roof Replacement' },
  { value: 'storm-damage', label: 'Storm Damage' },
  { value: 'roof-inspection', label: 'Roof Inspection' },
  { value: 'emergency-roofing', label: 'Emergency Roofing' },
  { value: 'other', label: 'Other' },
]

const URGENCY_OPTIONS = [
  { value: 'asap', label: 'ASAP' },
  { value: 'few-days', label: 'Within a few days' },
  { value: 'few-weeks', label: 'Within a few weeks' },
  { value: 'researching', label: 'Just researching' },
]

interface QuoteFormProps {
  company: CompanyInfo
  /** Kept for backward compat — service options are now hardcoded for roofing. */
  services?: Service[]
  title?: string
  subtitle?: string
  buttonLabel?: string
  /** Tighten paddings/typography so the full form fits above the fold. */
  compact?: boolean
  className?: string
}

export function QuoteForm({
  company,
  title = 'Get Your Free Roof Estimate',
  subtitle = 'Tell us a little about your project and our team will get back to you.',
  buttonLabel = 'Get My Free Estimate',
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
  const reqMark = <span aria-hidden="true" className="ml-0.5 text-err-600">*</span>

  return (
    <div className={cn('card overflow-hidden', className)}>
      {/* Premium accent bar */}
      <div
        className="h-[3px] bg-gradient-to-r from-brand-600 to-brand-700"
        aria-hidden="true"
      />

      {/* Header */}
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
        <p
          className={cn(
            'mt-0.5 text-ink-600',
            compact ? 'text-xs' : 'text-sm',
          )}
        >
          {subtitle}
        </p>
      </div>

      {/* Form / Success */}
      {submitted ? (
        <div className="px-6 py-10 text-center" role="status" aria-live="polite">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
            <CircleCheck size={30} aria-hidden="true" />
          </span>
          <h4 className="heading-4 mt-4 text-lg">
            Thanks! Your request has been received.
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            <span className="font-semibold text-ink-900">{company.name}</span>{' '}
            will contact you shortly.
          </p>
          <p className="mt-1 text-xs text-ink-500">
            You&apos;ll hear from us within 2 business hours.
          </p>
          {company.emergency_service && (
            <p className="mt-4 text-sm text-ink-600">
              Need help now?{' '}
              <a
                href={toTelHref(company.phone)}
                className="link-inline font-semibold"
              >
                Call {company.phone}
              </a>
            </p>
          )}
        </div>
      ) : (
        <form
          className={cn(
            compact ? 'space-y-1.5 px-5 py-4' : 'space-y-3 px-6 py-5',
          )}
          onSubmit={handleSubmit}
          noValidate={false}
        >
          {/* Row 1: Name + Email */}
          <div
            className={cn('grid sm:grid-cols-2', compact ? 'gap-3' : 'gap-4')}
          >
            <div className="field">
              <label className="field-label" htmlFor={`${baseId}-name`}>
                Full Name{reqMark}
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
            <div className="field">
              <label className="field-label" htmlFor={`${baseId}-email`}>
                Email
              </label>
              <input
                id={`${baseId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 2: Phone + ZIP */}
          <div
            className={cn('grid sm:grid-cols-2', compact ? 'gap-3' : 'gap-4')}
          >
            <div className="field">
              <label className="field-label" htmlFor={`${baseId}-phone`}>
                Phone Number{reqMark}
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
                ZIP Code{reqMark}
              </label>
              <input
                id={`${baseId}-zip`}
                name="zip"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                required
                pattern="[0-9]{5}(-[0-9]{4})?"
                maxLength={10}
                placeholder="77056"
                title="Enter a 5-digit ZIP code, e.g. 77056"
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 3: Service + Urgency */}
          <div
            className={cn('grid sm:grid-cols-2', compact ? 'gap-3' : 'gap-4')}
          >
            <div className="field">
              <label className="field-label" htmlFor={`${baseId}-service`}>
                Service Needed{reqMark}
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
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field-label" htmlFor={`${baseId}-urgency`}>
                When do you need help?
              </label>
              <select
                id={`${baseId}-urgency`}
                name="urgency"
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled>
                  Select a timeframe
                </option>
                {URGENCY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="field">
            <label className="field-label" htmlFor={`${baseId}-message`}>
              Message
            </label>
            <textarea
              id={`${baseId}-message`}
              name="message"
              rows={compact ? 2 : 3}
              placeholder={`Tell us about your roof${company.city ? ` in ${company.city}` : ''} — leaks, storm damage, replacement…`}
              className={cn(
                'field-textarea',
                compact && 'py-2 min-h-[3.75rem]',
              )}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size={compact ? 'md' : 'lg'}
            full
          >
            {buttonLabel}
          </Button>

          {/* Trust statement */}
          <p className="text-center text-xs text-ink-400">
            No obligation &bull; Free estimate &bull; Fast response
          </p>
        </form>
      )}
    </div>
  )
}