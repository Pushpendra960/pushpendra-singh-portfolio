import { AWS_CLOUD_PROFILE, CORE_SKILL_GROUPS, DSA_PROFILE, ProficiencyLevel } from '../data/skills';

function proficiencyTone(level: ProficiencyLevel): string {
  switch (level) {
    case 'Advanced':
      return 'text-[#242424] font-semibold';
    case 'Intermediate':
      return 'text-[#53677D] font-medium';
    case 'Working Knowledge':
      return 'text-[#53677D] font-medium';
    case 'Beginner':
    default:
      return 'text-[#6B6B6B] font-normal';
  }
}

export function Skills() {
  return (
    <section id="skills" className="border-b border-[#E5E2DB] bg-[#F7F6F2]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#53677D]">Technical Capabilities</p>
            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#242424]">
              Skills & Practical Exposure
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#6B6B6B]">
            Honest proficiency ratings reflecting active coursework, personal builds, and hands-on cloud labs—without inflated percentages.
          </p>
        </div>

        {/* Categorized Core Skill Matrix */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_SKILL_GROUPS.map((group) => (
            <div
              key={group.id}
              className="flex flex-col justify-between rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-5"
            >
              <div>
                <h3 className="text-sm font-semibold text-[#242424]">{group.title}</h3>
                {group.subtitle && (
                  <p className="mt-1 text-xs leading-relaxed text-[#6B6B6B]">{group.subtitle}</p>
                )}

                <ul className="mt-4 divide-y divide-[#E5E2DB]/70 border-t border-[#E5E2DB]/70">
                  {group.items.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-baseline justify-between gap-3 py-2.5 text-sm"
                    >
                      <span className="font-medium text-[#242424]">{skill.name}</span>
                      <span className={`text-xs shrink-0 ${proficiencyTone(skill.level)}`}>
                        {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Data Structures & Algorithms Breakdown */}
        <div className="mt-8 rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-lg font-semibold text-[#242424]">
              Data Structures & Algorithms
            </h3>
            <span className="text-xs font-medium text-[#53677D]">
              Proficiency: {DSA_PROFILE.level}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="text-xs font-medium text-[#6B6B6B]">
                Studied Topics & Working Knowledge
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#242424]">
                {DSA_PROFILE.coveredTopics.join(' · ')}
              </p>
            </div>
            <div className="border-t border-[#E5E2DB] pt-4 md:col-span-4 md:border-t-0 md:border-l md:pl-6 md:pt-0">
              <p className="text-xs font-medium text-[#6B6B6B]">
                Areas Currently Under Further Development
              </p>
              <p className="mt-2 text-sm font-medium text-[#242424]">
                {DSA_PROFILE.needsDevelopment.join(' · ')}
              </p>
            </div>
          </div>
        </div>

        {/* AWS & Cloud Computing – Practical Exposure */}
        <div className="mt-8 rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-6 sm:p-8">
          <div className="flex flex-col gap-2 border-b border-[#E5E2DB] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#242424]">
                {AWS_CLOUD_PROFILE.heading}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-[#6B6B6B]">
                {AWS_CLOUD_PROFILE.note}
              </p>
            </div>
            <span className="text-xs font-medium text-[#53677D] shrink-0">
              Overall AWS Exposure: {AWS_CLOUD_PROFILE.overallLevel}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {AWS_CLOUD_PROFILE.categories.map((cat) => (
              <div key={cat.category} className="border-b border-[#E5E2DB]/60 pb-4">
                <h4 className="text-xs font-semibold tracking-wide text-[#53677D]">
                  {cat.category}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[#242424]">
                  {cat.services.join(' · ')}
                </p>
              </div>
            ))}
          </div>

          {/* Cloud Fundamentals Subsection */}
          <div className="mt-6 rounded-md bg-[#F7F6F2] p-4 sm:p-5">
            <h4 className="text-xs font-semibold tracking-wide text-[#242424]">
              Cloud Computing Fundamentals
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-[#6B6B6B]">
              {AWS_CLOUD_PROFILE.fundamentals.join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
