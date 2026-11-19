import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { ACADEMICS } from '../data/portfolioData';
import TiltCard from './common/TiltCard';

const fade = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-40px' } as const,
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

export default function Academics() {
  return (
    <section id="academics" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-50 mb-3">
            Education
          </h2>
          <p className="text-[15px] text-zinc-500 max-w-xl">
            Academic background in Electronics &amp; Communication Engineering.
          </p>
        </motion.div>

        <div className="space-y-5">
          {ACADEMICS.map((rec, idx) => (
            <motion.div
              key={idx}
              {...fade}
            >
              <TiltCard className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="shrink-0 mt-0.5 h-10 w-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <GraduationCap className="h-5 w-5 text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-[15px] font-semibold text-zinc-100 mb-1"
                      style={{ transform: 'translateZ(24px)' }}
                    >
                      {rec.degree}
                    </h3>
                    <p
                      className="text-[13px] text-zinc-400 mb-0.5"
                      style={{ transform: 'translateZ(18px)' }}
                    >
                      {rec.institution}
                    </p>
                    <p className="text-[12px] text-zinc-500 mb-4">
                      {rec.location} · <span className="font-mono">{rec.durationOrStatus}</span>
                    </p>

                    {/* Scores */}
                    <div className="flex flex-wrap gap-3 mb-4" style={{ transform: 'translateZ(20px)' }}>
                      {rec.scores.map((s, si) => (
                        <div
                          key={si}
                          className={`text-[12px] rounded-lg border px-3 py-1.5 ${
                            s.highlight
                              ? 'border-white/[0.14] bg-white/[0.05] text-zinc-200'
                              : 'border-white/[0.05] text-zinc-400'
                          }`}
                        >
                          <span className="text-zinc-500 mr-1.5">{s.label}:</span>
                          <span className="font-mono font-medium">{s.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Details */}
                    {rec.details && rec.details.length > 0 && (
                      <ul className="space-y-1" style={{ transform: 'translateZ(14px)' }}>
                        {rec.details.map((d, di) => (
                          <li key={di} className="text-[12px] text-zinc-500 leading-relaxed">
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
