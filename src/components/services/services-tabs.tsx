"use client";

import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useState, type ComponentType } from "react";
import { services } from "@/content/site";
import { cn } from "@/lib/utils";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { ArrowRight, Check } from "@/components/ui/icons";
import { ChatMock, DashboardMock, PhoneMock, PipelineMock, PortalMock, TerminalMock } from "@/components/mockups/mockups";

type Mock = ComponentType<{ className?: string }>;

/** Each service gets its own product screen and stage colour. */
const stage: Record<string, { mock: Mock; bg: string; size: string }> = {
  ai: { mock: ChatMock, bg: "from-[#0b1a3a] via-[#1b1550] to-[#3a1260]", size: "w-[78%] max-w-[420px]" },
  saas: { mock: DashboardMock, bg: "from-[#0e1630] via-[#16204d] to-[#251a5a]", size: "w-[90%] max-w-[620px]" },
  web: { mock: PortalMock, bg: "from-[#0c2030] via-[#11304a] to-[#1a2a5c]", size: "w-[80%] max-w-[460px]" },
  mobile: { mock: PhoneMock, bg: "from-[#1a1035] via-[#2a1250] to-[#46125a]", size: "w-[40%] max-w-[220px]" },
  custom: { mock: PortalMock, bg: "from-[#141826] via-[#1d2238] to-[#2a2448]", size: "w-[80%] max-w-[460px]" },
  "crm-erp": { mock: PipelineMock, bg: "from-[#0c1f2a] via-[#122a44] to-[#1d2456]", size: "w-[86%] max-w-[520px]" },
  backend: { mock: TerminalMock, bg: "from-[#0a0f1a] via-[#101a2c] to-[#1a1a3a]", size: "w-[82%] max-w-[480px]" },
  cloud: { mock: TerminalMock, bg: "from-[#0a1622] via-[#0f2236] to-[#1c1d48]", size: "w-[82%] max-w-[480px]" },
};

const ease = [0.16, 1, 0.3, 1] as const;

export function ServicesTabs() {
  const [active, setActive] = useState(0);
  const s = services[active];
  const { mock: Mock, bg, size } = stage[s.id] ?? stage.saas;

  // Deep links: #service-ai etc. select a tab.
  const sync = useCallback(() => {
    const id = window.location.hash.match(/^#service-(.+)$/)?.[1];
    const idx = services.findIndex((x) => x.id === id);
    if (idx >= 0) {
      setActive(idx);
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  useEffect(() => {
    const f = requestAnimationFrame(sync);
    window.addEventListener("hashchange", sync);
    return () => {
      cancelAnimationFrame(f);
      window.removeEventListener("hashchange", sync);
    };
  }, [sync]);

  return (
    <section id="services" aria-labelledby="services-title" className="section bg-bg">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="services-title" className="text-headline font-medium text-fg">
            Build what your business needs
          </h2>
          <p className="mt-5 text-lede text-muted">One team for every layer of a serious digital product.</p>
        </div>

        <div role="tablist" aria-label="Services" className="mt-10 flex justify-start gap-2 overflow-x-auto pb-2 [scrollbar-width:none] sm:justify-center sm:flex-wrap">
          {services.map((x, i) => (
            <button
              key={x.id}
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={i === active}
              aria-controls="services-panel"
              onClick={() => setActive(i)}
              className={cn(
                "h-10 shrink-0 rounded-full px-4 text-[14px] whitespace-nowrap transition-colors duration-300",
                i === active ? "bg-fg text-bg" : "bg-surface-2 text-fg/75 hover:text-fg",
              )}
            >
              {x.name}
            </button>
          ))}
        </div>

        <div
          id="services-panel"
          role="tabpanel"
          aria-labelledby={`tab-${s.id}`}
          className="mt-8 grid overflow-hidden rounded-[20px] border border-line lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
        >
          {/* stage */}
          <div className={cn("force-dark relative grid min-h-[340px] place-items-center overflow-hidden bg-gradient-to-br p-8 sm:min-h-[440px]", bg)}>
            <div aria-hidden className="absolute inset-0 grid-texture opacity-40" />
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={s.id}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.55, ease }}
                className={cn("relative", size)}
              >
                <Mock />
              </m.div>
            </AnimatePresence>
          </div>

          {/* copy */}
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={s.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.45, ease }}
              className="flex flex-col bg-surface p-7 sm:p-10"
            >
              <p className="font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">
                {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-[clamp(1.6rem,1.3rem+1vw,2.2rem)] leading-tight font-medium tracking-[-0.03em] text-fg">{s.name}</h3>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">{s.outcome}</p>
              <ul className="mt-7 space-y-2.5">
                {s.capabilities.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-[15px] text-fg/90">
                    <Check size={15} className="text-violet" /> {c}
                  </li>
                ))}
              </ul>
              <p className="mt-7 font-mono text-[12px] text-subtle">{s.stack.join("  ·  ")}</p>
              <div className="mt-auto pt-8">
                <InquiryLink type={s.inquiryType} variant="primary" size="md">
                  Start your {s.short} project <ArrowRight size={14} />
                </InquiryLink>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
