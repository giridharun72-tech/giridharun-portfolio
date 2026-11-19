import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: (e?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [shockwave, setShockwave] = useState<{ x: number; y: number; key: number; isDark: boolean } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('giridharun_portfolio_theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      document.documentElement.classList.toggle('light', saved === 'light');
      document.documentElement.classList.toggle('dark', saved === 'dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = (e?: React.MouseEvent) => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    const x = e ? e.clientX : window.innerWidth / 2;
    const y = e ? e.clientY : window.innerHeight / 2;

    // Trigger visual shockwave energy ripple
    setShockwave({ x, y, key: Date.now(), isDark: nextTheme === 'dark' });

    // Modern View Transitions API with circular clip-path reveal if supported
    const doc = document as any;
    if (doc.startViewTransition) {
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = doc.startViewTransition(() => {
        setTheme(nextTheme);
        localStorage.setItem('giridharun_portfolio_theme', nextTheme);
        document.documentElement.classList.toggle('light', nextTheme === 'light');
        document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 650,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    } else {
      setTheme(nextTheme);
      localStorage.setItem('giridharun_portfolio_theme', nextTheme);
      document.documentElement.classList.toggle('light', nextTheme === 'light');
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>
      {children}

      {/* Unique radial shockwave ripple originating from switch button */}
      {shockwave && (
        <span
          key={shockwave.key}
          style={{
            left: shockwave.x,
            top: shockwave.y,
            borderColor: shockwave.isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(245, 158, 11, 0.45)',
          }}
          className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-2 animate-theme-shockwave"
        />
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
