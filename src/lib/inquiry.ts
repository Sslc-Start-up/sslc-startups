import { company, type ProjectType } from "@/content/site";

export type ProjectInquiry = {
  projectType: ProjectType;
  timeline: string;
  budget: string;
  details: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  /** Honeypot — must stay empty. */
  website?: string;
};

export type InquiryResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "invalid" | "network"; message?: string };

/**
 * Browser-side relay endpoint (e.g. FormSubmit's AJAX URL). Relays like
 * FormSubmit block server-to-server requests, so when this is set the
 * browser posts the brief directly. Otherwise the site's own /api/inquiry
 * route is used (server-side webhook via INQUIRY_WEBHOOK_URL).
 */
const PUBLIC_ENDPOINT = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT;

/** Submits a project inquiry. See README ("Project inquiries"). */
export async function submitProjectInquiry(inquiry: ProjectInquiry): Promise<InquiryResult> {
  if (PUBLIC_ENDPOINT) return submitDirect(PUBLIC_ENDPOINT, inquiry);
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

async function submitDirect(endpoint: string, inquiry: ProjectInquiry): Promise<InquiryResult> {
  // Honeypot filled → pretend success, send nothing.
  if (inquiry.website) return { ok: true };
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        "Project type": inquiry.projectType,
        Timeline: inquiry.timeline,
        Budget: inquiry.budget || "Not specified",
        "Project details": inquiry.details,
        Name: inquiry.name,
        Email: inquiry.email,
        Company: inquiry.company || "—",
        Phone: inquiry.phone || "—",
        _subject: `New project inquiry: ${inquiry.projectType}${inquiry.company ? ` — ${inquiry.company}` : ""}`,
        _replyto: inquiry.email,
        _template: "table",
        _captcha: "false",
      }),
    });
    const data = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
    if (res.ok && (!data || data.success === true || data.success === "true")) return { ok: true };
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
    inquiry.phone ?? "",
  ].join("\n");
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
