import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle, FileText } from 'lucide-react';
import { INTERNSHIP } from '../data/portfolioData';
import CertificateModal from './common/CertificateModal';
import TiltCard from './common/TiltCard';

const fade = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-40px' } as const,
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

export default function Internship() {
  const [showCert, setShowCert] = useState(false);

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">// 02</span>
            <span className="h-px w-6 bg-white/10" />
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">INDUSTRY EXPERIENCE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            Experience
          </h2>
          <p className="text-[15px] text-zinc-400 max-w-xl">
            Professional internship experience in IoT engineering and embedded systems.
          </p>
        </motion.div>

        <motion.div {...fade}>
          <TiltCard className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 mt-0.5 h-10 w-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center"
                style={{ transform: 'translateZ(20px)' }}
              >
                <Briefcase className="h-5 w-5 text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className="text-[16px] font-semibold text-zinc-100 mb-1"
                  style={{ transform: 'translateZ(24px)' }}
                >
                  {INTERNSHIP.role}
                </h3>
                <p
                  className="text-[14px] text-zinc-400 mb-1"
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
                    <span className="font-mono text-zinc-300">{INTERNSHIP.internId}</span>
                  </div>
                  <span className="text-zinc-600">·</span>
                  <div className="inline-flex items-center gap-1.5 text-zinc-300 font-medium">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500/80" />
                    <span>{INTERNSHIP.status}</span>
                  </div>
                </div>

                {/* Recognitions */}
                <div className="flex flex-wrap gap-1.5 mb-5" style={{ transform: 'translateZ(20px)' }}>
                  {INTERNSHIP.recognitions.map((r) => (
                    <span key={r} className="text-[11px] text-zinc-400 bg-white/[0.04] border border-white/[0.06] rounded px-2 py-0.5">
                      {r}
                    </span>
                  ))}
                </div>

                {/* Remarks */}
                <p className="text-[13px] text-zinc-400 leading-relaxed mb-5" style={{ transform: 'translateZ(14px)' }}>
                  &ldquo;{INTERNSHIP.remarks}&rdquo;
                </p>

                {/* Certificate button */}
                <button
                  onClick={() => setShowCert(true)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
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
