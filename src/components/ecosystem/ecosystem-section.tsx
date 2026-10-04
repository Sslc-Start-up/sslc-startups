import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const bars = [38, 52, 46, 64, 58, 72, 66, 84, 78, 92, 86, 96];

function Desktop() {
  return (
    <div className="force-dark overflow-hidden rounded-2xl border border-line-strong bg-[#0b0d11] shadow-[var(--shadow-float)]">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/12" />
        <span className="size-2.5 rounded-full bg-white/12" />
        <span className="size-2.5 rounded-full bg-white/12" />
        <span className="mx-auto rounded-md border border-line bg-white/[0.03] px-10 py-1 font-mono text-[10px] text-subtle sm:px-16">
          app.yourproduct.com
        </span>
      </div>
      <div className="grid grid-cols-[52px_1fr] sm:grid-cols-[150px_1fr]">
        <aside className="space-y-1.5 border-r border-line p-3">
          {["Overview", "Customers", "Orders", "Automations", "Settings"].map((x, i) => (
            <div
              key={x}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] ${i === 0 ? "bg-accent/15 text-fg" : "text-subtle"}`}
            >
              <span className={`size-2 shrink-0 rounded-sm ${i === 0 ? "bg-accent" : "bg-white/15"}`} />
              <span className="hidden sm:inline">{x}</span>
            </div>
          ))}
        </aside>
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              ["Active users", "▲"],
              ["Orders today", "▲"],
              ["Automations run", "●"],
            ].map(([k, s]) => (
              <div key={k} className="rounded-lg border border-line bg-white/[0.02] p-2.5 sm:p-3">
                <p className="truncate text-[9.5px] text-subtle sm:text-[10.5px]">{k}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="h-2.5 w-10 rounded-sm bg-white/15 sm:w-14" />
                  <span className="text-[9px] text-accent">{s}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-line bg-white/[0.02] p-3 sm:mt-4">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] text-muted">Weekly activity</span>
              <span className="font-mono text-[9.5px] text-subtle">live</span>
            </div>
            <div className="mt-3 flex h-24 items-end gap-1 sm:h-32 sm:gap-1.5">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-accent/40 to-violet/90"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="force-dark w-[170px] rounded-[30px] border border-line-strong bg-[#08090c] p-2 shadow-[var(--shadow-float)] sm:w-[200px]">
      <div className="rounded-[24px] bg-[#0e1116] px-3 pt-3 pb-4">
        <div className="mx-auto h-1 w-10 rounded-full bg-white/10" />
        <p className="mt-4 text-[13px] font-medium text-fg">Good morning</p>
        <p className="text-[10px] text-subtle">3 updates since yesterday</p>
        <div className="mt-3 space-y-2">
          {["Order shipped", "New message", "Invoice paid"].map((x, i) => (
            <div key={x} className="flex items-center gap-2 rounded-xl border border-line bg-white/[0.03] p-2">
              <span className={`size-6 shrink-0 rounded-lg ${i === 0 ? "bg-accent/40" : i === 1 ? "bg-cyan/25" : "bg-white/10"}`} />
              <div className="min-w-0">
                <p className="truncate text-[10.5px] text-fg/90">{x}</p>
                <span className="mt-1 block h-1.5 w-14 rounded-sm bg-white/10" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl bg-accent py-2 text-center text-[10.5px] font-medium text-white">Open dashboard</div>
      </div>
    </div>
  );
}

function ApiCard() {
  return (
    <div className="force-dark w-[250px] rounded-xl border border-line-strong bg-[#08090c]/95 p-4 font-mono text-[10.5px] leading-relaxed shadow-[var(--shadow-float)] backdrop-blur sm:w-[290px]">
      <p className="text-subtle">
        <span className="text-cyan">GET</span> /api/v1/orders?status=open
      </p>
      <p className="mt-2 text-subtle">
        <span className="rounded bg-[#1f6f4a]/40 px-1 text-[#6ee7a8]">200</span> · 38ms
      </p>
      <pre className="mt-2 whitespace-pre text-muted">
{`{
  "data": [{ "id": "ord_…",
    "status": "open",
    "channel": "mobile" }],
  "next": "cursor_…"
}`}
      </pre>
    </div>
  );
}

const points = [
  { title: "Web dashboard", detail: "For your team and power users." },
  { title: "Mobile app", detail: "For customers and teams on the move." },
  { title: "One API", detail: "Single source of truth behind every screen." },
];

export function EcosystemSection() {
  return (
    <section aria-labelledby="ecosystem-title" className="section overflow-hidden border-t border-line bg-bg-1">
      <div className="container-x">
        <SectionHeading
          id="ecosystem-title"
          index="07"
          label="Product ecosystem"
          align="center"
          title={
            <>
              One product. <span className="text-brand">Every experience.</span>
            </>
          }
          intro="Desktop, mobile and backend are designed and built together — so data, design and business logic stay consistent everywhere your customers meet your product."
        />

        <Reveal className="relative mx-auto mt-16 max-w-5xl lg:mt-24" aria-hidden>
          <div aria-hidden className="absolute inset-x-[10%] top-[10%] bottom-0 bg-[radial-gradient(closest-side,rgb(118_80_255/0.2),transparent)]" />
          <div className="relative md:pr-24 md:pl-10">
            <Desktop />
          </div>
          <div className="relative -mt-24 flex items-end justify-between gap-4 px-2 sm:-mt-28 md:absolute md:inset-x-0 md:-bottom-10 md:mt-0 md:px-0">
            <div className="hidden md:block">
              <ApiCard />
            </div>
            <div className="ml-auto">
              <PhoneMock />
            </div>
          </div>
          <div className="mt-6 md:hidden">
            <ApiCard />
          </div>
        </Reveal>

        <ul className="mx-auto mt-20 grid max-w-4xl gap-6 border-t border-line pt-10 sm:grid-cols-3 lg:mt-28">
          {points.map((p) => (
            <li key={p.title}>
              <h3 className="text-[16px] font-medium text-fg">{p.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{p.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
