import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  CREDENTIAL_FILTERS,
  CREDENTIALS,
  CredentialCategory,
  CredentialItem,
} from '../data/certifications';
import { CertificateCard } from './CertificateCard';
import { CINEMATIC_EASE, SceneChapter, SectionHeader } from './MotionPrimitives';

interface CertificationsProps {
  onSelectCredential: (credential: CredentialItem, visibleList: CredentialItem[]) => void;
}

const INITIAL_ALL_LIMIT = 9;

export function Certifications({ onSelectCredential }: CertificationsProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | CredentialCategory>('All');
  const [showAll, setShowAll] = useState(false);
  const reduced = useReducedMotion();

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
    <section id="credentials" className="border-b border-white/[0.08] bg-[#08090D]">
      <SceneChapter className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeader
          kicker="06 · Verified Documentation"
          title="Credentials & Recognition"
          description="Continuous learning, practical exploration, and achievements."
          rightSlot={
            <p className="font-mono text-xs text-[#94A3B8] tabular-nums">
              Showing {displayed.length} of {filtered.length} verified records
            </p>
          }
        />

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter credentials by category"
          className="mt-8 flex flex-wrap items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#11141D] p-1.5"
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
                className={`btn-tactile relative h-9 rounded-lg px-3.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive ? 'text-[#08090D]' : 'text-[#94A3B8] hover:text-[#F4F4F5]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId={reduced ? undefined : 'cred-filter-active'}
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg bg-[#F4F4F5]"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div
          key={activeFilter}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayed.map((cred, idx) => (
            <motion.div
              key={cred.id}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{
                duration: 0.48,
                delay: Math.min((idx % 6) * 0.055, 0.28),
                ease: CINEMATIC_EASE,
              }}
            >
              <CertificateCard
                credential={cred}
                onView={(item) => onSelectCredential(item, filtered)}
              />
            </motion.div>
          ))}
        </div>

        {/* Expand / Collapse All in 'All' View */}
        {activeFilter === 'All' && filtered.length > INITIAL_ALL_LIMIT && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="btn-tactile inline-flex h-11 items-center rounded-md border border-white/[0.14] bg-[#11141D] px-6 text-sm font-medium text-[#F4F4F5] hover:border-[#38BDF8]/50 hover:text-[#38BDF8]"
            >
              {showAll
                ? 'Show Curated Highlights Only'
                : `View All ${filtered.length} Verified Credentials`}
            </button>
          </div>
        )}
      </SceneChapter>
    </section>
  );
}
