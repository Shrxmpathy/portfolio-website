import { ArrowRight } from 'lucide-react'
import { connections } from '../data/portfolio'
import Section, { SectionHeading } from './ui/Section'

export default function Connections() {
  return (
    <Section label="Synthesis" index="03" className="grid-paper">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading>{connections.title}</SectionHeading>
          <p className="mt-6 leading-relaxed text-ink-soft">{connections.body}</p>
        </div>

        <ul className="lg:col-span-5 lg:col-start-8">
          {connections.strands.map((strand) => (
            <li
              key={strand.from}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-rule py-4 text-sm"
            >
              <span className="font-medium">{strand.from}</span>
              <ArrowRight aria-hidden size={14} className="text-accent" />
              <span className="text-ink-soft">{strand.to}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
