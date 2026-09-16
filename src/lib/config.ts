import type { CompanyConfig } from '../types'
import summitRaw from '../data/company.config.json'
import lonestarRaw from '../data/lonestar.config.json'

export type ConfigId = 'summit' | 'lonestar'

export const DEFAULT_CONFIG_ID: ConfigId = 'summit'

interface ConfigOption {
  id: ConfigId
  label: string
  location: string
}

export const CONFIG_OPTIONS: ConfigOption[] = [
  { id: 'summit', label: 'Summit Roofing Co.', location: 'Houston, TX' },
  { id: 'lonestar', label: 'Lone Star Roofing & Restoration', location: 'Dallas, TX' },
]

const CONFIGS: Record<ConfigId, CompanyConfig> = {
  summit: summitRaw as CompanyConfig,
  lonestar: lonestarRaw as CompanyConfig,
}

export function isConfigId(value: string | null): value is ConfigId {
  return value !== null && value in CONFIGS
}

export function readConfigIdFromUrl(): ConfigId {
  const value = new URLSearchParams(window.location.search).get('config')
  return isConfigId(value) ? value : DEFAULT_CONFIG_ID
}

export function getCompanyConfig(): CompanyConfig {
  return CONFIGS[readConfigIdFromUrl()]
}

export function getCompanyConfigById(id: ConfigId): CompanyConfig {
  return CONFIGS[id]
}