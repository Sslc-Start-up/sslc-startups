import Image from "next/image";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRight } from "@/components/ui/icons";

const messy = [
  { label: "Spreadsheets", x: "6%", y: "10%", r: -6 },
  { label: "Email threads", x: "48%", y: "4%", r: 4 },
  { label: "Legacy system", x: "18%", y: "38%", r: 3 },
  { label: "Manual reports", x: "56%", y: "34%", r: -5 },
  { label: "Chat groups", x: "4%", y: "68%", r: 5 },
  { label: "Disconnected CRM", x: "40%", y: "70%", r: -3 },
];

const clean = ["Customer Portal", "Operations", "CRM", "Billing", "Automation", "Analytics"];

const pains = [
  { title: "Disconnected tools", detail: "Data lives in five places and none of them agree." },
  { title: "Manual processes", detail: "Hours lost to copy-paste, follow-ups and re-typing." },
  { title: "Outdated systems", detail: "Software your team works around instead of with." },
  { title: "Products that can't scale", detail: "Every new customer makes the system slower." },
];

export function ProblemSection() {
  return (
    <section aria-labelledby="problem-title" className="section">
      <div className="container-x">
        <SectionHeading
          id="problem-title"
          index="01"
          label="The real problem"
          title={
            <>
              Your business doesn&apos;t need more software.{" "}
              <span className="text-muted [-webkit-text-fill-color:currentColor]">It needs the right software.</span>
            </>
          }
          intro="Most companies don't have a technology shortage. They have disconnected tools, manual workarounds and systems that were never designed to grow. SSLC turns that into one reliable, connected platform — shaped around how your business actually runs."
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pains.map((p, i) => (
            <RevealItem key={p.title} delay={i * 0.06} className="h-full bg-bg-1 p-6 lg:p-7">
                <p className="font-mono text-xs text-subtle">0{i + 1}</p>
                <h3 className="mt-6 text-[17px] font-medium tracking-[-0.01em] text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.detail}</p>
            </RevealItem>
          ))}
        </ul>

        {/* Before → SSLC → After */}
        <Reveal className="mt-6">
          <div className="panel grid overflow-hidden lg:grid-cols-[1fr_auto_1fr]">
            {/* Before */}
            <div className="relative p-6 sm:p-8">
              <p className="font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">Today</p>
              <div className="relative mt-6 h-[230px]" aria-hidden>
                <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M20 22 L58 16 M30 48 L64 46 M14 78 L50 80 M30 50 L20 74 M62 20 L66 44" stroke="var(--color-line-strong)" strokeDasharray="1.5 3" fill="none" vectorEffect="non-scaling-stroke" />
                </svg>
                {messy.map((m) => (
                  <span
                    key={m.label}
                    className="pill absolute border-dashed text-muted"
                    style={{ left: m.x, top: m.y, transform: `rotate(${m.r}deg)` }}
                  >
                    <span className="size-1.5 rounded-full bg-[#f2a23a]/80" />
                    {m.label}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">Scattered data, manual hand-offs, no single source of truth.</p>
            </div>

            {/* SSLC */}
            <div className="relative flex items-center justify-center border-y border-line px-8 py-8 lg:border-x lg:border-y-0 lg:py-0">
              <div className="flex items-center gap-4 lg:flex-col">
                <ArrowRight size={18} className="text-subtle lg:rotate-0" />
                <div className="grid size-20 place-items-center rounded-2xl border border-accent/40 bg-[radial-gradient(circle_at_50%_30%,#1d1642,#0a0c10)] shadow-[var(--shadow-accent)]">
                  <Image src="/brand/sslc-mark.png" alt="" width={44} height={44} />
                </div>
                <ArrowRight size={18} className="text-accent" />
              </div>
            </div>

            {/* After */}
            <div className="relative p-6 sm:p-8">
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">With SSLC</p>
              <div className="relative mt-6 flex min-h-[230px] items-center" aria-hidden>
                <div className="relative grid w-full grid-cols-3 items-stretch gap-x-3 gap-y-16">
                  <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-gradient-to-r from-cyan/10 via-violet/70 to-magenta/10">
                    <span className="packet-x" />
                  </div>
                  {clean.map((c, i) => (
                    <div
                      key={c}
                      className="relative flex min-h-12 items-center justify-center rounded-xl border border-line-strong bg-surface-2 px-2 py-2.5 text-center text-[12.5px] leading-tight text-fg/90"
                    >
                      <span className={`absolute left-1/2 h-8 w-px -translate-x-1/2 bg-accent/40 ${i < 3 ? "top-full" : "bottom-full"}`} />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm text-muted">One connected system. Every team works from the same data.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
