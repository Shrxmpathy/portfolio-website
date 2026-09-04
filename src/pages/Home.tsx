import { ArrowRight, FileText, Download, Mail } from 'lucide-react'
import Hero from '../components/Hero'
import ProjectGrid from '../components/ProjectGrid'
import ProjectsBanner from '../components/ProjectsBanner'
import Section from '../components/ui/Section'
import { ResumeLink } from '../components/ResumeViewer'
import { LinkedinMark } from '../components/ui/BrandIcons'
import ContactLink from '../components/ui/ContactLink'
import { profile, contact } from '../data/portfolio'
import { href } from '../lib/router'

/**
 * Short positioning strip between the banner and the work. The banner carries
 * the name; this says what he actually does. Delete this block if you would
 * rather the projects start immediately.
 */
function Intro() {
  return (
    <section className="border-t border-rule bg-paper-deep">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:gap-14">
        {/* The banner already carries the headline — this adds the detail. */}
        <p className="max-w-xl leading-relaxed text-ink-soft lg:col-span-7">{profile.supporting}</p>

        <div className="no-print flex flex-wrap content-start items-start gap-3 lg:col-span-5">
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
            Download Résumé
          </a>
          <ContactLink
            value={contact.email}
            kind="email"
            className="inline-flex items-center gap-2 border border-rule-strong px-5 py-2.5 text-sm transition-colors hover:border-ink"
          >
            <Mail aria-hidden size={15} />
            Email Me
          </ContactLink>
          <ContactLink
            value={contact.linkedin}
            className="inline-flex items-center gap-2 border border-rule-strong px-5 py-2.5 text-sm transition-colors hover:border-ink"
          >
            <LinkedinMark size={16} />
            LinkedIn
          </ContactLink>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />

      <ProjectsBanner />

      <Section>
        <div>
          <ProjectGrid />

          <a
            href={href('/projects')}
            className="mt-14 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            All projects
            <ArrowRight aria-hidden size={15} />
          </a>
        </div>
      </Section>
    </>
  )
}
