import { createElement } from 'react'
import { TriangleAlert, ArrowRight } from 'lucide-react'
import type { CompanyConfig, Service } from '../../types'
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
import { ReviewCard } from '../../components/ui/ReviewCard'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { getIcon } from '../../lib/iconMap'

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Why Us', href: '#why' },
  { label: 'Contact', href: '#contact' },
]

export function ModernTemplate({ config }: { config: CompanyConfig }) {
  const {
    company,
    hero,
    ratings,
    services,
    reviews,
    projects,
    trust,
    stats,
    emergency,
    final_cta,
    cta,
    quote_form,
  } = config

  return (
    <div className="bg-roof-50 pb-24 lg:pb-0" id="top">
      <EmergencyBanner emergency={emergency} fallbackPhone={company.phone} />
      <SiteHeader company={company} links={navLinks} variant="dark" />

      <main>
        {/* ---------- Hero (dark, bold) ---------- */}
        <section className="relative overflow-hidden bg-ink-950 text-white">
          {hero.image && (
            <img
              src={hero.image}
              alt=""
              aria-hidden="true"
              decoding="async"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.18]"
            />
          )}
          <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              {hero.eyebrow && (
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-400">
                  {hero.eyebrow}
                </p>
              )}
              <h1 className="font-display text-hero font-extrabold uppercase leading-[1.02] tracking-tight text-white">
                {hero.headline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
                {hero.subheadline}
              </p>
              <p className="mt-4 text-sm font-semibold text-ink-400">
                {company.city_state}
                {emergency.enabled ? ' · 24/7 Emergency Response' : ''}
                {` · ${services.length} services`}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#quote" variant="primary" size="lg" full>
                  {hero.primary_cta}
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
                <PhoneCTA
                  phone={company.phone}
                  label={hero.secondary_cta}
                  variant="on-dark"
                  size="lg"
                  full
                />
              </div>

              <ul className="mt-10 flex flex-wrap gap-2.5">
                {stats.slice(0, 4).map((stat) => (
                  <li
                    key={stat.id}
                    className="inline-flex flex-col rounded-lg border border-ink-800 bg-ink-900/80 px-4 py-2"
                  >
                    <span className="font-display text-xl font-bold text-brand-400">
                      {stat.value}
                    </span>
                    <span className="text-xs text-ink-400">{stat.label}</span>
                  </li>
                ))}
              </ul>

              {trust.badges.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {trust.badges.slice(0, 3).map((badge) => (
                    <TrustBadge key={badge.id} badge={badge} variant="dark" />
                  ))}
                </div>
              )}

              {emergency.enabled && (
                <div className="mt-8 flex flex-wrap items-center gap-3 rounded-card border border-ink-800 bg-ink-900/80 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600/20 text-brand-400">
                    <TriangleAlert size={18} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white">{emergency.title}</p>
                    <p className="text-xs text-ink-400">{emergency.description}</p>
                  </div>
                  <PhoneCTA
                    phone={emergency.phone ?? company.phone}
                    label="Call Now"
                    variant="on-dark"
                    size="sm"
                  />
                </div>
              )}
            </div>

            <div id="quote" className="scroll-mt-28">
              <QuoteForm
                company={company}
                emergency={emergency}
                responseTime={company.response_time}
                title={quote_form?.title}
                subtitle={quote_form?.subtitle}
                buttonLabel={quote_form?.button_label}
                trustNote={quote_form?.trust_note}
              />
            </div>
          </Container>
        </section>

        {/* ---------- Interactive services grid ---------- */}
        <section id="services" className="section scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow="What we do"
              title={`Built for Whatever ${company.state} Throws At It`}
              description={`${services.length} specialized services. One reliable crew. Hover any tile to see what we handle.`}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <article
                  key={service.id}
                  className="group overflow-hidden rounded-card border border-roof-200 bg-white shadow-card transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-1 hover:border-brand-600 hover:shadow-card-hover"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.alt ?? service.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />
                    <span className="absolute left-4 top-3 font-display text-4xl font-extrabold text-white/90 transition-colors duration-200 group-hover:text-brand-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {service.badge && (
                      <span className="absolute right-4 top-4 rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <ServiceCardInner service={service} />
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- Stats band ---------- */}
        <section className="bg-white py-12">
          <Container className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <p className="font-display text-4xl font-extrabold tracking-tight text-ink-950 md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-ink-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </Container>
          {trust.badges.length > 0 && (
            <Container className="mt-12 flex flex-wrap items-center justify-center gap-3 border-t border-roof-200 pt-8">
              {trust.badges.map((badge) => (
                <TrustBadge key={badge.id} badge={badge} variant="pill" />
              ))}
            </Container>
          )}
        </section>

        {/* ---------- Projects (bold grid) ---------- */}
        <section id="projects" className="section scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow="Selected work"
              title="Work That Speaks for Itself"
              description={`A few recent projects across the ${company.city} area.`}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  className={
                    index === 0
                      ? 'group relative overflow-hidden rounded-card sm:col-span-2'
                      : 'group relative overflow-hidden rounded-card'
                  }
                >
                  <div className="overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.alt ?? project.title}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-400">
                      {project.type ?? 'Roofing'}
                    </p>
                    <h3 className="heading-4 mt-1 text-xl text-white">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-200">
                      {project.location}
                      {project.year ? ` · ${project.year}` : ''}
                    </p>
                    {project.result && (
                      <p className="mt-2 text-sm font-semibold text-brand-400">
                        {project.result}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- Reviews (dark) ---------- */}
        <section id="reviews" className="scroll-mt-24 bg-ink-950 py-section-sm text-white md:py-section">
          <Container>
            <div className="mb-12 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-400">
                  What homeowners say
                </p>
                <h2 className="heading-2 mt-3 text-white">
                  {ratings.google_rating} Out of 5 — and Counting
                </h2>
                <p className="mt-3 max-w-lg text-ink-300">
                  Every roof comes with a promise behind it. Here's how recent
                  customers rate the experience.
                </p>
              </div>
              <div className="flex items-center gap-4 rounded-card border border-ink-800 bg-ink-900 px-6 py-5">
                <span className="font-display text-6xl font-extrabold text-brand-400">
                  {ratings.google_rating}
                </span>
                <div>
                  <RatingStars rating={ratings.google_rating} size={18} />
                  <p className="mt-1 text-sm font-semibold text-ink-200">
                    {ratings.review_count} Google reviews
                  </p>
                  {ratings.review_url && (
                    <a
                      href={ratings.review_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-brand-400 hover:text-brand-300"
                    >
                      See all reviews →
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} dark />
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- Why choose us ---------- */}
        <section id="why" className="section scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow={`Why ${company.city} chooses us`}
              title="Built Different, Backed Better"
              description={`${company.name} pairs ${
                trust.warranty ? 'warranty-backed workmanship' : 'top-tier workmanship'
              } with ${emergency.enabled ? 'round-the-clock storm response' : 'year-round support'}.`}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trust.badges.map((badge) => (
                <TrustBadge key={badge.id} badge={badge} variant="card" />
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- Final CTA (orange band) ---------- */}
        <section id="contact" className="scroll-mt-24 bg-brand-700 py-section-sm text-white md:py-section">
          <Container narrow className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">
              {company.city_state} · {emergency.enabled ? '24/7 Emergency Response' : 'Call Us Today'}
            </p>
            <h2 className="heading-1 mt-3 text-white">{final_cta.heading}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/90">
              {final_cta.description}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <PhoneCTA
                phone={company.phone}
                label={`Call ${company.phone}`}
                variant="on-dark"
                size="lg"
                full
              />
              <a
                href="#quote"
                className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-btn border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-white hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                {final_cta.button_label}
              </a>
            </div>
            {emergency.enabled && (
              <p className="mt-5 text-sm font-semibold text-white/85">
                {emergency.title}: {emergency.phone ?? company.phone}
              </p>
            )}
          </Container>
        </section>
      </main>

      <SiteFooter
        company={company}
        contact={config.contact}
        social={config.social}
        links={navLinks}
        emergency={emergency}
        dark
        licenseLine={
          trust.licensed && trust.license_number
            ? `Licensed & insured · ${company.state} License #${trust.license_number}`
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

interface ServiceCardInnerProps {
  service: Service
}

function ServiceCardInner({ service }: ServiceCardInnerProps) {
  const Icon = getIcon(service.icon)
  return (
    <div className="flex items-start gap-4 p-5 md:p-6">
      <span className="icon-badge">
        {createElement(Icon, { size: 22, 'aria-hidden': true })}
      </span>
      <div className="min-w-0">
        <h3 className="heading-4 text-xl text-ink-950">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          {service.description}
        </p>
      </div>
    </div>
  )
}