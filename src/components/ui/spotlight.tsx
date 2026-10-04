"use client";

import type { ComponentProps, PointerEvent } from "react";
import { cn } from "@/lib/utils";

/** Card surface with a soft pointer-following highlight (CSS-driven, no re-renders). */
export function Spotlight({ className, onPointerMove, ...props }: ComponentProps<"div">) {
  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    onPointerMove?.(e);
  }
  return <div className={cn("spotlight", className)} onPointerMove={handleMove} {...props} />;
}
