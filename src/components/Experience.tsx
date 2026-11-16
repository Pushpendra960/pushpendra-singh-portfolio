import { Eye } from 'lucide-react';
import { INTERNSHIPS, LEADERSHIP_ROLES, VOLUNTEERING_EVENTS } from '../data/experience';
import { LightboxItem } from './CertificateModal';

interface ExperienceProps {
  onOpenDocument: (item: LightboxItem) => void;
}

export function Experience({ onOpenDocument }: ExperienceProps) {
  return (
    <section id="experience" className="border-b border-[#E5E2DB] bg-[#F7F6F2]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Internships Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#53677D]">
              Industry Training & Internships
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#242424]">
              Internship Experience
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#6B6B6B]">
            Two completed one-month internships with structured deliverables, separate from independent personal projects.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="mt-10 space-y-8">
          {INTERNSHIPS.map((exp) => (
            <article
              key={exp.id}
              className="rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left Column: Organization, Role, Metadata & Documents */}
                <div className="lg:col-span-4">
                  <p className="text-xs font-medium text-[#53677D]">
                    {exp.mode} · {exp.duration}
                  </p>
                  <h3 className="mt-1.5 font-serif text-2xl font-medium text-[#242424]">
                    {exp.organization}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[#242424]">{exp.role}</p>

                  <dl className="mt-5 space-y-2 border-t border-[#E5E2DB] pt-4 text-xs text-[#6B6B6B]">
                    <div className="flex justify-between gap-2">
                      <dt>Duration</dt>
                      <dd className="text-right font-medium text-[#242424] tabular-nums">
                        {exp.period}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt>{exp.credentialLabel}</dt>
                      <dd className="text-right font-mono text-[#242424]">{exp.credentialId}</dd>
                    </div>
                  </dl>

                  {/* Original Document Previews */}
                  <div className="mt-6 space-y-3">
                    <p className="text-xs font-medium text-[#6B6B6B]">Verified Documents</p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      {exp.documents.map((doc) => (
                        <button
                          key={doc.title}
                          type="button"
                          onClick={() =>
                            onOpenDocument({
                              title: doc.title,
                              subtitle: exp.organization,
                              imagePath: doc.imagePath,
                              issueDate: exp.period,
                              credentialId: exp.credentialId,
                              kind: doc.kind,
                            })
                          }
                          className="group flex items-center gap-3 rounded-md border border-[#E5E2DB] bg-[#F7F6F2] p-2.5 text-left transition-colors hover:border-[#53677D]"
                        >
                          <img
                            src={doc.imagePath}
                            alt={doc.title}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="h-14 w-20 shrink-0 rounded border border-[#E5E2DB] bg-white object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-[#242424] truncate">
                              {doc.kind}
                            </p>
                            <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-[#53677D] group-hover:text-[#242424]">
                              <Eye className="h-3 w-3" />
                              <span>View Original</span>
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Summary, Deliverables, Tech Exposure */}
                <div className="border-t border-[#E5E2DB] pt-6 lg:col-span-8 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
                  <p className="text-sm leading-[1.7] text-[#6B6B6B] sm:text-[15px]">
                    {exp.summary}
                  </p>

                  <div className="mt-6">
                    <h4 className="text-xs font-semibold tracking-wide text-[#53677D]">
                      Documented Deliverables
                    </h4>
                    <div className="mt-3 divide-y divide-[#E5E2DB] border-y border-[#E5E2DB]">
                      {exp.deliverables.map((task) => (
                        <div key={task.title} className="py-3">
                          <p className="text-sm font-medium text-[#242424]">{task.title}</p>
                          <p className="mt-1 text-xs leading-relaxed text-[#6B6B6B]">
                            {task.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-medium text-[#6B6B6B]">
                      Technology Exposure During Internship
                    </p>
                    <p className="mt-1.5 font-mono text-xs leading-relaxed text-[#242424]">
                      {exp.technologies.join('  ·  ')}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Leadership & Community Involvement */}
        <div className="mt-16 border-t border-[#E5E2DB] pt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#53677D]">Campus Engagement</p>
              <h3 className="mt-2 font-serif text-2xl font-medium tracking-tight text-[#242424] sm:text-3xl">
                Leadership & Community Involvement
              </h3>
            </div>
            <p className="max-w-md text-sm text-[#6B6B6B]">
              Previous club responsibilities, technical society membership, and volunteer event support.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Club Roles */}
            <div className="space-y-4 lg:col-span-5">
              {LEADERSHIP_ROLES.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-5"
                >
                  <p className="text-xs font-medium text-[#53677D]">{item.period}</p>
                  <h4 className="mt-1 text-base font-semibold text-[#242424]">{item.role}</h4>
                  <p className="text-sm text-[#242424]">{item.organization}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#6B6B6B]">{item.detail}</p>
                </div>
              ))}
            </div>

            {/* Event Volunteering */}
            <div className="rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-6 lg:col-span-7">
              <h4 className="text-base font-semibold text-[#242424]">
                Event Volunteering & Coordination Support
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-[#6B6B6B]">
                Contributed as a volunteer supporting documentation, event coordination, class-to-class promotion, and discipline/crowd coordination across major campus events.
              </p>

              <div className="mt-5 divide-y divide-[#E5E2DB] border-t border-[#E5E2DB]">
                {VOLUNTEERING_EVENTS.map((v) => (
                  <div
                    key={v.event}
                    className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <span className="text-sm font-medium text-[#242424]">{v.event}</span>
                    <span className="text-xs text-[#6B6B6B]">{v.contributions.join(' · ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
