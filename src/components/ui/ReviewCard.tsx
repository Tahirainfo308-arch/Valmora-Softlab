import type { Review } from '../../types'
import { cn } from '../../lib/utils'
import { RatingStars } from './RatingStars'

interface ReviewCardProps {
  review: Review
  dark?: boolean
  className?: string
}

export function ReviewCard({ review, dark = false, className }: ReviewCardProps) {
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
      <div className="flex items-center justify-between gap-3">
        <RatingStars rating={review.rating} />
        {review.date && (
          <span
            className={cn(
              'text-xs',
              dark ? 'text-ink-400' : 'text-ink-500',
            )}
          >
            {review.date}
          </span>
        )}
      </div>
      <blockquote
        className={cn(
          'mt-4 flex-1 text-sm leading-relaxed',
          dark ? 'text-ink-100' : 'text-ink-700',
        )}
      >
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption
        className={cn(
          'mt-5 text-sm font-semibold',
          dark ? 'text-white' : 'text-ink-900',
        )}
      >
        {review.author}
        {review.location && (
          <span
            className={cn(
              'ml-2 font-normal',
              dark ? 'text-ink-400' : 'text-ink-500',
            )}
          >
            · {review.location}
          </span>
        )}
      </figcaption>
      {review.service && (
        <span
          className={cn(
            'mt-4 self-start rounded-full px-2.5 py-0.5 text-xs font-semibold',
            dark
              ? 'bg-ink-800 text-ink-300'
              : 'bg-roof-100 text-ink-700',
          )}
        >
          {review.service}
        </span>
      )}
    </figure>
  )
}