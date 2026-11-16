import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';
import { PROFILE } from '../data/profile';

export function Hero() {
  const [imgFailed, setImgFailed] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="border-b border-[#E5E2DB] bg-[#F7F6F2]">
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Editorial Introduction & Typography */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between lg:col-span-7"
          >
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium tracking-wide text-[#53677D]">
                <span>{PROFILE.heroIntroLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{PROFILE.availabilityNote}</span>
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#242424] sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
                {PROFILE.name}
              </h1>

              <p className="mt-3 font-serif text-2xl leading-[1.22] tracking-tight text-[#242424] sm:text-3xl lg:text-[34px]">
                {PROFILE.headlineLines.map((line, idx) => (
                  <span key={line} className="block">
                    {idx === 2 ? <span className="text-[#53677D]">{line}</span> : line}
                  </span>
                ))}
              </p>

              <p className="mt-6 max-w-[60ch] text-base leading-[1.7] text-[#6B6B6B]">
                {PROFILE.heroSummary}
              </p>

              {/* Subtle unboxed technology labels */}
              <div className="mt-6 border-t border-[#E5E2DB] pt-4">
                <p className="text-xs font-medium text-[#6B6B6B]">
                  Core Stack Focus
                </p>
                <p className="mt-1.5 font-mono text-xs text-[#242424] sm:text-[13px]">
                  {PROFILE.heroTechnologies.join('  ·  ')}
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-[#242424] px-5 text-sm font-medium text-[#F7F6F2] transition-colors hover:bg-[#3A3A3A] whitespace-nowrap shrink-0"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="inline-flex h-11 items-center rounded-md border border-[#E5E2DB] bg-[#FFFFFF] px-5 text-sm font-medium text-[#242424] transition-colors hover:border-[#242424] whitespace-nowrap shrink-0"
              >
                Get in Touch
              </button>

              <a
                href={PROFILE.links.resumePdf}
                download="Pushpendra_Singh_Resume.pdf"
                className="inline-flex h-11 items-center gap-1.5 rounded-md px-3 text-sm font-medium text-[#53677D] transition-colors hover:text-[#242424] whitespace-nowrap shrink-0"
              >
                <Download className="h-4 w-4" />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Original Editorial Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="flex h-full flex-col rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-3">
              <div className="relative aspect-[4/4.3] w-full flex-1 overflow-hidden rounded-md bg-[#ECEAE3]">
                {!imgFailed ? (
                  <img
                    src={PROFILE.portraitPath}
                    alt="Portrait of Pushpendra Singh in formal business attire"
                    referrerPolicy="no-referrer"
                    onError={() => setImgFailed(true)}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#ECEAE3] p-6 text-center">
                    <div>
                      <p className="font-serif text-3xl text-[#242424]">PS</p>
                      <p className="mt-2 text-xs text-[#6B6B6B]">{PROFILE.name}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between px-1 text-xs text-[#6B6B6B]">
                <span>{PROFILE.location}</span>
                <span className="font-mono text-[#53677D]">B.Tech CSE · {PROFILE.duration}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-width Fact Strip below Hero Split */}
        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-[#E5E2DB] pt-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <p className="text-xs text-[#6B6B6B]">Specialization</p>
            <p className="mt-1 text-sm font-semibold text-[#242424]">Cloud Computing (B.Tech CSE)</p>
            <p className="mt-0.5 text-xs text-[#6B6B6B]">{PROFILE.university}</p>
          </div>

          <div>
            <p className="text-xs text-[#6B6B6B]">Academic Standing</p>
            <p className="mt-1 text-sm font-semibold text-[#242424] tabular-nums">
              CGPA {PROFILE.cgpa}
            </p>
            <p className="mt-0.5 text-xs text-[#6B6B6B] tabular-nums">
              98/100 in DECO (college highest, prev. sem)
            </p>
          </div>

          <div>
            <p className="text-xs text-[#6B6B6B]">Independent Systems</p>
            <p className="mt-1 text-sm font-semibold text-[#242424] tabular-nums">
              4 Technical Builds
            </p>
            <p className="mt-0.5 text-xs text-[#6B6B6B]">
              Spring Boot, Gemini API & Apps Script
            </p>
          </div>

          <div>
            <p className="text-xs text-[#6B6B6B]">Completed Internships</p>
            <p className="mt-1 text-sm font-semibold text-[#242424] tabular-nums">
              Thiranex & CodeAlpha
            </p>
            <p className="mt-0.5 text-xs text-[#6B6B6B]">
              Web Development & C++ Programming
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
