import { useState } from 'react';
import { Eye, ExternalLink } from 'lucide-react';
import { CredentialItem } from '../data/certifications';

interface CertificateCardProps {
  credential: CredentialItem;
  onView: (credential: CredentialItem) => void;
}

export function CertificateCard({ credential, onView }: CertificateCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] transition-colors duration-150 hover:border-[#53677D]/50">
      <div>
        {/* Original Document Thumbnail */}
        <button
          type="button"
          onClick={() => onView(credential)}
          aria-label={`View ${credential.title}`}
          className="group relative block aspect-[4/3] w-full overflow-hidden border-b border-[#E5E2DB] bg-[#F7F6F2] text-left"
        >
          {!imgError ? (
            <img
              src={credential.imagePath}
              alt={`${credential.title} — ${credential.issuer}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="h-full w-full object-contain p-3 transition-transform duration-200 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-4 text-center">
              <span className="text-xs font-medium text-[#6B6B6B]">{credential.issuer}</span>
            </div>
          )}
        </button>

        {/* Metadata */}
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-[#53677D]">
            <span className="font-semibold">{credential.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#6B6B6B]">{credential.kind}</span>
          </div>

          <h3 className="mt-2 text-base font-semibold leading-snug text-[#242424]">
            {credential.title}
          </h3>

          <p className="mt-1.5 text-sm text-[#6B6B6B]">{credential.issuer}</p>

          <dl className="mt-3 space-y-1 text-xs text-[#6B6B6B] tabular-nums">
            <div>Issued: {credential.issueDate}</div>
            {credential.expiryDate && <div>{credential.expiryDate}</div>}
            {credential.credentialId && (
              <div className="font-mono text-[11px] truncate" title={credential.credentialId}>
                ID: {credential.credentialId}
              </div>
            )}
          </dl>

          {credential.note && (
            <p className="mt-2 text-[11px] leading-relaxed text-[#6B6B6B]">{credential.note}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-2 border-t border-[#E5E2DB] px-5 py-3.5">
        <button
          type="button"
          onClick={() => onView(credential)}
          className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#F7F6F2] px-3 text-xs font-medium text-[#242424] transition-colors hover:bg-[#ECEAE3] whitespace-nowrap"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>View Certificate</span>
        </button>

        {credential.verificationUrl && (
          <a
            href={credential.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1 text-xs font-medium text-[#53677D] transition-colors hover:text-[#242424] whitespace-nowrap"
          >
            <span>Verify</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}
