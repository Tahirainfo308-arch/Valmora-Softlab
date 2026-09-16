import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'call'
  | 'on-dark'

export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  full?: boolean
  className?: string
}

type ButtonAsAnchor = ButtonBaseProps & {
  href: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>

export type ButtonProps = ButtonAsAnchor | ButtonAsButton

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  call: 'btn-call',
  'on-dark': 'btn-on-dark',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    full = false,
    className,
    ...rest
  } = props

  const classes = cn(
    'btn',
    variantClasses[variant],
    sizeClasses[size],
    full && 'btn-full',
    className,
  )

  if (typeof rest.href === 'string') {
    const { href, ...anchorProps } = rest as ButtonAsAnchor
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    )
  }

  const { href: _href, ...buttonProps } = rest as ButtonAsButton
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  )
}