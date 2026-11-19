import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface ProfilePortraitProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ProfilePortrait({ className = '', size = 'md' }: ProfilePortraitProps) {
  const { isDark } = useTheme();
  const [imgSrc, setImgSrc] = useState('/assets/profile-nobg.png');
  const [isHovered, setIsHovered] = useState(false);

  // Responsive dimensions
  const dims = {
    sm: 'w-16 h-20 sm:w-20 sm:h-24',
    md: 'w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36',
    lg: 'w-32 h-36 sm:w-36 sm:h-44 md:w-40 md:h-48',
  }[size];

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group shrink-0 select-none ${className}`}
    >
      {/* ─── Layer 1: Ambient Studio Backlight Halo ─── */}
      <div
        className={`absolute -inset-3 rounded-3xl blur-xl transition-all duration-700 pointer-events-none ${
          isDark
            ? 'opacity-40 group-hover:opacity-80 bg-gradient-to-tr from-white/10 via-cyan-500/15 to-transparent'
            : 'opacity-50 group-hover:opacity-90 bg-gradient-to-tr from-amber-400/20 via-orange-300/15 to-transparent'
        }`}
      />

      {/* ─── Layer 2: Cockpit HUD Glass Enclosure ─── */}
      <div
        className={`relative ${dims} rounded-2xl overflow-hidden border backdrop-blur-xl transition-all duration-500 shadow-2xl flex items-end justify-center ${
          isDark
            ? 'border-white/15 bg-gradient-to-b from-[#141417]/90 via-[#0d0d10]/95 to-[#09090B] shadow-[0_12px_40px_rgba(0,0,0,0.85)] group-hover:border-white/30'
            : 'border-black/10 bg-gradient-to-b from-white/95 via-zinc-100/90 to-[#F4F5F7] shadow-[0_12px_35px_rgba(0,0,0,0.08)] group-hover:border-black/20'
        }`}
      >
        {/* Inner Radial Studio Spotlight (Behind Head) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: isDark
              ? 'radial-gradient(circle at 50% 32%, rgba(255, 255, 255, 0.16) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 75%)'
              : 'radial-gradient(circle at 50% 32%, rgba(245, 158, 11, 0.22) 0%, rgba(251, 191, 36, 0.1) 45%, transparent 75%)',
          }}
        />

        {/* Subtle Cyber Grid Texture Inside Dossier Frame */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isDark ? 'opacity-[0.04]' : 'opacity-[0.03]'
          }`}
          style={{
            backgroundImage: isDark
              ? 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)'
              : 'linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)',
            backgroundSize: '12px 12px',
          }}
        />

        {/* High-Resolution Portrait with Organic Cutout */}
        <img
          src={imgSrc}
          alt="Giridharun S — B.E. Electronics & Communication Engineering"
          onError={() => setImgSrc('/assets/profile.jpg')}
          className="relative z-10 w-full h-[96%] object-contain object-bottom filter contrast-[1.03] transition-transform duration-500 group-hover:scale-[1.04]"
          loading="eager"
        />

        {/* Seamless Organic Bottom Fade — Suit Melts Organically into Cockpit Frame */}
        <div
          className={`absolute inset-x-0 bottom-0 h-10 pointer-events-none z-20 transition-all duration-500 ${
            isDark
              ? 'bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent'
              : 'bg-gradient-to-t from-[#F4F5F7] via-[#F4F5F7]/60 to-transparent'
          }`}
        />

        {/* Subtle Glint/Scanline Sheen Across the Glass on Hover */}
        <motion.div
          animate={isHovered ? { x: ['-100%', '200%'] } : {}}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-30"
        />

        {/* ─── Layer 3: Precision Tactical Corner Brackets ─── */}
        <div className={`absolute top-1.5 left-1.5 font-mono text-[9px] leading-none pointer-events-none z-30 ${isDark ? 'text-white/40' : 'text-zinc-400'}`}>
          ┌
        </div>
        <div className={`absolute top-1.5 right-1.5 font-mono text-[9px] leading-none pointer-events-none z-30 ${isDark ? 'text-white/40' : 'text-zinc-400'}`}>
          ┐
        </div>
        <div className={`absolute bottom-1.5 left-1.5 font-mono text-[9px] leading-none pointer-events-none z-30 ${isDark ? 'text-white/40' : 'text-zinc-400'}`}>
          └
        </div>
        <div className={`absolute bottom-1.5 right-1.5 font-mono text-[9px] leading-none pointer-events-none z-30 ${isDark ? 'text-white/40' : 'text-zinc-400'}`}>
          ┘
        </div>
      </div>

      {/* ─── Layer 4: Live Verified Operator Pill HUD Badge ─── */}
      <div className="absolute -bottom-2 -right-2 z-40">
        <div
          className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-mono tracking-wider shadow-lg backdrop-blur-md transition-all duration-300 ${
            isDark
              ? 'border-emerald-500/30 bg-[#09090B]/95 text-emerald-300 shadow-emerald-500/10'
              : 'border-emerald-600/25 bg-white/95 text-emerald-700 shadow-black/5'
          }`}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="font-semibold text-[9.5px]">VERIFIED</span>
        </div>
      </div>
    </motion.div>
  );
}
