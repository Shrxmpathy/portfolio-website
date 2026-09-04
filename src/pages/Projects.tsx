import ProjectGrid from '../components/ProjectGrid'
import Section, { SectionHeading } from '../components/ui/Section'

export default function Projects() {
  return (
    <Section label="Projects" index="01">
      <div>
        <div className="mb-16 max-w-2xl">
          <SectionHeading as="h1">Here are some of my current projects.</SectionHeading>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Each one covers the objective, the constraints, the context, the lessons learned, and
            images of the process.
          </p>
        </div>

        <ProjectGrid />
      </div>
    </Section>
  )
}
