"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { budgets, company, projectTypes, timelines, type ProjectType } from "@/content/site";
import { inquiryMailto, submitProjectInquiry, type ProjectInquiry } from "@/lib/inquiry";
import { PREFILL_EVENT, type PrefillDetail } from "@/lib/prefill";
import { cn } from "@/lib/utils";
import { Button, CtaArrow, buttonClass } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Mail } from "@/components/ui/icons";

type Data = Omit<ProjectInquiry, "projectType"> & { projectType: ProjectType | "" };
type Errors = Partial<Record<keyof Data, string>>;
type Status = "idle" | "submitting" | "success" | "fallback";

const empty: Data = { projectType: "", timeline: "", budget: "", details: "", name: "", email: "", company: "", website: "" };
const steps = ["Project", "Scope", "Details"];
const ease = [0.16, 1, 0.3, 1] as const;

export function InquiryForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);

  // CTAs across the page can pre-select a project type; the hero can pass an email.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { type, email } = (e as CustomEvent<PrefillDetail>).detail ?? {};
      if (status === "success" || status === "fallback") return;
      if (email) setData((d) => ({ ...d, email }));
      if (type) {
        setData((d) => ({ ...d, projectType: type }));
        setErrors({});
        setStep((s) => (s === 0 ? 1 : s));
      }
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, [status]);

  // Move focus to the new step's heading for keyboard and screen-reader users.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step, status]);

  const set = <K extends keyof Data>(key: K, value: Data[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validate(current: number): Errors {
    const e: Errors = {};
    if (current === 0 && !data.projectType) e.projectType = "Choose what you're building.";
    if (current === 1 && !data.timeline) e.timeline = "Pick a timeline — rough is fine.";
    if (current === 2) {
      if (data.details.trim().length < 10) e.details = "A sentence or two is enough to get started.";
      if (!data.name.trim()) e.name = "Please add your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = "Enter a valid email so we can reply.";
    }
    return e;
  }

  function next() {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length === 0) setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (step < steps.length - 1) return next();
    const e = validate(2);
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("submitting");
    setServerMessage("");
    const result = await submitProjectInquiry(data as ProjectInquiry);
    if (result.ok) setStatus("success");
    else if (result.reason === "invalid") {
      setStatus("idle");
      setServerMessage(result.message ?? "Please check the form and try again.");
    } else setStatus("fallback");
  }

  function reset() {
    setData(empty);
    setErrors({});
    setStep(0);
    setStatus("idle");
  }

  if (status === "success" || status === "fallback") {
    const mailto = inquiryMailto(data as ProjectInquiry);
    return (
      <div className="panel p-6 sm:p-10" aria-live="polite">
        <span className="grid size-12 place-items-center rounded-2xl border border-accent/40 bg-accent/15 text-accent">
          {status === "success" ? <Check size={22} /> : <Mail size={20} />}
        </span>
        <h3 ref={headingRef} tabIndex={-1} className="mt-6 text-title font-semibold text-fg outline-none">
          {status === "success" ? `Thanks, ${data.name.split(" ")[0]}. Your brief is with our team.` : "One last step — send us your brief."}
        </h3>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">
          {status === "success"
            ? `We'll review your ${data.projectType} project and reply to ${data.email} with next steps.`
            : "We couldn't send your brief automatically. Your answers are ready in a pre-written email — just press send."}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {status === "fallback" ? (
            <a href={mailto} className={buttonClass("primary", "lg")}>
              <Mail size={16} /> Open email with your brief
            </a>
          ) : null}
          <Button variant="secondary" size="lg" onClick={reset}>
            {status === "success" ? "Send another brief" : "Start over"}
          </Button>
        </div>
        {status === "fallback" ? (
          <p className="mt-6 text-sm text-subtle">
            Or write to us directly at{" "}
            <a href={`mailto:${company.email}`} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent">
              {company.email}
            </a>
            .
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="panel glow-border relative overflow-hidden" aria-label="Project inquiry">
      {/* progress */}
      <div className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-8">
        <ol className="flex items-center gap-2 sm:gap-4" aria-label="Form progress">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2" aria-current={i === step ? "step" : undefined}>
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full border font-mono text-[10px] transition-colors duration-300",
                  i < step && "border-accent bg-accent text-white",
                  i === step && "border-accent text-fg",
                  i > step && "border-line-strong text-subtle",
                )}
              >
                {i < step ? <Check size={12} /> : i + 1}
              </span>
              <span className={cn("hidden text-[13px] sm:inline", i === step ? "text-fg" : "text-subtle")}>{s}</span>
            </li>
          ))}
        </ol>
        <span className="font-mono text-[11px] text-subtle">
          {step + 1} / {steps.length}
        </span>
      </div>

      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease }}
          >
            {step === 0 ? (
              <fieldset aria-describedby={errors.projectType ? "err-type" : undefined}>
                <legend className="contents">
                  <StepHeading ref={headingRef}>What are you building?</StepHeading>
                </legend>
                <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {projectTypes.map((t) => (
                    <Choice key={t} name="projectType" value={t} checked={data.projectType === t} onChange={() => set("projectType", t)}>
                      {t}
                    </Choice>
                  ))}
                </div>
                <FieldError id="err-type">{errors.projectType}</FieldError>
              </fieldset>
            ) : null}

            {step === 1 ? (
              <div className="space-y-8">
                <fieldset aria-describedby={errors.timeline ? "err-timeline" : undefined}>
                  <legend className="contents">
                    <StepHeading ref={headingRef}>What&apos;s your timeline?</StepHeading>
                  </legend>
                  <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
                    {timelines.map((t) => (
                      <Choice key={t} name="timeline" value={t} checked={data.timeline === t} onChange={() => set("timeline", t)}>
                        {t}
                      </Choice>
                    ))}
                  </div>
                  <FieldError id="err-timeline">{errors.timeline}</FieldError>
                </fieldset>
                <fieldset>
                  <legend className="text-[15px] font-medium text-fg">
                    Budget range <span className="font-normal text-subtle">(optional)</span>
                  </legend>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {budgets.map((b) => (
                      <Choice key={b} name="budget" value={b} checked={data.budget === b} onChange={() => set("budget", b)} compact>
                        {b}
                      </Choice>
                    ))}
                  </div>
                </fieldset>
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <StepHeading ref={headingRef}>Tell us about your project.</StepHeading>
                <div className="mt-6 grid gap-4">
                  <Field label="Project details" id="details" error={errors.details}>
                    <textarea
                      id="details"
                      rows={4}
                      value={data.details}
                      onChange={(e) => set("details", e.target.value)}
                      placeholder="What problem are you solving, and for whom? Anything already built?"
                      aria-invalid={!!errors.details}
                      aria-describedby={errors.details ? "details-error" : undefined}
                      className={inputClass("min-h-[120px] resize-y py-3")}
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" id="name" error={errors.name}>
                      <input
                        id="name"
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => set("name", e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={inputClass()}
                      />
                    </Field>
                    <Field label="Email" id="email" error={errors.email}>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={data.email}
                        onChange={(e) => set("email", e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={inputClass()}
                      />
                    </Field>
                  </div>
                  <Field label="Company" id="company" optional>
                    <input
                      id="company"
                      autoComplete="organization"
                      value={data.company}
                      onChange={(e) => set("company", e.target.value)}
                      className={inputClass()}
                    />
                  </Field>
                  {/* honeypot */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="website">Website</label>
                    <input id="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set("website", e.target.value)} />
                  </div>
                </div>
                {serverMessage ? (
                  <p role="alert" className="mt-4 text-sm text-[#ff8a8a]">
                    {serverMessage}
                  </p>
                ) : null}
              </div>
            ) : null}
          </m.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)} className="px-0">
              <ArrowLeft size={15} /> Back
            </Button>
          ) : (
            <span className="text-[13px] text-subtle">Takes about a minute.</span>
          )}
          {step < steps.length - 1 ? (
            <Button variant="primary" size="lg" onClick={next}>
              Continue
              <CtaArrow>
                <ArrowRight size={16} />
              </CtaArrow>
            </Button>
          ) : (
            <Button type="submit" variant="primary" size="lg" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Let's Build It"}
              <CtaArrow>
                <ArrowRight size={16} />
              </CtaArrow>
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

function StepHeading({ children, ref }: { children: ReactNode; ref: React.Ref<HTMLHeadingElement> }) {
  return (
    <h3 ref={ref} tabIndex={-1} className="block text-title font-semibold text-fg outline-none">
      {children}
    </h3>
  );
}

function Choice({
  name,
  value,
  checked,
  onChange,
  compact,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer items-center rounded-xl border text-[14px] transition-[border-color,background-color,color] duration-300",
        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
        compact ? "h-10 px-4" : "h-14 justify-between px-4",
        checked ? "border-accent/70 bg-accent/12 text-fg" : "border-line-strong bg-white/[0.02] text-muted hover:border-white/20 hover:text-fg",
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span>{children}</span>
      {!compact ? (
        <span
          aria-hidden
          className={cn(
            "grid size-4 place-items-center rounded-full border transition-colors",
            checked ? "border-accent bg-accent" : "border-line-strong",
          )}
        >
          {checked ? <span className="size-1.5 rounded-full bg-white" /> : null}
        </span>
      ) : null}
    </label>
  );
}

function Field({ label, id, error, optional, children }: { label: string; id: string; error?: string; optional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-[13.5px] font-medium text-fg/90">
        {label} {optional ? <span className="font-normal text-subtle">(optional)</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}

function FieldError({ id, children }: { id: string; children?: ReactNode }) {
  return children ? (
    <p id={id} role="alert" className="mt-2 text-[13px] text-[#ff8a8a]">
      {children}
    </p>
  ) : null;
}

function inputClass(extra?: string) {
  return cn(
    "block h-12 w-full rounded-xl border border-line-strong bg-bg/60 px-4 text-[15px] text-fg placeholder:text-subtle/80",
    "transition-[border-color,box-shadow] duration-300 outline-none",
    "focus:border-accent/70 focus:shadow-[0_0_0_4px_rgb(118_80_255/0.15)]",
    "aria-[invalid=true]:border-[#ff8a8a]/60",
    extra,
  );
}
