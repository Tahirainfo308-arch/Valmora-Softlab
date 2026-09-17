import { ArrowUpRight, CircleCheck, MapPin } from 'lucide-react'
import type { Project } from '../../types'
import { cn } from '../../lib/utils'
import { BeforeAfter } from './BeforeAfter'

interface ShowcaseGalleryProps {
  projects: Project[]
  className?: string
}

/**
 * High-end bento project gallery: a large before/after feature, a tall
 * overlay card, and a full-width split banner — never a repetitive grid.
 */
export function ShowcaseGallery({ projects, className }: ShowcaseGalleryProps) {
  if (!projects.length) return null
  const [featured, ...rest] = projects
  const wide = rest[rest.length - 1]
  const talls = rest.slice(0, -1)

  return (
    <div className={cn('grid gap-6 lg:grid-cols-12', className)}>
      <ProjectFeature project={featured} className="lg:col-span-7" />
      {talls.map((project) => (
        <ProjectTall key={project.id} project={project} className="lg:col-span-5" />
      ))}
      {wide && <ProjectWide project={wide} className="lg:col-span-12" />}
    </div>
  )
}

function ProjectFeature({ project, className }: { project: Project; className?: string }) {
  const withCompare = Boolean(project.before_image && project.after_image)

  return (
    <article className={cn('card group overflow-hidden', className)}>
      {withCompare ? (
        <BeforeAfter
          before={project.before_image!}
          after={project.after_image!}
          alt={project.alt ?? project.title}
        />
      ) : (
        <img
          src={project.image}
          alt={project.alt ?? project.title}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-roof-100 bg-white p-6">
        <div className="min-w-0">
          {project.location && (
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-400">
              <MapPin size={13} className="text-brand-700" aria-hidden="true" />
              {project.location}
            </p>
          )}
          <h3 className="mt-1 truncate text-xl">{project.title}</h3>
          <p className="mt-0.5 text-sm">
            {project.type && <span className="font-semibold text-brand-700">{project.type}</span>}
            {project.result && <span className="text-ink-400"> · {project.result}</span>}
          </p>
        </div>
        <a
          href="#quote"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-roof-200 text-brand-700 transition-colors hover:border-brand-700 hover:bg-brand-700 hover:text-white"
          aria-label={`Request a project like ${project.title}`}
        >
          <ArrowUpRight
          size={18}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
        </a>
      </div>
    </article>
  )
}

function ProjectTall({ project, className }: { project: Project; className?: string }) {
  return (
    <article
      className={cn('card group relative min-h-[22rem] overflow-hidden lg:h-full', className)}
    >
      <img
        src={project.image}
        alt={project.alt ?? project.title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-6">
        {project.location && (
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/70">
            <MapPin size={13} className="text-brand-400" aria-hidden="true" />
            {project.location}
          </p>
        )}
        <h3 className="mt-1 text-2xl text-white">{project.title}</h3>
        <p className="mt-2.5 flex flex-wrap items-center gap-2">
          {project.type && (
            <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white">
              {project.type}
            </span>
          )}
          {project.year && <span className="text-xs font-medium text-white/60">{project.year}</span>}
        </p>
      </div>
    </article>
  )
}

function ProjectWide({ project, className }: { project: Project; className?: string }) {
  return (
    <article className={cn('card group overflow-hidden md:grid md:grid-cols-2', className)}>
      <div className="relative min-h-[16rem] overflow-hidden">
        <img
          src={project.image}
          alt={project.alt ?? project.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent md:bg-gradient-to-r"
        />
        {project.year && (
          <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink-900 shadow-soft">
            {project.year}
          </span>
        )}
      </div>
      <div className="flex flex-col justify-center p-8 md:p-10">
        {project.location && (
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700">
            <MapPin size={13} aria-hidden="true" />
            {project.location}
          </p>
        )}
        <h3 className="mt-1 text-2xl text-ink-950">{project.title}</h3>
        {project.description && (
          <p className="mt-3 text-sm leading-relaxed text-ink-600">{project.description}</p>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {project.type && (
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-800">
              {project.type}
            </span>
          )}
          {project.result && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ok-50 px-3 py-1 text-xs font-bold text-ok-700">
              <CircleCheck size={14} aria-hidden="true" />
              {project.result}
            </span>
          )}
        </div>
        <a
          href="#quote"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
        >
          Get a quote for this project
          <ArrowUpRight
            size={16}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </article>
  )
}