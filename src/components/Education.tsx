import { PROFILE } from '../data/profile';

export function Education() {
  return (
    <section id="education" className="border-b border-[#E5E2DB] bg-[#FFFFFF]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium tracking-wide text-[#53677D]">Academic Foundation</p>
            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#242424]">
              Education
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-lg border border-[#E5E2DB] bg-[#F7F6F2] p-6 sm:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#242424] sm:text-2xl">
                    {PROFILE.degree} — {PROFILE.branch}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#53677D]">
                    Specialization: {PROFILE.specialization}
                  </p>
                </div>
                <span className="font-mono text-sm font-medium text-[#242424] tabular-nums shrink-0">
                  {PROFILE.duration}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#6B6B6B]">
                <span>{PROFILE.university}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#242424] tabular-nums">
                  Current CGPA: {PROFILE.cgpa}
                </span>
              </div>

              <div className="mt-6 border-t border-[#E5E2DB] pt-5">
                <p className="text-xs font-semibold tracking-wide text-[#53677D]">
                  Selected Relevant Coursework
                </p>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {PROFILE.relevantSubjects.map((subject) => (
                    <div
                      key={subject}
                      className="rounded-md border border-[#E5E2DB] bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#242424]"
                    >
                      {subject}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
