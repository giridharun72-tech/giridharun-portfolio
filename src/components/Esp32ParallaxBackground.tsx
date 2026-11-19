import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

export default function Esp32ParallaxBackground() {
  // Global normalized mouse position (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for fluid cursor tracking
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 22 });

  // 3D perspective tilt (±4deg)
  const rotateX = useTransform(smoothY, [-1, 1], ['4deg', '-4deg']);
  const rotateY = useTransform(smoothX, [-1, 1], ['-4deg', '4deg']);

  // XY Parallax shift (±18px)
  const translateX = useTransform(smoothX, [-1, 1], [-18, 18]);
  const yParallax = useTransform(smoothY, [-1, 1], [-18, 18]);

  // Scroll-linked downward drift and gradual fade
  const { scrollYProgress } = useScroll();
  const scrollDrift = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.45, 0.15]);

  // Combined vertical translation (mouse parallax + scroll drift)
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
      {/* 3D Perspective Viewport */}
      <div className="w-full h-full" style={{ perspective: 1200 }}>
        <motion.div
          style={{
            rotateX,
            rotateY,
            x: translateX,
            y: translateY,
            opacity: scrollOpacity,
            scale: 1.06,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full h-full"
        >
          {/* Studio ESP32 Image */}
          <img
            src="/assets/esp32-bg.png"
            alt="ESP32 DevKit Studio"
            className="w-full h-full object-cover object-right lg:object-center"
          />
        </motion.div>
      </div>

      {/* Seamless Blending Overlays */}
      {/* 1. Left-to-right gradient for effortless Hero text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/75 via-45% to-transparent pointer-events-none" />

      {/* 2. Top and bottom subtle gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent via-60% to-[#09090B]/40 pointer-events-none" />

      {/* 3. Soft radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 45%, transparent 20%, rgba(9,9,11,0.35) 55%, rgba(9,9,11,0.85) 90%)',
        }}
      />
    </div>
  );
}
