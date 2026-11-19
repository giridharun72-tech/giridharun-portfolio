import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const mouse = { x: -1000, y: -1000 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Particle setup
    const count = Math.min(42, Math.floor((width * height) / 34000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      size: Math.random() * 1.5 + 0.6,
      alpha: Math.random() * 0.4 + 0.15,
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const dark = isDarkRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle mouse push
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 1.2;
        }

        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.1;
        const clampedAlpha = Math.max(0.08, currentAlpha);

        ctx.fillStyle = dark
          ? `rgba(255, 255, 255, ${clampedAlpha})`
          : `rgba(15, 23, 42, ${clampedAlpha * 0.65})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connective constellation filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < 100) {
            ctx.strokeStyle = dark
              ? `rgba(255, 255, 255, ${0.04 * (1 - cdist / 100)})`
              : `rgba(15, 23, 42, ${0.03 * (1 - cdist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 select-none opacity-70"
    />
  );
}
