"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { company } from "@/content/site";
import { Close, WhatsApp } from "@/components/ui/icons";

const DISMISS_KEY = "sslc-wa-bubble-dismissed";

/** Floating WhatsApp chat button with a one-time greeting bubble. */
export function WhatsAppButton() {
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (dismissed) return;
    // Greet only once the visitor has scrolled past the hero (never over the headline).
    let ready = false;
    const t = setTimeout(() => {
      ready = true;
      onScroll();
    }, 4000);
    function onScroll() {
      if (ready && window.scrollY > window.innerHeight) {
        setBubble(true);
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function dismiss() {
    setBubble(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  const href = `${company.whatsappHref}?text=${encodeURIComponent("Hi SSLC, I'd like to discuss a project.")}`;

  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-3 sm:bottom-6 sm:left-6">
      <AnimatePresence>
        {bubble ? (
          <m.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-[240px] origin-bottom-left rounded-2xl border border-line-strong bg-surface/95 py-3 pr-9 pl-4 text-[13.5px] leading-snug text-fg shadow-[var(--shadow-float)] backdrop-blur-xl"
            role="status"
          >
            Hi there 👋 Need help with a project?{" "}
            <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-[#25d366] hover:underline">
              Chat with us
            </a>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss message"
              className="absolute top-2 right-2 grid size-6 place-items-center rounded-md text-subtle hover:bg-surface-2 hover:text-fg"
            >
              <Close size={12} />
            </button>
            <span aria-hidden className="absolute -bottom-1.5 left-6 size-3 rotate-45 border-r border-b border-line-strong bg-surface" />
          </m.div>
        ) : null}
      </AnimatePresence>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with SSLC on WhatsApp (${company.phone})`}
        onClick={dismiss}
        className="group relative grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_32px_-8px_rgb(37_211_102/0.6)] transition-transform duration-300 hover:scale-105"
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25d366]/40 [animation-duration:2.6s]" />
        <WhatsApp size={26} className="relative" />
      </a>
    </div>
  );
}
