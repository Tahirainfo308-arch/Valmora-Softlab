/** Join class names conditionally. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/** Strip non-digit characters for a tel: link. */
export function toTelHref(phone: string) {
  return `tel:+1${phone.replace(/\D/g, '')}`
}