import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { GithubIcon } from '../common/Icons';

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
    <div className="relative min-h-screen p-2 sm:p-3 md:p-5 lg:p-6 transition-all duration-300">
      {/* ─── Outer Cockpit Bezel Frame ─── */}
      <div className="relative w-full rounded-2xl md:rounded-[28px] lg:rounded-[32px] border border-white/[0.09] bg-[#09090B]/60 backdrop-blur-[2px] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Dynamic Scroll Progress Bar along top edge */}
        <motion.div
          style={{ scaleX }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-zinc-500 via-white to-zinc-400 origin-left z-50 pointer-events-none"
        />

        {/* ─── Cockpit Corner HUD Bracket Accents ─── */}
        <div className="pointer-events-none absolute top-3 left-3 text-[10px] font-mono text-zinc-600 select-none z-40">
          ┌ <span className="opacity-60">SYS::01</span>
        </div>
        <div className="pointer-events-none absolute top-3 right-3 text-[10px] font-mono text-zinc-600 select-none z-40">
          <span className="opacity-60">HUD::ACTIVE</span> ┐
        </div>
        <div className="pointer-events-none absolute bottom-3 left-3 text-[10px] font-mono text-zinc-600 select-none z-40">
          └ <span className="opacity-60">ECE_ENG</span>
        </div>
        <div className="pointer-events-none absolute bottom-3 right-3 text-[10px] font-mono text-zinc-600 select-none z-40">
          <span className="opacity-60">{PERSONAL_INFO.coordinates.split(' ')[0]}</span> ┘
        </div>

        {/* ─── Cockpit Header Navbar ─── */}
        <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#09090B]/85 backdrop-blur-xl">
          <div className="mx-auto flex h-14 md:h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
            
            {/* Left: Brand Identity & Live Pulse */}
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-2 group">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[14px] font-bold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                  {PERSONAL_INFO.name}
                </span>
              </a>
              <span className="hidden xl:inline-block text-[11px] font-mono text-zinc-500 border-l border-white/10 pl-3">
                B.E. ECE
              </span>
            </div>

            {/* Center: Floating HUD Navigation */}
            <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] p-1 backdrop-blur-md">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative rounded-full px-3.5 py-1 text-[12px] font-medium transition-colors duration-200 ${
                      isActive ? 'text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="cockpitActiveNav"
                        className="absolute inset-0 rounded-full bg-white/[0.1] border border-white/[0.12]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right: Clock & GitHub Button */}
            <div className="flex items-center gap-3">
              {time && (
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                  <span className="inline-block w-1 h-1 rounded-full bg-zinc-600" />
                  {time}
                </div>
              )}

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-[12px] font-medium text-zinc-300 hover:border-white/25 hover:text-white transition-all duration-200"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-zinc-400 hover:text-white p-1"
                aria-label="Toggle Navigation"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={`h-0.5 w-full bg-zinc-300 transition-transform ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <span className={`h-0.5 w-full bg-zinc-300 transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
                  <span className={`h-0.5 w-full bg-zinc-300 transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden border-t border-white/10 bg-[#09090B]/95 px-6 py-4 backdrop-blur-2xl"
            >
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-[14px] font-medium text-zinc-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-2 py-2 text-[14px] text-zinc-300 hover:text-white"
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
