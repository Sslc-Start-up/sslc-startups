import { NextResponse } from "next/server";
import { projectTypes } from "@/content/site";

/**
 * POST /api/inquiry
 *
 * Validates a project inquiry and forwards it as JSON to INQUIRY_WEBHOOK_URL.
 * Any service that accepts a JSON webhook works: Formspree, Zapier, Make,
 * Slack incoming webhooks, n8n, or your own CRM endpoint.
 *
 * When INQUIRY_WEBHOOK_URL is not set the route answers { delivered: false,
 * error: "not_configured" } and the form falls back to a pre-written email,
 * so no inquiry is lost. (200 rather than 503: a missing integration is an
 * expected state, not a server fault, and shouldn't surface as a browser error.)
 */

const MAX = { name: 120, email: 200, company: 160, details: 5000, short: 80 };

function str(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid", message: "Malformed request." }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend success, deliver nothing.
  if (str(body.website, 200)) return NextResponse.json({ delivered: true });

  const inquiry = {
    projectType: str(body.projectType, MAX.short),
    timeline: str(body.timeline, MAX.short),
    budget: str(body.budget, MAX.short),
    details: str(body.details, MAX.details),
    name: str(body.name, MAX.name),
    email: str(body.email, MAX.email),
    company: str(body.company, MAX.company),
  };

  const problems: string[] = [];
  if (!projectTypes.includes(inquiry.projectType as (typeof projectTypes)[number])) problems.push("project type");
  if (!inquiry.name) problems.push("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) problems.push("email");
  if (inquiry.details.length < 10) problems.push("project details");
  if (problems.length) {
    return NextResponse.json({ error: "invalid", message: `Please check: ${problems.join(", ")}.` }, { status: 400 });
  }

  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[inquiry] INQUIRY_WEBHOOK_URL is not set — inquiry not delivered server-side.");
    return NextResponse.json({ delivered: false, error: "not_configured" });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...inquiry, source: "sslc-website", receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ delivered: true });
  } catch (error) {
    console.error("[inquiry] delivery failed", error);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
