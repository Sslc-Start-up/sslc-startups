"use client";

import { useRef, type ComponentProps, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * 3D tilt + pointer spotlight. Children can use `[transform:translateZ(..)]`
 * to float above the card plane. Mouse only; no effect for reduced motion.
 */
export function TiltCard({ className, children, max = 7, ...props }: ComponentProps<"div"> & { max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  function move(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.style.transform = `perspective(1100px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`;
  }
  function leave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={cn(
        "spotlight glow-border [transform-style:preserve-3d] transition-transform duration-500 ease-[var(--ease-out-expo)] will-change-transform",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
