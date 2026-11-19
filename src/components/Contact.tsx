import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Copy, Check, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon } from './common/Icons';

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

function CopyField({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <Icon className="h-4 w-4 text-zinc-500 shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-[11px] text-zinc-600 block">{label}</span>
        <span className="text-[13px] text-zinc-200 font-mono truncate block">{value}</span>
      </div>
      <button onClick={handleCopy} className="shrink-0 text-zinc-500 hover:text-zinc-200 transition-colors" aria-label="Copy">
        {copied ? <Check className="h-4 w-4 text-emerald-500/70" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade} className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-50 mb-3">
            Get in Touch
          </h2>
          <p className="text-[15px] text-zinc-500 max-w-xl">
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
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-[13px] text-zinc-300 hover:border-white/[0.14] hover:text-zinc-100 transition-colors"
            >
              <GithubIcon className="h-4 w-4" /> GitHub
              <ExternalLink className="h-3 w-3 text-zinc-600" />
            </a>
            <a
              href={PERSONAL_INFO.iotHub}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-[13px] text-zinc-300 hover:border-white/[0.14] hover:text-zinc-100 transition-colors"
            >
              IoT Hub
              <ExternalLink className="h-3 w-3 text-zinc-600" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
