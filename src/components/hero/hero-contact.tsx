"use client";

import { useState, type FormEvent } from "react";
import { company } from "@/content/site";
import { startInquiry } from "@/lib/prefill";
import { CtaArrow } from "@/components/ui/button";
import { ArrowRight, Mail, WhatsApp } from "@/components/ui/icons";

/**
 * Hero contact block: email capture that hands off to the project brief,
 * plus one-tap WhatsApp and email.
 */
export function HeroContact() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Enter a valid email, or leave it empty.");
      return;
    }
    setError("");
    startInquiry(undefined, value || undefined);
    history.replaceState(null, "", "#contact");
  }

  return (
    <div>
      <form
        onSubmit={submit}
        noValidate
        aria-label="Start a project"
        className="flex w-full max-w-[34rem] flex-col gap-2 rounded-2xl border border-line-strong bg-surface/80 p-2 shadow-[var(--shadow-card)] backdrop-blur-md sm:flex-row sm:items-center sm:rounded-full sm:p-1.5"
      >
        <label htmlFor="hero-email" className="sr-only">
          Your work email
        </label>
        <span className="flex flex-1 items-center gap-3 px-3 sm:pl-4">
          <Mail size={17} className="shrink-0 text-subtle" />
          <input
            id="hero-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Enter your work email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            aria-invalid={!!error}
            aria-describedby={error ? "hero-email-error" : undefined}
            className="h-11 w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-subtle"
          />
        </span>
        <button
          type="submit"
          className="group/btn btn-brand inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-[15px] font-medium whitespace-nowrap text-white shadow-[var(--shadow-accent)] transition-[filter,transform] duration-300 hover:brightness-110 active:translate-y-px sm:rounded-full"
        >
          Start a Project
          <CtaArrow>
            <ArrowRight size={16} />
          </CtaArrow>
        </button>
      </form>
      {error ? (
        <p id="hero-email-error" role="alert" className="mt-2 pl-2 text-[13px] text-[#ff6b8a]">
          {error}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-[14px]">
        <span className="font-mono text-[11px] tracking-[0.18em] text-subtle uppercase">Or contact us</span>
        <a
          href={company.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[#25d366]/40 bg-[#25d366]/10 px-3.5 py-1.5 font-medium text-fg transition-colors hover:bg-[#25d366]/20"
        >
          <WhatsApp size={16} className="text-[#25d366]" /> WhatsApp
        </a>
        <a
          href={`mailto:${company.email}`}
          className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
        >
          <Mail size={15} /> {company.email}
        </a>
      </div>
    </div>
  );
}
