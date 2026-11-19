import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import TiltCard from './common/TiltCard';
import { useTheme } from '../context/ThemeContext';

const fade = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-40px' } as const,
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

export default function Skills() {
  const { isDark } = useTheme();

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">// 06</span>
            <span className={`h-px w-6 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">TECHNICAL ARSENAL</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-3 transition-colors ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}>
            Technical Skills
          </h2>
          <p className={`text-[15px] max-w-xl transition-colors ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Core competencies across hardware, firmware, software, and cloud platforms.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              {...fade}
              className="h-full"
            >
              <TiltCard className="p-6 h-full flex flex-col justify-between">
                <div>
                  <h3
                    className={`text-[15px] font-semibold mb-1 transition-colors ${
                      isDark ? 'text-zinc-100' : 'text-zinc-950'
                    }`}
                    style={{ transform: 'translateZ(24px)' }}
                  >
                    {cat.title}
                  </h3>
                  <p
                    className="text-[12px] text-zinc-500 mb-4"
                    style={{ transform: 'translateZ(14px)' }}
                  >
                    {cat.description}
                  </p>
                </div>

                <div
                  className="flex flex-wrap gap-1.5 pt-2 select-none"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {cat.skills.map((s) => (
                    <span
                      key={s.name}
                      className={`text-[11px] rounded px-2.5 py-1 select-none cursor-default border transition-colors ${
                        isDark
                          ? 'text-zinc-300 bg-white/[0.04] border-white/[0.06] hover:border-white/20 hover:text-white'
                          : 'text-zinc-800 bg-black/[0.03] border-black/[0.08] hover:border-black/20 hover:text-black font-medium'
                      }`}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
