import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types';
import TiltCard from './common/TiltCard';

const CATEGORIES = ['All', 'Hardware & IoT', 'Analog Electronics', 'Full-Stack & Cloud'] as const;

const cardFade = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-40px' } as const,
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div {...cardFade} className="h-full">
      <TiltCard className="p-6 h-full flex flex-col justify-between">
        <div>
          {/* Badge & Live Link */}
          <div className="flex items-start justify-between gap-3 mb-4" style={{ transform: 'translateZ(20px)' }}>
            <span className="inline-block text-[11px] font-medium text-zinc-400 bg-white/[0.04] border border-white/[0.06] rounded-md px-2.5 py-1 leading-tight">
              {project.badge}
            </span>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-zinc-500 hover:text-zinc-200 transition-colors"
                aria-label="Live link"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-semibold text-zinc-100 mb-2 leading-snug" style={{ transform: 'translateZ(24px)' }}>
            {project.title}
          </h3>

          {/* Summary */}
          <p className="text-[13px] text-zinc-400 leading-relaxed mb-4" style={{ transform: 'translateZ(14px)' }}>
            {project.summary}
          </p>
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 pt-2" style={{ transform: 'translateZ(20px)' }}>
          {project.stack.map((tech) => (
            <span key={tech} className="text-[11px] text-zinc-400 bg-white/[0.04] border border-white/[0.06] rounded px-2 py-0.5">
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

  const filtered = active === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div {...cardFade} className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-50 mb-3">
            Projects
          </h2>
          <p className="text-[15px] text-zinc-500 max-w-xl">
            End-to-end engineering — from analog circuitry and embedded telemetry to full-stack cloud platforms.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-[12px] font-medium rounded-lg px-3.5 py-1.5 border transition-colors ${
                active === cat
                  ? 'bg-white text-zinc-900 border-white'
                  : 'text-zinc-400 border-white/8 hover:border-white/20 hover:text-zinc-200'
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
