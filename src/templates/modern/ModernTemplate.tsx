import { createElement } from 'react'
import { PhoneCall, TriangleAlert, ArrowRight } from 'lucide-react'
import type { CompanyConfig, Service } from '../../types'
import { EmergencyBanner } from '../../components/layout/EmergencyBanner'
import { SiteHeader } from '../../components/layout/SiteHeader'
import type { NavLink } from '../../components/layout/SiteHeader'
import { SiteFooter } from '../../components/layout/SiteFooter'
import { Container } from '../../components/ui/Container'
import { QuoteForm } from '../../components/ui/QuoteForm'
import { RatingStars } from '../../components/ui/RatingStars'
import { ReviewCard } from '../../components/ui/ReviewCard'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { getIcon } from '../../lib/iconMap'
import { toTelHref } from '../../lib/utils'

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'Reviews', href: '#reviews' },
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
  } = config

  return (
    <div className="bg-roof-50" id="top">
      <EmergencyBanner emergency={emergency} />
      <SiteHeader company={company} links={navLinks} variant="dark" />

      <main>
        {/* ---------- Hero (dark, bold) ---------- */}
        <section className="relative overflow-hidden bg-ink-950 text-white">
          {hero.image && (
            <img
              src={hero.image}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
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

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#quote" className="btn btn-primary btn-lg btn-full">
                  {hero.primary_cta}
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a
                  href={toTelHref(company.phone)}
                  className="btn btn-on-dark btn-lg btn-full"
                >
                  <PhoneCall size={18} aria-hidden="true" />
                  {hero.secondary_cta}
                </a>
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

              {trust.badges && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {trust.badges.slice(0, 3).map((badge) => {
                    const Icon = getIcon(badge.icon)
                    return (
                      <span
                        key={badge.id}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink-800 bg-ink-900/80 px-3 py-1 text-xs font-semibold text-ink-200"
                      >
                        {createElement(Icon, {
                          size: 13,
                          className: 'text-brand-400',
                          'aria-hidden': true,
                        })}
                        {badge.label}
                      </span>
                    )
                  })}
                </div>
              )}

              {emergency.enabled && (
                <a
                  href={toTelHref(emergency.phone)}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand-400 hover:text-brand-300"
                >
                  <TriangleAlert size={16} aria-hidden="true" />
                  {emergency.title} — {emergency.phone}
                </a>
              )}
            </div>

            <div id="quote" className="scroll-mt-28">
              <QuoteForm company={company} services={services} />
            </div>
          </Container>
        </section>

        {/* ---------- Interactive services grid ---------- */}
        <section id="services" className="section scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow="What we do"
              title="Built for Whatever Texas Throws At It"
              description="Six specialized services. One reliable crew. Hover any tile to see what we handle."
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="group relative rounded-card border border-roof-200 bg-white p-6 shadow-card transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-1 hover:border-brand-600 hover:shadow-card-hover md:p-7"
                >
                  {service.badge && (
                    <span className="absolute right-4 top-4 rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white">
                      {service.badge}
                    </span>
                  )}
                  <span className="font-display text-4xl font-extrabold text-roof-200 transition-colors duration-200 group-hover:text-brand-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <ServiceCardInner service={service} />
                </div>
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
        </section>

        {/* ---------- Projects (bold grid) ---------- */}
        <section id="projects" className="section scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow="Selected work"
              title="Work That Speaks for Itself"
              description="A few recent projects across the Houston area."
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
                      alt={project.title}
                      loading="lazy"
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
                <h2 className="heading-2 mt-3 text-white">4.9 Out of 5 — and Counting</h2>
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

        {/* ---------- Final CTA (orange band) ---------- */}
        <section id="contact" className="scroll-mt-24 bg-brand-700 py-section-sm text-white md:py-section">
          <Container narrow className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">
              {company.city_state} · {emergency.enabled ? '17 hr response' : ''}
            </p>
            <h2 className="heading-1 mt-3 text-white">{final_cta.heading}</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/90">
              {final_cta.description}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={toTelHref(company.phone)}
                className="btn btn-on-dark btn-lg btn-full"
              >
                <PhoneCall size={18} aria-hidden="true" />
                Call {company.phone}
              </a>
              <a
                href="#quote"
                className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-btn border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition-colors duration-150 hover:bg-white hover:text-brand-700 sm:w-auto"
              >
                {final_cta.button_label}
              </a>
            </div>
            {emergency.enabled && (
              <p className="mt-5 text-sm font-semibold text-white/85">
                24/7 emergency line: {emergency.phone}
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
        dark
        licenseLine={
          trust.licensed && trust.license_number
            ? `Licensed & insured · TX License #${trust.license_number}`
            : undefined
        }
      />
    </div>
  )
}

interface ServiceCardInnerProps {
  service: Service
}

function ServiceCardInner({ service }: ServiceCardInnerProps) {
  const Icon = getIcon(service.icon)
  return (
    <div className="mt-4 flex items-start gap-4">
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