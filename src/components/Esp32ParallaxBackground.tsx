import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

export default function Esp32ParallaxBackground() {
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
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-[#09090B]">
      
      {/* ─── Layer 1: Subtle Cyber HUD Grid Crosshairs & Lines ─── */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
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
          className="w-full h-full rounded-full animate-pulse"
          style={{
            animationDuration: '6s',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(200, 210, 230, 0.06) 35%, rgba(6, 182, 212, 0.02) 55%, transparent 75%)',
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
            className="w-full h-full object-cover object-right lg:object-center"
          />
        </motion.div>
      </div>

      {/* ─── Layer 4: Seamless Blending Overlays for Readability ─── */}
      {/* Left-to-right contrast vignette for hero text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/80 via-45% to-transparent pointer-events-none" />

      {/* Top and bottom subtle gradient fades */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent via-65% to-[#09090B]/40 pointer-events-none" />

      {/* Ambient dark vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 45%, transparent 22%, rgba(9,9,11,0.3) 55%, rgba(9,9,11,0.88) 92%)',
        }}
      />
    </div>
  );
}
