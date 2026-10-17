import { projects } from '../data/portfolio'
import ProjectGrid from '../components/ProjectGrid'
import Section, { SectionHeading } from '../components/ui/Section'

const current = projects.filter((p) => p.current)
const past = projects.filter((p) => !p.current)

export default function Projects() {
  return (
    <>
      {current.length > 0 && (
        <Section label="Current Projects" index="01">
          <div className="mb-16 max-w-2xl">
            <SectionHeading as="h1">Here is what I am working on now.</SectionHeading>
            <p className="mt-5 leading-relaxed text-ink-soft">
              These are the projects I am in the middle of right now. I am genuinely excited about
              them, and they are giving me a lot of experience.
            </p>
          </div>

          <ProjectGrid items={current} />
        </Section>
      )}

      <Section label="Past Projects" index="02">
        <div className="mb-16 max-w-2xl">
          <SectionHeading>Here are some of my past projects.</SectionHeading>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Each one covers the objective, the constraints, the context, the lessons learned, and
            images of the process.
          </p>
        </div>

        <ProjectGrid items={past} startIndex={current.length} />
      </Section>
    </>
  )
}
