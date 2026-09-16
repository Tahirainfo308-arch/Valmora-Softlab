import { PhoneCall } from 'lucide-react'
import { toTelHref } from '../../lib/utils'
import { Button, type ButtonSize, type ButtonVariant } from './Button'

interface PhoneCTAProps {
  phone: string
  label?: string
  variant?: ButtonVariant
  size?: ButtonSize
  full?: boolean
  className?: string
}

export function PhoneCTA({
  phone,
  label = phone,
  variant = 'call',
  size = 'md',
  full = false,
  className,
}: PhoneCTAProps) {
  return (
    <Button
      href={toTelHref(phone)}
      variant={variant}
      size={size}
      full={full}
      className={className}
      aria-label={`Call ${label}`}
    >
      <PhoneCall size={16} aria-hidden="true" />
      {label}
    </Button>
  )
}