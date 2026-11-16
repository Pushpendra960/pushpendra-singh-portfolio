import { useEffect, useRef, useState } from 'react';
import { X, ZoomIn, ZoomOut, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

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

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/85 p-4 sm:p-6 md:p-10 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] shadow-2xl focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#E5E2DB] px-5 py-4 sm:px-6">
          <div className="min-w-0">
            {(item.kind || item.subtitle) && (
              <p className="text-xs font-medium text-[#53677D]">
                {[item.kind, item.subtitle].filter(Boolean).join(' · ')}
              </p>
            )}
            <h3 className="mt-1 text-base font-semibold text-[#242424] sm:text-lg">
              {item.title}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6B6B6B] tabular-nums">
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
                  <span className="font-mono">ID: {item.credentialId}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              className="inline-flex h-10 items-center gap-1.5 rounded-md border border-[#E5E2DB] bg-[#F7F6F2] px-3 text-xs font-medium text-[#242424] transition-colors hover:bg-[#ECEAE3]"
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
                className="inline-flex h-10 items-center gap-1.5 rounded-md border border-[#53677D] bg-[#53677D] px-3 text-xs font-medium text-white transition-colors hover:bg-[#435568] whitespace-nowrap"
              >
                <span>Verify</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#E5E2DB] bg-[#FFFFFF] text-[#242424] transition-colors hover:bg-[#F7F6F2]"
              aria-label="Close document preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Document Viewport */}
        <div className="relative flex-1 overflow-auto bg-[#F7F6F2] p-4 sm:p-8">
          <div className="flex min-h-full items-center justify-center">
            {!imgError ? (
              <img
                src={item.imagePath}
                alt={item.title}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                onClick={() => setZoomed((z) => !z)}
                className={`rounded border border-[#E5E2DB] bg-white shadow-sm transition-transform duration-200 ${
                  zoomed
                    ? 'w-[140%] max-w-none cursor-zoom-out sm:w-[130%]'
                    : 'max-h-[68vh] w-auto max-w-full cursor-zoom-in object-contain'
                }`}
              />
            ) : (
              <div className="rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-8 text-center">
                <p className="text-sm font-medium text-[#242424]">{item.title}</p>
                <p className="mt-1 text-xs text-[#6B6B6B]">
                  Document preview could not be loaded.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Optional Prev/Next Footer */}
        {(hasPrev || hasNext) && (
          <div className="flex items-center justify-between border-t border-[#E5E2DB] bg-[#FFFFFF] px-5 py-3 text-xs text-[#6B6B6B]">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={onPrev}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#E5E2DB] px-3 font-medium text-[#242424] transition-colors hover:bg-[#F7F6F2] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>
            <span className="hidden sm:inline">Use Left / Right arrow keys or Esc to close</span>
            <button
              type="button"
              disabled={!hasNext}
              onClick={onNext}
              className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#E5E2DB] px-3 font-medium text-[#242424] transition-colors hover:bg-[#F7F6F2] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
