import { getCompanyConfig } from './lib/config'
import { toTelHref } from './lib/utils'

function App() {
  const config = getCompanyConfig()
  const { company, hero, ratings, trust_badges, stats, services, emergency } =
    config

  return (
    <div className="min-h-screen bg-roof-50 text-ink-900">
      {/* Emergency banner */}
      {emergency.enabled && (
        <div className="bg-brand-700 py-2 text-center text-sm font-semibold tracking-wide text-white">
          {emergency.text}
        </div>
      )}

      {/* Minimal header — proves company data renders */}
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
        {/* Hero verification */}
        <section className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
          {hero.eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-700">
              {hero.eyebrow}
            </p>
          )}
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink-950 md:text-6xl">
            {hero.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">
            {hero.subheadline}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={toTelHref(company.phone)}
              className="inline-flex items-center gap-2 rounded bg-brand-700 px-8 py-3.5 text-base font-semibold text-white shadow-cta transition-colors hover:bg-brand-800"
            >
              {hero.cta_primary_label}
            </a>
            <a
              href={toTelHref(company.phone)}
              className="inline-flex items-center gap-2 rounded border-2 border-ink-900 px-8 py-3.5 text-base font-semibold text-ink-900 transition-colors hover:bg-ink-900 hover:text-white"
            >
              {hero.cta_secondary_label}
            </a>
          </div>

          {hero.perks && hero.perks.length > 0 && (
            <div className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-3">
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
        </section>

        {/* Trust bar — just to prove arrays render from config */}
        <section className="border-t border-roof-200 bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px md:grid-cols-4">
            {trust_badges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center gap-1 px-4 py-6 text-center"
              >
                <span className="text-lg font-bold text-ink-900">
                  {badge.label}
                </span>
                {badge.detail && (
                  <span className="text-xs text-ink-500">{badge.detail}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Stats strip */}
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

        {/* Service cards — proves array rendering with card UI */}
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
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pipeline verification panel — remove in Step 2 */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-xl border-2 border-dashed border-brand-200 bg-brand-50 p-6">
            <h3 className="mb-4 font-display text-lg font-bold text-brand-800">
              Data Pipeline Verification
            </h3>
            <ul className="space-y-2 text-sm text-ink-700">
              <li>
                <strong>Company:</strong> {company.name} ({company.city_state})
              </li>
              <li>
                <strong>Phone:</strong>{' '}
                <a
                  href={toTelHref(company.phone)}
                  className="font-semibold text-brand-700 underline underline-offset-2"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                <strong>Emergency:</strong> {emergency.enabled ? 'Active' : 'Off'}
              </li>
              <li>
                <strong>Rating:</strong> {ratings.google_rating} ({ratings.review_count} reviews)
              </li>
              <li>
                <strong>Services:</strong> {services.length} loaded
              </li>
              <li>
                <strong>Trust Badges:</strong> {trust_badges.length} loaded
              </li>
              <li>
                <strong>Projects:</strong> {config.projects.length} loaded
              </li>
              <li>
                <strong>Reviews:</strong> {config.reviews.length} loaded
              </li>
              <li>
                <strong>Testimonials:</strong> {config.testimonials.length} loaded
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App