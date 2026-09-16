import {
  Award,
  BadgeCheck,
  CircleCheck,
  Clock,
  Mail,
  MapPin,
  PhoneCall,
  ShieldCheck,
} from 'lucide-react'
import type { CompanyConfig } from '../../types'
import { EmergencyBanner } from '../../components/layout/EmergencyBanner'
import { SiteHeader } from '../../components/layout/SiteHeader'
import type { NavLink } from '../../components/layout/SiteHeader'
import { SiteFooter } from '../../components/layout/SiteFooter'
import { Container } from '../../components/ui/Container'
import { Button } from '../../components/ui/Button'
import { PhoneCTA } from '../../components/ui/PhoneCTA'
import { TrustBadge } from '../../components/ui/TrustBadge'
import { RatingStars } from '../../components/ui/RatingStars'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { ServiceCard } from '../../components/ui/ServiceCard'
import { TestimonialCard } from '../../components/ui/TestimonialCard'
import { ProjectCard } from '../../components/ui/ProjectCard'
import { toTelHref } from '../../lib/utils'

const navLinks: NavLink[] = [
  { label: 'Why Us', href: '#why' },
  { label: 'Services', href: '#services' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Our Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function TrustTemplate({ config }: { config: CompanyConfig }) {
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
    <div className="bg-roof-50" id="top">
      <EmergencyBanner emergency={emergency} />

      {/* Info strip */}
      <div className="border-b border-roof-200 bg-white">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-2 text-xs font-medium text-ink-600">
          <span>
            {company.marquee_phrase ?? 'Licensed & Insured'}
            {trust.license_number ? ` · License #${trust.license_number}` : ''}
          </span>
          <span>Hours: {contact.hours}</span>
        </Container>
      </div>

      <SiteHeader company={company} links={navLinks} variant="light" />

      <main>
        {/* ---------- Hero ---------- */}
        <section className="section-alt">
          <Container className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2">
            <div>
              {hero.eyebrow && <p className="eyebrow">{hero.eyebrow}</p>}
              <h1 className="heading-1">{hero.headline}</h1>
              <p className="lead mt-5">{hero.subheadline}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="badge">
                  <span className="text-base font-bold text-brand-700">
                    {ratings.google_rating}
                  </span>
                  <RatingStars rating={ratings.google_rating} size={14} />
                  <span className="font-medium text-ink-500">
                    {ratings.review_count} Google reviews
                  </span>
                </span>
                {company.years_in_business && (
                  <span className="badge">
                    <Clock size={15} className="text-brand-700" aria-hidden="true" />
                    {company.years_in_business}+ years experience
                  </span>
                )}
                {trust.warranty && (
                  <span className="badge">
                    <Award size={15} className="text-brand-700" aria-hidden="true" />
                    Warranty-backed
                  </span>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#contact" variant="secondary" size="lg" full>
                  Book a Free Inspection
                </Button>
                <Button href="#projects" variant="outline" size="lg" full>
                  See Our Work
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-card">
                <img
                  src={hero.image ?? projects[0]?.image ?? '/assets/hero-roof.svg'}
                  alt={`${company.name} roofing project`}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-5 -left-4 rounded-card border border-roof-200 bg-white p-4 shadow-card max-sm:hidden">
                <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <BadgeCheck size={18} aria-hidden="true" />
                  </span>
                  {trust.warranty_text}
                </p>
              </div>

              <div className="absolute -top-5 right-4 rounded-card border border-roof-200 bg-white p-4 shadow-card max-sm:hidden">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                  Google rating
                </p>
                <p className="mt-1 flex items-center gap-2">
                  <span className="font-display text-2xl font-bold text-ink-950">
                    {ratings.google_rating}
                  </span>
                  <RatingStars rating={ratings.google_rating} size={14} />
                </p>
                <p className="text-xs text-ink-500">{ratings.review_count} reviews</p>
              </div>
            </div>
          </Container>
        </section>

        {/* ---------- Trust badges ---------- */}
        <section id="why" className="section scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow="Why homeowners choose us"
              title="Trust Is Our Best Commitment"
              description="A roofing company is only as good as the workmanship behind it. Here's what backs every project we take on."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trust.badges.map((badge) => (
                <TrustBadge key={badge.id} badge={badge} variant="card" />
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- Services ---------- */}
        <section id="services" className="section section-alt scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow="What we handle"
              title="Certified Work, Every Roof Type"
              description={`From architectural shingles to standing-seam metal, one factory-trained crew handles it all across ${company.city_state}.`}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- Testimonials / reviews ---------- */}
        <section id="reviews" className="section section-alt scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow="Customer stories"
              title="Don't Take Our Word for It"
              description={`Real feedback from homeowners across the ${company.city} metro.`}
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

        {/* ---------- Before / After projects ---------- */}
        <section id="projects" className="section scroll-mt-24">
          <Container>
            <SectionHeading
              eyebrow="Before & after"
              title="Real Results You Can See"
              description="Drag the slider to compare each roof before and after our crews finished the job."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  showBeforeAfter
                />
              ))}
            </div>
          </Container>
        </section>

        {/* ---------- Stats ---------- */}
        <section className="section bg-roof-100">
          <Container className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center gap-0.5 text-center">
                <span className="font-display text-4xl font-bold text-brand-700">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-ink-600">{stat.label}</span>
              </div>
            ))}
          </Container>
        </section>

        {/* ---------- Guarantees ---------- */}
        <section className="section">
          <Container className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Our guarantee</p>
              <h2 className="heading-2">Every Roof Backed by Our Promise</h2>
              <p className="lead mt-4">{trust.warranty_text}</p>
              <ul className="mt-8 space-y-4">
                {trust.licensed && (
                  <li className="flex items-start gap-3">
                    <CircleCheck size={22} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-ink-900">Licensed &amp; Bonded</p>
                      <p className="text-sm text-ink-600">
                        {company.state} license #{trust.license_number}
                      </p>
                    </div>
                  </li>
                )}
                {trust.insured && (
                  <li className="flex items-start gap-3">
                    <CircleCheck size={22} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-ink-900">Fully Insured</p>
                      <p className="text-sm text-ink-600">
                        General liability &amp; workers compensation.
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
                    <p className="font-semibold text-ink-900">Written Estimates</p>
                    <p className="text-sm text-ink-600">
                      No surprises — every quote is itemized in writing.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card p-8">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <ShieldCheck size={30} aria-hidden="true" />
              </span>
              <h3 className="heading-3 mt-5 text-center">The {company.name} Promise</h3>
              <p className="mt-3 text-center text-sm leading-relaxed text-ink-600">
                {company.years_in_business}+ years of roofing experience, every
                crew factory-trained, and a clean, monitored job site from
                tear-off to final inspection.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-roof-200 pt-6 text-center">
                <div>
                  <p className="font-display text-2xl font-bold text-brand-700">
                    {company.years_in_business}+
                  </p>
                  <p className="text-xs font-medium text-ink-500">Years</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-brand-700">
                    {stats[1]?.value ?? '2,400'}
                  </p>
                  <p className="text-xs font-medium text-ink-500">Roofs</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold text-brand-700">
                    {ratings.google_rating}
                  </p>
                  <p className="text-xs font-medium text-ink-500">Rating</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="section section-alt scroll-mt-24">
          <Container className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Talk to a local roofer</p>
              <h2 className="heading-2">Questions? Ask Us Anything.</h2>
              <p className="lead mt-4">
                No pressure, no obligation. Call, email, or stop by — we're happy
                to walk you through options and pricing.
              </p>
              {emergency.enabled && (
                <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-700">
                  <PhoneCall size={16} aria-hidden="true" />
                  24/7 emergency response: {emergency.phone}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <a href={toTelHref(contact.phone)} className="card card-hover p-6">
                <PhoneCall size={22} className="text-brand-700" aria-hidden="true" />
                <h3 className="heading-4 mt-4">Call Us</h3>
                <p className="mt-1 text-sm font-semibold text-brand-700">{contact.phone}</p>
              </a>
              <a href={`mailto:${contact.email}`} className="card card-hover p-6">
                <Mail size={22} className="text-brand-700" aria-hidden="true" />
                <h3 className="heading-4 mt-4">Email Us</h3>
                <p className="mt-1 text-sm font-semibold text-brand-700">{contact.email}</p>
              </a>
              <div className="card p-6">
                <MapPin size={22} className="text-brand-700" aria-hidden="true" />
                <h3 className="heading-4 mt-4">Visit Us</h3>
                <p className="mt-1 text-sm text-ink-600">{contact.address}</p>
              </div>
              <div className="card p-6">
                <Clock size={22} className="text-brand-700" aria-hidden="true" />
                <h3 className="heading-4 mt-4">Hours</h3>
                <p className="mt-1 text-sm text-ink-600">{contact.hours}</p>
              </div>
            </div>
          </Container>
        </section>

        {/* ---------- Final CTA (soft) ---------- */}
        <section className="section">
          <Container narrow>
            <div className="cta-panel">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white">
                <PhoneCall size={24} aria-hidden="true" />
              </span>
              <h2 className="heading-2 mt-5 text-white">{final_cta.heading}</h2>
              <p className="mx-auto mt-4 max-w-lg text-ink-100">
                {final_cta.description}
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <PhoneCTA
                  phone={company.phone}
                  label={`Call ${company.phone}`}
                  variant="primary"
                  size="lg"
                  full
                />
                <Button href={`mailto:${contact.email}`} variant="on-dark" size="lg" full>
                  Email Us
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter
        company={company}
        contact={contact}
        social={config.social}
        links={navLinks}
        dark={false}
        licenseLine={
          trust.licensed && trust.license_number
            ? `Licensed & insured · ${company.state} License #${trust.license_number}`
            : undefined
        }
      />
    </div>
  )
}