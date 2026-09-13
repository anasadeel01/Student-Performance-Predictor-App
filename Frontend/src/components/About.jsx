import { AlertTriangle, BookMarked, Calendar, GraduationCap, Users, Wifi, XCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const FACTORS = [
  { icon: GraduationCap, label: 'Previous grades (G1, G2)', desc: 'First and second term academic results' },
  { icon: BookMarked, label: 'Study habits', desc: 'Weekly study time and consistency' },
  { icon: XCircle, label: 'Past failures', desc: 'Number of previous class failures' },
  { icon: Calendar, label: 'Absences', desc: 'Total recorded school absences' },
  { icon: Users, label: 'Family education', desc: "Mother's and father's education level" },
  { icon: Wifi, label: 'Internet availability', desc: 'Access to internet at home' },
  { icon: AlertTriangle, label: 'Alcohol consumption', desc: 'Combined weekday and weekend index' },
  { icon: GraduationCap, label: 'Risk score', desc: 'Composite of failures and absences' },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <ScrollReveal>
            <span className="text-xs font-semibold tracking-widest text-cyan-soft uppercase">About the project</span>
            <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl text-white leading-tight">
              A model trained on real academic outcomes
            </h2>
            <p className="mt-5 text-slate-400 leading-relaxed">
              This project predicts a student's final academic performance using a
              trained machine learning model built on the UCI Student Performance
              dataset — 649 real students from two Portuguese secondary schools.
            </p>
            <p className="mt-4 text-slate-400 leading-relaxed">
              A Linear Regression model estimates the exact final grade (R² = 0.863),
              while a Logistic Regression model predicts pass or fail with 92.3%
              accuracy. Together they consider eleven educational, behavioral, and
              family-related factors:
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { v: '0.863', l: 'R² Score' },
                { v: '92.3%', l: 'Pass/Fail Accuracy' },
                { v: '649', l: 'Students in dataset' },
              ].map((s, i) => (
                <div key={i} className="glass rounded-xl px-4 py-3 min-w-[130px]">
                  <div className="text-xl font-display font-bold text-gradient">{s.v}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {FACTORS.map((f, i) => (
              <ScrollReveal key={f.label} delay={i * 0.05}>
                <div className="glass rounded-2xl p-5 h-full hover:-translate-y-1 hover:border-cyan-glow/30 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-glow/20 to-indigo-accent/20 flex items-center justify-center mb-3 group-hover:rotate-6 transition-transform">
                    <f.icon className="w-5 h-5 text-cyan-soft" />
                  </div>
                  <div className="text-sm font-semibold text-white">{f.label}</div>
                  <div className="text-xs text-slate-400 mt-1 leading-relaxed">{f.desc}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
