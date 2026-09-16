import { cn } from '../../lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  dark?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div
      className={cn(
        centered ? 'section-head' : 'section-head-left',
        className,
      )}
    >
      {eyebrow && (
        <p className={cn('eyebrow', dark && 'text-brand-400')}>{eyebrow}</p>
      )}
      <h2 className={cn('heading-2', dark && 'text-white')}>{title}</h2>
      {description && (
        <p className={cn('lead mt-4', dark && 'text-ink-300')}>{description}</p>
      )}
    </div>
  )
}