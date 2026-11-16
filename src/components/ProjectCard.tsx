import { Link } from 'react-router-dom';
import { ArrowRight, Github } from 'lucide-react';
import { ProjectItem } from '../data/projects';
import { ArchitectureFlow } from './ArchitectureFlow';

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-6 sm:p-8 transition-colors duration-150 hover:border-[#53677D]/50">
      <div>
        {/* Quiet 1-line kicker metadata with typographic separators */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B6B6B]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono font-medium text-[#A68A64] tabular-nums">
              {project.index}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-[#53677D]">{project.category}</span>
          </div>
          <span className="font-medium text-[#242424]">{project.status}</span>
        </div>

        <h3 className="mt-3 font-serif text-2xl font-medium tracking-tight text-[#242424]">
          <Link
            to={`/projects/${project.slug}`}
            className="transition-colors hover:text-[#53677D]"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-3 text-sm leading-[1.7] text-[#6B6B6B] sm:text-[15px]">
          {project.shortDescription}
        </p>

        {/* Compact Architecture Preview for Featured Diagram Projects */}
        {(project.slug === 'daily-linkedin-news-agent' ||
          project.slug === 'campushire' ||
          project.slug === 'fixmycampus-2-0') && (
          <div className="mt-5">
            <ArchitectureFlow
              label={project.architectureLabel}
              nodes={project.architectureNodes}
              compact
            />
          </div>
        )}

        {/* Limitations callout for Smart Attendance or incomplete projects */}
        {project.slug === 'smart-attendance' && (
          <div className="mt-5 rounded-md border border-[#E5E2DB] bg-[#F7F6F2] p-4">
            <p className="text-xs font-medium text-[#242424]">Current Development State</p>
            <p className="mt-1 text-xs leading-relaxed text-[#6B6B6B]">
              Frontend is prepared and Supabase database connectivity is working. Face recognition integration is not yet functioning correctly and remains pending.
            </p>
          </div>
        )}

        {/* Unboxed tech stack text list */}
        <div className="mt-5 border-t border-[#E5E2DB] pt-4">
          <p className="font-mono text-xs leading-relaxed text-[#242424]">
            {project.techStack.join('  ·  ')}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-[#242424] px-4 text-xs font-medium text-[#F7F6F2] transition-colors hover:bg-[#3A3A3A] whitespace-nowrap"
        >
          <span>View Case Study</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center gap-1.5 rounded-md border border-[#E5E2DB] bg-[#FFFFFF] px-3.5 text-xs font-medium text-[#242424] transition-colors hover:border-[#242424] whitespace-nowrap"
        >
          <Github className="h-3.5 w-3.5" />
          <span>GitHub Repository</span>
        </a>
      </div>
    </article>
  );
}
