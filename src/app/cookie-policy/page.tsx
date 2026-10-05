import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/content/site";
import { LegalPage, Section } from "@/components/legal/legal-page";

const EFFECTIVE = "6 October 2026";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${company.name} uses cookies, local storage and analytics on sslctstartup.com.`,
  alternates: { canonical: "/cookie-policy" },
};

const toc = [
  ["what", "What cookies are"],
  ["use", "What we use"],
  ["storage", "Local storage on your device"],
  ["third", "Third-party links"],
  ["choices", "Your choices"],
  ["cookie-contact", "Contact"],
] as const;

const items = [
  { name: "sslc-theme", purpose: "Remembers your light/dark mode choice", type: "Local storage (your browser)", duration: "Until you clear it" },
  { name: "sslc-cookie-consent", purpose: "Remembers your answer to the cookie notice", type: "Local storage (your browser)", duration: "Until you clear it" },
  { name: "sslc-email-capture", purpose: "Stops the consultation pop-up from showing again", type: "Local storage (your browser)", duration: "7 days, or until cleared" },
  { name: "sslc-wa-bubble-dismissed", purpose: "Hides the WhatsApp greeting after you close it", type: "Session storage (your browser)", duration: "Until the tab is closed" },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      effective={EFFECTIVE}
      toc={toc}
      intro={<>How {company.name} uses cookies, browser storage and analytics on sslctstartup.com. In short: no advertising or tracking cookies.</>}
    >
      <Section id="what" title="1. What cookies are">
        <p>
          Cookies are small text files a website stores in your browser. Similar technologies, such as local storage,
          let a site remember preferences on your device.
        </p>
      </Section>

      <Section id="use" title="2. What we use">
        <p>
          <strong>We do not use advertising, marketing or cross-site tracking cookies.</strong> To understand how the
          site is used, we use Vercel Web Analytics, which is cookie-free and reports only aggregated, anonymous
          statistics (such as page views, referrer, country and device type).
        </p>
      </Section>

      <Section id="storage" title="3. Local storage on your device">
        <p>The site stores a few small preferences in your own browser. They are not sent to us:</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border border-line text-left text-[14px]">
            <thead className="bg-surface-2 text-fg">
              <tr>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Purpose</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.name} className="border-t border-line">
                  <td className="p-3 font-mono text-[12.5px] text-fg">{i.name}</td>
                  <td className="p-3">{i.purpose}</td>
                  <td className="p-3">{i.type}</td>
                  <td className="p-3">{i.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="third" title="4. Third-party links">
        <p>
          Links to WhatsApp, LinkedIn or other sites take you to services with their own cookie and privacy policies.
          We don&apos;t control the cookies those services set.
        </p>
      </Section>

      <Section id="choices" title="5. Your choices">
        <p>
          You can accept or choose &ldquo;Essential only&rdquo; in our cookie notice, and you can clear stored
          preferences at any time in your browser settings. Blocking storage won&apos;t stop the site from working — it
          just won&apos;t remember your preferences. For more on how we handle personal information, see our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </Section>

      <Section id="cookie-contact" title="6. Contact">
        <p>
          Questions? Email <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>
      </Section>
    </LegalPage>
  );
}
