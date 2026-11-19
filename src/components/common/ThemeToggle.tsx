import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => toggleTheme(e)}
      className={`relative inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-mono tracking-wider transition-all duration-300 group select-none cursor-pointer ${
        isDark
          ? 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/25 hover:text-white hover:bg-white/[0.06]'
          : 'border-black/10 bg-black/[0.03] text-zinc-700 hover:border-black/25 hover:text-black hover:bg-black/[0.06]'
      }`}
      aria-label={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
      title={isDark ? 'Switch to Day Mode' : 'Switch to Night Mode'}
    >
      {/* Morphing Sun / Moon Icon with Spring Dynamics */}
      <motion.div
        animate={{
          rotate: isDark ? 0 : 360,
          scale: [1, 0.85, 1],
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 18,
        }}
        className="relative h-3.5 w-3.5 flex items-center justify-center shrink-0"
      >
        {isDark ? (
          /* Crescent Moon with Twinkling Star */
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 text-zinc-300"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            <motion.path
              d="M19 3v4M21 5h-4"
              strokeWidth="1.8"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            />
          </svg>
        ) : (
          /* Radiant Sun with Orbiting Corona Rays */
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 text-amber-500"
          >
            <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        )}
      </motion.div>

      {/* Mode Text Label */}
      <span className="font-semibold uppercase text-[10px]">
        {isDark ? 'NIGHT' : 'DAY'}
      </span>

      {/* Subtle indicator beacon */}
      <span
        className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
          isDark ? 'bg-cyan-400/80 shadow-[0_0_6px_rgba(6,182,212,0.6)]' : 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]'
        }`}
      />
    </button>
  );
}
