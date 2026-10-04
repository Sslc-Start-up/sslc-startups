import { caseStudies, type CaseStudy } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
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
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="work-title"
            index="05"
            label="What we build"
            title={
              <>
                We build real systems. <br className="hidden md:block" />
                <span className="text-brand">Not just pretty interfaces.</span>
              </>
            }
            intro="Three of the systems we're built to deliver — each one engineered end to end, from data model to device."
          />
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
