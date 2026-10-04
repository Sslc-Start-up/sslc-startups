import { company, type ProjectType } from "@/content/site";

export type ProjectInquiry = {
  projectType: ProjectType;
  timeline: string;
  budget: string;
  details: string;
  name: string;
  email: string;
  company: string;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type InquiryResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "invalid" | "network"; message?: string };

/**
 * Submits a project inquiry to the site's own API route (/api/inquiry),
 * which forwards it to the configured delivery service.
 *
 * Delivery is configured server-side — see src/app/api/inquiry/route.ts
 * and README ("Project inquiries"). Nothing here needs to change when the
 * email/CRM provider changes.
 */
export async function submitProjectInquiry(inquiry: ProjectInquiry): Promise<InquiryResult> {
  try {
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiry),
    });
    const data = (await res.json().catch(() => ({}))) as { delivered?: boolean; error?: string; message?: string };
    if (res.ok && data.delivered) return { ok: true };
    if (data.error === "not_configured") return { ok: false, reason: "not_configured" };
    if (res.status === 400) return { ok: false, reason: "invalid", message: data.message };
    return { ok: false, reason: "network" };
  } catch {
    return { ok: false, reason: "network" };
  }
}

/** Fallback: a pre-written email containing the full brief. */
export function inquiryMailto(inquiry: ProjectInquiry) {
  const subject = `New project: ${inquiry.projectType}${inquiry.company ? ` — ${inquiry.company}` : ""}`;
  const body = [
    `Project type: ${inquiry.projectType}`,
    `Timeline: ${inquiry.timeline}`,
    `Budget: ${inquiry.budget || "Not specified"}`,
    "",
    inquiry.details,
    "",
    `${inquiry.name}${inquiry.company ? `, ${inquiry.company}` : ""}`,
    inquiry.email,
  ].join("\n");
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
