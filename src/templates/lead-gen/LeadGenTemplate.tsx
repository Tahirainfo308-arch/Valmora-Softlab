import {
  Award,
  ArrowRight,
  CircleCheck,
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
import { ServiceCard } from '../../components/ui/ServiceCard'
import { ProjectCard } from '../../components/ui/ProjectCard'
import { TestimonialCard } from '../../components/ui/TestimonialCard'
import { toTelHref } from '../../lib/utils'

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
  } = config

  return (
    <div className="bg-roof-50 pb-24 lg:pb-0" id="top">
      {/* ---------- Emergency + contact strips ---------- */}
      <EmergencyBanner emergency={emergency} />
      <div className="border-b border-roof-200 bg-ink-950 text-ink-300">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-0.5 text-[11px] font-medium">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-brand-400" aria-hidden="true" />
            {company.marquee_phrase ?? 'Licensed & Insured'}
            {trust.license_number ? ` · ${company.state}# ${trust.license_number}` : ''}
          </span>
          <span className="hidden items-center gap-5 sm:inline-flex">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} className="text-brand-400" aria-hidden="true" />
              {contact.hours}
            </span>
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-300">
              <Mail size={13} className="text-brand-400" aria-hidden="true" />
              {contact.email}
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
        primaryAction={{ label: 'Get Free Estimate', href: '#quote' }}
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
          <Container className="relative grid items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.22fr)] lg:gap-16 lg:py-6">
            <div>
              {hero.eyebrow && <p className="eyebrow">{hero.eyebrow}</p>}
              <h1 className="heading-hero">{hero.headline}</h1>
              <p className="lead mt-3">{hero.subheadline}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="rating-chip">
                  <GoogleMark />
                  <span className="font-display font-extrabold">{ratings.google_rating}</span>
                  <RatingStars rating={ratings.google_rating} size={14} />
                  <span className="font-medium text-ink-400">
                    · {ratings.review_count} Google reviews
                  </span>
                </span>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button href="#quote" variant="primary" size="lg" full>
                  {hero.primary_cta}
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
                <PhoneCTA
                  phone={company.phone}
                  label={hero.secondary_cta}
                  variant="outline"
                  size="lg"
                  full
                />
              </div>

              {hero.perks && hero.perks.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {hero.perks.map((perk) => (
                    <li key={perk} className="chip">
                      <ShieldCheck size={14} className="text-brand-700" aria-hidden="true" />
                      {perk}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div id="quote" className="scroll-mt-24">
              <QuoteForm
                company={company}
                services={services}
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
            {trust.warranty && (
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
              eyebrow="What we do"
              title="Full-Service Roofing for Homes & Businesses"
              description={`One call handles it all — from free inspections and storm response to complete replacements and gutters, across ${company.city_state}.`}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- After-services CTA ---------- */}
        <section className="py-10">
          <Container>
            <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-roof-200 bg-white px-6 py-7 text-center shadow-soft sm:flex-row sm:gap-8 sm:text-left md:px-10">
              <div>
                <h2 className="heading-3 text-xl">Not sure what your roof needs?</h2>
                <p className="mt-1 text-sm text-ink-600">
                  Free, itemized estimates from licensed {company.city} roofers — usually within
                  24 hours.
                </p>
              </div>
              <Button href="#quote" variant="primary" size="lg" full>
                {hero.primary_cta}
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
              description={`Four reasons thousands of ${company.city}-area families hand us their keys and trust us with their most expensive repair.`}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trust.badges.map((badge) => (
                <TrustBadge key={badge.id} badge={badge} variant="card" />
              ))}
            </div>
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
              eyebrow="Our work"
              title="Recent Roofing Projects"
              description={`Real roofs, real homes, real results across the Greater ${company.city} area.`}
            />
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- After-projects CTA ---------- */}
        <section className="py-10">
          <Container>
            <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-roof-200 bg-white px-6 py-7 text-center shadow-soft sm:flex-row sm:gap-8 sm:text-left md:px-10">
              <div>
                <h2 className="heading-3 text-xl">Wondering what your project would cost?</h2>
                <p className="mt-1 text-sm text-ink-600">
                  Free inspections across {company.city_state} — honest numbers, no pressure.
                </p>
              </div>
              <Button href="#quote" variant="primary" size="lg" full>
                {hero.primary_cta}
              </Button>
            </div>
          </Container>
        </section>

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

        {/* ---------- Warranty & trust ---------- */}
        <section className="section">
          <Container className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Our guarantee</p>
              <h2 className="heading-2">Every {company.name} Roof Comes With a Promise</h2>
              <p className="lead mt-4">{trust.warranty_text}</p>
              <ul className="mt-8 space-y-4">
                {trust.licensed && (
                  <li className="flex items-start gap-3">
                    <CircleCheck size={22} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-ink-900">Licensed &amp; Bonded</p>
                      <p className="text-sm text-ink-600">{company.state} license #{trust.license_number}</p>
                    </div>
                  </li>
                )}
                {trust.insured && (
                  <li className="flex items-start gap-3">
                    <CircleCheck size={22} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-ink-900">Fully Insured</p>
                      <p className="text-sm text-ink-600">
                        General liability &amp; workers compensation on every crew.
                      </p>
                    </div>
                  </li>
                )}
                {trust.warranty && (
                  <li className="flex items-start gap-3">
                    <CircleCheck size={22} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-ink-900">Workmanship Warranty</p>
                      <p className="text-sm text-ink-600">{trust.warranty_text}</p>
                    </div>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <CircleCheck size={22} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-ink-900">Free, Itemized Estimates</p>
                    <p className="text-sm text-ink-600">
                      Written quotes before any work begins — no surprises, ever.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PhoneCTA
                  phone={company.phone}
                  label="Call for a Free Inspection"
                  variant="primary"
                  size="lg"
                />
                <Button href="#quote" variant="outline" size="lg">
                  Book Online Estimate
                </Button>
              </div>
            </div>

            <div className="card overflow-hidden p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white">
                <ShieldCheck size={26} aria-hidden="true" />
              </span>
              <h3 className="heading-3 mt-5">Backed for a Lifetime</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {trust.warranty_text} Every install is documented with photos,
                signed off by a {company.state}-licensed foreman, and registered
                with the manufacturer so the coverage stays with the roof — not
                the owner.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-roof-200 pt-6">
                {stats.map((stat) => (
                  <div key={stat.id} className="text-center">
                    <p className="font-display text-2xl font-bold text-brand-700">{stat.value}</p>
                    <p className="text-xs font-medium text-ink-500">{stat.label}</p>
                  </div>
                ))}
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

      {/* ---------- Mobile sticky action bar ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-roof-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="grid grid-cols-2 gap-2">
          <PhoneCTA phone={company.phone} label="Call Now" size="md" full />
          <Button href="#quote" variant="primary" size="md" full>
            Get a Quote
          </Button>
        </div>
      </div>
    </div>
  )
}