import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Github } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { ArchitectureFlow } from '../components/ArchitectureFlow';
import { Reveal } from '../components/MotionPrimitives';
import { NotFound } from './NotFound';

export function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    return <NotFound />;
  }

  const project = PROJECTS[currentIndex];
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  return (
    <main className="bg-[#08090D] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/#projects"
          className="btn-tactile group inline-flex items-center gap-2 font-mono text-xs font-medium text-[#38BDF8] hover:text-[#7DD3FC]"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Featured Projects</span>
        </Link>

        {/* Case Study Header */}
        <Reveal>
          <header className="mt-6 border-b border-white/[0.08] pb-8">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="font-semibold text-[#E2B76E] tabular-nums">
                Project {project.index}
              </span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="font-medium text-[#38BDF8]">{project.category}</span>
            </div>

            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#F4F4F5] sm:text-4xl lg:text-[44px]">
              {project.title}
            </h1>

            <p className="mt-4 max-w-[65ch] text-base leading-[1.75] text-[#94A3B8]">
              {project.shortDescription}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#11141D] px-5 py-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
                  Current Status
                </p>
                <p className="mt-1 text-sm font-semibold text-[#F4F4F5]">{project.status}</p>
              </div>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile group inline-flex h-10 items-center gap-2 rounded-md bg-[#F4F4F5] px-4 text-xs font-semibold text-[#08090D] hover:bg-[#38BDF8] whitespace-nowrap"
              >
                <Github className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span>View GitHub Repository</span>
              </a>
            </div>
          </header>
        </Reveal>

        {/* Structured Case Study Sections */}
        <div className="mt-10 space-y-10">
          {/* 1. Project Overview */}
          <Reveal>
            <section aria-labelledby="overview-heading">
              <h2
                id="overview-heading"
                className="font-display text-2xl font-bold text-[#F4F4F5]"
              >
                01. Project Overview
              </h2>
              <p className="mt-3 text-base leading-[1.8] text-[#E2E8F0]">{project.overview}</p>
            </section>
          </Reveal>

          {/* 2 & 3. Problem Statement & Solution */}
          <Reveal delay={0.04}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <section
                aria-labelledby="problem-heading"
                className="rounded-xl border border-white/[0.08] bg-[#11141D] p-6 transition-colors hover:border-[#38BDF8]/30"
              >
                <h2 id="problem-heading" className="text-base font-semibold text-[#F4F4F5]">
                  02. Problem Statement
                </h2>
                <p className="mt-2.5 text-sm leading-[1.75] text-[#94A3B8]">
                  {project.problemStatement}
                </p>
              </section>

              <section
                aria-labelledby="solution-heading"
                className="rounded-xl border border-white/[0.08] bg-[#11141D] p-6 transition-colors hover:border-[#38BDF8]/30"
              >
                <h2 id="solution-heading" className="text-base font-semibold text-[#F4F4F5]">
                  03. Solution
                </h2>
                <p className="mt-2.5 text-sm leading-[1.75] text-[#94A3B8]">{project.solution}</p>
              </section>
            </div>
          </Reveal>

          {/* 4. Technology Stack */}
          <Reveal delay={0.05}>
            <section
              aria-labelledby="stack-heading"
              className="rounded-xl border border-white/[0.08] bg-[#11141D] p-6 transition-colors hover:border-white/[0.15]"
            >
              <h2 id="stack-heading" className="text-base font-semibold text-[#F4F4F5]">
                04. Technology Stack
              </h2>
              <p className="mt-3 font-mono text-sm leading-relaxed text-[#38BDF8]">
                {project.techStack.join('  ·  ')}
              </p>
            </section>
          </Reveal>

          {/* 5. Architecture / Workflow */}
          <Reveal delay={0.06}>
            <section aria-labelledby="architecture-heading">
              <h2
                id="architecture-heading"
                className="font-display text-2xl font-bold text-[#F4F4F5]"
              >
                05. Architecture & Workflow
              </h2>
              <div className="mt-4">
                <ArchitectureFlow
                  label={project.architectureLabel}
                  nodes={project.architectureNodes}
                />
              </div>
            </section>
          </Reveal>

          {/* 6 & 7. Key Implemented Features & My Contribution */}
          <Reveal delay={0.06}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <section
                aria-labelledby="features-heading"
                className="rounded-xl border border-white/[0.08] bg-[#11141D] p-6 transition-colors hover:border-white/[0.15]"
              >
                <h2 id="features-heading" className="text-base font-semibold text-[#F4F4F5]">
                  06. Key Implemented Features
                </h2>
                <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#E2E8F0]">
                  {project.implementedFeatures.map((feat) => (
                    <li key={feat} className="flex gap-2.5">
                      <span className="text-[#E2B76E]" aria-hidden="true">
                        —
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section
                aria-labelledby="contribution-heading"
                className="rounded-xl border border-white/[0.08] bg-[#11141D] p-6 transition-colors hover:border-white/[0.15]"
              >
                <h2 id="contribution-heading" className="text-base font-semibold text-[#F4F4F5]">
                  07. My Contribution
                </h2>
                <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#E2E8F0]">
                  {project.contribution.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="text-[#38BDF8]" aria-hidden="true">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </Reveal>

          {/* 8 & 9. Current Status & Known Limitations */}
          <Reveal delay={0.06}>
            <section
              aria-labelledby="limitations-heading"
              className="rounded-xl border border-white/[0.08] bg-[#11141D] p-6 sm:p-8"
            >
              <h2 id="limitations-heading" className="text-base font-semibold text-[#F4F4F5]">
                08. Current Status & Known Limitations
              </h2>
              <p className="mt-2 font-mono text-xs font-medium text-[#38BDF8]">
                Status: {project.status}
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#94A3B8]">
                {project.limitations.map((lim) => (
                  <li key={lim} className="flex gap-2.5">
                    <span className="text-[#E2B76E]" aria-hidden="true">
                      —
                    </span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* 10. GitHub Repository */}
          <Reveal delay={0.06}>
            <section
              aria-labelledby="repo-heading"
              className="flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-[#11141D] p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 id="repo-heading" className="text-base font-semibold text-[#F4F4F5]">
                  09. Source Code Repository
                </h2>
                <p className="mt-1 font-mono text-xs text-[#94A3B8] break-all">
                  {project.githubUrl}
                </p>
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile group inline-flex h-10 shrink-0 items-center gap-2 rounded-md bg-[#F4F4F5] px-4 text-xs font-semibold text-[#08090D] hover:bg-[#38BDF8]"
              >
                <Github className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span>Open on GitHub</span>
              </a>
            </section>
          </Reveal>
        </div>

        {/* Previous / Next Case Study Navigation */}
        <nav
          aria-label="Project Case Study Navigation"
          className="mt-12 flex flex-col gap-4 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#F4F4F5] transition-colors hover:text-[#38BDF8]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Previous: {prevProject.title}</span>
            </Link>
          ) : (
            <span />
          )}

          {nextProject && (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#F4F4F5] transition-colors hover:text-[#38BDF8]"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
