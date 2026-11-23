import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X, ZoomIn, ZoomOut, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { CINEMATIC_EASE } from './MotionPrimitives';

export interface LightboxItem {
  title: string;
  subtitle?: string;
  imagePath: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  kind?: string;
}

interface CertificateModalProps {
  item: LightboxItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export function CertificateModal({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}: CertificateModalProps) {
  const [zoomed, setZoomed] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    setZoomed(false);
    setImgError(false);
  }, [item?.imagePath]);

  useEffect(() => {
    if (!item) return;
    dialogRef.current?.focus({ preventScroll: true });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#040507]/90 p-4 sm:p-6 md:p-10 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.25, ease: CINEMATIC_EASE }}
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-white/[0.12] bg-[#11141D] shadow-2xl focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] px-5 py-4 sm:px-6">
              <div className="min-w-0">
                {(item.kind || item.subtitle) && (
                  <p className="font-mono text-xs font-medium text-[#38BDF8]">
                    {[item.kind, item.subtitle].filter(Boolean).join(' · ')}
                  </p>
                )}
                <h3 className="mt-1 text-base font-semibold text-[#F4F4F5] sm:text-lg">
                  {item.title}
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#94A3B8] tabular-nums">
                  {item.issueDate && <span>Issued: {item.issueDate}</span>}
                  {item.expiryDate && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{item.expiryDate}</span>
                    </>
                  )}
                  {item.credentialId && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-[#E2E8F0]">ID: {item.credentialId}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  className="btn-tactile inline-flex h-10 items-center gap-1.5 rounded-md border border-white/[0.12] bg-[#0A0C12] px-3 text-xs font-medium text-[#F4F4F5] hover:border-[#38BDF8]/50 hover:text-[#38BDF8]"
                  aria-label={zoomed ? 'Reset zoom' : 'Zoom in'}
                >
                  {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                  <span className="hidden sm:inline">{zoomed ? 'Fit' : 'Zoom'}</span>
                </button>

                {item.verificationUrl && (
                  <a
                    href={item.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile inline-flex h-10 items-center gap-1.5 rounded-md bg-[#38BDF8] px-3 text-xs font-semibold text-[#08090D] hover:bg-[#7DD3FC] whitespace-nowrap"
                  >
                    <span>Verify</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="btn-tactile inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/[0.12] bg-[#0A0C12] text-[#F4F4F5] hover:border-white/30 hover:bg-[#161A26]"
                  aria-label="Close document preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Document Viewport with smooth image switching */}
            <div className="relative flex-1 overflow-auto bg-[#08090D] p-4 sm:p-8">
              <div className="flex min-h-full items-center justify-center">
                <AnimatePresence mode="wait">
                  {!imgError ? (
                    <motion.img
                      key={item.imagePath}
                      src={item.imagePath}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      onClick={() => setZoomed((z) => !z)}
                      initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
                      transition={{ duration: 0.2, ease: CINEMATIC_EASE }}
                      className={`rounded-md border border-white/[0.12] bg-white shadow-2xl transition-all duration-200 ${
                        zoomed
                          ? 'w-[140%] max-w-none cursor-zoom-out sm:w-[130%]'
                          : 'max-h-[68vh] w-auto max-w-full cursor-zoom-in object-contain'
                      }`}
                    />
                  ) : (
                    <motion.div
                      key="img-error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-lg border border-white/[0.1] bg-[#11141D] p-8 text-center"
                    >
                      <p className="text-sm font-medium text-[#F4F4F5]">{item.title}</p>
                      <p className="mt-1 text-xs text-[#94A3B8]">
                        Document preview could not be loaded.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Optional Prev/Next Footer */}
            {(hasPrev || hasNext) && (
              <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#11141D] px-5 py-3 text-xs text-[#94A3B8]">
                <button
                  type="button"
                  disabled={!hasPrev}
                  onClick={onPrev}
                  className="btn-tactile inline-flex h-9 items-center gap-1.5 rounded-md border border-white/[0.12] bg-[#0A0C12] px-3 font-medium text-[#F4F4F5] hover:border-[#38BDF8]/45 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
                <span className="hidden font-mono text-[11px] sm:inline">
                  Use Left / Right arrow keys or Esc to close
                </span>
                <button
                  type="button"
                  disabled={!hasNext}
                  onClick={onNext}
                  className="btn-tactile inline-flex h-9 items-center gap-1.5 rounded-md border border-white/[0.12] bg-[#0A0C12] px-3 font-medium text-[#F4F4F5] hover:border-[#38BDF8]/45 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
