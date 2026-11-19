import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, FileText } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import type { Certification } from '../types';
import CertificateModal from './common/CertificateModal';
import TiltCard from './common/TiltCard';

const fade = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-40px' } as const,
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

function CertCard({
  cert,
  onView,
}: {
  cert: Certification;
  onView: (img: string, title: string) => void;
}) {
  return (
    <motion.div {...fade} className="h-full">
      <TiltCard className="p-6 h-full flex flex-col justify-between">
        <div className="flex items-start gap-4">
          <div
            className="shrink-0 mt-0.5 h-10 w-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center"
            style={{ transform: 'translateZ(20px)' }}
          >
            <Award className="h-5 w-5 text-zinc-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="text-[15px] font-semibold text-zinc-100 mb-1 leading-snug"
              style={{ transform: 'translateZ(24px)' }}
            >
              {cert.title}
            </h3>
            <p
              className="text-[13px] text-zinc-400 mb-1"
              style={{ transform: 'translateZ(18px)' }}
            >
              {cert.issuer}
            </p>
            <p className="text-[12px] text-zinc-500 mb-4 font-mono">{cert.periodOrDate}</p>

            {/* Score / detail */}
            <p
              className="text-[13px] text-zinc-300 mb-3"
              style={{ transform: 'translateZ(16px)' }}
            >
              {cert.scoreOrDetails}
            </p>

            {/* Breakdown */}
            {cert.breakdown && cert.breakdown.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4" style={{ transform: 'translateZ(20px)' }}>
                {cert.breakdown.map((b, i) => (
                  <div
                    key={i}
                    className="text-[12px] rounded-lg border border-white/[0.05] px-3 py-1.5 text-zinc-400"
                  >
                    <span className="text-zinc-500 mr-1.5">{b.label}:</span>
                    <span className="font-mono font-medium text-zinc-300">{b.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Credential + View */}
            <div
              className="flex items-center justify-between pt-2"
              style={{ transform: 'translateZ(20px)' }}
            >
              <span className="text-[11px] text-zinc-600">
                {cert.credentialLabel}: <span className="font-mono text-zinc-500">{cert.credentialId}</span>
              </span>
              <button
                onClick={() => onView(cert.certificateImage, cert.title)}
                className="inline-flex items-center gap-1 text-[12px] font-medium text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              >
                <FileText className="h-3 w-3" /> View Certificate
              </button>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Certifications() {
  const [modal, setModal] = useState<{ img: string; title: string } | null>(null);

  return (
    <section id="certifications" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">// 05</span>
            <span className="h-px w-6 bg-white/10" />
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3">
            Certifications
          </h2>
          <p className="text-[15px] text-zinc-400 max-w-xl">
            Verified credentials from NPTEL (IIT Madras) and industry workshops.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {CERTIFICATIONS.map((c) => (
            <CertCard
              key={c.id}
              cert={c}
              onView={(img, title) => setModal({ img, title })}
            />
          ))}
        </div>
      </div>

      {modal && (
        <CertificateModal
          isOpen
          onClose={() => setModal(null)}
          imageSrc={modal.img}
          title={modal.title}
        />
      )}
    </section>
  );
}
