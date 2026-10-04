import { engagementModels } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealItem } from "@/components/ui/reveal";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { CtaArrow, buttonClass } from "@/components/ui/button";
import { ArrowRight, Check, WhatsApp } from "@/components/ui/icons";
import { company } from "@/content/site";

export function EngagementSection() {
  return (
    <section aria-labelledby="engage-title" className="section bg-bg-1">
      <div className="container-x">
        <SectionHeading
          id="engage-title"
          label="Ways to work with us"
          title={
            <>
              Flexible engagement, <span className="text-brand">clear outcomes</span>
            </>
          }
          intro="Start with a fixed scope, grow into a dedicated team, or bring us in to support software that's already live."
        />

        <ul className="mt-14 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {engagementModels.map((m, i) => (
            <RevealItem
              key={m.title}
              delay={i * 0.07}
              className={`relative flex flex-col rounded-3xl border bg-surface p-8 shadow-[var(--shadow-card)] ${
                i === 1 ? "glow-border border-transparent lg:-translate-y-3" : "border-line"
              }`}
              data-active={i === 1 ? "true" : undefined}
            >
              <span className="inline-flex w-fit rounded-full bg-surface-2 px-3 py-1 text-[12px] font-medium text-violet">{m.tag}</span>
              <h3 className="mt-5 text-[22px] font-semibold tracking-[-0.02em] text-fg">{m.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{m.detail}</p>
              <p className="mt-6 flex items-start gap-2.5 border-t border-line pt-5 text-[14px] text-fg/85">
                <Check size={16} className="mt-0.5 shrink-0 text-mint" />
                <span>
                  <span className="text-subtle">Best for: </span>
                  {m.bestFor}
                </span>
              </p>
            </RevealItem>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <InquiryLink variant="primary" size="lg">
            Get a Free Project Estimate
            <CtaArrow>
              <ArrowRight size={16} />
            </CtaArrow>
          </InquiryLink>
          <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "lg")}>
            <WhatsApp size={17} className="text-[#25d366]" /> Schedule a Call
          </a>
        </div>
      </div>
    </section>
  );
}
