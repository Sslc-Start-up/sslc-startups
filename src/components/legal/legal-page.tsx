import type { ReactNode } from "react";
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/footer/site-footer";

type LegalPageProps = {
  title: string;
  intro: ReactNode;
  effective: string;
  toc: readonly (readonly [id: string, label: string])[];
  children: ReactNode;
};

/** Shared layout for Privacy / Refund / Cookie policy pages. */
export function LegalPage({ title, intro, effective, toc, children }: LegalPageProps) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-bg pt-16 lg:pt-[76px]">
        <div className="force-dark bg-black">
          <div className="container-x py-16 lg:py-20">
            <p className="font-mono text-[11.5px] tracking-[0.22em] text-white/55 uppercase">Legal</p>
            <h1 className="mt-4 font-display text-[clamp(2rem,1.2rem+2.4vw,3.2rem)] font-medium tracking-[-0.02em] text-white">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] text-white/70">{intro}</p>
            <p className="mt-6 text-[14px] text-white/55">Effective date: {effective}</p>
          </div>
        </div>

        <div className="container-x grid gap-12 py-14 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 lg:py-20">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">On this page</p>
            <ol className="mt-4 space-y-2 text-[14px]">
              {toc.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-muted transition-colors hover:text-fg">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <article className="max-w-3xl space-y-10">{children}</article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-line pt-10">
      <h2 id={`${id}-title`} className="font-display text-[clamp(1.2rem,1rem+0.6vw,1.5rem)] font-medium text-fg">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-muted [&_a]:text-fg [&_a]:underline [&_a]:underline-offset-4 [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-fg [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
