import { skillGroups, certifications } from '../data/portfolio'
import Section from './ui/Section'

export default function Skills() {
  return (
    <Section id="skills" label="Technical Skills" index="04">
      <div>
        <p className="mb-12 max-w-2xl leading-relaxed text-ink-soft">
          Everything below is something I have actually used. Proficiency levels are deliberately
          omitted. I would rather talk through where I used a tool than assign myself a rating.
        </p>

        <div className="grid gap-x-12 gap-y-10 border-t border-rule pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="label mb-4 text-ink">{group.title}</h3>
              <ul className="space-y-2 text-sm text-ink-soft">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 border-t border-rule pt-10 lg:grid-cols-12">
          <h3 className="label text-ink lg:col-span-3">Certifications</h3>
          <ul className="lg:col-span-9">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-3 first:border-t"
              >
                <span className="text-sm">{cert.name}</span>
                <span className="label">
                  {cert.issuer}
                  {cert.year && ` · ${cert.year}`}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </Section>
  )
}
