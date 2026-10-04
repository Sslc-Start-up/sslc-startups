import { cn } from "@/lib/utils";

/** The brand line from the SSLC logo, with its three accent colours. */
export function Tagline({ className }: { className?: string }) {
  return (
    <p className={cn("text-[15px] font-medium tracking-[-0.005em] text-fg/80 sm:text-base", className)}>
      Build <span className="text-cyan">AI-Ready.</span> Scale <span className="text-violet">Securely.</span> Grow{" "}
      <span className="text-mint">Smarter.</span>
    </p>
  );
}
