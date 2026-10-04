import { differentiators } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealItem } from "@/components/ui/reveal";

export function WhySection() {
  return (
    <section id="about" aria-labelledby="why-title" className="section border-t border-line bg-bg-1">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="why-title"
            index="09"
            label="Why SSLC"
            title="Why companies choose SSLC."
            intro="SSLC Startup is a software product engineering team. We partner with founders and businesses to design, build and grow software that becomes a core part of how they operate."
          />
        </div>

        <ol className="border-t border-line">
          {differentiators.map((d, i) => (
            <RevealItem
              key={d.title}
              delay={i * 0.05}
              className="group grid grid-cols-[48px_1fr] gap-4 border-b border-line py-8 sm:grid-cols-[72px_1fr] lg:py-10"
            >
              <span className="font-mono text-sm text-subtle transition-colors duration-500 group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="flex items-center text-title font-semibold text-fg">
                  <span
                    aria-hidden
                    className="slash mr-0 w-0 opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:mr-3 group-hover:w-[14px] group-hover:opacity-100"
                  />
                  {d.title}
                </h3>
                <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-muted">{d.detail}</p>
              </div>
            </RevealItem>
          ))}
        </ol>
      </div>
    </section>
  );
}
