import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layout,
  Network,
  Server,
  Terminal,
} from 'lucide-react';
import { AWS_CLOUD_PROFILE, CORE_SKILL_GROUPS, DSA_PROFILE, ProficiencyLevel } from '../data/skills';
import {
  CINEMATIC_EASE,
  InteractiveTiltCard,
  PhysicsFloat,
  Reveal,
  SceneChapter,
  SectionHeader,
  StaggerGrid,
  StaggerItem,
} from './MotionPrimitives';

function proficiencyTone(level: ProficiencyLevel): string {
  switch (level) {
    case 'Advanced':
      return 'text-[#F4F4F5] font-semibold';
    case 'Intermediate':
      return 'text-[#38BDF8] font-medium';
    case 'Working Knowledge':
      return 'text-[#38BDF8] font-medium';
    case 'Beginner':
    default:
      return 'text-[#94A3B8] font-normal';
  }
}

function getGroupIcon(id: string) {
  switch (id) {
    case 'programming':
      return Code2;
    case 'backend':
      return Server;
    case 'database':
      return Database;
    case 'version-control':
      return GitBranch;
    case 'applied-ai':
      return Cpu;
    case 'devops':
      return Terminal;
    case 'networking':
      return Network;
    case 'frontend':
      return Layout;
    default:
      return Cloud;
  }
}

interface OrbitNode {
  id: string;
  label: string;
  sublabel: string;
  x: number; // % coordinate in orbital SVG viewBox (0..100)
  y: number;
  floatClass: 'animate-float-vertical' | 'animate-float-horizontal' | 'animate-float-orbit';
  delay: string;
}

const ORBITAL_CLUSTERS: OrbitNode[] = [
  { id: 'programming', label: 'Java', sublabel: 'Core Language', x: 18, y: 24, floatClass: 'animate-float-vertical', delay: '0s' },
  { id: 'backend', label: 'Spring Boot & APIs', sublabel: 'Backend Layer', x: 50, y: 14, floatClass: 'animate-float-horizontal', delay: '0.4s' },
  { id: 'aws', label: 'AWS & Cloud', sublabel: 'EC2 · S3 · VPC · IAM', x: 82, y: 26, floatClass: 'animate-float-orbit', delay: '0.7s' },
  { id: 'database', label: 'MySQL / SQL', sublabel: 'Relational Data', x: 16, y: 74, floatClass: 'animate-float-horizontal', delay: '1.1s' },
  { id: 'applied-ai', label: 'Generative & Agentic AI', sublabel: 'LLM · RAG · Prompts', x: 84, y: 74, floatClass: 'animate-float-vertical', delay: '0.9s' },
  { id: 'devops', label: 'Linux · Docker', sublabel: 'DevOps Exposure', x: 35, y: 84, floatClass: 'animate-float-orbit', delay: '0.3s' },
  { id: 'version-control', label: 'Git · GitHub · VS Code', sublabel: 'Developer Tools', x: 65, y: 84, floatClass: 'animate-float-vertical', delay: '1.4s' },
];

export function Skills() {
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const reduced = useReducedMotion();

  return (
    <section id="skills" className="relative overflow-hidden border-b border-white/[0.08] bg-[#08090D]">
      <div
        aria-hidden="true"
        className="animate-ambient-glow-alt pointer-events-none absolute -top-24 right-1/4 h-[420px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.09)_0%,transparent_70%)]"
      />

      <SceneChapter className="relative mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeader
          kicker="02 · Technical Capabilities"
          title="Skills & Practical Exposure"
          rightSlot={
            <p className="max-w-md text-sm leading-relaxed text-[#94A3B8]">
              Interactive capability map grounded in verified coursework, internships, and independent builds—without arbitrary percentages.
            </p>
          }
        />

        {/* Interactive Orbital Skill Map & Cluster Explorer */}
        <Reveal direction="scale" delay={0.06}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0C0F18] p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#38BDF8]">
                  Interactive Orbital Skill Map
                </p>
                <p className="mt-1 text-xs text-[#94A3B8]">
                  Click or hover any cluster node to inspect its connected technical domain below.
                </p>
              </div>
              {selectedCluster && (
                <button
                  type="button"
                  onClick={() => setSelectedCluster(null)}
                  className="btn-tactile rounded-md border border-white/[0.12] bg-[#11141D] px-3 py-1.5 font-mono text-[11px] text-[#E2E8F0] hover:border-[#38BDF8]/50 hover:text-[#38BDF8]"
                >
                  Reset Focus
                </button>
              )}
            </div>

            {/* Desktop Spatial Orbital Graph */}
            <div className="relative mt-6 hidden h-[330px] w-full md:block">
              {/* Animated SVG Connection Topology */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="34"
                  fill="none"
                  stroke="rgba(56,189,248,0.12)"
                  strokeWidth="0.25"
                  strokeDasharray="1.2 1.2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  stroke="rgba(226,183,110,0.14)"
                  strokeWidth="0.22"
                />
                {ORBITAL_CLUSTERS.map((node) => {
                  const active = selectedCluster === node.id;
                  return (
                    <line
                      key={node.id}
                      x1="50"
                      y1="50"
                      x2={node.x}
                      y2={node.y}
                      stroke={active ? 'rgba(56,189,248,0.85)' : 'rgba(56,189,248,0.2)'}
                      strokeWidth={active ? '0.45' : '0.22'}
                      strokeDasharray={active ? 'none' : '1 1'}
                    />
                  );
                })}
              </svg>

              {/* Center Core Node */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border border-[#38BDF8]/40 bg-[#11141D] text-center shadow-[0_0_40px_rgba(56,189,248,0.16)]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#38BDF8]">
                    Core
                  </span>
                  <span className="mt-0.5 font-display text-xs font-bold text-[#F4F4F5]">
                    Cloud &amp; Java
                  </span>
                </div>
              </div>

              {/* Orbiting Physics-Reactive Cluster Nodes */}
              {ORBITAL_CLUSTERS.map((node) => {
                const isActive = selectedCluster === node.id;
                return (
                  <div
                    key={node.id}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  >
                    <PhysicsFloat mode="repel" radius={150} maxOffset={12} tiltFactor={4}>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCluster((prev) => (prev === node.id ? null : node.id))
                        }
                        onMouseEnter={() => setSelectedCluster(node.id)}
                        style={{ animationDelay: node.delay }}
                        className={`${!reduced ? node.floatClass : ''} hover-pause btn-tactile rounded-xl border px-3.5 py-2 text-left transition-all duration-200 ${
                          isActive
                            ? 'border-[#38BDF8] bg-[#162033] shadow-[0_0_24px_rgba(56,189,248,0.28)]'
                            : 'border-white/[0.12] bg-[#11141D] hover:border-[#38BDF8]/55'
                        }`}
                      >
                        <p
                          className={`font-mono text-xs font-semibold whitespace-nowrap ${
                            isActive ? 'text-[#38BDF8]' : 'text-[#F4F4F5]'
                          }`}
                        >
                          {node.label}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-[#94A3B8] whitespace-nowrap">
                          {node.sublabel}
                        </p>
                      </button>
                    </PhysicsFloat>
                  </div>
                );
              })}
            </div>

            {/* Mobile/Tablet Touch Cluster Selector */}
            <div className="mt-5 flex flex-wrap gap-2.5 md:hidden">
              {ORBITAL_CLUSTERS.map((node) => {
                const isActive = selectedCluster === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() =>
                      setSelectedCluster((prev) => (prev === node.id ? null : node.id))
                    }
                    className={`btn-tactile rounded-lg border px-3 py-2 text-left ${
                      isActive
                        ? 'border-[#38BDF8] bg-[#162033] text-[#F4F4F5]'
                        : 'border-white/[0.1] bg-[#11141D] text-[#E2E8F0]'
                    }`}
                  >
                    <span className="block font-mono text-xs font-semibold">{node.label}</span>
                    <span className="block font-mono text-[10px] text-[#94A3B8]">
                      {node.sublabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Categorized Core Skill Matrix with Depth Tilt */}
        <StaggerGrid className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.05}>
          {CORE_SKILL_GROUPS.map((group) => {
            const Icon = getGroupIcon(group.id);
            const isLinked = selectedCluster === group.id;
            const isDimmed = selectedCluster !== null && selectedCluster !== 'aws' && !isLinked;
            return (
              <StaggerItem key={group.id} variant="scale">
                <InteractiveTiltCard
                  tiltStrength={3.5}
                  spotlightColor={isLinked ? 'rgba(56,189,248,0.2)' : 'rgba(56,189,248,0.1)'}
                  className={`group flex h-full flex-col justify-between rounded-xl border p-5 transition-all duration-300 ${
                    isLinked
                      ? 'border-[#38BDF8]/80 bg-[#151D2E] shadow-[0_18px_40px_-14px_rgba(56,189,248,0.3)]'
                      : isDimmed
                        ? 'border-white/[0.06] bg-[#11141D]/70 opacity-65 hover:opacity-100'
                        : 'border-white/[0.08] bg-[#11141D] hover:border-[#38BDF8]/45'
                  }`}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`text-sm font-semibold tracking-tight transition-colors ${
                          isLinked ? 'text-[#38BDF8]' : 'text-[#F4F4F5] group-hover:text-[#38BDF8]'
                        }`}
                      >
                        {group.title}
                      </h3>
                      <Icon
                        className={`h-4 w-4 transition-all duration-300 ${
                          isLinked
                            ? 'scale-110 rotate-6 text-[#38BDF8]'
                            : 'text-[#64748B] group-hover:scale-110 group-hover:rotate-6 group-hover:text-[#38BDF8]'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    {group.subtitle && (
                      <p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">
                        {group.subtitle}
                      </p>
                    )}

                    <ul className="mt-4 divide-y divide-white/[0.06] border-t border-white/[0.08]">
                      {group.items.map((skill) => (
                        <li
                          key={skill.name}
                          className="flex items-baseline justify-between gap-3 py-2.5 text-sm"
                        >
                          <span className="font-medium text-[#E2E8F0]">{skill.name}</span>
                          <span className={`font-mono text-[11px] shrink-0 ${proficiencyTone(skill.level)}`}>
                            {skill.level}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </InteractiveTiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGrid>

        {/* Data Structures & Algorithms Breakdown */}
        <Reveal direction="left" distance={26} delay={0.05}>
          <div className="card-sheen group mt-8 rounded-xl border border-white/[0.08] bg-[#11141D] p-6 sm:p-8 transition-all duration-200 hover:border-[#38BDF8]/35">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-display text-lg font-bold text-[#F4F4F5]">
                Data Structures &amp; Algorithms
              </h3>
              <span className="font-mono text-xs font-medium text-[#38BDF8]">
                Proficiency: {DSA_PROFILE.level}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
                  Studied Topics &amp; Working Knowledge
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-[#E2E8F0]">
                  {DSA_PROFILE.coveredTopics.join(' · ')}
                </p>
              </div>
              <div className="border-t border-white/[0.08] pt-4 md:col-span-4 md:border-t-0 md:border-l md:pl-6 md:pt-0">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#64748B]">
                  Areas Currently Under Further Development
                </p>
                <p className="mt-2.5 text-sm font-medium text-[#F4F4F5]">
                  {DSA_PROFILE.needsDevelopment.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* AWS & Cloud Computing – Practical Exposure */}
        <Reveal direction="scale" delay={0.08}>
          <div
            className={`mt-8 rounded-xl border bg-[#11141D] p-6 sm:p-8 transition-all duration-250 ${
              selectedCluster === 'aws'
                ? 'border-[#38BDF8]/75 shadow-[0_18px_42px_-12px_rgba(56,189,248,0.28)]'
                : 'border-white/[0.08] hover:border-white/[0.18]'
            }`}
          >
            <div className="flex flex-col gap-2 border-b border-white/[0.08] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-[#F4F4F5]">
                  {AWS_CLOUD_PROFILE.heading}
                </h3>
                <p className="mt-1.5 max-w-2xl text-sm text-[#94A3B8]">
                  {AWS_CLOUD_PROFILE.note}
                </p>
              </div>
              <span className="font-mono text-xs font-medium text-[#38BDF8] shrink-0">
                Overall AWS Exposure: {AWS_CLOUD_PROFILE.overallLevel}
              </span>
            </div>

            <StaggerGrid
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              staggerDelay={0.045}
            >
              {AWS_CLOUD_PROFILE.categories.map((cat) => (
                <StaggerItem key={cat.category} variant="scale">
                  <motion.div
                    whileHover={reduced ? undefined : { y: -3 }}
                    transition={{ duration: 0.2, ease: CINEMATIC_EASE }}
                    className="card-sheen h-full rounded-lg border border-white/[0.06] bg-[#0A0C12] p-4 transition-colors duration-200 hover:border-[#38BDF8]/40 hover:bg-[#0D1018]"
                  >
                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                      {cat.category}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#E2E8F0]">
                      {cat.services.join(' · ')}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGrid>

            <div className="mt-6 rounded-lg border border-white/[0.06] bg-[#0A0C12] p-4 sm:p-5 transition-colors hover:border-white/[0.15]">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#F4F4F5]">
                Cloud Computing Fundamentals
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                {AWS_CLOUD_PROFILE.fundamentals.join(' · ')}
              </p>
            </div>
          </div>
        </Reveal>
      </SceneChapter>
    </section>
  );
}
