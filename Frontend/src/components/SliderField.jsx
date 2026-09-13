export default function SliderField({ icon: Icon, label, value, min, max, step = 1, onChange, hint, suffix = '' }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
          <Icon className="w-4 h-4 text-cyan-soft" />
          {label}
        </div>
        <span className="text-sm font-semibold text-white tabular-nums">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer focus-glow"
        style={{
          background: `linear-gradient(to right, #3DE8E0 0%, #5B7CFA ${pct}%, rgba(255,255,255,0.08) ${pct}%, rgba(255,255,255,0.08) 100%)`,
        }}
      />
      {hint && <p className="mt-2 text-[11px] text-slate-500">{hint}</p>}
    </div>
  );
}
