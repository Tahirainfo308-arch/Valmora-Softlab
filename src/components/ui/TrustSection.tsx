import { createElement } from 'react'
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  BadgeDollarSign,
  Clock,
  ShieldCheck,
} from 'lucide-react'
import type {
  CompanyInfo,
  CtaLabels,
  FinancingInfo,
  RatingSummary,
  TrustBlock,
} from '../../types'
import { cn } from '../../lib/utils'
import { RatingStars } from './RatingStars'
import { SectionHeading } from './SectionHeading'
import { Container } from './Container'
import { PhoneCTA } from './PhoneCTA'
import { Button } from './Button'

interface TrustSectionProps {
  ratings: RatingSummary
  trust: TrustBlock
  company: CompanyInfo
  financing?: FinancingInfo
  cta?: CtaLabels
  heading?: { eyebrow?: string; title?: string; subtitle?: string }
  className?: string
}

function GoogleGlyph({ size = 16 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="flex items-center justify-center rounded-full bg-white font-display font-extrabold leading-none text-ink-950"
      style={{ width: size, height: size, fontSize: size - 4 }}
    >
      G
    </span>
  )
}

function CredentialTile({
  icon,
  title,
  subtitle,
  className,
}: {
  icon: typeof ShieldCheck
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-4 rounded-card border border-roof-200 bg-white p-5 shadow-soft',
        className,
      )}
    >
      <span className="icon-badge">{createElement(icon, { size: 22, 'aria-hidden': true })}</span>
      <div>
        <p className="font-semibold text-ink-950">{title}</p>
        {subtitle && <p className="mt-0.5 text-sm text-ink-600">{subtitle}</p>}
      </div>
    </div>
  )
}

/**
 * The dedicated trust system. Every credential is conditionally rendered
 * from JSON — nothing is ever invented or implied when data is missing.
 */
export function TrustSection({
  ratings,
  trust,
  company,
  financing,
  cta,
  heading,
  className,
}: TrustSectionProps) {
  const licensedAndInsured = trust.licensed && trust.insured

  return (
    <section className={cn('section section-alt', className)}>
      <Container>
        <SectionHeading
          eyebrow={heading?.eyebrow}
          title={heading?.title ?? 'Why Homeowners Trust Us'}
          description={heading?.subtitle}
        />
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          {/* Strongest indicator first: the Google rating */}
          <div className="flex flex-col gap-5">
            <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-panel bg-ink-950 p-8 text-white shadow-card">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-600/25 blur-3xl"
              />
              <div>
                <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-400">
                  <GoogleGlyph />
                  Google rating
                </p>
                <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
                  <span className="font-display text-7xl font-extrabold leading-none tracking-tight">
                    {ratings.google_rating}
                  </span>
                  <div className="pb-1">
                    <RatingStars rating={ratings.google_rating} size={20} />
                    <p className="mt-2 text-sm text-ink-300">
                      {ratings.review_count} Google reviews
                    </p>
                  </div>
                </div>
              </div>
              {ratings.review_url && (
                <a
                  href={ratings.review_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200"
                >
                  Read verified reviews
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>

            {trust.warranty && (
              <div className="card flex items-start gap-4 p-6">
                <span className="icon-badge">
                  <Award size={22} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-ink-950">Workmanship Warranty</p>
                  <p className="mt-0.5 text-sm text-ink-600">{trust.warranty_text}</p>
                </div>
              </div>
            )}
          </div>

          {/* Credential grid + certifications */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {licensedAndInsured && (
                <CredentialTile
                  icon={ShieldCheck}
                  title="Licensed & Insured"
                  subtitle={
                    trust.license_number
                      ? `${company.state} License #${trust.license_number}`
                      : `${company.name} is fully licensed and insured`
                  }
                />
              )}
              {company.years_in_business && (
                <CredentialTile
                  icon={Clock}
                  title={`${company.years_in_business}+ Years in Business`}
                  subtitle={`Serving ${company.city_state} — experience that shows on every roof`}
                />
              )}
              {trust.free_estimates === true && (
                <CredentialTile
                  icon={BadgeCheck}
                  title="Free, Itemized Estimates"
                  subtitle="Written quotes before any work begins — no surprises, ever"
                />
              )}
              {financing?.enabled && (
                <CredentialTile
                  icon={BadgeDollarSign}
                  title={financing.label ?? 'Financing Available'}
                  subtitle="Flexible payment plans on approved credit"
                />
              )}
            </div>

            {trust.certifications && trust.certifications.length > 0 && (
              <div className="mt-4 rounded-card border border-roof-200 bg-white p-5 shadow-soft">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-500">
                  Manufacturer certifications
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {trust.certifications.map((cert) => (
                    <li key={cert} className="badge badge-brand">
                      <BadgeCheck size={15} className="text-brand-700" aria-hidden="true" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              <PhoneCTA
                phone={company.phone}
                label={cta?.guarantee_call ?? 'Call for a Free Inspection'}
                variant="primary"
                size="lg"
                full
              />
              <Button href="#quote" variant="outline" size="lg" full>
                {cta?.guarantee_book ?? 'Book Online Estimate'}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}