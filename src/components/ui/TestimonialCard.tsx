import type { Testimonial } from '../../types'
import { cn } from '../../lib/utils'
import { RatingStars } from './RatingStars'

interface TestimonialCardProps {
  testimonial: Testimonial
  dark?: boolean
  className?: string
}

export function TestimonialCard({
  testimonial,
  dark = false,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col rounded-card p-6',
        dark
          ? 'border border-ink-800 bg-ink-900'
          : 'card shadow-card',
        className,
      )}
    >
      <RatingStars rating={testimonial.rating} />
      <blockquote
        className={cn(
          'mt-4 flex-1 text-base leading-relaxed',
          dark ? 'text-ink-100' : 'text-ink-700',
        )}
      >
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>
      <figcaption
        className={cn(
          'mt-6 text-sm font-semibold',
          dark ? 'text-white' : 'text-ink-900',
        )}
      >
        {testimonial.name}
        {testimonial.location && (
          <span
            className={cn(
              'font-normal',
              dark ? 'text-ink-400' : 'text-ink-500',
            )}
          >
            {' '}
            · {testimonial.location}
            {testimonial.project_type ? ` · ${testimonial.project_type}` : ''}
          </span>
        )}
      </figcaption>
    </figure>
  )
}