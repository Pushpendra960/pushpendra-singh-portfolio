import { Eye } from 'lucide-react';
import { MAJOR_ACHIEVEMENTS, OTHER_RECOGNITION } from '../data/achievements';
import { LightboxItem } from './CertificateModal';

interface AchievementsProps {
  onOpenDocument: (item: LightboxItem) => void;
}

export function Achievements({ onOpenDocument }: AchievementsProps) {
  return (
    <section id="achievements" className="border-b border-[#E5E2DB] bg-[#FFFFFF]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#53677D]">
              Awards & Milestones
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#242424]">
              Achievements & Recognition
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#6B6B6B]">
            Verified exhibition awards, academic honors, and documented hackathon participation.
          </p>
        </div>

        {/* Major 3 Achievements */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {MAJOR_ACHIEVEMENTS.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-lg border border-[#E5E2DB] bg-[#F7F6F2] p-6"
            >
              <div>
                <p className="font-serif text-2xl font-medium text-[#A68A64] tabular-nums">
                  {item.rankOrMetric}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[#242424]">{item.title}</h3>
                <p className="mt-1 text-sm font-medium text-[#53677D]">{item.event}</p>

                <dl className="mt-4 space-y-1.5 border-t border-[#E5E2DB] pt-3 text-xs text-[#6B6B6B]">
                  {item.theme && (
                    <div>
                      <span className="font-medium text-[#242424]">Theme:</span> {item.theme}
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-[#242424]">Organizer:</span> {item.organizer}
                  </div>
                  <div className="tabular-nums">
                    <span className="font-medium text-[#242424]">Date:</span> {item.date}
                  </div>
                </dl>

                {item.note && (
                  <p className="mt-3 text-xs leading-relaxed text-[#6B6B6B]">{item.note}</p>
                )}
              </div>

              {item.proofImage && (
                <button
                  type="button"
                  onClick={() =>
                    onOpenDocument({
                      title: item.proofTitle || item.title,
                      subtitle: item.organizer,
                      imagePath: item.proofImage!,
                      issueDate: item.date,
                      kind: 'Award Proof',
                    })
                  }
                  className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#E5E2DB] bg-[#FFFFFF] px-3 text-xs font-medium text-[#242424] transition-colors hover:border-[#242424]"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>View Original Proof</span>
                </button>
              )}
            </article>
          ))}
        </div>

        {/* Other Recognition (Participation & Community) */}
        <div className="mt-8 rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-6">
          <h3 className="text-sm font-semibold text-[#242424]">
            Hackathon Participation & Community Presence
          </h3>
          <div className="mt-4 divide-y divide-[#E5E2DB] border-t border-[#E5E2DB]">
            {OTHER_RECOGNITION.map((rec) => (
              <div
                key={rec.title}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-xs font-medium text-[#53677D]">{rec.category}</p>
                  <p className="mt-0.5 text-sm font-semibold text-[#242424]">{rec.title}</p>
                  <p className="mt-1 text-xs text-[#6B6B6B]">{rec.detail}</p>
                </div>

                {rec.proofImage && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenDocument({
                        title: rec.proofTitle || rec.title,
                        subtitle: rec.category,
                        imagePath: rec.proofImage!,
                        kind: 'Participation Certificate',
                      })
                    }
                    className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border border-[#E5E2DB] bg-[#F7F6F2] px-3 text-xs font-medium text-[#242424] transition-colors hover:border-[#242424]"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View Certificate</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
