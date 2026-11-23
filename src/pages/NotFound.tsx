import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#08090D] px-4 py-20">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#38BDF8]">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-[#F4F4F5]">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">
          The requested page or project case study does not exist at this URL.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-[#F4F4F5] px-5 text-xs font-semibold text-[#08090D] transition-colors hover:bg-[#38BDF8]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Portfolio</span>
        </Link>
      </div>
    </main>
  );
}
