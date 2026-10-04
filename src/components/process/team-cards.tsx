import { processSteps, techGroups } from "@/content/site";
import { Reveal, RevealItem } from "@/components/ui/reveal";

const cardBg = [
  "from-[#10233f] to-[#0a1222]",
  "from-[#1c1846] to-[#0d0b22]",
  "from-[#2a1450] to-[#120a24]",
  "from-[#3a1252] to-[#170a22]",
  "from-[#0f2a3a] to-[#08141c]",
];

/** "Everything you need on one platform" — here: one team, idea to scale. */
export function TeamCards() {
  return (
    <section id="process" aria-labelledby="process-title" className="section bg-bg pt-0">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <h2 id="process-title" className="text-[clamp(2.1rem,1.3rem+2.6vw,3.6rem)] leading-[1.03] font-medium tracking-[-0.035em] text-fg">
            Everything you need, from idea to scale
          </h2>
          <p className="max-w-lg text-lede text-muted lg:justify-self-end">
            A clear five-stage path with working software at every step — so you always know what&apos;s built,
            what&apos;s next and what it costs.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((s, i) => (
            <RevealItem
              key={s.n}
              delay={i * 0.06}
              className={`force-dark group relative flex min-h-[300px] flex-col overflow-hidden rounded-2xl bg-gradient-to-b ${cardBg[i]} p-6`}
            >
              <div aria-hidden className="absolute inset-0 dot-texture opacity-40 transition-opacity duration-500 group-hover:opacity-70" />
              <span className="relative font-mono text-[11px] tracking-[0.2em] text-white/60 uppercase">Step {s.n}</span>
              <span aria-hidden className="relative mt-auto text-[88px] leading-none font-light tracking-[-0.06em] text-white/[0.09] transition-transform duration-700 group-hover:-translate-y-2">
                {s.n}
              </span>
              <div className="relative mt-4">
                <h3 className="text-[19px] font-medium text-white">{s.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/70">{s.detail}</p>
              </div>
            </RevealItem>
          ))}
        </ol>

        <div id="technology" className="mt-16 scroll-mt-28 border-t border-line pt-10">
          <p className="text-center font-mono text-[11px] tracking-[0.22em] text-subtle uppercase">The stack we build with</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {techGroups.flatMap((g) => g.items).map((t) => (
              <li key={t} className="text-[15px] text-fg/70">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
