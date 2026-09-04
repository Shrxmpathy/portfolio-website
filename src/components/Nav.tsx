import { useEffect, useState } from 'react'
import { Menu, X, Download } from 'lucide-react'
import { navLinks, profile, contact } from '../data/portfolio'
import { ResumeLink } from './ResumeViewer'
import { useRoute, isActive, href } from '../lib/router'

/**
 * Logo slot, set from profile.logo. The mark stands alone with no name beside
 * it, so the link carries the accessible name instead: screen readers still
 * announce "Christian Keough, home" even though nothing is rendered as text.
 */
function Logo() {
  return (
    <a
      href={href('/')}
      aria-label={`${profile.name}, home`}
      className="inline-flex h-20 w-fit shrink-0 items-stretch overflow-hidden border border-rule-strong transition-colors hover:border-ink"
    >
      {profile.logo ? (
        // The box takes its width from the mark, so the artwork touches all
        // four edges with no dead space. It cannot also be square: the logo is
        // roughly 1.64:1, so forcing a square would mean either stretching the
        // letterforms or cropping the c and k.
        <img src={profile.logo} alt="" className="block h-full w-auto" />
      ) : (
        // No inner border here: the square box above already provides one.
        <span
          aria-hidden
          className="font-mono text-[0.6rem] tracking-tight text-ink-faint"
          title="Logo placeholder: add profile.logo in src/data/portfolio.ts"
        >
          LOGO
        </span>
      )}
    </a>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const route = useRoute()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [route])

  return (
    <header
      className={`no-print sticky top-0 z-40 bg-paper transition-colors ${
        scrolled ? 'border-b border-rule' : 'border-b border-transparent'
      }`}
    >
      {/* Full width rather than the max-w-6xl content column, so the logo sits
          in the actual corner of the page instead of inset with the text. */}
      <div className="flex h-20 w-full items-center justify-between gap-6 px-3 sm:px-5">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(route, link.path)
            return (
              <a
                key={link.path}
                href={href(link.path)}
                aria-current={active ? 'page' : undefined}
                className={`border-b-2 pb-0.5 text-sm transition-colors ${
                  active
                    ? 'border-accent text-ink'
                    : 'border-transparent text-ink-soft hover:text-accent'
                }`}
              >
                {link.label}
              </a>
            )
          })}

          {/* Both halves use py-1.5 so the seam between them lines up exactly. */}
          <div className="flex items-stretch">
            <ResumeLink className="border border-ink px-3.5 py-1.5 text-sm transition-colors hover:bg-ink hover:text-paper">
              View Résumé
            </ResumeLink>
            <a
              href={contact.resume}
              download
              title="Download résumé (PDF)"
              aria-label="Download résumé (PDF)"
              className="flex items-center border border-l-0 border-ink px-2.5 py-1.5 transition-colors hover:bg-ink hover:text-paper"
            >
              <Download aria-hidden size={15} />
            </a>
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="p-1.5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-rule bg-paper px-3 py-4 sm:px-5 lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={href(link.path)}
                  aria-current={isActive(route, link.path) ? 'page' : undefined}
                  className={`block border-b border-rule py-3 ${
                    isActive(route, link.path) ? 'text-accent' : 'text-ink-soft'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-3">
            <ResumeLink className="inline-block border border-ink px-4 py-2 text-sm">
              View Résumé
            </ResumeLink>
            <a
              href={contact.resume}
              download
              className="inline-flex items-center gap-2 border border-rule-strong px-4 py-2 text-sm"
            >
              <Download aria-hidden size={15} />
              Download
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
