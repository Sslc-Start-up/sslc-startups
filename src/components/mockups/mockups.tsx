/**
 * Product "screens" rendered in CSS — the site's imagery. They are always
 * dark (force-dark) like real app screenshots, in both themes.
 * Replace with real product screenshots (next/image) when available.
 */
import { cn } from "@/lib/utils";

type MockProps = { className?: string };

function Chrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
      <span className="size-2 rounded-full bg-[#ff5f57]/80" />
      <span className="size-2 rounded-full bg-[#febc2e]/80" />
      <span className="size-2 rounded-full bg-[#28c840]/80" />
      <span className="mx-auto rounded bg-white/[0.05] px-6 py-0.5 font-mono text-[9px] text-subtle sm:px-12">{url}</span>
    </div>
  );
}

/** SaaS / analytics dashboard in a browser window. */
export function DashboardMock({ className }: MockProps) {
  const bars = [34, 52, 44, 63, 58, 72, 66, 84, 78, 91, 86, 96];
  return (
    <div className={cn("force-dark overflow-hidden rounded-xl border border-line-strong bg-[#0c0c10] shadow-2xl", className)} aria-hidden>
      <Chrome url="app.yourproduct.com" />
      <div className="grid grid-cols-[44px_1fr] sm:grid-cols-[130px_1fr]">
        <aside className="space-y-1.5 border-r border-line p-2.5">
          {["Overview", "Customers", "Orders", "Automations", "Billing"].map((x, i) => (
            <div key={x} className={cn("flex items-center gap-2 rounded px-2 py-1.5 text-[10px]", i === 0 ? "bg-white/[0.08] text-fg" : "text-subtle")}>
              <span className={cn("size-1.5 shrink-0 rounded-sm", i === 0 ? "bg-cyan" : "bg-white/20")} />
              <span className="hidden sm:inline">{x}</span>
            </div>
          ))}
        </aside>
        <div className="p-3 sm:p-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              ["Active users", "12.4k"],
              ["Revenue", "$84k"],
              ["Automations", "3,209"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-line bg-white/[0.02] p-2">
                <p className="truncate text-[8.5px] text-subtle">{k}</p>
                <p className="mt-1 text-[13px] font-medium text-fg">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-2.5 rounded-lg border border-line bg-white/[0.02] p-2.5">
            <p className="text-[9px] text-muted">Weekly activity</p>
            <div className="mt-2 flex h-20 items-end gap-1 sm:h-28">
              {bars.map((h, i) => (
                <span key={i} className="flex-1 rounded-t-[2px] bg-gradient-to-t from-accent/40 to-violet/90" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile app screen in a phone frame. */
export function PhoneMock({ className }: MockProps) {
  return (
    <div className={cn("force-dark rounded-[28px] border border-line-strong bg-[#060608] p-1.5 shadow-2xl", className)} aria-hidden>
      <div className="rounded-[23px] bg-[#0f0f14] px-3 pt-3 pb-4">
        <div className="mx-auto h-1 w-9 rounded-full bg-white/15" />
        <p className="mt-4 text-[12px] font-medium text-fg">Good morning, Asha</p>
        <p className="text-[9px] text-subtle">3 updates since yesterday</p>
        <div className="mt-3 rounded-xl bg-gradient-to-br from-accent to-violet p-3">
          <p className="text-[9px] text-white/80">This week</p>
          <p className="text-[18px] font-semibold text-white">₹2.4L</p>
          <div className="mt-1.5 h-1 rounded-full bg-white/25">
            <div className="h-full w-2/3 rounded-full bg-white" />
          </div>
        </div>
        {["Order #2041 shipped", "New message", "Invoice paid"].map((x, i) => (
          <div key={x} className="mt-2 flex items-center gap-2 rounded-xl bg-white/[0.04] p-2">
            <span className={cn("size-5 shrink-0 rounded-lg", i === 0 ? "bg-cyan/40" : i === 1 ? "bg-violet/50" : "bg-magenta/40")} />
            <span className="truncate text-[9.5px] text-fg/90">{x}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** AI assistant chat. */
export function ChatMock({ className }: MockProps) {
  return (
    <div className={cn("force-dark overflow-hidden rounded-xl border border-line-strong bg-[#0c0c10] shadow-2xl", className)} aria-hidden>
      <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
        <span className="grid size-5 place-items-center rounded-md bg-gradient-to-br from-cyan to-violet text-[9px] font-bold text-white">AI</span>
        <span className="text-[10.5px] font-medium text-fg">Support agent</span>
        <span className="ml-auto flex items-center gap-1 text-[9px] text-mint">
          <span className="size-1.5 rounded-full bg-mint" /> online
        </span>
      </div>
      <div className="space-y-2 p-3">
        <p className="ml-auto w-fit max-w-[80%] rounded-xl rounded-br-sm bg-white/[0.08] px-2.5 py-1.5 text-[10px] text-fg">
          Where is my order #2041?
        </p>
        <p className="w-fit max-w-[85%] rounded-xl rounded-bl-sm bg-accent/25 px-2.5 py-1.5 text-[10px] text-fg">
          It shipped this morning and arrives Thursday. Want tracking updates on WhatsApp?
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {["Order lookup ✓", "Policy check ✓", "Logged ✓"].map((t) => (
            <span key={t} className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[8.5px] text-subtle">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Sales pipeline board (CRM / ERP). */
export function PipelineMock({ className }: MockProps) {
  const cols = [
    { t: "Lead", n: ["Acme Ltd", "Nova Retail"] },
    { t: "Proposal", n: ["Orbit Foods", "Kite Labs"] },
    { t: "Won", n: ["Zenith Co"] },
  ];
  return (
    <div className={cn("force-dark overflow-hidden rounded-xl border border-line-strong bg-[#0c0c10] shadow-2xl", className)} aria-hidden>
      <Chrome url="crm.yourcompany.com" />
      <div className="grid grid-cols-3 gap-2 p-3">
        {cols.map((c, ci) => (
          <div key={c.t} className="rounded-lg bg-white/[0.03] p-2">
            <p className="text-[9px] font-medium text-muted">{c.t}</p>
            {c.n.map((n) => (
              <div key={n} className="mt-1.5 rounded-md border border-line bg-[#14141a] p-1.5">
                <p className="truncate text-[9.5px] text-fg">{n}</p>
                <span className={cn("mt-1 block h-1 rounded-full", ci === 2 ? "w-full bg-mint/70" : ci === 1 ? "w-2/3 bg-violet/70" : "w-1/3 bg-cyan/70")} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Terminal / deploy pipeline (backend & cloud). */
export function TerminalMock({ className }: MockProps) {
  const lines = [
    ["$", "git push origin main", "text-fg"],
    ["✓", "tests passed (412)", "text-mint"],
    ["✓", "docker image built", "text-mint"],
    ["✓", "deployed to production", "text-mint"],
    ["→", "GET /api/v1/orders  200  38ms", "text-cyan"],
  ];
  return (
    <div className={cn("force-dark overflow-hidden rounded-xl border border-line-strong bg-[#08080b] shadow-2xl", className)} aria-hidden>
      <Chrome url="ci · production" />
      <div className="space-y-1.5 p-3.5 font-mono text-[10px]">
        {lines.map(([p, t, c]) => (
          <p key={t} className="flex gap-2">
            <span className={c}>{p}</span>
            <span className="text-muted">{t}</span>
          </p>
        ))}
        <p className="caret text-subtle" />
      </div>
    </div>
  );
}

/** Customer portal / web app. */
export function PortalMock({ className }: MockProps) {
  return (
    <div className={cn("force-dark overflow-hidden rounded-xl border border-line-strong bg-[#0c0c10] shadow-2xl", className)} aria-hidden>
      <Chrome url="portal.yourcompany.com" />
      <div className="p-3.5">
        <p className="text-[13px] font-medium text-fg">Welcome back</p>
        <p className="text-[9px] text-subtle">2 requests need your approval</p>
        <div className="mt-3 space-y-1.5">
          {[
            ["Service request #318", "Approved", "text-mint"],
            ["Quote #1042", "Awaiting", "text-[#febc2e]"],
            ["Invoice #887", "Paid", "text-mint"],
          ].map(([a, b, c]) => (
            <div key={a} className="flex items-center justify-between rounded-lg border border-line bg-white/[0.02] px-2.5 py-2">
              <span className="text-[10px] text-fg/90">{a}</span>
              <span className={cn("text-[9px]", c)}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
