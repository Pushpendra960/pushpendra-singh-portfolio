import { ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/profile';

export function Footer() {
  return (
    <footer className="border-t border-[#E5E2DB] bg-[#F7F6F2]">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-serif text-base font-medium text-[#242424]">{PROFILE.name}</p>
            <p className="mt-1 text-xs text-[#6B6B6B]">
              {PROFILE.positioning} · {PROFILE.location}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[#6B6B6B]">
            <a
              href={`mailto:${PROFILE.email}`}
              className="transition-colors hover:text-[#242424]"
            >
              {PROFILE.email}
            </a>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-[#242424]"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={PROFILE.links.githubPrimary}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-[#242424]"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={PROFILE.links.githubCollege}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-[#242424]"
            >
              <span>College GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-[#E5E2DB] pt-6 text-xs text-[#6B6B6B] flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {PROFILE.name}. All factual credentials verified from academic and internship records.</p>
          <p className="tabular-nums">B.Tech CSE (Cloud Computing) · {PROFILE.duration}</p>
        </div>
      </div>
    </footer>
  );
}
