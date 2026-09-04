import { profile, contact } from '../data/portfolio'
import { LinkedinMark } from './ui/BrandIcons'
import ContactLink from './ui/ContactLink'

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-baseline sm:justify-between sm:px-10">
        <p className="font-display text-lg">{profile.name}</p>
        <p className="max-w-md text-sm text-ink-faint">{profile.positioning}</p>

        {/* Sized to sit level with the name beside it. */}
        <ContactLink
          value={contact.linkedin}
          className="inline-flex items-center gap-2 text-lg text-ink transition-colors hover:text-accent"
        >
          <LinkedinMark size={18} />
          LinkedIn
        </ContactLink>

        <p className="label">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  )
}
