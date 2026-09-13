import { BrainCircuit } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

const STACK = ['Python', 'scikit-learn', 'React', 'Tailwind CSS', 'Framer Motion'];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-glow to-indigo-accent flex items-center justify-center">
            <BrainCircuit className="w-4.5 h-4.5 text-navy-900" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Student Performance Predictor</p>
            <p className="text-xs text-slate-500">Designed by Anas Adeel</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {STACK.map((s) => (
            <span key={s} className="text-[11px] px-3 py-1.5 rounded-full glass text-slate-400">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="https://github.com/anasadeel01" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-glow/40 transition-colors">
            <GithubIcon className="w-4 h-4" />
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-glow/40 transition-colors">
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
