import { Mail, FileText, Download } from 'lucide-react'
import { contact, profile } from '../data/portfolio'
import Section, { SectionHeading } from './ui/Section'
import { LinkedinMark } from './ui/BrandIcons'
import { ResumeLink } from './ResumeViewer'
import ContactLink from './ui/ContactLink'
import Txt from './ui/Txt'

export default function Contact() {
  return (
    <Section id="contact" label="Contact" index="01">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading as="h1">I’m seeking internships and research opportunities.</SectionHeading>
          <p className="mt-6 leading-relaxed text-ink-soft">{contact.availability}</p>

          <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink-soft">
            {contact.seeking.map((area, i) => (
              <li key={area} className="flex items-center gap-4">
                {i > 0 && (
                  <span aria-hidden className="text-rule-strong">
                    ·
                  </span>
                )}
                {area}
              </li>
            ))}
          </ul>

          <div className="no-print mt-10 flex flex-wrap gap-3">
            <ContactLink
              value={contact.email}
              kind="email"
              className="inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:bg-accent"
            >
              <Mail aria-hidden size={15} />
              Email Me
            </ContactLink>
            <ResumeLink className="inline-flex items-center gap-2 border border-ink px-5 py-2.5 text-sm transition-colors hover:bg-ink hover:text-paper">
              <FileText aria-hidden size={15} />
              View Résumé
            </ResumeLink>
            <a
              href={contact.resume}
              download
              className="inline-flex items-center gap-2 border border-rule-strong px-5 py-2.5 text-sm transition-colors hover:border-ink"
            >
              <Download aria-hidden size={15} />
              Download Résumé
            </a>
            <ContactLink
              value={contact.linkedin}
              className="inline-flex items-center gap-2 border border-rule-strong px-5 py-2.5 text-sm transition-colors hover:border-ink"
            >
              <LinkedinMark size={16} />
              LinkedIn
            </ContactLink>
          </div>
        </div>

        <dl className="lg:col-span-5 lg:col-start-8">
          {[
            { label: 'Email', value: contact.email },
            { label: 'LinkedIn', value: contact.linkedin },
            { label: 'Location', value: profile.location },
            { label: 'Expected graduation', value: profile.expectedGraduation },
          ].map((row) => (
            <div key={row.label} className="grid grid-cols-5 gap-4 border-b border-rule py-3 text-sm">
              <dt className="label col-span-2 pt-0.5">{row.label}</dt>
              <dd className="col-span-3 break-words text-ink-soft">
                <Txt>{row.value}</Txt>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
