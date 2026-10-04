import type { ProjectType } from "@/content/site";

/**
 * Lightweight cross-component signal: any CTA can pre-select a project
 * type (or pass an email from the hero) and bring the visitor to the form.
 */
export const PREFILL_EVENT = "sslc:prefill-inquiry";

export type PrefillDetail = { type?: ProjectType; email?: string };

export function startInquiry(type?: ProjectType, email?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail: { type, email } }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
