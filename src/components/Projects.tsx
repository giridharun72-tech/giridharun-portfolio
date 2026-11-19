import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon } from './common/Icons';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types';
import TiltCard from './common/TiltCard';
import ProjectModal from './common/ProjectModal';
import { useTheme } from '../context/ThemeContext';

const CATEGORIES = ['All', 'Hardware & IoT', 'Analog Electronics', 'Full-Stack & Cloud'] as const;

const cardFade = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-40px' } as const,
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (p: Project) => void;
}) {
  const { isDark } = useTheme();

  return (
    <motion.div {...cardFade} className="h-full">
      <TiltCard
        onClick={() => onSelect(project)}
        className="p-6 h-full flex flex-col justify-between cursor-pointer group transition-all duration-300"
      >
        <div>
          {/* Badge & Quick Links */}
          <div className="flex items-start justify-between gap-3 mb-4" style={{ transform: 'translateZ(20px)' }}>
            <span
              className={`inline-block text-[11px] font-medium rounded-md px-2.5 py-1 leading-tight border transition-colors ${
                isDark
                  ? 'text-zinc-400 bg-white/[0.04] border-white/[0.06]'
                  : 'text-zinc-700 bg-black/[0.04] border-black/[0.08]'
              }`}
            >
              {project.badge}
            </span>

            {/* Quick Action Icons (Top-Right) */}
            <div className="flex items-center gap-2 shrink-0">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`p-1 rounded-md transition-colors ${
                    isDark ? 'text-zinc-500 hover:text-white hover:bg-white/5' : 'text-zinc-500 hover:text-black hover:bg-black/5'
                  }`}
                  aria-label="GitHub Repository"
                  title="GitHub Repository"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`p-1 rounded-md transition-colors ${
                    isDark ? 'text-zinc-500 hover:text-white hover:bg-white/5' : 'text-zinc-500 hover:text-black hover:bg-black/5'
                  }`}
                  aria-label="Live Demo"
                  title="Live Demo"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Title */}
          <h3
            className={`text-[16px] font-semibold mb-2 leading-snug transition-colors group-hover:text-white ${
              isDark ? 'text-zinc-100 group-hover:text-white' : 'text-zinc-950 group-hover:text-black'
            }`}
            style={{ transform: 'translateZ(24px)' }}
          >
            {project.title}
          </h3>

          {/* Summary */}
          <p
            className={`text-[13px] leading-relaxed mb-4 transition-colors ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}
            style={{ transform: 'translateZ(14px)' }}
          >
            {project.summary}
          </p>
        </div>

        {/* Stack & Details Trigger Footer */}
        <div className="space-y-4 pt-2">
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5" style={{ transform: 'translateZ(20px)' }}>
            {project.stack.map((tech) => (
              <span
                key={tech}
                className={`text-[11px] rounded px-2 py-0.5 border transition-colors ${
                  isDark
                    ? 'text-zinc-400 bg-white/[0.04] border-white/[0.06]'
                    : 'text-zinc-700 bg-black/[0.04] border-black/[0.08]'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Subtle View Details Action Indicator */}
          <div
            className={`flex items-center justify-between pt-3 border-t text-[12px] font-mono transition-colors ${
              isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
            }`}
            style={{ transform: 'translateZ(18px)' }}
          >
            <span className={isDark ? 'text-zinc-500' : 'text-zinc-400'}>
              // ECE SPEC
            </span>
            <span
              className={`inline-flex items-center gap-1 font-medium transition-all duration-200 group-hover:translate-x-1 ${
                isDark ? 'text-zinc-400 group-hover:text-white' : 'text-zinc-600 group-hover:text-zinc-950'
              }`}
            >
              View Details
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { isDark } = useTheme();

  const filtered = active === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div {...cardFade} className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">// 01</span>
            <span className={`h-px w-6 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">ENGINEERING SHOWCASE</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-3 transition-colors ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}>
            Projects
          </h2>
          <p className={`text-[15px] max-w-xl transition-colors ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            End-to-end engineering — from analog circuitry and embedded telemetry to full-stack cloud platforms.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-[12px] font-medium rounded-lg px-3.5 py-1.5 border transition-all duration-200 cursor-pointer ${
                active === cat
                  ? isDark
                    ? 'bg-white text-zinc-900 border-white shadow-sm'
                    : 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                  : isDark
                  ? 'text-zinc-400 border-white/10 hover:border-white/20 hover:text-zinc-200'
                  : 'text-zinc-600 border-black/10 hover:border-black/25 hover:text-zinc-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onSelect={setSelectedProject} />
          ))}
        </div>
      </div>

      {/* Interactive Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
