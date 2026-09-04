import { useEffect, useState } from 'react'
import { ImagePlus } from 'lucide-react'
import { profile } from '../data/portfolio'

const VIDEO = /\.(mp4|webm|mov)$/i

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
 * The media panel keeps its own aspect ratio rather than filling the band, so
 * a portrait phone video is never cropped or stretched. The type column fills
 * the width beside it.
 */
function MediaPanel() {
  const [failed, setFailed] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  const media = profile.heroMedia
  const isVideo = Boolean(media && VIDEO.test(media))
  const show = Boolean(media) && !failed

  return (
    <div className="relative w-full max-w-[320px] border border-rule bg-surface p-2">
      {/* Drafting corner marks, matching the project image frames. */}
      <span aria-hidden className="absolute top-2 left-2 z-10 h-3 w-3 border-t border-l border-rule-strong" />
      <span aria-hidden className="absolute right-2 bottom-2 z-10 h-3 w-3 border-r border-b border-rule-strong" />

      <div className="relative aspect-9/16 w-full overflow-hidden bg-ink/5">
        {show && isVideo ? (
          <video
            src={media ?? undefined}
            poster={profile.heroPoster ?? undefined}
            // Reduced motion: no autoplay, but give the viewer controls so the
            // content is still reachable rather than silently dropped.
            autoPlay={!reducedMotion}
            controls={reducedMotion}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={profile.heroMediaAlt}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : show ? (
          <img
            src={media ?? undefined}
            alt={profile.heroMediaAlt}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid-paper flex h-full w-full flex-col items-center justify-center gap-2 px-5 text-center">
            <ImagePlus aria-hidden size={18} strokeWidth={1.5} className="text-ink-faint" />
            <span className="font-mono text-xs leading-relaxed text-ink-faint">
              Add a photo or video: set profile.heroMedia
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden border-b border-rule">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:gap-14 lg:py-20">
        {/* ------------------------------------------------------ type side */}
        <div className="lg:col-span-7">
          <p className="font-mono text-sm tracking-widest text-ink-soft uppercase sm:text-base lg:text-lg">
            {profile.heroEyebrow}
          </p>

          <h1 className="mt-3 font-display text-4xl leading-none tracking-tight text-ink sm:text-5xl lg:text-7xl">
            {profile.name}
          </h1>

          <div aria-hidden className="mt-7 flex items-center gap-2">
            <span className="h-px w-16 bg-accent" />
            <span className="h-px flex-1 bg-rule" />
          </div>

          <p className="mt-7 max-w-lg font-display text-xl leading-snug text-balance text-ink-soft sm:text-2xl">
            {profile.headline}
          </p>

          <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
            {[
              { label: 'Institution', value: profile.university },
              { label: 'Standing', value: profile.standing },
              { label: 'Graduating', value: profile.expectedGraduation },
            ].map((item) => (
              <div key={item.label}>
                <dt className="label">{item.label}</dt>
                <dd className="mt-1 text-sm text-ink-soft">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ----------------------------------------------------- media side */}
        <div className="flex justify-start lg:col-span-4 lg:col-start-9 lg:justify-end">
          <MediaPanel />
        </div>
      </div>
    </section>
  )
}
