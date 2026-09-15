/**
 * Velmora — Roofing Contractor Demo System
 * Centralized type definitions for all business data.
 * UI components consume these shapes via props; no business data lives in components.
 */

/** Core identity block for a roofing company. */
export interface CompanyInfo {
  name: string
  /** Full legal name, used on licensing/footer lines (optional). */
  legal_name?: string
  /** Display + tel: source phone number. */
  phone: string
  /** Optional 24/7 emergency line. */
  emergency_phone?: string
  email: string
  address?: string
  city: string
  state: string
  /** Pre-formatted "City, ST" string. */
  city_state: string
  /** Neighborhoods/cities served, rendered as locations. */
  service_area?: string[]
  logo_url?: string
  years_in_business?: number
  /** Short descriptors like "Licensed & Insured • GAF Certified". */
  tagline?: string
  license_number?: string
  /** Business hours text, e.g. "Mon–Sat: 7am–7pm". */
  hours?: string
  emergency_service: boolean
}

/** Hero section content for templates. */
export interface HeroContent {
  eyebrow?: string
  headline: string
  subheadline: string
  /** Primary CTA shown biggest in the hero. */
  cta_primary_label: string
  /** Secondary CTA, usually "Call" — tel: link generated from company data. */
  cta_secondary_label: string
  /** Optional quick-win chips under the CTAs (e.g. "Free Inspections"). */
  perks?: string[]
}

/** A call-to-action block rendered near the end of a page. */
export interface FinalCTA {
  heading: string
  description: string
  button_label: string
}

/** A service offering card. */
export interface Service {
  id: string
  title: string
  description: string
  /** Lucide icon name mapped by the UI (see lib/iconMap). */
  icon: string
  image_url?: string
  /** Optional emphasis badge, e.g. "Most Popular". */
  badge?: string
}

/** Google review entry. */
export interface Review {
  id: string
  author: string
  location?: string
  rating: number
  date?: string
  text: string
  service?: string
}

/** Long-form customer testimonial. */
export interface Testimonial {
  id: string
  author: string
  location?: string
  role?: string
  rating: number
  quote: string
  project_type?: string
  image_url?: string
}

/** A portfolio / project showcase entry. */
export interface Project {
  id: string
  title: string
  /** e.g. "Roof Replacement", "Storm Damage Repair". */
  type: string
  description?: string
  location?: string
  year?: string
  /** Rendered in the hero/thumbnail slot when present. */
  image_url: string
  /** Before/after slider pair when available. */
  before_image_url?: string
  after_image_url?: string
  /** Outcome detail, e.g. "Replaced in 2 days". */
  result?: string
}

/** Credibility badge (licensing, insurance, warranty, certifications). */
export interface TrustBadge {
  id: string
  label: string
  detail?: string
  icon: string
}

/** Standalone metric, e.g. "2,500+ Roofs Replaced". */
export interface Stat {
  id: string
  value: string
  label: string
}

/** External profile link. */
export interface SocialLink {
  id: string
  platform: string
  url: string
}

/** Google rating summary rendered beside review blocks. */
export interface Ratings {
  google_rating: number
  review_count: number
  /** Optional link to the company's Google Business profile. */
  review_url?: string
}

/** Emergency roof response banner strip. */
export interface EmergencyBanner {
  enabled: boolean
  text: string
}

/** Top-level business data document for every Velmora customer. */
export interface CompanyConfig {
  company: CompanyInfo
  hero: HeroContent
  ratings: Ratings
  services: Service[]
  reviews: Review[]
  testimonials: Testimonial[]
  projects: Project[]
  trust_badges: TrustBadge[]
  stats: Stat[]
  social_links: SocialLink[]
  emergency: EmergencyBanner
  final_cta: FinalCTA
}