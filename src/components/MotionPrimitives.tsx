import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import { ensureGsapRegistered, gsap, isFinePointerDevice } from '../lib/gsapSetup';

export const CINEMATIC_EASE = [0.22, 1, 0.36, 1] as const;

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale';

interface RevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  distance?: number;
  direction?: RevealDirection;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  distance = 28,
  direction = 'up',
  className = '',
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();

  const initialState = (() => {
    if (reduced) return { opacity: 1, x: 0, y: 0, scale: 1 };
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -distance, y: 0, scale: 1 };
      case 'right':
        return { opacity: 0, x: distance, y: 0, scale: 1 };
      case 'down':
        return { opacity: 0, x: 0, y: -distance, scale: 1 };
      case 'scale':
        return { opacity: 0, x: 0, y: 20, scale: 0.93 };
      case 'up':
      default:
        return { opacity: 0, x: 0, y: distance, scale: 1 };
    }
  })();

  return (
    <motion.div
      initial={initialState}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{
        duration: 0.64,
        delay,
        ease: CINEMATIC_EASE,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeaderProps {
  kicker: string;
  title: string;
  description?: string;
  rightSlot?: ReactNode;
  className?: string;
  align?: 'left' | 'right';
}

export function SectionHeader({
  kicker,
  title,
  description,
  rightSlot,
  className = '',
  align = 'left',
}: SectionHeaderProps) {
  const reduced = useReducedMotion();

  return (
    <div className={`flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${className}`}>
      <div>
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
            transition={{ duration: 0.48, delay: 0.06, ease: CINEMATIC_EASE }}
            className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#38BDF8]"
          >
            {kicker}
          </motion.p>
        </div>

        <div className="mt-3 overflow-hidden">
          <motion.h2
            initial={
              reduced
                ? { opacity: 1, y: 0, x: 0 }
                : { opacity: 0, y: '105%', x: align === 'right' ? 16 : 0 }
            }
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.65, delay: 0.1, ease: CINEMATIC_EASE }}
            className="font-display text-3xl font-bold tracking-tight text-[#F4F4F5] sm:text-4xl"
          >
            {title}
          </motion.h2>
        </div>

        {description && (
          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.52, delay: 0.18, ease: CINEMATIC_EASE }}
            className="mt-2 text-base text-[#94A3B8]"
          >
            {description}
          </motion.p>
        )}
      </div>

      {rightSlot && (
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.56, delay: 0.18, ease: CINEMATIC_EASE }}
        >
          {rightSlot}
        </motion.div>
      )}
    </div>
  );
}

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerGrid({
  children,
  className = '',
  staggerDelay = 0.075,
}: StaggerGridProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 'some' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  variant?: 'rise' | 'scale' | 'slideLeft';
}

export function StaggerItem({
  children,
  className = '',
  variant = 'rise',
  ...rest
}: StaggerItemProps) {
  const reduced = useReducedMotion();

  const hidden = (() => {
    if (reduced) return { opacity: 1, x: 0, y: 0, scale: 1 };
    if (variant === 'scale') return { opacity: 0, y: 24, scale: 0.93 };
    if (variant === 'slideLeft') return { opacity: 0, x: -24, y: 0 };
    return { opacity: 0, y: 24, scale: 0.98 };
  })();

  return (
    <motion.div
      variants={{
        hidden,
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.56,
            ease: CINEMATIC_EASE,
          },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface InteractiveTiltCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  tiltStrength?: number;
  sheen?: boolean;
}

export function InteractiveTiltCard({
  children,
  className = '',
  spotlightColor = 'rgba(56, 189, 248, 0.12)',
  tiltStrength = 3.8,
  sheen = true,
}: InteractiveTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const reduced = useReducedMotion();
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setCanHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const enabled = canHover && !reduced;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rotateY = px * tiltStrength * 2;
      const rotateX = -py * tiltStrength * 2;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -6px, 0)`;
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '1';
        spotlightRef.current.style.background = `radial-gradient(500px circle at ${x}px ${y}px, ${spotlightColor}, transparent 62%)`;
      }
    });
  };

  const handlePointerLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
    }
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={enabled ? handlePointerMove : undefined}
      onPointerLeave={enabled ? handlePointerLeave : undefined}
      className={`relative transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out will-change-transform active:scale-[0.99] ${
        sheen ? 'card-sheen' : ''
      } ${className}`}
    >
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
      />
      {children}
    </div>
  );
}

interface MagneticWrapperProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Magnetic attraction wrapper for primary CTAs and interactive controls.
 * Gently pulls toward pointer within element bounds and springs cleanly back on leave.
 */
export function MagneticWrapper({
  children,
  className = '',
  strength = 0.28,
}: MagneticWrapperProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    setFinePointer(isFinePointerDevice());
  }, []);

  const enabled = finePointer && !reduced;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || !wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    wrapRef.current.style.transform = `translate3d(${(dx * strength).toFixed(2)}px, ${(dy * strength).toFixed(2)}px, 0)`;
  };

  const onLeave = () => {
    if (!wrapRef.current) return;
    wrapRef.current.style.transform = 'translate3d(0, 0, 0)';
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={enabled ? onMove : undefined}
      onPointerLeave={enabled ? onLeave : undefined}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

interface PhysicsFloatProps {
  children: ReactNode;
  className?: string;
  /** 'repel' pushes gently away from cursor; 'attract' pulls slightly toward cursor */
  mode?: 'repel' | 'attract';
  radius?: number;
  maxOffset?: number;
  tiltFactor?: number;
}

/**
 * Spring-damped pointer proximity physics container.
 * Uses direct DOM transform updates in rAF for 60fps cursor push/pull without React re-renders.
 */
export function PhysicsFloat({
  children,
  className = '',
  mode = 'repel',
  radius = 240,
  maxOffset = 22,
  tiltFactor = 4,
}: PhysicsFloatProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !isFinePointerDevice()) return;
    const el = elRef.current;
    if (!el) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;
    let running = false;

    const sign = mode === 'repel' ? -1 : 1;

    const animate = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;

      const rotY = (currentX / maxOffset) * tiltFactor;
      const rotX = (-currentY / maxOffset) * tiltFactor;
      const depthZ = Math.min(24, Math.hypot(currentX, currentY) * 0.65);
      el.style.transform = `perspective(950px) translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, ${depthZ.toFixed(2)}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;

      if (
        Math.abs(targetX - currentX) > 0.06 ||
        Math.abs(targetY - currentY) > 0.06
      ) {
        rafId = window.requestAnimationFrame(animate);
      } else if (Math.abs(targetX) > 0.01 || Math.abs(targetY) > 0.01) {
        rafId = window.requestAnimationFrame(animate);
      } else {
        running = false;
      }
    };

    const kick = () => {
      if (!running) {
        running = true;
        rafId = window.requestAnimationFrame(animate);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius && dist > 0.5) {
        const force = Math.pow(1 - dist / radius, 1.25) * maxOffset;
        targetX = (dx / dist) * force * sign;
        targetY = (dy / dist) * force * sign;
      } else {
        targetX = 0;
        targetY = 0;
      }
      kick();
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [reduced, mode, radius, maxOffset, tiltFactor]);

  return (
    <div ref={elRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

interface SceneChapterProps {
  children: ReactNode;
  className?: string;
}

/**
 * GSAP ScrollTrigger spatial chapter transition wrapper.
 * Adds connected camera-depth entry/exit transitions as visitor scrolls across chapters.
 */
export function SceneChapter({ children, className = '' }: SceneChapterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || typeof window === 'undefined') return;
    ensureGsapRegistered();

    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          y: 26,
          scale: 0.986,
        },
        {
          y: 0,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'top 35%',
            scrub: 0.55,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={containerRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
