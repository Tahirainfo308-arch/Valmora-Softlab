import { useState } from 'react'
import { Menu, PhoneCall, X } from 'lucide-react'
import type { CompanyInfo } from '../../types'
import { cn, toTelHref } from '../../lib/utils'
import { Container } from '../ui/Container'

import { Logo } from '../ui/Logo'
import { PhoneCTA } from '../ui/PhoneCTA'
import { Button } from '../ui/Button'

export interface NavLink {
  label: string
  href: string
}

interface SiteHeaderProps {
  company: CompanyInfo
  links: NavLink[]
  variant?: 'light' | 'dark'
  sticky?: boolean
  /** Optional primary action (e.g. "Get Free Estimate") shown next to the call button. */
  primaryAction?: { label: string; href: string }
}

export function SiteHeader({
  company,
  links,
  variant = 'light',
  sticky = true,
  primaryAction,
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
      <Container className="flex items-center justify-between gap-3 py-3.5 xl:gap-4">
        <Logo company={company} dark={dark} />

        <nav className="hidden items-center gap-5 whitespace-nowrap xl:flex xl:gap-6" aria-label="Primary">
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
            className={cn('nav-link hidden shrink-0 items-center gap-1.5 xl:inline-flex', dark && 'text-ink-200 hover:text-brand-400')}
          >
            <PhoneCall size={15} className={cn(dark ? 'text-brand-400' : 'text-brand-700')} aria-hidden="true" />
            Call {company.city_state}
          </a>
          <PhoneCTA phone={company.phone} size="sm" className="hidden shrink-0 md:inline-flex" />
          {primaryAction && (
            <Button
              href={primaryAction.href}
              size="sm"
              className="hidden shrink-0 whitespace-nowrap lg:inline-flex"
            >
              {primaryAction.label}
            </Button>
          )}
          <button
            type="button"
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-md border xl:hidden',
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
            'border-t xl:hidden',
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
            <PhoneCTA
              phone={company.phone}
              label={`Call ${company.phone}`}
              size="md"
              full
              className="mt-3"
            />
            {primaryAction && (
              <Button
                href={primaryAction.href}
                size="md"
                full
                className="mt-2"
              >
                {primaryAction.label}
              </Button>
            )}
          </Container>
        </nav>
      )}
    </header>
  )
}