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

const ABOUT_FACTS = [
  { label: 'Program', value: 'B.Tech CSE', accent: false, mono: false },
  { label: 'Specialization', value: PROFILE.specialization, accent: false, mono: false },
  { label: 'Institution', value: 'IILM University', accent: false, mono: false },
  { label: 'Graduation', value: '2029', accent: false, mono: true },
  { label: 'Current CGPA', value: PROFILE.cgpa, accent: true, mono: true },
];

const JOURNEY_BEATS = [
  {
    phase: 'Foundation',
    title: 'Computer Science & Cloud Computing',
    detail: 'Studying DBMS, Computer Networks, Operating Systems, and Cloud models at IILM University.',
  },
  {
    phase: 'Backend Focus',
    title: 'Java, SQL & Spring Boot Systems',
    detail: 'Designing REST APIs, relational schemas, validation, and authentication workflows.',
  },
  {
    phase: 'Applied AI',
    title: 'Automation & Agentic Experimentation',
    detail: 'Integrating Gemini API, Google Apps Script, and generative workflows into practical tools.',
  },
];

export function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="relative overflow-hidden border-b border-white/[0.08] bg-[#0C0E14]">
      <SceneChapter className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Rail */}
          <Reveal direction="left" distance={34} className="lg:col-span-5">
            <div className="flex items-center justify-between gap-3">
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
                  01 · Profile
                </p>
              </div>

              <span className="animate-float-vertical font-mono text-[10px] tracking-wider text-[#94A3B8] border border-white/[0.09] bg-[#11141D] px-2.5 py-1 rounded-md">
                {PROFILE.duration}
              </span>
            </div>

            <div className="mt-3 overflow-hidden">
              <motion.h2
                initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: '105%' }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.65, delay: 0.08, ease: CINEMATIC_EASE }}
                className="font-display text-3xl font-bold tracking-tight text-[#F4F4F5] sm:text-4xl"
              >
                About Me
              </motion.h2>
            </div>

            <StaggerGrid staggerDelay={0.065}>
              <dl className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {ABOUT_FACTS.map((fact) => (
                  <StaggerItem key={fact.label} variant="slideLeft">
                    <div className="group flex items-baseline justify-between gap-4 py-3.5 text-sm transition-colors hover:bg-white/[0.02] px-1.5 -mx-1.5 rounded">
                      <dt className="text-[#94A3B8] transition-colors group-hover:text-[#E2E8F0]">
                        {fact.label}
                      </dt>
                      <dd
                        className={`text-right tabular-nums transition-transform duration-200 group-hover:-translate-x-0.5 ${
                          fact.accent
                            ? 'font-mono font-semibold text-[#38BDF8]'
                            : fact.mono
                              ? 'font-mono font-medium text-[#F4F4F5]'
                              : 'font-medium text-[#F4F4F5]'
                        }`}
                      >
                        {fact.value}
                      </dd>
                    </div>
                  </StaggerItem>
                ))}
              </dl>
            </StaggerGrid>

            <Reveal direction="scale" delay={0.14}>
              <InteractiveTiltCard
                tiltStrength={3}
                spotlightColor="rgba(226, 183, 110, 0.14)"
                className="group relative mt-6 rounded-xl border border-white/[0.1] bg-[#11141D] p-5 hover:border-[#E2B76E]/45"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-[#38BDF8]/65 via-[#E2B76E]/60 to-transparent"
                />
                <div className="relative z-10">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-mono text-sm font-semibold text-[#E2B76E] tabular-nums">
                      {PROFILE.academicHighlight.score} – {PROFILE.academicHighlight.subject}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#94A3B8]">
                      Academic Highlight
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">
                    {PROFILE.academicHighlight.note}
                  </p>
                </div>
              </InteractiveTiltCard>
            </Reveal>
          </Reveal>

          {/* Right Column: Narrative + Spatial Timeline Beats */}
          <Reveal direction="right" distance={34} delay={0.1} className="lg:col-span-7 lg:pt-8">
            <StaggerGrid className="max-w-[64ch] space-y-5" staggerDelay={0.08}>
              {PROFILE.aboutParagraphs.map((para, idx) => (
                <StaggerItem key={para}>
                  <p
                    className={
                      idx === 0
                        ? 'text-lg leading-[1.7] font-medium text-[#F4F4F5] sm:text-xl'
                        : 'text-base leading-[1.8] text-[#94A3B8]'
                    }
                  >
                    {para}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGrid>

            {/* Interactive Learning & Engineering Progression Timeline */}
            <StaggerGrid
              className="mt-10 grid grid-cols-1 gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-3"
              staggerDelay={0.09}
            >
              {JOURNEY_BEATS.map((beat, idx) => (
                <StaggerItem key={beat.phase} variant="scale">
                  <InteractiveTiltCard
                    tiltStrength={3.2}
                    spotlightColor="rgba(56, 189, 248, 0.14)"
                    className="h-full rounded-xl border border-white/[0.08] bg-[#11141D] p-4 hover:border-[#38BDF8]/45"
                  >
                    <div className="relative z-10">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#38BDF8] tabular-nums">
                        0{idx + 1} · {beat.phase}
                      </span>
                      <h3 className="mt-2 text-sm font-semibold text-[#F4F4F5]">{beat.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">
                        {beat.detail}
                      </p>
                    </div>
                  </InteractiveTiltCard>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </Reveal>
        </div>
      </SceneChapter>
    </section>
  );
}
