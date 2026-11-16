import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Download, Linkedin, Github } from 'lucide-react';
import { PROFILE } from '../data/profile';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

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
        target.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E2DB] bg-[#F7F6F2]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="/#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-serif text-lg font-medium tracking-tight text-[#242424] whitespace-nowrap shrink-0"
        >
          {PROFILE.brandMark}
        </a>

        {/* Zone 2: Horizontal Navigation */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-5 xl:gap-6">
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
                className={`relative py-1 text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive ? 'text-[#242424]' : 'text-[#6B6B6B] hover:text-[#242424]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#242424] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Social Icons + Resume Download CTA */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-[#6B6B6B] transition-colors hover:border-[#E5E2DB] hover:bg-[#FFFFFF] hover:text-[#242424]"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.links.githubPrimary}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Primary GitHub Profile"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-transparent text-[#6B6B6B] transition-colors hover:border-[#E5E2DB] hover:bg-[#FFFFFF] hover:text-[#242424]"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={PROFILE.links.resumePdf}
            download="Pushpendra_Singh_Resume.pdf"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#242424] px-3.5 text-xs font-medium text-[#F7F6F2] transition-colors hover:bg-[#3A3A3A] whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#E5E2DB] bg-[#FFFFFF] text-[#242424] lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#E5E2DB] bg-[#FFFFFF] px-4 py-5 lg:hidden"
        >
          <nav aria-label="Mobile Navigation" className="grid grid-cols-2 gap-2">
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
                  className={`flex h-11 items-center rounded-md px-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F7F6F2] text-[#242424]'
                      : 'text-[#6B6B6B] hover:bg-[#F7F6F2] hover:text-[#242424]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#E5E2DB] pt-4">
            <a
              href={PROFILE.links.resumePdf}
              download="Pushpendra_Singh_Resume.pdf"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-[#242424] px-4 text-sm font-medium text-[#F7F6F2]"
            >
              <Download className="h-4 w-4" />
              <span>Download Resume</span>
            </a>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#E5E2DB] text-[#242424]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={PROFILE.links.githubPrimary}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#E5E2DB] text-[#242424]"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
