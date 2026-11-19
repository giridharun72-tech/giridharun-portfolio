import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing follower
  const springX = useSpring(mouseX, { stiffness: 450, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28 });

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);

    // Track hovered interactive elements (buttons, links, cards, tabs)
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, [role="button"], input, textarea, .group, .interactive-hover');
      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[999] overflow-hidden">
      {/* Center crisp dot */}
      <motion.div
        className="fixed top-0 left-0 h-1.5 w-1.5 rounded-full bg-white -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* Smooth outer follower ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          width: isHovered ? 42 : 24,
          height: isHovered ? 42 : 24,
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.18)',
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      />
    </div>
  );
}
