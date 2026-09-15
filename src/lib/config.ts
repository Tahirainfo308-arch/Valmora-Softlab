import rawConfig from '../data/company.config.json'
import type { CompanyConfig } from '../types'

/**
 * Per-site business data. Swap the JSON import to generate a
 * different customer's demo site — no UI code changes needed.
 */
const config = rawConfig as CompanyConfig

export function getCompanyConfig(): CompanyConfig {
  return config
}