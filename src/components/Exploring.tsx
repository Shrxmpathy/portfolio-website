import { exploring } from '../data/portfolio'
import Section, { SectionHeading } from './ui/Section'

export default function Exploring() {
  return (
    <Section label="Current Projects" index="05">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading>{exploring.title}</SectionHeading>
          <p className="mt-5 text-sm leading-relaxed text-ink-faint">{exploring.intro}</p>
        </div>

        <ul className="lg:col-span-7 lg:col-start-6">
          {exploring.topics.map((topic) => (
            <li
              key={topic}
              className="border-b border-rule py-4 font-display text-xl first:border-t sm:text-2xl"
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
