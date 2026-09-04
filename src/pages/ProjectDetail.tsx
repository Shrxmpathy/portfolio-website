import { ArrowLeft, ArrowRight } from 'lucide-react'
import { projects } from '../data/portfolio'
import ProjectCaseStudy from '../components/ProjectCaseStudy'
import Section from '../components/ui/Section'
import { href } from '../lib/router'

export default function ProjectDetail({ slug }: { slug: string }) {
  const index = projects.findIndex((p) => p.slug === slug)

  if (index === -1) {
    return (
      <Section label="Not found">
        <h1 className="font-display text-3xl">That project doesn’t exist.</h1>
        <a
          href={href('/projects')}
          className="mt-6 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm hover:border-accent hover:text-accent"
        >
          <ArrowLeft aria-hidden size={15} />
          Back to all projects
        </a>
      </Section>
    )
  }

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  return (
    <Section>
      <a
        href={href('/projects')}
        className="no-print mb-12 inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-accent"
      >
        <ArrowLeft aria-hidden size={15} />
        All projects
      </a>

      <ProjectCaseStudy project={project} index={index} />

      {projects.length > 1 && (
        <nav className="no-print mt-24 border-t border-rule pt-8" aria-label="Next project">
          <p className="label mb-2">Next project</p>
          <a
            href={href(`/projects/${next.slug}`)}
            className="group inline-flex items-baseline gap-3 font-display text-2xl transition-colors hover:text-accent"
          >
            {next.title}
            <ArrowRight aria-hidden size={18} className="shrink-0 self-center" />
          </a>
        </nav>
      )}
    </Section>
  )
}
