import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Brain, GraduationCap, LineChart, Sparkles, TrendingUp } from 'lucide-react';

export default function Hero() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: px * 10, y: py * -10 });
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative pt-40 pb-28 px-6">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs font-medium text-cyan-soft mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Machine Learning · Trained on 649 real students
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight text-white">
            Predict Student Academic
            <br />
            Performance Using{' '}
            <span className="text-gradient">Artificial Intelligence</span>
          </h1>

          <p className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">
            An intelligent machine learning model that predicts a student's final
            academic score using educational, behavioral, and family-related factors.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo('predict')}
              className="btn-glow group flex items-center gap-2 bg-gradient-to-r from-cyan-glow to-indigo-accent text-navy-900 font-semibold px-6 py-3.5 rounded-xl text-sm"
            >
              Predict Score
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="px-6 py-3.5 rounded-xl text-sm font-semibold glass text-slate-200 hover:text-white hover:border-white/20 transition-colors"
            >
              Learn More
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3 max-w-lg">
            {[
              { label: '92.3% Accuracy', icon: TrendingUp },
              { label: '11 Input Features', icon: LineChart },
              { label: 'ML Powered', icon: Brain },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass rounded-xl px-3 py-3.5 flex flex-col items-start gap-2 hover:-translate-y-1 hover:border-cyan-glow/30 transition-all duration-300"
              >
                <stat.icon className="w-4 h-4 text-cyan-soft" />
                <span className="text-xs font-medium text-slate-300 leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — floating illustration */}
        <motion.div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[420px] sm:h-[480px] flex items-center justify-center"
        >
          <motion.div
            animate={{ x: tilt.x, y: tilt.y }}
            transition={{ type: 'spring', stiffness: 60, damping: 12 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* center glass card */}
            <div className="relative glass-strong rounded-[2rem] w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center shadow-glow-lg animate-float">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-glow/10 to-indigo-accent/10" />
              <Brain className="w-24 h-24 text-cyan-soft relative z-10" strokeWidth={1.2} />
              <div className="absolute inset-0 rounded-[2rem] border border-cyan-glow/20 animate-pulse-glow" />
            </div>

            {/* orbiting nodes */}
            <div className="absolute top-6 left-6 glass rounded-2xl p-3 animate-float-slow shadow-glow">
              <GraduationCap className="w-6 h-6 text-indigo-accent" />
            </div>
            <div className="absolute bottom-10 left-0 glass rounded-2xl p-3 animate-float shadow-glow" style={{ animationDelay: '1s' }}>
              <BookOpen className="w-6 h-6 text-cyan-soft" />
            </div>
            <div className="absolute top-10 right-2 glass rounded-2xl p-4 animate-float-slow shadow-glow" style={{ animationDelay: '0.5s' }}>
              <LineChart className="w-6 h-6 text-cyan-soft" />
              <div className="mt-2 flex items-end gap-1 h-6">
                {[6, 12, 9, 16, 14].map((h, i) => (
                  <div key={i} className="w-1.5 rounded-full bg-gradient-to-t from-cyan-glow to-indigo-accent" style={{ height: h }} />
                ))}
              </div>
            </div>
            <div className="absolute bottom-2 right-8 glass rounded-2xl px-4 py-2.5 animate-float shadow-glow" style={{ animationDelay: '1.5s' }}>
              <span className="text-xs font-semibold text-white">Score: <span className="text-cyan-soft">87%</span></span>
            </div>

            {/* connecting glow lines (decorative) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
              <line x1="80" y1="60" x2="200" y2="200" stroke="url(#g1)" strokeWidth="1" opacity="0.4" />
              <line x1="320" y1="90" x2="200" y2="200" stroke="url(#g1)" strokeWidth="1" opacity="0.4" />
              <line x1="60" y1="330" x2="200" y2="200" stroke="url(#g1)" strokeWidth="1" opacity="0.4" />
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3DE8E0" />
                  <stop offset="100%" stopColor="#5B7CFA" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
