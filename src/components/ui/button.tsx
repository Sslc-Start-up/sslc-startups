import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg shadow-[0_8px_30px_-8px_rgb(168_116_255/0.55)] hover:opacity-90",
  secondary: "border border-violet/50 bg-violet/5 text-fg hover:border-violet hover:bg-violet/15",
  ghost: "text-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-[14px] gap-2 rounded-lg",
  lg: "h-12 px-6 text-[15px] gap-2.5 rounded-lg",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(
    "group/btn relative inline-flex items-center justify-center font-medium tracking-[-0.01em] whitespace-nowrap select-none",
    "transition-[background-color,border-color,color,transform,opacity] duration-300 ease-[var(--ease-out-expo)] active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

/** Arrow that nudges forward on hover — shared by all CTAs. */
export function CtaArrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0.5">
      {children}
    </span>
  );
}

type LinkButtonProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export function LinkButton({ variant, size, className, ...props }: LinkButtonProps) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, size, className)} {...props} />;
}
