import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, FileText } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/portfolioData';
import type { Achievement } from '../types';
import CertificateModal from './common/CertificateModal';
import TiltCard from './common/TiltCard';
import { useTheme } from '../context/ThemeContext';

const fade = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-40px' } as const,
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

function AchievementCard({
  item,
  onViewCert,
}: {
  item: Achievement;
  onViewCert: (img: string, title: string) => void;
}) {
  const isWinner = item.id === 'whizzhack-26';
  const { isDark } = useTheme();

  return (
    <motion.div {...fade} className="h-full">
      <TiltCard className="p-5 h-full flex flex-col justify-between">
        <div className="flex items-start gap-3">
          <div
            className={`shrink-0 mt-0.5 h-9 w-9 rounded-lg border flex items-center justify-center transition-colors ${
              isDark
                ? 'bg-white/[0.04] border-white/[0.06] text-zinc-400'
                : 'bg-black/[0.04] border-black/[0.08] text-zinc-700'
            }`}
            style={{ transform: 'translateZ(20px)' }}
          >
            {isWinner ? (
              <Trophy className="h-4 w-4 text-amber-500" />
            ) : (
              <Users className="h-4 w-4" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <span
              className={`inline-block text-[11px] font-medium rounded-md px-2 py-0.5 mb-2 border transition-colors ${
                isDark
                  ? 'text-zinc-400 bg-white/[0.04] border-white/[0.06]'
                  : 'text-zinc-700 bg-black/[0.04] border-black/[0.08]'
              }`}
              style={{ transform: 'translateZ(18px)' }}
            >
              {item.badge}
            </span>
            <h3
              className={`text-[15px] font-semibold mb-1 leading-snug transition-colors ${
                isDark ? 'text-zinc-100' : 'text-zinc-950'
              }`}
              style={{ transform: 'translateZ(24px)' }}
            >
              {item.title}
            </h3>
            <p className="text-[12px] text-zinc-500 mb-2">
              {item.organization}
            </p>
            <p
              className={`text-[13px] leading-relaxed mb-3 transition-colors ${
                isDark ? 'text-zinc-400' : 'text-zinc-600'
              }`}
              style={{ transform: 'translateZ(14px)' }}
            >
              {item.summary}
            </p>
            <div className="flex items-center gap-4" style={{ transform: 'translateZ(18px)' }}>
              <span className={`font-mono text-[11px] ${isDark ? 'text-zinc-600' : 'text-zinc-500'}`}>{item.date}</span>
              {item.certificateImage && (
                <button
                  onClick={() => onViewCert(item.certificateImage!, item.title)}
                  className={`inline-flex items-center gap-1 text-[12px] font-medium transition-colors cursor-pointer ${
                    isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-700 hover:text-black font-semibold'
                  }`}
                >
                  <FileText className="h-3 w-3" /> View Certificate
                </button>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Achievements() {
  const [modal, setModal] = useState<{ img: string; title: string } | null>(null);
  const { isDark } = useTheme();

  return (
    <section id="achievements" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">// 03</span>
            <span className={`h-px w-6 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">COMPETITIVE WINS & LEADERSHIP</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-3 transition-colors ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}>
            Achievements
          </h2>
          <p className={`text-[15px] max-w-xl transition-colors ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Hackathon wins, national competitions, and technical leadership.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {ACHIEVEMENTS.map((a) => (
            <AchievementCard
              key={a.id}
              item={a}
              onViewCert={(img, title) => setModal({ img, title })}
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
