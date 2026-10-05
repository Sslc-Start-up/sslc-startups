import { caseStudies, type CaseStudy } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { ArrowRight } from "@/components/ui/icons";
import { AgentBlueprintVisual, MobileBlueprintVisual, SaasBlueprintVisual } from "./visuals";

const visuals: Record<string, () => React.JSX.Element> = {
  "ai-support-agent": AgentBlueprintVisual,
  "multi-tenant-saas": SaasBlueprintVisual,
  "realtime-mobile": MobileBlueprintVisual,
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[10.5px] tracking-[0.2em] text-subtle uppercase">{label}</dt>
      <dd className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{children}</dd>
    </div>
  );
}

function SolutionCard({ study, index }: { study: CaseStudy; index: number }) {
  const Visual = visuals[study.id];
  return (
    <TiltCard className="panel h-full">
      <article className="flex h-full flex-col p-6 sm:p-7 [transform-style:preserve-3d]">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-subtle">0{index + 1}</span>
          <span className="pill h-7 text-[12px] text-muted">Solution blueprint</span>
        </div>

        <div className="mt-6">{Visual ? <Visual /> : null}</div>

        <h3 className="mt-6 text-title font-semibold text-fg">{study.name}</h3>
        <p className="mt-1.5 text-[15px] text-fg/75">{study.summary}</p>

        <dl className="mt-6 grid gap-4">
          <Field label="Problem">{study.problem}</Field>
          <Field label="How we build it">{study.solution}</Field>
          <Field label="Outcome">{study.impact}</Field>
        </dl>

        <ul aria-label="Technology" className="mt-auto flex flex-wrap gap-1.5 pt-7">
          {study.technology.map((t) => (
            <li key={t} className="rounded-md border border-line bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-muted">
              {t}
            </li>
          ))}
        </ul>
      </article>
    </TiltCard>
  );
}

export function WorkSection() {
  return (
    <section id="work" aria-labelledby="work-title" className="section overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
        <div className="aurora [animation-duration:32s]" />
      </div>
      <div className="container-x relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface-2/60 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.2em] text-fg/80 uppercase">
              <span className="size-2 rounded-full bg-violet" /> Featured work
            </p>
            <h2 id="work-title" className="mt-5 text-[clamp(2rem,1.3rem+2.2vw,3rem)] leading-[1.08] font-bold tracking-[-0.03em] text-fg">
              Real systems. Real <span className="text-brand">impact.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-[16px] text-muted">
              From startups to growing businesses — solution blueprints for the systems we design and engineer end to end.
            </p>
          </Reveal>
          <Reveal>
            <InquiryLink variant="secondary" size="md">
              Discuss your project <ArrowRight size={15} />
            </InquiryLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {caseStudies.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08} className="h-full">
              <SolutionCard study={s} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
