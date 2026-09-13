import { useEffect, useState } from 'react';
import { BrainCircuit, Menu, X } from 'lucide-react';
import { GithubIcon } from './BrandIcons';

const LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Features', id: 'features' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Predict', id: 'predict' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 flex items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled ? 'glass-strong shadow-card py-2 px-6' : ''
        }`}
      >
        <button onClick={() => goTo('home')} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-glow to-indigo-accent flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
            <BrainCircuit className="w-5 h-5 text-navy-900" strokeWidth={2.4} />
          </div>
          <span className="font-display font-semibold text-white tracking-tight text-[15px] sm:text-base">
            Student Performance Predictor
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => goTo(l.id)}
              className="text-sm text-slate-300 hover:text-white transition-colors font-medium"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/Abrar-ul-hasnain"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium text-slate-200 hover:text-white hover:border-cyan-glow/40 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            GitHub
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen((o) => !o)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mx-4 mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-1">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => goTo(l.id)}
              className="text-left px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-white/5 hover:text-white transition-colors"
            >
              {l.label}
            </button>
          ))}
          <a
            href="https://github.com/Abrar-ul-hasnain"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-white/5"
          >
            <GithubIcon className="w-4 h-4" /> GitHub
          </a>
        </div>
      )}
    </header>
  );
}
