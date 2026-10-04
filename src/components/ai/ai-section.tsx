import { aiUseCases } from "@/content/site";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { CtaArrow } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";

const tools = ["CRM", "Knowledge base", "Database", "Email & chat"];

function AgentDiagram() {
  return (
    <figure
      className="panel glow-border relative overflow-hidden p-5 sm:p-7" data-active="true"
      aria-label="AI agent architecture: a trigger reaches the agent, which plans, uses your tools, passes guardrails and human approval, then acts and logs the result."
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgb(118_80_255/0.14),transparent)]" />
      <div aria-hidden className="relative">
        {/* Trigger */}
        <div className="flex flex-wrap justify-center gap-2">
          {["Message", "Event", "Schedule"].map((t) => (
            <span key={t} className="pill font-mono text-[11px]">
              {t}
            </span>
          ))}
        </div>
        <Connector />

        {/* Agent */}
        <div className="mx-auto max-w-sm rounded-2xl border border-accent/40 bg-[linear-gradient(180deg,#1a1438,#0b0e15)] p-5 text-center shadow-[var(--shadow-accent)]">
          <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">AI agent</p>
          <p className="mt-2 text-[15px] font-medium text-fg">Understand → Plan → Decide</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {tools.map((t) => (
              <span key={t} className="rounded-md border border-line bg-white/[0.03] px-2 py-1.5 text-[11px] text-muted">
                {t}
              </span>
            ))}
          </div>
        </div>
        <Connector />

        {/* Guardrails */}
        <div className="mx-auto grid max-w-sm grid-cols-2 gap-2">
          <div className="rounded-xl border border-line-strong bg-surface-2 p-3 text-center">
            <p className="font-mono text-[10px] tracking-[0.16em] text-subtle uppercase">Guardrails</p>
            <p className="mt-1 text-[12.5px] text-fg/90">Rules & permissions</p>
          </div>
          <div className="rounded-xl border border-cyan/30 bg-surface-2 p-3 text-center">
            <p className="font-mono text-[10px] tracking-[0.16em] text-cyan uppercase">Human review</p>
            <p className="mt-1 text-[12.5px] text-fg/90">When it matters</p>
          </div>
        </div>
        <Connector />

        {/* Action */}
        <div className="mx-auto flex max-w-sm items-center justify-between rounded-xl border border-line-strong bg-bg/70 px-4 py-3">
          <span className="text-[13.5px] font-medium text-fg">Action taken</span>
          <span className="font-mono text-[10.5px] text-subtle">logged · auditable</span>
        </div>
      </div>
    </figure>
  );
}

function Connector() {
  return (
    <div className="relative mx-auto h-9 w-px bg-gradient-to-b from-accent/60 to-accent/20">
      <span className="packet-y [animation-duration:1.8s]" />
    </div>
  );
}

export function AiSection() {
  return (
    <section id="solutions" aria-labelledby="ai-title" className="section overflow-hidden border-t border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-texture fade-mask-radial opacity-50" />
      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <Reveal>
            <p className="eyebrow">
              <span className="slash" aria-hidden />
              <span className="text-subtle">06</span> AI solutions
            </p>
            <h2 id="ai-title" className="mt-6 text-headline font-semibold text-sheen">
              What if your software could think, decide &amp; act?
            </h2>
            <p className="mt-6 max-w-xl text-lede text-muted">
              We build AI agents that work inside your real systems — reading your data, following your rules and asking a
              human when the stakes are high. Practical automation with measurable outcomes, not science fiction.
            </p>
            <div className="mt-9">
              <InquiryLink type="AI Product" variant="primary" size="lg">
                Build With AI
                <CtaArrow>
                  <ArrowRight size={16} />
                </CtaArrow>
              </InquiryLink>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <AgentDiagram />
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {aiUseCases.map((u, i) => (
            <RevealItem key={u.title} delay={(i % 3) * 0.06} className="group bg-bg p-6 transition-colors duration-500 hover:bg-surface lg:p-8">
              <p className="font-mono text-[11px] text-subtle transition-colors group-hover:text-accent">
                AI / {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 text-[17px] font-medium tracking-[-0.01em] text-fg">{u.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{u.detail}</p>
            </RevealItem>
          ))}
        </ul>
      </div>
    </section>
  );
}
