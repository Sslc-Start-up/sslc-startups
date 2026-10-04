import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  /** Kept for API compatibility; not rendered. */
  index?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
};

/** Pill label + headline + intro. Centered by default. */
export function SectionHeading({ label, title, intro, align = "center", id, className }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center", className)}>
      <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/70 px-3.5 py-1.5 text-[13px] font-medium text-fg/80 shadow-[var(--shadow-card)] backdrop-blur-sm">
        <span className="slash !w-2.5 !h-2" aria-hidden />
        {label}
      </span>
      <h2 id={id} className="mt-5 text-headline font-semibold text-sheen">
        {title}
      </h2>
      {intro ? <p className={cn("mt-5 max-w-2xl text-lede text-muted", center && "mx-auto")}>{intro}</p> : null}
    </Reveal>
  );
}
