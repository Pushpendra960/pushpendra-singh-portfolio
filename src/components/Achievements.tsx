import { Eye } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { MAJOR_ACHIEVEMENTS, OTHER_RECOGNITION } from '../data/achievements';
import { AchievementTrophy3D } from './AchievementTrophy3D';
import { LightboxItem } from './CertificateModal';
import {
  CINEMATIC_EASE,
  InteractiveTiltCard,
  Reveal,
  SceneChapter,
  SectionHeader,
  StaggerGrid,
  StaggerItem,
} from './MotionPrimitives';

interface AchievementsProps {
  onOpenDocument: (item: LightboxItem) => void;
}

export function Achievements({ onOpenDocument }: AchievementsProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id="achievements"
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#0C0E14]"
    >
      <SceneChapter className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <SectionHeader
            kicker="05 · Awards & Milestones"
            title="Achievements & Recognition"
            description="Verified exhibition awards, academic honors, and documented hackathon participation."
            className="flex-1"
          />

          {/* Three.js 3D Metallic Award Emblem */}
          <div className="flex items-center gap-4 self-start rounded-2xl border border-[#E2B76E]/25 bg-[#11141D] px-4 py-2 md:self-auto">
            <AchievementTrophy3D />
            <div className="pr-2">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#E2B76E]">
                Verified Honors
              </p>
              <p className="mt-0.5 font-display text-sm font-bold text-[#F4F4F5]">
                1st &amp; 2nd Positions
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-[#94A3B8] tabular-nums">
                + 98/100 DECO
              </p>
            </div>
          </div>
        </div>

        {/* Major 3 Achievements */}
        <StaggerGrid className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3" staggerDelay={0.09}>
          {MAJOR_ACHIEVEMENTS.map((item, idx) => (
            <StaggerItem key={item.id} variant="scale">
              <InteractiveTiltCard
                tiltStrength={3.8}
                spotlightColor="rgba(226, 183, 110, 0.14)"
                className="group flex h-full flex-col justify-between rounded-xl border border-white/[0.08] bg-[#11141D] p-6 hover:border-[#E2B76E]/55 hover:shadow-[0_20px_46px_-18px_rgba(226,183,110,0.24)]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-8 -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-[#E2B76E]/70 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      style={{ animationDelay: `${idx * 0.45}s` }}
                      className="animate-float-vertical font-display text-2xl font-bold text-[#E2B76E] tabular-nums sm:text-[1.65rem]"
                    >
                      {item.rankOrMetric}
                    </p>
                    <motion.span
                      aria-hidden="true"
                      initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 'some' }}
                      transition={{ duration: 0.55, delay: 0.15 + idx * 0.08, ease: CINEMATIC_EASE }}
                      className="h-[1px] w-10 origin-right bg-gradient-to-r from-transparent to-[#E2B76E]/70"
                    />
                  </div>

                  <h3 className="mt-2.5 text-lg font-semibold text-[#F4F4F5]">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-[#38BDF8]">{item.event}</p>

                  <dl className="mt-4 space-y-1.5 border-t border-white/[0.08] pt-3.5 text-xs text-[#94A3B8]">
                    {item.theme && (
                      <div>
                        <span className="font-medium text-[#E2E8F0]">Theme:</span> {item.theme}
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-[#E2E8F0]">Organizer:</span> {item.organizer}
                    </div>
                    <div className="tabular-nums">
                      <span className="font-medium text-[#E2E8F0]">Date:</span> {item.date}
                    </div>
                  </dl>

                  {item.note && (
                    <p className="mt-3 text-xs leading-relaxed text-[#94A3B8]">{item.note}</p>
                  )}
                </div>

                {item.proofImage && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenDocument({
                        title: item.proofTitle || item.title,
                        subtitle: item.organizer,
                        imagePath: item.proofImage!,
                        issueDate: item.date,
                        kind: 'Award Proof',
                      })
                    }
                    className="btn-tactile group/btn relative z-10 mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-white/[0.12] bg-[#0A0C12] px-3 text-xs font-medium text-[#F4F4F5] hover:border-[#E2B76E]/60 hover:text-[#E2B76E]"
                  >
                    <Eye className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:scale-110" />
                    <span>View Original Proof</span>
                  </button>
                )}
              </InteractiveTiltCard>
            </StaggerItem>
          ))}
        </StaggerGrid>

        {/* Other Recognition */}
        <Reveal direction="up" delay={0.08}>
          <div className="mt-8 rounded-xl border border-white/[0.08] bg-[#11141D] p-6">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
              Hackathon Participation &amp; Community Presence
            </h3>
            <StaggerGrid
              className="mt-4 divide-y divide-white/[0.08] border-t border-white/[0.08]"
              staggerDelay={0.07}
            >
              {OTHER_RECOGNITION.map((rec) => (
                <StaggerItem key={rec.title} variant="slideLeft">
                  <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#94A3B8]">
                        {rec.category}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#F4F4F5]">{rec.title}</p>
                      <p className="mt-1 text-xs text-[#94A3B8]">{rec.detail}</p>
                    </div>

                    {rec.proofImage && (
                      <button
                        type="button"
                        onClick={() =>
                          onOpenDocument({
                            title: rec.proofTitle || rec.title,
                            subtitle: rec.category,
                            imagePath: rec.proofImage!,
                            kind: 'Participation Certificate',
                          })
                        }
                        className="btn-tactile group/cert inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border border-white/[0.12] bg-[#0A0C12] px-3 text-xs font-medium text-[#F4F4F5] hover:border-[#38BDF8]/50 hover:text-[#38BDF8]"
                      >
                        <Eye className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cert:scale-110" />
                        <span>View Certificate</span>
                      </button>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </Reveal>
      </SceneChapter>
    </section>
  );
}
