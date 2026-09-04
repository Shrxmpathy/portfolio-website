import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { X, ExternalLink, Download } from 'lucide-react'
import { contact, profile } from '../data/portfolio'

/**
 * Opens the résumé in an overlay on the page instead of a new tab, so there is
 * an obvious way back to the site. Modifier-clicks and mobile still get a real
 * new tab — mobile browsers render PDFs in iframes unreliably.
 */
const ResumeContext = createContext<() => void>(() => {})

function useResumeViewer() {
  return useContext(ResumeContext)
}

function Overlay({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Résumé, ${profile.name}`}
      className="no-print fixed inset-0 z-50 flex flex-col bg-ink/90 p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col border border-rule-strong bg-paper"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-2.5">
          <p className="label">Résumé, {profile.name}</p>

          <div className="flex items-center gap-1">
            <a
              href={contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-ink-soft hover:text-accent"
            >
              <ExternalLink aria-hidden size={13} />
              <span className="hidden sm:inline">New tab</span>
            </a>
            <a
              href={contact.resume}
              download
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-ink-soft hover:text-accent"
            >
              <Download aria-hidden size={13} />
              <span className="hidden sm:inline">Download</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="ml-1 p-1.5 text-ink-soft hover:text-accent"
              aria-label="Close résumé"
            >
              <X aria-hidden size={18} />
            </button>
          </div>
        </div>

        <iframe
          src={contact.resume}
          title={`Résumé, ${profile.name}`}
          className="min-h-0 w-full flex-1 bg-surface"
        />
      </div>
    </div>
  )
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const openResume = useCallback(() => {
    if (window.innerWidth < 768) {
      window.open(contact.resume, '_blank', 'noopener,noreferrer')
      return
    }
    setOpen(true)
  }, [])

  return (
    <ResumeContext.Provider value={openResume}>
      {children}
      {open && <Overlay onClose={() => setOpen(false)} />}
    </ResumeContext.Provider>
  )
}

/**
 * Stays a real anchor so right-click, middle-click and ctrl/cmd-click still
 * open the PDF directly. A plain left-click opens the overlay instead.
 */
export function ResumeLink({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const openResume = useResumeViewer()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    openResume()
  }

  return (
    <a href={contact.resume} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
