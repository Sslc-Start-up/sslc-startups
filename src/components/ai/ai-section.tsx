import { aiUseCases } from "@/content/site";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { ArrowRight } from "@/components/ui/icons";
import { ChatMock, PipelineMock } from "@/components/mockups/mockups";

/** Dark AI section that fades from black (Squarespace's "Getting started… with AI"). */
export function AiSection() {
  return (
    <section id="solutions" aria-labelledby="ai-title" className="force-dark relative overflow-hidden bg-bg py-24 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(118_80_255/0.28),transparent_70%)]" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span aria-hidden className="mx-auto block size-2.5 rounded-full bg-gradient-to-r from-cyan to-magenta shadow-[0_0_20px_4px_rgb(138_61_255/0.5)]" />
          <h2 id="ai-title" className="mt-7 text-headline font-medium text-fg">
            Software that can think, decide &amp; act
          </h2>
          <p className="mt-5 text-lede text-muted">
            AI agents that work inside your real systems — reading your data, following your rules and asking a human
            when the stakes are high.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          <Reveal className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="grid min-h-[230px] place-items-center bg-gradient-to-br from-[#14203f] to-[#251552] p-8">
              <ChatMock className="w-full max-w-[320px]" />
            </div>
            <div className="p-7 text-center">
              <p className="font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">AI agents</p>
              <p className="mt-2 text-[15px] text-muted">Support and sales agents grounded in your docs, orders and CRM.</p>
              <InquiryLink
                type="AI Product"
                unstyled
                className="mt-4 inline-flex items-center gap-2 text-[15px] font-medium text-fg transition-[gap] hover:gap-3"
              >
                Build with AI <ArrowRight size={15} />
              </InquiryLink>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="grid min-h-[230px] place-items-center bg-gradient-to-br from-[#102a33] to-[#1b1d4f] p-8">
              <PipelineMock className="w-full max-w-[340px]" />
            </div>
            <div className="p-7 text-center">
              <p className="font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">AI automation</p>
              <p className="mt-2 text-[15px] text-muted">Workflows that read documents, route tasks and keep systems in sync.</p>
              <InquiryLink
                type="Automation"
                unstyled
                className="mt-4 inline-flex items-center gap-2 text-[15px] font-medium text-fg transition-[gap] hover:gap-3"
              >
                Automate a workflow <ArrowRight size={15} />
              </InquiryLink>
            </div>
          </Reveal>
        </div>

        <ul className="mx-auto mt-16 grid max-w-5xl gap-x-10 gap-y-8 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {aiUseCases.map((u, i) => (
            <RevealItem key={u.title} delay={(i % 3) * 0.05}>
              <h3 className="text-[16px] font-medium text-fg">{u.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{u.detail}</p>
            </RevealItem>
          ))}
        </ul>
      </div>
    </section>
  );
}
