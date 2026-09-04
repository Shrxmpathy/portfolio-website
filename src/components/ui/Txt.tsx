import { PLACEHOLDER } from '../../lib/placeholders'

/**
 * Renders text from portfolio.ts, turning any [[bracketed]] span into a
 * visible chip so unfinished content is obvious on the page.
 */
export default function Txt({ children }: { children: string }) {
  const parts = children.split(PLACEHOLDER)

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            className="mx-0.5 inline border border-dashed border-accent-soft bg-accent/6 px-1.5 py-px align-baseline font-mono text-[0.7em] tracking-wide text-accent"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}
