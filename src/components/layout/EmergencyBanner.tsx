import { PhoneCall, TriangleAlert } from 'lucide-react'
import type { EmergencyBanner as EmergencyConfig } from '../../types'
import { toTelHref } from '../../lib/utils'
import { Container } from '../ui/Container'

interface EmergencyBannerProps {
  emergency: EmergencyConfig
}

export function EmergencyBanner({ emergency }: EmergencyBannerProps) {
  if (!emergency.enabled) return null

  return (
    <div className="emergency-banner">
      <Container className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
        <TriangleAlert size={15} className="shrink-0" aria-hidden="true" />
        <span className="font-bold">{emergency.title}</span>
        <span className="hidden sm:inline" aria-hidden="true">
          —
        </span>
        <span className="hidden sm:inline">{emergency.description}</span>
        <a
          href={toTelHref(emergency.phone)}
          className="inline-flex items-center gap-1 font-bold underline decoration-2 underline-offset-2 hover:text-white/85"
        >
          <PhoneCall size={13} aria-hidden="true" />
          {emergency.phone}
        </a>
      </Container>
    </div>
  )
}