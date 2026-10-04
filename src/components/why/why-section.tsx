import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { differentiators } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealItem } from "@/components/ui/reveal";
import { InfinityLoop, Layers, Rocket, Shield, Sparkles } from "@/components/ui/icons";

type Icon = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
const icons: Icon[] = [Sparkles, Layers, Rocket, Shield, InfinityLoop];

/**
 * Bento grid: one large brand card + four supporting cards.
 * Layout (lg): [ big 2x2 ][ a ][ b ]
 *              [ big 2x2 ][ c ][ d ]
 */
export function WhySection() {
  const [lead, ...rest] = differentiators;
  const LeadIcon = icons[0];

  return (
    <section id="about" aria-labelledby="why-title" className="section">
      <div className="container-x">
        <SectionHeading
          id="why-title"
          label="Why SSLC"
          title={
            <>
              Why companies choose <span className="text-brand">SSLC</span>
            </>
          }
          intro="SSLC Startup is a software product engineering team. We partner with founders and businesses to design, build and grow software that becomes a core part of how they operate."
        />

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:grid-rows-2">
          <RevealItem className="relative overflow-hidden rounded-3xl p-8 text-white shadow-[var(--shadow-float)] md:col-span-2 lg:row-span-2 lg:p-10">
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(135deg,#1f5bff_0%,#5b3dff_55%,#b23dff_100%)]" />
            <div aria-hidden className="absolute inset-0 grid-texture opacity-30 [--grid-line:rgb(255_255_255/0.12)]" />
            <Image
              src="/brand/sslc-mark.png"
              alt=""
              width={256}
              height={256}
              className="absolute -right-10 -bottom-10 size-64 rotate-12 opacity-30 lg:size-80"
            />
            <div className="relative flex h-full flex-col">
              <span className="grid size-12 place-items-center rounded-xl bg-white/15 backdrop-blur">
                <LeadIcon size={22} />
              </span>
              <h3 className="mt-8 text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] leading-tight font-semibold tracking-[-0.03em]">
                {lead.title}
              </h3>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/85">{lead.detail}</p>
              <p className="mt-auto pt-10 text-[15px] font-medium text-white/90">
                The right product for the right people — not just more features.
              </p>
            </div>
          </RevealItem>

          {rest.map((d, i) => {
            const Icon = icons[i + 1];
            return (
              <RevealItem
                key={d.title}
                delay={0.06 * (i + 1)}
                className="group flex flex-col rounded-3xl border border-line bg-surface p-7 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-[var(--shadow-float)]"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-surface-2 text-violet transition-colors duration-500 group-hover:bg-violet group-hover:text-white">
                  <Icon size={20} />
                </span>
                <h3 className="mt-6 text-[18px] font-semibold tracking-[-0.015em] text-fg">{d.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{d.detail}</p>
              </RevealItem>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
