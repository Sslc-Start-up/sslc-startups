/**
 * Illustrative product visualisations rendered in CSS — no stock imagery.
 * Layers use translateZ so they float when the parent TiltCard tilts.
 */

const float = "[transform:translateZ(40px)]";

export function AgentBlueprintVisual() {
  const steps = ["Ticket received", "Intent: refund status", "Order lookup", "Policy check", "Reply drafted"];
  return (
    <div className="force-dark relative h-56 [transform-style:preserve-3d]" aria-hidden>
      <div className="absolute inset-x-0 top-0 rounded-xl border border-line-strong bg-[#0b0a16]/90 p-4">
        <ul className="space-y-2">
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={s} className="flex items-center gap-3">
                <span
                  className={`grid size-5 place-items-center rounded-md border font-mono text-[9px] ${
                    last ? "border-violet/70 bg-violet/25 text-fg" : "border-line-strong text-subtle"
                  }`}
                >
                  {i + 1}
                </span>
                <span className={`text-[12px] ${last ? "text-fg" : "text-muted"}`}>{s}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`absolute right-3 bottom-1 rounded-lg border border-cyan/40 bg-[#0b0a16] px-3 py-2 shadow-[0_10px_30px_-8px_rgb(25_196_255/0.5)] ${float}`}>
        <p className="font-mono text-[9px] tracking-[0.14em] text-cyan uppercase">Human review</p>
        <p className="mt-0.5 text-[11.5px] text-fg">Approve reply →</p>
      </div>
    </div>
  );
}

export function SaasBlueprintVisual() {
  const tenants = ["acme", "northwind", "globex"];
  return (
    <div className="force-dark relative h-56 [transform-style:preserve-3d]" aria-hidden>
      <div className="absolute inset-x-0 top-0 rounded-xl border border-line-strong bg-[#0b0a16]/90 p-4">
        <div className="grid grid-cols-3 gap-2">
          {tenants.map((t) => (
            <div key={t} className="rounded-lg border border-line bg-white/[0.02] p-2.5">
              <p className="font-mono text-[9px] text-subtle">tenant</p>
              <p className="mt-0.5 truncate text-[11px] text-fg">{t}</p>
              <div className="mt-2 flex h-10 items-end gap-0.5">
                {[40, 70, 55, 90, 65].map((h, i) => (
                  <span key={i} className="flex-1 rounded-[2px] bg-gradient-to-t from-accent/40 to-violet/80" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`absolute bottom-1 left-3 flex gap-2 ${float}`}>
        {["auth · roles", "billing", "audit log"].map((x) => (
          <span key={x} className="rounded-md border border-violet/40 bg-[#0b0a16] px-2.5 py-1.5 font-mono text-[10px] text-fg/90 shadow-[0_10px_30px_-8px_rgb(138_61_255/0.5)]">
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

export function MobileBlueprintVisual() {
  return (
    <div className="force-dark relative h-56 [transform-style:preserve-3d]" aria-hidden>
      <div className="absolute top-0 left-0 w-[62%] rounded-xl border border-line-strong bg-[#0b0a16]/90 p-3">
        <p className="text-[10px] text-subtle">Live dashboard</p>
        <div className="mt-2 flex h-24 items-end gap-1">
          {[30, 50, 42, 66, 58, 80, 72, 92].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-[2px] bg-gradient-to-t from-violet/30 to-magenta/80" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className={`absolute top-2 right-2 w-[120px] rounded-[22px] border border-line-strong bg-[#08070e] p-1.5 shadow-[0_20px_40px_-12px_rgb(224_59_255/0.45)] ${float}`}>
        <div className="rounded-[17px] bg-[#0f0e1a] p-2.5">
          <div className="mx-auto h-1 w-8 rounded-full bg-white/10" />
          <p className="mt-2.5 text-[10.5px] font-medium text-fg">Synced</p>
          <p className="text-[9px] text-subtle">just now · offline-ready</p>
          {["Order #2041", "New message", "Invoice paid"].map((x, i) => (
            <div key={x} className="mt-1.5 flex items-center gap-1.5 rounded-lg border border-line bg-white/[0.03] p-1.5">
              <span className={`size-4 rounded-md ${i === 0 ? "bg-accent/50" : i === 1 ? "bg-violet/50" : "bg-magenta/40"}`} />
              <span className="truncate text-[9px] text-fg/90">{x}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
