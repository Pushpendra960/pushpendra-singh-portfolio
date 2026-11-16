import { useState } from 'react';
import { Check, Copy, Mail, Linkedin, Github, ArrowUpRight, Download } from 'lucide-react';
import { PROFILE } from '../data/profile';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard fallback when restricted
      const input = document.createElement('input');
      input.value = PROFILE.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="contact" className="bg-[#F7F6F2]">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="rounded-lg border border-[#E5E2DB] bg-[#FFFFFF] p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium tracking-wide text-[#53677D]">Get in Touch</p>
              <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#242424] sm:text-4xl">
                {PROFILE.contactHeading}
              </h2>
              <p className="mt-4 max-w-[58ch] text-base leading-[1.7] text-[#6B6B6B]">
                {PROFILE.contactSubcopy}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-[#242424] px-5 text-sm font-medium text-[#F7F6F2] transition-colors hover:bg-[#3A3A3A] whitespace-nowrap"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send an Email</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-[#E5E2DB] bg-[#FFFFFF] px-4 text-sm font-medium text-[#242424] transition-colors hover:border-[#242424] whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-[#53677D]" />
                      <span>Email Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={PROFILE.links.resumePdf}
                  download="Pushpendra_Singh_Resume.pdf"
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-[#E5E2DB] bg-[#F7F6F2] px-4 text-sm font-medium text-[#242424] transition-colors hover:border-[#242424] whitespace-nowrap"
                >
                  <Download className="h-4 w-4" />
                  <span>Resume PDF</span>
                </a>
              </div>
            </div>

            <div className="border-t border-[#E5E2DB] pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
              <dl className="divide-y divide-[#E5E2DB] border-y border-[#E5E2DB]">
                <div className="py-4">
                  <dt className="text-xs font-medium text-[#6B6B6B]">Direct Email</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="break-all font-mono text-sm font-medium text-[#242424] transition-colors hover:text-[#53677D]"
                    >
                      {PROFILE.email}
                    </a>
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-xs font-medium text-[#6B6B6B]">LinkedIn</dt>
                  <dd className="mt-1">
                    <a
                      href={PROFILE.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#242424] transition-colors hover:text-[#53677D]"
                    >
                      <Linkedin className="h-4 w-4 text-[#53677D]" />
                      <span>linkedin.com/in/pushpendrasingh9996</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#6B6B6B]" />
                    </a>
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-xs font-medium text-[#6B6B6B]">GitHub (Primary & College)</dt>
                  <dd className="mt-1.5 flex flex-col gap-1.5">
                    <a
                      href={PROFILE.links.githubPrimary}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#242424] transition-colors hover:text-[#53677D]"
                    >
                      <Github className="h-4 w-4 text-[#53677D]" />
                      <span>github.com/Pushpendra960</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#6B6B6B]" />
                    </a>
                    <a
                      href={PROFILE.links.githubCollege}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B6B6B] transition-colors hover:text-[#242424]"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>github.com/Pushpendra8701 (College Account)</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
