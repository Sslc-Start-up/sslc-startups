/**
 * Email capture (pop-up). Delivered to the same inbox as project briefs via
 * NEXT_PUBLIC_INQUIRY_ENDPOINT (FormSubmit). Returns false when no endpoint
 * is configured or delivery fails, so the UI can offer an email fallback.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT;

export async function submitLead(email: string, source: string): Promise<boolean> {
  if (!ENDPOINT) return false;
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        Email: email,
        Source: source,
        Page: typeof window !== "undefined" ? window.location.href : "",
        _subject: "New website lead (email capture)",
        _replyto: email,
        _template: "table",
        _captcha: "false",
      }),
    });
    const data = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
    return res.ok && (!data || data.success === true || data.success === "true");
  } catch {
    return false;
  }
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
