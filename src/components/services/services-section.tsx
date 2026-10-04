"use client";

import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { services } from "@/content/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRight, Check } from "@/components/ui/icons";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { Reveal } from "@/components/ui/reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const service = services[active];

  // Deep links: #service-ai, #service-mobile … select the tab and scroll here.
  const syncHash = useCallback(() => {
    const match = window.location.hash.match(/^#service-(.+)$/);
    if (!match) return;
    const idx = services.findIndex((s) => s.id === match[1]);
    if (idx === -1) return;
    setActive(idx);
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    // Initial deep link is applied after mount (once layout exists to scroll to).
    const frame = requestAnimationFrame(syncHash);
    window.addEventListener("hashchange", syncHash);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", syncHash);
    };
  }, [syncHash]);

  function select(i: number, focus = false) {
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = services.length - 1;
    const keys: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key], true);
    }
  }

  // Hover previews on mouse only, with a short intent delay to avoid flicker.
  function hoverSelect(i: number) {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActive(i), 120);
  }
  function cancelHover() {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }

  return (
    <section id="services" aria-labelledby="services-title" className="section border-t border-line bg-bg-1">
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-texture fade-mask-y opacity-40" />
      <div className="container-x relative">
        <SectionHeading
          id="services-title"
          index="02"
          label="Capabilities"
          title={
            <>
              Everything you need to build a serious digital product.
            </>
          }
          intro="One team across product strategy, design, engineering, AI and cloud — so nothing gets lost between vendors. Choose a capability to see how we'd build it."
        />

        <Reveal className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-6">
          {/* Tab list */}
          <div
            role="tablist"
            aria-label="Services"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {services.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${s.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && hoverSelect(i)}
                  onPointerLeave={cancelHover}
                  className={cn(
                    "group relative flex shrink-0 items-center gap-4 rounded-xl border px-4 py-3 text-left transition-colors duration-300 lg:py-3.5",
                    selected
                      ? "border-line-strong bg-surface-2 text-fg"
                      : "border-line bg-transparent text-muted hover:text-fg lg:border-transparent",
                  )}
                >
                  <span className={cn("font-mono text-[11px]", selected ? "text-accent" : "text-subtle")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium tracking-[-0.01em] whitespace-nowrap">{s.name}</span>
                  {selected ? (
                    <m.span
                      layoutId="service-indicator"
                      transition={{ duration: 0.5, ease }}
                      className="absolute top-3 bottom-3 left-0 hidden w-[2px] rounded-full bg-accent lg:block"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div className="panel glow-border relative min-h-[560px] overflow-hidden" data-active="true">
            <div aria-hidden className="pointer-events-none absolute inset-0 grid-texture opacity-40 fade-mask-radial" />
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={service.id}
                role="tabpanel"
                id={`panel-${service.id}`}
                aria-labelledby={`tab-${service.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease }}
                className="relative grid h-full gap-10 p-6 sm:p-8 lg:p-10 xl:grid-cols-[minmax(0,1fr)_300px]"
              >
                <div className="flex flex-col">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">{service.short}</p>
                  <h3 className="mt-4 text-title font-semibold text-fg">{service.name}</h3>
                  <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted">{service.outcome}</p>

                  <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {service.capabilities.map((c) => (
                      <li key={c} className="flex items-center gap-3 text-[15px] text-fg/90">
                        <Check size={15} className="text-accent" />
                        {c}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {service.stack.map((t) => (
                      <span key={t} className="pill font-mono text-[12px]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-10">
                    <InquiryLink type={service.inquiryType} variant="secondary" size="md">
                      Plan your {service.short} project
                      <ArrowRight size={15} />
                    </InquiryLink>
                  </div>
                </div>

                <FlowDiagram title={service.flowTitle} steps={service.flow} />
              </m.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FlowDiagram({ title, steps }: { title: string; steps: { label: string; detail: string }[] }) {
  return (
    <figure className="rounded-2xl border border-line bg-bg/60 p-5">
      <figcaption className="flex items-center justify-between font-mono text-[10.5px] tracking-[0.18em] text-subtle uppercase">
        <span>{title}</span>
        <span className="flex items-center gap-1.5 text-accent">
          <span className="size-1.5 animate-pulse rounded-full bg-accent" /> live
        </span>
      </figcaption>
      <ol className="relative mt-5">
        {/* spine */}
        <span aria-hidden className="absolute top-4 bottom-4 left-[15px] w-px bg-gradient-to-b from-cyan/60 via-violet/40 to-magenta/60">
          <span className="packet-y" />
        </span>
        {steps.map((s, i) => (
          <m.li
            key={s.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.08 + i * 0.07, ease }}
            className="relative flex items-start gap-4 py-2"
          >
            <span className="relative z-10 grid size-[31px] shrink-0 place-items-center rounded-lg border border-line-strong bg-surface-2 font-mono text-[10px] text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="pt-0.5">
              <span className="block text-[14px] font-medium text-fg">{s.label}</span>
              <span className="block text-[12.5px] leading-snug text-subtle">{s.detail}</span>
            </span>
          </m.li>
        ))}
      </ol>
    </figure>
  );
}
