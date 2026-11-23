import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, UserCheck, ImageOff } from 'lucide-react';
import { PhotoItem } from '../data/gallery';
import { CINEMATIC_EASE } from './MotionPrimitives';

interface PhotoLightboxModalProps {
  photo: PhotoItem | null;
  collection: PhotoItem[];
  onClose: () => void;
  onSelectPhoto: (photo: PhotoItem) => void;
}

export function PhotoLightboxModal({
  photo,
  collection,
  onClose,
  onSelectPhoto,
}: PhotoLightboxModalProps) {
  const [imgError, setImgError] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const currentIndex = photo ? collection.findIndex((item) => item.id === photo.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < collection.length - 1;

  useEffect(() => {
    setImgError(false);
  }, [photo?.id]);

  useEffect(() => {
    if (!photo) return;
    dialogRef.current?.focus({ preventScroll: true });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onSelectPhoto(collection[currentIndex - 1]);
      } else if (e.key === 'ArrowRight' && hasNext) {
        onSelectPhoto(collection[currentIndex + 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, collection, currentIndex, hasPrev, hasNext, onClose, onSelectPhoto]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#040507]/94 p-3 sm:p-6 md:p-8 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={photo.event || photo.title}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.26, ease: CINEMATIC_EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0B0D13] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.85)] focus:outline-none"
          >
            {/* Top Bar */}
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] bg-[#0E111A]/90 px-4 py-3.5 sm:px-6 sm:py-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#38BDF8]">
                  <span>{photo.category}</span>
                  {collection.length > 1 && currentIndex >= 0 && (
                    <>
                      <span aria-hidden="true" className="text-white/25">·</span>
                      <span className="tabular-nums text-[#94A3B8]">
                        {String(currentIndex + 1).padStart(2, '0')} /{' '}
                        {String(collection.length).padStart(2, '0')}
                      </span>
                    </>
                  )}
                </div>

                <h3 className="mt-1 truncate font-display text-base font-bold text-[#F4F4F5] sm:text-xl">
                  {photo.event || photo.title}
                </h3>

                {(photo.role || photo.date || photo.location) && (
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#94A3B8]">
                    {photo.role && (
                      <span className="inline-flex items-center gap-1.5 text-[#E2E8F0]">
                        <UserCheck className="h-3.5 w-3.5 text-[#38BDF8]" />
                        <span>{photo.role}</span>
                      </span>
                    )}
                    {photo.date && (
                      <span className="inline-flex items-center gap-1.5 tabular-nums">
                        <Calendar className="h-3.5 w-3.5 text-[#64748B]" />
                        <span>{photo.date}</span>
                      </span>
                    )}
                    {photo.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#64748B]" />
                        <span>{photo.location}</span>
                      </span>
                    )}
                  </div>
                )}

                {photo.caption && (
                  <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-[#94A3B8] sm:text-sm">
                    {photo.caption}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="btn-tactile inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/[0.12] bg-[#11141D] text-[#F4F4F5] hover:border-[#38BDF8]/50 hover:text-[#38BDF8]"
                aria-label="Close photo viewer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Uncropped Full-Quality Image Stage */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#06070B] px-3 py-4 sm:px-14 sm:py-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.08)_0%,transparent_65%)]"
              />

              {hasPrev && (
                <button
                  type="button"
                  onClick={() => onSelectPhoto(collection[currentIndex - 1])}
                  aria-label="Previous photograph"
                  className="btn-tactile absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.14] bg-[#0B0D13]/85 text-[#F4F4F5] backdrop-blur-md hover:border-[#38BDF8]/60 hover:text-[#38BDF8] sm:inline-flex"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              {hasNext && (
                <button
                  type="button"
                  onClick={() => onSelectPhoto(collection[currentIndex + 1])}
                  aria-label="Next photograph"
                  className="btn-tactile absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.14] bg-[#0B0D13]/85 text-[#F4F4F5] backdrop-blur-md hover:border-[#38BDF8]/60 hover:text-[#38BDF8] sm:inline-flex"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}

              <AnimatePresence mode="wait">
                {!imgError ? (
                  <motion.img
                    key={photo.id}
                    src={photo.src}
                    alt={photo.alt}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
                    transition={{ duration: 0.22, ease: CINEMATIC_EASE }}
                    className="relative z-10 max-h-[68vh] w-auto max-w-full rounded-lg border border-white/[0.1] object-contain shadow-[0_24px_60px_rgba(0,0,0,0.75)]"
                  />
                ) : (
                  <motion.div
                    key="photo-error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative z-10 flex flex-col items-center rounded-xl border border-white/[0.1] bg-[#11141D] px-8 py-10 text-center"
                  >
                    <ImageOff className="h-7 w-7 text-[#64748B]" />
                    <p className="mt-3 text-sm font-medium text-[#F4F4F5]">{photo.title}</p>
                    <p className="mt-1 text-xs text-[#94A3B8]">
                      Photograph could not be loaded.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Controls */}
            <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#0E111A]/95 px-4 py-3 text-xs text-[#94A3B8] sm:px-6">
              <button
                type="button"
                disabled={!hasPrev}
                onClick={() => hasPrev && onSelectPhoto(collection[currentIndex - 1])}
                className="btn-tactile inline-flex h-10 items-center gap-1.5 rounded-md border border-white/[0.12] bg-[#11141D] px-3.5 font-medium text-[#F4F4F5] hover:border-[#38BDF8]/50 hover:text-[#38BDF8] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <span className="hidden font-mono text-[11px] text-[#64748B] md:inline">
                Arrow keys to navigate · Esc to close
              </span>

              <button
                type="button"
                disabled={!hasNext}
                onClick={() => hasNext && onSelectPhoto(collection[currentIndex + 1])}
                className="btn-tactile inline-flex h-10 items-center gap-1.5 rounded-md border border-white/[0.12] bg-[#11141D] px-3.5 font-medium text-[#F4F4F5] hover:border-[#38BDF8]/50 hover:text-[#38BDF8] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
