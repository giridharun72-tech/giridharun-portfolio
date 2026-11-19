import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { GithubIcon } from '../common/Icons';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';

interface StudioCockpitFrameProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Academics', href: '#academics' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function StudioCockpitFrame({ children }: StudioCockpitFrameProps) {
  const { isDark } = useTheme();
  const [time, setTime] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll progression bar along the frame
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Kolkata',
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'experience', 'achievements', 'academics', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen p-2 sm:p-3 md:p-5 lg:p-6 transition-colors duration-400">
      {/* ─── Outer Cockpit Bezel Frame ─── */}
      <div
        className={`relative w-full rounded-2xl md:rounded-[28px] lg:rounded-[32px] border backdrop-blur-[3px] overflow-hidden transition-all duration-400 ${
          isDark
            ? 'border-white/[0.09] bg-[#09090B]/60 shadow-[0_0_50px_rgba(0,0,0,0.8)]'
            : 'border-black/[0.09] bg-[#F8F9FA]/85 shadow-[0_12px_45px_rgba(0,0,0,0.06)]'
        }`}
      >
        {/* Dynamic Scroll Progress Bar along top edge */}
        <motion.div
          style={{ scaleX }}
          className={`absolute top-0 left-0 right-0 h-[2px] origin-left z-50 pointer-events-none ${
            isDark
              ? 'bg-gradient-to-r from-zinc-500 via-white to-zinc-400'
              : 'bg-gradient-to-r from-amber-500 via-zinc-950 to-amber-600'
          }`}
        />

        {/* ─── Cockpit Corner HUD Bracket Accents ─── */}
        <div className={`pointer-events-none absolute top-3 left-3 text-[10px] font-mono select-none z-40 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
          ┌ <span className="opacity-60">SYS::01</span>
        </div>
        <div className={`pointer-events-none absolute top-3 right-3 text-[10px] font-mono select-none z-40 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
          <span className="opacity-60">{isDark ? 'HUD::STEALTH' : 'HUD::SOLAR'}</span> ┐
        </div>
        <div className={`pointer-events-none absolute bottom-3 left-3 text-[10px] font-mono select-none z-40 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
          └ <span className="opacity-60">ECE_ENG</span>
        </div>
        <div className={`pointer-events-none absolute bottom-3 right-3 text-[10px] font-mono select-none z-40 ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
          <span className="opacity-60">{PERSONAL_INFO.coordinates.split(' ')[0]}</span> ┘
        </div>

        {/* ─── Cockpit Header Navbar ─── */}
        <header
          className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors duration-400 ${
            isDark
              ? 'border-white/[0.06] bg-[#09090B]/85'
              : 'border-black/[0.06] bg-[#F8F9FA]/90'
          }`}
        >
          <div className="mx-auto flex h-14 md:h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
            
            {/* Left: Brand Identity & Live Pulse */}
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-2 group">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isDark ? 'bg-emerald-500' : 'bg-emerald-600'}`} />
                </span>
                <span className={`text-[14px] font-bold tracking-tight transition-colors ${isDark ? 'text-zinc-100 group-hover:text-white' : 'text-zinc-950 group-hover:text-black'}`}>
                  {PERSONAL_INFO.name}
                </span>
              </a>
              <span className={`hidden xl:inline-block text-[11px] font-mono border-l pl-3 ${isDark ? 'text-zinc-500 border-white/10' : 'text-zinc-400 border-black/10'}`}>
                B.E. ECE
              </span>
            </div>

            {/* Center: Floating HUD Navigation */}
            <nav className={`hidden md:flex items-center gap-1 rounded-full border p-1 backdrop-blur-md transition-colors ${
              isDark
                ? 'border-white/[0.08] bg-white/[0.02]'
                : 'border-black/[0.08] bg-black/[0.02]'
            }`}>
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative rounded-full px-3.5 py-1 text-[12px] font-medium transition-colors duration-200 ${
                      isActive
                        ? (isDark ? 'text-zinc-100' : 'text-zinc-950 font-semibold')
                        : (isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-950')
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="cockpitActiveNav"
                        className={`absolute inset-0 rounded-full border ${
                          isDark
                            ? 'bg-white/[0.1] border-white/[0.12]'
                            : 'bg-black/[0.06] border-black/[0.08]'
                        }`}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right: Theme Toggle, Clock & GitHub Button */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Day / Night Mode Creative Toggle */}
              <ThemeToggle />

              {time && (
                <div className={`hidden lg:flex items-center gap-1.5 text-[11px] font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  <span className={`inline-block w-1 h-1 rounded-full ${isDark ? 'bg-zinc-600' : 'bg-zinc-400'}`} />
                  {time}
                </div>
              )}

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden sm:inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-[12px] font-medium transition-all duration-200 ${
                  isDark
                    ? 'border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/25 hover:text-white'
                    : 'border-black/10 bg-black/[0.03] text-zinc-700 hover:border-black/25 hover:text-black'
                }`}
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-1 ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'}`}
                aria-label="Toggle Navigation"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={`h-0.5 w-full transition-transform ${isDark ? 'bg-zinc-300' : 'bg-zinc-700'} ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <span className={`h-0.5 w-full transition-opacity ${isDark ? 'bg-zinc-300' : 'bg-zinc-700'} ${mobileOpen ? 'opacity-0' : ''}`} />
                  <span className={`h-0.5 w-full transition-transform ${isDark ? 'bg-zinc-300' : 'bg-zinc-700'} ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`md:hidden border-t px-6 py-4 backdrop-blur-2xl ${
                isDark
                  ? 'border-white/10 bg-[#09090B]/95 text-zinc-300'
                  : 'border-black/10 bg-[#F8F9FA]/95 text-zinc-700'
              }`}
            >
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`py-2 text-[14px] font-medium ${isDark ? 'hover:text-white' : 'hover:text-black'}`}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 flex items-center gap-2 py-2 text-[14px] ${isDark ? 'hover:text-white' : 'hover:text-black'}`}
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub Repository
                </a>
              </div>
            </motion.div>
          )}
        </header>

        {/* ─── Main Viewport Canvas Container ─── */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
