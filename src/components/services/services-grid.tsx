import type { ComponentType, SVGProps } from "react";
import { services } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealItem } from "@/components/ui/reveal";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { ArrowRight, Browser, Chart, Cloud, Layers, Puzzle, Server, Smartphone, Sparkles } from "@/components/ui/icons";

type Icon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const icons: Record<string, Icon> = {
  ai: Sparkles,
  saas: Layers,
  web: Browser,
  mobile: Smartphone,
  custom: Puzzle,
  "crm-erp": Chart,
  backend: Server,
  cloud: Cloud,
};

const tints = [
  "from-cyan/20 to-accent/10 text-cyan",
  "from-accent/20 to-violet/10 text-accent",
  "from-violet/20 to-magenta/10 text-violet",
  "from-magenta/20 to-violet/10 text-magenta",
];

export function ServicesGrid() {
  return (
    <section id="services" aria-labelledby="services-title" className="section">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          label="Services"
          title={
            <>
              Everything you need to build a <span className="text-brand">serious digital product</span>
            </>
          }
          intro="One team across product strategy, design, engineering, AI and cloud — so nothing gets lost between vendors."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = icons[s.id] ?? Layers;
            return (
              <RevealItem
                key={s.id}
                id={`service-${s.id}`}
                delay={(i % 4) * 0.06}
                className="group relative flex scroll-mt-28 flex-col rounded-2xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-violet/30 hover:shadow-[var(--shadow-float)]"
              >
                <span
                  className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ${tints[i % tints.length]} transition-transform duration-500 group-hover:scale-110`}
                >
                  <Icon size={22} />
                </span>
                <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.015em] text-fg">{s.name}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.outcome}</p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {s.capabilities.slice(0, 4).map((c) => (
                    <li key={c} className="rounded-md bg-surface-2 px-2 py-1 text-[12px] text-fg/75">
                      {c}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <InquiryLink
                    type={s.inquiryType}
                    unstyled
                    className="inline-flex items-center gap-1.5 text-[14px] font-medium text-accent transition-[gap] duration-300 group-hover:gap-2.5"
                  >
                    Get started <ArrowRight size={15} />
                  </InquiryLink>
                </div>
              </RevealItem>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
