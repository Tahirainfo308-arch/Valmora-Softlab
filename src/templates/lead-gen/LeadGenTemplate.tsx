import {
  Award,
  ArrowRight,
  BadgeCheck,
  Clock,
  Mail,
  PhoneCall,
  ShieldCheck,
} from 'lucide-react'
import type { CompanyConfig } from '../../types'
import { EmergencyBanner } from '../../components/layout/EmergencyBanner'
import { SiteHeader } from '../../components/layout/SiteHeader'
import type { NavLink } from '../../components/layout/SiteHeader'
import { SiteFooter } from '../../components/layout/SiteFooter'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { PhoneCTA } from '../../components/ui/PhoneCTA'
import { TrustBadge } from '../../components/ui/TrustBadge'
import { QuoteForm } from '../../components/ui/QuoteForm'
import { RatingStars } from '../../components/ui/RatingStars'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ServiceCardPremium } from '../../components/ui/ServiceCardPremium'
import { ShowcaseGallery } from '../../components/ui/ShowcaseGallery'
import { TrustSection } from '../../components/ui/TrustSection'
import { TestimonialCard } from '../../components/ui/TestimonialCard'
import { toTelHref, fillTokens } from '../../lib/utils'

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why' },
  { label: 'Our Work', href: '#projects' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#quote' },
]

function GoogleMark({ size = 14, className = '' }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`font-display font-extrabold leading-none ${className}`}
      style={{ fontSize: size }}
    >
      G
    </span>
  )
}

export function LeadGenTemplate({ config }: { config: CompanyConfig }) {
  const {
    company,
    hero,
    ratings,
    services,
    testimonials,
    projects,
    trust,
    stats,
    contact,
    emergency,
    final_cta,
    financing,
    cta,
    quote_form,
    sections,
  } = config

  const showWarranty = trust.warranty

  // Interpolate {{city}} / {{state}} / {{city_state}} / {{name}} tokens in config copy.
  const txt = (value?: string) => (value ? fillTokens(value, company) : undefined)

  return (
    <div className="bg-roof-50 pb-24 lg:pb-0" id="top">
      {/* ---------- Emergency + contact strips ---------- */}
      <EmergencyBanner emergency={emergency} fallbackPhone={company.phone} />
      <div className="border-b border-roof-200 bg-ink-950 text-ink-300">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-0.5 text-[11px] font-medium">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-brand-400" aria-hidden="true" />
            {company.marquee_phrase ??
              (trust.licensed && trust.insured ? 'Licensed & Insured' : null)}
            {trust.licensed && trust.license_number
              ? ` · ${company.state}# ${trust.license_number}`
              : ''}
          </span>
          <span className="hidden items-center gap-5 sm:inline-flex">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} className="text-brand-400" aria-hidden="true" />
              {contact.hours}
            </span>
            <a href={`mailto:${contact.email ?? company.email}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-300">
              <Mail size={13} className="text-brand-400" aria-hidden="true" />
              {contact.email ?? company.email}
            </a>
            <a
              href={toTelHref(company.phone)}
              className="inline-flex items-center gap-1.5 font-bold text-white transition-colors hover:text-brand-300"
            >
              <PhoneCall size={13} className="text-brand-400" aria-hidden="true" />
              {company.phone}
            </a>
          </span>
        </Container>
      </div>

      <SiteHeader
        company={company}
        links={navLinks}
        variant="light"
        primaryAction={{ label: cta?.header ?? hero.primary_cta, href: '#quote' }}
      />

      <main>
        {/* ---------- Hero: 45% content / 55% quote form — full form above the fold ---------- */}
        <section className="relative overflow-hidden">
          {hero.image && (
            <img
              src={hero.image}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.07] mix-blend-multiply"
            />
          )}
          {/* Soft background depth — no hard gradients */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand-100/80 blur-3xl" />
            <div className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-roof-200/80 blur-3xl" />
          </div>
          <Container className="relative grid items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.22fr)] lg:gap-16 lg:py-6">
            <div>
              {hero.eyebrow && <p className="eyebrow">{txt(hero.eyebrow)}</p>}
              <h1 className="heading-1">{txt(hero.headline)}</h1>
              <p className="lead mt-3">{txt(hero.subheadline)}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="rating-chip">
                  <GoogleMark />
                  <span className="font-display font-extrabold">{ratings.google_rating}</span>
                  <RatingStars rating={ratings.google_rating} size={14} />
                  <span className="font-medium text-ink-400">
                    · {ratings.review_count} Google reviews
                  </span>
                </span>
                {ratings.review_url && (
                  <a
                    href={ratings.review_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-inline text-sm"
                  >
                    Read reviews
                  </a>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button href="#quote" variant="primary" size="lg" full>
                  {txt(hero.primary_cta)}
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
                <PhoneCTA
                  phone={company.phone}
                  label={txt(hero.secondary_cta)}
                  variant="outline"
                  size="lg"
                  full
                />
              </div>

              {/* Trust points */}
              {(trust.licensed || trust.insured || trust.free_estimates === true || trust.warranty) && (
                <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5">
                  {trust.licensed && trust.insured && (
                    <li className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-700">
                      <ShieldCheck size={15} className="text-brand-700" aria-hidden="true" />
                      Licensed &amp; Insured
                    </li>
                  )}
                  {trust.free_estimates === true && (
                    <li className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-700">
                      <BadgeCheck size={15} className="text-brand-700" aria-hidden="true" />
                      Free Estimates
                    </li>
                  )}
                  {trust.warranty && (
                    <li className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-700">
                      <Award size={15} className="text-brand-700" aria-hidden="true" />
                      Warranty
                    </li>
                  )}
                </ul>
              )}

              {hero.perks && hero.perks.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2.5">
                  {hero.perks.map((perk) => (
                    <li key={perk} className="chip">
                      <ShieldCheck size={14} className="text-brand-700" aria-hidden="true" />
                      {perk}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div id="quote" className="relative scroll-mt-24">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 -right-4 h-40 w-40 rounded-full bg-brand-200/50 blur-2xl"
              />
              {trust.licensed && trust.insured && (
                <div className="absolute -top-4 right-4 z-10 rounded-full border border-roof-200 bg-white px-3.5 py-1.5 shadow-card">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-900">
                    <ShieldCheck size={14} className="text-brand-700" aria-hidden="true" />
                    Licensed &amp; Insured
                  </span>
                </div>
              )}
              <QuoteForm
                company={company}
                emergency={emergency}
                responseTime={company.response_time}
                title={quote_form?.title}
                subtitle={quote_form?.subtitle}
                buttonLabel={quote_form?.button_label}
                trustNote={quote_form?.trust_note}
                compact
                className="shadow-card-hover ring-1 ring-ink-950/5"
              />
            </div>
          </Container>
        </section>

        {/* ---------- Trust indicators strip ---------- */}
        <section className="border-y border-roof-200 bg-white">
          <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-roof-200 bg-roof-50 px-4 py-2 text-sm font-semibold text-ink-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <GoogleMark size={12} />
              </span>
              {ratings.google_rating}
              <RatingStars rating={ratings.google_rating} size={14} />
              <span className="font-medium text-ink-500">{ratings.review_count} reviews</span>
            </span>
            {trust.licensed && trust.insured && (
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-800">
                <ShieldCheck size={17} className="text-brand-700" aria-hidden="true" />
                Licensed &amp; Insured
              </span>
            )}
            {showWarranty && (
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-800">
                <Award size={17} className="text-brand-700" aria-hidden="true" />
                Warranty-Backed
              </span>
            )}
            {company.years_in_business && (
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-800">
                <Clock size={17} className="text-brand-700" aria-hidden="true" />
                {company.years_in_business}+ Years in Business
              </span>
            )}
          </Container>
        </section>

        {/* ---------- Services ---------- */}
        <section id="services" className="section scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow={txt(sections?.services_eyebrow) ?? 'What we do'}
              title={txt(sections?.services_title) ?? 'Roofing Services Built Around Your Home'}
              description={txt(sections?.services_subtitle)}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCardPremium key={service.id} service={service} index={index} />
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- After-services CTA ---------- */}
        <section className="py-10">
          <Container>
            <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-roof-200 bg-white px-6 py-7 text-center shadow-soft sm:flex-row sm:gap-8 sm:text-left md:px-10">
              <div>
                <h2 className="heading-3 text-xl">Not sure what you need?</h2>
                <p className="mt-1 text-sm text-ink-600">
                  {trust.free_estimates === true ? 'Free, ' : ''}honest{' '}
                  {trust.licensed ? 'licensed ' : ''}
                  {company.city} roofers will walk your roof with you
                  {company.response_time ? ` — usually ${company.response_time}` : ''}.
                </p>
              </div>
              <Button href="#quote" variant="primary" size="lg" full>
                {trust.free_estimates === true ? 'Get a Free Inspection' : 'Get an Inspection'}
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </Container>
        </section>

        {/* ---------- Why choose us ---------- */}
        <section id="why" className="section section-alt scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow={`Why ${company.city} homeowners choose us`}
              title="The Roofing Company Neighbors Recommend"
              description={`Four reasons ${company.city}-area homeowners trust us with their most important repair.`}
            />
            {trust.badges.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {trust.badges.map((badge) => (
                  <TrustBadge key={badge.id} badge={badge} variant="card" />
                ))}
              </div>
            )}
            <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="text-center">
                  <p className="font-display text-4xl font-extrabold tracking-tight text-ink-950">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-medium uppercase tracking-wider text-ink-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- Project showcase ---------- */}
        <section id="projects" className="section scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow={txt(sections?.projects_eyebrow) ?? 'Our work'}
              title={txt(sections?.projects_title) ?? 'Recent Roofing Projects'}
              description={txt(sections?.projects_subtitle)}
            />
            <ShowcaseGallery projects={projects} />

            {/* After-showcase CTA */}
            <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-panel bg-ink-950 px-6 py-10 text-center text-white shadow-card sm:flex-row sm:gap-10 sm:text-left md:px-12">
              <div>
                <h3 className="heading-3 text-2xl text-white">Have a roofing project in mind?</h3>
                <p className="mt-2 max-w-md text-sm text-ink-300">
                  Tell us what you're planning and we'll send you a{' '}
                  {trust.free_estimates === true ? 'free ' : ''}written estimate
                  {company.response_time ? ` — usually ${company.response_time}` : ''}.
                </p>
              </div>
              <Button href="#quote" variant="on-dark" size="lg" full>
                {trust.free_estimates === true ? 'Get Your Free Estimate' : 'Get Your Estimate'}
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </div>
          </Container>
        </section>

        {/* ---------- Trust system ---------- */}
        <TrustSection
          ratings={ratings}
          trust={trust}
          company={company}
          financing={financing}
          cta={cta}
          heading={{
            eyebrow: txt(sections?.trust_eyebrow),
            title: txt(sections?.trust_title),
            subtitle: txt(sections?.trust_subtitle),
          }}
        />

        {/* ---------- Testimonials ---------- */}
        <section id="reviews" className="section section-alt scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow="Customer stories"
              title={`Hear It From ${company.city} Homeowners`}
              description={`Real reviews from homeowners across the ${company.city} metro — no cherry-picking, no scripts.`}
            />
            <div className="mx-auto mb-10 flex max-w-xl flex-wrap items-center justify-center gap-4 rounded-card border border-roof-200 bg-white px-6 py-5 shadow-card">
              <span className="font-display text-5xl font-bold text-ink-950">
                {ratings.google_rating}
              </span>
              <div>
                <RatingStars rating={ratings.google_rating} size={18} />
                <p className="mt-1 text-sm font-semibold text-ink-900">
                  {ratings.review_count} verified Google reviews
                </p>
              </div>
              {ratings.review_url && (
                <a
                  href={ratings.review_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-inline text-sm"
                >
                  View on Google
                </a>
              )}
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- Final CTA ---------- */}
        <section className="cta-band">
          <Container narrow>
            <h2 className="heading-2 text-white">{final_cta.heading}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-100">
              {final_cta.description}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="#quote" variant="primary" size="lg" full>
                {final_cta.button_label}
              </Button>
              <PhoneCTA
                phone={company.phone}
                label={`Call ${company.phone}`}
                variant="on-dark"
                size="lg"
                full
              />
            </div>
            {emergency.enabled && (
              <p className="mt-6 text-sm text-ink-300">
                {emergency.title}: {emergency.phone ?? company.phone}
              </p>
            )}
          </Container>
        </section>
      </main>

      <SiteFooter
        company={company}
        contact={contact}
        social={config.social}
        links={navLinks}
        emergency={emergency}
        licenseLine={
          trust.licensed && trust.insured
            ? `Licensed & insured · ${company.name} serves ${company.city_state} and surrounding areas.`
            : undefined
        }
      />

      {/* ---------- Mobile sticky action bar ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-roof-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="grid grid-cols-2 gap-2">
          <PhoneCTA phone={company.phone} label={cta?.mobile_call ?? 'Call Now'} size="md" full />
          <Button href="#quote" variant="primary" size="md" full>
            {cta?.mobile_quote ?? 'Get a Quote'}
          </Button>
        </div>
      </div>
    </div>
  )
}