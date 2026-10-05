"use client";

import { useEffect, useRef } from "react";

/**
 * Glowing particle globe (2D canvas — no 3D library). A Fibonacci sphere of
 * points shaded by depth, with scattered "city lights". Pauses off-screen and
 * in background tabs; reduced-motion users get a single still frame.
 */
export function Globe({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const small = window.innerWidth < 768;
    const N = small ? 1400 : 2800;
    type P = { x: number; y: number; z: number; light: number };
    const pts: P[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      // a few bright "city lights", clustered by a cheap noise on lat/long
      const n = Math.sin(t * 3.1) * Math.cos(y * 7.3) + Math.sin(t * 0.7 + y * 4.1);
      const light = n > 1.15 ? Math.random() : Math.random() < 0.04 ? 0.6 : 0;
      pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r, light });
    }

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    let angle = 0.6;
    const tilt = 0.38;
    const ct = Math.cos(tilt);
    const st = Math.sin(tilt);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.46;
      const cx = w / 2;
      const cy = h / 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // inner glow of the sphere body
      const body = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.3, R * 0.1, cx, cy, R);
      body.addColorStop(0, "rgba(70, 90, 255, 0.28)");
      body.addColorStop(0.7, "rgba(40, 30, 120, 0.18)");
      body.addColorStop(1, "rgba(20, 10, 60, 0.05)");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      for (const p of pts) {
        const x1 = p.x * cos - p.z * sin;
        const z1 = p.x * sin + p.z * cos;
        const y1 = p.y * ct - z1 * st;
        const z2 = p.y * st + z1 * ct;
        const depth = (z2 + 1) / 2; // 0 back … 1 front
        const sx = cx + x1 * R;
        const sy = cy + y1 * R;
        if (p.light > 0 && depth > 0.45) {
          ctx.globalAlpha = 0.35 + depth * 0.65;
          ctx.fillStyle = p.light > 0.7 ? "#ffe9ff" : p.light > 0.35 ? "#ff9cf0" : "#9fe8ff";
          const s = 1 + depth * 1.6;
          ctx.fillRect(sx, sy, s, s);
        } else {
          ctx.globalAlpha = 0.08 + depth * 0.55;
          ctx.fillStyle = depth > 0.75 ? "#b9c6ff" : "#5b6cff";
          const s = 0.6 + depth;
          ctx.fillRect(sx, sy, s, s);
        }
      }
      ctx.globalAlpha = 1;

      // rim light
      const rim = ctx.createRadialGradient(cx, cy, R * 0.86, cx, cy, R * 1.04);
      rim.addColorStop(0, "rgba(120, 140, 255, 0)");
      rim.addColorStop(0.75, "rgba(140, 120, 255, 0.35)");
      rim.addColorStop(1, "rgba(140, 120, 255, 0)");
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.04, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      angle += 0.0018;
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
