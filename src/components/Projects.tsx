import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Github, Layers, Play, Pause } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import {
  CINEMATIC_EASE,
  InteractiveTiltCard,
  MagneticWrapper,
  Reveal,
  SceneChapter,
  SectionHeader,
} from './MotionPrimitives';

function statusAccentColor(tone: ProjectItem['statusTone']) {
  switch (tone) {
    case 'working':
      return '#38BDF8';
    case 'prototype':
      return '#7DD3FC';
    case 'backend':
      return '#E2E8F0';
    case 'in-development':
    default:
      return '#E2B76E';
  }
}

export function Projects() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [autoCyclePipeline, setAutoCyclePipeline] = useState(true);
  const reduced = useReducedMotion();

  const activeProject = PROJECTS[selectedIndex] || PROJECTS[0];

  useEffect(() => {
    setActiveNodeIndex(0);
  }, [selectedIndex]);

  useEffect(() => {
    if (reduced || !autoCyclePipeline || !activeProject) return;
    const timer = window.setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % activeProject.architectureNodes.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [reduced, autoCyclePipeline, activeProject]);

  const accentHex = statusAccentColor(activeProject.statusTone);

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-b border-white/[0.08] bg-[#0C0E14]"
    >
      {/* Dynamic Environment Wash Responding to Selected Project */}
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${accentHex}1F 0%, transparent 70%)`,
        }}
        className="pointer-events-none absolute -left-24 top-1/4 h-[520px] w-[520px] rounded-full transition-all duration-700"
      />

      <SceneChapter className="relative mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeader
          kicker="03 · Independent Builds"
          title="Featured Projects"
          rightSlot={
            <p className="max-w-lg text-sm leading-relaxed text-[#94A3B8]">
              Interactive showcase of personal software systems—select any project to bring its 3D stage and verified system pipeline into focus.
            </p>
          }
        />

        {/* Interactive Project Selector Tabs */}
        <div
          role="tablist"
          aria-label="Select project to explore in interactive showcase"
          className="mt-8 flex flex-wrap items-center gap-2 rounded-xl border border-white/[0.08] bg-[#11141D] p-1.5"
        >
          {PROJECTS.map((project, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={project.slug}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedIndex(idx)}
                className={`btn-tactile relative flex h-10 items-center gap-2 rounded-lg px-3.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isSelected ? 'text-[#08090D]' : 'text-[#94A3B8] hover:text-[#F4F4F5]'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId={reduced ? undefined : 'project-stage-tab'}
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg bg-[#F4F4F5]"
                  />
                )}
                <span className="relative z-10 font-mono text-[11px] opacity-80">
                  {project.index}
                </span>
                <span className="relative z-10">{project.title}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive 3D Project Mini-Environment Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.slug}
            initial={
              reduced
                ? { opacity: 1 }
                : { opacity: 0, y: 20, scale: 0.97, rotateX: 3 }
            }
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: -16, scale: 0.98 }
            }
            transition={{ duration: 0.42, ease: CINEMATIC_EASE }}
            style={{ perspective: '1200px' }}
            className="mt-6"
          >
            <InteractiveTiltCard
              tiltStrength={2.2}
              spotlightColor={`${accentHex}24`}
              className="rounded-2xl border border-white/[0.12] bg-[#11141D] p-6 sm:p-8 lg:p-10 shadow-[0_28px_70px_-22px_rgba(0,0,0,0.8)]"
            >
              <div
                aria-hidden="true"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accentHex}AA, transparent)`,
                }}
                className="pointer-events-none absolute inset-x-10 top-0 h-[1.5px]"
              />

              <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left Column: Narrative & Verified Status */}
                <div className="flex flex-col justify-between lg:col-span-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono font-semibold text-[#E2B76E] tabular-nums">
                        {activeProject.index}
                      </span>
                      <span aria-hidden="true" className="text-white/25">·</span>
                      <span className="font-medium text-[#94A3B8]">
                        {activeProject.category}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#F4F4F5] sm:text-3xl">
                      {activeProject.title}
                    </h3>

                    <p
                      style={{ color: accentHex }}
                      className="mt-2 font-mono text-xs font-medium"
                    >
                      {activeProject.status}
                    </p>

                    <p className="mt-4 text-sm leading-[1.75] text-[#CBD5E1] sm:text-[15px]">
                      {activeProject.overview}
                    </p>

                    <div className="mt-5 rounded-lg border border-white/[0.08] bg-[#0A0C12] p-4">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#38BDF8]">
                        Problem Addressed
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8] sm:text-sm">
                        {activeProject.problemStatement}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <MagneticWrapper strength={0.22}>
                      <Link
                        to={`/projects/${activeProject.slug}`}
                        className="btn-tactile group inline-flex h-10 items-center gap-2 rounded-md bg-[#F4F4F5] px-4 text-xs font-semibold text-[#08090D] hover:bg-[#38BDF8] whitespace-nowrap"
                      >
                        <span>Explore Full Case Study</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </MagneticWrapper>

                    <MagneticWrapper strength={0.2}>
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-tactile inline-flex h-10 items-center gap-1.5 rounded-md border border-white/[0.14] bg-[#0A0C12] px-3.5 text-xs font-medium text-[#F4F4F5] hover:border-[#38BDF8]/55 hover:text-[#38BDF8] whitespace-nowrap"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>View on GitHub</span>
                      </a>
                    </MagneticWrapper>
                  </div>
                </div>

                {/* Right Column: Interactive Live Architecture Node Inspector */}
                <div className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#0A0C12] p-5 lg:col-span-6">
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-[#38BDF8]" aria-hidden="true" />
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#F4F4F5]">
                          {activeProject.architectureLabel}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setAutoCyclePipeline((prev) => !prev)}
                        aria-label={autoCyclePipeline ? 'Pause architecture sequence' : 'Play architecture sequence'}
                        className="inline-flex h-7 items-center gap-1 rounded border border-white/[0.1] bg-[#11141D] px-2 font-mono text-[10px] text-[#94A3B8] hover:border-[#38BDF8]/40 hover:text-[#38BDF8]"
                      >
                        {autoCyclePipeline ? (
                          <>
                            <Pause className="h-3 w-3" />
                            <span>Pause Flow</span>
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3" />
                            <span>Trace Flow</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {activeProject.architectureNodes.map((node, nodeIdx) => {
                        const isActiveNode = nodeIdx === activeNodeIndex;
                        return (
                          <button
                            key={node.step}
                            type="button"
                            onClick={() => {
                              setAutoCyclePipeline(false);
                              setActiveNodeIndex(nodeIdx);
                            }}
                            className={`rounded-lg border p-3 text-left transition-all duration-200 ${
                              isActiveNode
                                ? 'border-[#38BDF8]/75 bg-[#121A2B] shadow-[0_0_20px_rgba(56,189,248,0.16)]'
                                : 'border-white/[0.07] bg-[#11141D]/70 hover:border-white/[0.18]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`font-mono text-[10px] font-semibold tabular-nums ${
                                  isActiveNode ? 'text-[#38BDF8]' : 'text-[#64748B]'
                                }`}
                              >
                                Step {node.step}
                              </span>
                            </div>
                            <p className="mt-1 text-xs font-semibold text-[#F4F4F5]">
                              {node.label}
                            </p>
                            <p className="mt-0.5 text-[11px] leading-snug text-[#94A3B8]">
                              {node.detail}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Verified Limitations & Stack Summary */}
                  <div className="mt-5 border-t border-white/[0.08] pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">
                      Verified Stack
                    </p>
                    <p className="mt-1.5 font-mono text-xs leading-relaxed text-[#E2E8F0]">
                      {activeProject.techStack.join(' · ')}
                    </p>
                    {activeProject.limitations.length > 0 && (
                      <p className="mt-2.5 text-xs leading-relaxed text-[#E2B76E]">
                        Scope note: {activeProject.limitations[0]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </InteractiveTiltCard>
          </motion.div>
        </AnimatePresence>

        {/* Horizontal Spatial Gallery Strip for Quick Exploration */}
        <Reveal direction="up" delay={0.08} className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-wider text-[#94A3B8]">
              All Engineering Systems ({PROJECTS.length})
            </p>
            <p className="hidden font-mono text-[11px] text-[#64748B] sm:block">
              Scroll horizontally or hover cards for 3D depth inspection
            </p>
          </div>
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0">
            {PROJECTS.map((project, idx) => (
              <div
                key={project.slug}
                onClick={() => setSelectedIndex(idx)}
                className="min-w-[85vw] snap-start sm:min-w-[420px] lg:min-w-0 cursor-pointer"
              >
                <ProjectCard project={project} featured={idx === selectedIndex} />
              </div>
            ))}
          </div>
        </Reveal>
      </SceneChapter>
    </section>
  );
}
