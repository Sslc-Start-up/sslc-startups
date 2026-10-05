import type { ComponentType } from "react";
import { caseStudies } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { ArrowUpRight } from "@/components/ui/icons";
import { ChatMock, DashboardMock, PhoneMock } from "@/components/mockups/mockups";

type Mock = ComponentType<{ className?: string }>;

/** Aligns the strip with the page container while letting it bleed to the right edge. */
const GUTTER = "max(1.25rem, calc((100vw - 1280px) / 2 + 3rem))";

const panels: { id: string; mock: Mock; bg: string; mockClass: string }[] = [
  { id: "ai-support-agent", mock: ChatMock, bg: "bg-[#0e0b26]", mockClass: "w-[70%] max-w-[380px]" },
  { id: "multi-tenant-saas", mock: DashboardMock, bg: "bg-[#eef0f6]", mockClass: "w-[88%] max-w-[560px]" },
  { id: "realtime-mobile", mock: PhoneMock, bg: "bg-[#1a0f2e]", mockClass: "w-[38%] max-w-[200px]" },
];

/** "Our Work" strip — large product panels with the blueprint underneath. */
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
      </div>

      <div
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]"
        style={{ paddingInline: GUTTER, scrollPaddingInline: GUTTER }}
      >
        {panels.map(({ id, mock: M, bg, mockClass }) => {
          const study = caseStudies.find((c) => c.id === id);
          if (!study) return null;
          return (
            <article key={id} className="w-[86vw] max-w-[620px] shrink-0 snap-start sm:w-[60vw] lg:w-[42vw]">
              <div className={`grid aspect-[16/10] place-items-center overflow-hidden ${bg}`}>
                <M className={mockClass} />
              </div>
              <div className="mt-5 flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-display text-[19px] font-medium text-fg">{study.name}</h3>
                  <p className="mt-1.5 text-[15px] text-muted">{study.summary}</p>
                </div>
                <span className="shrink-0 font-mono text-[11px] tracking-[0.14em] text-subtle uppercase">Blueprint</span>
              </div>
              <p className="mt-3 text-[13.5px] text-subtle">{study.technology.join(" · ")}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
