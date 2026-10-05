import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/content/site";
import { LegalPage, Section } from "@/components/legal/legal-page";

const EFFECTIVE = "6 October 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${company.name} collects, uses and protects personal information shared through sslctstartup.com, our project forms, email and WhatsApp.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const toc = [
  ["who", "Who we are"],
  ["collect", "Information we collect"],
  ["use", "How we use information"],
  ["basis", "Legal basis and consent"],
  ["share", "Who we share it with"],
  ["transfer", "International transfers"],
  ["retention", "How long we keep it"],
  ["rights", "Your rights"],
  ["cookies", "Cookies and local storage"],
  ["security", "Security"],
  ["children", "Children"],
  ["changes", "Changes to this policy"],
  ["privacy-contact", "Contact and grievances"],
] as const;

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      effective={EFFECTIVE}
      toc={toc}
      intro={
        <>
          This policy explains what personal information {company.name} collects when you use{" "}
          <strong className="text-white">sslctstartup.com</strong> or contact us, how we use it and the choices you
          have.
        </>
      }
    >
            <Section id="who" title="1. Who we are">
              <p>
                {company.name} (&ldquo;SSLC&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a software development company
                that designs and builds AI, SaaS, web, mobile and business software. We are responsible for the personal
                information described in this policy. You can reach us at{" "}
                <a href={`mailto:${company.email}`}>
                  {company.email}
                </a>
                .
              </p>
            </Section>

            <Section id="collect" title="2. Information we collect">
              <p>
                <strong>Information you give us.</strong> When you fill in a project form on our website, we collect
                what you enter: your name, email address, phone or WhatsApp number (optional), company name (optional),
                the type of project, timeline, budget range (optional) and your project description. If you leave your email in
                our &ldquo;free consultation&rdquo; pop-up, we collect that email address. If you email us or
                message us on WhatsApp, we receive the details you choose to share in that conversation.
              </p>
              <p>
                <strong>Information collected automatically.</strong> We use Vercel Web Analytics to understand how the
                site is used. It records aggregated, anonymous information such as pages viewed, the referring website,
                country, and device or browser type. It does not use cookies and does not identify you personally. Our
                hosting provider also keeps standard technical logs (such as IP address, browser type and time of
                request) to operate and secure the website.
              </p>
              <p>
                We do not knowingly collect sensitive personal data (such as financial, health or government ID
                information) through this website. Please do not include it in a form.
              </p>
            </Section>

            <Section id="use" title="3. How we use information">
              <ul>
                <li>To respond to your enquiry, discuss your project and prepare a proposal.</li>
                <li>To communicate with you by email, phone or WhatsApp about the work you asked us about.</li>
                <li>To deliver services if we work together, including project management and support.</li>
                <li>To understand and improve our website, content and services using anonymous analytics.</li>
                <li>To keep our website and systems secure and to prevent spam and misuse.</li>
                <li>To meet legal, accounting or regulatory obligations.</li>
              </ul>
              <p>We do not sell your personal information, and we do not use it for third-party advertising.</p>
            </Section>

            <Section id="basis" title="4. Legal basis and consent">
              <p>
                We process the information you submit with your consent, which you give by sending us a form, email or
                message, and to take steps you request before entering into a contract. We rely on our legitimate
                interests to run basic, privacy-friendly analytics and to secure our website. Where applicable, we follow
                India&apos;s Digital Personal Data Protection Act, 2023 and, for visitors in the EU/UK, the GDPR. You can
                withdraw your consent at any time by contacting us.
              </p>
            </Section>

            <Section id="share" title="5. Who we share it with">
              <p>We share personal information only with service providers that help us run our business:</p>
              <ul>
                <li>
                  <strong>Vercel</strong> — website hosting and anonymous web analytics.
                </li>
                <li>
                  <strong>FormSubmit</strong> — delivers website form submissions to our business email inbox.
                </li>
                <li>
                  <strong>Google Workspace</strong> — our business email and productivity tools.
                </li>
                <li>
                  <strong>WhatsApp (Meta)</strong> — only if you choose to contact us on WhatsApp.
                </li>
              </ul>
              <p>
                These providers process information on our behalf and under their own privacy and security terms. We may
                also disclose information if required by law, or to protect our rights, users or the public.
              </p>
            </Section>

            <Section id="transfer" title="6. International transfers">
              <p>
                Our service providers may store or process information on servers outside your country, including in
                the United States and the European Union. Where we use such providers, we rely on their contractual and
                security commitments to protect your information.
              </p>
            </Section>

            <Section id="retention" title="7. How long we keep it">
              <p>
                We keep enquiry and project communications for as long as needed to respond to you, carry out any work
                we do together and maintain business records, and then delete or anonymise them. You can ask us to
                delete your information sooner (see &ldquo;Your rights&rdquo;). Anonymous analytics data is kept in
                aggregated form.
              </p>
            </Section>

            <Section id="rights" title="8. Your rights">
              <p>Depending on where you live, you may have the right to:</p>
              <ul>
                <li>access the personal information we hold about you;</li>
                <li>correct inaccurate or incomplete information;</li>
                <li>ask us to delete your information;</li>
                <li>withdraw consent or object to certain processing;</li>
                <li>raise a complaint with us, or with your local data protection authority.</li>
              </ul>
              <p>
                To make a request, email{" "}
                <a href={`mailto:${company.email}`}>
                  {company.email}
                </a>
                . We may need to confirm your identity before acting on it, and we aim to respond within 30 days.
              </p>
            </Section>

            <Section id="cookies" title="9. Cookies and local storage">
              <p>
                We do not use advertising or tracking cookies. Our analytics is cookie-free. The website stores two small
                preferences in your own browser: your light/dark theme choice, your cookie-notice choice, and whether you
                have dismissed the WhatsApp greeting or email pop-up. These stay on your device and are not sent to us.
                You can clear them at any time in your browser settings. Read more in our{" "}
                <Link href="/cookie-policy">Cookie Policy</Link>.
              </p>
            </Section>

            <Section id="security" title="10. Security">
              <p>
                The website is served over HTTPS, and we use reputable providers and access controls to protect the
                information you share. No method of transmission or storage is completely secure, so we cannot guarantee
                absolute security, but we work to protect your information and will act promptly on any incident.
              </p>
            </Section>

            <Section id="children" title="11. Children">
              <p>
                Our website and services are intended for businesses and are not directed at children under 18. We do not
                knowingly collect personal information from children. If you believe a child has sent us information,
                please contact us and we will delete it.
              </p>
            </Section>

            <Section id="changes" title="12. Changes to this policy">
              <p>
                We may update this policy from time to time. When we do, we will change the effective date at the top of
                this page. Significant changes will be highlighted on the website.
              </p>
            </Section>

            <Section id="privacy-contact" title="13. Contact and grievances">
              <p>For privacy questions, requests or complaints, contact:</p>
              <p>
                <strong>{company.name}</strong>
                <br />
                Email:{" "}
                <a href={`mailto:${company.email}`}>
                  {company.email}
                </a>
                <br />
                WhatsApp:{" "}
                <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer">
                  {company.phone}
                </a>
              </p>
            </Section>
    </LegalPage>
  );
}
