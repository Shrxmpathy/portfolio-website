import { ShieldAlert } from 'lucide-react'
import Txt from './Txt'

/** Publication / confidentiality reminders. Hidden when printing. */
export default function Note({ title = 'Before publishing', items }: { title?: string; items: string[] }) {
  return (
    <aside className="no-print border-l-2 border-accent/40 bg-accent/4 py-3 pl-4">
      <p className="label mb-2 flex items-center gap-2 text-accent">
        <ShieldAlert aria-hidden size={13} strokeWidth={2} />
        {title}
      </p>
      <ul className="space-y-1.5 text-sm leading-relaxed text-ink-soft">
        {items.map((item) => (
          <li key={item}>
            <Txt>{item}</Txt>
          </li>
        ))}
      </ul>
    </aside>
  )
}
