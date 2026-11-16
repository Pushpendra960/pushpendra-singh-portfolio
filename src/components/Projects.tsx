import { PROJECTS } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export function Projects() {
  return (
    <section id="projects" className="border-b border-[#E5E2DB] bg-[#FFFFFF]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#53677D]">Independent Builds</p>
            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#242424]">
              Featured Projects
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-[#6B6B6B]">
            Personal software systems built outside of internship coursework, documented transparently with their current implementation status and technical limitations.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
