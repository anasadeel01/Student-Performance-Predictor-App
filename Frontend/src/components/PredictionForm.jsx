import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Brain, CalendarX, GraduationCap, Info, Loader2, ScanLine, XCircle } from 'lucide-react';
import SliderField from './SliderField';
import ResultCard from './ResultCard';
import { predictStudent } from '../lib/predictor';

const INITIAL = { G1: 12, G2: 12, studytime: 2, failures: 0, absences: 4 };

export default function PredictionForm() {
  const [values, setValues] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const riskScore = values.failures + values.absences;

  const set = (key) => (v) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    setResult(null);
  };

  const handlePredict = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const r = predictStudent(values);
      setResult(r);
      setLoading(false);
    }, 1600);
  };

  return (
    <section id="predict" className="relative py-28 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest text-cyan-soft uppercase">Try it yourself</span>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl text-white">Predict a student's score</h2>
          <p className="mt-3 text-slate-400 text-sm">
            The 5 fields below are the model's real inputs — exactly what{' '}
            <code className="text-cyan-soft">predict_student()</code> takes in the notebook.
          </p>
        </div>

        <div className="glass-strong rounded-[2rem] p-6 sm:p-10 grid lg:grid-cols-2 gap-10">
          {/* LEFT — form */}
          <div className="flex flex-col gap-4">
            <SliderField icon={GraduationCap} label="G1 — First Term Grade" value={values.G1} min={0} max={20} onChange={set('G1')} />
            <SliderField icon={GraduationCap} label="G2 — Second Term Grade" value={values.G2} min={0} max={20} onChange={set('G2')} />
            <SliderField icon={BookOpen} label="Weekly Study Time" value={values.studytime} min={1} max={4} onChange={set('studytime')} hint="1 = <2hrs · 2 = 2–5hrs · 3 = 5–10hrs · 4 = >10hrs" />
            <SliderField icon={XCircle} label="Past Class Failures" value={values.failures} min={0} max={3} onChange={set('failures')} />
            <SliderField icon={CalendarX} label="Absences" value={values.absences} min={0} max={40} onChange={set('absences')} hint="Dataset range is 0–93; capped here for a usable slider" />

            {/* Auto-derived / background factors — honest about what the model actually uses */}
            <div className="mt-2 rounded-xl border border-white/8 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-3">
                <Info className="w-3.5 h-3.5 text-cyan-soft" />
                Background factors used by the model
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div className="flex justify-between glass rounded-lg px-3 py-2">
                  <span>Risk Score</span>
                  <span className="text-white font-medium">{riskScore} <span className="text-slate-500">(failures + absences)</span></span>
                </div>
                <div className="flex justify-between glass rounded-lg px-3 py-2">
                  <span>Higher Ed. Intent</span>
                  <span className="text-white font-medium">dataset avg</span>
                </div>
                <div className="flex justify-between glass rounded-lg px-3 py-2">
                  <span>Parent Education</span>
                  <span className="text-white font-medium">dataset avg</span>
                </div>
                <div className="flex justify-between glass rounded-lg px-3 py-2">
                  <span>Alcohol / Internet</span>
                  <span className="text-white font-medium">dataset avg</span>
                </div>
              </div>
              <p className="mt-3 text-[10.5px] text-slate-500 leading-relaxed">
                These background factors aren't directly controllable by a student profile in this
                demo, so the model fills them with the dataset average — same as the original notebook.
              </p>
            </div>

            <button
              onClick={handlePredict}
              disabled={loading}
              className="btn-glow mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-glow to-indigo-accent text-navy-900 font-semibold py-4 rounded-xl text-sm disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing Student Performance...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  Predict Score
                </>
              )}
            </button>
          </div>

          {/* RIGHT — result / loading / placeholder */}
          <div className="min-h-[420px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-glow/20 animate-ping" />
                    <ScanLine className="w-9 h-9 text-cyan-soft animate-pulse" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Analyzing Student Performance...</p>
                    <p className="text-slate-500 text-sm mt-1">Please wait...</p>
                  </div>
                </motion.div>
              )}

              {!loading && result && (
                <motion.div key="result" className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ResultCard result={result} />
                </motion.div>
              )}

              {!loading && !result && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 text-center text-slate-500"
                >
                  <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center">
                    <Brain className="w-7 h-7 text-cyan-soft/60" />
                  </div>
                  <p className="text-sm max-w-[220px]">
                    Adjust the inputs and hit <span className="text-slate-300">Predict Score</span> to see the model's result.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
