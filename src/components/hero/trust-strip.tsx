const audiences = ["Startups", "Growing Businesses", "Enterprises", "Product Teams"];
const capabilities = [
  { label: "Web", id: "web" },
  { label: "Mobile", id: "mobile" },
  { label: "AI", id: "ai" },
  { label: "SaaS", id: "saas" },
  { label: "Cloud", id: "cloud" },
  { label: "Automation", id: "custom" },
];

export function TrustStrip() {
  return (
    <section aria-label="Who we build for" className="border-b border-line">
      <div className="container-x flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          <p className="font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">Built for</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {audiences.map((a) => (
              <li key={a} className="text-[15px] font-medium tracking-[-0.01em] text-fg/90">
                {a}
              </li>
            ))}
          </ul>
        </div>
        <ul aria-label="Capabilities" className="flex flex-wrap gap-2">
          {capabilities.map((c) => (
            <li key={c.id}>
              <a
                href={`#service-${c.id}`}
                className="pill transition-colors duration-300 hover:border-accent/50 hover:text-fg"
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
