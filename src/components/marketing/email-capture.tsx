"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { company } from "@/content/site";
import { isEmail, submitLead } from "@/lib/lead";
import { Check, Close } from "@/components/ui/icons";
import { CONSENT_EVENT, COOKIE_KEY } from "./cookie-banner";

const SEEN_KEY = "sslc-email-capture";
const SNOOZE_DAYS = 7;

/**
 * Email capture pop-up. Shown once per visitor (snoozed for 7 days if closed),
 * only after the cookie notice is answered and the visitor has engaged:
 * 18s on the page, 55% scroll, or leaving intent on desktop. Never on entry,
 * so it doesn't block the first view (and isn't an intrusive interstitial).
 */
export function EmailCapture() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "fallback">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const read = (k: string) => {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    };
    const seen = Number(read(SEEN_KEY) || 0);
    if (seen === -1 || (seen && Date.now() - seen < SNOOZE_DAYS * 864e5)) return;

    let armed = false;
    let fired = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const fire = () => {
      if (fired || !armed) return;
      if (document.getElementById("contact")?.matches(":focus-within")) return; // they're already filling the form
      fired = true;
      lastFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
      cleanup();
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.55) fire();
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };
    const arm = () => {
      if (armed) return;
      armed = true;
      timer = setTimeout(fire, 18000);
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("mouseout", onLeave);
    };
    function cleanup() {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onLeave);
      window.removeEventListener(CONSENT_EVENT, arm);
    }

    // Wait for the cookie notice to be answered first.
    if (read(COOKIE_KEY)) arm();
    else window.addEventListener(CONSENT_EVENT, arm);
    return cleanup;
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function remember(value: number) {
    try {
      localStorage.setItem(SEEN_KEY, String(value));
    } catch {
      /* ignore */
    }
  }

  function close() {
    if (state !== "done") remember(Date.now());
    setOpen(false);
    lastFocus.current?.focus?.();
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isEmail(email)) return setError("Please enter a valid email address.");
    setError("");
    setState("sending");
    const ok = await submitLead(email.trim(), "Email pop-up");
    setState(ok ? "done" : "fallback");
    if (ok) remember(-1); // never ask again
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/60 p-4 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ec-title"
        className="force-dark relative w-full max-w-md animate-rise overflow-hidden border border-white/15 bg-[#0b0b0f] text-white shadow-[0_40px_100px_-30px_rgb(0_0_0/0.9)]"
      >
        <div aria-hidden className="h-1 w-full bg-gradient-to-r from-cyan via-violet to-magenta" />
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 grid size-9 place-items-center text-white/60 hover:text-white"
        >
          <Close size={18} />
        </button>

        <div className="p-7 sm:p-8">
          {state === "done" ? (
            <div aria-live="polite">
              <span className="grid size-11 place-items-center rounded-full bg-white/10">
                <Check size={20} />
              </span>
              <h2 id="ec-title" className="mt-5 font-display text-[22px] leading-snug font-medium">
                Thanks — we&apos;ll be in touch.
              </h2>
              <p className="mt-3 text-[15px] text-white/70">We&apos;ll reach out to {email} about your project.</p>
              <button type="button" onClick={close} className="mt-6 h-11 w-full rounded-[3px] bg-white text-[15px] font-semibold text-black">
                Continue browsing
              </button>
            </div>
          ) : (
            <>
              <p className="font-mono text-[11px] tracking-[0.2em] text-white/55 uppercase">Free consultation</p>
              <h2 id="ec-title" className="mt-3 font-display text-[22px] leading-snug font-medium">
                Have a software idea? Let&apos;s talk about it.
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                Leave your email and our team will reach out to discuss your project — AI, SaaS, web or mobile.
              </p>
              <form onSubmit={submit} noValidate className="mt-6">
                <label htmlFor="ec-email" className="sr-only">
                  Email address
                </label>
                <input
                  ref={inputRef}
                  id="ec-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  aria-invalid={!!error}
                  aria-describedby={error ? "ec-error" : undefined}
                  className="block h-12 w-full rounded-[3px] bg-white px-4 text-[15px] text-black placeholder:text-[#5c5c68] outline-none focus:shadow-[0_0_0_3px_rgb(138_61_255/0.45)]"
                />
                {error ? (
                  <p id="ec-error" role="alert" className="mt-2 text-[13.5px] text-[#ff9db0]">
                    {error}
                  </p>
                ) : null}
                {state === "fallback" ? (
                  <p role="alert" className="mt-2 text-[13.5px] text-white/75">
                    Couldn&apos;t send automatically —{" "}
                    <a className="underline underline-offset-4" href={`mailto:${company.email}?subject=${encodeURIComponent("Project enquiry")}&body=${encodeURIComponent(`My email: ${email}`)}`}>
                      email us instead
                    </a>
                    .
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={state === "sending"}
                  className="btn-brand mt-3 h-12 w-full rounded-[3px] text-[15.5px] font-semibold text-white hover:brightness-110 disabled:opacity-60"
                >
                  {state === "sending" ? "Sending…" : "Get a Free Consultation"}
                </button>
              </form>
              <p className="mt-4 text-[12.5px] text-white/50">
                No spam. We only use your email to contact you about your enquiry. See our{" "}
                <Link href="/privacy" className="underline underline-offset-4" onClick={close}>
                  Privacy Policy
                </Link>
                .
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
