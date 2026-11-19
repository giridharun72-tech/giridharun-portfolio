import { motion } from 'framer-motion';
import { MapPin, ArrowDown, Mail, ArrowUpRight, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import MagneticButton from './common/MagneticButton';
import ProfilePortrait from './common/ProfilePortrait';
import { useTheme } from '../context/ThemeContext';

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 22 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.65, delay, ease: 'easeOut' as const },
});

export default function Hero() {
  const { isDark } = useTheme();

  return (
    <section id="hero" className="relative min-h-[90vh] md:min-h-screen flex items-center">
      <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-2xl relative z-10">
          
          {/* ─── Cockpit Pilot Dossier & Telemetry Bar ─── */}
          <motion.div {...fade(0.12)} className="flex items-center gap-5 sm:gap-6 mb-7">
            {/* Studio Dossier Portrait */}
            <ProfilePortrait size="md" />

            {/* Telemetry & Identity Meta Stack */}
            <div className="flex flex-col gap-2 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <div
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 backdrop-blur-md transition-colors ${
                    isDark
                      ? 'border-white/10 bg-white/[0.03] text-zinc-300'
                      : 'border-black/10 bg-black/[0.03] text-zinc-700'
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isDark ? 'bg-emerald-500' : 'bg-emerald-600'}`} />
                  </span>
                  <span className="text-[11px] font-mono tracking-wider uppercase">
                    {isDark ? 'HARDWARE ONLINE' : 'SOLAR HARVEST ACTIVE'}
                  </span>
                </div>

                <div className={`flex items-center gap-1.5 text-[12px] ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>

              {/* Engineering Callsign & Coordinates */}
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-mono text-zinc-500 tracking-wider">
                <span className={`font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-700'}`}>
                  PILOT DOSSIER // GS-2026
                </span>
                <span className="opacity-40">·</span>
                <span className="text-zinc-500">{PERSONAL_INFO.coordinates}</span>
              </div>
            </div>
          </motion.div>

          {/* ─── Hero Headline (100% Flush Left Alignment with Rest of Page) ─── */}
          <motion.div {...fade(0.2)} className="mb-4">
            <span className={`block text-[11px] font-mono tracking-[0.25em] uppercase mb-2 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
              HARDWARE · IOT · CLOUD
            </span>
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}
            >
              {PERSONAL_INFO.name}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            {...fade(0.26)}
            className={`text-[15px] md:text-lg font-medium mb-5 leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-zinc-300' : 'text-zinc-800'
            }`}
          >
            B.E. Electronics &amp; Communication Engineering · Embedded Systems, IoT &amp; Full-Stack Developer
          </motion.p>

          {/* Bio */}
          <motion.p
            {...fade(0.34)}
            className={`text-[14px] md:text-[15px] leading-relaxed mb-7 max-w-xl transition-colors duration-300 ${
              isDark ? 'text-zinc-400/90' : 'text-zinc-600'
            }`}
          >
            {PERSONAL_INFO.pitch}
          </motion.p>

          {/* Interactive Metric Highlights */}
          <motion.div
            {...fade(0.42)}
            className="flex flex-wrap items-center gap-3 mb-9 text-[12px] md:text-[13px]"
          >
            <div
              className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-1.5 backdrop-blur-sm transition-colors ${
                isDark
                  ? 'border-white/[0.08] bg-white/[0.03]'
                  : 'border-black/[0.08] bg-black/[0.03]'
              }`}
            >
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-zinc-950'}`}>WHIZZHACK&apos;26</span>
              <span className="text-zinc-500">1st Prize (Hardware Track)</span>
            </div>
            <div
              className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-1.5 backdrop-blur-sm transition-colors ${
                isDark
                  ? 'border-white/[0.08] bg-white/[0.03]'
                  : 'border-black/[0.08] bg-black/[0.03]'
              }`}
            >
              <span className={`font-mono font-semibold ${isDark ? 'text-white' : 'text-zinc-950'}`}>8.18 CGPA</span>
              <span className="text-zinc-500">(Sem 1 &amp; 2)</span>
            </div>
          </motion.div>

          {/* Magnetic CTA Buttons */}
          <motion.div {...fade(0.5)} className="flex flex-wrap items-center gap-3.5">
            <MagneticButton
              href="#projects"
              className={`rounded-xl px-5 py-3 text-[13px] font-bold transition-all duration-300 ${
                isDark
                  ? 'bg-white text-zinc-950 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:bg-zinc-200'
                  : 'bg-zinc-950 text-white shadow-[0_6px_25px_rgba(0,0,0,0.18)] hover:bg-zinc-800'
              }`}
            >
              <span className="flex items-center gap-2">
                View Projects
                <ArrowDown className="h-4 w-4" />
              </span>
            </MagneticButton>

            <MagneticButton
              href="#certifications"
              className={`rounded-xl border px-5 py-3 text-[13px] font-medium backdrop-blur-md transition-all duration-300 ${
                isDark
                  ? 'border-white/15 bg-white/[0.03] text-zinc-200 hover:border-white/30 hover:text-white'
                  : 'border-black/15 bg-white/80 text-zinc-800 hover:border-black/30 hover:text-black shadow-sm'
              }`}
            >
              <span className="flex items-center gap-1.5">
                Certifications
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </span>
            </MagneticButton>

            <MagneticButton
              href="/assets/giridharun_resume.pdf"
              download="Giridharun_S_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-xl border px-4 py-3 text-[13px] font-medium backdrop-blur-md transition-all duration-300 ${
                isDark
                  ? 'border-white/15 bg-white/[0.03] text-zinc-200 hover:border-white/30 hover:text-white'
                  : 'border-black/15 bg-white/80 text-zinc-800 hover:border-black/30 hover:text-black shadow-sm'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Download className="h-3.5 w-3.5 opacity-70" />
                Download Resume
              </span>
            </MagneticButton>

            <MagneticButton
              href={`mailto:${PERSONAL_INFO.email}`}
              className={`rounded-xl border px-4 py-3 text-[13px] font-medium backdrop-blur-md transition-all duration-300 ${
                isDark
                  ? 'border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                  : 'border-black/10 bg-white/60 text-zinc-600 hover:border-black/20 hover:text-black shadow-sm'
              }`}
            >
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {PERSONAL_INFO.email}
              </span>
            </MagneticButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
