import type { ProjectType } from "@/content/site";

/**
 * Lightweight cross-component signal: any CTA can pre-select a project
 * type in the inquiry form and bring the visitor to it.
 */
export const PREFILL_EVENT = "sslc:prefill-inquiry";

export function startInquiry(type?: ProjectType) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ProjectType | undefined>(PREFILL_EVENT, { detail: type }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
