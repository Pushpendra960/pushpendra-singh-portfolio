import { Link } from 'react-router-dom';
import { ArrowRight, Github } from 'lucide-react';
import { ProjectItem } from '../data/projects';
import { ArchitectureFlow } from './ArchitectureFlow';
import { InteractiveTiltCard } from './MotionPrimitives';

interface ProjectCardProps {
  project: ProjectItem;
  featured?: boolean;
}

function statusAccent(tone: ProjectItem['statusTone']): string {
  switch (tone) {
    case 'working':
      return 'text-[#38BDF8]';
    case 'prototype':
      return 'text-[#7DD3FC]';
    case 'backend':
      return 'text-[#E2E8F0]';
    case 'in-development':
    default:
      return 'text-[#E2B76E]';
  }
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const isFeatured = featured || Boolean(project.featuredNote);

  return (
    <InteractiveTiltCard
      tiltStrength={isFeatured ? 2.5 : 3.6}
      spotlightColor={isFeatured ? 'rgba(56, 189, 248, 0.14)' : 'rgba(56, 189, 248, 0.1)'}
      className={`group flex h-full flex-col justify-between rounded-xl border bg-[#11141D] p-6 sm:p-8 ${
        isFeatured
          ? 'border-[#38BDF8]/35 hover:border-[#38BDF8]/75 hover:shadow-[0_22px_50px_-18px_rgba(56,189,248,0.28)]'
          : 'border-white/[0.08] hover:border-[#38BDF8]/55 hover:shadow-[0_20px_44px_-18px_rgba(56,189,248,0.2)]'
      }`}
    >
      {isFeatured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8]/80 to-transparent transition-opacity duration-300 group-hover:opacity-100"
        />
      )}

      <div className="relative z-10">
        {/* 1-line architectural kicker metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono font-semibold text-[#E2B76E] tabular-nums transition-transform duration-200 group-hover:translate-x-0.5">
              {project.index}
            </span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="font-medium text-[#94A3B8]">{project.category}</span>
            {project.featuredNote && (
              <>
                <span aria-hidden="true" className="text-white/20">·</span>
                <span className="animate-float-vertical inline-block font-mono text-[11px] uppercase tracking-wider text-[#38BDF8]">
                  {project.featuredNote}
                </span>
              </>
            )}
          </div>
          <span className={`font-mono text-[11px] font-medium ${statusAccent(project.statusTone)}`}>
            {project.status}
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-[#F4F4F5] sm:text-[1.65rem] transition-transform duration-300 group-hover:translate-x-0.5">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-[#38BDF8]"
          >
            <span>{project.title}</span>
          </Link>
        </h3>

        <p className="mt-3 text-sm leading-[1.75] text-[#94A3B8] sm:text-[15px]">
          {project.shortDescription}
        </p>

        {/* Compact Architecture Preview with layered hover scale */}
        {(project.slug === 'daily-linkedin-news-agent' ||
          project.slug === 'campushire' ||
          project.slug === 'fixmycampus-2-0') && (
          <div className="mt-6 transition-transform duration-300 ease-out group-hover:scale-[1.012]">
            <ArchitectureFlow
              label={project.architectureLabel}
              nodes={project.architectureNodes}
              compact
            />
          </div>
        )}

        {/* Limitations callout for Smart Attendance */}
        {project.slug === 'smart-attendance' && (
          <div className="mt-6 rounded-lg border border-[#E2B76E]/25 bg-[#0A0C12] p-4 sm:p-5 transition-all duration-200 group-hover:border-[#E2B76E]/50 group-hover:translate-y-[-1px]">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#E2B76E]">
              Current Development State
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8] sm:text-sm">
              Frontend is prepared and Supabase database connectivity is working. Face recognition integration is not yet functioning correctly and remains pending.
            </p>
          </div>
        )}

        {/* Responsive floating-feel technology labels */}
        <div className="mt-6 border-t border-white/[0.08] pt-4">
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-xs leading-relaxed text-[#E2E8F0]">
            {project.techStack.map((tech, idx) => (
              <span key={tech} className="inline-flex items-center gap-2.5">
                <span className="transition-all duration-200 group-hover:text-[#F4F4F5] hover:-translate-y-0.5 hover:text-[#38BDF8]">
                  {tech}
                </span>
                {idx < project.techStack.length - 1 && (
                  <span aria-hidden="true" className="text-white/25">·</span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="relative z-10 mt-7 flex flex-wrap items-center justify-between gap-3 pt-1">
        <Link
          to={`/projects/${project.slug}`}
          className="btn-tactile group/btn inline-flex h-10 items-center gap-2 rounded-md bg-[#F4F4F5] px-4 text-xs font-semibold text-[#08090D] hover:bg-[#38BDF8] hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] whitespace-nowrap"
        >
          <span>View Case Study</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </Link>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-tactile group/gh inline-flex h-10 items-center gap-1.5 rounded-md border border-white/[0.12] bg-[#0A0C12] px-3.5 text-xs font-medium text-[#F4F4F5] hover:border-[#38BDF8]/55 hover:text-[#38BDF8] whitespace-nowrap"
        >
          <Github className="h-3.5 w-3.5 transition-transform duration-200 group-hover/gh:-translate-y-0.5 group-hover/gh:rotate-[-6deg]" />
          <span>GitHub Repository</span>
        </a>
      </div>
    </InteractiveTiltCard>
  );
}
