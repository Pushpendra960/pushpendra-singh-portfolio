import { useMemo, useState } from 'react';
import {
  CREDENTIAL_FILTERS,
  CREDENTIALS,
  CredentialCategory,
  CredentialItem,
} from '../data/certifications';
import { CertificateCard } from './CertificateCard';

interface CertificationsProps {
  onSelectCredential: (credential: CredentialItem, visibleList: CredentialItem[]) => void;
}

const INITIAL_ALL_LIMIT = 9;

export function Certifications({ onSelectCredential }: CertificationsProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | CredentialCategory>('All');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const sorted = [...CREDENTIALS].sort((a, b) => a.priority - b.priority);
    if (activeFilter === 'All') return sorted;
    return sorted.filter((c) => c.category === activeFilter);
  }, [activeFilter]);

  const displayed = useMemo(() => {
    if (activeFilter === 'All' && !showAll) {
      return filtered.slice(0, INITIAL_ALL_LIMIT);
    }
    return filtered;
  }, [activeFilter, filtered, showAll]);

  const handleFilterChange = (category: 'All' | CredentialCategory) => {
    setActiveFilter(category);
    if (category !== 'All') {
      setShowAll(false);
    }
  };

  return (
    <section id="credentials" className="border-b border-[#E5E2DB] bg-[#F7F6F2]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#53677D]">
              Verified Documentation
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#242424]">
              Credentials & Recognition
            </h2>
            <p className="mt-2 text-base text-[#6B6B6B]">
              Continuous learning, practical exploration, and achievements.
            </p>
          </div>
          <p className="text-xs text-[#6B6B6B] tabular-nums">
            Showing {displayed.length} of {filtered.length} verified records
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter credentials by category"
          className="mt-8 flex flex-wrap items-center gap-1.5 rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-1.5"
        >
          {CREDENTIAL_FILTERS.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleFilterChange(cat)}
                className={`h-9 rounded-md px-3.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#242424] text-[#F7F6F2]'
                    : 'text-[#6B6B6B] hover:bg-[#F7F6F2] hover:text-[#242424]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayed.map((cred) => (
            <CertificateCard
              key={cred.id}
              credential={cred}
              onView={(item) => onSelectCredential(item, filtered)}
            />
          ))}
        </div>

        {/* Expand / Collapse All in 'All' View */}
        {activeFilter === 'All' && filtered.length > INITIAL_ALL_LIMIT && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex h-11 items-center rounded-md border border-[#E5E2DB] bg-[#FFFFFF] px-6 text-sm font-medium text-[#242424] transition-colors hover:border-[#242424]"
            >
              {showAll
                ? 'Show Curated Highlights Only'
                : `View All ${filtered.length} Verified Credentials`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
