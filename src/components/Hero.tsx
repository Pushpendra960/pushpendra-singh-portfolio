import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { ArrowDown, ArrowRight, Cloud, Code2, Download, Server, Terminal } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { HeroUniverse3D } from './HeroUniverse3D';
import { CINEMATIC_EASE, MagneticWrapper, PhysicsFloat } from './MotionPrimitives';
import { isFinePointerDevice } from '../lib/gsapSetup';

const CYCLING_ROLES = [
  'Cloud Computing Student',
  'Backend Developer',
  'Java & Spring Boot Builder',
  'Applied AI & Automation Explorer',
];

const HERO_NAME = 'PUSHPENDRA SINGH';

const FLOATING_TECH_TAGS = [
  {
    label: 'Java',
    left: '1%',
    top: '8%',
    tilt: -3.5,
    depth: 1.04,
    float: 'animate-float-vertical',
    duration: '4.8s',
    delay: '0s',
    mode: 'repel' as const,
  },
  {
    label: 'Spring Boot',
    left: '17%',
    top: '2%',
    tilt: 2.6,
    depth: 0.96,
    float: 'animate-float-orbit',
    duration: '6.6s',
    delay: '0.4s',
    mode: 'attract' as const,
  },
  {
    label: 'AWS',
    left: '43%',
    top: '12%',
    tilt: -2.2,
    depth: 1.06,
    float: 'animate-float-horizontal',
    duration: '5.5s',
    delay: '0.7s',
    mode: 'repel' as const,
  },
  {
    label: 'Docker',
    left: '58%',
    top: '3%',
    tilt: 3.1,
    depth: 0.94,
    float: 'animate-float-vertical',
    duration: '6.1s',
    delay: '1.0s',
    mode: 'repel' as const,
  },
  {
    label: 'Cloud Computing',
    left: '74%',
    top: '13%',
    tilt: -1.8,
    depth: 1.0,
    float: 'animate-float-orbit',
    duration: '7.4s',
    delay: '0.2s',
    mode: 'attract' as const,
  },
  {
    label: 'MySQL',
    left: '7%',
    top: '45%',
    tilt: 2.8,
    depth: 0.95,
    float: 'animate-float-horizontal',
    duration: '6.2s',
    delay: '0.8s',
    mode: 'attract' as const,
  },
  {
    label: 'SQL',
    left: '27%',
    top: '39%',
    tilt: -3.2,
    depth: 1.05,
    float: 'animate-float-orbit',
    duration: '7.0s',
    delay: '1.2s',
    mode: 'repel' as const,
  },
  {
    label: 'Linux',
    left: '45%',
    top: '50%',
    tilt: 2.1,
    depth: 1.02,
    float: 'animate-float-vertical',
    duration: '5.2s',
    delay: '0.5s',
    mode: 'repel' as const,
  },
  {
    label: 'Generative AI',
    left: '67%',
    top: '44%',
    tilt: -2.5,
    depth: 0.97,
    float: 'animate-float-horizontal',
    duration: '6.8s',
    delay: '1.4s',
    mode: 'attract' as const,
  },
  {
    label: 'Git',
    left: '20%',
    top: '76%',
    tilt: 3.4,
    depth: 1.02,
    float: 'animate-float-orbit',
    duration: '5.9s',
    delay: '0.3s',
    mode: 'repel' as const,
  },
  {
    label: 'GitHub',
    left: '54%',
    top: '75%',
    tilt: -2.7,
    depth: 0.96,
    float: 'animate-float-vertical',
    duration: '6.4s',
    delay: '0.9s',
    mode: 'attract' as const,
  },
];

const ORBITAL_SATELLITES = [
  {
    label: 'AWS',
    rx: 215,
    ry: 62,
    tiltDeg: -14,
    speed: 0.44,
    phase: 0.4,
    direction: 1,
    accent: 'cyan' as const,
  },
  {
    label: 'Spring',
    rx: 185,
    ry: 86,
    tiltDeg: 18,
    speed: -0.34,
    phase: 2.3,
    direction: -1,
    accent: 'gold' as const,
  },
  {
    label: 'Docker',
    rx: 162,
    ry: 48,
    tiltDeg: -6,
    speed: 0.58,
    phase: 4.1,
    direction: 1,
    accent: 'cyan' as const,
  },
  {
    label: 'Java',
    rx: 228,
    ry: 74,
    tiltDeg: 10,
    speed: -0.26,
    phase: 5.4,
    direction: -1,
    accent: 'gold' as const,
  },
];

export function Hero() {
  const [imgFailed, setImgFailed] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const nameTiltRef = useRef<HTMLHeadingElement>(null);
  const portraitTiltRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);
  const portraitGlowRef = useRef<HTMLDivElement>(null);
  const orbitCenterRef = useRef<HTMLDivElement>(null);
  const orbitNodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const portraitParallaxY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const contentParallaxY = useTransform(scrollYProgress, [0, 1], [0, 22]);

  useEffect(() => {
    if (reduced) return;
    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % CYCLING_ROLES.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, [reduced]);

  // Smooth damped 3D mouse reaction for hero name & holographic portrait
  useEffect(() => {
    if (reduced || !isFinePointerDevice()) return;
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const rect = section.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (nameTiltRef.current) {
          nameTiltRef.current.style.transform = `perspective(1100px) translate3d(${(nx * 10).toFixed(2)}px, ${(ny * 6).toFixed(2)}px, 0) rotateX(${(-ny * 6.5).toFixed(2)}deg) rotateY(${(nx * 7).toFixed(2)}deg)`;
        }
        if (portraitTiltRef.current) {
          portraitTiltRef.current.style.transform = `perspective(1100px) rotateX(${(-ny * 10).toFixed(2)}deg) rotateY(${(nx * 11.5).toFixed(2)}deg)`;
        }
        if (portraitImgRef.current) {
          portraitImgRef.current.style.transform = `translate3d(${(-nx * 11).toFixed(2)}px, ${(-ny * 9).toFixed(2)}px, 0) scale(1.035)`;
        }
        if (portraitGlowRef.current) {
          portraitGlowRef.current.style.transform = `translate3d(${(nx * 28).toFixed(2)}px, ${(ny * 24).toFixed(2)}px, 0)`;
        }
      });
    };

    const onLeave = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (nameTiltRef.current) {
        nameTiltRef.current.style.transform =
          'perspective(1100px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg)';
      }
      if (portraitTiltRef.current) {
        portraitTiltRef.current.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
      }
      if (portraitImgRef.current) {
        portraitImgRef.current.style.transform = 'translate3d(0, 0, 0) scale(1)';
      }
      if (portraitGlowRef.current) {
        portraitGlowRef.current.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    section.addEventListener('pointermove', onMove, { passive: true });
    section.addEventListener('pointerleave', onLeave);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced]);

  // Continuous elliptical orbital paths around portrait with varied speeds, directions & pointer repulsion
  useEffect(() => {
    if (reduced || typeof window === 'undefined') return;
    const centerEl = orbitCenterRef.current;
    if (!centerEl) return;

    const pointer = { x: -9999, y: -9999, active: false };
    let isVisible = true;
    let frameId = 0;
    const startTime = performance.now();

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    const tick = (now: number) => {
      if (isVisible) {
        const elapsed = (now - startTime) * 0.001;
        const rect = centerEl.getBoundingClientRect();
        const scaleFactor = Math.min(1, Math.max(0.62, rect.width / 420));
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        ORBITAL_SATELLITES.forEach((sat, idx) => {
          const node = orbitNodeRefs.current[idx];
          if (!node) return;

          const angle = sat.phase + elapsed * sat.speed;
          const rad = (sat.tiltDeg * Math.PI) / 180;
          const rx = sat.rx * scaleFactor;
          const ry = sat.ry * scaleFactor;

          const rawX = Math.cos(angle) * rx;
          const rawY = Math.sin(angle) * ry;

          // Tilt ellipse in 2D screen plane
          let x = rawX * Math.cos(rad) - rawY * Math.sin(rad);
          let y = rawX * Math.sin(rad) + rawY * Math.cos(rad);

          // Cursor repulsion on orbiting nodes
          if (pointer.active) {
            const worldX = cx + x;
            const worldY = cy + y;
            const dx = pointer.x - worldX;
            const dy = pointer.y - worldY;
            const dist = Math.hypot(dx, dy);
            if (dist < 140 && dist > 1) {
              const push = Math.pow(1 - dist / 140, 1.3) * 26;
              x -= (dx / dist) * push;
              y -= (dy / dist) * push;
            }
          }

          // Depth along ellipse front vs back arc
          const depthSin = Math.sin(angle);
          const scale = 0.86 + (depthSin + 1) * 0.14;
          const opacity = 0.45 + (depthSin + 1) * 0.275;

          node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
          node.style.opacity = opacity.toFixed(3);
          node.style.zIndex = depthSin > 0 ? '25' : '5';
        });
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [reduced]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#08090D]"
    >
      {/* Interactive Three.js 3D Spatial Canvas */}
      <HeroUniverse3D />

      {/* Subtle architectural perspective grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,#000_35%,transparent_100%)]"
      >
        <div className="animate-grid-drift bg-arch-grid absolute -inset-16 opacity-60" />
      </div>

      {/* Atmospheric ambient depth halos */}
      <div
        aria-hidden="true"
        className="animate-ambient-glow pointer-events-none absolute -top-36 left-1/4 h-[520px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.14)_0%,rgba(56,189,248,0.03)_45%,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="animate-ambient-glow-alt pointer-events-none absolute -bottom-32 right-[10%] h-[440px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.1)_0%,rgba(226,183,110,0.04)_48%,transparent_74%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 pt-10 pb-12 sm:px-6 sm:pt-14 sm:pb-14 lg:px-8 lg:pt-16 lg:pb-16">
        {/* Top Metadata Row + Initial Energy Wave Beam */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.04, ease: CINEMATIC_EASE }}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-wider text-[#94A3B8] uppercase">
            <span className="text-[#38BDF8]">{PROFILE.heroIntroLabel}</span>
            <span aria-hidden="true" className="text-white/25">/</span>
            <span>{PROFILE.availabilityNote}</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 rounded-md border border-white/[0.1] bg-[#0B0E16]/95 px-3 py-1 font-mono text-[10px] tracking-widest text-[#94A3B8] uppercase">
            <Cloud className="h-3 w-3 text-[#38BDF8]" aria-hidden="true" />
            <span>Greater Noida · Cloud &amp; Backend</span>
          </div>
        </motion.div>

        {/* Energy Wave Sweep Line Preceding Name Reveal */}
        <motion.div
          aria-hidden="true"
          initial={reduced ? { scaleX: 1, opacity: 0.4 } : { scaleX: 0, opacity: 0.95 }}
          animate={{ scaleX: 1, opacity: 0.35 }}
          transition={{ duration: 0.95, delay: 0.1, ease: CINEMATIC_EASE }}
          className="mt-4 h-[1px] w-full origin-left bg-gradient-to-r from-[#38BDF8] via-[#7DD3FC] to-transparent"
        />

        {/* Monumental Single-Line Name Reveal: Scattered 3D Emergence -> Continuous Float + Mouse 3D Tilt */}
        <div className="mt-5 overflow-visible">
          <div className={reduced ? '' : 'animate-float-name'}>
            <h1
              ref={nameTiltRef}
              aria-label="Pushpendra Singh"
              style={{ perspective: '1100px' }}
              className="whitespace-nowrap font-display text-[clamp(1.22rem,4.7vw,4.35rem)] font-extrabold uppercase leading-[1.04] tracking-[-0.03em] transition-transform duration-300 ease-out will-change-transform"
            >
              {HERO_NAME.split('').map((char, idx) => {
                const scatterY = ((idx % 3) - 1) * 32 + (idx % 2 === 0 ? -18 : 22);
                const scatterX = (idx - HERO_NAME.length / 2) * 3.2;
                const scatterRot = ((idx % 5) - 2) * 8;
                return (
                  <motion.span
                    key={`${char}-${idx}`}
                    initial={
                      reduced
                        ? { opacity: 1, x: 0, y: 0, rotateX: 0, rotateZ: 0, scale: 1 }
                        : {
                            opacity: 0,
                            x: scatterX,
                            y: scatterY,
                            rotateX: 65,
                            rotateZ: scatterRot,
                            scale: 0.68,
                          }
                    }
                    animate={{ opacity: 1, x: 0, y: 0, rotateX: 0, rotateZ: 0, scale: 1 }}
                    transition={{
                      duration: 0.72,
                      delay: reduced ? 0 : 0.12 + idx * 0.03,
                      ease: CINEMATIC_EASE,
                    }}
                    className={`inline-block origin-bottom hero-name-sheen ${
                      char === ' ' ? 'w-[0.28em]' : ''
                    }`}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                );
              })}
            </h1>
          </div>
        </div>

        {/* Main 2-Column Spatial Stage */}
        <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:mt-10 lg:grid-cols-12 lg:gap-10">
          {/* Left Narrative, Cycling Roles, Magnetic CTAs & Non-Static Spatial Tech Tag Constellation */}
          <motion.div
            style={reduced ? undefined : { y: contentParallaxY }}
            className="flex flex-col justify-between lg:col-span-6"
          >
            <div>
              {/* Dynamic Cycling Role Strip */}
              <motion.div
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: 0.48, ease: CINEMATIC_EASE }}
                className="flex items-center gap-3 border-y border-white/[0.08] py-3"
              >
                <span className="font-mono text-xs font-medium text-[#38BDF8] tabular-nums">
                  {String(roleIndex + 1).padStart(2, '0')}
                </span>
                <span aria-hidden="true" className="h-3.5 w-[1px] bg-white/15" />
                <div className="relative h-7 flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={CYCLING_ROLES[roleIndex]}
                      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -14 }}
                      transition={{ duration: 0.32, ease: CINEMATIC_EASE }}
                      className="font-mono text-sm font-medium tracking-wide text-[#F4F4F5] sm:text-base"
                    >
                      {CYCLING_ROLES[roleIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Headline Statements */}
              <motion.p
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.54, delay: 0.54, ease: CINEMATIC_EASE }}
                className="mt-5 text-lg font-medium leading-snug tracking-tight text-[#E2E8F0] sm:text-xl"
              >
                {PROFILE.headlineLines.map((line, idx) => (
                  <span key={line} className="inline sm:block">
                    {idx === 2 ? <span className="text-[#38BDF8]">{line}</span> : line}{' '}
                  </span>
                ))}
              </motion.p>

              <motion.p
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.56, delay: 0.6, ease: CINEMATIC_EASE }}
                className="mt-4 max-w-[58ch] text-sm leading-[1.75] text-[#94A3B8] sm:text-base"
              >
                {PROFILE.heroSummary}
              </motion.p>

              {/* Magnetic Interactive CTAs */}
              <motion.div
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.52, delay: 0.68, ease: CINEMATIC_EASE }}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                <MagneticWrapper strength={0.28}>
                  <button
                    type="button"
                    onClick={() => scrollToSection('projects')}
                    className="btn-tactile group inline-flex h-11 items-center gap-2 rounded-md bg-[#F4F4F5] px-5 text-sm font-semibold text-[#08090D] hover:bg-[#38BDF8] hover:shadow-[0_0_26px_rgba(56,189,248,0.4)] whitespace-nowrap shrink-0"
                  >
                    <span>Explore Portfolio</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </MagneticWrapper>

                <MagneticWrapper strength={0.25}>
                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="btn-tactile inline-flex h-11 items-center rounded-md border border-white/[0.15] bg-[#11141D] px-5 text-sm font-medium text-[#F4F4F5] hover:border-[#38BDF8]/55 hover:bg-[#161A26] whitespace-nowrap shrink-0"
                  >
                    Get in Touch
                  </button>
                </MagneticWrapper>

                <MagneticWrapper strength={0.2}>
                  <a
                    href={PROFILE.links.resumePdf}
                    download="Pushpendra_Singh_Resume.pdf"
                    className="btn-tactile group inline-flex h-11 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-[#94A3B8] hover:text-[#38BDF8] whitespace-nowrap shrink-0"
                  >
                    <Download className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                    <span>Resume PDF</span>
                  </a>
                </MagneticWrapper>
              </motion.div>

              {/* Floating Spatial Technology Tag Constellation (Non-linear 3D Depth + Push/Pull Physics) */}
              <motion.div
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.56, delay: 0.74, ease: CINEMATIC_EASE }}
                className="mt-8 border-t border-white/[0.08] pt-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
                    Interactive Spatial Stack Field
                  </p>
                  <span className="font-mono text-[10px] text-[#38BDF8]/75">
                    Move cursor near tags
                  </span>
                </div>

                {/* Desktop & Tablet: Staggered 3D Spatial Constellation (Not a static row) */}
                <div className="relative hidden md:block h-[168px] w-full overflow-visible">
                  {FLOATING_TECH_TAGS.map((tag) => (
                    <div
                      key={tag.label}
                      style={{ left: tag.left, top: tag.top }}
                      className="absolute"
                    >
                      <PhysicsFloat
                        mode={tag.mode}
                        radius={195}
                        maxOffset={26}
                        tiltFactor={6}
                      >
                        <div
                          style={{
                            animationDuration: tag.duration,
                            animationDelay: tag.delay,
                          }}
                          className={`${tag.float} hover-pause`}
                        >
                          <div
                            style={{
                              transform: !reduced
                                ? `rotate(${tag.tilt}deg) scale(${tag.depth})`
                                : undefined,
                            }}
                            className="rounded-md border border-white/[0.13] bg-[#0E121B]/95 px-2.5 py-1 font-mono text-[11px] font-medium text-[#E2E8F0] shadow-[0_8px_20px_rgba(0,0,0,0.45)] transition-colors duration-200 hover:border-[#38BDF8]/75 hover:text-[#38BDF8] hover:shadow-[0_0_18px_rgba(56,189,248,0.28)] whitespace-nowrap"
                          >
                            {tag.label}
                          </div>
                        </div>
                      </PhysicsFloat>
                    </div>
                  ))}
                </div>

                {/* Mobile: Staggered Multi-Elevation Floating Wave */}
                <div className="flex flex-wrap gap-3 md:hidden py-2">
                  {FLOATING_TECH_TAGS.map((tag, idx) => (
                    <div
                      key={tag.label}
                      style={{
                        animationDuration: tag.duration,
                        animationDelay: tag.delay,
                      }}
                      className={`${tag.float} ${idx % 2 === 0 ? '-translate-y-1' : 'translate-y-1.5'}`}
                    >
                      <div
                        style={{
                          transform: !reduced ? `rotate(${tag.tilt}deg)` : undefined,
                        }}
                        className="rounded-md border border-white/[0.13] bg-[#0E121B]/95 px-2.5 py-1 font-mono text-[11px] font-medium text-[#E2E8F0]"
                      >
                        {tag.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Spatial Composition: Orbiting Elements + 3 Floating 3D Code Windows + Holographic Portrait */}
          <motion.div
            style={reduced ? undefined : { y: portraitParallaxY }}
            initial={reduced ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 32, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: CINEMATIC_EASE }}
            className="relative mx-auto w-full max-w-[460px] py-4 lg:col-span-6 lg:max-w-none lg:pl-8"
          >
            {/* Ambient cyan glow behind holographic frame */}
            <div
              ref={portraitGlowRef}
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-3xl bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.24)_0%,rgba(56,189,248,0.04)_52%,transparent_76%)] transition-transform duration-300 ease-out will-change-transform"
            />

            {/* Floating Coding Window 1 (Top-Right): Java Code */}
            <PhysicsFloat
              mode="repel"
              radius={250}
              maxOffset={28}
              tiltFactor={6}
              className="relative z-20 mb-4 sm:mb-0 sm:w-[235px] sm:ml-auto lg:absolute lg:-top-7 lg:-right-2 lg:w-[248px]"
            >
              <div className="animate-float-win-1 hover-pause rounded-xl border border-[#38BDF8]/35 bg-[#0B0E16]/95 p-3 shadow-[0_18px_42px_rgba(0,0,0,0.72)]">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#38BDF8]">
                    <Code2 className="h-3 w-3" aria-hidden="true" />
                    <span>CloudService.java</span>
                  </span>
                  <span className="font-mono text-[9px] text-[#64748B]">Java</span>
                </div>
                <pre className="mt-2 overflow-hidden font-mono text-[10px] leading-[1.45] text-[#CBD5E1]">
                  <code>
                    <span className="text-[#38BDF8]">public record</span> Node(String id)
                    {'\n'}
                    <span className="text-[#E2B76E]">var</span> status = engine.sync();
                    {'\n'}
                    <span className="text-[#94A3B8]">return</span> status.isHealthy();
                  </code>
                </pre>
              </div>
            </PhysicsFloat>

            {/* Floating Coding Window 2 (Mid-Left): Spring Boot REST API */}
            <PhysicsFloat
              mode="attract"
              radius={240}
              maxOffset={24}
              tiltFactor={5.5}
              className="relative z-20 mb-4 sm:absolute sm:top-[28%] sm:-left-6 sm:mb-0 sm:w-[228px] lg:-left-10 lg:w-[242px]"
            >
              <div className="animate-float-win-2 hover-pause rounded-xl border border-[#E2B76E]/35 bg-[#0B0E16]/95 p-3 shadow-[0_18px_42px_rgba(0,0,0,0.72)]">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#E2B76E]">
                    <Server className="h-3 w-3" aria-hidden="true" />
                    <span>CampusApi.java</span>
                  </span>
                  <span className="font-mono text-[9px] text-[#64748B]">Spring Boot</span>
                </div>
                <pre className="mt-2 overflow-hidden font-mono text-[10px] leading-[1.45] text-[#CBD5E1]">
                  <code>
                    <span className="text-[#38BDF8]">@RestController</span>
                    {'\n'}
                    <span className="text-[#E2B76E]">@GetMapping</span>(&quot;/api/drives&quot;)
                    {'\n'}
                    <span className="text-[#94A3B8]">return</span> repo.findActive();
                  </code>
                </pre>
              </div>
            </PhysicsFloat>

            {/* Central Holographic 3D Floating Portrait + True Continuous Orbital Elements */}
            <div ref={orbitCenterRef} className="relative mx-auto max-w-[380px]">
              {/* Translucent Elliptical Orbital Track Rings */}
              <div
                aria-hidden="true"
                style={{ transform: 'translate(-50%, -50%) rotate(-14deg)' }}
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[126px] w-[112%] rounded-[100%] border border-[#38BDF8]/18"
              />
              <div
                aria-hidden="true"
                style={{ transform: 'translate(-50%, -50%) rotate(18deg)' }}
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[170px] w-[98%] rounded-[100%] border border-[#E2B76E]/15"
              />

              {/* Orbiting Satellites Driven Continuously Along Elliptical Paths */}
              {!reduced &&
                ORBITAL_SATELLITES.map((sat, idx) => (
                  <div
                    key={sat.label}
                    ref={(el) => {
                      orbitNodeRefs.current[idx] = el;
                    }}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 will-change-transform"
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium shadow-lg ${
                        sat.accent === 'gold'
                          ? 'border-[#E2B76E]/45 bg-[#0E121B]/95 text-[#E2B76E] shadow-[0_0_16px_rgba(226,183,110,0.25)]'
                          : 'border-[#38BDF8]/45 bg-[#0E121B]/95 text-[#38BDF8] shadow-[0_0_16px_rgba(56,189,248,0.28)]'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          sat.accent === 'gold' ? 'bg-[#E2B76E]' : 'bg-[#38BDF8]'
                        }`}
                      />
                      <span>{sat.label}</span>
                    </div>
                  </div>
                ))}

              <div className="animate-float-portrait relative z-10">
                <div
                  ref={portraitTiltRef}
                  className="group relative rounded-2xl p-[1.5px] transition-transform duration-300 ease-out will-change-transform shadow-[0_32px_70px_-18px_rgba(0,0,0,0.85)]"
                >
                  {/* Rotating Conic Holographic Rim */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
                  >
                    <div className="animate-border-spin absolute -inset-[55%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(56,189,248,0.65)_55deg,transparent_125deg,rgba(226,183,110,0.4)_215deg,transparent_290deg)]" />
                  </div>

                  {/* Inner Frame Surface (Solid dark obsidian surface for crisp WebGL compositing) */}
                  <div className="relative rounded-[15px] border border-white/[0.1] bg-[#0E121C] p-3">
                    {/* Corner Holographic Reticles */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-2 top-2 z-20 h-3 w-3 border-l-2 border-t-2 border-[#38BDF8]/70"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-2 top-2 z-20 h-3 w-3 border-r-2 border-t-2 border-[#38BDF8]/70"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-11 left-2 z-20 h-3 w-3 border-b-2 border-l-2 border-[#38BDF8]/50"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-11 right-2 z-20 h-3 w-3 border-b-2 border-r-2 border-[#38BDF8]/50"
                    />

                    <div className="relative aspect-[4/4.35] w-full overflow-hidden rounded-xl bg-[#08090D]">
                      {!imgFailed ? (
                        <>
                          <img
                            ref={portraitImgRef}
                            src={PROFILE.portraitPath}
                            alt="Portrait of Pushpendra Singh in formal business attire"
                            referrerPolicy="no-referrer"
                            onError={() => setImgFailed(true)}
                            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03]"
                          />
                          {/* Diagonal specular glass reflection sweep */}
                          <div
                            aria-hidden="true"
                            className="animate-holo-sweep pointer-events-none absolute -inset-y-10 left-0 w-24 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                          />
                          {/* Subtle bottom dark atmospheric blend */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#08090D]/80 via-[#08090D]/20 to-transparent"
                          />
                        </>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#11141D] p-6 text-center">
                          <div>
                            <p className="font-display text-4xl font-bold text-[#F4F4F5]">PS</p>
                            <p className="mt-2 text-xs text-[#94A3B8]">{PROFILE.name}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between px-1.5 text-xs text-[#94A3B8]">
                      <span>{PROFILE.location}</span>
                      <span className="font-mono text-[#38BDF8] tabular-nums">
                        B.Tech CSE · {PROFILE.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Coding Window 3 (Bottom-Right/Left): Terminal / Cloud Commands */}
            <PhysicsFloat
              mode="repel"
              radius={250}
              maxOffset={26}
              tiltFactor={5.5}
              className="relative z-20 mt-4 sm:absolute sm:-bottom-7 sm:right-0 sm:mt-0 sm:w-[270px] lg:-bottom-7 lg:left-2 lg:right-auto lg:w-[280px]"
            >
              <div className="animate-float-win-3 hover-pause rounded-xl border border-white/[0.16] bg-[#0B0E16]/95 px-3.5 py-2.5 shadow-[0_18px_42px_rgba(0,0,0,0.72)]">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-1.5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-[#94A3B8] uppercase">
                    <Terminal className="h-3 w-3 text-[#38BDF8]" aria-hidden="true" />
                    <span>cloud-deploy.sh</span>
                  </span>
                  <span className="font-mono text-[9px] text-[#38BDF8]">AWS · Docker</span>
                </div>
                <p className="mt-1.5 font-mono text-[10.5px] leading-relaxed text-[#E2E8F0]">
                  <span className="text-[#38BDF8]">$</span> docker compose up --build
                  {'\n'}
                  <span className="block text-[#94A3B8]">
                    <span className="text-[#E2B76E]">$</span> aws ec2 describe-instances
                  </span>
                </p>
              </div>
            </PhysicsFloat>
          </motion.div>
        </div>

        {/* Full-Width Verified Fact Strip */}
        <motion.div
          initial={reduced ? 'visible' : 'hidden'}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: reduced ? 0 : 0.72,
                staggerChildren: reduced ? 0 : 0.08,
              },
            },
          }}
          className="mt-14 grid grid-cols-1 gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: CINEMATIC_EASE } },
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
              Specialization
            </p>
            <p className="mt-1.5 text-sm font-semibold text-[#F4F4F5]">
              Cloud Computing (B.Tech CSE)
            </p>
            <p className="mt-0.5 text-xs text-[#94A3B8]">{PROFILE.university}</p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: CINEMATIC_EASE } },
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
              Academic Standing
            </p>
            <p className="mt-1.5 text-sm font-semibold text-[#F4F4F5] tabular-nums">
              CGPA {PROFILE.cgpa}
            </p>
            <p className="mt-0.5 text-xs text-[#94A3B8] tabular-nums">
              98/100 in DECO (college highest, prev. sem)
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: CINEMATIC_EASE } },
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
              Independent Systems
            </p>
            <p className="mt-1.5 text-sm font-semibold text-[#F4F4F5] tabular-nums">
              4 Technical Builds
            </p>
            <p className="mt-0.5 text-xs text-[#94A3B8]">
              Spring Boot, Gemini API &amp; Apps Script
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: CINEMATIC_EASE } },
            }}
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
              Completed Internships
            </p>
            <p className="mt-1.5 text-sm font-semibold text-[#F4F4F5] tabular-nums">
              Thiranex &amp; CodeAlpha
            </p>
            <p className="mt-0.5 text-xs text-[#94A3B8]">
              Web Development &amp; C++ Programming
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-9 flex justify-center"
        >
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            aria-label="Scroll to About section"
            className="btn-tactile group inline-flex items-center gap-2.5 rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#64748B] hover:text-[#38BDF8]"
          >
            <span>Enter Experience</span>
            <motion.span
              animate={reduced ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
