"use client";

import { useState, type FormEvent } from "react";
import { projectTypes, type ProjectType } from "@/content/site";
import { inquiryMailto, submitProjectInquiry, type ProjectInquiry } from "@/lib/inquiry";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Check, Mail } from "@/components/ui/icons";

type Status = "idle" | "sending" | "sent" | "fallback";

const field =
  "block h-11 w-full rounded-[3px] border border-transparent bg-white px-3.5 text-[15px] text-[#0a0a0a] placeholder:text-[#5c5c68] outline-none transition-[border-color,box-shadow] focus:border-violet focus:shadow-[0_0_0_3px_rgb(138_61_255/0.25)]";
const label = "mb-1.5 block text-[13px] font-medium text-white/90";

/** Compact hero inquiry form (Goji-style). Uses the same delivery as the full brief. */
export function QuickForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [data, setData] = useState({ first: "", last: "", email: "", phone: "", type: "" as ProjectType | "", details: "", website: "" });
  const set = (k: keyof typeof data, v: string) => setData((d) => ({ ...d, [k]: v }));

  const inquiry = (): ProjectInquiry => ({
    projectType: (data.type || "Other") as ProjectType,
    timeline: "Not specified",
    budget: "",
    details: data.details.trim(),
    name: `${data.first} ${data.last}`.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    company: "",
    website: data.website,
  });

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!data.first.trim()) return setError("Please add your first name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return setError("Please enter a valid email.");
    if (data.details.trim().length < 10) return setError("Tell us a little about your product (a sentence is enough).");
    setError("");
    setStatus("sending");
    const res = await submitProjectInquiry(inquiry());
    setStatus(res.ok ? "sent" : "fallback");
  }

  if (status === "sent" || status === "fallback") {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center p-2" aria-live="polite">
        <span className="grid size-12 place-items-center rounded-full bg-white/10 text-white">
          {status === "sent" ? <Check size={22} /> : <Mail size={20} />}
        </span>
        <h2 className="mt-6 font-display text-[22px] leading-snug font-medium text-white">
          {status === "sent" ? `Thanks, ${data.first}. We'll be in touch.` : "One last step — send your brief by email."}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-white/70">
          {status === "sent"
            ? "Your project details are with our team. We'll reply to " + data.email + " with next steps."
            : "We couldn't send it automatically. Your details are ready in a pre-written email."}
        </p>
        {status === "fallback" ? (
          <a href={inquiryMailto(inquiry())} className="mt-6 inline-flex h-11 items-center gap-2 rounded-[3px] bg-white px-5 text-[15px] font-semibold text-[#0a0a0a]">
            Open email <ArrowUpRight size={15} />
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate aria-label="Get started" className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="qf-first" className={label}>First Name*</label>
          <input id="qf-first" autoComplete="given-name" placeholder="First Name" value={data.first} onChange={(e) => set("first", e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor="qf-last" className={label}>Last Name</label>
          <input id="qf-last" autoComplete="family-name" placeholder="Last Name" value={data.last} onChange={(e) => set("last", e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor="qf-email" className={label}>Company Email*</label>
          <input id="qf-email" type="email" inputMode="email" autoComplete="email" placeholder="you@company.com" value={data.email} onChange={(e) => set("email", e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor="qf-phone" className={label}>Phone / WhatsApp</label>
          <input id="qf-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 …" value={data.phone} onChange={(e) => set("phone", e.target.value)} className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="qf-type" className={label}>What are you building?</label>
        <select id="qf-type" value={data.type} onChange={(e) => set("type", e.target.value)} className={cn(field, !data.type && "text-[#5c5c68]")}>
          <option value="">Select a project type</option>
          {projectTypes.map((t) => (
            <option key={t} value={t} className="text-[#0a0a0a]">
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="qf-details" className={label}>Tell us about your product and timeline*</label>
        <textarea id="qf-details" rows={3} placeholder="Tell us a bit about your product!" value={data.details} onChange={(e) => set("details", e.target.value)} className={cn(field, "h-auto resize-y py-3")} />
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="qf-website">Website</label>
        <input id="qf-website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set("website", e.target.value)} />
      </div>
      {error ? (
        <p role="alert" className="text-[13.5px] text-[#ff9db0]">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-brand mt-1 h-12 rounded-[3px] text-[15.5px] font-semibold text-white transition-[filter] hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
