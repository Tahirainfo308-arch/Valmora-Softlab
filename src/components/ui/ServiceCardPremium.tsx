import { createElement } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Service } from '../../types'
import { getIcon } from '../../lib/iconMap'
import { cn } from '../../lib/utils'

interface ServiceCardPremiumProps {
  service: Service
  index?: number
  className?: string
}

/** Premium contractor-style service card for the lead-gen template. */
export function ServiceCardPremium({
  service,
  index,
  className,
}: ServiceCardPremiumProps) {
  const Icon = getIcon(service.icon)
  const numbered = index !== undefined

  return (
    <article
      className={cn(
        'group relative flex h-full min-h-[440px] flex-col overflow-hidden rounded-card border border-roof-200 bg-white shadow-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-brand-600 hover:shadow-card-hover',
        className,
      )}
    >
      {/* Photo band — the primary visual for each service */}
      <div className="relative aspect-[16/9] overflow-hidden bg-roof-100">
        {service.image ? (
          <>
            <img
              src={service.image}
              alt={service.alt ?? service.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/55 via-ink-950/5 to-transparent"
            />
          </>
        ) : (
          <span className="flex h-full w-full items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-700 text-white shadow-cta transition-transform duration-200 group-hover:scale-105">
              {createElement(Icon, { size: 28, 'aria-hidden': true })}
            </span>
          </span>
        )}
        {service.badge && <span className="card-tag">{service.badge}</span>}
        {numbered && (
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-4 font-display text-3xl font-extrabold text-white/85"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="heading-4 text-xl text-ink-950">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
          {service.description}
        </p>
      </div>

      {/* Arrow / link row */}
      <div className="flex items-center justify-between border-t border-roof-100 px-6 py-3.5">
        <a
          href="#quote"
          className="text-sm font-semibold text-ink-500 transition-colors group-hover:text-brand-700"
          aria-label={`Request ${service.name}`}
        >
          Request Service
        </a>
        <a
          href="#quote"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-roof-200 text-brand-700 transition-colors duration-150 group-hover:border-brand-600 group-hover:bg-brand-700 group-hover:text-white"
          aria-label={`Request ${service.name}`}
        >
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </article>
  )
}