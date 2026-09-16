import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface IconBadgeProps {
  children: ReactNode
  className?: string
}

export function IconBadge({ children, className }: IconBadgeProps) {
  return <span className={cn('icon-badge', className)}>{children}</span>
}