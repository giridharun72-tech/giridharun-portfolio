import { motion } from 'framer-motion';
import { MapPin, ArrowDown, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-2xl">
          {/* Location */}
          <motion.div {...fade(0.1)} className="flex items-center gap-1.5 mb-6">
            <MapPin className="h-3.5 w-3.5 text-zinc-500" />
            <span className="text-[13px] text-zinc-500 tracking-wide">
              {PERSONAL_INFO.location}
            </span>
          </motion.div>

          {/* Portrait + Name */}
          <motion.div {...fade(0.18)} className="flex items-center gap-5 mb-5">
            <img
              src={PERSONAL_INFO.profileImage}
              alt={PERSONAL_INFO.name}
              className="h-16 w-16 rounded-xl object-cover border border-white/10"
            />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50">
              {PERSONAL_INFO.name}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p {...fade(0.26)} className="text-[15px] md:text-base text-zinc-400 mb-5 leading-relaxed">
            B.E. Electronics &amp; Communication Engineering · Embedded Systems, IoT &amp; Full-Stack Developer
          </motion.p>

          {/* Bio */}
          <motion.p {...fade(0.34)} className="text-[15px] md:text-base text-zinc-400/90 leading-relaxed mb-7">
            {PERSONAL_INFO.pitch}
          </motion.p>

          {/* Inline metrics */}
          <motion.div {...fade(0.42)} className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-[13px]">
            <span className="text-zinc-200 font-medium">
              WHIZZHACK&apos;26 — 1st Prize <span className="text-zinc-500">(Hardware Track)</span>
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-200 font-medium">
              <span className="font-mono">8.18</span> CGPA <span className="text-zinc-500">(Sem 1 &amp; 2)</span>
            </span>
          </motion.div>

          {/* CTA buttons */}
          <motion.div {...fade(0.5)} className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-[13px] font-semibold text-zinc-900 hover:bg-zinc-200 transition-colors"
            >
              View Projects
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
            <a
              href="#certifications"
              className="inline-flex items-center rounded-lg border border-white/12 px-5 py-2.5 text-[13px] font-medium text-zinc-300 hover:border-white/25 hover:text-zinc-100 transition-colors"
            >
              Certifications
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 px-5 py-2.5 text-[13px] font-medium text-zinc-400 hover:border-white/25 hover:text-zinc-200 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              {PERSONAL_INFO.email}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
