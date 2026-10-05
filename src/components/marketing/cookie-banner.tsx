"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export const COOKIE_KEY = "sslc-cookie-consent";
export const CONSENT_EVENT = "sslc:consent";

/**
 * Cookie notice. The site uses no advertising/tracking cookies (analytics is
 * cookie-free), so this is informational: the choice is remembered in local
 * storage and announced so the email pop-up can wait until it's answered.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(COOKIE_KEY);
    } catch {
      /* storage blocked — show the banner */
    }
    if (stored) return;
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  function choose(value: "accepted" | "essential") {
    try {
      localStorage.setItem(COOKIE_KEY, value);
    } catch {
      /* ignore */
    }
    setOpen(false);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="force-dark fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl animate-rise border border-white/15 bg-[#111114]/95 p-4 text-white shadow-[0_20px_60px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:flex sm:items-center sm:gap-6 sm:p-5"
    >
      <p className="text-[14px] leading-relaxed text-white/80">
        We use only essential storage and cookie-free analytics to improve this site — no advertising cookies. See our{" "}
        <Link href="/cookie-policy" className="text-white underline underline-offset-4">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="mt-3 flex shrink-0 gap-2 sm:mt-0">
        <button
          type="button"
          onClick={() => choose("essential")}
          className="h-10 flex-1 rounded-[3px] border border-white/30 px-4 text-[14px] font-medium text-white hover:border-white sm:flex-none"
        >
          Essential only
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="h-10 flex-1 rounded-[3px] bg-white px-4 text-[14px] font-semibold text-black hover:opacity-90 sm:flex-none"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
