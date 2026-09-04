import { useState } from 'react'
import { ArrowUpRight, ImagePlus } from 'lucide-react'
import { projects, type Project } from '../data/portfolio'
import { href } from '../lib/router'

function Cover({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false)
  const image = project.images[0]
  const showImage = Boolean(image?.src) && !failed

  return (
    <div className="relative aspect-4/3 overflow-hidden border border-rule bg-surface">
      <span aria-hidden className="absolute top-2 left-2 z-10 h-2.5 w-2.5 border-t border-l border-rule-strong" />
      <span aria-hidden className="absolute right-2 bottom-2 z-10 h-2.5 w-2.5 border-r border-b border-rule-strong" />

      {showImage ? (
        <img
          src={image.src ?? ''}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="grid-paper flex h-full w-full flex-col items-center justify-center gap-2 px-5 text-center">
          <ImagePlus aria-hidden size={18} strokeWidth={1.5} className="text-ink-faint" />
          <span className="font-mono text-xs leading-relaxed text-ink-faint">
            {image?.placeholder ?? 'Add a cover image'}
          </span>
        </div>
      )}

      {/* Darkens on hover. Nothing moves — the frame stays put. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/35 to-ink/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <span
        aria-hidden
        className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-xs tracking-widest text-paper uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        View project
        <ArrowUpRight aria-hidden size={14} />
      </span>
    </div>
  )
}

/**
 * Image-led index of the projects. Titles and categories only — the write-up
 * lives on each project's own page.
 */
export default function ProjectGrid({ className = '' }: { className?: string }) {
  return (
    <ul className={`grid gap-x-8 gap-y-12 sm:grid-cols-2 ${className}`}>
      {projects.map((project, i) => (
        <li key={project.slug}>
          <a href={href(`/projects/${project.slug}`)} className="group block">
            <Cover project={project} />

            <div className="mt-4 flex items-baseline justify-between gap-4">
              <span className="label text-accent">{String(i + 1).padStart(2, '0')}</span>
              <ArrowUpRight
                aria-hidden
                size={16}
                className="shrink-0 text-ink-faint transition-colors group-hover:text-accent"
              />
            </div>
            <h3 className="mt-1 font-display text-2xl leading-snug transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="label mt-2">{project.category}</p>
          </a>
        </li>
      ))}
    </ul>
  )
}
