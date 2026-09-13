import { ArrowRight, ClipboardList, Cog, Sparkle, Target } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const STEPS = [
  { icon: ClipboardList, title: 'Enter student information', desc: 'Provide grades, study time, failures, and absences.' },
  { icon: Cog, title: 'Model preprocesses data', desc: 'Inputs are scaled the same way as the training data.' },
  { icon: Target, title: 'ML predicts the score', desc: 'Linear and Logistic Regression run in parallel.' },
  { icon: Sparkle, title: 'Result displayed beautifully', desc: 'An animated gauge shows grade, pass status, and confidence.' },
];

export default function Timeline() {
  return (
    <section id="how-it-works" className="relative py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-cyan-soft uppercase">Process</span>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl text-white">How it works</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {STEPS.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1} className="relative">
              <div className="glass rounded-2xl p-6 h-full flex flex-col items-start hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-glow/20 to-indigo-accent/20 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-cyan-soft" />
                  </div>
                  <span className="font-display font-bold text-2xl text-white/20">0{i + 1}</span>
                </div>
                <h3 className="text-white font-semibold mb-1.5">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-cyan-glow/50" />
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
