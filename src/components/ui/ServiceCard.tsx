import { createElement } from 'react'
import type { Service } from '../../types'
import { getIcon } from '../../lib/iconMap'
import { cn } from '../../lib/utils'

interface ServiceCardProps {
  service: Service
  index?: number
  className?: string
}

export function ServiceCard({ service, index, className }: ServiceCardProps) {
  const Icon = getIcon(service.icon)
  const numbered = index !== undefined

  return (
    <article className={cn('card card-hover relative p-6 md:p-7', className)}>
      {service.badge && <span className="card-tag">{service.badge}</span>}
      <div className="flex items-start gap-4">
        <span className="icon-badge">
          {createElement(Icon, { size: 22, 'aria-hidden': true })}
        </span>
        <div className="min-w-0">
          <h3 className="heading-4 flex flex-wrap items-baseline gap-x-2 text-xl">
            {numbered && (
              <span
                aria-hidden="true"
                className="font-display text-lg font-bold text-ink-300"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            )}
            <span>{service.name}</span>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            {service.description}
          </p>
        </div>
      </div>
    </article>
  )
}