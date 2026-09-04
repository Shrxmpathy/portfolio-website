import { about, profile } from '../data/portfolio'
import Section from './ui/Section'
import Txt from './ui/Txt'

export default function About() {
  return (
    <Section id="about" label="About" index="01">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h1 className="mb-8 font-display text-3xl leading-tight sm:text-4xl">About Me</h1>
          {about.body.map((paragraph) => (
            <p key={paragraph} className="font-display text-xl leading-relaxed text-balance sm:text-2xl">
              {paragraph}
            </p>
          ))}
          <p className="mt-8 max-w-xl text-ink-soft">{profile.positioning}</p>
        </div>

        <dl className="lg:col-span-4 lg:col-start-9">
          {about.facts.map((fact) => (
            <div key={fact.label} className="flex justify-between gap-6 border-b border-rule py-3 text-sm">
              <dt className="label pt-0.5">{fact.label}</dt>
              <dd className="text-right text-ink-soft">
                <Txt>{fact.value}</Txt>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
