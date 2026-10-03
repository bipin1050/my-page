"use client";

import { useEffect, useRef } from "react";

/** Twinkling stars plus the occasional shooting star. Pauses off-screen. */
export function Starfield({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let stars: { x: number; y: number; r: number; p: number; s: number }[] = [];
    let meteor: { x: number; y: number; vx: number; vy: number; life: number } | null = null;
    let nextMeteor = performance.now() + 2500;
    let raf = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 5200);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.pow(Math.random(), 1.6) * h, // denser near the top
        r: Math.random() * 1.1 + 0.25,
        p: Math.random() * Math.PI * 2,
        s: Math.random() * 1.2 + 0.4,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        const tw = reduced ? 0.8 : 0.55 + 0.45 * Math.sin(st.p + (t / 1000) * st.s);
        ctx.globalAlpha = tw * (1 - (st.y / h) * 0.6);
        ctx.fillStyle = st.r > 1.1 ? "#ffe6d6" : "#e8e4ff";
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) {
        if (!meteor && t > nextMeteor) {
          meteor = { x: Math.random() * w * 0.7 + w * 0.2, y: Math.random() * h * 0.25, vx: -7, vy: 3.2, life: 1 };
          nextMeteor = t + 5000 + Math.random() * 7000;
        }
        if (meteor) {
          const m = meteor;
          const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 14, m.y - m.vy * 14);
          grad.addColorStop(0, `rgba(255,236,220,${m.life})`);
          grad.addColorStop(1, "rgba(255,236,220,0)");
          ctx.globalAlpha = 1;
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
          ctx.stroke();
          m.x += m.vx;
          m.y += m.vy;
          m.life -= 0.012;
          if (m.life <= 0) meteor = null;
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      draw(t);
      if (visible && !reduced) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });

    resize();
    draw(performance.now());
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
