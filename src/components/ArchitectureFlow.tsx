import { ArrowRight } from 'lucide-react';
import { ArchitectureNode } from '../data/projects';

interface ArchitectureFlowProps {
  label: string;
  nodes: ArchitectureNode[];
  compact?: boolean;
}

export function ArchitectureFlow({ label, nodes, compact = false }: ArchitectureFlowProps) {
  return (
    <div className="rounded-md border border-[#E5E2DB] bg-[#F7F6F2] p-4 sm:p-5">
      <p className="text-xs font-medium text-[#53677D]">{label}</p>

      <div
        className={`mt-4 grid gap-3 ${
          compact
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}
      >
        {nodes.map((node, index) => (
          <div
            key={node.step}
            className="relative flex flex-col justify-between rounded-md border border-[#E5E2DB] bg-[#FFFFFF] p-3.5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-medium text-[#A68A64] tabular-nums">
                {node.step}
              </span>
              {index < nodes.length - 1 && (
                <ArrowRight className="h-3.5 w-3.5 text-[#6B6B6B]/70" aria-hidden="true" />
              )}
            </div>
            <p className="mt-2 text-sm font-semibold text-[#242424]">{node.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#6B6B6B]">{node.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
