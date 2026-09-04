import { useCallback, useEffect, useState } from 'react'
import { ImagePlus, X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { ImageSlot } from '../../data/portfolio'
import Txt from './Txt'

function Frame({ image, onOpen }: { image: ImageSlot; onOpen?: () => void }) {
  // A src that 404s (file not saved yet) falls back to the placeholder frame
  // rather than showing a broken-image icon.
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(image.src || image.video) && !failed
  // Wide items set their own height from the media, so no object-fit is needed.
  const objectFit = image.wide
    ? 'h-auto w-full'
    : `h-full w-full ${image.fit === 'contain' ? 'object-contain' : 'object-cover'}`

  const body = image.video && !failed ? (
    // Clips play muted and looped in place, like the banner. Controls are
    // offered too, since unlike the banner this one is content, not decoration.
    <video
      src={image.video}
      poster={image.poster}
      autoPlay
      muted
      loop
      playsInline
      controls
      preload="metadata"
      aria-label={image.alt}
      onError={() => setFailed(true)}
      className={objectFit}
    />
  ) : showImage ? (
    <img
      src={image.src ?? ''}
      alt={image.alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={objectFit}
    />
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-5 py-10 text-center">
      <ImagePlus aria-hidden size={18} strokeWidth={1.5} className="text-ink-faint" />
      <span className="font-mono text-xs leading-relaxed text-ink-faint">{image.placeholder}</span>
    </div>
  )

  return (
    // `wide` items break out to the full grid width and keep their own aspect
    // ratio rather than being forced into a 4:3 thumbnail. That suits long
    // plots and screen recordings, which are unreadable at thumbnail size and
    // would be letterboxed by any fixed frame.
    <figure className={`group ${image.wide ? 'col-span-full' : ''}`}>
      <div
        className={`relative overflow-hidden bg-surface ${image.wide ? '' : 'aspect-4/3'} ${
          showImage ? 'border border-rule' : 'border border-dashed border-rule-strong grid-paper'
        }`}
      >
        {/* Drafting corner marks */}
        <span aria-hidden className="absolute top-2 left-2 h-2.5 w-2.5 border-t border-l border-rule-strong" />
        <span aria-hidden className="absolute right-2 bottom-2 h-2.5 w-2.5 border-r border-b border-rule-strong" />

        {/* Videos are not wrapped: the button would swallow their controls. */}
        {showImage && !image.video ? (
          <button
            type="button"
            onClick={onOpen}
            className="block h-full w-full cursor-zoom-in"
            aria-label={`Expand image: ${image.alt}`}
          >
            {body}
          </button>
        ) : (
          body
        )}
      </div>
      <figcaption className="mt-2.5 text-xs leading-relaxed text-ink-faint">
        <Txt>{image.caption}</Txt>
      </figcaption>
    </figure>
  )
}

function Lightbox({
  images,
  index,
  onClose,
  onStep,
}: {
  images: ImageSlot[]
  index: number
  onClose: () => void
  onStep: (delta: number) => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onStep])

  const image = images[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="no-print fixed inset-0 z-50 flex flex-col bg-ink/92 p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="p-2 text-paper/70 hover:text-paper"
          aria-label="Close image viewer"
        >
          <X aria-hidden size={22} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center gap-3" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <button
            type="button"
            onClick={() => onStep(-1)}
            className="shrink-0 p-2 text-paper/70 hover:text-paper"
            aria-label="Previous image"
          >
            <ChevronLeft aria-hidden size={24} />
          </button>
        )}

        <figure className="flex min-h-0 flex-1 flex-col items-center gap-4">
          <img src={image.src ?? ''} alt={image.alt} className="min-h-0 flex-1 object-contain" />
          <figcaption className="max-w-2xl text-center text-sm text-paper/70">
            <Txt>{image.caption}</Txt>
          </figcaption>
        </figure>

        {images.length > 1 && (
          <button
            type="button"
            onClick={() => onStep(1)}
            className="shrink-0 p-2 text-paper/70 hover:text-paper"
            aria-label="Next image"
          >
            <ChevronRight aria-hidden size={24} />
          </button>
        )}
      </div>
    </div>
  )
}

export default function Gallery({ images, className = '' }: { images: ImageSlot[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const expandable = images.filter((i) => i.src)

  const step = useCallback(
    (delta: number) =>
      setOpen((current) =>
        current === null ? null : (current + delta + expandable.length) % expandable.length,
      ),
    [expandable.length],
  )

  return (
    <>
      <div className={className}>
        {images.map((image) => (
          <Frame
            key={image.placeholder}
            image={image}
            onOpen={() => setOpen(expandable.indexOf(image))}
          />
        ))}
      </div>

      {open !== null && (
        <Lightbox images={expandable} index={open} onClose={() => setOpen(null)} onStep={step} />
      )}
    </>
  )
}
