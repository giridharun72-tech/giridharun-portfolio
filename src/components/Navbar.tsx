import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { GithubIcon } from './common/Icons';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Academics', href: '#academics' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-[#09090B]/80 backdrop-blur-lg border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16">
        {/* Logo */}
        <a href="#" className="text-[15px] font-semibold tracking-tight text-zinc-100">
          Giridharun S
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13px] font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* GitHub + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/giridharun72-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-[13px] font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#09090B]/95 backdrop-blur-lg border-t border-white/5">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 text-[14px] font-medium text-zinc-300 hover:text-zinc-100 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://github.com/giridharun72-tech"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-2.5 text-[14px] font-medium text-zinc-300 hover:text-zinc-100 transition-colors"
              >
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
