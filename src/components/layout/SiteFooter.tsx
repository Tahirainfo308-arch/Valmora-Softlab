import { Clock, ExternalLink, Mail, MapPin, PhoneCall } from 'lucide-react'
import type { CompanyInfo, ContactInfo, SocialChannels } from '../../types'
import { cn, toTelHref } from '../../lib/utils'
import { Container } from '../ui/Container'
import { Logo } from './SiteHeader'
import type { NavLink } from './SiteHeader'

interface SiteFooterProps {
  company: CompanyInfo
  contact: ContactInfo
  social: SocialChannels
  links: NavLink[]
  dark?: boolean
  licenseLine?: string
}

const socialChannels: Array<{
  key: keyof SocialChannels
  label: string
}> = [
  { key: 'facebook', label: 'Facebook' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'google', label: 'Google' },
]

export function SiteFooter({
  company,
  contact,
  social,
  links,
  dark = false,
  licenseLine,
}: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'border-t',
        dark ? 'border-ink-800 bg-ink-950 text-ink-200' : 'border-roof-200 bg-white text-ink-600',
      )}
    >
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
        <div>
          <Logo company={company} dark={dark} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            {company.marquee_phrase
              ? company.marquee_phrase
              : `${company.name} — serving ${company.city_state} and surrounding areas.`}
          </p>
          {company.years_in_business && (
            <p className="mt-3 text-sm font-semibold text-brand-700">
              Proudly serving {company.city_state} for {company.years_in_business} years.
            </p>
          )}
          {licenseLine && (
            <p className="mt-2 text-xs text-ink-400">{licenseLine}</p>
          )}
        </div>

        <nav aria-label="Footer">
          <h3 className="heading-4 text-ink-900">Quick Links</h3>
          <ul className="mt-4 space-y-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors',
                    dark
                      ? 'text-ink-300 hover:text-brand-400'
                      : 'text-ink-600 hover:text-brand-700',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="heading-4 text-ink-900">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={toTelHref(contact.phone)}
                className="flex items-start gap-2.5 transition-colors hover:text-brand-700"
              >
                <PhoneCall size={16} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-start gap-2.5 transition-colors hover:text-brand-700"
              >
                <Mail size={16} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
              {contact.address}
            </li>
            <li className="flex items-start gap-2.5">
              <Clock size={16} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
              {contact.hours}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="heading-4 text-ink-900">Follow Us</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {socialChannels.map((channel) => {
              const url = social[channel.key]
              if (!url) return null
              return (
                <li key={channel.key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors',
                      dark
                        ? 'border-ink-700 text-ink-200 hover:border-brand-500 hover:text-brand-400'
                        : 'border-roof-200 text-ink-700 hover:border-brand-500 hover:text-brand-700',
                    )}
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                    {channel.label}
                  </a>
                </li>
              )
            })}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-ink-400">
            Hours: {contact.hours}. Emergency response available 24/7.
          </p>
        </div>
      </Container>

      <div
        className={cn(
          'border-t',
          dark ? 'border-ink-800' : 'border-roof-200',
        )}
      >
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-400 sm:flex-row">
          <p>
            © {year} {company.name} · {company.city_state}. All rights reserved.
          </p>
          <p>Velmora demo website · Not a live business site</p>
        </Container>
      </div>
    </footer>
  )
}