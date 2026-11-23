import { useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { Calendar, ImageOff, Maximize2 } from 'lucide-react';
import { PERSONAL_EDITORIAL_PHOTOS, PhotoItem } from '../data/gallery';
import {
  InteractiveTiltCard,
  Reveal,
  SceneChapter,
  SectionHeader,
} from './MotionPrimitives';

interface PersonalPhotographyProps {
  onOpenPhoto: (photo: PhotoItem, collection: PhotoItem[]) => void;
}

function EditorialPersonalFrame({
  photo,
  delay = 0,
  onClick,
}: {
  photo: PhotoItem;
  delay?: number;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const reduced = useReducedMotion();

  return (
    <Reveal direction="up" delay={delay} className={photo.spanClass}>
      <div
        style={!reduced ? { transform: `rotate(${photo.tiltDeg}deg)` } : undefined}
        className="h-full transition-transform duration-500 ease-out hover:rotate-0 focus-within:rotate-0"
      >
        <InteractiveTiltCard
          tiltStrength={3.2}
          spotlightColor="rgba(56, 189, 248, 0.14)"
          className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.09] bg-[#11141D] shadow-[0_26px_64px_-20px_rgba(0,0,0,0.85)] hover:border-[#38BDF8]/40"
        >
          <button
            type="button"
            onClick={onClick}
            aria-label={`View ${photo.title} in fullscreen viewer`}
            className="relative flex h-full w-full flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] focus-visible:ring-inset"
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
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
              ) : (
                <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center p-6 text-center">
                  <ImageOff className="h-6 w-6 text-[#64748B]" />
                  <p className="mt-2 text-sm font-medium text-[#F4F4F5]">{photo.title}</p>
                </div>
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070C]/85 via-transparent to-transparent opacity-65 transition-opacity duration-300 group-hover:opacity-90"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-3.5 top-3.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.14] bg-[#08090D]/80 text-[#F4F4F5] opacity-80 transition-all duration-300 group-hover:border-[#38BDF8]/55 group-hover:text-[#38BDF8] md:opacity-0 md:group-hover:opacity-100"
              >
                <Maximize2 className="h-4 w-4" />
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between border-t border-white/[0.08] bg-[#11141D] p-5">
              <div>
                <p className="font-mono text-[11px] font-medium text-[#38BDF8]">
                  {photo.category}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-[#F4F4F5]">
                  {photo.title}
                </h3>
                {photo.caption && (
                  <p className="mt-1.5 text-sm leading-relaxed text-[#94A3B8]">
                    {photo.caption}
                  </p>
                )}
              </div>
            </div>
          </button>
        </InteractiveTiltCard>
      </div>
    </Reveal>
  );
}

export function PersonalPhotography({ onOpenPhoto }: PersonalPhotographyProps) {
  const personalOutdoor = PERSONAL_EDITORIAL_PHOTOS.find(
    (p) => p.id === 'personal-outdoor-portrait'
  );
  const personalBuild = PERSONAL_EDITORIAL_PHOTOS.find(
    (p) => p.id === 'personal-focused-build-session'
  );
  const profileFormal = PERSONAL_EDITORIAL_PHOTOS.find(
    (p) => p.id === 'profile-formal-portrait'
  );

  return (
    <section
      id="personal-photography"
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#0C0E14]"
    >
      <div
        aria-hidden="true"
        className="animate-ambient-glow pointer-events-none absolute -top-24 right-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(226,183,110,0.06)_0%,transparent_72%)]"
      />

      <SceneChapter className="relative mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeader
          kicker="09 · Personal Perspective"
          title="A Little More About Me"
          rightSlot={
            <p className="max-w-md text-sm leading-relaxed text-[#94A3B8]">
              A quiet editorial look at the person behind the builds—from late-afternoon debugging to candid moments outside the terminal.
            </p>
          }
        />

        {/* Editorial Asymmetric Layout */}
        <div className="mt-10 grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-start">
          {personalOutdoor && (
            <EditorialPersonalFrame
              photo={personalOutdoor}
              delay={0.04}
              onClick={() => onOpenPhoto(personalOutdoor, PERSONAL_EDITORIAL_PHOTOS)}
            />
          )}

          <div className="flex flex-col gap-7 lg:col-span-7">
            {personalBuild && (
              <EditorialPersonalFrame
                photo={{ ...personalBuild, spanClass: '' }}
                delay={0.12}
                onClick={() => onOpenPhoto(personalBuild, PERSONAL_EDITORIAL_PHOTOS)}
              />
            )}

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-12 sm:items-stretch">
              {profileFormal && (
                <EditorialPersonalFrame
                  photo={{
                    ...profileFormal,
                    spanClass: 'sm:col-span-6',
                    aspectClass: 'aspect-[4/3]',
                  }}
                  delay={0.18}
                  onClick={() => onOpenPhoto(profileFormal, PERSONAL_EDITORIAL_PHOTOS)}
                />
              )}

              <Reveal direction="up" delay={0.22} className="sm:col-span-6">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#11141D]/90 p-6">
                  <div>
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#E2B76E]">
                      The Progression
                    </p>
                    <p className="mt-3 font-display text-lg font-bold leading-snug text-[#F4F4F5]">
                      Curiosity into execution, one build at a time.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">
                      Whether documenting an ideathon on campus, presenting a working prototype on
                      stage, or visiting engineering teams, every experience feeds directly into how
                      I design software.
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 border-t border-white/[0.08] pt-4 font-mono text-xs text-[#CBD5E1]">
                    <Calendar className="h-3.5 w-3.5 text-[#38BDF8]" />
                    <span>IILM University · Greater Noida</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </SceneChapter>
    </section>
  );
}
