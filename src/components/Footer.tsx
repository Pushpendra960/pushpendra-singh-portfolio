import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { Reveal } from './MotionPrimitives';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#08090D]">
      <Reveal direction="up" distance={18} className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-base font-bold text-[#F4F4F5]">
              {PROFILE.name}
              <span className="text-[#38BDF8]" aria-hidden="true">.</span>
            </p>
            <p className="mt-1 text-xs text-[#94A3B8]">
              {PROFILE.positioning} · {PROFILE.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[#94A3B8]">
            <a
              href={`mailto:${PROFILE.email}`}
              className="transition-colors hover:text-[#38BDF8]"
            >
              {PROFILE.email}
            </a>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 transition-colors hover:text-[#38BDF8]"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={PROFILE.links.githubPrimary}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 transition-colors hover:text-[#38BDF8]"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={PROFILE.links.githubCollege}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 transition-colors hover:text-[#38BDF8]"
            >
              <span>College GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.08] pt-6 text-xs text-[#64748B] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. All factual credentials verified from academic and internship records.
          </p>
          <p className="font-mono tabular-nums text-[#94A3B8]">
            B.Tech CSE (Cloud Computing) · {PROFILE.duration}
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
