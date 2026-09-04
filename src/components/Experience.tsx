import { organizations, research, type Organization } from '../data/portfolio'
import Section from './ui/Section'
import Txt from './ui/Txt'
import Note from './ui/Note'
import Gallery from './ui/Gallery'

/**
 * One timeline covering the research post and the organizations, so the rail
 * runs from the lab role at the top through to the earliest robotics work.
 *
 * The research entry is reshaped into the same structure as an organization so
 * everything on the rail renders identically.
 */
const researchEntry: Organization = {
  name: `${research.lab} (${research.shortName})`,
  role: research.role,
  dates: research.dates,
  description: research.area,
  body: research.body,
  details: [{ label: 'University', value: research.university }],
  images: [],
}

const entries: Organization[] = [researchEntry, ...organizations]

export default function Experience() {
  return (
    <Section id="experience" label="Experience" index="02">
      {/* `timeline` names the scroll timeline that the fill animates against. */}
      <div className="timeline relative pl-8 sm:pl-12">
        {/* Track: drawn the full height of the section in a light tone. */}
        <span aria-hidden className="absolute top-2 bottom-2 left-0 w-px bg-rule" />
        {/* Fill: grows downward as the section is scrolled through. See index.css. */}
        <span aria-hidden className="timeline-fill absolute top-2 bottom-2 left-0 w-px bg-accent" />

        <div className="space-y-20">
          {entries.map((entry) => (
            <article key={entry.name} className="relative">
              {/* Marker sits on the rail, level with the entry's date. */}
              <span
                aria-hidden
                className="absolute top-1.5 -left-8 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-accent bg-paper sm:-left-12"
              />

              <p className="label text-accent">
                <Txt>{entry.dates}</Txt>
              </p>

              <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl leading-snug text-balance sm:text-3xl">
                      {entry.name}
                    </h3>
                    <span className="label">{entry.role}</span>
                  </div>

                  <p className="mt-5 border-l-2 border-rule-strong pl-4 text-ink-soft italic">
                    {entry.description}
                  </p>
                  {entry.body && <p className="mt-6 leading-relaxed text-ink-soft">{entry.body}</p>}

                  {entry.notes && (
                    <div className="mt-8">
                      <Note items={entry.notes} />
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5">
                  <dl className="border-t border-rule">
                    {entry.details.map((detail) => (
                      <div
                        key={detail.label}
                        className="grid grid-cols-5 gap-4 border-b border-rule py-2.5 text-sm"
                      >
                        <dt className="label col-span-2 pt-0.5">{detail.label}</dt>
                        <dd className="col-span-3 text-ink-soft">
                          <Txt>{detail.value}</Txt>
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {entry.images.length > 0 && <Gallery images={entry.images} className="mt-8" />}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
