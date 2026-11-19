import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Cpu, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../../types';
import { useTheme } from '../../context/ThemeContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { isDark } = useTheme();
  const [imageFailed, setImageFailed] = useState(false);

  // Reset image failure state whenever project changes
  useEffect(() => {
    setImageFailed(false);
  }, [project]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  const handleBackdrop = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdrop}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 16 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className={`relative max-w-2xl w-full my-8 rounded-2xl border overflow-hidden shadow-2xl transition-colors duration-300 ${
            isDark
              ? 'bg-[#111113] border-white/10 text-zinc-100 shadow-[0_20px_60px_rgba(0,0,0,0.9)]'
              : 'bg-white border-black/10 text-zinc-900 shadow-[0_20px_60px_rgba(0,0,0,0.15)]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar with Category, Badge & Close Button */}
          <div
            className={`flex items-center justify-between gap-3 px-6 py-4 border-b transition-colors ${
              isDark ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-black/[0.01]'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[11px] font-mono tracking-wider uppercase rounded-md px-2.5 py-1 border font-semibold ${
                  isDark
                    ? 'border-white/10 bg-white/[0.04] text-zinc-300'
                    : 'border-black/10 bg-black/[0.04] text-zinc-700'
                }`}
              >
                {project.category}
              </span>
              <span
                className={`text-[11px] font-medium rounded-md px-2.5 py-1 border ${
                  isDark
                    ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                    : 'border-emerald-600/25 bg-emerald-50 text-emerald-800'
                }`}
              >
                {project.badge}
              </span>
            </div>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? 'border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
                  : 'border-black/10 text-zinc-600 hover:text-black hover:bg-black/5'
              }`}
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
            {/* Title & Summary */}
            <div>
              <h2
                className={`text-xl sm:text-2xl font-bold tracking-tight leading-snug mb-2.5 ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}
              >
                {project.title}
              </h2>
              <p
                className={`text-[14px] leading-relaxed ${
                  isDark ? 'text-zinc-300/90' : 'text-zinc-600'
                }`}
              >
                {project.summary}
              </p>
            </div>

            {/* 16:9 Showcase / Hardware Build Image Slot */}
            <div
              className={`relative aspect-video w-full rounded-xl overflow-hidden border flex items-center justify-center transition-colors ${
                isDark ? 'border-white/10 bg-[#09090B]' : 'border-black/10 bg-zinc-100'
              }`}
            >
              {!imageFailed && project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  onError={() => setImageFailed(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Minimalist Dark Fallback Placeholder */
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-2 select-none">
                  <div
                    className={`p-3 rounded-full border mb-1 ${
                      isDark
                        ? 'border-white/10 bg-white/[0.03] text-zinc-400'
                        : 'border-black/10 bg-white text-zinc-600'
                    }`}
                  >
                    <Cpu className="h-6 w-6" />
                  </div>
                  <span
                    className={`font-mono text-xs uppercase tracking-wider font-semibold ${
                      isDark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}
                  >
                    Hardware Build Showcase
                  </span>
                  <span className="text-[12px] text-zinc-500 max-w-xs">
                    High-resolution bench photo &amp; schematic capture in archival review.
                  </span>
                  <span
                    className={`inline-block text-[10px] font-mono px-2 py-0.5 rounded border mt-1 ${
                      isDark
                        ? 'border-white/10 bg-white/[0.02] text-zinc-500'
                        : 'border-black/10 bg-black/[0.02] text-zinc-500'
                    }`}
                  >
                    VERIFIED ECE PROTOTYPE
                  </span>
                </div>
              )}
            </div>

            {/* Architecture & Key Technical Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">
                    // TECHNICAL HIGHLIGHTS
                  </span>
                  <span className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                </div>
                <ul className="space-y-2.5">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[13px] leading-relaxed">
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 mt-0.5 ${
                          isDark ? 'text-zinc-400' : 'text-zinc-600'
                        }`}
                      />
                      <span className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Full Tech Stack Pills */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">
                  // HARDWARE &amp; SOFTWARE STACK
                </span>
                <span className={`h-px flex-1 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className={`font-mono text-[11px] rounded-lg px-2.5 py-1 border transition-colors ${
                      isDark
                        ? 'text-zinc-300 bg-white/[0.04] border-white/[0.08]'
                        : 'text-zinc-800 bg-black/[0.04] border-black/[0.08]'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div
            className={`flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t transition-colors ${
              isDark ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-black/[0.01]'
            }`}
          >
            <div className="flex flex-wrap items-center gap-3">
              {/* GitHub Button */}
              <a
                href={project.githubLink || 'https://github.com/giridharun72-tech'}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-semibold border transition-all duration-200 ${
                  isDark
                    ? 'border-white/15 bg-white/[0.05] text-zinc-200 hover:border-white/30 hover:bg-white/10 hover:text-white'
                    : 'border-black/15 bg-black/[0.03] text-zinc-800 hover:border-black/30 hover:bg-black/[0.06] hover:text-black'
                }`}
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub Repository</span>
              </a>

              {/* Live Demo Button (if available) */}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-semibold transition-all duration-200 ${
                    isDark
                      ? 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-sm'
                      : 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-sm'
                  }`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Launch Live Demo</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className={`text-[12px] font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
              }`}
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
