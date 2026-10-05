import type { Metadata } from "next";
import { company } from "@/content/site";
import { LegalPage, Section } from "@/components/legal/legal-page";

const EFFECTIVE = "6 October 2026";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Refund and cancellation policy for software development services provided by ${company.name}.`,
  alternates: { canonical: "/refund-policy" },
};

const toc = [
  ["scope", "Scope"],
  ["payments", "How payments work"],
  ["before", "Cancelling before work starts"],
  ["during", "Cancelling during a project"],
  ["non-refundable", "Non-refundable items"],
  ["retainers", "Retainers and maintenance"],
  ["quality", "If something isn't right"],
  ["request", "How to request a refund"],
  ["refund-contact", "Contact"],
] as const;

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      effective={EFFECTIVE}
      toc={toc}
      intro={
        <>
          How refunds and cancellations work for software development services from {company.name}. We aim to be fair,
          transparent and quick to resolve any concern.
        </>
      }
    >
      <Section id="scope" title="1. Scope">
        <p>
          This policy applies to software development, design, AI, consulting, maintenance and related services provided
          by {company.name}. If you have a signed proposal, statement of work or contract with us, its payment and
          cancellation terms take priority over this policy where they differ.
        </p>
      </Section>

      <Section id="payments" title="2. How payments work">
        <p>
          Projects are normally billed in milestones agreed in writing before work begins — for example, an advance
          payment to start, followed by payments as each milestone is delivered. Each milestone has a defined scope so
          you always know what you are paying for.
        </p>
      </Section>

      <Section id="before" title="3. Cancelling before work starts">
        <p>
          If you cancel after paying an advance but before any work has started, we will refund the advance in full,
          less any non-refundable third-party costs already paid on your behalf (see section 5).
        </p>
      </Section>

      <Section id="during" title="4. Cancelling during a project">
        <ul>
          <li>You can cancel a project at any time by notifying us in writing.</li>
          <li>
            Milestones that have been delivered and approved, or that are fully completed, are non-refundable.
          </li>
          <li>
            For a milestone in progress, we charge only for the work completed up to the cancellation date and refund
            the remaining balance of any amount paid for that milestone.
          </li>
          <li>We will hand over all completed work and source code you have paid for.</li>
        </ul>
      </Section>

      <Section id="non-refundable" title="5. Non-refundable items">
        <ul>
          <li>Approved or completed milestones and delivered work.</li>
          <li>
            Third-party costs paid on your behalf, such as domain names, hosting, software licences, API usage, paid
            plugins and app store developer fees.
          </li>
          <li>Hours already spent on consulting, discovery or support that were delivered as agreed.</li>
        </ul>
      </Section>

      <Section id="retainers" title="6. Retainers and maintenance">
        <p>
          Monthly maintenance, support or dedicated-team plans can be cancelled with written notice as set out in your
          agreement. Cancellation stops future billing; amounts for a billing period that has already started are not
          refunded.
        </p>
      </Section>

      <Section id="quality" title="7. If something isn't right">
        <p>
          If a deliverable does not match the agreed scope, tell us and we will fix it at no extra cost. Our goal is to
          resolve issues through revisions first. If we cannot deliver what was agreed, we will refund the amount paid
          for the affected milestone.
        </p>
      </Section>

      <Section id="request" title="8. How to request a refund">
        <p>
          Email <a href={`mailto:${company.email}`}>{company.email}</a> with your name, project details and the reason
          for your request. We will acknowledge it within 3 business days. Approved refunds are processed within 7–14
          business days to the original payment method.
        </p>
      </Section>

      <Section id="refund-contact" title="9. Contact">
        <p>
          <strong>{company.name}</strong>
          <br />
          Email: <a href={`mailto:${company.email}`}>{company.email}</a>
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
