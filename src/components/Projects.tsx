import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types';
import TiltCard from './common/TiltCard';
import { useTheme } from '../context/ThemeContext';

const CATEGORIES = ['All', 'Hardware & IoT', 'Analog Electronics', 'Full-Stack & Cloud'] as const;

const cardFade = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-40px' } as const,
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

function ProjectCard({ project }: { project: Project }) {
  const { isDark } = useTheme();

  return (
    <motion.div {...cardFade} className="h-full">
      <TiltCard className="p-6 h-full flex flex-col justify-between">
        <div>
          {/* Badge & Live Link */}
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
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 transition-colors ${isDark ? 'text-zinc-500 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-950'}`}
                aria-label="Live link"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* Title */}
          <h3
            className={`text-[16px] font-semibold mb-2 leading-snug transition-colors ${
              isDark ? 'text-zinc-100' : 'text-zinc-950'
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

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 pt-2" style={{ transform: 'translateZ(20px)' }}>
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
      </TiltCard>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<string>('All');
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
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
