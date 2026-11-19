import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle, FileText } from 'lucide-react';
import { INTERNSHIP } from '../data/portfolioData';
import CertificateModal from './common/CertificateModal';
import TiltCard from './common/TiltCard';
import { useTheme } from '../context/ThemeContext';

const fade = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-40px' } as const,
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

export default function Internship() {
  const [showCert, setShowCert] = useState(false);
  const { isDark } = useTheme();

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">// 02</span>
            <span className={`h-px w-6 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">INDUSTRY EXPERIENCE</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-3 transition-colors ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}>
            Experience
          </h2>
          <p className={`text-[15px] max-w-xl transition-colors ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Professional internship experience in IoT engineering and embedded systems.
          </p>
        </motion.div>

        <motion.div {...fade}>
          <TiltCard className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div
                className={`shrink-0 mt-0.5 h-10 w-10 rounded-lg border flex items-center justify-center transition-colors ${
                  isDark
                    ? 'bg-white/[0.04] border-white/[0.06] text-zinc-400'
                    : 'bg-black/[0.04] border-black/[0.08] text-zinc-600'
                }`}
                style={{ transform: 'translateZ(20px)' }}
              >
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-[17px] font-semibold mb-1 transition-colors ${
                    isDark ? 'text-zinc-100' : 'text-zinc-950'
                  }`}
                  style={{ transform: 'translateZ(24px)' }}
                >
                  {INTERNSHIP.role}
                </h3>
                <p
                  className={`text-[14px] mb-1 font-medium transition-colors ${
                    isDark ? 'text-zinc-400' : 'text-zinc-700'
                  }`}
                  style={{ transform: 'translateZ(18px)' }}
                >
                  {INTERNSHIP.organization}
                </p>
                <p className="text-[13px] text-zinc-500 mb-4">
                  {INTERNSHIP.location} · <span className="font-mono">{INTERNSHIP.period}</span>
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-[13px]" style={{ transform: 'translateZ(16px)' }}>
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-500">Intern ID:</span>
                    <span className={`font-mono font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>
                      {INTERNSHIP.internId}
                    </span>
                  </div>
                  <span className="text-zinc-400">·</span>
                  <div className="inline-flex items-center gap-1.5 text-emerald-500 font-medium">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span className={isDark ? 'text-zinc-300' : 'text-zinc-800'}>{INTERNSHIP.status}</span>
                  </div>
                </div>

                {/* Recognitions */}
                <div className="flex flex-wrap gap-1.5 mb-5" style={{ transform: 'translateZ(20px)' }}>
                  {INTERNSHIP.recognitions.map((r) => (
                    <span
                      key={r}
                      className={`text-[11px] rounded px-2 py-0.5 border transition-colors ${
                        isDark
                          ? 'text-zinc-400 bg-white/[0.04] border-white/[0.06]'
                          : 'text-zinc-700 bg-black/[0.04] border-black/[0.08]'
                      }`}
                    >
                      {r}
                    </span>
                  ))}
                </div>

                {/* Remarks */}
                <p
                  className={`text-[13px] leading-relaxed mb-5 italic transition-colors ${
                    isDark ? 'text-zinc-400' : 'text-zinc-600'
                  }`}
                  style={{ transform: 'translateZ(14px)' }}
                >
                  &ldquo;{INTERNSHIP.remarks}&rdquo;
                </p>

                {/* Certificate button */}
                <button
                  onClick={() => setShowCert(true)}
                  className={`inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors cursor-pointer ${
                    isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-700 hover:text-black font-semibold'
                  }`}
                  style={{ transform: 'translateZ(22px)' }}
                >
                  <FileText className="h-3.5 w-3.5" />
                  View Certificate
                </button>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      <CertificateModal
        isOpen={showCert}
        onClose={() => setShowCert(false)}
        imageSrc={INTERNSHIP.certificateImage}
        title={`${INTERNSHIP.role} — ${INTERNSHIP.organization}`}
      />
    </section>
  );
}
