import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Github } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { ArchitectureFlow } from '../components/ArchitectureFlow';
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
    <main className="bg-[#F7F6F2] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#53677D] transition-colors hover:text-[#242424]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Featured Projects</span>
        </Link>

        {/* Case Study Header */}
        <header className="mt-6 border-b border-[#E5E2DB] pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B6B6B]">
            <span className="font-mono font-medium text-[#A68A64] tabular-nums">
              Project {project.index}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-[#53677D]">{project.category}</span>
          </div>

          <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#242424] sm:text-4xl lg:text-[42px]">
            {project.title}
          </h1>

          <p className="mt-4 max-w-[65ch] text-base leading-[1.7] text-[#6B6B6B]">
            {project.shortDescription}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] px-5 py-4">
            <div>
              <p className="text-[11px] font-medium text-[#6B6B6B]">Current Status</p>
              <p className="mt-0.5 text-sm font-semibold text-[#242424]">{project.status}</p>
            </div>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-[#242424] px-4 text-xs font-medium text-[#F7F6F2] transition-colors hover:bg-[#3A3A3A] whitespace-nowrap"
            >
              <Github className="h-4 w-4" />
              <span>View GitHub Repository</span>
            </a>
          </div>
        </header>

        {/* Structured Case Study Sections */}
        <div className="mt-10 space-y-10">
          {/* 1. Project Overview */}
          <section aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="font-serif text-2xl font-medium text-[#242424]">
              01. Project Overview
            </h2>
            <p className="mt-3 text-base leading-[1.75] text-[#242424]">{project.overview}</p>
          </section>

          {/* 2 & 3. Problem Statement & Solution */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <section
              aria-labelledby="problem-heading"
              className="rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-6"
            >
              <h2 id="problem-heading" className="text-base font-semibold text-[#242424]">
                02. Problem Statement
              </h2>
              <p className="mt-2.5 text-sm leading-[1.7] text-[#6B6B6B]">
                {project.problemStatement}
              </p>
            </section>

            <section
              aria-labelledby="solution-heading"
              className="rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-6"
            >
              <h2 id="solution-heading" className="text-base font-semibold text-[#242424]">
                03. Solution
              </h2>
              <p className="mt-2.5 text-sm leading-[1.7] text-[#6B6B6B]">{project.solution}</p>
            </section>
          </div>

          {/* 4. Technology Stack */}
          <section
            aria-labelledby="stack-heading"
            className="rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-6"
          >
            <h2 id="stack-heading" className="text-base font-semibold text-[#242424]">
              04. Technology Stack
            </h2>
            <p className="mt-3 font-mono text-sm leading-relaxed text-[#53677D]">
              {project.techStack.join('  ·  ')}
            </p>
          </section>

          {/* 5. Architecture / Workflow */}
          <section aria-labelledby="architecture-heading">
            <h2
              id="architecture-heading"
              className="font-serif text-2xl font-medium text-[#242424]"
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

          {/* 6 & 7. Key Implemented Features & My Contribution */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <section
              aria-labelledby="features-heading"
              className="rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-6"
            >
              <h2 id="features-heading" className="text-base font-semibold text-[#242424]">
                06. Key Implemented Features
              </h2>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#242424]">
                {project.implementedFeatures.map((feat) => (
                  <li key={feat} className="flex gap-2.5">
                    <span className="text-[#A68A64]" aria-hidden="true">
                      —
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="contribution-heading"
              className="rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-6"
            >
              <h2 id="contribution-heading" className="text-base font-semibold text-[#242424]">
                07. My Contribution
              </h2>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#242424]">
                {project.contribution.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="text-[#53677D]" aria-hidden="true">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 8 & 9. Current Status & Known Limitations */}
          <section
            aria-labelledby="limitations-heading"
            className="rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-6 sm:p-8"
          >
            <h2 id="limitations-heading" className="text-base font-semibold text-[#242424]">
              08. Current Status & Known Limitations
            </h2>
            <p className="mt-2 text-sm font-medium text-[#53677D]">Status: {project.status}</p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#6B6B6B]">
              {project.limitations.map((lim) => (
                <li key={lim} className="flex gap-2.5">
                  <span className="text-[#242424]" aria-hidden="true">
                    —
                  </span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 10. GitHub Repository */}
          <section
            aria-labelledby="repo-heading"
            className="flex flex-col gap-4 rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 id="repo-heading" className="text-base font-semibold text-[#242424]">
                09. Source Code Repository
              </h2>
              <p className="mt-1 font-mono text-xs text-[#6B6B6B] break-all">
                {project.githubUrl}
              </p>
            </div>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-[#242424] bg-[#242424] px-4 text-xs font-medium text-[#F7F6F2] transition-colors hover:bg-[#3A3A3A]"
            >
              <Github className="h-4 w-4" />
              <span>Open on GitHub</span>
            </a>
          </section>
        </div>

        {/* Previous / Next Case Study Navigation */}
        <nav
          aria-label="Project Case Study Navigation"
          className="mt-12 flex flex-col gap-4 border-t border-[#E5E2DB] pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#242424] transition-colors hover:text-[#53677D]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous: {prevProject.title}</span>
            </Link>
          ) : (
            <span />
          )}

          {nextProject && (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#242424] transition-colors hover:text-[#53677D]"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
