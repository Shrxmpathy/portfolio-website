import type { ReactNode } from 'react'
import { ExternalLink } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { hasPlaceholder } from '../lib/placeholders'
import Txt from './ui/Txt'
import Note from './ui/Note'
import Gallery from './ui/Gallery'

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="label mb-2.5">{label}</p>
      {children}
    </div>
  )
}

function Prose({ children }: { children: string }) {
  return (
    <p className="leading-relaxed text-ink-soft">
      <Txt>{children}</Txt>
    </p>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-relaxed text-ink-soft">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-2.5 h-px w-2.5 shrink-0 bg-rule-strong" />
          <span>
            <Txt>{item}</Txt>
          </span>
        </li>
      ))}
    </ul>
  )
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="divide-y divide-rule border-y border-rule">
      {items.map((item, i) => (
        <li key={item} className="flex gap-4 py-3.5">
          <span className="label shrink-0 pt-1 text-accent">{String(i + 1).padStart(2, '0')}</span>
          <span className="text-sm leading-relaxed text-ink-soft">
            <Txt>{item}</Txt>
          </span>
        </li>
      ))}
    </ol>
  )
}

function Tools({ items }: { items: string[] }) {
  return (
    <p className="text-sm text-ink-soft">
      {items.map((tool, i) => (
        <span key={tool}>
          {i > 0 && <span className="mx-2 text-rule-strong">·</span>}
          <Txt>{tool}</Txt>
        </span>
      ))}
    </p>
  )
}

function Header({ project, number }: { project: Project; number: string }) {
  return (
    <header className="border-b border-ink pb-6">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="label text-accent">Project {number}</span>
        <span className="label">{project.category}</span>
      </div>
      {/* h1 — a case study is the primary content of its own page. */}
      <h1 className="mt-3 font-display text-3xl leading-tight text-balance sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{project.summary}</p>
      <p className="mt-4 inline-block border border-rule-strong px-2.5 py-1 font-mono text-[0.7rem] tracking-wide text-ink-faint">
        {project.status}
      </p>
    </header>
  )
}

function Links({ project }: { project: Project }) {
  if (!project.links?.length) return null

  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      {project.links.map((link) =>
        hasPlaceholder(link.href) ? (
          <li key={link.label} className="text-ink-faint">
            {link.label}: <Txt>{link.href}</Txt>
          </li>
        ) : (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-accent underline-offset-4 hover:underline"
            >
              {link.label}
              <ExternalLink aria-hidden size={13} />
            </a>
          </li>
        ),
      )}
    </ul>
  )
}

/**
 * Four layout variants, indexed by the project's position. They share type
 * scale, rules and spacing, but arrange the gallery and columns differently
 * so the case studies don't read as four copies of the same block.
 */
export default function ProjectCaseStudy({ project, index }: { project: Project; index: number }) {
  const number = String(index + 1).padStart(2, '0')
  const variant = index % 4

  const overview = (
    <div className="space-y-5">
      <Prose>{project.overview}</Prose>
      {project.context && (
        <Field label="Context">
          <Prose>{project.context}</Prose>
        </Field>
      )}
      <Field label="Problem / objective">
        <Prose>{project.objective}</Prose>
      </Field>
    </div>
  )

  const spec = (
    <div className="grid gap-8 sm:grid-cols-2">
      <Field label="Requirements">
        <Bullets items={project.requirements} />
      </Field>
      <Field label="Constraints">
        <Bullets items={project.constraints} />
      </Field>
    </div>
  )

  const role = (
    <Field label="My role">
      <Prose>{project.role}</Prose>
    </Field>
  )

  const process = (
    <Field label="Design / development process">
      <Steps items={project.process} />
    </Field>
  )

  // Both are optional: a project that omits them skips the block entirely
  // rather than rendering a heading with nothing under it.
  const challenges = project.challenges?.length ? (
    <Field label="Challenges and iterations">
      <Bullets items={project.challenges} />
    </Field>
  ) : null

  const outcome = (
    <div className="space-y-8">
      {project.result && (
        <Field label="Result / current status">
          <Prose>{project.result}</Prose>
        </Field>
      )}
      <Field label="Lessons learned">
        <Bullets items={project.lessons} />
      </Field>
      <Field label="Tools used">
        <Tools items={project.tools} />
      </Field>
      <Links project={project} />
      {project.notes && <Note items={project.notes} />}
    </div>
  )

  return (
    <div>
      <article className="scroll-mt-20" id={project.slug}>
        <Header project={project} number={number} />

        {/* ---- Variant 0: narrow gallery column alongside the write-up ---- */}
        {variant === 0 && (
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-10 lg:col-span-7">
              {overview}
              {role}
              {spec}
              {process}
              {challenges}
            </div>
            <div className="space-y-10 lg:col-span-4 lg:col-start-9">
              <Gallery images={project.images} className="space-y-8" />
              {outcome}
            </div>
          </div>
        )}

        {/* ---- Variant 1: gallery leads, text follows in two columns ---- */}
        {variant === 1 && (
          <div className="mt-10 space-y-12">
            {/* Two columns rather than four: these are plots, and at quarter
                width the axes and points are unreadable. */}
            <Gallery images={project.images} className="grid gap-8 sm:grid-cols-2" />
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="space-y-10 lg:col-span-5">
                {overview}
                {role}
              </div>
              <div className="space-y-10 lg:col-span-6 lg:col-start-7">
                {spec}
                {process}
                {challenges}
                {outcome}
              </div>
            </div>
          </div>
        )}

        {/* ---- Variant 2: text-forward reading column, images at the end ---- */}
        {variant === 2 && (
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-10 lg:col-span-7 lg:col-start-2">
              {overview}
              {role}
              {process}
              {challenges}
              <Gallery images={project.images} className="grid gap-8 sm:grid-cols-2" />
            </div>
            <div className="space-y-10 lg:col-span-3 lg:col-start-10">
              {spec}
              {outcome}
            </div>
          </div>
        )}

        {/* ---- Variant 3: fixed meta rail, gallery as a row at the bottom ---- */}
        {variant === 3 && (
          <div className="mt-10 space-y-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="space-y-8 lg:col-span-3">
                {role}
                <Field label="Tools used">
                  <Tools items={project.tools} />
                </Field>
                {spec}
              </div>
              <div className="space-y-10 lg:col-span-8 lg:col-start-5">
                {overview}
                {process}
                {challenges}
                {project.result && (
                  <Field label="Result / current status">
                    <Prose>{project.result}</Prose>
                  </Field>
                )}
                <Field label="Lessons learned">
                  <Bullets items={project.lessons} />
                </Field>
                <Links project={project} />
                {project.notes && <Note items={project.notes} />}
              </div>
            </div>
            <Gallery images={project.images} className="grid gap-8 sm:grid-cols-3" />
          </div>
        )}
      </article>
    </div>
  )
}
