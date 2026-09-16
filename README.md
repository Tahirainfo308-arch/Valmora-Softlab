# Velmora Roofing Demo System

A config-driven demo generator that turns a single JSON document into a complete, polished roofing company website. Three pre-built visual templates render the same data through the same React component library — swap the JSON, swap the template, and a brand-new roofing business demo appears. No UI code changes required.

```
Roofing company data → JSON configuration → template selection → React rendering → personalized demo
```

---

## Project Overview

Velmora Labs builds sales demos for roofing (and future trade) companies. Instead of hand-writing a website per customer, every detail that makes a site feel real — company name, phone, city, services, reviews, projects, warranty, emergency line — lives in one JSON file. A lightweight registry selects which company config and which template to show. The result: new demos are **generated, not built**.

## Business Objective

- Sell roofing companies on a modern, convert-focused web presence.
- Prove the concept visually: an AI (or a partner) supplies the company facts; the system generates a ready-to-share demo in minutes.
- Keep the UI maintainable — one component library, one design system, three templates.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 (TypeScript) |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 (utility-first, design tokens in `src/index.css`) |
| Icons | lucide-react (tree-shaken, no unused code pulled in) |
| Language | TypeScript ~6.0 (strict: no unused locals, verbatim module syntax) |
| Linting | oxlint |
| Data | Static JSON (no backend required) |

## Architecture

```
src/
├── App.tsx                     # Selection layer: config + template + URL routing
├── main.tsx                    # React entry point
├── types/
│   └── index.ts                # Single source of truth for the data schema (CompanyConfig)
├── lib/
│   ├── config.ts               # Config registry: summit / lonestar, ?config= routing
│   ├── iconMap.ts              # String icon-name → lucide component
│   └── utils.ts                # cn() class combiner, toTelHref() phone-link helper
├── data/
│   ├── company.config.json     # Summit Roofing Co. (Houston, TX) — default demo
│   └── lonestar.config.json    # Lone Star Roofing & Restoration (Dallas, TX)
├── templates/
│   ├── index.ts                # TemplateId keys, TEMPLATES registry, TEMPLATE_OPTIONS
│   ├── lead-gen/               # Template 1 — Lead Generation & Direct Action
│   ├── trust/                  # Template 2 — Trust & Social Proof
│   └── modern/                 # Template 3 — Modern & Bold
└── components/
    ├── ui/                     # Reusable: Button, PhoneCTA, QuoteForm, TrustBadge, ... 
    └── layout/                 # SiteHeader, SiteFooter, EmergencyBanner
```

### How the pipeline works

1. **Company data** lives in `src/data/*.config.json`, validated against the `CompanyConfig` TypeScript schema (`src/types/index.ts`).
2. **JSON configuration** is registered in `src/lib/config.ts`. Each config also declares which template it wants via the top-level `template` key.
3. **Template selection** happens in `src/App.tsx`: a URL `?template=` overrides the config value, otherwise the config's `template` key wins.
4. **React rendering** — the selected template composes the shared UI components, every string driven by config.
5. **Personalized demo** is served instantly, shareable as a plain URL.

## Dynamic JSON Configuration

Each config is a full `CompanyConfig`. The top-level `template` key picks the template; everything else is content:

```json
{
  "template": "template-1",
  "company": {
    "name": "Summit Roofing Co.",
    "phone": "(713) 555-0182",
    "email": "hello@summitroofing.com",
    "city": "Houston",
    "state": "TX",
    "city_state": "Houston, TX",
    "years_in_business": 18,
    "emergency_service": true
  },
  "hero": {
    "eyebrow": "Houston's Storm-Trusted Roofing Contractor",
    "headline": "Your Roof. Our Priority.",
    "subheadline": "Free inspections and honest estimates from a licensed, insured Houston roofing team.",
    "image": "/assets/hero-roof.svg",
    "primary_cta": "Get My Free Inspection",
    "secondary_cta": "Call Us Now",
    "perks": ["Free Inspection", "Same-Week Install", "5-Year Workmanship Warranty"]
  },
  "ratings": { "google_rating": 4.9, "review_count": 428, "review_url": "https://google.com/…" },
  "services": [ { "id": "full-replacement", "name": "Roof Replacement", "icon": "Roof", "badge": "Best Seller" } ],
  "reviews": [ { "id": "r1", "author": "Maria G.", "location": "Katy, TX", "rating": 5, "date": "2 weeks ago", "text": "…", "service": "Roof Replacement" } ],
  "testimonials": [ { "id": "t1", "name": "The Patel Family", "location": "Cypress, TX", "rating": 5, "text": "…", "project_type": "Full Roof Replacement" } ],
  "projects": [ { "id": "p1", "title": "Cedar Shake Roof Replacement", "location": "The Woodlands, TX", "type": "Roof Replacement", "year": "2025", "result": "Completed in 2 days" } ],
  "stats": [ { "id": "s1", "value": "18+", "label": "Years in Business" } ],
  "trust": {
    "licensed": true, "insured": true, "warranty": true,
    "license_number": "TXRC-452118",
    "warranty_text": "We guarantee our workmanship for five full years …",
    "badges": [ { "id": "b1", "label": "Licensed & Insured", "detail": "TX License #TXRC-452118", "icon": "ShieldCheck" } ]
  },
  "emergency": { "enabled": true, "title": "24/7 Emergency Response", "description": "…", "phone": "(713) 555-0199" },
  "contact": { "email": "hello@summitroofing.com", "phone": "(713) 555-0182", "address": "4821 Westheimer Rd, Suite 700, Houston, TX 77027", "hours": "Mon–Sat: 7:00am–7:00pm" },
  "social": { "facebook": "…", "instagram": "…", "google": "…" },
  "final_cta": { "heading": "Get Your Free Roof Inspection", "description": "…", "button_label": "Get My Free Inspection" }
}
```

> The exact schema is defined by the interfaces in `src/types/index.ts` — that file is the contract every config must satisfy.

## Available Templates

| ID | Name | Focus |
| --- | --- | --- |
| `template-1` | Lead Generation & Direct Action | Conversion-focused hero with an overlapping quote form, click-to-call everywhere, service grid, reviews, warranty section, mobile call/quote bar |
| `template-2` | Trust & Social Proof | Editorial calm, trust badges, before/after sliders, reviews and testimonials as the centerpiece |
| `template-3` | Modern & Bold | High-contrast hero with emergency CTA, image-backed interactive service grid, why-us band, stats with trust pills, mobile action bar |

## How to Change Company Data

Edit an existing config (or add a new one):

1. Copy `src/data/company.config.json` to e.g. `src/data/acme.config.json`.
2. Replace name, phone, city/state, services, reviews, projects, ratings, etc. Keep the schema identical.
3. Register it in `src/lib/config.ts`:
   - Add the `import acmeRaw from '../data/acme.config.json'` line.
   - Add an entry to the `CONFIG` record and a human label in `CONFIG_OPTIONS`.
4. Run `npm run build` — TypeScript will flag anything that no longer matches the schema.

## How to Switch Templates

A template never needs to be rewritten for a customer — it's a selector, not an edit:

```json
{ "template": "template-3" }
```

Set the `template` key in the JSON. `resolveTemplate()` falls back to `template-1` if the key is missing or unknown.

## How to Run Locally

```bash
npm install
npm run dev       # start the dev server
npm run lint      # oxlint
npm run build     # tsc type-check + production build into dist/
npm run preview   # serve the production build locally
```

## How to Build for Production

```bash
npm run build
```

Outputs a static site to `dist/` — no server-side code, no environment variables required.

## How to Deploy

The build output is a fully static site. Deploy `dist/` to any host:

- **GitHub Pages / Netlify / Vercel / Cloudflare Pages** — point the build command `npm run build` at `dist/`.
- **Any web server (Nginx, S3, static hosting)** — upload the contents of `dist/`.

Demo links are shareable via URL parameters, e.g. `https://your-site.com/?config=lonestar&template=template-3`. The dev switcher prints these links automatically.

## How a Future AI Automation Workflow Can Provide New JSON Data

The system is built for generation, not manual reproduction:

1. **Capture** — an AI agent scrapes or receives a company's profile (name, phone, service area, reviews, photo URLs).
2. **Map** — the agent fills the `CompanyConfig` schema and writes a new `*.config.json` plus an SVG logo/assets.
3. **Register** — the agent (or a human) adds one line to the config registry in `src/lib/config.ts`.
4. **Verify** — `npm run build` type-checks the JSON against the schema automatically.
5. **Ship** — the demo is served; a URL like `?config=acme` is the deliverable.

Because the schema is strict and the components are data-driven, a well-formed config produces a complete site with **zero component changes**. Adding a *new template* is a one-time design task; adding a *new company* is data input.

## Future Improvements

- More templates (e.g. commercial roofing, maintenance programs, e-commerce for gutter installation).
- Richer media: real photo sets, video testimonials, 3D roof previews.
- Live "request an estimate" — wire the quote form to an email/CRM/WhatsApp endpoint.
- Multi-language configs (Spanish roofing content is an obvious next market).
- Config validation UI and a web-based config builder so partners can self-serve demos.
- Per-company domain routing instead of `?config=` URL parameters.