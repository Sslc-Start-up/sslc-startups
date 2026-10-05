import type { ComponentType, SVGProps } from "react";
import type { ProjectType } from "@/content/site";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { CtaArrow } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Bot, Cloud, Code, Cube, Palette, Smartphone } from "@/components/ui/icons";

type Icon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const cards: { id: string; title: string; detail: string; icon: Icon; tile: string; type: ProjectType }[] = [
  { id: "web", title: "Web Development", detail: "Modern, scalable and high-performance websites and web apps.", icon: Code, tile: "bg-[#3b2a8a]/60 text-[#c4b5fd]", type: "Web App" },
  { id: "mobile", title: "Mobile App Development", detail: "iOS, Android & cross-platform apps.", icon: Smartphone, tile: "bg-[#1e3a8a]/60 text-[#93c5fd]", type: "Mobile App" },
  { id: "ai", title: "AI & Automation", detail: "AI agents, chatbots and business automation.", icon: Bot, tile: "bg-[#0e5a6b]/60 text-[#67e8f9]", type: "AI Product" },
  { id: "custom", title: "Custom Software", detail: "Tailored solutions for your unique business needs.", icon: Cube, tile: "bg-[#3730a3]/50 text-[#a5b4fc]", type: "Custom Software" },
  { id: "cloud", title: "Cloud & DevOps", detail: "Scalable, secure and cost-effective infrastructure.", icon: Cloud, tile: "bg-[#155e75]/50 text-[#7dd3fc]", type: "Custom Software" },
  { id: "design", title: "UI/UX & Product Design", detail: "User-centred designs that drive results.", icon: Palette, tile: "bg-[#701a75]/50 text-[#f0abfc]", type: "Other" },
];

export function ServicesOverview() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative border-t border-white/[0.06] bg-bg py-20 lg:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.75fr)] lg:items-center lg:gap-12">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface-2/60 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.2em] text-fg/80 uppercase">
            <span className="size-2 rounded-full bg-violet" /> Our services
          </p>
          <h2 id="services-title" className="mt-5 text-[clamp(2rem,1.3rem+1.8vw,2.7rem)] leading-[1.1] font-bold tracking-[-0.03em] text-fg">
            <span className="whitespace-nowrap">End-to-end</span> digital solutions for <span className="text-brand">modern businesses.</span>
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted">
            We turn ideas into powerful digital products — from web and mobile apps to AI solutions, cloud
            infrastructure and more.
          </p>
          <InquiryLink variant="primary" size="md" className="mt-7">
            Discuss Your Project
            <CtaArrow>
              <ArrowRight size={15} />
            </CtaArrow>
          </InquiryLink>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map(({ id, title, detail, icon: I, tile, type }, i) => (
            <RevealItem key={id} id={`service-${id}`} delay={(i % 3) * 0.06} className="h-full scroll-mt-28">
              <InquiryLink
                type={type}
                unstyled
                className="group relative flex h-full items-start gap-3.5 rounded-2xl border border-line bg-surface/70 p-5 pb-14 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-violet/40 hover:bg-surface-2"
              >
                <span className={`force-dark grid size-11 shrink-0 place-items-center rounded-xl ${tile}`}>
                  <I size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15.5px] font-semibold text-fg">{title}</span>
                  <span className="mt-1.5 block text-[13.5px] leading-snug text-muted">{detail}</span>
                </span>
                <span className="absolute right-4 bottom-4 grid size-8 place-items-center rounded-full border border-line-strong text-fg/80 transition-colors group-hover:border-violet group-hover:bg-violet group-hover:text-white">
                  <ArrowUpRight size={15} />
                </span>
              </InquiryLink>
            </RevealItem>
          ))}
        </ul>
      </div>
    </section>
  );
}
