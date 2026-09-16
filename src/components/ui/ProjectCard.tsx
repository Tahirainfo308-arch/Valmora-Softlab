import { CircleCheck } from 'lucide-react'
import type { Project } from '../../types'
import { cn } from '../../lib/utils'
import { BeforeAfter } from './BeforeAfter'

interface ProjectCardProps {
  project: Project
  showBeforeAfter?: boolean
  className?: string
}

export function ProjectCard({
  project,
  showBeforeAfter = false,
  className,
}: ProjectCardProps) {
  const withCompare =
    showBeforeAfter && Boolean(project.before_image && project.after_image)

  return (
    <article className={cn('card group overflow-hidden', className)}>
      <div className="card-image">
        {withCompare ? (
          <BeforeAfter
            before={project.before_image!}
            after={project.after_image!}
            alt={project.title}
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="card-body">
        {(project.type || project.location || project.year) && (
          <p className="flex flex-wrap items-center gap-x-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
            {project.type && <span className="text-brand-700">{project.type}</span>}
            {project.location && <span>{project.location}</span>}
            {project.year && <span>{project.year}</span>}
          </p>
        )}
        <h3 className="heading-4 mt-2 text-xl">{project.title}</h3>
        {project.description && (
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            {project.description}
          </p>
        )}
        {project.result && (
          <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-800">
            <CircleCheck size={14} aria-hidden="true" />
            {project.result}
          </p>
        )}
      </div>
    </article>
  )
}