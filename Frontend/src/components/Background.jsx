import { useEffect, useRef } from 'react';

// Signature element: a quiet neural-network canvas — glowing nodes drifting and
// connecting when close, evoking the model actually "thinking" underneath the UI.
export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let width, height;
    let nodes = [];

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = Math.max(window.innerHeight, 900);
      const count = Math.min(60, Math.floor((width * height) / 28000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 0.6,
      }));
    }

    function step() {
      ctx.clearRect(0, 0, width, height);
      for (const n of nodes) {
        if (!prefersReduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(61, 232, 224, ${0.12 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(127, 244, 238, 0.55)';
        ctx.shadowColor = 'rgba(61, 232, 224, 0.8)';
        ctx.shadowBlur = 6;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    }

    resize();
    step();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-navy-900">
      {/* base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-950" />

      {/* soft drifting blobs */}
      <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-indigo-accent/20 blur-[120px] animate-drift" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-glow/10 blur-[130px] animate-float-slow" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full bg-indigo-accent/10 blur-[110px] animate-float" />

      {/* neural network canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />

      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  );
}
