import { useEffect, useRef, useState } from 'react';
import { isFinePointerDevice, prefersReducedMotion } from '../lib/gsapSetup';

interface TrailParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  gold: boolean;
}

/**
 * Desktop-only custom cursor system:
 * - Precision inner core dot + damped glowing outer orbital ring
 * - Speed-reactive canvas particle trail that fades smoothly and pulls gently toward pointer
 * - Distinct hover state on interactive controls (links, buttons, tabs, inputs)
 * - Cleanly disabled on mobile/touch input and under prefers-reduced-motion
 */
export function CinematicCursor() {
  const [enabled, setEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const evaluate = () => {
      setEnabled(isFinePointerDevice() && !prefersReducedMotion());
    };
    evaluate();

    const mqReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const mqPointer = window.matchMedia?.('(any-pointer: fine)');
    mqReduced?.addEventListener('change', evaluate);
    mqPointer?.addEventListener('change', evaluate);
    return () => {
      mqReduced?.removeEventListener('change', evaluate);
      mqPointer?.removeEventListener('change', evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particles: TrailParticle[] = [];
    const pointer = { x: -200, y: -200, active: false };
    const ringPos = { x: -200, y: -200 };
    const dotPos = { x: -200, y: -200 };
    let hoveredInteractive = false;
    let ringScale = 1;
    let rafId = 0;

    const spawnParticles = (x: number, y: number, speed: number) => {
      const count = Math.min(4, Math.max(1, Math.floor(speed / 10)));
      for (let i = 0; i < count; i++) {
        if (particles.length >= 90) particles.shift();
        const angle = Math.random() * Math.PI * 2;
        const drift = 0.25 + Math.random() * 0.85;
        particles.push({
          x: x + (Math.random() - 0.5) * 7,
          y: y + (Math.random() - 0.5) * 7,
          vx: Math.cos(angle) * drift,
          vy: Math.sin(angle) * drift - 0.15,
          size: 1.4 + Math.random() * 2.2,
          alpha: Math.min(0.9, 0.55 + speed * 0.01),
          life: 0,
          maxLife: 26 + Math.random() * 20,
          gold: Math.random() > 0.78,
        });
      }
    };

    const hideCursor = () => {
      pointer.active = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        hideCursor();
        return;
      }

      const firstMove = !pointer.active;
      const dx = firstMove ? 0 : e.clientX - pointer.x;
      const dy = firstMove ? 0 : e.clientY - pointer.y;
      const speed = Math.hypot(dx, dy);

      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;

      if (firstMove) {
        dotPos.x = pointer.x;
        dotPos.y = pointer.y;
        ringPos.x = pointer.x;
        ringPos.y = pointer.y;
      }

      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';

      if (speed > 1.8) {
        spawnParticles(pointer.x, pointer.y, speed);
      }

      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest('a, button, [role="tab"], [role="button"], input, textarea')
      );
      if (interactive !== hoveredInteractive) {
        hoveredInteractive = interactive;
        if (ringRef.current) {
          ringRef.current.dataset.hover = interactive ? 'true' : 'false';
        }
        if (dotRef.current) {
          dotRef.current.dataset.hover = interactive ? 'true' : 'false';
        }
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      spawnParticles(e.clientX, e.clientY, 45);
      ringScale = 0.78;
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      if (pointer.active) {
        // Snappy inner dot + smooth damped outer glow ring
        dotPos.x += (pointer.x - dotPos.x) * 0.52;
        dotPos.y += (pointer.y - dotPos.y) * 0.52;
        ringPos.x += (pointer.x - ringPos.x) * 0.19;
        ringPos.y += (pointer.y - ringPos.y) * 0.19;

        const targetScale = hoveredInteractive ? 1.55 : 1;
        ringScale += (targetScale - ringScale) * 0.2;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dotPos.x.toFixed(2)}px, ${dotPos.y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${hoveredInteractive ? 1.4 : 1})`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringPos.x.toFixed(2)}px, ${ringPos.y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${ringScale.toFixed(3)})`;
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 1;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Subtle cursor attraction on trail particles when nearby
        if (pointer.active) {
          const ax = pointer.x - p.x;
          const ay = pointer.y - p.y;
          const dist = Math.hypot(ax, ay);
          if (dist > 6 && dist < 130) {
            p.vx += (ax / dist) * 0.042;
            p.vy += (ay / dist) * 0.042;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.955;
        p.vy *= 0.955;

        const progress = p.life / p.maxLife;
        const opacity = (1 - progress) * p.alpha;
        const radius = Math.max(0.4, p.size * (1 - progress * 0.45));

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(226, 183, 110, ${opacity.toFixed(3)})`
          : `rgba(56, 189, 248, ${opacity.toFixed(3)})`;
        ctx.fill();
      }

      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('mouseleave', hideCursor);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('mouseleave', hideCursor);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        ref={ringRef}
        data-hover="false"
        style={{ opacity: 0 }}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-[#38BDF8]/65 bg-[#38BDF8]/[0.05] shadow-[0_0_20px_rgba(56,189,248,0.28)] transition-[opacity,border-color,background-color,box-shadow] duration-200 will-change-transform data-[hover=true]:border-[#E2B76E]/85 data-[hover=true]:bg-[#E2B76E]/10 data-[hover=true]:shadow-[0_0_24px_rgba(226,183,110,0.38)]"
      />
      <div
        ref={dotRef}
        data-hover="false"
        style={{ opacity: 0 }}
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.95)] transition-[opacity,background-color] duration-150 will-change-transform data-[hover=true]:bg-[#E2B76E]"
      />
    </div>
  );
}
