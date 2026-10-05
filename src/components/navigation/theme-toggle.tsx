"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light";

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const getServerTheme = (): Theme => "light";

/** Current theme, kept in sync with <html data-theme>. */
export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, getServerTheme);
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("sslc-theme", theme);
  } catch {
    /* storage unavailable — theme still applies for this visit */
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={cn(
        "relative grid size-10 place-items-center overflow-hidden rounded-full border border-line-strong bg-transparent text-fg transition-colors hover:border-fg",
        className,
      )}
    >
      {/* sun */}
      <svg
        viewBox="0 0 24 24"
        width={17}
        height={17}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        aria-hidden
        className={cn(
          "absolute transition-all duration-500 ease-[var(--ease-out-expo)]",
          theme === "light" ? "rotate-0 opacity-100" : "rotate-90 opacity-0",
        )}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* moon */}
      <svg
        viewBox="0 0 24 24"
        width={16}
        height={16}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={cn(
          "absolute transition-all duration-500 ease-[var(--ease-out-expo)]",
          theme === "dark" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
        )}
      >
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  );
}
