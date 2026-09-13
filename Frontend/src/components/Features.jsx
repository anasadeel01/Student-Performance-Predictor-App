import { BarChart3, Brain, Gauge, LayoutDashboard, Smartphone, Sparkles, Zap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const FEATURES = [
  { icon: Brain, title: 'Machine Learning Prediction', desc: 'Dual models trained on real academic data estimate both exact grade and pass probability.' },
  { icon: Gauge, title: 'Real-time Score Prediction', desc: 'Results generate instantly in your browser the moment you submit a profile.' },
  { icon: Zap, title: 'Fast Processing', desc: 'No server round-trip — the trained model runs directly on the client.' },
  { icon: BarChart3, title: 'Educational Analytics', desc: 'See exactly which factors the model weighs and why they matter.' },
  { icon: Smartphone, title: 'Responsive UI', desc: 'A clean experience from a large monitor down to a small phone screen.' },
  { icon: LayoutDashboard, title: 'Interactive Dashboard', desc: 'A guided form and animated result gauge replace a flat spreadsheet output.' },
  { icon: Sparkles, title: 'Modern AI Design', desc: 'Glassmorphism, gradients, and motion built for a premium first impression.' },
];

export default function Features() {
  return (
    <section id="features" className="relative py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-cyan-soft uppercase">Capabilities</span>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl text-white">
            Everything the model brings to the table
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <ScrollReveal key={f.title} delay={(i % 3) * 0.08}>
              <div className="glass rounded-2xl p-6 h-full hover:-translate-y-1.5 hover:shadow-glow hover:border-cyan-glow/30 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-glow to-indigo-accent flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                  <f.icon className="w-5 h-5 text-navy-900" strokeWidth={2.2} />
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
