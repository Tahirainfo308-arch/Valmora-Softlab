import { Star } from 'lucide-react'
import { cn } from '../../lib/utils'

interface RatingStarsProps {
  rating: number
  size?: number
  className?: string
}

export function RatingStars({ rating, size = 16, className }: RatingStarsProps) {
  const filled = Math.round(rating)
  return (
    <span
      className={cn('inline-flex items-center gap-0.5', className)}
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          aria-hidden="true"
          className={
            i < filled
              ? 'fill-brand-500 text-brand-500'
              : 'fill-roof-300 text-roof-300'
          }
        />
      ))}
    </span>
  )
}