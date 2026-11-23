import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { Menu, X, Download, Linkedin, Github } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { CINEMATIC_EASE } from './MotionPrimitives';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'beyond-the-code', label: 'Events' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      if (location.pathname.startsWith('/projects/')) {
        setActiveSection('projects');
      }
      return;
    }

    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-22% 0px -60% 0px',
        threshold: [0.05, 0.25, 0.5],
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);
    if (isHome) {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        setActiveSection(sectionId);
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <motion.header
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: CINEMATIC_EASE }}
      className={`sticky top-0 z-40 border-b transition-colors duration-300 backdrop-blur-md ${
        isScrolled
          ? 'border-white/[0.12] bg-[#08090D]/92 shadow-[0_8px_30px_rgba(0,0,0,0.45)]'
          : 'border-white/[0.07] bg-[#08090D]/75'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="/#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="btn-tactile font-display text-base font-bold tracking-tight text-[#F4F4F5] whitespace-nowrap shrink-0 hover:text-[#38BDF8]"
        >
          {PROFILE.brandMark}
          <span className="text-[#38BDF8]" aria-hidden="true">.</span>
        </a>

        {/* Zone 2: Horizontal Navigation */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-4 xl:gap-5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`group relative py-1.5 text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive ? 'text-[#F4F4F5]' : 'text-[#94A3B8] hover:text-[#F4F4F5]'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {!isActive && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -bottom-[1px] h-[2px] origin-left scale-x-0 bg-white/30 transition-transform duration-200 ease-out group-hover:scale-x-100"
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId={reduced ? undefined : 'nav-active-underline'}
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-[#38BDF8] shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Social Icons + Resume Download CTA */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="btn-tactile inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-[#94A3B8] hover:border-white/[0.12] hover:bg-[#11141D] hover:text-[#38BDF8]"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.links.githubPrimary}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Primary GitHub Profile"
            className="btn-tactile inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-[#94A3B8] hover:border-white/[0.12] hover:bg-[#11141D] hover:text-[#38BDF8]"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.links.resumePdf}
            download="Pushpendra_Singh_Resume.pdf"
            className="btn-tactile group ml-1 inline-flex h-9 items-center gap-1.5 rounded-md bg-[#F4F4F5] px-3.5 text-xs font-semibold text-[#08090D] hover:bg-[#38BDF8] whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="btn-tactile inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/[0.12] bg-[#11141D] text-[#F4F4F5] hover:border-[#38BDF8]/40 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Scroll Progress Indicator Bar */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX }}
          className="h-[2px] w-full origin-left bg-gradient-to-r from-[#38BDF8] via-[#7DD3FC] to-[#38BDF8]"
        />
      )}

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={reduced ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.26, ease: CINEMATIC_EASE }}
            className="overflow-hidden border-t border-white/[0.08] bg-[#0C0E14] lg:hidden"
          >
            <div className="px-4 py-5">
              <nav aria-label="Mobile Navigation" className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.a
                      key={item.id}
                      href={`/#${item.id}`}
                      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: idx * 0.025, ease: CINEMATIC_EASE }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                      className={`btn-tactile flex h-11 items-center rounded-md px-3 text-sm font-medium ${
                        isActive
                          ? 'border border-[#38BDF8]/30 bg-[#11141D] text-[#F4F4F5]'
                          : 'text-[#94A3B8] hover:bg-[#11141D] hover:text-[#F4F4F5]'
                      }`}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
              </nav>

              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/[0.08] pt-4">
                <a
                  href={PROFILE.links.resumePdf}
                  download="Pushpendra_Singh_Resume.pdf"
                  onClick={() => setMobileOpen(false)}
                  className="btn-tactile inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-[#F4F4F5] px-4 text-sm font-semibold text-[#08090D] hover:bg-[#38BDF8]"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Resume</span>
                </a>
                <a
                  href={PROFILE.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="btn-tactile inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/[0.12] bg-[#11141D] text-[#F4F4F5] hover:border-[#38BDF8]/40"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={PROFILE.links.githubPrimary}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="btn-tactile inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/[0.12] bg-[#11141D] text-[#F4F4F5] hover:border-[#38BDF8]/40"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
