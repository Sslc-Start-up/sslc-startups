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
      <p className="font-mono text-[11.5px] tracking-[0.22em] text-subtle uppercase">{label}</p>
      <h2 id={id} className="mt-5 text-headline font-medium text-fg">
        {title}
      </h2>
      {intro ? <p className={cn("mt-5 max-w-2xl text-lede text-muted", center && "mx-auto")}>{intro}</p> : null}
    </Reveal>
  );
}
