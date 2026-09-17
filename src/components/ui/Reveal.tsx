import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * One-shot, subtle scroll-reveal wrapper. Fades + lifts content 14px when it
 * enters the viewport. Respects prefers-reduced-motion (skip animation and
 * render visible), and degrades to visible content if IntersectionObserver
 * is unavailable. Does not animate anything above the fold by default.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const node = ref.current
    if (!node || visible) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -28px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [visible])

  return (
    <div
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}