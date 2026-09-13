import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, PartyPopper, XCircle } from 'lucide-react';
import { gradeLabel } from '../lib/predictor';

const LABEL_STYLES = {
  Excellent: { color: 'text-emerald-300', ring: '#34D399' },
  Good: { color: 'text-cyan-soft', ring: '#3DE8E0' },
  Average: { color: 'text-amber-300', ring: '#FBBF24' },
  'Needs Improvement': { color: 'text-rose-300', ring: '#FB7185' },
};

export default function ResultCard({ result }) {
  const { grade, isPass, passProbability } = result;
  const pct = Math.round((grade / 20) * 100);
  const label = gradeLabel(grade);
  const style = LABEL_STYLES[label];

  const [displayPct, setDisplayPct] = useState(0);
  const firedConfetti = useRef(false);

  useEffect(() => {
    let frame;
    const duration = 1100;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayPct(Math.round(eased * pct));
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [pct]);

  useEffect(() => {
    if (pct > 90 && !firedConfetti.current) {
      firedConfetti.current = true;
      const colors = ['#3DE8E0', '#5B7CFA', '#7FF4EE', '#A78BFA'];
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 }, colors });
      setTimeout(() => confetti({ particleCount: 60, spread: 100, origin: { y: 0.4 }, colors }), 250);
    }
  }, [pct]);

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (displayPct / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong rounded-3xl p-8 flex flex-col items-center text-center h-full justify-center"
    >
      <div className="relative w-44 h-44">
        <svg className="w-44 h-44 -rotate-90" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke={style.ring}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.2s linear', filter: `drop-shadow(0 0 8px ${style.ring}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-bold text-4xl text-white">{displayPct}%</span>
          <span className="text-xs text-slate-400 mt-1">Predicted Score</span>
        </div>
      </div>

      <div className={`mt-5 font-display font-semibold text-lg ${style.color}`}>{label}</div>

      <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-300">
        {isPass ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
        {isPass ? 'Predicted to Pass' : 'Predicted to Fail'} · {Math.round(passProbability * 100)}% confidence
      </div>

      <div className="mt-4 w-full max-w-xs h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-glow to-indigo-accent"
        />
      </div>

      <p className="mt-5 text-xs text-slate-500 max-w-xs leading-relaxed">
        Grade estimated at <span className="text-slate-300 font-medium">{grade.toFixed(1)} / 20</span> using
        Linear Regression, with Pass/Fail confidence from Logistic Regression — both trained on
        the UCI Student Performance dataset.
      </p>

      {pct > 90 && (
        <div className="mt-5 flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 text-sm font-medium">
          <PartyPopper className="w-4 h-4" />
          Outstanding Performance! Keep up the excellent work!
        </div>
      )}
    </motion.div>
  );
}
