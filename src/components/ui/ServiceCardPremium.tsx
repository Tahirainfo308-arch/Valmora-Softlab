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
        'group relative flex h-full flex-col overflow-hidden rounded-card border border-roof-200 bg-white shadow-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-brand-600 hover:shadow-card-hover',
        className,
      )}
    >
      {/* Icon band with soft shape + badge */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-roof-100">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-100 blur-2xl transition-opacity duration-200 opacity-80 group-hover:opacity-100"
        />
        <span className="pointer-events-none absolute -bottom-16 -left-8 h-32 w-32 rounded-full bg-roof-200/70 blur-2xl" aria-hidden="true" />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-brand-700 text-white shadow-cta transition-transform duration-200 group-hover:scale-105">
          {createElement(Icon, { size: 28, 'aria-hidden': true })}
        </span>
        {service.badge && <span className="card-tag">{service.badge}</span>}
        {numbered && (
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-4 font-display text-3xl font-extrabold text-roof-300"
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