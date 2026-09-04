import type { ReactNode } from 'react'

export function SectionLabel({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      {index && <span className="label text-accent">{index}</span>}
      <span className="label">{children}</span>
      <span aria-hidden className="h-px flex-1 bg-rule" />
    </div>
  )
}

/** `as="h1"` for the primary heading of a page; defaults to h2 for sections. */
export function SectionHeading({
  as: Tag = 'h2',
  children,
}: {
  as?: 'h1' | 'h2'
  children: ReactNode
}) {
  return (
    <Tag className="font-display text-3xl leading-tight text-balance sm:text-4xl">{children}</Tag>
  )
}

export default function Section({
  id,
  label,
  index,
  className = '',
  children,
}: {
  id?: string
  label?: string
  index?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={`scroll-mt-20 border-t border-rule ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 lg:py-28">
        {label && (
          <div className="mb-10">
            <SectionLabel index={index}>{label}</SectionLabel>
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
