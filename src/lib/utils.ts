import type { CompanyInfo } from '../types'

/** Join class names conditionally. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/** Strip non-digit characters for a tel: link. */
export function toTelHref(phone: string) {
  return `tel:+1${phone.replace(/\D/g, '')}`
}

/**
 * Replace {{name}} / {{city}} / {{state}} / {{city_state}} placeholders in
 * config copy with the live company values. Lets an AI pipeline emit
 * template strings ("Roofing You Can Count On in {{city_state}}") that render
 * with real data.
 */
export function fillTokens(input: string, company: CompanyInfo) {
  return input
    .replace(/\{\{\s*name\s*\}\}/g, company.name)
    .replace(/\{\{\s*city_state\s*\}\}/g, company.city_state)
    .replace(/\{\{\s*city\s*\}\}/g, company.city)
    .replace(/\{\{\s*state\s*\}\}/g, company.state)
}