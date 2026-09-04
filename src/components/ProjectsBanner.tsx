import { useEffect, useState, type CSSProperties } from 'react'
import { projectsBanner } from '../data/portfolio'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Full-bleed video band heading the projects section. The video is decorative
 * here — the heading carries the meaning — so under reduced motion it falls
 * back to the poster still rather than showing controls.
 */
export default function ProjectsBanner() {
  const [failed, setFailed] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const showVideo = Boolean(projectsBanner.src) && !failed && !reducedMotion

  const media = showVideo ? (
    <video
      src={projectsBanner.src ?? undefined}
      poster={projectsBanner.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={projectsBanner.alt}
      onError={() => setFailed(true)}
      className="h-[115%] w-auto max-w-none"
    />
  ) : (
    <img src={projectsBanner.poster} alt={projectsBanner.alt} className="h-[115%] w-auto max-w-none" />
  )

  return (
    <section className="parallax-frame relative w-full border-y border-rule">
      {/* No overflow-hidden on the section: it must stay measurable against
          the page scroller for its named view timeline. The band below clips. */}
      <div className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden bg-ink py-20 sm:min-h-[560px] lg:min-h-[760px]">
        {/*
          The clip keeps its OWN aspect ratio rather than being stretched to the
          band's width. That is the whole point: object-cover was upscaling it
          1.3x to fill the width and throwing away 40% of the frame vertically.
          Sized by height instead, nothing is cropped horizontally at all.

          At 115% of the band height roughly 87% of the frame is on screen at
          any moment, and the spare 15% is the vertical overflow the scroll pans
          through — about 114px of travel.

          items-end hangs it from the bottom, so it opens on the stage, slide
          and hand and rises from there. Both pan endpoints keep the band
          covered vertically; the band is bg-ink, so the narrow strips either
          side of the clip read as intentional letterboxing.
        */}
        <div
          className="parallax-layer absolute inset-0 flex items-end justify-center will-change-transform"
          style={{ '--parallax-from': '0%', '--parallax-to': '15%' } as CSSProperties}
        >
          {media}
        </div>

        {/* Scrim so the heading stays legible over the footage. */}
        <div aria-hidden className="absolute inset-0 bg-ink/50" />

        <div className="relative px-6 text-center sm:px-10">
          <h2 className="font-display text-5xl font-bold tracking-tight text-paper uppercase sm:text-7xl lg:text-8xl">
            {projectsBanner.title}
          </h2>
          <div aria-hidden className="mx-auto mt-6 h-px w-24 bg-accent" />
        </div>
      </div>
    </section>
  )
}
