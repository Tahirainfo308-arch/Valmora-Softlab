import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface ContainerProps {
  children: ReactNode
  className?: string
  narrow?: boolean
}

export function Container({ children, className, narrow }: ContainerProps) {
  return (
    <div className={cn(narrow ? 'container-narrow' : 'container-site', className)}>
      {children}
    </div>
  )
}