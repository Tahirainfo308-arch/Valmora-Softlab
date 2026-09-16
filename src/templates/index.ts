import type { ComponentType } from 'react'
import type { CompanyConfig } from '../types'
import { LeadGenTemplate } from './lead-gen/LeadGenTemplate'
import { TrustTemplate } from './trust/TrustTemplate'
import { ModernTemplate } from './modern/ModernTemplate'

export type TemplateKey = 'lead-gen' | 'trust' | 'modern'

export type SiteTemplateProps = { config: CompanyConfig }

export const TEMPLATES: Record<TemplateKey, ComponentType<SiteTemplateProps>> = {
  'lead-gen': LeadGenTemplate,
  'trust': TrustTemplate,
  'modern': ModernTemplate,
}

export const TEMPLATE_OPTIONS: Array<{ key: TemplateKey; label: string }> = [
  { key: 'lead-gen', label: 'Lead Gen' },
  { key: 'trust', label: 'Trust & Reviews' },
  { key: 'modern', label: 'Modern Bold' },
]

export function isTemplateKey(value: string | null): value is TemplateKey {
  return value !== null && value in TEMPLATES
}