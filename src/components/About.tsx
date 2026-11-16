import { PROFILE } from '../data/profile';

export function About() {
  return (
    <section id="about" className="border-b border-[#E5E2DB] bg-[#FFFFFF]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Rail: Section Title & Academic Highlights */}
          <div className="lg:col-span-4">
            <p className="text-xs font-medium tracking-wide text-[#53677D]">Profile</p>
            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#242424]">
              A Little About Me
            </h2>

            <dl className="mt-8 divide-y divide-[#E5E2DB] border-y border-[#E5E2DB]">
              <div className="flex items-baseline justify-between gap-4 py-3.5 text-sm">
                <dt className="text-[#6B6B6B]">Program</dt>
                <dd className="text-right font-medium text-[#242424]">B.Tech CSE</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3.5 text-sm">
                <dt className="text-[#6B6B6B]">Specialization</dt>
                <dd className="text-right font-medium text-[#242424]">{PROFILE.specialization}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3.5 text-sm">
                <dt className="text-[#6B6B6B]">Institution</dt>
                <dd className="text-right font-medium text-[#242424]">IILM University</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3.5 text-sm">
                <dt className="text-[#6B6B6B]">Graduation</dt>
                <dd className="text-right font-medium text-[#242424] tabular-nums">2029</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-3.5 text-sm">
                <dt className="text-[#6B6B6B]">Current CGPA</dt>
                <dd className="text-right font-semibold text-[#242424] tabular-nums">
                  {PROFILE.cgpa}
                </dd>
              </div>
            </dl>

            {/* Academic Highlight */}
            <div className="mt-6 rounded-lg border border-[#E5E2DB] bg-[#F7F6F2] p-4">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-sm font-semibold text-[#242424] tabular-nums">
                  {PROFILE.academicHighlight.score} – {PROFILE.academicHighlight.subject}
                </span>
                <span className="text-xs font-medium text-[#A68A64]">Academic Highlight</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[#6B6B6B]">
                {PROFILE.academicHighlight.note}
              </p>
            </div>
          </div>

          {/* Right Column: Narrative Prose */}
          <div className="lg:col-span-8 lg:pt-8">
            <div className="space-y-5 text-base leading-[1.75] text-[#242424] max-w-[66ch]">
              {PROFILE.aboutParagraphs.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
