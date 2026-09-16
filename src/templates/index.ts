import type { ComponentType } from 'react'
import type { CompanyConfig, TemplateId } from '../types'
import { LeadGenTemplate } from './lead-gen/LeadGenTemplate'
import { TrustTemplate } from './trust/TrustTemplate'
import { ModernTemplate } from './modern/ModernTemplate'

export type { TemplateId }

export type SiteTemplateProps = { config: CompanyConfig }

interface TemplateOption {
  id: TemplateId
  label: string
  tagline: string
}

export const TEMPLATES: Record<TemplateId, ComponentType<SiteTemplateProps>> = {
  'template-1': LeadGenTemplate,
  'template-2': TrustTemplate,
  'template-3': ModernTemplate,
}

/** Ordered, human-readable metadata used by the dev switcher. */
export const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: 'template-1',
    label: 'Lead Gen & Direct Action',
    tagline: 'Quote form above the fold, click-to-call everywhere',
  },
  {
    id: 'template-2',
    label: 'Trust & Social Proof',
    tagline: 'Editorial calm, reviews and before/after proof',
  },
  {
    id: 'template-3',
    label: 'Modern & Bold',
    tagline: 'High-contrast branding, interactive service grid',
  },
]

export function isTemplateId(value: string | null): value is TemplateId {
  return value !== null && value in TEMPLATES
}

/** Single source of truth for switching sites — driven by config.template. */
export function resolveTemplate(template?: TemplateId): TemplateId {
  return template && template in TEMPLATES ? template : 'template-1'
}