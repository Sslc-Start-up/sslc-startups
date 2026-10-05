import { company } from "@/content/site";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { ArrowUpRight } from "@/components/ui/icons";

const points = [
  "Clear outcomes and a roadmap agreed before code — so scope, budget and priorities stay in control.",
  "Strategy, design, engineering and AI working as one team, from first sketch to production.",
  "Clean, well-structured code and solid architecture that keep technical debt from piling up.",
];

const quality = [
  { title: "Clear scope from day one", detail: "We define what to build, how it should work and what success looks like — preventing scope creep and rework." },
  { title: "Interfaces people use", detail: "Flows and screens designed around real users, so products are intuitive, efficient and actually adopted." },
  { title: "Built to perform", detail: "Thoughtful architecture, clean code and automated tests keep the system fast and reliable as it grows." },
  { title: "Keeps improving", detail: "After launch we monitor, refine features and evolve the system based on real usage and business needs." },
];

/** Wireframe cube for the statement card. */
function Cube() {
  return (
    <svg aria-hidden viewBox="0 0 320 320" className="size-full" fill="none" strokeWidth="1.2">
      <g stroke="rgb(255 255 255 / 0.28)">
        <path d="M160 20 290 95v150L160 320 30 245V95z" />
        <path d="M30 95l130 75 130-75M160 170v150" />
      </g>
      <g stroke="url(#cube-grad)" strokeWidth="1.6" className="origin-center animate-[float-y_6s_ease-in-out_infinite] [transform-box:fill-box]">
        <path d="M160 120 215 152v64l-55 32-55-32v-64z" />
        <path d="M105 152l55 32 55-32M160 184v64" />
      </g>
      <defs>
        <linearGradient id="cube-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#19c4ff" />
          <stop offset="1" stopColor="#c04dff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Different() {
  return (
    <>
      <section aria-labelledby="diff-title" className="border-t border-line bg-bg-1 py-20 lg:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 id="diff-title" className="font-display text-[clamp(1.8rem,1.2rem+1.8vw,2.8rem)] font-medium tracking-[-0.02em] text-fg">
              What Makes SSLC Different
            </h2>
            <p className="mt-4 text-[16px] text-muted">Great software comes down to a few things done right from the start.</p>
          </Reveal>
          <ul className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {points.map((p, i) => (
              <RevealItem key={p} delay={i * 0.06} className="flex gap-3 text-[15.5px] leading-relaxed text-fg/85">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-fg" />
                {p}
              </RevealItem>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Our approach" className="bg-bg py-16 lg:py-20">
        <div className="container-x">
          <Reveal className="force-dark relative grid overflow-hidden bg-black p-8 sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:p-14">
            <div aria-hidden className="absolute inset-0 grid-texture opacity-30" />
            <div className="relative">
              <span aria-hidden className="font-display text-[42px] leading-none text-violet">&ldquo;</span>
              <p className="mt-2 font-display text-[clamp(1.4rem,1rem+1.4vw,2.1rem)] leading-[1.3] font-medium text-white">
                We don&apos;t just build websites. We engineer products — with the architecture, reliability and
                team you need long after launch. <span className="text-brand">— {company.name}</span>
              </p>
              <InquiryLink variant="secondary" size="md" className="mt-8 border-white/50 text-white hover:border-white">
                Book a Strategy Session <ArrowUpRight size={15} />
              </InquiryLink>
            </div>
            <div className="relative mx-auto mt-10 w-56 lg:mt-0 lg:w-72">
              <Cube />
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="quality-title" className="bg-bg py-20 lg:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 id="quality-title" className="font-display text-[clamp(1.8rem,1.2rem+1.8vw,2.8rem)] leading-[1.2] font-medium tracking-[-0.02em] text-fg">
              What High-Performing Software Looks Like
            </h2>
            <p className="mt-4 text-[16px] text-muted">
              Strong software is stable, scalable and aligned with real business needs. We build systems that support
              growth, reduce friction and hold up under pressure.
            </p>
          </Reveal>
          <ul className="mt-12 grid border border-line sm:grid-cols-2 lg:grid-cols-4">
            {quality.map((q, i) => (
              <RevealItem
                key={q.title}
                delay={i * 0.05}
                className={`relative bg-surface-2/60 p-7 ${i > 0 ? "border-t border-line sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan to-violet" />
                <h3 className="font-display text-[17px] font-medium text-fg">{q.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{q.detail}</p>
              </RevealItem>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
