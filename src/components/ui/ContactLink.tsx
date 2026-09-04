import type { ReactNode } from 'react'
import { hasPlaceholder } from '../../lib/placeholders'
import Txt from './Txt'

/**
 * Renders a real link once the value in portfolio.ts is filled in.
 * While it is still a placeholder, shows the reminder instead of a dead link.
 */
export default function ContactLink({
  value,
  kind = 'url',
  className = '',
  children,
}: {
  value: string
  kind?: 'url' | 'email'
  className?: string
  children: ReactNode
}) {
  if (hasPlaceholder(value)) {
    return (
      <span className={`inline-flex items-center gap-2 text-ink-faint ${className}`}>
        {children}
        <Txt>{value}</Txt>
      </span>
    )
  }

  const href = kind === 'email' ? `mailto:${value}` : value

  return (
    <a
      href={href}
      {...(kind === 'url' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={className}
    >
      {children}
    </a>
  )
}
