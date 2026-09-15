import { getCompanyConfig } from './lib/config'
import { toTelHref } from './lib/utils'

function App() {
  const config = getCompanyConfig()
  const { company, hero, ratings, trust, stats, services, reviews } = config
  const { testimonials, projects, emergency, contact, social, final_cta } =
    config

  return (
    <div className="min-h-screen bg-roof-50 text-ink-900">
      {/* Emergency banner */}
      {emergency.enabled && (
        <div className="bg-brand-700 py-2 text-center text-sm font-semibold tracking-wide text-white">
          {emergency.title} —{' '}
          <a
            href={toTelHref(emergency.phone)}
            className="underline underline-offset-2 hover:text-white/85"
          >
            {emergency.phone}
          </a>{' '}
          · {emergency.description}
        </div>
      )}

      {/* Header */}
      <header className="border-b border-roof-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            {company.logo_url ? (
              <img
                src={company.logo_url}
                alt={`${company.name} logo`}
                className="h-10 w-auto"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded bg-brand-700 text-sm font-bold text-white">
                {company.name
                  .split(' ')
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join('')}
              </div>
            )}
            <span className="font-display text-xl font-bold tracking-tight text-ink-950">
              {company.name}
            </span>
          </div>
          <a
            href={toTelHref(company.phone)}
            className="inline-flex items-center gap-2 rounded bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            {company.phone}
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            {hero.eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-700">
                {hero.eyebrow}
              </p>
            )}
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-950 md:text-5xl">
              {hero.headline}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              {hero.subheadline}
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <a
                href={toTelHref(company.phone)}
                className="inline-flex w-full items-center justify-center gap-2 rounded bg-brand-700 px-8 py-3.5 text-base font-semibold text-white shadow-cta transition-colors hover:bg-brand-800 sm:w-auto"
              >
                {hero.primary_cta}
              </a>
              <a
                href={toTelHref(company.phone)}
                className="inline-flex w-full items-center justify-center gap-2 rounded border-2 border-ink-900 px-8 py-3.5 text-base font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white sm:w-auto"
              >
                {hero.secondary_cta}
              </a>
            </div>

            {hero.perks && hero.perks.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-3">
                {hero.perks.map((perk) => (
                  <span
                    key={perk}
                    className="rounded-full border border-roof-200 bg-white px-4 py-1.5 text-sm font-medium text-ink-700"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            )}
          </div>

          {hero.image && (
            <div className="overflow-hidden rounded-2xl">
              <img
                src={hero.image}
                alt={`${company.name} roofing work`}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </section>

        {/* Trust badges */}
        <section className="border-t border-roof-200 bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px md:grid-cols-4">
            {trust.badges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center gap-1 px-4 py-6 text-center"
              >
                <span className="font-display text-lg font-bold text-ink-900">
                  {badge.label}
                </span>
                {badge.detail && (
                  <span className="text-xs text-ink-500">{badge.detail}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Trust flags + warranty */}
        <section className="bg-white/60 py-10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4">
            <span
              className={
                trust.licensed
                  ? 'rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-800'
                  : 'hidden'
              }
            >
              Licensed{trust.license_number ? ` · ${trust.license_number}` : ''}
            </span>
            <span
              className={
                trust.insured
                  ? 'rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-800'
                  : 'hidden'
              }
            >
              Fully Insured
            </span>
            {trust.warranty && (
              <span className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
                {trust.warranty_text}
              </span>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-brand-700 text-white">
          <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col items-center gap-0.5 px-4 py-6"
              >
                <span className="font-display text-3xl font-bold md:text-4xl">
                  {stat.value}
                </span>
                <span className="text-sm text-white/80">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-ink-950 md:text-4xl">
            Our Services
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="relative rounded-xl border border-roof-200 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                {service.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                    {service.badge}
                  </span>
                )}
                <h3 className="mb-2 text-lg font-bold text-ink-900">
                  {service.name}
                </h3>
                <p className="text-sm leading-relaxed text-ink-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="border-t border-roof-200 bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-10 flex flex-col items-center gap-2 text-center">
              <h2 className="font-display text-3xl font-bold text-ink-950">
                Rated {ratings.google_rating} by Houston Homeowners
              </h2>
              <p className="text-ink-600">
                {ratings.review_count} verified Google reviews and counting
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {reviews.map((review) => (
                <figure
                  key={review.id}
                  className="rounded-xl border border-roof-200 bg-roof-50 p-6"
                >
                  <figcaption className="mb-2 font-semibold text-ink-900">
                    {review.author}
                    <span className="ml-2 text-xs font-normal text-ink-500">
                      {review.location}
                    </span>
                  </figcaption>
                  <p className="text-sm text-ink-700">{review.text}</p>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-ink-950 md:text-4xl">
            What Our Customers Say
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.id}
                className="rounded-xl border border-roof-200 bg-white p-6 shadow-card"
              >
                <p className="text-sm leading-relaxed text-ink-700">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <footer className="mt-4 font-semibold text-ink-900">
                  {testimonial.name}
                  <span className="text-xs font-normal text-ink-500">
                    {' '}
                    · {testimonial.location}
                    {testimonial.project_type
                      ? ` · ${testimonial.project_type}`
                      : ''}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="border-t border-roof-200 bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-10 text-center font-display text-3xl font-bold text-ink-950 md:text-4xl">
              Recent Projects
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="overflow-hidden rounded-xl border border-roof-200 bg-roof-50"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-44 w-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-ink-900">
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium text-ink-500">
                      {project.location}
                      {project.year ? ` · ${project.year}` : ''}
                    </p>
                    <p className="mt-2 text-sm text-ink-600">
                      {project.description}
                    </p>
                    {project.result && (
                      <p className="mt-3 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                        {project.result}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            <a
              href={`mailto:${contact.email}`}
              className="rounded-xl border border-roof-200 bg-white p-6 text-center shadow-card"
            >
              <span className="font-display text-lg font-bold text-ink-900">
                Email Us
              </span>
              <span className="mt-1 block text-sm text-ink-600">
                {contact.email}
              </span>
            </a>
            <a
              href={toTelHref(contact.phone)}
              className="rounded-xl border border-roof-200 bg-white p-6 text-center shadow-card"
            >
              <span className="font-display text-lg font-bold text-ink-900">
                Call Us
              </span>
              <span className="mt-1 block text-sm text-ink-600">
                {contact.phone}
              </span>
            </a>
            <div className="rounded-xl border border-roof-200 bg-white p-6 text-center shadow-card">
              <span className="font-display text-lg font-bold text-ink-900">
                Visit Us
              </span>
              <span className="mt-1 block text-sm text-ink-600">
                {contact.address}
              </span>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-ink-500">
            Hours: {contact.hours}
          </p>
        </section>

        {/* Final CTA */}
        <section className="bg-ink-950 px-4 py-16 text-center text-white">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold md:text-4xl">
            {final_cta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-100">
            {final_cta.description}
          </p>
          <a
            href={toTelHref(company.phone)}
            className="mt-8 inline-flex items-center justify-center rounded bg-brand-700 px-8 py-3.5 text-base font-semibold text-white shadow-cta transition-colors hover:bg-brand-800"
          >
            {final_cta.button_label}
          </a>
        </section>

        {/* Footer */}
        <footer className="border-t border-roof-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-sm text-ink-500 sm:flex-row sm:justify-between">
            <span>
              © {new Date().getFullYear()} {company.name} · {company.city_state}
            </span>
            <span className="flex gap-4">
              {social.facebook && <a href={social.facebook}>Facebook</a>}
              {social.instagram && <a href={social.instagram}>Instagram</a>}
              {social.google && <a href={social.google}>Google</a>}
            </span>
          </div>
        </footer>

        {/* Pipeline verification panel */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-xl border-2 border-dashed border-brand-200 bg-brand-50 p-6">
            <h3 className="mb-4 font-display text-lg font-bold text-brand-800">
              Data Pipeline Verification
            </h3>
            <ul className="grid gap-2 text-sm text-ink-700 sm:grid-cols-2">
              <li>
                <strong>Company:</strong> {company.name} ({company.city_state})
              </li>
              <li>
                <strong>Hero:</strong> {hero.headline.slice(0, 42)}…
              </li>
              <li>
                <strong>Services:</strong> {services.length} loaded
              </li>
              <li>
                <strong>Reviews:</strong> {ratings.google_rating}★ /{' '}
                {ratings.review_count} · {reviews.length} shown
              </li>
              <li>
                <strong>Testimonials:</strong> {testimonials.length} loaded
              </li>
              <li>
                <strong>Projects:</strong> {projects.length} loaded
              </li>
              <li>
                <strong>Trust badges:</strong> {trust.badges.length} loaded
              </li>
              <li>
                <strong>Stats:</strong> {stats.length} loaded
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App