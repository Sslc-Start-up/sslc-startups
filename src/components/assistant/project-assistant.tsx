"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { company, projectTypes, type ProjectType } from "@/content/site";
import { startInquiry } from "@/lib/prefill";
import { Close, Mail, MessageSquare, WhatsApp } from "@/components/ui/icons";

/**
 * "Talk to SSLC" — a frontend-only project assistant.
 * It does NOT simulate AI replies: it helps visitors start a brief
 * (pre-selecting the project type) or reach the team directly.
 */
export function ProjectAssistant() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Appear after the hero; hide while the contact form is on screen.
  useEffect(() => {
    const contact = document.getElementById("contact");
    let contactVisible = false;
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.6 && !contactVisible);
    const io = new IntersectionObserver(
      ([entry]) => {
        contactVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.15 },
    );
    if (contact) io.observe(contact);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function choose(type: ProjectType) {
    setOpen(false);
    startInquiry(type);
  }

  const shown = visible || open;

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open ? (
          <m.div
            ref={panelRef}
            id="project-assistant"
            role="dialog"
            aria-modal="false"
            aria-labelledby="assistant-title"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-[min(340px,calc(100vw-2rem))] origin-bottom-right rounded-2xl border border-line-strong bg-surface/95 p-5 shadow-[var(--shadow-float)] backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p id="assistant-title" className="text-[15px] font-semibold text-fg">
                  Talk to SSLC
                </p>
                <p className="mt-1 text-[13px] leading-snug text-muted">
                  Pick what you&apos;re building and we&apos;ll set up your project brief.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid size-8 shrink-0 place-items-center rounded-lg text-muted hover:bg-white/5 hover:text-fg"
              >
                <Close size={15} />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {projectTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => choose(t)}
                  className="rounded-lg border border-line-strong bg-white/[0.02] px-3 py-2 text-left text-[13px] text-fg/90 transition-colors hover:border-accent/50 hover:bg-accent/10"
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4 text-[13px]">
              <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2.5 text-muted hover:text-fg">
                <Mail size={14} /> {company.email}
              </a>
              <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-muted hover:text-fg">
                <WhatsApp size={14} /> WhatsApp · {company.phone}
              </a>
            </div>
            <p className="mt-3 text-[11.5px] text-subtle">Every reply comes from our team — not a bot.</p>
          </m.div>
        ) : null}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="project-assistant"
        tabIndex={shown ? 0 : -1}
        aria-hidden={!shown}
        className={`inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-surface/90 pr-4 pl-3.5 text-[13.5px] font-medium text-fg shadow-[var(--shadow-float)] backdrop-blur-xl transition-[opacity,transform,border-color] duration-500 ease-[var(--ease-out-expo)] hover:border-accent/50 ${
          shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <span className="relative grid size-6 place-items-center rounded-full bg-accent text-white">
          <MessageSquare size={13} />
        </span>
        Talk to SSLC
      </button>
    </div>
  );
}
