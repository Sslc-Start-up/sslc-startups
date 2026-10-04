"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealItem } from "@/components/ui/reveal";

export function ProcessSection() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="process" aria-labelledby="process-title" className="section border-t border-line">
      <div className="container-x">
        <SectionHeading
          id="process-title"
          index="08"
          label="Process"
          title="From idea to production."
          intro="A clear, five-stage path with working software at every step — so you always know what's built, what's next and what it costs."
        />

        <ol ref={ref} className="relative mt-16 grid gap-4 lg:mt-24 lg:grid-cols-5 lg:gap-0">
          {/* progress rail — vertical on mobile, horizontal on desktop */}
          <span aria-hidden className="absolute top-0 bottom-0 left-[19px] w-px bg-line lg:top-[19px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full" />
          <m.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute top-0 bottom-0 left-[19px] w-px origin-top bg-gradient-to-b from-cyan to-accent lg:hidden"
          />
          <m.span
            aria-hidden
            style={{ scaleX: progress }}
            className="absolute top-[19px] left-0 hidden h-px w-full origin-left bg-gradient-to-r from-cyan to-accent lg:block"
          />

          {processSteps.map((s, i) => (
            <RevealItem key={s.n} delay={i * 0.07} className="relative pl-14 lg:pt-14 lg:pr-6 lg:pl-0">
              <span className="absolute top-0 left-0 grid size-10 place-items-center rounded-full border border-line-strong bg-bg font-mono text-[11px] text-fg">
                {s.n}
              </span>
              <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-fg uppercase lg:text-[20px] xl:text-[22px]">
                {s.title}
              </h3>
              <p className="mt-1 text-[15px] text-[#9d8cff]">{s.line}</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{s.detail}</p>
              <ul className="mt-5 space-y-1.5 pb-6 lg:pb-0">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2 font-mono text-[11.5px] text-subtle">
                    <span aria-hidden className="h-px w-3 bg-subtle/60" />
                    {d}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </ol>
      </div>
    </section>
  );
}
