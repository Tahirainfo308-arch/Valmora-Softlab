import { createElement } from 'react'
import type { TrustBadge } from '../../types'
import { getIcon } from '../../lib/iconMap'
import { cn } from '../../lib/utils'

export type TrustBadgeVariant = 'row' | 'card' | 'pill' | 'dark'

interface TrustBadgeProps {
  badge: TrustBadge
  variant?: TrustBadgeVariant
  className?: string
  headingLevel?: 'h3' | 'h4'
}

function BadgeIcon({
  badge,
  size,
  className,
}: {
  badge: TrustBadge
  size: number
  className?: string
}) {
  const Icon = getIcon(badge.icon)
  return createElement(Icon, { size, className, 'aria-hidden': true })
}

export function TrustBadge({
  badge,
  variant = 'row',
  className,
  headingLevel = 'h4',
}: TrustBadgeProps) {
  if (variant === 'card') {
    const Heading = headingLevel
    return (
      <div className={cn('card card-hover flex flex-col items-center p-6 text-center', className)}>
        <span className="icon-badge mx-auto">
          <BadgeIcon badge={badge} size={22} />
        </span>
        <Heading className="mt-4 text-lg text-ink-950">{badge.label}</Heading>
        {badge.detail && (
          <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{badge.detail}</p>
        )}
      </div>
    )
  }

  if (variant === 'pill') {
    return (
      <span className={cn('badge', className)}>
        <BadgeIcon badge={badge} size={16} className="text-brand-700" />
        <span>{badge.label}</span>
      </span>
    )
  }

  if (variant === 'dark') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border border-ink-800 bg-ink-900/80 px-3 py-1 text-xs font-semibold text-ink-200',
          className,
        )}
      >
        <BadgeIcon badge={badge} size={13} className="text-brand-400" />
        <span>{badge.label}</span>
      </span>
    )
  }

  return (
    <span className={cn('flex items-center gap-3', className)}>
      <span className="icon-badge">
        <BadgeIcon badge={badge} size={20} />
      </span>
      <span>
        {badge.label && (
          <span className="block text-sm font-bold text-ink-950">{badge.label}</span>
        )}
        {badge.detail && (
          <span className="block text-sm text-ink-600">{badge.detail}</span>
        )}
      </span>
    </span>
  )
}