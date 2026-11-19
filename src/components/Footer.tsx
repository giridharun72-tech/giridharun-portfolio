import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`border-t py-8 transition-colors ${isDark ? 'border-white/5' : 'border-black/5'}`}>
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className={`text-[12px] ${isDark ? 'text-zinc-600' : 'text-zinc-500'}`}>
          © {new Date().getFullYear()} Giridharun S · Karur, Tamil Nadu, India
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`text-[12px] transition-colors cursor-pointer ${
            isDark ? 'text-zinc-500 hover:text-zinc-300' : 'text-zinc-500 hover:text-black font-medium'
          }`}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
