"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { company, nav } from "@/content/site";
import { cn } from "@/lib/utils";
import { CtaArrow } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "@/components/ui/icons";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { Logo } from "@/components/ui/logo";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll lock is applied/released synchronously so in-menu links can
  // scroll the page in the same click that closes the menu.
  const setMenu = (next: boolean) => {
    document.body.style.overflow = next ? "hidden" : "";
    setOpen(next);
  };
  const close = () => setMenu(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        document.body.style.overflow = "";
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => {
      if (desktop.matches) {
        document.body.style.overflow = "";
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-out-expo)]",
          scrolled || open
            ? "border-line bg-bg/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-16 items-center justify-between lg:h-[72px]">
          <Logo onClick={close} />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-lg px-3.5 py-2 text-sm text-muted transition-colors duration-300 hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <InquiryLink variant="primary" size="md" className="hidden sm:inline-flex">
              Start a Project
              <CtaArrow>
                <ArrowRight size={15} />
              </CtaArrow>
            </InquiryLink>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenu(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid size-10 place-items-center rounded-[10px] border border-line-strong bg-white/[0.03] md:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-[18px] bg-fg transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-[18px] bg-fg transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 grid-texture fade-mask-radial opacity-60" />
            <nav aria-label="Mobile" className="container-x relative flex flex-1 flex-col pt-10 pb-8">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <a href={item.href} onClick={close} className="flex items-baseline justify-between py-5">
                      <span className="text-[34px] font-semibold tracking-[-0.03em] text-fg">{item.label}</span>
                      <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    </a>
                  </m.li>
                ))}
              </ul>

              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-auto pt-10"
              >
                <InquiryLink variant="primary" size="lg" className="w-full" onClick={close}>
                  Start a Project
                  <ArrowRight size={16} />
                </InquiryLink>
                <div className="mt-6 flex flex-col gap-3 text-sm text-muted">
                  <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2.5 hover:text-fg">
                    <Mail size={15} /> {company.email}
                  </a>
                  <a href={company.phoneHref} className="inline-flex items-center gap-2.5 hover:text-fg">
                    <Phone size={15} /> {company.phone}
                  </a>
                </div>
              </m.div>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
