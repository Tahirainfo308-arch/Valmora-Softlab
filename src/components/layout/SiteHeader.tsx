import { useState } from 'react'
import { Menu, PhoneCall, X } from 'lucide-react'
import type { CompanyInfo } from '../../types'
import { cn, toTelHref } from '../../lib/utils'
import { Container } from '../ui/Container'

export interface NavLink {
  label: string
  href: string
}

interface SiteHeaderProps {
  company: CompanyInfo
  links: NavLink[]
  variant?: 'light' | 'dark'
  sticky?: boolean
}

export function Logo({ company, dark = false }: { company: CompanyInfo; dark?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label={`${company.name} — home`}>
      {company.logo_url ? (
        <img
          src={company.logo_url}
          alt=""
          className="h-10 w-auto object-contain"
        />
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
          'font-display text-xl font-bold tracking-tight',
          dark ? 'text-white' : 'text-ink-950',
        )}
      >
        {company.name}
      </span>
    </a>
  )
}

export function SiteHeader({
  company,
  links,
  variant = 'light',
  sticky = true,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const dark = variant === 'dark'

  return (
    <header
      className={cn(
        'relative z-40 border-b',
        sticky && 'sticky top-0',
        dark
          ? 'border-ink-800 bg-ink-950 text-white'
          : 'border-roof-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85',
      )}
    >
      <Container className="flex items-center justify-between gap-4 py-3.5">
        <Logo company={company} dark={dark} />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'nav-link',
                dark && 'text-ink-200 hover:text-brand-400',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={toTelHref(company.phone)}
            className={cn('nav-link hidden items-center gap-1.5 sm:inline-flex', dark && 'text-ink-200 hover:text-brand-400')}
          >
            <PhoneCall size={15} aria-hidden="true" />
            Call {company.city_state}
          </a>
          <a href={toTelHref(company.phone)} className="btn btn-call btn-sm hidden md:inline-flex">
            <PhoneCall size={15} aria-hidden="true" />
            {company.phone}
          </a>
          <button
            type="button"
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-md border lg:hidden',
              dark
                ? 'border-ink-700 bg-ink-900 text-white'
                : 'border-roof-200 bg-white text-ink-900',
            )}
            aria-expanded={open}
            aria-controls="site-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      {open && (
        <nav
          id="site-navigation"
          aria-label="Mobile"
          className={cn(
            'border-t lg:hidden',
            dark ? 'border-ink-800 bg-ink-950' : 'border-roof-200 bg-white',
          )}
        >
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2.5 text-base font-semibold',
                  dark
                    ? 'text-ink-100 hover:bg-ink-900'
                    : 'text-ink-800 hover:bg-roof-100',
                )}
              >
                {link.label}
              </a>
            ))}
            <a
              href={toTelHref(company.phone)}
              className="btn btn-call btn-md mt-3 w-full"
            >
              <PhoneCall size={16} aria-hidden="true" />
              Call {company.phone}
            </a>
          </Container>
        </nav>
      )}
    </header>
  )
}