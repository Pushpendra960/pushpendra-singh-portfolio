import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Copy, Mail, Linkedin, Github, ArrowUpRight, Download } from 'lucide-react';
import { PROFILE } from '../data/profile';
import {
  CINEMATIC_EASE,
  InteractiveTiltCard,
  MagneticWrapper,
  Reveal,
  SceneChapter,
  StaggerGrid,
  StaggerItem,
} from './MotionPrimitives';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const input = document.createElement('input');
      input.value = PROFILE.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#08090D]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_78%_68%_at_50%_60%,#000_38%,transparent_100%)]"
      >
        <div className="animate-grid-drift bg-arch-grid absolute -inset-16" />
      </div>

      {/* Animated Network Connecting Lines Backdrop */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 420"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
      >
        <motion.path
          d="M 60 340 Q 340 120 620 220 T 1140 90"
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1"
          strokeDasharray="6 8"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 1.4, ease: CINEMATIC_EASE }}
        />
        <motion.path
          d="M 120 70 Q 460 310 820 140 T 1150 320"
          fill="none"
          stroke="#E2B76E"
          strokeWidth="0.8"
          strokeDasharray="4 8"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 1.6, delay: 0.2, ease: CINEMATIC_EASE }}
        />
      </svg>

      <div
        aria-hidden="true"
        className="animate-ambient-glow pointer-events-none absolute -bottom-36 right-1/4 h-[460px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.14)_0%,rgba(56,189,248,0.03)_45%,transparent_72%)]"
      />

      <SceneChapter className="relative mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Reveal direction="scale" distance={30}>
          <InteractiveTiltCard
            tiltStrength={1.6}
            spotlightColor="rgba(56, 189, 248, 0.12)"
            className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#11141D]/95 p-6 sm:p-10 lg:p-14 transition-colors duration-300 hover:border-[#38BDF8]/40"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8]/70 to-transparent"
            />

            <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <motion.span
                      aria-hidden="true"
                      initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 'some' }}
                      transition={{ duration: 0.55, ease: CINEMATIC_EASE }}
                      className="h-[1px] w-7 origin-left bg-[#38BDF8]"
                    />
                    <motion.p
                      initial={reduced ? { opacity: 1 } : { opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 'some' }}
                      transition={{ duration: 0.45, delay: 0.06, ease: CINEMATIC_EASE }}
                      className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#38BDF8]"
                    >
                      10 · Get in Touch
                    </motion.p>
                  </div>

                  <span className="animate-float-horizontal hidden sm:inline-block rounded-md border border-[#38BDF8]/25 bg-[#0A0C12] px-2.5 py-1 font-mono text-[10px] tracking-wider text-[#94A3B8] uppercase">
                    {PROFILE.availabilityNote}
                  </span>
                </div>

                <div className="mt-4 overflow-hidden">
                  <motion.h2
                    initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: '105%' }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 'some' }}
                    transition={{ duration: 0.7, delay: 0.1, ease: CINEMATIC_EASE }}
                    className="font-display text-3xl font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-[#F4F4F5] sm:text-5xl"
                  >
                    {PROFILE.contactHeading}
                  </motion.h2>
                </div>

                <motion.p
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.52, delay: 0.18, ease: CINEMATIC_EASE }}
                  className="mt-5 max-w-[56ch] text-base leading-[1.75] text-[#94A3B8]"
                >
                  {PROFILE.contactSubcopy}
                </motion.p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <MagneticWrapper strength={0.28}>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="btn-tactile card-sheen group inline-flex h-11 items-center gap-2 rounded-md bg-[#F4F4F5] px-5 text-sm font-semibold text-[#08090D] hover:bg-[#38BDF8] hover:shadow-[0_0_24px_rgba(56,189,248,0.38)] whitespace-nowrap"
                    >
                      <Mail className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110" />
                      <span>Send an Email</span>
                    </a>
                  </MagneticWrapper>

                  <MagneticWrapper strength={0.24}>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="btn-tactile inline-flex h-11 items-center gap-2 rounded-md border border-white/[0.14] bg-[#0A0C12] px-4 text-sm font-medium text-[#F4F4F5] hover:border-[#38BDF8]/55 hover:text-[#38BDF8] whitespace-nowrap"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-[#38BDF8]" />
                          <span>Email Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </MagneticWrapper>

                  <MagneticWrapper strength={0.22}>
                    <a
                      href={PROFILE.links.resumePdf}
                      download="Pushpendra_Singh_Resume.pdf"
                      className="btn-tactile group inline-flex h-11 items-center gap-2 rounded-md border border-white/[0.14] bg-[#0A0C12] px-4 text-sm font-medium text-[#F4F4F5] hover:border-[#38BDF8]/55 hover:text-[#38BDF8] whitespace-nowrap"
                    >
                      <Download className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                      <span>Resume PDF</span>
                    </a>
                  </MagneticWrapper>
                </div>
              </div>

              <div className="border-t border-white/[0.08] pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
                <StaggerGrid staggerDelay={0.08}>
                  <dl className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                    <StaggerItem variant="slideLeft">
                      <div className="py-4">
                        <dt className="font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
                          Direct Email
                        </dt>
                        <dd className="mt-1.5">
                          <a
                            href={`mailto:${PROFILE.email}`}
                            className="break-all font-mono text-sm font-medium text-[#F4F4F5] transition-colors hover:text-[#38BDF8]"
                          >
                            {PROFILE.email}
                          </a>
                        </dd>
                      </div>
                    </StaggerItem>

                    <StaggerItem variant="slideLeft">
                      <div className="py-4">
                        <dt className="font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
                          LinkedIn
                        </dt>
                        <dd className="mt-1.5">
                          <a
                            href={PROFILE.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#F4F4F5] transition-colors hover:text-[#38BDF8]"
                          >
                            <Linkedin className="h-4 w-4 text-[#38BDF8] transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6" />
                            <span>linkedin.com/in/pushpendrasingh9996</span>
                            <ArrowUpRight className="h-3.5 w-3.5 text-[#64748B] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#38BDF8]" />
                          </a>
                        </dd>
                      </div>
                    </StaggerItem>

                    <StaggerItem variant="slideLeft">
                      <div className="py-4">
                        <dt className="font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
                          GitHub (Primary &amp; College)
                        </dt>
                        <dd className="mt-2 flex flex-col gap-2">
                          <a
                            href={PROFILE.links.githubPrimary}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#F4F4F5] transition-colors hover:text-[#38BDF8]"
                          >
                            <Github className="h-4 w-4 text-[#38BDF8] transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6" />
                            <span>github.com/Pushpendra960</span>
                            <ArrowUpRight className="h-3.5 w-3.5 text-[#64748B] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#38BDF8]" />
                          </a>
                          <a
                            href={PROFILE.links.githubCollege}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1.5 text-xs font-medium text-[#94A3B8] transition-colors hover:text-[#F4F4F5]"
                          >
                            <Github className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
                            <span>github.com/Pushpendra8701 (College Account)</span>
                            <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        </dd>
                      </div>
                    </StaggerItem>
                  </dl>
                </StaggerGrid>
              </div>
            </div>
          </InteractiveTiltCard>
        </Reveal>
      </SceneChapter>
    </section>
  );
}
