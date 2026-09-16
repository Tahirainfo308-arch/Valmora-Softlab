import { Award, ArrowRight, Mail, MapPin, PhoneCall, ShieldCheck } from 'lucide-react'
import type { CompanyConfig } from '../../types'
import { EmergencyBanner } from '../../components/layout/EmergencyBanner'
import { SiteHeader } from '../../components/layout/SiteHeader'
import type { NavLink } from '../../components/layout/SiteHeader'
import { SiteFooter } from '../../components/layout/SiteFooter'
import { Container } from '../../components/ui/Container'
import { QuoteForm } from '../../components/ui/QuoteForm'
import { RatingStars } from '../../components/ui/RatingStars'
import { ReviewCard } from '../../components/ui/ReviewCard'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ServiceCard } from '../../components/ui/ServiceCard'
import { ProjectCard } from '../../components/ui/ProjectCard'
import { getIcon } from '../../lib/iconMap'
import { toTelHref } from '../../lib/utils'

const navLinks: NavLink[] = [
  { label: 'Services', href: '#services' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function LeadGenTemplate({ config }: { config: CompanyConfig }) {
  const {
    company,
    hero,
    ratings,
    services,
    reviews,
    projects,
    trust,
    stats,
    contact,
    emergency,
    final_cta,
  } = config

  return (
    <div className="bg-roof-50" id="top">
      <EmergencyBanner emergency={emergency} />
      <SiteHeader company={company} links={navLinks} variant="light" />

      <main>
        {/* ---------- Hero + quote form ---------- */}
        <section className="relative overflow-hidden">
          {hero.image && (
            <img
              src={hero.image}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.09] mix-blend-multiply"
            />
          )}
          <Container className="relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              {hero.eyebrow && <p className="eyebrow">{hero.eyebrow}</p>}
              <h1 className="heading-hero">{hero.headline}</h1>
              <p className="lead mt-5">{hero.subheadline}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="rating-chip">
                  <RatingStars rating={ratings.google_rating} />
                  <span>{ratings.google_rating}</span>
                  <span className="font-medium text-ink-400">
                    · {ratings.review_count} Google reviews
                  </span>
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#quote"
                  className="btn btn-primary btn-lg btn-full"
                >
                  {hero.primary_cta}
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a
                  href={toTelHref(company.phone)}
                  className="btn btn-outline btn-lg btn-full"
                >
                  <PhoneCall size={18} aria-hidden="true" />
                  {hero.secondary_cta}
                </a>
              </div>

              {hero.perks && hero.perks.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  {hero.perks.map((perk) => (
                    <li key={perk} className="chip">
                      <ShieldCheck size={14} className="text-brand-700" aria-hidden="true" />
                      {perk}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold text-ink-700">
                {trust.licensed && trust.insured && (
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck size={18} className="text-brand-700" aria-hidden="true" />
                    Licensed &amp; Insured
                  </span>
                )}
                {trust.warranty && (
                  <span className="inline-flex items-center gap-2">
                    <Award size={18} className="text-brand-700" aria-hidden="true" />
                    {trust.warranty_text}
                  </span>
                )}
              </div>
            </div>

            <div id="quote" className="scroll-mt-28">
              <QuoteForm company={company} services={services} />
            </div>
          </Container>
        </section>

        {/* ---------- Trust bar ---------- */}
        <section className="border-y border-roof-200 bg-white">
          <Container className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4 md:gap-4">
            {trust.badges.map((badge) => {
              const Icon = getIcon(badge.icon)
              return (
                <div key={badge.id} className="flex items-center gap-3">
                  <span className="icon-badge shrink-0">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{badge.label}</p>
                    {badge.detail && (
                      <p className="text-xs text-ink-500">{badge.detail}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </Container>
        </section>

        {/* ---------- Services ---------- */}
        <section id="services" className="section scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow="What we do"
              title="Full-Service Roofing for Homes & Businesses"
              description="One call handles it all — from free inspections and storm response to complete replacements and gutters."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- Reviews ---------- */}
        <section id="reviews" className="section section-alt scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow="Google reviews"
              title={`Rated ${ratings.google_rating}/5 by Houston homeowners`}
              description={`${ratings.review_count} verified reviews and counting. Here's what recent customers say.`}
            />
            <div className="grid gap-6 md:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            {ratings.review_url && (
              <p className="mt-8 text-center">
                <a
                  href={ratings.review_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-inline"
                >
                  Read all {ratings.review_count} reviews on Google
                  <ArrowRight size={14} className="ml-1 inline" aria-hidden="true" />
                </a>
              </p>
            )}
          </Container>
        </section>

        {/* ---------- Projects ---------- */}
        <section id="projects" className="section scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow="Our work"
              title="Recent Roofing Projects"
              description="Real roofs, real homes, real results across the Greater Houston area."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- Stats band ---------- */}
        <section className="bg-ink-950 py-14 text-white">
          <Container>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="stat-tile">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="section scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow="Contact us"
              title="Talk to a Real Roofer Today"
              description={`${company.name} serves ${company.city} and the surrounding area. Reach out any way you like.`}
            />
            <div className="grid gap-6 md:grid-cols-3">
              <a
                href={toTelHref(contact.phone)}
                className="card card-hover p-7 text-center"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <PhoneCall size={22} aria-hidden="true" />
                </span>
                <h3 className="heading-4 mt-4">Call Us</h3>
                <p className="mt-1 text-sm font-semibold text-brand-700">
                  {contact.phone}
                </p>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="card card-hover p-7 text-center"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <Mail size={22} aria-hidden="true" />
                </span>
                <h3 className="heading-4 mt-4">Email Us</h3>
                <p className="mt-1 text-sm font-semibold text-brand-700">
                  {contact.email}
                </p>
              </a>
              <div className="card p-7 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <MapPin size={22} aria-hidden="true" />
                </span>
                <h3 className="heading-4 mt-4">Visit Us</h3>
                <p className="mt-1 text-sm text-ink-600">{contact.address}</p>
                <p className="mt-2 text-xs text-ink-400">{contact.hours}</p>
              </div>
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
              <a href="#quote" className="btn btn-primary btn-lg btn-full">
                {final_cta.button_label}
              </a>
              <a
                href={toTelHref(company.phone)}
                className="btn btn-on-dark btn-lg btn-full"
              >
                <PhoneCall size={18} aria-hidden="true" />
                Call {company.phone}
              </a>
            </div>
            {emergency.enabled && (
              <p className="mt-6 text-sm text-ink-300">
                24/7 emergency response: {emergency.phone}
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
        licenseLine={`Licensed & insured · ${company.name} serves ${company.city_state} and surrounding areas.`}
      />
    </div>
  )
}