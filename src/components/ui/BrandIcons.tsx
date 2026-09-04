/** lucide-react v1 removed brand icons, so these two are drawn inline. */

type Props = { size?: number; className?: string }

export function GithubIcon({ size = 15, className }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M12 .5a11.5 11.5 0 0 0-3.63 22.42c.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.79.55A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

export function LinkedinIcon({ size = 15, className }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM2.75 21h4.46V9.5H2.75V21ZM9.94 9.5V21h4.45v-6.36c0-1.68.32-3.3 2.4-3.3 2.05 0 2.08 1.92 2.08 3.4V21h4.46v-7.15c0-3.87-.84-6.84-5.35-6.84-2.17 0-3.63 1.19-4.22 2.32h-.06V9.5H9.94Z" />
    </svg>
  )
}

/**
 * LinkedIn's own mark: white glyph knocked out of the brand blue tile.
 * Used where the logo should read as LinkedIn rather than as a site icon.
 */
export function LinkedinMark({ size = 16, className }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
    >
      <rect width="24" height="24" rx="3" fill="#0A66C2" />
      <path
        fill="#fff"
        d="M6.2 5.1a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5ZM4.6 19h3.2v-9.4H4.6V19Zm5.4-9.4V19h3.2v-4.9c0-1.3.25-2.55 1.85-2.55 1.58 0 1.6 1.48 1.6 2.63V19h3.2v-5.5c0-2.98-.64-5.27-4.12-5.27-1.67 0-2.79.92-3.25 1.79h-.05V9.6h-2.43Z"
      />
    </svg>
  )
}
