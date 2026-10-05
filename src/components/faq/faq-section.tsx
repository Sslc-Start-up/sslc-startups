import { faqs } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";

/** Boxed accordion on <details>: keyboard-accessible, works without JS. */
export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-bg py-20 lg:py-28">
      <div className="container-x max-w-4xl">
        <Reveal>
          <h2 id="faq-title" className="font-display text-[clamp(1.9rem,1.3rem+1.8vw,2.9rem)] font-medium tracking-[-0.02em] text-fg">
            Common Questions
          </h2>
        </Reveal>
        <div className="mt-10 border border-line">
          {faqs.map((f, i) => (
            <details key={f.q} className={`group bg-surface ${i > 0 ? "border-t border-line" : ""}`}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-[16px] font-semibold text-fg sm:px-6 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="relative grid size-9 shrink-0 place-items-center border border-line-strong">
                  <span className="absolute h-px w-3.5 bg-fg" />
                  <span className="absolute h-3.5 w-px bg-fg transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                </span>
              </summary>
              <p className="max-w-3xl px-5 pb-6 text-[15.5px] leading-relaxed text-muted sm:px-6">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
