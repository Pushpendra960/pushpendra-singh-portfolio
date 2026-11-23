import { useEffect, useRef, useState } from 'react';
import { Eye, ExternalLink } from 'lucide-react';
import { CredentialItem } from '../data/certifications';

interface CertificateCardProps {
  credential: CredentialItem;
  onView: (credential: CredentialItem) => void;
}

export function CertificateCard({ credential, onView }: CertificateCardProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, [credential.imagePath]);

  return (
    <article className="card-sheen group flex h-full flex-col justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-[#11141D] transition-all duration-250 hover:-translate-y-1.5 hover:border-[#38BDF8]/50 hover:shadow-[0_18px_38px_-18px_rgba(56,189,248,0.22)]">
      <div>
        {/* Original Document Thumbnail */}
        <button
          type="button"
          onClick={() => onView(credential)}
          aria-label={`View ${credential.title}`}
          className="relative block aspect-[4/3] w-full overflow-hidden border-b border-white/[0.08] bg-[#0A0C12] p-3 text-left"
        >
          {!imgError ? (
            <div className="h-full w-full overflow-hidden rounded border border-white/[0.08] bg-white/95 p-1.5">
              <img
                ref={imgRef}
                src={credential.imagePath}
                alt={`${credential.title} — ${credential.issuer}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`h-full w-full object-contain transition-all duration-500 ease-out group-hover:scale-[1.04] ${
                  imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
                }`}
              />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded border border-white/[0.08] bg-[#11141D] p-4 text-center">
              <span className="text-xs font-medium text-[#94A3B8]">{credential.issuer}</span>
            </div>
          )}
        </button>

        {/* Metadata */}
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px]">
            <span className="font-semibold text-[#38BDF8]">{credential.category}</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="text-[#94A3B8]">{credential.kind}</span>
          </div>

          <h3 className="mt-2.5 text-base font-semibold leading-snug text-[#F4F4F5] transition-colors group-hover:text-white">
            {credential.title}
          </h3>

          <p className="mt-1.5 text-sm text-[#94A3B8]">{credential.issuer}</p>

          <dl className="mt-3 space-y-1 text-xs text-[#94A3B8] tabular-nums">
            <div>Issued: {credential.issueDate}</div>
            {credential.expiryDate && <div>{credential.expiryDate}</div>}
            {credential.credentialId && (
              <div className="font-mono text-[11px] text-[#64748B] truncate" title={credential.credentialId}>
                ID: {credential.credentialId}
              </div>
            )}
          </dl>

          {credential.note && (
            <p className="mt-2 text-[11px] leading-relaxed text-[#64748B]">{credential.note}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-2 border-t border-white/[0.08] px-5 py-3.5">
        <button
          type="button"
          onClick={() => onView(credential)}
          className="btn-tactile group/view inline-flex h-9 items-center gap-1.5 rounded-md border border-white/[0.1] bg-[#0A0C12] px-3 text-xs font-medium text-[#F4F4F5] hover:border-[#38BDF8]/45 hover:text-[#38BDF8] whitespace-nowrap"
        >
          <Eye className="h-3.5 w-3.5 transition-transform duration-200 group-hover/view:scale-110" />
          <span>View Certificate</span>
        </button>

        {credential.verificationUrl && (
          <a
            href={credential.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile group/ver inline-flex h-9 items-center gap-1 text-xs font-medium text-[#38BDF8] hover:text-[#7DD3FC] whitespace-nowrap"
          >
            <span>Verify</span>
            <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover/ver:translate-x-0.5 group-hover/ver:-translate-y-0.5" />
          </a>
        )}
      </div>
    </article>
  );
}
