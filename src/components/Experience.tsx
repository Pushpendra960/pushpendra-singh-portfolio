import { useRef, useState } from 'react';
import { ChevronDown, Eye } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { INTERNSHIPS, LEADERSHIP_ROLES, VOLUNTEERING_EVENTS } from '../data/experience';
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

interface ExperienceProps {
  onOpenDocument: (item: LightboxItem) => void;
}

export function Experience({ onOpenDocument }: ExperienceProps) {
  const [expandedId, setExpandedId] = useState<string>(INTERNSHIPS[0]?.id ?? 'thiranex');
  const reduced = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 65%'],
  });
  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#08090D]"
    >
      <div
        aria-hidden="true"
        className="animate-ambient-glow-alt pointer-events-none absolute right-0 top-1/4 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.08)_0%,transparent_72%)]"
      />

      <SceneChapter className="relative mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeader
          kicker="04 · Industry Training & Internships"
          title="Internship Experience"
          rightSlot={
            <p className="max-w-md text-sm leading-relaxed text-[#94A3B8]">
              Select any milestone node along the timeline to inspect verified deliverables and original internship records.
            </p>
          }
        />

        {/* Scroll-Linked Progressive Vertical Timeline */}
        <div ref={timelineRef} className="relative mt-12 space-y-8 md:pl-9">
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-2 bottom-2 left-2.5 w-[1px] bg-white/[0.08]"
          />

          <motion.div
            aria-hidden="true"
            style={reduced ? { scaleY: 1 } : { scaleY: lineScaleY }}
            className="hidden md:block absolute top-2 bottom-2 left-2.5 w-[2px] -ml-[0.5px] origin-top bg-gradient-to-b from-[#38BDF8] via-[#7DD3FC] to-[#38BDF8]/40 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
          />

          {INTERNSHIPS.map((exp, idx) => {
            const isExpanded = expandedId === exp.id;
            return (
              <Reveal
                key={exp.id}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                distance={28}
                delay={idx * 0.06}
                className="relative"
              >
                <motion.div
                  aria-hidden="true"
                  initial={
                    reduced
                      ? { scale: 1, rotate: 45, opacity: 1 }
                      : { scale: 0.2, rotate: 0, opacity: 0 }
                  }
                  whileInView={{ scale: 1, rotate: 45, opacity: 1 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.5, delay: 0.1, ease: CINEMATIC_EASE }}
                  className={`hidden md:block absolute top-8 -left-[31px] h-3 w-3 border-2 transition-colors ${
                    isExpanded
                      ? 'border-[#38BDF8] bg-[#38BDF8] shadow-[0_0_18px_rgba(56,189,248,0.85)]'
                      : 'border-[#38BDF8] bg-[#08090D] shadow-[0_0_12px_rgba(56,189,248,0.45)]'
                  }`}
                />

                <InteractiveTiltCard
                  tiltStrength={1.8}
                  spotlightColor="rgba(56, 189, 248, 0.1)"
                  className={`rounded-xl border bg-[#11141D] p-6 sm:p-8 transition-colors duration-300 ${
                    isExpanded
                      ? 'border-[#38BDF8]/45 shadow-[0_20px_48px_-20px_rgba(56,189,248,0.22)]'
                      : 'border-white/[0.08] hover:border-[#38BDF8]/35'
                  }`}
                >
                  <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                      <span className="font-mono text-[11px] font-medium text-[#38BDF8]">
                        {exp.mode} · {exp.duration}
                      </span>

                      <h3 className="mt-2 font-display text-2xl font-bold text-[#F4F4F5]">
                        {exp.organization}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-[#E2E8F0]">{exp.role}</p>

                      <dl className="mt-5 space-y-2.5 border-t border-white/[0.08] pt-4 text-xs text-[#94A3B8]">
                        <div className="flex justify-between gap-2">
                          <dt>Duration</dt>
                          <dd className="text-right font-mono font-medium text-[#F4F4F5] tabular-nums">
                            {exp.period}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt>{exp.credentialLabel}</dt>
                          <dd className="text-right font-mono text-[#F4F4F5]">{exp.credentialId}</dd>
                        </div>
                      </dl>

                      <div className="mt-6 space-y-3">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
                          Verified Documents
                        </p>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                          {exp.documents.map((doc) => (
                            <button
                              key={doc.title}
                              type="button"
                              onClick={() =>
                                onOpenDocument({
                                  title: doc.title,
                                  subtitle: exp.organization,
                                  imagePath: doc.imagePath,
                                  issueDate: exp.period,
                                  credentialId: exp.credentialId,
                                  kind: doc.kind,
                                })
                              }
                              className="btn-tactile group flex items-center gap-3 rounded-lg border border-white/[0.08] bg-[#0A0C12] p-2.5 text-left hover:border-[#38BDF8]/50"
                            >
                              <div className="h-14 w-20 shrink-0 overflow-hidden rounded border border-white/[0.08] bg-white">
                                <img
                                  src={doc.imagePath}
                                  alt={doc.title}
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-[#F4F4F5] truncate">
                                  {doc.kind}
                                </p>
                                <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-[#38BDF8] group-hover:text-[#7DD3FC]">
                                  <Eye className="h-3 w-3 transition-transform duration-200 group-hover:scale-110" />
                                  <span>View Original</span>
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/[0.08] pt-6 lg:col-span-8 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <p className="flex-1 text-sm leading-[1.75] text-[#94A3B8] sm:text-[15px]">
                          {exp.summary}
                        </p>
                        <button
                          type="button"
                          onClick={() => setExpandedId(isExpanded ? '' : exp.id)}
                          aria-expanded={isExpanded}
                          className="btn-tactile inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border border-white/[0.12] bg-[#0A0C12] px-3 font-mono text-[11px] text-[#E2E8F0] hover:border-[#38BDF8]/50 hover:text-[#38BDF8]"
                        >
                          <span>{isExpanded ? 'Collapse' : 'Inspect Deliverables'}</span>
                          <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={reduced ? { opacity: 1 } : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: CINEMATIC_EASE }}
                            className="overflow-hidden"
                          >
                            <div className="mt-6">
                              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                                Documented Deliverables
                              </h4>
                              <div className="mt-3 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                                {exp.deliverables.map((task) => (
                                  <div
                                    key={task.title}
                                    className="py-3.5 transition-colors hover:bg-white/[0.02] px-1.5 -mx-1.5 rounded"
                                  >
                                    <p className="text-sm font-medium text-[#F4F4F5]">{task.title}</p>
                                    <p className="mt-1 text-xs leading-relaxed text-[#94A3B8]">
                                      {task.detail}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="mt-5">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
                          Technology Exposure During Internship
                        </p>
                        <p className="mt-2 font-mono text-xs leading-relaxed text-[#E2E8F0]">
                          {exp.technologies.join('  ·  ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </InteractiveTiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* Leadership & Community Involvement */}
        <div className="mt-16 border-t border-white/[0.08] pt-14">
          <Reveal direction="left" className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#38BDF8]">
                Campus Engagement
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#F4F4F5] sm:text-3xl">
                Leadership &amp; Community Involvement
              </h3>
            </div>
            <p className="max-w-md text-sm text-[#94A3B8]">
              Previous club responsibilities, technical society membership, and volunteer event support.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <StaggerGrid className="space-y-4 lg:col-span-5" staggerDelay={0.08}>
              {LEADERSHIP_ROLES.map((item) => (
                <StaggerItem key={item.id} variant="slideLeft">
                  <div className="card-sheen rounded-xl border border-white/[0.08] bg-[#11141D] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#38BDF8]/40">
                    <p className="font-mono text-xs font-medium text-[#38BDF8]">{item.period}</p>
                    <h4 className="mt-1.5 text-base font-semibold text-[#F4F4F5]">{item.role}</h4>
                    <p className="text-sm text-[#E2E8F0]">{item.organization}</p>
                    <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">{item.detail}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>

            <Reveal direction="right" delay={0.08} className="lg:col-span-7">
              <div className="h-full rounded-xl border border-white/[0.08] bg-[#11141D] p-6 transition-colors hover:border-white/[0.15]">
                <h4 className="text-base font-semibold text-[#F4F4F5]">
                  Event Volunteering &amp; Coordination Support
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[#94A3B8]">
                  Contributed as a volunteer supporting documentation, event coordination, class-to-class promotion, and discipline/crowd coordination across major campus events.
                </p>

                <StaggerGrid
                  className="mt-5 divide-y divide-white/[0.08] border-t border-white/[0.08]"
                  staggerDelay={0.065}
                >
                  {VOLUNTEERING_EVENTS.map((v) => (
                    <StaggerItem key={v.event}>
                      <div className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between">
                        <span className="text-sm font-medium text-[#F4F4F5]">{v.event}</span>
                        <span className="text-xs text-[#94A3B8]">{v.contributions.join(' · ')}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGrid>
              </div>
            </Reveal>
          </div>
        </div>
      </SceneChapter>
    </section>
  );
}
