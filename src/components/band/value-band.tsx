import { RevealItem } from "@/components/ui/reveal";

const values = [
  { big: "End-to-end", small: "Strategy, design, engineering, AI and cloud — one accountable team" },
  { big: "AI-native", small: "Agents and automation built into the product, not bolted on" },
  { big: "Built to scale", small: "Architecture that grows with your business, not against it" },
];

/** Black band under the hero (Squarespace's stats row) — positioning, not invented numbers. */
export function ValueBand() {
  return (
    <section aria-label="Why SSLC" className="force-dark bg-bg pt-6 pb-20 lg:pb-28">
      <div className="container-x">
        <p className="text-center text-[14px] text-muted">
          Built for startups, growing businesses and enterprise product teams.
        </p>
        <ul className="mt-12 grid gap-12 text-center sm:grid-cols-3 sm:gap-6">
          {values.map((v, i) => (
            <RevealItem key={v.big} delay={i * 0.08}>
                <p className="text-[clamp(2.2rem,1.4rem+2.6vw,3.6rem)] leading-none font-light tracking-[-0.04em] text-fg">
                  {v.big}
                </p>
                <p className="mx-auto mt-4 max-w-[17rem] text-[13.5px] leading-relaxed text-muted">{v.small}</p>
            </RevealItem>
          ))}
        </ul>
      </div>
    </section>
  );
}
