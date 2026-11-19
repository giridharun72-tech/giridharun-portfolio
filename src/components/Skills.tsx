import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import TiltCard from './common/TiltCard';

const fade = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-40px' } as const,
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">// 06</span>
            <span className="h-px w-6 bg-white/10" />
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            Technical Skills
          </h2>
          <p className="text-[15px] text-zinc-400 max-w-xl">
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
                    className="text-[14px] font-semibold text-zinc-100 mb-1"
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
                      className="text-[11px] text-zinc-300 bg-white/[0.04] border border-white/[0.06] rounded px-2.5 py-1 select-none cursor-default hover:border-white/20 hover:text-white transition-colors"
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
