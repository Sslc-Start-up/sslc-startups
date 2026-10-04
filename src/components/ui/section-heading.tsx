import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
};

export function SectionHeading({ index, label, title, intro, align = "left", id, className }: SectionHeadingProps) {
  const center = align === "center";
  return (
    <Reveal className={cn("max-w-3xl", center && "mx-auto text-center", className)}>
      <p className={cn("eyebrow", center && "justify-center")}>
        <span className="slash" aria-hidden />
        <span className="text-subtle">{index}</span>
        <span>{label}</span>
      </p>
      <h2 id={id} className="mt-6 text-headline font-semibold text-sheen">
        {title}
      </h2>
      {intro ? <p className={cn("mt-6 max-w-2xl text-lede text-muted", center && "mx-auto")}>{intro}</p> : null}
    </Reveal>
  );
}
