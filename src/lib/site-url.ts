/**
 * Canonical origin for metadata, sitemap and structured data.
 * Set NEXT_PUBLIC_SITE_URL to the production domain (e.g. https://example.com).
 * On Vercel the production URL is picked up automatically.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
