import type { ComponentType } from "react";
import { caseStudies } from "@/content/site";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { ArrowUpRight } from "@/components/ui/icons";
import { ChatMock, DashboardMock, DocumentMock, PhoneMock, PipelineMock, PortalMock } from "@/components/mockups/mockups";

type Mock = ComponentType<{ className?: string }>;

const panels: { id: string; mock: Mock; bg: string; mockClass: string }[] = [
  // Mock-ups render at a fixed natural width and are scaled down, so they never crop.
  { id: "ai-support-agent", mock: ChatMock, bg: "bg-[#0e0b26]", mockClass: "w-[340px] scale-[0.82]" },
  { id: "multi-tenant-saas", mock: DashboardMock, bg: "bg-[#e9ebf3]", mockClass: "w-[460px] scale-[0.66]" },
  { id: "realtime-mobile", mock: PhoneMock, bg: "bg-[#1a0f2e]", mockClass: "w-[190px] scale-[0.68]" },
  { id: "crm-erp-suite", mock: PipelineMock, bg: "bg-[#0c1a2b]", mockClass: "w-[420px] scale-[0.72]" },
  { id: "ai-document-automation", mock: DocumentMock, bg: "bg-[#e9ebf3]", mockClass: "w-[400px] scale-[0.76]" },
  { id: "customer-portal", mock: PortalMock, bg: "bg-[#161032]", mockClass: "w-[380px] scale-[0.76]" },
];

/** "Our Work" — product panels in a responsive grid (no horizontal scrolling). */
export function OurWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="bg-bg py-20 lg:py-28">
      <div className="container-x">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="work-title" className="font-display text-[clamp(1.9rem,1.3rem+1.8vw,2.9rem)] font-medium tracking-[-0.02em] text-fg">
              Our Work
            </h2>
            <p className="mt-3 max-w-xl text-[16px] text-muted">
              Solution blueprints for the systems we design and engineer end to end — from data model to device.
            </p>
          </div>
          <InquiryLink variant="secondary" size="md" className="self-start sm:self-auto">
            Discuss Your Project <ArrowUpRight size={15} />
          </InquiryLink>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {panels.map(({ id, mock: M, bg, mockClass }, i) => {
            const study = caseStudies.find((c) => c.id === id);
            if (!study) return null;
            return (
              <RevealItem key={id} delay={(i % 3) * 0.08} className="group flex min-w-0 flex-col">
                <div className={`relative aspect-[4/3] min-w-0 overflow-hidden border border-line ${bg}`}>
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${mockClass}`}>
                    <div className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2">
                      <M />
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <h3 className="font-display text-[18px] font-medium text-fg">{study.name}</h3>
                  <span className="mt-1 shrink-0 font-mono text-[10.5px] tracking-[0.14em] text-subtle uppercase">Blueprint</span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{study.summary}</p>
                <p className="mt-3 text-[13.5px] text-subtle">{study.technology.join(" · ")}</p>
              </RevealItem>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
