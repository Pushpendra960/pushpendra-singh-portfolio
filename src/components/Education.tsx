import { motion, useReducedMotion } from 'motion/react';
import { PROFILE } from '../data/profile';
import {
  CINEMATIC_EASE,
  InteractiveTiltCard,
  Reveal,
  SceneChapter,
  StaggerGrid,
  StaggerItem,
} from './MotionPrimitives';

export function Education() {
  const reduced = useReducedMotion();

  return (
    <section
      id="education"
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#0C0E14]"
    >
      <SceneChapter className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal direction="left" distance={30} className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <motion.span
                aria-hidden="true"
                initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.55, ease: CINEMATIC_EASE }}
                className="h-[1px] w-7 origin-left bg-[#38BDF8]"
              />
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#38BDF8]">
                07 · Academic Foundation
              </p>
            </div>
            <div className="mt-3 overflow-hidden">
              <motion.h2
                initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: '105%' }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.62, delay: 0.08, ease: CINEMATIC_EASE }}
                className="font-display text-3xl font-bold tracking-tight text-[#F4F4F5] sm:text-4xl"
              >
                Education
              </motion.h2>
            </div>

            {/* Vertical Academic Timeline Marker */}
            <div className="mt-6 border-l border-[#38BDF8]/35 pl-4">
              <p className="font-mono text-xs font-semibold text-[#F4F4F5] tabular-nums">
                {PROFILE.duration}
              </p>
              <p className="mt-1 text-xs text-[#94A3B8]">
                Active Undergraduate Degree · Greater Noida
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" distance={30} delay={0.06} className="lg:col-span-8">
            <InteractiveTiltCard
              tiltStrength={2.2}
              spotlightColor="rgba(56, 189, 248, 0.12)"
              className="rounded-xl border border-white/[0.08] bg-[#11141D] p-6 sm:p-8 hover:border-[#38BDF8]/40"
            >
              <div className="relative z-10">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#F4F4F5] sm:text-2xl">
                      {PROFILE.degree} — {PROFILE.branch}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-[#38BDF8]">
                      Specialization: {PROFILE.specialization}
                    </p>
                  </div>
                  <span className="animate-float-vertical font-mono text-sm font-medium text-[#E2E8F0] tabular-nums shrink-0">
                    {PROFILE.duration}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#94A3B8]">
                  <span>{PROFILE.university}</span>
                  <span aria-hidden="true" className="text-white/20">·</span>
                  <span className="font-mono font-semibold text-[#F4F4F5] tabular-nums">
                    Current CGPA: {PROFILE.cgpa}
                  </span>
                </div>

                <div className="mt-6 border-t border-white/[0.08] pt-5">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#38BDF8]">
                    Selected Relevant Coursework
                  </p>
                  <StaggerGrid
                    className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                    staggerDelay={0.055}
                  >
                    {PROFILE.relevantSubjects.map((subject) => (
                      <StaggerItem key={subject} variant="slideLeft">
                        <div className="rounded-md border border-white/[0.08] bg-[#0A0C12] px-3.5 py-2.5 text-sm text-[#E2E8F0] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#38BDF8]/45 hover:bg-[#0E121B]">
                          {subject}
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerGrid>
                </div>
              </div>
            </InteractiveTiltCard>
          </Reveal>
        </div>
      </SceneChapter>
    </section>
  );
}
