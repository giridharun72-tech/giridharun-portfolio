import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Esp32ParallaxBackground() {
  const { isDark } = useTheme();

  // Global normalized mouse position (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for fluid cursor tracking
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 24 });

  // 3D perspective tilt (±4.5deg)
  const rotateX = useTransform(smoothY, [-1, 1], ['4.5deg', '-4.5deg']);
  const rotateY = useTransform(smoothX, [-1, 1], ['-4.5deg', '4.5deg']);

  // XY Parallax shift for board
  const translateX = useTransform(smoothX, [-1, 1], [-22, 22]);
  const yParallax = useTransform(smoothY, [-1, 1], [-22, 22]);

  // Secondary layer parallax for backlight halo (moves slightly faster to create true depth)
  const haloTranslateX = useTransform(smoothX, [-1, 1], [-38, 38]);
  const haloTranslateY = useTransform(smoothY, [-1, 1], [-38, 38]);

  // Scroll-linked downward drift and gradual fade
  const { scrollYProgress } = useScroll();
  const scrollDrift = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.45, 0.12]);

  // Combined vertical translation
  const translateY = useTransform(
    [yParallax, scrollDrift],
    ([yp, sd]) => Number(yp) + Number(sd)
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className={`fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none transition-colors duration-500 ${
        isDark ? 'bg-[#09090B]' : 'bg-[#F4F5F7]'
      }`}
    >
      {/* ─── Layer 1: Subtle Cyber HUD Grid Crosshairs & Lines ─── */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isDark ? 'opacity-[0.035]' : 'opacity-[0.04]'
        }`}
        style={{
          backgroundImage: isDark
            ? `
              linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
            `
            : `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* ─── Layer 2: Radiant Studio Backlight Halo (Behind ESP32) ─── */}
      <motion.div
        style={{
          x: haloTranslateX,
          y: haloTranslateY,
          opacity: scrollOpacity,
        }}
        className="absolute right-[5%] lg:right-[12%] top-[12%] lg:top-[16%] w-[420px] lg:w-[640px] h-[420px] lg:h-[640px] rounded-full pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full animate-pulse transition-all duration-700"
          style={{
            animationDuration: '6s',
            background: isDark
              ? 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(200, 210, 230, 0.06) 35%, rgba(6, 182, 212, 0.02) 55%, transparent 75%)'
              : 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, rgba(251, 191, 36, 0.08) 35%, rgba(14, 165, 233, 0.03) 60%, transparent 75%)',
            filter: 'blur(55px)',
          }}
        />
      </motion.div>

      {/* ─── Layer 3: 3D Perspective Studio ESP32 Image Layer ─── */}
      <div className="w-full h-full" style={{ perspective: 1200 }}>
        <motion.div
          style={{
            rotateX,
            rotateY,
            x: translateX,
            y: translateY,
            opacity: scrollOpacity,
            scale: 1.07,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full h-full"
        >
          {/* Studio ESP32 Hardware Image */}
          <img
            src="/assets/esp32-bg.png"
            alt="ESP32 DevKit Hardware Studio"
            className={`w-full h-full object-cover object-right lg:object-center transition-all duration-500 ${
              isDark ? 'brightness-100 contrast-100' : 'brightness-95 contrast-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]'
            }`}
          />
        </motion.div>
      </div>

      {/* ─── Layer 4: Seamless Blending Overlays for Readability ─── */}
      {/* Left-to-right contrast vignette for hero text readability */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
          isDark
            ? 'bg-gradient-to-r from-[#09090B] via-[#09090B]/80 via-45% to-transparent'
            : 'bg-gradient-to-r from-[#F4F5F7] via-[#F4F5F7]/85 via-50% to-transparent'
        }`}
      />

      {/* Top and bottom subtle gradient fades */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
          isDark
            ? 'bg-gradient-to-t from-[#09090B] via-transparent via-65% to-[#09090B]/40'
            : 'bg-gradient-to-t from-[#F4F5F7] via-transparent via-65% to-[#F4F5F7]/40'
        }`}
      />

      {/* Ambient vignette */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 70% 45%, transparent 22%, rgba(9,9,11,0.3) 55%, rgba(9,9,11,0.88) 92%)'
            : 'radial-gradient(ellipse at 70% 45%, transparent 25%, rgba(244,245,247,0.2) 55%, rgba(244,245,247,0.7) 92%)',
        }}
      />
    </div>
  );
}
