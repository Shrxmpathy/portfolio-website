import { FileText, Download } from 'lucide-react'
import { contact, profile } from '../data/portfolio'
import Section, { SectionHeading } from './ui/Section'
import { ResumeLink } from './ResumeViewer'
import { LinkedinMark } from './ui/BrandIcons'
import ContactLink from './ui/ContactLink'

export default function Resume() {
  return (
    <Section id="resume" label="Résumé" index="01">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading as="h1">Résumé</SectionHeading>
          <p className="mt-5 max-w-lg leading-relaxed text-ink-soft">
            A one-page summary of my coursework, projects, research, and organization involvement.
            Happy to send a version tailored to a specific role or lab.
          </p>

          <div className="no-print mt-8 flex flex-wrap gap-3">
            <ResumeLink className="inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:bg-accent">
              <FileText aria-hidden size={15} />
              View Résumé
            </ResumeLink>
            <a
              href={contact.resume}
              download
              className="inline-flex items-center gap-2 border border-ink px-5 py-2.5 text-sm transition-colors hover:bg-ink hover:text-paper"
            >
              <Download aria-hidden size={15} />
              Download PDF
            </a>
          </div>
        </div>

        <dl className="lg:col-span-5 lg:col-start-8">
          <div className="flex justify-between gap-6 border-b border-rule py-3 text-sm">
            <dt className="label pt-0.5">Degree</dt>
            {/* Degree and minor stacked rather than run together on one line. */}
            <dd className="text-right text-ink-soft">
              <span className="block">{profile.degree}</span>
              <span className="block">{profile.minor}</span>
            </dd>
          </div>
          {[
            { label: 'Institution', value: profile.university },
            { label: 'Standing', value: profile.standing },
          ].map((row) => (
            <div key={row.label} className="flex justify-between gap-6 border-b border-rule py-3 text-sm">
              <dt className="label pt-0.5">{row.label}</dt>
              <dd className="text-right text-ink-soft">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/*
        The résumé itself, embedded. Browsers render PDFs in an iframe on
        desktop; on small screens they often refuse and show a blank frame, so
        it is hidden below `md` and the buttons above carry the load there.
      */}
      <div className="no-print mt-14 hidden border border-rule bg-surface md:block">
        <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
          <p className="label">Résumé</p>
          <div className="flex items-center gap-1">
            <a
              href={contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 text-xs text-ink-soft hover:text-accent"
            >
              Open in new tab
            </a>
            <a
              href={contact.resume}
              download
              className="px-2.5 py-1.5 text-xs text-ink-soft hover:text-accent"
            >
              Download
            </a>
          </div>
        </div>
        <iframe
          src={`${contact.resume}#view=FitH`}
          title={`Résumé, ${profile.name}`}
          className="h-[900px] w-full bg-surface"
        />
      </div>

      <div className="no-print mt-14 border-t border-rule pt-8">
        <p className="mb-4 text-sm text-ink-soft">
          My LinkedIn carries the same history, plus anything added since this PDF was last updated.
        </p>
        <ContactLink
          value={contact.linkedin}
          className="inline-flex items-center gap-2 border border-ink px-5 py-2.5 text-sm transition-colors hover:bg-ink hover:text-paper"
        >
          <LinkedinMark size={16} />
          View LinkedIn Profile
        </ContactLink>
      </div>
    </Section>
  )
}
