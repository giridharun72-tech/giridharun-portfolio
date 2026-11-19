import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function CustomCursor() {
  const { isDark } = useTheme();
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

    // Track hovered interactive elements
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
        className={`fixed top-0 left-0 h-1.5 w-1.5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${
          isDark ? 'bg-white' : 'bg-zinc-950'
        }`}
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* Smooth outer follower ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          width: isHovered ? 42 : 24,
          height: isHovered ? 42 : 24,
          borderColor: isHovered
            ? isDark
              ? 'rgba(255, 255, 255, 0.45)'
              : 'rgba(0, 0, 0, 0.55)'
            : isDark
            ? 'rgba(255, 255, 255, 0.18)'
            : 'rgba(0, 0, 0, 0.22)',
          backgroundColor: isHovered
            ? isDark
              ? 'rgba(255, 255, 255, 0.04)'
              : 'rgba(0, 0, 0, 0.04)'
            : 'transparent',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      />
    </div>
  );
}
