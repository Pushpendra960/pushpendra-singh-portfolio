import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Maximize2, MapPin, ImageOff } from 'lucide-react';
import {
  EVENT_EXPERIENCE_PHOTOS,
  EVENT_PHOTO_FILTERS,
  EventFilterCategory,
  PhotoItem,
} from '../data/gallery';
import {
  CINEMATIC_EASE,
  InteractiveTiltCard,
  SceneChapter,
  SectionHeader,
} from './MotionPrimitives';

interface BeyondTheCodeProps {
  onOpenPhoto: (photo: PhotoItem, collection: PhotoItem[]) => void;
}

function PhotoFrameCard({
  photo,
  index,
  onClick,
}: {
  photo: PhotoItem;
  index: number;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{
        duration: 0.56,
        delay: Math.min((index % 5) * 0.065, 0.28),
        ease: CINEMATIC_EASE,
      }}
      className={`${photo.spanClass} ${photo.depthOffsetClass}`}
    >
      <div
        style={!reduced ? { animationDelay: photo.floatDelay } : undefined}
        className={`hover-pause h-full ${!reduced ? photo.floatClass : ''}`}
      >
        <div
          style={!reduced ? { transform: `rotate(${photo.tiltDeg}deg)` } : undefined}
          className="h-full transition-transform duration-500 ease-out hover:rotate-0 focus-within:rotate-0"
        >
          <InteractiveTiltCard
            tiltStrength={4.4}
            spotlightColor="rgba(56, 189, 248, 0.16)"
            className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.09] bg-[#11141D] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] hover:border-[#38BDF8]/45 hover:shadow-[0_28px_64px_-18px_rgba(56,189,248,0.22)]"
          >
            <button
              type="button"
              onClick={onClick}
              aria-label={`Open ${photo.event || photo.title} photograph in fullscreen viewer`}
              className="relative block h-full w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-inset"
            >
              <div className={`relative w-full overflow-hidden bg-[#08090D] ${photo.aspectClass}`}>
                {!imgError ? (
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    style={{ objectPosition: photo.objectPosition }}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  />
                ) : (
                  <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.08),transparent_70%)] p-6 text-center">
                    <ImageOff className="h-6 w-6 text-[#64748B]" />
                    <p className="mt-2.5 text-sm font-medium text-[#F4F4F5]">{photo.title}</p>
                    <p className="mt-1 font-mono text-xs text-[#94A3B8]">{photo.category}</p>
                  </div>
                )}

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60 transition-opacity duration-300 group-hover:via-[#38BDF8]/70 group-hover:opacity-100"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070C]/95 via-[#05070C]/35 to-transparent opacity-85 transition-opacity duration-300 md:opacity-55 md:group-hover:opacity-95 md:group-focus-visible:opacity-95"
                />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3.5 top-3.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.14] bg-[#08090D]/80 text-[#F4F4F5] opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:border-[#38BDF8]/55 group-hover:text-[#38BDF8] md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100"
                >
                  <Maximize2 className="h-4 w-4" />
                </span>

                <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 transition-transform duration-300 ease-out md:translate-y-1.5 md:group-hover:translate-y-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[11px] font-medium text-[#38BDF8]">
                    <span>{photo.category}</span>
                    {photo.date && (
                      <>
                        <span aria-hidden="true" className="text-white/30">·</span>
                        <span className="tabular-nums text-[#CBD5E1]">{photo.date}</span>
                      </>
                    )}
                  </div>

                  <h3 className="mt-1 font-display text-base font-bold leading-snug text-[#F4F4F5] sm:text-lg">
                    {photo.event || photo.title}
                  </h3>

                  {(photo.role || photo.location) && (
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#CBD5E1] transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                      {photo.role && <span className="font-medium text-[#E2B76E]">{photo.role}</span>}
                      {photo.role && photo.location && (
                        <span aria-hidden="true" className="text-white/25">·</span>
                      )}
                      {photo.location && (
                        <span className="inline-flex items-center gap-1 text-[#94A3B8]">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span>{photo.location}</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </button>
          </InteractiveTiltCard>
        </div>
      </div>
    </motion.div>
  );
}

export function BeyondTheCode({ onOpenPhoto }: BeyondTheCodeProps) {
  const [activeFilter, setActiveFilter] = useState<EventFilterCategory>('All');
  const reduced = useReducedMotion();

  const filteredPhotos = useMemo(() => {
    if (activeFilter === 'All') return EVENT_EXPERIENCE_PHOTOS;
    return EVENT_EXPERIENCE_PHOTOS.filter((photo) => photo.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="beyond-the-code"
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#08090D]"
    >
      <div
        aria-hidden="true"
        className="animate-ambient-glow pointer-events-none absolute -top-32 left-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.11)_0%,rgba(56,189,248,0.02)_48%,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="animate-ambient-glow-alt pointer-events-none absolute bottom-20 right-1/5 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.08)_0%,transparent_70%)]"
      />

      <SceneChapter className="relative mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeader
          kicker="08 · Events, Hackathons & Community"
          title="Beyond the Code"
          description="Experiences, collaborations, events, and moments that are part of my journey."
          rightSlot={
            <p className="font-mono text-xs text-[#94A3B8] tabular-nums">
              {filteredPhotos.length} captured{' '}
              {filteredPhotos.length === 1 ? 'moment' : 'moments'}
            </p>
          }
        />

        <div
          role="tablist"
          aria-label="Filter event photography by category"
          className="mt-8 flex flex-wrap items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#11141D] p-1.5"
        >
          {EVENT_PHOTO_FILTERS.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(category)}
                className={`btn-tactile relative h-9 rounded-lg px-3.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive ? 'text-[#08090D]' : 'text-[#94A3B8] hover:text-[#F4F4F5]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId={reduced ? undefined : 'beyond-filter-active'}
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg bg-[#F4F4F5]"
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        <div
          key={activeFilter}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-7 lg:gap-8"
        >
          {filteredPhotos.map((photo, index) => (
            <PhotoFrameCard
              key={photo.id}
              photo={photo}
              index={index}
              onClick={() => onOpenPhoto(photo, filteredPhotos)}
            />
          ))}
        </div>
      </SceneChapter>
    </section>
  );
}
