"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

/**
 * Subtle magnetic pull for primary CTAs. Mouse only; disabled for
 * reduced motion. Never intercepts clicks or focus.
 */
export function Magnetic({ children, strength = 0.2 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  function move(e: PointerEvent<HTMLSpanElement>) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
  function leave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <span
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className="inline-flex transition-transform duration-500 ease-[var(--ease-out-expo)]"
    >
      {children}
    </span>
  );
}
