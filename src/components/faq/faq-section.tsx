import { faqs } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";

/** Accordion built on <details>: keyboard-accessible, works without JS. */
export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-bg">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <Reveal>
          <h2 id="faq-title" className="text-headline font-medium text-fg">
            Questions,
            <br />
            answered
          </h2>
          <p className="mt-5 max-w-sm text-lede text-muted">How we work, how projects start and what happens after launch.</p>
        </Reveal>
        <div className="border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[clamp(1.1rem,0.95rem+0.6vw,1.45rem)] font-normal tracking-[-0.015em] text-fg [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="relative size-4 shrink-0">
                  <span className="absolute top-1/2 left-0 h-px w-4 bg-fg" />
                  <span className="absolute top-0 left-1/2 h-4 w-px bg-fg transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 text-[15.5px] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
