import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ArchitectureNode } from '../data/projects';
import { CINEMATIC_EASE } from './MotionPrimitives';

interface ArchitectureFlowProps {
  label: string;
  nodes: ArchitectureNode[];
  compact?: boolean;
}

export function ArchitectureFlow({ label, nodes, compact = false }: ArchitectureFlowProps) {
  const reduced = useReducedMotion();

  return (
    <div className="rounded-lg border border-white/[0.08] bg-[#0A0C12] p-4 sm:p-5 transition-colors duration-200 group-hover:border-white/[0.13]">
      <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-[#38BDF8]">
        {label}
      </p>

      <div
        className={`mt-4 grid gap-2.5 ${
          compact
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}
      >
        {nodes.map((node, index) => (
          <motion.div
            key={node.step}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{
              duration: 0.38,
              delay: Math.min(index * 0.045, 0.25),
              ease: CINEMATIC_EASE,
            }}
            className="group/node relative flex flex-col justify-between rounded-md border border-white/[0.07] bg-[#11141D] p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#38BDF8]/40 hover:bg-[#151A28]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-medium text-[#E2B76E] tabular-nums">
                {node.step}
              </span>
              {index < nodes.length - 1 && (
                <ArrowRight
                  className="h-3.5 w-3.5 text-[#64748B] transition-transform duration-200 group-hover/node:translate-x-1 group-hover/node:text-[#38BDF8]"
                  aria-hidden="true"
                />
              )}
            </div>
            <p className="mt-2 text-sm font-semibold text-[#F4F4F5] transition-colors group-hover/node:text-white">
              {node.label}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#94A3B8]">{node.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
