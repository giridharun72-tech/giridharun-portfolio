export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[12px] text-zinc-600">
          © {new Date().getFullYear()} Giridharun S · Karur, Tamil Nadu, India
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[12px] text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
