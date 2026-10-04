import { company } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { Mail, Phone } from "@/components/ui/icons";
import { InquiryForm } from "./inquiry-form";

const nextSteps = [
  { title: "We review your brief", detail: "And think through the right technical approach." },
  { title: "A short discovery call", detail: "We dig into goals, users and constraints." },
  { title: "A clear proposal", detail: "Scope, approach, timeline and estimate — in writing." },
];

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section border-t border-line bg-bg-1">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal>
          <p className="eyebrow">
            <span className="slash" aria-hidden />
            <span className="text-subtle">10</span> Start a project
          </p>
          <h2 id="contact-title" className="mt-6 text-headline font-semibold text-sheen">
            Tell us what you&apos;re building.
          </h2>
          <p className="mt-6 max-w-md text-lede text-muted">
            Three quick questions. No lengthy forms, no obligation — just enough for a useful first conversation.
          </p>

          <ol className="mt-12 space-y-6">
            {nextSteps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-[11px] text-muted">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[15px] font-medium text-fg">{s.title}</p>
                  <p className="mt-0.5 text-sm text-muted">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-col gap-3 border-t border-line pt-8 text-[15px]">
            <p className="font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">Prefer to talk directly?</p>
            <a href={`mailto:${company.email}`} className="inline-flex items-center gap-3 text-fg transition-colors hover:text-accent">
              <Mail size={16} className="text-muted" /> {company.email}
            </a>
            <a href={company.phoneHref} className="inline-flex items-center gap-3 text-fg transition-colors hover:text-accent">
              <Phone size={16} className="text-muted" /> {company.phone}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <InquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
