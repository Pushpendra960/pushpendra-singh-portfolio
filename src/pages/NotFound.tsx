import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F6F2] px-4 py-20">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs font-medium text-[#A68A64]">404</p>
        <h1 className="mt-2 font-serif text-3xl font-medium text-[#242424]">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#6B6B6B]">
          The requested page or project case study does not exist at this URL.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-[#242424] px-5 text-xs font-medium text-[#F7F6F2] transition-colors hover:bg-[#3A3A3A]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Portfolio</span>
        </Link>
      </div>
    </main>
  );
}
