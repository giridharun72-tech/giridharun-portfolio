import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Copy, Check, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './common/Icons';
import { useTheme } from '../context/ThemeContext';

const fade = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-40px' } as const,
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

function CopyField({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const [copied, setCopied] = useState(false);
  const { isDark } = useTheme();

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
        isDark
          ? 'border-white/[0.06] bg-white/[0.02]'
          : 'border-black/[0.08] bg-black/[0.02]'
      }`}
    >
      <Icon className="h-4 w-4 text-zinc-500 shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-[11px] text-zinc-500 block">{label}</span>
        <span className={`text-[13px] font-mono truncate block ${isDark ? 'text-zinc-200' : 'text-zinc-900 font-medium'}`}>
          {value}
        </span>
      </div>
      <button
        onClick={handleCopy}
        className={`shrink-0 transition-colors cursor-pointer ${isDark ? 'text-zinc-500 hover:text-zinc-200' : 'text-zinc-500 hover:text-black'}`}
        aria-label="Copy"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

export default function Contact() {
  const { isDark } = useTheme();

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">// 07</span>
            <span className={`h-px w-6 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">TRANSMISSION & COLLABORATION</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-3 transition-colors ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}>
            Get in Touch
          </h2>
          <p className={`text-[15px] max-w-xl transition-colors ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Open to collaborations, internships, and conversations about embedded systems and engineering.
          </p>
        </motion.div>

        <motion.div {...fade} className="max-w-lg space-y-3">
          <CopyField label="Email" value={PERSONAL_INFO.email} icon={Mail} />
          <CopyField label="Phone" value={PERSONAL_INFO.phone} icon={Phone} />

          <div className="flex gap-3 pt-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-[13px] transition-all duration-200 ${
                isDark
                  ? 'border-white/[0.06] bg-white/[0.02] text-zinc-300 hover:border-white/[0.16] hover:text-white'
                  : 'border-black/[0.08] bg-black/[0.02] text-zinc-700 hover:border-black/[0.2] hover:text-black font-medium'
              }`}
            >
              <GithubIcon className="h-4 w-4" /> GitHub
              <ExternalLink className="h-3 w-3 text-zinc-500" />
            </a>
            <a
              href={PERSONAL_INFO.iotHub}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-[13px] transition-all duration-200 ${
                isDark
                  ? 'border-white/[0.06] bg-white/[0.02] text-zinc-300 hover:border-white/[0.16] hover:text-white'
                  : 'border-black/[0.08] bg-black/[0.02] text-zinc-700 hover:border-black/[0.2] hover:text-black font-medium'
              }`}
            >
              IoT Hub
              <ExternalLink className="h-3 w-3 text-zinc-500" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
