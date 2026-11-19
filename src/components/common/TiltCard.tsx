import { useRef } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TiltCard({ children, className = '', onClick }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  // Normalized mouse coords (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Pixel coordinates for the spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt
  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 26 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 26 });

  // Tilt transformation (±7deg) with 1000px perspective
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  // Smooth radial spotlight adapted for dark & light mode
  const spotlightBg = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, ${
    isDark ? 'rgba(255, 255, 255, 0.09)' : 'rgba(0, 0, 0, 0.035)'
  }, transparent 75%)`;
  
  const borderSpotlight = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, ${
    isDark ? 'rgba(255, 255, 255, 0.24)' : 'rgba(0, 0, 0, 0.15)'
  }, transparent 70%)`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    x.set(currentX / width - 0.5);
    y.set(currentY / height - 0.5);

    mouseX.set(currentX);
    mouseY.set(currentY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full select-none">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative group rounded-xl border backdrop-blur-md transition-all duration-300 cursor-default select-none ${
          isDark
            ? 'border-white/[0.08] bg-[#111113]/80'
            : 'border-black/[0.08] bg-white/90 shadow-[0_4px_25px_rgba(0,0,0,0.035)] hover:border-black/[0.16]'
        } ${className}`}
      >
        {/* Spotlight overlay inside card */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: spotlightBg,
          }}
        />

        {/* Spotlight border highlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 border border-transparent"
          style={{
            background: borderSpotlight,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px',
          }}
        />

        {/* Content container with preserve-3d to enable translateZ on children */}
        <div className="relative z-10 h-full select-none" style={{ transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
