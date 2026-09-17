import type { CompanyInfo } from '../../types'
import { cn } from '../../lib/utils'

interface LogoProps {
  company: CompanyInfo
  dark?: boolean
  className?: string
}

export function Logo({ company, dark = false, className }: LogoProps) {
  return (
    <a
      href="#top"
      className={cn('flex shrink-0 items-center gap-2.5', className)}
      aria-label={`${company.name} — home`}
    >
      {company.logo_url ? (
        <img src={company.logo_url} alt="" className="h-10 w-auto object-contain" />
      ) : (
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-700 font-display text-sm font-bold text-white">
          {company.name
            .split(' ')
            .slice(0, 2)
            .map((word) => word[0])
            .join('')}
        </span>
      )}
      <span
        className={cn(
          'whitespace-nowrap font-display text-xl font-bold tracking-tight',
          dark ? 'text-white' : 'text-ink-950',
        )}
      >
        {company.name}
      </span>
    </a>
  )
}