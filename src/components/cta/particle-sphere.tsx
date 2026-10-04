"use client";

import { useEffect, useRef } from "react";

/**
 * Rotating particle sphere (2D canvas, no 3D library). Pauses off-screen;
 * reduced-motion users get a single still frame.
 */
export function ParticleSphere({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const N = window.innerWidth < 768 ? 900 : 1800;
    const pts: [number, number, number][] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      // slight jitter so it reads as "dust", not a grid
      const j = 1 + (Math.random() - 0.5) * 0.06;
      pts.push([Math.cos(t) * r * j, y * j, Math.sin(t) * r * j]);
    }

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    let angle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.46;
      const cx = w / 2;
      const cy = h / 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const tilt = 0.35;
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);
      for (const [x, y, z] of pts) {
        const x1 = x * cos - z * sin;
        const z1 = x * sin + z * cos;
        const y1 = y * ct - z1 * st;
        const z2 = y * st + z1 * ct;
        const depth = (z2 + 1) / 2; // 0 back … 1 front
        ctx.globalAlpha = 0.15 + depth * 0.85;
        const size = 0.6 + depth * 1.3;
        ctx.fillStyle = depth > 0.92 ? "#c9b8ff" : "#ffffff";
        ctx.fillRect(cx + x1 * R, cy + y1 * R, size, size);
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      angle += 0.0025;
      draw();
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    if (reduce) draw();
    else tick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
